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
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Agents",
    icon: Bot,
    href: "/dashboard",
  },
  {
    title: "Execution Proofs",
    icon: ShieldCheck,
    href: "/dashboard",
  },
  {
    title: "AgentCourt",
    icon: Scale,
    href: "/dashboard",
  },
  {
    title: "Reputation",
    icon: Activity,
    href: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-[#0B1020] border-r border-cyan-500/10 fixed left-0 top-0">

      <div className="h-20 flex items-center px-8 border-b border-cyan-500/10">

        <h1 className="text-3xl font-bold">
          AIP<span className="text-cyan-400">.</span>
        </h1>

      </div>

      <div className="mt-8 px-4">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 rounded-xl text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition mb-2"
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}

      </div>
    </aside>
  );
}