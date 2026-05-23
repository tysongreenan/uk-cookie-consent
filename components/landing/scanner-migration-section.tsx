'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Search, CheckCircle2, Sparkles, ShieldCheck, MousePointerClick, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Vendors we want visitors to recognize at a glance.
const RECOGNIZED_VENDORS = [
  { name: 'Google Analytics 4', short: 'GA4', category: 'Analytics' },
  { name: 'Google Tag Manager', short: 'GTM', category: 'Tag Manager' },
  { name: 'Meta Pixel', short: 'Meta', category: 'Advertising' },
  { name: 'Google Ads', short: 'Ads', category: 'Advertising' },
  { name: 'Hotjar', short: 'Hotjar', category: 'Analytics' },
  { name: 'Microsoft Clarity', short: 'Clarity', category: 'Analytics' },
  { name: 'LinkedIn Insight', short: 'LinkedIn', category: 'Advertising' },
  { name: 'TikTok Pixel', short: 'TikTok', category: 'Advertising' },
  { name: 'Segment', short: 'Segment', category: 'CDP' },
  { name: 'Intercom', short: 'Intercom', category: 'Support' },
  { name: 'OneTrust', short: 'OneTrust', category: 'Existing CMP' },
  { name: 'Cookiebot', short: 'Cookiebot', category: 'Existing CMP' },
  { name: 'Termly', short: 'Termly', category: 'Existing CMP' },
]

// A representative "detected" payload — modelled on a real scan result.
// Not user-specific, just illustrative of what the panel actually shows.
const SAMPLE_DETECTIONS = [
  { id: 'GA4', label: 'Google Analytics 4', tag: 'G-NPQ8W6NY97', category: 'Tracking', confidence: 'High', via: 'GTM' },
  { id: 'GAW', label: 'Google Ads Conversion', tag: 'AW-10824703305', category: 'Targeting', confidence: 'High', via: 'GTM' },
  { id: 'META', label: 'Meta Pixel', tag: '736791212280159', category: 'Targeting', confidence: 'High', via: 'Network' },
  { id: 'FLD', label: 'Floodlight Activity', tag: 'DC-9876543', category: 'Targeting', confidence: 'High', via: 'GTM' },
  { id: 'HJ', label: 'Hotjar', tag: 'hjid 3489201', category: 'Tracking', confidence: 'Medium', via: 'Network' },
]

const STEPS = [
  {
    num: '01',
    Icon: Search,
    title: 'Paste your URL',
    body: 'We load your site in a real headless browser, find your existing cookie banner, and auto-click "Accept All" in 7 languages so we can see everything that fires after consent.',
    highlight: 'Works with OneTrust, Cookiebot, CookieYes, Termly, Iubenda, Osano, Didomi, and 5 more.',
  },
  {
    num: '02',
    Icon: Sparkles,
    title: 'Review what we found',
    body: 'Every tracker that loaded — plus everything your GTM container is configured to fire — appears as a checklist. Real IDs extracted. Auto-categorized. Dedupe warnings included.',
    highlight: '17+ vendors detected at the network level, plus full GTM container introspection.',
  },
  {
    num: '03',
    Icon: MousePointerClick,
    title: 'One-click import',
    body: 'Approve the list and we generate a fully compliant banner with the right loader snippets, categories, and IDs already wired in. Drop in one line of code and you\'re live.',
    highlight: 'Same setup that takes a week with most CMPs. Here it takes a coffee break.',
  },
]

