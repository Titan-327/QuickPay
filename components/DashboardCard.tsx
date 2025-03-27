/* eslint-disable */
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { userBalance } from "../app/lib/actions/userBalance";

export default async function BlueCard() {
    const session: any = await getServerSession(authOptions);
    const balance = Number(await userBalance()) / 100;

    return (
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white px-5 py-6 rounded-2xl shadow-2xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between border border-white/10 w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
          
            {/* Neon Glow Effects */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[250px] h-[250px] bg-blue-400 opacity-20 blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500 opacity-30 blur-[120px]"></div>

            {/* Left Section: Welcome Text */}
            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide drop-shadow-md">
                    Hello, 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"> {session?.user?.name || "Guest"}!</span>
                </h2>
            </div>

            {/* Right Section: Glassmorphism Balance Card */}
            <div className="bg-white/20 backdrop-blur-xl px-8 py-4 rounded-xl shadow-lg border border-white/30 transition-all hover:scale-105 hover:border-white/50 duration-300">
                <p className="text-4xl sm:text-5xl font-bold tracking-wide text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                    💰 ${balance?.toFixed(2) ?? "0.00"}
                </p>
                <p className="text-md sm:text-lg opacity-90">Current Balance</p>
            </div>
        </div>
    );
}
