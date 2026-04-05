import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StructuredData } from '@/components/seo/structured-data'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Consent Tool Comparison 2026 | Cookie-Banner.ca vs Cookiebot, OneTrust, CookieYes, Termly',
  description: 'Compare top cookie consent platforms side-by-side. See how Cookie-Banner.ca stacks up against Cookiebot, OneTrust, CookieYes, and Termly on pricing, features, performance, and compliance.',
  keywords: 'cookie banner comparison, cookie consent tool comparison, cookiebot alternative, onetrust alternative, cookieyes alternative, termly alternative, best cookie consent platform 2026, cookie consent pricing comparison, GDPR cookie banner, cookie consent management platform, CMP comparison, cheapest cookie consent, lightweight cookie banner',
  alternates: {
    canonical: '/compare',
  },
}

const competitors = [
  {
    name: 'Cookiebot',
    slug: 'cookiebot-alternative',
    price: '$9 -- $199/mo',
    tagline: 'Pay once instead of $108--$2,388/year in subscription fees',
    badge: 'Most Popular',
  },
  {
    name: 'OneTrust',
    slug: 'onetrust-alternative',
    price: '$10,000+/yr',
    tagline: 'Enterprise-grade compliance for 1% of the price -- no sales demos required',
    badge: 'Enterprise',
  },
  {
    name: 'CookieYes',
    slug: 'cookieyes-alternative',
    price: '$10 -- $149/mo',
    tagline: 'Same compliance features without monthly subscriptions eating into margins',
    badge: 'Mid-Market',
  },
  {
    name: 'Termly',
    slug: 'termly-alternative',
    price: '$10 -- $35/mo',
    tagline: 'Faster script, more layouts, and a one-time payment that never renews',
    badge: 'SMB',
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="webpage"
        data={{
          title: 'Cookie Consent Tool Comparison 2026',
          description: 'Compare top cookie consent platforms side-by-side. See how Cookie-Banner.ca stacks up against Cookiebot, OneTrust, CookieYes, and Termly.',
        }}
      />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compare', url: 'https://www.cookie-banner.ca/compare' },
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />

          <div className="container max-w-7xl px-4 sm:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center gap-8 text-center">
              <Badge variant="secondary" className="text-sm">
                Updated April 2026
              </Badge>

              <div className="max-w-4xl space-y-4">
                <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    Cookie Consent Tool Comparison
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    2026 Edition
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Compare Cookie-Banner.ca against the biggest names in cookie consent. See pricing, features, performance, and compliance side-by-side -- then decide for yourself.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Banner Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="/pricing">
                    See Our Pricing
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Cards */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Choose a Competitor to Compare
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Detailed pricing breakdowns, feature matrices, migration guides, and FAQs for each platform
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {competitors.map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/compare/${competitor.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {competitor.badge}
                        </Badge>
                      </div>
                      <CardTitle className="font-heading text-xl">
                        {competitor.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        <span className="font-semibold text-foreground">{competitor.price}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {competitor.tagline}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                        View Full Comparison
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Summary Table */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                At a Glance: Cookie-Banner.ca vs Everyone
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                How our pricing and features compare to the top cookie consent platforms
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[140px]">Platform</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Starting Price</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Annual Cost</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Script Size</th>
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Free Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Cookiebot</td>
                    <td className="py-3 px-4 text-muted-foreground">$9/mo</td>
                    <td className="py-3 px-4 text-muted-foreground">$108 -- $2,388</td>
                    <td className="py-3 px-4 text-muted-foreground">~50KB+</td>
                    <td className="py-3 px-4 text-muted-foreground">100 pages</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="py-3 px-4 font-medium text-foreground">OneTrust</td>
                    <td className="py-3 px-4 text-muted-foreground">Custom quote</td>
                    <td className="py-3 px-4 text-muted-foreground">$10,000+</td>
                    <td className="py-3 px-4 text-muted-foreground">~80KB+</td>
                    <td className="py-3 px-4 text-muted-foreground">Limited trial</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">CookieYes</td>
                    <td className="py-3 px-4 text-muted-foreground">$10/mo</td>
                    <td className="py-3 px-4 text-muted-foreground">$120 -- $1,788</td>
                    <td className="py-3 px-4 text-muted-foreground">~40KB+</td>
                    <td className="py-3 px-4 text-muted-foreground">100 pages</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="py-3 px-4 font-medium text-foreground">Termly</td>
                    <td className="py-3 px-4 text-muted-foreground">$10/mo</td>
                    <td className="py-3 px-4 text-muted-foreground">$120 -- $420</td>
                    <td className="py-3 px-4 text-muted-foreground">~45KB+</td>
                    <td className="py-3 px-4 text-muted-foreground">Basic</td>
                  </tr>
                  <tr className="border-2 border-primary bg-primary/5">
                    <td className="py-3 px-4 font-semibold text-primary">Cookie-Banner.ca</td>
                    <td className="py-3 px-4 text-primary font-bold">Free / $99 once</td>
                    <td className="py-3 px-4 text-primary font-bold">$0 -- $99 total</td>
                    <td className="py-3 px-4 text-foreground font-semibold">Under 10KB</td>
                    <td className="py-3 px-4 text-foreground font-semibold">1 banner, unlimited pages</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6 max-w-3xl mx-auto">
              Pricing data as of April 2026. OneTrust pricing is based on publicly available reports and may vary. Check each provider&apos;s website for the latest pricing.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Save on Cookie Consent?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build your cookie banner for free with the visual builder. No credit card required. Upgrade to Pro for $99 one-time when you need unlimited banners, analytics, and team features.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build Your Cookie Banner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
