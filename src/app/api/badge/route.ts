import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

function svgBadge(label: string, status: string, color: string) {
  const labelWidth = label.length * 7 + 20
  const statusWidth = status.length * 7 + 20
  const totalWidth = labelWidth + statusWidth

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#555"/>
    <stop offset="100%" stop-color="#333"/>
  </linearGradient>
  <rect width="${totalWidth}" height="20" rx="3" fill="#555"/>
  <rect width="${labelWidth}" height="20" rx="3" fill="url(#g)"/>
  <rect x="${labelWidth}" width="${statusWidth}" height="20" rx="3" fill="${color}"/>
  <rect x="${labelWidth}" width="${statusWidth}" height="20" rx="3" fill="${color}"/>
  <rect x="${labelWidth}" width="13" height="20" fill="${color}"/>
  <text x="${labelWidth / 2}" y="14" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11" fill="#ccc">${label}</text>
  <text x="${labelWidth + statusWidth / 2}" y="14" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11" fill="#fff">${status}</text>
</svg>`

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  })
}

export async function GET() {
  const services = await prisma.service.findMany()
  const allUp = services.length > 0 && services.every((s) => s.status === "up")
  const anyDown = services.some((s) => s.status === "down")

  if (services.length === 0) {
    return svgBadge("status", "no services", "#9e9e9e")
  }

  if (allUp) {
    return svgBadge("status", "all systems operational", "#4caf50")
  }

  if (anyDown) {
    const downCount = services.filter((s) => s.status === "down").length
    return svgBadge("status", `${downCount} service${downCount > 1 ? "s" : ""} down`, "#e53935")
  }

  return svgBadge("status", "checking", "#ff9800")
}