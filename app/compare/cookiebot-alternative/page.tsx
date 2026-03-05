import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Zap, DollarSign, Shield, Users, Globe, Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookiebot Alternative — Save $2,388/Year | Free Cookie Consent 2025',
  description: 'Switch from Cookiebot and save up to $2,388/year. Get 4x faster performance, unlimited customization, complete GDPR compliance — 100% free. 5-minute migration guide included.',
  keywords: 'cookiebot alternative, free cookiebot, cookiebot vs, cookie consent comparison, cookiebot pricing, best cookiebot alternative 2025, cookiebot competitor',
  openGraph: {
    title: 'Cookiebot Alternative — Save $2,388/Year | Free Forever',
    description: '4x faster performance · Unlimited customization · $0/month · Complete GDPR compliance · Migrate in 5 minutes',
    type: 'article',
  },
}

export default function CookiebotAlternativePage() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Cookiebot Alternative - Free Cookie Consent Solution",
    "description": "Complete comparison between Cookiebot and free cookie consent alternatives",
    "author": {
      "@type": "Organization",
      "name": "UK Cookie Consent"
    },
    "publisher": {
      "@type": "Organization",
      "name": "UK Cookie Consent",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.cookie-banner.ca/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-12-29"
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "UK Cookie Consent",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "847"
    },
    "description": "Free cookie consent solution - better alternative to Cookiebot"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "Save $2,388/Year · Free Alternative",
          }}
          title="The Cookiebot Alternative"
          title2="That Actually Saves You Money"
          description="Stop paying $9-199/month for Cookiebot. Get 4x faster performance, unlimited customization, and complete GDPR compliance — 100% free forever. Over 10,000 sites have already switched."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* Quick Comparison */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookiebot vs Our Solution
                </h2>
                <p className="text-xl text-muted-foreground">
                  See why thousands of businesses are switching from Cookiebot to our free alternative
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <XCircle className="h-5 w-5" />
                      Cookiebot
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-red-300 text-red-800 dark:text-red-300">
                      Paid Solution
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">$9-199/month</div>
                        <div className="text-sm text-red-600 dark:text-red-400">Starting price</div>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Limited customization options</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Slow loading times (200ms+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Generic cookie categorization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Complex setup process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Limited language support</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-500 dark:border-green-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      Our Solution
                    </CardTitle>
                    <Badge variant="outline" className="w-fit border-green-300 text-green-800 dark:text-green-300">
                      Free Forever
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">$0/month</div>
                        <div className="text-sm text-green-600 dark:text-green-400">No monthly fees</div>
                      </div>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Unlimited customization options</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Lightning fast (under 50ms)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Custom cookie categorization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>5-minute setup process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>20+ language support</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Switch */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Why Switch from Cookiebot?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Real benefits that impact your bottom line
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Save $2,388/Year</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cookiebot Enterprise costs $199/month. Our solution is completely free forever. That's $2,388 saved annually.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>4x Faster Performance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our optimized script loads in under 50ms compared to Cookiebot's 200ms+. Faster loading means better user experience.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle>Same Compliance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Full GDPR, PIPEDA, and CCPA compliance. Google Consent Mode v2 integration. Everything you need, nothing you don't.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Rocket className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle>Instant Updates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Change your banner design in our dashboard and it updates live instantly. No code changes or redeployment needed.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Globe className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle>Unlimited Domains</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No per-domain pricing. Use our solution on unlimited websites for free. Perfect for agencies and growing businesses.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle>Better Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Comprehensive documentation, video tutorials, and responsive support. Get help when you need it, not when it's convenient.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  The Real Cost of Cookiebot
                </h2>
                <p className="text-xl text-muted-foreground">
                  How much are you actually paying?
                </p>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Cookiebot Pricing Breakdown</CardTitle>
                  <CardDescription>Annual costs for different plan tiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4">Cookiebot Plans</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">Starter Plan (1 domain)</span>
                          <span className="font-bold text-red-600">$9/month</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">Professional Plan (up to 5 domains)</span>
                          <span className="font-bold text-red-600">$29/month</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">Enterprise Plan (unlimited domains)</span>
                          <span className="font-bold text-red-600">$199/month</span>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="text-sm text-red-600 dark:text-red-400 mb-1">Annual cost range:</div>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">$108 - $2,388</div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-foreground mb-4">Our Solution</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">All Features Included</span>
                          <span className="font-bold text-green-600">$0/month</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">Unlimited Domains</span>
                          <span className="font-bold text-green-600">$0/month</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="text-muted-foreground">Unlimited Customization</span>
                          <span className="font-bold text-green-600">$0/month</span>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-sm text-green-600 dark:text-green-400 mb-1">Annual cost:</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">$0</div>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">Plus better performance and more features</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Helpful Resources for Your Migration
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to successfully migrate from Cookiebot
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Scanner Tool</CardTitle>
                    <CardDescription>Scan your site to find all cookies before migration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/tools/cookie-scanner">
                      <Button variant="outline" className="w-full">
                        Scan Your Website →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Integration Guides</CardTitle>
                    <CardDescription>Step-by-step guides for React, WordPress, Shopify & more</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/react">
                      <Button variant="outline" className="w-full">
                        View All Integrations →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Compliance Guide</CardTitle>
                    <CardDescription>Ensure you stay compliant after switching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/gdpr-cookie-consent-requirements">
                      <Button variant="outline" className="w-full">
                        Read GDPR Guide →
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
