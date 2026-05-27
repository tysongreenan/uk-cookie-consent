'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { StructuredData } from '@/components/seo/structured-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
  Shield,
  Globe,
  Rocket,
  ArrowRight,
  AlertTriangle,
  Star,
  Circle,
  Users,
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
    question: "What is the best free CookieYes alternative in 2026?",
    answer: "Cookie-Banner.ca is a strong free CookieYes alternative. The free plan includes 1 cookie banner, 4 layouts, GDPR and CCPA compliance, Google Consent Mode v2 support, and unlimited pages. The free plan includes \"Powered by\" branding. For unlimited banners, 11 layouts, analytics, and branding removal, the Pro plan is a one-time $99 payment."
  },
  {
    question: "How much does CookieYes cost per year?",
    answer: "CookieYes pricing starts at $10/month ($120/year) for the Essential plan with 1 domain and up to 100,000 pageviews. The Pro plan is $29/month ($348/year) and the Ultimate plan is $49/month ($588/year). All plans are subscriptions that renew every year. Cookie-Banner.ca Pro is a one-time $99 payment with no renewals."
  },
  {
    question: "Is CookieYes really free?",
    answer: "CookieYes offers a limited free tier for websites with fewer than 100 pages and a single domain. It includes basic banner customization and limited compliance features. For any growing website, you will need a paid plan. Cookie-Banner.ca offers a free plan with unlimited pages -- though it includes \"Powered by\" branding. The Pro plan ($99 one-time) removes branding and adds unlimited banners, 11 layouts, analytics, and team features."
  },
  {
    question: "How do I migrate from CookieYes to Cookie-Banner.ca?",
    answer: "Migrating from CookieYes takes about 5 minutes: 1) Sign up for a free Cookie-Banner.ca account, 2) Use the visual builder to customize your banner design and consent categories, 3) Replace the CookieYes script tag with our lightweight embed code (under 10KB), 4) Remove the old CookieYes script. No data migration is needed -- visitors will simply see your new banner."
  },
  {
    question: "Does CookieYes work with Shopify?",
    answer: "Yes, CookieYes offers Shopify integration through a script embed. However, the CookieYes script is heavier than lightweight alternatives, which can impact your store's loading speed and conversion rates. Cookie-Banner.ca also works with Shopify with a script under 10KB that loads asynchronously, and setup takes under 5 minutes."
  },
  {
    question: "CookieYes vs Cookiebot: which is cheaper?",
    answer: "CookieYes starts at $10/month vs Cookiebot's $9/month, making them very similar in pricing. CookieYes offers slightly more generous pageview limits on lower tiers. However, both are subscription-based -- you pay every month, forever. Cookie-Banner.ca's Pro plan is $99 one-time, saving you over $120/year compared to CookieYes Essential."
  },
  {
    question: "Does CookieYes support Google Consent Mode v2?",
    answer: "Yes, CookieYes supports Google Consent Mode v2 on paid plans. Cookie-Banner.ca also supports Google Consent Mode v2, including on the free plan. Both platforms help you stay compliant with Google's consent requirements for advertising and analytics."
  },
  {
    question: "Can I customize the CookieYes banner design?",
    answer: "CookieYes offers basic banner customization -- you can change colors, text, and choose from a few layout options. However, advanced customization is limited to higher-priced plans. Cookie-Banner.ca offers 4 layouts on the free plan and 11 layouts on Pro, with a full visual builder that lets you customize colors, fonts, positioning, and text in real time."
  },
  {
    question: "Is CookieYes GDPR and PIPEDA compliant?",
    answer: "CookieYes focuses on GDPR (EU) and CCPA (California) compliance. It does not offer dedicated Canadian compliance modes for PIPEDA or Quebec's Law 25. Cookie-Banner.ca was built for the Canadian market with native PIPEDA and Law 25 support, including bilingual French/English banners, while also supporting GDPR and CCPA."
  },
  {
    question: "What happens to my consent data if I switch from CookieYes?",
    answer: "When you switch from CookieYes to Cookie-Banner.ca, existing visitors will see your new cookie banner and be asked for consent again. This is normal and expected -- the new banner will collect fresh consent that meets current regulatory requirements. There is no need to migrate historical consent data, as each consent management platform stores consent independently."
  },
]

