import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Free Cookie Banner Generator — No Credit Card, No Limits',
  description: 'Generate cookie consent banners for free. GDPR, CCPA, PIPEDA & Law 25 compliant. Unlimited websites. No credit card needed. Works on WordPress, Shopify, Webflow & any site.',
  keywords: [
    'free cookie banner generator',
    'cookie banner generator free',
    'free cookie consent banner generator',
    'free cookie consent banner',
    'free cookie banner',
    'cookie banner free',
    'free cookie consent generator',
    'free cookie banner for website',
    'free gdpr cookie banner',
    'cookie consent banner generator free',
  ],
  openGraph: {
    title: 'Free Cookie Banner Generator — No Credit Card, No Limits',
    description: 'Generate cookie consent banners for free. GDPR, CCPA, PIPEDA & Law 25 compliant. Unlimited websites. No credit card needed. Works on WordPress, Shopify, Webflow & any site.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/free-cookie-banner-generator',
  },
}

const faqItems = [
  {
    question: "Is the free cookie banner generator really free?",
    answer: "Yes. Our free plan has no trial period, no expiration date, and no surprise charges. No credit card required. When you're ready for advanced features, upgrade to Pro for a one-time $99 payment."
  },
  {
    question: "What's the catch?",
    answer: "There is no catch. Free accounts get full compliance features, brand customization, consent logging, and script blocking. The only limitation is one banner (one website) per free account. Pro ($99 one-time) unlocks unlimited banners, analytics, and team features."
  },
  {
    question: "Do I need a credit card to sign up?",
    answer: "No. You can sign up and generate your cookie banner without entering any payment information. We will never ask for a credit card on the free plan."
  },
  {
    question: "What compliance laws does the free cookie banner cover?",
    answer: "The free plan covers every major privacy law: GDPR (EU), CCPA/CPRA (California), PIPEDA (Canada), Law 25 (Quebec), and more. The banner auto-detects visitor location and applies the correct consent model — opt-in for GDPR, opt-out for CCPA, bilingual for Quebec."
  },
  {
    question: "Can I use the free cookie banner on multiple websites?",
    answer: "The free plan includes one banner for one website. If you need banners for multiple websites, the Pro plan ($99 one-time payment) includes unlimited banners for unlimited sites."
  },
  {
    question: "What's included in the Pro plan?",
    answer: "Pro is a one-time $99 payment that unlocks unlimited banners, unlimited websites, analytics dashboard, team collaboration, custom branding removal, and priority support. Lifetime updates included — no recurring fees."
  },
]

const breadcrumbs = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "Free Cookie Banner Generator", url: "https://www.cookie-banner.ca/free-cookie-banner-generator" },
]

