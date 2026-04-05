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
    question: "What is the best OneTrust alternative for small businesses in 2026?",
    answer: "Cookie-Banner.ca is an excellent OneTrust alternative for small and mid-size businesses. While OneTrust targets enterprises with $10,000+/year contracts and multi-month implementations, Cookie-Banner.ca offers the same core compliance features (GDPR, CCPA, PIPEDA, Google Consent Mode v2) with a free plan or a one-time $99 Pro upgrade. Setup takes 5 minutes, not 5 months."
  },
  {
    question: "How much does OneTrust actually cost?",
    answer: "OneTrust does not publicly list pricing. Based on industry reports and customer reviews, OneTrust cookie consent pricing typically starts at $10,000-$15,000 per year for small deployments, scaling to $50,000-$100,000+ per year for enterprise-wide privacy programs. Pricing requires a sales demo and custom quote. Cookie-Banner.ca offers a free plan or $99 one-time Pro -- no sales calls required."
  },
  {
    question: "Does OneTrust have a free plan?",
    answer: "OneTrust previously offered a free cookie consent tool called 'OneTrust Free', but it was discontinued. They now offer limited trials through their sales team. Cookie-Banner.ca offers a permanent free plan with 1 cookie banner, 4 layouts, GDPR and CCPA compliance, Google Consent Mode v2, and unlimited pages. The free plan includes 'Powered by' branding, which is removed on the $99 one-time Pro plan."
  },
  {
    question: "Is OneTrust overkill for a single website?",
    answer: "Yes, for most single-website businesses, OneTrust is significant overkill. OneTrust is designed for enterprises managing privacy programs across hundreds of websites, mobile apps, and data processing activities. If you just need a compliant cookie banner, Cookie-Banner.ca delivers GDPR, CCPA, and PIPEDA compliance at a fraction of the cost with a 5-minute setup."
  },
  {
    question: "How do I migrate from OneTrust to Cookie-Banner.ca?",
    answer: "Migrating from OneTrust takes about 5 minutes: 1) Sign up for a free Cookie-Banner.ca account, 2) Use the visual builder to customize your banner design, colors, and consent categories, 3) Replace the OneTrust script tags with our lightweight embed code (under 10KB), 4) Remove the old OneTrust scripts. Existing visitors will see your new banner and provide fresh consent. No data migration is needed."
  },
  {
    question: "Can Cookie-Banner.ca handle enterprise compliance requirements?",
    answer: "Cookie-Banner.ca supports the core compliance features that enterprises need: GDPR, CCPA/CPRA, PIPEDA, Law 25, Google Consent Mode v2, and IAB TCF 2.2. The Pro plan ($99 one-time) includes consent analytics, team collaboration, unlimited banners, and 11 layout options. For organizations that only need cookie consent management (not a full privacy program), Cookie-Banner.ca delivers enterprise-grade features at a fraction of OneTrust's cost."
  },
  {
    question: "OneTrust vs Cookiebot: which is cheaper?",
    answer: "Cookiebot is significantly cheaper than OneTrust. Cookiebot starts at $9/month ($108/year) for a single domain, while OneTrust typically costs $10,000+/year. However, both use recurring subscriptions that add up over time. Cookie-Banner.ca offers a free plan or a one-time $99 Pro payment -- no monthly or annual fees ever."
  },
  {
    question: "Does OneTrust slow down website performance?",
    answer: "OneTrust's cookie consent script is one of the heavier options on the market, typically weighing 80KB+ with additional configuration files. This can noticeably impact page load times and Core Web Vitals scores, which directly affect SEO rankings. Cookie-Banner.ca's script is under 10KB and loads asynchronously, minimizing performance impact."
  },
  {
    question: "Is OneTrust required for GDPR compliance?",
    answer: "No, OneTrust is not required for GDPR compliance. GDPR requires that you obtain informed consent before setting non-essential cookies, but it does not mandate any specific consent management platform. Any properly configured cookie consent tool -- including Cookie-Banner.ca's free plan -- can achieve GDPR compliance. What matters is the implementation, not the brand."
  },
  {
    question: "What happens to my consent records if I leave OneTrust?",
    answer: "When you switch from OneTrust to Cookie-Banner.ca, existing visitors will see your new cookie banner and be asked for consent again. This is standard behavior when changing consent platforms -- each CMP stores consent records independently. There is no need to migrate historical consent data. The new banner will collect fresh, valid consent under current regulations."
  },
]

