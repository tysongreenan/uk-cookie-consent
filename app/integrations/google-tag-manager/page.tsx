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
  CheckCircle,
  Globe,
  Users,
  Zap,
  Clock,
  BarChart3,
  Shield,
  ArrowRight,
  Circle,
  Tag,
  FileCode,
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

export default function GTMIntegrationPage() {
  const faqData = [
    {
      question: "What is Google Tag Manager Consent Mode V2 and why does it matter?",
      answer: "Consent Mode V2 is Google's updated framework for handling user consent signals in GA4, Google Ads, and other Google services. Since March 2024, Google requires Consent Mode V2 for any site running Google Ads in the EU. Without it, your conversion data is incomplete and your remarketing audiences stop growing. Our cookie banner sends the correct consent signals to GTM automatically."
    },
    {
      question: "How do I set up cookie consent in Google Tag Manager?",
      answer: "Add our cookie banner script as a Custom HTML tag in GTM, set it to fire on 'All Pages' with the highest priority. Our script automatically pushes consent events to the dataLayer and sends gtag consent updates. Then configure your analytics and advertising tags to use the built-in consent checks. The full step-by-step guide is on this page."
    },
    {
      question: "Does this work with GA4, Google Ads, and Facebook Pixel in GTM?",
      answer: "Yes. Our banner automatically manages consent for all tags in your GTM container. Google tags (GA4, Google Ads, Floodlight) use native Consent Mode V2 signals. Non-Google tags (Facebook Pixel, TikTok, LinkedIn) are controlled via dataLayer events and trigger conditions. You set the trigger once, and consent is enforced automatically."
    },
    {
      question: "Can I deploy the cookie banner through GTM instead of adding a script tag?",
      answer: "Yes. You can deploy our cookie banner as a Custom HTML tag inside GTM. Create a new tag, paste the script, set the trigger to 'All Pages', and give it the highest tag firing priority. This means you do not need to touch your website code at all -- everything is managed through GTM."
    },
    {
      question: "What happens to my Google Ads data if users deny consent?",
      answer: "With Consent Mode V2, Google uses behavioral modeling to estimate conversions from users who denied consent. You still get directional conversion data without violating privacy regulations. Without Consent Mode V2, you lose that data entirely. Our banner ensures the correct consent signals are always sent to Google."
    },
    {
      question: "How much does GTM cookie consent setup cost?",
      answer: "Our cookie banner is $99 one-time for the Pro plan. There are no monthly fees, no per-pageview charges, and no usage limits. The free plan lets you build and test your banner. The Pro plan includes unlimited pageviews, custom branding, Consent Mode V2 support, and priority support."
    },
  ]

  const articleData = {
    title: "Google Tag Manager Cookie Consent: Consent Mode V2 Setup Guide",
    description: "Complete guide to setting up cookie consent with Google Tag Manager. Covers Consent Mode V2, dataLayer events, tag firing rules, and GDPR compliance.",
    datePublished: "2025-02-01",
    dateModified: "2026-03-16"
  }

  const breadcrumbData = [
    { name: "Home", url: "https://www.cookie-banner.ca" },
    { name: "Integrations", url: "https://www.cookie-banner.ca/integrations" },
    { name: "Google Tag Manager", url: "https://www.cookie-banner.ca/integrations/google-tag-manager" }
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
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />

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
                    GTM + Consent Mode V2
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
                    Google Tag Manager
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Cookie Consent Setup
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Set up GTM cookie consent with Consent Mode V2 in under 5 minutes. Control exactly which tags fire based on user consent. Under 10KB, async loading, $99 one-time.
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
                  <Link href="#implementation">
                    View Implementation Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Use a Cookie Banner with GTM? */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Why Use a Cookie Banner with Google Tag Manager?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                GTM does not handle consent on its own. You need a consent management layer to control which tags fire -- and to stay GDPR compliant.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                {
                  icon: Tag,
                  title: 'Consent Mode V2 Required',
                  desc: 'Since March 2024, Google requires Consent Mode V2 for Google Ads in the EU. Without it, your remarketing audiences stop growing and conversion modeling breaks.',
                },
                {
                  icon: Zap,
                  title: 'Granular Tag Control',
                  desc: 'Fire analytics tags only when analytics consent is granted. Fire advertising tags only when ad consent is granted. No more all-or-nothing.',
                },
                {
                  icon: Users,
                  title: 'Deploy via GTM',
                  desc: 'Add our cookie banner as a Custom HTML tag in GTM. No need to touch your website code -- marketing teams can deploy and manage consent independently.',
                },
                {
                  icon: BarChart3,
                  title: 'Preserve Conversion Data',
                  desc: 'Consent Mode V2 enables Google behavioral modeling for users who deny consent. You keep directional conversion data without violating privacy laws.',
                },
                {
                  icon: Shield,
                  title: 'GDPR + CCPA Compliant',
                  desc: 'Automatic compliance with GDPR (EU), CCPA (California), PIPEDA (Canada), and LGPD (Brazil). The banner adjusts opt-in vs. opt-out behavior by region.',
                },
                {
                  icon: Globe,
                  title: 'Under 10KB, Async',
                  desc: 'Our script is under 10KB gzipped and loads asynchronously. Zero impact on your Core Web Vitals. No CLS, no render blocking, no performance penalty.',
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
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <Card className="border border-border bg-background h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <ItemIcon className="h-5 w-5 text-foreground" />
                          </div>
                          <CardTitle className="font-heading">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How Consent Mode V2 Works */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  How Does GTM Consent Mode V2 Work?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Consent Mode V2 uses consent signals to control how Google tags behave. Here is what happens under the hood.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-foreground" />
                        What is Consent Mode V2?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Consent Mode V2 is Google&apos;s framework for adjusting tag behavior based on user consent. It is required for Google Ads in the EU since March 2024:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Automatically adjusts data collection based on consent state</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Enables behavioral modeling for consented data gaps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Required for Google Ads conversion tracking in the EU</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Supports granular consent categories (ads, analytics, functionality)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <Tag className="h-5 w-5 text-foreground" />
                        Required Consent Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Consent Mode V2 requires these consent types. Our banner maps cookie categories to each one automatically:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">ad_storage:</strong> Controls advertising cookies (Google Ads, remarketing)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">ad_user_data:</strong> Controls sending user data for advertising</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">ad_personalization:</strong> Controls personalized advertising</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">analytics_storage:</strong> Controls analytics cookies (GA4)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">functionality_storage:</strong> Controls functional cookies</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Consent Mode Code */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading">What Our Banner Does Automatically (You Do Not Write This)</CardTitle>
                    <CardDescription>This is the consent flow our script handles for you. Shown here so you understand what happens under the hood.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
                      <pre>{`// 1. On page load, our script sets default consent (denied)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'security_storage': 'granted'
});

// 2. When user clicks "Accept All" or grants specific categories:
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted',
  'functionality_storage': 'granted'
});

// 3. Pushes a consent event to the dataLayer for non-Google tags:
window.dataLayer.push({
  'event': 'cookie_consent_update',
  'consent_analytics': true,
  'consent_marketing': true,
  'consent_preferences': true
});`}</pre>
                    </div>
                    <div className="bg-muted border border-border rounded-lg p-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">You do not need to write any of this code.</strong> Our cookie banner script handles all consent default/update calls and dataLayer pushes automatically. This is shown for transparency so you can verify the implementation in GTM Preview mode.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Implementation */}
        <section id="implementation" className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  How Do You Set Up GTM Cookie Consent?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Two options: deploy our script via GTM (recommended for marketing teams) or add the script directly to your site.
                </p>
              </motion.div>

              <div className="space-y-8">
                {/* Option A: Deploy via GTM */}
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-primary/30 bg-background">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <span className="font-heading font-semibold text-foreground">A</span>
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">Option A: Deploy Cookie Banner via GTM</CardTitle>
                          <CardDescription>Recommended -- no code changes to your website needed</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Add our cookie banner as a Custom HTML tag in GTM. This is ideal for marketing teams who manage GTM but do not have access to the website code.
                      </p>
                      <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto mb-4">
                        <pre>{`<!-- GTM Custom HTML Tag -->
<script
  src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
  async
></script>`}</pre>
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                        <li>In GTM, go to <strong className="text-foreground">Tags</strong> &rarr; <strong className="text-foreground">New</strong></li>
                        <li>Choose <strong className="text-foreground">Custom HTML</strong> tag type</li>
                        <li>Paste the script above (replace YOUR_BANNER_ID with your actual ID)</li>
                        <li>Set trigger to <strong className="text-foreground">Consent Initialization - All Pages</strong></li>
                        <li>Set tag firing priority to <strong className="text-foreground">highest</strong> (e.g., 9999)</li>
                        <li>Save, preview, and publish</li>
                      </ol>
                      <div className="bg-muted border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Why Consent Initialization trigger?</strong> This fires before any other tags, ensuring consent defaults are set before GA4, Google Ads, or any other tag loads. This is critical for Consent Mode V2 compliance.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Option B: Script Tag */}
                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <span className="font-heading font-semibold text-foreground">B</span>
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">Option B: Add Script Before GTM Snippet</CardTitle>
                          <CardDescription>For developers who have access to the site HTML</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Place our cookie banner script before the GTM container snippet in your HTML head. This ensures consent defaults are set before GTM loads any tags.
                      </p>
                      <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto mb-4">
                        <pre>{`<head>
  <!-- Step 1: Cookie Consent Banner (BEFORE GTM) -->
  <script
    src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
    async
  ></script>

  <!-- Step 2: Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  </script>
</head>`}</pre>
                      </div>
                      <div className="bg-muted border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Order matters.</strong> Our script must be placed before the GTM snippet. This ensures consent defaults are set before GTM initializes and fires any tags.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Next.js with GTM */}
                <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-foreground" />
                        Next.js App Router with GTM + Cookie Consent
                      </CardTitle>
                      <CardDescription>For React/Next.js apps using GTM</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto mb-4">
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
        {/* Step 1: Cookie Consent - loads before GTM */}
        <Script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          strategy="beforeInteractive"
        />

        {/* Step 2: Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {\`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');\`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}`}</pre>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Tag Firing Rules */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  How Do You Configure GTM Tag Firing Rules for Consent?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Once our cookie banner is deployed, configure your GTM tags to respect consent. Here is how each tag type should be configured.
                </p>
              </motion.div>

              {/* DataLayer Event Example */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Code className="h-5 w-5 text-foreground" />
                      GTM Trigger: Listen for Consent Events
                    </CardTitle>
                    <CardDescription>Create a custom trigger in GTM that fires when consent is granted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto mb-4">
                      <pre>{`// Our banner pushes this to the dataLayer when consent changes:
{
  "event": "cookie_consent_update",
  "consent_analytics": true,    // user granted analytics
  "consent_marketing": false,   // user denied marketing
  "consent_preferences": true   // user granted preferences
}

// In GTM, create a Custom Event trigger:
// Trigger Type: Custom Event
// Event Name: cookie_consent_update
// Fire on: All Custom Events

// Then create Data Layer Variables:
// Variable Name: consent_analytics
// Data Layer Variable Name: consent_analytics

// Use these variables in trigger conditions:
// Fire GA4 tag ONLY when consent_analytics equals true
// Fire Google Ads tag ONLY when consent_marketing equals true`}</pre>
                    </div>
                    <div className="bg-muted border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">For Google tags (GA4, Google Ads):</strong> You do not need custom triggers. These tags have built-in consent checks that read the <code className="bg-foreground/95 text-background font-mono px-1 py-0.5 rounded text-xs">gtag consent</code> state automatically. The dataLayer events above are for non-Google tags like Facebook Pixel, TikTok, and LinkedIn.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BarChart3,
                    title: 'Analytics Tags (GA4)',
                    badge: 'Automatic',
                    items: [
                      'GA4 respects Consent Mode V2 natively',
                      'No custom trigger needed -- just enable "Require additional consent for tag to fire" in the tag settings',
                      'Set required consent to: analytics_storage',
                      'GA4 uses behavioral modeling when consent is denied',
                    ],
                  },
                  {
                    icon: Zap,
                    title: 'Advertising Tags (Google Ads)',
                    badge: 'Automatic',
                    items: [
                      'Google Ads respects Consent Mode V2 natively',
                      'Set required consent to: ad_storage, ad_user_data, ad_personalization',
                      'Conversion modeling fills in data gaps',
                      'Remarketing audiences continue growing with modeled data',
                    ],
                  },
                  {
                    icon: Users,
                    title: 'Facebook / Meta Pixel',
                    badge: 'Custom Trigger',
                    items: [
                      'Create a Custom Event trigger for cookie_consent_update',
                      'Add condition: consent_marketing equals true',
                      'Attach this trigger to your Facebook Pixel tag',
                      'Pixel only fires when marketing consent is granted',
                    ],
                  },
                  {
                    icon: Shield,
                    title: 'Other Third-Party Tags',
                    badge: 'Custom Trigger',
                    items: [
                      'TikTok, LinkedIn, Hotjar, etc. use the same pattern',
                      'Create a Custom Event trigger for cookie_consent_update',
                      'Add the appropriate consent condition (analytics or marketing)',
                      'Tags only fire when the user grants the relevant consent category',
                    ],
                  },
                ].map((category, i) => {
                  const CategoryIcon = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <Card className="border border-border bg-background h-full">
                        <CardHeader>
                          <CardTitle className="font-heading flex items-center gap-2">
                            <CategoryIcon className="h-5 w-5 text-foreground" />
                            {category.title}
                          </CardTitle>
                          <Badge variant="outline" className="w-fit text-xs">{category.badge}</Badge>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {category.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Testing & Verification */}
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
                  How Do You Test GTM Consent Mode V2?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Use GTM Preview mode and the browser console to verify your consent implementation works correctly.
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    number: '1',
                    title: 'Open GTM Preview Mode',
                    desc: 'Click "Preview" in GTM to open Tag Assistant. Navigate to your site in the new tab.',
                    items: [
                      'Tag Assistant shows all tags and their firing status',
                      'You can see consent state changes in real-time',
                      'Verify that denied tags show "Blocked by consent" status',
                    ],
                  },
                  {
                    number: '2',
                    title: 'Test Consent Flow',
                    desc: 'Interact with the cookie banner and verify tag behavior changes:',
                    items: [
                      'On page load: verify all non-essential tags are blocked',
                      'Click "Accept All": verify all tags fire',
                      'Click "Reject All": verify only essential tags fire',
                      'Use category toggles: verify only consented tag categories fire',
                    ],
                  },
                  {
                    number: '3',
                    title: 'Verify Consent State in Console',
                    desc: 'Open browser console and check the consent state:',
                    items: [
                      'Type: dataLayer.filter(e => e.event === "cookie_consent_update")',
                      'Verify consent values match the user\'s banner choices',
                      'Check that gtag consent default/update calls are logged',
                    ],
                  },
                  {
                    number: '4',
                    title: 'Publish and Monitor',
                    desc: 'Once testing passes, publish your GTM container:',
                    items: [
                      'Publish the container with a descriptive version name',
                      'Monitor GA4 real-time reports to verify data flow',
                      'Check Google Ads conversion tracking for any drops',
                      'Use our cookie scanner to verify no cookies are set before consent',
                    ],
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.number}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <Card className="border border-border bg-background">
                      <CardHeader>
                        <CardTitle className="font-heading flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-muted border border-border">
                            <span className="font-heading text-sm font-semibold text-foreground">{step.number}</span>
                          </div>
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {step.desc}
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                          {step.items.map((s, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-background">
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
                  Common questions about Google Tag Manager cookie consent and Consent Mode V2
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

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>5-minute setup &middot; $99 one-time &middot; Consent Mode V2</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Set Up GTM Cookie Consent?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build your cookie banner in the visual builder, deploy via GTM or a script tag, and your site has full Consent Mode V2 compliance. Under 10KB, async loading, works with every GTM setup.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Cookie Banner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
                  <Link href="/integrations">
                    Browse All Integrations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
