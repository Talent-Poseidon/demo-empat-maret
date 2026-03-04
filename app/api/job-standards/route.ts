import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET handler
export async function GET() {
  const jobStandards = await prisma.JobStandard.findMany();
  return NextResponse.json(jobStandards);
}

// POST handler
export async function POST(request: NextRequest) {
  const body = await request.json();
  const jobStandard = await prisma.JobStandard.create({ data: body });
  return NextResponse.json(jobStandard, { status: 201 });
}
