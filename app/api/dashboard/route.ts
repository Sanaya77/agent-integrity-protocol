import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Agent from "@/models/Agent";
import Execution from "@/models/Execution";
import Dispute from "@/models/Dispute";

export async function GET() {
    await connectDB();

    const agents = await Agent.find().lean();
    const executions = await Execution.find().lean();
    const disputes = await Dispute.find().lean();

    const stats = {
        registeredAgents: agents.length,
        executionProofs: executions.length,
        trustScore:
            agents.length > 0
                ? (
                    agents.reduce(
                        (sum: number, agent: any) => sum + agent.trustScore,
                        0
                    ) / agents.length
                ).toFixed(1)
                : 0,
        stakedTokens: agents.reduce(
            (sum: number, agent: any) => sum + agent.stake,
            0
        ),
    };

    return NextResponse.json({
        stats,
        agents,
        executions,
        disputes,
    });
}