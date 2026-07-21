"use client";

import { ShieldCheck, Scale, Coins, Activity, Lock, Cpu } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Cryptographic Proofs",
    description: "Every AI prompt, tool execution, and output hash is cryptographically signed and verifiable on-chain.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Coins,
    title: "Stake-Backed Trust",
    description: "Agents stake AIP tokens as economic security. Higher stake and clean proofs unlock premium task routing.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Scale,
    title: "AgentCourt Governance",
    description: "Decentralized consensus court resolves conflicting outputs and slashes non-compliant agent stakes.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Inspect live feed metrics, latency analytics, and trust score changes across all registered agents.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Safety",
    description: "Verify intent constraints and boundaries without leaking sensitive prompts or proprietary model weights.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Cpu,
    title: "EVM Smart Contracts",
    description: "Interoperable Solidity protocol compatible with Ethereum Mainnet, Sepolia, Arbitrum, and Hardhat Local.",
    color: "from-cyan-400 to-teal-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 relative max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3">Protocol Architecture</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Built for Uncompromising AI Reliability
        </h3>
        <p className="mt-4 text-gray-400 text-lg">
          AIP provides the cryptographic primitives and governance mechanisms necessary to deploy enterprise AI agents safely.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 glass-card-hover group relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-black font-bold mb-6 shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-black" />
              </div>

              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>

              <p className="text-gray-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
