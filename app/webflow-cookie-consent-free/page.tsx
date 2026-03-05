import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Star,
  Code,
  Palette,
  Zap,
  Shield,
  Globe,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Webflow Cookie Consent Free | GDPR Compliant Banner Generator 2026',
  description: 'Free Webflow cookie consent banner. GDPR, PIPEDA, CCPA compliant. No coding required. Copy-paste integration with Webflow Designer. Free forever.',
  keywords: 'webflow cookie consent free, webflow gdpr free, webflow cookie banner free, webflow privacy compliance free, webflow cookie consent generator',
  openGraph: {
    title: 'Webflow Cookie Consent Free | GDPR Compliant Banner Generator 2026',
    description: 'Free Webflow cookie consent banner. GDPR, PIPEDA, CCPA compliant. No coding required.',
    type: 'website',
  },
  alternates: {
    canonical: '/webflow-cookie-consent-free',
  },
}

export default function WebflowCookieConsentFreePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the free plan really free forever?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our free plan has no time limits, no hidden costs, and no credit card required. You can use it forever for your Webflow sites without any restrictions."
        }
      },
      {
        "@type": "Question",
        "name": "Does the free plan include GDPR compliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our free plan includes full GDPR compliance with granular consent options, withdrawal mechanisms, and proper audit trails."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize the design to match my Webflow site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The free plan includes custom colors, fonts, positioning, and styling options to perfectly match your Webflow site's design and brand."
        }
      },
      {
        "@type": "Question",
        "name": "Will it work with my Webflow analytics and tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our solution works with Webflow Analytics, Google Analytics, Facebook Pixel, and other tracking scripts. It ensures they only fire after user consent."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need coding knowledge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at all! Simply copy the generated code and paste it into your Webflow project settings under Custom Code. That's it!"
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between free and paid plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The free plan covers all essential compliance features. Paid plans add advanced analytics, white-label options, client management, and priority support for agencies."
        }
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.cookie-banner.ca"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Webflow Cookie Consent Free",
        "item": "https://www.cookie-banner.ca/webflow-cookie-consent-free"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "Free Forever · No Credit Card",
          }}
          title="Free Webflow Cookie Banner"
          title2="5-Minute Setup, Zero Cost"
          description="GDPR, PIPEDA & CCPA compliant cookie consent for your Webflow site. Copy-paste integration — no coding required."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* Free Features */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Free Features — No Limits
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>GDPR Compliance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Full GDPR compliance with granular consent options, withdrawal mechanisms, and audit trails.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>PIPEDA & CCPA Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Canadian PIPEDA and California CCPA compliance built-in for North American businesses.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Webflow Integration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Easy copy-paste integration with Webflow custom code. No technical knowledge required.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Palette className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Custom Design</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Match your Webflow site's design with custom colors, fonts, and positioning options.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Mobile Responsive</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Automatically responsive design that works perfectly on all devices and screen sizes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Free Forever</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No time limits, no hidden costs, no credit card required. Use it forever at no cost.
                    </p>
                  </CardContent>
                </Card>
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
                  How to Add Cookie Consent to Your Webflow Site
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get compliant in under 5 minutes with our free solution
                </p>
              </div>

              <div className="space-y-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                      Create Your Free Banner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Use our free banner builder to create your cookie consent banner:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Choose your compliance framework (GDPR, PIPEDA, CCPA)</li>
                          <li>Customize colors to match your Webflow site</li>
                          <li>Set your cookie categories and descriptions</li>
                          <li>Configure consent behavior and preferences</li>
                        </ul>
                      </div>
                      <div className="bg-card border rounded-lg p-4 font-mono text-sm">
                        <pre className="text-muted-foreground">{`// Free banner configuration
{
  "compliance": "GDPR",
  "design": {
    "colors": {
      "primary": "#your-brand-color"
    }
  },
  "cookies": {
    "essential": true,
    "analytics": true,
    "marketing": false
  }
}`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                      Copy the Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Get your personalized code and copy it to your clipboard:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Generated code is ready to use</li>
                          <li>No additional configuration needed</li>
                          <li>Includes all compliance features</li>
                          <li>Works with any Webflow plan</li>
                        </ul>
                      </div>
                      <div className="bg-card border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-muted-foreground">{`<!-- Copy this to Webflow -->
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
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                      Add to Webflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Paste the code into your Webflow project settings:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Go to Project Settings in Webflow Designer</li>
                          <li>Navigate to Custom Code section</li>
                          <li>Paste code in the &quot;Head Code&quot; field</li>
                          <li>Save and publish your site</li>
                        </ul>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-primary" />
                          <span className="font-semibold">Webflow Project Settings</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Settings &rarr; Custom Code &rarr; Head Code &rarr; Paste your banner code &rarr; Save & Publish
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                      Test & Go Live
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-muted-foreground mb-4">
                          Test your banner and make sure everything works:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Visit your live Webflow site</li>
                          <li>Check banner appearance and functionality</li>
                          <li>Test consent acceptance and withdrawal</li>
                          <li>Verify analytics only fire after consent</li>
                        </ul>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="font-semibold">You&apos;re Compliant!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your Webflow site is now GDPR, PIPEDA, and CCPA compliant with our free solution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Paid */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Free vs Premium Features
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our free plan covers the essentials. Upgrade for advanced features.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-primary/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Free Plan</CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary">$0/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>GDPR, PIPEDA, CCPA compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Basic cookie categories</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Custom design options</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Webflow integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Mobile responsive</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Basic analytics</span>
                      </li>
                    </ul>
                    <Link href="/auth/register">
                      <Button className="w-full mt-6" size="lg">
                        Get Free Banner
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-accent-cool/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-accent-cool" />
                    </div>
                    <CardTitle className="text-2xl">Pro Plan</CardTitle>
                    <CardDescription className="text-lg font-semibold text-muted-foreground">$19/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Everything in Free</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Advanced cookie management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>White-label options</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Client management dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <span>Advanced analytics</span>
                      </li>
                    </ul>
                    <Link href="/auth/register">
                      <Button className="w-full mt-6" variant="outline" size="lg">
                        Upgrade to Pro
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
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
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about our free Webflow cookie consent
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Is the free plan really free forever?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Our free plan has no time limits, no hidden costs, and no credit card required.
                      You can use it forever for your Webflow sites without any restrictions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Does the free plan include GDPR compliance?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely! Our free plan includes full GDPR compliance with granular consent options,
                      withdrawal mechanisms, and proper audit trails. Perfect for European visitors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Can I customize the design to match my Webflow site?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! The free plan includes custom colors, fonts, positioning, and styling options
                      to perfectly match your Webflow site&apos;s design and brand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Will it work with my Webflow analytics and tracking?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Our solution works with Webflow Analytics, Google Analytics, Facebook Pixel,
                      and other tracking scripts. It ensures they only fire after user consent.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Do I need coding knowledge to use the free plan?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Not at all! Our free plan is designed for non-technical users. Simply copy the
                      generated code and paste it into your Webflow project settings. That&apos;s it!
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>What&apos;s the difference between free and paid plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The free plan covers all essential compliance features. Paid plans add advanced
                      analytics, white-label options, client management, and priority support for agencies.
                    </p>
                  </CardContent>
                </Card>
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
                    <CardTitle className="text-lg">Webflow Integration Guide</CardTitle>
                    <CardDescription>Step-by-step Webflow cookie consent setup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/webflow">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Requirements</CardTitle>
                    <CardDescription>Complete GDPR cookie consent guide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/gdpr">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Scanner</CardTitle>
                    <CardDescription>Free tool to audit your site&apos;s cookies</CardDescription>
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
