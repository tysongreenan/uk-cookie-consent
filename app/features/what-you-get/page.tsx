import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, FeaturesListSkeleton } from '@/components/landing/modern-features-section'

export const metadata: Metadata = {
  title: 'What Else Do I Get With This Cookie Banner? | Complete Feature List',
  description: 'Get unlimited banners, brand customization, multi-platform support, zero performance impact, and automatic compliance updates. Complete feature list for cookie consent solution.',
  keywords: 'cookie banner features, cookie consent tool features, what\'s included in cookie banner, cookie banner customization options, cookie consent solution features',
  openGraph: {
    title: 'What Else Do I Get With This Cookie Banner? | Complete Feature List',
    description: 'Get unlimited banners, brand customization, multi-platform support, zero performance impact, and automatic compliance updates.',
    type: 'article',
  },
}

const faqData = [
  {
    question: "What features are included with this cookie banner?",
    answer: "Our cookie banner includes unlimited banners, brand customization (colors, fonts, styles), multi-platform support (WordPress, Shopify, Webflow, custom sites), zero performance impact, automatic compliance updates, consent logging, granular controls, and bilingual support. All features are included with your account."
  },
  {
    question: "What customization options are available?",
    answer: "You can customize banner colors, fonts, text, button styles, border radius, shadows, animations, positions (top, bottom, center), and layouts. All customization is done through our visual editor—no coding required. Changes are reflected instantly in the live preview."
  },
  {
    question: "Which platforms does this cookie banner work on?",
    answer: "Our cookie banner works on any platform including WordPress, Shopify, Webflow, Squarespace, Wix, custom HTML sites, React apps, and any website that can include JavaScript. The installation is the same simple code snippet for all platforms."
  },
  {
    question: "What about performance and page speed impact?",
    answer: "Our cookie banner has zero performance impact. The code is lightweight (under 10KB), loads asynchronously, and doesn't block page rendering. It loads in milliseconds and has no impact on your website's Core Web Vitals or page speed scores."
  },
  {
    question: "How often are features and compliance updates released?",
    answer: "We release new features and compliance updates regularly. When privacy laws change, we update the banner automatically. New features are added monthly based on user feedback. You'll receive email notifications about major updates and new features."
  },
  {
    question: "Can I use this on multiple websites?",
    answer: "Yes. You can create unlimited cookie banners for unlimited websites. Each banner can be customized independently, and you can manage all banners from one dashboard. There are no limits on the number of websites or banners you can create."
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
  const updatedDate = '2025-01-20'
  const publishedDate = '2025-01-15'

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Else Do I Get With This Cookie Banner?",
    "description": "Get unlimited banners, brand customization, multi-platform support, zero performance impact, and automatic compliance updates.",
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

  const directAnswer = "With our cookie banner, you get unlimited banners across unlimited websites, complete brand customization (colors, fonts, styles), multi-platform support (WordPress, Shopify, Webflow, custom sites), zero performance impact, automatic compliance updates, consent logging, granular cookie controls, and bilingual support. All features are included—no additional fees or premium tiers. You can customize everything to match your brand perfectly and use it on as many websites as you need."

  const featuresList = [
    {
      title: "Unlimited Banners",
      description: "Create and manage unlimited cookie banners for unlimited websites",
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
          ctaHref: "/dashboard",
          directAnswer: directAnswer,
          directAnswerLink: "/dashboard",
          directAnswerLinkText: "View all features"
        }}
        ctaText="View All Features"
        ctaHref="/dashboard"
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
          <li><strong>Webflow:</strong> Embed the code snippet directly into your project</li>
          <li><strong>Squarespace & Wix:</strong> Add the code via custom code injection features</li>
          <li><strong>Custom HTML/React/Vue/Angular Sites:</strong> Integrate with a single JavaScript snippet</li>
        </ul>
        <p>
          The installation process is straightforward, typically involving copying and pasting a single line of code.
        </p>

        <h2 id="zero-performance-impact">Zero Performance Impact</h2>

        <p>
          We understand the importance of website speed. Our cookie banner is engineered for minimal impact on your site's performance.
        </p>

        <h3>Lightweight and Asynchronous</h3>
        <ul>
          <li><strong>Small File Size:</strong> The banner code is under 10KB, ensuring fast download times.</li>
          <li><strong>Asynchronous Loading:</strong> The script loads in the background without blocking your page's rendering.</li>
          <li><strong>No Render Blocking:</strong> Your website content appears instantly, with the banner loading gracefully afterwards.</li>
        </ul>
        <p>
          This means our banner will not negatively affect your Core Web Vitals, SEO, or user experience.
        </p>

        <h2 id="automatic-compliance-updates">Automatic Compliance Updates</h2>

        <p>
          Privacy laws are constantly evolving. Our solution ensures you're always up-to-date without manual effort.
        </p>

        <h3>Continuous Monitoring and Updates</h3>
        <ul>
          <li><strong>Law Changes:</strong> When new privacy laws are introduced or existing ones are updated (e.g., GDPR, PIPEDA, Quebec Law 25), our banner is automatically updated to reflect the new requirements.</li>
          <li><strong>Feature Enhancements:</strong> We regularly release new features and improvements based on user feedback and industry best practices.</li>
          <li><strong>Notifications:</strong> You'll receive email notifications about significant updates, new compliance features, and recommended text changes.</li>
        </ul>
        <p>
          You never need to manually update your banner code on your website; all changes are applied automatically.
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
          <li>✓ Unlimited banners for all your websites</li>
          <li>✓ Full brand customization and multi-platform support</li>
          <li>✓ Zero performance impact and automatic compliance updates</li>
          <li>✓ Comprehensive support and documentation</li>
        </ul>

        <h2 id="conclusion">Conclusion / TL;DR</h2>

        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li><strong>All-Inclusive:</strong> Get unlimited banners, full customization, multi-platform support, zero performance impact, and automatic compliance updates.</li>
          <li><strong>Effortless Compliance:</strong> Our solution handles the complexities of privacy laws, keeping you compliant without manual effort.</li>
          <li><strong>User-Friendly:</strong> Intuitive visual editor and comprehensive support make managing your banner easy.</li>
          <li><strong>Future-Proof:</strong> Automatic updates ensure your banner evolves with privacy regulations and new features.</li>
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
