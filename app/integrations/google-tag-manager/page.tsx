'use client'

import type { ReactNode } from 'react'
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
  ExternalLink,
  Info,
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

function Slug({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 align-baseline text-[13px] font-medium leading-5 text-foreground">
      {children}
    </span>
  )
}

function GtmLink() {
  return (
    <a
      href="https://tagmanager.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-1.5 py-0.5 align-baseline text-[13px] font-medium leading-5 text-foreground underline decoration-foreground/40 underline-offset-2"
    >
      Google Tag Manager
    </a>
  )
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
      answer: "Download the Consent Mode v2 template on this page and import it into Google Tag Manager. Fire it on Consent Initialization — All Pages with ad storage, analytics storage, ad user data, and ad personalization set to denied, and set its priority to 1000. Add the banner as a Custom HTML tag on the same trigger at priority 50. On every other tag, open Advanced Settings, then Consent Settings, and choose Require additional consent for tag to fire. Tick analytics storage for GA4. Tick ad storage, ad user data, and ad personalization for Google Ads. Tick ad storage for Meta, LinkedIn, and the other ad pixels. Leave the template tag and the banner tag without that requirement."
    },
    {
      question: "Does this work with GA4, Google Ads, and Facebook Pixel in GTM?",
      answer: "Yes. Leave the Consent Mode template and the banner tag alone. On every other tag, open Advanced Settings, then Consent Settings, and choose Require additional consent for tag to fire. Tick analytics storage for GA4. Tick ad storage, ad user data, and ad personalization for Google Ads. Tick ad storage for Facebook, TikTok, and LinkedIn."
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
                  Set up in this order
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Import the template, add the banner, stop existing tags that were already on the site, then preview.
                </p>
              </motion.div>

              <ol className="mb-10 grid gap-3 sm:grid-cols-4 text-sm">
                {[
                  ['1', 'Import the template', '#consent-template'],
                  ['2', 'Add the banner', '#add-banner'],
                  ['3', 'Existing tags', '#other-tags'],
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
                      <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-3"><span className="font-semibold text-foreground">1.</span><span>In <GtmLink />, click <Slug>Templates</Slug> in the left menu.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">2.</span><span>In the <Slug>Tag Templates</Slug> box, click <Slug>New</Slug>.</span></li>
                        <li className="flex gap-3">
                          <span className="font-semibold text-foreground">3.</span>
                          <span className="min-w-0">
                            Click the three dots at the top right, then <Slug>Import</Slug>. Choose <Slug>cookie-banner-consent-mode.tpl</Slug>.
                            <Button asChild className="my-3 h-auto max-w-full whitespace-normal">
                              <a href="/gtm/cookie-banner-consent-mode.tpl" download="cookie-banner-consent-mode.tpl">
                                <Download className="mr-2 h-4 w-4" />
                                Download cookie-banner-consent-mode.tpl
                              </a>
                            </Button>
                            <span className="block">Click <Slug>Save</Slug>.</span>
                          </span>
                        </li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">4.</span><span>Click <Slug>Tags</Slug> in the left menu, then <Slug>New</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">5.</span><span>Click the name at the top and type <Slug>Cookie Banner Generator — Consent Mode</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">6.</span><span>Click <Slug>Tag Configuration</Slug> and choose <Slug>Cookie Banner Generator — Consent Mode v2</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">7.</span><span>In <Slug>Default Consent Settings</Slug>, leave <Slug>Region</Slug> empty. Set <Slug>Ad Storage</Slug>, <Slug>Analytics Storage</Slug>, <Slug>Ad User Data</Slug>, and <Slug>Ad Personalization</Slug> to <Slug>Denied</Slug>. If the table is empty, click <Slug>Add Region Override</Slug> and do the same.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">8.</span><span>Click <Slug>Triggering</Slug>. Choose <Slug>Consent Initialization - All Pages</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">9.</span><span>Below the trigger, open <Slug>Advanced Settings</Slug>. Open <Slug>Tag firing priority</Slug> and type <Slug>1000</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">10.</span><span>Click <Slug>Save</Slug>.</span></li>
                      </ol>
                      <p className="mt-4 text-sm text-muted-foreground">The priority field is under the trigger. Leave the Advanced Settings box inside the template form closed. Wait for Update stays at 500, and the cookie name stays cookie_consent.</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card id="add-banner" className="border border-border bg-background scroll-mt-24">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl">2. Add the banner</CardTitle>
                      <CardDescription>Grab your real banner and paste it into the tag.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Button asChild>
                        <Link href="/dashboard" target="_blank" rel="noopener noreferrer">
                          Grab your banner
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-3"><span className="font-semibold text-foreground">1.</span><span>Click <Slug>Grab your banner</Slug>. On the dashboard, click <Slug>Copy snippet</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">2.</span><span>Click <Slug>Tags</Slug> in the left menu, then <Slug>New</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">3.</span><span>Name the tag <Slug>Cookie Banner</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">4.</span><span>Click <Slug>Tag Configuration</Slug> and choose <Slug>Custom HTML</Slug>. Paste the snippet.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">5.</span><span>Click <Slug>Triggering</Slug> and choose <Slug>Consent Initialization - All Pages</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">6.</span><span>Open <Slug>Advanced Settings</Slug>, then <Slug>Tag firing priority</Slug>, and type <Slug>50</Slug>.</span></li>
                        <li className="flex gap-3"><span className="font-semibold text-foreground">7.</span><span>Click <Slug>Save</Slug>.</span></li>
                      </ol>
                      <details className="rounded-lg border border-border bg-muted/40 px-4 py-3">
                        <summary className="cursor-pointer font-medium text-foreground">Only if you can edit the site, and you did not paste the banner into the GTM tag above</summary>
                        <p className="mt-3 text-sm text-muted-foreground mb-3">Paste the copied snippet into the head, above the Google Tag Manager snippet. The example still says YOUR_BANNER_ID. Yours will already have the real ID. You still need the template from step 1.</p>
                        <CodeBlock language="html">{`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>`}</CodeBlock>
                        <p className="mt-4 text-sm font-medium text-foreground">Next.js sites only</p>
                        <p className="mt-1 text-sm text-muted-foreground mb-3">Use this when the site is a Next.js app. Load the banner with <code className="font-mono text-xs">strategy=&quot;beforeInteractive&quot;</code>. Keep the GTM snippet on <code className="font-mono text-xs">afterInteractive</code>.</p>
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
                  3. Stop existing tags that were already on the site
                </h2>
              </motion.div>

              <aside className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-left">
                <div className="flex gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      After steps 1 and 2 are saved, inside <GtmLink />, <strong className="text-foreground">this is for every tag that was already in the account,</strong> such as <strong className="text-foreground">Google Analytics, Google Ads, or a Meta pixel</strong>.
                    </p>
                    <p className="text-muted-foreground">
                      If <Slug>Cookie Banner Generator — Consent Mode</Slug> and <Slug>Cookie Banner</Slug> are the only tags in your account, skip this and go to step 4.
                    </p>
                  </div>
                </div>
              </aside>

              <Card className="border border-border bg-background">
                <CardContent className="pt-6 space-y-6">
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3"><span className="font-semibold text-foreground">1.</span><span>In the left menu, click <Slug>Tags</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">2.</span><span>Click the name of an existing tag. Skip <Slug>Cookie Banner Generator — Consent Mode</Slug> and <Slug>Cookie Banner</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">3.</span><span>The tag editor opens. Scroll past <Slug>Tag Configuration</Slug> and <Slug>Triggering</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">4.</span><span>Click <Slug>Advanced Settings</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">5.</span><span>Click <Slug>Consent Settings</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">6.</span><span>Select <Slug>Require additional consent for tag to fire</Slug>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">7.</span><span>Check the boxes for that tag, using the list under these steps.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">8.</span><span>Click <Slug>Save</Slug> at the top right.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">9.</span><span>Click <Slug>Tags</Slug> in the left menu and open the next existing tag. Stop when the only tags you have not changed are <Slug>Cookie Banner Generator — Consent Mode</Slug> and <Slug>Cookie Banner</Slug>.</span></li>
                  </ol>
                  <ul className="space-y-3 text-sm text-muted-foreground border-t border-border pt-4">
                    <li><strong className="text-foreground">GA4.</strong> Check <Slug>Analytics Storage</Slug>.</li>
                    <li><strong className="text-foreground">Google Ads.</strong> Check <Slug>Ad Storage</Slug>, <Slug>Ad User Data</Slug>, and <Slug>Ad Personalization</Slug>.</li>
                    <li><strong className="text-foreground">Meta, LinkedIn, TikTok, and other ad pixels.</strong> Check <Slug>Ad Storage</Slug>.</li>
                    <li><strong className="text-foreground">Hotjar and other analytics tools.</strong> Check <Slug>Analytics Storage</Slug>.</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    If Consent Settings is missing, the tag is usually Custom HTML. Open <strong className="text-foreground">Triggering</strong>, remove All Pages, and add a Custom Event trigger named <code className="font-mono text-xs">cookie_consent_update</code>. Set it to fire when <code className="font-mono text-xs">consent_marketing</code> equals true for an ad pixel, or <code className="font-mono text-xs">consent_analytics</code> equals true for an analytics tool.
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
                  Check the site before you publish the container.
                </p>
              </motion.div>
              <Card className="border border-border bg-background">
                <CardContent className="pt-6">
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3"><span className="font-semibold text-foreground">1.</span><span>In GTM, click <strong className="text-foreground">Preview</strong> at the top right. Enter your site address and click <strong className="text-foreground">Connect</strong>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">2.</span><span>On the site, leave the banner sitting there. In Tag Assistant, open the <strong className="text-foreground">Consent</strong> tab. Ad Storage, Analytics Storage, Ad User Data, and Ad Personalization should say <strong className="text-foreground">Denied</strong>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">3.</span><span>Click a GA4 or ads tag in the left list. It should say it has not fired, or that consent blocked it. Refresh the page. It should still be blocked.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">4.</span><span>On the banner, click <strong className="text-foreground">Accept All</strong>. Those tags should now say <strong className="text-foreground">Fired</strong>.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">5.</span><span>Refresh the page. The tags should fire again, and the banner should stay hidden.</span></li>
                    <li className="flex gap-3"><span className="font-semibold text-foreground">6.</span><span>Back in GTM, click <strong className="text-foreground">Submit</strong>, name the version, and click <strong className="text-foreground">Publish</strong>.</span></li>
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
