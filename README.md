# SocialFlow — Social Media Management Dashboard

A modern social media management app built with React + Vite. Manage Instagram, TikTok, Facebook, and YouTube from one polished dashboard.

## Features
- **Overview dashboard** — stats, upcoming posts, AI suggestions, weekly reach charts
- **Full-page calendar** — month-by-month schedule with per-day detail panel and platform filtering
- **Media library** — upload and manage images/videos with search and tagging
- **Analytics** — reach, engagement, follower growth, top posts across all platforms
- **Team management** — invite members with Admin/Editor/Viewer roles
- **Account settings** — connect/disconnect multiple accounts per platform

## Getting started locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest, ~60 seconds)
```bash
npm install -g vercel
vercel
```
Follow the prompts — your site goes live with a URL automatically.

### Option B — GitHub + Vercel dashboard

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/socialflow.git
git push -u origin main
```

2. Go to vercel.com → Add New Project → Import your repo
3. Vercel auto-detects Vite — leave all defaults
4. Click Deploy. Done. Every future git push auto-redeploys.

---

## Connecting real social accounts

The app ships with simulated OAuth. To wire in real platforms:

| Platform  | Developer Portal |
|-----------|-----------------|
| Instagram | developers.facebook.com |
| TikTok    | developers.tiktok.com |
| Facebook  | developers.facebook.com |
| YouTube   | console.cloud.google.com |

Add your API keys via Vercel → Project Settings → Environment Variables.

---

## Project structure
```
src/
  components/     Sidebar, Topbar, PlatformPill, NewPostModal
  context/        AppContext.jsx (global state)
  data/           mockData.js (platform config + sample data)
  pages/          Overview, Schedule, Library, Analytics, Team, Settings
  index.css       Global styles and design tokens
```
