interface TransactionProps {
    name: string;
    date: string; // Format: "March 18, 2024 12:30 PM"
    amount: number; // Amount value
    status: string; // Payment status
    type: string; // Transaction type
}

export default function TransactionCard({ name, date, amount, status, type }: TransactionProps) {
    // Limit name to 18 characters
    const truncatedName = name.length > 18 ? name.substring(0, 18) + "..." : name;

    return (
        <div className="m-3 flex justify-center items-center px-4 w-full"> {/* Centers the card */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 sm:p-5 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 
                        drop-shadow-[0px_0px_10px_rgba(255,255,255,0.15)] hover:drop-shadow-[0px_0px_20px_rgba(255,255,255,0.3)]
                        flex items-center justify-between">
                
                {/* Left Section: User Initials & Name */}
                <div className="flex items-center">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-700 text-xs sm:text-sm md:text-lg font-bold text-gray-300">
                        {name.charAt(0).toUpperCase()} {/* User Initial */}
                    </div>
                    <div className="ml-3">
                        <p className="text-xs sm:text-sm md:text-lg font-medium text-white">{truncatedName}</p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">
                            {date.slice(0, 12)} {date.slice(13, 19)}
                        </p>
                    </div>
                </div>

                {/* Right Section: Amount & Status */}
                <div className="text-right">
                    <p className={`text-xs sm:text-sm md:text-lg font-semibold ${type === "Debited" ? "text-red-400" : "text-green-400"}`}>
                        {type === "Debited" ? `- $${(amount / 100).toFixed(2)}` : `+ $${(amount / 100).toFixed(2)}`}
                    </p>
                    <p className={`text-[10px] sm:text-xs md:text-sm font-medium ${status === "Success" ? "text-green-400" : "text-red-400"}`}>
                        {status}
                    </p> 
                </div>
            </div>
        </div>
    );
}
