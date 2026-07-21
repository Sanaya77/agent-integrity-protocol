"use client";

import { X, ShieldCheck, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Props {
  execution: any | null;
  onClose: () => void;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function ProofDetailModal({ execution, onClose, showToast }: Props) {
  const [copied, setCopied] = useState(false);

  if (!execution) return null;

  const mockPayload = {
    executionId: execution.executionId,
    agent: execution.agent,
    hash: execution.hash,
    status: execution.status,
    trustScore: `${execution.trust || 98}%`,
    timestamp: new Date().toISOString(),
    verifier: "AIP Consensus Node #04",
    intent: "Process user query with constraint validation & ECDSA signature verification",
    toolCalls: [
      { tool: "weather_api", latency: "14ms", status: "success" },
      { tool: "db_lookup", latency: "8ms", status: "success" },
      { tool: "ecdsa_signer", latency: "3ms", status: "verified" },
    ],
    signature: `0x7b2f...9a41e9b2c8d102938475610293847561029384756102938475610293847561`,
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(mockPayload, null, 2));
    setCopied(true);
    showToast("Proof payload copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0b1226] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
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
            <h3 className="text-2xl font-bold text-white">Execution Proof Payload</h3>
            <p className="text-sm text-cyan-400 font-mono">ID: {execution.executionId}</p>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#050917] border border-cyan-500/10">
              <span className="text-xs text-gray-400 block mb-1">Agent</span>
              <span className="text-lg font-bold text-white">{execution.agent}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#050917] border border-cyan-500/10">
              <span className="text-xs text-gray-400 block mb-1">Verification Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                  execution.status === "Verified"
                    ? "bg-green-500/20 text-green-400"
                    : execution.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {execution.status}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#050917] border border-cyan-500/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-cyan-400" /> Cryptographic JSON Payload
              </span>
              <button
                onClick={copyPayload}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold px-3 py-1 rounded-lg bg-cyan-500/10 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy JSON"}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#02050f] text-cyan-300 text-xs font-mono overflow-x-auto border border-cyan-500/10 leading-relaxed">
              {JSON.stringify(mockPayload, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-cyan-500/10 flex justify-between items-center">
          <a
            href={`https://etherscan.io/tx/${execution.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition"
          >
            View on Etherscan <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
