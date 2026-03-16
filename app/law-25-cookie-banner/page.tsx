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
  Languages,
  FileText,
  DollarSign,
  Users,
  MapPin,
  Lock,
} from 'lucide-react'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Law 25 Cookie Banner — Free Quebec Privacy Compliance',
  description: 'Free Law 25 compliant cookie banner for Quebec businesses. Bilingual French/English support. Meets all Quebec privacy law requirements. Set up in 5 minutes. No coding needed.',
  keywords: [
    'law 25 cookie banner',
    'quebec cookie banner',
    'loi 25 banniere cookie',
    'quebec privacy law cookie consent',
    'law 25 compliance',
    'quebec law 25 cookie consent',
    'bilingual cookie banner',
    'law 25 cookie consent',
    'quebec privacy compliance',
    'loi 25 quebec',
  ],
  openGraph: {
    title: 'Law 25 Cookie Banner — Free Quebec Privacy Compliance',
    description: 'Free Law 25 compliant cookie banner with bilingual French/English support. Meets all Quebec privacy requirements. Set up in 5 minutes.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/law-25-cookie-banner',
  },
}

const faqItems = [
  {
    question: "What is Quebec Law 25?",
    answer: "Quebec Law 25 (Loi 25), officially known as An Act to modernize legislative provisions as regards the protection of personal information, is Quebec's privacy law that came into full effect in September 2024. It requires businesses to obtain explicit consent before collecting personal information, provide a bilingual privacy policy, appoint a privacy officer, and implement cookie consent mechanisms — similar to GDPR but specific to Quebec."
  },
  {
    question: "Does Law 25 require a cookie banner?",
    answer: "Yes. Law 25 requires that businesses obtain consent before collecting personal information through cookies and tracking technologies. You must clearly inform users what data you collect, why, and obtain their explicit consent before non-essential cookies fire. A compliant cookie banner is the standard way to meet this requirement."
  },
  {
    question: "Does my cookie banner need to be in French?",
    answer: "Yes. Quebec's Charter of the French Language (Bill 96) requires that all commercial communications — including cookie banners — be available in French. Our cookie banner supports bilingual French/English display, automatically showing French to Quebec visitors while supporting English as well. The French version must be at least as prominent as the English version."
  },
  {
    question: "What are the fines for Law 25 non-compliance?",
    answer: "Law 25 penalties can reach up to $25 million or 4% of worldwide turnover, whichever is greater. The Commission d'accès à l'information (CAI) du Québec enforces these penalties. Even smaller violations like missing consent mechanisms or inadequate bilingual support can trigger enforcement actions."
  },
  {
    question: "How is Law 25 different from PIPEDA?",
    answer: "Law 25 is Quebec's provincial privacy law and is stricter than the federal PIPEDA in several ways: it requires explicit consent (not just implied), mandates a designated privacy officer, requires privacy impact assessments for certain data processing, and has higher maximum fines. Businesses operating in Quebec must comply with Law 25 in addition to PIPEDA."
  },
  {
    question: "Does this cookie banner support French and English?",
    answer: "Yes. Our cookie banner includes full bilingual support with professional French translations for all consent text, cookie category descriptions, and preference options. You can customize both language versions independently, and the banner auto-detects Quebec visitors to display French by default."
  },
  {
    question: "Who needs to comply with Law 25?",
    answer: "Any organization that collects, uses, or discloses personal information of Quebec residents must comply with Law 25 — regardless of where the organization is based. This includes businesses with websites accessible to Quebec visitors that use cookies, analytics, or marketing pixels."
  },
]

const breadcrumbs = [
  { name: "Home", url: "https://www.cookie-banner.ca" },
  { name: "Law 25 Cookie Banner", url: "https://www.cookie-banner.ca/law-25-cookie-banner" },
]

