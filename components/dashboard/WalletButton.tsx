"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";
import { Wallet, Loader2, Check, Copy } from "lucide-react";

interface Props {
  showToast?: (msg: string, type?: "success" | "error" | "info") => void;
}

export default function WalletButton({ showToast }: Props) {
  const [wallet, setWallet] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function connectWallet() {
    if (wallet) {
      // Copy address if already connected
      navigator.clipboard.writeText(wallet);
      setCopied(true);
      if (showToast) showToast("Wallet address copied to clipboard!", "info");
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    if (typeof window === "undefined" || !(window as any).ethereum) {
      if (showToast) {
        showToast("MetaMask is not detected. Using simulated local Web3 environment.", "info");
      }
      // Demo fallback wallet address
      const demoAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      setWallet(demoAddress);
      return;
    }

    try {
      setConnecting(true);
      const provider = new BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet(address);
      if (showToast) showToast(`Connected wallet: ${address.slice(0, 6)}...${address.slice(-4)}`, "success");
    } catch (err: any) {
      console.error(err);
      if (showToast) showToast(err.message || "Wallet connection rejected", "error");
    } finally {
      setConnecting(false);
    }
  }

  return (
    <button
      onClick={connectWallet}
      disabled={connecting}
      className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-lg ${
        wallet
          ? "bg-[#0c152a] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 shadow-cyan-500/10"
          : "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-cyan-500/25 hover:scale-105"
      }`}
    >
      {connecting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-black" />
          <span>Connecting...</span>
        </>
      ) : wallet ? (
        <>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>{`${wallet.slice(0, 6)}...${wallet.slice(-4)}`}</span>
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4 text-black" />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
}