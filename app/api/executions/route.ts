import { connectDB } from "@/lib/mongodb";
import Execution from "@/models/Execution";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const executions = await Execution.find();

    return NextResponse.json(executions);
}

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();

    const execution = await Execution.create(body);

    return NextResponse.json(execution);
}