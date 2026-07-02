"use client";

interface Execution {
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
    <div className="bg-[#11192B] rounded-3xl p-8 border border-cyan-500/10">

      <h2 className="text-3xl font-bold mb-8">
        Live Blockchain Feed
      </h2>

      <div className="space-y-6">

        {executions.map((item, index) => (

          <div
            key={item.executionId}
            className="flex items-start gap-4"
          >

            <div
              className={`w-4 h-4 rounded-full mt-2 ${index % 3 === 0
                  ? "bg-green-400"
                  : index % 3 === 1
                    ? "bg-cyan-400"
                    : "bg-yellow-400"
                }`}
            />

            <div>

              <h3 className="font-semibold">
                {item.agent}
              </h3>

              <p className="text-gray-400 text-sm">
                Execution {item.executionId}
              </p>

              <p className="text-cyan-400 text-sm">
                {item.status}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}