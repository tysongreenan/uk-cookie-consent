export function BuilderHeader() {
  return (
    <section
      id="builder"
      className="bg-background pt-20 lg:pt-24"
      aria-label="Banner builder introduction"
    >
      <div className="container mx-auto max-w-[1320px] px-6 pb-10 text-center">
        <h2 className="font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[52px]">
          Build your first cookie banner in 60 seconds.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-muted-foreground">
          Pick a layout, type your company name, drop in brand colours. The preview is the real banner — what you see is what gets installed.
        </p>
      </div>
    </section>
  )
}

export function BuilderFooter() {
  const steps: { n: number; t: React.ReactNode }[] = [
    { n: 1, t: 'Pick a template' },
    { n: 2, t: 'Customize colors & copy' },
    { n: 3, t: 'Add tracking scripts' },
    { n: 4, t: 'Copy the snippet' },
    {
      n: 5,
      t: (
        <>
          Paste before{' '}
          <code className="rounded bg-secondary px-1 py-px font-mono text-[11.5px]">
            &lt;/body&gt;
          </code>
        </>
      ),
    },
  ]

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-secondary pb-20 lg:pb-24"
      aria-label="Quick setup overview"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--primary)/0.08)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,transparent_0%,black_0%,black_75%,transparent_100%)]"
      />
      <div className="container relative mx-auto max-w-[1320px] px-6">
        <div className="flex flex-wrap gap-2.5 pt-6 text-xs text-muted-foreground">
          {[
            'No signup wall',
            'Real-time preview',
            'Copy & paste install',
            'Works on any CMS',
            'Bilingual EN / FR',
          ].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[12.5px]"
            >
              <span className="font-bold text-primary">✓</span>
              {label}
            </span>
          ))}
        </div>
        <div className="mt-9 rounded-[18px] border border-border bg-background p-6 lg:px-7">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
            <span className="text-lg font-medium tracking-[-0.01em] text-foreground">
              Five steps. About five minutes.
            </span>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground">
              ~5 min, no code
            </span>
          </div>
          <ol className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className={`flex items-center gap-3 py-2 text-sm text-foreground ${
                  i > 0
                    ? 'lg:border-l lg:border-dashed lg:border-border lg:pl-5'
                    : ''
                } lg:pr-[18px]`}
              >
                <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {s.n}
                </span>
                <span className="leading-snug">{s.t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
