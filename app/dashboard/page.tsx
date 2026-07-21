"use client";

import { useState } from "react";
import useDashboard from "@/hooks/useDashboard";

import Sidebar, { TabKey } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import AgentCard from "@/components/dashboard/AgentCard";
import RecentExecutions from "@/components/dashboard/RecentExecutions";
import LiveFeed from "@/components/dashboard/LiveFeed";
import AgentCourt from "@/components/dashboard/AgentCourt";

import RegisterAgentModal from "@/components/dashboard/RegisterAgentModal";
import SubmitProofModal from "@/components/dashboard/SubmitProofModal";
import RaiseDisputeModal from "@/components/dashboard/RaiseDisputeModal";
import ProofDetailModal from "@/components/dashboard/ProofDetailModal";
import ToastContainer, { ToastMessage } from "@/components/dashboard/ToastContainer";

import { Bot, Plus, ShieldCheck, Coins, Cpu, Award, Settings as SettingsIcon, BarChart2 } from "lucide-react";

export default function Dashboard() {
  const { data, loading } = useDashboard();

  // Tab & Search state
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSubmitProofModalOpen, setIsSubmitProofModalOpen] = useState(false);
  const [isRaiseDisputeModalOpen, setIsRaiseDisputeModalOpen] = useState(false);
  const [selectedExecution, setSelectedExecution] = useState<any | null>(null);

  // Dynamic state overrides for created items
  const [localAgents, setLocalAgents] = useState<any[]>([]);
  const [localExecutions, setLocalExecutions] = useState<any[]>([]);
  const [localDisputes, setLocalDisputes] = useState<any[]>([]);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Combine fetched API data with newly created items
  const agents = localAgents.concat(data?.agents || []);
  const executions = localExecutions.concat(data?.executions || []);
  const disputes = localDisputes.concat(data?.disputes || []);

  const stats = data?.stats || {
    registeredAgents: agents.length,
    executionProofs: executions.length,
    trustScore: "95.0",
    stakedTokens: 1930,
  };

  // Seed demo data handler
  const handleSeedData = async () => {
    try {
      showToast("Seeding sample data to MongoDB Atlas...", "info");
      const res = await fetch("/api/seed");
      const json = await res.json();
      if (json.success) {
        showToast("Database seeded successfully! Reloading...", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        throw new Error(json.message || "Failed to seed");
      }
    } catch (err: any) {
      showToast(err.message || "Error seeding database", "error");
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4"></div>
        <p className="text-cyan-400 font-semibold tracking-wider animate-pulse">Initializing Agent Integrity Protocol...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 flex">
      {/* Fixed Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <section className="ml-72 flex-1 p-8 md:p-10 max-w-[1600px]">
        {/* Top Navigation & Controls */}
        <Topbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSeedData={handleSeedData}
          showToast={showToast}
        />

        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Registered Agents"
                value={String(agents.length)}
                change="+12%"
                iconType="agents"
              />
              <StatCard
                title="Execution Proofs"
                value={String(executions.length)}
                change="+6%"
                iconType="proofs"
              />
              <StatCard
                title="Protocol Trust Score"
                value={`${stats.trustScore}%`}
                change="+2%"
                iconType="trust"
              />
              <StatCard
                title="Total Staked AIP"
                value={String(stats.stakedTokens)}
                change="+11%"
                iconType="stake"
              />
            </div>

            {/* Chart + Top Agent Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityChart />
              </div>
              <AgentCard
                agent={agents[0] || null}
                onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
                showToast={showToast}
              />
            </div>

            {/* Execution Explorer */}
            <div>
              <RecentExecutions
                executions={executions}
                searchQuery={searchQuery}
                onOpenSubmitProofModal={() => setIsSubmitProofModalOpen(true)}
                onSelectExecution={(item) => setSelectedExecution(item)}
                showToast={showToast}
              />
            </div>

            {/* AgentCourt + Live Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AgentCourt
                  disputes={disputes}
                  onOpenRaiseDisputeModal={() => setIsRaiseDisputeModalOpen(true)}
                  showToast={showToast}
                />
              </div>
              <LiveFeed executions={executions} />
            </div>
          </div>
        )}

        {/* Tab 2: AGENTS */}
        {activeTab === "agents" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white">Registered AI Agents</h2>
                <p className="text-gray-400 text-sm mt-1">Manage agent stakes, trust rings, and execution permissions</p>
              </div>

              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Register New Agent
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((ag: any, idx: number) => (
                <div key={ag._id || ag.name || idx} className="glass-card rounded-3xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all glass-card-hover">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
                      🤖
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                      Active Verified
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-4">{ag.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{ag.type}</p>

                  <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-cyan-500/10 text-center">
                    <div className="p-2.5 rounded-xl bg-[#050917]">
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold">Trust</span>
                      <span className="text-lg font-bold text-cyan-400">{ag.trustScore}%</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#050917]">
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold">Stake</span>
                      <span className="text-lg font-bold text-white">{ag.stake}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#050917]">
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold">Proofs</span>
                      <span className="text-lg font-bold text-white">{ag.executions || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: EXECUTION PROOFS */}
        {activeTab === "executions" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            <RecentExecutions
              executions={executions}
              searchQuery={searchQuery}
              onOpenSubmitProofModal={() => setIsSubmitProofModalOpen(true)}
              onSelectExecution={(item) => setSelectedExecution(item)}
              showToast={showToast}
            />
          </div>
        )}

        {/* Tab 4: AGENTCOURT (DISPUTES) */}
        {activeTab === "disputes" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            <AgentCourt
              disputes={disputes}
              onOpenRaiseDisputeModal={() => setIsRaiseDisputeModalOpen(true)}
              showToast={showToast}
            />
          </div>
        )}

        {/* Tab 5: REPUTATION */}
        {activeTab === "reputation" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            <div className="glass-card rounded-3xl p-8 border border-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-cyan-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Agent Reputation Leaderboard</h2>
                  <p className="text-sm text-gray-400">Trust scores calculated from multi-validator determinism pass rates</p>
                </div>
              </div>

              <div className="space-y-4">
                {agents.map((ag: any, i: number) => (
                  <div key={ag._id || i} className="p-4 rounded-2xl bg-[#050917] border border-cyan-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-cyan-400 font-mono">#{i + 1}</span>
                      <div>
                        <h4 className="font-bold text-white">{ag.name}</h4>
                        <span className="text-xs text-gray-400">{ag.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="w-48 bg-slate-900 rounded-full h-3 overflow-hidden border border-cyan-500/20">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                          style={{ width: `${ag.trustScore || 90}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-cyan-300 font-mono">{ag.trustScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActivityChart />

              <div className="glass-card rounded-3xl p-8 border border-cyan-500/10 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart2 className="w-7 h-7 text-purple-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Protocol Health Diagnostics</h3>
                    <p className="text-xs text-gray-400">Node consensus & latency metrics</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between p-3.5 rounded-xl bg-[#050917] border border-cyan-500/10">
                    <span className="text-gray-400">ECDSA Signature Verification Latency</span>
                    <span className="text-cyan-400 font-mono font-bold">11.4 ms</span>
                  </div>
                  <div className="flex justify-between p-3.5 rounded-xl bg-[#050917] border border-cyan-500/10">
                    <span className="text-gray-400">Consensus Round Finality</span>
                    <span className="text-green-400 font-mono font-bold">1 Block (12s)</span>
                  </div>
                  <div className="flex justify-between p-3.5 rounded-xl bg-[#050917] border border-cyan-500/10">
                    <span className="text-gray-400">Active Validator Nodes</span>
                    <span className="text-white font-mono font-bold">32 Nodes</span>
                  </div>
                  <div className="flex justify-between p-3.5 rounded-xl bg-[#050917] border border-cyan-500/10">
                    <span className="text-gray-400">Dispute Resolution Rate</span>
                    <span className="text-cyan-300 font-mono font-bold">99.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-8 mt-8 animate-in fade-in duration-300 max-w-3xl">
            <div className="glass-card rounded-3xl p-8 border border-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <SettingsIcon className="w-7 h-7 text-cyan-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Protocol Configuration</h2>
                  <p className="text-sm text-gray-400">Contract & network parameters</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Deployed Smart Contract Address
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="0x5FbDB2315678afecb367f032d93F642f64180aa3"
                    className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-cyan-300 font-mono text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    RPC Endpoint
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="http://127.0.0.1:8545 (Hardhat Local Node)"
                    className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-gray-300 font-mono text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Chain ID
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="31337 (0x7A69)"
                    className="w-full px-4 py-3 rounded-xl bg-[#050917] border border-cyan-500/20 text-gray-300 font-mono text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Render All Interactive Modals */}
      <RegisterAgentModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={(newAgent) => setLocalAgents((prev) => [newAgent, ...prev])}
        showToast={showToast}
      />

      <SubmitProofModal
        isOpen={isSubmitProofModalOpen}
        onClose={() => setIsSubmitProofModalOpen(false)}
        agents={agents}
        onSuccess={(newExecution) => setLocalExecutions((prev) => [newExecution, ...prev])}
        showToast={showToast}
      />

      <RaiseDisputeModal
        isOpen={isRaiseDisputeModalOpen}
        onClose={() => setIsRaiseDisputeModalOpen(false)}
        executions={executions}
        onSuccess={(newDispute) => setLocalDisputes((prev) => [newDispute, ...prev])}
        showToast={showToast}
      />

      <ProofDetailModal
        execution={selectedExecution}
        onClose={() => setSelectedExecution(null)}
        showToast={showToast}
      />

      {/* Global Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </main>
  );
}