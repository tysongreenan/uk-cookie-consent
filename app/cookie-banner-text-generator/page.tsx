import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Copy,
  FileText,
  MessageSquare,
  Shield,
  Sparkles,
  Type,
  Globe,
  Scale,
  BookOpen,
  Zap,
  Palette,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Cookie Banner Text Generator — Free Copy-Paste Templates',
  description: 'Free cookie banner text templates for GDPR, CCPA, PIPEDA & Law 25. Ready-to-copy consent text in English and French. Customizable for any website.',
  keywords: [
    'cookie banner text generator',
    'cookie banner text',
    'cookie consent text',
    'cookie banner wording',
    'cookie consent banner text',
    'gdpr cookie banner text',
    'cookie policy text generator',
    'cookie notice text',
    'cookie popup text',
    'free cookie banner text',
  ],
  openGraph: {
    title: 'Cookie Banner Text Generator — Free Copy-Paste Templates',
    description: 'Free cookie banner text templates for GDPR, CCPA, PIPEDA & Law 25. Ready-to-copy consent text in English and French. Customizable for any website.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/cookie-banner-text-generator',
  },
}

const templates = [
  {
    law: 'GDPR',
    region: 'EU',
    title: 'We value your privacy',
    body: 'This website uses cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \u2018Accept All\u2019, you consent to our use of cookies. You can manage your preferences at any time.',
    buttons: ['Accept All', 'Reject All', 'Customize'],
  },
  {
    law: 'CCPA',
    region: 'California',
    title: 'Notice of Data Collection',
    body: 'We use cookies and similar technologies to collect information about your browsing activity. Under the CCPA, you have the right to opt out of the sale or sharing of your personal information.',
    buttons: ['Accept', 'Do Not Sell My Info'],
  },
  {
    law: 'PIPEDA',
    region: 'Canada',
    title: 'Cookie Consent',
    body: 'We use cookies to improve your experience on our website. By continuing to browse, you consent to our use of cookies in accordance with PIPEDA. You can withdraw consent at any time.',
    buttons: ['Accept All', 'Manage Preferences'],
  },
  {
    law: 'Law 25',
    region: 'Quebec \u2014 French',
    title: 'Nous utilisons des t\u00e9moins (cookies)',
    body: 'Ce site utilise des t\u00e9moins de connexion pour am\u00e9liorer votre exp\u00e9rience. Conform\u00e9ment \u00e0 la Loi 25 du Qu\u00e9bec, nous requ\u00e9rons votre consentement explicite avant d\u2019activer les t\u00e9moins non essentiels.',
    buttons: ['Tout accepter', 'Tout refuser', 'Personnaliser'],
  },
]

const writingTips = [
  {
    icon: MessageSquare,
    title: 'Be Clear',
    description: 'Avoid legal jargon and complex sentences. Write in plain language that any visitor can understand at a glance.',
  },
  {
    icon: FileText,
    title: 'Be Specific',
    description: 'Name what your cookies actually do — analytics, personalization, advertising. Generic text erodes trust.',
  },
  {
    icon: Shield,
    title: 'Give Control',
    description: 'Always offer accept, reject, and customize options. One-click consent without a reject button is not compliant under GDPR.',
  },
  {
    icon: Zap,
    title: 'Be Brief',
    description: 'Keep the main message under 50 words. Long banners get ignored. Put details behind a "Learn More" or preferences link.',
  },
  {
    icon: Palette,
    title: 'Match Your Brand Voice',
    description: 'Your cookie banner is part of your site. Use a tone consistent with your brand — formal, friendly, or playful.',
  },
  {
    icon: Scale,
    title: 'Include Required Legal Language',
    description: 'Each law has mandatory phrases. CCPA needs "Do Not Sell," GDPR needs purpose specification, Law 25 needs French text.',
  },
]

const faqItems = [
  {
    question: 'What should cookie banner text say?',
    answer: 'Cookie banner text should clearly state that your website uses cookies, explain what they are used for (analytics, personalization, advertising), and give visitors the option to accept, reject, or customize their preferences. The exact wording depends on which privacy laws apply to your visitors — GDPR requires explicit opt-in consent, while CCPA uses an opt-out model.',
  },
  {
    question: 'How long should cookie banner text be?',
    answer: 'The main cookie banner message should be under 50 words. Studies show that shorter banners get higher engagement rates. Put detailed information behind a "Learn More" link or in a preferences panel. The key is to communicate the essential information — what cookies you use and how to control them — without overwhelming visitors.',
  },
  {
    question: 'Does cookie banner text need to be in multiple languages?',
    answer: 'Yes, if you serve visitors in different regions. GDPR requires consent text in the user\u2019s language, and Quebec\u2019s Law 25 specifically requires French. Best practice is to detect visitor location and display the banner in their local language. Our templates above include both English and French versions.',
  },
  {
    question: 'What\u2019s the difference between opt-in and opt-out text?',
    answer: 'Opt-in text (required by GDPR) asks visitors to actively agree before cookies are set — cookies are blocked by default. Opt-out text (used by CCPA) informs visitors that cookies are already active and gives them the right to opt out. The wording differs significantly: opt-in says "we\u2019d like to use cookies," while opt-out says "we use cookies and you can opt out."',
  },
  {
    question: 'Can I customize the cookie banner text?',
    answer: 'Absolutely. The templates on this page are starting points. You should customize the text to match your brand voice, specify the exact cookies your site uses, and include links to your privacy policy. Just make sure you keep the legally required elements — purpose disclosure, consent mechanism, and any jurisdiction-specific language like "Do Not Sell" for CCPA.',
  },
  {
    question: 'Is there a legal requirement for specific wording?',
    answer: 'No privacy law prescribes exact wording, but each has requirements for what must be communicated. GDPR requires clear purpose specification and granular consent options. CCPA requires a "Do Not Sell or Share My Personal Information" link. PIPEDA requires "meaningful consent" language. Law 25 requires French text and explicit consent. The templates above meet these requirements.',
  },
]

