/* eslint-disable */
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { userBalance } from "../app/lib/actions/userBalance";

export default async function BlueCard() {
    const session: any = await getServerSession(authOptions);
    const balance = Number(await userBalance()) / 100;

    // Limit name to 12 characters and add "..." if exceeded
    const userName = session?.user?.name
        ? session.user.name.length > 15
            ? session.user.name.substring(0, 15) + "..."
            : session.user.name
        : "Guest";

    return (
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white px-4 sm:px-6 py-6 rounded-2xl shadow-2xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between border border-white/10 w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
          
            {/* Neon Glow Effects */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] bg-blue-400 opacity-20 blur-[80px] sm:blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-500 opacity-30 blur-[100px] sm:blur-[120px]"></div>

            {/* Left Section: Welcome Text */}
            <div className="relative z-10 text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-md">
                    Hello, 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"> {userName}!</span>
                </h2>
            </div>

            {/* Right Section: Glassmorphism Balance Card */}
            <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg border border-white/30 transition-all hover:scale-105 hover:border-white/50 duration-300 text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                    💰 ${balance?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-sm sm:text-md md:text-lg opacity-90">Current Balance</p>
            </div>
        </div>
    );
}
