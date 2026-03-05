# UK Cookie Consent - AI Assistant Context

## Project Overview

UK Cookie Consent is a modern SaaS web application for creating and managing GDPR-compliant cookie consent banners. Built with Next.js 14, TypeScript, and PostgreSQL, it provides a visual builder, code generator, analytics dashboard, and multi-platform integration support.

**Production URL:** https://ukcookieconsent.com
**Main Branch:** `develop`
**Current Version:** 2.0.2
**Node Version:** 20

## Core Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL with Prisma ORM 5.7
- **Authentication:** NextAuth.js 4.24
- **UI Framework:** Tailwind CSS 3.4
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion 10.18
- **Forms:** React Hook Form 7.48
- **Payments:** Stripe 19.1
- **Storage:** Supabase (for file uploads)
- **Deployment:** Vercel

## Project Structure

```
├── app/                           # Next.js 14 App Router
│   ├── api/                       # API routes
│   │   ├── auth/                  # Authentication endpoints
│   │   ├── banners/              # Banner CRUD operations
│   │   ├── projects/             # Project management
│   │   ├── scripts/              # Tracking script management
│   │   ├── analytics/            # Analytics endpoints
│   │   ├── upload/               # File upload (logos)
│   │   └── stripe/               # Payment webhooks
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── builder/              # Visual banner builder
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── integrations/         # Platform integrations
│   │   ├── settings/             # User settings
│   │   └── team/                 # Team management
│   ├── auth/                     # Auth pages (signin/signup)
│   ├── blog/                     # Blog with MDX support
│   ├── integrations/             # Integration landing pages
│   │   ├── react/                # React integration guide
│   │   ├── wordpress/            # WordPress guide
│   │   ├── shopify/              # Shopify guide
│   │   ├── webflow/              # Webflow guide
│   │   └── google-tag-manager/   # GTM guide
│   ├── solutions/                # Industry-specific pages
│   ├── compliance/               # GDPR/CCPA/PIPEDA pages
│   └── locations/                # Region-specific pages
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── landing/                  # Landing page components
│   ├── dashboard/                # Dashboard components
│   └── banner/                   # Banner builder components
├── lib/                          # Utility functions
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth configuration
│   └── utils.ts                  # Shared utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── types/                        # TypeScript definitions
└── public/                       # Static assets
```

## Database Schema

### Core Models

- **User**: User accounts with email/password and OAuth support
  - Fields: id, email, name, password, planTier, stripeCustomerId, currentTeamId
  - Relations: projects, logos, teams, teamMemberships

- **Project**: User websites/domains
  - Fields: id, name, domain, userId, teamId
  - Relations: user, team, consentBanners, trackingScripts, analytics

- **ConsentBanner**: Cookie banner configurations
  - Fields: id, name, config (JSON), code (generated HTML/JS), isActive, projectId
  - Relations: project, analytics

- **TrackingScript**: GTM, GA, Facebook Pixel scripts
  - Fields: id, name, scriptContent, consentLevel, isEnabled, projectId
  - ConsentLevels: 'strictly-necessary', 'analytics', 'marketing', 'preferences'

- **BannerAnalytics**: Consent interaction events
  - Events: 'view', 'accept', 'reject', 'preferences'
  - Fields: bannerId, projectId, event, userAgent, country, ipAddress

- **Team**: Team/workspace management
  - Fields: id, name, ownerId
  - Relations: owner, members, projects, invitations

- **UserLogo**: Uploaded brand logos
  - Fields: id, userId, filename, url, size, mimeType

## Key Features & Implementation

### 1. Banner Builder (`app/dashboard/builder/page.tsx`)
- Visual drag-and-drop interface
- Live preview of banner configurations
- Customizable colors, text, buttons, layouts
- Logo upload integration
- Privacy policy link management
- Generated embeddable code output

### 2. Push Live System (Recent Feature)
- **Purpose:** Force banner updates across distributed serverless instances
- **Implementation:** ETag-based HTTP caching with cache invalidation
- **Files:**
  - `app/api/banners/push-live/route.ts` - Cache invalidation endpoint
  - `app/api/banners/[id]/route.ts` - ETag generation and validation
- **How it works:**
  - Each banner has a `lastPushedAt` timestamp
  - ETags generated from `updatedAt` timestamp
  - "Push Live" button forces cache bust across all Vercel edge regions
  - Clients receive 304 Not Modified when banner unchanged

### 3. Multi-Platform Integrations
Supported platforms with dedicated guides:
- React (app/integrations/react/page.tsx) - **Recently updated**
- WordPress
- Shopify
- Webflow
- Squarespace
- Wix
- Google Tag Manager

### 4. Analytics Dashboard
- Consent rate tracking
- Geographic distribution
- Device/browser analytics
- Event timeline visualization
- Uses Recharts for data visualization

### 5. Team Collaboration
- Team workspaces
- Role-based access control (owner, admin, editor, viewer)
- Email invitation system with expiring tokens
- Shared projects across team members

## Recent Development History

### Latest Changes (Last 20 Commits)
1. **Push Live Feature** - ETag-based caching and cache invalidation
2. **React Integration Update** - Fixed integration guide
3. **Sitemap Optimization** - Enhanced crawl budget with structured sitemaps
4. **Banner Injection Prevention** - Duplicate banner detection
5. **Authentication Fixes** - Service role key for Supabase queries
6. **Button Layout Customization** - Flexible button positioning
7. **Event Handler Timing** - Fixed consent checking race conditions

