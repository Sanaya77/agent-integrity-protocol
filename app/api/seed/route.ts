import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Agent from "@/models/Agent";
import Execution from "@/models/Execution";
import Dispute from "@/models/Dispute";

export async function GET() {
    await connectDB();

    // Clear old data
    await Agent.deleteMany({});
    await Execution.deleteMany({});
    await Dispute.deleteMany({});

    // Seed Agents
    await Agent.insertMany([
        {
            name: "TravelGPT",
            type: "Travel",
            trustScore: 98,
            stake: 580,
            executions: 3248,
        },
        {
            name: "MedicalGPT",
            type: "Healthcare",
            trustScore: 97,
            stake: 640,
            executions: 2140,
        },
        {
            name: "ShoppingGPT",
            type: "E-Commerce",
            trustScore: 91,
            stake: 410,
            executions: 1825,
        },
        {
            name: "BookingBot",
            type: "Booking",
            trustScore: 84,
            stake: 300,
            executions: 1102,
        },
    ]);

    // Seed Executions
    await Execution.insertMany([
        {
            executionId: "0x81A2",
            agent: "TravelGPT",
            trust: 98,
            status: "Verified",
            hash: "0x91AD89A",
        },
        {
            executionId: "0x21FD",
            agent: "MedicalGPT",
            trust: 97,
            status: "Verified",
            hash: "0x7123AB9",
        },
        {
            executionId: "0xA920",
            agent: "ShoppingGPT",
            trust: 91,
            status: "Pending",
            hash: "0xAA2391F",
        },
        {
            executionId: "0xFFD2",
            agent: "BookingBot",
            trust: 84,
            status: "Challenged",
            hash: "0xB77291A",
        },
    ]);

    // Seed Disputes
    await Dispute.insertMany([
        {
            executionId: "0xFFD2",
            reason: "Conflicting execution output",
            status: "Pending",
        },
        {
            executionId: "0xA920",
            reason: "Low confidence result",
            status: "Under Review",
        },
    ]);

    return NextResponse.json({
        success: true,
        message: "Database seeded successfully 🚀",
    });
}