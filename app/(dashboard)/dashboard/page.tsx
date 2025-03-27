
import BlueCard from "../../../components/DashboardCard"
export default async function DashboardCard() {
    return <div className="text-white">
    <BlueCard />

    {/* Payment Benefits Section */}
    <div className="mt-6 px-4 sm:px-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Secure Payments */}
        <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-md">
            <span className="text-blue-400 text-3xl">🔒</span>
            <p className="text-sm sm:text-base">100% Secure & Encrypted Transactions</p>
        </div>

        {/* Instant Transfers */}
        <div className="flex items-center gap-3 bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-md">
            <span className="text-green-400 text-3xl">⚡</span>
            <p className="text-sm sm:text-base">Instant Money Transfers</p>
        </div>
    </div>

    {/* Quick Action */}
</div>




}