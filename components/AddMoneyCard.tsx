/* eslint-disable */
"use client";
import { useState, useEffect, useActionState } from "react";
import { bankWebhook } from "../app/lib/actions/bankWebhook";
import { getSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const SUPPORTED_BANKS = [{ name: "HDFC" }, { name: "Axis" }, { name: "SBI" }];

export const AddMoney = () => {
  const [session, setSession] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);

  useEffect(() => {
    getSession().then((sess) => setSession(sess));
  }, []);

  const [state, formAction, isPending] = useActionState(bankWebhook, {
    message: "",
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {/* Custom Card */}
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add Money</h2>

        <form action={formAction}>
          {/* Amount Input */}
          <label className="block text-lg font-medium text-gray-900 mb-1">
            Amount
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-gray-200 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {/* Bank Selection */}
          <div className="py-3">
            <label className="block text-lg font-medium text-gray-900">
              Bank
            </label>
            <select
              name="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-200 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              {SUPPORTED_BANKS.map((bank) => (
                <option key={bank.name} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Field for User Email */}
          <input type="hidden" name="userEmail" value={session?.user?.email || ""} />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-black hover:bg-gray-900 transition-all duration-300 py-2 text-lg font-semibold flex items-center justify-center gap-2 rounded-md text-white"
          >
            {isPending ? <FaSpinner className="animate-spin w-5 h-5" /> : "Add Money"}
          </button>
        </form>

        {/* Status Messages */}
        {state?.message && (
          <div className="mt-4 text-center text-sm font-medium">
            {state.message === "Captured" ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                ✅ Transaction Successful!
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-red-500">
                ❌ {state.message || "Transaction failed"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
