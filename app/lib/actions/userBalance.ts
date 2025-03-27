/* eslint-disable */
"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "../prisma"

export async function userBalance() {
   
    const session:any = await getServerSession(authOptions)
    console.log(session)
    if (!session || !session.user) {
        throw new Error("User not authenticated")
    }

    const userEmail:string = session.user.email

    const userBalance = await prisma.user.findFirst({
        where: { email: userEmail },
        select: {
            Balance: {
                select: {
                    amount: true
                }
            }
        }
    })
console.log(userBalance)
    return userBalance?.Balance?.amount // Default to 0 if no balance exists
}
