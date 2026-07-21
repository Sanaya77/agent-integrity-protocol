"use client";

import WalletButton from "@/components/dashboard/WalletButton";
import { Bell, Search, RefreshCw, X } from "lucide-react";
import { useState } from "react";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSeedData: () => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function Topbar({ searchQuery, onSearchChange, onSeedData, showToast }: Props) {
  const [showNotifications, setShowNotifications] = useState(false);

  const sampleNotifications = [
    { title: "Execution Verified", desc: "Hash 0x81A2 verified by 4 nodes", time: "2m ago" },
    { title: "Agent Staked", desc: "MedicalGPT added +100 AIP stake", time: "15m ago" },
    { title: "Dispute Raised", desc: "0xFFD2 flagged for review", time: "1h ago" },
  ];

  return (
    <header className="h-20 flex items-center justify-between gap-6 relative z-30">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-3.5 text-cyan-400/60" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search executions, agents, or hashes..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0b1226]/80 border border-cyan-500/15 text-white text-sm outline-none focus:border-cyan-400/50 transition-all placeholder:text-gray-500 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-3 text-gray-400 hover:text-white p-1"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Seed Data Button */}
        <button
          onClick={onSeedData}
          title="Reset & Seed Demo Data"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-500/20 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 transition backdrop-blur-md"
        >
          <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
          <span className="hidden sm:inline">Seed Demo Data</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 rounded-xl border border-cyan-500/15 bg-[#0b1226]/80 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/30 transition"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {/* Notification Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#0b1226] border border-cyan-500/30 p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center pb-3 border-b border-cyan-500/10 mb-3">
                <h4 className="font-bold text-sm text-white">Notifications</h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-2.5">
                {sampleNotifications.map((n, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#050917] border border-cyan-500/10 hover:border-cyan-500/20 transition"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="text-xs font-bold text-cyan-300">{n.title}</h5>
                      <span className="text-[10px] text-gray-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connect Wallet Button */}
        <WalletButton showToast={showToast} />
      </div>
    </header>
  );
}