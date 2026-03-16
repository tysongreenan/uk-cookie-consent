'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Code,
  Zap,
  Users,
  CheckCircle,
  Download,
  Settings,
  Smartphone,
  ArrowRight,
  Circle,
  Clock,
  Shield,
  Copy,
  CheckCircle2,
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

const whyCards = [
  {
    icon: Code,
    title: 'Wix Analytics',
    description: 'Built-in Wix Analytics and visitor insights require cookie consent under GDPR, PIPEDA, and CCPA.',
  },
  {
    icon: Zap,
    title: 'Velo Custom Code',
    description: 'Google Analytics, Facebook Pixel, and other tracking scripts added via Velo require explicit consent.',
  },
  {
    icon: Users,
    title: 'E-commerce Tracking',
    description: 'Wix Stores uses cookies for cart tracking, conversion measurement, and customer analytics.',
  },
  {
    icon: Settings,
    title: 'Form Submissions',
    description: 'Contact forms, newsletter signups, and other data collection forms require proper consent handling.',
  },
  {
    icon: Smartphone,
    title: 'App Market Integration',
    description: 'Third-party apps from the Wix App Market often use cookies that require consent management.',
  },
  {
    icon: CheckCircle,
    title: 'Global Compliance',
    description: 'Wix sites serving international audiences must comply with multiple privacy laws and regulations.',
  },
]

const integrationSteps = [
  {
    number: '1',
    title: 'Generate Your Cookie Banner Code',
    description: 'Create your cookie consent banner using our builder:',
    items: [
      'Configure compliance framework (GDPR, PIPEDA, CCPA)',
      'Customize design to match your Wix template',
      'Set up cookie categories and tracking scripts',
      'Configure consent behavior and preferences',
      'Generate your implementation code',
    ],
  },
  {
    number: '2',
    title: 'Add HTML Embed Element',
    description: 'Add the code to your Wix site:',
    items: [
      'Open your Wix site in the Editor',
      'Add an HTML Embed element to your page',
      'Paste the cookie consent code',
      'Position the element where you want the banner',
      'Save and publish your site',
    ],
  },
  {
    number: '3',
    title: 'Configure Wix Analytics',
    description: 'Set up consent-aware analytics:',
    items: [
      'Enable Wix Analytics in your dashboard',
      'Configure Google Analytics with consent checking',
      'Set up Facebook Pixel with consent gates',
      'Configure other tracking scripts',
      'Test analytics firing after consent',
    ],
  },
  {
    number: '4',
    title: 'Test and Customize',
    description: 'Ensure everything works correctly:',
    items: [
      'Test consent banner appearance and functionality',
      'Verify analytics only fire after consent',
      'Test consent withdrawal and re-consent',
      'Check mobile responsiveness',
      'Validate compliance with your target regulations',
    ],
  },
  {
    number: '5',
    title: 'Monitor and Maintain',
    description: 'Keep your compliance up to date:',
    items: [
      'Monitor consent rates and user feedback',
      'Update cookie categories as needed',
      'Review and update privacy policies',
      'Stay informed about regulation changes',
      'Regular compliance audits',
    ],
  },
]

