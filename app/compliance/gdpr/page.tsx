'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Shield,
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
    title: 'Explicit opt-in before any cookies load',
    description:
      'Non-essential cookies must be completely blocked until the user actively clicks "Accept." Pre-checked boxes and implied consent are not valid under GDPR.',
  },
  {
    title: 'Granular consent by cookie category',
    description:
      'Users must be able to accept or reject cookies by category (e.g., analytics, marketing, functionality). An "Accept All" button alone is not sufficient.',
  },
  {
    title: 'Equal prominence for Accept and Reject',
    description:
      'Your banner cannot use dark patterns. The option to reject cookies must be as visible and easy to use as the option to accept them.',
  },
  {
    title: 'Right to withdraw consent at any time',
    description:
      'Users must be able to change or withdraw their consent as easily as they gave it. A persistent settings link or floating icon satisfies this requirement.',
  },
  {
    title: 'Clear, plain-language disclosure',
    description:
      'Your banner must explain what cookies you use, what each category does, and who receives the data. Legal jargon is not acceptable.',
  },
  {
    title: 'Consent records for audit purposes',
    description:
      'You must be able to demonstrate that consent was freely given, specific, informed, and unambiguous. This means logging when and how consent was obtained.',
  },
]

const checklistItems = [
  'Non-essential cookies are blocked before consent is given',
  'Cookie banner appears on the first page visit',
  'Users can accept, reject, or customize cookie preferences',
  'Reject option is as prominent as the accept option',
  'Banner links to your privacy/cookie policy',
  'Cookie categories are clearly explained in plain language',
  'Users can withdraw consent from any page (persistent link or icon)',
  'Consent choices are logged with timestamps',
  'Banner does not use pre-checked boxes',
  'Consent is re-requested after significant changes to cookie usage',
  'Third-party scripts (analytics, ads) respect consent state',
  'Cookie duration and purpose are documented',
]