export default function FreeCookieBannerGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <StructuredData type="faq" data={faqItems} />
      <StructuredData type="breadcrumb" data={breadcrumbs} />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "Free Plan — No Credit Card Required",
          }}
          title="Free Cookie Banner Generator"
          title2="No Limits. No Credit Card. No Catch."
          description="Generate GDPR, CCPA, PIPEDA & Law 25 compliant cookie banners. Free plan available — upgrade to Pro for $99 one-time."
          emailCapture={true}
          useGeometricBackground={true}
        />

        {/* What You Get Free */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What You Get Free
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need for full cookie compliance — included in every free account
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Every Privacy Law</h3>
                        <p className="text-muted-foreground text-sm">GDPR, CCPA, PIPEDA, Law 25 — all covered with region-specific consent models.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Brand Customization</h3>
                        <p className="text-muted-foreground text-sm">Custom colors, logo, 13 positions, and animations to match your site perfectly.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Unlimited Websites</h3>
                        <p className="text-muted-foreground text-sm">One banner works across your entire site — every page, every subdomain.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Bilingual Support</h3>
                        <p className="text-muted-foreground text-sm">English and French built in — required for Quebec&apos;s Law 25 compliance.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Script Blocking</h3>
                        <p className="text-muted-foreground text-sm">Blocks Google Analytics, Facebook Pixel, and marketing scripts until consent is given.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Consent Logging</h3>
                        <p className="text-muted-foreground text-sm">Every consent transaction is logged with timestamps for your audit trail.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Google Consent Mode V2</h3>
                        <p className="text-muted-foreground text-sm">Integrates with Google Consent Mode V2 to maintain analytics while respecting consent.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Zero Performance Impact</h3>
                        <p className="text-muted-foreground text-sm">Under 10KB script. Loads asynchronously with no impact on Core Web Vitals.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Paid Comparison */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Free vs Pro
                </h2>
                <p className="text-xl text-muted-foreground">
                  The free plan includes everything you need — Pro unlocks more
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Free Plan</CardTitle>
                    <p className="text-4xl font-bold text-foreground mt-2">$0</p>
                    <p className="text-muted-foreground">No credit card required</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        '1 banner (1 website)',
                        'GDPR, CCPA, PIPEDA & Law 25',
                        'Brand customization',
                        'Consent logging',
                        'Script blocking',
                        'Google Consent Mode V2',
                        'Bilingual (EN/FR)',
                        'Zero performance impact',
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/auth/register" className="block mt-8">
                      <Button className="w-full" size="lg">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Pro Plan</CardTitle>
                    <p className="text-4xl font-bold text-foreground mt-2">$99</p>
                    <p className="text-muted-foreground">One-time payment</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Everything in Free',
                        'Unlimited banners & websites',
                        'GA4 analytics dashboard',
                        'Priority support',
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/pricing" className="block mt-8">
                      <Button variant="outline" className="w-full" size="lg">
                        View Pricing
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Free? */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Why Free?
                </h2>
              </div>

              <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-lg text-muted-foreground mb-4">
                  We believe in earning your trust before asking for money. That&apos;s why our free plan includes full compliance features, brand customization, consent logging, and script blocking.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  There&apos;s no bait-and-switch. The free plan will always be free. When you need advanced features like analytics, team collaboration, and unlimited banners, Pro is a one-time $99 payment — no subscriptions.
                </p>
                <p className="text-lg font-medium text-foreground">
                  Most competitors charge $9-15/month. With us, you either pay nothing or pay once. That&apos;s it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Generate your free cookie banner in under 5 minutes
                </p>
              </div>

              <div className="space-y-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                      Enter Your Website URL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We scan your site to detect existing cookies, tracking scripts (Google Analytics, Facebook Pixel, etc.), and branding. Everything is imported automatically so your banner matches your site from day one.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                      Customize Your Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Use our visual builder to customize everything — 13 banner positions, brand colors, logo, animations, and text. Preview changes in real-time. Your cookie banner should look like part of your site, not an afterthought.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                      Add One Script Tag
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <p className="text-muted-foreground">
                        Copy a single script tag into your site&apos;s &lt;head&gt; section. Works on WordPress, Shopify, Webflow, Squarespace, Wix, or any custom site. No plugins or apps needed.
                      </p>
                      <div className="bg-card border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-muted-foreground">{`<!-- Cookie Banner -->
<script src="https://www.cookie-banner.ca
  /api/v1/banner.js?id=YOUR_ID">
</script>`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                      Auto-Comply by Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our banner detects visitor location and automatically applies the correct compliance rules:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">GDPR opt-in</strong> for EU visitors — cookies blocked until explicit consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">CCPA opt-out</strong> for California — &quot;Do Not Sell&quot; link included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">Law 25 bilingual</strong> for Quebec — French and English consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong className="text-foreground">PIPEDA</strong> for rest of Canada — meaningful consent framework</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Works on Every Platform */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Works on Every Platform
                </h2>
                <p className="text-xl text-muted-foreground">
                  One script tag — works everywhere, no plugins needed
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'WordPress', link: '/integrations/wordpress' },
                  { name: 'Shopify', link: '/integrations/shopify' },
                  { name: 'Webflow', link: '/integrations/webflow' },
                  { name: 'Squarespace', link: '/integrations/squarespace' },
                  { name: 'Wix', link: '/integrations/wix' },
                  { name: 'React', link: '/integrations/react' },
                ].map((platform) => (
                  <Link key={platform.name} href={platform.link}>
                    <Card className="border-2 hover:border-primary/50 transition-colors text-center">
                      <CardContent className="py-6">
                        <p className="font-semibold text-foreground">{platform.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">View guide</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Free Cookie Banner FAQ
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about our free cookie banner generator
                </p>
              </div>

              <div className="space-y-6">
                {faqItems.map((item) => (
                  <Card key={item.question} className="border-2">
                    <CardHeader>
                      <CardTitle>{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Related Resources
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">CCPA Cookie Banner</CardTitle>
                    <p className="text-sm text-muted-foreground">California privacy compliance made easy</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/ccpa-cookie-banner">
                      <Button variant="outline" className="w-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Law 25 Cookie Banner</CardTitle>
                    <p className="text-sm text-muted-foreground">Quebec bilingual compliance for Canadian sites</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/law-25-cookie-banner">
                      <Button variant="outline" className="w-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Scanner</CardTitle>
                    <p className="text-sm text-muted-foreground">Free tool to audit your site&apos;s cookies</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/tools/cookie-scanner">
                      <Button variant="outline" className="w-full">
                        Scan Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
