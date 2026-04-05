import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Shield, Globe, Scale, FileText, Lock, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PrivacyPolicyGenerator } from './privacy-policy-generator'

export const metadata: Metadata = {
  title: 'Free Privacy Policy Generator | GDPR, PIPEDA, CCPA Compliant',
  description: 'Generate a free, legally compliant privacy policy for your website in minutes. Covers GDPR, PIPEDA, CCPA, and Quebec Law 25.',
  keywords: 'privacy policy generator, free privacy policy, GDPR privacy policy, PIPEDA privacy policy, CCPA privacy policy, privacy policy template, website privacy policy, Law 25 privacy policy',
  openGraph: {
    title: 'Free Privacy Policy Generator | GDPR, PIPEDA, CCPA Compliant',
    description: 'Generate a free, legally compliant privacy policy for your website in minutes. Covers GDPR, PIPEDA, CCPA, and Quebec Law 25.',
    type: 'website',
    url: 'https://www.cookie-banner.ca/tools/privacy-policy',
  },
  alternates: {
    canonical: '/tools/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free Privacy Policy Generator",
    "url": "https://www.cookie-banner.ca/tools/privacy-policy",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD"
    },
    "author": {
      "@type": "Organization",
      "name": "Cookie Banner",
      "url": "https://www.cookie-banner.ca"
    },
    "description": "Free privacy policy generator that creates legally compliant privacy policies covering GDPR, PIPEDA, CCPA, and Quebec Law 25. Customize for your business in minutes.",
    "featureList": [
      "GDPR compliant privacy policies",
      "PIPEDA compliant privacy policies",
      "CCPA/CPRA compliant privacy policies",
      "Quebec Law 25 compliant privacy policies",
      "Customizable for any business type",
      "Free to generate and download",
      "Hosted privacy policy pages",
      "Automatic jurisdiction detection"
    ]
  }

  const faqItems = [
    {
      question: "Is this privacy policy generator really free?",
      answer: "Yes, generating a privacy policy is 100% free. You can create, copy, and use the policy on your website at no cost. Paid plans offer additional features like hosted policy pages with a custom URL, automatic updates, and version history."
    },
    {
      question: "Does this privacy policy cover GDPR requirements?",
      answer: "Yes. The generator creates GDPR-compliant sections covering lawful basis for processing, data subject rights (access, rectification, erasure, portability, restriction, objection), data protection officer details, international data transfers, and cookie disclosures."
    },
    {
      question: "What privacy laws does this generator cover?",
      answer: "The generator covers GDPR (EU/EEA/UK), PIPEDA (Canada), CCPA/CPRA (California), and Quebec Law 25. It automatically includes the relevant sections based on your business location and where your users are located."
    },
    {
      question: "How often should I update my privacy policy?",
      answer: "You should update your privacy policy whenever you change how you collect or use personal data, add new third-party services, change your data retention practices, or when privacy laws are updated. At minimum, review your policy annually."
    },
    {
      question: "Can I host my privacy policy on your platform?",
      answer: "Yes. Pro users can publish their privacy policy to a hosted URL (e.g., cookie-banner.ca/p/your-business). This page is SEO-optimized, always up to date, and includes a 'last updated' timestamp for compliance."
    },
    {
      question: "Do I need a privacy policy if I only use cookies?",
      answer: "Yes. Cookies collect personal data such as IP addresses and browsing behavior. Under GDPR, PIPEDA, CCPA, and most other privacy laws, you must have a privacy policy that discloses all data collection practices, including cookies. A cookie banner alone is not sufficient."
    },
    {
      question: "What is the difference between a privacy policy and a cookie policy?",
      answer: "A privacy policy covers all personal data collection and processing practices for your business. A cookie policy specifically addresses the cookies and tracking technologies your website uses. Many businesses include cookie disclosures within their privacy policy, which is what our generator does. You can also have a separate, standalone cookie policy."
    },
    {
      question: "Is a generated privacy policy legally binding?",
      answer: "A generated privacy policy creates a legally binding commitment between your business and your users. However, it is only as accurate as the information you provide. Make sure you answer all questions truthfully and update the policy when your practices change. For complex legal situations, consult a privacy attorney."
    }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.cookie-banner.ca" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.cookie-banner.ca/tools" },
      { "@type": "ListItem", "position": 3, "name": "Privacy Policy Generator", "item": "https://www.cookie-banner.ca/tools/privacy-policy" }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Static JSON-LD structured data for SEO - all content is hardcoded, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Hero: Generator Above the Fold — tight padding to get the tool visible fast */}
        <section className="pt-8 sm:pt-10 pb-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Compact header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      100% Free
                    </div>
                    <span className="text-xs text-muted-foreground">No signup required</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                    Privacy Policy Generator
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Answer 3 quick questions. Get a legally compliant privacy policy. Copy &amp; paste it on your site.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-center sm:text-right">
                  <div>
                    <div className="text-2xl font-bold text-foreground">5 min</div>
                    <div className="text-[11px] text-muted-foreground">to generate</div>
                  </div>
                  <div className="h-8 w-px bg-border hidden sm:block" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">4</div>
                    <div className="text-[11px] text-muted-foreground">laws covered</div>
                  </div>
                </div>
              </div>

              {/* Generator — immediately visible */}
              <PrivacyPolicyGenerator />
            </div>
          </div>
        </section>

        {/* What you get strip */}
        <section className="bg-muted/50 py-5 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />GDPR compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />PIPEDA compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />CCPA compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />Law 25 compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />Copy &amp; paste ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />No signup</span>
            </div>
          </div>
        </section>

        {/* Why You Need a Privacy Policy */}
        <section id="why-privacy-policy" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Why You Need a Privacy Policy
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  A <strong>privacy policy</strong> is a legal document that explains how your business collects, uses, stores, and protects personal information from visitors and customers. It is not optional -- virtually every privacy law worldwide requires businesses that collect personal data to publish a clear, accessible privacy policy.
                </p>
                <p>
                  Even if you think your website &quot;does not collect data,&quot; it almost certainly does. Analytics tools like Google Analytics, contact forms, email signup widgets, payment processors, and even your web hosting provider all collect personal information. Without a privacy policy that discloses these practices, you are violating privacy regulations and exposing your business to fines, lawsuits, and loss of customer trust.
                </p>
                <p>
                  Third-party platforms also require privacy policies. Google requires a privacy policy to use AdSense or Google Analytics. Apple and Google require one for mobile apps listed in their stores. Payment processors like Stripe and PayPal require merchants to have a privacy policy. Without one, you may lose access to essential business tools.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Happens Without a Privacy Policy?</h3>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Legal penalties</strong> -- GDPR fines up to 4% of annual revenue, PIPEDA penalties up to CAD $10 million, CCPA fines up to $7,500 per violation.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Platform restrictions</strong> -- Google, Apple, Facebook, and payment processors may suspend your accounts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Loss of trust</strong> -- users expect transparency and may leave your site if they cannot find a privacy policy.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What Laws Require a Privacy Policy? */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                What Laws Require a Privacy Policy?
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  Multiple privacy regulations around the world require businesses to maintain a privacy policy. Our <strong>privacy policy generator</strong> covers the four most impactful laws for businesses operating online.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">GDPR (General Data Protection Regulation)</h3>
                <p>
                  The <Link href="/compliance/gdpr" className="text-primary hover:underline font-medium">GDPR</Link> applies to any business that processes personal data of EU/EEA residents, regardless of where the business is based. It requires your privacy policy to include: the identity of the data controller, lawful basis for each processing activity, categories of personal data collected, data retention periods, data subject rights (access, rectification, erasure, portability, restriction, objection), details of international data transfers, and information about automated decision-making.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">PIPEDA (Personal Information Protection and Electronic Documents Act)</h3>
                <p>
                  <Link href="/compliance/pipeda" className="text-primary hover:underline font-medium">PIPEDA</Link> is Canada&apos;s federal privacy law, applying to private-sector organizations that collect, use, or disclose personal information in the course of commercial activity. Your privacy policy must explain what personal information you collect, why you collect it, how you use and disclose it, and how individuals can access or correct their information. PIPEDA emphasizes meaningful consent -- your policy must be written in plain language that users can actually understand.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">CCPA/CPRA (California Consumer Privacy Act)</h3>
                <p>
                  The <Link href="/compliance/ccpa" className="text-primary hover:underline font-medium">CCPA</Link>, as amended by the CPRA, applies to businesses that collect personal information from California residents and meet certain revenue or data volume thresholds. Your privacy policy must disclose the categories of personal information collected, the purposes for collection, categories of third parties with whom data is shared, and consumer rights including the right to know, delete, correct, and opt out of the sale or sharing of personal information.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-10 mb-4">Quebec Law 25</h3>
                <p>
                  Quebec&apos;s Law 25 (formerly Bill 64) modernizes privacy protection in Quebec, Canada. It requires businesses to appoint a privacy officer, conduct privacy impact assessments, obtain explicit consent for collecting sensitive information, and maintain a comprehensive privacy policy. The law imposes some of the strictest consent requirements in North America, particularly for biometric data and data about minors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Should a Privacy Policy Include? */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  What Should a Privacy Policy Include?
                </h2>
                <p className="text-xl text-muted-foreground">
                  A comprehensive privacy policy covers these essential sections
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle>Data Controller Identity</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Who is responsible for processing personal data -- your business name, address, and contact details for privacy inquiries.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle>Data Collected</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      What personal information you collect -- names, emails, IP addresses, payment data, device information, and browsing behavior.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle>Purpose of Processing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Why you collect and process data -- service delivery, analytics, marketing, legal compliance, and legitimate business interests.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <CardTitle>Third-Party Sharing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Who you share data with -- analytics providers, payment processors, advertising networks, and any other third-party services.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle>User Rights</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      What rights users have over their data -- access, correction, deletion, portability, objection, and how to exercise those rights.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                        <Scale className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <CardTitle>Cookie Disclosures</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      What cookies and tracking technologies your site uses, their purposes, and how users can manage cookie preferences.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-6 bg-background">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Related Compliance Tools and Resources
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Link href="/tools/cookie-scanner" className="group">
                  <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">Cookie Scanner</h3>
                        <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scan your website for cookies and tracking scripts. Pair with your privacy policy for full compliance.
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/compliance/gdpr" className="group">
                  <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">GDPR Compliance Guide</h3>
                        <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Understand GDPR requirements and how to achieve full compliance for your website.
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/compliance/pipeda" className="group">
                  <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">PIPEDA Compliance Guide</h3>
                        <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Everything you need to know about Canada&apos;s federal privacy law and how it affects your business.
                      </p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/compliance/ccpa" className="group">
                  <Card className="border-2 hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">CCPA Compliance Guide</h3>
                        <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Learn about California&apos;s consumer privacy act and your obligations as a business.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
