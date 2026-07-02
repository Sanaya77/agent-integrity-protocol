"use client";

import { ExternalLink } from "lucide-react";

interface Execution {
  executionId: string;
  agent: string;
  trust: number;
  status: string;
  hash: string;
}

export default function RecentExecutions({
  executions,
}: {
  executions: Execution[];
}) {
  return (
    <div className="bg-[#11192B] rounded-3xl p-8 border border-cyan-500/10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Execution Explorer
          </h2>

          <p className="text-gray-400">
            Latest AI execution proofs stored on-chain
          </p>

        </div>

        <button className="text-cyan-400 font-semibold">
          View Explorer
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-gray-400 border-b border-white/10 h-14">

            <th className="text-left">Hash</th>
            <th className="text-left">Agent</th>
            <th className="text-left">Latency</th>
            <th className="text-left">Trust</th>
            <th className="text-left">Status</th>
            <th></th>

          </tr>

        </thead>

        <tbody>

          {executions.map((item) => (

            <tr
              key={item.executionId}
              className="border-b border-white/5 h-16 hover:bg-cyan-500/5 transition"
            >

              <td>{item.hash}</td>

              <td className="font-semibold">
                {item.agent}
              </td>

              <td>--</td>

              <td className="text-cyan-400">
                {item.trust}%
              </td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${item.status === "Verified"
                      ? "bg-green-500/20 text-green-400"
                      : item.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {item.status}
                </span>

              </td>

              <td>

                <button>

                  <ExternalLink
                    className="text-cyan-400"
                    size={18}
                  />

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}