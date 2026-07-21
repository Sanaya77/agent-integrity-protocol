"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, TrendingUp } from "lucide-react";

type Period = "24H" | "7D" | "30D";

const dataset: Record<Period, { values: number[]; labels: string[]; total: string; trend: string }> = {
  "24H": {
    values: [35, 60, 45, 80, 70, 110, 95, 120, 90, 130, 115, 140],
    labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
    total: "12.8K",
    trend: "+18%",
  },
  "7D": {
    values: [420, 580, 690, 810, 950, 1100, 1250],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    total: "84.2K",
    trend: "+24%",
  },
  "30D": {
    values: [120, 180, 240, 310, 290, 380, 450, 520, 490, 580, 620, 710],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    total: "340.5K",
    trend: "+31%",
  },
};

export default function ActivityChart() {
  const [period, setPeriod] = useState<Period>("24H");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const currentData = dataset[period];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-8 border border-cyan-500/10 hover:border-cyan-500/20 transition-all shadow-xl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" /> Protocol Execution Volume
          </div>
          <h2 className="text-2xl font-bold text-white">Execution Activity</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-cyan-400">{currentData.total}</div>
            <div className="text-xs text-green-400 font-semibold flex items-center justify-end gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {currentData.trend}
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#050917] rounded-xl border border-cyan-500/15">
            {(["24H", "7D", "30D"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  period === p
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart Canvas */}
      <div className="h-64 flex items-end gap-2.5 pt-6 pb-2">
        {currentData.values.map((val, idx) => {
          const maxVal = Math.max(...currentData.values);
          const heightPercent = (val / maxVal) * 100;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 bg-[#050917] border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg shadow-xl z-20 whitespace-nowrap animate-in fade-in">
                  {val * 10} Proofs ({currentData.labels[idx]})
                </div>
              )}

              {/* Bar Fill */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className={`w-full rounded-t-xl transition-all duration-200 ${
                  isHovered
                    ? "bg-gradient-to-t from-cyan-400 to-white shadow-lg shadow-cyan-400/50 scale-105"
                    : "bg-gradient-to-t from-cyan-600/80 via-cyan-400 to-cyan-300 hover:opacity-100 opacity-90"
                }`}
              />

              <span className="text-[10px] text-gray-500 mt-2 font-mono group-hover:text-cyan-300 transition-colors">
                {currentData.labels[idx]}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}