const featureSections = [
  {
    icon: Code,
    title: 'Template Compatibility',
    items: [
      'Works with all Wix templates',
      'Responsive design for all devices',
      'Custom CSS integration',
      'Template-specific styling options',
    ],
  },
  {
    icon: Users,
    title: 'E-commerce Integration',
    items: [
      'Wix Stores integration',
      'Cart tracking with consent',
      'Conversion tracking compliance',
      'Customer analytics protection',
    ],
  },
  {
    icon: Settings,
    title: 'Form Integration',
    items: [
      'Contact form consent',
      'Newsletter signup compliance',
      'Data collection consent',
      'Third-party form integrations',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    items: [
      'Minimal impact on page load speed',
      'Wix hosting optimization',
      'CDN integration for global performance',
      'Lazy loading and conditional scripts',
    ],
  },
]

export default function WixIntegrationPage() {
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
                    Wix Integration
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
                    Wix Cookie Consent
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Velo-Ready Solution
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Complete Wix cookie consent integration. Velo integration, app market alternative,
                  performance optimization. GDPR, PIPEDA, CCPA compliant.
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
                    Get Wix Solution
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#guide">
                    View Integration Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Wix Needs Cookie Consent */}
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
                Why Wix Sites Need Cookie Consent
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Wix sites use various tracking and analytics tools that require compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyCards.map((card, i) => {
                const CardIcon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <CardIcon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Integration Methods */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Wix Integration Methods
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Multiple ways to integrate cookie consent with your Wix site
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* HTML Embed Element */}
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] h-full">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Code className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        HTML Embed Element
                      </h3>
                      <p className="text-sm text-muted-foreground">Easiest method for most Wix users</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                      <pre>{`<!-- Add via HTML Embed Element -->
<div id="cookie-consent-banner">
  <!-- Cookie banner HTML -->
</div>

<script>
(function() {
  // Cookie consent code here
  console.log('Cookie consent loaded');
})();
</script>

<style>
#cookie-consent-banner {
  /* Custom styles */
}
</style>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Works with all Wix plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>No coding knowledge required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Visual editor compatible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Easy to update and maintain</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Velo Integration */}
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] h-full">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Zap className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Velo Integration
                      </h3>
                      <p className="text-sm text-muted-foreground">Advanced integration for developers</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                      <pre>{`// Velo (Wix Code) integration
import wixWindow from 'wix-window';

$w.onReady(function () {
  // Initialize cookie consent
  initCookieConsent();
});

function initCookieConsent() {
  // Check if consent already given
  const consent = wixStorage.getItem('cookie-consent');

  if (!consent) {
    // Show consent banner
    showConsentBanner();
  }
}

function handleConsent(accepted) {
  // Store consent in Wix storage
  wixStorage.setItem('cookie-consent', accepted);

  // Hide banner
  hideConsentBanner();

  // Initialize tracking based on consent
  if (accepted) {
    initTracking();
  }
}`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Full Wix API integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wix Storage integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Dynamic content management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Advanced customization options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* App Market Alternative */}
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] h-full">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Settings className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        App Market Alternative
                      </h3>
                      <p className="text-sm text-muted-foreground">Custom solution vs. marketplace apps</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                      <pre>{`// Why choose our solution over App Market apps:

+ No monthly subscription fees
+ No app marketplace limitations
+ Full customization control
+ Better performance optimization
+ Direct support and updates
+ No vendor lock-in

// App Market apps often have:
- Limited customization options
- Monthly subscription costs
- Performance overhead
- Dependency on third-party servers
- Limited support and updates`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>No subscription fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Full customization control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Better performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Direct support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* E-commerce Integration */}
              <motion.div
                custom={3}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] h-full">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Users className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        E-commerce Integration
                      </h3>
                      <p className="text-sm text-muted-foreground">Specialized for Wix Stores</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                      <pre>{`// Wix Stores integration
import wixStores from 'wix-stores';

$w.onReady(function () {
  // Listen for cart events
  $w('#cart').onItemAdded((event) => {
    if (hasConsent('analytics')) {
      trackCartEvent('add_to_cart', event.item);
    }
  });

  // Listen for purchase events
  wixStores.onPurchaseComplete((event) => {
    if (hasConsent('analytics')) {
      trackPurchase(event.order);
    }
  });
});

function trackPurchase(order) {
  // Google Analytics Enhanced Ecommerce
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      transaction_id: order.orderNumber,
      value: order.total,
      currency: order.currency
    });
  }
}`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Wix Stores integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Cart tracking with consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Conversion tracking compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Customer analytics protection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section id="guide" className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Wix Integration Guide
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Get your Wix site compliant in 5 simple steps
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {integrationSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border text-sm font-mono font-semibold text-foreground">
                        {step.number}
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Wix-Specific Features */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Wix-Specific Features
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built specifically for Wix templates and functionality
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {featureSections.map((section, i) => {
                const SectionIcon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <SectionIcon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {section.title}
                        </h3>
                      </div>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {section.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
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
                  title: '5-Minute Setup',
                  desc: 'No App Market limitations',
                },
                {
                  icon: Shield,
                  title: 'GDPR, CCPA & PIPEDA',
                  desc: 'Full compliance without subscriptions',
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>No App Market required</span>
                </div>

                <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                  Ready to Make Your Wix Site Compliant?
                </h2>

                <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                  Join thousands of Wix users using our cookie consent solution. Easy integration,
                  professional results, and full compliance without App Market limitations.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                    <Link href="/builder">
                      Get Wix Solution
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
