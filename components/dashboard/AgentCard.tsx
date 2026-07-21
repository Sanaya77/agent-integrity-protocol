"use client";

import { Bot, Plus, ShieldCheck, Coins } from "lucide-react";

interface Agent {
  name: string;
  type: string;
  trustScore: number;
  stake: number;
  executions: number;
}

interface Props {
  agent?: Agent | null;
  onOpenRegisterModal?: () => void;
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function AgentCard({ agent, onOpenRegisterModal }: Props) {

  if (!agent) {
    return (
      <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 flex flex-col justify-between items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-4">
          <Bot className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Agents Registered</h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xs">
          Register your first AI agent on AIP to begin logging cryptographic execution proofs.
        </p>

        <button
          onClick={onOpenRegisterModal}
          className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Register New Agent
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/20 transition-all shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Verified Agent</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold">
            Active Status
          </span>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20">
            🤖
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">{agent.name}</h2>
            <p className="text-xs font-medium text-cyan-400 mt-0.5">{agent.type}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-3.5 rounded-2xl bg-[#050917] border border-cyan-500/10">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Trust Score</p>
            <h2 className="text-2xl font-bold text-cyan-400 mt-1">{agent.trustScore}%</h2>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#050917] border border-cyan-500/10">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Staked Tokens</p>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-1">
              <Coins className="w-4 h-4 text-purple-400 inline" /> {agent.stake}
            </h2>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#050917] border border-cyan-500/10">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Total Proofs</p>
            <h2 className="text-2xl font-bold text-white mt-1">{agent.executions}</h2>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#050917] border border-cyan-500/10">
            <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">Security Badge</p>
            <h2 className="text-green-400 text-sm font-bold mt-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Verified
            </h2>
          </div>
        </div>
      </div>

      <button
        onClick={onOpenRegisterModal}
        className="w-full mt-8 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/15 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Register Another Agent
      </button>
    </div>
  );
}