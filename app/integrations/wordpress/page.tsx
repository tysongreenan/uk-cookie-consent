'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Code,
  CheckCircle,
  AlertTriangle,
  FileText,
  Globe,
  Zap,
  Clock,
  Shield,
  ArrowRight,
  Circle,
  Paintbrush,
  Gauge,
  Building2,
  Target,
  ShoppingCart,
  Newspaper,
  PenTool,
  Monitor,
  ChevronDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    question: 'How do I add a cookie banner to WordPress without a plugin?',
    answer:
      'Generate your banner with our visual builder, then paste the single script tag into your theme\'s functions.php file using wp_head, or use a lightweight code-snippets plugin like WPCode. No cookie consent plugin needed — just one line of HTML.',
  },
  {
    question: 'Is a cookie banner required on WordPress sites?',
    answer:
      'Yes. If your WordPress site uses Google Analytics, Facebook Pixel, WooCommerce tracking, or any tool that sets cookies, GDPR (EU), PIPEDA (Canada), and CCPA (California) all require you to collect consent before setting non-essential cookies. Fines can reach 4% of annual revenue.',
  },
  {
    question: 'Will this slow down my WordPress site?',
    answer:
      'No. The script is under 10 KB gzipped and loads asynchronously with the defer attribute. That is roughly 20x smaller than popular cookie plugins like CookieYes or Complianz, which bundle entire admin panels, database tables, and stylesheets.',
  },
  {
    question: 'Does it work with caching plugins like WP Rocket or W3 Total Cache?',
    answer:
      'Yes. Because the banner runs entirely on the client side from a single script tag, it works with every caching plugin and CDN setup. There are no server-side dependencies, PHP sessions, or database queries that could conflict with your cache layer.',
  },
  {
    question: 'What is the difference between this and a WordPress cookie plugin?',
    answer:
      'Cookie plugins install PHP code, create database tables, add admin menus, and load their own CSS and JavaScript on every page. Our approach is a single self-contained script tag — no PHP, no database, no admin UI overhead. You get the same GDPR compliance at a fraction of the page weight.',
  },
]

const painPoints = [
  {
    icon: Zap,
    title: 'Plugin bloat is real',
    description:
      'The average WordPress cookie plugin adds 150-300 KB of JavaScript, extra database queries, and admin-side overhead. Your visitors pay the performance tax on every page load.',
  },
  {
    icon: Shield,
    title: 'GDPR fines are not theoretical',
    description:
      'Regulators issued over 2 billion euros in GDPR fines in 2024 alone. If your WordPress site sets cookies before getting consent, you are non-compliant. Full stop.',
  },
  {
    icon: AlertTriangle,
    title: 'Plugin conflicts break sites',
    description:
      'Cookie plugins hook into wp_head, modify headers, and conflict with caching layers. When two plugins fight over the same hook, your visitors see a broken site.',
  },
  {
    icon: Clock,
    title: 'Configuration takes hours',
    description:
      'Most cookie plugins have 30+ settings screens, script-scanning tools, and auto-categorization that never quite works. You end up manually tagging every script anyway.',
  },
]

