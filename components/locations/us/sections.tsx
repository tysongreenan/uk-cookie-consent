import Link from 'next/link'
import { Link2, SlidersHorizontal, Code } from 'lucide-react'
import { Comparison2 } from '@/components/ui/comparison-2'
import { HowItWorks1 } from '@/components/ui/how-it-works-1'

export function UsCompare() {
  return (
    <Comparison2
      title="CCPA is not GDPR with a California filter."
      lede="Shipping a European consent wall to US traffic both over-blocks ads and still misses the link California actually requires."
      left={{
        title: 'This banner (US / CCPA)',
        badge: 'Recommended',
        description: 'Opt-out, Do Not Sell, GPC, and geo-targeting — the actual US rules.',
        points: [
          'Opt-out model (opt-in only for kids 13–15 on sale/sharing)',
          '“Do Not Sell or Share My Personal Information” built in',
          'Honors Global Privacy Control / universal opt-out',
          'Geo-detects California and other state visitors',
          'Free plan, no signup wall before you preview',
          'Pro is $99 once — not $10–30/mo per domain',
          'Consent logs you own and can export',
        ],
        ctaLabel: 'Build my US banner — free',
        ctaHref: '/builder',
      }}
      right={{
        title: 'A GDPR banner on a US site',
        description: 'The default Cookiebot / OneTrust layout most US stores copy-paste.',
        points: [
          'Prior opt-in wall that over-blocks US advertising',
          'No California “Do Not Sell” control',
          'Ignores GPC / browser opt-out signals',
          'Same copy for California, Texas, and the EU',
          'Signup or sales call before you can try it',
          'Per-domain monthly pricing',
          'Audit trail locked in their dashboard',
        ],
        ctaLabel: 'Read the CCPA guide',
        ctaHref: '/blog/ccpa-cpra-cookie-compliance-guide',
      }}
    />
  )
}

export function UsHowItWorks() {
  return (
    <HowItWorks1
      title="Five minutes. Not a privacy program."
      lede="Paste a URL, check the US defaults, drop in one snippet."
      steps={[
        {
          number: '01',
          icon: Link2,
          title: 'Paste your URL',
          copy: 'We scan the site, pick the CCPA template, and fill in cookie categories. About a minute.',
        },
        {
          number: '02',
          icon: SlidersHorizontal,
          title: 'Check the US defaults',
          copy: '“Do Not Sell,” GPC, and geo-targeting are already on. Tweak colours so it looks like your brand.',
        },
        {
          number: '03',
          icon: Code,
          title: 'Paste one snippet',
          copy: 'WordPress, Shopify, Webflow, Wix, or raw HTML. Tracking scripts stay blocked until the visitor chooses.',
        },
      ]}
    />
  )
}

const STATE_ROWS = [
  {
    name: 'California — CCPA / CPRA',
    meta: 'Jan 2020 · CPRA Jan 2023',
    body: 'Right to know, delete, correct, and opt out of sale and sharing. Honor GPC. “Do Not Sell or Share My Personal Information” must be obvious. CPPA and the Attorney General enforce; consumers can sue after certain data breaches ($100–$750 statutory damages).',
  },
  {
    name: 'Virginia — VCDPA',
    meta: 'Jan 1, 2023',
    body: 'Access, deletion, portability, and opt-out of targeted advertising and profiling. Data protection assessments for high-risk processing. Cookie implication: targeted-ads opt-out, not a GDPR-style wall.',
  },
  {
    name: 'Colorado — CPA',
    meta: 'Jul 1, 2023',
    body: 'Same consumer rights plus a Universal Opt-Out Mechanism. A GPC-enabled browser is an opt-out of sale and targeted advertising. This is the state that made browser signals non-optional.',
  },
  {
    name: 'Connecticut — CTDPA',
    meta: 'Jul 1, 2023',
    body: 'Access, correction, deletion, portability, opt-out of targeted advertising. Privacy by design and data minimization. Cookie notices must describe purposes in plain language.',
  },
  {
    name: 'Texas — TDPSA',
    meta: 'Jul 1, 2024',
    body: 'No CCPA-style revenue threshold for most controllers. Opt-out of sale and targeted advertising. If you have a US audience at all, Texas is often in scope before California is.',
  },
  {
    name: 'Oregon, Utah, Iowa, Indiana, Montana, Tennessee +',
    meta: '2023–2026 effective dates',
    body: 'A Virginia-family of statutes: consumer rights and targeted-advertising opt-out, with local twists on assessments and definitions. The map above lists each one. New bills keep landing — the banner is built so adding a state is a copy and a toggle, not a rebuild.',
  },
] as const

export function UsStateLaws() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-3xl">
          <h2 className="font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[52px]">
            State privacy laws, without the encyclopedia.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            The cookie-relevant bits. For the California deep dive see the{' '}
            <Link
              href="/blog/ccpa-cpra-cookie-compliance-guide"
              className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              CCPA / CPRA guide
            </Link>{' '}
            or{' '}
            <Link
              href="/compliance/ccpa"
              className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
            >
              /compliance/ccpa
            </Link>
            .
          </p>
        </div>

        <div className="divide-y divide-border rounded-[20px] border border-border">
          {STATE_ROWS.map((row) => (
            <article key={row.name} className="grid gap-3 px-6 py-7 md:grid-cols-[280px_1fr] md:gap-10">
              <div>
                <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {row.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{row.meta}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{row.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] border border-border bg-secondary px-6 py-6">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-foreground">
            Federal rules that still sit on top
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">COPPA</strong> if the site is
            directed at children under 13 — parental consent, not a state opt-out.{' '}
            <strong className="font-medium text-foreground">HIPAA</strong> and{' '}
            <strong className="font-medium text-foreground">GLBA</strong> for health and
            financial entities.{' '}
            <strong className="font-medium text-foreground">FERPA</strong> for education
            records. The banner covers the cookie layer; it does not replace a BA agreement
            or a GLBA privacy notice.
          </p>
        </div>
      </div>
    </section>
  )
}
