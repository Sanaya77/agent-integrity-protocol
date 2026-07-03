"use client";

import { useState } from "react";
import { getContract } from "@/lib/web3";

interface Agent {
  name: string;
  type: string;
  trustScore: number;
  stake: number;
  executions: number;
}

export default function AgentCard({
  agent,
}: {
  agent: Agent;
}) {
  const [loading, setLoading] = useState(false);

  async function registerAgent() {
    try {
      setLoading(true);

      const contract = await getContract();

      const tx = await contract.registerAgent(
        agent.name,
        agent.type,
        agent.trustScore,
        agent.stake
      );

      await tx.wait();

      alert("🎉 Agent registered successfully on blockchain!");
    } catch (err: any) {
      console.error(err);
      alert(err.reason || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#11192B] rounded-3xl p-8 border border-cyan-500/10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Live Agent
        </h2>

        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
          Active
        </span>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-3xl">
          🤖
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {agent.name}
          </h2>

          <p className="text-gray-400">
            {agent.type}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <div>
          <p className="text-gray-400 text-sm">
            Trust Score
          </p>

          <h2 className="text-3xl font-bold text-cyan-400">
            {agent.trustScore}%
          </h2>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Stake
          </p>

          <h2 className="text-3xl font-bold">
            {agent.stake} AIP
          </h2>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Executions
          </p>

          <h2 className="text-3xl font-bold">
            {agent.executions}
          </h2>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Status
          </p>

          <h2 className="text-green-400 text-xl font-semibold">
            Verified
          </h2>
        </div>
      </div>

      <button
        onClick={registerAgent}
        disabled={loading}
        className="w-full mt-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register Agent"}
      </button>
    </div>
  );
}