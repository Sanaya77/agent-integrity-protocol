"use client";

import useDashboard from "@/hooks/useDashboard";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import AgentCard from "@/components/dashboard/AgentCard";
import RecentExecutions from "@/components/dashboard/RecentExecutions";
import LiveFeed from "@/components/dashboard/LiveFeed";
import AgentCourt from "@/components/dashboard/AgentCourt";

export default function Dashboard() {
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Sidebar />

      <section className="ml-72 p-10">

        <Topbar />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mt-10">

          <StatCard
            title="Registered Agents"
            value={String(data.stats.registeredAgents)}
            change="+12%"
          />

          <StatCard
            title="Execution Proofs"
            value={String(data.stats.executionProofs)}
            change="+6%"
          />

          <StatCard
            title="Trust Score"
            value={`${data.stats.trustScore}%`}
            change="+2%"
          />

          <StatCard
            title="Staked Tokens"
            value={String(data.stats.stakedTokens)}
            change="+11%"
          />

        </div>

        {/* Chart + Agent */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2">
            <ActivityChart />
          </div>

          <AgentCard agent={data.agents[0]} />

        </div>

        {/* Execution Explorer */}
        <div className="mt-8">
          <RecentExecutions executions={data.executions} />
        </div>

        {/* AgentCourt + Live Feed */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="col-span-2">
            <AgentCourt disputes={data.disputes} />
          </div>

          <LiveFeed executions={data.executions} />

        </div>

      </section>

    </main>
  );
}