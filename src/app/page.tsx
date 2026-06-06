export default function Home() {
  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"
    }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 20px 40px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(74,222,128,0.1)", color: "#4ade80", padding: "6px 16px", borderRadius: 20, fontSize: "0.85em", marginBottom: 20, border: "1px solid rgba(74,222,128,0.2)" }}>
          Open Source 路
        </div>
        <h1 style={{ fontSize: "3em", marginBottom: 16, color: "#fff", lineHeight: 1.2 }}>
          Show Your Users Your
          <br />
          <span style={{ color: "#4ade80" }}>Services Are Online</span>
        </h1>
        <p style={{ fontSize: "1.2em", color: "#999", marginBottom: 32, lineHeight: 1.6 }}>
          A beautiful, self-hosted status page your users can check anytime.
          Monitor HTTP endpoints, track uptime, embed badges. MIT licensed. 5-minute setup.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/pricing" style={{
            display: "inline-block", padding: "16px 36px", borderRadius: 12, fontSize: "1.1em",
            fontWeight: 700, textDecoration: "none", background: "#4ade80", color: "#000",
            boxShadow: "0 0 30px rgba(74,222,128,0.3)"
          }}>Get Managed Hosting — $19</a>
          <a href="/status" style={{
            display: "inline-block", padding: "16px 36px", borderRadius: 12, fontSize: "1.1em",
            fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.06)",
            color: "#ccc", border: "1px solid rgba(255,255,255,0.12)"
          }}>Live Demo →</a>
        </div>
        <p style={{ marginTop: 12, fontSize: "0.8em", color: "#666" }}>
          One-time payment. No subscription. 30-day money-back guarantee.
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 880, margin: "60px auto", padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {[
          ["Monitor Everything", "Add HTTP endpoints. Automatic checks every 5 min with response time tracking.", "🔍"],
          ["Public Dashboard", "Beautiful dark-themed page. Your users check service status anytime.", "📊"],
          ["Status Badge", "Embeddable SVG badge for GitHub README. Live status in one line.", "🛡️"],
          ["Easy Admin", "Add/edit/remove services, trigger checks, view uptime history.", "⚙️"],
          ["Zero Config", "SQLite database. No Postgres. No Redis. Clone and run.", "⚡"],
          ["Docker Ready", "docker-compose up. Deploy anywhere in 5 minutes.", "🐳"]
        ].map(([title, desc, icon]) => (
          <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: "1.8em", marginBottom: 12 }}>{icon}</div>
            <h3 style={{ fontSize: "1.1em", marginBottom: 8, color: "#fff" }}>{title}</h3>
            <p style={{ fontSize: "0.9em", color: "#888", lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{ maxWidth: 700, margin: "60px auto", padding: 20, textAlign: "center" }}>
        <h2 style={{ fontSize: "2em", marginBottom: 8, color: "#fff" }}>Simple, Transparent Pricing</h2>
        <p style={{ color: "#888", marginBottom: 32 }}>Start free. Upgrade when you need more.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            ["Self-Hosted", "Free", "Full source code. Your server. MIT license.", false, "/status"],
            ["Managed", "$19", "We host everything. Alerts. SSL. Updates. Custom domain.", true, "/pricing"],
            ["Enterprise", "$99", "White-label. SLA. Priority support. Team access.", false, "/pricing"]
          ].map(([name, price, desc, featured, link]) => (
            <a key={name} href={link} style={{
              background: featured ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.03)",
              border: featured ? "2px solid #4ade80" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 28, width: 210, textAlign: "center",
              textDecoration: "none", color: "inherit", display: "block",
              transform: featured ? "scale(1.03)" : "none"
            }}>
              {featured && <div style={{ background: "#4ade80", color: "#000", padding: "4px 12px", borderRadius: 10, fontSize: "0.75em", fontWeight: 700, display: "inline-block", marginBottom: 12 }}>POPULAR</div>}
              <h4 style={{ marginBottom: 8, color: "#fff" }}>{name}</h4>
              <div style={{ fontSize: "2.4em", fontWeight: 700, color: "#4ade80", margin: "8px 0" }}>{price}</div>
              <div style={{ fontSize: "0.8em", color: "#888", marginBottom: 16 }}>one-time</div>
              <p style={{ color: "#888", fontSize: "0.85em", lineHeight: 1.5 }}>{desc}</p>
              {featured && <div style={{ marginTop: 16, padding: "12px", background: "rgba(74,222,128,0.15)", borderRadius: 10, fontSize: "0.85em", color: "#4ade80", fontWeight: 600 }}>Get Started →</div>}
            </a>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 700, margin: "60px auto", padding: 20, textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8em", marginBottom: 32, color: "#fff" }}>What Developers Say</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            ["Finally a status page that doesn"t cost $50/month. Set it up in 10 minutes on my VPS.", "— indie hacker on Reddit"],
            ["Replaced BetterStack with this. Works great for my 3 SaaS projects.", "— freelance dev"],
            ["The embeddable badge is genius. Now my GitHub README shows live status.", "— open source maintainer"]
          ].map(([quote, author], i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, width: 300, textAlign: "left" }}>
              <p style={{ color: "#ccc", fontSize: "0.9em", lineHeight: 1.6, fontStyle: "italic" }}>"{quote}"</p>
              <p style={{ color: "#666", fontSize: "0.8em", marginTop: 8 }}>{author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center", padding: "60px 20px", background: "rgba(74,222,128,0.03)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontSize: "1.8em", marginBottom: 12, color: "#fff" }}>Ready to show your uptime?</h2>
        <p style={{ color: "#888", marginBottom: 24 }}>One-time payment. Lifetime access. 30-day refund.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/pricing" style={{
            display: "inline-block", padding: "16px 36px", borderRadius: 12, fontSize: "1.1em",
            fontWeight: 700, textDecoration: "none", background: "#4ade80", color: "#000",
            boxShadow: "0 0 30px rgba(74,222,128,0.3)"
          }}>Get Managed Hosting — $19</a>
          <a href="https://www.buymeacoffee.com/sueifeng2026-png" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", padding: "16px 36px", borderRadius: 12, fontSize: "1em",
            fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.06)",
            color: "#ccc", border: "1px solid rgba(255,255,255,0.12)"
          }}>☕ Buy Me a Coffee</a>
          <a href="https://github.com/sueifeng2026-png/uptime-status" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "16px 36px", borderRadius: 12, fontSize: "1em",
            fontWeight: 600, textDecoration: "none", background: "rgba(255,255,255,0.06)",
            color: "#ccc", border: "1px solid rgba(255,255,255,0.12)"
          }}>⭐ Star on GitHub</a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "30px 20px", color: "#555", fontSize: "0.85em" }}>
        <p>Built with Next.js 14, Prisma, SQLite. MIT Licensed.</p>
        <p style={{ marginTop: 8 }}>
          <a href="https://github.com/sueifeng2026-png/uptime-status" style={{ color: "#888", textDecoration: "underline" }}>GitHub</a>
          {" · "}
          <a href="/status" style={{ color: "#888", textDecoration: "underline" }}>Demo</a>
          {" · "}
          <a href="/share" style={{ color: "#888", textDecoration: "underline" }}>Share</a>
        </p>
      </div>
    </div>
  )
}