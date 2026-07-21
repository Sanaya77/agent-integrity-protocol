"use client";

import Link from "next/link";
import { Shield, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#050816]/70 border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            AIP<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/dashboard" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            Dashboard
          </Link>
          <a href="#features" className="hover:text-cyan-400 transition-colors">
            Protocol
          </a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">
            Architecture
          </a>
          <a
            href="https://github.com/Sanaya77/agent-integrity-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            SDK & Docs <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a
            href="https://github.com/Sanaya77/agent-integrity-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Launch App
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f24] border-b border-cyan-500/20 px-6 py-4 flex flex-col gap-4 text-gray-300 animate-in slide-in-from-top-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-2"
          >
            Protocol
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-cyan-400 transition-colors py-2"
          >
            Architecture
          </a>
          <a
            href="https://github.com/Sanaya77/agent-integrity-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors py-2"
          >
            GitHub & Docs
          </a>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-xl font-semibold bg-cyan-500 text-black"
          >
            Launch App
          </Link>
        </div>
      )}
    </nav>
  );
}