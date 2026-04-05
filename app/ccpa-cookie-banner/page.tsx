import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  Shield,
  AlertTriangle,
  Globe,
  ArrowRight,
  Scale,
  Eye,
  EyeOff,
  FileText,
  DollarSign,
  Users,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'CCPA Cookie Banner — Free California Privacy Compliance',
  description: 'Free CCPA-compliant cookie banner with "Do Not Sell My Info" built in. Meets CPRA requirements. Auto-detects California visitors. Works on any website. Set up in 5 minutes.',
  keywords: [
    'ccpa cookie banner',
    'ccpa compliant cookie banner',
    'california cookie banner',
    'ccpa cookie consent',
    'do not sell my information banner',
    'cpra cookie banner',
    'ccpa compliance tool',
    'california privacy cookie banner',
    'free ccpa cookie banner',
    'ccpa banner generator',
  ],
  openGraph: {
    title: 'CCPA Cookie Banner — Free California Privacy Compliance',
    description: 'Free CCPA-compliant cookie banner with "Do Not Sell My Info" built in. Auto-detects California visitors. Set up in 5 minutes.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/ccpa-cookie-banner',
  },
}

const faqItems = [
  {
    question: "Do I need a CCPA cookie banner?",
    answer: 'If your business collects personal information from California residents and meets CCPA thresholds (annual gross revenue over $25 million, buys/sells data of 100,000+ consumers, or derives 50%+ of revenue from selling personal information), you need a CCPA-compliant cookie banner with a "Do Not Sell My Personal Information" link.'
  },
  {
    question: "What is the difference between CCPA and CPRA?",
    answer: 'The CPRA (California Privacy Rights Act) amended and expanded the CCPA effective January 2023. It added the right to opt out of "sharing" personal information (not just selling), created the California Privacy Protection Agency, and introduced the concept of "sensitive personal information." Our cookie banner handles both CCPA and CPRA requirements automatically.'
  },
  {
    question: "What are CCPA penalties for non-compliance?",
    answer: "CCPA violations can result in fines of $2,500 per unintentional violation and $7,500 per intentional violation. The California Attorney General and the California Privacy Protection Agency (CPPA) can enforce these penalties. Consumers can also sue for data breaches, with statutory damages of $100-$750 per consumer per incident."
  },
  {
    question: "Does the CCPA require opt-in or opt-out consent?",
    answer: 'Unlike GDPR which requires opt-in consent, CCPA uses an opt-out model. You can collect and use personal information by default, but must provide a clear "Do Not Sell or Share My Personal Information" mechanism. The exception is for minors: children under 13 require parental opt-in, and consumers aged 13-15 must opt in themselves.'
  },
  {
    question: "Can this cookie banner detect California visitors automatically?",
    answer: 'Yes. Our cookie banner uses geolocation to detect visitors from California and automatically displays CCPA-specific consent options, including the "Do Not Sell or Share My Personal Information" link. Visitors from other regions see the appropriate consent banner for their jurisdiction (GDPR for EU, PIPEDA for Canada, etc.).'
  },
  {
    question: "Is this CCPA cookie banner really free?",
    answer: 'Yes, our free plan includes full CCPA compliance features including the "Do Not Sell" opt-out, cookie categorization, consent logging, and geolocation detection. No credit card required to get started.'
  },
]

const breadcrumbs = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "CCPA Cookie Banner", url: "https://www.cookie-banner.ca/ccpa-cookie-banner" },
]

