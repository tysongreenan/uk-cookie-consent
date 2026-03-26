'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowRight,
  Circle,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Globe,
  Code,
  Palette,
  Eye,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { StructuredData } from '@/components/seo/structured-data'

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

const faqData = [
  {
    question: "How do I add cookie consent to a Wix site?",
    answer: "Open your Wix Editor, go to Settings > Custom Code (or use an HTML embed element). Paste the single script tag into the Head section so it loads on every page. Save and publish. The cookie banner appears automatically and blocks tracking scripts until the visitor consents. The whole process takes about 5 minutes."
  },
  {
    question: "Does this work without Velo or coding knowledge?",
    answer: "Yes. The simplest method uses the Wix custom code editor under Settings > Custom Code. You paste one script tag and publish. No Velo, no JavaScript, no coding. If you do use Velo, you can also add the script programmatically through the Head section for more control."
  },
  {
    question: "Why not use a cookie consent app from the Wix App Market?",
    answer: "Most Wix App Market cookie consent apps charge $5-15 per month and add heavy scripts that slow down your site. Our solution costs $99 one-time with no recurring fees. The script is under 10KB and loads from a global CDN. You also get full customization control that marketplace apps restrict behind premium tiers."
  },
  {
    question: "Is this Wix cookie banner GDPR and PIPEDA compliant?",
    answer: "Yes. The banner supports GDPR (EU), PIPEDA (Canada), CCPA/CPRA (California), and other global privacy laws. It blocks analytics and marketing cookies by default and only fires them after the visitor gives consent. You choose the compliance mode in the visual builder based on where your audience is located."
  },
  {
    question: "Will this cookie banner work with Wix Stores?",
    answer: "Yes. The banner works alongside Wix Stores without interfering with essential e-commerce cookies like cart and checkout. It only manages non-essential cookies like analytics and marketing trackers. Conversion tracking and Facebook Pixel fire only after the visitor consents, keeping your store compliant."
  },
]

const articleData = {
  title: "Wix Cookie Banner: Add GDPR Consent to Wix Without App Market",
  description: "Step-by-step guide to adding a lightweight, GDPR-compliant cookie consent banner to any Wix site using custom code or HTML embed.",
  datePublished: "2025-06-01",
  dateModified: "2026-03-16"
}

const breadcrumbData = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "Integrations", url: "https://www.cookie-banner.ca/integrations" },
  { name: "Wix Cookie Banner", url: "https://www.cookie-banner.ca/integrations/wix" }
]

const features = [
  {
    icon: ShoppingCart,
    title: 'Wix Stores Compatible',
    description: 'Essential e-commerce cookies keep working. Analytics and marketing trackers only fire after consent. No impact on cart or checkout.',
  },
  {
    icon: Zap,
    title: 'Under 10KB, Async Loading',
    description: 'Loads from a global CDN without blocking your page. No performance hit. Your Wix site stays fast on every device.',
  },
  {
    icon: Shield,
    title: 'GDPR, CCPA, PIPEDA',
    description: 'Blocks non-essential cookies until consent is given. Supports opt-in (GDPR) and opt-out (CCPA) compliance modes.',
  },
  {
    icon: Palette,
    title: 'Matches Any Wix Template',
    description: 'Customize colors, fonts, layout, and position in the visual builder. Looks native on every Wix template. No CSS needed.',
  },
  {
    icon: Eye,
    title: 'Update Without Republishing',
    description: 'Change banner copy, design, or compliance settings from the dashboard. Changes appear instantly. No Wix Editor needed.',
  },
  {
    icon: Settings,
    title: 'Google Consent Mode v2',
    description: 'Built-in support for Google Consent Mode. Works with GA4, Google Ads, Facebook Pixel, and other marketing scripts.',
  },
]

