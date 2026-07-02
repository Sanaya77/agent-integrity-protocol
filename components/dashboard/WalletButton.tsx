"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletButton() {
    const [wallet, setWallet] = useState("");

    async function connectWallet() {
        if (!(window as any).ethereum) {
            alert("Please install MetaMask.");
            return;
        }

        const provider = new BrowserProvider(
            (window as any).ethereum
        );

        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        setWallet(address);
    }

    return (
        <button
            onClick={connectWallet}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
        >
            {wallet
                ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                : "Connect Wallet"}
        </button>
    );
}