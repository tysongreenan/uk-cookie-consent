import { ReactNode } from 'react'

export function SectionEyebrow({ num, children }: { num?: string; children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-primary">
      {num && <span className="rounded-md bg-primary/10 px-2 py-0.5">{num}</span>}
      {children}
    </div>
  )
}

export function SectionHead({
  num,
  eyebrow,
  title,
  lede,
  className = '',
}: {
  num?: string
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10 ${className}`}>
      <div>
        <SectionEyebrow num={num}>{eyebrow}</SectionEyebrow>
        <h2 className="font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[52px]">
          {title}
        </h2>
      </div>
      {lede ? (
        <p className="max-w-[380px] text-base leading-relaxed text-muted-foreground">{lede}</p>
      ) : null}
    </div>
  )
}
