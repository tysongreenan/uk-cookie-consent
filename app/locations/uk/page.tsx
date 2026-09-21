import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'UK Cookie Consent | GDPR & PECR Compliance Guide 2026',
  description:
    'UK cookie consent after the Data (Use and Access) Act 2025. What PECR still requires, which cookies can use an opt-out, and how UK GDPR differs from EU GDPR.',
  keywords:
    'uk cookie consent, uk gdpr, pecr compliance, data use and access act, ico guidance, uk privacy law, uk cookie law',
  openGraph: {
    title: 'UK Cookie Consent | GDPR & PECR Compliance Guide 2026',
    description:
      'UK cookie consent after the Data (Use and Access) Act 2025. PECR consent rules, the new cookie exceptions, and ICO guidance.',
    type: 'article',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/locations/uk',
  },
}

const rules = [
  {
    name: 'Still needs prior consent',
    detail:
      'Advertising cookies, cross-site tracking, and profiling. A tool that shares identifiers with an ad network is in this group, even if you also use it for statistics.',
  },
  {
    name: 'Can run with a simple, free opt-out',
    detail:
      'From 5 February 2026: cookies used only to collect statistics about that site, so you can improve it, and cookies that only adapt how the site looks or works. The ICO finalised this guidance on 29 April 2026.',
  },
  {
    name: 'No consent required',
    detail:
      'Cookies that are strictly necessary for the site to work, and storage used only to carry a communication. Say what they do in the cookie policy.',
  },
]

const steps = [
  'Keep strictly necessary cookies exempt, and describe them.',
  'Get prior consent before advertising, cross-site tracking, or any analytics tool that shares identifiers with a third party.',
  'If you use the statistics or appearance exception, give people a simple, free way to object and keep the use inside that purpose.',
  'Let people change a choice later. Pre-ticked boxes are not consent.',
  'From 19 June 2026, handle a person’s data-protection complaint yourself before they take it to the ICO. Keep a record of how the choice was offered.',
]

export default function UKCompliancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="border-b border-border">
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="mb-6 text-sm text-muted-foreground">
              <Link href="/locations" className="underline-offset-4 hover:text-foreground hover:underline">
                Locations
              </Link>
              <span aria-hidden="true"> / </span>
              United Kingdom
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              UK cookie consent, after the 2025 Act
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
              The Data (Use and Access) Act 2025 is in force. It received Royal Assent on 19 June 2025.
              The cookie rules changed on 5 February 2026. Advertising still needs a yes. Low-risk
              statistics can use an opt-out. EU GDPR did not make the same change.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
                <Link href="/builder">
                  Build a banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6 text-base">
                <Link href="/compliance/gdpr">EU rules are stricter</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              What you can set, and when
            </h2>
            <p className="mt-3 max-w-[62ch] text-muted-foreground">
              PECR is the cookie rule. UK GDPR is the data-protection rule. An opt-in banner is still
              a valid, stricter choice for every category.
            </p>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {rules.map((rule) => (
                <li key={rule.name} className="py-6">
                  <h3 className="font-heading text-lg font-semibold">{rule.name}</h3>
                  <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                    {rule.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              United Kingdom and the EU
            </h2>
            <p className="mt-3 max-w-[62ch] text-muted-foreground">
              A UK exception does not cover a visitor in the EU. The adequacy decision is a transfer
              rule. It does not copy UK cookie exceptions into EU law.
            </p>
            <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-background">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">
                  Cookie consent under UK PECR and EU GDPR
                </caption>
                <thead className="border-b border-border text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Cookie use</th>
                    <th scope="col" className="px-4 py-3 font-medium">UK PECR</th>
                    <th scope="col" className="px-4 py-3 font-medium">EU GDPR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <th scope="row" className="px-4 py-4 font-medium">Strictly necessary</th>
                    <td className="px-4 py-4 text-muted-foreground">Exempt. Disclose it.</td>
                    <td className="px-4 py-4 text-muted-foreground">Exempt. Disclose it.</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-medium">Site statistics only</th>
                    <td className="px-4 py-4 text-muted-foreground">Opt-out, since 5 February 2026</td>
                    <td className="px-4 py-4 text-muted-foreground">Opt-in before it loads</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-medium">Appearance only</th>
                    <td className="px-4 py-4 text-muted-foreground">Opt-out, simple and free</td>
                    <td className="px-4 py-4 text-muted-foreground">Usually opt-in</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-4 font-medium">Advertising or cross-site tracking</th>
                    <td className="px-4 py-4 text-muted-foreground">Prior consent</td>
                    <td className="px-4 py-4 text-muted-foreground">Prior consent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              What the ICO can fine
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                PECR fines, including fines for cookies, have matched UK GDPR since 5 February 2026:
                up to £17.5 million or 4% of global annual turnover. The old PECR cap was £500,000.
                UK GDPR still has a second tier of up to £8.7 million or 2%, depending on the infringement.
              </p>
              <p>
                The British Airways penalty (£20 million) and the Marriott penalty (£18.4 million) were
                security cases, not cookie-banner cases. Large Google consent penalties came from EU
                authorities, including the CNIL.
              </p>
              <p>
                <a
                  href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/"
                  className="text-foreground underline underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  ICO guidance on storage and access technologies
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Set it up
            </h2>
            <ol className="mt-8 max-w-[62ch] list-decimal space-y-4 pl-5 text-muted-foreground marker:text-foreground">
              {steps.map((step) => (
                <li key={step} className="pl-2 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="container max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              One banner, with the UK rule set apart from the EU rule.
            </h2>
            <p className="mt-4 max-w-[62ch] text-muted-foreground">
              Block advertising until someone agrees. Keep a record of the choice. Use opt-in for EU
              visitors even when a UK statistics cookie is allowed to wait for an objection.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
                <Link href="/builder">
                  Open the builder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
