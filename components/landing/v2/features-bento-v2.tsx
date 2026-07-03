'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHead } from './section-head'

export function FeaturesBentoV2() {
  return (
    <section id="features" className="bg-background py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Everything in the box"
          title={<>The boring stuff,<br />handled.</>}
          lede="Compliance, performance, accessibility, audit trails. The kind of thing nobody wants to think about — until they get a letter from a regulator."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:[grid-auto-rows:minmax(260px,auto)]">
          <ComplianceCard />
          <CodeCard />
          <ConsentAnalyticsCard />
          <GeoCard />
          <LanguagePillsCard />
          <PerformanceCard />
        </div>
      </div>
    </section>
  )
}

const baseCard =
  'group relative flex flex-col overflow-hidden rounded-[20px] border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'

function CardEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-primary">
      {children}
    </span>
  )
}

/* -------- 1. Compliance: orbit / battle scene -------- */
function ComplianceCard() {
  return (
    <article
      className={`${baseCard} md:col-span-3 md:row-span-2 md:p-9`}
    >
      <div>
        <CardEyebrow>Compliance</CardEyebrow>
        <h3 className="mt-2 max-w-[380px] font-heading text-2xl font-semibold leading-[1.18] tracking-[-0.02em] text-foreground sm:text-3xl">
          Four privacy laws.
          <br />
          One toggle each.
        </h3>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-muted-foreground">
          Switch frameworks per banner. We rewrite the legal copy, set the right consent expiry, and adjust opt-in/opt-out behaviour automatically.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-5 flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-xl
          [background:radial-gradient(circle_at_50%_50%,rgba(11,107,84,0.06)_0%,transparent_65%),repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_40px,rgba(11,107,84,0.05)_40px,rgba(11,107,84,0.05)_41px)]"
      >
        {/* Attacks */}
        <Attack className="left-[-8px] top-[-8px]" anim="tl">Regulator letter</Attack>
        <Attack className="right-[-8px] top-[-8px]" anim="tr">$50k fine</Attack>
        <Attack className="bottom-[-8px] left-[-8px]" anim="bl">Class action</Attack>
        <Attack className="bottom-[-8px] right-[-8px]" anim="br">Audit notice</Attack>

        <div className="relative flex h-[240px] w-[280px] items-center justify-center">
          {/* Rings */}
          <div className="cb-orbit-r2" />
          <div className="cb-orbit-r1" />

          {/* Core */}
          <div className="cb-core relative z-[5] flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background">
            <svg viewBox="0 0 127 76" className="h-auto w-11" aria-hidden="true">
              <defs>
                <linearGradient id="bcg" x1="0" y1="0" x2="127" y2="76" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#2D5660" />
                  <stop offset="1" stopColor="#0E768C" />
                </linearGradient>
              </defs>
              <g fill="url(#bcg)">
                <path d="M58.5377 76L0 48.3855V29.2971L58.5377 0V14.1395L7.76261 42.4045L4.4186 38.8837L7.76261 35.2781L58.5377 60.093V76Z" />
                <path d="M88.6582 29.1628L101.628 14.1395H114H126.658V29.1628L88.6582 29.1628Z" />
                <path d="M85.0493 0H62.0726V76H85.0493V0Z" />
                <path d="M86.6046 59.2093L99.5743 44.1861H111.946H124.605V59.2093L86.6046 59.2093Z" />
              </g>
            </svg>
          </div>

          <Shield className="left-1/2 top-[6px] -translate-x-1/2" delay="0s">PIPEDA</Shield>
          <Shield className="right-1 top-1/2 -translate-y-1/2" delay="0.8s">Law 25</Shield>
          <Shield className="bottom-[6px] left-1/2 -translate-x-1/2" delay="1.6s">GDPR</Shield>
          <Shield className="left-1 top-1/2 -translate-y-1/2" delay="2.4s">CCPA</Shield>
        </div>
      </div>
    </article>
  )
}

