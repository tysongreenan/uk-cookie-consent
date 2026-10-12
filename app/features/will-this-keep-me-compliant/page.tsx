import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, ComplianceSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'Will This Cookie Banner Keep Me Compliant?',
  description: 'What the banner does, and what it does not. Consent tools for GDPR, UK PECR, PIPEDA, and Quebec Law 25. A banner is not a legal opinion and does not make a site compliant by itself.',
  keywords: 'will cookie banner keep me compliant, cookie consent compliance verification, how to know if cookie banner is compliant, cookie banner compliance check, GDPR compliance verification, PIPEDA compliance check',
  openGraph: {
    title: 'Will This Cookie Banner Keep Me Compliant?',
    description: 'What the banner does for GDPR, UK PECR, PIPEDA, and Quebec Law 25, and what still sits with you.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/features/will-this-keep-me-compliant',
  },
}

const faqData = [
  {
    question: "Will this cookie banner keep me compliant with GDPR?",
    answer: "For visitors in the EU, the banner can block non-essential cookies until someone opts in, offer choices by category, record the choice, and let them change it later. Those are GDPR and ePrivacy consent tools. They do not, by themselves, make a site GDPR compliant. You still need a privacy notice, a lawful basis for each use, and a check that the scripts actually wait for consent."
  },
  {
    question: "Does this work for PIPEDA compliance in Canada?",
    answer: "PIPEDA is still the federal law. Bill C-36, introduced on 15 June 2026, is not in force. The banner can present a clear notice and collect consent before tracking cookies run. Meaningful consent also depends on the words you show and on whether the information is sensitive. Implied consent can be enough for non-sensitive analytics when the notice is clear. Quebec visitors are under Law 25, which is stricter."
  },
  {
    question: "How do I verify my cookie banner is compliant?",
    answer: "Open the site and use the browser storage panel. Before a choice, scripts you added in the builder should not have run. Consent logs exist on Pro Annual and Enterprise. The dashboard does not grade the banner against a statute."
  },
  {
    question: "What happens if privacy laws change?",
    answer: "Privacy law changes, and a banner does not update itself into compliance. UK PECR changed on 5 February 2026: low-risk statistics and appearance cookies can use an opt-out, while advertising still needs consent. EU law did not make that change. When a rule changes, review the banner settings and the copy against the current rule. The Terms say the tools do not guarantee full legal compliance."
  },
  {
    question: "Does this cover Quebec Law 25 requirements?",
    answer: "Law 25 has been fully in force since September 2024. The banner can require opt-in before non-essential identification or profiling technologies run, and it can be shown in English and French. Law 25 also requires a published privacy officer, privacy impact assessments in the cases the Act lists, and a contract with service providers. The banner does not do those."
  },
  {
    question: "How does this compare to other cookie banner solutions?",
    answer: "The banner can block non-essential cookies by default, ask for a choice by category, and keep a record of that choice. It does not read a statute and reconfigure itself when the law changes. UK PECR and EU GDPR diverged on 5 February 2026, so a single worldwide opt-in is a stricter setting, not a statement that every country requires it."
  },
  {
    question: "Do I need to configure anything for compliance?",
    answer: "You choose the consent model for the visitors you serve. EU visitors need opt-in before non-essential cookies. UK advertising cookies still need prior consent. UK statistics can use the February 2026 opt-out only if the use stays inside that exception and people can object for free. Quebec visitors need Law 25 opt-in. The words on the banner are part of the notice, so they need to match what the site actually does."
  },
  {
    question: "What if I have users in multiple countries?",
    answer: "The banner can vary behaviour by location: opt-in for the EU, Law 25 opt-in for Quebec, meaningful consent for the rest of Canada, and an opt-out of sale or sharing for California, including Global Privacy Control. UK visitors are not EU visitors. Since 5 February 2026, PECR allows an opt-out for low-risk statistics and appearance cookies. Advertising still needs consent. Location detection does not replace a decision about which rule you are following."
  }
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca/' },
  { name: 'Features', url: 'https://www.cookie-banner.ca/features' },
  { name: 'Will This Keep Me Compliant?', url: 'https://www.cookie-banner.ca/features/will-this-keep-me-compliant' }
]

