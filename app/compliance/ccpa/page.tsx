'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Scale,
  ArrowRight,
  Circle,
  Check,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  Cookie,
  ShieldAlert,
  BarChart3,
  Megaphone,
  Share2,
  Gavel,
  BookOpen,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { StructuredData } from '@/components/seo/structured-data'
import { motion } from 'framer-motion'
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

const requirements = [
  {
    title: '"Do Not Sell or Share My Personal Information" link',
    description:
      'If you sell or share personal information (including through advertising cookies), you must display a prominent opt-out link on your homepage and every page where data is collected.',
  },
  {
    title: 'Opt-out model, not opt-in',
    description:
      'Unlike GDPR, CCPA allows cookies to load by default. However, users must be able to opt out of the sale or sharing of their personal information at any time, and you must honor that choice immediately.',
  },
  {
    title: 'Honor Global Privacy Control (GPC) signals',
    description:
      'California law requires businesses to treat a GPC browser signal as a valid opt-out request. If a user has GPC enabled, you must stop selling or sharing their data without requiring any additional action.',
  },
  {
    title: 'Privacy policy disclosures',
    description:
      'Your privacy policy must list the categories of personal information collected, the purposes for collection, the categories of third parties you share data with, and specific information about cookie usage.',
  },
  {
    title: 'Right to know and right to delete',
    description:
      'Consumers can request to know what personal information you have collected about them (including through cookies) and can request that you delete it. You must respond within 45 days.',
  },
  {
    title: 'No discrimination for exercising rights',
    description:
      'You cannot deny goods or services, charge different prices, or provide a different quality of service to users who exercise their CCPA rights, including opting out of cookie tracking.',
  },
]

const implementationSteps = [
  {
    step: 1,
    title: 'Audit your cookies',
    description:
      'Use a cookie scanning tool to identify every cookie and tracker on your site. Document the name, provider, purpose, duration, and data collected for each one. Classify each cookie as strictly necessary, analytics, advertising, or social media.',
  },
  {
    step: 2,
    title: 'Determine if you "sell" or "share" personal information',
    description:
      'Review each third-party cookie and script. If data flows to a third party that uses it for its own purposes — such as ad targeting, profiling, or product improvement — this likely constitutes selling or sharing under CCPA. Common examples include Google Ads, Meta Pixel, TikTok Pixel, and LinkedIn Insight Tag.',
  },
  {
    step: 3,
    title: 'Add "Do Not Sell or Share" link',
    description:
      'Place this link prominently on your homepage footer and on every page where personal information is collected. Under CPRA, this must be a clear, conspicuous link — not buried in your privacy policy. If you collect sensitive personal information through cookies (such as precise geolocation), also add a "Limit the Use of My Sensitive Personal Information" link.',
  },
  {
    step: 4,
    title: 'Implement GPC detection',
    description:
      'Add code to detect the Global Privacy Control signal (navigator.globalPrivacyControl in JavaScript). When GPC is detected, automatically suppress all cookies that involve selling or sharing personal information. Do not prompt GPC users to take additional action.',
  },
  {
    step: 5,
    title: 'Build opt-out functionality',
    description:
      'When a user clicks the "Do Not Sell or Share" link, immediately stop all advertising and tracking cookies from firing. Remove any existing third-party cookies. Do not reload the page. Save the user\'s opt-out preference so it persists across sessions.',
  },
  {
    step: 6,
    title: 'Update your privacy policy',
    description:
      'Disclose all categories of personal information collected through cookies, the business purposes for each category, the categories of third parties receiving the data, and the consumer\'s right to opt out. CCPA requires this disclosure to be updated at least once every 12 months.',
  },
  {
    step: 7,
    title: 'Set up consumer request handling',
    description:
      'Create a process for responding to "right to know" and "right to delete" requests related to cookie data. You must respond within 45 days. Verify the identity of the requesting consumer before disclosing any data.',
  },
  {
    step: 8,
    title: 'Test with California IP addresses',
    description:
      'Verify that your opt-out mechanism works correctly for visitors with California IP addresses. Test GPC detection in browsers that send GPC by default (Brave, DuckDuckGo, Firefox with the GPC extension). Confirm that opted-out users do not have advertising cookies reloaded on subsequent visits.',
  },
]

