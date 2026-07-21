"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  ShieldCheck,
  Scale,
  Activity,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

export type TabKey = "overview" | "agents" | "executions" | "disputes" | "reputation" | "analytics" | "settings";

const menu: { title: string; key: TabKey; icon: any }[] = [
  {
    title: "Overview",
    key: "overview",
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    key: "agents",
    icon: Bot,
  },
  {
    title: "Execution Proofs",
    key: "executions",
    icon: ShieldCheck,
  },
  {
    title: "AgentCourt",
    key: "disputes",
    icon: Scale,
  },
  {
    title: "Reputation",
    key: "reputation",
    icon: Activity,
  },
  {
    title: "Analytics",
    key: "analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    key: "settings",
    icon: Settings,
  },
];

interface Props {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export default function Sidebar({ activeTab, onSelectTab }: Props) {
  return (
    <aside className="w-72 h-screen bg-[#070c1e] border-r border-cyan-500/10 fixed left-0 top-0 z-40 flex flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="h-20 flex items-center px-8 border-b border-cyan-500/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              AIP<span className="text-cyan-400">.</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="mt-8 px-4 space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                    : "text-gray-400 hover:bg-cyan-500/5 hover:text-gray-200 border border-transparent"
                }`}
              >
                <Icon size={20} className={isActive ? "text-cyan-400" : "text-gray-400"} />
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Protocol Version Footer */}
      <div className="p-6 border-t border-cyan-500/10">
        <div className="p-4 rounded-2xl bg-[#050917] border border-cyan-500/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            AIP Mainnet v1.0.4
          </div>
          <p className="text-[11px] text-gray-500">Hardhat Local & Sepolia Testnet Ready</p>
        </div>
      </div>
    </aside>
  );
}