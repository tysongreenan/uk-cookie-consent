'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Leaf,
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
    title: 'Meaningful consent, not just a click',
    description:
      'PIPEDA requires that consent be "meaningful," meaning users must genuinely understand what they are agreeing to. The Office of the Privacy Commissioner (OPC) has stated that consent is only valid if a reasonable person would understand what they are consenting to.',
  },
  {
    title: 'Appropriate consent form based on sensitivity',
    description:
      'For non-sensitive data (basic analytics), implied consent may be acceptable if you provide clear notice. For sensitive data (health, financial, location tracking, detailed profiling), explicit opt-in consent is required.',
  },
  {
    title: 'Clear purpose specification',
    description:
      'You must state the specific purposes for which you are collecting data through cookies. Vague statements like "to improve your experience" are not sufficient. State exactly what data you collect and why.',
  },
  {
    title: 'Easy withdrawal of consent',
    description:
      'Users must be able to withdraw consent at any time. The process for withdrawing must be as straightforward as the process for giving consent. You must inform users of the consequences of withdrawal.',
  },
  {
    title: 'Quebec Law 25: stricter opt-in requirements',
    description:
      'Quebec\'s privacy modernization law (Law 25, fully in force since September 2024) imposes GDPR-like requirements including explicit opt-in consent for cookies, mandatory privacy impact assessments, and fines up to $25 million CAD or 4% of worldwide turnover.',
  },
  {
    title: 'Accountability and transparency',
    description:
      'Organizations must appoint a privacy officer, maintain a record of their data practices, and be able to demonstrate compliance. Your cookie consent mechanism is part of this accountability framework.',
  },
]

const checklistItems = [
  'Cookie notice explains what cookies are used and why in plain language',
  'Sensitive data cookies (profiling, location) require explicit opt-in consent',
  'Non-sensitive analytics cookies have clear notice and implied consent mechanism',
  'Users can withdraw consent as easily as they gave it',
  'Cookie purposes are specific, not vague or bundled together',
  'Privacy policy includes detailed cookie information and contact details',
  'Quebec visitors get GDPR-like opt-in consent (Law 25 compliance)',
  'Bilingual support available (English and French) for Quebec compliance',
  'Consent records are maintained for Privacy Commissioner inquiries',
  'Third-party cookies are disclosed with recipient information',
  'A privacy officer or responsible person is designated',
  'Cookie practices are reviewed when new tools or scripts are added',
]

