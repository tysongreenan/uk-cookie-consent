'use client'

import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StructuredData } from '@/components/seo/structured-data'
import { SetupWithAi } from '@/components/integrations/setup-with-ai'
import { McpHero } from '@/components/integrations/mcp-hero'
import { listScriptTemplates } from '@/lib/script-snippets'
import { ArrowRight, Shield } from 'lucide-react'

const faqData = [
  {
    question: 'How does the agent get into my account?',
    answer:
      'It does not log in. You sign in here, pick your editor, and copy one prompt. Copying mints a developer key on your user and writes it into that prompt. Every tool call hits our API as you, so banners land in your dashboard. Revoke the key from Dashboard → Settings.',
  },
  {
    question: 'What is the Cookie Banner MCP?',
    answer:
      'It is a Model Context Protocol server you install with npx. Once connected, Claude Code, Cursor, Grok, ChatGPT (Codex), or another MCP client can create a banner in your cookie-banner.ca account, attach consent-gated tracking scripts, and return the header snippet to paste into your site.',
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
          dateModified: '2026-09-15',
        }}
      />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <Header />

      <main>
        <section className="relative overflow-hidden bg-secondary pt-10 sm:pt-16 md:pt-24 pb-20 sm:pb-28">
          <div className="container max-w-6xl px-4 sm:px-6 mx-auto">
            <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-12">
              <div className="space-y-5">
                <h1 className="font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem] text-foreground text-balance">
                  Set up with AI
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-md">
                  Sign in, pick your editor, copy one prompt. We mint a secret key into it — the agent installs the MCP and sets up the banner.
                </p>
                <p>
                  <Link
                    href="/builder"
                    className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Or use the visual builder
                  </Link>
                </p>
              </div>
              <McpHero />
            </div>
          </div>
        </section>

        <section id="connect" className="relative z-10 scroll-mt-32 -mt-14 sm:-mt-16 pb-16 sm:pb-20">
          <div className="container max-w-2xl px-4 sm:px-6 mx-auto min-w-0">
            <div className="rounded-2xl bg-background p-5 sm:p-8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)]">
              <SetupWithAi />
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20">
          <div className="container max-w-5xl px-4 sm:px-6 mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2 text-balance">
              What the agent actually does
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl text-pretty">
              One prompt. The MCP creates the hosted banner, wires consent-gated scripts, and hands back the snippet.
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              <li className="rounded-2xl bg-secondary p-3 sm:p-4">
                <div aria-hidden>
                  <MiniBanner />
                </div>
                <h3 className="font-heading font-semibold mt-4 px-1">Creates the banner</h3>
                <p className="text-sm text-muted-foreground mt-1 px-1 text-pretty">
                  A hosted consent banner lands in your cookie-banner.ca dashboard, already tied to your account.
                </p>
              </li>
              <li className="rounded-2xl bg-secondary p-3 sm:p-4">
                <div aria-hidden>
                  <MiniScripts />
                </div>
                <h3 className="font-heading font-semibold mt-4 px-1">Attaches your trackers</h3>
                <p className="text-sm text-muted-foreground mt-1 px-1 text-pretty">
                  GA4, GTM, Meta, Clarity, and the rest stay blocked until the visitor consents.
                </p>
              </li>
              <li className="rounded-2xl bg-secondary p-3 sm:p-4">
                <div aria-hidden>
                  <MiniSnippet />
                </div>
                <h3 className="font-heading font-semibold mt-4 px-1">Pastes the snippet</h3>
                <p className="text-sm text-muted-foreground mt-1 px-1 text-pretty">
                  The agent writes the header tag into the repo and strips duplicate analytics tags.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 border-t border-border">
          <div className="container max-w-5xl px-4 sm:px-6 mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-2 text-balance">
              Scripts the agent can attach
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl text-pretty">
              Each one is categorized and blocked until the visitor consents. On Pro, GA4 uses the native Consent Mode integration.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {templates.map((template) => (
                <li
                  key={template.id}
                  className="rounded-xl bg-muted/50 px-4 py-3 min-w-0"
                >
                  <p className="font-heading font-semibold text-sm">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
                    {template.description}
                  </p>
                  {template.idField && template.idExample ? (
                    <code className="mt-2 block text-[11px] font-mono text-muted-foreground truncate">
                      {template.idField} · {template.idExample}
                    </code>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border">
          <div className="container max-w-2xl px-4 sm:px-6 mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6 text-balance">
              Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="font-heading text-left text-base font-semibold hover:no-underline hover:text-foreground">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20">
          <div className="container mx-auto max-w-xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-semibold sm:text-4xl text-balance">
              Prefer to click instead of prompt?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">
              The builder still creates the same hosted snippet. Use whichever path is faster for the site in front of you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild size="lg" className="h-12 px-8 active:scale-[0.96] transition-transform">
                <a href="#connect">
                  Set up with AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 active:scale-[0.96] transition-transform">
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

function MiniBanner() {
  return (
    <div className="flex min-h-[6.75rem] flex-col justify-center rounded-xl bg-background p-3 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]">
      <div className="h-2 w-20 rounded-sm bg-foreground/80" />
      <div className="mt-2 h-1.5 w-full max-w-[11rem] rounded-sm bg-muted-foreground/25" />
      <div className="mt-1 h-1.5 w-24 rounded-sm bg-muted-foreground/15" />
      <div className="mt-3 flex gap-1.5">
        <span className="h-7 w-[4.5rem] rounded-md bg-primary" />
        <span className="h-7 w-[4.5rem] rounded-md border border-border bg-background" />
      </div>
    </div>
  )
}

function MiniScripts() {
  return (
    <div className="flex min-h-[6.75rem] flex-col justify-center rounded-xl bg-background p-3 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]">
      <div className="flex flex-wrap gap-1.5">
        {['GA4', 'GTM', 'Meta', 'Clarity', 'Hotjar'].map((name) => (
          <span
            key={name}
            className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-foreground"
          >
            {name}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Blocked until consent</p>
    </div>
  )
}

function MiniSnippet() {
  return (
    <div className="flex min-h-[6.75rem] flex-col justify-center rounded-xl bg-background p-3 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.18)]">
      <p className="text-[11px] font-medium text-foreground">app/layout.tsx</p>
      <code className="mt-2 block truncate text-[11px] font-mono text-muted-foreground">
        {'<script src="https://cdn.cookie-banner.ca/b.js">'}
      </code>
    </div>
  )
}
