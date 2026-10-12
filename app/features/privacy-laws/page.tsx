import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, ComplianceSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'Privacy Laws Covered: GDPR, CCPA, PIPEDA & More',
  description: 'Cookie banner modes for GDPR, PIPEDA, Quebec Law 25, and CCPA. Pro can vary the banner by country. Not a Google-certified CMP, and not a CASL email tool.',
  keywords: 'cookie consent laws, cookie banner privacy laws, GDPR PIPEDA cookie banner, multi-jurisdiction cookie consent, cookie consent compliance, cookie compliance, eu cookie compliance',
  openGraph: {
    title: 'Privacy Laws Covered: GDPR, CCPA, PIPEDA & More',
    description: 'Cookie banner modes for GDPR, PIPEDA, Quebec Law 25, and CCPA. A banner does not make a site legally compliant.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/features/privacy-laws',
  },
}

const faqData = [
  {
    question: "What privacy laws does this cookie banner cover?",
    answer: "The builder has modes for Canada, the EU, and California, plus custom copy. Pro can show a different mode to visitors from a country you pick. It does not detect Alberta PIPA or BC PIPA, and CASL is not a mode."
  },
  {
    question: "Does this work for Canadian privacy laws?",
    answer: "Canada mode is written for a PIPEDA-style notice. French is available, and Pro can force opt-in for visitors in Quebec. There is no Alberta PIPA mode, no BC PIPA mode, and no CASL email feature."
  },
  {
    question: "Is this GDPR compliant?",
    answer: "EU mode can wait for opt-in and offer category choices. Consent logs are on Pro Annual, not on the free plan. The banner does not make a site GDPR compliant."
  },
  {
    question: "How does one banner cover multiple privacy laws?",
    answer: "You pick the default mode. On Pro, a geo rule can override that mode for a country or region you select, such as Quebec. Location detection does not choose the law for you."
  },
  {
    question: "What about future privacy laws?",
    answer: "The banner does not update itself when a statute changes. Annual subscribers get features we ship later. One-time Pro keeps the feature set from the day you bought it, plus security patches."
  },
  {
    question: "How do I know which laws apply to my website?",
    answer: "If you have visitors in the EU, the UK, Canada, Quebec, or California, read the rule that applies to that visit and set the banner to match. The product will not decide that for you."
  },
  {
    question: "Does this cover CCPA (California)?",
    answer: "California mode uses opt-out copy. It does not file anything with a regulator, and a banner alone is not an opt-out of sale."
  },
  {
    question: "What if I only have Canadian visitors?",
    answer: "A Canadian site can use Canada mode, and Pro can add a Quebec override. That is not automatic compliance with every provincial statute."
  }
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca/' },
  { name: 'Features', url: 'https://www.cookie-banner.ca/features' },
  { name: 'What Privacy Laws Does This Cover?', url: 'https://www.cookie-banner.ca/features/privacy-laws' }
]

