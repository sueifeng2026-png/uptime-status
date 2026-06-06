"use client"

import { useState } from "react"

export default function SharePage() {
  const demoUrl = "https://666d77c7371fc606-186-18-100-79.serveousercontent.com"
  const [copied, setCopied] = useState(false)

  const redditText = `Title: I built a free, self-hosted status page (MIT, Next.js + SQLite)

Body:
Hey r/selfhosted! Got tired of paying for status page services, so I built my own.

**Live demo**: ${demoUrl}/status

**Features**:
- Monitor HTTP endpoints
- Beautiful public status dashboard (dark theme)  
- Admin panel to manage services
- Response time tracking + uptime bars
- Embeddable status badge for README
- SQLite (zero external deps)
- Docker support

**License**: MIT. Self-host for free, or managed hosting for $19 lifetime.

Would love feedback!`

  const title = encodeURIComponent("I built a free, self-hosted status page (MIT, Next.js + SQLite)")
  const hnTitle = encodeURIComponent("Show HN: Uptime Status - Free, self-hosted status page (MIT)")
  const tweet = encodeURIComponent(
    `I built a free, self-hosted status page in 3 days. MIT licensed, SQLite, deploy anywhere. Live demo: ${demoUrl}/status`
  )

  const links = [
    {
      name: "Reddit r/selfhosted",
      emoji: "💬",
      desc: "Most active self-hosted community. Perfect audience.",
      color: "bg-orange-500 hover:bg-orange-400",
      href: `https://www.reddit.com/r/selfhosted/submit?title=${title}&url=${encodeURIComponent(demoUrl)}&text=${encodeURIComponent(redditText.split("Body:")[1] || "")}`,
    },
    {
      name: "Hacker News",
      emoji: "🔥",
      desc: "Show HN gets massive traffic. Our target audience lives here.",
      color: "bg-orange-600 hover:bg-orange-500",
      href: `https://news.ycombinator.com/submit?u=${encodeURIComponent(demoUrl)}&t=${hnTitle}`,
    },
    {
      name: "Twitter / X",
      emoji: "🐦",
      desc: "Quick tweet to your followers.",
      color: "bg-sky-500 hover:bg-sky-400",
      href: `https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(demoUrl)}`,
    },
    {
      name: "Dev.to",
      emoji: "📝",
      desc: "Developer community. Copy the article from content/article-1-build-log.md",
      color: "bg-indigo-500 hover:bg-indigo-400",
      href: "https://dev.to/new",
    },
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(redditText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Share Uptime Status 🚀</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Help spread the word! Click any platform below to share with a pre-filled post.
          Each share brings us closer to $100.
        </p>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`block ${link.color} text-white rounded-xl p-5 transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{link.emoji}</span>
              <div>
                <h3 className="font-bold text-lg">{link.name}</h3>
                <p className="text-sm text-white/80">{link.desc}</p>
              </div>
              <span className="ml-auto text-2xl">→</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-3">Copy-Paste Reddit Post</h3>
        <textarea
          readOnly
          className="w-full h-48 bg-gray-950 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 font-mono resize-none"
          value={redditText}
        />
        <button
          onClick={handleCopy}
          className="mt-3 bg-gray-800 hover:bg-gray-700 text-sm px-4 py-2 rounded-lg border border-gray-700"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  )
}