import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Agent from "@/models/Agent";
import Execution from "@/models/Execution";
import Dispute from "@/models/Dispute";

const defaultAgents = [
  { name: "TravelGPT", type: "Travel Assistant", trustScore: 98, stake: 580, executions: 3248 },
  { name: "MedicalGPT", type: "Healthcare AI", trustScore: 97, stake: 640, executions: 2140 },
  { name: "ShoppingGPT", type: "E-Commerce", trustScore: 91, stake: 410, executions: 1825 },
  { name: "BookingBot", type: "Booking Engine", trustScore: 84, stake: 300, executions: 1102 },
];

const defaultExecutions = [
  { executionId: "0x81A2", agent: "TravelGPT", trust: 98, status: "Verified", hash: "0x91AD89A" },
  { executionId: "0x21FD", agent: "MedicalGPT", trust: 97, status: "Verified", hash: "0x7123AB9" },
  { executionId: "0xA920", agent: "ShoppingGPT", trust: 91, status: "Pending", hash: "0xAA2391F" },
  { executionId: "0xFFD2", agent: "BookingBot", trust: 84, status: "Challenged", hash: "0xB77291A" },
];

const defaultDisputes = [
  { executionId: "0xFFD2", reason: "Conflicting execution output", status: "Pending" },
  { executionId: "0xA920", reason: "Low confidence result", status: "Under Review" },
];

export async function GET() {
  try {
    await connectDB();

    let agents = await Agent.find().lean();
    let executions = await Execution.find().lean();
    let disputes = await Dispute.find().lean();

    if (!agents.length) agents = defaultAgents as any;
    if (!executions.length) executions = defaultExecutions as any;
    if (!disputes.length) disputes = defaultDisputes as any;

    const stats = {
      registeredAgents: agents.length,
      executionProofs: executions.length,
      trustScore:
        agents.length > 0
          ? (
              agents.reduce((sum: number, agent: any) => sum + (agent.trustScore || 0), 0) /
              agents.length
            ).toFixed(1)
          : "95.0",
      stakedTokens: agents.reduce((sum: number, agent: any) => sum + (agent.stake || 0), 0),
    };

    return NextResponse.json({
      stats,
      agents,
      executions,
      disputes,
    });
  } catch (err) {
    console.error("Database fetch error, using fallbacks:", err);
    return NextResponse.json({
      stats: {
        registeredAgents: defaultAgents.length,
        executionProofs: defaultExecutions.length,
        trustScore: "92.5",
        stakedTokens: 1930,
      },
      agents: defaultAgents,
      executions: defaultExecutions,
      disputes: defaultDisputes,
    });
  }
}