// "use server"
// import prisma from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth";
// export async function createOnRampTransaction(provider:string, amount:number) {
//     const session=await getServerSession(authOptions)
//     const userEmail=session.user.email
//     if(!userEmail){
//         return {
//             message:"User not logged in"
//         }
//     }
//     const token=Math.random().toString()
// await prisma.onRampTransaction.create({
//     data:{
//         status:"",
//         token:token,
//         provider:provider,
//         amount:amount,
//         startTime:new Date(),
//         userEmail:userEmail
//     }
// })
// }
