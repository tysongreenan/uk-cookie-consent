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
      'Yes. Under PIPEDA and CASL, Canadian websites must disclose and gain consent for tracking cookies — just like under GDPR. If you collect any personal information through cookies or track user behavior, you need to inform visitors and get their consent first.',
  },
  {
    question: 'Is this tool compliant with GDPR?',
    answer:
      'Yes. Our cookie banner generator supports proper cookie consent, opt-in logic, and legal language that meets GDPR standards. You can customize the banner to include all required elements like granular consent options, easy opt-out, and clear cookie descriptions.',
  },
  {
    question: "Will it match my site's design?",
    answer:
      'Absolutely. You control colours, fonts, placement, button styles, and corner radius — and the in-page builder shows the real banner as you tweak. No surprises after install.',
  },
  {
    question: 'How do I install the cookie banner?',
    answer:
      "Installation is simple — just copy the generated code and paste it into your website's HTML, right before the closing </body> tag. It works on WordPress, Webflow, Shopify, Squarespace, custom HTML sites, and virtually any other platform.",
  },
  {
    question: "What's the difference between Pro One-Time and Pro Annual?",
    answer:
      "One-Time freezes today's feature set forever — you'll get security patches but no new features. Annual gets every future feature we ship (consent logs, A/B testing, IAB TCF 2.2, the policy generator, anything new). If you want to set-and-forget, pick One-Time. If you want it to keep getting better, pick Annual.",
  },
  {
    question: 'Does it support Quebec Law 25 (bilingual)?',
    answer:
      'Yes. Full bilingual EN/FR with automatic locale detection, plus 14 other languages. Law 25-specific consent expiry and granular preferences are wired in by default for the QC framework.',
  },
  {
    question: 'What about PIPEDA, CASL, GDPR, and CCPA?',
    answer:
      'All four are first-class frameworks. Switch the banner\'s compliance mode and we rewrite the legal copy, set the right consent expiry, and adjust opt-in/opt-out behaviour: Canada (PIPEDA federal + CASL anti-spam + Quebec Law 25), EU (GDPR), US (CCPA, California). Most other jurisdictions are covered by adapting one of these.',
  },
  {
    question: 'Will it slow down my site?',
    answer:
      'No. The script is under 10 KB, loads asynchronously, and won\'t affect Core Web Vitals or LCP. Tracking scripts (Google Analytics, pixels) are blocked by default and only load after consent.',
  },
  {
    question: 'Can I manage my tracking scripts through the banner?',
    answer:
      'Yes. Our tool lets you add and manage tracking scripts like Google Analytics, Facebook Pixel, and other third-party tools. The banner automatically blocks these scripts until the user gives consent.',
  },
  {
    question: 'Does the tool block non-essential cookies until consent is given?',
    answer:
      'Yes. According to Canadian standards and GDPR requirements, our cookie banner automatically blocks all non-essential cookies (analytics, marketing, preferences) until users provide explicit opt-in consent.',
  },
  {
    question: 'Does the tool provide audit / records of consent?',
    answer:
      'Yes. Our tool provides consent transaction logging and records. You can access consent logs through our dashboard for compliance purposes and internal auditing.',
  },
  {
    question: 'Does it integrate with Google Tag Manager?',
    answer:
      'Yes. The banner integrates smoothly with Google Tag Manager, custom scripts, and other tag management systems. Non-essential tags are automatically gated by consent.',
  },
  {
    question: 'Can I use it on multiple websites?',
    answer:
      'Yes — unlike other tools, we give you unlimited banners. No domain limits. No per-site fees. Create as many custom cookie banners as you need.',
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
              </Link>{' '}
              — we reply same-day.
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
