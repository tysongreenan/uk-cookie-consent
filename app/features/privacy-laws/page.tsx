import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, ComplianceSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'What Privacy Laws Does This Cookie Banner Cover? | Multi-Jurisdiction Compliance',
  description: 'Our cookie banner covers GDPR (EU), PIPEDA, CASL, Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California). One banner, full multi-jurisdiction compliance.',
  keywords: 'what privacy laws does cookie banner cover, cookie consent laws covered, GDPR PIPEDA cookie banner, multi-jurisdiction cookie consent, cookie banner privacy laws, cookie consent compliance laws',
  openGraph: {
    title: 'What Privacy Laws Does This Cookie Banner Cover? | Multi-Jurisdiction Compliance',
    description: 'Our cookie banner covers GDPR (EU), PIPEDA, CASL, Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California). One banner, full multi-jurisdiction compliance.',
    type: 'article',
  },
}

const faqData = [
  {
    question: "What privacy laws does this cookie banner cover?",
    answer: "Our cookie banner covers GDPR (EU), PIPEDA (Canada), CASL (Canada), Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California). It automatically detects user location and applies the appropriate privacy law requirements."
  },
  {
    question: "Does this work for Canadian privacy laws?",
    answer: "Yes. Our banner fully supports all Canadian privacy laws including PIPEDA (federal), CASL, Quebec Law 25, Alberta PIPA, and BC PIPA. It includes bilingual support (English/French) required for Quebec Law 25 compliance."
  },
  {
    question: "Is this GDPR compliant?",
    answer: "Yes. Our banner is fully GDPR compliant with explicit consent requirements, cookie blocking until consent, granular consent controls, consent logging, and easy consent withdrawal. All GDPR requirements are built-in and automatic."
  },
  {
    question: "How does one banner cover multiple privacy laws?",
    answer: "Our banner automatically detects user location and applies the appropriate privacy law requirements. For example, EU users get GDPR-compliant behavior, Canadian users get PIPEDA-compliant behavior, and Quebec users get Law 25-compliant behavior—all from one banner installation."
  },
  {
    question: "What about future privacy laws?",
    answer: "When new privacy laws are introduced or existing laws change, we automatically update our cookie banner solution. You'll receive notifications about updates, and new compliance features are added automatically to ensure ongoing compliance."
  },
  {
    question: "How do I know which laws apply to my website?",
    answer: "If you have visitors from the EU, you need GDPR compliance. If you have Canadian visitors, you need PIPEDA compliance. If you have Quebec visitors, you need Quebec Law 25 compliance. Our banner automatically handles all of these based on user location."
  },
  {
    question: "Does this cover CCPA (California)?",
    answer: "Yes. Our banner includes CCPA compliance features including opt-out mechanisms, \"Do Not Sell My Personal Information\" options, and granular consent controls required by California's privacy law."
  },
  {
    question: "What if I only have Canadian visitors?",
    answer: "Our banner still works perfectly for Canadian-only websites. It will apply PIPEDA, CASL, and provincial privacy law requirements (Quebec Law 25, Alberta PIPA, BC PIPA) based on user location. You get full Canadian compliance automatically."
  }
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca/' },
  { name: 'Features', url: 'https://www.cookie-banner.ca/features' },
  { name: 'What Privacy Laws Does This Cover?', url: 'https://www.cookie-banner.ca/features/privacy-laws' }
]

