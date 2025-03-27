"use client";

import { useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiMenuAlt2, HiX } from "react-icons/hi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiBank, CiLogout } from "react-icons/ci";
import { LuClock5 } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (path: string) => {
    router.push(path);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar (Opens from Right on Small Screens) */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:right-auto md:left-0 md:flex md:w-64`}
      >
        <Sidebar aria-label="Sidebar Navigation" className="h-full">
          <Sidebar.Items>
            {/* Wallet Wave Title */}
            <div
              className="hover:cursor-pointer text-xl font-semibold px-4 py-3 text-black"
              onClick={() => router.push("/")}
            >
              QuickPay
            </div>

            {/* Sidebar Links */}
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiChartPie}
                className={`hover:cursor-pointer ${
                  pathname === "/dashboard" ? "text-blue-400" : "text-black"
                }`}
                onClick={() => handleItemClick("/dashboard")}
              >
                Dashboard
              </Sidebar.Item>

              <Sidebar.Item
                icon={LiaRupeeSignSolid}
                className={`hover:cursor-pointer ${
                  pathname === "/p2p" ? "text-blue-400" : "text-black"
                }`}
                onClick={() => handleItemClick("/p2p")}
              >
                Transfer
              </Sidebar.Item>

              <Sidebar.Item
                icon={CiBank}
                className={`hover:cursor-pointer ${
                  pathname === "/addMoney" ? "text-blue-400" : "text-black"
                }`}
                onClick={() => handleItemClick("/addMoney")}
              >
                Add Money
              </Sidebar.Item>

              <Sidebar.Item
                icon={LuClock5}
                className={`hover:cursor-pointer ${
                  pathname === "/transactions" ? "text-blue-400" : "text-black"
                }`}
                onClick={() => handleItemClick("/transactions")}
              >
                Transactions
              </Sidebar.Item>

              <Sidebar.Item
                icon={CiLogout}
                className="hover:cursor-pointer text-red-400"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/signin");
                }}
              >
                LogOut
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "mr-0" : "mr-0 md:ml-64"
        }`}
      >
        {/* Mobile Toggle Button (Now on Right) */}
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <button
            className="p-2 rounded-md bg-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="h-6 w-6 text-black" />
            ) : (
              <HiMenuAlt2 className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-black text-white mt-12 md:mt-0">{children}</div>
      </div>
    </div>
  );
}