### Known Issues (Fixed)
- TypeScript errors in sitemap generation - RESOLVED
- GTM/reCAPTCHA error suppression - RESOLVED
- Unclickable buttons on banner reopen - RESOLVED
- Service role authentication for workspace loading - RESOLVED

## API Routes

### Banners
- `GET /api/banners` - List all banners for project
- `GET /api/banners/[id]` - Get specific banner (supports ETag)
- `POST /api/banners` - Create new banner
- `PUT /api/banners/[id]` - Update banner
- `DELETE /api/banners/[id]` - Delete banner
- `POST /api/banners/push-live` - Force cache invalidation

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Analytics
- `POST /api/analytics` - Track consent event
- `GET /api/analytics/[projectId]` - Get analytics data

### Teams
- `GET /api/teams` - List user teams
- `POST /api/teams` - Create team
- `POST /api/teams/invite` - Send invitation
- `POST /api/teams/accept-invite` - Accept invitation

## Configuration Files

### Environment Variables (.env.local)
```
DATABASE_URL=                    # PostgreSQL connection string
NEXTAUTH_URL=                    # App URL
NEXTAUTH_SECRET=                 # Auth secret key
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase public key
SUPABASE_SERVICE_ROLE_KEY=      # Supabase service key (server-side)
STRIPE_SECRET_KEY=              # Stripe API key
STRIPE_WEBHOOK_SECRET=          # Stripe webhook signing secret
```

### Build Configuration
- Custom build flags for Vercel deployment:
  - `NEXT_DISABLE_TRACE_BATCHING=1`
  - `NEXT_PRIVATE_BUILD_SKIP_TRACE_CLEANUP=1`
- Prisma generation runs before build (`prisma generate`)

## Deployment

### Vercel Configuration
- **Platform:** Vercel
- **Build Command:** `npm run build` (includes `prisma generate`)
- **Framework Preset:** Next.js
- **Node Version:** 20
- **Environment:** All env vars configured in Vercel dashboard

### Database
- **Provider:** PostgreSQL (likely Neon or Supabase)
- **Migrations:** Using `prisma db push` (schema push without migrations)
- **Access:** Prisma Studio available via `npm run db:studio`

## Development Workflow

### Setup
```bash
npm install
npx prisma db push
npx prisma generate
npm run dev
```

### Common Commands
- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Production build
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint

### Git Workflow
- Main branch: `develop`
- Feature branches: `feature/feature-name`
- Commit style: Descriptive messages with "Fix:", "Add:", "Update:" prefixes

## TypeScript Types

### BannerConfig
The banner configuration is stored as JSON with this structure:
```typescript
interface BannerConfig {
  position: 'top' | 'bottom' | 'floating'
  theme: 'light' | 'dark' | 'custom'
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    accent: string
  }
  text: {
    title: string
    message: string
    acceptButton: string
    rejectButton: string
    preferencesButton: string
  }
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
    }
    privacyPolicy: {
      url: string
      text: string
      openInNewTab: boolean
    }
  }
  layout: {
    buttonLayout: 'inline' | 'stacked'
    showRejectButton: boolean
    showPreferencesButton: boolean
  }
}
```

## Important Notes for AI Assistants

### Code Style
- Use TypeScript strict mode
- Prefer async/await over promises
- Use Prisma for all database operations
- Follow Next.js 14 app router conventions
- Use server components by default, client components only when needed
- Implement proper error handling with try/catch
- Use Zod for input validation

### Security Considerations
- Never expose service role keys to client
- Validate all user inputs
- Use parameterized queries (Prisma handles this)
- Implement CSRF protection (NextAuth handles this)
- Sanitize user-generated content
- Use HTTP-only cookies for sessions

### Performance
- Implement proper caching strategies (ETag, stale-while-revalidate)
- Use database indexes on frequently queried fields
- Optimize images with Next.js Image component
- Lazy load components when appropriate
- Minimize client-side JavaScript bundles

### Testing
- No formal test suite currently implemented
- Manual testing workflow in use
- Consider implementing Playwright for E2E tests
- Use TypeScript for compile-time validation

## Codebase Patterns

### API Route Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Implementation
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### Prisma Query Pattern
```typescript
const banners = await prisma.consentBanner.findMany({
  where: {
    project: {
      userId: session.user.id
    }
  },
  include: {
    project: true,
    analytics: true
  },
  orderBy: {
    createdAt: 'desc'
  }
})
```

## Current Status

### Production Ready
- All TypeScript errors resolved
- Core features implemented and tested
- Payment integration functional
- Multi-tenant team support working
- Analytics tracking operational

### Active Development
- Monitoring Push Live feature performance
- Optimizing cache invalidation strategy
- Expanding integration guides
- Improving SEO with structured data

### Pending/Roadmap
- A/B testing for banners
- White-label options
- API access for developers
- Advanced analytics features
- Custom consent frameworks

## Support Resources

- **GitHub Issues:** https://github.com/anthropics/claude-code/issues (for Claude Code feedback)
- **Documentation:** README.md (project overview)
- **Prisma Docs:** https://pris.ly/d/prisma-schema
- **Next.js Docs:** https://nextjs.org/docs
- **Radix UI:** https://www.radix-ui.com/

---

**Last Updated:** 2025-12-28
**Last Significant Change:** React integration page updates (in progress)
