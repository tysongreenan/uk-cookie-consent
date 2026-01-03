import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CookieScanner } from './cookie-scanner'
import { CheckCircle, Shield, Zap, BarChart, Lock, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Cookie Scanner — Instant Website Audit (No Signup Required) 2025',
  description: '✓ Scan your website in 30 seconds ✓ Find hidden tracking cookies ✓ GDPR/PIPEDA compliance check ✓ 100% free, no registration. Used by 10,000+ sites.',
  keywords: 'cookie scanner, website cookie audit, find cookies on website, cookie compliance audit, free cookie checker, gdpr cookie scanner, pipeda cookie audit',
  openGraph: {
    title: 'Free Cookie Scanner — Instant Website Audit',
    description: '✓ 30-second scan ✓ Find all cookies ✓ Compliance check ✓ 100% free, no registration',
    type: 'website',
  },
}

export default function CookieScannerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Cookie Scanner",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5"
    },
    "description": "Free cookie scanner tool to audit your website cookies. Find all cookies, analyze compliance, and get recommendations for GDPR, PIPEDA, and CCPA compliance.",
    "screenshot": "https://www.cookie-banner.ca/tools/cookie-scanner",
    "featureList": [
      "Instant website cookie scanning",
      "GDPR compliance analysis",
      "PIPEDA compliance check",
      "Cookie categorization",
      "Security assessment",
      "Performance impact analysis"
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "100% Free · No Signup Required",
          }}
          title="Free Cookie Scanner"
          title2="Instant GDPR Audit in 30 Seconds"
          description="Scan any website instantly and find hidden tracking cookies. Get GDPR, PIPEDA & CCPA compliance analysis — 100% free forever."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* Scanner Interface */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    🔍 Website Cookie Scanner
                  </CardTitle>
                  <CardDescription>
                    Enter your website URL below to scan for cookies and analyze compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CookieScanner />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Find */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What Our Cookie Scanner Finds
                </h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive cookie analysis for complete compliance
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>All Cookies Detected</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identifies first-party and third-party cookies, including session cookies, persistent cookies, and secure cookies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Cookie Categorization</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Automatically categorizes cookies into necessary, analytics, marketing, and functional categories.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle>Compliance Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Analyzes your cookies against GDPR, PIPEDA, and CCPA requirements with specific recommendations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle>Performance Impact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identifies cookies that may impact website performance and provides optimization suggestions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle>Security Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Evaluates cookie security settings including HttpOnly, Secure, and SameSite attributes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle>Detailed Report</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Generates a comprehensive report with actionable recommendations for compliance and optimization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Use Our Scanner */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Why Use Our Cookie Scanner?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Professional-grade cookie analysis for free
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      💰 Completely Free
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our cookie scanner is completely free to use with no hidden costs or limitations:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Unlimited website scans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Detailed compliance reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>No registration required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Export reports as PDF</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      🎯 Accurate Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Advanced scanning technology provides accurate and comprehensive results:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Real browser environment scanning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>JavaScript execution analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Dynamic cookie detection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Third-party service identification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      ⚡ Fast & Reliable
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Quick and reliable scanning with instant results:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Results in under 30 seconds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>99.9% uptime guarantee</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>No server overload</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Consistent performance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      📈 Actionable Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Get actionable recommendations to improve compliance:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Priority-based recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Implementation guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Best practice suggestions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Compliance checklist</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Learn More About Cookie Compliance
                </h2>
                <p className="text-xl text-muted-foreground">
                  Helpful guides and resources for implementing compliant cookie consent
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Requirements</CardTitle>
                    <CardDescription>Complete guide to GDPR cookie consent compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/gdpr-cookie-consent-requirements">
                      <Button variant="outline" className="w-full">
                        Read GDPR Guide →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Canada Cookie Laws</CardTitle>
                    <CardDescription>PIPEDA, CASL & Quebec Law 25 compliance guide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/cookie-consent-canada-guide-2025">
                      <Button variant="outline" className="w-full">
                        Read Canada Guide →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Free Cookie Banner</CardTitle>
                    <CardDescription>Create your GDPR-compliant banner in 2 minutes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/auth/register">
                      <Button variant="outline" className="w-full">
                        Get Started Free →
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
