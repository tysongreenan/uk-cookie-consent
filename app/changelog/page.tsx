import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Changelog — Cookie Banner Generator Updates',
  description: 'Latest updates, features, and improvements to the Cookie Banner Generator. See what\'s new.',
  openGraph: {
    title: 'Changelog — Cookie Banner Generator',
    description: 'Latest updates and improvements.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/changelog',
  },
}

const ENTRIES = [
  {
    date: '2026-04-04',
    version: '2.5',
    title: '10-Language Auto-Translation',
    type: 'feature' as const,
    items: [
      'Added 7 new languages: German, Portuguese, Japanese, Chinese, Korean, Arabic, Hindi',
      'Auto-detect banner language from visitor\'s browser across all 10 languages',
      'RTL support for Arabic — banner automatically switches to right-to-left layout',
      'Geo-targeting language override for Pro users (force language by country)',
      'New /features/multi-language landing page with full language showcase',
    ],
  },
  {
    date: '2026-04-04',
    version: '2.4',
    title: 'PostHog Analytics Integration',
    type: 'feature' as const,
    items: [
      'PostHog product analytics — pageviews, session replay, feature flags',
      'Consent-aware tracking — only fires after visitor accepts analytics cookies',
      'A/B test events now sent to both PostHog and Supabase',
      'User identification syncs with NextAuth sessions',
    ],
  },
  {
    date: '2026-04-04',
    version: '2.3',
    title: 'UI Component Library Expansion',
    type: 'improvement' as const,
    items: [
      'Added 26 new UI components (avatar, table, command palette, skeleton, and more)',
      'Total component count: 23 → 49',
      'Shimmer button and rating components for enhanced interactivity',
    ],
  },
  {
    date: '2026-03-27',
    version: '2.2',
    title: 'Blog SEO/AEO System',
    type: 'feature' as const,
    items: [
      'Table of Contents with scroll-spy in sidebar',
      'Author cards with avatar and position',
      'Related posts by tag overlap scoring',
      'BlogPosting + FAQ + Breadcrumb JSON-LD structured data',
      'Direct Answer box for AEO (Answer Engine Optimization)',
      'Blog writing guide and SEO-optimized template for content creators',
    ],
  },
  {
    date: '2026-03-15',
    version: '2.1',
    title: 'Banner Caching & Performance',
    type: 'fix' as const,
    items: [
      'Fixed three-layer caching bug that prevented banner updates from propagating',
      'ETag-based caching with proper invalidation',
      'Sub-100ms banner load times globally',
    ],
  },
  {
    date: '2026-02-01',
    version: '2.0',
    title: 'Major Platform Rewrite',
    type: 'feature' as const,
    items: [
      'New visual banner builder with live preview',
      'Stripe payments — one-time $99 Pro plan',
      'Team workspaces with roles (owner, admin, editor, viewer)',
      'Consent analytics dashboard with charts',
      'Privacy policy generator',
      'Data access request (DSAR) management for Law 25',
      'Google Consent Mode v2 integration',
      'Resend email integration (welcome, team invitations)',
    ],
  },
  {
    date: '2025-11-01',
    version: '1.0',
    title: 'Launch',
    type: 'feature' as const,
    items: [
      'Cookie consent banner generator with PIPEDA & Law 25 compliance',
      'Copy-paste installation for any website',
      'English, French, Spanish language support',
      'WordPress, Shopify, Webflow integration guides',
    ],
  },
]

const TYPE_STYLES = {
  feature: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  improvement: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  fix: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-6">What&apos;s New</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Changelog</h1>
            <p className="text-lg text-muted-foreground">
              All the latest updates, features, and improvements.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-12">
              {ENTRIES.map((entry) => (
                <article key={entry.version} className="relative pl-8 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <time className="text-sm text-muted-foreground">{entry.date}</time>
                    <Badge className={TYPE_STYLES[entry.type]}>v{entry.version}</Badge>
                    <Badge variant="outline" className="text-xs capitalize">{entry.type}</Badge>
                  </div>
                  <h2 className="text-xl font-semibold mb-3">{entry.title}</h2>
                  <ul className="space-y-1.5">
                    {entry.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
