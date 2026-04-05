import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Cookie,
  List,
  Target,
  Settings,
  Globe,
  Mail,
  Shield,
  Scale,
  FileText,
  Landmark,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Cookie Policy Template — Free GDPR, CCPA & PIPEDA Compliant',
  description: 'Free cookie policy templates for GDPR, CCPA, PIPEDA & Quebec Law 25. Copy-paste ready. Covers what cookies you use, why, and how users can manage them.',
  keywords: [
    'cookie policy template',
    'gdpr compliant cookie policy template',
    'cookie policy template canada',
    'free cookie policy template',
    'cookie policy generator',
    'ccpa cookie policy template',
    'cookie policy example',
    'website cookie policy template',
    'cookie policy template free',
    'pipeda cookie policy',
  ],
  openGraph: {
    title: 'Cookie Policy Template — Free GDPR, CCPA & PIPEDA Compliant',
    description: 'Free cookie policy templates for GDPR, CCPA, PIPEDA & Quebec Law 25. Copy-paste ready. Covers what cookies you use, why, and how users can manage them.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/cookie-policy-template',
  },
}

const faqItems = [
  {
    question: "Do I need a cookie policy?",
    answer: "Yes, if your website uses cookies — and almost all websites do. The GDPR, CCPA, PIPEDA, and Quebec Law 25 all require you to inform visitors about what cookies you use, why you use them, and how they can opt out. A cookie policy is the standard way to meet this requirement."
  },
  {
    question: "Is a cookie policy the same as a privacy policy?",
    answer: "No. A privacy policy covers all personal data processing (forms, accounts, emails, etc.), while a cookie policy specifically addresses cookies and tracking technologies on your website. Many businesses include cookie details in their privacy policy, but a separate cookie policy is clearer and easier for visitors to find — and some regulations recommend or require it."
  },
  {
    question: "What's the difference between a cookie policy and a cookie banner?",
    answer: "A cookie banner is the pop-up or bar that appears on your website asking visitors to accept or reject cookies. A cookie policy is the full document explaining what cookies you use, why, and how visitors can manage them. You need both — the banner collects consent, and the policy provides the detailed disclosure. Your banner should link to your cookie policy."
  },
  {
    question: "How often should I update my cookie policy?",
    answer: "You should update your cookie policy whenever you add or remove cookies, change tracking tools (e.g., switching analytics providers), or when privacy laws change. As a best practice, review your cookie policy at least every 6 months. Run a cookie scan on your site to check for new or unknown cookies."
  },
  {
    question: "Do I need a separate cookie policy for each country?",
    answer: "No, you don't need separate policies per country, but your single cookie policy must cover the requirements of every jurisdiction where you have visitors. This template covers GDPR (EU), CCPA (California), PIPEDA (Canada), and Law 25 (Quebec). If you serve visitors from Quebec, you should also provide a French version."
  },
  {
    question: "Can I use this template for free?",
    answer: "Yes, this template is completely free to use. Copy it, customize it with your company details and cookie information, and publish it on your website. However, this is a general template — we recommend consulting with a legal professional to ensure it meets the specific requirements of your business and jurisdiction."
  },
]

const breadcrumbs = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "Cookie Policy Template", url: "https://www.cookie-banner.ca/cookie-policy-template" },
]

