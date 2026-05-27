import { SectionHead } from './section-head'

type Cell =
  | { kind: 'check'; text: string }
  | { kind: 'x'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'price'; text: string }

const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: 'Free tier with no watermark',
    cells: [
      { kind: 'check', text: 'Yes' },
      { kind: 'x', text: 'Watermarked' },
      { kind: 'x', text: 'No free tier' },
      { kind: 'x', text: 'Watermarked' },
    ],
  },
  {
    label: 'Configure before signup',
    cells: [
      { kind: 'check', text: 'In-page builder' },
      { kind: 'x', text: 'Trial signup' },
      { kind: 'x', text: 'Sales call' },
      { kind: 'x', text: 'Account required' },
    ],
  },
  {
    label: 'Pro plan starting at',
    cells: [
      { kind: 'price', text: '$99 once' },
      { kind: 'price', text: '$11/mo per domain' },
      { kind: 'price', text: '$30+ /mo, custom' },
      { kind: 'price', text: '$10/mo per domain' },
    ],
  },
  {
    label: '5-year cost (1 site)',
    cells: [
      { kind: 'price', text: '$99' },
      { kind: 'price', text: '~$660' },
      { kind: 'price', text: '~$1,800+' },
      { kind: 'price', text: '~$600' },
    ],
  },
  {
    label: 'Unlimited domains',
    cells: [
      { kind: 'check', text: 'Yes (Pro)' },
      { kind: 'x', text: 'Per-domain pricing' },
      { kind: 'x', text: 'Per-domain pricing' },
      { kind: 'x', text: 'Per-domain pricing' },
    ],
  },
  {
    label: 'Setup time',
    cells: [
      { kind: 'check', text: '~5 min' },
      { kind: 'text', text: '~30 min' },
      { kind: 'text', text: 'Days, sales-led' },
      { kind: 'text', text: '~20 min' },
    ],
  },
]

const DIFFERENT_LEFT = [
  ['No subscription, ever.', 'One $99 charge replaces $40/month — no auto-renewal, no card on file.'],
  ['Unlimited domains on Pro.', 'Run it on every site you own without per-domain math.'],
  ['Canadian-first compliance.', 'PIPEDA + CASL + Quebec Law 25 are defaults, not bolt-ons.'],
  ['Bilingual EN/FR by default.', 'Plus 14 other languages with auto-detect.'],
] as const

const DIFFERENT_RIGHT = [
  ['9.3 KB, async, zero CWV impact.', "Won't slow your LCP or your sales pages."],
  ['No signup wall.', 'Build the banner first, decide later.'],
  ['Lifetime updates & same-day support', 'on every plan, free included.'],
  ['You own your consent logs.', 'Export the audit trail anytime — no lock-in.'],
] as const

export function ComparisonSection() {
  return (
    <section
      id="compare"
      className="border-y border-border bg-secondary py-20 lg:py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="The honest comparison"
          title={<>$99 once. Or $40<br />every month, forever.</>}
          lede="Most CMPs charge a monthly subscription per domain. We charge once. Here's the receipt."
        />

        <div className="overflow-x-auto rounded-[20px] border border-border bg-background shadow-md">
          <div className="min-w-[760px]">
            {/* Header */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-b border-border bg-muted/40">
              <div className="px-5 py-5" />
              <div className="flex items-center gap-2 px-5 py-5 text-xs font-semibold uppercase tracking-[0.06em] text-primary">
                cookie-banner.ca
                <span className="rotate-[2deg] rounded bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.12em] text-primary-foreground">
                  YOU
                </span>
              </div>
              <div className="px-5 py-5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                Cookiebot
              </div>
              <div className="px-5 py-5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                OneTrust
              </div>
              <div className="px-5 py-5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                CookieYes
              </div>
            </div>

            {ROWS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-b border-border last:border-0"
              >
                <div className="px-5 py-4 text-[14.5px] font-medium text-foreground">{row.label}</div>
                {row.cells.map((cell, i) => (
                  <div
                    key={i}
                    className={`px-5 py-4 text-[14.5px] ${
                      i === 0
                        ? 'bg-primary/5 font-semibold text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {renderCell(cell, i === 0)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[12.5px] text-muted-foreground">
          Pricing as of Apr 2026, public list prices. Comparison is our reading of public pages — verify before switching.
        </p>

        {/* What's different strip */}
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 rounded-[18px] border border-border bg-muted/40 p-7 lg:grid-cols-2 lg:px-8">
          <h3 className="col-span-full border-b border-border pb-2 font-heading text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
            And the things a price table can't show.
          </h3>
          <ul className="flex flex-col gap-2.5">
            {DIFFERENT_LEFT.map(([head, rest]) => (
              <li
                key={head}
                className="relative pl-6 text-[14.5px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-0 before:font-bold before:text-primary before:content-['✓']"
              >
                <strong className="font-semibold text-foreground">{head}</strong> {rest}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2.5">
            {DIFFERENT_RIGHT.map(([head, rest]) => (
              <li
                key={head}
                className="relative pl-6 text-[14.5px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-0 before:font-bold before:text-primary before:content-['✓']"
              >
                <strong className="font-semibold text-foreground">{head}</strong> {rest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function renderCell(cell: Cell, isUs: boolean) {
  if (cell.kind === 'check') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className={isUs ? 'text-primary' : 'text-emerald-600'}>●</span>
        {cell.text}
      </span>
    )
  }
  if (cell.kind === 'x') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-rose-600/55">○</span>
        {cell.text}
      </span>
    )
  }
  if (cell.kind === 'price') {
    return <span className="font-mono text-[13.5px]">{cell.text}</span>
  }
  return <span>{cell.text}</span>
}
