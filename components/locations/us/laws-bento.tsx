'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHead } from '@/components/landing/v2/section-head'

const baseCard =
  'group relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'

function CardEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-primary">
      {children}
    </span>
  )
}

export function UsLawsBento() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="US requirements"
          title={
            <>
              What a US banner
              <br />
              actually has to do.
            </>
          }
          lede="Not a GDPR clone with the flags swapped. Opt-out, sale/sharing, and a browser signal most European banners ignore."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:[grid-auto-rows:minmax(260px,auto)]">
          <DoNotSellCard />
          <GpcCard />
          <GeoCard />
          <OptOutCard />
          <LogsCard />
          <PerformanceCard />
        </div>
      </div>
    </section>
  )
}

function DoNotSellCard() {
  return (
    <article className={`${baseCard} md:col-span-3 md:row-span-2 md:p-9`}>
      <div>
        <CardEyebrow>CCPA / CPRA</CardEyebrow>
        <h3 className="mt-2 max-w-[380px] font-heading text-2xl font-semibold leading-[1.18] tracking-[-0.02em] text-foreground sm:text-3xl">
          “Do Not Sell or Share
          <br />
          My Personal Information”
        </h3>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-muted-foreground">
          Ad cookies and pixels count as a sale or share in California. The banner ships with
          the control, a privacy-rights footer, and granular categories.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-5 flex min-h-[240px] flex-1 items-end overflow-hidden rounded-xl bg-secondary p-5
          [background:radial-gradient(circle_at_80%_20%,rgba(14,118,140,0.08)_0%,transparent_55%),hsl(var(--secondary))]"
      >
        <div className="w-full rounded-2xl border border-border bg-background p-4 shadow-[0_12px_28px_-12px_rgba(14,118,140,0.28)]">
          <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
            California visitor
          </span>
          <p className="mt-2 text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
            Your Privacy Rights
          </p>
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            Opt out of the sale or sharing of personal information collected through cookies.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-[12px] font-semibold text-primary-foreground">
              Accept
            </span>
            <span className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-[12px] font-semibold text-foreground">
              Do Not Sell My Info
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function GpcCard() {
  return (
    <article className={`${baseCard} md:col-span-3`}>
      <div>
        <CardEyebrow>Global Privacy Control</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Honor the signal the browser already sent.
        </h3>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-muted-foreground">
          California, Colorado, and others treat a GPC header as a valid opt-out. Marketing
          cookies stay blocked.
        </p>
      </div>
      <pre
        className="mt-4 overflow-hidden rounded-xl bg-[#0F1A1D] px-4 py-3.5 font-mono text-xs leading-[1.6] text-[#B6E3EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        aria-label="GPC request header"
      >
        {`Sec-GPC: 1
→ sale/share: denied
→ marketing scripts: blocked`}
      </pre>
    </article>
  )
}

function GeoCard() {
  const cardRef = useRef<HTMLElement | null>(null)
  const [stop, setStop] = useState({ label: 'California · CCPA', action: 'Do Not Sell' })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const stops = [
      { label: 'California · CCPA', action: 'Do Not Sell' },
      { label: 'Virginia · VCDPA', action: 'Opt out of ads' },
      { label: 'Colorado · CPA', action: 'Honor GPC' },
      { label: 'Texas · TDPSA', action: 'Opt out of sale' },
    ]
    let i = 0
    let timer: ReturnType<typeof setInterval> | null = null
    const tick = () => {
      setStop(stops[i])
      i = (i + 1) % stops.length
    }
    const start = () => {
      if (timer) return
      tick()
      timer = setInterval(tick, 1800)
    }
    const halt = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : halt()))
      },
      { threshold: 0.3 },
    )
    io.observe(card)
    return () => {
      halt()
      io.disconnect()
    }
  }, [])

  return (
    <article ref={cardRef} className={`${baseCard} md:col-span-2`}>
      <div>
        <CardEyebrow>Geo-targeting</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Right banner,
          <br />
          right state.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          California sees CCPA. Virginia sees targeted-ads opt-out. One snippet.
        </p>
      </div>
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-border bg-secondary px-3 py-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
            Visitor detected
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{stop.label}</p>
          <span className="mt-2 inline-flex rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
            {stop.action}
          </span>
        </div>
      </div>
    </article>
  )
}

function OptOutCard() {
  return (
    <article className={`${baseCard} md:col-span-2`}>
      <div>
        <CardEyebrow>US vs GDPR</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Opt-out, not opt-in.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          US state laws do not copy GDPR. We rewrite copy and defaults when you switch frameworks.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-4">
        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/8 px-3 py-2">
          <span className="text-xs font-semibold text-foreground">US · CCPA</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-primary">
            Opt-out
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">EU · GDPR</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Opt-in
          </span>
        </div>
      </div>
    </article>
  )
}

function LogsCard() {
  const rows = [
    { t: '14:02:11', a: 'GPC honor', r: 'CA' },
    { t: '14:01:48', a: 'Do Not Sell', r: 'CA' },
    { t: '13:58:02', a: 'Opt out ads', r: 'VA' },
  ]
  return (
    <article className={`${baseCard} md:col-span-2`}>
      <div>
        <CardEyebrow>Consent records</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Logs you own.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every opt-out, exportable. No lock-in if an attorney general asks.
        </p>
      </div>
      <div className="mt-auto space-y-1.5 pt-4 font-mono text-[11px]">
        {rows.map((row) => (
          <div
            key={row.t}
            className="flex items-center justify-between rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground"
          >
            <span>{row.t}</span>
            <span className="text-foreground">{row.a}</span>
            <span className="text-primary">{row.r}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function PerformanceCard() {
  const ref = useRef<HTMLElement | null>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const card = ref.current
    if (!card) return
    let started = false
    const animate = () => {
      if (started) return
      started = true
      const target = 9.3
      const dur = 1400
      const t0 = performance.now()
      const ease = (t: number) => 1 - Math.pow(1 - t, 3)
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / dur)
        setN(target * ease(t))
        if (t < 1) requestAnimationFrame(step)
        else setN(target)
      }
      requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate()
            io.unobserve(card)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(card)
    return () => io.disconnect()
  }, [])

  return (
    <article ref={ref} className={`${baseCard} md:col-span-2`}>
      <div>
        <CardEyebrow>Performance</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Under 10 KB,
          <br />
          loads async.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Zero impact on Core Web Vitals. Scripts gated by consent.
        </p>
      </div>
      <div className="mt-auto flex items-baseline gap-1 pt-2 font-heading text-[64px] font-bold leading-none tracking-[-0.04em] text-foreground">
        <span>{n.toFixed(1)}</span>
        <span className="text-xl font-medium text-muted-foreground">kb</span>
      </div>
    </article>
  )
}
