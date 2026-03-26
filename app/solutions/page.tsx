'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  Heart,
  Cloud,
  Landmark,
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  Circle,
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

const solutions = [
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description:
      'Cookie consent built for Shopify, WooCommerce, and online stores. Handle payment tracking, remarketing pixels, and cart analytics while staying compliant.',
    icon: ShoppingCart,
    tags: ['Shopify', 'WooCommerce', 'Stripe'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    description:
      'HIPAA-aware cookie consent for telemedicine platforms, patient portals, and medical device tracking. Manage PHI alongside GDPR, PIPEDA, and CCPA.',
    icon: Heart,
    tags: ['HIPAA', 'Telemedicine', 'Patient Portals'],
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description:
      'Cookie compliance for web applications, dashboards, and multi-tenant platforms. Handle product analytics, onboarding flows, and third-party integrations.',
    icon: Cloud,
    tags: ['Analytics', 'Multi-tenant', 'APIs'],
  },
  {
    slug: 'finance',
    name: 'Finance',
    description:
      'Regulatory-grade cookie consent for banking, fintech, and insurance websites. Meet PCI DSS, SOX, and financial privacy requirements alongside cookie laws.',
    icon: Landmark,
    tags: ['Banking', 'Fintech', 'Insurance'],
  },
  {
    slug: 'education',
    name: 'Education',
    description:
      'Cookie consent for universities, e-learning platforms, and EdTech. Protect student data under FERPA, COPPA, and international privacy regulations.',
    icon: GraduationCap,
    tags: ['Universities', 'EdTech', 'FERPA'],
  },
]

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0]
  index: number
}) {
  const Icon = solution.icon

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link href={`/solutions/${solution.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04]">
          {/* Top row: icon + name */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {solution.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {solution.description}
          </p>

          {/* Bottom row: tags + link */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {solution.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 ml-3">
              View Solution <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
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
                    Industry-specific compliance
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
                    Cookie Consent
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    Built for Your Industry
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Every industry has unique privacy requirements. Choose your sector
                  to see how our cookie banner handles the regulations that matter to you.
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
                  <Link href="#industries">
                    Choose Your Industry
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="industries" className="py-16 sm:py-20 bg-background">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                Choose Your Industry
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Each solution is tailored to the privacy regulations and cookie patterns specific to your sector.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutions.map((solution, i) => (
                <SolutionCard key={solution.slug} solution={solution} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Stats Section */}
        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Multi-Regulation',
                  desc: 'GDPR, CCPA, PIPEDA, and sector-specific laws',
                },
                {
                  icon: Clock,
                  title: 'Quick Setup',
                  desc: 'Go live in minutes, not weeks',
                },
                {
                  icon: Zap,
                  title: 'Under 10KB',
                  desc: 'No impact on page load speed',
                },
              ].map((item, i) => {
                const ItemIcon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-border">
                      <ItemIcon className="h-5 w-5 text-foreground" />
                    </div>
                    <p className="font-heading font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>One banner for every industry</span>
              </div>

              <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl sm:mb-6">
                Ready to Get Compliant?
              </h2>

              <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
                Build a cookie banner tailored to your industry in minutes. Our visual builder handles the compliance details so you can focus on your business.
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