const breadcrumbs = [
  { name: 'Home', url: 'https://www.cookie-banner.ca' },
  { name: 'Cookie Banner Text Generator', url: 'https://www.cookie-banner.ca/cookie-banner-text-generator' },
]

export default function CookieBannerTextGeneratorPage() {
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
            text: 'Free Templates \u2014 Copy & Paste',
          }}
          title="Cookie Banner Text Generator"
          title2="Ready-to-Use Consent Copy"
          description="Free cookie banner text templates for GDPR, CCPA, PIPEDA & Law 25. Copy, paste, and customize."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* Cookie Banner Text Templates */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookie Banner Text Templates
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Ready-to-copy cookie banner text for every major privacy law. Customize the wording to match your brand.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {templates.map((template) => (
                  <Card key={template.law} className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.law} Template</CardTitle>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {template.region}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 border rounded-lg p-5 space-y-3">
                        <p className="font-semibold text-foreground text-sm">{template.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{template.body}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {template.buttons.map((btn) => (
                            <span
                              key={btn}
                              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                              {btn}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Copy className="h-4 w-4" />
                        <span>Copy this template and customize for your site</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Good Cookie Banner Text */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What Makes Good Cookie Banner Text
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Six principles for writing cookie consent copy that is clear, compliant, and user-friendly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {writingTips.map((tip) => (
                  <Card key={tip.title} className="border-2">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <tip.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Banner Text by Compliance Law */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Cookie Banner Text by Compliance Law
                </h2>
                <p className="text-xl text-muted-foreground">
                  Each privacy law has specific requirements for what your cookie banner must say
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>GDPR (EU &amp; UK)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      GDPR requires <span className="font-medium text-foreground">purpose specification</span> and <span className="font-medium text-foreground">granular consent</span>. Your banner text must clearly state each purpose for cookie use (analytics, advertising, personalization) and let users accept or reject each category individually. Pre-ticked boxes are not valid consent.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Required elements: purpose of each cookie category, link to full cookie policy, accept/reject buttons with equal prominence, option to change preferences later.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>CCPA (California)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      CCPA uses an opt-out model. Your banner must include <span className="font-medium text-foreground">&quot;Do Not Sell or Share My Personal Information&quot;</span> language. Cookies can be active by default, but users must be able to opt out of data sale or sharing with a single click.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Required elements: notice of data collection, &quot;Do Not Sell or Share&quot; link, disclosure of cookie categories, link to privacy policy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>PIPEDA (Canada)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      PIPEDA requires <span className="font-medium text-foreground">meaningful consent</span> language. Your text must be clear enough that a reasonable person would understand what they are consenting to. Implied consent is acceptable for non-sensitive data, but the notice must still be prominent and understandable.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Required elements: plain-language description of data practices, clear consent mechanism, ability to withdraw consent, link to privacy policy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Type className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Law 25 (Quebec)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      Law 25 requires <span className="font-medium text-foreground">French text</span> and <span className="font-medium text-foreground">explicit consent</span> before any non-essential cookies are activated. Implied consent is not sufficient. Your banner must be in French for Quebec visitors, and consent must be obtained before tracking begins.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Required elements: French-language text, explicit opt-in consent, purpose specification, ability to withdraw consent, privacy policy link.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Skip the Templates CTA */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-2 bg-primary/10 rounded-lg inline-flex mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Skip the Templates &mdash; Generate Automatically
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                Instead of copying text manually, use our free cookie banner generator to automatically create compliant consent text matched to your brand. Enter your URL and get a fully configured, legally compliant cookie banner in minutes.
              </p>
              <p className="text-muted-foreground mb-8">
                Auto-detects your cookies, matches your brand colors, and generates the right text for every privacy law &mdash; GDPR, CCPA, PIPEDA, and Law 25.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="px-8">
                  Generate My Banner Free
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
                  Cookie Banner Text FAQ
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about writing cookie banner text
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
                    <p className="text-sm text-muted-foreground">Auto-generate a compliant banner for your site</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/free-cookie-banner-generator">
                      <Button variant="outline" className="w-full">
                        Try Generator <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Compliance Guide</CardTitle>
                    <p className="text-sm text-muted-foreground">Full guide to EU cookie consent requirements</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/gdpr">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
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
