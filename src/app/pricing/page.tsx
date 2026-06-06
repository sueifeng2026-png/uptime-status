export default function PricingPage() {
  const plans = [
    {
      name: "Self-Hosted",
      price: "Free",
      period: "forever",
      desc: "Deploy on your own server. You control everything.",
      features: [
        "Unlimited services to monitor",
        "HTTP health checks (5 min interval)",
        "Public status dashboard",
        "Admin panel (CRUD services)",
        "Uptime bar charts",
        "Response time tracking",
        "SQLite zero-config database",
        "Docker support",
        "MIT License (do whatever you want)",
      ],
      cta: "View on GitHub",
      href: "https://github.com/sueifeng2026-png/uptime-status",
      featured: false,
      emoji: "🚀",
    },
    {
      name: "Managed Hosting",
      price: "$19",
      period: "one-time",
      desc: "We host it for you. Zero setup. Lifetime access.",
      features: [
        "Everything in Self-Hosted, plus:",
        "Instant setup -- live in 60 seconds",
        "Automatic SSL & CDN",
        "Always online, no server management",
        "Automatic updates & security patches",
        "Email alerts when services go down",
        "Custom domain support",
        "Priority support via email",
        "Lifetime access, no recurring fees",
      ],
      cta: "Get Managed Hosting",
      href: "https://sueifeng2026-png.gumroad.com/l/uptime-status",
      featured: true,
      emoji: "⚡",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "one-time",
      desc: "For teams. Custom setup, SLA, priority everything.",
      features: [
        "Everything in Managed, plus:",
        "White-label (your logo & branding)",
        "Multi-user admin access",
        "SLA guarantee (99.9% uptime)",
        "Custom monitoring intervals (down to 30s)",
        "API access for automation",
        "Dedicated support engineer",
        "On-premise deployment option",
      ],
      cta: "Contact Us",
      href: "https://www.buymeacoffee.com/sueifeng2026-png",
      featured: false,
      emoji: "🏢",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Simple, transparent pricing</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Self-host for free, or let us handle the hosting. One payment, lifetime access. No subscriptions, no surprises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              plan.featured
                ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                : "border-gray-800 bg-gray-900/50"
            }`}
          >
            {plan.featured && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit mb-4">
                MOST POPULAR
              </span>
            )}
            <div className="mb-4">
              <span className="text-2xl">{plan.emoji}</span>
              <h2 className="text-xl font-bold mt-2">{plan.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{plan.desc}</p>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm ml-1">/{plan.period}</span>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1 text-sm">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                plan.featured
                  ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center border-t border-gray-800 pt-10">
        <h3 className="text-xl font-bold mb-3">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left max-w-3xl mx-auto">
          {[
            {
              q: "Is the self-hosted version really free?",
              a: "Yes, absolutely. MIT licensed. No telemetry, no tracking, no paywalls. The code is on GitHub.",
            },
            {
              q: "What payment methods do you accept?",
              a: "Gumroad supports credit cards and PayPal. Buy Me a Coffee accepts cards, Apple Pay, and more.",
            },
            {
              q: "Can I upgrade from Self-Hosted to Managed later?",
              a: "Yes! We will help you migrate your data. Just purchase the Managed plan and reach out.",
            },
            {
              q: "Is there a refund policy?",
              a: "30-day money-back guarantee on Managed Hosting. No questions asked.",
            },
          ].map((faq, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h4 className="font-semibold text-gray-200 mb-1">{faq.q}</h4>
              <p className="text-sm text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}