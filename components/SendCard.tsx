"use client";
import { useState, useActionState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa"; // Spinner icon

export function SendCard({ email }: { email: string }) {
  const [amount, setAmount] = useState("");
  const [state, formAction, isPending] = useActionState(p2pTransfer, { message: "" });

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white text-black shadow-lg rounded-lg p-6 w-80">
      <form action={formAction}> 
        {/* Amount Label */}
        <p className="text-2xl font-bold text-gray-900 mb-2">Amount</p>

        {/* Amount Input (Removed Up/Down Arrows) */}
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md bg-gray-200 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Enter amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Hidden Input for Recipient Email */}
        <input type="hidden" value={email} name="to" />

        {/* Submit Button */}
        <button
          type="submit"
          formAction={formAction}
          className="w-full mt-4 bg-black hover:bg-gray-900 transition-all duration-300 py-2 text-lg font-semibold flex items-center justify-center gap-2 rounded-md text-white"
        >
          {isPending ? <FaSpinner className="animate-spin w-5 h-5" /> : "Send"}
        </button>

        {/* Status Messages */}
        {state?.message && (
          <div className="mt-4 text-center text-sm font-medium text-white">
            {state.message === "Transfer successful" ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <HiCheckCircle className="w-5 h-5" />
                Transfer Successful!
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-red-500">
                <HiXCircle className="w-5 h-5" />
                {state.message || "Something went wrong!"}
              </div>
            )}
          </div>
        )}
        </form>
      </div>
    </div>
  );
}