function Shield({
  className = '',
  delay,
  children,
}: {
  className?: string
  delay: string
  children: React.ReactNode
}) {
  return (
    <span
      className={`cb-shield absolute z-[6] inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-primary bg-background px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.04em] text-primary shadow-[0_3px_10px_rgba(14,118,140,0.15)] ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(36,150,99,0.18)]" />
      <strong className="font-bold">{children}</strong>
    </span>
  )
}

function Attack({
  className = '',
  anim,
  children,
}: {
  className?: string
  anim: 'tl' | 'tr' | 'bl' | 'br'
  children: React.ReactNode
}) {
  const animClass = {
    tl: 'cb-attack-tl',
    tr: 'cb-attack-tr',
    bl: 'cb-attack-bl',
    br: 'cb-attack-br',
  }[anim]

  return (
    <span
      className={`pointer-events-none absolute z-[4] whitespace-nowrap rounded border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-rose-700 opacity-0 ${animClass} ${className}`}
    >
      {children}
    </span>
  )
}

/* -------- 2. Code install snippet -------- */
function CodeCard() {
  return (
    <article className={`${baseCard} md:col-span-3`}>
      <div>
        <CardEyebrow>5-minute install</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          Paste one line. Done.
        </h3>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-muted-foreground">
          Drop the snippet before{' '}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">&lt;/body&gt;</code>. Works on WordPress, Shopify, Webflow, raw HTML.
        </p>
      </div>
      <pre
        className="mt-4 overflow-hidden rounded-xl bg-[#0F1A1D] px-4 py-3.5 font-mono text-xs leading-[1.6] text-[#B6E3EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        aria-label="Install snippet"
      >
{`<!-- cookie-banner.ca -->
<script async src="https://cdn.cookie-banner.ca/v2/banner.js" data-id="brk_8f2c"></script>`}
      </pre>
    </article>
  )
}

/* -------- 3. Consent analytics bars -------- */
function ConsentAnalyticsCard() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const bars = [
    { pct: 72.4, label: 'Accept all', win: false, fill: 72.4 },
    { pct: 14.1, label: 'Reject', win: false, fill: 14.1 },
    { pct: 13.5, label: 'Custom', win: true, fill: 13.5 },
  ]

  return (
    <article
      ref={ref}
      className={`${baseCard} md:col-span-3`}
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)' }}
    >
      <div>
        <CardEyebrow>Consent analytics</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          See what's working.
        </h3>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-muted-foreground">
          Live counts of accepts, rejects, and partial consents — broken down by region, device, and banner variant.
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        {bars.map((b) => (
          <div
            key={b.label}
            className={`relative flex-1 overflow-hidden rounded-lg p-2.5 text-xs ${
              b.win ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
            }`}
          >
            <strong
              className={`relative z-10 block text-lg font-bold ${b.win ? 'text-primary' : 'text-foreground'}`}
            >
              {b.pct}%
            </strong>
            <span className="relative z-10">{b.label}</span>
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-0 z-0 h-full transition-[width] duration-1000 ease-[cubic-bezier(.2,.8,.2,1)] ${
                b.win ? 'bg-primary/20' : 'bg-primary/10'
              }`}
              style={{ width: inView ? `${b.fill}%` : '0%' }}
            />
          </div>
        ))}
      </div>
    </article>
  )
}

/* -------- 4. Geo-targeting tour -------- */
function GeoCard() {
  const cardRef = useRef<HTMLElement | null>(null)
  const [stop, setStop] = useState({ left: '23%', top: '32%', text: 'Quebec · Law 25' })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const stops = [
      { left: '18%', top: '45%', text: 'California · CCPA', region: 'c-na' },
      { left: '23%', top: '32%', text: 'Quebec · Law 25', region: 'c-na' },
      { left: '52%', top: '32%', text: 'Germany · GDPR', region: 'c-eu' },
      { left: '74%', top: '36%', text: 'Japan · APPI', region: 'c-as' },
    ]
    let i = 0
    let timer: ReturnType<typeof setInterval> | null = null
    const tick = () => {
      const s = stops[i]
      setStop({ left: s.left, top: s.top, text: s.text })
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
      { threshold: 0.3 }
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
          right region.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Show GDPR in the EU, CCPA in California, Law 25 in Quebec — automatically.
        </p>
      </div>

      <div aria-hidden="true" className="relative mt-auto pt-3.5">
        <img src="/world-simple.svg" alt="" className="block h-auto w-full opacity-20" />
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          className="pointer-events-none absolute drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[left,top] duration-1000 ease-[cubic-bezier(.4,.1,.3,1)]"
          style={{ left: stop.left, top: stop.top, transform: 'translate(-2px,-2px)' }}
        >
          <path d="M1 1 L1 14 L4.5 11 L7 16 L9 15 L6.5 10 L11 10 Z" fill="#fff" stroke="#0F1B17" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span
          className="pointer-events-none absolute whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.04em] text-background transition-[left,top,opacity] duration-1000 ease-[cubic-bezier(.4,.1,.3,1)]"
          style={{ left: stop.left, top: stop.top, transform: 'translate(8px, 8px)' }}
        >
          {stop.text}
        </span>
      </div>
    </article>
  )
}

/* -------- 5. Languages -------- */
function LanguagePillsCard() {
  const codes = ['EN', 'FR', 'ES', 'DE', 'IT', 'PT', 'NL', 'PL', 'SV', 'DA', 'FI', 'JA', 'ZH', 'KO', 'AR', 'HE']
  return (
    <article className={`${baseCard} md:col-span-2`}>
      <div>
        <CardEyebrow>Bilingual + 14 more</CardEyebrow>
        <h3 className="mt-2 font-heading text-[22px] font-semibold leading-[1.18] tracking-[-0.02em] text-foreground">
          EN, FR, plus 14 languages.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Required by Law 25. Auto-detects browser locale.
        </p>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {codes.map((c) => {
          const on = c === 'EN' || c === 'FR'
          return (
            <span
              key={c}
              className={`rounded-full border px-2.5 py-1 text-xs ${
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-secondary text-foreground'
              }`}
            >
              {c}
            </span>
          )
        })}
      </div>
    </article>
  )
}

/* -------- 6. Performance counter -------- */
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
      { threshold: 0.4 }
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
          Zero impact on Core Web Vitals. Deferred analytics. Scripts gated by consent.
        </p>
      </div>
      <div className="mt-auto flex items-baseline gap-1 pt-2 font-heading text-[64px] font-bold leading-none tracking-[-0.04em] text-foreground">
        <span>{n.toFixed(1)}</span>
        <span className="text-xl font-medium text-muted-foreground">kb</span>
      </div>
    </article>
  )
}
