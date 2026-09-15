'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PreviewSwitchHero, type PreviewTab } from '@/components/ui/preview-switch-hero'
import { Globe, STATE_COORDS } from '@/components/ui/globe'
import {
  bannerFor,
  FEATURED_CODES,
  LAW_STATES,
  lawFor,
  US_DEFAULT_BANNER,
  type BannerPreview,
} from './data'

export function UsExperience() {
  const [selected, setSelected] = useState<string>('CA')

  const choose = (code: string) => setSelected(code)
  const banner = bannerFor(selected)
  const law = lawFor(selected)

  return (
    <>
      <UsHero onChoose={choose} />
      <UsPatchwork selected={selected} law={law} banner={banner} onChoose={choose} />
    </>
  )
}

function BannerPanel({ code, banner }: { code: string; banner: BannerPreview }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-background shadow-[0_2px_0_rgba(20,30,35,0.02),0_24px_48px_-16px_rgba(14,118,140,0.22)]">
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8A0A0]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8D48A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#A8D4B8]" />
        <span className="ml-3 flex-1 truncate rounded-full bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
          yoursite.com
        </span>
      </div>
      <div className="relative h-[280px] bg-[linear-gradient(180deg,#FAFAF5_0%,#FFFFFF_55%)] sm:h-[320px]">
        <div className="pointer-events-none absolute inset-x-8 top-8 space-y-3 opacity-50">
          <div className="h-3 w-1/3 rounded-full bg-foreground/10" />
          <div className="h-3 w-2/3 rounded-full bg-foreground/8" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="h-14 rounded-xl bg-foreground/5" />
            <div className="h-14 rounded-xl bg-foreground/5" />
            <div className="h-14 rounded-xl bg-foreground/5" />
          </div>
        </div>
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
          <div className="rounded-2xl border border-border bg-background p-4 shadow-[0_12px_28px_-12px_rgba(14,118,140,0.28)]">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                {banner.law}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">{code}</span>
            </div>
            <p className="text-[14px] font-semibold tracking-[-0.01em] text-foreground">{banner.title}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{banner.message}</p>
            <div className="mt-3 flex gap-2">
              <span className="flex-1 rounded-lg bg-primary px-3 py-2 text-center text-[12px] font-semibold text-primary-foreground">
                {banner.accept}
              </span>
              <span className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-[12px] font-semibold text-foreground">
                {banner.reject}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UsHero({ onChoose }: { onChoose: (code: string) => void }) {
  const router = useRouter()

  const tabs: PreviewTab[] = useMemo(
    () =>
      FEATURED_CODES.map((code) => ({
        id: code,
        label: LAW_STATES[code]?.name ?? code,
        media: <BannerPanel code={code} banner={bannerFor(code)} />,
      })),
    [],
  )

  return (
    <div className="relative overflow-hidden bg-muted/40">
      <FloatingShapes />
      <PreviewSwitchHero
        className="relative z-10 bg-transparent"
        disableScroll
        badge={{ tag: 'US', label: 'CCPA · CPRA · 19 state laws' }}
        title={
          <>
            US Cookie Consent.{' '}
            <span className="relative inline px-1 [background:linear-gradient(180deg,transparent_62%,#FFE9A8_62%,#FFE9A8_92%,transparent_92%)]">
              CCPA
            </span>{' '}
            plus the <span className="text-primary">state patchwork.</span>
          </>
        }
        description="One banner for CCPA, CPRA, VCDPA, CPA, CTDPA and the rest of the US map. “Do Not Sell” built in. GPC honored. Geo-detects the visitor. Free plan — Pro from $99 once."
        showEmail
        emailLabel="Your website"
        emailPlaceholder="yourdomain.com"
        inputType="text"
        inputMode="url"
        inputName="url"
        onSubmit={(value) => {
          if (!value) return
          let normalized = value.trim()
          if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
            normalized = `https://${normalized}`
          }
          onChoose(FEATURED_CODES[0])
          router.push(`/builder?url=${encodeURIComponent(normalized)}`)
        }}
        primaryCta={{ label: 'Build my US banner — free' }}
        socialProof="No signup · no credit card · CCPA “Do Not Sell” included"
        tabs={tabs}
        onTabChange={onChoose}
      />
    </div>
  )
}

function UsPatchwork({
  selected,
  law,
  banner,
  onChoose,
}: {
  selected: string
  law: ReturnType<typeof lawFor>
  banner: BannerPreview
  onChoose: (code: string) => void
}) {
  const covered = Object.keys(LAW_STATES).length
  const detail = law ?? {
    name: selected,
    law: US_DEFAULT_BANNER.law,
    summary:
      'No comprehensive consumer privacy statute in force yet. California visitors to this site still receive CCPA opt-out rights via geo-targeting.',
    cookie:
      'Ship CCPA as the US default. When a visitor arrives from a state with its own law, the banner switches copy and opt-out behaviour.',
    effective: undefined,
    banner,
  }

  return (
    <section id="us-globe" className="scroll-mt-24 bg-background py-20 lg:py-24" aria-labelledby="us-patchwork-heading">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2
            id="us-patchwork-heading"
            className="max-w-3xl font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[52px]"
          >
            The United States is not one privacy law.
          </h2>
          <p className="max-w-[380px] text-base leading-relaxed text-muted-foreground">
            {covered} comprehensive state statutes and counting. Pick a state — the globe
            looks at it and we show the cookie rules that apply.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[420px]">
            <Globe className="max-w-none" focus={STATE_COORDS[selected]} />
          </div>

          <div>
            <div className="mb-4 flex flex-wrap gap-2" role="list">
              {Object.values(LAW_STATES).map((s) => {
                const active = selected === s.code
                return (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => onChoose(s.code)}
                    aria-pressed={active}
                    className={`min-h-11 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {s.code} · {s.law}
                  </button>
                )
              })}
            </div>
          <aside className="rounded-[20px] border border-border bg-secondary p-7">
            <p className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-primary">
              {selected} · {detail.law}
            </p>
            <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
              {detail.name}
            </h3>
            {detail.effective ? (
              <p className="mt-1 text-sm text-muted-foreground">Effective {detail.effective}</p>
            ) : null}
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">{detail.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">For cookies. </span>
              {detail.cookie}
            </p>
            <Link
              href="/builder"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-[hsl(var(--primary-hover))]"
            >
              Use this as my default
            </Link>
          </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingShapes() {
  const reduceMotion = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Shape
        delay={0.15}
        width={520}
        height={130}
        rotate={12}
        className="left-[-12%] top-[12%]"
        gradient="from-primary/20"
        reduceMotion={!!reduceMotion}
      />
      <Shape
        delay={0.35}
        width={420}
        height={110}
        rotate={-14}
        className="right-[-8%] top-[62%]"
        gradient="from-[hsl(var(--accent-warm)/0.18)]"
        reduceMotion={!!reduceMotion}
      />
      <Shape
        delay={0.5}
        width={180}
        height={52}
        rotate={18}
        className="right-[18%] top-[8%]"
        gradient="from-primary/12"
        reduceMotion={!!reduceMotion}
      />
    </div>
  )
}

function Shape({
  className,
  delay,
  width,
  height,
  rotate,
  gradient,
  reduceMotion,
}: {
  className: string
  delay: number
  width: number
  height: number
  rotate: number
  gradient: string
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -80, rotate: rotate - 12 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 1.8, delay, ease: [0.23, 0.86, 0.39, 0.96] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width, height }}
        className={`rounded-full bg-gradient-to-r to-transparent ${gradient} border border-primary/10 blur-[0.5px]`}
      />
    </motion.div>
  )
}