export default function PrivacyLawsPage() {
  const updatedDate = '2026-07-20'
  const publishedDate = '2025-01-15'

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Privacy Laws Does This Cookie Banner Cover?",
    "description": "Modes for Canada, the EU, and California. Pro can vary the banner by country. Not a CASL tool, and not automatic compliance with Alberta or BC law.",
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
      "@id": "https://www.cookie-banner.ca/features/privacy-laws"
    }
  }

  const directAnswer = "The builder has modes for Canada, the EU, and California. Pro can show a different mode to visitors from a country you pick, including Quebec. It does not detect Alberta PIPA or BC PIPA, and a banner does not make a site legally compliant."

  const privacyLawsFeatures = [
    {
      title: "GDPR (EU)",
      description: "Opt-in mode for EU-style cookie consent. Not a legal certification.",
      className: "col-span-1 lg:col-span-2 border-b lg:border-r border-border",
    },
    {
      title: "Canadian Laws",
      description: "Canada mode for a PIPEDA-style notice. French, and an optional Quebec opt-in on Pro.",
      className: "col-span-1 lg:col-span-2 border-b border-border",
    },
    {
      title: "CCPA (California)",
      description: "Opt-out copy for California. A banner is not an opt-out of sale.",
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
          title: "What Privacy Laws Does This Cookie Banner Cover?",
          description: "Modes for GDPR, PIPEDA, Quebec Law 25, and CCPA. Not a CASL email tool.",
          badge: "Global Compliance",
          updatedDate: updatedDate,
          ctaText: "Build a banner",
          ctaHref: "/builder",
          directAnswer: directAnswer,
          directAnswerLink: "/builder",
          directAnswerLinkText: "Open the builder"
        }}
        ctaText="Build a banner"
        ctaHref="/builder"
        relatedLinks={[
          { href: "/features/will-this-keep-me-compliant", text: "Will This Keep Me Compliant?" },
          { href: "/features/how-it-works", text: "How Do I Know It's Working?" },
          { href: "/compliance/pipeda", text: "PIPEDA Compliance Guide" },
          { href: "/compliance/gdpr", text: "GDPR Compliance Guide" },
        ]}
      >
        {/* Features Section */}
        <ModernFeaturesSection
          title="Comprehensive Privacy Law Coverage"
          description="The modes we ship. You still choose which rule to follow."
          features={privacyLawsFeatures}
        />

        <h2 id="which-canadian-privacy-laws-are-covered">Which Canadian Privacy Laws Are Covered?</h2>
        
        <p>
          What the Canada mode does, and what it does not:
        </p>

        <h3>PIPEDA (Personal Information Protection and Electronic Documents Act)</h3>
        <p>
          PIPEDA is Canada's federal privacy law that applies to private-sector organizations. Our banner meets PIPEDA requirements by:
        </p>
        <ul>
          <li>Obtaining meaningful consent before collecting personal information through cookies</li>
          <li>Providing clear information about data collection purposes</li>
          <li>Allowing users to withdraw consent at any time</li>
          <li>Blocking tracking cookies until users consent</li>
        </ul>
        <p>
          Learn more about <Link href="/compliance/pipeda" className="text-foreground underline">PIPEDA compliance requirements</Link>.
        </p>

        <h3>CASL is not this product</h3>
        <p>
          CASL is Canada's anti-spam law. A narrow software-install rule exists, and it is not the same as a cookie banner. This product does not send email. Scripts you add can stay off until opt-in. That is not CASL compliance.
        </p>
        <ul>
          <li>Blocking tracking scripts until users provide consent</li>
          <li>Clearly identifying the organization</li>
          <li>Providing an easy way to opt-out</li>
        </ul>

        <h3>Quebec Law 25 (Bill 64)</h3>
        <p>
          Quebec Law 25 is stricter than PIPEDA for tracking technologies. The banner can do this:
        </p>
        <ul>
          <li>Explicit consent requirements (not implied consent)</li>
          <li>Opt-in behavior (not opt-out)</li>
          <li>Full bilingual support (English and French)</li>
          <li>Granular consent controls</li>
          <li>Easy consent withdrawal</li>
        </ul>
        <p>
          Quebec Law 25 has been fully in force since September 2024. Administrative penalties can reach $10 million or 2% of worldwide turnover. Penal fines can reach $25 million or 4%, whichever is greater. A banner can collect opt-in consent and offer French. It does not appoint your privacy officer, complete a privacy impact assessment, or write your privacy policy.
        </p>

        <h3>Alberta PIPA (Personal Information Protection Act)</h3>
        <p>
          Alberta has its own private-sector privacy statute. This product has no Alberta mode. Canada mode is a PIPEDA-style notice, not a provincial compliance program.
        </p>

        <h3>BC PIPA (British Columbia Personal Information Protection Act)</h3>
        <p>
          British Columbia has its own private-sector privacy statute. There is no BC mode. The banner does not do any of the following for you:
        </p>
        <ul>
          <li>Requiring consent for personal information collection</li>
          <li>Ensuring transparency in data handling</li>
          <li>Providing mechanisms for individuals to control their data</li>
        </ul>

        <h2 id="what-about-international-privacy-laws">What About International Privacy Laws?</h2>

        <p>
          Our cookie banner also provides robust support for international privacy regulations:
        </p>

        <h3>GDPR (General Data Protection Regulation)</h3>
        <p>
          The GDPR is the benchmark for data protection in the European Union. Our banner ensures GDPR compliance by:
        </p>
        <ul>
          <li>Requiring explicit opt-in consent for non-essential cookies</li>
          <li>Providing granular control over cookie categories</li>
          <li>Logging all consent decisions for audit trails</li>
          <li>Allowing users to easily withdraw consent</li>
          <li>Ensuring data minimization and purpose limitation</li>
        </ul>
        <p>
          Learn more about <Link href="/compliance/gdpr" className="text-foreground underline">GDPR compliance requirements</Link>.
        </p>

        <h3>CCPA (California Consumer Privacy Act)</h3>
        <p>
          The CCPA is California's privacy law, which focuses on consumer rights regarding personal information. Our banner supports CCPA by:
        </p>
        <ul>
          <li>Providing an opt-out mechanism for the "sale" of personal information</li>
          <li>Offering granular control over data sharing</li>
          <li>Ensuring transparency about data collection practices</li>
          <li>Allowing users to request access to or deletion of their personal information</li>
        </ul>

        <h2 id="how-does-one-banner-cover-multiple-laws">How Does One Banner Cover Multiple Laws?</h2>

        <p>
          Our intelligent cookie banner automatically detects the geographic location of your website visitors. Based on their location, it dynamically applies the specific privacy law requirements relevant to that region.
        </p>
        <ul>
          <li><strong>EU Visitors:</strong> Opt-in before non-essential cookies, with granular controls. EU law did not adopt the UK&apos;s 2026 statistics exception.</li>
          <li><strong>UK Visitors:</strong> Advertising and cross-site tracking still need prior consent under PECR. Since 5 February 2026, cookies used only for that site&apos;s statistics, and cookies that only adapt appearance, can run with a simple, free opt-out. An opt-in banner is still valid.</li>
          <li><strong>Canadian Visitors:</strong> PIPEDA still applies. The federal replacement bill introduced in June 2026 is not in force. Meaningful consent, with implied consent only where the information is not sensitive and the notice is clear.</li>
          <li><strong>Quebec Visitors:</strong> Law 25 opt-in before non-essential identification or profiling technologies, with English and French available.</li>
          <li><strong>California Visitors:</strong> Opt-out of sale and sharing, including a way to honour Global Privacy Control. A banner by itself is not the opt-out of sale.</li>
        </ul>
        <p>
          You install one snippet. You still choose the mode. Pro geo-rules only apply the override you configured.
        </p>

        <h2 id="ready-to-achieve-global-compliance">Ready to Build a banner?</h2>

        <p>
          Use the modes that match the visitors you actually have.
        </p>
        <ul>
          <li>✓ Optional geo rules on Pro, for countries you select</li>
          <li>✓ You pick Canada, the EU, California, or custom</li>
          <li>✓ Not CASL, and not a Google-certified CMP</li>
          <li>✓ One snippet, about 28 KB gzipped</li>
        </ul>

        <h2 id="conclusion">Conclusion / TL;DR</h2>

        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li><strong>Comprehensive Coverage:</strong> Modes for Canada, the EU, and California. French is included. Pro can add a Quebec override.</li>
          <li><strong>Automatic Geo-Detection:</strong> Location detection does not choose the statute. You set the mode.</li>
          <li><strong>Simplified Compliance:</strong> One banner for the modes we ship. It does not replace a privacy program.</li>
          <li><strong>Future-Proof:</strong> Annual plans get features shipped later. The banner does not rewrite itself when a statute changes.</li>
        </ul>

        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Create a banner in the builder</li>
          <li>Customize the design to match your brand</li>
          <li>Install the code on your website</li>
          <li>Check that the scripts you added stay off until consent</li>
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
