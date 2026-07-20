import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Scale,
  Shield,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Banner Features — Compliance, Languages & Verification (2026)',
  description:
    'Explore Cookie Banner features: multi-law compliance, multi-language banners, verification tools, and everything included free or with Pro.',
  alternates: {
    canonical: 'https://www.cookie-banner.ca/features',
  },
  openGraph: {
    title: 'Cookie Banner Features (2026)',
    description:
      'Compliance, languages, verification, and more — free plan available, Pro for unlimited banners and hosted privacy policies.',
    type: 'website',
  },
}

const FEATURES = [
  {
    href: '/features/will-this-keep-me-compliant',
    title: 'Will This Keep Me Compliant?',
    description: 'How the banner supports GDPR, PIPEDA, CCPA, Law 25, and ongoing compliance.',
    icon: Shield,
  },
  {
    href: '/features/privacy-laws',
    title: 'What Privacy Laws Are Covered?',
    description: 'Jurisdictions and legal frameworks baked into the product.',
    icon: Scale,
  },
  {
    href: '/features/how-it-works',
    title: 'How Do I Know It’s Working?',
    description: 'Verify cookie blocking, consent logs, and banner behavior.',
    icon: Wrench,
  },
  {
    href: '/features/what-you-get',
    title: 'What Else Do I Get?',
    description: 'Layouts, branding, platforms, and Pro extras at a glance.',
    icon: Sparkles,
  },
  {
    href: '/features/multi-language',
    title: 'Multi-Language Banners',
    description: 'English, French, and more for Canada and global audiences.',
    icon: Globe2,
  },
]

export default function FeaturesHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border bg-muted/30 py-14 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-medium text-primary mb-3">Features</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything you need for cookie consent
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Compliance, languages, verification, and product details — in plain language.
              Free plan includes 1 banner; Pro unlocks unlimited banners and hosted privacy policies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/builder">
                  Build free banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <Link key={f.href} href={f.href} className="group block h-full">
                  <Card className="h-full transition-shadow group-hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {f.title}
                      </CardTitle>
                      <CardDescription className="text-base">{f.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/40 p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Related tools
              </h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/tools/cookie-scanner" className="hover:text-foreground underline-offset-2 hover:underline">
                    Cookie scanner
                  </Link>
                </li>
                <li>
                  <Link href="/tools/privacy-policy" className="hover:text-foreground underline-offset-2 hover:underline">
                    Privacy policy generator
                  </Link>
                </li>
                <li>
                  <Link href="/law-25-cookie-banner" className="hover:text-foreground underline-offset-2 hover:underline">
                    Law 25 banner
                  </Link>
                </li>
                <li>
                  <Link href="/locations/canada" className="hover:text-foreground underline-offset-2 hover:underline">
                    Canada / PIPEDA
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
