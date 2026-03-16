'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { StructuredData } from '@/components/seo/structured-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
  Shield,
  Users,
  Globe,
  Rocket,
  ArrowRight,
  AlertTriangle,
  Star,
  Circle,
  Clock,
} from 'lucide-react'
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

const faqData = [
  {
    question: "What is the best free Cookiebot alternative in 2026?",
    answer: "Cookie-Banner.ca is a strong free Cookiebot alternative. The free plan includes 1 cookie banner, 4 layouts, GDPR and CCPA compliance, and Google Consent Mode v2 support. The free plan includes \"Powered by\" branding. For unlimited banners, 11 layouts, analytics, and branding removal, the Pro plan is a one-time $99 payment. Over 1,000 websites use Cookie-Banner.ca."
  },
  {
    question: "How much does Cookiebot cost per year?",
    answer: "Cookiebot pricing ranges from $9/month (Essential plan, 1 domain, up to 500 subpages) to $49/month (Premium plan, 3 domains) to $199/month (Enterprise plan, unlimited domains). That means annual costs range from $108 to $2,388 per year. Additional domains and higher page counts increase the cost further."
  },
  {
    question: "Does Cookiebot work with Shopify?",
    answer: "Yes, Cookiebot offers a Shopify integration, but it requires their paid plan and can add noticeable load time to your Shopify store. Cookie-Banner.ca also works with Shopify and loads asynchronously at under 10KB, with no monthly fees. Our Shopify integration guide walks you through setup in under 5 minutes."
  },
  {
    question: "Is Cookiebot really free?",
    answer: "Cookiebot offers a limited free tier for websites with fewer than 100 subpages and very basic features. For any real website, you will need a paid plan starting at $9/month. Cookie-Banner.ca offers a free plan that includes 1 banner, 4 layouts, and unlimited pages — though it includes \"Powered by\" branding. The Pro plan ($99 one-time) removes branding and adds unlimited banners, 11 layouts, analytics, and team features."
  },
  {
    question: "How do I migrate from Cookiebot to Cookie-Banner.ca?",
    answer: "Migrating from Cookiebot takes about 5 minutes: 1) Sign up for a free Cookie-Banner.ca account, 2) Use the visual builder to customize your banner design and consent categories, 3) Replace the Cookiebot script tag with our lightweight embed code (under 10KB), 4) Remove the old Cookiebot script. No data migration is needed."
  },
  {
    question: "What is the difference between Cookiebot and CookieYes?",
    answer: "Cookiebot and CookieYes are both paid cookie consent platforms. CookieYes is slightly cheaper (starting at $10/month vs $9/month) and offers a slightly more generous free tier. However, both have limitations on domains and pageviews on paid plans. Cookie-Banner.ca offers a free plan with 1 banner and 4 layouts, or a $99 one-time Pro plan with unlimited banners and advanced features."
  },
  {
    question: "Is Complianz better than Cookiebot?",
    answer: "Complianz is a WordPress-specific plugin that costs $49/year for a single site, while Cookiebot works across platforms but starts at $108/year. Complianz is better value for WordPress-only sites. Cookie-Banner.ca works across all platforms (WordPress, Shopify, React, and more) with a free plan or $99 one-time Pro."
  },
  {
    question: "Does Cookiebot slow down my website?",
    answer: "Cookiebot's script bundle is heavier than some alternatives and can add noticeable load time to your pages, which may affect Core Web Vitals and SEO. Cookie-Banner.ca's script is under 10KB and loads asynchronously, so it has minimal impact on page performance."
  },
]

