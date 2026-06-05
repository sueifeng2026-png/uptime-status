# How to Deploy Your Own Status Page on Vercel (Free, 5 Minutes)

**Target**: Dev.to, ¾ò½ð, personal blog

---

Want a status page for your side project but don't want to pay for BetterStack? Here's how to deploy your own, for free, in 5 minutes.

## Prerequisites
- A GitHub account
- A Vercel account (free tier)

## Step 1: Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/uptime-status
cd uptime-status
```

## Step 2: Deploy to Vercel

The easiest way:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your cloned repo
3. Vercel auto-detects Next.js ¡ª no config needed
4. Click Deploy

That's it. Your status page is live at `your-project.vercel.app`.

## Step 3: Add Your Services

Visit `your-project.vercel.app/admin` and add the services you want to monitor:

- Your main website
- Your API
- Your database (if it has a health check endpoint)
- Third-party services you depend on

## Step 4: Set Up Automatic Checks

Add this to your `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/cron", "schedule": "*/5 * * * *" }
  ]
}
```

This runs health checks every 5 minutes. Free on Vercel's hobby plan.

## Step 5: Share Your Status Page

Your status page is at `your-project.vercel.app/status`. Share it with your users, add it to your footer, or set up a custom domain.

## Bonus: Custom Domain

1. Buy a domain (or use a subdomain like `status.yourdomain.com`)
2. Add it in Vercel's project settings
3. Update DNS
4. Done ¡ª professional status page on your own domain

## Cost Breakdown

| Item | Cost |
|------|------|
| Domain | $10/year (optional) |
| Hosting | $0 (Vercel free tier) |
| Database | $0 (SQLite) |
| **Total** | **$0-10/year** |

Compare that to $24-99/month for commercial alternatives.

---

GitHub: https://github.com/YOUR_USERNAME/uptime-status
Questions? Open an issue or drop a comment below.
