import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, VerificationSkeleton } from '@/components/landing/modern-features-section'
import { HowItWorksDemo } from '@/components/features/how-it-works-demo'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Verify Your Cookie Banner Is Working (2026 Guide)',
  description: 'Open the site and confirm scripts you added have not run before a choice, then confirm they run after accept. Consent logs are on Pro Annual and Enterprise. There is no compliance grade.',
  keywords: 'how to verify cookie banner is working, cookie consent verification, check if cookie banner is blocking cookies, cookie banner testing, cookie consent logs, verify cookie compliance',
  openGraph: {
    title: 'How to Verify Your Cookie Banner Is Working (2026 Guide)',
    description: 'Open the site and confirm scripts you added have not run before a choice, then confirm they run after accept. There is no compliance grade.',
    type: 'article',
  },
  alternates: {
    canonical: '/features/how-it-works',
  },
}

const faqData = [
  {
    question: "How can I verify my cookie banner is working?",
    answer: "Open the site in a private window. Confirm scripts you added in the builder have not run before a choice. Accept, then confirm those scripts run. Reject, then confirm they do not. The banner cannot block cookies that other code sets."
  },
  {
    question: "How do I check if cookies are being blocked?",
    answer: "Open the site, then DevTools. On the Network tab, confirm scripts you added have not run before a choice. After accept, those requests should run. Cookies set by other code can still appear. The banner does not block those."
  },
  {
    question: "Where can I see consent logs?",
    answer: "Consent logs are on Pro Annual and Enterprise. They show the stored choice. The free plan and one-time Pro do not include them. There is no compliance grade."
  },
  {
    question: "What monitoring tools are available?",
    answer: "There is no continuous monitor and no email alert when consent changes. Check the page yourself, or run the cookie scanner to list cookies a public URL sets. The scanner does not decide compliance."
  },
  {
    question: "How do I test compliance features?",
    answer: "There is no compliance test and no grade. Test the choice: scripts you added stay off until accept, then run after accept. A banner does not make the site compliant."
  },
  {
    question: "What should I look for in browser DevTools?",
    answer: "On the Network tab, scripts you added in the builder should not run before a choice, and should run after accept. Cookies set by other code can still appear in Application or Storage."
  },
  {
    question: "How often should I verify my cookie banner?",
    answer: "Check again when you add a script, change the banner, or ship a site update. Nothing runs a check for you in the background."
  },
  {
    question: "What if my cookie banner isn't working correctly?",
    answer: "If your cookie banner isn't working correctly, check the dashboard for error messages, verify the installation code is correct, test in different browsers, and review our troubleshooting guide. Our support team can also help diagnose and fix any issues."
  }
]

const breadcrumbData = [
  { name: 'Home', url: 'https://www.cookie-banner.ca/' },
  { name: 'Features', url: 'https://www.cookie-banner.ca/features' },
  { name: 'How Do I Know It\'s Working?', url: 'https://www.cookie-banner.ca/features/how-it-works' }
]