const themes = [
  { name: 'Astra', description: 'Lightweight and fast', icon: Paintbrush },
  { name: 'GeneratePress', description: 'Performance-focused', icon: Gauge },
  { name: 'Divi', description: 'Visual page builder', icon: Building2 },
  { name: 'OceanWP', description: 'WooCommerce-ready', icon: Target },
  { name: 'Storefront', description: 'Official WooCommerce theme', icon: ShoppingCart },
  { name: 'Newspaper', description: 'Magazine and news', icon: Newspaper },
  { name: 'Elementor Hello', description: 'Minimal starter theme', icon: PenTool },
  { name: 'Twenty Twenty-Four', description: 'Default block theme', icon: Monitor },
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

export default function WordPressIntegrationPage() {
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
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />

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
                    WordPress Integration
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
                    WordPress Cookie Banner
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    No Plugin Required
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Most WordPress cookie plugins add 200+ KB and slow every page load.
                  Ours is 1 script tag, under 10 KB, and takes 5 minutes to install.
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
                    Create My WordPress Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#how-to-add">
                    View Installation Guide
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
                  <CheckCircle className="h-4 w-4 text-foreground" />
                  Under 10 KB
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-foreground" />
                  GDPR + PIPEDA + CCPA
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-foreground" />
                  $99 one-time
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Why WordPress Needs a Cookie Banner ───────────── */}
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
                Why Does Your WordPress Site Need a Cookie Banner?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                If your site runs Google Analytics, WooCommerce, Facebook Pixel, or any
                ad network, it sets cookies. Privacy laws require you to ask first.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {painPoints.map((point, i) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <Card className="h-full border border-border bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Icon className="h-5 w-5 text-foreground" />
                          </div>
                          <CardTitle className="font-heading text-lg font-semibold text-foreground">
                            {point.title}
                          </CardTitle>
                        </div>
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

        {/* ───────────── How to Add a Cookie Banner to WordPress ───────────── */}
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
                How to Add a Cookie Banner to WordPress
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three approaches, same result. Pick the one that matches your comfort level with WordPress.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* Method 1: functions.php */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Code className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground tracking-widest mb-0.5">01</div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Add to functions.php
                        </h3>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs w-fit">Best Performance</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                    Paste this into your child theme&apos;s <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">functions.php</code>.
                    It hooks into <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">wp_head</code> and loads on every page with zero overhead.
                  </p>

                  <div className="rounded-lg bg-foreground/95 text-background p-4 overflow-x-auto mb-6">
                    <pre className="text-sm font-mono whitespace-pre">{`// Add to your child theme's functions.php
function add_cookie_banner_script() {
    ?>
    <script
      src="https://cdn.cookie-banner.ca/banner.js"
      data-site-id="YOUR_SITE_ID"
      defer>
    </script>
    <?php
}
add_action('wp_head', 'add_cookie_banner_script');`}</pre>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>Zero plugin overhead</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>Survives plugin and core updates</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Use a child theme so parent updates don&apos;t overwrite it</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Method 2: Header/Footer Plugin */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground tracking-widest mb-0.5">02</div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          Use WPCode or Insert Headers and Footers
                        </h3>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs w-fit">No File Editing</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                    If you prefer not to touch theme files, install a free code-snippets plugin.
                    Paste the script into the &quot;Header&quot; section from your WordPress dashboard.
                  </p>

                  <div className="rounded-lg bg-foreground/95 text-background p-4 overflow-x-auto mb-6">
                    <pre className="text-sm font-mono whitespace-pre">{`<!-- Paste into the "Header Scripts" field -->
<script
  src="https://cdn.cookie-banner.ca/banner.js"
  data-site-id="YOUR_SITE_ID"
  defer>
</script>`}</pre>
                  </div>

                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-6">
                    <li>Install &quot;WPCode&quot; or &quot;Insert Headers and Footers&quot; from the plugin directory</li>
                    <li>Go to <strong>Code Snippets &rarr; Header &amp; Footer</strong></li>
                    <li>Paste the script into the Header section</li>
                    <li>Click Save</li>
                  </ol>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>No theme file editing</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>Survives theme switches</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Requires one additional lightweight plugin</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Method 3: Theme Customizer */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Globe className="h-5 w-5 text-foreground" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground tracking-widest mb-0.5">03</div>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          WordPress Full Site Editor (Block Themes)
                        </h3>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs w-fit">Block Themes</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                    Using Twenty Twenty-Four or another block theme? Add a Custom HTML block
                    to your site&apos;s header template part in the Full Site Editor.
                  </p>

                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-6">
                    <li>Go to <strong>Appearance &rarr; Editor</strong></li>
                    <li>Select <strong>Template Parts &rarr; Header</strong></li>
                    <li>Add a <strong>Custom HTML</strong> block</li>
                    <li>Paste the script tag and save</li>
                  </ol>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>Native WordPress workflow</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 shrink-0" />
                        <span>No plugins, no file editing</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span>Only works with block-based themes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────────── Theme Compatibility ───────────── */}
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
                Does It Work with My WordPress Theme?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Yes. A script tag works with every WordPress theme because it runs in the browser, not in PHP.
                Here are the themes our users run most often.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {themes.map((theme, i) => {
                const ThemeIcon = theme.icon
                return (
                  <motion.div
                    key={theme.name}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <Card className="text-center border border-border bg-background h-full">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                          <ThemeIcon className="h-5 w-5 text-foreground" />
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-1">{theme.name}</h3>
                        <p className="text-sm text-muted-foreground">{theme.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              Works with every WordPress theme. If it runs on WordPress, it works with our banner.
            </motion.p>
          </div>
        </section>

        {/* ───────────── WordPress vs Plugin Comparison ───────────── */}
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
                How Does This Compare to WordPress Cookie Plugins?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Side-by-side with the most popular WordPress GDPR cookie plugins.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left font-heading font-semibold text-foreground p-4" />
                      <th className="text-center font-heading font-semibold text-foreground p-4">
                        Cookie Banner
                      </th>
                      <th className="text-center font-heading font-semibold text-muted-foreground p-4">
                        CookieYes
                      </th>
                      <th className="text-center font-heading font-semibold text-muted-foreground p-4">
                        Complianz
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Script size', ours: 'Under 10 KB', a: '~180 KB', b: '~220 KB' },
                      { label: 'Database tables', ours: '0', a: '3+', b: '5+' },
                      { label: 'Admin UI overhead', ours: 'None', a: 'Full dashboard', b: 'Wizard + settings' },
                      { label: 'GDPR + PIPEDA + CCPA', ours: 'Yes', a: 'Yes', b: 'Yes' },
                      { label: 'Pricing', ours: '$99 one-time', a: '$99/yr', b: '$45/yr' },
                      { label: 'Cache-friendly', ours: 'Always', a: 'Varies', b: 'Varies' },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                        <td className="p-4 font-medium text-foreground">{row.label}</td>
                        <td className="p-4 text-center font-semibold text-foreground">{row.ours}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.a}</td>
                        <td className="p-4 text-center text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
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
                WordPress Cookie Banner FAQ
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Common questions about adding cookie consent to WordPress without a plugin.
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>5-minute setup, no plugin needed</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Stop Overpaying for Cookie Compliance
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                One script tag. Under 10 KB. Works with every WordPress theme, caching plugin, and CDN.
                Build your banner in the visual editor and paste it into your site.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your WordPress Banner
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
