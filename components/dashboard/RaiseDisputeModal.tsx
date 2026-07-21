"use client";

import { useState } from "react";
import { X, Scale, AlertTriangle, Loader2 } from "lucide-react";
import { getContract } from "@/lib/web3";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  executions: any[];
  onSuccess: (dispute: any) => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function RaiseDisputeModal({ isOpen, onClose, executions, onSuccess, showToast }: Props) {
  const [executionId, setExecutionId] = useState(executions[0]?.executionId || "0xFFD2");
  const [reason, setReason] = useState("Conflicting execution output");
  const [status, setStatus] = useState("Pending");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason.trim()) {
      showToast("Please specify a reason for the dispute.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        executionId: executionId.trim(),
        reason: reason.trim(),
        status: status,
      };

      // Optional Smart Contract dispute call
      try {
        const contract = await getContract();
        const tx = await contract.raiseDispute(payload.executionId, payload.reason);
        showToast("Submitting dispute tx to smart contract...", "info");
        await tx.wait();
        showToast("🎉 Dispute registered on-chain!", "success");
      } catch (web3Err: any) {
        console.warn("Smart contract raiseDispute skipped:", web3Err?.message);
      }

      // MongoDB API
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to raise dispute");

      const savedDispute = await res.json();
      showToast(`Dispute for ${payload.executionId} submitted to AgentCourt!`, "success");
      onSuccess(savedDispute);
      onClose();
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to raise dispute", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0c1226] border border-amber-500/30 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Raise AgentCourt Dispute</h3>
            <p className="text-sm text-gray-400">Flag an execution for validator consensus voting</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Target Execution ID
            </label>
            <select
              value={executionId}
              onChange={(e) => setExecutionId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-amber-500/20 text-white outline-none focus:border-amber-400 transition"
            >
              {executions && executions.length > 0 ? (
                executions.map((item: any) => (
                  <option key={item._id || item.executionId} value={item.executionId}>
                    {item.executionId} — {item.agent} ({item.status})
                  </option>
                ))
              ) : (
                <option value="0xFFD2">0xFFD2 (BookingBot)</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Reason for Dispute
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe why this execution output broke integrity or constraints..."
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-amber-500/20 text-white outline-none focus:border-amber-400 transition text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Dispute Initial Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-amber-500/20 text-white outline-none focus:border-amber-400 transition"
            >
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Challenged">Challenged</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              Submitting a dispute locks the execution hash and prompts AIP validator nodes to vote on outcome determinism.
            </p>
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
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Dispute"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
