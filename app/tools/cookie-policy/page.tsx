import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { CheckCircle } from 'lucide-react'
import { CookiePolicyGenerator } from './cookie-policy-generator'

export const metadata: Metadata = {
  title: 'Free Cookie Policy Generator | GDPR, CCPA, PIPEDA & Law 25',
  description:
    'Generate a free, legally compliant cookie policy in minutes. Scan your site to auto-detect cookies, list third-party services, and produce a policy that meets GDPR, CCPA, PIPEDA, and Quebec Law 25.',
  keywords:
    'cookie policy generator, free cookie policy, GDPR cookie policy, CCPA cookie policy, PIPEDA cookie policy, Law 25 cookie policy, cookie policy template',
  openGraph: {
    title: 'Free Cookie Policy Generator | GDPR, CCPA, PIPEDA & Law 25',
    description:
      'Generate a free, legally compliant cookie policy. Scan your site to auto-detect cookies. No signup required.',
    type: 'website',
    url: 'https://www.cookie-banner.ca/tools/cookie-policy',
  },
  alternates: {
    canonical: '/tools/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="pt-8 sm:pt-10 pb-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      100% Free
                    </div>
                    <span className="text-xs text-muted-foreground">No signup required</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                    Cookie Policy Generator
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Scan your site to auto-detect cookies, then generate a compliant cookie policy. Copy &amp;
                    paste it on your site.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-center sm:text-right">
                  <div>
                    <div className="text-2xl font-bold text-foreground">2 min</div>
                    <div className="text-[11px] text-muted-foreground">to generate</div>
                  </div>
                  <div className="h-8 w-px bg-border hidden sm:block" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">4</div>
                    <div className="text-[11px] text-muted-foreground">laws covered</div>
                  </div>
                </div>
              </div>

              <CookiePolicyGenerator />
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-5 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                GDPR
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                CCPA / CPRA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                PIPEDA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Law 25
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Auto-scan cookies
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Draft auto-saved
              </span>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
