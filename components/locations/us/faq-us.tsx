'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'
import { FAQ_US } from './data'

export function FaqUs() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="border-t border-border bg-secondary py-20 lg:py-24">
      <StructuredData type="faq" data={FAQ_US} />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[44px]">
              US cookie consent,{' '}
              <br className="hidden sm:block" />
              asked plainly.
            </h2>
            <p className="mt-3.5 max-w-[300px] text-[15.5px] leading-relaxed text-muted-foreground">
              Don’t see yours? Email{' '}
              <Link
                href="mailto:hi@cookie-banner.ca"
                className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
              >
                hi@cookie-banner.ca
              </Link>{' '}
              — we reply same-day.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_US.map((item, i) => {
              const open = openIdx === i
              return (
                <article
                  key={item.question}
                  className="overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[15.5px] font-medium text-foreground"
                  >
                    {item.question}
                    <Plus
                      className={`h-5 w-5 flex-none transition-transform ${
                        open ? 'rotate-45 text-primary' : 'text-muted-foreground'
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                  {open ? (
                    <div className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                      {item.answer}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
