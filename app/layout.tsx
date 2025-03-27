import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import {Toaster} from "react-hot-toast"
import { JSX } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Wave",
  description: "Simple wallet app",
  icons: {
    icon:"/favicon.ico"
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen min-h-screen bg-black">
          <Toaster position="top-right" reverseOrder={false} />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
