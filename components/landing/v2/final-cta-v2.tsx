import Link from 'next/link'

export function FinalCtaV2() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-foreground px-8 py-16 text-center text-background sm:px-14 sm:py-20 lg:px-16 lg:py-[80px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          />
          <h2 className="relative mx-auto max-w-3xl font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-background sm:text-5xl lg:text-6xl">
            Stop renting compliance.
            <br />
            Build it once, in <span className="text-[#6FCDDC]">5 minutes</span>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-background/70">
            No signup, no credit card. The free plan covers PIPEDA, Law 25, GDPR &amp; CCPA — and you can always upgrade later.
          </p>
          <div className="relative mt-8 inline-flex flex-col gap-3 sm:flex-row">
            <Link
              href="#builder"
              className="inline-flex h-[52px] items-center justify-center rounded-[12px] bg-primary px-6 text-[15.5px] font-semibold text-primary-foreground transition-colors hover:bg-[hsl(var(--primary)/0.9)]"
            >
              Build my banner — free
            </Link>
            <Link
              href="#pricing"
              className="inline-flex h-[52px] items-center justify-center rounded-[12px] border border-white/20 bg-white/5 px-6 text-[15.5px] font-semibold text-background transition-colors hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
