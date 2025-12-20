
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { CanadianComplianceSection } from '@/components/compliance/canadian-compliance-section'
import { MapPin, Shield, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, FileText, Scale } from 'lucide-react'
import { CanadaMapCompliance } from '@/components/landing/visuals/location/CanadaMapCompliance'
import { BilingualBannerToggle } from '@/components/landing/visuals/compliance/BilingualBannerToggle'
import { ThreeStepAnimation } from '@/components/landing/visuals/core/ThreeStepAnimation'

export const metadata: Metadata = {
  title: 'Canada Cookie Consent | PIPEDA Compliance Guide 2025',
  description: 'Complete guide to Canadian cookie consent compliance. PIPEDA requirements, provincial privacy laws (Quebec Law 25, Alberta PIPA, BC PIPA), French-language support, and Canadian case studies.',
  keywords: 'canada cookie consent, pipeda compliance, quebec law 25, alberta pipa, bc pipa, canadian privacy law, french language cookie banner',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: 'Canada Cookie Consent | PIPEDA Compliance Guide 2025',
    description: 'Complete guide to Canadian cookie consent compliance. PIPEDA requirements, provincial privacy laws, and French-language support.',
    type: 'article',
  },
}

export default function CanadaCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 text-white">Canada Compliance</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cookie Consent for Canadian Websites — PIPEDA Ready
            </h1>
            <div className="text-xl md:text-2xl text-red-100 mb-8 space-y-2">
              <div>✓ Avoid $100K+ PIPEDA fines automatically</div>
              <div>✓ Bilingual support for Quebec Law 25</div>
              <div>✓ 5-minute setup, zero maintenance</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get My Canadian Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download PIPEDA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See Canadian Privacy Laws In Action
              </h2>
              <p className="text-xl text-gray-600">
                Interactive map showing privacy laws across Canadian provinces
              </p>
            </div>
            
            <CanadaMapCompliance />
          </div>
        </div>
      </section>

      {/* Bilingual Demo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bilingual Cookie Consent Demo
              </h2>
              <p className="text-xl text-gray-600">
                See how our solution works in both English and French
              </p>
            </div>
            
            <BilingualBannerToggle />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works — 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600">
                Get Canadian compliance in minutes, not months
              </p>
            </div>
            
            <ThreeStepAnimation />
          </div>
        </div>
      </section>

      {/* Canadian Privacy Landscape */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Canadian Privacy Law Landscape
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the complex web of federal and provincial privacy laws in Canada
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>PIPEDA (Federal)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Personal Information Protection and Electronic Documents Act - Canada's federal privacy law governing private sector organizations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-blue-500" />
                    <CardTitle>Quebec Law 25</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Quebec's modern privacy law with strict consent requirements, data protection obligations, and French-language requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-500" />
                    <CardTitle>Alberta PIPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Alberta's Personal Information Protection Act with specific requirements for consent, data breaches, and privacy management programs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-purple-500" />
                    <CardTitle>BC PIPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    British Columbia's Personal Information Protection Act with requirements for consent, data protection, and privacy policies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-orange-500" />
                    <CardTitle>CASL Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Canada's Anti-Spam Legislation affecting electronic communications and marketing consent requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-indigo-500" />
                    <CardTitle>French Language</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Official language requirements in Quebec and federal organizations, including French-language cookie consent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PIPEDA Deep Dive */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PIPEDA Compliance Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding Canada's federal privacy law and cookie consent obligations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Shield className="h-5 w-5" />
                    PIPEDA Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Consent</h4>
                      <p className="text-sm text-gray-600">Meaningful consent for collection, use, and disclosure of personal information</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Purpose Limitation</h4>
                      <p className="text-sm text-gray-600">Personal information can only be collected for reasonable purposes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Limiting Collection</h4>
                      <p className="text-sm text-gray-600">Collect only information necessary for identified purposes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Accuracy</h4>
                      <p className="text-sm text-gray-600">Personal information must be accurate and up-to-date</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Scale className="h-5 w-5" />
                    Cookie-Specific Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Meaningful Consent</h4>
                      <p className="text-sm text-gray-600">Clear information about cookie use and user choice</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Purpose Specification</h4>
                      <p className="text-sm text-gray-600">Clearly explain why cookies are being used</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consent Withdrawal</h4>
                      <p className="text-sm text-gray-600">Easy mechanism for users to withdraw consent</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Privacy Policy</h4>
                      <p className="text-sm text-gray-600">Comprehensive privacy policy covering cookie use</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">PIPEDA vs. GDPR: Key Differences</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-3">PIPEDA (Canada)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Implied consent acceptable in many cases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>No automatic fines for violations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Privacy Commissioner guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Flexible consent mechanisms</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">GDPR (EU)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Explicit consent required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Automatic fines up to 4% of revenue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Data Protection Authorities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Granular consent categories</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Canadian Compliance Features */}
      <CanadianComplianceSection />

      {/* Provincial Laws */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Provincial Privacy Laws
              </h2>
              <p className="text-xl text-gray-600">
                Additional requirements from Quebec, Alberta, and British Columbia
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Scale className="h-5 w-5" />
                    Quebec Law 25 (Modern Privacy Act)
                  </CardTitle>
                  <CardDescription>Effective September 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Explicit consent for sensitive personal information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy by design requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Data breach notification within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy impact assessments</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">French Language Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Cookie banners in French</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy policies in French</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Consent mechanisms in French</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Customer service in French</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Users className="h-5 w-5" />
                    Alberta PIPA (Personal Information Protection Act)
                  </CardTitle>
                  <CardDescription>Alberta's comprehensive privacy law</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Consent Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Express consent for sensitive information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Implied consent for reasonable purposes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out mechanisms required</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Consent withdrawal procedures</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Compliance Obligations</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy management programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Data breach notification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy officer designation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Regular compliance audits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Globe className="h-5 w-5" />
                    British Columbia PIPA
                  </CardTitle>
                  <CardDescription>BC's privacy protection framework</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Provisions</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Consent for collection and use</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Purpose limitation requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Data accuracy obligations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Security safeguards</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Enforcement</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy Commissioner investigations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Compliance orders and penalties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Public reporting requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Individual complaint process</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* French Language Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                French Language Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Meeting Quebec's French language obligations for cookie consent
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <FileText className="h-5 w-5" />
                    French Language Laws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Charter of the French Language</h4>
                      <p className="text-sm text-gray-600">Requires French to be the language of commerce and public communications in Quebec</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Office québécois de la langue française</h4>
                      <p className="text-sm text-gray-600">OQLF enforces French language requirements and provides guidance</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Bill 96 (2022)</h4>
                      <p className="text-sm text-gray-600">Strengthened French language requirements for digital communications</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consumer Protection</h4>
                      <p className="text-sm text-gray-600">Consumers must be able to understand privacy communications in French</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Implementation Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Banner Text</h4>
                      <p className="text-sm text-gray-600">All cookie consent text must be available in French</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Privacy Policies</h4>
                      <p className="text-sm text-gray-600">Privacy policies must be provided in French</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consent Mechanisms</h4>
                      <p className="text-sm text-gray-600">Consent forms and preference centers in French</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer Support</h4>
                      <p className="text-sm text-gray-600">Privacy-related customer inquiries in French</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">French Cookie Consent Example</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// French Cookie Consent Banner
{
  "title": "Gestion des témoins (cookies)",
  "description": "Nous utilisons des témoins pour améliorer votre expérience sur notre site web. Vous pouvez choisir quels témoins accepter.",
  "acceptAll": "Accepter tout",
  "rejectAll": "Refuser tout",
  "customize": "Personnaliser",
  "necessary": {
    "title": "Témoins essentiels",
    "description": "Ces témoins sont nécessaires au fonctionnement du site web."
  },
  "analytics": {
    "title": "Témoins d'analyse",
    "description": "Ces témoins nous aident à comprendre comment vous utilisez notre site."
  },
  "marketing": {
    "title": "Témoins de marketing",
    "description": "Ces témoins sont utilisés pour afficher des publicités pertinentes."
  },
  "privacyPolicy": "Politique de confidentialité",
  "cookiePolicy": "Politique de témoins"
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Canadian Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Canadian Case Studies
              </h2>
              <p className="text-xl text-gray-600">
                Real-world examples of Canadian organizations achieving compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">E-commerce Retailer</CardTitle>
                  <CardDescription>Toronto-based online store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">E-commerce</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Ontario</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">PIPEDA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Achieved 95% consent acceptance rate with clear, bilingual cookie banners. Reduced legal risk and improved customer trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Quebec SaaS Company</CardTitle>
                  <CardDescription>Montreal-based software company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">SaaS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Quebec</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">Law 25 + PIPEDA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Implemented French-first cookie consent with Law 25 compliance. Zero privacy complaints since implementation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Alberta Financial Services</CardTitle>
                  <CardDescription>Calgary-based financial advisor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Finance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Alberta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">PIPA + PIPEDA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Enhanced privacy management program with granular cookie consent. Improved client confidence and regulatory compliance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">BC Healthcare Provider</CardTitle>
                  <CardDescription>Vancouver-based medical practice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Healthcare</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">BC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">PIPA + PIPEDA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Implemented patient-friendly cookie consent with healthcare-specific categories. Maintained HIPAA-level privacy standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">National Education Platform</CardTitle>
                  <CardDescription>Canada-wide online learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Education</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">National</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">Multi-jurisdictional</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Multi-provincial compliance with region-specific cookie consent. Seamless experience across all Canadian jurisdictions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Federal Government Agency</CardTitle>
                  <CardDescription>Ottawa-based federal department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Government</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Federal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">Privacy Act + PIPEDA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Bilingual cookie consent meeting federal privacy requirements. Enhanced public trust and transparency.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Canadian Compliance Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to achieving Canadian privacy law compliance
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Determine Applicable Laws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Identify which Canadian privacy laws apply to your organization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>PIPEDA (federal) applies to all private sector organizations</li>
                    <li>Quebec Law 25 for organizations operating in Quebec</li>
                    <li>Alberta PIPA for organizations operating in Alberta</li>
                    <li>BC PIPA for organizations operating in British Columbia</li>
                    <li>Consider multi-jurisdictional compliance requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Implement Bilingual Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up cookie consent for Canadian requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure PIPEDA-compliant consent mechanisms</li>
                    <li>Implement French-language support for Quebec</li>
                    <li>Set up meaningful consent with clear purposes</li>
                    <li>Enable easy consent withdrawal</li>
                    <li>Configure province-specific requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Create Privacy Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Develop comprehensive privacy documentation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Draft PIPEDA-compliant privacy policy</li>
                    <li>Create cookie policy explaining usage</li>
                    <li>Develop consent withdrawal procedures</li>
                    <li>Prepare French translations for Quebec</li>
                    <li>Establish privacy management program</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Train Staff and Test Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ensure proper implementation and staff training:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Train staff on Canadian privacy requirements</li>
                    <li>Test cookie consent across all provinces</li>
                    <li>Verify French-language functionality</li>
                    <li>Conduct privacy impact assessments</li>
                    <li>Establish data breach response procedures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor and Maintain Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ongoing compliance monitoring and updates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent rates and user feedback</li>
                    <li>Stay updated on privacy law changes</li>
                    <li>Regular privacy audits and assessments</li>
                    <li>Update documentation as needed</li>
                    <li>Handle privacy complaints promptly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join 1,000+ Canadian Websites Already Protected
            </h2>
            <div className="text-xl text-red-100 mb-8 space-y-2">
              <div>✓ Avoid $100K+ PIPEDA fines automatically</div>
              <div>✓ Bilingual support for Quebec Law 25</div>
              <div>✓ 5-minute setup, zero maintenance</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get My Canadian Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download PIPEDA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
