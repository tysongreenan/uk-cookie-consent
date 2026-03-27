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

const checklistItems = [
  '"Do Not Sell or Share My Personal Information" link is visible on your homepage',
  'Opt-out mechanism works for all advertising and tracking cookies',
  'Global Privacy Control (GPC) signals are detected and honored',
  'Privacy policy lists all categories of personal information collected via cookies',
  'Privacy policy discloses all third parties receiving cookie data',
  'Users can submit data deletion requests',
  'Opt-out requests are processed immediately (cookies stop firing)',
  '"Limit the Use of My Sensitive Personal Information" link is displayed if applicable',
  'Minors under 16 are not tracked without affirmative opt-in consent',
  'Cookie preferences persist and are not reset between visits',
  'Verification process exists for consumer data access requests',
  'Annual privacy policy updates are documented',
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
          { name: 'CCPA Compliance', url: 'https://www.cookie-banner.ca/compliance/ccpa' },
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
                    California Privacy Law
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
                    CCPA Cookie Consent:
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    California Cookie Law Explained
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  CCPA uses an opt-out model for cookies. You do not need pre-consent, but you must provide a &ldquo;Do Not Sell&rdquo; link and honor Global Privacy Control signals. Here is what to do.
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
                  <Link href="/builder">
                    Build a CCPA-Compliant Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#checklist">
                    View the Checklist
                  </Link>
                </Button>
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
                The California Consumer Privacy Act (CCPA), as amended by CPRA, focuses on giving consumers control over the sale and sharing of their personal information, including data collected through cookies.
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
                    CCPA does not require a traditional cookie consent banner like GDPR does. Cookies can load by default. However, if any of your cookies involve selling or sharing personal information with third parties (which advertising and remarketing cookies almost always do), you must provide opt-out controls. A cookie banner with a &ldquo;Do Not Sell or Share&rdquo; option is the most straightforward way to do this.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Additionally, since many websites serve both EU and California visitors, a single cookie banner that handles both GDPR (opt-in) and CCPA (opt-out) is the practical approach. Our banner detects visitor location and applies the correct consent model automatically.
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

        {/* Compliance Checklist */}
        <section id="checklist" className="py-16 sm:py-20 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Cookie Consent Checklist for CCPA
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Verify your website meets CCPA/CPRA cookie requirements with this checklist.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="rounded-xl border border-border bg-background p-6 md:p-8">
                <ul className="space-y-4">
                  {checklistItems.map((item, i) => (
                    <motion.li
                      key={item}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted mt-0.5">
                        <Check className="h-3.5 w-3.5 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Banner Handles CCPA */}
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
                How Our Banner Handles CCPA Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our banner automatically applies the correct consent model for California visitors. Here is what it handles for you.
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
                CCPA Cookie Consent FAQ
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Common questions about California cookie law, answered clearly.
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
                <span>CCPA opt-out handled automatically</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Get CCPA Cookie Compliance Today
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Our banner is designed to help you comply with CCPA cookie requirements. &ldquo;Do Not Sell&rdquo; link, GPC support, and geo-aware consent are all built in. Build your banner in minutes.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build Your CCPA Banner
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
