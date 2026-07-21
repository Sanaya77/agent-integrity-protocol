"use client";

import { ExternalLink, Copy, Check, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface Execution {
  executionId: string;
  agent: string;
  trust: number;
  status: string;
  hash: string;
}

interface Props {
  executions: Execution[];
  searchQuery?: string;
  onOpenSubmitProofModal?: () => void;
  onSelectExecution?: (execution: Execution) => void;
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function RecentExecutions({
  executions,
  searchQuery = "",
  onOpenSubmitProofModal,
  onSelectExecution,
  showToast,
}: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    if (showToast) showToast(`Hash ${hash} copied to clipboard!`, "info");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredExecutions = executions.filter((item) => {
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.executionId.toLowerCase().includes(q) ||
      item.agent.toLowerCase().includes(q) ||
      item.hash.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/20 transition-all shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Cryptographic Ledger
          </div>
          <h2 className="text-3xl font-extrabold text-white">Execution Explorer</h2>
          <p className="text-gray-400 text-sm mt-1">
            Latest AI execution proofs verified and stored on-chain
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-[#050917] rounded-xl border border-cyan-500/15 text-xs">
            {["All", "Verified", "Pending", "Challenged"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterStatus === st
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Submit Proof Button */}
          {onOpenSubmitProofModal && (
            <button
              onClick={onOpenSubmitProofModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Log Proof
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-cyan-500/10 text-xs uppercase tracking-wider h-12">
              <th className="pb-3 pl-4">Execution ID</th>
              <th className="pb-3">Agent</th>
              <th className="pb-3">Proof Hash</th>
              <th className="pb-3">Trust %</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-cyan-500/5 text-sm">
            {filteredExecutions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500 text-sm">
                  No execution proofs match the selected criteria.
                </td>
              </tr>
            ) : (
              filteredExecutions.map((item) => (
                <tr
                  key={item.executionId}
                  className="h-16 hover:bg-cyan-500/5 transition-colors group cursor-pointer"
                  onClick={() => onSelectExecution && onSelectExecution(item)}
                >
                  <td className="pl-4 font-mono text-cyan-300 font-bold">{item.executionId}</td>

                  <td className="font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      {item.agent}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-300 bg-[#050917] px-2.5 py-1 rounded-lg border border-cyan-500/10">
                        {item.hash.length > 14 ? `${item.hash.slice(0, 8)}...${item.hash.slice(-4)}` : item.hash}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyHash(item.hash, item.executionId);
                        }}
                        className="text-gray-400 hover:text-cyan-300 p-1 transition"
                        title="Copy Hash"
                      >
                        {copiedId === item.executionId ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="text-cyan-400 font-bold font-mono">{item.trust}%</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        item.status === "Verified"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : item.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="pr-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectExecution) onSelectExecution(item);
                      }}
                      className="p-2 rounded-xl text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition"
                      title="Inspect Proof Payload"
                    >
                      <ExternalLink className="w-4 h-4 text-cyan-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}