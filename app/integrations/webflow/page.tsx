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
    question: "How do I add a cookie banner to Webflow?",
    answer: "Go to Project Settings > Custom Code in your Webflow dashboard. Paste the single script tag into the Head Code section. Publish your site. The cookie banner appears automatically on every page. The entire process takes under 3 minutes and requires zero coding knowledge."
  },
  {
    question: "Does Webflow cookie consent require a paid site plan?",
    answer: "Adding custom code in Webflow requires a paid site plan (Basic, CMS, Business, or Enterprise). This is a Webflow platform requirement for any custom code injection, not specific to our solution. If you are on the free Starter plan, you will need to upgrade to add any cookie consent solution via custom code."
  },
  {
    question: "Will a cookie banner slow down my Webflow site?",
    answer: "No. Our script is under 10KB gzipped and loads asynchronously from a global CDN. It will not block your page rendering or affect your Core Web Vitals scores. Webflow sites are already optimized for performance, and our banner is designed to preserve that speed."
  },
  {
    question: "Is this Webflow cookie consent GDPR and CCPA compliant?",
    answer: "Yes. The banner supports GDPR (EU), PIPEDA (Canada), CCPA/CPRA (California), and other global privacy regulations. It automatically blocks analytics and marketing scripts until the visitor consents. You configure the compliance mode in the visual builder based on your audience location."
  },
  {
    question: "Can I match the cookie banner to my Webflow design?",
    answer: "Absolutely. Use our visual builder to customize colors, fonts, button styles, position, and layout before generating your script. The banner respects your Webflow site typography and color palette. No CSS overrides needed. You can also update the design anytime from the dashboard without touching your Webflow project."
  },
]

const articleData = {
  title: "Webflow Cookie Banner: Add GDPR Consent to Webflow in 3 Minutes",
  description: "Step-by-step guide to adding a lightweight, GDPR-compliant cookie consent banner to any Webflow site using Project Settings custom code.",
  datePublished: "2025-06-01",
  dateModified: "2026-03-16"
}

const breadcrumbData = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "Integrations", url: "https://www.cookie-banner.ca/integrations" },
  { name: "Webflow Cookie Banner", url: "https://www.cookie-banner.ca/integrations/webflow" }
]

const features = [
  {
    icon: Palette,
    title: 'Matches Your Webflow Design',
    description: 'Visual builder lets you customize colors, typography, and layout. No CSS overrides or Webflow embeds needed.',
  },
  {
    icon: Zap,
    title: 'Under 10KB, Zero Impact',
    description: 'Async loading from a global CDN. Your Webflow site stays fast. No effect on Core Web Vitals or Lighthouse scores.',
  },
  {
    icon: Shield,
    title: 'GDPR, CCPA, PIPEDA',
    description: 'Automatically blocks tracking scripts until consent is given. Supports opt-in (GDPR) and opt-out (CCPA) modes.',
  },
  {
    icon: Globe,
    title: 'Works on Every Webflow Plan',
    description: 'Any paid site plan that supports custom code. Basic, CMS, Business, or Enterprise. Multi-site and client projects included.',
  },
  {
    icon: Eye,
    title: 'Update Without Republishing',
    description: 'Change banner text, colors, or compliance settings from the dashboard. Changes go live instantly. No Webflow republish needed.',
  },
  {
    icon: Settings,
    title: 'Google Consent Mode v2',
    description: 'Built-in support for Google Consent Mode. Works with GA4, Google Ads, and Tag Manager out of the box.',
  },
]

export default function WebflowIntegrationPage() {
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
                    Webflow Integration
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
                    Webflow Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    1 Script Tag. 3 Minutes. Done.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your Webflow site collects cookies the moment it loads. GDPR says that is illegal without consent.
                  Add a compliant cookie banner through Project Settings custom code — under 10KB, $99 one-time, no subscriptions.
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
                    Build Your Webflow Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#how-to-add">
                    See the 3-Step Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Do You Need a Cookie Banner on Webflow? */}
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
                  Do You Need a Cookie Banner on Webflow?
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
                  <strong className="text-foreground">Short answer: yes.</strong> Every Webflow site sets cookies. If you use Webflow Analytics, Google Analytics, Facebook Pixel, or any third-party integration, your site drops tracking cookies on visitors the moment they arrive.
                </p>
                <p>
                  Under GDPR, PIPEDA, and CCPA, you must get explicit consent before setting non-essential cookies. No banner means no consent — and fines start at EUR 20,000 for small businesses.
                </p>
                <p>
                  Webflow does not include a built-in cookie consent tool. The Webflow Marketplace has a few options, but most charge monthly fees and add heavy scripts that slow down your carefully optimized site.
                </p>
                <p>
                  Our solution is different: <strong className="text-foreground">1 script tag, under 10KB, $99 once.</strong> Paste it into Project Settings &gt; Custom Code and you are compliant in minutes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How to Add Cookie Consent to Webflow */}
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
                How to Add Cookie Consent to Webflow
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Three steps. No npm packages, no Webflow apps, no developer needed.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Step 1 */}
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                      1
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Build your banner in the visual editor
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Open the builder, pick your compliance framework (GDPR, PIPEDA, CCPA), customize the design to match your Webflow site, and click Generate. You get a single script tag.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/builder">
                      Open the Builder
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                      2
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Paste into Webflow Project Settings &gt; Custom Code
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    In your Webflow dashboard, go to <strong className="text-foreground">Project Settings &rarr; Custom Code &rarr; Head Code</strong>. Paste the script tag. That is it.
                  </p>
                  <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`<!-- Cookie Banner — paste in Project Settings > Custom Code > Head Code -->
<script
  src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"
  defer
></script>`}</pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    <strong className="text-foreground">Note:</strong> Custom code requires a paid Webflow site plan (Basic, CMS, Business, or Enterprise). The free Starter plan does not support custom code injection.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                      3
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Publish your Webflow site
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Click Publish in Webflow. The cookie banner appears automatically on every page. It blocks analytics and marketing cookies until the visitor consents. You are compliant.
                  </p>
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
                  Build Your Webflow Banner Now
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
                Why Webflow Designers Choose This Cookie Banner
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built for Webflow sites. No bloat, no subscriptions, no compromises on design.
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
                  Common questions about adding cookie consent to Webflow
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
                  <span>$99 one-time &middot; Under 10KB &middot; 1 script tag</span>
                </div>

                <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                  Make Your Webflow Site Compliant Today
                </h2>

                <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                  Build your cookie banner in the visual editor, paste the script into Webflow Project Settings, and publish. Three minutes from now, you are GDPR compliant.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                    <Link href="/builder">
                      Build Your Webflow Banner
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
