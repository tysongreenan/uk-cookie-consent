import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/** 21st.dev: 7ovr/how-it-works-1 — numbered icon cards. */
export type HowItWorksStep = {
  number: string
  icon: LucideIcon
  title: string
  copy: string
}

export function HowItWorks1({
  title,
  lede,
  steps,
}: {
  title: string
  lede?: string
  steps: HowItWorksStep[]
}) {
  return (
    <section className="bg-secondary px-6 py-20 text-foreground lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
            {title}
          </h2>
          {lede ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{lede}</p>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ number, icon: Icon, title: stepTitle, copy }) => (
            <Card key={number} className="relative rounded-[20px] p-6">
              <Badge
                variant="secondary"
                className="absolute top-6 right-6 font-mono text-xs tabular-nums"
              >
                {number}
              </Badge>
              <CardHeader className="p-0">
                <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted">
                  <Icon className="size-5 text-foreground" aria-hidden="true" />
                </span>
                <CardTitle className="mt-5 font-heading text-base font-semibold">
                  {stepTitle}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed">
                  {copy}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