export default function CookieYesAlternativePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        data={{
          title: "Best CookieYes Alternatives 2026 vs Cookiebot (Free Options)",
          description: "Compare CookieYes alternatives: CookieYes vs Cookiebot pricing, features, and free options. Cookie-Banner.ca is free or $99 one-time.",
          datePublished: "2025-01-01",
          dateModified: "2026-05-20",
        }}
      />
      <StructuredData type="faq" data={faqData} />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compare', url: 'https://www.cookie-banner.ca/compare' },
          { name: 'CookieYes Alternative', url: 'https://www.cookie-banner.ca/compare/cookieyes-alternative' },
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
                    Best CookieYes Alternatives in 2026
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    vs Cookiebot + Free Options
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Stop paying $10/month for CookieYes. Cookie-Banner.ca offers a free plan with unlimited pages and GDPR compliance, or go Pro for a one-time $99 payment. Lightweight script under 10KB. No subscriptions, ever.
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

        {/* Why Look for CookieYes Alternatives? (Pain Points) */}
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
                Why Are Businesses Switching from CookieYes?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                CookieYes (formerly Cookie Law Info) is popular, but its subscription model and limitations are pushing businesses to look for alternatives.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                <p>
                  CookieYes has grown from a simple WordPress plugin into a full cookie consent platform. But as it has added features, it has also added <strong className="text-foreground">subscription tiers that keep getting more expensive</strong>. Many website owners are realizing they are paying $120+ per year for features they could get elsewhere -- for free or at a fraction of the cost.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  {
                    title: 'Subscription That Never Ends',
                    desc: 'CookieYes charges $10-49/month, every month, forever. After 1 year on the Essential plan you have paid $120 with nothing to show for it if you cancel.',
                  },
                  {
                    title: 'Free Tier Limited to 100 Pages',
                    desc: 'The CookieYes free plan only works for sites with fewer than 100 pages. Most real websites outgrow this almost immediately.',
                  },
                  {
                    title: 'Basic Banner Customization',
                    desc: 'CookieYes offers limited layout and design options. Advanced customization requires upgrading to higher-priced plans.',
                  },
                  {
                    title: 'No Native Canadian Compliance',
                    desc: 'CookieYes focuses on GDPR and CCPA but does not offer dedicated PIPEDA or Quebec Law 25 compliance modes for Canadian businesses.',
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
                Whether you run a Shopify store, a WordPress blog, or a custom web application, there are now <strong className="text-foreground">better and more affordable CookieYes alternatives</strong>. Below, we break down pricing, features, and what you actually get.
              </p>
            </div>
          </div>
        </section>

        {/* CookieYes Pricing Breakdown */}
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
                CookieYes Pricing in 2026: The Real Cost of Subscriptions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A transparent look at CookieYes pricing vs Cookie-Banner.ca
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
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Pages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">CookieYes Free</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">1</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 100</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">CookieYes Essential</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$10/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$120</td>
                      <td className="py-4 px-4 text-muted-foreground">1</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 100K pageviews</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">CookieYes Pro</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$29/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$348</td>
                      <td className="py-4 px-4 text-muted-foreground">3</td>
                      <td className="py-4 px-4 text-muted-foreground">Up to 500K pageviews</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">CookieYes Ultimate</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$49/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$588</td>
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
                  { value: '$120/yr', label: 'CookieYes Essential -- the minimum paid plan for 1 domain' },
                  { value: '$588/yr', label: 'CookieYes Ultimate for unlimited domains' },
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
                CookieYes vs Cookie-Banner.ca: Full Feature Comparison
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Side-by-side comparison of features, compliance, and platform support
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
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[200px]">Feature</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[160px]">CookieYes</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[180px]">Cookie-Banner.ca</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "GDPR Compliance", cookieyes: true, ours: true },
                    { feature: "CCPA / CPRA Support", cookieyes: true, ours: true },
                    { feature: "PIPEDA (Canada) Support", cookieyes: false, ours: true },
                    { feature: "Quebec Law 25 Support", cookieyes: false, ours: true },
                    { feature: "Google Consent Mode v2", cookieyes: "Paid only", ours: "Free + Pro" },
                    { feature: "IAB TCF 2.2 Support", cookieyes: "Paid only", ours: true },
                    { feature: "Automatic Cookie Scanning", cookieyes: true, ours: true },
                    { feature: "Free Plan Pages", cookieyes: "100 pages", ours: "Unlimited" },
                    { feature: "Free Plan Domains", cookieyes: "1 domain", ours: "Unlimited" },
                    { feature: "No Monthly Subscription", cookieyes: false, ours: "$99 one-time Pro" },
                    { feature: "Banner Layouts", cookieyes: "3-4 options", ours: "4 free / 11 Pro" },
                    { feature: "Visual Banner Builder", cookieyes: "Basic", ours: "Full builder + live preview" },
                    { feature: "Script Size", cookieyes: "~40KB+", ours: "Under 10KB" },
                    { feature: "Async Loading", cookieyes: false, ours: true },
                    { feature: "Consent Analytics", cookieyes: "Paid only", ours: "Pro" },
                    { feature: "Multi-Language Support", cookieyes: "30+", ours: "20+ (10 auto-translate)" },
                    { feature: "Shopify Integration", cookieyes: true, ours: true },
                    { feature: "WordPress Support", cookieyes: true, ours: true },
                    { feature: "React / Next.js Support", cookieyes: "Manual", ours: true },
                    { feature: "Team Collaboration", cookieyes: "Paid only", ours: "Pro" },
                    { feature: "Bilingual FR/EN Banners", cookieyes: false, ours: true },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                      <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                      {[row.cookieyes, row.ours].map((val, j) => (
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
              Feature data as of April 2026. &quot;Pro&quot; features require the $99 one-time Cookie-Banner.ca Pro plan. Free plan includes 1 banner, 4 layouts, and &quot;Powered by&quot; branding. Check each provider&apos;s website for the latest pricing.
            </p>
          </div>
        </section>

        {/* The Subscription Trap */}
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
                  The CookieYes Subscription Trap: You Pay Forever
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Why subscription-based cookie consent does not make sense for most businesses
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
                  CookieYes, like most legacy cookie consent platforms, uses a <strong className="text-foreground">subscription model that charges you every single month</strong>. At $10/month for the Essential plan, that is $120 in the first year. After 3 years, you have spent $360. After 5 years, $600. And if you cancel? Your cookie banner stops working.
                </p>

                <h3 className="font-heading text-foreground">The Math Does Not Add Up</h3>
                <p>
                  Cookie consent is infrastructure -- it should work like a one-time purchase, not a recurring subscription. Your website needs a cookie banner as long as it exists, so a subscription model means you are locked into paying indefinitely. Cookie-Banner.ca&apos;s Pro plan costs <strong className="text-foreground">$99 one-time</strong> -- less than one year of CookieYes Essential. After that, it is yours. No renewals. No price increases. No cancellation anxiety.
                </p>

                <h3 className="font-heading text-foreground">3-Year Cost Comparison</h3>
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
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[200px]">Timeframe</th>
                      <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[150px]">CookieYes Essential</th>
                      <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[150px]">CookieYes Pro</th>
                      <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[180px]">Cookie-Banner.ca Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { period: "Year 1", essential: "$120", pro: "$348", ours: "$99" },
                      { period: "Year 2", essential: "$240", pro: "$696", ours: "$99" },
                      { period: "Year 3", essential: "$360", pro: "$1,044", ours: "$99" },
                      { period: "Year 5", essential: "$600", pro: "$1,740", ours: "$99" },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                        <td className="py-3 px-4 font-medium text-foreground">{row.period}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground text-sm">{row.essential}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground text-sm">{row.pro}</td>
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
                  <DollarSign className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Save $261+ Over 3 Years</h3>
                    <p className="text-muted-foreground">
                      Switching from CookieYes Essential to Cookie-Banner.ca Pro saves you at least $261 over 3 years -- and the savings only grow over time. With CookieYes, you are renting your cookie banner. With Cookie-Banner.ca, you own it.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CookieYes vs Cookie-Banner.ca Head-to-Head */}
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
                  CookieYes vs Cookie-Banner.ca: Head-to-Head
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A direct comparison of pricing, performance, and features
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
                  <strong className="text-foreground">Cookie-Banner.ca</strong> was built as a modern, lightweight alternative to subscription-based consent platforms like CookieYes. While CookieYes started as a WordPress plugin and expanded into a broader platform, Cookie-Banner.ca was designed from day one to be fast, affordable, and developer-friendly.
                </p>

                <h3 className="font-heading text-foreground">Pricing Model</h3>
                <p>
                  CookieYes uses <strong className="text-foreground">monthly subscription pricing</strong> that scales with pageviews and domains. A single site costs $10/month ($120/year). Multi-site businesses pay $29-$49/month. Cookie-Banner.ca offers a <strong className="text-foreground">free plan with unlimited pages</strong>, plus a one-time $99 Pro upgrade. Over 3 years, a CookieYes Essential subscription costs $360 versus $99 total for Cookie-Banner.ca Pro.
                </p>

                <h3 className="font-heading text-foreground">Script Performance</h3>
                <p>
                  CookieYes&apos;s script bundle weighs approximately 40KB+ and can delay page rendering on slower connections. Cookie-Banner.ca&apos;s script is <strong className="text-foreground">under 10KB gzipped</strong> and loads asynchronously, meaning it never blocks your page from rendering. For websites where <Link href="/blog/core-web-vitals-cookie-consent" className="text-primary underline hover:no-underline">Core Web Vitals</Link> matter -- especially ecommerce and ad-supported sites -- this difference can directly affect Google rankings.
                </p>

                <h3 className="font-heading text-foreground">Canada-Specific Compliance</h3>
                <p>
                  CookieYes focuses primarily on GDPR (EU) and CCPA (California). Cookie-Banner.ca was built for the Canadian market first, with native support for <Link href="/compliance/pipeda" className="text-primary underline hover:no-underline">PIPEDA</Link>, <Link href="/compliance/canada" className="text-primary underline hover:no-underline">Quebec&apos;s Law 25</Link>, and bilingual French/English banners. If your audience includes Canadian visitors, Cookie-Banner.ca provides compliance out of the box.
                </p>

                <h3 className="font-heading text-foreground">Auto-Translation</h3>
                <p>
                  Cookie-Banner.ca includes <strong className="text-foreground">10-language auto-translate</strong> on Pro, meaning your cookie banner automatically displays in your visitor&apos;s language. CookieYes supports multiple languages but requires manual translation setup on most plans.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="rounded-xl border border-border bg-background p-6 h-full">
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">CookieYes</h3>
                    <ul className="space-y-3">
                      {[
                        '$10-49/month recurring subscription',
                        'Free tier limited to 100 pages',
                        '~40KB+ script bundle',
                        'No native PIPEDA or Law 25 support',
                        'Basic banner customization',
                        'Manual multi-language setup',
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
                  <div className="rounded-xl border-2 border-primary bg-primary/5 p-6 h-full">
                    <h3 className="font-heading font-semibold text-primary text-lg mb-4">Cookie-Banner.ca</h3>
                    <ul className="space-y-3">
                      {[
                        'Free forever, or $99 one-time Pro',
                        'Unlimited pages on every plan',
                        'Under 10KB, async loading',
                        'Native PIPEDA + Law 25 compliance',
                        '11 layouts with visual builder (Pro)',
                        '10-language auto-translate (Pro)',
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
                className="rounded-xl border-2 border-primary bg-primary/5 p-6"
              >
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">The Verdict: CookieYes vs Cookie-Banner.ca</h3>
                    <p className="text-muted-foreground">
                      CookieYes is a solid platform with good GDPR features, but its subscription model means you are paying indefinitely. Cookie-Banner.ca delivers the same core compliance features with a lighter script, better Canadian compliance, and a pricing model that respects your budget -- free for basic needs, or $99 once for the full Pro experience.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Switch Section */}
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
                  What Makes Cookie-Banner.ca a Good CookieYes Alternative?
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
                    desc: 'The free plan includes 1 banner, 4 layouts, GDPR/CCPA compliance, and unlimited pages with "Powered by" branding. Pro ($99 one-time) removes branding and adds unlimited banners, 11 layouts, analytics, and team features.',
                  },
                  {
                    icon: Zap,
                    title: 'Lightweight Script (Under 10KB)',
                    desc: 'Our script is under 10KB and loads asynchronously. CookieYes loads 40KB+ that can block rendering. Lighter scripts mean better Core Web Vitals and higher Google rankings.',
                  },
                  {
                    icon: Shield,
                    title: 'Complete Compliance',
                    desc: 'Full GDPR, CCPA/CPRA, PIPEDA, and Law 25 compliance. Google Consent Mode v2 and IAB TCF 2.2 support built in -- even on the free plan.',
                  },
                  {
                    icon: Rocket,
                    title: '5-Minute Setup',
                    desc: 'Sign up, customize your banner, paste one script tag. Works on Shopify, WordPress, React, Next.js, Vue, Angular, and plain HTML.',
                  },
                  {
                    icon: Globe,
                    title: '10-Language Auto-Translate',
                    desc: 'Pro plan auto-detects visitor language and displays your banner in their language. Supports English, French, Spanish, German, and more.',
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
                  How to Migrate from CookieYes in 5 Minutes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Switching from CookieYes to Cookie-Banner.ca is straightforward
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
                    <span><strong className="text-foreground">Create your free account</strong> at Cookie-Banner.ca and set up your first project</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">02</span>
                    <span><strong className="text-foreground">Customize your banner</strong> -- choose colors, text, position, and consent categories using the visual builder</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">03</span>
                    <span><strong className="text-foreground">Replace the script</strong> -- remove CookieYes&apos;s script tag and paste our lightweight embed code (under 10KB)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">04</span>
                    <span><strong className="text-foreground">Verify compliance</strong> -- use the <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">cookie scanner</Link> to confirm everything is properly categorized</span>
                  </li>
                </ol>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Cookie Scanner',
                    desc: 'Scan your site to find all cookies before migrating',
                    href: '/tools/cookie-scanner',
                    cta: 'Scan Your Website',
                  },
                  {
                    title: 'Pricing',
                    desc: 'See how our plans compare to CookieYes tiers',
                    href: '/pricing',
                    cta: 'View Pricing',
                  },
                  {
                    title: 'Shopify Integration',
                    desc: 'Step-by-step guide to install on Shopify',
                    href: '/integrations/shopify',
                    cta: 'Shopify Guide',
                  },
                  {
                    title: 'WordPress Guide',
                    desc: 'Replace CookieYes on your WordPress site',
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
                  CookieYes Alternative FAQ
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about switching from CookieYes
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

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
