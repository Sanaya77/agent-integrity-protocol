"use client";

import { BrowserProvider, Contract } from "ethers";
import { ABI } from "./abi";

const CONTRACT_ADDRESS =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getContract() {
    if (!(window as any).ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const provider = new BrowserProvider(
        (window as any).ethereum
    );

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    return new Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
    );
}