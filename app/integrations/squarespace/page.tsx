'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Layout,
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
  FileCode,
  Globe,
  Settings,
  Eye,
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
  { text: 'Works via Code Injection -- No Plugins' },
  { text: '$99 One-Time, Not Another Monthly Bill' },
  { text: 'Under 10KB -- Your PageSpeed Score Stays High' },
]

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Squarespace has no built-in cookie consent',
    description:
      'Unlike WordPress or Shopify, Squarespace does not offer any native cookie consent tool. If you use Google Analytics, Facebook Pixel, or any third-party embed, you are setting cookies without consent.',
  },
  {
    icon: Shield,
    title: 'The EU cookie banner is not real consent',
    description:
      'Squarespace\'s built-in "cookie banner" is a simple notice that says "this site uses cookies." Under GDPR, that is not valid consent. You need opt-in controls that block cookies until the visitor agrees.',
  },
  {
    icon: Globe,
    title: 'Your audience is probably global',
    description:
      'Squarespace sites serve visitors from everywhere. If even one visitor comes from the EU, UK, or Canada, you need proper cookie consent. Portfolio sites, service businesses, and e-commerce stores all face the same rules.',
  },
  {
    icon: Zap,
    title: 'Third-party tools make it worse',
    description:
      'Consent management platforms like Cookiebot or OneTrust charge $10-50/month and add 300-800KB of JavaScript to your site. On Squarespace, where you cannot optimize the build, that performance hit is especially painful.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Design Your Banner',
    description:
      'Use the visual builder to create a cookie banner that matches your Squarespace template. Pick fonts, colors, and layout.',
    icon: Palette,
    code: null,
  },
  {
    number: '02',
    title: 'Paste into Code Injection',
    description:
      'In your Squarespace dashboard, go to Settings > Advanced > Code Injection. Paste the script into the Header field.',
    icon: Copy,
    code: `<!-- Settings > Advanced > Code Injection > Header -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
  },
  {
    number: '03',
    title: 'Save and You Are Done',
    description:
      'Hit Save. The banner appears on every page of your Squarespace site. It detects visitor location and applies the right privacy rules automatically.',
    icon: CheckCircle2,
    code: null,
  },
]

const platformFeatures = [
  {
    icon: Layout,
    title: 'Built for Squarespace Templates',
    items: [
      'Works with all Squarespace 7.0 and 7.1 templates',
      'Adapts to your template\'s typography and spacing',
      'Responsive across all breakpoints Squarespace supports',
      'Does not interfere with Squarespace\'s AJAX page loading',
    ],
  },
  {
    icon: Settings,
    title: 'Handles Your Third-Party Scripts',
    items: [
      'Blocks Google Analytics until consent is given',
      'Blocks Facebook Pixel, Pinterest, and marketing tags',
      'Works with Squarespace\'s built-in analytics separately',
      'Supports Google Consent Mode V2 for Ads and Analytics',
    ],
  },
  {
    icon: Eye,
    title: 'No Coding Required',
    items: [
      'Visual builder creates the code for you',
      'Code Injection is a standard Squarespace feature',
      'Available on Business plan and above',
      'No need to touch template files or developer mode',
    ],
  },
  {
    icon: FileCode,
    title: 'E-Commerce Ready',
    items: [
      'Works with Squarespace Commerce on Business and Commerce plans',
      'Does not block the checkout or cart experience',
      'Preserves conversion tracking after visitor consent',
      'Compatible with Squarespace email campaigns and pop-ups',
    ],
  },
]

export default function SquarespaceIntegrationPage() {
  const faqData = [
    {
      question: 'How do I add cookie consent to Squarespace?',
      answer:
        'Go to Settings > Advanced > Code Injection in your Squarespace dashboard and paste a single script tag into the Header field. That is it. The cookie banner will appear on every page of your site and handle consent management automatically. You need a Business plan or higher to access Code Injection.',
    },
    {
      question: 'Does Squarespace have a built-in cookie consent banner?',
      answer:
        'Squarespace has a basic cookie notice banner, but it only displays a message. It does not block cookies, manage consent categories, or provide the opt-in controls required by GDPR. Under European law, a notice-only banner is not sufficient. You need a tool that actually prevents cookies from loading until the visitor gives explicit consent.',
    },
    {
      question: 'Do I need the Business plan for cookie consent on Squarespace?',
      answer:
        'Yes. Squarespace Code Injection, which is the simplest way to add a cookie banner, is only available on the Business plan and above. If you are on a Personal plan, you would need to upgrade or use a workaround like adding a Code Block to individual pages, which is less reliable.',
    },
    {
      question: 'Will this slow down my Squarespace site?',
      answer:
        'No. Our script is under 10KB and loads with the defer attribute, meaning it does not block your page from rendering. Compare that to third-party consent platforms that add 300-800KB of JavaScript. On Squarespace, where you have limited performance control, keeping scripts small matters even more.',
    },
    {
      question: 'Does this work with Squarespace Commerce and member areas?',
      answer:
        'Yes. The cookie banner works across your entire Squarespace site, including product pages, cart, checkout, and member-only areas. It does not interfere with Squarespace Commerce functionality, customer accounts, or Digital Products delivery.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="faq" data={faqData} />

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
                    Squarespace Integration
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
                    Squarespace Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Paste One Script. Fully Compliant.
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
                    <Layout className="mr-2 h-4 w-4" />
                    Build My Squarespace Banner
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

        {/* Do You Need a Cookie Banner on Squarespace? */}
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
                Does Your Squarespace Site Need a Cookie Banner?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                If you use Google Analytics, embed a YouTube video, or run any marketing pixel,
                your Squarespace site is setting cookies. Here is the problem.
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

        {/* How to Add Cookie Consent to Squarespace */}
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
                How to Add Cookie Consent to Squarespace
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Use Squarespace Code Injection. No developer mode, no custom templates. Three steps.
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
                  Build My Squarespace Banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Features / Compatibility */}
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
                What Makes This Different from Other Squarespace Cookie Solutions?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Designed to work within Squarespace constraints, not fight against them.
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
        <section className="py-16 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: '5-Minute Setup',
                  desc: 'Paste into Code Injection and hit Save',
                },
                {
                  icon: Shield,
                  title: 'GDPR, CCPA & PIPEDA',
                  desc: 'Geo-targeted rules for every visitor',
                },
                {
                  icon: Zap,
                  title: 'Under 10KB',
                  desc: 'Lighter than a single Squarespace image',
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
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  Squarespace Cookie Consent FAQ
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Common questions about adding cookie consent to Squarespace sites
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
                <Layout className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Works with Code Injection on Business plan+</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Your Squarespace Site Deserves Real Cookie Consent
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10 max-w-2xl mx-auto">
                Not a notice banner that does nothing. Real consent management that blocks cookies until your visitors say yes. One script. One payment. Done.
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
