import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, ComplianceSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'Will This Cookie Banner Keep Me Compliant? | Automatic Compliance Verification',
  description: 'What the banner does, and what it does not. Consent tools for GDPR, UK PECR, PIPEDA, and Quebec Law 25. A banner is not a legal opinion and does not make a site compliant by itself.',
  keywords: 'will cookie banner keep me compliant, cookie consent compliance verification, how to know if cookie banner is compliant, cookie banner compliance check, GDPR compliance verification, PIPEDA compliance check',
  openGraph: {
    title: 'Will This Cookie Banner Keep Me Compliant? | Automatic Compliance Verification',
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
    answer: "You can verify compliance by checking that cookies are blocked before consent, reviewing consent logs in your dashboard, testing the banner's behavior in browser DevTools, and ensuring all required privacy law features are enabled. Our dashboard provides compliance verification tools."
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
          description: "Automatic compliance verification for GDPR, PIPEDA, CASL, and Quebec Law 25",
          badge: "Compliance Assurance",
          updatedDate: updatedDate,
          ctaText: "Get Compliant Now",
          ctaHref: "/builder",
          directAnswer: directAnswer,
          directAnswerLink: "/builder",
          directAnswerLinkText: "Get compliant now"
        }}
        ctaText="Get Compliant Now"
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
          title="Comprehensive Compliance Coverage"
          description="Consent tools for the laws that actually apply. The banner does not make a site compliant by itself."
          features={complianceFeatures}
        />

        <h2 id="how-does-our-banner-automatically-ensure-compliance">What the banner actually does</h2>
        
        <p>
          The banner can block non-essential cookies until a visitor chooses, store that choice, and show the notice in more than one language. Those are tools. They do not replace a privacy notice, a privacy officer, or a check that your scripts wait for the choice.
        </p>

        <h3>Automatic Cookie Blocking</h3>
        <p>
          The banner automatically blocks all non-essential cookies (analytics, marketing, advertising) until users provide explicit consent. This means tracking scripts like Google Analytics, Facebook Pixel, and other marketing tools won't load until users click "Accept" or select specific cookie categories.
        </p>

        <h3>Explicit Consent Requirements</h3>
        <p>
          Unlike opt-out mechanisms that assume consent, our banner requires users to actively opt-in. This meets the strictest privacy law requirements including GDPR's explicit consent standard and Quebec Law 25's opt-in requirements. Users cannot be tracked without taking a clear action.
        </p>

        <h3>Consent Logging and Records</h3>
        <p>
          Every consent decision is automatically logged with a timestamp, user choice, and IP address (anonymized). This creates an audit trail that demonstrates compliance if you're ever questioned by privacy regulators. You can access these logs through your dashboard at any time.
        </p>

        <h2 id="what-compliance-mechanisms-are-built-into-the-banner">What Compliance Mechanisms Are Built Into the Banner?</h2>
        
        <p>
          Our banner includes multiple built-in compliance mechanisms that work automatically:
        </p>

        <ul>
          <li><strong>Cookie Blocking by Default:</strong> All non-essential cookies are blocked until consent is given</li>
          <li><strong>Granular Consent Controls:</strong> Users can choose specific cookie categories (analytics, marketing, functionality)</li>
          <li><strong>Consent Withdrawal:</strong> Users can change their preferences at any time through a persistent "Cookie Settings" link</li>
          <li><strong>Bilingual Support:</strong> Full English and French support for Quebec Law 25 compliance</li>
          <li><strong>Automatic Updates:</strong> When privacy laws change, our banner is updated automatically</li>
          <li><strong>Consent Expiry Handling:</strong> Consent is automatically renewed according to each law's requirements (12 months for GDPR, 24 months for PIPEDA)</li>
        </ul>

        <h2 id="which-privacy-laws-does-this-banner-cover">Which Privacy Laws Does This Banner Cover?</h2>
        
        <p>
          Our cookie banner covers all major privacy laws that require cookie consent:
        </p>

        <h3>Canadian Privacy Laws</h3>
        <ul>
          <li><strong>PIPEDA (Personal Information Protection and Electronic Documents Act):</strong> Federal Canadian privacy law requiring meaningful consent</li>
          <li><strong>CASL (Canada's Anti-Spam Legislation):</strong> Requires consent before installing tracking software</li>
          <li><strong>Quebec Law 25:</strong> Quebec's strict privacy law requiring explicit consent and bilingual support</li>
          <li><strong>Alberta PIPA:</strong> Alberta's Personal Information Protection Act</li>
          <li><strong>BC PIPA:</strong> British Columbia's Personal Information Protection Act</li>
        </ul>

        <h3>International Privacy Laws</h3>
        <ul>
          <li><strong>GDPR (General Data Protection Regulation):</strong> EU's comprehensive data protection law</li>
          <li><strong>CCPA (California Consumer Privacy Act):</strong> California's privacy law with opt-out requirements</li>
        </ul>

        <p>
          Learn more about <Link href="/features/privacy-laws" className="text-foreground underline">all privacy laws covered by our banner</Link>.
        </p>

        <h2 id="how-do-i-verify-my-cookie-banner-is-compliant">How Do I Verify My Cookie Banner Is Compliant?</h2>
        
        <p>
          You can verify compliance through multiple methods:
        </p>

        <h3>Dashboard Verification Tools</h3>
        <p>
          Our dashboard includes built-in compliance verification tools that check:
        </p>
        <ul>
          <li>Whether cookies are being blocked before consent</li>
          <li>If consent logging is working correctly</li>
          <li>Whether all required privacy law features are enabled</li>
          <li>If your banner text meets legal requirements</li>
        </ul>

        <h3>Browser DevTools Testing</h3>
        <p>
          You can verify cookie blocking manually:
        </p>
        <ol>
          <li>Open your website in a browser</li>
          <li>Open DevTools (F12) and go to the Application/Storage tab</li>
          <li>Check that no tracking cookies are present before clicking "Accept"</li>
          <li>Click "Accept" and verify cookies are now set</li>
          <li>Click "Reject" and verify cookies are removed</li>
        </ol>

        <h3>Consent Log Review</h3>
        <p>
          Review your consent logs in the dashboard to ensure:
        </p>
        <ul>
          <li>All consent decisions are being recorded</li>
          <li>Timestamps are accurate</li>
          <li>User choices are logged correctly</li>
        </ul>

        <p>
          For detailed verification steps, see our guide on <Link href="/features/how-it-works" className="text-foreground underline">how to verify your cookie banner is working</Link>.
        </p>

        <h2 id="what-happens-if-privacy-laws-change">What Happens If Privacy Laws Change?</h2>
        
        <p>
          When privacy laws change or new requirements are introduced, we automatically update our cookie banner solution. You'll receive email notifications about:
        </p>
        <ul>
          <li>New compliance features being added</li>
          <li>Changes to existing features</li>
          <li>Recommended updates to your banner text</li>
          <li>New privacy law coverage</li>
        </ul>

        <p>
          These updates are applied automatically—you don't need to reconfigure your banner. This ensures your website remains compliant without ongoing maintenance.
        </p>

        <h2 id="how-does-this-compare-to-other-cookie-banner-solutions">How Does This Compare to Other Cookie Banner Solutions?</h2>
        
        <p>
          Unlike many cookie banner solutions, ours is designed for automatic compliance:
        </p>

        <h3>Automatic vs. Manual Configuration</h3>
        <p>
          Most cookie banner solutions require you to manually configure compliance features. You must:
        </p>
        <ul>
          <li>Research which privacy laws apply to your website</li>
          <li>Configure cookie blocking rules manually</li>
          <li>Set up consent logging yourself</li>
          <li>Update your banner when laws change</li>
        </ul>

        <p>
          Blocking, a record of the choice, and more than one language can be turned on in the banner. The legal setting still has to match the visitors you serve, and it has to be reviewed when the law changes.
        </p>

        <h3>Built-in Compliance vs. Add-ons</h3>
        <p>
          Many solutions require additional plugins or configurations for full compliance. Our banner includes all compliance features built-in:
        </p>
        <ul>
          <li>Cookie blocking (no additional scripts needed)</li>
          <li>Consent logging (included in dashboard)</li>
          <li>Multi-law support (automatic detection)</li>
          <li>Bilingual support (built-in)</li>
        </ul>

        <h2 id="ready-to-get-compliant">Ready to Get Compliant?</h2>
        
        <p>
          Set the banner to the rule that applies to each visitor. Then confirm the scripts follow that choice.
        </p>

        <ul>
          <li>✓ Block non-essential cookies until consent, where the law requires opt-in</li>
          <li>✓ EU GDPR and Quebec Law 25 still require that opt-in. UK statistics can use an opt-out since 5 February 2026. PIPEDA is still the federal Canadian law.</li>
          <li>✓ A record of the choice, so you can show what was asked and what was answered</li>
          <li>✓ English and French for Quebec</li>
          <li>✓ You still write the notice, name a privacy officer where Law 25 requires one, and review the setup when the law changes</li>
        </ul>

        <h2 id="conclusion">Conclusion / TL;DR</h2>
        
        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li><strong>Yes, our cookie banner keeps you compliant:</strong> It automatically blocks cookies until consent, implements all required privacy law features, and updates automatically when laws change.</li>
          <li><strong>Multiple compliance mechanisms:</strong> Cookie blocking, explicit consent, consent logging, granular controls, and automatic updates all work together to ensure compliance.</li>
          <li><strong>Covers all major privacy laws:</strong> GDPR, PIPEDA, CASL, Quebec Law 25, Alberta PIPA, BC PIPA, and CCPA are all covered automatically.</li>
          <li><strong>Easy verification:</strong> Use dashboard tools, browser DevTools, or consent logs to verify your banner is working correctly.</li>
          <li><strong>Automatic updates:</strong> When privacy laws change, your banner is updated automatically—no manual configuration needed.</li>
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

