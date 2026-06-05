import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkUrl } from "@/lib/checker"

export async function GET() {
  const services = await prisma.service.findMany()
  const results = await Promise.allSettled(
    services.map(async (svc) => {
      const result = await checkUrl(svc.url)
      await prisma.check.create({
        data: {
          serviceId: svc.id,
          status: result.status,
          statusCode: result.statusCode,
          responseMs: result.responseMs,
          error: result.error,
        },
      })
      await prisma.service.update({
        where: { id: svc.id },
        data: { status: result.status, lastChecked: new Date(), responseMs: result.responseMs },
      })
      return { id: svc.id, name: svc.name, ...result }
    })
  )

  return NextResponse.json({
    checked: results.length,
    results: results.map((r) => (r.status === "fulfilled" ? r.value : { error: r.reason })),
  })
}