export function ScannerMigrationSection() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    let normalized = url.trim()
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`
    router.push(`/tools/cookie-scanner?url=${encodeURIComponent(normalized)}`)
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="scanner-migration-heading"
      className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-background to-muted/40 py-20 sm:py-28"
    >
      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.25) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 border-border bg-background text-foreground">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Migrate from any cookie banner
            </Badge>
            <h2
              id="scanner-migration-heading"
              className="font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Switch banners without{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">losing a single tag.</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-yellow-300/60 dark:bg-yellow-400/30"
                />
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Paste a URL. We crawl your site like a real visitor, accept your existing banner,
              and surface every tracker hiding behind it — ready to import into a new compliant banner in one click.
            </p>
          </div>

          {/* Inline scanner input */}
          <div className="mx-auto mt-10 max-w-xl">
            <form
              onSubmit={handleScan}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5"
            >
              <label htmlFor="scanner-url" className="sr-only">
                Your website URL
              </label>
              <div className="flex flex-1 items-center gap-2 px-3 sm:px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="scanner-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourcompany.com"
                  autoComplete="url"
                  inputMode="url"
                  className="h-11 border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 sm:h-12"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-11 w-full font-semibold sm:h-12 sm:w-auto sm:rounded-full sm:px-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Scanning…
                  </>
                ) : (
                  <>
                    Scan my site
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free. No signup. Results in under 30 seconds.
            </p>
          </div>

          {/* 3-Step Flow */}
          <ol
            className="mt-20 grid gap-5 md:grid-cols-3 md:gap-6"
            aria-label="How the scanner works"
          >
            {STEPS.map((step, idx) => {
              const StepIcon = step.Icon
              return (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
                  className="relative flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-7"
                >
                  {/* Connector line on desktop */}
                  {idx < STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute right-0 top-12 hidden h-px w-6 translate-x-full bg-gradient-to-r from-border to-transparent md:block"
                    />
                  )}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground">
                      STEP {step.num}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                      <StepIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  <p className="mt-4 border-t border-dashed border-border pt-4 text-xs font-medium text-foreground/80">
                    {step.highlight}
                  </p>
                </motion.li>
              )
            })}
          </ol>

          {/* Detection preview + vendor wall */}
          <div className="mt-20 grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Mock scan results panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-foreground/5">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <div className="rounded-md bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    cookie-banner.ca / scan
                  </div>
                  <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">
                    Live preview
                  </Badge>
                </div>

                {/* Banner-detected callout */}
                <div className="border-b border-border bg-emerald-500/5 px-5 py-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">Existing CMP detected:</span>{' '}
                      <span className="text-muted-foreground">
                        OneTrust banner found, auto-accepted, and bypassed. 10 scripts already managed by your tag manager.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detection list */}
                <div className="divide-y divide-border">
                  {SAMPLE_DETECTIONS.map((d, idx) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, delay: 0.35 + idx * 0.08 }}
                      className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-foreground bg-foreground"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-background" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-foreground">{d.label}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              'shrink-0 text-[10px] font-medium',
                              d.confidence === 'High'
                                ? 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                                : 'border-amber-500/30 text-amber-700 dark:text-amber-400'
                            )}
                          >
                            {d.confidence}
                          </Badge>
                        </div>
                        <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                          {d.tag} · via {d.via}
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        {d.category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Footer action */}
                <div className="flex flex-col gap-3 border-t border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">5 of 10</span> scripts selected ·{' '}
                    GA4, Google Ads, Meta Pixel, Floodlight, Hotjar
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
                    Import to my banner
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column: vendor recognition + value props */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Detects what you actually use
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {RECOGNIZED_VENDORS.map((v) => (
                  <span
                    key={v.name}
                    title={`${v.name} · ${v.category}`}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    {v.short}
                  </span>
                ))}
                <span className="rounded-lg border border-dashed border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  + many more
                </span>
              </div>

              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Sees past your current banner.</span>{' '}
                    Auto-clicks Accept All in 7 languages so we capture trackers gated behind consent.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Reads your GTM container.</span>{' '}
                    Extracts every tag, ID, and Floodlight pixel — even ones that didn't fire on the page we scanned.
                  </span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Canonical loader snippets.</span>{' '}
                    Imported tags use the official install code with your IDs baked in — not brittle copies of someone else's setup.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA row */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 min-w-[220px] text-base font-semibold">
              <Link href="/dashboard/builder">
                Build my banner with one click
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 min-w-[220px] text-base font-semibold">
              <Link href="/tools/cookie-scanner">
                Try the free scanner
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No credit card. No signup required for the scanner. Migrate from OneTrust, Cookiebot, Termly, CookieYes and more.
          </p>
        </div>
      </div>
    </section>
  )
}
