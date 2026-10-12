import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, FeaturesListSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'What Else Do I Get With This Cookie Banner? | Complete Feature List',
  description: 'Free plan is one banner. Pro is $99 once or $99 per year. Consent modes for PIPEDA, Law 25, GDPR, and CCPA. A banner does not make a site compliant.',
  keywords: 'cookie banner features, cookie consent tool features, what\'s included in cookie banner, cookie banner customization options, cookie consent solution features',
  openGraph: {
    title: 'What Else Do I Get With This Cookie Banner? | Complete Feature List',
    description: 'Free plan is one banner. Pro is $99 once or $99 per year. A banner does not make a site compliant.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/features/what-you-get',
  },
}

const faqData = [
  {
    question: "What features are included with this cookie banner?",
    answer: "The free plan is one banner, seven layouts, and a powered-by badge. Pro adds unlimited banners, analytics, geo rules you configure, branding removal, and team roles. Consent logs are on Pro Annual and Enterprise. One-time Pro does not include features shipped later. There is no CASL mode."
  },
  {
    question: "What customization options are available?",
    answer: "You can customize banner colors, fonts, text, button styles, border radius, shadows, animations, positions (top, bottom, center), and layouts. All customization is done through our visual editor—no coding required. Changes are reflected instantly in the live preview."
  },
  {
    question: "Which platforms does this cookie banner work on?",
    answer: "Our cookie banner works on any platform including WordPress, Shopify, Squarespace, Wix, custom HTML sites, React apps, and any website that can include JavaScript. The installation is the same simple code snippet for all platforms."
  },
  {
    question: "What about performance and page speed impact?",
    answer: "A standard banner is about 28 KB gzipped and loads from an async script tag, so it does not block HTML parsing. That is not a Core Web Vitals promise."
  },
  {
    question: "How often are features and compliance updates released?",
    answer: "The script is hosted, so a design change can publish without pasting a new tag. A statute change does not rewrite the banner. One-time Pro does not include features shipped later. Annual does. We do not promise a monthly release or an email for every law change."
  },
  {
    question: "Can I use this on multiple websites?",
    answer: "The free plan is one banner. You can point that banner at more than one site, but it is still one configuration. Pro is unlimited banners. Each banner is configured on its own."
  },
  {
    question: "What support and documentation is available?",
    answer: "We provide comprehensive documentation, step-by-step guides, video tutorials, email support, and a knowledge base. Our support team is available to help with installation, customization, and any questions you have about using the cookie banner."
  },
  {
    question: "Do I need to update the banner code when features are added?",
    answer: "No. When we add new features or compliance updates, they're automatically included in your existing banner code. You don't need to update the code on your website—new features work automatically with your current installation."
  }
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca/' },
  { name: 'Features', url: 'https://www.cookie-banner.ca/features' },
  { name: 'What Else Do I Get?', url: 'https://www.cookie-banner.ca/features/what-you-get' }
]

