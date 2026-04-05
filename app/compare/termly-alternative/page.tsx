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
  Clock,
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
    question: "What is the best Termly alternative in 2026?",
    answer: "Cookie-Banner.ca is a strong Termly alternative if your primary need is cookie consent. Termly bundles cookie consent with legal document generators, but if you only need a cookie banner, you are paying for features you do not use. Cookie-Banner.ca offers a free plan with 1 banner, 4 layouts, and unlimited pages, or a $99 one-time Pro plan with unlimited banners, 11 layouts, 10-language auto-translate, and analytics."
  },
  {
    question: "How much does Termly cost per year?",
    answer: "Termly pricing starts at $10/month ($120/year) for the Basic plan, $25/month ($300/year) for the Standard plan, and $35/month ($420/year) for the Premium plan. All plans include their legal document generators (privacy policy, terms of service) along with cookie consent. Cookie-Banner.ca Pro is a one-time $99 payment focused solely on cookie consent."
  },
  {
    question: "Is Termly really free?",
    answer: "Termly offers a limited free tier that includes basic cookie consent and a simple privacy policy generator. The free plan is heavily restricted -- limited customization, no consent logging, and Termly branding. Cookie-Banner.ca offers a free plan with 1 banner, unlimited pages, GDPR compliance, and Google Consent Mode v2 support, with \"Powered by\" branding."
  },
  {
    question: "How do I migrate from Termly to Cookie-Banner.ca?",
    answer: "Migrating from Termly takes about 5 minutes: 1) Sign up for a free Cookie-Banner.ca account, 2) Use the visual builder to customize your banner design and consent categories, 3) Replace the Termly cookie consent script with our lightweight embed code (under 10KB), 4) Remove the old Termly script. Note: if you use Termly for privacy policy or terms generation, you will need a separate solution for those documents."
  },
  {
    question: "Termly vs Cookiebot: which is better for cookie consent?",
    answer: "Termly and Cookiebot take different approaches. Cookiebot focuses exclusively on cookie consent ($9-199/month), while Termly bundles cookie consent with legal document generators ($10-35/month). If you only need cookie consent, both are overpriced compared to Cookie-Banner.ca's $99 one-time Pro plan. If you need legal documents, Termly offers more bundled value but at a recurring cost."
  },
  {
    question: "Does Termly support Google Consent Mode v2?",
    answer: "Yes, Termly supports Google Consent Mode v2 on paid plans. Cookie-Banner.ca also supports Google Consent Mode v2, including on the free plan. Both platforms help you stay compliant with Google's consent requirements for advertising and analytics."
  },
  {
    question: "Is Termly good for cookie consent specifically?",
    answer: "Termly is a jack-of-all-trades platform -- it handles privacy policies, terms of service, disclaimers, and cookie consent. The cookie consent component works, but it is not Termly's primary focus. Cookie-Banner.ca is built exclusively for cookie consent, which means more layout options, lighter scripts, better performance, and features like 10-language auto-translate that Termly does not offer."
  },
  {
    question: "Does Termly work with Shopify?",
    answer: "Yes, Termly offers Shopify integration through a script embed. However, Termly's script is heavier than dedicated cookie consent tools, which can impact your store's loading speed. Cookie-Banner.ca also works with Shopify with a script under 10KB that loads asynchronously, and setup takes under 5 minutes."
  },
  {
    question: "Is Termly GDPR and PIPEDA compliant?",
    answer: "Termly supports GDPR and CCPA compliance. It does not offer dedicated Canadian compliance modes for PIPEDA or Quebec's Law 25. Cookie-Banner.ca was built for the Canadian market with native PIPEDA and Law 25 support, including bilingual French/English banners, while also supporting GDPR and CCPA."
  },
  {
    question: "Do I need Termly's privacy policy generator if I switch?",
    answer: "No. Cookie-Banner.ca focuses on cookie consent, not legal document generation. If you currently use Termly's privacy policy or terms of service generator, you can use a separate tool for those documents -- many free privacy policy generators exist. For cookie consent specifically, Cookie-Banner.ca offers a more focused and affordable solution."
  },
]

