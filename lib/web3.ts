"use client";

import { BrowserProvider, Contract } from "ethers";
import { ABI } from "./abi";

const CONTRACT_ADDRESS =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function getContract() {
    if (!(window as any).ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const ethereum = (window as any).ethereum;

    // Request wallet connection
    await ethereum.request({
        method: "eth_requestAccounts",
    });

    // Switch to Hardhat Local (31337)
    try {
        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7A69" }], // 31337 in hex
        });
    } catch (switchError: any) {
        // If the network doesn't exist, add it
        if (switchError.code === 4902) {
            await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x7A69",
                        chainName: "Hardhat Local",
                        nativeCurrency: {
                            name: "Ethereum",
                            symbol: "ETH",
                            decimals: 18,
                        },
                        rpcUrls: ["http://127.0.0.1:8545"],
                    },
                ],
            });
        } else {
            throw switchError;
        }
    }

    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    return new Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
    );
}