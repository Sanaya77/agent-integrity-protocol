"use client";

interface Dispute {
  executionId: string;
  reason: string;
  status: string;
}

export default function AgentCourt({
  disputes,
}: {
  disputes: Dispute[];
}) {
  return (
    <div className="bg-[#11192B] rounded-3xl p-8 border border-cyan-500/10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            AgentCourt
          </h2>

          <p className="text-gray-400">
            Live protocol disputes
          </p>

        </div>

        <div className="bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full">
          {disputes.length} Active
        </div>

      </div>

      <div className="space-y-5">

        {disputes.map((item) => (

          <div
            key={item.executionId}
            className="bg-[#0D1424] rounded-2xl p-6"
          >

            <h2 className="text-2xl font-bold">
              {item.executionId}
            </h2>

            <p className="text-gray-400 mt-3">
              {item.reason}
            </p>

            <div className="flex gap-4 mt-6">

              <span className="bg-red-500/20 text-red-400 px-5 py-2 rounded-full">
                {item.status}
              </span>

              <span className="bg-cyan-500/20 text-cyan-400 px-5 py-2 rounded-full">
                Validators Voting
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}