import { SectionHead } from './section-head'

type Cell =
  | { kind: 'check'; text: string }
  | { kind: 'x'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'price'; text: string }

const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: 'Free plan',
    cells: [
      { kind: 'check', text: 'Yes' },
      { kind: 'check', text: 'Yes' },
      { kind: 'x', text: 'No' },
      { kind: 'check', text: 'Yes' },
    ],
  },
  {
    label: 'No name on banner',
    cells: [
      { kind: 'check', text: '$99 once' },
      { kind: 'text', text: 'Paid' },
      { kind: 'text', text: 'Enterprise' },
      { kind: 'text', text: 'Paid' },
    ],
  },
  {
    label: 'No account needed',
    cells: [
      { kind: 'check', text: 'Yes' },
      { kind: 'x', text: 'No' },
      { kind: 'x', text: 'Sales call' },
      { kind: 'x', text: 'No' },
    ],
  },
  {
    label: 'Price',
    cells: [
      { kind: 'price', text: '$99 once' },
      { kind: 'price', text: '$11/mo per site' },
      { kind: 'price', text: '$30+/mo' },
      { kind: 'price', text: '$10/mo per site' },
    ],
  },
  {
    label: '5 years, 1 site',
    cells: [
      { kind: 'price', text: '$99' },
      { kind: 'price', text: '$660' },
      { kind: 'price', text: '$1,800+' },
      { kind: 'price', text: '$600' },
    ],
  },
  {
    label: 'Extra sites',
    cells: [
      { kind: 'check', text: 'Included' },
      { kind: 'x', text: 'Extra' },
      { kind: 'x', text: 'Extra' },
      { kind: 'x', text: 'Extra' },
    ],
  },
  {
    label: 'Install time',
    cells: [
      { kind: 'check', text: '5 min' },
      { kind: 'text', text: '30 min' },
      { kind: 'text', text: 'Days' },
      { kind: 'text', text: '20 min' },
    ],
  },
]

const DIFFERENT_LEFT = [
  ['PIPEDA, CASL, Law 25.', 'Included.'],
  ['English and French.', 'Plus 14 languages.'],
  ['WordPress, Shopify, and more.', 'Webflow, Squarespace, Wix.'],
] as const

const DIFFERENT_RIGHT = [
  ['About 9 KB.', 'Loads in the background.'],
  ['Same-day support.', 'Free and Pro.'],
  ['Consent records.', 'Download anytime.'],
] as const

export function ComparisonSection() {
  return (
    <section
      id="compare"
      className="border-y border-border bg-secondary py-20 lg:py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Compare"
          title={<>$99 once.<br />They bill every month.</>}
          lede="They charge every month, per website. We charge $99 once."
        />

        <div className="overflow-x-auto rounded-[20px] border border-border bg-background shadow-md">
          <div className="min-w-[760px]">
            {/* Header */}
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] border-b border-border bg-muted/40">
              <div className="px-5 py-5" />
              <div className="flex items-center gap-2 px-5 py-5 text-xs font-semibold uppercase tracking-[0.06em] text-primary">
                cookie-banner.ca
                <span className="rotate-[2deg] rounded bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.12em] text-primary-foreground">
                  US
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
          Prices from April 2026. Check their sites.
        </p>

        {/* What's different strip */}
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 rounded-[18px] border border-border bg-muted/40 p-7 lg:grid-cols-2 lg:px-8">
          <h3 className="col-span-full border-b border-border pb-2 font-heading text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
            Also
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
