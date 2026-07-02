export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">

        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/20 mb-6">
            🚀 Introducing Agent Integrity Protocol
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            The
            <span className="text-cyan-400"> Trust Layer </span>
            for Autonomous AI
          </h1>

          <p className="mt-8 text-gray-400 text-xl leading-relaxed max-w-xl">
            AIP enables AI agents to prove their actions, build trust through
            cryptographic execution proofs, and participate in decentralized
            dispute resolution.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="px-8 py-4 bg-cyan-500 rounded-full font-semibold text-lg hover:scale-105 transition">
              Explore Protocol
            </button>

            <button className="px-8 py-4 border border-cyan-400 rounded-full font-semibold text-lg hover:bg-cyan-500/10 transition">
              Read Whitepaper
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 blur-3xl opacity-40 absolute"></div>

          <div className="relative w-[400px] h-[400px] border border-cyan-400/20 rounded-3xl backdrop-blur-xl bg-white/5 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Execution Proof Object
              </h2>

              <div className="space-y-3 text-left text-gray-300">

                <div>✔ Intent</div>

                <div>✔ Constraints</div>

                <div>✔ Tool Calls</div>

                <div>✔ Outputs</div>

                <div>✔ Signature</div>

                <div>✔ On-chain Hash</div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}