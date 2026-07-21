"use client";

import { Activity } from "lucide-react";

interface Execution {
  _id?: string;
  executionId: string;
  agent: string;
  status: string;
}

export default function LiveFeed({
  executions,
}: {
  executions: Execution[];
}) {
  return (
    <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/20 transition-all shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            Real-Time Socket
          </div>
          <h2 className="text-2xl font-extrabold text-white">Live Blockchain Feed</h2>
        </div>
        <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
      </div>

      <div className="space-y-4">
        {executions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No live events logged yet.</p>
        ) : (
          executions.map((item, index) => (
            <div
              key={item._id || item.executionId || index}
              className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#050917] border border-cyan-500/10 hover:border-cyan-500/20 transition-all group"
            >
              <div className="relative mt-1">
                <span
                  className={`w-3.5 h-3.5 rounded-full block ${
                    index % 3 === 0
                      ? "bg-green-400 shadow-green-500/50"
                      : index % 3 === 1
                      ? "bg-cyan-400 shadow-cyan-500/50"
                      : "bg-yellow-400 shadow-yellow-500/50"
                  }`}
                />
                <span
                  className={`w-3.5 h-3.5 rounded-full absolute inset-0 animate-ping ${
                    index % 3 === 0 ? "bg-green-400 opacity-75" : index % 3 === 1 ? "bg-cyan-400 opacity-75" : "bg-yellow-400 opacity-75"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {item.agent}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Just now</span>
                </div>

                <p className="text-gray-400 text-xs mt-0.5 font-mono">
                  Proof ID: <span className="text-cyan-300">{item.executionId}</span>
                </p>

                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-semibold ${
                      item.status === "Verified"
                        ? "text-green-400"
                        : item.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    ● {item.status}
                  </span>
                  <span className="text-[10px] text-gray-500">Block #189204</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}