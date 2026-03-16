'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Blocks,
  ArrowRight,
  Circle,
  Shield,
  Clock,
  Zap,
  Code,
  FileText,
  Layout,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Eye,
  Layers,
  Globe,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { StructuredData } from '@/components/seo/structured-data'
import { useState } from 'react'

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
    question: 'How do I add a cookie banner to a Brizy website?',
    answer:
      'You have three options: (1) Drag a Brizy HTML widget into your Global Header block and paste the script tag, (2) add the script to your child theme\'s functions.php, or (3) use a header/footer plugin like WPCode. All three methods take under 3 minutes.',
  },
  {
    question: 'Does the cookie banner work with Brizy Pro and Brizy Free?',
    answer:
      'Yes. The banner loads via a standard script tag, so it works identically on Brizy Free and Brizy Pro. It does not depend on any Brizy-specific API or Pro-only feature.',
  },
  {
    question: 'Will the cookie banner slow down my Brizy pages?',
    answer:
      'No. The script is under 10 KB gzipped and loads with the defer attribute, so it never blocks your page render. Brizy pages already load a page builder runtime — our banner adds virtually zero overhead on top of that.',
  },
  {
    question: 'Can I style the cookie banner to match my Brizy design?',
    answer:
      'Yes. The visual builder lets you set custom colors, fonts, button styles, and positioning before you generate the script. The banner will match whatever design you have built in the Brizy editor.',
  },
  {
    question: 'Do I need to place the script on every Brizy page?',
    answer:
      'No. If you use the functions.php method or a header plugin, the script loads site-wide automatically. If you use the Brizy HTML widget method, place it inside a Global Block so it appears on every page.',
  },
]

const painPoints = [
  {
    icon: Eye,
    title: 'Your Brizy site already tracks visitors',
    description:
      'Google Analytics, Facebook Pixel, HotJar, embedded YouTube videos — Brizy makes it easy to add these. Each one sets cookies the moment a visitor lands on your page.',
  },
  {
    icon: Shield,
    title: 'Privacy laws apply to page-builder sites too',
    description:
      'GDPR, PIPEDA, and CCPA do not care whether you built your site in Brizy, Elementor, or raw HTML. If you collect data from EU, Canadian, or Californian visitors, you need consent.',
  },
  {
    icon: Layers,
    title: 'Brizy has no built-in cookie consent',
    description:
      'Unlike some enterprise platforms, Brizy does not ship a native cookie banner. You need an external solution — and most WordPress cookie plugins add bloat that fights with the page builder runtime.',
  },
]

const installMethods = [
  {
    number: '01',
    title: 'Brizy HTML Widget (Page Builder Method)',
    badge: 'Recommended for Brizy',
    description:
      'Stay inside the Brizy editor. Drag an HTML element into your Global Header block and paste the script. It will appear on every page without touching any files.',
    icon: Blocks,
    code: `<!-- Inside a Brizy HTML element (Global Header) -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
    steps: [
      'Open the Brizy editor on any page',
      'Navigate to your Global Header block (or create one)',
      'Drag an HTML element into the header',
      'Paste the script tag inside the HTML element',
      'Save and publish',
    ],
    pros: [
      'Stays inside the Brizy visual editor',
      'Visible in the Global Blocks panel',
      'No file editing or extra plugins',
    ],
    cons: ['Must use a Global Block for site-wide coverage'],
  },
  {
    number: '02',
    title: 'WordPress functions.php',
    badge: 'Best Performance',
    description:
      'Add the script to your child theme. This bypasses the page builder entirely and loads the banner directly from WordPress — the fastest option.',
    icon: Code,
    code: `// Add to your child theme's functions.php
function add_cookie_banner_script() {
    ?>
    <script
      src="https://cdn.cookie-banner.ca/banner.js"
      data-site-id="YOUR_SITE_ID"
      defer>
    </script>
    <?php
}
add_action('wp_head', 'add_cookie_banner_script');`,
    steps: [
      'Open Appearance > Theme File Editor in your WordPress dashboard',
      'Select your child theme\'s functions.php',
      'Paste the code at the bottom of the file',
      'Click Update File',
    ],
    pros: [
      'Best performance — no plugin overhead',
      'Loads on every page automatically',
      'Survives Brizy plugin updates',
    ],
    cons: ['Requires a child theme or code-snippets plugin'],
  },
  {
    number: '03',
    title: 'Header / Footer Plugin (WPCode)',
    badge: 'Easiest',
    description:
      'Install a free header/footer plugin, paste the script into the Header section, and you are done. Zero file editing.',
    icon: FileText,
    code: `<!-- Paste into the "Header Scripts" field -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
    steps: [
      'Install "WPCode" from the WordPress plugin directory',
      'Go to Code Snippets > Header & Footer',
      'Paste the script into the Header section',
      'Click Save Changes',
    ],
    pros: [
      'No file editing required',
      'Survives theme and Brizy updates',
      'Beginner-friendly',
    ],
    cons: ['Requires one additional lightweight plugin'],
  },
]

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left border border-border rounded-xl bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground pr-4">
            {question}
          </h3>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>
        {open && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {answer}
          </p>
        )}
      </button>
    </motion.div>
  )
}

