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
  Users,
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
  ExternalLink,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { PluginComparisonTable } from '@/components/landing/visuals/integration/PluginComparisonTable'
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

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    subtitle: 'Save 3+ Hours vs WordPress Plugins',
    description:
      'No plugin overhead. Our solution loads in under 50ms compared to 200ms+ for most WordPress cookie plugins.',
  },
  {
    icon: CheckCircle,
    title: '100% Compliant',
    subtitle: null,
    description:
      'Built-in GDPR, PIPEDA, and CCPA compliance. No configuration needed — works out of the box.',
  },
  {
    icon: Users,
    title: 'User-Friendly',
    subtitle: null,
    description:
      'Beautiful, modern design that matches your WordPress theme. No ugly plugin interfaces.',
  },
  {
    icon: Code,
    title: 'No Plugin Required',
    subtitle: null,
    description:
      'Simple code snippet integration. No plugin conflicts, updates, or security vulnerabilities.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    subtitle: null,
    description:
      'No external dependencies or third-party servers. Your data stays on your WordPress site.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    subtitle: null,
    description:
      'Built-in support for 20+ languages. Perfect for multilingual WordPress sites with WPML.',
  },
]

const themes = [
  { name: 'Astra', description: 'Lightweight, fast, and highly customizable theme', icon: Paintbrush },
  { name: 'GeneratePress', description: 'Performance-focused theme with minimal bloat', icon: Gauge },
  { name: 'Divi', description: 'Visual page builder with extensive customization', icon: Building2 },
  { name: 'OceanWP', description: 'Versatile theme with WooCommerce integration', icon: Target },
  { name: 'Storefront', description: 'Official WooCommerce theme for online stores', icon: ShoppingCart },
  { name: 'Newspaper', description: 'Popular theme for news and magazine sites', icon: Newspaper },
  { name: 'Elementor Hello', description: 'Minimal theme designed for Elementor page builder', icon: PenTool },
  { name: 'Twenty Twenty-Four', description: 'Latest default WordPress theme', icon: Monitor },
]

