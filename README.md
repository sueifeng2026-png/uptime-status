# ?? Uptime Status

Lightweight self-hosted status page & uptime monitor. Monitor your services, display a beautiful public status page, and get instant health checks ！ all in one simple Next.js app.

## ? Features

- **Service Monitoring** ！ Add HTTP endpoints and monitor their health
- **Public Status Page** ！ Beautiful, real-time status dashboard for your users
- **Admin Panel** ！ Add, edit, remove services; trigger on-demand checks
- **Health Checks** ！ Automatic HTTP ping with response time tracking
- **Uptime History** ！ Visual bar chart of recent check results
- **Self-Hosted** ！ Runs anywhere, your data stays with you
- **Zero Cost** ！ Uses SQLite, deploy on free tier services

## ?? Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/uptime-status.git
cd uptime-status

# Install dependencies
npm install

# Setup database
npx prisma db push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ！ status page is at `/status`, admin panel at `/admin`.

## ?? Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/uptime-status)

> Note: SQLite on Vercel is read-only in production. Use Turso or a different DB provider for production deployments.

### Docker

```bash
docker build -t uptime-status .
docker run -p 3000:3000 -v $(pwd)/data:/app/prisma uptime-status
```

### Railway / Render

Works out of the box ！ just point to the repo and set build command to `npm run build`, start command to `npm start`.

## ?? Cron Setup

For automatic health checks, set up a cron job (every 1-5 minutes) to hit:

```
GET /api/cron
```

**Using Vercel Cron Jobs:**
```json
// vercel.json
{
  "crons": [
    { "path": "/api/cron", "schedule": "*/5 * * * *" }
  ]
}
```

**Using GitHub Actions:**
```yaml
name: Health Check Cron
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: curl -s https://your-domain.com/api/cron
```

## ?? Screenshots

| Status Page | Admin Panel |
|-------------|-------------|
| *Coming soon* | *Coming soon* |

## ??? Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite + Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## ?? License

MIT ！ see [LICENSE](./LICENSE) for details.

## ?? Contributing

Contributions welcome! Open an issue or PR.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

## ?? Support This Project

If Uptime Status helps you, consider:

- ? Starring the repo on GitHub
- ?? [GitHub Sponsors](https://github.com/sponsors/YOUR_USERNAME)
- ?? [Managed Hosting](https://your-domain.com) ！ $19 one-time, we host it for you

---

Built with ?? by [Your Name](https://github.com/YOUR_USERNAME)