const faqData = [
  {
    question: 'Does Canada require a cookie consent banner?',
    answer:
      'Yes, in most cases. Under PIPEDA, you must obtain meaningful consent before collecting personal information through cookies. For non-sensitive cookies like basic analytics, implied consent with clear notice may be sufficient. However, for marketing, profiling, and tracking cookies, explicit consent is recommended. Quebec\'s Law 25 explicitly requires opt-in consent similar to GDPR, making a cookie banner essential for any website with Quebec visitors.',
  },
  {
    question: 'What is the difference between PIPEDA and Quebec Law 25 for cookies?',
    answer:
      'PIPEDA allows implied consent for non-sensitive cookie data as long as you provide clear notice. Quebec Law 25 (which has been fully in force since September 2024) is more strict: it requires explicit, opt-in consent before setting non-essential cookies, similar to GDPR. If your website has visitors from Quebec, you need to meet the stricter Law 25 standard for those visitors.',
  },
  {
    question: 'What are the fines for PIPEDA cookie violations?',
    answer:
      'Under federal PIPEDA, the Privacy Commissioner can issue findings and recommendations, and violations can result in fines of up to $100,000 CAD per violation through Federal Court action. Quebec Law 25 has significantly higher penalties: up to $25 million CAD or 4% of worldwide turnover, whichever is greater. British Columbia and Alberta have their own provincial privacy laws with separate enforcement mechanisms.',
  },
  {
    question: 'Do I need bilingual cookie consent for a Canadian website?',
    answer:
      'It depends on your audience. If you serve Quebec residents, providing cookie consent in both English and French is strongly recommended and may be legally required under Quebec\'s Charter of the French Language. Even outside Quebec, offering bilingual consent demonstrates good faith in meeting PIPEDA\'s meaningful consent standard for a bilingual country.',
  },
  {
    question: 'What counts as "meaningful consent" under PIPEDA?',
    answer:
      'The OPC has outlined that meaningful consent requires: (1) clear, plain-language information about what data is collected, (2) specific purposes for collection, (3) identification of third parties who will receive the data, (4) information about risks of harm or other consequences, and (5) consent that is not bundled as a condition of service. Users must be able to understand what they are saying yes to.',
  },
  {
    question: 'How does PIPEDA compare to GDPR for cookie consent?',
    answer:
      'PIPEDA is generally less prescriptive than GDPR. The key differences: PIPEDA allows implied consent for non-sensitive data (GDPR does not), PIPEDA does not have GDPR\'s strict "opt-in before anything loads" requirement for all non-essential cookies, and PIPEDA fines are lower ($100K vs. 20M euros). However, Quebec Law 25 has brought Quebec\'s requirements very close to GDPR standards, including opt-in consent and large fines.',
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

export default function PIPEDACompliancePage() {
  return (
    <div className="min-h-screen bg-background">
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
                    Canadian Privacy Law
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
                    PIPEDA Cookie Consent:
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Canada&apos;s Cookie Banner Rules
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  PIPEDA requires meaningful consent for cookies. Quebec&apos;s Law 25 adds GDPR-like opt-in rules. Here is what Canadian websites need to know and what to implement.
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
                    Build a PIPEDA-Compliant Banner
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

        {/* What Does PIPEDA Require */}
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
                What Does PIPEDA Require for Cookies?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA) applies to all commercial activities across Canada. Provincial laws in Quebec, BC, and Alberta add additional requirements.
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
                Do You Need a Cookie Banner for PIPEDA?
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-background p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    Yes, if you collect personal information through cookies.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Under PIPEDA, cookies that collect personal information (which includes IP addresses, browsing behavior, and device identifiers) require consent. The form of consent depends on what you are collecting: non-sensitive analytics may only need implied consent with clear notice, but marketing cookies, cross-site tracking, and profiling require explicit opt-in.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Quebec Law 25 takes this further and requires GDPR-style opt-in consent for all non-essential cookies, regardless of sensitivity. Since roughly 23% of Canada&apos;s population lives in Quebec, most Canadian websites should implement opt-in consent for Quebec visitors at minimum.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-6">
                  <h3 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    PIPEDA applies to you if...
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      'You engage in commercial activity anywhere in Canada',
                      'You collect, use, or disclose personal information in the course of commercial activities',
                      'Your website has visitors from Canadian provinces',
                      'You transfer personal information across provincial or national borders',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">
                    Quebec, BC, and Alberta have their own substantially similar provincial privacy laws that may apply instead of or in addition to PIPEDA.
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
                Cookie Consent Checklist for PIPEDA
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Verify your website meets Canadian cookie consent requirements, including Quebec Law 25.
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

        {/* How Our Banner Handles PIPEDA */}
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
                How Our Banner Handles PIPEDA Compliance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our banner automatically detects Canadian visitors and applies the correct consent model, including Quebec Law 25 opt-in requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                {
                  title: 'Meaningful consent by default',
                  description:
                    'Cookie purposes are explained in plain language. Users see exactly what each category does and who receives the data, meeting PIPEDA\'s meaningful consent standard.',
                },
                {
                  title: 'Quebec Law 25 opt-in mode',
                  description:
                    'Visitors from Quebec automatically get GDPR-like opt-in behavior. Non-essential cookies are blocked until explicit consent is given.',
                },
                {
                  title: 'Bilingual support (EN/FR)',
                  description:
                    'Banner text is available in both English and French. Quebec visitors can see the consent notice in their preferred language.',
                },
                {
                  title: 'Sensitivity-based consent',
                  description:
                    'Analytics cookies use the appropriate implied consent mechanism. Marketing and tracking cookies require explicit opt-in, matching PIPEDA\'s sensitivity-based approach.',
                },
                {
                  title: 'Easy consent withdrawal',
                  description:
                    'A persistent settings link lets users change their cookie preferences at any time. Withdrawal is as simple as the original consent.',
                },
                {
                  title: 'Privacy Commissioner audit ready',
                  description:
                    'Consent records include timestamps, categories accepted, and banner versions. Ready for OPC inquiries or Law 25 compliance audits.',
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
                    <Leaf className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
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
                PIPEDA Cookie Consent FAQ
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Common questions about Canadian cookie consent requirements.
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
                <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>PIPEDA + Quebec Law 25 compliant</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Get Canadian Cookie Compliance Today
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Our banner is designed to help you comply with PIPEDA and Quebec Law 25 cookie requirements. Meaningful consent, bilingual support, and provincial law detection are all built in.
              </p>

              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/builder">
                  Build Your Canadian Banner
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