export default function TermlyAlternativePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="article"
        data={{
          title: "Termly Alternative 2026: Focused Cookie Consent at $99 (Not $10-35/Month)",
          description: "Compare Termly vs Cookie-Banner.ca. Termly bundles legal docs with cookie consent for $10-35/month. Cookie-Banner.ca focuses on cookie consent at $99 one-time.",
          datePublished: "2025-01-01",
          dateModified: "2026-04-03",
        }}
      />
      <StructuredData type="faq" data={faqData} />
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compare', url: 'https://www.cookie-banner.ca/compare' },
          { name: 'Termly Alternative', url: 'https://www.cookie-banner.ca/compare/termly-alternative' },
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
                    Best Termly Alternative in 2026
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Focused Cookie Consent at $99, Not $10-35/Month
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Termly bundles cookie consent with privacy policy generators for $10-35/month. If you just need a cookie banner, Cookie-Banner.ca does it better -- with 10-language auto-translate, a lighter script, and a one-time $99 Pro plan.
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

        {/* Why Look for Termly Alternatives? (Pain Points) */}
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
                Why Are Businesses Looking for Termly Alternatives?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Termly tries to do everything -- cookie consent, privacy policies, terms of service, disclaimers. But that means cookie consent is not its primary focus.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12 text-muted-foreground">
                <p>
                  Termly started as a legal document generator and later added cookie consent as an additional feature. While having everything in one place sounds convenient, the reality is that <strong className="text-foreground">Termly&apos;s cookie consent tool is secondary to its document generation business</strong>. This means fewer layout options, less performance optimization, and a pricing model that forces you to pay for features you may not need.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {[
                  {
                    title: 'Jack of All Trades, Master of None',
                    desc: 'Termly bundles cookie consent with privacy policy, terms of service, and disclaimer generators. If you only need cookie consent, you are paying for three features you do not use.',
                  },
                  {
                    title: 'Subscription Pricing ($10-35/Month)',
                    desc: 'Termly charges $10-35/month depending on the plan. That is $120-420/year for a cookie banner and legal docs you might already have.',
                  },
                  {
                    title: 'Heavier Script for Bundled Features',
                    desc: 'Because Termly loads code for consent management alongside its broader compliance platform, the script is heavier than dedicated cookie consent tools.',
                  },
                  {
                    title: 'No Auto-Translation',
                    desc: 'Termly does not auto-translate your cookie banner into visitor languages. For businesses with international traffic, this means manual translation work or monolingual banners.',
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
                If your primary need is <strong className="text-foreground">cookie consent, not legal document generation</strong>, a focused tool like Cookie-Banner.ca delivers better performance, more customization, and a one-time price that saves you hundreds over Termly&apos;s subscriptions.
              </p>
            </div>
          </div>
        </section>

        {/* Termly Pricing Breakdown */}
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
                Termly Pricing in 2026: What You Are Really Paying For
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Termly bundles legal docs and cookie consent -- here is what each plan includes
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
                      <th className="text-left py-4 px-4 font-heading font-semibold text-foreground">Includes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Termly Free</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground">$0</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">Basic consent + simple privacy policy</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">Termly Basic</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$10/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$120</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">Cookie consent + privacy policy + terms</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Termly Standard</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$25/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$300</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">All docs + consent logging + scanning</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">Termly Premium</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$35/mo</td>
                      <td className="py-4 px-4 text-foreground font-semibold">$420</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">All docs + advanced consent + multi-site</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Free</td>
                      <td className="py-4 px-4 text-primary font-semibold">$0</td>
                      <td className="py-4 px-4 text-primary font-semibold">$0</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">1 banner, unlimited pages, GDPR + GCM v2</td>
                    </tr>
                    <tr className="border-2 border-primary bg-primary/5">
                      <td className="py-4 px-4 font-semibold text-primary">Cookie-Banner.ca Pro</td>
                      <td className="py-4 px-4 text-primary font-bold text-lg">$99 once</td>
                      <td className="py-4 px-4 text-primary font-bold text-lg">$99 total</td>
                      <td className="py-4 px-4 text-foreground font-semibold text-sm">Unlimited banners, 11 layouts, 10 languages, analytics</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { value: '$120/yr', label: 'Termly Basic -- cookie consent + legal docs bundle' },
                  { value: '$420/yr', label: 'Termly Premium for advanced consent features' },
                  { value: '$99 once', label: 'Cookie-Banner.ca Pro -- cookie consent, forever', highlight: true },
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
                Cookie-Banner.ca focuses on cookie consent only. If you need privacy policy or terms generators, you will need a separate tool. See our full <Link href="/pricing" className="text-primary underline hover:no-underline font-medium">pricing page</Link> for details.
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
                Termly vs Cookie-Banner.ca: Cookie Consent Feature Comparison
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comparing cookie consent features specifically -- not legal document generation
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
                    <th className="text-left py-4 px-4 font-heading font-semibold text-foreground min-w-[220px]">Cookie Consent Feature</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-foreground min-w-[160px]">Termly</th>
                    <th className="text-center py-4 px-4 font-heading font-semibold text-primary min-w-[180px]">Cookie-Banner.ca</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "GDPR Compliance", termly: true, ours: true },
                    { feature: "CCPA / CPRA Support", termly: true, ours: true },
                    { feature: "PIPEDA (Canada) Support", termly: false, ours: true },
                    { feature: "Quebec Law 25 Support", termly: false, ours: true },
                    { feature: "Google Consent Mode v2", termly: "Paid only", ours: "Free + Pro" },
                    { feature: "IAB TCF 2.2 Support", termly: "Premium only", ours: true },
                    { feature: "Automatic Cookie Scanning", termly: "Standard+", ours: true },
                    { feature: "Free Plan Pages", termly: "Limited", ours: "Unlimited" },
                    { feature: "No Monthly Subscription", termly: false, ours: "$99 one-time Pro" },
                    { feature: "Banner Layouts", termly: "2-3 options", ours: "4 free / 11 Pro" },
                    { feature: "Visual Banner Builder", termly: "Basic", ours: "Full builder + live preview" },
                    { feature: "Script Size", termly: "~45KB+", ours: "Under 10KB" },
                    { feature: "Async Loading", termly: false, ours: true },
                    { feature: "Auto-Translation (10 langs)", termly: false, ours: "Pro" },
                    { feature: "Consent Analytics", termly: "Standard+", ours: "Pro" },
                    { feature: "Bilingual FR/EN Banners", termly: false, ours: true },
                    { feature: "Shopify Integration", termly: true, ours: true },
                    { feature: "WordPress Support", termly: true, ours: true },
                    { feature: "React / Next.js Support", termly: "Manual", ours: true },
                    { feature: "Team Collaboration", termly: "Premium only", ours: "Pro" },
                    { feature: "Privacy Policy Generator", termly: true, ours: false },
                    { feature: "Terms of Service Generator", termly: true, ours: false },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
                      <td className="py-3 px-4 font-medium text-foreground">{row.feature}</td>
                      {[row.termly, row.ours].map((val, j) => (
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
              Feature data as of April 2026. Cookie-Banner.ca does not include legal document generators -- it focuses exclusively on cookie consent. &quot;Pro&quot; features require the $99 one-time plan. Check each provider&apos;s website for the latest pricing.
            </p>
          </div>
        </section>

        {/* Termly's Cookie Tool Is Secondary */}
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
                  Why Termly&apos;s Cookie Consent Is Secondary to Its Legal Docs
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Termly built its business on legal document generation -- cookie consent was added later
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
                  Termly&apos;s origin story is as a <strong className="text-foreground">legal document generator</strong>. Privacy policies, terms of service, cookie policies, disclaimers -- that is what Termly was built for. Cookie consent management was added as the GDPR created demand for cookie banners. This matters because:
                </p>

                <h3 className="font-heading text-foreground">The Bundle Tax</h3>
                <p>
                  Even Termly&apos;s cheapest paid plan ($10/month) includes their privacy policy generator, terms generator, and cookie consent. If you already have legal documents or use a lawyer, you are paying for features you do not need. Cookie-Banner.ca charges <strong className="text-foreground">$99 one-time for cookie consent only</strong> -- no bundle tax.
                </p>

                <h3 className="font-heading text-foreground">Limited Cookie Banner Customization</h3>
                <p>
                  Because Termly spreads its development resources across legal docs and consent, the cookie banner offers fewer layout options and less design flexibility than dedicated tools. Cookie-Banner.ca offers <strong className="text-foreground">11 banner layouts on Pro</strong> with a full visual builder, live preview, and real-time customization.
                </p>

                <h3 className="font-heading text-foreground">No Auto-Translation</h3>
                <p>
                  Termly does not auto-translate cookie banners. If your site has international visitors, you need to manually configure translations. Cookie-Banner.ca Pro includes <strong className="text-foreground">10-language auto-translate</strong> that detects visitor language and shows the banner in their language automatically -- English, French, Spanish, German, Portuguese, Italian, Dutch, Japanese, Korean, and Chinese.
                </p>

                <h3 className="font-heading text-foreground">Performance Impact</h3>
                <p>
                  Termly&apos;s script carries code for its broader compliance platform, resulting in a heavier load. Cookie-Banner.ca&apos;s script is <strong className="text-foreground">under 10KB gzipped</strong> and loads asynchronously, meaning zero impact on your page rendering speed. For sites where <Link href="/blog/core-web-vitals-cookie-consent" className="text-primary underline hover:no-underline">Core Web Vitals</Link> matter, this is significant.
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
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Termly</h3>
                    <ul className="space-y-3">
                      {[
                        '$10-35/month recurring subscription',
                        'Bundles legal docs you may not need',
                        'Cookie consent is a secondary feature',
                        'Limited banner layout options',
                        'No auto-translation for banners',
                        'Heavier script (~45KB+)',
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
                        'Focused exclusively on cookie consent',
                        'Cookie consent is the only product',
                        '11 layouts with visual builder (Pro)',
                        '10-language auto-translate (Pro)',
                        'Under 10KB, async loading',
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
                    <h3 className="font-heading font-semibold text-foreground text-lg mb-2">The Verdict: Termly vs Cookie-Banner.ca</h3>
                    <p className="text-muted-foreground">
                      If you need a bundled solution for privacy policies, terms of service, and cookie consent, Termly provides that convenience. But if your primary need is cookie consent, Cookie-Banner.ca is the better choice -- focused, lightweight, more customizable, with 10-language auto-translate and a one-time $99 price that saves you hundreds over Termly&apos;s subscriptions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Switch Section */}
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
                  What Makes Cookie-Banner.ca a Good Termly Alternative?
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
                    desc: 'No subscription. The free plan includes 1 banner, 4 layouts, GDPR/CCPA compliance, and unlimited pages with "Powered by" branding. Pro ($99 one-time) adds unlimited banners, 11 layouts, analytics, and more.',
                  },
                  {
                    icon: Zap,
                    title: 'Lightweight Script (Under 10KB)',
                    desc: 'Our script is under 10KB and loads asynchronously. Termly loads 45KB+ because it carries code for its broader compliance platform. Lighter scripts mean better performance.',
                  },
                  {
                    icon: Globe,
                    title: '10-Language Auto-Translate',
                    desc: 'Pro plan auto-detects visitor language and displays your banner in English, French, Spanish, German, Portuguese, Italian, Dutch, Japanese, Korean, or Chinese.',
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
                  How to Migrate from Termly in 5 Minutes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Switching your cookie consent from Termly to Cookie-Banner.ca is straightforward
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-border bg-background p-6 md:p-8 mb-8"
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
                    <span><strong className="text-foreground">Replace the cookie consent script</strong> -- remove Termly&apos;s consent banner script and paste our lightweight embed code (under 10KB)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">04</span>
                    <span><strong className="text-foreground">Keep or replace legal docs</strong> -- if you use Termly for privacy policy or terms, keep them or switch to a dedicated legal doc tool</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs text-muted-foreground mt-1">05</span>
                    <span><strong className="text-foreground">Verify compliance</strong> -- use the <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">cookie scanner</Link> to confirm everything is properly categorized</span>
                  </li>
                </ol>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-xl border border-border bg-muted/30 p-6"
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">Important: Legal Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Cookie-Banner.ca replaces Termly&apos;s cookie consent only, not its legal document generators. If you use Termly for your privacy policy or terms of service, you will need to keep Termly for those documents or use an alternative. Many free privacy policy generators exist that can replace Termly&apos;s document features.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                {[
                  {
                    title: 'Cookie Scanner',
                    desc: 'Scan your site to find all cookies before migrating',
                    href: '/tools/cookie-scanner',
                    cta: 'Scan Your Website',
                  },
                  {
                    title: 'Pricing',
                    desc: 'See how our plans compare to Termly tiers',
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
                    desc: 'Replace Termly on your WordPress site',
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
                  Termly Alternative FAQ
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions about switching from Termly
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
