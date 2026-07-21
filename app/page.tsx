import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Background from "@/components/Background";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden flex flex-col justify-between">
      <Background />
      <Navbar />
      <Hero />
      <Features />

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 py-8 px-6 bg-[#03050f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-bold">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Agent Integrity Protocol<span className="text-cyan-400">.</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/dashboard" className="hover:text-cyan-400 transition-colors font-medium text-cyan-300">
              Open Dashboard
            </Link>
            <a
              href="https://github.com/Sanaya77/agent-integrity-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}