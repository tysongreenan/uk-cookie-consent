'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Globe,
  Code,
  ShoppingCart,
  Layout,
  Blocks,
  Palette,
  Tag,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Copy,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'

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

const websiteBuilders = [
  {
    slug: 'wordpress',
    name: 'WordPress',
    description: 'Paste a single snippet into your theme header. No plugins needed.',
    icon: Globe,
    badge: 'Most Popular',
    difficulty: 'Easy',
    time: '2 min',
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    description: 'Add via the theme editor. Works with all Shopify themes.',
    icon: ShoppingCart,
    badge: null,
    difficulty: 'Easy',
    time: '3 min',
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    description: 'Use the built-in Code Injection feature. No developer needed.',
    icon: Layout,
    badge: null,
    difficulty: 'Easy',
    time: '2 min',
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    description: 'Add via Project Settings > Custom Code. Requires a site plan.',
    icon: Palette,
    badge: null,
    difficulty: 'Easy',
    time: '3 min',
  },
  {
    slug: 'wix',
    name: 'Wix',
    description: 'Embed via the Velo custom code editor or HTML embed block.',
    icon: Blocks,
    badge: null,
    difficulty: 'Easy',
    time: '5 min',
  },
]

const developerTools = [
  {
    slug: 'react',
    name: 'React & Next.js',
    description: 'Add a script tag to your app. Works with App Router, Vite, and CRA.',
    icon: Code,
    badge: 'For Developers',
    difficulty: 'Easy',
    time: '2 min',
  },
  {
    slug: 'google-tag-manager',
    name: 'Google Tag Manager',
    description: 'Deploy via GTM with Consent Mode V2. Fire tags based on consent.',
    icon: Tag,
    badge: null,
    difficulty: 'Moderate',
    time: '5 min',
  },
]

const steps = [
  {
    number: '01',
    title: 'Build Your Banner',
    description: 'Use the visual builder to customize colors, layout, and copy to match your brand.',
    icon: Palette,
  },
  {
    number: '02',
    title: 'Copy the Script',
    description: 'Get a single script tag. No dependencies, no npm packages, no build steps.',
    icon: Copy,
  },
  {
    number: '03',
    title: 'Paste & Go Live',
    description: 'Add it to your site using the guide for your platform. You are compliant in minutes.',
    icon: CheckCircle2,
  },
]

function PlatformCard({
  integration,
  index,
}: {
  integration: (typeof websiteBuilders)[0]
  index: number
}) {
  const Icon = integration.icon

  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
      <Link href={`/integrations/${integration.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
          {/* Top row: icon, name, badges */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {integration.name}
                </h3>
              </div>
            </div>
            {integration.badge && (
              <Badge variant="outline" className="text-xs shrink-0">
                {integration.badge}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {integration.description}
          </p>

          {/* Bottom row: metadata + link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {integration.time}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                {integration.difficulty}
              </span>
            </div>
            <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              View Guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
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
                    Works on every platform
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
                    Add Cookie Consent
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    to Any Website
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  One script tag. Works on WordPress, Shopify, Webflow, React, and more.
                  Follow a step-by-step guide for your platform.
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
                  <Link href="#platforms">
                    Browse Platforms
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How it Works */}
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
                Three Steps to Compliance
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The same process works for every platform.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, i) => {
                const StepIcon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                      <StepIcon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mb-2 tracking-widest">
                      {step.number}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Platforms Grid */}
        <section id="platforms" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            {/* Website Builders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  Website Builders
                </h2>
                <Badge variant="outline" className="text-xs">
                  Copy &amp; paste
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                No coding required. Paste a script tag using your platform&apos;s built-in code editor.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {websiteBuilders.map((integration, i) => (
                <PlatformCard key={integration.slug} integration={integration} index={i} />
              ))}
            </div>

            {/* Developer Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  Developer Tools
                </h2>
                <Badge variant="outline" className="text-xs">
                  Script tag
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Add a script tag to your app or deploy through Google Tag Manager with Consent Mode V2.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {developerTools.map((integration, i) => (
                <PlatformCard key={integration.slug} integration={integration} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Stats Section */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: 'Quick Setup',
                  desc: 'Copy and paste a single script tag',
                },
                {
                  icon: Shield,
                  title: 'GDPR, CCPA & PIPEDA',
                  desc: 'Compliant with major privacy laws',
                },
                {
                  icon: Zap,
                  title: 'Under 10KB',
                  desc: 'No impact on page load speed',
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
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-border">
                      <ItemIcon className="h-5 w-5 text-foreground" />
                    </div>
                    <p className="font-heading font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                )
              })}
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
                <span>Same script works everywhere</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Get Compliant?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Create your cookie banner in the visual builder, then follow the guide for your platform to go live.
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