export default function PrivacyLawsPage() {
  const updatedDate = '2025-01-20'
  const publishedDate = '2025-01-15'

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Privacy Laws Does This Cookie Banner Cover?",
    "description": "Our cookie banner covers GDPR (EU), PIPEDA, CASL, Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California). One banner, full multi-jurisdiction compliance.",
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

  const directAnswer = "Our cookie banner covers GDPR (EU), PIPEDA (Canada), CASL (Canada), Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California). One banner installation automatically detects user location and applies the appropriate privacy law requirements. Whether your visitors are from the EU, Canada, Quebec, or California, our banner ensures full compliance with all applicable privacy laws."

  const privacyLawsFeatures = [
    {
      title: "GDPR (EU)",
      description: "Full compliance with European Union's General Data Protection Regulation",
      className: "col-span-1 lg:col-span-2 border-b lg:border-r border-border",
    },
    {
      title: "Canadian Laws",
      description: "PIPEDA, CASL, Quebec Law 25, Alberta PIPA, BC PIPA",
      className: "col-span-1 lg:col-span-2 border-b border-border",
    },
    {
      title: "CCPA (California)",
      description: "California Consumer Privacy Act compliance built-in",
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
          description: "Multi-jurisdiction compliance for GDPR, PIPEDA, CASL, Quebec Law 25, and CCPA",
          badge: "Global Compliance",
          updatedDate: updatedDate,
          ctaText: "Achieve Global Compliance",
          ctaHref: "/dashboard",
          directAnswer: directAnswer,
          directAnswerLink: "/dashboard",
          directAnswerLinkText: "Get compliant now"
        }}
        ctaText="Achieve Global Compliance"
        ctaHref="/dashboard"
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
          description="One banner automatically handles all major privacy regulations worldwide"
          features={privacyLawsFeatures}
        />

        <h2 id="which-canadian-privacy-laws-are-covered">Which Canadian Privacy Laws Are Covered?</h2>
        
        <p>
          Our cookie banner provides comprehensive coverage for all Canadian privacy laws:
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

        <h3>CASL (Canada's Anti-Spam Legislation)</h3>
        <p>
          CASL requires consent before installing software (including tracking scripts) on someone's device. Our banner ensures CASL compliance by:
        </p>
        <ul>
          <li>Blocking tracking scripts until users provide consent</li>
          <li>Clearly identifying the organization</li>
          <li>Providing an easy way to opt-out</li>
        </ul>

        <h3>Quebec Law 25 (Bill 64)</h3>
        <p>
          Quebec has its own privacy law that's stricter than PIPEDA. Our banner fully supports Quebec Law 25 with:
        </p>
        <ul>
          <li>Explicit consent requirements (not implied consent)</li>
          <li>Opt-in behavior (not opt-out)</li>
          <li>Full bilingual support (English and French)</li>
          <li>Granular consent controls</li>
          <li>Easy consent withdrawal</li>
        </ul>
        <p>
          Quebec Law 25 includes significant fines (up to $25 million or 4% of global revenue) for non-compliance. Our banner ensures you meet all requirements automatically.
        </p>

        <h3>Alberta PIPA (Personal Information Protection Act)</h3>
        <p>
          Alberta's privacy law requires consent before collecting personal information. Our banner ensures compliance by blocking cookies until users consent and providing clear information about data collection.
        </p>

        <h3>BC PIPA (British Columbia Personal Information Protection Act)</h3>
        <p>
          British Columbia's privacy law is similar to Alberta's. Our banner ensures compliance by:
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
          <li><strong>EU Visitors:</strong> Automatically applies GDPR-compliant behavior (explicit opt-in, granular controls).</li>
          <li><strong>Canadian Visitors:</strong> Applies PIPEDA and CASL requirements.</li>
          <li><strong>Quebec Visitors:</strong> Applies Quebec Law 25 requirements (explicit opt-in, bilingual support).</li>
          <li><strong>California Visitors:</strong> Applies CCPA requirements (opt-out, "Do Not Sell" link).</li>
        </ul>
        <p>
          This means you install one banner code, and it handles the complexity of multi-jurisdictional compliance for you.
        </p>

        <h2 id="ready-to-achieve-global-compliance">Ready to Achieve Global Compliance?</h2>

        <p>
          Ensure your website is compliant with privacy laws worldwide.
        </p>
        <ul>
          <li>✓ Automatic detection of user location</li>
          <li>✓ Dynamic application of relevant privacy laws</li>
          <li>✓ Comprehensive coverage for GDPR, PIPEDA, CASL, Quebec Law 25, and CCPA</li>
          <li>✓ Simplified compliance for global audiences</li>
        </ul>

        <h2 id="conclusion">Conclusion / TL;DR</h2>

        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li><strong>Comprehensive Coverage:</strong> Our banner covers GDPR (EU), PIPEDA (Canada), CASL (Canada), Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA (California).</li>
          <li><strong>Automatic Geo-Detection:</strong> The banner automatically detects user location and applies the correct privacy law requirements.</li>
          <li><strong>Simplified Compliance:</strong> One solution for all your global privacy needs, reducing complexity and ensuring peace of mind.</li>
          <li><strong>Future-Proof:</strong> Automatic updates ensure compliance with new and changing privacy laws.</li>
        </ul>

        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Create your compliant cookie banner in our dashboard</li>
          <li>Customize the design to match your brand</li>
          <li>Install the code on your website</li>
          <li>Verify compliance using our built-in tools</li>
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
