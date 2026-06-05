import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const incidents = await prisma.incident.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { name: true } } },
    take: 20,
  })
  return NextResponse.json(incidents)
}

export async function POST(req: NextRequest) {
  const { serviceId, title, description, status } = await req.json()
  if (!serviceId || !title) {
    return NextResponse.json({ error: "serviceId and title required" }, { status: 400 })
  }
  const incident = await prisma.incident.create({
    data: { serviceId, title, description, status: status || "investigating" },
    include: { service: { select: { name: true } } },
  })
  return NextResponse.json(incident, { status: 201 })
}