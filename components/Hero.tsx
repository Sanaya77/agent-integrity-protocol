"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, FileText, Sparkles, X, Code2 } from "lucide-react";

export default function Hero() {
  const [showWhitepaper, setShowWhitepaper] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Introducing Agent Integrity Protocol v1.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            The <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">Trust Layer</span> for Autonomous AI
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl font-normal">
            AIP empowers autonomous AI agents to submit cryptographic execution proofs, build verifiable reputation scores, and resolve operational disputes transparently on-chain.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              Explore Protocol <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setShowWhitepaper(true)}
              className="px-8 py-4 border border-cyan-400/30 rounded-full font-semibold text-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2 text-cyan-300 backdrop-blur-md"
            >
              <FileText className="w-5 h-5" />
              Read Whitepaper
            </button>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-cyan-500/10 w-full">
            <div>
              <div className="text-3xl font-extrabold text-white">99.8%</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Proof Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-cyan-400">&lt; 12ms</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Verification Speed</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">On-Chain Audit</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Card */}
        <div className="relative flex justify-center items-center">
          {/* Ambient Glows */}
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/20 to-purple-600/30 blur-3xl opacity-60 absolute pointer-events-none animate-pulse"></div>

          <div className="relative w-full max-w-md border border-cyan-500/20 rounded-3xl backdrop-blur-2xl bg-[#0b1226]/80 p-8 shadow-2xl shadow-cyan-900/30 glass-card-hover">
            
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" /> Execution Proof Object
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                0x81A2...91F
              </span>
            </div>

            <div className="space-y-3.5 text-sm text-gray-200">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#050917]/70 border border-cyan-500/10">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Intent & Prompt Hashing
                </span>
                <span className="text-xs text-gray-400 font-mono">SHA-256</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#050917]/70 border border-cyan-500/10">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Constraint Verification
                </span>
                <span className="text-xs text-cyan-400 font-semibold">100% Passed</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#050917]/70 border border-cyan-500/10">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Tool Calls Log
                </span>
                <span className="text-xs text-gray-400 font-mono">3 Actions</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#050917]/70 border border-cyan-500/10">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Output Determinism
                </span>
                <span className="text-xs text-green-400 font-semibold">Verified</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#050917]/70 border border-cyan-500/10">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> ECDSA Wallet Signature
                </span>
                <span className="text-xs text-cyan-400 font-mono">Secp256k1</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Cpu className="w-4 h-4 text-purple-400" /> Hardhat Local / Sepolia
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                On-Chain Status: Validated
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Whitepaper Modal */}
      {showWhitepaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1226] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setShowWhitepaper(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">Agent Integrity Protocol Architecture</h3>
                <p className="text-sm text-cyan-400">Whitepaper Summary v1.0</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                <strong>Abstract:</strong> Autonomous AI agents operating in DeFi, healthcare, and infrastructure require cryptographic assurances that their actions strictly conform to specified constraints and user intents.
              </p>

              <div className="p-4 rounded-2xl bg-[#050816] border border-cyan-500/10 space-y-2">
                <h4 className="font-semibold text-cyan-300">Key Pillars of AIP:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong>Cryptographic Proof Hashing:</strong> Every AI turn yields a deterministic hash signed by the agent wallet.</li>
                  <li><strong>Stake-Backed Trust Scoring:</strong> Agents stake AIP tokens. Malicious or disputed actions undergo slashes.</li>
                  <li><strong>AgentCourt Governance:</strong> Decentralized dispute resolution powered by multi-agent validator consensus.</li>
                </ul>
              </div>

              <p>
                <strong>Contract Address:</strong> <code className="text-xs bg-slate-900 px-2 py-1 rounded text-cyan-300">0x5FbDB2315678afecb367f032d93F642f64180aa3</code>
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowWhitepaper(false)}
                className="px-6 py-2.5 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}