export default function WordPressIntegrationPage() {
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
                    Copy, Paste, Done
                  </span>
                </h1>

                <div className="flex flex-col items-center gap-2 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    Save 3+ hours vs WordPress plugins
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    Avoid GDPR fines automatically
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    Copy &amp; paste in 5 minutes
                  </p>
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
                    Create My WordPress Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#integration-methods">
                    View Integration Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why WordPress Needs Cookie Consent */}
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
                Why WordPress Needs Cookie Consent
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Skip the bloated plugins. Get a lightweight, compliant cookie banner in minutes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
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
                            {benefit.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {benefit.subtitle && (
                          <p className="text-sm font-semibold text-foreground mb-1">
                            {benefit.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Visual Before/After */}
        <section className="py-16 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <BeforeAfterSlider />
          </div>
        </section>

        {/* Code Integration */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <CodeCopyBlock />
          </div>
        </section>

        {/* Installation Steps */}
        <section className="py-16 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <ThreeStepInstallation />
          </div>
        </section>

        {/* Plugin Comparison */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <PluginComparisonTable />
          </div>
        </section>

        {/* Integration Methods */}
        <section id="integration-methods" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                  WordPress Integration Methods
                </h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the integration method that works best for your WordPress setup
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
              {/* Method 1: Functions.php */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                      <Code className="h-5 w-5" />
                      Method 1: Functions.php
                    </CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">Best Performance</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add our code snippet directly to your theme&apos;s functions.php file:
                    </p>
                    <div className="bg-foreground text-background p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Add to your theme's functions.php
function add_cookie_banner() {
    // Your generated cookie banner code here
    echo '<script>
        (function() {
            // Cookie banner implementation
        })();
    </script>';
}
add_action('wp_footer', 'add_cookie_banner');`}</pre>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Best performance — no plugin overhead</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Survives plugin updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>Requires theme file editing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Method 2: Header/Footer Plugin */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                      <FileText className="h-5 w-5" />
                      Method 2: Header/Footer Plugin
                    </CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">Easy Setup</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use a header/footer plugin like &quot;Insert Headers and Footers&quot;:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                      <li>Install &quot;Insert Headers and Footers&quot; plugin</li>
                      <li>Go to Settings &rarr; Insert Headers and Footers</li>
                      <li>Paste code in &quot;Scripts in Footer&quot; section</li>
                      <li>Save changes</li>
                    </ol>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>No theme file editing required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Survives theme updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>Requires additional plugin</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Method 3: Child Theme */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                      <Globe className="h-5 w-5" />
                      Method 3: Child Theme
                    </CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">Developer Friendly</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a child theme and add the code there:
                    </p>
                    <div className="bg-foreground text-background p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// In your child theme's functions.php
add_action('wp_enqueue_scripts', 'enqueue_cookie_banner');

function enqueue_cookie_banner() {
    wp_enqueue_script(
        'cookie-banner',
        get_template_directory_uri() . '/js/cookie-banner.js',
        array(),
        '1.0.0',
        true
    );
}`}</pre>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Professional development approach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Survives theme updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>Requires child theme setup</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Method 4: Custom Plugin */}
              <motion.div custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="h-full border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5" />
                      Method 4: Custom Plugin
                    </CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">Most Flexible</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a simple custom plugin for your cookie banner:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
                      <li>Create a new folder in /wp-content/plugins/</li>
                      <li>Add plugin header and main file</li>
                      <li>Include your cookie banner code</li>
                      <li>Activate the plugin</li>
                    </ol>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Most flexible and maintainable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Easy to manage and update</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>Requires basic PHP knowledge</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Theme Compatibility */}
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
                WordPress Theme Compatibility
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our cookie banner works with all popular WordPress themes
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
                        <h3 className="font-heading font-semibold text-foreground mb-2">{theme.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{theme.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
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
                WordPress Integration Step-by-Step
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete guide to adding our cookie banner to your WordPress site
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {/* Step 1 */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-3 text-foreground">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-mono font-semibold text-foreground">
                        01
                      </span>
                      Generate Your Cookie Banner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      First, create your custom cookie banner using our builder:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
                      <li>Choose your compliance framework (GDPR, PIPEDA, CCPA)</li>
                      <li>Customize colors, text, and position</li>
                      <li>Configure cookie categories and scripts</li>
                      <li>Generate your unique implementation code</li>
                    </ul>
                    <Button asChild size="sm">
                      <Link href="/builder">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Banner Builder
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 2 */}
              <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-3 text-foreground">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-mono font-semibold text-foreground">
                        02
                      </span>
                      Choose Integration Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select the integration method that works best for your WordPress setup:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg bg-muted/30">
                        <h4 className="font-heading font-semibold text-foreground mb-1 text-sm">Functions.php (Recommended)</h4>
                        <p className="text-xs text-muted-foreground">Best performance, requires theme file editing</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg bg-muted/30">
                        <h4 className="font-heading font-semibold text-foreground mb-1 text-sm">Header/Footer Plugin</h4>
                        <p className="text-xs text-muted-foreground">Easiest setup, no file editing required</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 3 */}
              <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-3 text-foreground">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-mono font-semibold text-foreground">
                        03
                      </span>
                      Add Code to WordPress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Copy and paste your generated code into WordPress:
                    </p>
                    <div className="bg-foreground text-background p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                      <pre>{`// Copy this code to your WordPress site
<script>
(function() {
    // Your generated cookie banner code goes here
    // This code will be provided by our banner builder
})();
</script>`}</pre>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Copy the entire code block from our builder</li>
                      <li>Paste it into your chosen integration method</li>
                      <li>Save changes and test your website</li>
                      <li>Verify the cookie banner appears correctly</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 4 */}
              <motion.div custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="border border-border bg-background">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-3 text-foreground">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-mono font-semibold text-foreground">
                        04
                      </span>
                      Test and Verify
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ensure your cookie banner is working correctly:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Clear your browser cookies and reload the page</li>
                      <li>Verify the banner appears on your homepage</li>
                      <li>Test the Accept, Reject, and Preferences buttons</li>
                      <li>Check that cookies are properly blocked/allowed</li>
                      <li>Test on mobile devices</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
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
                <span>No plugins required</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Add Cookie Consent to WordPress?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Get started with our WordPress cookie banner integration. Maximum performance, complete compliance, zero plugin overhead.
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
