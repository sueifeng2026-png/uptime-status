import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

function StatusBadge({ status }: { status: string }) {
  const colors = {
    up: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    down: "bg-red-500/20 text-red-400 border-red-500/30",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }
  const labels = { up: "Operational", down: "Down", unknown: "Unknown" }
  const c = colors[status as keyof typeof colors] || colors.unknown
  const l = labels[status as keyof typeof labels] || labels.unknown
  return <span className={`text-xs px-2.5 py-1 rounded-full border ${c}`}>{l}</span>
}

function UptimeBar({ checks }: { checks: { status: string }[] }) {
  const recent = checks.slice(0, 90)
  return (
    <div className="flex gap-0.5">
      {recent.map((c, i) => (
        <div
          key={i}
          className={`h-5 w-2 rounded-sm ${c.status === "up" ? "bg-emerald-500" : "bg-red-500"}`}
          title={`Check ${i + 1}: ${c.status}`}
        />
      ))}
      {recent.length === 0 && <span className="text-xs text-gray-500 italic">No data yet</span>}
    </div>
  )
}

export default async function StatusPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
    include: { checks: { orderBy: { createdAt: "desc" }, take: 90 } },
  })

  const allUp = services.length > 0 && services.every((s) => s.status === "up")
  const anyDown = services.some((s) => s.status === "down")

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">System Status</h1>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${allUp ? "bg-emerald-400" : anyDown ? "bg-red-400" : "bg-yellow-400"}`}
          />
          <span className="text-lg font-medium">
            {allUp ? "All Systems Operational" : anyDown ? "Some Systems Down" : "Checking..."}
          </span>
        </div>
      </div>

      {/* Service list */}
      <div className="space-y-3">
        {services.map((svc) => (
          <div key={svc.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{svc.name}</h3>
                {svc.description && <p className="text-sm text-gray-400 mt-0.5">{svc.description}</p>}
              </div>
              <StatusBadge status={svc.status} />
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              {svc.responseMs != null && <span>Response: {svc.responseMs}ms</span>}
              {svc.lastChecked && (
                <span>
                  Last checked: {new Date(svc.lastChecked).toLocaleString()}
                </span>
              )}
            </div>
            <div className="mt-3">
              <UptimeBar checks={svc.checks} />
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No services monitored yet.</p>
            <p className="text-sm mt-1">Add services from the admin panel.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-gray-600">
        Powered by{" "}
        <a href="https://github.com" className="underline hover:text-gray-400">
          Uptime Status
        </a>{" "}
        �� self-hosted uptime monitoring
      </div>
    </div>
  )
}
