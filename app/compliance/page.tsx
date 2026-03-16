'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Globe,
  ArrowRight,
  Scale,
  Leaf,
  FileCheck,
  Check,
  X,
  Circle,
  MapPin,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
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

const frameworks = [
  {
    slug: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    jurisdiction: 'European Union / EEA',
    icon: Shield,
    color: 'from-blue-500/10 via-indigo-500/5 to-violet-500/10',
    description:
      'The strictest privacy law in the world. If anyone in the EU visits your site, GDPR applies to you — regardless of where your business is based.',
    consentModel: 'Opt-in',
    consentDetail: 'Users must actively consent before any non-essential cookies are set.',
    fines: 'Up to \u20AC20M or 4% of global annual revenue',
    appliesWhen: 'Any EU/EEA visitor accesses your site',
    highlights: [
      'Explicit opt-in consent required before cookies',
      'Right to withdraw consent at any time',
      'Cookie banner must not use dark patterns',
      'Requires a link to your privacy policy',
    ],
  },
  {
    slug: 'ccpa',
    name: 'CCPA / CPRA',
    fullName: 'California Consumer Privacy Act',
    jurisdiction: 'California, USA',
    icon: Scale,
    color: 'from-amber-500/10 via-orange-500/5 to-red-500/10',
    description:
      'California\'s privacy law focuses on the right to opt out of data sales. It applies to for-profit businesses that meet revenue or data processing thresholds.',
    consentModel: 'Opt-out',
    consentDetail: 'Cookies can be set by default, but users must be able to opt out of data sale/sharing.',
    fines: 'Up to $7,500 per intentional violation',
    appliesWhen: 'Business serves CA residents and meets revenue/data thresholds',
    highlights: [
      '"Do Not Sell My Personal Information" link required',
      'Right to know what data is collected',
      'Right to request data deletion',
      'No pre-consent needed (opt-out model)',
    ],
  },
  {
    slug: 'pipeda',
    name: 'PIPEDA',
    fullName: 'Personal Information Protection and Electronic Documents Act',
    jurisdiction: 'Canada',
    icon: Leaf,
    color: 'from-red-500/10 via-pink-500/5 to-rose-500/10',
    description:
      'Canada\'s federal privacy law requires meaningful consent for collecting personal information through cookies. Quebec\'s Law 25 adds stricter requirements for Quebec residents.',
    consentModel: 'Meaningful consent',
    consentDetail: 'Users must understand what they are consenting to. Implied consent may be acceptable for non-sensitive data.',
    fines: 'Up to $100K per violation (OPC complaints)',
    appliesWhen: 'Commercial activities across Canada',
    highlights: [
      'Meaningful consent required (not just implied)',
      'Enforced by the Office of the Privacy Commissioner',
      'Quebec Law 25 adds stricter opt-in requirements',
      'Bilingual support (EN/FR) recommended',
    ],
  },
]

