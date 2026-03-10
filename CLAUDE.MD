# UK Cookie Consent

**SaaS app for GDPR-compliant cookie consent banners.**

## Tech Stack
Next.js 14, TypeScript, PostgreSQL (Supabase), Prisma, NextAuth.js, Tailwind CSS, Stripe

## Key Info
- **Production:** `claude/brave-khorana` branch (deployed to Vercel)
- **Dev:** `npm run dev` (http://localhost:3000)
- **Node:** 20+
- **DB:** PostgreSQL via Supabase

## Setup
```bash
npm install
npm run dev
```

## API Routes
- `/api/banners` - Banner CRUD
- `/api/projects` - Project management
- `/api/analytics` - Consent tracking
- `/api/auth/*` - NextAuth endpoints

## Key Files
- `app/dashboard/builder/page.tsx` - Banner builder
- `prisma/schema.prisma` - Database schema
- `lib/auth.ts` - Auth config

## Team Workflow
**Lead Dev (Claude Code):** Intense coding, architecture, features
**Explore Agent (Sonnet):** Codebase research, file discovery, summaries
**Plan Agent:** Implementation planning, design strategies

Use subagents for: research, exploration, planning → I execute the code
