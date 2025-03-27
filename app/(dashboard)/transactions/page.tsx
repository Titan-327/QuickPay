/* eslint-disable */
import { getServerSession } from "next-auth";
import TransactionCard from "../../../components/Transactions";
import { authOptions } from "../../lib/auth";
import prisma from "../../lib/prisma";
type res="SUCESS"|"FAILURE"
export default async function TransactionsPage() {
    const session: any = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) return <p>Unauthorized</p>;

    // Transactions where the user sent money (Debited)
    const debitedTransactions = await prisma.p2pTransfer.findMany({
        where: { fromUserEmail: userEmail },
        select: { toUserEmail: true, amount: true, status: true, timestamp: true }
    });

    // Transactions where the user received money (Credited)
    const creditedTransactions = await prisma.p2pTransfer.findMany({
        where: { toUserEmail: userEmail },
        select: { fromUserEmail: true, amount: true, status: true, timestamp: true }
    });

    // Transactions where the user added money (On-Ramp)
    const creditedTransactions1 = await prisma.onRampTransaction.findMany({
        where: { userEmail: userEmail },
        select: { amount: true, status: true, startTime: true, provider: true }
    });

    // Merging all transactions into a single array
    const allTransactions = [
        ...debitedTransactions.map((txn: { toUserEmail: string; amount: number; status: string; timestamp: Date }) => ({
            name: txn.toUserEmail.split("@")[0], // Show recipient's name/email
            date: txn.timestamp, // Keeping as Date object for sorting
            amount: txn.amount,
            status: txn.status,
            type: "Debited" // Sent money
        })),
        ...creditedTransactions.map((txn: { fromUserEmail: string; amount: number; status: string; timestamp: Date }) => ({
            name: txn.fromUserEmail.split("@")[0], // Show sender's name/email
            date: txn.timestamp,
            amount: txn.amount,
            status: txn.status,
            type: "Credited" // Received money
        })),
        ...creditedTransactions1.map((txn: { amount: number; status: string; startTime: Date; provider: string }) => ({
            name: txn.provider, // Show generic name for deposits
            date: txn.startTime,
            amount: txn.amount,
            status: txn.status,
            type: "Credited" // Money added
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sorting by date (newest first)

    return (
        <div className="space-y-4">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] 
                text-center tracking-wide animate-pulse">
                Transactions
            </div>

            {allTransactions.length > 0 ? (
                allTransactions.map((txn, index) => (
                    <TransactionCard
                        key={index}
                        name={txn.name as string}
                        date={txn.date.toISOString()} // Convert date to string for rendering
                        amount={txn.amount}
                        status={txn.status}
                        type={txn.type} // Pass the transaction type
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center">No transactions found.</p>
            )}
        </div>
    );
}
