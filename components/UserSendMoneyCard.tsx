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

    return (
        <div className="relative flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg border border-blue-500/30 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_25px_rgba(0,150,255,0.5)]">
            
            {/* Blue Glow Effects */}
            <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl"></div>
            <div className="absolute -top-10 left-10 w-36 h-36 bg-blue-400 opacity-30 blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600 opacity-40 blur-[100px]"></div>

            {/* Left: User Info */}
            <div className="relative z-10">
                <p className="text-xl sm:text-2xl font-bold tracking-wide text-white">
                    {name || "Unknown User"}
                </p>
                <p className="text-sm opacity-80 text-blue-200">{email || "No email available"}</p>
            </div>

            {/* Right: Animated Button */}
            <button
                onClick={handleSendMoney}
                className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
                <span className="text-lg text-white">🚀</span> {/* White Rocket Icon */}
                <span>Send Money</span>
            </button>
        </div>
    );
}
