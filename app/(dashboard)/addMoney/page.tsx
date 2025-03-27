
import { AddMoney } from "../../../components/AddMoneyCard";


// async function getBalance() {
//     const session = await getServerSession(authOptions);
//     const balance = await prisma.balance.findFirst({
//         where: {
//             userEmail: session?.user?.email
//         }
//     });
//     return {
//         amount: balance?.amount || 0,
//         locked: balance?.locked || 0
//     }
// }

// async function getOnRampTransactions() {
//     const session = await getServerSession(authOptions);
//     const txns = await prisma.onRampTransaction.findMany({
//         where: {
//             userEmail: session?.user?.email
//         }
//     });
//     return txns.map(t => ({
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider
//     }))
// }

export default async function Page() {
    // const balance = await getBalance();
    // const transactions = await getOnRampTransactions();

    return (
        <div className="flex justify-center items-center min-h-[90vh]">
            <AddMoney />
        </div>
    );
}
