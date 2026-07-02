import { connectDB } from "@/lib/mongodb";
import Dispute from "@/models/Dispute";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    const disputes = await Dispute.find();

    return NextResponse.json(disputes);
}

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();

    const dispute = await Dispute.create(body);

    return NextResponse.json(dispute);
}