export default function CCPACookieBannerPage() {
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
            text: "Free Plan — No Credit Card Required",
          }}
          title="CCPA Cookie Banner"
          title2="California Privacy Compliance Made Easy"
          description={`"Do Not Sell My Info" built in. Auto-detects California visitors. Free plan available. Set up in 5 minutes.`}
          emailCapture={true}
          useGeometricBackground={true}
        />

        {/* What CCPA Requires */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What the CCPA Requires for Cookie Banners
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  The California Consumer Privacy Act (CCPA) and its amendment CPRA have specific requirements for how websites handle cookies and personal data.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <EyeOff className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">&quot;Do Not Sell&quot; Link</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      CCPA requires a clear &quot;Do Not Sell or Share My Personal Information&quot; link on your website. Our banner includes this automatically.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Right to Know</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Consumers can request what personal information you&apos;ve collected. Our banner clearly discloses cookie categories and their purposes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Scale className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Opt-Out Model</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unlike GDPR&apos;s opt-in model, CCPA allows default data collection with the right to opt out. Our banner handles both models by jurisdiction.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Minors Protection</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      CCPA requires opt-in consent for consumers under 16 and parental consent for children under 13. Our banner supports age-gated consent flows.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Consent Records</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You must maintain records of consumer consent and opt-out requests. Our tool logs every consent transaction with timestamps for audit trails.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Non-Discrimination</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You cannot discriminate against consumers who exercise their CCPA rights. Our banner ensures equal access regardless of consent choice.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CCPA vs GDPR */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  CCPA vs GDPR — Key Differences
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our cookie banner handles both automatically based on visitor location
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-6 font-bold text-foreground">Requirement</th>
                      <th className="text-center py-4 px-6 font-bold text-foreground">CCPA (California)</th>
                      <th className="text-center py-4 px-6 font-bold text-foreground">GDPR (EU)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-4 px-6 font-medium text-foreground">Consent Model</td>
                      <td className="py-4 px-6 text-center">Opt-out</td>
                      <td className="py-4 px-6 text-center">Opt-in</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-6 font-medium text-foreground">Default Cookie Behavior</td>
                      <td className="py-4 px-6 text-center">Cookies allowed by default</td>
                      <td className="py-4 px-6 text-center">Cookies blocked until consent</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-6 font-medium text-foreground">Required Link</td>
                      <td className="py-4 px-6 text-center">&quot;Do Not Sell or Share&quot;</td>
                      <td className="py-4 px-6 text-center">Cookie preferences panel</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-6 font-medium text-foreground">Fines</td>
                      <td className="py-4 px-6 text-center">$2,500–$7,500 per violation</td>
                      <td className="py-4 px-6 text-center">Up to 4% of global revenue</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-6 font-medium text-foreground">Who It Applies To</td>
                      <td className="py-4 px-6 text-center">Businesses with CA consumers</td>
                      <td className="py-4 px-6 text-center">Anyone processing EU data</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-6 font-medium text-foreground">Revenue Threshold</td>
                      <td className="py-4 px-6 text-center">$25M+ annual revenue</td>
                      <td className="py-4 px-6 text-center">No threshold</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <p className="text-lg font-medium text-foreground">
                  Our cookie banner automatically switches between CCPA opt-out and GDPR opt-in based on your visitor&apos;s location — so you&apos;re compliant everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Penalties Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  CCPA Fines You Need to Avoid
                </h2>
                <p className="text-xl text-muted-foreground">
                  California is actively enforcing CCPA — here&apos;s what non-compliance costs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">$2,500</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Per Unintentional Violation</p>
                    <p className="text-sm text-muted-foreground">
                      Each missing &quot;Do Not Sell&quot; link, uncategorized cookie, or missing disclosure can be a separate violation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">$7,500</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Per Intentional Violation</p>
                    <p className="text-sm text-muted-foreground">
                      Knowingly failing to comply after being notified, or ignoring opt-out requests, triggers higher penalties.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">$100–$750</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Per Consumer (Data Breach)</p>
                    <p className="text-sm text-muted-foreground">
                      Consumers can sue directly for data breaches resulting from failure to implement reasonable security.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  With our free cookie banner, CCPA compliance takes 5 minutes — not $50,000 in legal fees.
                </p>
                <Link href="/auth/signup">
                  <Button size="lg" className="px-8">
                    Get CCPA Compliant Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  How Our CCPA Cookie Banner Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get CCPA compliant in under 5 minutes — no coding required
                </p>
              </div>

              <div className="space-y-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                      Enter Your Website URL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We scan your site to detect existing cookies, tracking scripts (Google Analytics, Facebook Pixel, etc.), and branding. Everything is imported automatically so your banner matches your site from day one.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                      CCPA Compliance is Auto-Configured
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our builder automatically adds the required &quot;Do Not Sell or Share My Personal Information&quot; opt-out link, categorizes your cookies (essential, analytics, marketing), and sets up consent logging for audit trails.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                      Customize Your Banner Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Match your banner to your brand with custom colors, positioning (13 options), logo upload, and animations. Preview changes in real-time with our visual builder.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                      Add One Line of Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <p className="text-muted-foreground">
                        Copy a single script tag into your site&apos;s &lt;head&gt; section. Works on WordPress, Shopify, Webflow, Squarespace, Wix, or any custom site. No plugins or apps needed.
                      </p>
                      <div className="bg-card border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-muted-foreground">{`<!-- CCPA Cookie Banner -->
<script src="https://www.cookie-banner.ca
  /api/v1/banner.js?id=YOUR_ID">
</script>`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                      Auto-Detect &amp; Comply by Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our banner detects visitor location and automatically applies the right compliance rules — CCPA opt-out for California, GDPR opt-in for EU, PIPEDA for Canada. One banner, every law, zero maintenance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs CCPA Compliance */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Does Your Business Need CCPA Compliance?
                </h2>
                <p className="text-xl text-muted-foreground">
                  CCPA applies to for-profit businesses that meet any one of these thresholds
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="border-2 text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-2">$25M+</p>
                    <p className="text-muted-foreground">Annual gross revenue</p>
                  </CardContent>
                </Card>

                <Card className="border-2 text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-2">100K+</p>
                    <p className="text-muted-foreground">Consumers&apos; data bought, sold, or shared</p>
                  </CardContent>
                </Card>

                <Card className="border-2 text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-2">50%+</p>
                    <p className="text-muted-foreground">Revenue from selling personal information</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-center text-muted-foreground">
                  <span className="font-medium text-foreground">Even if you don&apos;t meet these thresholds</span>, many businesses choose to comply proactively. With our free tool, there&apos;s no cost to protect yourself — and your customers will appreciate the transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features for CCPA */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  CCPA Features Included Free
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">&quot;Do Not Sell or Share&quot; Opt-Out</h3>
                        <p className="text-muted-foreground text-sm">Prominent opt-out link that meets CCPA requirements. Stops third-party cookies immediately on opt-out.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Geolocation Detection</h3>
                        <p className="text-muted-foreground text-sm">Auto-detects California visitors and shows CCPA-specific options. Other regions get GDPR, PIPEDA, etc.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Cookie Categorization</h3>
                        <p className="text-muted-foreground text-sm">Automatically categorizes cookies as essential, analytics, or marketing — required for CCPA disclosure.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Consent Transaction Logging</h3>
                        <p className="text-muted-foreground text-sm">Every opt-out is logged with timestamp, IP, and consent details for your audit trail.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Google Consent Mode V2</h3>
                        <p className="text-muted-foreground text-sm">Integrates with Google Consent Mode V2 to maintain analytics accuracy while respecting opt-outs.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Script Blocking</h3>
                        <p className="text-muted-foreground text-sm">Blocks Facebook Pixel, Google Ads, and other marketing scripts until the consumer allows them.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Brand-Matched Design</h3>
                        <p className="text-muted-foreground text-sm">Custom colors, logo, positioning, and animations. Your CCPA banner looks like part of your site, not an afterthought.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Zero Performance Impact</h3>
                        <p className="text-muted-foreground text-sm">Under 10KB script size. Loads asynchronously with no impact on your Core Web Vitals or page speed.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Works on Every Platform
                </h2>
                <p className="text-xl text-muted-foreground">
                  One script tag — works everywhere, no plugins needed
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'WordPress', link: '/integrations/wordpress' },
                  { name: 'Shopify', link: '/integrations/shopify' },
                  { name: 'Webflow', link: '/integrations/webflow' },
                  { name: 'Squarespace', link: '/integrations/squarespace' },
                  { name: 'Wix', link: '/integrations/wix' },
                  { name: 'React', link: '/integrations/react' },
                ].map((platform) => (
                  <Link key={platform.name} href={platform.link}>
                    <Card className="border-2 hover:border-primary/50 transition-colors text-center">
                      <CardContent className="py-6">
                        <p className="font-semibold text-foreground">{platform.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">View guide</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  CCPA Cookie Banner FAQ
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about CCPA cookie compliance
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
        <section className="py-24 bg-muted/50">
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
                    <CardTitle className="text-lg">CCPA Compliance Guide</CardTitle>
                    <p className="text-sm text-muted-foreground">Deep dive into CCPA/CPRA requirements</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/ccpa">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">GDPR Cookie Banner</CardTitle>
                    <p className="text-sm text-muted-foreground">EU compliance for global businesses</p>
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
