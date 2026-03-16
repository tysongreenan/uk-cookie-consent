'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ShoppingCart,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Circle,
  Palette,
  Copy,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Code,
  Globe,
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

const sellingPoints = [
  { text: 'No Shopify App Required' },
  { text: '$99 One-Time vs $300+/Year App Subscriptions' },
  { text: 'Under 10KB -- Zero Impact on Store Speed' },
]

const painPoints = [
  {
    icon: DollarSign,
    title: 'Apps drain your margins',
    description:
      'Shopify cookie consent apps charge $5-30/month. That is $60-360/year for a script that should cost you once.',
  },
  {
    icon: Zap,
    title: 'Apps slow your store down',
    description:
      'Most Shopify cookie apps load 200-500KB of JavaScript. Every extra 100ms of load time costs you 1% in conversions.',
  },
  {
    icon: AlertTriangle,
    title: 'Fines are real and growing',
    description:
      'GDPR fines reached EUR 2.1 billion in 2023. Canadian PIPEDA penalties hit $100K per violation. If you sell to the EU, UK, or Canada, you need consent management.',
  },
  {
    icon: Shield,
    title: 'Shopify built-in banner is not enough',
    description:
      'Shopify\'s native cookie banner only covers basic notice. It does not block third-party scripts, manage granular consent categories, or support Consent Mode V2.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Build Your Banner',
    description:
      'Use the visual builder to match your Shopify theme. Pick colors, position, and consent categories.',
    icon: Palette,
    code: null,
  },
  {
    number: '02',
    title: 'Paste into theme.liquid',
    description:
      'Go to Online Store > Themes > Edit Code. Open theme.liquid and paste the script before the closing </head> tag.',
    icon: Copy,
    code: `<!-- In theme.liquid, before </head> -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
  },
  {
    number: '03',
    title: 'Save and Publish',
    description:
      'Click Save. Your cookie banner is live. It automatically detects visitor location and shows the right consent options.',
    icon: CheckCircle2,
    code: null,
  },
]

const comparisonData = [
  { feature: 'Monthly cost', us: '$0 (one-time $99)', them: '$5-30/month' },
  { feature: 'Script size', us: 'Under 10KB', them: '200-500KB' },
  { feature: 'Requires Shopify app install', us: 'No', them: 'Yes' },
  { feature: 'GDPR + CCPA + PIPEDA', us: 'Yes', them: 'Varies' },
  { feature: 'Google Consent Mode V2', us: 'Yes', them: 'Some' },
  { feature: 'Setup time', us: '5 minutes', them: '15-30 minutes' },
  { feature: 'Slows down store', us: 'No', them: 'Often' },
]

const platformFeatures = [
  {
    icon: ShoppingCart,
    title: 'Works with Every Shopify Theme',
    items: [
      'Dawn, Debut, Brooklyn, and all free themes',
      'Premium themes from ThemeForest and Out of the Sandbox',
      'Custom Liquid themes and headless Hydrogen storefronts',
      'Shopify Plus checkout extensibility',
    ],
  },
  {
    icon: Globe,
    title: 'Geo-Targeted Compliance',
    items: [
      'Shows GDPR banner to EU and UK visitors',
      'Shows CCPA notice to California visitors',
      'Shows PIPEDA consent to Canadian visitors',
      'No banner for regions that do not require one',
    ],
  },
  {
    icon: Code,
    title: 'Script Blocking Built In',
    items: [
      'Blocks Google Analytics until consent is given',
      'Blocks Facebook Pixel, TikTok, and Klaviyo tracking',
      'Blocks Shopify analytics cookies automatically',
      'Supports Google Consent Mode V2 out of the box',
    ],
  },
  {
    icon: Zap,
    title: 'Optimized for E-Commerce',
    items: [
      'Does not interfere with cart or checkout flow',
      'Preserves conversion tracking after consent',
      'Works with Shopify Markets for multi-region stores',
      'Compatible with Shop Pay and accelerated checkout',
    ],
  },
]

export default function ShopifyIntegrationPage() {
  const faqData = [
    {
      question: 'Do I need a cookie banner on Shopify?',
      answer:
        'Yes, if your Shopify store receives visitors from the EU, UK, Canada, or California. GDPR requires explicit consent before setting non-essential cookies. PIPEDA and CCPA have similar requirements. Shopify sets analytics and marketing cookies by default, so you need a consent banner to stay compliant.',
    },
    {
      question: 'Can I add cookie consent to Shopify without an app?',
      answer:
        'Absolutely. You do not need a Shopify app to add cookie consent. Our solution is a single script tag that you paste into your theme.liquid file. Go to Online Store > Themes > Edit Code, open theme.liquid, and paste the script before the closing </head> tag. No app install, no app permissions, no monthly fees.',
    },
    {
      question: 'How does this compare to Shopify cookie consent apps like Pandectes or Consentmo?',
      answer:
        'Shopify cookie consent apps typically cost $5-30/month, load 200-500KB of JavaScript, and require app permissions to your store data. Our solution is a $99 one-time purchase, loads under 10KB, requires no app install, and no ongoing subscription. You get the same GDPR, CCPA, and PIPEDA compliance without the recurring cost or performance hit.',
    },
    {
      question: 'Does this work with Shopify Plus and Hydrogen?',
      answer:
        'Yes. For standard Shopify and Shopify Plus stores, paste the script into theme.liquid. For Hydrogen headless storefronts, add the script tag to your root layout component. The banner works the same way regardless of your Shopify plan.',
    },
    {
      question: 'Will a cookie banner slow down my Shopify store?',
      answer:
        'Not with our solution. The script is under 10KB and loads asynchronously with the defer attribute. It does not block page rendering or affect your Core Web Vitals. Most Shopify cookie apps load 200-500KB and can add 200-500ms to your page load time, which directly impacts conversion rates.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="faq" data={faqData} />

      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />

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
                    Shopify Integration
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
                    Shopify Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    No App. 1 Script Tag. 5 Minutes.
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

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/builder">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Build My Shopify Banner
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#how-to-add">
                    See How It Works
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Do You Need a Cookie Banner on Shopify? */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Do You Need a Cookie Banner on Shopify?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                If your store gets visitors from the EU, UK, or Canada, the short answer is yes.
                Here is why most Shopify store owners get this wrong.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {painPoints.map((point, i) => {
                const PointIcon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border border-border bg-background">
                      <CardHeader>
                        <CardTitle className="font-heading flex items-center gap-2 text-foreground text-lg">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted border border-border">
                            <PointIcon className="h-4 w-4 text-foreground" />
                          </div>
                          {point.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {point.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How to Add Cookie Consent to Shopify */}
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
                How to Add Cookie Consent to Shopify
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                No app install. No developer. Three steps in the Shopify theme editor.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
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
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                        <StepIcon className="h-5 w-5 text-foreground" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="text-xs font-mono text-muted-foreground mb-1 tracking-widest">
                        STEP {step.number}
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {step.description}
                      </p>
                      {step.code && (
                        <div className="bg-foreground/95 text-background font-mono p-4 rounded-lg text-sm overflow-x-auto">
                          <pre className="whitespace-pre-wrap">{step.code}</pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="text-center mt-10">
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build My Shopify Banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Shopify Cookie Consent App Alternative Comparison */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Is There a Better Alternative to Shopify Cookie Consent Apps?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how a single script tag compares to monthly Shopify app subscriptions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left font-heading font-semibold text-foreground">
                        Feature
                      </th>
                      <th className="px-4 py-3 text-center font-heading font-semibold text-foreground">
                        Cookie Banner
                      </th>
                      <th className="px-4 py-3 text-center font-heading font-semibold text-muted-foreground">
                        Shopify Apps
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={i < comparisonData.length - 1 ? 'border-b border-border' : ''}
                      >
                        <td className="px-4 py-3 text-muted-foreground">{row.feature}</td>
                        <td className="px-4 py-3 text-center font-medium text-foreground">
                          {row.us}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{row.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                <Link href="/builder">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Switch from Shopify Apps
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Features / Compatibility */}
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
                What Makes This Work for Shopify Stores?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for e-commerce. Tested on every major Shopify theme.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {platformFeatures.map((feature, i) => {
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
                        <CardTitle className="font-heading flex items-center gap-2 text-foreground text-lg">
                          <FeatureIcon className="h-5 w-5 text-foreground" />
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                          {feature.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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

        {/* Trust Stats */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: '5-Minute Setup',
                  desc: '1 script tag in your theme.liquid file',
                },
                {
                  icon: Shield,
                  title: 'GDPR, CCPA & PIPEDA',
                  desc: 'Automatic geo-targeted compliance',
                },
                {
                  icon: Zap,
                  title: 'Under 10KB',
                  desc: 'Zero impact on store load speed',
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

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-background border-t border-border">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  Shopify Cookie Banner FAQ
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Common questions about Shopify cookie consent, GDPR compliance, and app alternatives
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>No Shopify app required</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Stop Paying Monthly for Cookie Consent
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10 max-w-2xl mx-auto">
                One script tag. One payment. GDPR, CCPA, and PIPEDA compliance for your Shopify store, without the app store markup.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build My Shopify Banner
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
