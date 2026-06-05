import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
    include: { checks: { orderBy: { createdAt: "desc" }, take: 100 } },
  })
  if (!service) return NextResponse.json({ error: "not found" }, { status: 404 })
  return NextResponse.json(service)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  const { name, url, description } = body
  const service = await prisma.service.update({
    where: { id: params.id },
    data: { name, url, description },
  })
  return NextResponse.json(service)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.service.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
