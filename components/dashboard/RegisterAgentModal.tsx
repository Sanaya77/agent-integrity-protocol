"use client";

import { useState } from "react";
import { X, Bot, Shield, Loader2, Coins } from "lucide-react";
import { getContract } from "@/lib/web3";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (agent: any) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function RegisterAgentModal({ isOpen, onClose, onSuccess, showToast }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Autonomous Agent");
  const [stake, setStake] = useState("500");
  const [trustScore, setTrustScore] = useState("95");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter an agent name.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const agentData = {
        name: name.trim(),
        type: type.trim(),
        stake: Number(stake) || 500,
        trustScore: Number(trustScore) || 95,
        executions: 0,
      };

      // 1. Try optional Smart Contract registration if Web3 wallet connected
      try {
        const contract = await getContract();
        const tx = await contract.registerAgent(
          agentData.name,
          agentData.type,
          agentData.trustScore,
          agentData.stake
        );
        showToast("Submitting tx to blockchain...", "info");
        await tx.wait();
        showToast("🎉 Registered agent on-chain!", "success");
      } catch (web3Err: any) {
        console.warn("Smart contract registration skipped/failed:", web3Err?.message);
        // Continue with database registration
      }

      // 2. Register in Database via API
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentData),
      });

      if (!res.ok) throw new Error("Failed to save agent to database");

      const savedAgent = await res.json();
      showToast(`Agent "${agentData.name}" registered successfully!`, "success");
      onSuccess(savedAgent);
      onClose();
      setName("");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to register agent", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0c1226] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Register AI Agent</h3>
            <p className="text-sm text-gray-400">Stake AIP tokens & initialize trust metrics</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Agent Name
            </label>
            <input
              type="text"
              placeholder="e.g. TradingBot-Alpha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Agent Type / Specialty
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
            >
              <option value="Autonomous Agent">Autonomous Agent</option>
              <option value="DeFi Trader">DeFi Trader</option>
              <option value="Healthcare GPT">Healthcare GPT</option>
              <option value="E-Commerce Assistant">E-Commerce Assistant</option>
              <option value="Code Auditor">Code Auditor</option>
              <option value="Research Assistant">Research Assistant</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Stake (AIP)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
                  min="100"
                />
                <Coins className="w-4 h-4 text-cyan-400 absolute right-4 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Initial Trust %
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={trustScore}
                  onChange={(e) => setTrustScore(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
                  max="100"
                  min="50"
                />
                <Shield className="w-4 h-4 text-cyan-400 absolute right-4 top-3.5" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Registering...
                </>
              ) : (
                "Register Agent"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
