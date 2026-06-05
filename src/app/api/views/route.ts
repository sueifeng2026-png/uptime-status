import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const count = await prisma.pageView.count()
  return NextResponse.json({ views: count })
}

export async function POST(req: NextRequest) {
  const { path } = await req.json()
  await prisma.pageView.create({ data: { path: path || "/" } })
  // Return total count for social proof
  const count = await prisma.pageView.count()
  return NextResponse.json({ views: count }, { status: 201 })
}