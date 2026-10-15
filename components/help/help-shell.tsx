import Link from 'next/link'
import { ChevronRight, Mail } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

export function HelpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export function HelpBreadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
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
    <div className="rounded-xl border p-6">
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