const cookieCategories = [
  {
    icon: Cookie,
    name: 'Strictly Necessary',
    status: 'No opt-out required',
    statusColor: 'text-green-600 dark:text-green-400',
    description:
      'Session management, shopping cart, security tokens, and load balancing cookies do not involve selling or sharing personal information. These are permitted without any opt-out requirement but should still be disclosed in your privacy policy.',
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    status: 'May require opt-out',
    statusColor: 'text-amber-600 dark:text-amber-400',
    description:
      'First-party analytics cookies typically do not constitute a sale. However, if you use third-party analytics like Google Analytics and the service uses data for its own purposes (improving products, serving ads), this may qualify as "sharing" under CPRA.',
  },
  {
    icon: Megaphone,
    name: 'Advertising & Remarketing',
    status: 'Opt-out required',
    statusColor: 'text-red-600 dark:text-red-400',
    description:
      'Google Ads, Meta Pixel, LinkedIn Insight Tag, and similar cookies send user data to ad platforms for cross-context behavioral advertising. This falls squarely within CCPA\'s definition of "sharing" and requires a clear opt-out option.',
  },
  {
    icon: Share2,
    name: 'Social Media',
    status: 'Opt-out required',
    statusColor: 'text-red-600 dark:text-red-400',
    description:
      'Embedded social widgets and share buttons from Facebook, X (Twitter), or LinkedIn place cookies that track behavior across sites. When data is sent back to the platform for ad targeting or profiling, users must be able to opt out.',
  },
]

const comparisonData = [
  {
    feature: 'Consent Model',
    ccpa: 'Opt-out (cookies load by default)',
    gdpr: 'Opt-in (no cookies until consent)',
    pipeda: 'Meaningful consent (opt-in for tracking)',
  },
  {
    feature: 'Cookie Banner Required?',
    ccpa: 'No, but "Do Not Sell" link required',
    gdpr: 'Yes, effectively mandatory',
    pipeda: 'Yes, for non-essential cookies',
  },
  {
    feature: 'Who It Applies To',
    ccpa: 'For-profit businesses meeting thresholds',
    gdpr: 'Any org processing EU residents\' data',
    pipeda: 'Private-sector orgs in Canada',
  },
  {
    feature: 'GPC/Browser Signals',
    ccpa: 'Legally required to honor',
    gdpr: 'No equivalent requirement',
    pipeda: 'Not addressed',
  },
  {
    feature: 'Max Penalties',
    ccpa: '$7,500 per intentional violation',
    gdpr: '€20M or 4% of global revenue',
    pipeda: 'Up to $100,000 per violation',
  },
]

const enforcementCases = [
  {
    company: 'Sephora',
    year: '2022',
    fine: '$1.2 million',
    reason:
      'Failed to disclose it was selling consumer personal information through third-party advertising cookies, failed to honor GPC opt-out signals, and did not provide a "Do Not Sell" link. This was the first public CCPA enforcement action specifically involving cookies and online tracking.',
  },
  {
    company: 'DoorDash',
    year: '2024',
    fine: '$375,000',
    reason:
      'Shared consumer personal information with a marketing cooperative without providing opt-out rights, directly implicating cookie and tracking data shared with third-party advertising partners.',
  },
]

