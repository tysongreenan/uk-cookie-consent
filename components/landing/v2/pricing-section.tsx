import Link from 'next/link'
import { SectionHead } from './section-head'

type PriceCard = {
  tier: string
  price: string
  unit?: string
  desc: string
  features: { text: string; muted?: boolean; emphasized?: boolean }[]
  ctaLabel: string
  ctaHref: string
  recommended?: boolean
  enterprise?: boolean
}

const CARDS: PriceCard[] = [
  {
    tier: 'Free',
    price: '$0',
    unit: 'forever',
    desc: 'Everything most small sites need, with a small "powered by" badge.',
    features: [
      { text: '1 banner' },
      { text: '7 layouts' },
      { text: 'PIPEDA · Law 25 · GDPR · CCPA' },
      { text: 'EN / FR + 14 languages' },
      { text: 'Copy-paste install' },
      { text: '"Powered by" badge', muted: true },
      { text: 'Standard support', muted: true },
    ],
    ctaLabel: 'Start free',
    ctaHref: '/builder',
  },
  {
    tier: 'Pro · One-time',
    price: '$99',
    unit: 'once',
    desc: "Lock in today's features forever. Security patches, no new features.",
    features: [
      { text: '14 layouts' },
      { text: 'Unlimited banners & domains' },
      { text: 'No "powered by" badge' },
      { text: 'Consent analytics' },
      { text: 'Geo-targeting' },
      { text: 'Team seats (up to 5)' },
      { text: 'Security patches forever' },
    ],
    ctaLabel: 'Buy once · $99',
    ctaHref: '/pricing',
  },
  {
    tier: 'Pro · Annual',
    price: '$99',
    unit: '/ year',
    desc: 'Pro + every new feature we ship. Cancel anytime.',
    features: [
      { text: 'Everything in Pro', emphasized: true },
      { text: 'Consent logs (audit trail)' },
      { text: 'Auto categorization (AI)' },
      { text: 'A/B testing on banners' },
      { text: 'IAB TCF 2.2' },
      { text: 'Privacy policy generator' },
      { text: 'Google CMP certified' },
      { text: 'Every future feature' },
    ],
    ctaLabel: 'Get Pro Annual',
    ctaHref: '/pricing',
    recommended: true,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    desc: 'For agencies & teams managing 100+ domains, with SSO & an SLA.',
    features: [
      { text: 'Everything in Pro Annual' },
      { text: 'SSO (SAML / OIDC)' },
      { text: 'Dedicated support' },
      { text: 'Custom DPA & SLA' },
      { text: 'White-label option' },
      { text: 'Onboarding assistance' },
    ],
    ctaLabel: 'Talk to sales',
    ctaHref: '/contact',
    enterprise: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="overflow-visible bg-background py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Pricing"
          title={<>Free forever.<br />Pro is $99 — your call how.</>}
          lede="Pick once. No seats, no per-domain math, no enterprise sales unless you actually need it."
        />

        <div className="grid grid-cols-1 items-stretch gap-5 overflow-visible pt-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <PriceCardItem key={card.tier} card={card} />
          ))}
        </div>

        <p className="mt-9 text-center text-sm text-muted-foreground">
          All plans include{' '}
          <strong className="font-semibold text-foreground">
            PIPEDA, Law 25, GDPR &amp; CCPA
          </strong>{' '}
          compliance. 30-day money-back guarantee on Pro plans.
        </p>
      </div>
    </section>
  )
}

function PriceCardItem({ card }: { card: PriceCard }) {
  const enterprise = card.enterprise
  const recommended = card.recommended

  const cardClass = enterprise
    ? 'bg-foreground text-background border-foreground'
    : recommended
      ? 'border-primary [background:linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--primary)/0.05)_100%)] shadow-[0_24px_60px_-20px_rgba(14,118,140,0.18),0_8px_18px_-6px_rgba(20,30,35,0.10)] -translate-y-3'
      : 'bg-background border-border'

  return (
    <article
      className={`relative flex flex-col rounded-[20px] border p-7 transition-all hover:-translate-y-0.5 hover:shadow-md ${cardClass}`}
    >
      {recommended ? (
        <span className="absolute -top-3.5 right-6 z-10 rotate-[2deg] rounded-full bg-[hsl(var(--accent-warm))] px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[hsl(var(--accent-warm-foreground))] shadow-[0_4px_12px_-2px_rgba(232,85,58,0.4)]">
          Recommended
        </span>
      ) : null}
      <span
        className={`text-sm font-semibold uppercase tracking-[0.04em] ${
          enterprise ? 'text-background/60' : recommended ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {card.tier}
      </span>
      <div className="mt-3.5 flex flex-wrap items-baseline gap-1.5">
        <span
          className={`font-heading font-bold leading-none tracking-[-0.04em] ${
            enterprise ? 'text-3xl text-background' : recommended ? 'text-[52px] text-primary' : 'text-[52px] text-foreground'
          }`}
        >
          {card.price}
        </span>
        {card.unit ? (
          <span
            className={`whitespace-nowrap text-[13.5px] ${enterprise ? 'text-background/70' : 'text-muted-foreground'}`}
          >
            {card.unit}
          </span>
        ) : null}
      </div>
      <p
        className={`mt-1.5 min-h-[42px] text-sm ${
          enterprise ? 'text-background/70' : 'text-muted-foreground'
        }`}
      >
        {card.desc}
      </p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5 text-[13.5px] leading-snug">
        {card.features.map((f) => (
          <li
            key={f.text}
            className={`flex items-start gap-2 ${
              f.muted
                ? enterprise
                  ? 'text-background/55'
                  : 'text-muted-foreground'
                : enterprise
                  ? 'text-background/85'
                  : 'text-foreground/85'
            }`}
          >
            <span
              className={`flex-none font-bold ${
                f.muted
                  ? 'text-muted-foreground'
                  : enterprise
                    ? 'text-[#6FCDDC]'
                    : 'text-primary'
              }`}
            >
              {f.muted ? '–' : '✓'}
            </span>
            {f.emphasized ? (
              <strong className={`font-semibold ${enterprise ? 'text-background' : 'text-foreground'}`}>
                {f.text}
              </strong>
            ) : (
              <span>{f.text}</span>
            )}
          </li>
        ))}
      </ul>

      <Link
        href={card.ctaHref}
        className={`mt-6 inline-flex h-[52px] w-full items-center justify-center rounded-[12px] px-5 text-[15.5px] font-semibold transition-colors ${
          enterprise
            ? 'bg-background text-foreground hover:bg-background/90'
            : recommended
              ? 'bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))]'
              : 'border border-border bg-background text-foreground hover:bg-secondary'
        }`}
      >
        {card.ctaLabel}
      </Link>
    </article>
  )
}
