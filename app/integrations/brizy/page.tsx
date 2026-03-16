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
  Copy,
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

const reasons = [
  {
    icon: Shield,
    title: 'GDPR & UK PECR',
    description:
      'European visitors require explicit cookie consent before any non-essential cookies are set. Fines can reach 4% of annual revenue.',
  },
  {
    icon: Zap,
    title: 'PIPEDA (Canada)',
    description:
      'Canadian privacy law requires meaningful consent for collecting personal information, including cookie-based tracking.',
  },
  {
    icon: Layout,
    title: 'CCPA / CPRA (California)',
    description:
      'California residents must be able to opt out of the sale or sharing of personal information collected via cookies.',
  },
]

const installMethods = [
  {
    number: '01',
    title: 'WordPress functions.php',
    badge: 'Recommended',
    description:
      'Add the script directly to your child theme. Best performance, no extra plugins.',
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
    pros: [
      'Best performance - no plugin overhead',
      'Loads on every page automatically',
      'Survives Brizy updates',
    ],
    cons: ['Requires child theme or code snippets plugin'],
  },
  {
    number: '02',
    title: 'Header / Footer Plugin',
    badge: 'Easiest',
    description:
      'Use a plugin like "Insert Headers and Footers" or "WPCode" to add the script without editing files.',
    icon: FileText,
    code: `<!-- Paste this into the "Header" section -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
    pros: [
      'No file editing required',
      'Survives theme and Brizy updates',
      'Beginner-friendly',
    ],
    cons: ['Requires an additional plugin'],
  },
  {
    number: '03',
    title: 'Brizy HTML Widget',
    badge: 'Page Builder',
    description:
      'Drag an HTML element onto your Brizy Global Header or footer and paste the script inside.',
    icon: Blocks,
    code: `<!-- Inside a Brizy HTML element -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`,
    pros: [
      'Stays inside the Brizy editor',
      'Visible in the Global Blocks panel',
      'No plugins or file editing',
    ],
    cons: ['Must be placed in a Global Block to appear site-wide'],
  },
]

const steps = [
  {
    number: '01',
    title: 'Build Your Banner',
    description:
      'Use the visual builder to pick colours, layout, and wording. No code required.',
    icon: Layout,
  },
  {
    number: '02',
    title: 'Copy the Script',
    description:
      'The builder generates a single script tag. Copy it to your clipboard.',
    icon: Copy,
  },
  {
    number: '03',
    title: 'Add to WordPress',
    description:
      'Paste the script via functions.php, a header plugin, or a Brizy HTML widget.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Test & Go Live',
    description:
      'Clear your cache, reload the page, and verify the banner appears. You are compliant.',
    icon: CheckCircle2,
  },
]

export default function BrizyIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* ───────────────────────── Hero ───────────────────────── */}
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
                    WordPress Page Builder
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
                    Brizy Cookie Consent
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Works with Your Page Builder
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Add a fully compliant cookie banner to your Brizy-powered
                  WordPress site. One script tag, three installation options,
                  under three minutes.
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
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-base font-semibold"
                >
                  <Link href="/builder">
                    Build Your Banner Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  <Link href="#installation">
                    View Installation Methods
                  </Link>
                </Button>
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
                Why Brizy Sites Need Cookie Consent
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Brizy sites are WordPress sites — they use Google Analytics,
                Facebook Pixel, and other trackers that set cookies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {reasons.map((reason, i) => {
                const ReasonIcon = reason.icon
                return (
                  <motion.div
                    key={reason.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                      <ReasonIcon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Installation Methods ───────────── */}
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
                  Installation Methods
                </h2>
                <Badge variant="outline" className="text-xs">
                  Pick one
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                Brizy runs on WordPress, so every standard WordPress method
                works. Choose the one that fits your workflow.
              </p>
            </motion.div>

            <div className="space-y-8">
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
                      <div className="rounded-lg bg-muted border border-border p-4 overflow-x-auto mb-6">
                        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                          {method.code}
                        </pre>
                      </div>

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

        {/* ───────────── Step-by-Step Guide ───────────── */}
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
                Step-by-Step Guide
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From zero to compliant in four steps.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
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

        {/* ───────────── Trust / Stats ───────────── */}
        <section className="py-16 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: '3-Minute Setup',
                  desc: 'Paste a single script tag into WordPress',
                },
                {
                  icon: Shield,
                  title: 'GDPR, CCPA & PIPEDA',
                  desc: 'Compliant with major privacy laws',
                },
                {
                  icon: Zap,
                  title: 'Under 10 KB',
                  desc: 'No impact on Brizy page load speed',
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
                    <p className="font-heading font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                )
              })}
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
                Ready to Get Compliant?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build your cookie banner in under a minute, then paste the
                script into your Brizy site using any of the methods above.
              </p>

              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-semibold"
              >
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
