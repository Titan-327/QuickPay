/* eslint-disable */
"use server"
import db from "../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
type res={
    message?:string
}
export async function bankWebhook(prevState: res,formdata:FormData) {
const session:any=await getServerSession(authOptions)
const userEmail=session.user.email as string
    // Extract request body data
    const amount=Number(formdata.get("amount"))*100;
    const provider=formdata.get("provider") as string
console.log(amount," ",provider)
    // Basic input validation (instead of Zod)
    if ( !amount || !provider) {
        return {
            message:"Error"
        }
    }

    try {
        // Perform database operations in a transaction
        await db.$transaction([
            // Update user's balance
            db.balance.updateMany({
                where: { userEmail },
                data: {
                    amount: {
                        increment: amount,
                    },
                },
            }),
            // Create an on-ramp transaction record
            db.onRampTransaction.create({
                data: {
                    status: "Success",
                    token:"bankWebhook",
                    provider,
                    amount,
                    startTime: new Date(),
                    userEmail,
                },
            }),
        ]);

        return { message: "Captured" };

    } catch (e) {
        console.error(e);
       return  { message: "Error while processing webhook" }
    }
}


