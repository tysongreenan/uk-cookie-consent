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
  title: 'Cookie Scanner & Checker: Free, No Signup, Results in 30s',
  description: 'Paste any URL and see every cookie the page sets, sorted by category, with duration and first- or third-party. Useful context for GDPR, PIPEDA, Law 25 and CCPA. Free, no signup.',
  keywords: 'cookie scanner, cookie audit tool, cookie scan, cookie scanning tools, website cookie scanner, free cookie scanner, cookie checker, best cookie audit tool, web cookie scanner, free cookies audit software, cookie compliance checker, gdpr cookie scanner, online cookie scanner, website cookie checker, cookie scanning',
  openGraph: {
    title: 'Cookie Scanner & Checker: Free, No Signup, Results in 30s',
    description: 'See every cookie a page sets, sorted by category, with duration and first- or third-party. Free, no signup, about 30 seconds.',
    type: 'website',
    url: 'https://www.cookie-banner.ca/tools/cookie-scanner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Scanner & Checker: Free, No Signup, Results in 30s',
    description: 'See every cookie a page sets, sorted by category, with duration and first- or third-party. Free, no signup, about 30 seconds.',
  },
  alternates: {
    canonical: '/tools/cookie-scanner',
    types: {
      'text/markdown': '/tools/cookie-scanner.md',
    },
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
      "priceCurrency": "CAD"
    },
    "author": {
      "@type": "Organization",
      "name": "Cookie Banner",
      "url": "https://www.cookie-banner.ca"
    },
    "description": "Free cookie scanner and checker. Paste a public URL to list the cookies the page sets, sorted by category, with duration and first- or third-party.",
    "featureList": [
      "Lists cookies a public page sets",
      "Sorts cookies into categories",
      "Does not block cookies",
      "Does not decide compliance",
      "Free, no signup"
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
          "text": "A cookie audit tool lists the cookies a public page sets and sorts them into categories such as necessary, analytics, marketing, and functional. This scanner does that. It does not block cookies and it does not decide whether the site is compliant."
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
          "text": "Most scans finish in under 30 seconds. The scanner loads the public page and lists the cookies it finds. It does not produce a compliance grade."
        }
      },
      {
        "@type": "Question",
        "name": "What privacy laws does the cookie scanner check against?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The scan does not decide compliance with GDPR, CCPA, PIPEDA, or Law 25. It lists cookies and can show notes. Whether a cookie needs consent depends on the law and the visitor."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a cookie banner if the scanner finds tracking cookies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The scan does not answer that. A list of analytics or marketing cookies is a reason to read the rule for those visitors. The scanner does not block those cookies."
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
          "text": "This free scan lists cookies and categories on demand. It does not block cookies, schedule scans, or decide compliance."
        }
      },
      {
        "@type": "Question",
        "name": "Can a cookie checker detect all types of tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A comprehensive cookie checker detects HTTP cookies, JavaScript cookies, third-party tracking pixels, localStorage and sessionStorage usage. Our web cookie scanner identifies both first-party and third-party cookies, including those set dynamically by JavaScript after page load."
        }
      },
      {
        "@type": "Question",
        "name": "Does the cookie scanner work with WordPress, Shopify, and other platforms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our cookie scanner works with any publicly accessible website regardless of platform — WordPress, Shopify, Wix, Squarespace, Next.js, custom-built sites, and any other web platform. The scanner loads your site in a real browser, so it detects cookies the same way your visitors experience them."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between first-party and third-party cookies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First-party cookies are set by your own domain and typically handle sessions, authentication, and user preferences. Third-party cookies are set by external services embedded on your site — like Google Analytics, Facebook Pixel, or advertising networks. Third-party cookies are more heavily regulated because they can track users across multiple websites."
        }
      },
      {
        "@type": "Question",
        "name": "How do I fix compliance issues found by the cookie scanner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The scan does not find a compliance grade. If you want scripts you add to wait for a choice, start a banner. It cannot block cookies other code sets. Update the cookie policy so it lists what the scan found."
        }
      },
      {
        "@type": "Question",
        "name": "Is a cookie scan the same as a privacy audit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cookie scan is one component of a broader privacy audit. It focuses specifically on cookies and tracking technologies. A full privacy audit also covers data processing agreements, privacy policies, data retention practices, user rights fulfillment, and organizational security measures. However, a cookie scan is often the most actionable first step because it reveals concrete, fixable issues."
        }
      }
    ]
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Hero: compact, top-aligned so the URL field stays above the site cookie banner */}
        <section className="pt-6 pb-28 sm:pt-10 sm:pb-16 md:pt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="border border-border rounded-full px-3 py-1 text-xs font-mono tracking-wide uppercase text-muted-foreground inline-block mb-3">
                Free &mdash; No Signup Required
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
                Free Cookie Scanner &amp; Checker
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6">
                Paste a URL. See every cookie it sets, sorted by category, in about 30 seconds. No signup.
              </p>

              <CookieScanner />
              <noscript>
                <p className="text-sm text-muted-foreground mt-6">
                  The scanner needs JavaScript. Read the{' '}
                  <a href="/tools/cookie-scanner.md">markdown guide</a> for what it does and how to run it in a browser.
                </p>
              </noscript>

              <p className="text-xs text-muted-foreground mt-5 sm:mt-8">
                <Link href="#what-is-cookie-scanner" className="hover:underline">
                  Learn more about cookie scanning &darr;
                </Link>
                {' · '}
                <Link href="/tools/cookie-scanner.md" className="hover:underline">
                  Read as markdown
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
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-xs text-muted-foreground">Cookie categories sorted</div>
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
                    <span><strong>Cookie categories</strong> -- each cookie sorted as necessary, functional, analytics, or marketing. The category is not a legal decision.</span>
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
                    <span><strong>Notes, not a grade</strong> -- the list can include notes. It does not decide whether the site meets GDPR, CCPA, PIPEDA, or Law 25.</span>
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
                      <Link href="/compliance/gdpr" className="text-primary hover:underline">GDPR</Link>,{' '}
                      <Link href="/compliance/pipeda" className="text-primary hover:underline">PIPEDA</Link>, Law 25, and{' '}
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
                      Lists every cookie with its category, duration and party, so you can share it with your developer or privacy lead. It does not decide whether the site is compliant.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Types Explained */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Cookie Types Explained: What the Scanner Detects
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Understanding what each cookie category means is essential for configuring your consent banner correctly. Here is what our <strong>cookie scanner</strong> looks for in each category:
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Strictly Necessary Cookies</h3>
                <p>
                  These cookies are essential for your website to function. They handle session management, authentication, shopping cart functionality, and security features. Under <Link href="/compliance/gdpr" className="text-primary hover:underline font-medium">GDPR</Link>, <Link href="/compliance/ccpa" className="text-primary hover:underline font-medium">CCPA</Link>, and <Link href="/compliance/pipeda" className="text-primary hover:underline font-medium">PIPEDA</Link>, strictly necessary cookies do not require user consent because the website cannot operate without them. Examples include session IDs, CSRF tokens, and load balancer cookies.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Functional Cookies</h3>
                <p>
                  Functional cookies remember user preferences like language selection, theme (dark/light mode), and region settings. They improve the user experience but are not strictly required for the site to work. Most privacy laws require consent before setting functional cookies, though PIPEDA allows implied consent for non-sensitive functional cookies when clear notice is provided.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Analytics Cookies</h3>
                <p>
                  Analytics cookies track how visitors interact with your website — page views, scroll depth, click patterns, and session duration. Google Analytics (_ga, _gid), Hotjar, Mixpanel, and similar tools use these cookies. Under the EU GDPR they need opt-in consent before they load. In the UK, since 5 February 2026, cookies used only to collect statistics about that site can run without prior consent if people have a simple, free way to object. A tool that shares identifiers with an advertising network is outside that exception. Under CCPA, analytics cookies generally do not trigger the &quot;Do Not Sell or Share&quot; duty unless the data is sold or shared for cross-context advertising.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Marketing &amp; Advertising Cookies</h3>
                <p>
                  Marketing cookies track users across websites to build advertising profiles. These include Facebook Pixel (_fbp), Google Ads (IDE, _gcl_*), and programmatic advertising cookies. Marketing cookies always require explicit opt-in consent under GDPR and trigger the &quot;Do Not Sell or Share&quot; disclosure under CCPA. These are typically the highest-risk cookies on any website and should be blocked by default until consent is granted.
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
                    A cookie audit tool lists the cookies a public page sets and sorts them into categories such as necessary, analytics, marketing, and functional. This scanner does that. It does not block cookies and it does not decide whether the site is compliant.
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
                    The scan does not decide compliance with{' '}
                    <Link href="/blog/gdpr-cookie-consent-requirements" className="text-primary hover:underline">GDPR</Link>,{' '}
                    <Link href="/compliance/ccpa" className="text-primary hover:underline">CCPA</Link>, or{' '}
                    <Link href="/compliance/pipeda" className="text-primary hover:underline">PIPEDA</Link>.
                    It lists cookies and can show notes. Whether a cookie needs consent depends on the law and the visitor.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Do I need a cookie banner if the scanner finds tracking cookies?</h3>
                  <p className="text-muted-foreground">
                    The scan does not answer that. A list of analytics or marketing cookies is a reason to read the rule for those visitors. The scanner does not block those cookies. You can{' '}
                    <Link href="/free-cookie-banner" className="text-primary hover:underline">start a free banner</Link>{' '}
                    after you decide which scripts should wait for a choice.
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
                    Yes, our cookie scanner works with any publicly accessible website — WordPress, Shopify, Wix, Squarespace, custom-built sites, and any other web platform.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">What is the difference between first-party and third-party cookies?</h3>
                  <p className="text-muted-foreground">
                    First-party cookies are set by your own domain and typically handle sessions, authentication, and user preferences. Third-party cookies are set by external services embedded on your site — like Google Analytics, Facebook Pixel, or advertising networks. Third-party cookies are more heavily regulated because they can track users across multiple websites.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">How do I fix compliance issues found by the cookie scanner?</h3>
                  <p className="text-muted-foreground">
                    The scan does not find a compliance grade. If you want scripts you add to wait for a choice, start a{' '}
                    <Link href="/free-cookie-banner" className="text-primary hover:underline">banner</Link>.
                    It cannot block cookies other code sets. Update the cookie policy so it lists what the scan found.
                  </p>
                </div>

                <div className="border-2 rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Is a cookie scan the same as a privacy audit?</h3>
                  <p className="text-muted-foreground">
                    A cookie scan is one component of a broader privacy audit. It focuses specifically on cookies and tracking technologies. A full privacy audit also covers data processing agreements, privacy policies, data retention practices, and security measures. However, a cookie scan is often the most actionable first step because it reveals concrete, fixable issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Do After Your Cookie Scan */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What to Do After Your Cookie Scan
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                A scan is an inventory. These five steps turn it into a consent setup that matches the cookies on your site.
              </p>

              <ol className="space-y-6 list-none pl-0">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Block non-essential cookies until opt-in</h3>
                    <p className="text-muted-foreground">
                      Analytics, marketing, and most functional cookies should not fire until a visitor accepts.{' '}
                      <Link href="/free-cookie-banner" className="text-primary hover:underline font-medium">
                        Start a free cookie banner
                      </Link>{' '}
                      that holds those scripts until consent.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Match the banner to cookies the scanner found</h3>
                    <p className="text-muted-foreground">
                      Map each cookie to necessary, functional, analytics, or marketing. Your banner categories should match this inventory — not a generic list of cookies you hoped were there.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Update your cookie and privacy policy</h3>
                    <p className="text-muted-foreground">
                      List every cookie the scanner returned: name, provider, purpose, and expiry. Start from a{' '}
                      <Link href="/cookie-policy-template" className="text-primary hover:underline font-medium">
                        cookie policy template
                      </Link>{' '}
                      and fill in what you actually use.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Wire Google tags to Consent Mode v2</h3>
                    <p className="text-muted-foreground">
                      If you use Google Analytics or Ads, send consent signals so tags wait for the visitor&apos;s choice. Follow the{' '}
                      <Link href="/blog/google-tag-manager-cookie-consent-guide" className="text-primary hover:underline font-medium">
                        Google Tag Manager cookie consent guide
                      </Link>.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Re-scan after shipping</h3>
                    <p className="text-muted-foreground">
                      A second scan lists cookies. It does not prove the banner blocked them. See{' '}
                      <Link href="/features/how-it-works" className="text-primary hover:underline font-medium">
                        how verification works
                      </Link>.
                    </p>
                  </div>
                </li>
              </ol>

              <Card className="mt-10 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Ready to fix what the scanner found?</CardTitle>
                  <CardDescription>
                    Scripts you add can stay off until a choice. The free plan is one banner. The banner cannot block cookies other code sets.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/free-cookie-banner">
                    <Button size="lg">
                      Start a free banner
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 md:py-16 bg-background">
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
                    <CardTitle className="text-lg">PIPEDA Cookie Banner</CardTitle>
                    <CardDescription>Canadian PIPEDA cookie consent requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/pipeda">
                      <Button variant="outline" className="w-full">
                        PIPEDA Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Canada Cookie Guide</CardTitle>
                    <CardDescription>Federal and provincial cookie rules for Canadian sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/cookie-consent-canada-guide-2026">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Audit Playbook</CardTitle>
                    <CardDescription>Step-by-step cookie scan and remediation process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/blog/cookie-scanner-audit-guide">
                      <Button variant="outline" className="w-full">
                        Read Playbook <ArrowRight className="ml-2 h-4 w-4" />
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
