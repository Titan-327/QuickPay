"use client";

import { useSearchParams } from "next/navigation";
import { SendCard } from "../../../components/SendCard";

export default function P2PTransfer() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email")// Get the 'id' query parameter
    return (
        <div className="text-white">
           
      <SendCard email={email as string}  />
      </div>
    );
}
