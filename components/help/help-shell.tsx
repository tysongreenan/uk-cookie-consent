import Link from 'next/link'
import { ChevronRight, Home, Mail } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HelpSearch, type HelpSearchItem } from '@/components/help/help-search'

export function HelpShell({
  children,
  searchItems,
  heroTitle,
  heroSubtitle,
  breadcrumbs,
}: {
  children: React.ReactNode
  searchItems: HelpSearchItem[]
  /** Only the Help Center home shows a headline; inner pages get a compact search band */
  heroTitle?: string
  heroSubtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 45%)' }}
            aria-hidden="true"
          />
          <div className={`container relative mx-auto max-w-6xl px-4 ${heroTitle ? 'py-16 sm:py-20' : 'py-8 sm:py-10'}`}>
            {heroTitle && (
              <>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{heroTitle}</h1>
                {heroSubtitle && <p className="mt-3 max-w-xl text-lg text-white/85">{heroSubtitle}</p>}
              </>
            )}
            <div className={heroTitle ? 'mt-8' : ''}>
              <HelpSearch items={searchItems} />
            </div>
          </div>
        </section>

        {breadcrumbs && (
          <div className="border-b bg-muted/30">
            <div className="container mx-auto max-w-6xl px-4 py-4">
              <HelpBreadcrumbs items={breadcrumbs} />
            </div>
          </div>
        )}

        {children}
      </main>
      <Footer />
    </div>
  )
}

function HelpBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="flex items-center gap-1.5 text-foreground/80 hover:text-primary">
                {i === 0 && <Home className="h-4 w-4" aria-hidden="true" />}
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-primary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function HelpContactCard() {
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Can&apos;t find what you need?</p>
          <p className="mt-1 text-sm text-muted-foreground">We typically respond within 24 hours.</p>
          <Link href="/support" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}
