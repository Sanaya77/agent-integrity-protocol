"use client";

import { Scale, ThumbsUp, ThumbsDown, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Dispute {
  _id?: string;
  executionId: string;
  reason: string;
  status: string;
}

interface Props {
  disputes: Dispute[];
  onOpenRaiseDisputeModal?: () => void;
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function AgentCourt({ disputes, onOpenRaiseDisputeModal, showToast }: Props) {
  const [votes, setVotes] = useState<Record<string, { up: number; down: number; voted?: boolean }>>({});

  const handleVote = (executionId: string, direction: "up" | "down") => {
    const current = votes[executionId] || { up: 14, down: 2 };
    if (current.voted) {
      if (showToast) showToast("You have already submitted your vote on this dispute.", "info");
      return;
    }

    const updated = {
      up: direction === "up" ? current.up + 1 : current.up,
      down: direction === "down" ? current.down + 1 : current.down,
      voted: true,
    };

    setVotes((prev) => ({ ...prev, [executionId]: updated }));
    if (showToast) {
      showToast(
        direction === "up"
          ? `Voted UP syntax/behavior compliance on ${executionId}`
          : `Voted DOWN non-compliance on ${executionId}`,
        "success"
      );
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/20 transition-all shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" /> Decentralized Governance
          </div>
          <h2 className="text-3xl font-extrabold text-white">AgentCourt</h2>
          <p className="text-gray-400 text-sm mt-1">Live protocol dispute resolution & consensus voting</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold">
            {disputes.length} Active Disputes
          </div>

          {onOpenRaiseDisputeModal && (
            <button
              onClick={onOpenRaiseDisputeModal}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Raise Dispute
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {disputes.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#050917] border border-cyan-500/10 text-center">
            <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <h4 className="font-bold text-gray-300">No Open Disputes</h4>
            <p className="text-xs text-gray-500 mt-1">All agent executions are operating in full compliance.</p>
          </div>
        ) : (
          disputes.map((item) => {
            const currentVotes = votes[item.executionId] || { up: 14, down: 2 };

            return (
              <div
                key={item._id || item.executionId}
                className="bg-[#070d1e] rounded-2xl p-6 border border-cyan-500/10 hover:border-amber-500/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      Target Execution ID: {item.executionId}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{item.reason}</h3>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-cyan-500/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-cyan-400 font-medium px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      Validators Voting Active
                    </span>
                  </div>

                  {/* Voting Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote(item.executionId, "up")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentVotes.voted
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-[#050917] text-gray-300 border border-cyan-500/20 hover:border-green-400 hover:text-green-400"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Compliant ({currentVotes.up})
                    </button>

                    <button
                      onClick={() => handleVote(item.executionId, "down")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentVotes.voted
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-[#050917] text-gray-300 border border-cyan-500/20 hover:border-red-400 hover:text-red-400"
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      Non-Compliant ({currentVotes.down})
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}