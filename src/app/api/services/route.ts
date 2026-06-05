import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: { checks: { orderBy: { createdAt: "desc" }, take: 30 } },
  })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, url, description } = body
  if (!name || !url) {
    return NextResponse.json({ error: "name and url required" }, { status: 400 })
  }
  const service = await prisma.service.create({
    data: { name, url, description: description || null },
  })
  return NextResponse.json(service, { status: 201 })
}
