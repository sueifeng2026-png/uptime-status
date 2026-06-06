import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import ViewTracker from "@/components/ViewTracker"

export const metadata: Metadata = {
  title: "Uptime Status — Self-Hosted Status Page & Uptime Monitor",
  description: "Free, open-source status page. Monitor HTTP endpoints, show uptime to users. MIT licensed, self-hosted, 5-min setup. Managed hosting available for $19.",
  keywords: ["uptime", "status page", "monitoring", "self-hosted", "open source", "nextjs"],
  openGraph: {
    title: "Uptime Status — Beautiful Self-Hosted Status Page",
    description: "Free MIT-licensed status page & uptime monitor. Monitor services, embed badges. $19 managed hosting available.",
    type: "website",
    siteName: "Uptime Status",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptime Status — Self-Hosted Status Page",
    description: "Free MIT-licensed status page & uptime monitor. $19 managed hosting available.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">
        <ViewTracker />
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
          <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between">
            <Link href="/status" className="font-bold text-emerald-400 tracking-tight">
              Uptime Status
            </Link>
            <div className="flex items-center gap-4 md:gap-6 text-sm">
              <Link href="/status" className="text-gray-400 hover:text-gray-200 transition-colors">
                Status
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-gray-200 transition-colors">
                Pricing
              </Link>
              <Link href="/share" className="text-gray-400 hover:text-gray-200 transition-colors">
                Share
              </Link>
              <Link href="/admin" className="text-gray-400 hover:text-gray-200 transition-colors">
                Admin
              </Link>
              <a
                href="https://github.com/sueifeng2026-png/uptime-status"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors hidden md:block"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}