export default function BrizyIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StructuredData
        type="faq"
        data={faqData}
      />
      <main>
        {/* ───────────── Hero ───────────── */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
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
                    Brizy Page Builder
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
                    Cookie Consent for Brizy
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Built for Your Page Builder
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Brizy does not include a cookie banner. Add one in under 3 minutes
                  with a single script tag — right from the Brizy editor or your WordPress dashboard.
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
                    Build Your Brizy Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#installation">
                    See Install Methods
                  </Link>
                </Button>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  Works with Brizy Free &amp; Pro
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  Under 10 KB
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  $99 one-time
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Why Brizy Sites Need Cookie Consent ───────────── */}
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
                Why Does Your Brizy Site Need a Cookie Banner?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Brizy makes it easy to build beautiful pages. It does not make you compliant
                with privacy laws. That part is on you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {painPoints.map((point, i) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────── How to Add a Cookie Banner to Brizy ───────────── */}
        <section id="installation" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  How to Add a Cookie Banner to Brizy
                </h2>
                <Badge variant="outline" className="text-xs">
                  Pick one
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Brizy runs on WordPress, so every standard WordPress method works.
                Method 1 is native to the page builder. Methods 2 and 3 bypass it entirely.
              </p>
            </motion.div>

            <div className="space-y-8 max-w-4xl">
              {installMethods.map((method, i) => {
                const MethodIcon = method.icon
                return (
                  <motion.div
                    key={method.number}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="relative overflow-hidden rounded-xl border border-border bg-background"
                  >
                    <div className="p-6 sm:p-8">
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <MethodIcon className="h-5 w-5 text-foreground" />
                          </div>
                          <div>
                            <div className="text-xs font-mono text-muted-foreground tracking-widest mb-0.5">
                              {method.number}
                            </div>
                            <h3 className="font-heading text-lg font-semibold text-foreground">
                              {method.title}
                            </h3>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs w-fit">
                          {method.badge}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                        {method.description}
                      </p>

                      {/* Code block */}
                      <div className="rounded-lg bg-foreground/95 text-background p-4 overflow-x-auto mb-6">
                        <pre className="text-sm font-mono whitespace-pre">
                          {method.code}
                        </pre>
                      </div>

                      {/* Steps */}
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-6">
                        {method.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>

                      {/* Pros / Cons */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ul className="space-y-2">
                          {method.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="space-y-2">
                          {method.cons.map((con) => (
                            <li
                              key={con}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Brizy Compatibility ───────────── */}
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
                What Brizy Features Does It Work With?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The banner is a standalone script tag. It does not interfere with any Brizy feature
                because it runs outside the page builder runtime.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                {
                  icon: Blocks,
                  title: 'Global Blocks',
                  description: 'Place the HTML widget in a Global Block. It appears on every page you assign the block to.',
                },
                {
                  icon: Layout,
                  title: 'Popups & Overlays',
                  description: 'The banner renders at the viewport level, so it layers correctly above Brizy popups and slide-ins.',
                },
                {
                  icon: Globe,
                  title: 'Brizy Cloud & Self-Hosted',
                  description: 'Works on Brizy Cloud sites and self-hosted Brizy-on-WordPress installations.',
                },
                {
                  icon: Zap,
                  title: 'Dynamic Content',
                  description: 'The banner loads independently of Brizy dynamic content. No conflicts with conditional display rules.',
                },
                {
                  icon: Shield,
                  title: 'Caching & CDN',
                  description: 'Fully compatible with WP Rocket, LiteSpeed Cache, Cloudflare, and any CDN you run in front of WordPress.',
                },
                {
                  icon: Clock,
                  title: 'Multi-Language (WPML / Polylang)',
                  description: 'The banner auto-detects visitor language. No extra configuration needed for translated Brizy pages.',
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
                    <div className="border border-border rounded-xl bg-background p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-4">
                        <ItemIcon className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section className="py-16 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Brizy Cookie Consent FAQ
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Answers to common questions about adding cookie consent to Brizy-powered WordPress sites.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqData.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── Final CTA ───────────── */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Blocks className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Works with Brizy Free &amp; Pro</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Your Brizy Site Deserves Better Than a Bloated Plugin
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build your cookie banner in the visual editor. Paste 1 script tag
                into your Brizy site. Done. Under 10 KB, $99 one-time, no subscription.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Brizy Banner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
                  <Link href="/pricing">
                    View Pricing
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
