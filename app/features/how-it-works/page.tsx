import { Metadata } from 'next'
import Link from 'next/link'
import { StructuredData } from '@/components/seo/structured-data'
import { FeaturePageLayout } from '@/components/features/feature-page-layout'
import { ModernFeaturesSection, VerificationSkeleton } from '@/components/landing/modern-features-section'
import { CheckCircle } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'How Do I Know My Cookie Banner Is Working? | Verification Guide',
  description: 'Verify your cookie banner is working with consent logs, cookie blocking verification, monitoring tools, and compliance testing. Step-by-step guide to ensure proper functionality.',
  keywords: 'how to verify cookie banner is working, cookie consent verification, check if cookie banner is blocking cookies, cookie banner testing, cookie consent logs, verify cookie compliance',
  openGraph: {
    title: 'How Do I Know My Cookie Banner Is Working? | Verification Guide',
    description: 'Verify your cookie banner is working with consent logs, cookie blocking verification, monitoring tools, and compliance testing.',
    type: 'article',
  },
}

const faqData = [
  {
    question: "How can I verify my cookie banner is working?",
    answer: "You can verify your cookie banner is working by checking consent logs in your dashboard, testing cookie blocking in browser DevTools, reviewing the banner's behavior on your website, and using our built-in compliance verification tools. All verification methods are available in your dashboard."
  },
  {
    question: "How do I check if cookies are being blocked?",
    answer: "Open your website in a browser, open DevTools (F12), go to the Application/Storage tab, and check that no tracking cookies are present before clicking 'Accept'. After clicking 'Accept', verify cookies are set. After clicking 'Reject', verify cookies are removed."
  },
  {
    question: "Where can I see consent logs?",
    answer: "Consent logs are available in your dashboard under the Analytics section. You can see all consent decisions with timestamps, user choices, and anonymized IP addresses. This creates an audit trail for compliance verification."
  },
  {
    question: "What monitoring tools are available?",
    answer: "Our dashboard includes built-in monitoring tools that check cookie blocking status, consent logging functionality, compliance feature status, and banner behavior. You can also set up email notifications for consent decisions and compliance issues."
  },
  {
    question: "How do I test compliance features?",
    answer: "Use our dashboard's compliance verification tool to automatically test all compliance features. The tool checks cookie blocking, consent logging, granular controls, consent withdrawal, and all privacy law requirements. You'll get a detailed report of any issues."
  },
  {
    question: "What should I look for in browser DevTools?",
    answer: "In browser DevTools, check the Application/Storage tab for cookies, the Network tab to see if tracking scripts are blocked, and the Console for any error messages. Before consent, you should see no tracking cookies and blocked tracking scripts."
  },
  {
    question: "How often should I verify my cookie banner?",
    answer: "We recommend verifying your cookie banner monthly or whenever you make changes to your website. Our dashboard provides automated compliance checks that run continuously, so you'll be notified of any issues automatically."
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
  const updatedDate = '2025-01-20'
  const publishedDate = '2025-01-15'

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Do I Know My Cookie Banner Is Working?",
    "description": "Verify your cookie banner is working with consent logs, cookie blocking verification, monitoring tools, and compliance testing.",
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

  const directAnswer = "You can verify your cookie banner is working through consent logs in your dashboard, cookie blocking verification in browser DevTools, built-in monitoring tools, and automated compliance testing. Our dashboard provides real-time verification that checks cookie blocking status, consent logging functionality, and all compliance features. You can also manually test by checking that cookies are blocked before consent and set after consent."

  const verificationFeatures = [
    {
      title: "Consent Logs",
      description: "View all consent decisions with timestamps and user choices",
      className: "col-span-1 lg:col-span-3 border-b lg:border-r border-border",
    },
    {
      title: "Cookie Blocking",
      description: "Verify cookies are blocked before consent in DevTools",
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
          ctaText: "See Your Banner in Action",
          ctaHref: "/dashboard",
          directAnswer: directAnswer,
          directAnswerLink: "/dashboard",
          directAnswerLinkText: "View dashboard"
        }}
        ctaText="See Your Banner in Action"
        ctaHref="/dashboard"
        relatedLinks={[
          { href: "/features/will-this-keep-me-compliant", text: "Will This Keep Me Compliant?" },
          { href: "/features/privacy-laws", text: "What Privacy Laws Does This Cover?" },
          { href: "/features/what-you-get", text: "What Else Do I Get?" },
        ]}
      >
        <ModernFeaturesSection
          title="Verification Methods"
          description="Multiple ways to verify your cookie banner is working correctly"
          features={verificationFeatures}
        />
                
        <h2 id="how-can-i-verify-cookies-are-being-blocked">How Can I Verify Cookies Are Being Blocked?</h2>
        
        <p>
          Verifying that cookies are being blocked before consent is the most important compliance check. Here's how to do it:
                </p>

                <h3>Step 1: Open Your Website</h3>
                <p>
                  Visit your website in a browser (we recommend Chrome or Firefox for testing). Make sure you're using a private/incognito window or have cleared your cookies to start fresh.
                </p>

                <h3>Step 2: Open Browser DevTools</h3>
                <p>
                  Press F12 (or right-click and select "Inspect") to open browser DevTools. Navigate to the "Application" tab (Chrome) or "Storage" tab (Firefox).
                </p>

                <h3>Step 3: Check Cookies Before Consent</h3>
                <p>
                  Before clicking "Accept" on the cookie banner, check the Cookies section in DevTools. You should see:
                </p>
                <ul>
                  <li><strong>No tracking cookies:</strong> Cookies from Google Analytics, Facebook Pixel, or other tracking tools should not be present</li>
                  <li><strong>Only essential cookies:</strong> Only strictly necessary cookies (like session cookies) should be present</li>
                </ul>

                <h3>Step 4: Accept Cookies and Verify</h3>
                <p>
                  Click "Accept" on the cookie banner, then check DevTools again. You should now see:
                </p>
                <ul>
                  <li>Tracking cookies are now present (Google Analytics, Facebook Pixel, etc.)</li>
                  <li>All cookie categories you accepted are now active</li>
                </ul>

                <h3>Step 5: Reject Cookies and Verify</h3>
                <p>
                  Click "Reject" or change your preferences to reject cookies, then check DevTools again. Tracking cookies should be removed or blocked again.
                </p>

                <h2 id="how-do-i-check-consent-logs-and-records">How Do I Check Consent Logs and Records?</h2>
                
                <p>
                  Consent logs provide an audit trail that demonstrates compliance. Here's how to access and review them:
                </p>

                <h3>Accessing Consent Logs</h3>
                <p>
                  Log in to your dashboard and navigate to the Analytics section. You'll see a "Consent Logs" tab that shows all consent decisions.
                </p>

                <h3>What Information Is Logged?</h3>
                <p>
                  Each consent decision is logged with:
                </p>
                <ul>
                  <li><strong>Timestamp:</strong> Exact date and time of the consent decision</li>
                  <li><strong>User Choice:</strong> Whether the user accepted, rejected, or selected specific cookie categories</li>
                  <li><strong>IP Address:</strong> Anonymized IP address for compliance records</li>
                  <li><strong>User Agent:</strong> Browser and device information</li>
                  <li><strong>Cookie Categories:</strong> Which specific cookie categories were accepted or rejected</li>
                </ul>

                <h3>Why Consent Logs Matter</h3>
                <p>
                  Consent logs are essential for:
                </p>
                <ul>
                  <li><strong>Compliance audits:</strong> Demonstrating to regulators that you're obtaining proper consent</li>
                  <li><strong>Dispute resolution:</strong> Proving that users consented to cookie usage</li>
                  <li><strong>Analytics:</strong> Understanding user consent patterns and preferences</li>
                </ul>

                <h2 id="what-monitoring-tools-are-available">What Monitoring Tools Are Available?</h2>
                
                <p>
                  Our dashboard includes comprehensive monitoring tools that continuously check your cookie banner's functionality:
                </p>

                <h3>Real-Time Compliance Monitoring</h3>
                <p>
                  The dashboard continuously monitors:
                </p>
                <ul>
                  <li><strong>Cookie Blocking Status:</strong> Whether cookies are being blocked before consent</li>
                  <li><strong>Consent Logging:</strong> Whether consent decisions are being recorded</li>
                  <li><strong>Banner Display:</strong> Whether the banner is appearing correctly on your website</li>
                  <li><strong>Compliance Features:</strong> Whether all required privacy law features are enabled</li>
                </ul>

                <h3>Automated Compliance Checks</h3>
                <p>
                  Our system automatically runs compliance checks that verify:
                </p>
                <ul>
                  <li>Cookie blocking is working correctly</li>
                  <li>Consent logging is functioning</li>
                  <li>All privacy law requirements are met</li>
                  <li>Banner text meets legal requirements</li>
                  <li>Privacy policy links are working</li>
                </ul>

                <h3>Email Notifications</h3>
                <p>
                  You can set up email notifications for:
                </p>
                <ul>
                  <li>Compliance issues or errors</li>
                  <li>Consent decision summaries (daily or weekly)</li>
                  <li>Banner configuration changes</li>
                  <li>New compliance features or updates</li>
                </ul>

                <h2 id="how-do-i-test-compliance-features">How Do I Test Compliance Features?</h2>
                
                <p>
                  Our dashboard includes a built-in compliance testing tool that automatically verifies all compliance features:
                </p>

                <h3>Running Compliance Tests</h3>
                <p>
                  In your dashboard, navigate to the "Compliance" section and click "Run Compliance Test". The tool will automatically check:
                </p>
                <ul>
                  <li><strong>Cookie Blocking:</strong> Verifies that cookies are blocked before consent</li>
                  <li><strong>Consent Logging:</strong> Tests that consent decisions are being recorded</li>
                  <li><strong>Granular Controls:</strong> Verifies that users can select specific cookie categories</li>
                  <li><strong>Consent Withdrawal:</strong> Tests that users can change their preferences</li>
                  <li><strong>Privacy Law Requirements:</strong> Checks that all required features are enabled</li>
                </ul>

                <h3>Test Results</h3>
                <p>
                  After running the test, you'll receive a detailed report showing:
                </p>
                <ul>
                  <li>Which compliance features are working correctly</li>
                  <li>Any issues or errors that need attention</li>
                  <li>Recommendations for improving compliance</li>
                  <li>Specific steps to fix any problems</li>
                </ul>

                <h2 id="what-should-i-look-for-in-browser-devtools">What Should I Look For in Browser DevTools?</h2>
                
                <p>
                  Browser DevTools provide detailed information about how your cookie banner is working. Here's what to check:
                </p>

                <h3>Application/Storage Tab</h3>
                <p>
                  In the Application tab (Chrome) or Storage tab (Firefox), check:
                </p>
                <ul>
                  <li><strong>Cookies:</strong> Before consent, you should see no tracking cookies. After consent, tracking cookies should appear.</li>
                  <li><strong>Local Storage:</strong> Consent decisions are stored here. Check that consent preferences are being saved.</li>
                  <li><strong>Session Storage:</strong> Temporary banner state is stored here.</li>
                </ul>

                <h3>Network Tab</h3>
                <p>
                  In the Network tab, check:
                </p>
                <ul>
                  <li><strong>Blocked Requests:</strong> Before consent, tracking script requests (Google Analytics, Facebook Pixel) should be blocked</li>
                  <li><strong>Allowed Requests:</strong> After consent, tracking scripts should load normally</li>
                  <li><strong>Banner Script:</strong> The cookie banner script should load successfully</li>
                </ul>

                <h3>Console Tab</h3>
                <p>
                  In the Console tab, check for:
                </p>
                <ul>
                  <li><strong>Error Messages:</strong> Any errors related to the cookie banner</li>
                  <li><strong>Consent Logs:</strong> Console messages showing consent decisions (if enabled)</li>
                  <li><strong>Script Loading:</strong> Confirmation that the banner script loaded correctly</li>
                </ul>

                <h2 id="how-often-should-i-verify-my-cookie-banner">How Often Should I Verify My Cookie Banner?</h2>
                
                <p>
                  Regular verification ensures your cookie banner continues to work correctly:
                </p>

                <h3>Recommended Verification Schedule</h3>
                <ul>
                  <li><strong>Monthly:</strong> Run a full compliance test at least once per month</li>
                  <li><strong>After Changes:</strong> Verify whenever you make changes to your website or banner configuration</li>
                  <li><strong>After Updates:</strong> Check after we release updates to ensure everything still works</li>
                  <li><strong>Before Audits:</strong> Verify before any compliance audits or reviews</li>
                </ul>

                <h3>Automated Monitoring</h3>
                <p>
                  Our dashboard provides automated monitoring that runs continuously, so you don't need to manually check every day. You'll receive notifications if any issues are detected.
                </p>

                <h2 id="ready-to-verify-your-banner">Ready to Verify Your Banner?</h2>
                
                <p>
                  Use our comprehensive verification tools to ensure your cookie banner is working correctly:
                </p>

                <ul>
                  <li>✓ Real-time compliance monitoring</li>
                  <li>✓ Automated compliance testing</li>
                  <li>✓ Consent logs and audit trails</li>
                  <li>✓ Browser DevTools testing guides</li>
                  <li>✓ Email notifications for issues</li>
                </ul>


                <h2 id="conclusion">Conclusion / TL;DR</h2>
                
                <p><strong>Key Takeaways:</strong></p>
                <ul>
                  <li><strong>Multiple verification methods:</strong> Use dashboard tools, browser DevTools, consent logs, and automated tests to verify your banner is working.</li>
                  <li><strong>Cookie blocking verification:</strong> Check that tracking cookies are blocked before consent and set after consent using browser DevTools.</li>
                  <li><strong>Consent logs:</strong> Review consent logs in your dashboard to see all consent decisions and create an audit trail.</li>
                  <li><strong>Automated monitoring:</strong> Our dashboard continuously monitors your banner and notifies you of any issues.</li>
                  <li><strong>Regular testing:</strong> Run compliance tests monthly or after making changes to ensure everything works correctly.</li>
                </ul>

                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li>Log in to your dashboard</li>
                  <li>Run the compliance verification test</li>
                  <li>Review consent logs to see user decisions</li>
                  <li>Test cookie blocking in browser DevTools</li>
                  <li>Set up email notifications for monitoring</li>
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

