'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StructuredData } from '@/components/seo/structured-data'
import { motion } from 'framer-motion'
import {
  Code,
  Zap,
  CheckCircle,
  Shield,
  Rocket,
  Globe,
  Settings,
  ExternalLink,
  BarChart3,
  Gauge,
  Package,
  FileCode,
  ArrowRight,
  Circle,
  Clock,
} from 'lucide-react'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.3 + i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
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
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          {/* Background grid */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />

          <div className="container max-w-7xl px-4 sm:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center gap-8 relative z-10">
              {/* Badge */}
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                  <Circle className="h-2 w-2 fill-foreground/60" />
                  <span className="text-sm text-muted-foreground tracking-wide">
                    React &amp; Next.js Integration
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-4xl space-y-4"
              >
                <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    React Cookie Consent
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Lightweight, GDPR-Compliant
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Add a lightweight react cookie consent banner to your React or Next.js app in under 2 minutes. No npm packages to install, no bundle bloat, no maintenance headaches. Design your cookie banner in our visual builder, copy one script tag, and you are compliant.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Banner Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#installation">
                    View Installation Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* React Cookie Consent: Complete Guide */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  React Cookie Consent: Complete Guide
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about adding cookie consent to React applications
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-6 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    If you are building a React application that serves users in the EU, Canada, California, or Brazil, you need a <strong className="text-foreground">react cookie consent</strong> solution that actually works. GDPR, PIPEDA, CCPA, and LGPD all require you to get informed consent before setting non-essential cookies -- and violations can result in fines up to 4% of your annual revenue.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Most developers reach for an npm cookie consent package like <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">react-cookie-consent</code> -- but these packages come with real trade-offs. They add 15-50KB to your bundle, require manual updates when privacy laws change, need custom CSS to match your brand, and often lack proper consent management for third-party scripts like Google Analytics or Facebook Pixel.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our approach is different. Instead of a <strong className="text-foreground">cookie consent npm</strong> package, we provide a hosted script that loads asynchronously from a global CDN. This means zero impact on your bundle size, no dependency maintenance, and instant updates when you change your banner design or compliance settings. It is the <strong className="text-foreground">lightweight cookie consent for React apps</strong> that developers actually want.
                  </p>
                </div>
              </motion.div>

              {/* Why Not an NPM Package */}
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2 text-destructive">
                        <Package className="h-5 w-5" />
                        Traditional NPM Packages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>Adds 15-50KB to your JavaScript bundle</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>Manual npm updates when laws or features change</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>Custom CSS required to match your brand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>Requires code changes for every banner update</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>Version conflicts with other dependencies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-0.5 shrink-0">x</span>
                          <span>CI/CD rebuild needed for every change</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-primary/30 bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2 text-primary">
                        <Zap className="h-5 w-5" />
                        Our Hosted Script Approach
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>Zero bytes added to your bundle (0KB)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>Automatic updates -- always current with privacy laws</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>Visual builder -- no CSS or code needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>Push Live from dashboard -- instant changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>No dependency conflicts, ever</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">+</span>
                          <span>No rebuild or redeployment required</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Installing the Cookie Consent NPM Package */}
        <section id="installation" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Installing the Cookie Consent NPM Package
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No npm install required -- just one script tag in your layout
                </p>
              </motion.div>

              <div className="space-y-6 text-muted-foreground mb-12">
                <p className="text-lg leading-relaxed">
                  Unlike traditional <strong className="text-foreground">cookie consent npm</strong> packages that require <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">npm install react-cookie-consent</code> followed by component imports, provider wrappers, and configuration objects, our solution takes a radically simpler approach. You add a single script tag to your application and the banner just works.
                </p>
                <p className="text-lg leading-relaxed">
                  This is not a compromise -- it is an upgrade. The hosted script is under 8KB gzipped, loads asynchronously so it never blocks rendering, and gets served from a global CDN with edge caching. Your <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">cookie scanner</Link> results will confirm that it adds zero cookies before consent is given.
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1: Create Account */}
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <span className="font-heading font-semibold text-foreground">1</span>
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">Create Your Banner in the Dashboard</CardTitle>
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
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Choose your banner colors, fonts, and layout to match your brand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Write your cookie consent message in plain language</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Configure cookie categories (Necessary, Analytics, Marketing, Preferences)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Set compliance mode for GDPR, PIPEDA, CCPA, or auto-detect by region</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Preview your banner in real-time before going live</span>
                        </li>
                      </ul>
                      <p className="text-muted-foreground mb-4">
                        When you are happy with your design, click &quot;Get Code&quot; to get your unique script tag. Need help understanding <Link href="/blog/gdpr-cookie-consent-requirements" className="text-primary underline hover:no-underline">GDPR cookie consent requirements</Link>? Our guide covers everything.
                      </p>
                      <Button asChild>
                        <Link href="/auth/register">
                          <Rocket className="mr-2 h-4 w-4" />
                          Create Free Account
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Step 2: Copy script */}
                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <span className="font-heading font-semibold text-foreground">2</span>
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">Copy the Script Tag</CardTitle>
                          <CardDescription>One line of code -- that is it</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        The dashboard gives you a script tag like this:
                      </p>
                      <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
                        <pre>{`<script src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js" async></script>`}</pre>
                      </div>
                      <div className="bg-muted border border-border rounded-lg p-4 mt-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Replace YOUR_BANNER_ID</strong> with the actual ID from your dashboard. The full script URL is provided when you click &quot;Get Code&quot; in the builder.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Step 3: Deploy */}
                <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-primary/30 bg-background">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <span className="font-heading font-semibold text-foreground">3</span>
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">Deploy and You Are Done</CardTitle>
                          <CardDescription>Your react cookie banner is now live</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Deploy your React app and the cookie consent banner appears automatically. Future changes? Log into the dashboard, update your banner, and click &quot;Push Live&quot;. Changes appear on your site within seconds -- no code changes, no redeployment, no downtime.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">No redeployment needed</Badge>
                        <Badge variant="outline">Instant updates</Badge>
                        <Badge variant="outline">Zero maintenance</Badge>
                        <Badge variant="outline">Under 8KB gzipped</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Basic React Cookie Banner Setup */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Basic React Cookie Banner Setup
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Code examples for every React setup -- Next.js, Vite, Create React App, and more
                </p>
              </motion.div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  The placement of your <strong className="text-foreground">react cookie banner</strong> script matters. It must load before any analytics or marketing scripts to ensure they are blocked until the user gives consent. Below are copy-paste examples for every major React framework.
                </p>
              </div>

              <div className="space-y-8">
                {/* Next.js App Router */}
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-foreground" />
                        Next.js App Router (Recommended)
                      </CardTitle>
                      <CardDescription>For Next.js 13+, 14, and 15 with the app directory</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Open your <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">app/layout.tsx</code> file and add the Script component. Using <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">strategy=&quot;beforeInteractive&quot;</code> ensures the cookie banner loads before any tracking scripts:
                        </p>
                        <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                        <div className="bg-muted border border-border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Why beforeInteractive?</strong> This Next.js script strategy injects the script into the initial HTML document, ensuring it runs before any client-side JavaScript. This is critical for blocking analytics scripts until consent is given.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Next.js Pages Router */}
                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-foreground" />
                        Next.js Pages Router
                      </CardTitle>
                      <CardDescription>For Next.js projects using the pages directory</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Add the script to your <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">pages/_document.tsx</code> file:
                        </p>
                        <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                </motion.div>

                {/* Vite / CRA */}
                <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-foreground" />
                        Vite or Create React App
                      </CardTitle>
                      <CardDescription>For standard React projects without a framework</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Add the script tag directly to your <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">index.html</code> (Vite) or <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">public/index.html</code> (CRA) file:
                        </p>
                        <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                        <div className="bg-muted border border-border rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Important:</strong> Place the cookie consent script <strong className="text-foreground">before</strong> any analytics or tracking scripts (Google Analytics, Facebook Pixel, etc.) to ensure they only load after the user gives consent.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Remix */}
                <motion.div custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-foreground" />
                        Remix
                      </CardTitle>
                      <CardDescription>For Remix React applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Add the script to your <code className="bg-foreground/95 text-background font-mono px-2 py-1 rounded text-sm">app/root.tsx</code> file inside the head:
                        </p>
                        <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* React Cookie Consent with Google Analytics */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  React Cookie Consent with Google Analytics
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Automatically manage GA4 consent in your React app
                </p>
              </motion.div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  One of the most common requirements for a <strong className="text-foreground">react-cookie-consent Google Analytics</strong> integration is ensuring that GA4 does not fire until the user accepts analytics cookies. Our solution handles this automatically -- no custom event listeners, no manual consent state management, and full support for <strong className="text-foreground">Google Consent Mode v2</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Here is how it works: when our script loads, it sets the default Google consent state to &quot;denied&quot; for analytics and marketing. When a user accepts cookies, the consent state updates to &quot;granted&quot; and Google Analytics begins tracking. If the user later withdraws consent, tracking stops. All of this happens without any code on your end.
                </p>
              </div>

              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-foreground" />
                      Next.js App Router with GA4 and Cookie Consent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                    <div className="bg-muted border border-border rounded-lg p-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">That is all the code you need.</strong> Our cookie consent script automatically detects Google Analytics and manages consent states using Google Consent Mode v2. No additional configuration required.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-foreground" />
                      Vite/CRA with GA4, Facebook Pixel, and Cookie Consent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
              </motion.div>

              <div className="space-y-4 text-muted-foreground">
                <h3 className="font-heading text-xl font-semibold text-foreground">Supported Third-Party Scripts</h3>
                <p className="text-lg leading-relaxed">
                  Our react cookie consent solution automatically manages consent for all major analytics and marketing platforms:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Google Analytics (GA4 / gtag.js)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Google Tag Manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Facebook / Meta Pixel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>TikTok Pixel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Microsoft Clarity</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>LinkedIn Insight Tag</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Hotjar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Mixpanel</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>Segment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>HubSpot Tracking</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg leading-relaxed mt-4">
                  Not sure which cookies your React app currently sets? Use our free <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">cookie scanner tool</Link> to get a full audit of all cookies and tracking scripts on your site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lightweight Cookie Consent for React Apps */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Lightweight Cookie Consent for React Apps
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Why bundle size matters -- and how we keep it at zero
                </p>
              </motion.div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  React developers care about performance. Every kilobyte in your bundle affects load times, Core Web Vitals, and ultimately your Google search rankings. That is why choosing a <strong className="text-foreground">lightweight cookie consent for React apps</strong> is not just a nice-to-have -- it is a competitive advantage.
                </p>
                <p className="text-lg leading-relaxed">
                  Here is how popular cookie consent solutions compare in terms of bundle impact:
                </p>
              </div>

              {/* Performance Comparison */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-10">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-foreground" />
                      Bundle Size Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium shrink-0">Cookie Banner (ours)</div>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: '2%' }}></div>
                        </div>
                        <div className="text-sm font-bold text-primary w-20 text-right">0 KB</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium shrink-0">react-cookie-consent</div>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div className="bg-foreground/40 h-full rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="text-sm font-bold text-muted-foreground w-20 text-right">~15 KB</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium shrink-0">cookieconsent (npm)</div>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div className="bg-foreground/50 h-full rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <div className="text-sm font-bold text-muted-foreground w-20 text-right">~25 KB</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-48 text-sm font-medium shrink-0">Osano / OneTrust</div>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div className="bg-destructive h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <div className="text-sm font-bold text-destructive w-20 text-right">50-200 KB</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Our solution adds 0 KB to your bundle because the script loads externally. The external script itself is under 8KB gzipped and is cached on a global CDN.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-6 text-muted-foreground">
                <h3 className="font-heading text-xl font-semibold text-foreground">Performance Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: 'Async Loading',
                      desc: 'The script loads asynchronously and never blocks your page critical rendering path. Your LCP score stays unaffected.',
                    },
                    {
                      icon: Globe,
                      title: 'Global CDN',
                      desc: 'Served from edge locations worldwide. Users load the script from the nearest server, typically in under 50ms.',
                    },
                    {
                      icon: Shield,
                      title: 'No CLS Impact',
                      desc: 'Our banner is designed to avoid Cumulative Layout Shift. It overlays your content rather than pushing it down.',
                    },
                  ].map((item, i) => {
                    const ItemIcon = item.icon
                    return (
                      <motion.div
                        key={item.title}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Card className="border border-border bg-background h-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="font-heading text-base flex items-center gap-2">
                              <ItemIcon className="h-4 w-4 text-foreground" />
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {item.desc}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next.js Cookie Consent Integration */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Next.js Cookie Consent Integration
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Advanced patterns for Next.js App Router, middleware, and server components
                </p>
              </motion.div>

              <div className="space-y-6 text-muted-foreground mb-10">
                <p className="text-lg leading-relaxed">
                  Next.js is the most popular React framework, and it has specific requirements for cookie consent. The App Router, server components, and middleware all affect how and where you should load your cookie banner script. Here are the patterns that work best.
                </p>
              </div>

              {/* Conditional Loading by Route */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Settings className="h-5 w-5 text-foreground" />
                      Conditional Loading by Route Group
                    </CardTitle>
                    <CardDescription>Only show the cookie banner on public pages, not in your admin dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
              </motion.div>

              {/* React Hook for Consent State */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Code className="h-5 w-5 text-foreground" />
                      Reading Consent State in React Components
                    </CardTitle>
                    <CardDescription>Access the user consent choices from your React code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
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
                      Our cookie banner dispatches a <code className="bg-foreground/95 text-background font-mono px-1 py-0.5 rounded text-xs">cookie-consent-update</code> CustomEvent whenever the user changes their preferences. You can listen for this event in any React component to conditionally render features that require consent.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="space-y-6 text-muted-foreground">
                <h3 className="font-heading text-xl font-semibold text-foreground">Next.js-Specific Benefits</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Server Component compatible</strong> -- the script tag loads independently of your React component tree, so it works with both server and client components.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">App Router and Pages Router</strong> -- tested and supported on both routing systems. We maintain code examples for both.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Static exports work</strong> -- if you use <code className="bg-foreground/95 text-background font-mono px-1 py-0.5 rounded text-xs">next export</code> for static site generation, the script tag is included in the HTML output.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Edge Runtime compatible</strong> -- no server-side dependencies, so your app works on Vercel Edge, Cloudflare Workers, or any edge platform.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span><strong className="text-foreground">Turbopack ready</strong> -- because we do not use an npm package, there are no bundler compatibility issues with Turbopack or any other bundler.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about react cookie consent, npm packages, and compliance
                </p>
              </motion.div>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <Card className="border border-border bg-background">
                      <CardHeader>
                        <CardTitle className="font-heading text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Platforms Section */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  Not Using React? We Have Got You Covered
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our cookie consent solution works with all major web platforms
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'WordPress Cookie Consent', desc: 'Simple plugin installation for WordPress sites', href: '/integrations/wordpress', icon: Globe },
                  { name: 'Shopify Cookie Consent', desc: 'E-commerce focused cookie consent for Shopify stores', href: '/integrations/shopify', icon: Globe },
                  { name: 'Webflow Cookie Consent', desc: 'No-code integration for Webflow websites', href: '/integrations/webflow', icon: Globe },
                  { name: 'Google Tag Manager', desc: 'Integrate with GTM for advanced tracking control', href: '/integrations/google-tag-manager', icon: Globe },
                ].map((platform, i) => {
                  const PlatformIcon = platform.icon
                  return (
                    <motion.div key={platform.name} custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                      <Link href={platform.href} className="group block">
                        <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                              <PlatformIcon className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-heading text-lg font-semibold text-foreground">{platform.name}</h3>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{platform.desc}</p>
                          <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                            View Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Want to learn more about cookie consent compliance? Read our comprehensive guide on{' '}
                  <Link href="/blog/gdpr-cookie-consent-requirements" className="text-primary underline hover:no-underline">
                    GDPR cookie consent requirements
                  </Link>{' '}
                  or scan your site with our free{' '}
                  <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">
                    cookie scanner tool
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>2-minute setup for React &amp; Next.js</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Add Cookie Consent?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build your cookie banner in the visual builder, copy one script tag, and your React app is compliant. No npm packages, no bundle bloat.
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
