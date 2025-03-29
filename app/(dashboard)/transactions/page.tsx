/* eslint-disable */
import { getServerSession } from "next-auth";
import TransactionCard from "../../../components/Transactions";
import { authOptions } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default async function TransactionsPage() {
    const session: any = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        console.log("No user email found. Unauthorized access.");
        return <p>Unauthorized</p>;
    }

    // Fetch Transactions
    const debitedTransactions = await prisma.p2pTransfer.findMany({
        where: { fromUserEmail: userEmail },
        select: { toUserEmail: true, amount: true, status: true, timestamp: true }
    });

    const creditedTransactions = await prisma.p2pTransfer.findMany({
        where: { toUserEmail: userEmail },
        select: { fromUserEmail: true, amount: true, status: true, timestamp: true }
    });

    const creditedTransactions1 = await prisma.onRampTransaction.findMany({
        where: { userEmail: userEmail },
        select: { amount: true, status: true, startTime: true, provider: true }
    });

    // Debugging logs
    console.log("Debited Transactions:", debitedTransactions);
    console.log("Credited Transactions:", creditedTransactions);
    console.log("On-Ramp Transactions:", creditedTransactions1);

    // Merge and sort transactions
    const allTransactions = [
        ...debitedTransactions.map((txn) => ({
            name: txn.toUserEmail.split("@")[0], 
            date: txn.timestamp ? new Date(txn.timestamp) : new Date(), 
            amount: txn.amount,
            status: txn.status,
            type: "Debited"
        })),
        ...creditedTransactions.map((txn) => ({
            name: txn.fromUserEmail.split("@")[0],
            date: txn.timestamp ? new Date(txn.timestamp) : new Date(),
            amount: txn.amount,
            status: txn.status,
            type: "Credited"
        })),
        ...creditedTransactions1.map((txn) => ({
            name: txn.provider,
            date: txn.startTime ? new Date(txn.startTime) : new Date(),
            amount: txn.amount,
            status: txn.status,
            type: "Credited"
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort newest first

    return (
        <div className="min-h-screen">
            <div className="text-4xl mb-4 font-extrabold text-transparent bg-clip-text 
                bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] 
                text-center tracking-wide animate-pulse">
                Transactions
            </div>

            {allTransactions.length > 0 ? (
                allTransactions.map((txn, index) => (
                    <TransactionCard
                        key={index}
                        name={txn.name}
                        date={txn.date.toISOString()} // Convert to string for rendering
                        amount={txn.amount}
                        status={txn.status}
                        type={txn.type}
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center">No transactions found.</p>
            )}
        </div>
    );
}
