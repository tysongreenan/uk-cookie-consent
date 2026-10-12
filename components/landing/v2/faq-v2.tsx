'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'
import { SectionEyebrow } from './section-head'

const FAQ_DATA = [
  {
    question: 'Do I need a cookie banner in Canada?',
    answer:
      'If cookies or similar tools collect personal information, PIPEDA expects meaningful consent, and Quebec Law 25 expects express consent before non-essential tracking. CASL is Canada’s anti-spam law. It does not require a cookie banner, and this product does not send email or make a site CASL-compliant.',
  },
  {
    question: 'Is this tool compliant with GDPR?',
    answer:
      'The banner can show equal accept and reject buttons, keep scripts you add turned off until someone opts in, and remember that choice. That is the pattern GDPR sites usually need for cookies. It does not audit your vendors, sign a DPA, or make the rest of the site compliant.',
  },
  {
    question: "Will it match my site's design?",
    answer:
      'Absolutely. You control colours, fonts, placement, button styles, and corner radius — and the in-page builder shows the real banner as you tweak. No surprises after install.',
  },
  {
    question: 'How do I install the cookie banner?',
    answer:
      "Installation is simple — just copy the generated code and paste it into your website's HTML, right before the closing </body> tag. It works on WordPress, Shopify, Squarespace, custom HTML sites, and virtually any other platform.",
  },
  {
    question: "What's the difference between Pro One-Time and Pro Annual?",
    answer:
      'One-time Pro keeps the Pro features shipping today, plus security patches. It does not include later features. Annual includes consent logs, privacy-policy version history, and features we ship after you subscribe. Neither plan is a Google-certified CMP.',
  },
  {
    question: 'Does it support Quebec Law 25 (bilingual)?',
    answer:
      'You can write the banner in English and French, and the visitor’s browser language can pick among 16 languages. Quebec geo-targeting, which forces a stricter opt-in for visitors in Quebec, is a Pro feature. French text and a reject button do not, by themselves, satisfy Law 25.',
  },
  {
    question: 'What about PIPEDA, CASL, GDPR, and CCPA?',
    answer:
      'The builder has modes for Canada, the EU, and California, plus a custom mode. Those modes change the default copy and whether the banner waits for opt-in. CASL is not a mode. Google Consent Mode v2 can start denied until the visitor chooses. We are not a Google-certified CMP.',
  },
  {
    question: 'Will it slow down my site?',
    answer:
      'The install is one async script tag, so it does not block HTML parsing. A standard banner is about 28 KB gzipped. Scripts you add as analytics or marketing stay off until the visitor opts in. That is not a promise that Core Web Vitals stay the same.',
  },
  {
    question: 'Can I manage my tracking scripts through the banner?',
    answer:
      'Yes. Our tool lets you add and manage tracking scripts like Google Analytics, Facebook Pixel, and other third-party tools. The banner automatically blocks these scripts until the user gives consent.',
  },
  {
    question: 'Does the tool block non-essential cookies until consent is given?',
    answer:
      'Scripts you add in the builder stay off until the visitor opts in to that category. The banner cannot see or block cookies set by other code you did not add.',
  },
  {
    question: 'Does the tool provide audit / records of consent?',
    answer:
      'Consent logs and data-access exports are on Pro Annual and Enterprise. The free plan and the one-time Pro plan do not include that archive.',
  },
  {
    question: 'Does it integrate with Google Tag Manager?',
    answer:
      'There is a Google Tag Manager template, and Consent Mode can start denied. Tags you already installed without a consent check still fire. The banner does not edit an existing container for you.',
  },
  {
    question: 'Can I use it on multiple websites?',
    answer:
      'The free plan includes one banner, and you can paste that snippet on the sites you run. Pro removes the one-banner limit and does not charge per domain.',
  },
  {
    question: 'Do you offer support?',
    answer:
      'Yes. We offer support on all plans, including free. Email support@cookie-banner.ca.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'Setup takes approximately 5 minutes: pick a template, customize colours and copy, paste the snippet into your site. No coding knowledge required.',
  },
]

export function FaqV2() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section
      id="faq"
      className="border-t border-border bg-secondary py-20 lg:py-24"
    >
      <StructuredData type="faq" data={FAQ_DATA} />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div>
            <SectionEyebrow num="07">Questions</SectionEyebrow>
            <h2 className="font-heading text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[44px]">
              Frequently
              <br />
              asked.
            </h2>
            <p className="mt-3.5 max-w-[300px] text-[15.5px] leading-relaxed text-muted-foreground">
              Don't see yours? Email{' '}
              <Link
                href="mailto:hi@cookie-banner.ca"
                className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
              >
                hi@cookie-banner.ca
              </Link>
              . We read every note. We do not promise a same-day reply.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((item, i) => {
              const open = openIdx === i
              return (
                <article
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border border-border bg-background ${
                    open ? '' : ''
                  }`}
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
