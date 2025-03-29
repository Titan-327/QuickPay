"use client";

import { useRouter } from "next/navigation";

interface UserCardProps {
    name: string;
    email: string;
}

export default function UserCard({ name, email }: UserCardProps) {
    const router = useRouter();

    const handleSendMoney = () => {
        router.push(`/p2p-transfer?email=${email}`);
    };

    // Limit name to 18 characters and email to 20 characters
    const truncatedName = name.length > 30 ? name.substring(0, 30) + "..." : name;
    const truncatedEmail = email.length > 30 ? email.substring(0, 30) + "..." : email;

    return (
        <div className="relative flex flex-col sm:flex-row items-center justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg border border-blue-500/30 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_25px_rgba(0,150,255,0.5)] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            
            {/* Blue Glow Effects */}
            <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl"></div>
            <div className="absolute -top-10 left-10 w-28 sm:w-36 h-28 sm:h-36 bg-blue-400 opacity-30 blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-blue-600 opacity-40 blur-[100px]"></div>

            {/* Left: User Info */}
            <div className="relative z-10 text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white">
                    {truncatedName || "Unknown User"}
                </p>
                <p className="text-md sm:text-lg opacity-80 text-blue-200">
                    {truncatedEmail || "No email available"}
                </p>
            </div>

            {/* Right: Animated Button */}
            <button
                onClick={handleSendMoney}
                className="relative z-10 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <span className="text-lg">🚀</span> 
                <span className="text-sm sm:text-base">Send Money</span>
            </button>
        </div>
    );
}