export default function WhatYouGetPage() {
  const updatedDate = '2026-07-20'
  const publishedDate = '2025-01-15'

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Else Do I Get With This Cookie Banner?",
    "description": "The free plan is one banner. Pro is $99 once or $99 a year. The script is about 28 KB gzipped and loads async. A banner does not make a site compliant.",
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
      "@id": "https://www.cookie-banner.ca/features/what-you-get"
    }
  }

  const directAnswer = "The free plan is one banner. Pro is $99 once or $99 a year, with unlimited banners, analytics, geo rules you set, and branding removal. Consent logs are on Pro Annual and Enterprise. The script is about 28 KB gzipped and loads async, which is not a Core Web Vitals promise. A banner does not make a site compliant."

  const featuresList = [
    {
      title: "One banner on Free",
      description: "The free plan is one banner. Pro is unlimited banners.",
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-border",
    },
    {
      title: "Brand Customization",
      description: "Match your brand perfectly with colors, fonts, and styles",
      className: "col-span-1 lg:col-span-3 border-border",
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
          title: "What Else Do I Get With This Cookie Banner?",
          description: "Complete feature list for our cookie consent solution",
          badge: "Comprehensive Features",
          updatedDate: updatedDate,
          ctaText: "View All Features",
          ctaHref: "/builder",
          directAnswer: directAnswer,
          directAnswerLink: "/builder",
          directAnswerLinkText: "View all features"
        }}
        ctaText="View All Features"
        ctaHref="/builder"
        relatedLinks={[
          { href: "/features/will-this-keep-me-compliant", text: "Will This Keep Me Compliant?" },
          { href: "/features/privacy-laws", text: "What Privacy Laws Does This Cover?" },
          { href: "/features/how-it-works", text: "How Do I Know It's Working?" },
        ]}
      >
        {/* Features Section */}
        <ModernFeaturesSection
          title="Complete Feature Set"
          description="Everything you need to stay compliant and save time"
          features={featuresList}
        />

        <h2 id="what-customization-options-are-available">What Customization Options Are Available?</h2>

        <p>
          Our cookie banner offers extensive customization options so you can match your brand perfectly:
        </p>

        <h3>Visual Customization</h3>
        <ul>
          <li><strong>Colors:</strong> Customize background, text, button, and link colors to match your brand</li>
          <li><strong>Fonts:</strong> Choose from a wide range of modern fonts to fit your website's aesthetic</li>
          <li><strong>Styles:</strong> Adjust border radius, shadows, animations, and banner positions (top, bottom, center)</li>
          <li><strong>Layouts:</strong> Select from various banner layouts (e.g., bar, box, full-screen) to best suit your design</li>
        </ul>
        <p>
          All customization is done through our intuitive visual editor, providing instant previews without any coding required.
        </p>

        <h2 id="multi-platform-support-and-easy-integration">Multi-Platform Support and Easy Integration</h2>

        <p>
          Our cookie banner is designed to work seamlessly across all major website platforms and custom-built sites.
        </p>

        <h3>Supported Platforms</h3>
        <ul>
          <li><strong>WordPress:</strong> Simple plugin installation or code snippet integration</li>
          <li><strong>Shopify:</strong> Easy integration into your store's theme files</li>
          <li><strong>Squarespace & Wix:</strong> Add the code via custom code injection features</li>
          <li><strong>Custom HTML/React/Vue/Angular Sites:</strong> Integrate with a single JavaScript snippet</li>
        </ul>
        <p>
          The installation process is straightforward, typically involving copying and pasting a single line of code.
        </p>

        <h2 id="zero-performance-impact">About 28 KB, loaded async</h2>

        <p>
          A standard banner is about 28 KB gzipped. The script uses async, so it does not block HTML parsing.
        </p>

        <h3>Lightweight and Asynchronous</h3>
        <ul>
          <li><strong>Size:</strong> About 28 KB gzipped for a standard banner.</li>
          <li><strong>Async:</strong> The script tag uses async, so it does not block HTML parsing.</li>
          <li><strong>Not a score:</strong> This is not a Core Web Vitals or ranking promise.</li>
        </ul>
        <p>
          That is not a Core Web Vitals, SEO, or ranking promise.
        </p>

        <h2 id="automatic-compliance-updates">What a hosted script updates</h2>

        <p>
          A design change can publish without pasting a new tag. A statute change does not rewrite the banner.
        </p>

        <h3>Continuous Monitoring and Updates</h3>
        <ul>
          <li><strong>Law changes:</strong> A statute change does not rewrite the banner. Review the mode and the words yourself.</li>
          <li><strong>Later features:</strong> One-time Pro does not include features shipped later. Annual does, including consent logs.</li>
          <li><strong>No law-change email:</strong> We do not promise an email every time a statute changes.</li>
        </ul>
        <p>
          You do not re-paste the script for a design change. You do review the mode and the words when the law changes.
        </p>

        <h2 id="comprehensive-support-and-documentation">Comprehensive Support and Documentation</h2>

        <p>
          We provide all the resources you need to successfully implement and manage your cookie banner.
        </p>

        <h3>Support Resources</h3>
        <ul>
          <li><strong>Detailed Documentation:</strong> Step-by-step guides for installation, customization, and compliance.</li>
          <li><strong>Video Tutorials:</strong> Visual walkthroughs for common tasks.</li>
          <li><strong>Knowledge Base:</strong> Answers to frequently asked questions and troubleshooting tips.</li>
          <li><strong>Email Support:</strong> Our dedicated support team is available to assist you with any queries.</li>
        </ul>

        <h2 id="ready-to-unlock-all-features">Ready to Unlock All Features?</h2>

        <p>
          Experience the full power of our cookie banner solution.
        </p>
        <ul>
          <li>Free plan: one banner and a powered-by badge</li>
          <li>Pro: unlimited banners, analytics, geo rules you set, branding removal</li>
          <li>About 28 KB gzipped, loaded async. That is not a Core Web Vitals promise</li>
          <li>A banner does not make a site compliant</li>
        </ul>

        <h2 id="conclusion">Conclusion / TL;DR</h2>

        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li><strong>Free is one banner.</strong> Pro is $99 once or $99 a year, with unlimited banners.</li>
          <li><strong>Consent logs</strong> are on Pro Annual and Enterprise. One-time Pro does not include features shipped later.</li>
          <li><strong>The script</strong> is about 28 KB gzipped and loads async. That is not a Core Web Vitals promise.</li>
          <li><strong>A banner does not make a site compliant,</strong> and nothing here updates the law for you.</li>
        </ul>

        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Create your free account and design your first banner</li>
          <li>Explore all customization options in the dashboard</li>
          <li>Install the banner on your website in minutes</li>
          <li>Leverage our support resources for any questions</li>
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
