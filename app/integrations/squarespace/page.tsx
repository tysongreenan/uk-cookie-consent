'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Layout,
  Code,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Circle,
  Palette,
  Copy,
  CheckCircle2,
  Settings,
  Users,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { BeforeAfterSlider } from '@/components/landing/visuals/integration/BeforeAfterSlider'

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

const sellingPoints = [
  { text: 'Save 3+ Hours vs Custom Development' },
  { text: 'Avoid $20K+ GDPR Fines Automatically' },
  { text: 'Works with All Squarespace Plans' },
]

const integrationMethods = [
  {
    icon: Code,
    title: 'Code Injection (Recommended)',
    subtitle: 'Easiest method for most Squarespace users',
    code: `<!-- Add to Settings > Advanced > Code Injection > Header -->
<script>
(function() {
  // Cookie consent code here
  console.log('Cookie consent loaded');
})();
</script>

<!-- Add to Settings > Advanced > Code Injection > Footer -->
<script>
// Additional tracking scripts with consent checks
</script>`,
    features: [
      'Works with all Squarespace plans',
      'No template modifications needed',
      'Full customization control',
      'Easy to update and maintain',
    ],
  },
  {
    icon: Layout,
    title: 'Code Block Integration',
    subtitle: 'Add banner directly to specific pages',
    code: `<!-- Add to any page using Code Block -->
<div id="cookie-consent-banner">
  <!-- Cookie banner HTML -->
</div>

<script>
// Cookie consent logic
document.addEventListener('DOMContentLoaded', function() {
  initCookieConsent();
});
</script>`,
    features: [
      'Page-specific implementation',
      'Inline styling support',
      'Visual editor compatible',
      'Easy to preview and test',
    ],
  },
  {
    icon: Settings,
    title: 'Template Integration',
    subtitle: 'Advanced integration for developers',
    code: `<!-- Add to template files -->
{squarespace-cookie-consent}

<!-- Custom template integration -->
<script>
  window.Squarespace = window.Squarespace || {};
  window.Squarespace.onInitialize = function() {
    // Initialize cookie consent after Squarespace loads
    initCookieConsent();
  };
</script>`,
    features: [
      'Full template control',
      'Advanced customization options',
      'Integration with Squarespace APIs',
      'Developer-friendly approach',
    ],
  },
  {
    icon: Zap,
    title: 'E-commerce Integration',
    subtitle: 'Specialized for Squarespace Commerce',
    code: `<!-- E-commerce specific integration -->
<script>
// Track e-commerce events with consent
function trackPurchase(orderData) {
  if (hasConsent('analytics')) {
    gtag('event', 'purchase', {
      transaction_id: orderData.id,
      value: orderData.total,
      currency: orderData.currency
    });
  }
}
</script>`,
    features: [
      'Enhanced E-commerce tracking',
      'Cart abandonment recovery',
      'Conversion tracking',
      'Customer journey analytics',
    ],
  },
]

const guideSteps = [
  {
    title: 'Generate Your Cookie Banner Code',
    description: 'Create your cookie consent banner using our builder:',
    items: [
      'Configure compliance framework (GDPR, PIPEDA, CCPA)',
      'Customize design to match your Squarespace template',
      'Set up cookie categories and tracking scripts',
      'Configure consent behavior and preferences',
      'Generate your implementation code',
    ],
  },
  {
    title: 'Add Code to Squarespace Settings',
    description: 'Inject the code into your Squarespace site:',
    items: [
      'Go to Settings in your Squarespace dashboard',
      'Navigate to Advanced > Code Injection',
      'Paste the code in the "Header" section',
      'Save and publish your site',
      'Test the banner on your live site',
    ],
  },
  {
    title: 'Configure Squarespace Analytics',
    description: 'Set up consent-aware analytics:',
    items: [
      'Enable Squarespace Analytics in Settings',
      'Configure Google Analytics with consent checking',
      'Set up Facebook Pixel with consent gates',
      'Configure other tracking scripts',
      'Test analytics firing after consent',
    ],
  },
  {
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

const features = [
  {
    icon: Layout,
    title: 'Template Compatibility',
    items: [
      'Works with all Squarespace templates',
      'Responsive design for all devices',
      'Custom CSS integration',
      'Template-specific styling options',
    ],
  },
  {
    icon: Users,
    title: 'E-commerce Integration',
    items: [
      'Squarespace Commerce integration',
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
      'Mailchimp integration support',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    items: [
      'Minimal impact on page load speed',
      'Squarespace hosting optimization',
      'CDN integration for global performance',
      'Lazy loading and conditional scripts',
    ],
  },
]

export default function SquarespaceIntegrationPage() {
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
                    Squarespace Integration
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
                    Squarespace Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Copy, Paste, Done in 5 Minutes
                  </span>
                </h1>

                <div className="space-y-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {sellingPoints.map((point) => (
                    <p key={point.text} className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{point.text}</span>
                    </p>
                  ))}
                </div>
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
                    <Layout className="mr-2 h-4 w-4" />
                    Get Squarespace Code
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

        {/* Visual Demo */}
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
                See It In Action
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Watch how easy it is to add cookie consent to your Squarespace site
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Squarespace Code Injection
                </h3>
                <CodeCopyBlock />
              </motion.div>

              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  3-Step Installation
                </h3>
                <ThreeStepInstallation />
              </motion.div>
            </div>

            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12 max-w-6xl mx-auto"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 text-center">
                Before vs After
              </h3>
              <BeforeAfterSlider />
            </motion.div>

            <div className="text-center">
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/builder">
                  <Layout className="mr-2 h-4 w-4" />
                  Build My Squarespace Banner
                </Link>
              </Button>
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
              <div className="flex items-center justify-center gap-3 mb-2">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  Squarespace Integration Methods
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to integrate cookie consent with your Squarespace site
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {integrationMethods.map((method, i) => {
                const MethodIcon = method.icon
                return (
                  <motion.div
                    key={method.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                      <CardHeader>
                        <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                          <MethodIcon className="h-5 w-5 text-foreground" />
                          {method.title}
                        </CardTitle>
                        <CardDescription>{method.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                            <pre>{method.code}</pre>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {method.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
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
                Squarespace Integration Guide
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Get your Squarespace site compliant in 5 simple steps
              </p>
            </motion.div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {guideSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border border-border text-sm font-mono text-foreground">
                          {i + 1}
                        </span>
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {step.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Squarespace-Specific Features */}
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
                Squarespace-Specific Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built specifically for Squarespace templates and functionality
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {features.map((feature, i) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                          <FeatureIcon className="h-5 w-5 text-foreground" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-muted-foreground">
                          {feature.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
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
        </section>

        {/* Trust / Stats Section */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: '5-Minute Setup',
                  desc: 'Use Code Injection to paste a single script',
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
                <Layout className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Works with all Squarespace plans</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Make Your Squarespace Site Compliant?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Join thousands of Squarespace users using our cookie consent solution. Easy integration, professional results, and full compliance.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build My Squarespace Banner
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