export default function HowItWorksPage() {
  const updatedDate = '2026-10-11'
  const publishedDate = '2025-01-15'

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Do I Know My Cookie Banner Is Working?",
    "description": "Open the site and confirm scripts you added have not run before a choice, then confirm they run after accept. Consent logs are on Pro Annual and Enterprise. There is no compliance grade.",
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
      "@id": "https://www.cookie-banner.ca/features/how-it-works"
    }
  }

  const directAnswer = "Open the site and confirm scripts you added have not run before a choice, then confirm they run after accept. Consent logs are on Pro Annual and Enterprise and show the stored choice. There is no compliance grade."

  const verificationFeatures = [
    {
      title: "Consent Logs",
      description: "Pro Annual and Enterprise show the stored choice",
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-border",
    },
    {
      title: "Cookie Blocking",
      description: "Confirm scripts you added have not run before a choice",
      className: "col-span-1 lg:col-span-3 border-border",
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <StructuredData type="faq" data={faqData} />
      <StructuredData type="breadcrumb" data={breadcrumbData} />

      <FeaturePageLayout
        hero={{
          title: "How Do I Know My Cookie Banner Is Working?",
          description: "Step-by-step verification guide for cookie banner functionality",
          badge: "Verification Guide",
          updatedDate: updatedDate,
          ctaText: "Build Your Banner Free",
          ctaHref: "/builder",
          directAnswer: directAnswer,
          directAnswerLink: "/builder",
          directAnswerLinkText: "Open free builder"
        }}
        ctaText="Build Your Banner Free"
        ctaHref="/builder"
        relatedLinks={[
          { href: "/tools/cookie-scanner", text: "Free cookie scanner" },
          { href: "/features/will-this-keep-me-compliant", text: "Will This Keep Me Compliant?" },
          { href: "/features/privacy-laws", text: "What Privacy Laws Does This Cover?" },
          { href: "/features/what-you-get", text: "What Else Do I Get?" },
        ]}
      >
        <HowItWorksDemo />

        <ModernFeaturesSection
          title="Verification Methods"
          description="Multiple ways to verify your cookie banner is working correctly"
          features={verificationFeatures}
        />

        <h2 id="how-can-i-verify-cookies-are-being-blocked">How Can I Verify Scripts Stay Off Until a Choice?</h2>

        <p>
          Open the site and confirm scripts you added have not run before a choice, then confirm they run after accept. The banner cannot block cookies that other code sets.
        </p>

                <h3>Step 1: Open Your Website</h3>
                <p>
                  Visit your website in a browser (we recommend Chrome or Firefox for testing). Make sure you're using a private/incognito window or have cleared your cookies to start fresh.
                </p>

                <h3>Step 2: Open Browser DevTools</h3>
                <p>
                  Press F12 (or right-click and select "Inspect") to open browser DevTools. Navigate to the "Application" tab (Chrome) or "Storage" tab (Firefox).
                </p>

                <h3>Step 3: Check Scripts Before a Choice</h3>
                <p>
                  Before a choice, look at the Network tab. Scripts you added in the builder should not have run. Cookies set by other code can still appear.
                </p>

                <h3>Step 4: Accept and Check Again</h3>
                <p>
                  Accept, then reload the Network tab. The scripts you added should run after that choice.
                </p>

                <h3>Step 5: Reject and Check Again</h3>
                <p>
                  Reject, or change the choice, and confirm those same scripts do not run. The banner cannot remove cookies that other code already set.
                </p>

                <h2 id="how-do-i-check-consent-logs-and-records">How Do I Check Consent Logs and Records?</h2>

                <p>
                  Consent logs are on Pro Annual and Enterprise. They show the stored choice. The free plan and one-time Pro do not include them. There is no compliance grade.
                </p>

                <h2 id="what-monitoring-tools-are-available">What Monitoring Tools Are Available?</h2>

                <p>
                  There is no continuous monitor and no email alert when consent changes. Check the page yourself, or run the cookie scanner to list cookies a public URL sets. The scanner does not decide compliance.
                </p>

                <h2 id="how-do-i-test-compliance-features">How Do I Test Compliance Features?</h2>

                <p>
                  There is no compliance test and no grade. Test the choice: scripts you added stay off until accept, then run after accept. A banner does not make the site compliant.
                </p>

                <h2 id="what-should-i-look-for-in-browser-devtools">What Should I Look For in Browser DevTools?</h2>
                
                <p>
                  Browser DevTools provide detailed information about how your cookie banner is working. Here's what to check:
                </p>

                <h3>Application/Storage Tab</h3>
                <p>
                  In the Application tab (Chrome) or Storage tab (Firefox), check:
                </p>
                <ul>
                  <li><strong>Cookies:</strong> Scripts you added should not have set cookies before a choice. Cookies set by other code can still appear.</li>
                  <li><strong>Local Storage:</strong> Consent decisions are stored here. Check that consent preferences are being saved.</li>
                  <li><strong>Session Storage:</strong> Temporary banner state is stored here.</li>
                </ul>

                <h3>Network Tab</h3>
                <p>
                  In the Network tab, check:
                </p>
                <ul>
                  <li><strong>Before a choice:</strong> Scripts you added in the builder should not have run</li>
                  <li><strong>After accept:</strong> Those same scripts should run</li>
                  <li><strong>Banner Script:</strong> The cookie banner script should load successfully</li>
                </ul>

                <h3>Console Tab</h3>
                <p>
                  In the Console tab, check for:
                </p>
                <ul>
                  <li><strong>Error Messages:</strong> Any errors related to the cookie banner</li>
                  <li><strong>Banner script:</strong> The banner script should load. That load is not proof that other cookies were blocked.</li>
                </ul>

                <h2 id="how-often-should-i-verify-my-cookie-banner">How Often Should I Verify My Cookie Banner?</h2>
                
                <p>
                  Regular verification ensures your cookie banner continues to work correctly:
                </p>

                <h3>When to Check Again</h3>
                <ul>
                  <li><strong>After a new script:</strong> Confirm it stays off until a choice</li>
                  <li><strong>After a banner change:</strong> Accept and reject once in a private window</li>
                  <li><strong>After a site update:</strong> Confirm other code did not start setting cookies on its own</li>
                </ul>

                <h3>No Background Check</h3>
                <p>
                  Nothing runs a check for you in the background. Check again when you add a script, change the banner, or ship a site update.
                </p>

                <h2 id="ready-to-verify-your-banner">Ready to Verify Your Banner?</h2>
                
                <p>
                  The check is the choice itself:
                </p>

                <ul>
                  <li>Scripts you added stay off until a choice</li>
                  <li>Those scripts run after accept</li>
                  <li>Consent logs on Pro Annual and Enterprise show the stored choice</li>
                  <li>There is no compliance grade and no email alert</li>
                </ul>

                <div className="not-prose my-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                    Not Sure If Your Banner Is Working?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    The cookie scanner lists cookies a public page sets. It does not block them and it does not decide compliance.
                  </p>
                  <Link
                    href="/tools/cookie-scanner"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                  >
                    Scan Your Website Free
                  </Link>
                </div>

                <h2 id="conclusion">Conclusion / TL;DR</h2>
                
                <p><strong>Key Takeaways:</strong></p>
                <ul>
                  <li><strong>Check the scripts you added.</strong> They should not run before a choice, and they should run after accept.</li>
                  <li><strong>Other code is separate.</strong> The banner cannot block cookies that other code sets.</li>
                  <li><strong>Consent logs</strong> are on Pro Annual and Enterprise and show the stored choice. There is no compliance grade.</li>
                  <li><strong>Check again</strong> when you add a script, change the banner, or ship a site update.</li>
                </ul>

                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li>Open the site in a private window</li>
                  <li>Confirm scripts you added have not run</li>
                  <li>Accept, and confirm those scripts run</li>
                  <li>Reject, and confirm they do not</li>
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

