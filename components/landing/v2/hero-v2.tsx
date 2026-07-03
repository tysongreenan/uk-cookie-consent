'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroV2() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    setSubmitting(true)
    let normalized = url.trim()
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = `https://${normalized}`
    }
    router.push(`/builder?url=${encodeURIComponent(normalized)}`)
  }

  return (
    <section className="relative overflow-hidden bg-muted/40 py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + form */}
          <div>
            <h1 className="mt-5 font-heading text-5xl font-bold leading-[0.96] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[76px]">
              <span>Free Cookie Banner</span>
              <br />
              <span className="relative inline-block whitespace-nowrap px-1 [background:linear-gradient(180deg,transparent_62%,#FFE9A8_62%,#FFE9A8_92%,transparent_92%)] dark:[background:linear-gradient(180deg,transparent_62%,rgba(255,233,168,0.35)_62%,rgba(255,233,168,0.35)_92%,transparent_92%)]">
                Generator
              </span>{' '}
              <span>for</span> <span className="text-primary">Canada.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Generate a{' '}
              <strong className="font-medium text-foreground">
                PIPEDA, Law&nbsp;25, GDPR &amp; CCPA compliant
              </strong>{' '}
              cookie consent banner in 5 minutes. Match your brand. Works on{' '}
              <Link href="/integrations/wordpress" className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">WordPress</Link>,{' '}
              <Link href="/integrations/shopify" className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">Shopify</Link>,{' '}
              <Link href="/integrations/webflow" className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">Webflow</Link>{' '}
              &amp; any platform. Free plan available — Pro for $99 one-time.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 flex max-w-xl gap-2 rounded-2xl border border-border bg-background p-2 shadow-md"
            >
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourdomain.com"
                aria-label="Your website"
                inputMode="url"
                className="flex-1 rounded-xl bg-transparent px-3.5 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                style={{ height: 52 }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 text-[15.5px] font-semibold text-primary-foreground transition-all hover:bg-[hsl(var(--primary-hover))] disabled:opacity-60"
              >
                {submitting ? 'Loading...' : 'Build my banner — free'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span><span className="mr-1 font-bold text-emerald-600">✓</span>No signup</span>
              <span><span className="mr-1 font-bold text-emerald-600">✓</span>No credit card</span>
              <span><span className="mr-1 font-bold text-emerald-600">✓</span>Copy-paste install</span>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-sm whitespace-nowrap">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Used by{' '}
              <strong className="font-semibold text-foreground">1,000+</strong> Canadian websites
            </div>
          </div>

          {/* Right: stacked banner stickers + cookie SVG */}
          <div className="relative h-[480px] lg:h-[540px]" aria-hidden="true">
            <Sticker
              className="absolute left-7 top-6 w-[280px] -rotate-3"
              tag="PIPEDA"
              tagClassName="bg-secondary text-muted-foreground"
              title="We use cookies"
              titleClassName="text-foreground"
              body="To analyze traffic and remember your preferences across visits."
              bodyClassName="text-muted-foreground"
              actions={[
                { label: 'Accept all', variant: 'primary' },
                { label: 'Reject', variant: 'outline' },
              ]}
            />
            <Sticker
              className="absolute right-4 top-[60px] z-[2] w-[260px] rotate-[4deg] bg-[#1F2937] dark:bg-[#1F2937]"
              tag="GDPR"
              tagClassName="bg-white/10 text-white/80"
              title="Privacy choices"
              titleClassName="text-white"
              body="Customize how this site uses cookies."
              bodyClassName="text-white/65"
              dark
              actions={[
                { label: 'Allow all', variant: 'coral' },
                { label: 'Manage', variant: 'outline-on-dark' },
              ]}
            />
            <Sticker
              className="absolute left-[70px] top-[240px] z-[3] w-[300px] rotate-2 bg-[#FDF6E9] dark:bg-[#FDF6E9]"
              tag="LAW 25"
              tagClassName="bg-[#F5E5C2] text-[#8B6A1A]"
              title="Nous utilisons des témoins"
              titleClassName="text-[#4A3414]"
              body="Pour personnaliser votre expérience sur ce site."
              bodyClassName="text-[#7A5C2A]"
              borderClassName="border-[#E8D7B0]"
              actions={[
                { label: 'Accepter', variant: 'dark' },
                { label: 'Refuser', variant: 'outline-warm' },
              ]}
            />
            <Sticker
              className="absolute right-10 top-[320px] w-[240px] -rotate-[5deg]"
              tag="CCPA"
              tagClassName="bg-secondary text-muted-foreground"
              title="Do Not Sell My Info"
              titleClassName="text-foreground"
              body="Manage how your data is shared with partners."
              bodyClassName="text-muted-foreground"
              actions={[
                { label: 'Got it', variant: 'primary' },
                { label: 'Settings', variant: 'outline' },
              ]}
            />

          </div>
        </div>
      </div>
    </section>
  )
}

type StickerAction = {
  label: string
  variant: 'primary' | 'outline' | 'dark' | 'coral' | 'outline-on-dark' | 'outline-warm'
}

function Sticker({
  className = '',
  tag,
  tagClassName,
  title,
  titleClassName,
  body,
  bodyClassName,
  borderClassName,
  dark,
  actions,
}: {
  className?: string
  tag: string
  tagClassName: string
  title: string
  titleClassName: string
  body: string
  bodyClassName: string
  borderClassName?: string
  dark?: boolean
  actions: StickerAction[]
}) {
  const buttonClasses: Record<StickerAction['variant'], string> = {
    primary: 'bg-primary text-primary-foreground',
    outline: `bg-transparent text-foreground border ${borderClassName ?? 'border-border'}`,
    'outline-on-dark': 'bg-transparent text-white border border-white/20',
    'outline-warm': 'bg-transparent text-[#4A3414] border border-[#E8D7B0]',
    dark: 'bg-[#1A1A1A] text-white',
    coral: 'bg-[hsl(var(--accent-warm))] text-[hsl(var(--accent-warm-foreground))]',
  }

  return (
    <div
      className={`rounded-[18px] border bg-background p-[18px] shadow-[0_2px_0_rgba(20,30,35,0.02),0_12px_28px_-12px_rgba(14,118,140,0.16)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1 ${
        borderClassName ?? 'border-border'
      } ${className}`}
    >
      <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${tagClassName}`}>
        {tag}
      </span>
      <div className={`mb-1 text-[13.5px] font-semibold tracking-[-0.01em] ${titleClassName}`}>{title}</div>
      <div className={`mb-3 text-[11.5px] leading-snug ${bodyClassName}`}>{body}</div>
      <div className="flex gap-1.5">
        {actions.map((a) => (
          <span
            key={a.label}
            className={`flex-1 rounded-lg px-3 py-1.5 text-center text-[11px] font-medium ${buttonClasses[a.variant]}`}
          >
            {a.label}
          </span>
        ))}
      </div>
    </div>
  )
}