export default function Law25CookieBannerPage() {
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
            text: "Free Plan — Bilingual Support",
          }}
          title="Law 25 Cookie Banner"
          title2="Quebec Privacy Compliance Made Easy"
          description="Bilingual French/English cookie consent. Meets all Loi 25 requirements. Free plan available. Set up in 5 minutes."
          emailCapture={true}
          useGeometricBackground={true}
        />

        {/* What is Law 25 */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  What is Quebec Law 25 (Loi 25)?
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Quebec&apos;s modernized privacy law is the strictest in Canada — and it requires explicit cookie consent.
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
                <p>
                  Law 25 (officially <em>An Act to modernize legislative provisions as regards the protection of personal information</em>) came into full effect in <strong>September 2024</strong>. It modernizes Quebec&apos;s privacy framework to be on par with the EU&apos;s GDPR, making it the toughest privacy law in North America.
                </p>
                <p>
                  For websites, this means you need <strong>explicit, informed consent</strong> before setting non-essential cookies — including analytics (Google Analytics), advertising pixels (Facebook, Google Ads), and any tracking technology that collects personal information from Quebec visitors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Explicit Consent</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unlike PIPEDA&apos;s implied consent, Law 25 requires <strong>explicit, opt-in consent</strong> before any non-essential cookies are set. Our banner blocks all tracking until the user actively consents.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Languages className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Bilingual Requirement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cookie banners must be available in French under Bill 96. Our banner auto-detects Quebec visitors and displays <strong>French by default</strong> with English as an option.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Privacy Officer Required</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Organizations must designate a person responsible for privacy protection. Our consent logs and audit trails help your privacy officer demonstrate compliance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Granular Consent</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Users must be able to consent to specific purposes separately — not just &quot;accept all.&quot; Our banner provides granular controls for essential, analytics, and marketing cookies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Right to Withdraw</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Visitors must be able to withdraw consent as easily as they gave it. Our banner includes a persistent preferences button so users can change their choices at any time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Scale className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Privacy Impact Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Law 25 requires privacy impact assessments for certain data processing activities. Our cookie categorization and consent logging provide the documentation you need.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Law 25 vs PIPEDA vs GDPR */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Law 25 vs PIPEDA vs GDPR
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our cookie banner handles all three automatically — here&apos;s how they compare
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-bold text-foreground">Requirement</th>
                      <th className="text-center py-4 px-4 font-bold text-foreground">Law 25 (Quebec)</th>
                      <th className="text-center py-4 px-4 font-bold text-foreground">PIPEDA (Federal)</th>
                      <th className="text-center py-4 px-4 font-bold text-foreground">GDPR (EU)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Consent Type</td>
                      <td className="py-4 px-4 text-center">Explicit opt-in</td>
                      <td className="py-4 px-4 text-center">Implied or explicit</td>
                      <td className="py-4 px-4 text-center">Explicit opt-in</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-4 font-medium text-foreground">Language Requirement</td>
                      <td className="py-4 px-4 text-center font-medium text-foreground">French required</td>
                      <td className="py-4 px-4 text-center">English or French</td>
                      <td className="py-4 px-4 text-center">Local language</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Privacy Officer</td>
                      <td className="py-4 px-4 text-center">Mandatory</td>
                      <td className="py-4 px-4 text-center">Not required</td>
                      <td className="py-4 px-4 text-center">DPO required (some)</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-4 font-medium text-foreground">Maximum Fines</td>
                      <td className="py-4 px-4 text-center font-medium text-foreground">$25M or 4% revenue</td>
                      <td className="py-4 px-4 text-center">$100K per violation</td>
                      <td className="py-4 px-4 text-center">4% global revenue</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Privacy Impact Assessment</td>
                      <td className="py-4 px-4 text-center">Required</td>
                      <td className="py-4 px-4 text-center">Recommended</td>
                      <td className="py-4 px-4 text-center">Required (DPIA)</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-4 px-4 font-medium text-foreground">Breach Notification</td>
                      <td className="py-4 px-4 text-center">Mandatory (CAI)</td>
                      <td className="py-4 px-4 text-center">Mandatory (OPC)</td>
                      <td className="py-4 px-4 text-center">72 hours (DPA)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-4 px-4 font-medium text-foreground">Enforcer</td>
                      <td className="py-4 px-4 text-center">CAI du Québec</td>
                      <td className="py-4 px-4 text-center">OPC Canada</td>
                      <td className="py-4 px-4 text-center">National DPAs</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center">
                <p className="text-lg font-medium text-foreground">
                  Quebec businesses must comply with <strong>both</strong> Law 25 and PIPEDA. Our cookie banner handles both plus GDPR — one installation, every law covered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bilingual Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Built-In Bilingual Support
                </h2>
                <p className="text-xl text-muted-foreground">
                  French-first cookie consent that meets Bill 96 language requirements
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">🇫🇷</span>
                      Version française
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-card border rounded-lg p-5 space-y-3">
                      <p className="font-semibold text-foreground text-sm">Nous utilisons des cookies</p>
                      <p className="text-muted-foreground text-xs">
                        Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez choisir les catégories de cookies que vous souhaitez autoriser.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Cookies essentiels</span>
                          <span className="text-primary font-medium">Toujours actif</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Cookies analytiques</span>
                          <span className="text-muted-foreground">Optionnel</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Cookies marketing</span>
                          <span className="text-muted-foreground">Optionnel</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="h-8 flex-1 rounded bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-medium">Tout accepter</div>
                        <div className="h-8 flex-1 rounded bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">Personnaliser</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">🇬🇧</span>
                      English Version
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-card border rounded-lg p-5 space-y-3">
                      <p className="font-semibold text-foreground text-sm">We use cookies</p>
                      <p className="text-muted-foreground text-xs">
                        This site uses cookies to improve your experience. You can choose which cookie categories you would like to allow.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Essential cookies</span>
                          <span className="text-primary font-medium">Always active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Analytics cookies</span>
                          <span className="text-muted-foreground">Optional</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Marketing cookies</span>
                          <span className="text-muted-foreground">Optional</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="h-8 flex-1 rounded bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-medium">Accept All</div>
                        <div className="h-8 flex-1 rounded bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">Customize</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Auto-Detect Quebec Visitors</h3>
                        <p className="text-muted-foreground text-sm">Geolocation shows French by default to Quebec visitors, English to others.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Custom Translations</h3>
                        <p className="text-muted-foreground text-sm">Edit both French and English text independently in our visual builder.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Bill 96 Compliant</h3>
                        <p className="text-muted-foreground text-sm">French version is at least as prominent as English, meeting Quebec language requirements.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Penalties Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Law 25 Fines Are Among the Highest in Canada
                </h2>
                <p className="text-xl text-muted-foreground">
                  Quebec&apos;s CAI is actively enforcing — non-compliance is expensive
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">$25M</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Maximum Fine</p>
                    <p className="text-sm text-muted-foreground">
                      Or 4% of worldwide turnover, whichever is greater — matching GDPR-level penalties.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">$10M</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Administrative Penalties</p>
                    <p className="text-sm text-muted-foreground">
                      Or 2% of worldwide turnover for administrative monetary penalties imposed by the CAI.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-destructive/30">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">Private Right</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-foreground mb-2">Individual Lawsuits</p>
                    <p className="text-sm text-muted-foreground">
                      Individuals can sue for damages resulting from privacy violations, including punitive damages for intentional breaches.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Our free cookie banner makes Law 25 compliance effortless — 5 minutes, not $50,000 in legal fees.
                </p>
                <Link href="/auth/register">
                  <Button size="lg" className="px-8">
                    Get Law 25 Compliant Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  How Our Law 25 Cookie Banner Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get Law 25 compliant in under 5 minutes — no coding required
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
                      We scan your site to detect existing cookies, tracking scripts, and branding. Everything is imported automatically — including identifying scripts that need consent under Law 25.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                      Law 25 Compliance is Auto-Configured
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our builder automatically enables explicit opt-in consent (required by Law 25), sets up granular cookie categories, adds bilingual French/English text, and configures consent logging for your audit trail.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                      Customize Design &amp; Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Match your banner to your brand with custom colors, positioning (13 options), and logo upload. Edit both French and English text independently. Preview changes live.
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
                        Copy a single script tag into your site&apos;s &lt;head&gt; section. Works on WordPress, Shopify, Webflow, Squarespace, Wix, or any custom site.
                      </p>
                      <div className="bg-card border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="text-muted-foreground">{`<!-- Law 25 Cookie Banner -->
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
                      Auto-Detect Quebec Visitors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our banner detects visitor location and language. Quebec visitors see the French version with Law 25 opt-in consent. Visitors from Ontario see PIPEDA rules. EU visitors get GDPR. One banner, every jurisdiction, zero maintenance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs Law 25 Compliance */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Who Needs Law 25 Compliance?
                </h2>
                <p className="text-xl text-muted-foreground">
                  If you have Quebec visitors, Law 25 likely applies to you
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Quebec-Based Businesses</h3>
                        <p className="text-muted-foreground text-sm">Any business operating in Quebec that collects personal information through their website.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Businesses With Quebec Customers</h3>
                        <p className="text-muted-foreground text-sm">Any company — Canadian or international — whose website is accessed by Quebec residents.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Users className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">E-commerce Sites Shipping to Quebec</h3>
                        <p className="text-muted-foreground text-sm">Online stores that sell to Quebec customers and use tracking pixels, analytics, or marketing cookies.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">SaaS &amp; Digital Services</h3>
                        <p className="text-muted-foreground text-sm">Software companies with Quebec users who collect data through analytics, support tools, or user tracking.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-center text-muted-foreground">
                  <span className="font-medium text-foreground">Quebec has 8.9 million residents</span> — if your website is accessible in Canada, you almost certainly have Quebec visitors. With our free tool, there&apos;s no reason not to comply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Law 25 Features Included Free
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Explicit Opt-In Consent</h3>
                        <p className="text-muted-foreground text-sm">Blocks all non-essential cookies until the user actively consents — the core Law 25 requirement.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Bilingual French/English</h3>
                        <p className="text-muted-foreground text-sm">Professional French translations with auto-detection for Quebec visitors. Bill 96 compliant.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Granular Cookie Categories</h3>
                        <p className="text-muted-foreground text-sm">Separate consent for essential, analytics, and marketing cookies — Law 25 requires purpose-specific consent.</p>
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
                        <p className="text-muted-foreground text-sm">Every consent event logged with timestamp and details. Supports your privacy officer&apos;s audit requirements.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Withdrawal Mechanism</h3>
                        <p className="text-muted-foreground text-sm">Persistent preferences button lets users change their consent at any time — as easy as giving consent.</p>
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
                        <p className="text-muted-foreground text-sm">Maintains analytics accuracy while respecting Law 25 opt-in requirements through Google&apos;s consent signals.</p>
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
                        <p className="text-muted-foreground text-sm">Custom colors, logo, positioning, and animations. Your banner looks like part of your site.</p>
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
                        <p className="text-muted-foreground text-sm">Under 10KB script. Loads async with no impact on Core Web Vitals or page speed.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Support */}
        <section className="py-24 bg-background">
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
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Law 25 Cookie Banner FAQ
                </h2>
                <p className="text-xl text-muted-foreground">
                  Common questions about Quebec Law 25 cookie compliance
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
                    <CardTitle className="text-lg">PIPEDA Compliance Guide</CardTitle>
                    <p className="text-sm text-muted-foreground">Federal Canadian privacy law requirements</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/compliance/pipeda">
                      <Button variant="outline" className="w-full">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">CCPA Cookie Banner</CardTitle>
                    <p className="text-sm text-muted-foreground">California privacy compliance</p>
                  </CardHeader>
                  <CardContent>
                    <Link href="/ccpa-cookie-banner">
                      <Button variant="outline" className="w-full">
                        View Page <ArrowRight className="ml-2 h-4 w-4" />
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