const comparisonRows = [
  {
    label: 'Consent Model',
    gdpr: 'Opt-in (explicit)',
    ccpa: 'Opt-out',
    pipeda: 'Meaningful consent',
  },
  {
    label: 'Cookie Banner Required?',
    gdpr: true,
    ccpa: 'Recommended',
    pipeda: true,
  },
  {
    label: 'Pre-consent Blocking',
    gdpr: true,
    ccpa: false,
    pipeda: 'Depends on sensitivity',
  },
  {
    label: 'Right to Withdraw',
    gdpr: true,
    ccpa: true,
    pipeda: true,
  },
  {
    label: 'Fines',
    gdpr: 'Up to \u20AC20M / 4%',
    ccpa: 'Up to $7,500/violation',
    pipeda: 'Up to $100K',
  },
  {
    label: 'Applies To',
    gdpr: 'Any site with EU visitors',
    ccpa: 'Businesses meeting CA thresholds',
    pipeda: 'Canadian commercial activity',
  },
]

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-4 w-4 text-foreground" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground/40" />
    )
  }
  return <span className="text-sm">{value}</span>
}

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />

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
                    GDPR, CCPA, PIPEDA &amp; more
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
                    Which Privacy Law
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Applies to Your Website?
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  If your website has visitors from the EU, California, or Canada, you likely need a cookie consent banner. Here is what each law requires.
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
                    Build Your Banner Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="#frameworks">
                    Compare Frameworks
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Decision Helper */}
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
                Not Sure Where to Start?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Most websites need to comply with more than one framework. Here is a quick guide.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Globe,
                  question: 'Do you have visitors from Europe?',
                  answer: 'You need GDPR compliance with an opt-in cookie banner.',
                  link: '/compliance/gdpr',
                  label: 'GDPR',
                },
                {
                  icon: MapPin,
                  question: 'Do you serve California residents?',
                  answer: 'You need CCPA compliance with opt-out controls.',
                  link: '/compliance/ccpa',
                  label: 'CCPA',
                },
                {
                  icon: Leaf,
                  question: 'Is your business in Canada?',
                  answer: 'You need PIPEDA compliance with meaningful consent.',
                  link: '/compliance/pipeda',
                  label: 'PIPEDA',
                },
              ].map((item, i) => {
                const ItemIcon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link href={item.link} className="group block">
                      <div className="rounded-xl border border-border bg-background p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <ItemIcon className="h-5 w-5 text-foreground" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.label}
                          </Badge>
                        </div>
                        <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                          {item.question}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {item.answer}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                          Read the full guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center text-sm text-muted-foreground mt-8 max-w-lg mx-auto"
            >
              Our cookie banner handles all three frameworks automatically. Build once, comply everywhere.
            </motion.p>
          </div>
        </section>

        {/* Framework Deep Dives */}
        <section id="frameworks" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Privacy Frameworks Explained
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Understand what each law requires for cookie consent on your website.
              </p>
            </motion.div>

            <div className="space-y-8">
              {frameworks.map((fw, i) => {
                const Icon = fw.icon
                return (
                  <motion.div
                    key={fw.slug}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-border bg-background">
                      {/* Subtle gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${fw.color} opacity-50`} />

                      <div className="relative z-10 p-6 md:p-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background border border-border">
                              <Icon className="h-6 w-6 text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-heading text-2xl font-semibold text-foreground">
                                {fw.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {fw.fullName} &middot; {fw.jurisdiction}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {fw.consentModel}
                            </Badge>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Left: Description + highlights */}
                          <div>
                            <p className="text-muted-foreground mb-5 leading-relaxed">
                              {fw.description}
                            </p>
                            <ul className="space-y-2.5">
                              {fw.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2.5 text-sm">
                                  <FileCheck className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
                                  <span className="text-foreground/90">{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right: Key details */}
                          <div className="space-y-4">
                            <div className="rounded-lg bg-background/80 border border-border p-4">
                              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                                Consent Model
                              </p>
                              <p className="text-sm text-foreground font-medium">
                                {fw.consentModel}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {fw.consentDetail}
                              </p>
                            </div>
                            <div className="rounded-lg bg-background/80 border border-border p-4">
                              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                                Maximum Fines
                              </p>
                              <p className="text-sm text-foreground font-medium">
                                {fw.fines}
                              </p>
                            </div>
                            <div className="rounded-lg bg-background/80 border border-border p-4">
                              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                                Applies When
                              </p>
                              <p className="text-sm text-foreground font-medium">
                                {fw.appliesWhen}
                              </p>
                            </div>

                            <Link
                              href={`/compliance/${fw.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-2"
                            >
                              Read the full {fw.name} guide
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Side-by-Side Comparison Table */}
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
                Quick Comparison
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                See how the three major frameworks differ at a glance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-4xl mx-auto overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-6 text-sm font-semibold text-foreground w-[200px]">
                      Requirement
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        GDPR
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4" />
                        CCPA
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        PIPEDA
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-border/60">
                      <td className="py-3.5 pr-6 text-sm text-muted-foreground font-medium">
                        {row.label}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-foreground">
                        <ComparisonCell value={row.gdpr} />
                      </td>
                      <td className="py-3.5 px-4 text-sm text-foreground">
                        <ComparisonCell value={row.ccpa} />
                      </td>
                      <td className="py-3.5 px-4 text-sm text-foreground">
                        <ComparisonCell value={row.pipeda} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>One banner covers GDPR, CCPA &amp; PIPEDA</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Compliance Shouldn&apos;t Be Complicated
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Our cookie banner applies the right rules for each framework automatically. Build once, stay compliant everywhere.
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
