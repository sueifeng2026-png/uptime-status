# I Built a Self-Hosted Status Page in 3 Days (And Open-Sourced It)

**Target platforms**: Dev.to, Medium, 条署, Hacker News (Show HN)

---

Every SaaS needs a status page. But the options suck:

- **BetterStack**: Free tier is too limited, paid starts at $24/month
- **Freshping**: Works but locked into their ecosystem
- **Atlassian Statuspage**: Starts at $99/month ??

So I built my own. In 3 days. And I'm giving it away for free.

## What I Built

**Uptime Status** is a lightweight, self-hosted status page that:
- Monitors HTTP endpoints with configurable intervals
- Shows a beautiful public status dashboard
- Tracks response times and uptime history
- Has a simple admin panel for managing services
- Uses SQLite ！ zero external dependencies

## The Tech Stack

- **Next.js 14** (App Router) ！ for the full-stack experience
- **Prisma + SQLite** ！ because I don't want to manage a database
- **Tailwind CSS** ！ because writing CSS from scratch is 2022
- **TypeScript** ！ because I'm not a savage

The entire app is ~800 lines of code. That's it.

## Why Open Source?

1. **Trust**: You can see exactly what it does. No telemetry, no tracking.
2. **Customization**: Fork it, modify it, make it yours.
3. **Community**: I want feedback and contributions.

## How to Deploy

```bash
git clone https://github.com/YOUR_USERNAME/uptime-status
cd uptime-status
npm install
npx prisma db push
npm run dev
```

Or deploy to Vercel with one click. (I'll add a Deploy button soon.)

## What's Next

- [ ] Email/Slack notifications
- [ ] Incident management
- [ ] Custom CSS themes
- [ ] Managed hosting ($19 one-time, lifetime)

## Try It

GitHub: https://github.com/YOUR_USERNAME/uptime-status
MIT License. Stars appreciated ?

---

*How do you handle status pages for your side projects? Let me know in the comments!*
