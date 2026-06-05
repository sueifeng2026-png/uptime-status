import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

function StatusBadge({ status }: { status: string }) {
  const colors = {
    up: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    down: "bg-red-500/20 text-red-400 border-red-500/30",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    investigating: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    identified: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    monitoring: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  }
  const labels: Record<string, string> = {
    up: "Operational", down: "Down", unknown: "Unknown",
    investigating: "Investigating", identified: "Identified",
    monitoring: "Monitoring", resolved: "Resolved",
  }
  const c = colors[status] || colors.unknown
  const l = labels[status] || labels.unknown
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

  const incidents = await prisma.incident.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: { select: { name: true } } },
    take: 5,
  })

  const viewCount = await prisma.pageView.count()

  const allUp = services.length > 0 && services.every((s) => s.status === "up")
  const anyDown = services.some((s) => s.status === "down")
  const uptimePercent = services.length > 0
    ? Math.round((services.filter(s => s.status === "up").length / services.length) * 100)
    : 100

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
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
        {services.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {uptimePercent}% uptime · {services.length} service{services.length > 1 ? "s" : ""} monitored
            {viewCount > 0 && <> · {viewCount.toLocaleString()} views</>}
          </p>
        )}
      </div>

      {/* Active Incidents */}
      {incidents.filter(i => i.status !== "resolved").length > 0 && (
        <div className="mb-6 bg-red-500/5 border border-red-500/20 rounded-xl p-4">
          <h3 className="font-semibold text-red-400 text-sm mb-3">
            🚨 Active Incident{incidents.filter(i => i.status !== "resolved").length > 1 ? "s" : ""}
          </h3>
          {incidents.filter(i => i.status !== "resolved").slice(0, 3).map((inc) => (
            <div key={inc.id} className="mb-2 last:mb-0">
              <div className="flex items-center gap-2">
                <StatusBadge status={inc.status} />
                <span className="text-sm font-medium">{inc.title}</span>
                <span className="text-xs text-gray-500">· {inc.service.name}</span>
              </div>
              {inc.description && <p className="text-xs text-gray-400 mt-1 ml-0">{inc.description}</p>}
            </div>
          ))}
        </div>
      )}

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
                <span>Last checked: {new Date(svc.lastChecked).toLocaleString()}</span>
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

      {/* Recent Incidents History */}
      {incidents.length > 0 && (
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="font-semibold text-sm mb-3">Recent Incidents</h3>
          <div className="space-y-2">
            {incidents.slice(0, 5).map((inc) => (
              <div key={inc.id} className="flex items-center gap-3 text-xs">
                <StatusBadge status={inc.status} />
                <span className="text-gray-300">{inc.title}</span>
                <span className="text-gray-600">· {inc.service.name}</span>
                <span className="text-gray-600 ml-auto">
                  {new Date(inc.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Managed Features Teaser */}
      <div className="mt-6 bg-gray-900 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">🔒 Managed Hosting Features</h3>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">$19 lifetime</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "📧", text: "Email alerts on downtime" },
            { icon: "🔔", text: "Slack / Discord notifications" },
            { icon: "🌐", text: "Custom domain (status.yours.com)" },
            { icon: "🎨", text: "White-label branding & logo" },
            { icon: "📊", text: "30-day uptime history" },
            { icon: "⚡", text: "30-second check intervals" },
            { icon: "🔒", text: "SSL certificate monitoring" },
            { icon: "👥", text: "Team access (multi-user)" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-500 py-1">
              <span className="opacity-50">{f.icon}</span>
              <span className="line-through">{f.text}</span>
              <span className="text-[10px] text-emerald-600 ml-auto">PRO</span>
            </div>
          ))}
        </div>
        <Link
          href="/pricing"
          className="mt-4 inline-block w-full text-center bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Unlock All Features → $19 lifetime
        </Link>
      </div>

      {/* Status Badge */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-2">Embed Status Badge</h3>
        <p className="text-xs text-gray-400 mb-3">
          Add a live status badge to your README or website:
        </p>
        <div className="bg-gray-950 border border-gray-700 rounded-lg p-3 overflow-x-auto">
          <code className="text-xs text-gray-300 whitespace-nowrap">
            {"[![Status](YOUR_DOMAIN/api/badge)](YOUR_DOMAIN/status)"}
          </code>
        </div>
        <div className="mt-3 flex justify-center">
          <img src="/api/badge" alt="System Status" className="h-5" />
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-gray-800 rounded-xl p-6 text-center">
        <p className="text-emerald-400 font-medium text-lg mb-2">Powered by Uptime Status</p>
        <p className="text-gray-400 text-sm mb-4">
          Self-host for free. Want automatic alerts, custom domain, and zero maintenance?
          {" "}Let us host it for you.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            See Plans
          </Link>
          <a
            href="https://www.buymeacoffee.com/willy2023"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Buy Me a Coffee
          </a>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-600">
        Powered by{" "}
        <a href="https://github.com/willy2023/uptime-status" className="underline hover:text-gray-400">
          Uptime Status
        </a>{" "}
        -- self-hosted uptime monitoring
      </div>
    </div>
  )
}