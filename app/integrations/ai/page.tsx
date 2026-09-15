'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { StructuredData } from '@/components/seo/structured-data'
import { SetupWithAi } from '@/components/integrations/setup-with-ai'
import { listScriptTemplates } from '@/lib/script-snippets'
import { MCP_PACKAGE } from '@/lib/mcp-install'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Circle,
  Sparkles,
  Terminal,
  KeyRound,
  FileCode,
  Shield,
} from 'lucide-react'

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

const faqData = [
  {
    question: 'What is the Cookie Banner MCP?',
    answer:
      'It is a Model Context Protocol server you install with npx. Once connected, Claude Code, Cursor, Windsurf, or VS Code can create a banner in your cookie-banner.ca account, attach consent-gated tracking scripts, and return the header snippet to paste into your site.',
  },
  {
    question: 'Do I still need an account?',
    answer:
      'Yes. The agent acts as you. Generate a developer API key (cb_…) on this page after you sign in, then put that key in the MCP config. You can revoke the key anytime from Dashboard → Settings.',
  },
  {
    question: 'Will the agent paste the snippet into my repo?',
    answer:
      'Yes, if you ask it to. The MCP returns the exact script tag and file path for Next.js, WordPress, Shopify, and others. Your coding agent writes that tag into the header and should remove duplicate GA4 or GTM tags so they only load after consent.',
  },
  {
    question: 'Which trackers can it attach?',
    answer:
      'Google Analytics 4, Google Tag Manager, Meta Pixel, Microsoft Clarity, Hotjar, LinkedIn Insight, TikTok Pixel, Google Ads, Intercom, or a custom script you paste.',
  },
  {
    question: 'Is this a replacement for the visual builder?',
    answer:
      'No. The builder is still there for design and review. Set up with AI is the fastest path when you already have a coding agent in the repo and want the banner live without clicking through the dashboard.',
  },
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca' },
  { name: 'Integrations', url: 'https://www.cookie-banner.ca/integrations' },
  { name: 'Set up with AI', url: 'https://www.cookie-banner.ca/integrations/ai' },
]

const transcript = [
  { role: 'you', text: 'Set up cookie consent on this site.' },
  { role: 'agent', text: 'Created banner “Lively Leadership” (PIPEDA).' },
  { role: 'agent', text: 'Attached GA4 G-XXXXXXXX and GTM-XXXXXXX.' },
  {
    role: 'agent',
    text: 'Added the snippet to app/layout.tsx with strategy="beforeInteractive".',
  },
]

export default function AiIntegrationPage() {
  const templates = listScriptTemplates().filter((t) => t.id !== 'custom')

  return (
    <div className="min-h-screen bg-background">
      <StructuredData type="faq" data={faqData} />
      <StructuredData
        type="article"
        data={{
          title: 'Set up with AI: Cookie Banner MCP',
          description:
            'Connect cookie-banner.ca to your coding agent. The agent creates the banner, attaches scripts, and installs the header snippet.',
          datePublished: '2026-08-19',
          dateModified: '2026-08-19',
        }}
      />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:14px_24px] opacity-60 dark:opacity-20" />

          <div className="container max-w-7xl px-4 sm:px-6 mx-auto relative z-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
              <div className="flex flex-col gap-8">
                <motion.div
                  custom={0}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <Circle className="h-2 w-2 fill-foreground/60" />
                    <span className="text-sm text-muted-foreground tracking-wide">
                      MCP · {MCP_PACKAGE}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                    Set up with AI
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                    Connect Claude Code, Cursor, Windsurf, or VS Code. The agent logs into your cookie-banner account, creates the banner, attaches your trackers, and pastes the header snippet.
                  </p>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row items-start gap-3"
                >
                  <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
                    <a href="#connect">
                      Connect your agent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                    <Link href="/builder">Or use the visual builder</Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-border bg-[#141413] text-[#faf9f5] shadow-xl overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 text-xs text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d97757]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#788c5d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#6a9bcc]" />
                  <span className="ml-2 font-mono">agent session</span>
                </div>
                <div className="p-5 space-y-3 font-mono text-sm leading-relaxed">
                  {transcript.map((line) => (
                    <p key={line.text}>
                      <span className={line.role === 'you' ? 'text-[#d97757]' : 'text-[#788c5d]'}>
                        {line.role === 'you' ? '>' : '✓'}
                      </span>{' '}
                      <span className="text-[#faf9f5]/90">{line.text}</span>
                    </p>
                  ))}
                  <p className="text-[#b0aea5] pt-2">
                    {`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=…" async></script>`}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: KeyRound,
                  title: 'Mint a key',
                  desc: 'A cb_ developer key lets the agent act as you. Revoke it anytime.',
                },
                {
                  icon: Terminal,
                  title: 'Connect MCP',
                  desc: 'One npx command. Works in Claude Code, Cursor, Windsurf, and VS Code.',
                },
                {
                  icon: FileCode,
                  title: 'Agent installs it',
                  desc: 'It creates the banner, attaches scripts, and writes the snippet into your header.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-border">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-heading text-lg font-semibold mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="connect" className="scroll-mt-32 py-16 sm:py-20 bg-background">
          <div className="container max-w-4xl px-4 sm:px-6 mx-auto">
            <SetupWithAi />
          </div>
        </section>

        <section className="py-16 border-t border-border bg-muted/30">
          <div className="container max-w-7xl px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
                Scripts the agent can attach
              </h2>
              <p className="text-muted-foreground">
                Each one is categorized and blocked until the visitor consents. On Pro, GA4 uses the native Consent Mode integration.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <p className="font-heading font-semibold">{template.name}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {template.idField} · {template.idExample}
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-background">
          <div className="container max-w-3xl px-4 sm:px-6 mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">
              Questions
            </h2>
            <dl className="space-y-6">
              {faqData.map((item) => (
                <div key={item.question} className="border-b border-border pb-6">
                  <dt className="font-heading font-semibold mb-2">{item.question}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="container relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Same banner the visual builder produces</span>
            </div>
            <h2 className="mb-5 font-heading text-3xl font-semibold sm:text-4xl">
              Prefer to click instead of prompt?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              The builder still creates the same hosted snippet. Use whichever path is faster for the site in front of you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="h-12 px-8">
                <a href="#connect">Set up with AI</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link href="/builder">
                  Open the builder
                  <Shield className="ml-2 h-4 w-4" />
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