export default function CookiePolicyTemplatePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <StructuredData type="faq" data={faqItems} />
      <StructuredData type="breadcrumb" data={breadcrumbs} />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "Free Templates — Ready to Use",
          }}
          title="Cookie Policy Template"
          title2="GDPR, CCPA & Canadian Compliant"
          description="Free cookie policy templates you can copy and customize. Covers GDPR, CCPA, PIPEDA & Quebec Law 25."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* What a Cookie Policy Must Include */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What a Cookie Policy Must Include
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Every cookie policy needs these six sections to meet GDPR, CCPA, PIPEDA, and Law 25 requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Cookie className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">What Cookies Are</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A clear definition of cookies and similar tracking technologies (pixels, web beacons, local storage) in plain language your visitors can understand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <List className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">What Cookies Your Site Uses</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A breakdown by category — essential cookies (login, security), analytics cookies (Google Analytics), and marketing cookies (ad retargeting, social pixels).
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Why You Use Cookies</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The specific purposes for each cookie category — site functionality, traffic analysis, personalized advertising, or fraud prevention.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">How Users Can Manage Cookies</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Instructions for accepting or rejecting cookies through your cookie banner, browser settings, and any opt-out mechanisms you provide.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Third-Party Cookies</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Disclosure of any cookies set by third parties — Google Analytics, Facebook Pixel, YouTube embeds, Stripe — with links to their privacy policies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">How to Contact You</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your company name, email address, and privacy officer contact (required by PIPEDA and Law 25). Visitors must be able to reach you with questions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Policy Template */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookie Policy Template
                </h2>
                <p className="text-xl text-muted-foreground">
                  Copy this template and customize it for your website
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-8 pb-8">
                  {/* Disclaimer */}
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-8">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Note:</span> This is a general template. Customize it for your specific website and consult legal counsel for your jurisdiction.
                      </p>
                    </div>
                  </div>

                  {/* Template Content */}
                  <div className="prose prose-sm max-w-none text-foreground space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">Cookie Policy</h3>
                    <p className="text-sm text-muted-foreground italic">Last updated: [Date]</p>

                    <p className="text-muted-foreground">
                      This Cookie Policy explains how [Your Company Name] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar tracking technologies when you visit our website [yourwebsite.com]. It explains what these technologies are, why we use them, and your rights to control our use of them.
                    </p>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">1. What Are Cookies</h4>
                      <p className="text-muted-foreground">
                        Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners useful information. Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by external services we use).
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">2. How We Use Cookies</h4>
                      <p className="text-muted-foreground mb-4">
                        We use the following categories of cookies on our website:
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="border-b-2 border-border">
                              <th className="text-left py-3 px-4 font-bold text-foreground">Category</th>
                              <th className="text-left py-3 px-4 font-bold text-foreground">Purpose</th>
                              <th className="text-left py-3 px-4 font-bold text-foreground">Examples</th>
                              <th className="text-left py-3 px-4 font-bold text-foreground">Consent</th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 font-medium text-foreground">Essential Cookies</td>
                              <td className="py-3 px-4">Session management, security, load balancing</td>
                              <td className="py-3 px-4">Session ID, CSRF token, login state</td>
                              <td className="py-3 px-4">Always active</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/30">
                              <td className="py-3 px-4 font-medium text-foreground">Analytics Cookies</td>
                              <td className="py-3 px-4">Page views, traffic sources, user behavior analysis</td>
                              <td className="py-3 px-4">Google Analytics (_ga, _gid)</td>
                              <td className="py-3 px-4">Require consent</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="py-3 px-4 font-medium text-foreground">Marketing Cookies</td>
                              <td className="py-3 px-4">Ad retargeting, conversion tracking, social media integration</td>
                              <td className="py-3 px-4">Facebook Pixel (_fbp), Google Ads (gclid)</td>
                              <td className="py-3 px-4">Require consent</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">3. Your Choices</h4>
                      <p className="text-muted-foreground mb-3">
                        You can manage your cookie preferences in the following ways:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li><span className="font-medium text-foreground">Cookie banner:</span> When you first visit our site, you can accept or reject non-essential cookies through our consent banner. You can change your preferences at any time by clicking the cookie settings icon.</li>
                        <li><span className="font-medium text-foreground">Browser settings:</span> Most browsers allow you to block or delete cookies through their settings. Note that blocking essential cookies may affect site functionality.</li>
                        <li><span className="font-medium text-foreground">Opt-out links:</span> For specific third-party cookies, you can use the opt-out mechanisms provided by those services (see Section 4).</li>
                      </ul>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">4. Third-Party Cookies</h4>
                      <p className="text-muted-foreground mb-3">
                        We use the following third-party services that may set cookies on your device:
                      </p>
                      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li><span className="font-medium text-foreground">Google Analytics</span> — Website traffic analysis. <span className="text-primary">[Privacy Policy: https://policies.google.com/privacy]</span></li>
                        <li><span className="font-medium text-foreground">Facebook/Meta Pixel</span> — Advertising and conversion tracking. <span className="text-primary">[Privacy Policy: https://www.facebook.com/privacy/policy]</span></li>
                        <li><span className="font-medium text-foreground">[Other services you use]</span> — [Purpose]. <span className="text-primary">[Privacy Policy URL]</span></li>
                      </ul>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">5. Cookie Policy Updates</h4>
                      <p className="text-muted-foreground">
                        We may update this Cookie Policy from time to time to reflect changes in the cookies we use, changes in technology, or changes in applicable laws. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this policy and, where appropriate, notify you through our cookie banner.
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">6. Contact Us</h4>
                      <p className="text-muted-foreground">
                        If you have questions about our use of cookies, please contact us:
                      </p>
                      <ul className="list-none pl-0 text-muted-foreground space-y-1 mt-3">
                        <li><span className="font-medium text-foreground">Company:</span> [Your Company Name]</li>
                        <li><span className="font-medium text-foreground">Email:</span> [Your Email Address]</li>
                        <li><span className="font-medium text-foreground">Privacy Officer:</span> [Name and Contact, if applicable]</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cookie Policy by Jurisdiction */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookie Policy by Jurisdiction
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Each privacy law has specific requirements for what your cookie policy must include
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">GDPR (EU/EEA)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>Must list all cookies, their purposes, duration, and whether they are first or third party</li>
                      <li>Must explain the legal basis for processing (consent or legitimate interest)</li>
                      <li>Must provide a link to manage consent preferences at any time</li>
                      <li>Non-essential cookies must be blocked until the user gives explicit opt-in consent</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Scale className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">CCPA (California)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>Must disclose the categories of personal information collected through cookies</li>
                      <li>Must include &quot;Do Not Sell or Share My Personal Information&quot; instructions</li>
                      <li>Must describe consumer rights: right to know, delete, and opt out</li>
                      <li>Must identify categories of third parties who receive cookie data</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">PIPEDA (Canada)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>Must explain what information is collected through cookies and why</li>
                      <li>Must describe the consent process and how users can withdraw consent</li>
                      <li>Must name your organization&apos;s privacy officer and provide contact details</li>
                      <li>Must explain how personal information is protected and how long it is retained</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Landmark className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Law 25 (Quebec)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>Includes all PIPEDA requirements plus stricter consent and transparency rules</li>
                      <li>Must be available in French for Quebec residents</li>
                      <li>Must describe privacy impact assessment if applicable to your data processing</li>
                      <li>Must provide a clear mechanism for users to withdraw consent at any time</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pair Your Policy With a Cookie Banner */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Pair Your Policy With a Cookie Banner
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                A cookie policy without a cookie banner is incomplete — you need both. Your cookie policy explains what cookies you use, but a cookie banner is what actually collects consent from your visitors.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
                Our free cookie banner generator automatically creates a compliant banner that links to your cookie policy, blocks non-essential cookies until consent is given, and logs every consent transaction for your records. It works with GDPR, CCPA, PIPEDA, and Law 25 out of the box.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="px-8">
                  Generate My Free Cookie Banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookie Policy FAQ
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about cookie policies and compliance
                </p>
              </div>

              <div className="space-y-6">
                {faqItems.map((item) => (
                  <Card key={item.question} className="border-2">
                    <CardHeader>
                      <CardTitle>{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Related Resources
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Free Cookie Banner Generator</CardTitle>
                    <p className="text-sm text-muted-foreground">Create a compliant cookie banner in minutes</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/free-cookie-banner-generator">
                      <Button variant="outline" className="w-full">
                        Generate Banner <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Banner Text Generator</CardTitle>
                    <p className="text-sm text-muted-foreground">AI-powered consent text for your banner</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/cookie-banner-text-generator">
                      <Button variant="outline" className="w-full">
                        Generate Text <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Cookie Scanner</CardTitle>
                    <p className="text-sm text-muted-foreground">Free tool to audit your site&apos;s cookies</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/tools/cookie-scanner">
                      <Button variant="outline" className="w-full">
                        Scan Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
