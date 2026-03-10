import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StructuredData } from '@/components/seo/structured-data'
import { Code, Zap, CheckCircle, Shield, Rocket, Globe, Settings, ExternalLink, BarChart3, Gauge, Package, FileCode } from 'lucide-react'

export const metadata: Metadata = {
  title: 'React Cookie Consent: Lightweight Banner for React & Next.js (2026)',
  description: 'Add a lightweight, GDPR-compliant react cookie consent banner to your app in 2 minutes. Works with Next.js App Router, Vite, and CRA. No npm package bloat. Integrates with Google Analytics, Facebook Pixel, and more.',
  keywords: 'react cookie consent, react cookie banner, react-cookie-consent, npm cookie consent, cookie consent npm, lightweight cookie consent for react apps, react-cookie-consent google analytics, nextjs cookie banner, react gdpr compliance',
  openGraph: {
    title: 'React Cookie Consent: Lightweight Banner for React & Next.js (2026)',
    description: 'Add a lightweight, GDPR-compliant react cookie consent banner to your app in 2 minutes. No npm package bloat. Integrates with Google Analytics.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/react',
  },
}

export default function ReactIntegrationPage() {
  const faqData = [
    {
      question: "Does this react cookie consent solution work with Next.js 14 and the App Router?",
      answer: "Yes! Our react cookie consent banner works perfectly with Next.js 15, 14, 13, and older versions. It is compatible with both the App Router (app directory) and Pages Router (pages directory). For App Router, use the Next.js Script component with strategy='beforeInteractive'. For Pages Router, add it to _document.tsx. Both methods are shown in the installation guide above."
    },
    {
      question: "Will this cookie consent npm solution affect my Core Web Vitals?",
      answer: "No. Unlike heavy npm cookie consent packages that add 30-50KB to your bundle, our script loads asynchronously from a CDN. It will not block your page rendering or negatively impact your Largest Contentful Paint (LCP), Interaction to Next Paint (INP), or Cumulative Layout Shift (CLS) scores. Our lightweight cookie consent for React apps is specifically optimized for performance."
    },
    {
      question: "Do I need to redeploy my React app to update the cookie banner?",
      answer: "No! That is the key advantage of our hosted react cookie banner approach over npm packages like react-cookie-consent. Make changes in our visual dashboard and click 'Push Live' -- your changes appear on your live site within seconds. No code changes, no npm update, no CI/CD pipeline, no redeployment, no downtime."
    },
    {
      question: "Is there an npm package (cookie consent npm) available?",
      answer: "We intentionally use a hosted script approach instead of an npm cookie consent package. This gives you instant updates without dependency management, zero bundle size impact, no version conflicts, and no need to rebuild your app. The script loads from our global CDN which is optimized for fast delivery. Many teams switch from npm packages like react-cookie-consent to our solution to reduce maintenance overhead."
    },
    {
      question: "How does the react-cookie-consent Google Analytics integration work?",
      answer: "Our cookie banner automatically manages Google Analytics consent. Place our script before your GA4 tag, and it will block Google Analytics from loading until the user accepts analytics cookies. When consent is granted, GA4 loads automatically. When consent is withdrawn, tracking stops. This works with both gtag.js and Google Tag Manager, and fully supports Google Consent Mode v2."
    },
    {
      question: "How do I customize the react cookie banner colors and text?",
      answer: "Use our visual builder in the dashboard. You can customize colors, fonts, text, button styles, position, animations, and all compliance settings. See your changes in real-time before deploying. No CSS overrides or custom styling code needed -- everything is configurable through the UI."
    },
    {
      question: "Does this block Facebook Pixel and other tracking scripts automatically?",
      answer: "Yes. When you place our react cookie consent script before your tracking scripts (using strategy='beforeInteractive' in Next.js or placing it first in your HTML head), it automatically blocks Facebook Pixel, Google Analytics, TikTok Pixel, LinkedIn Insight Tag, and other marketing scripts until the user consents. You can also use our cookie scanner tool to identify all cookies on your site."
    },
    {
      question: "What is the lightest cookie consent solution for React apps?",
      answer: "Our hosted solution adds zero bytes to your JavaScript bundle because it loads externally. Traditional npm cookie consent packages like react-cookie-consent add 15-50KB to your bundle. Our script is under 8KB gzipped, loads asynchronously, and is cached on a global CDN. This makes it the lightest cookie consent solution available for React applications."
    },
    {
      question: "Can I use this react cookie consent with TypeScript?",
      answer: "Absolutely. Since our solution uses a script tag rather than an npm package, there are no TypeScript types to configure. It works seamlessly in TypeScript React projects, TypeScript Next.js projects, and any other TypeScript setup. The integration code shown in our examples above is already TypeScript-compatible."
    },
    {
      question: "Is this react cookie banner GDPR, PIPEDA, and CCPA compliant?",
      answer: "Yes. Our cookie consent banner supports GDPR (EU), PIPEDA (Canada), CCPA/CPRA (California), LGPD (Brazil), and other global privacy regulations. You can configure the compliance mode in our dashboard based on your audience location. The banner automatically adjusts its behavior -- for example, GDPR requires opt-in consent while CCPA requires opt-out. Learn more in our GDPR cookie consent requirements guide."
    }
  ]

  const articleData = {
    title: "React Cookie Consent: Complete Guide for 2026",
    description: "Learn how to add a lightweight, GDPR-compliant cookie consent banner to your React or Next.js application. Covers installation, Google Analytics integration, and best practices.",
    datePublished: "2025-01-15",
    dateModified: "2026-03-09"
  }

  const breadcrumbData = [
    { name: "Home", url: "https://www.cookie-banner.ca" },
    { name: "Integrations", url: "https://www.cookie-banner.ca/integrations" },
    { name: "React Cookie Consent", url: "https://www.cookie-banner.ca/integrations/react" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <StructuredData type="faq" data={faqData} />
      <StructuredData type="article" data={articleData} />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "React & Next.js Integration",
          }}
          title="React Cookie Consent"
          title2="Lightweight, GDPR-Compliant"
          description="Add a lightweight react cookie consent banner to your React or Next.js app in under 2 minutes. No npm packages to install, no bundle bloat, no maintenance headaches. Design your cookie banner in our visual builder, copy one script tag, and you are compliant."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* React Cookie Consent: Complete Guide */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  React Cookie Consent: Complete Guide
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need to know about adding cookie consent to React applications
                </p>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="space-y-6 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    If you are building a React application that serves users in the EU, Canada, California, or Brazil, you need a <strong>react cookie consent</strong> solution that actually works. GDPR, PIPEDA, CCPA, and LGPD all require you to get informed consent before setting non-essential cookies -- and violations can result in fines up to 4% of your annual revenue.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Most developers reach for an npm cookie consent package like <code className="bg-muted px-2 py-1 rounded text-sm">react-cookie-consent</code> -- but these packages come with real trade-offs. They add 15-50KB to your bundle, require manual updates when privacy laws change, need custom CSS to match your brand, and often lack proper consent management for third-party scripts like Google Analytics or Facebook Pixel.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our approach is different. Instead of a <strong>cookie consent npm</strong> package, we provide a hosted script that loads asynchronously from a global CDN. This means zero impact on your bundle size, no dependency maintenance, and instant updates when you change your banner design or compliance settings. It is the <strong>lightweight cookie consent for React apps</strong> that developers actually want.
                  </p>
                </div>
              </div>

              {/* Why Not an NPM Package */}
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <Package className="h-5 w-5" />
                      Traditional NPM Packages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>Adds 15-50KB to your JavaScript bundle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>Manual npm updates when laws or features change</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>Custom CSS required to match your brand</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>Requires code changes for every banner update</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>Version conflicts with other dependencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 shrink-0">x</span>
                        <span>CI/CD rebuild needed for every change</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Zap className="h-5 w-5" />
                      Our Hosted Script Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>Zero bytes added to your bundle (0KB)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>Automatic updates -- always current with privacy laws</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>Visual builder -- no CSS or code needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>Push Live from dashboard -- instant changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>No dependency conflicts, ever</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">+</span>
                        <span>No rebuild or redeployment required</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Installing the Cookie Consent NPM Package */}
        <section id="installation" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Installing the Cookie Consent NPM Package
                </h2>
                <p className="text-xl text-muted-foreground">
                  No npm install required -- just one script tag in your layout
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground mb-12">
                <p className="text-lg leading-relaxed">
                  Unlike traditional <strong>cookie consent npm</strong> packages that require <code className="bg-muted px-2 py-1 rounded text-sm">npm install react-cookie-consent</code> followed by component imports, provider wrappers, and configuration objects, our solution takes a radically simpler approach. You add a single script tag to your application and the banner just works.
                </p>
                <p className="text-lg leading-relaxed">
                  This is not a compromise -- it is an upgrade. The hosted script is under 8KB gzipped, loads asynchronously so it never blocks rendering, and gets served from a global CDN with edge caching. Your <Link href="/tools/cookie-scanner" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">cookie scanner</Link> results will confirm that it adds zero cookies before consent is given.
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1: Create Account */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-xl">Create Your Banner in the Dashboard</CardTitle>
                        <CardDescription>Sign up for free and use our visual builder</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Head to our dashboard and create a free account. Our visual builder lets you configure every aspect of your react cookie banner:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>Choose your banner colors, fonts, and layout to match your brand</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>Write your cookie consent message in plain language</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>Configure cookie categories (Necessary, Analytics, Marketing, Preferences)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>Set compliance mode for GDPR, PIPEDA, CCPA, or auto-detect by region</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        <span>Preview your banner in real-time before going live</span>
                      </li>
                    </ul>
                    <p className="text-muted-foreground mb-4">
                      When you are happy with your design, click &quot;Get Code&quot; to get your unique script tag. Need help understanding <Link href="/blog/gdpr-cookie-consent-requirements" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">GDPR cookie consent requirements</Link>? Our guide covers everything.
                    </p>
                    <Link href="/auth/register">
                      <Button>
                        <Rocket className="mr-2 h-4 w-4" />
                        Create Free Account
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Step 2: Copy script */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-xl">Copy the Script Tag</CardTitle>
                        <CardDescription>One line of code -- that is it</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      The dashboard gives you a script tag like this:
                    </p>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<script src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js" async></script>`}</pre>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-900 dark:text-blue-100">
                        <strong>Replace YOUR_BANNER_ID</strong> with the actual ID from your dashboard. The full script URL is provided when you click &quot;Get Code&quot; in the builder.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3: Deploy */}
                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg">
                        3
                      </div>
                      <div>
                        <CardTitle className="text-xl">Deploy and You Are Done</CardTitle>
                        <CardDescription>Your react cookie banner is now live</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deploy your React app and the cookie consent banner appears automatically. Future changes? Log into the dashboard, update your banner, and click &quot;Push Live&quot;. Changes appear on your site within seconds -- no code changes, no redeployment, no downtime.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">No redeployment needed</Badge>
                      <Badge variant="secondary">Instant updates</Badge>
                      <Badge variant="secondary">Zero maintenance</Badge>
                      <Badge variant="secondary">Under 8KB gzipped</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Basic React Cookie Banner Setup */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Basic React Cookie Banner Setup
                </h2>
                <p className="text-xl text-muted-foreground">
                  Code examples for every React setup -- Next.js, Vite, Create React App, and more
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  The placement of your <strong>react cookie banner</strong> script matters. It must load before any analytics or marketing scripts to ensure they are blocked until the user gives consent. Below are copy-paste examples for every major React framework.
                </p>
              </div>

              <div className="space-y-8">
                {/* Next.js App Router */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-blue-500" />
                      Next.js App Router (Recommended)
                    </CardTitle>
                    <CardDescription>For Next.js 13+, 14, and 15 with the app directory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Open your <code className="bg-muted px-2 py-1 rounded text-sm">app/layout.tsx</code> file and add the Script component. Using <code className="bg-muted px-2 py-1 rounded text-sm">strategy=&quot;beforeInteractive&quot;</code> ensures the cookie banner loads before any tracking scripts:
                      </p>
                      <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Cookie Consent Banner - loads before tracking scripts */}
        <Script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`}</pre>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Why beforeInteractive?</strong> This Next.js script strategy injects the script into the initial HTML document, ensuring it runs before any client-side JavaScript. This is critical for blocking analytics scripts until consent is given.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next.js Pages Router */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-gray-500" />
                      Next.js Pages Router
                    </CardTitle>
                    <CardDescription>For Next.js projects using the pages directory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Add the script to your <code className="bg-muted px-2 py-1 rounded text-sm">pages/_document.tsx</code> file:
                      </p>
                      <div className="bg-gray-900 text-blue-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Cookie Consent Banner */}
        <script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vite / CRA */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-purple-500" />
                      Vite or Create React App
                    </CardTitle>
                    <CardDescription>For standard React projects without a framework</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Add the script tag directly to your <code className="bg-muted px-2 py-1 rounded text-sm">index.html</code> (Vite) or <code className="bg-muted px-2 py-1 rounded text-sm">public/index.html</code> (CRA) file:
                      </p>
                      <div className="bg-gray-900 text-purple-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`<!-- index.html (Vite) or public/index.html (CRA) -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My React App</title>

    <!-- Cookie Consent Banner - MUST be before analytics scripts -->
    <script
      src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
      async
    ></script>

    <!-- Google Analytics, Facebook Pixel, etc. go AFTER the cookie script -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`}</pre>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>Important:</strong> Place the cookie consent script <strong>before</strong> any analytics or tracking scripts (Google Analytics, Facebook Pixel, etc.) to ensure they only load after the user gives consent.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Remix */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-orange-500" />
                      Remix
                    </CardTitle>
                    <CardDescription>For Remix React applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Add the script to your <code className="bg-muted px-2 py-1 rounded text-sm">app/root.tsx</code> file inside the head:
                      </p>
                      <div className="bg-gray-900 text-orange-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`// app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Cookie Consent Banner */}
        <script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          async
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* React Cookie Consent with Google Analytics */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  React Cookie Consent with Google Analytics
                </h2>
                <p className="text-xl text-muted-foreground">
                  Automatically manage GA4 consent in your React app
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  One of the most common requirements for a <strong>react-cookie-consent Google Analytics</strong> integration is ensuring that GA4 does not fire until the user accepts analytics cookies. Our solution handles this automatically -- no custom event listeners, no manual consent state management, and full support for <strong>Google Consent Mode v2</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Here is how it works: when our script loads, it sets the default Google consent state to &quot;denied&quot; for analytics and marketing. When a user accepts cookies, the consent state updates to &quot;granted&quot; and Google Analytics begins tracking. If the user later withdraws consent, tracking stops. All of this happens without any code on your end.
                </p>
              </div>

              <Card className="border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Next.js App Router with GA4 and Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Step 1: Cookie Consent - MUST load first */}
        <Script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          strategy="beforeInteractive"
        />

        {/* Step 2: Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          \`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}`}</pre>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      <strong>That is all the code you need.</strong> Our cookie consent script automatically detects Google Analytics and manages consent states using Google Consent Mode v2. No additional configuration required.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Vite/CRA with GA4, Facebook Pixel, and Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-purple-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`<!-- index.html -->
<head>
  <!-- Cookie Consent - loads first, blocks tracking until consent -->
  <script
    src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
    async
  ></script>

  <!-- Google Analytics - blocked until analytics consent -->
  <script async
    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX">
  </script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Facebook Pixel - blocked until marketing consent -->
  <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
    n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
</head>`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Our script categorizes third-party cookies automatically. Google Analytics is blocked under the &quot;Analytics&quot; category, while Facebook Pixel and similar marketing tags are blocked under the &quot;Marketing&quot; category. Users can grant or deny consent per category.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">Supported Third-Party Scripts</h3>
                <p className="text-lg leading-relaxed">
                  Our react cookie consent solution automatically manages consent for all major analytics and marketing platforms:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Google Analytics (GA4 / gtag.js)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Google Tag Manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Facebook / Meta Pixel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>TikTok Pixel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Microsoft Clarity</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>LinkedIn Insight Tag</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Hotjar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Mixpanel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Segment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>HubSpot Tracking</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg leading-relaxed mt-4">
                  Not sure which cookies your React app currently sets? Use our free <Link href="/tools/cookie-scanner" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">cookie scanner tool</Link> to get a full audit of all cookies and tracking scripts on your site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lightweight Cookie Consent for React Apps */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Lightweight Cookie Consent for React Apps
                </h2>
                <p className="text-xl text-muted-foreground">
                  Why bundle size matters -- and how we keep it at zero
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  React developers care about performance. Every kilobyte in your bundle affects load times, Core Web Vitals, and ultimately your Google search rankings. That is why choosing a <strong>lightweight cookie consent for React apps</strong> is not just a nice-to-have -- it is a competitive advantage.
                </p>
                <p className="text-lg leading-relaxed">
                  Here is how popular cookie consent solutions compare in terms of bundle impact:
                </p>
              </div>

              {/* Performance Comparison */}
              <Card className="border-2 mb-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-green-500" />
                    Bundle Size Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-48 text-sm font-medium shrink-0">Cookie Banner (ours)</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <div className="text-sm font-bold text-green-600 w-20 text-right">0 KB</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-48 text-sm font-medium shrink-0">react-cookie-consent</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <div className="text-sm font-bold text-yellow-600 w-20 text-right">~15 KB</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-48 text-sm font-medium shrink-0">cookieconsent (npm)</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <div className="text-sm font-bold text-orange-600 w-20 text-right">~25 KB</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-48 text-sm font-medium shrink-0">Osano / OneTrust</div>
                      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <div className="text-sm font-bold text-red-600 w-20 text-right">50-200 KB</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Our solution adds 0 KB to your bundle because the script loads externally. The external script itself is under 8KB gzipped and is cached on a global CDN.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">Performance Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Async Loading
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The script loads asynchronously and never blocks your page critical rendering path. Your LCP score stays unaffected.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-500" />
                        Global CDN
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Served from edge locations worldwide. Users load the script from the nearest server, typically in under 50ms.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        No CLS Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Our banner is designed to avoid Cumulative Layout Shift. It overlays your content rather than pushing it down.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next.js Cookie Consent Integration */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Next.js Cookie Consent Integration
                </h2>
                <p className="text-xl text-muted-foreground">
                  Advanced patterns for Next.js App Router, middleware, and server components
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  Next.js is the most popular React framework, and it has specific requirements for cookie consent. The App Router, server components, and middleware all affect how and where you should load your cookie banner script. Here are the patterns that work best.
                </p>
              </div>

              {/* Conditional Loading by Route */}
              <Card className="border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-500" />
                    Conditional Loading by Route Group
                  </CardTitle>
                  <CardDescription>Only show the cookie banner on public pages, not in your admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// app/(public)/layout.tsx
// This layout applies to all public-facing routes
import Script from 'next/script'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Only loads cookie banner on public routes */}
      <Script
        src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  )
}

