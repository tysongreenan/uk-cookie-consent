'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { StructuredData } from '@/components/seo/structured-data'
import { motion } from 'framer-motion'
import {
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
  Download,
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
      answer: "Download the Consent Mode v2 template on this page and import it into Google Tag Manager. Fire it on Consent Initialization — All Pages with ad storage, analytics storage, ad user data, and ad personalization set to denied. Add the banner script in the site head, or as Custom HTML on the same trigger at a lower priority. On each non-Google pixel, set Require additional consent: ad storage for marketing, analytics storage for other analytics."
    },
    {
      question: "Does this work with GA4, Google Ads, and Facebook Pixel in GTM?",
      answer: "Yes. GA4 and Google Ads follow the Consent Mode template on this page. For Facebook Pixel, TikTok, and LinkedIn, open the tag and set Require additional consent to ad storage for marketing or analytics storage for analytics. You can also fire those tags on the cookie_consent_update event when consent_marketing or consent_analytics equals true."
    },
    {
      question: "Can I deploy the cookie banner through GTM instead of adding a script tag?",
      answer: "Yes. Download the Consent Mode v2 template on this page, import it, and fire it on Consent Initialization — All Pages with defaults denied and firing priority 1000. Add the banner as a Custom HTML tag on the same trigger at a lower priority. Prefer adding the script to the site head when you can."
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
    dateModified: "2026-10-02"
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
                  Google Tag Manager
                  <br />
                  Cookie Consent Setup
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
                    Start the setup
                  </Link>
                </Button>
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
                  Set this up in order
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Four steps. Import the template, add the banner, hold the other tags, then preview. Background is further down the page.
                </p>
              </motion.div>

              <ol className="mb-10 grid gap-3 sm:grid-cols-4 text-sm">
                {[
                  ['1', 'Import the template', '#consent-template'],
                  ['2', 'Add the banner', '#add-banner'],
                  ['3', 'Hold other tags', '#other-tags'],
                  ['4', 'Preview', '#preview'],
                ].map(([n, label, href]) => (
                  <li key={n}>
                    <Link href={href} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 hover:border-primary/40">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted font-heading text-sm font-semibold text-foreground">{n}</span>
                      <span className="font-medium text-foreground">{label}</span>
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="space-y-8">
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card id="consent-template" className="border border-primary/30 bg-background scroll-mt-24">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted border border-border">
                          <Download className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl">1. Import the template</CardTitle>
                          <CardDescription>This sets consent to denied before any other tag runs.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        A Custom HTML tag loads the banner asynchronously, so tag firing priority cannot stop early pixels. This template runs inside GTM on Consent Initialization and sets the default before those tags.
                      </p>
                      <Button asChild className="mb-6">
                        <a href="/gtm/cookie-banner-consent-mode.tpl" download="cookie-banner-consent-mode.tpl">
                          <Download className="mr-2 h-4 w-4" />
                          Download cookie-banner-consent-mode.tpl
                        </a>
                      </Button>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                        <li>In GTM, open <strong className="text-foreground">Templates</strong> &rarr; <strong className="text-foreground">Tag Templates</strong> &rarr; <strong className="text-foreground">New</strong> &rarr; the three-dot menu &rarr; <strong className="text-foreground">Import</strong>. Choose the file.</li>
                        <li><strong className="text-foreground">Tags</strong> &rarr; <strong className="text-foreground">New</strong>. Name it <strong className="text-foreground">Cookie Banner Generator — Consent Mode</strong> and choose that template.</li>
                        <li>Leave <strong className="text-foreground">Region</strong> blank. Set Ad Storage, Analytics Storage, Ad User Data, and Ad Personalization to <strong className="text-foreground">Denied</strong>.</li>
                        <li>Trigger: <strong className="text-foreground">Consent Initialization — All Pages</strong>. Firing priority: <strong className="text-foreground">1000</strong>.</li>
                      </ol>
                      <div className="bg-muted border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Leave the advanced settings as they are</strong> unless you renamed the consent cookie. Next, add the banner so visitors can choose.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card id="add-banner" className="border border-border bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">2. Add the banner. Pick one.</CardTitle>
                      <CardDescription>Use the snippet from your dashboard. Replace YOUR_BANNER_ID.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-heading text-base font-semibold text-foreground mb-2">You can edit the site</h3>
                        <p className="text-sm text-muted-foreground mb-3">Paste this in the head, before the Google Tag Manager snippet.</p>
                        <CodeBlock language="html">{`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>`}</CodeBlock>
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-foreground mb-2">You only have GTM</h3>
                        <p className="text-sm text-muted-foreground mb-3">New Custom HTML tag. Same trigger as the template, firing priority 50.</p>
                        <CodeBlock language="html" className="mb-3">{`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>`}</CodeBlock>
                        <p className="text-sm text-muted-foreground">Trigger: Consent Initialization — All Pages. The template stays at priority 1000. A higher priority on this tag does not hold other tags, because the banner file still loads after the tag starts.</p>
                      </div>
                      <details className="rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <summary className="cursor-pointer font-medium text-foreground">Next.js</summary>
                        <p className="mt-3 text-sm text-muted-foreground mb-3">Load the banner with <code className="font-mono text-xs">strategy=&quot;beforeInteractive&quot;</code>. Keep the GTM snippet on <code className="font-mono text-xs">afterInteractive</code>. Still import the template in step 1.</p>
                        <CodeBlock language="tsx">{`<Script
  src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"
  strategy="beforeInteractive"
/>`}</CodeBlock>
                      </details>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Tag Firing Rules */}
        <section id="other-tags" className="py-16 sm:py-20 bg-background scroll-mt-24">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  3. Hold every other tag
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Open each tag. Under Consent settings, choose Require additional consent. One setting per tag.
                </p>
              </motion.div>

              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">GA4.</strong> Require <code className="font-mono text-xs">analytics_storage</code>.</li>
                    <li><strong className="text-foreground">Google Ads.</strong> Require <code className="font-mono text-xs">ad_storage</code>, <code className="font-mono text-xs">ad_user_data</code>, and <code className="font-mono text-xs">ad_personalization</code>.</li>
                    <li><strong className="text-foreground">Meta, LinkedIn, TikTok, and other marketing pixels.</strong> Require <code className="font-mono text-xs">ad_storage</code>.</li>
                    <li><strong className="text-foreground">Other analytics tools</strong> such as Hotjar. Require <code className="font-mono text-xs">analytics_storage</code>.</li>
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">
                    A tag with no consent settings can use a Custom Event trigger named <code className="font-mono text-xs">cookie_consent_update</code>, firing when <code className="font-mono text-xs">consent_marketing</code> or <code className="font-mono text-xs">consent_analytics</code> equals true. The consent setting above is the one to use when the tag has it.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testing & Verification */}
        <section id="preview" className="py-16 sm:py-20 border-t border-border bg-muted/30 scroll-mt-24">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                  4. Preview, then publish
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  In GTM, click Preview and open your site. Check these four things, then Submit and Publish.
                </p>
              </motion.div>
              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                    <li>Before a choice, the Consent tab shows all four types denied, and marketing tags say blocked.</li>
                    <li>Accept All. Those tags fire.</li>
                    <li>Reject All on a fresh visit. They stay blocked, including after a refresh.</li>
                    <li>Reload after Accept. They stay granted without waiting on the banner.</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Use a Cookie Banner with GTM? */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Why this is separate from the banner
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The setup is above. GTM does not wait for a banner on its own, so the template has to set denied before the other tags run.
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
                  title: 'Works via Head or GTM',
                  desc: 'Best: paste the banner in your site head, then add our Consent Mode v2 template. No site access? Load the banner as Custom HTML on Consent Initialization instead.',
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
                  What the banner sends
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Reference only. You do not paste this. The template and the banner already send it.
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
                    <CodeBlock language="javascript">{`// 1. On page load, our script sets default consent (denied)
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
  'analytics_storage': 'granted',
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'consent_analytics': true,
  'consent_marketing': true,
  'consent_preferences': true
});`}</CodeBlock>
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