const faqData = [
  {
    question: 'Do I need a cookie banner for CCPA?',
    answer:
      'Not in the same way as GDPR. CCPA does not require opt-in consent before cookies load. However, if your cookies involve selling or sharing personal information (which most advertising cookies do), you must provide a "Do Not Sell or Share My Personal Information" link. A cookie banner is the most practical way to present this opt-out option to California visitors.',
  },
  {
    question: 'Does CCPA apply to my business?',
    answer:
      'CCPA applies to for-profit businesses that collect California residents\' personal information AND meet at least one of these thresholds: (1) annual gross revenue over $25 million, (2) buy, sell, or share personal information of 100,000 or more consumers, households, or devices, or (3) derive 50% or more of annual revenue from selling or sharing personal information. If you meet any one of these, CCPA applies.',
  },
  {
    question: 'Do advertising cookies count as "selling" personal information?',
    answer:
      'Often, yes. Under CCPA, "selling" includes making personal information available to a third party for monetary or other valuable consideration. If you use advertising cookies from Google, Meta, or other ad networks, and those companies use the data for their own purposes, this likely constitutes a sale. The CPRA expanded this to include "sharing" data for cross-context behavioral advertising, even without monetary exchange.',
  },
  {
    question: 'What is Global Privacy Control (GPC) and do I have to support it?',
    answer:
      'Global Privacy Control is a browser-level signal that communicates a user\'s opt-out preference to every website they visit. As of January 2023, the California Attorney General has confirmed that businesses must treat GPC signals as valid opt-out requests under CCPA. Firefox, Brave, and DuckDuckGo browsers send GPC signals by default.',
  },
  {
    question: 'What are the fines for CCPA cookie violations?',
    answer:
      'CCPA penalties are $2,500 per unintentional violation and $7,500 per intentional violation. Since each individual consumer interaction can be a separate violation, fines add up quickly. The California Privacy Protection Agency (CPPA) and the California Attorney General both have enforcement authority. There is also a private right of action for data breaches resulting from failure to maintain reasonable security.',
  },
  {
    question: 'How is CCPA different from GDPR for cookies?',
    answer:
      'The biggest difference is the consent model. GDPR requires opt-in consent before cookies load (nothing fires until the user says yes). CCPA uses an opt-out model where cookies can load by default, but users must be able to opt out of data sales and sharing. GDPR also applies to any website with EU visitors, while CCPA only applies to businesses meeting specific revenue or data-processing thresholds.',
  },
  {
    question: 'What CCPA cookie requirements apply to small businesses?',
    answer:
      'CCPA only applies to for-profit businesses meeting at least one of three thresholds: $25 million in annual gross revenue, processing data of 100,000 or more consumers or households, or earning 50% or more of revenue from selling or sharing personal information. If your business falls below all three thresholds, CCPA does not apply to you directly. However, if you use advertising cookies on a website that receives significant California traffic, you may be approaching the 100,000 consumer threshold faster than you think — CCPA counts devices, not just people.',
  },
  {
    question: 'How do I detect California visitors for CCPA cookie compliance?',
    answer:
      'You can detect California visitors using IP-based geolocation. When a visitor\'s IP address maps to a California location, your cookie banner should display the CCPA opt-out model. Most commercial geolocation databases, including MaxMind and IP2Location, provide state-level accuracy. Our banner handles this automatically using server-side geolocation, so California visitors see the "Do Not Sell or Share" opt-out link while visitors from other jurisdictions see the appropriate consent model.',
  },
  {
    question: 'Do CCPA cookie rules apply to mobile apps?',
    answer:
      'Yes. CCPA applies to personal information collected through any means, including mobile apps. SDKs and tracking libraries in mobile apps function similarly to cookies on websites — they collect device IDs, advertising identifiers (IDFA, GAID), location data, and usage analytics. If your app collects this data from California residents and your business meets CCPA thresholds, you must provide the same opt-out rights.',
  },
  {
    question: 'Can I use a single cookie banner for CCPA, GDPR, and PIPEDA?',
    answer:
      'Yes, and this is the recommended approach for websites with international visitors. A geo-aware cookie banner detects each visitor\'s location and applies the correct consent model automatically. California visitors see the CCPA opt-out model with a "Do Not Sell or Share" link. EU visitors see the GDPR opt-in model. Canadian visitors see a meaningful consent prompt under PIPEDA. Our banner does this with a single script installation.',
  },
]