// app/(dashboard)/layout.tsx
// No cookie banner needed for authenticated dashboard pages
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Next.js route groups (folders wrapped in parentheses) let you apply different layouts to different sections of your app. This is useful when you only need the cookie banner on public-facing pages.
                  </p>
                </CardContent>
              </Card>

              {/* React Hook for Consent State */}
              <Card className="border-2 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-500" />
                    Reading Consent State in React Components
                  </CardTitle>
                  <CardDescription>Access the user consent choices from your React code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-purple-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// hooks/use-cookie-consent.ts
'use client'

import { useState, useEffect } from 'react'

export function useCookieConsent() {
  const [consent, setConsent] = useState<{
    analytics: boolean
    marketing: boolean
    preferences: boolean
  }>({
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Listen for consent changes from the cookie banner
    const handleConsent = (event: CustomEvent) => {
      setConsent(event.detail)
    }

    window.addEventListener(
      'cookie-consent-update',
      handleConsent as EventListener
    )

    return () => {
      window.removeEventListener(
        'cookie-consent-update',
        handleConsent as EventListener
      )
    }
  }, [])

  return consent
}

// Usage in a component:
// const { analytics, marketing } = useCookieConsent()
// if (analytics) { /* load analytics features */ }`}</pre>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Our cookie banner dispatches a <code className="bg-muted px-1 py-0.5 rounded text-xs">cookie-consent-update</code> CustomEvent whenever the user changes their preferences. You can listen for this event in any React component to conditionally render features that require consent.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6 text-muted-foreground">
                <h3 className="text-xl font-semibold text-foreground">Next.js-Specific Benefits</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Server Component compatible</strong> -- the script tag loads independently of your React component tree, so it works with both server and client components.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>App Router and Pages Router</strong> -- tested and supported on both routing systems. We maintain code examples for both.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Static exports work</strong> -- if you use <code className="bg-muted px-1 py-0.5 rounded text-xs">next export</code> for static site generation, the script tag is included in the HTML output.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Edge Runtime compatible</strong> -- no server-side dependencies, so your app works on Vercel Edge, Cloudflare Workers, or any edge platform.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <span><strong>Turbopack ready</strong> -- because we do not use an npm package, there are no bundler compatibility issues with Turbopack or any other bundler.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about react cookie consent, npm packages, and compliance
                </p>
              </div>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Platforms Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Not Using React? We Have Got You Covered
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our cookie consent solution works with all major web platforms
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      WordPress Cookie Consent
                    </CardTitle>
                    <CardDescription>Simple plugin installation for WordPress sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/wordpress">
                      <Button variant="outline" className="w-full">
                        View WordPress Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-green-500" />
                      Shopify Cookie Consent
                    </CardTitle>
                    <CardDescription>E-commerce focused cookie consent for Shopify stores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/shopify">
                      <Button variant="outline" className="w-full">
                        View Shopify Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-500" />
                      Webflow Cookie Consent
                    </CardTitle>
                    <CardDescription>No-code integration for Webflow websites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/webflow">
                      <Button variant="outline" className="w-full">
                        View Webflow Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-orange-500" />
                      Google Tag Manager
                    </CardTitle>
                    <CardDescription>Integrate with GTM for advanced tracking control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/google-tag-manager">
                      <Button variant="outline" className="w-full">
                        View GTM Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Want to learn more about cookie consent compliance? Read our comprehensive guide on{' '}
                  <Link href="/blog/gdpr-cookie-consent-requirements" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
                    GDPR cookie consent requirements
                  </Link>{' '}
                  or scan your site with our free{' '}
                  <Link href="/tools/cookie-scanner" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">
                    cookie scanner tool
                  </Link>.
                </p>
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
