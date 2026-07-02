import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const agents = await Agent.find();

    return NextResponse.json(agents);
}

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();

    const agent = await Agent.create(body);

    return NextResponse.json(agent);
}