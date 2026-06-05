import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkUrl } from "@/lib/checker"

export async function POST(req: NextRequest) {
  const { serviceId } = await req.json()
  if (!serviceId) return NextResponse.json({ error: "serviceId required" }, { status: 400 })

  const service = await prisma.service.findUnique({ where: { id: serviceId } })
  if (!service) return NextResponse.json({ error: "service not found" }, { status: 404 })

  const result = await checkUrl(service.url)

  const check = await prisma.check.create({
    data: {
      serviceId: service.id,
      status: result.status,
      statusCode: result.statusCode,
      responseMs: result.responseMs,
      error: result.error,
    },
  })

  await prisma.service.update({
    where: { id: service.id },
    data: { status: result.status, lastChecked: new Date(), responseMs: result.responseMs },
  })

  return NextResponse.json(check)
}
