"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-white text-lg font-semibold tracking-wide animate-pulse">
          
        </p>
      </div>
    </div>
  );
}
