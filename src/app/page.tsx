export default function Home() {
  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"
    }}>
      <div style={{ textAlign: "center", padding: "80px 20px 40px", maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.8em", marginBottom: 16, color: "#4ade80" }}>Uptime Status</h1>
        <p style={{ fontSize: "1.2em", color: "#999", marginBottom: 32, lineHeight: 1.6 }}>
          Lightweight self-hosted status page & uptime monitor. Monitor your services, display a beautiful public status page. MIT licensed, SQLite, zero config.
        </p>
        <a href="/status" style={{
          display: "inline-block", padding: "14px 32px", borderRadius: 10, fontSize: "1.1em",
          fontWeight: 600, textDecoration: "none", background: "#4ade80", color: "#000", margin: 6
        }}>Live Demo</a>
        <a href="/pricing" style={{
          display: "inline-block", padding: "14px 32px", borderRadius: 10, fontSize: "1.1em",
          fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.08)",
          color: "#ccc", border: "1px solid rgba(255,255,255,0.12)", margin: 6
        }}>Pricing</a>
      </div>

      <div style={{ maxWidth: 800, margin: "40px auto", padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {[
          ["Service Monitoring", "Add HTTP endpoints, auto health checks every 5 min with response time tracking."],
          ["Public Dashboard", "Beautiful dark-themed status page your users can check anytime."],
          ["Status Badge", "Embeddable SVG badge for your README. Always shows live status."],
          ["Admin Panel", "CRUD services, trigger on-demand checks, view uptime history."],
          ["Zero Dependencies", "SQLite database. No PostgreSQL. No Redis. Just clone and run."],
          ["Docker Support", "Comes with docker-compose. Deploy anywhere in 5 minutes."]
        ].map(([title, desc]) => (
          <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: "1.1em", marginBottom: 8, color: "#4ade80" }}>{title}</h3>
            <p style={{ fontSize: "0.9em", color: "#888", lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8em", marginBottom: 24 }}>Simple Pricing</h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            ["Self-Hosted", "Free", "MIT License. Your server, your data.", false],
            ["Managed", "$19", "We host it. Alerts, SSL, updates.", true],
            ["Enterprise", "$99", "White-label, SLA, priority support.", false]
          ].map(([name, price, desc, featured]) => (
            <div key={String(name)} style={{
              background: featured ? "rgba(74,222,128,0.05)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${featured ? "#4ade80" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 12, padding: 24, width: 200, textAlign: "center"
            }}>
              <h4 style={{ marginBottom: 8 }}>{name}</h4>
              <div style={{ fontSize: "2em", fontWeight: 700, color: "#4ade80", margin: "12px 0" }}>{price}</div>
              <div style={{ fontSize: "0.8em", color: "#888", marginBottom: 8 }}>one-time</div>
              <p style={{ color: featured ? "#4ade80" : "#888", fontSize: "0.85em" }}>{desc}</p>
            </div>
          ))}
        </div>
        <br />
        <a href="https://www.buymeacoffee.com/sueifeng2026-png" style={{
          display: "inline-block", padding: "14px 32px", borderRadius: 10, fontSize: "1.1em",
          fontWeight: 600, textDecoration: "none", background: "#4ade80", color: "#000"
        }}>Buy Me a Coffee</a>
      </div>

      <div style={{ textAlign: "center", padding: "40px 20px", color: "#555", fontSize: "0.85em" }}>
        Built with Next.js 14, Prisma, SQLite, Tailwind CSS. MIT Licensed.
      </div>
    </div>
  )
}