function FAQItem({ item, index }: { item: typeof faqData[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-base font-semibold text-foreground pr-4">
            {item.question}
          </h3>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      </button>
    </motion.div>
  )
}

export default function CCPACompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compliance', url: 'https://www.cookie-banner.ca/compliance' },
          { name: 'CCPA Cookie Compliance', url: 'https://www.cookie-banner.ca/compliance/ccpa' },
        ]}
      />
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
                    California Privacy Law (CCPA/CPRA)
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
                    CCPA Cookie Compliance:
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Complete Requirements Guide (2026)
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about CCPA cookie requirements, opt-out obligations, GPC signals, and how to implement compliance. Includes step-by-step guide, enforcement examples, and a comparison with GDPR and PIPEDA.
                </p>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row items-center gap-3"
              >
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                  <Link href="/">
                    Build a CCPA-Compliant Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#implementation">
                    View Step-by-Step Guide
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Is CCPA */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  What Is CCPA?
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The California Consumer Privacy Act (CCPA) is a state privacy law that gives California residents control over their personal information. It took effect on <strong className="text-foreground">January 1, 2020</strong>, and was significantly amended by the California Privacy Rights Act (CPRA), which voters approved in November 2020. The CPRA amendments became enforceable on <strong className="text-foreground">January 1, 2023</strong>.
                  </p>
                  <p>
                    CCPA applies to for-profit businesses that collect personal information from California residents and meet at least one of three thresholds: annual gross revenue exceeding $25 million, buying, selling, or sharing the personal information of 100,000 or more consumers or households annually, or deriving 50% or more of annual revenue from selling or sharing personal information.
                  </p>
                  <p>
                    For websites, CCPA is primarily relevant because cookies and tracking technologies collect personal information as defined by the law. Unlike <Link href="/compliance/gdpr" className="underline hover:text-foreground">GDPR</Link>, CCPA does not require opt-in consent before cookies load. Instead, it mandates that businesses provide consumers the right to opt out of the sale and sharing of their data — which has direct implications for how you configure advertising and analytics cookies on your site.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Personal Information Defined */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  How CCPA Defines Personal Information Collected by Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  CCPA defines personal information broadly as any information that &ldquo;identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household&rdquo; (Cal. Civ. Code &sect;1798.140(v)). This definition captures most data that cookies collect:
                </p>
                <ul className="space-y-3">
                  {[
                    'Unique identifiers and device IDs stored in cookies, including advertising IDs and tracking pixels',
                    'IP addresses logged by analytics and advertising scripts',
                    'Browsing history and interaction data — pages visited, time on site, and click paths',
                    'Geolocation data inferred from IP addresses or collected directly',
                    'Internet activity information, including search queries, referral sources, and content interactions',
                    'Inferences drawn from the above to create consumer profiles, such as purchasing preferences or behavioral segments',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  Cookies that collect only aggregated, de-identified data that cannot reasonably be linked back to a specific consumer are not considered personal information under CCPA. However, the threshold for &ldquo;reasonably linkable&rdquo; is low — if a cookie stores any unique identifier that could be combined with other data to identify a user, CCPA treats that data as personal information. In practice, nearly all third-party advertising cookies and most analytics cookies fall within scope.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cookie Categories */}
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
                CCPA Cookie Categories: What Needs Opt-Out?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                How CCPA applies depends on each cookie&apos;s purpose and whether it involves selling or sharing personal information with third parties.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {cookieCategories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <cat.icon className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {cat.name}
                      </h3>
                      <span className={`text-xs font-medium ${cat.statusColor}`}>
                        {cat.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {cat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CPRA Amendments */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  CPRA Amendments: What Changed for Cookies in 2023
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The California Privacy Rights Act (CPRA) amended CCPA with several changes that directly affect how websites handle cookies. These amendments took effect on January 1, 2023, and are enforced by the newly created California Privacy Protection Agency (CPPA).
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: '"Sharing" is now regulated alongside "selling"',
                      text: 'Before CPRA, CCPA only covered the "sale" of personal information, which required monetary or other valuable consideration. CPRA added the concept of "sharing," defined as transferring personal information to a third party for cross-context behavioral advertising. This means advertising cookies that send data to ad networks are now covered even if no money changes hands.',
                    },
                    {
                      title: 'Sensitive personal information gets special treatment',
                      text: 'CPRA introduced a new category of "sensitive personal information" that includes precise geolocation, racial or ethnic origin, and other data. If cookies collect sensitive personal information, you must provide a separate "Limit the Use of My Sensitive Personal Information" link.',
                    },
                    {
                      title: 'GPC is legally recognized',
                      text: 'The CPRA regulations (11 CCR §7025) confirm that businesses must treat GPC browser signals as valid requests to opt out of the sale and sharing of personal information.',
                    },
                    {
                      title: 'New enforcement agency',
                      text: 'The California Privacy Protection Agency (CPPA) now shares enforcement authority with the Attorney General, creating a dedicated privacy regulator with rulemaking power. The CPPA has been actively issuing enforcement actions since 2023.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-muted/30 p-5">
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Does CCPA Require */}
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
                What Does CCPA Require for Cookies?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The California Consumer Privacy Act (CCPA), as amended by CPRA, focuses on giving consumers control over the sale and sharing of their personal information — including data collected through cookies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {requirements.map((req, i) => (
                <motion.div
                  key={req.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <FileCheck className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {req.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {req.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Do You Need a Cookie Banner */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
                Do You Need a Cookie Banner for CCPA?
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-background p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    It depends on how you use cookies.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    CCPA does not require a traditional cookie consent banner like <Link href="/compliance/gdpr" className="underline hover:text-foreground">GDPR does</Link>. Cookies can load by default. However, if any of your cookies involve selling or sharing personal information with third parties (which advertising and remarketing cookies almost always do), you must provide opt-out controls. A cookie banner with a &ldquo;Do Not Sell or Share&rdquo; option is the most straightforward way to do this.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Since many websites serve both EU and California visitors, a single cookie banner that handles both GDPR (opt-in) and CCPA (opt-out) is the practical approach. Our banner detects visitor location and applies the correct consent model automatically.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-6">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    CCPA applies to your business if...
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      'You are a for-profit business that collects California residents\' personal information',
                      'Your annual gross revenue exceeds $25 million',
                      'You buy, sell, or share personal information of 100,000+ consumers or devices annually',
                      'You derive 50% or more of annual revenue from selling or sharing personal information',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    You only need to meet one of the three thresholds (revenue, data volume, or revenue share) for CCPA to apply.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CCPA vs GDPR vs PIPEDA Comparison */}
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
                CCPA vs GDPR vs PIPEDA: Cookie Consent Compared
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                How the three major privacy laws differ in their approach to cookie consent.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-heading text-sm font-semibold text-foreground">Requirement</th>
                    <th className="text-left p-4 font-heading text-sm font-semibold text-foreground">CCPA/CPRA</th>
                    <th className="text-left p-4 font-heading text-sm font-semibold text-foreground">
                      <Link href="/compliance/gdpr" className="underline hover:text-foreground/80">GDPR</Link>
                    </th>
                    <th className="text-left p-4 font-heading text-sm font-semibold text-foreground">
                      <Link href="/compliance/pipeda" className="underline hover:text-foreground/80">PIPEDA</Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={i < comparisonData.length - 1 ? 'border-b border-border' : ''}>
                      <td className="p-4 text-sm font-medium text-foreground">{row.feature}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.ccpa}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.gdpr}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.pipeda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground max-w-3xl mx-auto mt-6 text-center">
              For websites with visitors from multiple jurisdictions, the practical approach is a <Link href="/" className="underline hover:text-foreground">geo-aware cookie banner</Link> that applies the correct standard to each visitor based on their location.
            </p>
          </div>
        </section>

        {/* Implementation Steps */}
        <section id="implementation" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                How to Implement CCPA Cookie Compliance: Step-by-Step
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these 8 steps to bring your website into full CCPA cookie compliance.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {implementationSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enforcement */}
        <section className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  CCPA Enforcement: Fines and Real Examples
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  CCPA enforcement is real and accelerating. The California Attorney General began enforcement on July 1, 2020, and the California Privacy Protection Agency (CPPA) joined enforcement efforts in 2023.
                </p>

                <div className="space-y-4 mb-6">
                  {enforcementCases.map((c) => (
                    <div key={c.company} className="rounded-xl border border-border bg-background p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Gavel className="h-5 w-5 shrink-0 text-foreground" />
                        <h3 className="font-heading text-base font-semibold text-foreground">
                          {c.company} ({c.year}) — {c.fine}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                        {c.reason}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" />
                    Penalty calculations escalate quickly
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    At $7,500 per intentional violation per consumer, a website with 10,000 California visitors who were denied opt-out rights faces theoretical exposure of <strong className="text-foreground">$75 million</strong>. While actual settlements are negotiated below maximums, the per-consumer calculation gives the AG and CPPA significant leverage. Private individuals can also sue under CCPA Section 1798.150 if a data breach occurs, with statutory damages of $100 to $750 per consumer per incident.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Providers vs Third Parties */}
        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  Service Providers vs Third Parties: Why It Matters for Cookies
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    CCPA draws a critical legal distinction between &ldquo;service providers&rdquo; and &ldquo;third parties,&rdquo; and the classification of your cookie vendors determines your opt-out obligations.
                  </p>
                  <p>
                    A <strong className="text-foreground">service provider</strong> processes personal information on your behalf, under a written contract that prohibits them from using the data for their own purposes. If a cookie vendor qualifies as a service provider, sharing data with them is not a &ldquo;sale&rdquo; or &ldquo;share&rdquo; under CCPA, and you do not need to offer an opt-out for that specific cookie.
                  </p>
                  <p>
                    A <strong className="text-foreground">third party</strong> receives personal information and can use it for their own commercial purposes — building advertising profiles, improving their own products, or reselling the data. Sharing data with a third party triggers CCPA&apos;s opt-out requirements.
                  </p>
                  <p>
                    In practice: Google Analytics in its default configuration may qualify as a third party because Google uses the data to improve its own services. Most advertising platforms (Google Ads, Meta, programmatic ad exchanges) operate as third parties. Review your contracts with every cookie vendor — if the contract does not explicitly restrict the vendor from using data for its own purposes, CCPA treats that vendor as a third party.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How Our Banner Handles CCPA */}
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
                How Our Banner Handles CCPA Cookie Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our banner automatically applies the correct consent model for California visitors.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                {
                  title: '"Do Not Sell" opt-out built in',
                  description:
                    'California visitors see a clear opt-out option for the sale and sharing of their personal information, satisfying the core CCPA requirement.',
                },
                {
                  title: 'GPC signal detection',
                  description:
                    'Our banner detects Global Privacy Control signals from the browser and automatically treats them as valid opt-out requests.',
                },
                {
                  title: 'Geo-aware consent model',
                  description:
                    'California visitors get the CCPA opt-out model. EU visitors get GDPR opt-in. Canadian visitors get PIPEDA meaningful consent. One banner, correct behavior everywhere.',
                },
                {
                  title: 'Immediate opt-out enforcement',
                  description:
                    'When a user opts out, advertising and tracking cookies stop immediately. No page reload required.',
                },
                {
                  title: 'Persistent preferences',
                  description:
                    'Opt-out choices are saved and respected across sessions. Users are not re-prompted on every visit.',
                },
                {
                  title: 'Consent records for audits',
                  description:
                    'All opt-out decisions are logged with timestamps, supporting your compliance documentation if the CPPA or AG requests it.',
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Scale className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 border-t border-border bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                CCPA Cookie Consent FAQ
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Common questions about California cookie law and CCPA cookie compliance, answered clearly.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqData.map((item, i) => (
                <FAQItem key={item.question} item={item} index={i} />
              ))}
            </div>

            <StructuredData type="faq" data={faqData} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>CCPA cookie compliance handled automatically</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Get CCPA Cookie Compliance Today
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Our banner handles CCPA cookie requirements automatically — &ldquo;Do Not Sell&rdquo; link, GPC support, geo-aware consent, and audit-ready consent logs. <Link href="/tools/cookie-scanner" className="underline hover:text-foreground">Scan your site for free</Link> to see what cookies you have, then build your compliant banner in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/">
                    Build Your CCPA Banner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base">
                  <Link href="/tools/cookie-scanner">
                    Scan Your Site First
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
