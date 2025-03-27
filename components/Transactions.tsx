interface TransactionProps {
    name: string;
    date: string; // Format: "March 18, 2024 12:30 PM"
    amount: number; // Amount value
    status: string; // Payment status
    type: string; // Transaction type
}

export default function TransactionCard({ name, date, amount, status, type }: TransactionProps) {
    return (
        <div className="flex justify-center px-4"> {/* Centers the card */}
            <div className="w-full max-w-[600px] p-4 md:p-5 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 
                        drop-shadow-[0px_0px_10px_rgba(255,255,255,0.15)] hover:drop-shadow-[0px_0px_20px_rgba(255,255,255,0.3)]
                        flex items-center justify-between">
                
                {/* Left Section: User Initials & Name */}
                <div className="flex items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-700 text-base md:text-lg font-bold text-gray-300">
                        {name.charAt(0).toUpperCase()} {/* User Initial */}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm md:text-lg font-medium text-white">{name}</p>
                        <p className="text-xs md:text-sm text-gray-400">{date.slice(0, 10) + " " + date.slice(11, 19)}</p>
                    </div>
                </div>

                {/* Right Section: Amount & Status */}
                <div className="text-right">
                    <p className={`text-sm md:text-lg font-semibold ${type === "Debited" ? "text-red-400" : "text-green-400"}`}>
                        {type === "Debited" ? `- $${amount/100}` : `+ $${amount/100}`}
                    </p>
                    <p className={`text-xs md:text-sm font-medium ${status === "Success" ? "text-green-400" : "text-red-400"}`}>
                        {status}
                    </p> 
                </div>
            </div>
        </div>
    );
}