export default function CookiebotAlternativePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        data={{
          title: "Best Cookiebot Alternative 2026 — Cookie-Banner.ca",
          description: "Complete comparison between Cookiebot and cookie consent alternatives including CookieYes, Complianz, and Cookie-Banner.ca",
          datePublished: "2025-01-01",
          dateModified: "2026-03-16",
        }}
      />
      <StructuredData type="faq" data={faqData} />

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
                    Free plan available -- No credit card required
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
                    The Best Cookiebot Alternative
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Free, Lightweight, and Fully Compliant
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Stop paying $9-199/month for Cookiebot. Cookie-Banner.ca offers a free plan with GDPR compliance, or go Pro for a one-time $99 payment. Lightweight script under 10KB. See how we compare to Cookiebot, CookieYes, and Complianz.
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
                  <Link href="#comparison">
                    See Full Comparison
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Look for Cookiebot Alternatives? */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Why Are Businesses Switching from Cookiebot?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cookiebot is one of the most well-known cookie consent platforms, but it is not the best fit for every website. Here are the most common reasons businesses look for alternatives.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                <p>
                  Cookiebot (now part of Usercentrics) has been a go-to cookie consent management platform since GDPR took effect in 2018. But as the market has matured, website owners are discovering that Cookiebot&apos;s pricing model, performance overhead, and limited customization do not always justify the cost -- especially when <strong className="text-foreground">affordable alternatives offer the same compliance features</strong> without monthly subscriptions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  {
                    title: 'Expensive Per-Domain Pricing',
                    desc: 'Cookiebot charges per domain, so agencies and multi-site businesses can end up paying $200+/month just for cookie consent.',
                  },
                  {
                    title: 'Heavy Script Bundle',
                    desc: 'Cookiebot\'s JavaScript bundle is larger than lightweight alternatives, which can affect Core Web Vitals scores and SEO performance.',
                  },
                  {
                    title: 'Limited Free Tier',
                    desc: 'The Cookiebot free plan only covers websites with fewer than 100 subpages -- far too restrictive for most real websites.',
                  },
                  {
                    title: 'Rigid Banner Design',
                    desc: 'Cookiebot\'s banner customization is limited compared to modern alternatives. Matching your brand identity often requires workarounds.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-muted-foreground text-center">
                Whether you run a Shopify store, a WordPress blog, or a custom web application, there are now <strong className="text-foreground">better and more affordable Cookiebot alternatives</strong>. Below, we break down pricing, features, and platform compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* How Much Does Cookiebot Cost? */}
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
                How Much Does Cookiebot Cost in 2026?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A transparent look at Cookiebot pricing vs Cookie-Banner.ca
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="overflow-x-auto mb-12"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Plan</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Monthly Cost</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Annual Cost</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Domains</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Subpages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Cookiebot Free</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">1</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 100</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">Cookiebot Essential</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$9/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$108</td>
                      <td className="py-4 px-4 text-muted-foreground">1</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 500</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Cookiebot Premium</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$49/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$588</td>
                      <td className="py-4 px-4 text-muted-foreground">3</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 5,000</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">Cookiebot Enterprise</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$199/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$2,388</td>
                      <td className="py-4 px-4 text-muted-foreground">Unlimited</td>
                      <td className="py-4 px-4 text-muted-foreground">Unlimited</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Free</td>
                      <td className="py-4 px-4 text-primary font-semibold">$0</td>
                      <td className="py-4 px-4 text-primary font-semibold">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">Unlimited</td>
                      <td className="py-4 px-4 text-muted-foreground">Unlimited</td>
                    </tr>
                    <tr className="border-2 border-primary bg-primary/5">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Pro</td>
                      <td className="py-4 px-4 text-primary font-bold text-lg">$99 once</td>
                      <td className="py-4 px-4 text-primary font-bold text-lg">$99 total</td>
                      <td className="py-4 px-4 text-foreground font-semibold">Unlimited</td>
                      <td className="py-4 px-4 text-foreground font-semibold">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { value: '$108/yr', label: 'Minimum Cookiebot cost for a single domain with 500+ pages' },
                  { value: '$2,388/yr', label: 'Cookiebot Enterprise for unlimited domains' },
                  { value: '$99 once', label: 'Cookie-Banner.ca Pro -- one-time, lifetime access', highlight: true },
                ].map((item, i) => (
                  <motion.div
                    key={item.value}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className={`rounded-xl border p-6 text-center ${item.highlight ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                      <div className={`text-3xl font-heading font-bold mb-2 ${item.highlight ? 'text-primary' : 'text-foreground'}`}>{item.value}</div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                The free plan includes 1 banner, 4 layouts, and &quot;Powered by&quot; branding. See our full <Link href="/pricing" className="text-primary underline hover:no-underline font-medium">pricing page</Link> for details.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Comparison Matrix */}
        <section id="comparison" className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                How Does Cookiebot Compare to Other Cookie Consent Tools?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Side-by-side feature comparison of Cookiebot, CookieYes, Complianz, and Cookie-Banner.ca
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-6xl mx-auto overflow-x-auto mb-8"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[200px]">Feature</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[130px]">Cookiebot</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[130px]">CookieYes</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[130px]">Complianz</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[160px]">Cookie-Banner.ca</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "GDPR Compliance", cookiebot: true, cookieyes: true, complianz: true, ours: true },
                    { feature: "CCPA / CPRA Support", cookiebot: true, cookieyes: true, complianz: true, ours: true },
                    { feature: "PIPEDA (Canada) Support", cookiebot: false, cookieyes: false, complianz: false, ours: true },
                    { feature: "Google Consent Mode v2", cookiebot: true, cookieyes: true, complianz: true, ours: true },
                    { feature: "Automatic Cookie Scanning", cookiebot: true, cookieyes: true, complianz: "WP only", ours: true },
                    { feature: "Free Plan Available", cookiebot: "100 pages", cookieyes: "100 pages", complianz: false, ours: "1 banner, unlimited pages" },
                    { feature: "No Monthly Subscription", cookiebot: false, cookieyes: false, complianz: "Annual", ours: "$99 one-time Pro" },
                    { feature: "Custom Banner Design", cookiebot: "Limited", cookieyes: "Basic", complianz: "Good", ours: "11 layouts (Pro)" },
                    { feature: "Script Size", cookiebot: "~50KB+", cookieyes: "~40KB+", complianz: "WP plugin", ours: "Under 10KB" },
                    { feature: "Consent Analytics", cookiebot: true, cookieyes: true, complianz: "Basic", ours: "Pro" },
                    { feature: "Shopify Integration", cookiebot: true, cookieyes: true, complianz: false, ours: true },
                    { feature: "WordPress Support", cookiebot: true, cookieyes: true, complianz: true, ours: true },
                    { feature: "React / Next.js Support", cookiebot: "Manual", cookieyes: "Manual", complianz: false, ours: true },
                    { feature: "Multi-Language Support", cookiebot: "40+", cookieyes: "30+", complianz: "30+", ours: "20+" },
                    { feature: "IAB TCF 2.2 Support", cookiebot: true, cookieyes: "Paid", complianz: false, ours: true },
                    { feature: "Team Collaboration", cookiebot: "Enterprise", cookieyes: "Paid", complianz: false, ours: "Pro" },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                      <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                      {[row.cookiebot, row.cookieyes, row.complianz, row.ours].map((val, j) => (
                        <td key={j} className={`py-3 px-4 text-center ${j === 3 ? 'bg-primary/[0.03]' : ''}`}>
                          {val === true ? (
                            <CheckCircle className={`h-5 w-5 mx-auto ${j === 3 ? 'text-primary' : 'text-primary/60'}`} />
                          ) : val === false ? (
                            <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          ) : (
                            <span className={`text-sm font-medium ${j === 3 ? 'text-primary' : 'text-muted-foreground'}`}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <p className="text-sm text-muted-foreground text-center max-w-4xl mx-auto">
              Feature data as of March 2026. &quot;Pro&quot; features require the $99 one-time Cookie-Banner.ca Pro plan. Free plan includes 1 banner, 4 layouts, and &quot;Powered by&quot; branding. Check each provider&apos;s website for the latest pricing.
            </p>
          </div>
        </section>

        {/* Cookiebot vs CookieYes */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  Cookiebot vs CookieYes: Which Is Better?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  How these two popular paid cookie consent tools compare
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground"
              >
                <p>
                  <strong className="text-foreground">CookieYes</strong> (formerly Cookie Law Info) is Cookiebot&apos;s closest direct competitor. Both offer GDPR-compliant cookie banners with automatic scanning, but they differ in pricing and approach.
                </p>

                <h3 className="font-heading text-foreground">Pricing Comparison</h3>
                <p>
                  CookieYes starts at <strong className="text-foreground">$10/month</strong> (billed annually) compared to Cookiebot&apos;s $9/month. CookieYes offers a slightly more generous free tier -- 100 pages on a single domain versus Cookiebot&apos;s 100 subpages. For most businesses, neither free tier is adequate.
                </p>
                <p>
                  At the enterprise level, CookieYes costs $149/month for unlimited domains, while Cookiebot charges $199/month. Over a year, that is a $600 difference -- but both are expensive compared to Cookie-Banner.ca&apos;s $99 one-time Pro plan.
                </p>

                <h3 className="font-heading text-foreground">Performance</h3>
                <p>
                  Both Cookiebot and CookieYes load heavier script bundles than lightweight alternatives. Cookie-Banner.ca&apos;s script is under 10KB and loads asynchronously, resulting in minimal impact on Core Web Vitals and page speed.
                </p>

                <h3 className="font-heading text-foreground">Platform Support</h3>
                <p>
                  Both Cookiebot and CookieYes support <Link href="/integrations/shopify" className="text-primary underline hover:no-underline">Shopify</Link> and <Link href="/integrations/wordpress" className="text-primary underline hover:no-underline">WordPress</Link>. CookieYes has a stronger WordPress presence thanks to its origins as a WordPress plugin. Cookie-Banner.ca provides integrations for WordPress, Shopify, React, Next.js, and more.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-xl border-2 border-primary bg-primary/5 p-6"
              >
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">The Verdict: Cookiebot vs CookieYes</h3>
                    <p className="text-muted-foreground">
                      If you are choosing between Cookiebot and CookieYes, CookieYes offers slightly better value at the enterprise level. But consider whether you need a monthly subscription at all -- Cookie-Banner.ca delivers core compliance features on a free plan, with a one-time $99 Pro upgrade for advanced features like analytics, unlimited banners, and team collaboration.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cookiebot vs Complianz */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
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
                  Cookiebot vs Complianz: Which Should You Choose?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The WordPress-specific alternative compared to Cookiebot
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground"
              >
                <p>
                  <strong className="text-foreground">Complianz</strong> is a WordPress-focused cookie consent plugin that positions itself as a more affordable alternative to Cookiebot. If your website runs on WordPress and WordPress alone, Complianz is worth considering -- but it has significant limitations.
                </p>

                <h3 className="font-heading text-foreground">Pricing</h3>
                <p>
                  Complianz uses annual licensing instead of monthly subscriptions. Plans start at <strong className="text-foreground">$49/year for a single site</strong>, $99/year for 5 sites, and $199/year for 25 sites. This is cheaper than Cookiebot&apos;s $108-$2,388/year, making it the better value among paid solutions for WordPress users.
                </p>

                <h3 className="font-heading text-foreground">WordPress-Only Limitation</h3>
                <p>
                  The biggest drawback of Complianz is that it <strong className="text-foreground">only works with WordPress</strong>. If you run a Shopify store, a React application, a Next.js site, or any non-WordPress platform, Complianz is not an option. Cookiebot works across platforms, and Cookie-Banner.ca works everywhere -- including <Link href="/integrations/shopify" className="text-primary underline hover:no-underline">Shopify</Link>, React, Vue, Angular, and any HTML website.
                </p>

                <h3 className="font-heading text-foreground">Cookie Scanning</h3>
                <p>
                  Complianz includes a built-in cookie scanner, but it only scans from within WordPress. Cookiebot and Cookie-Banner.ca both offer external scanning that can detect cookies from third-party scripts more reliably. Try our <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">free cookie scanner tool</Link> to see what cookies your site uses.
                </p>

                <h3 className="font-heading text-foreground">Performance</h3>
                <p>
                  Because Complianz runs as a WordPress plugin (server-side), it generally loads faster than Cookiebot&apos;s external JavaScript. However, Cookie-Banner.ca&apos;s script is under 10KB and loads asynchronously, keeping page impact minimal on any platform.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-xl border-2 border-primary bg-primary/5 p-6"
              >
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">The Verdict: Cookiebot vs Complianz</h3>
                    <p className="text-muted-foreground">
                      Complianz is the better paid option for WordPress-only sites due to lower annual costs. But if you need cross-platform support, want a lightweight script, or prefer a one-time payment over annual renewals, Cookie-Banner.ca is worth considering.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cookiebot on Shopify */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  Is Cookiebot Worth It for Shopify Stores?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  What Shopify store owners need to know before choosing Cookiebot
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground"
              >
                <p>
                  Many Shopify store owners search for &ldquo;Cookiebot Shopify&rdquo; to find a cookie consent solution. While Cookiebot does offer Shopify integration, there are important considerations:
                </p>

                <ul>
                  <li><strong className="text-foreground">Performance impact:</strong> Cookiebot&apos;s script adds load time to your Shopify store. For ecommerce sites, additional load time can reduce conversion rates.</li>
                  <li><strong className="text-foreground">Cost adds up:</strong> Shopify merchants already pay monthly platform fees. Adding $9-49/month for cookie consent is an added expense when more affordable options exist.</li>
                  <li><strong className="text-foreground">Generic integration:</strong> Cookiebot&apos;s Shopify integration is a generic script embed, not a purpose-built Shopify solution.</li>
                </ul>

                <p>
                  Cookie-Banner.ca offers a <Link href="/integrations/shopify" className="text-primary underline hover:no-underline">Shopify integration</Link> that installs in under 3 minutes. The script is under 10KB and loads asynchronously. The free plan works for a single banner, or upgrade to Pro for $99 one-time to get unlimited banners and analytics.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-xl border border-border bg-background p-6">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Cookiebot on Shopify</h3>
                    <ul className="space-y-3">
                      {[
                        '$9-199/month added to Shopify costs',
                        'Heavier script bundle',
                        'Generic script, not Shopify-optimized',
                        'Manual cookie categorization',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <XCircle className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
                    <h3 className="font-heading font-semibold text-primary text-lg mb-4">Cookie-Banner.ca on Shopify</h3>
                    <ul className="space-y-3">
                      {[
                        'Free plan available, or $99 one-time Pro',
                        'Under 10KB, loads asynchronously',
                        'Shopify integration guide included',
                        'Handles Shopify default cookies',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Cookie-Banner.ca a Good Cookiebot Alternative? */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
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
                  What Makes Cookie-Banner.ca a Good Cookiebot Alternative?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A closer look at what 1,000+ websites get when they switch
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {[
                  {
                    icon: DollarSign,
                    title: 'Free Plan + $99 Pro',
                    desc: 'The free plan includes 1 banner, 4 layouts, GDPR/CCPA compliance, and unlimited pages. It does include "Powered by" branding. Pro ($99 one-time) removes branding and adds unlimited banners, 11 layouts, analytics, and team features.',
                  },
                  {
                    icon: Zap,
                    title: 'Lightweight Script (Under 10KB)',
                    desc: 'Our script is under 10KB and loads asynchronously, so it has minimal impact on your Core Web Vitals, bounce rate, and Google rankings.',
                  },
                  {
                    icon: Shield,
                    title: 'Complete Compliance',
                    desc: 'Full GDPR, CCPA/CPRA, and PIPEDA compliance. Google Consent Mode v2 and IAB TCF 2.2 support built in. Stay compliant with major privacy regulations.',
                  },
                  {
                    icon: Rocket,
                    title: '5-Minute Setup',
                    desc: 'Sign up, customize your banner, paste one script tag. Works on Shopify, WordPress, React, Next.js, Vue, Angular, and plain HTML.',
                  },
                  {
                    icon: Globe,
                    title: 'Works on Any Platform',
                    desc: 'One script tag works everywhere. No per-domain charges. Agencies managing multiple client sites can use the same account.',
                  },
                  {
                    icon: Users,
                    title: 'Analytics & Team (Pro)',
                    desc: 'Pro plan includes consent rate analytics, A/B testing insights, and unlimited team members with role-based permissions.',
                  },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Icon className="h-5 w-5 text-foreground" />
                          </div>
                          <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-border bg-muted/30 p-6 md:p-8"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">How to Migrate from Cookiebot in 5 Minutes</h3>
                <p className="text-muted-foreground mb-4">Switching from Cookiebot to Cookie-Banner.ca is straightforward:</p>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">01</span>
                    <span><strong className="text-foreground">Create your free account</strong> at Cookie-Banner.ca and set up your first project</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">02</span>
                    <span><strong className="text-foreground">Customize your banner</strong> -- choose colors, text, position, and consent categories using the visual builder</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">03</span>
                    <span><strong className="text-foreground">Replace the script</strong> -- remove Cookiebot&apos;s script tag and paste our lightweight embed code</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">04</span>
                    <span><strong className="text-foreground">Verify compliance</strong> -- use the <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">cookie scanner</Link> to confirm everything is properly categorized</span>
                  </li>
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
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
                  Cookiebot Alternative FAQ
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about switching from Cookiebot
                </p>
              </motion.div>

              <div className="space-y-4">
                {faqData.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                  >
                    <div className="rounded-xl border border-border bg-background p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-2">{item.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Resources for Your Migration
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to switch from Cookiebot
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                {
                  title: 'Cookie Scanner',
                  desc: 'Scan your site to find all cookies before migrating from Cookiebot',
                  href: '/tools/cookie-scanner',
                  cta: 'Scan Your Website',
                },
                {
                  title: 'Pricing',
                  desc: 'See how our Free and Pro plans compare to Cookiebot\'s paid tiers',
                  href: '/pricing',
                  cta: 'View Pricing',
                },
                {
                  title: 'Shopify Integration',
                  desc: 'Step-by-step guide to install on your Shopify store',
                  href: '/integrations/shopify',
                  cta: 'Shopify Guide',
                },
                {
                  title: 'WordPress Guide',
                  desc: 'Replace Cookiebot or Complianz on your WordPress site',
                  href: '/integrations/wordpress',
                  cta: 'WordPress Guide',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link href={item.href} className="group block h-full">
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                      <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        {item.cta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
                  <span>Switch from Cookiebot in 5 minutes</span>
                </div>

                <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                  Ready to Switch from Cookiebot?
                </h2>

                <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                  Build your cookie banner for free with the visual builder. Upgrade to Pro for $99 one-time when you need unlimited banners and analytics.
                </p>

                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/builder">
                    Build Your Cookie Banner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
