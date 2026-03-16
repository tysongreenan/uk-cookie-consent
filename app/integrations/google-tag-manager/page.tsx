'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  Code,
  CheckCircle,
  AlertTriangle,
  Globe,
  Users,
  Zap,
  Clock,
  BarChart3,
  Shield,
  ArrowRight,
  Circle,
  Tag,
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
                    GTM Integration
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
                    Cookie Consent Integration
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.
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

        {/* Why GTM + Cookie Consent */}
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
                Why Use GTM for Cookie Consent?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Google Tag Manager provides powerful consent management capabilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Consent Mode v2',
                  desc: 'Built-in Consent Mode v2 support for Google Analytics 4, Google Ads, and other Google services.',
                },
                {
                  icon: CheckCircle,
                  title: 'Tag Firing Control',
                  desc: 'Granular control over when tags fire based on user consent choices. No more wasted tracking.',
                },
                {
                  icon: Users,
                  title: 'Centralized Management',
                  desc: 'Manage all your tracking tags and consent logic from one central GTM container.',
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Analytics',
                  desc: 'Track consent rates, user behavior, and conversion impact with detailed GTM reporting.',
                },
                {
                  icon: Shield,
                  title: 'GDPR Compliance',
                  desc: 'Built-in GDPR compliance features including consent state management and data retention controls.',
                },
                {
                  icon: Globe,
                  title: 'Cross-Domain Tracking',
                  desc: 'Maintain consent state across multiple domains and subdomains with GTM\'s cross-domain capabilities.',
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

        {/* Consent Mode v2 */}
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
                  Consent Mode v2 Implementation
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Google&apos;s latest consent framework for privacy-compliant tracking
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-foreground" />
                        What is Consent Mode v2?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Consent Mode v2 is Google&apos;s framework for handling user consent in Google Analytics, Google Ads, and other Google services:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Automatically adjusts data collection based on consent</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Provides modeling for consented data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Required for Google Ads conversion tracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>Supports granular consent categories</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                  <Card className="border border-border bg-background h-full">
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-foreground" />
                        Required Consent Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Consent Mode v2 requires these specific consent types:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">ad_storage:</strong> Advertising cookies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">analytics_storage:</strong> Analytics cookies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">functionality_storage:</strong> Functional cookies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">personalization_storage:</strong> Personalization cookies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Tag className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                          <span><strong className="text-foreground">security_storage:</strong> Security cookies</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
                <Card className="border border-border bg-background mb-8">
                  <CardHeader>
                    <CardTitle className="font-heading">Consent Mode v2 Implementation Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-foreground/95 text-background font-mono p-6 rounded-lg text-sm overflow-x-auto">
                      <pre>{`// Default consent state (denied)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted' // Usually granted for security
});

// Update consent when user makes choice
gtag('consent', 'update', {
  'ad_storage': 'granted', // User consented to advertising
  'analytics_storage': 'granted' // User consented to analytics
});`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GTM Integration Methods */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  GTM Integration Methods
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose the integration method that works best for your GTM setup
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Code,
                    title: 'Method 1: Custom HTML Tag',
                    badge: 'Recommended',
                    desc: 'Add our cookie consent as a Custom HTML tag in GTM:',
                    steps: [
                      'Create new Custom HTML tag',
                      'Add your generated cookie banner code',
                      'Set trigger to "All Pages"',
                      'Configure Consent Mode v2 integration',
                      'Publish your container',
                    ],
                    pros: ['Easy to implement and manage', 'Full GTM integration'],
                    cons: ['Requires GTM knowledge'],
                  },
                  {
                    icon: BarChart3,
                    title: 'Method 2: Consent Mode Template',
                    badge: 'Advanced',
                    desc: 'Use GTM\'s built-in Consent Mode template:',
                    steps: [
                      'Install Consent Mode template from Gallery',
                      'Configure consent categories',
                      'Set up consent triggers',
                      'Configure tag firing rules',
                      'Test and publish',
                    ],
                    pros: ['Native GTM integration', 'Advanced consent management'],
                    cons: ['Complex setup'],
                  },
                  {
                    icon: Globe,
                    title: 'Method 3: External Consent API',
                    badge: 'Developer',
                    desc: 'Integrate with external consent management platform:',
                    steps: [
                      'Set up external CMP (Consent Management Platform)',
                      'Configure GTM consent API',
                      'Map consent categories',
                      'Set up data layer events',
                      'Configure tag firing rules',
                    ],
                    pros: ['Enterprise-grade solution', 'Advanced consent features'],
                    cons: ['Requires technical expertise'],
                  },
                  {
                    icon: Users,
                    title: 'Method 4: Custom JavaScript Variable',
                    badge: 'Flexible',
                    desc: 'Create custom JavaScript variables for consent state:',
                    steps: [
                      'Create custom JavaScript variables',
                      'Define consent state logic',
                      'Configure trigger conditions',
                      'Set up tag firing rules',
                      'Test consent state changes',
                    ],
                    pros: ['Maximum flexibility', 'Custom consent logic'],
                    cons: ['Requires JavaScript knowledge'],
                  },
                ].map((method, i) => {
                  const MethodIcon = method.icon
                  return (
                    <motion.div
                      key={method.title}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <Card className="border border-border bg-background h-full">
                        <CardHeader>
                          <CardTitle className="font-heading flex items-center gap-2">
                            <MethodIcon className="h-5 w-5 text-foreground" />
                            {method.title}
                          </CardTitle>
                          <Badge variant="outline" className="w-fit text-xs">{method.badge}</Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {method.desc}
                          </p>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                            {method.steps.map((step, j) => (
                              <li key={j}>{step}</li>
                            ))}
                          </ol>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {method.pros.map((pro, j) => (
                              <li key={`pro-${j}`} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{pro}</span>
                              </li>
                            ))}
                            {method.cons.map((con, j) => (
                              <li key={`con-${j}`} className="flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span>{con}</span>
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
                  GTM Tag Firing Rules
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Configure when your tags should fire based on consent choices
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BarChart3,
                    title: 'Analytics Tags',
                    sections: [
                      {
                        name: 'Google Analytics 4',
                        items: [
                          'Trigger: analytics_storage = granted',
                          'Include consent state in configuration',
                          'Use enhanced measurement events',
                        ],
                      },
                      {
                        name: 'Google Analytics Universal',
                        items: [
                          'Trigger: analytics_storage = granted',
                          'Configure anonymize IP setting',
                          'Set cookie expiration based on consent',
                        ],
                      },
                    ],
                  },
                  {
                    icon: Zap,
                    title: 'Advertising Tags',
                    sections: [
                      {
                        name: 'Google Ads',
                        items: [
                          'Trigger: ad_storage = granted',
                          'Include conversion tracking',
                          'Set up remarketing audiences',
                        ],
                      },
                      {
                        name: 'Facebook Pixel',
                        items: [
                          'Trigger: ad_storage = granted',
                          'Configure advanced matching',
                          'Set up conversion API',
                        ],
                      },
                    ],
                  },
                  {
                    icon: Users,
                    title: 'Functional Tags',
                    sections: [
                      {
                        name: 'Chat Widgets',
                        items: [
                          'Trigger: functionality_storage = granted',
                          'Include user identification',
                          'Set up conversation tracking',
                        ],
                      },
                      {
                        name: 'Personalization',
                        items: [
                          'Trigger: personalization_storage = granted',
                          'Configure user preferences',
                          'Set up recommendation engines',
                        ],
                      },
                    ],
                  },
                  {
                    icon: Shield,
                    title: 'Security Tags',
                    sections: [
                      {
                        name: 'Fraud Detection',
                        items: [
                          'Trigger: security_storage = granted (default)',
                          'Include device fingerprinting',
                          'Set up risk scoring',
                        ],
                      },
                      {
                        name: 'CAPTCHA',
                        items: [
                          'Trigger: security_storage = granted (default)',
                          'Configure bot detection',
                          'Set up rate limiting',
                        ],
                      },
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
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {category.sections.map((section) => (
                              <div key={section.name}>
                                <h4 className="font-heading font-semibold text-foreground mb-2">{section.name}</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  {section.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                      <span className="text-muted-foreground mt-0.5 shrink-0">&bull;</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
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
                  GTM Implementation Step-by-Step
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complete guide to implementing cookie consent with Google Tag Manager
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    number: '1',
                    title: 'Set Up Consent Mode v2',
                    desc: 'Configure Consent Mode v2 in your GTM container:',
                    steps: [
                      'Go to your GTM container',
                      'Navigate to "Tags" \u2192 "New"',
                      'Choose "Consent Mode" tag type',
                      'Set default consent state to "denied"',
                      'Configure all required consent types',
                      'Set trigger to "All Pages"',
                    ],
                    ordered: true,
                  },
                  {
                    number: '2',
                    title: 'Create Cookie Consent Tag',
                    desc: 'Add our cookie consent as a Custom HTML tag:',
                    steps: [
                      'Create new "Custom HTML" tag',
                      'Paste your generated cookie banner code',
                      'Configure consent update events',
                      'Set trigger to "All Pages"',
                      'Ensure tag fires before other tags',
                    ],
                    ordered: true,
                  },
                  {
                    number: '3',
                    title: 'Configure Tag Firing Rules',
                    desc: 'Set up triggers for your existing tags:',
                    steps: [
                      'Create consent-based triggers for each tag type',
                      'Set Google Analytics to fire only with analytics_storage = granted',
                      'Configure advertising tags to fire only with ad_storage = granted',
                      'Set functional tags to fire only with functionality_storage = granted',
                      'Test all trigger conditions',
                    ],
                    ordered: false,
                  },
                  {
                    number: '4',
                    title: 'Test and Publish',
                    desc: 'Verify your GTM implementation works correctly:',
                    steps: [
                      'Use GTM Preview mode to test consent flow',
                      'Verify consent state changes trigger tag updates',
                      'Check that denied consent prevents tag firing',
                      'Test all consent categories independently',
                      'Publish your container and test on live site',
                    ],
                    ordered: false,
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
                        {step.ordered ? (
                          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            {step.steps.map((s, j) => (
                              <li key={j}>{s}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="space-y-2 text-muted-foreground">
                            {step.steps.map((s, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        )}
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Full Consent Mode v2 support</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Implement GTM Cookie Consent?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Get started with our GTM cookie consent integration. Complete Consent Mode v2 support, advanced tag management, and full GDPR compliance.
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
