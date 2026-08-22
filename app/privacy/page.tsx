'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Shield,
  Chrome,
  ArrowRight,
  Eye,
  MousePointerClick,
  LayoutDashboard,
  History,
  BarChart3,
  Globe,
  Check,
  X,
  Frown,
  Smile,
  ChevronDown,
  Zap,
  Lock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Scroll-animated wrapper ─────────────────────────────────────── */
function AnimateIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── FAQ Item ────────────────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-900 pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>
      </motion.div>
    </div>
  )
}

/* ─── Main Page Component ─────────────────────────────────────────── */
export default function PrivacyManagerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ────────────────── NAV ────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0E768C]">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Privacy Manager
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="#pricing" className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:block">
              Pricing
            </Link>
            <Link href="/auth/signup-privacy">
              <Button size="sm" className="bg-[#0E768C] hover:bg-[#0a5f72] text-white shadow-none">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ────────────────── HERO ────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0E768C08_1px,transparent_1px),linear-gradient(to_bottom,#0E768C08_1px,transparent_1px)] bg-[size:32px_32px]" />
        {/* Radial glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#0E768C12,transparent_70%)]" />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0E768C]/20 bg-[#0E768C]/5 px-4 py-1.5 text-sm font-medium text-[#0E768C]">
                  <Chrome className="h-4 w-4" />
                  Chrome Extension
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]"
              >
                Stop clicking{' '}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-[#0E768C] to-[#0aa4c2] bg-clip-text text-transparent">
                    cookie banners
                  </span>
                  <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-2 bg-[#0E768C]/10" />
                </span>
                <br />
                forever.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600"
              >
                Set your cookie preferences once. Our Chrome extension handles every banner
                automatically so you can browse the web without interruptions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link href="/auth/signup-privacy">
                  <Button className="h-12 gap-2 bg-[#0E768C] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[#0E768C]/20 hover:bg-[#0a5f72]">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    variant="outline"
                    className="h-12 gap-2 border-slate-200 px-7 text-[15px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Chrome className="h-4.5 w-4.5" />
                    Add to Chrome
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-4 text-sm text-slate-400"
              >
                Free forever. No credit card required.
              </motion.p>
            </div>

            {/* Right — hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-md">
                {/* Browser mockup */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="ml-3 flex-1 rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-400">
                      example.com
                    </div>
                  </div>
                  {/* Page content */}
                  <div className="relative p-6">
                    {/* Fake page lines */}
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded bg-slate-100" />
                      <div className="h-3 w-full rounded bg-slate-50" />
                      <div className="h-3 w-5/6 rounded bg-slate-50" />
                      <div className="h-3 w-2/3 rounded bg-slate-50" />
                      <div className="mt-4 h-32 w-full rounded-lg bg-gradient-to-br from-slate-50 to-slate-100" />
                      <div className="h-3 w-full rounded bg-slate-50" />
                      <div className="h-3 w-4/5 rounded bg-slate-50" />
                    </div>

                    {/* Cookie banner being dismissed */}
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: 80, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 1.5,
                        ease: 'easeIn',
                      }}
                      className="absolute bottom-0 left-0 right-0 rounded-b-2xl border-t border-slate-200 bg-white p-4"
                    >
                      <div className="mb-2 text-xs font-semibold text-slate-700">
                        We use cookies
                      </div>
                      <div className="mb-3 text-[10px] leading-relaxed text-slate-500">
                        This website uses cookies to ensure you get the best experience.
                      </div>
                      <div className="flex gap-2">
                        <div className="rounded bg-[#0E768C] px-3 py-1 text-[10px] font-medium text-white">
                          Accept All
                        </div>
                        <div className="rounded border border-slate-200 px-3 py-1 text-[10px] font-medium text-slate-500">
                          Reject
                        </div>
                      </div>
                    </motion.div>

                    {/* Shield confirmation */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 2.3, type: 'spring', stiffness: 300 }}
                      className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#0E768C] px-3 py-1.5 text-white shadow-lg"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">Handled by Privacy Manager</span>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-2xl bg-[#0E768C]/5 blur-sm" />
                <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-[#0aa4c2]/10 blur-md" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────── HOW IT WORKS ────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <AnimateIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0E768C]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Three steps to banner-free browsing
            </h2>
          </AnimateIn>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Set your preferences',
                description:
                  'Choose how you want to handle cookies — accept all, reject non-essential, or customise per category.',
                icon: MousePointerClick,
              },
              {
                step: '02',
                title: 'Install the extension',
                description:
                  'Add Privacy Manager to Chrome in one click. It runs quietly in the background as you browse.',
                icon: Chrome,
              },
              {
                step: '03',
                title: 'Browse freely',
                description:
                  'Cookie banners are handled automatically according to your preferences. No more pop-ups.',
                icon: Sparkles,
              },
            ].map((item, i) => (
              <AnimateIn key={item.step} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-[#0E768C]/30 hover:shadow-lg hover:shadow-[#0E768C]/5">
                  {/* Step number */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E768C] text-sm font-bold text-white">
                      {item.step}
                    </span>
                    <item.icon className="h-5 w-5 text-[#0E768C]/60" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  {/* Connector line (between cards) */}
                  {i < 2 && (
                    <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-slate-200 sm:block" />
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── FEATURES GRID ────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <AnimateIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0E768C]">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need for cookie peace of mind
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
              Privacy Manager works silently in the background, giving you full control without the hassle.
            </p>
          </AnimateIn>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Eye,
                title: 'Auto-detect banners',
                description:
                  'Instantly recognises cookie consent banners on any website you visit, even custom-built ones.',
                accent: 'from-[#0E768C] to-[#0aa4c2]',
              },
              {
                icon: MousePointerClick,
                title: 'One-click preferences',
                description:
                  'Set your cookie preferences once and Privacy Manager applies them everywhere, every time.',
                accent: 'from-[#0aa4c2] to-[#0cc8db]',
              },
              {
                icon: LayoutDashboard,
                title: 'Privacy dashboard',
                description:
                  'See a clear overview of which sites asked for cookies and how they were handled.',
                accent: 'from-[#0E768C] to-[#097a6b]',
              },
              {
                icon: History,
                title: 'Consent history',
                description:
                  'Full log of every cookie decision made on your behalf. Review or change preferences any time.',
                accent: 'from-[#097a6b] to-[#0E768C]',
              },
              {
                icon: BarChart3,
                title: 'Daily stats',
                description:
                  'Track how many banners were blocked, which categories were rejected, and your privacy score.',
                accent: 'from-[#0cc8db] to-[#0E768C]',
              },
              {
                icon: Globe,
                title: 'Works everywhere',
                description:
                  'Compatible with all major cookie consent frameworks including OneTrust, Cookiebot, and more.',
                accent: 'from-[#0E768C] to-[#0aa4c2]',
              },
            ].map((feature, i) => (
              <AnimateIn key={feature.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#0E768C]/20 hover:shadow-lg hover:shadow-[#0E768C]/5">
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent}`}
                  >
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── BEFORE / AFTER ────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <AnimateIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0E768C]">
              The difference
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your browsing, transformed
            </h2>
          </AnimateIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {/* Without */}
            <AnimateIn delay={0}>
              <div className="relative overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-b from-red-50/80 to-white p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <Frown className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Without Privacy Manager</h3>
                    <p className="text-xs text-slate-500">The daily struggle</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Cookie banners on every single website',
                    'Clicking "Accept" or "Reject" dozens of times a day',
                    'Complex preference menus with 15+ toggles',
                    'No idea which cookies you have accepted',
                    'Pop-ups covering content you want to read',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Decorative stacked banners */}
                <div className="mt-6 space-y-2">
                  {[0.9, 0.7, 0.5].map((opacity, i) => (
                    <div
                      key={i}
                      style={{ opacity }}
                      className="rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-medium text-slate-500">
                          We use cookies to...
                        </div>
                        <div className="flex gap-1.5">
                          <div className="rounded bg-slate-800 px-2 py-0.5 text-[8px] text-white">
                            Accept
                          </div>
                          <div className="rounded border border-slate-200 px-2 py-0.5 text-[8px] text-slate-400">
                            Settings
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* With */}
            <AnimateIn delay={0.12}>
              <div className="relative overflow-hidden rounded-2xl border border-[#0E768C]/20 bg-gradient-to-b from-[#0E768C]/5 to-white p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E768C]/10">
                    <Smile className="h-5 w-5 text-[#0E768C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">With Privacy Manager</h3>
                    <p className="text-xs text-slate-500">Clean, uninterrupted browsing</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    'Banners handled automatically in the background',
                    'Your preferences applied instantly on every site',
                    'Full consent history in your dashboard',
                    'Daily privacy stats and tracking insights',
                    'Browse the web like cookie banners never existed',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E768C]" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Clean browser visual */}
                <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-red-300" />
                    <div className="h-2 w-2 rounded-full bg-amber-300" />
                    <div className="h-2 w-2 rounded-full bg-green-300" />
                    <div className="ml-2 h-4 flex-1 rounded bg-slate-100" />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="h-3 w-2/3 rounded bg-slate-100" />
                    <div className="h-2 w-full rounded bg-slate-50" />
                    <div className="h-2 w-5/6 rounded bg-slate-50" />
                    <div className="mt-2 h-16 w-full rounded bg-gradient-to-r from-slate-50 to-[#0E768C]/5" />
                  </div>
                  {/* Shield badge */}
                  <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 bg-[#0E768C]/5 py-2">
                    <Shield className="h-3 w-3 text-[#0E768C]" />
                    <span className="text-[10px] font-medium text-[#0E768C]">
                      Protected by Privacy Manager
                    </span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ────────────────── PRICING ────────────────── */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <AnimateIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0E768C]">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-slate-500">
              Start free and upgrade when you need more. No hidden fees, no surprises.
            </p>
          </AnimateIn>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
            {/* Free tier */}
            <AnimateIn delay={0}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Free</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">$0</span>
                    <span className="text-sm text-slate-500">/ forever</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Perfect for casual browsing. No credit card required.
                  </p>
                </div>
                <Link href="/auth/signup-privacy" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <ul className="mt-6 space-y-3">
                  {[
                    '50 banners handled per day',
                    '7-day consent history',
                    '10 domain analytics',
                    'Single preference profile',
                    'Chrome extension',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E768C]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* Premium tier */}
            <AnimateIn delay={0.1}>
              <div className="relative h-full rounded-2xl border-2 border-[#0E768C] bg-white p-8 shadow-lg shadow-[#0E768C]/10">
                {/* Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0E768C] px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Premium</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">$4</span>
                    <span className="text-sm text-slate-500">/ month</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Unlimited protection for power users and privacy advocates.
                  </p>
                </div>
                <Link href="/auth/signup-privacy" className="block">
                  <Button className="w-full bg-[#0E768C] font-semibold text-white shadow-none hover:bg-[#0a5f72]">
                    Start Premium
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
                <ul className="mt-6 space-y-3">
                  {[
                    'Unlimited banners per day',
                    '90-day consent history',
                    'Unlimited domain analytics',
                    'Multiple preference profiles',
                    'Export consent data',
                    'Priority support',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0E768C]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ────────────────── FAQ ────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <AnimateIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0E768C]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6">
              <FAQItem
                question="What does Privacy Manager actually do?"
                answer="Privacy Manager is a Chrome extension that automatically detects cookie consent banners on websites you visit and applies your chosen preferences (accept all, reject non-essential, or custom settings) without you having to interact with them. It works silently in the background."
              />
              <FAQItem
                question="Is my browsing data private?"
                answer="Absolutely. Privacy Manager processes everything locally in your browser. Your browsing history never leaves your device. The only data synced to our servers is your preference settings and anonymised consent logs for your dashboard — nothing else."
              />
              <FAQItem
                question="Which cookie banner frameworks does it support?"
                answer="Privacy Manager works with all major consent management platforms including OneTrust, Cookiebot, TrustArc, Quantcast, CookieYes, Osano, and hundreds of custom-built banners. We update detection patterns regularly to cover new implementations."
              />
              <FAQItem
                question="Can I change my preferences for specific websites?"
                answer="Yes. While your global preferences apply by default, you can override them for any specific domain. For example, you might reject all non-essential cookies globally but allow analytics on a site you want to support."
              />
              <FAQItem
                question="What is the difference between Free and Premium?"
                answer="The free plan handles up to 50 banners per day with 7 days of history — plenty for casual browsing. Premium removes all limits, extends history to 90 days, adds data export, and lets you create multiple preference profiles for different browsing contexts (work, personal, etc.)."
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ────────────────── FINAL CTA ────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0E768C]/[0.03] to-transparent" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,#0E768C10,transparent_70%)]" />

        <div className="mx-auto max-w-3xl px-5 text-center">
          <AnimateIn>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0E768C]">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Take back your browsing experience
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-slate-500">
              Join thousands of people who never think about cookie banners again.
              Set up in under a minute.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/auth/signup-privacy">
                <Button className="h-13 gap-2 bg-[#0E768C] px-8 text-base font-semibold text-white shadow-lg shadow-[#0E768C]/20 hover:bg-[#0a5f72]">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#">
                <Button
                  variant="outline"
                  className="h-13 gap-2 border-slate-200 px-8 text-base font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Chrome className="h-5 w-5" />
                  Add to Chrome
                </Button>
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Privacy-first
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Instant setup
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Free forever plan
              </span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ────────────────── FOOTER ────────────────── */}
      <footer className="border-t border-slate-100 bg-white py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0E768C]">
                <Shield className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Privacy Manager</span>
            </div>
            <div className="flex items-center gap-5 text-sm text-slate-400">
              <Link href="/terms" className="hover:text-slate-600">
                Terms
              </Link>
              <Link href="/privacy-policy" className="hover:text-slate-600">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-slate-600">
                Cookie Banner Tools
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Cookie Banner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