export default function WixIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="faq" data={faqData} />
      <StructuredData type="article" data={articleData} />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />

          <div className="container max-w-7xl px-4 sm:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center gap-8 relative z-10">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                  <Circle className="h-2 w-2 fill-foreground/60" />
                  <span className="text-sm text-muted-foreground tracking-wide">
                    Wix Integration
                  </span>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-4xl space-y-4"
              >
                <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    Wix Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Skip the App Market. Own It.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Wix App Market cookie apps charge monthly and slow down your site. Add a GDPR-compliant cookie banner
                  with 1 script tag instead — under 10KB, $99 one-time, works with every Wix template.
                </p>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Wix Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#how-to-add">
                    See the Installation Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Do You Need a Cookie Banner on Wix? */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Do You Need a Cookie Banner on Wix?
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-5 text-muted-foreground leading-relaxed"
              >
                <p>
                  <strong className="text-foreground">Yes — even on a basic Wix site.</strong> Wix sets its own analytics cookies by default. If you have added Google Analytics, Facebook Pixel, Wix Stores, or any third-party app from the App Market, your site is dropping tracking cookies on every visitor.
                </p>
                <p>
                  GDPR requires explicit opt-in consent before non-essential cookies are set. PIPEDA and CCPA have similar requirements. Without a cookie consent banner, your Wix site is not compliant — and regulators are increasingly targeting small and mid-size websites.
                </p>
                <p>
                  The Wix App Market offers cookie consent apps, but most charge $5-15 per month and inject large scripts that slow your site down. That monthly fee adds up: $60-180 per year, every year, for a problem you can solve once.
                </p>
                <p>
                  Our approach: <strong className="text-foreground">paste 1 script tag via Wix custom code or HTML embed, pay $99 once, and never think about it again.</strong> Under 10KB. No App Market dependency.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How to Add Cookie Consent to Wix */}
        <section id="how-to-add" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                How to Add Cookie Consent to Wix
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Two methods depending on your comfort level. Both take under 5 minutes.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Method A: Custom Code */}
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                      A
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Method A: Wix Custom Code (recommended)
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Works on Wix Premium plans with custom code access</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">1</div>
                      <p className="text-sm text-muted-foreground">Open the builder, customize your banner, and generate the script tag.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-muted-foreground">In your Wix dashboard, go to <strong className="text-foreground">Settings &rarr; Custom Code</strong>.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-muted-foreground">Click <strong className="text-foreground">Add Custom Code</strong>, paste the script, set it to load in the <strong className="text-foreground">Head</strong> on <strong className="text-foreground">All Pages</strong>.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-muted-foreground">Publish your site. The banner appears on every page.</p>
                    </div>
                  </div>

                  <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto mt-5">
                    <pre>{`<!-- Cookie Banner — paste in Wix Settings > Custom Code > Head -->
<script
  src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"
  defer
></script>`}</pre>
                  </div>
                </div>
              </motion.div>

              {/* Method B: HTML Embed */}
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                      B
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Method B: HTML Embed Element
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Works on all Wix plans, including free</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">1</div>
                      <p className="text-sm text-muted-foreground">Open the Wix Editor, click <strong className="text-foreground">Add Elements &rarr; Embed Code &rarr; Custom Element</strong> or <strong className="text-foreground">HTML iframe</strong>.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-muted-foreground">Paste the script tag into the code editor.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-muted-foreground">Add the element to your site header or footer so it appears on every page.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-mono font-semibold text-foreground shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-muted-foreground">Publish your site. Done.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Velo note */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Code className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Using Wix Velo?
                      </h3>
                      <p className="text-sm text-muted-foreground">For developers who want programmatic control</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    If you use Velo (Wix Code), you can load the script dynamically. Add it in your site-level <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">masterPage.js</code> to ensure it loads on every page before other tracking scripts.
                  </p>
                  <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`// masterPage.js — loads on every page
import { head } from 'wix-head';

$w.onReady(function () {
  head.addScript(
    'https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID',
    { defer: true }
  );
});`}</pre>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-10"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build Your Wix Banner Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Why Wix Site Owners Switch to This Cookie Banner
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                No App Market fees. No bloated scripts. Full control over your cookie consent.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <FeatureIcon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
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
                  Common questions about Wix cookie consent and GDPR compliance
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>$99 one-time &middot; No App Market needed</span>
                </div>

                <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                  Make Your Wix Site Compliant Today
                </h2>

                <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                  Build your cookie banner in the visual editor, paste the script into Wix custom code or an HTML embed, and publish. Five minutes from now, your Wix site is GDPR compliant.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                    <Link href="/builder">
                      Build Your Wix Banner
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
                    <Link href="/integrations">
                      Browse All Integrations
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
