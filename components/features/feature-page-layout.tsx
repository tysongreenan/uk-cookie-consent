import { ReactNode } from 'react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { MobileTableOfContents } from '@/components/blog/mobile-toc'
import { AuthorCard } from '@/components/blog/author-card'
import { HashScrollHandler } from '@/components/blog/hash-scroll-handler'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { ModernHero, ModernHeroProps } from '@/components/landing/modern-hero'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAuthor } from '@/lib/authors'

interface FeaturePageLayoutProps {
  hero: ModernHeroProps
  children: ReactNode
  ctaText?: string
  ctaHref?: string
  relatedLinks?: Array<{ href: string; text: string }>
}

export function FeaturePageLayout({
  hero,
  children,
  ctaText = "Get Started",
  ctaHref = "/dashboard",
  relatedLinks = []
}: FeaturePageLayoutProps) {
  const author = getAuthor('cookie-banner-team')

  return (
    <div className="min-h-screen bg-background relative">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <Header />

      {/* Modern Hero Section */}
      <div className="relative z-10">
        <ModernHero {...hero} />
      </div>

      {/* Main Content */}
      <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
              {children}
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            <AuthorCard author={author} />
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Get Started</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start using our cookie banner today.
                </p>
                <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <Link href={ctaHref}>
                    {ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            {relatedLinks.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Content</h3>
                  <ul className="space-y-2">
                    {relatedLinks.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.href} className="text-sm text-foreground hover:underline">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
      <Footer />
    </div>
  )
}

