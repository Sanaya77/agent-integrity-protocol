"use client";

import WalletButton from "@/components/dashboard/WalletButton";
import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 flex items-center justify-between">

      <div className="relative">

        <Search
          className="absolute left-4 top-3 text-gray-500"
          size={20}
        />

        <input
          placeholder="Search execution..."
          className="w-96 pl-12 pr-4 py-3 rounded-xl bg-[#10182B] border border-cyan-500/10 outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell className="text-gray-400" />

        <WalletButton />

      </div>

    </header>
  );
}