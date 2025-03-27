"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa"; 
import { FiMail, FiLock } from "react-icons/fi"; 

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", { email, password, redirect: false });

        console.log("Sign-in result:", result); // Debugging

        if (result?.error) {
            setError(result.error);
        } else {
            router.replace(callbackUrl);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 sm:px-10 bg-black">
            <div className="w-full max-w-xs sm:max-w-sm p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">Welcome Back 👋</h2>
                <p className="text-gray-400 text-center mt-1">Sign in to continue</p>

                {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FiLock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                        Sign In
                    </button>
                </form>

                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-800 px-2 text-gray-400">or</span>
                    </div>
                </div>

                <button 
                    onClick={async () => {
                        console.log("Signing in with Google...");
                        await signIn("google", { callbackUrl: "http://localhost:3001/dashboard" });
                    }}
                    className="mt-4 w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                >
                    <FaGoogle className="mr-2" /> Sign in with Google
                </button>
            </div>
        </div>
    );
}