const faqData = [
  {
    question: 'Do I need a cookie banner for GDPR if my business is outside the EU?',
    answer:
      'Yes. GDPR applies to any website that processes personal data of people in the EU or EEA, regardless of where your business is located. If someone in Germany visits your site and you set analytics or marketing cookies, GDPR applies to you. The regulation has extraterritorial scope by design.',
  },
  {
    question: 'What happens if I only use Google Analytics cookies?',
    answer:
      'Google Analytics cookies are classified as non-essential analytics cookies under GDPR. You must obtain explicit opt-in consent before loading the Google Analytics script. Several EU data protection authorities have specifically ruled that Google Analytics requires prior consent, and some (like the Austrian and French DPAs) have found standard Google Analytics setups to be non-compliant.',
  },
  {
    question: 'Can I use a cookie wall that blocks content until users accept?',
    answer:
      'Cookie walls are generally not GDPR-compliant. The European Data Protection Board has stated that consent must be freely given, meaning users should not be forced to accept cookies as a condition of accessing your website. Some limited exceptions may exist, but the safest approach is to allow users to browse without accepting non-essential cookies.',
  },
  {
    question: 'How often do I need to re-ask for cookie consent?',
    answer:
      'GDPR does not specify an exact renewal period, but most data protection authorities recommend refreshing consent at least every 12 months. You should also re-ask whenever you add new cookie categories, change the purposes for which you process data, or start sharing data with new third parties.',
  },
  {
    question: 'What are the actual fines for GDPR cookie violations?',
    answer:
      'GDPR fines for cookie violations can reach up to 20 million euros or 4% of annual global turnover, whichever is higher. In practice, fines vary widely. Amazon was fined 746 million euros by Luxembourg in 2021, while smaller businesses typically face fines in the tens of thousands. The French DPA (CNIL) has been particularly active, fining Google 150 million euros for cookie consent violations in 2022.',
  },
  {
    question: 'Is "legitimate interest" a valid legal basis for cookies?',
    answer:
      'For most non-essential cookies, no. The ePrivacy Directive (which works alongside GDPR for cookies) requires consent for storing or accessing information on a user\'s device, with limited exceptions for strictly necessary cookies. Legitimate interest under GDPR Article 6(1)(f) does not override the ePrivacy consent requirement for cookies.',
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

export default function GDPRCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="breadcrumb"
        data={[
          { name: 'Home', url: 'https://www.cookie-banner.ca' },
          { name: 'Compliance', url: 'https://www.cookie-banner.ca/compliance' },
          { name: 'GDPR Compliance', url: 'https://www.cookie-banner.ca/compliance/gdpr' },
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
                    EU / EEA Privacy Law
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
                    GDPR Cookie Consent:
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    What Your Website Needs
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  The GDPR requires explicit opt-in consent before any non-essential cookies load. Here is exactly what you need to do, and how our banner handles it automatically.
                </p>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-3">
                  Looking for a detailed guide? Read our{' '}
                  <Link href="/blog/gdpr-cookie-consent-requirements" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    Complete GDPR Cookie Consent Requirements Guide
                  </Link>
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
                    Build a GDPR-Compliant Banner
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

        {/* What Does GDPR Require */}
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
                What Does GDPR Require for Cookies?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The General Data Protection Regulation, combined with the ePrivacy Directive, sets six core requirements for cookie consent on any website accessible to EU residents.
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
                Do You Need a Cookie Banner for GDPR?
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-background p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Short answer: almost certainly yes.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If your website uses any cookies beyond what is strictly necessary for the site to function, you need a GDPR-compliant cookie consent banner. This includes analytics cookies (Google Analytics, Plausible with cookies enabled), marketing pixels (Meta Pixel, Google Ads), social media embeds, and most third-party scripts. Not sure what cookies your site sets? <Link href="/tools/cookie-scanner" className="text-primary underline hover:no-underline">Run a free cookie scan</Link> to find out in 30 seconds.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The only cookies exempt from consent are those that are strictly necessary for the website to work, such as session cookies for shopping carts, login authentication tokens, and security cookies. Even these must be disclosed in your cookie policy.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-6">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    GDPR applies to you if...
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      'Your website is accessible to people in the EU or EEA',
                      'You offer goods or services to EU residents (even for free)',
                      'You monitor the behavior of people in the EU (e.g., analytics)',
                      'Your business is established in the EU',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  In practice, any website with international traffic should assume GDPR applies. The regulation&apos;s extraterritorial scope means your business location is irrelevant.
                </p>
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
                GDPR Cookie Consent Compliance Checklist
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Use this checklist to verify your website meets every GDPR cookie consent requirement.
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

        {/* How Our Banner Handles GDPR */}
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
                How Our Banner Handles GDPR Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every requirement above is handled automatically when you use our cookie banner. No manual configuration needed.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                {
                  title: 'Pre-consent cookie blocking',
                  description:
                    'All non-essential scripts are blocked by default. Analytics, marketing, and third-party cookies only fire after the user explicitly opts in.',
                },
                {
                  title: 'Granular category controls',
                  description:
                    'Users choose which categories to accept. Necessary cookies are clearly separated and cannot be toggled off.',
                },
                {
                  title: 'No dark patterns',
                  description:
                    'Accept and Reject buttons have equal visual weight. No color tricks, hidden options, or confusing language.',
                },
                {
                  title: 'Persistent consent management',
                  description:
                    'A floating icon lets users revisit and change their preferences at any time, from any page.',
                },
                {
                  title: 'Consent logging',
                  description:
                    'Every consent decision is logged with a timestamp, the categories accepted, and the banner version shown.',
                },
                {
                  title: 'Automatic script control',
                  description:
                    'Third-party scripts like Google Analytics and Meta Pixel are automatically gated behind the correct consent category.',
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
                    <Shield className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
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
                GDPR Cookie Consent FAQ
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Common questions about GDPR cookie requirements, answered in plain language.
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
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>GDPR-compliant out of the box</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Get GDPR Cookie Compliance Today
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Our banner is designed to help you comply with GDPR cookie consent requirements. Build your banner in minutes, paste one script, and every requirement on this page is handled automatically.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build Your GDPR Banner
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
