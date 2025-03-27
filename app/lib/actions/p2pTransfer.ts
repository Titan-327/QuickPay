/* eslint-disable */
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

type res={
    message?:string
}
export async function p2pTransfer(prevState: res, formdata: FormData) {
    const to = formdata.get("to") as any;
    const amount = Number(formdata.get("amount")) * 100;
    console.log(to, " ", amount);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return { message: "Error while sending" };
    }
    console.log(session);

    const from: string = session.user.email;

    const toUser = await prisma.user.findUnique({
        where: { email: to as string }
    });

    if (!toUser) {
        return { message: "User not found" };
    }

    try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Lock sender's balance row for update
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userEmail" = ${from} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userEmail: from }
            });

            if (!fromBalance || fromBalance.amount < amount) {
                // ❌ Move failure transaction logging OUTSIDE the transaction block
                throw new Error("INSUFFICIENT_BALANCE");
            }

            // ✅ Deduct amount from sender
            await tx.balance.update({
                where: { userEmail: from },
                data: { amount: { decrement: amount } }
            });

            // ✅ Add amount to recipient
            await tx.balance.update({
                where: { userEmail: to as string },
                data: { amount: { increment: amount } }
            });

            // ✅ Record successful transfer
            await tx.p2pTransfer.create({
                data: {
                    status: "Success",
                    fromUserEmail: from,
                    toUserEmail: to as string,
                    amount,
                    timestamp: new Date(),
                }
            });
        });

        return { message: "Transfer successful" };
    } catch (error: any) {
        if (error.message === "INSUFFICIENT_BALANCE") {
            // 🚀 Now, this runs even if the transaction fails
            await prisma.p2pTransfer.create({
                data: {
                    status: "Failure",
                    fromUserEmail: from,
                    toUserEmail: to as string,
                    amount,
                    timestamp: new Date(),
                }
            });

            return { message: "Insufficient balance" };
        }

        return { message: error.message };
    }
}
