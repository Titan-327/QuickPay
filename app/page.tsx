import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Link from 'next/link';
import { FaLock, FaBolt, FaShieldAlt } from 'react-icons/fa';

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const destination = session?.user ? '/dashboard' : '/api/auth/signin';
  const buttonText = session?.user ? 'Go to Dashboard' : 'Get Started';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-8">
      <h1 className="text-6xl font-serif font-bold mb-6 text-gray-100 drop-shadow-lg">Welcome to QuickPay</h1>
      <p className="text-xl mb-10 max-w-3xl leading-relaxed text-gray-300">
        Experience seamless and secure transactions with QuickPay. Your trusted payment partner.
      </p>
      <Link href={destination}>
        <button className="px-10 py-4 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          {buttonText}
        </button>
      </Link>
      
      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        <div className="flex flex-col items-center p-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <FaLock className="text-blue-400 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl text-gray-100">Secure Transactions</h3>
          <p className="text-gray-400 text-lg mt-3">End-to-end encryption ensures your payments are always protected.</p>
        </div>
        <div className="flex flex-col items-center p-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <FaBolt className="text-blue-400 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl text-gray-100">Lightning Fast</h3>
          <p className="text-gray-400 text-lg mt-3">Enjoy instant payments without delays or interruptions.</p>
        </div>
        <div className="flex flex-col items-center p-10 bg-gray-900 border border-gray-700 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <FaShieldAlt className="text-blue-400 text-5xl mb-4" />
          <h3 className="font-semibold text-2xl text-gray-100">Fraud Protection</h3>
          <p className="text-gray-400 text-lg mt-3">Advanced AI monitors transactions to prevent fraudulent activity.</p>
        </div>
      </div>
    </div>
  );
}