export default function OneTrustAlternativePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        data={{
          title: "OneTrust Alternative 2026: Enterprise Cookie Consent for $99 (Not $10K+)",
          description: "Compare OneTrust vs Cookie-Banner.ca. Enterprise-grade cookie consent without enterprise pricing. Full feature comparison, migration guide, and FAQ.",
          datePublished: "2025-06-01",
          dateModified: "2026-04-03",
        }}
      />
      <StructuredData type="faq" data={faqData} />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compare', url: 'https://www.cookie-banner.ca/compare' },
          { name: 'OneTrust Alternative', url: 'https://www.cookie-banner.ca/compare/onetrust-alternative' },
        ]}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          {/* Background grid */}
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
                    Free plan available -- No sales demos required
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
                    Best OneTrust Alternative in 2026
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Enterprise Compliance for $99, Not $10K+
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Stop paying $10,000+/year for cookie consent. Cookie-Banner.ca delivers GDPR, CCPA, and PIPEDA compliance with a free plan or a one-time $99 Pro upgrade. Lightweight script under 10KB. No sales calls, no enterprise contracts.
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

        {/* Why Look for OneTrust Alternatives? */}
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
                Why Are Businesses Switching from OneTrust?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OneTrust dominates the enterprise privacy market, but most businesses do not need -- or want to pay for -- a full enterprise privacy platform just to show a cookie banner.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                <p>
                  OneTrust is the largest privacy management platform in the world, valued at over $5 billion. They offer a comprehensive suite of tools covering cookie consent, data mapping, vendor management, privacy assessments, and more. But for most small and mid-size businesses, <strong className="text-foreground">you only need a cookie consent banner</strong> -- not an entire privacy operating system.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  {
                    title: 'Enterprise Pricing ($10K+/Year)',
                    desc: 'OneTrust does not publish pricing. Industry reports indicate cookie consent alone starts at $10,000-$15,000/year, with full privacy programs costing $50,000-$100,000+.',
                  },
                  {
                    title: 'Sales-Gated Access',
                    desc: 'You cannot sign up and start using OneTrust immediately. Every plan requires a sales demo, custom quote, and contract negotiation -- often taking weeks or months.',
                  },
                  {
                    title: 'Complex Implementation',
                    desc: 'OneTrust implementations typically require dedicated project managers, professional services, and months of configuration. Many companies hire consultants just for setup.',
                  },
                  {
                    title: 'Heavy Script Bundle',
                    desc: 'OneTrust\'s cookie consent script weighs 80KB+ and often loads additional configuration files. This adds noticeable load time to your pages and can hurt Core Web Vitals.',
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
                Whether you run an ecommerce store, a SaaS product, or a content website, there are now <strong className="text-foreground">faster, more affordable OneTrust alternatives</strong> that deliver the same cookie consent compliance. Below, we break down pricing, features, and migration steps.
              </p>
            </div>
          </div>
        </section>

        {/* How Much Does OneTrust Cost? */}
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
                OneTrust Pricing in 2026: What Does It Actually Cost?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OneTrust does not publish pricing -- here is what we know from industry reports and customer reviews
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
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Estimated Annual Cost</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Typical Use Case</th>
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Sales Demo?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">OneTrust Cookie Consent</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$10,000 -- $15,000/yr</td>
                      <td className="py-4 px-4 text-muted-foreground">Small deployment, 1-5 domains</td>
                      <td className="py-4 px-4 text-muted-foreground">Required</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">OneTrust Privacy Program</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$30,000 -- $50,000/yr</td>
                      <td className="py-4 px-4 text-muted-foreground">Mid-market, consent + data mapping</td>
                      <td className="py-4 px-4 text-muted-foreground">Required</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">OneTrust Enterprise</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$50,000 -- $100,000+/yr</td>
                      <td className="py-4 px-4 text-muted-foreground">Enterprise-wide privacy operations</td>
                      <td className="py-4 px-4 text-muted-foreground">Required</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Free</td>
                      <td className="py-4 px-4 text-primary font-semibold">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">Any website, unlimited pages</td>
                      <td className="py-4 px-4 text-muted-foreground">No -- instant signup</td>
                    </tr>
                    <tr className="border-2 border-primary bg-primary/5">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Pro</td>
                      <td className="py-4 px-4 text-primary font-bold text-lg">$99 once (lifetime)</td>
                      <td className="py-4 px-4 text-foreground font-semibold">Unlimited banners, analytics, teams</td>
                      <td className="py-4 px-4 text-foreground font-semibold">No -- instant signup</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { value: '$10K+/yr', label: 'Minimum estimated OneTrust cost for cookie consent alone' },
                  { value: '$100K+/yr', label: 'OneTrust enterprise-wide privacy program cost' },
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
                OneTrust pricing is estimated based on industry reports and G2/Gartner reviews (April 2026). Actual pricing may vary. The free plan includes 1 banner, 4 layouts, and &quot;Powered by&quot; branding. See our full <Link href="/pricing" className="text-primary underline hover:no-underline font-medium">pricing page</Link> for details.
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
                OneTrust vs Cookie-Banner.ca: Feature Comparison
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Side-by-side comparison of cookie consent features, compliance, and platform support
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-5xl mx-auto overflow-x-auto mb-8"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[220px]">Feature</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[160px]">OneTrust</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[180px]">Cookie-Banner.ca</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "GDPR Compliance", onetrust: true, ours: true },
                    { feature: "CCPA / CPRA Support", onetrust: true, ours: true },
                    { feature: "PIPEDA (Canada) Support", onetrust: true, ours: true },
                    { feature: "Quebec Law 25 Support", onetrust: "Manual config", ours: true },
                    { feature: "Google Consent Mode v2", onetrust: true, ours: true },
                    { feature: "IAB TCF 2.2 Support", onetrust: true, ours: true },
                    { feature: "Automatic Cookie Scanning", onetrust: true, ours: true },
                    { feature: "Free Plan Available", onetrust: false, ours: "1 banner, unlimited pages" },
                    { feature: "Self-Serve Signup", onetrust: false, ours: true },
                    { feature: "Setup Time", onetrust: "Weeks to months", ours: "5 minutes" },
                    { feature: "Custom Banner Design", onetrust: "Template-based", ours: "11 layouts (Pro)" },
                    { feature: "Script Size", onetrust: "~80KB+", ours: "Under 10KB" },
                    { feature: "Consent Analytics", onetrust: true, ours: "Pro" },
                    { feature: "Data Mapping", onetrust: true, ours: false },
                    { feature: "Vendor Management", onetrust: true, ours: false },
                    { feature: "DSAR Automation", onetrust: true, ours: false },
                    { feature: "Shopify Integration", onetrust: "Via script", ours: true },
                    { feature: "WordPress Support", onetrust: "Via script", ours: true },
                    { feature: "React / Next.js Support", onetrust: "Via script", ours: true },
                    { feature: "Multi-Language Support", onetrust: "50+", ours: "20+" },
                    { feature: "Team Collaboration", onetrust: true, ours: "Pro" },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                      <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                      {[row.onetrust, row.ours].map((val, j) => (
                        <td key={j} className={`py-3 px-4 text-center ${j === 1 ? 'bg-primary/[0.03]' : ''}`}>
                          {val === true ? (
                            <CheckCircle className={`h-5 w-5 mx-auto ${j === 1 ? 'text-primary' : 'text-primary/60'}`} />
                          ) : val === false ? (
                            <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                          ) : (
                            <span className={`text-sm font-medium ${j === 1 ? 'text-primary' : 'text-muted-foreground'}`}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <p className="text-sm text-muted-foreground text-center max-w-4xl mx-auto">
              Feature data as of April 2026. OneTrust offers additional enterprise privacy features (data mapping, DSAR automation, vendor management) that are outside the scope of cookie consent. &quot;Pro&quot; features require the $99 one-time Cookie-Banner.ca Pro plan.
            </p>
          </div>
        </section>

        {/* OneTrust vs Cookie-Banner.ca Head-to-Head */}
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
                  OneTrust vs Cookie-Banner.ca: Head-to-Head
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A direct comparison focused on what matters for cookie consent
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
                  <strong className="text-foreground">OneTrust</strong> is the 800-pound gorilla of the privacy industry. With over 10,000 enterprise customers and a $5.1 billion valuation, they offer the most comprehensive privacy management platform on the market. But &ldquo;comprehensive&rdquo; comes at a cost -- and most businesses are paying for features they will never use.
                </p>

                <h3 className="font-heading text-foreground">The Pricing Gap</h3>
                <p>
                  OneTrust&apos;s cookie consent module alone typically costs <strong className="text-foreground">$10,000-$15,000 per year</strong>. That buys you enterprise-grade infrastructure, dedicated support, and features designed for Fortune 500 compliance teams. Cookie-Banner.ca offers the same core cookie consent functionality -- GDPR, CCPA, PIPEDA compliance, Google Consent Mode v2, IAB TCF 2.2 -- for a <strong className="text-foreground">one-time $99 payment</strong>. Over 3 years, that is $30,000-$45,000 versus $99 total.
                </p>

                <h3 className="font-heading text-foreground">Setup and Time to Value</h3>
                <p>
                  OneTrust implementations are measured in <strong className="text-foreground">weeks and months</strong>, not minutes. Typical deployments involve discovery calls, solution architecture, configuration workshops, testing, and staged rollout. Many companies hire dedicated OneTrust consultants. Cookie-Banner.ca takes <strong className="text-foreground">5 minutes</strong>: sign up, customize your banner in the visual builder, paste one script tag.
                </p>

                <h3 className="font-heading text-foreground">Script Performance</h3>
                <p>
                  OneTrust&apos;s consent script is one of the heaviest in the industry at <strong className="text-foreground">80KB+</strong>, often loading additional configuration and categorization files. For websites where <Link href="/blog/core-web-vitals-cookie-consent" className="text-primary underline hover:no-underline">Core Web Vitals</Link> matter, this overhead can push Largest Contentful Paint and First Input Delay outside Google&apos;s recommended thresholds. Cookie-Banner.ca&apos;s script is <strong className="text-foreground">under 10KB gzipped</strong> and loads asynchronously.
                </p>

                <h3 className="font-heading text-foreground">When OneTrust Makes Sense</h3>
                <p>
                  OneTrust is the right choice if you need a <strong className="text-foreground">full privacy program</strong>: data mapping, vendor risk assessments, DSAR automation, privacy impact assessments, and compliance reporting across hundreds of domains and jurisdictions. If you are a Fortune 500 company with a dedicated privacy team, OneTrust&apos;s depth is unmatched. But if your primary need is a compliant cookie banner, you are paying enterprise prices for a fraction of OneTrust&apos;s capabilities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="overflow-x-auto mb-12"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[200px]">Category</th>
                      <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[180px]">OneTrust</th>
                      <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[180px]">Cookie-Banner.ca</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { category: "Starting Price", onetrust: "$10,000+/year", ours: "Free (forever)" },
                      { category: "Paid Plan", onetrust: "$10K-$100K+/year", ours: "$99 one-time" },
                      { category: "3-Year Total Cost", onetrust: "$30,000-$300,000+", ours: "$99" },
                      { category: "Setup Time", onetrust: "Weeks to months", ours: "5 minutes" },
                      { category: "Sales Demo Required", onetrust: "Yes", ours: "No" },
                      { category: "Script Size", onetrust: "~80KB+", ours: "Under 10KB" },
                      { category: "Loading", onetrust: "Synchronous", ours: "Async (non-blocking)" },
                      { category: "Free Tier", onetrust: "Discontinued", ours: "1 banner, unlimited pages" },
                      { category: "PIPEDA / Law 25", onetrust: "Supported", ours: "Native support" },
                      { category: "Google Consent Mode v2", onetrust: "Yes", ours: "Yes" },
                      { category: "IAB TCF 2.2", onetrust: "Yes", ours: "Yes" },
                      { category: "Visual Banner Builder", onetrust: "Template-based", ours: "Full builder + live preview" },
                      { category: "Live Updates", onetrust: "Dashboard deploy", ours: "Push Live -- instant" },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                        <td className="py-3 px-4 font-medium text-foreground">{row.category}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground text-sm">{row.onetrust}</td>
                        <td className="py-3 px-4 text-center text-sm font-medium text-primary bg-primary/[0.03]">{row.ours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">The Verdict: OneTrust vs Cookie-Banner.ca</h3>
                    <p className="text-muted-foreground">
                      OneTrust is the gold standard for enterprise privacy programs. If you need data mapping, DSAR automation, and vendor risk management across a global organization, OneTrust delivers. But if your primary need is a fast, compliant cookie banner -- the most common use case -- Cookie-Banner.ca provides the same consent management for 99% less. Free plan available, $99 one-time Pro.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Switch from OneTrust */}
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
                  6 Reasons to Switch from OneTrust
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  What you gain when you move to Cookie-Banner.ca
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {[
                  {
                    icon: DollarSign,
                    title: 'Save $10,000+/Year',
                    desc: 'Replace OneTrust\'s $10K+/year cookie consent with Cookie-Banner.ca\'s free plan or $99 one-time Pro. Redirect your budget to product, marketing, or hiring.',
                  },
                  {
                    icon: Zap,
                    title: '8x Lighter Script',
                    desc: 'OneTrust\'s 80KB+ script becomes our under-10KB async script. Better Core Web Vitals, faster page loads, and improved SEO performance.',
                  },
                  {
                    icon: Rocket,
                    title: '5-Minute Setup',
                    desc: 'Skip the weeks of implementation. Sign up, customize your banner in the visual builder, paste one script tag. Live in minutes, not months.',
                  },
                  {
                    icon: Shield,
                    title: 'Same Core Compliance',
                    desc: 'GDPR, CCPA/CPRA, PIPEDA, Law 25, Google Consent Mode v2, and IAB TCF 2.2. The compliance features that matter -- without the enterprise bloat.',
                  },
                  {
                    icon: Globe,
                    title: 'No Sales Gatekeeping',
                    desc: 'Start immediately with the free plan. No demos, no quotes, no contract negotiations. Upgrade to Pro when you are ready -- still no sales calls.',
                  },
                  {
                    icon: Users,
                    title: 'Built for Your Scale',
                    desc: 'Whether you have 1 website or 50, Cookie-Banner.ca Pro covers unlimited banners and team members for a single $99 payment. No per-domain charges.',
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
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonial */}
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
                  Trusted by 1,000+ Websites
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Businesses of all sizes are choosing simpler, more affordable cookie consent
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
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">OneTrust Pain Points</h3>
                    <ul className="space-y-3">
                      {[
                        '$10,000+/year for cookie consent alone',
                        'Sales demos and contract negotiations required',
                        'Weeks-to-months implementation timeline',
                        '80KB+ script hurting page speed',
                        'Overpaying for features you don\'t use',
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
                    <h3 className="font-heading font-semibold text-primary text-lg mb-4">Cookie-Banner.ca Advantage</h3>
                    <ul className="space-y-3">
                      {[
                        'Free plan or $99 one-time Pro payment',
                        'Instant self-serve signup, no demos',
                        '5-minute setup with visual builder',
                        'Under 10KB async script for fast pages',
                        'Pay only for what you need',
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 grid md:grid-cols-3 gap-4"
              >
                {[
                  { value: '1,000+', label: 'Websites using Cookie-Banner.ca' },
                  { value: '< 10KB', label: 'Script size, async loading' },
                  { value: '5 min', label: 'Average setup time' },
                ].map((stat, i) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-background p-6 text-center">
                    <div className="text-3xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
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
                  How to Migrate from OneTrust in 5 Minutes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Switching from OneTrust is straightforward -- no consultants required
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-border bg-muted/30 p-6 md:p-8 mb-12"
              >
                <ol className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">01</span>
                    <span><strong className="text-foreground">Create your free account</strong> at Cookie-Banner.ca. No sales demo, no credit card. Instant access to the banner builder.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">02</span>
                    <span><strong className="text-foreground">Customize your banner</strong> -- choose from 4 free layouts (or 11 on Pro). Set colors, text, position, and consent categories using the visual builder with live preview.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">03</span>
                    <span><strong className="text-foreground">Replace the OneTrust scripts</strong> -- remove the OneTrust &lt;script&gt; tags and optconsent attributes from your pages. Paste our single lightweight embed code (under 10KB).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">04</span>
                    <span><strong className="text-foreground">Verify compliance</strong> -- use the <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">free cookie scanner</Link> to confirm all cookies are properly categorized and consent is being collected correctly.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">05</span>
                    <span><strong className="text-foreground">Cancel your OneTrust contract</strong> -- check your agreement for renewal dates and cancellation terms. You are now saving $10,000+/year on cookie consent.</span>
                  </li>
                </ol>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
              >
                <h3 className="font-heading text-foreground">What About OneTrust&apos;s Other Privacy Features?</h3>
                <p>
                  If you use OneTrust for data mapping, vendor management, DSAR automation, or privacy impact assessments, you may still need those modules. Cookie-Banner.ca replaces OneTrust&apos;s <strong className="text-foreground">cookie consent module specifically</strong>. Many organizations run dedicated privacy tools alongside a lightweight cookie consent solution, reducing their OneTrust spend while keeping the features they actually use.
                </p>
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
                  OneTrust Alternative FAQ
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about switching from OneTrust
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
                Everything you need to switch from OneTrust
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                {
                  title: 'Cookie Scanner',
                  desc: 'Scan your site to find all cookies before migrating from OneTrust',
                  href: '/tools/cookie-scanner',
                  cta: 'Scan Your Website',
                },
                {
                  title: 'Pricing',
                  desc: 'See how our Free and Pro plans compare to OneTrust\'s enterprise pricing',
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
                  desc: 'Replace OneTrust on your WordPress site in minutes',
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
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
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
                  <span>Switch from OneTrust in 5 minutes</span>
                </div>

                <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                  Ready to Stop Overpaying for Cookie Consent?
                </h2>

                <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                  Build your cookie banner for free with the visual builder. No sales demos, no enterprise contracts. Upgrade to Pro for $99 one-time when you need unlimited banners and analytics.
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
