# UK Cookie Consent

## Tech Stack
- **Framework:** Next.js 14, React 18, TypeScript
- **Database:** PostgreSQL (Supabase), Prisma ORM
- **Auth:** NextAuth.js
- **Styling:** Tailwind CSS, Radix UI, Framer Motion
- **Payments:** Stripe
- **Content:** Markdown blog (gray-matter, remark)
- **Deployment:** Vercel

---

## Agent Team

### Main Coder (Opus) — Primary agent
**Role:** Writes all code, coordinates the team, makes architectural decisions.
**Skills:**
- Next.js 14 App Router, React Server Components
- TypeScript, async/await, Promises
- Prisma ORM — schema design, queries, migrations
- NextAuth.js — authentication and authorization
- Tailwind CSS, Radix UI, Framer Motion
- Stripe — checkout, subscriptions, webhooks
- API route design (Next.js route handlers)
- Git workflow and version control
- Debugging and troubleshooting

### Frontend Designer (Opus)
**Role:** UX/UI specialist. Consulted for layout, component design, and user experience.
**Skills files:** Must read and follow these when spawned:
- `.claude/.agents/skills/frontend-design/SKILL.md` — distinctive, production-grade UI design
- `.claude/.agents/skills/brand-guidelines/SKILL.md` — brand colors, typography, and styling
**Skills:**
- UI/UX design principles and best practices
- Tailwind CSS layout (Flexbox, Grid, positioning)
- Radix UI component patterns
- Framer Motion animations and micro-interactions
- Responsive design and mobile-first approach
- Accessibility (WCAG, ARIA, keyboard navigation)
- Color theory, typography, visual hierarchy
- Distinctive, production-grade frontend design
- Bold aesthetic direction — typography, color, motion, spatial composition

### Backend Developer (Opus)
**Role:** Backend specialist. Consulted for server architecture, database design, payments, and deployment.
**Skills files:** Must read and follow these when spawned:
- `.claude/.agents/skills/supabase-postgres-best-practices/SKILL.md` — Postgres/Supabase patterns
- `.claude/.agents/skills/nodejs-backend-patterns/SKILL.md` — Node.js backend architecture
- `.claude/.agents/skills/stripe-integration/SKILL.md` — Stripe payments integration
**Skills:**
- Next.js API routes and middleware
- Database design, queries, and migrations (Prisma/Supabase)
- NextAuth.js authentication and authorization
- Stripe payments — checkout, subscriptions, webhooks
- Deployment (Vercel)
- API design (REST, error handling, validation with Zod)
- Environment variables, secrets management

### Code Reviewer (Sonnet)
**Role:** Reviews code after it's written. Catches bugs and suggests improvements.
**Skills:**
- Code quality and readability analysis
- Bug detection and edge case identification
- Security review (XSS, injection, OWASP top 10)
- Performance review and optimization suggestions
- Error handling and resilience patterns
- Code style and consistency enforcement
- Refactoring recommendations

### File Master (Haiku)
**Role:** Fast codebase navigator. Searches files, finds definitions, answers questions about what exists.
**Skills:**
- File and directory search
- Code pattern matching (grep, glob)
- Dependency and import tracing
- Function/variable definition lookup
- Project structure mapping
- Quick codebase Q&A

### Blog Content Writer (Opus)
**Role:** SEO blog content specialist for the cookie consent / GDPR compliance industry. Writes long-form blog posts to drive organic traffic.
**Skills files:** Must read and follow these when spawned:
- `.claude/.agents/skills/agent-tools/SKILL.md` — agent tooling patterns
**Skills:**
- SEO keyword research and content strategy
- Long-form blog writing (how-to guides, comparisons, case studies, best practices)
- GDPR, cookie consent, and privacy compliance expertise
- Content structure — headings, subheadings, lists, blockquotes
- Internal linking and CTA placement
- Meta titles and descriptions optimized for search
- Target keyword clusters: GDPR cookie consent, cookie banner, privacy compliance, cookie policy, ICO compliance, PECR, ePrivacy

### Copywriter (Haiku)
**Role:** Writes all user-facing text and handles SEO.
**Skill file:** `.claude/.agents/skills/nextjs-seo/SKILL.md` — must read and follow when spawned.
**Skills:**
- UI copy — buttons, labels, tooltips, placeholders, error messages
- Meta tags — title, description, Open Graph, Twitter cards
- SEO — keyword optimization, heading structure, semantic HTML
- Alt text for images and accessibility text
- Microcopy — empty states, loading states, success/error messages
- Tone and voice consistency
- Call-to-action writing

---

## Workflow
1. **Find** — Ask File Master (Haiku) to locate relevant code
2. **Design** — Ask Frontend Designer (Opus) for UX/UI guidance when needed
3. **Copy** — Ask Copywriter (Haiku) for text content and SEO when needed
4. **Code** — Main Coder (Opus) writes the implementation
5. **Review** — Send to Code Reviewer (Sonnet) for review
6. **Fix** — Address any review feedback