export default function WillThisKeepMeCompliantPage() {
  const updatedDate = '2026-09-21'
  const publishedDate = '2025-01-15'

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Will This Cookie Banner Keep Me Compliant?",
    "description": "What the banner does for GDPR, UK PECR, PIPEDA, and Quebec Law 25, and what still sits with the website owner.",
    "author": {
      "@type": "Organization",
      "name": "Cookie Banner Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cookie Banner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.cookie-banner.ca/logos/logo.svg"
      }
    },
    "datePublished": publishedDate,
    "dateModified": updatedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cookie-banner.ca/features/will-this-keep-me-compliant"
    }
  }

  const directAnswer = "The banner is a consent tool, not a guarantee. It can block non-essential cookies until someone opts in, record the choice, and let them change it. That matches EU GDPR and Quebec Law 25 for cookies. PIPEDA is still the federal Canadian law, and Bill C-36 is not in force. In the UK, since 5 February 2026, low-risk statistics and appearance cookies can use a simple opt-out, while advertising still needs consent. You still need a privacy notice, a check that scripts wait for the choice, and, in Quebec, a privacy officer. The Terms say the tools do not guarantee full legal compliance."

  const complianceFeatures = [
    {
      title: "EU consent tools",
      description: "Opt-in before non-essential cookies, by category, with a record of the choice",
      className: "col-span-1 lg:col-span-2 border-b lg:border-r border-border",
    },
    {
      title: "PIPEDA notice and consent",
      description: "Clear notice before tracking. Federal PIPEDA is still in force.",
      className: "col-span-1 lg:col-span-2 border-b border-border",
    },
    {
      title: "Quebec Law 25 consent",
      description: "Opt-in for non-essential tracking, with English and French",
      className: "col-span-1 lg:col-span-2 border-border",
    },
  ]

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <StructuredData type="faq" data={faqData} />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <FeaturePageLayout
        hero={{
          title: "Will This Cookie Banner Keep Me Compliant?",
          description: "What the banner can do for GDPR, PIPEDA, and Quebec Law 25 consent, and what it cannot do.",
          badge: "Consent tool",
          updatedDate: updatedDate,
          ctaText: "Open the builder",
          ctaHref: "/builder",
          directAnswer: directAnswer,
          directAnswerLink: "/builder",
          directAnswerLinkText: "Open the builder"
        }}
        ctaText="Open the builder"
        ctaHref="/builder"
        relatedLinks={[
          { href: "/features/privacy-laws", text: "What Privacy Laws Does This Cover?" },
          { href: "/features/how-it-works", text: "How Do I Know It's Working?" },
          { href: "/compliance", text: "Cookie compliance overview" },
          { href: "/compliance/pipeda", text: "PIPEDA Compliance Guide" },
          { href: "/compliance/gdpr", text: "GDPR Compliance Guide" },
          { href: "/tools/cookie-scanner", text: "Free cookie scanner" },
        ]}
      >
        {/* Features Section */}
        <ModernFeaturesSection
          title="Consent modes"
          description="Consent tools for the laws that actually apply. The banner does not make a site compliant by itself."
          features={complianceFeatures}
        />

        <h2 id="how-does-our-banner-automatically-ensure-compliance">What the banner actually does</h2>
        
        <p>
          The banner can block non-essential cookies until a visitor chooses, store that choice, and show the notice in more than one language. Those are tools. They do not replace a privacy notice, a privacy officer, or a check that your scripts wait for the choice.
        </p>

        <h3>Scripts you add can stay off until opt-in</h3>
        <p>
          Scripts you add in the builder as analytics or marketing stay off until the visitor opts in.
          The banner cannot block cookies set by other code on the page. A tag that loads first, or a
          script you did not add here, can still set a cookie.
        </p>

        <h3>Opt-in is a setting, not every law</h3>
        <p>
          EU mode waits for opt-in before non-essential cookies. Quebec can use a Pro geo rule for the same idea.
          PIPEDA can allow implied consent for non-sensitive analytics when the notice is clear. California mode
          is an opt-out of sale or sharing, not the EU opt-in. You pick the mode. The product does not decide
          the lawful basis for you.
        </p>

        <h3>Consent logs are not on every plan</h3>
        <p>
          Pro Annual and Enterprise can store a consent log. The free plan and one-time Pro do not.
          A log is a record of the choice. It is not a filing with a regulator, and it does not prove
          the rest of the site is compliant.
        </p>

        <h2 id="what-compliance-mechanisms-are-built-into-the-banner">What is built in</h2>
        <ul>
          <li><strong>Scripts you add:</strong> Analytics and marketing scripts added in the builder stay off until opt-in.</li>
          <li><strong>Categories:</strong> Essential, functionality, analytics, and marketing.</li>
          <li><strong>Change of mind:</strong> The visitor can reopen the choices.</li>
          <li><strong>Languages:</strong> English, French, and 14 other languages. French text is not Law 25 compliance by itself.</li>
          <li><strong>Expiry:</strong> You set how long the choice is stored. It is not a 12-month GDPR timer or a 24-month PIPEDA timer.</li>
          <li><strong>Hosted script:</strong> Design changes publish from the dashboard. A statute change does not rewrite the banner.</li>
        </ul>

        <h2 id="which-privacy-laws-does-this-banner-cover">Which laws have a mode</h2>
        <p>A mode is default copy and a default opt-in or opt-out. It is not a legal opinion.</p>
        <ul>
          <li><strong>Canada:</strong> A PIPEDA-style notice. There is no Alberta PIPA mode and no BC PIPA mode.</li>
          <li><strong>CASL:</strong> Canada's anti-spam law. This product does not send email and has no CASL mode.</li>
          <li><strong>Quebec Law 25:</strong> Pro can force opt-in for visitors in Quebec, and the banner can be in French. The banner does not appoint a privacy officer.</li>
          <li><strong>EU:</strong> Opt-in before non-essential cookies.</li>
          <li><strong>California:</strong> Opt-out of sale or sharing. Not a full CCPA program.</li>
        </ul>
        <p>
          More on the modes: <Link href="/features/privacy-laws" className="text-foreground underline">privacy laws and this banner</Link>.
        </p>

        <h2 id="how-do-i-verify-my-cookie-banner-is-compliant">How do I check the banner?</h2>
        <p>There is no compliance certificate in the dashboard. You can check the behaviour yourself:</p>
        <ol>
          <li>Open the site in a browser with DevTools.</li>
          <li>Before a choice, confirm the scripts you added have not run.</li>
          <li>Accept, and confirm those scripts run.</li>
          <li>Reject, and confirm they stay off.</li>
        </ol>
        <p>
          On Pro Annual or Enterprise, the consent log shows the choice that was stored. It does not grade your banner text.
          See <Link href="/features/how-it-works" className="text-foreground underline">how the banner works</Link>.
        </p>

        <h2 id="what-happens-if-privacy-laws-change">If the law changes</h2>
        <p>
          The hosted script can change when we ship a product update. That is not a legal update.
          One-time Pro does not include features shipped later. Annual does. Neither plan rewrites
          the banner when a statute changes. Review the mode and the words on the banner yourself.
          The Terms say the tool does not guarantee full legal compliance.
        </p>

        <h2 id="how-does-this-compare-to-other-cookie-banner-solutions">What this is not</h2>
        <p>
          This is a banner you configure. It is not a tenant API, a scanner that blocks every cookie on the page,
          or a service that files with a regulator.
        </p>

        <h2 id="ready-to-get-compliant">Next</h2>
        <p>
          Set the mode for the visitors you serve, then confirm the scripts you added follow that choice.
        </p>
        <ul>
          <li>Block the scripts you added until opt-in, where you chose an opt-in mode</li>
          <li>EU and a Quebec geo rule wait for opt-in. California is an opt-out. PIPEDA is a notice, not CASL</li>
          <li>Consent logs are on Pro Annual and Enterprise</li>
          <li>English and French, plus 14 other languages</li>
          <li>You still write the privacy notice and review the setup when the law changes</li>
        </ul>

        <h2 id="conclusion">Conclusion</h2>
        <ul>
          <li><strong>A banner does not keep you compliant.</strong> It can record a choice and hold back scripts you added.</li>
          <li><strong>Modes, not every statute.</strong> Canada, the EU, and California. No Alberta mode, no BC mode, no CASL mode.</li>
          <li><strong>No automatic legal updates.</strong> A statute change does not rewrite the banner.</li>
          <li><strong>Check it in the browser.</strong> The dashboard does not grade the banner against a law.</li>
        </ul>
        <p><strong>Next steps:</strong></p>
        <ol>
          <li>Create a banner in the dashboard</li>
          <li>Match the design to the site</li>
          <li>Paste the async script</li>
          <li>Check in the browser that the scripts you added wait for the choice</li>
        </ol>

        <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>
        
        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </FeaturePageLayout>
    </>
  )
}

