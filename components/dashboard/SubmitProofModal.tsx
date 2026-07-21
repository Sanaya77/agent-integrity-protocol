"use client";

import { useState } from "react";
import { X, ShieldCheck, Hash, Loader2 } from "lucide-react";
import { getContract } from "@/lib/web3";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  agents: any[];
  onSuccess: (execution: any) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function SubmitProofModal({ isOpen, onClose, agents, onSuccess, showToast }: Props) {
  const [agentName, setAgentName] = useState(agents[0]?.name || "TravelGPT");
  const [executionId, setExecutionId] = useState(`0x${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`);
  const [status, setStatus] = useState("Verified");
  const [hash, setHash] = useState(`0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`);
  const [trust, setTrust] = useState("98");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        executionId: executionId.trim(),
        agent: agentName.trim(),
        trust: Number(trust) || 95,
        status: status,
        hash: hash.trim(),
      };

      // Optional Web3 smart contract execution store
      try {
        const contract = await getContract();
        const tx = await contract.storeExecution(payload.executionId, payload.hash);
        showToast("Sending proof tx to blockchain...", "info");
        await tx.wait();
        showToast("🎉 Proof recorded on-chain!", "success");
      } catch (web3Err: any) {
        console.warn("Smart contract store execution skipped:", web3Err?.message);
      }

      // API call to MongoDB
      const res = await fetch("/api/executions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to store execution proof");

      const savedExecution = await res.json();
      showToast(`Execution proof ${payload.executionId} logged!`, "success");
      onSuccess(savedExecution);
      onClose();

      // Reset ID & Hash for next call
      setExecutionId(`0x${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`);
      setHash(`0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to submit execution proof", "error");
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Log Execution Proof</h3>
            <p className="text-sm text-gray-400">Record cryptographic hash on AIP Protocol</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Executing Agent
            </label>
            <select
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
            >
              {agents && agents.length > 0 ? (
                agents.map((a: any) => (
                  <option key={a._id || a.name} value={a.name}>
                    {a.name} ({a.type})
                  </option>
                ))
              ) : (
                <option value="TravelGPT">TravelGPT</option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Execution ID
              </label>
              <input
                type="text"
                value={executionId}
                onChange={(e) => setExecutionId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Challenged">Challenged</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Proof Hash
            </label>
            <div className="relative">
              <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-white outline-none focus:border-cyan-400 transition font-mono text-sm"
                required
              />
              <Hash className="w-4 h-4 text-cyan-400 absolute right-4 top-3.5" />
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Logging...
                </>
              ) : (
                "Log Proof"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
