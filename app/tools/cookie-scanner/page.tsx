import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CookieScanner } from './cookie-scanner'
import { CheckCircle, Shield, Zap, BarChart, Lock, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Website Cookie Scanner — GDPR, CCPA & PIPEDA Check in 30s',
  description: 'Enter any URL and get a full cookie audit in 30 seconds — 100% free, zero signup. Detects all cookies, scores GDPR/CCPA/PIPEDA compliance, and shows exactly what to fix.',
  keywords: 'cookie scanner, cookie audit tool, cookie scan, cookie scanning tools, website cookie scanner, free cookie scanner, cookie checker, best cookie audit tool, web cookie scanner, free cookies audit software, cookie compliance checker, gdpr cookie scanner, online cookie scanner',
  openGraph: {
    title: 'Free Website Cookie Scanner — Find Every Cookie in 30 Seconds',
    description: 'Scan any website for cookies in 30 seconds. Free cookie audit tool checks GDPR, CCPA & PIPEDA compliance. No signup needed. Instant actionable results.',
    type: 'website',
    url: 'https://www.cookie-banner.ca/tools/cookie-scanner',
  },
  alternates: {
    canonical: '/tools/cookie-scanner',
  },
}

export default function CookieScannerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Website Cookie Scanner",
    "url": "https://www.cookie-banner.ca/tools/cookie-scanner",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Cookie Banner",
      "url": "https://www.cookie-banner.ca"
    },
    "description": "Free cookie scanner tool to audit your website cookies. Scan any website to find all cookies, analyze compliance, and get recommendations for GDPR, PIPEDA, CCPA, and Law 25 compliance.",
    "featureList": [
      "Instant website cookie scanning",
      "GDPR compliance analysis",
      "CCPA compliance check",
      "PIPEDA compliance check",
      "Law 25 compliance check",
      "Cookie categorization",
      "Security assessment",
      "Free cookie audit reports"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a cookie scanner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cookie scanner is a tool that automatically crawls and analyzes a website to detect all cookies and tracking technologies in use. It categorizes cookies (necessary, analytics, marketing, functional), evaluates their security settings, and checks compliance with privacy laws like GDPR, CCPA, and PIPEDA."
        }
      },
      {
        "@type": "Question",
        "name": "Is this cookie scanner really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our cookie scanner is 100% free with no hidden costs. You can run unlimited cookie scans without creating an account or providing any personal information."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a cookie scan take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most cookie scans complete in under 30 seconds. The scanner loads your website in a real browser environment, detects all cookies and tracking scripts, and generates a comprehensive compliance report instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What privacy laws does the cookie scanner check against?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our cookie scanning tool checks compliance against GDPR (European Union), CCPA/CPRA (California), PIPEDA (Canada), and Quebec Law 25. It identifies cookies that require user consent under each regulation."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a cookie banner if the scanner finds tracking cookies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If your website cookie scanner reveals non-essential cookies (analytics, marketing, or advertising cookies), you need a cookie consent banner that blocks these cookies until users explicitly opt in."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I scan my website for cookies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You should run a cookie scan whenever you add new third-party tools, after major website updates, and at least quarterly to catch unexpected cookies from plugin updates or third-party script changes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between free and paid cookie scanning tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free cookie scanners provide on-demand website scanning, cookie detection, categorization, and compliance analysis. Paid tools add automated scheduled scans, continuous monitoring, consent management platforms, audit logs, and multi-site management."
        }
      },
      {
        "@type": "Question",
        "name": "Can a cookie checker detect all types of tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A comprehensive cookie checker detects HTTP cookies, JavaScript cookies, third-party tracking pixels, localStorage and sessionStorage usage. Our web cookie scanner identifies both first-party and third-party cookies, including those set dynamically by JavaScript after page load."
        }
      }
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Scan Your Website for Cookies",
    "description": "Use our free cookie scanner to audit your website cookies and check compliance with GDPR, CCPA, PIPEDA, and Law 25.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Enter your website URL",
        "text": "Type or paste your website URL into the cookie scanner input field. The scanner accepts any public website URL."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Run the cookie scan",
        "text": "Click the Scan Now button. The cookie scanning tool will load your website in a real browser environment and detect all cookies and tracking scripts."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Review your cookie audit results",
        "text": "Review the compliance report showing all detected cookies, their categories, security settings, and specific recommendations for GDPR, CCPA, PIPEDA, and Law 25 compliance."
      }
    ],
    "totalTime": "PT30S"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.cookie-banner.ca" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.cookie-banner.ca/tools" },
      { "@type": "ListItem", "position": 3, "name": "Cookie Scanner", "item": "https://www.cookie-banner.ca/tools/cookie-scanner" }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Static JSON-LD structured data for SEO - all content is hardcoded, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Hero: Scanner Above the Fold */}
        <section className="min-h-[calc(100vh-56px)] flex flex-col justify-center py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="border border-border rounded-full px-3 py-1 text-xs font-mono tracking-wide uppercase text-muted-foreground inline-block mb-4">
                Free &mdash; No Signup Required
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-3">
                Scan any website for cookies
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Check GDPR, CCPA & PIPEDA compliance in 30 seconds
              </p>

              <CookieScanner />

              <p className="text-xs text-muted-foreground mt-8">
                <Link href="#what-is-cookie-scanner" className="hover:underline">
                  Learn more about cookie scanning &darr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-muted/50 py-6 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">47,000+</div>
                <div className="text-xs text-muted-foreground">Cookie scans run</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-xs text-muted-foreground">Privacy laws checked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">&lt;30s</div>
                <div className="text-xs text-muted-foreground">Average scan time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Free, no signup</div>
              </div>
            </div>
          </div>
        </section>

        {/* What Is a Cookie Scanner? */}
        <section id="what-is-cookie-scanner" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                What Is a Cookie Scanner?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  A <strong>cookie scanner</strong> is a specialized web tool that automatically crawls your website to detect, identify, and categorize every cookie and tracking technology in use. Think of it as a compliance audit for your website&apos;s data collection practices -- it reveals exactly what information your site gathers about visitors, often without you even realizing it.
                </p>
                <p>
                  Every time someone visits a website, cookies are placed on their browser. Some cookies are essential for the site to function (like keeping a user logged in or remembering items in a shopping cart). Others, however, track user behavior for analytics, advertising, or marketing purposes. Privacy regulations like{' '}
                  <Link href="/compliance/gdpr" className="text-primary hover:underline font-medium">GDPR</Link> and{' '}
                  <Link href="/compliance/ccpa" className="text-primary hover:underline font-medium">CCPA</Link>{' '}
                  require website owners to know exactly which cookies their site uses and to obtain proper consent before setting non-essential ones.
                </p>
                <p>
                  Without a <strong>cookie audit tool</strong>, most website owners have no idea how many cookies their site sets. Third-party scripts from tools like Google Analytics, Facebook Pixel, live chat widgets, and advertising networks all drop their own cookies -- often without explicit disclosure in your cookie policy. A website cookie scanner solves this blind spot by giving you a complete, categorized inventory.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Does a Cookie Scan Reveal?</h3>
                <p>
                  When you run a <strong>cookie scan</strong> on your website, the scanner loads your pages in a real browser environment and captures every cookie that gets set during the process. Here is what a thorough scan reveals:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>First-party cookies</strong> -- cookies set directly by your domain for session management, user preferences, and site functionality.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Third-party cookies</strong> -- cookies set by external services like Google, Facebook, or advertising networks that track users across multiple sites.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Cookie categories</strong> -- each cookie classified as necessary, functional, analytics, or marketing, helping you understand which require consent.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Security attributes</strong> -- whether each cookie uses Secure, HttpOnly, and SameSite flags, which protect against cross-site attacks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Expiration periods</strong> -- how long each cookie persists, from session-only to multi-year tracking cookies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Compliance gaps</strong> -- specific issues with your cookie implementation that could violate GDPR, CCPA, PIPEDA, or Law 25 requirements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Cookie Audit Tool Works */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                How Our Cookie Audit Tool Works
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Our <strong>cookie audit tool</strong> uses advanced browser-based scanning technology to detect cookies exactly as your visitors experience them. Unlike basic cookie scanners that only check HTTP headers, our tool executes JavaScript, loads dynamic content, and captures cookies set by third-party scripts after page load -- giving you a complete picture of your site&apos;s cookie footprint.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">What Makes Our Cookie Scanning Technology Different</h3>
                <p>
                  Many free <strong>cookie scanning tools</strong> only perform a superficial scan -- checking the initial HTTP response headers for Set-Cookie directives. This misses a significant portion of cookies on modern websites, where JavaScript-based analytics platforms, advertising pixels, and consent management platforms set cookies dynamically after the page loads.
                </p>
                <p>
                  Our <strong>web cookie scanner</strong> takes a different approach. It uses a full headless browser environment that:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Executes all JavaScript on the page, including deferred and async scripts</li>
                  <li>Waits for dynamic content to load, capturing late-firing tracking pixels</li>
                  <li>Detects cookies from embedded iframes and third-party domains</li>
                  <li>Identifies localStorage and sessionStorage usage alongside traditional cookies</li>
                  <li>Checks for fingerprinting scripts that track users without cookies</li>
                </ul>
                <p>
                  This browser-based approach ensures our <strong>cookie checker</strong> catches what simpler tools miss -- giving you confidence that your cookie audit is truly comprehensive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Our Cookie Scanner Finds */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  What Our Cookie Scanner Finds
                </h2>
                <p className="text-xl text-muted-foreground">
                  Comprehensive cookie analysis covering every aspect of compliance
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
                      Identifies first-party and third-party cookies, including session cookies, persistent cookies, and secure cookies set by any script on your pages.
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
                      Automatically categorizes cookies into necessary, analytics, marketing, and functional categories -- essential for building an accurate consent banner.
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
                      Analyzes your cookies against{' '}
                      <Link href="/compliance/gdpr" className="text-primary hover:underline">GDPR</Link>, PIPEDA, Law 25, and{' '}
                      <Link href="/compliance/ccpa" className="text-primary hover:underline">CCPA</Link>{' '}
                      requirements with specific, actionable recommendations.
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
                      Identifies cookies and scripts that may slow down your website, with optimization suggestions to improve both compliance and page speed.
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
                      Evaluates cookie security settings including HttpOnly, Secure, and SameSite attributes -- flagging any cookies vulnerable to cross-site attacks.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle>Detailed Audit Report</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Generates a comprehensive cookie audit report with prioritized recommendations you can share with your development team or compliance officer.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why You Need a Website Cookie Scanner */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Why You Need a Website Cookie Scanner
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  If your website has any visitors from the EU, California, Canada, or the UK, you are subject to cookie consent laws. A <strong>website cookie scanner</strong> is not just a nice-to-have -- it is a fundamental compliance requirement. Here is why every website owner needs to perform regular cookie scans:
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Legal Compliance Requirements</h3>
                <p>
                  Under the{' '}
                  <Link href="/compliance/gdpr" className="text-primary hover:underline font-medium">GDPR</Link>,
                  websites must obtain informed, specific consent before setting non-essential cookies. To provide informed consent, you need to know exactly which cookies your site uses -- their names, purposes, durations, and whether they share data with third parties. A cookie scan gives you this information.
                </p>
                <p>
                  The{' '}
                  <Link href="/compliance/ccpa" className="text-primary hover:underline font-medium">CCPA (California Consumer Privacy Act)</Link>{' '}
                  requires businesses to disclose the categories of personal information they collect, including data gathered through cookies. If your cookie scanner reveals marketing or advertising cookies, you must provide a &quot;Do Not Sell or Share My Personal Information&quot; link on your website.
                </p>
                <p>
                  Canada&apos;s PIPEDA and Quebec&apos;s Law 25 impose similar requirements, with fines for non-compliance reaching up to CAD $10 million. Regular cookie audits using a <strong>cookie scanning tool</strong> help you stay compliant as your website evolves and third-party scripts change.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Hidden Cookies You Do Not Know About</h3>
                <p>
                  Most website owners are surprised by the results of their first <strong>cookie scan</strong>. Websites commonly have 20 to 50 or more cookies, yet only a handful are intentionally placed by the site owner. The rest come from:
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong>Analytics platforms</strong> like Google Analytics, Hotjar, or Mixpanel that set multiple tracking cookies</li>
                  <li><strong>Advertising networks</strong> including Google Ads, Facebook Pixel, and programmatic ad scripts</li>
                  <li><strong>Social media widgets</strong> such as share buttons, embedded posts, and comment systems</li>
                  <li><strong>Live chat tools</strong> like Intercom, Drift, or Zendesk that track visitor behavior</li>
                  <li><strong>CMS plugins</strong> and themes that include third-party scripts you may not be aware of</li>
                  <li><strong>CDN and hosting providers</strong> that sometimes set their own performance cookies</li>
                </ul>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Accurate Cookie Consent Banners</h3>
                <p>
                  Your cookie consent banner is only as good as the data behind it. If your banner lists four categories of cookies but your site actually sets cookies in categories you have not disclosed, your consent mechanism is technically non-compliant. Running a <strong>cookie audit</strong> ensures your banner accurately reflects reality. After scanning, you can use the results to{' '}
                  <Link href="/free-cookie-banner-generator" className="text-primary hover:underline font-medium">build a properly configured cookie banner</Link>{' '}
                  that matches your actual cookie usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Paid Cookie Scanning Tools */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Free vs Paid Cookie Scanning Tools
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  When choosing a <strong>cookie scanning tool</strong>, you will find both free and paid options available. Here is an honest comparison of <strong>free cookie scanners</strong> versus paid alternatives like Cookiebot, OneTrust, and CookieYes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700 dark:text-green-400">Free Cookie Scanners</CardTitle>
                    <CardDescription>Like our tool -- best for auditing and awareness</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>On-demand website scanning at no cost</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Cookie detection and categorization</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Compliance scoring for GDPR, CCPA, PIPEDA</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>No account or signup required</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Instant results in under 30 seconds</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Downloadable audit reports</span></li>
                      <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5 flex-shrink-0">-</span><span>Manual re-scanning required for updates</span></li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-700 dark:text-blue-400">Paid Cookie Scanning Tools</CardTitle>
                    <CardDescription>Cookiebot, OneTrust, CookieYes, etc.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Automated scheduled scanning</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Integrated consent management platform</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Multi-site and enterprise management</span></li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">+</span><span>Continuous monitoring and alerts</span></li>
                      <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5 flex-shrink-0">-</span><span>Monthly fees from $10 to $500+/month</span></li>
                      <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5 flex-shrink-0">-</span><span>Page limits on lower tiers</span></li>
                      <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5 flex-shrink-0">-</span><span>Account creation and setup required</span></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-10 prose prose-lg max-w-none text-muted-foreground">
                <p>
                  For most small to medium websites, a <strong>free cookie scanner</strong> provides all the auditing capability you need. If you are looking for an affordable{' '}
                  <Link href="/compare/cookiebot-alternative" className="text-primary hover:underline font-medium">alternative to Cookiebot</Link>,
                  our platform offers cookie scanning plus a full consent management solution at a fraction of the cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Scanning Best Practices */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Cookie Scanning Best Practices
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Running a <strong>cookie scan</strong> is just the first step. Follow these best practices to maintain ongoing compliance:
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Scan Before and After Every Website Change</h3>
                <p>
                  Any change to your website can introduce new cookies. Adding a new analytics tool, installing a WordPress plugin, or embedding a video player can all result in additional cookies being set. Run a <strong>cookie scan</strong> before and after deployment to catch any new cookies.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. Schedule Regular Quarterly Audits</h3>
                <p>
                  Even without intentional changes, cookies on your website can change. Third-party services update their tracking scripts, and CMS platforms push updates that may include new tracking. Set a calendar reminder to run a comprehensive <strong>cookie audit</strong> at least every quarter.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. Test Multiple Pages</h3>
                <p>
                  Different pages on your website may set different cookies. Your checkout page might load payment processor scripts, your blog might embed social media widgets, and your contact page might load a third-party form builder.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">4. Update Your Cookie Policy After Every Scan</h3>
                <p>
                  Your cookie policy must accurately reflect the cookies your website actually uses. After each <strong>cookie scan</strong>, compare the results against your published cookie policy and update it. You can use our{' '}
                  <Link href="/cookie-policy-template" className="text-primary hover:underline font-medium">cookie policy template</Link>{' '}
                  to get started.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">5. Verify Your Consent Banner Blocks Cookies</h3>
                <p>
                  Simply having a cookie consent banner is not enough -- you need to verify that non-essential cookies are actually blocked until the user provides consent. After configuring your banner, run a <strong>cookie scan</strong> without interacting with the consent prompt to confirm it works.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                Cookie Scanner FAQ
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Common questions about cookie scanning, cookie audits, and compliance
              </p>

              <div className="space-y-6">
                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">What is a cookie scanner?</h3>
                  <p className="text-muted-foreground">
                    A cookie scanner is a tool that automatically crawls and analyzes a website to detect all cookies and tracking technologies in use. It categorizes cookies (necessary, analytics, marketing, functional), evaluates their security settings, and checks compliance with privacy laws like GDPR, CCPA, and PIPEDA.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Is this cookie scanner really free?</h3>
                  <p className="text-muted-foreground">
                    Yes, our cookie scanner is 100% free with no hidden costs. You can run unlimited cookie scans without creating an account or providing any personal information.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">What privacy laws does the cookie scanner check against?</h3>
                  <p className="text-muted-foreground">
                    Our cookie scanning tool checks compliance against{' '}
                    <Link href="/compliance/gdpr" className="text-primary hover:underline">GDPR</Link> (European Union),{' '}
                    <Link href="/compliance/ccpa" className="text-primary hover:underline">CCPA/CPRA</Link> (California),
                    PIPEDA (Canada), and Quebec&apos;s Law 25.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Do I need a cookie banner if the scanner finds tracking cookies?</h3>
                  <p className="text-muted-foreground">
                    Yes. If your website cookie scanner reveals non-essential cookies, you are legally required to implement a cookie consent banner that blocks these cookies until users explicitly opt in. You can{' '}
                    <Link href="/free-cookie-banner-generator" className="text-primary hover:underline">create a free cookie banner</Link>{' '}
                    using our platform.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">What should I do after running a cookie scan?</h3>
                  <p className="text-muted-foreground">
                    Review the detected cookies, remove unnecessary ones, update your cookie policy, implement or update your{' '}
                    <Link href="/free-cookie-banner-generator" className="text-primary hover:underline">cookie consent banner</Link>,
                    and set a reminder to re-scan in 3 months. Read our{' '}
                    <Link href="/blog/gdpr-cookie-consent-requirements" className="text-primary hover:underline">GDPR cookie consent guide</Link>{' '}
                    for detailed steps.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Does the cookie scanner work with any website platform?</h3>
                  <p className="text-muted-foreground">
                    Yes, our cookie scanner works with any publicly accessible website — WordPress, Shopify, Wix, Squarespace, Webflow, custom-built sites, and any other web platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Cookie Compliance Resources
                </h2>
                <p className="text-xl text-muted-foreground">
                  Guides and tools to help you achieve full cookie compliance after your scan
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Cookie Guide</CardTitle>
                    <CardDescription>Complete guide to GDPR cookie consent requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/gdpr-cookie-consent-requirements">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">CCPA Compliance</CardTitle>
                    <CardDescription>California Consumer Privacy Act cookie requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/ccpa">
                      <Button variant="outline" className="w-full">
                        CCPA Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Policy Template</CardTitle>
                    <CardDescription>Generate a compliant cookie policy for your website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/cookie-policy-template">
                      <Button variant="outline" className="w-full">
                        Get Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookiebot Alternative</CardTitle>
                    <CardDescription>Compare our solution vs Cookiebot pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compare/cookiebot-alternative">
                      <Button variant="outline" className="w-full">
                        Compare Now <ArrowRight className="ml-2 h-4 w-4" />
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
