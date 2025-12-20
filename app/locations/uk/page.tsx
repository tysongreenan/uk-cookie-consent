import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { MapPin, Shield, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, FileText, Scale, Building } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'UK Cookie Consent | GDPR & PECR Compliance Guide 2025',
  description: 'Complete guide to UK cookie consent compliance. GDPR requirements, PECR regulations, Brexit implications, ICO guidance, and UK-specific implementation strategies.',
  keywords: 'uk cookie consent, gdpr uk, pecr compliance, ico guidance, uk privacy law, brexit privacy, uk cookie law',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: 'UK Cookie Consent | GDPR & PECR Compliance Guide 2025',
    description: 'Complete guide to UK cookie consent compliance. GDPR requirements, PECR regulations, and ICO guidance.',
    type: 'article',
  },
}

export default function UKCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">UK Compliance</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              UK Cookie Consent
              <span className="block text-blue-200">GDPR + PECR Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Complete guide to UK cookie consent compliance. GDPR requirements, PECR regulations, Brexit implications, ICO guidance, and UK-specific implementation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get UK Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download ICO Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* UK Privacy Landscape */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                UK Privacy Law Landscape
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the UK's comprehensive privacy framework post-Brexit
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <CardTitle>UK GDPR</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    UK General Data Protection Regulation - retained EU law governing data protection in the UK after Brexit.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-green-500" />
                    <CardTitle>Data Protection Act 2018</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    UK's domestic data protection law implementing GDPR and providing additional provisions for UK-specific requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>PECR</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Privacy and Electronic Communications Regulations - UK's implementation of the ePrivacy Directive for cookies and electronic marketing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-orange-500" />
                    <CardTitle>ICO Guidance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Information Commissioner's Office provides authoritative guidance on UK privacy law implementation and enforcement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-red-500" />
                    <CardTitle>Brexit Implications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Post-Brexit changes to UK-EU data transfers, adequacy decisions, and regulatory divergence from EU GDPR.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Future Regulations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Upcoming UK privacy reforms including Data Reform Bill and potential divergence from EU privacy standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PECR Deep Dive */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PECR Cookie Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the Privacy and Electronic Communications Regulations for cookies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Scale className="h-5 w-5" />
                    PECR Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Strict Consent</h4>
                      <p className="text-sm text-gray-600">Explicit consent required for non-essential cookies</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Categories</h4>
                      <p className="text-sm text-gray-600">Clear categorization of strictly necessary vs. other cookies</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consent Withdrawal</h4>
                      <p className="text-sm text-gray-600">Easy mechanism for users to withdraw cookie consent</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Information</h4>
                      <p className="text-sm text-gray-600">Clear information about cookie purposes and duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="h-5 w-5" />
                    ICO Cookie Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Banners</h4>
                      <p className="text-sm text-gray-600">Clear, prominent, and non-intrusive cookie consent notices</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Granular Control</h4>
                      <p className="text-sm text-gray-600">Users should be able to choose specific cookie categories</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pre-ticked Boxes</h4>
                      <p className="text-sm text-gray-600">Pre-ticked consent boxes are not valid consent</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Policies</h4>
                      <p className="text-sm text-gray-600">Comprehensive cookie policies explaining all cookie usage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">PECR vs. GDPR: Cookie Consent Requirements</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-600 mb-3">PECR (UK Specific)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Strictly necessary cookies exempt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Explicit consent for all other cookies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>Granular cookie category control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span>ICO enforcement and fines</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">GDPR (General)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Lawful basis for processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Transparent information provision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Data subject rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Privacy by design</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brexit Implications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Brexit and UK Privacy Law
              </h2>
              <p className="text-xl text-gray-600">
                Understanding how Brexit affects UK privacy law and cookie consent
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Globe className="h-5 w-5" />
                    UK GDPR Implementation
                  </CardTitle>
                  <CardDescription>Post-Brexit UK privacy law</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Changes</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>UK GDPR retained EU GDPR provisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>ICO remains UK's data protection authority</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>UK adequacy decision from EU Commission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Potential future regulatory divergence</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Transfers</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Standard Contractual Clauses (SCCs)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Adequacy decisions for third countries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Binding Corporate Rules (BCRs)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>Transfer Impact Assessments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Building className="h-5 w-5" />
                    ICO Post-Brexit Role
                  </CardTitle>
                  <CardDescription>UK's data protection authority</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Enforcement Powers</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Fines up to £17.5 million or 4% of turnover</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Enforcement notices and warnings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Compulsory audits and assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Public naming and shaming</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Guidance and Support</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Updated cookie consent guidance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Brexit-specific compliance advice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Data transfer guidance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Regular policy updates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <AlertTriangle className="h-5 w-5" />
                    Future Regulatory Changes
                  </CardTitle>
                  <CardDescription>Potential UK privacy law reforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Data Reform Bill</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Simplified privacy regime</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Reduced compliance burden</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Innovation-friendly approach</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>ICO reform and new powers</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">International Cooperation</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Global privacy partnerships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Cross-border enforcement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>International adequacy decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Regulatory sandbox programs</span>
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

      {/* UK Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                UK Case Studies
              </h2>
              <p className="text-xl text-gray-600">
                Real-world examples of UK organizations achieving PECR and GDPR compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">London E-commerce</CardTitle>
                  <CardDescription>Online fashion retailer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">E-commerce</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">London</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">PECR + UK GDPR</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Achieved 92% consent acceptance with clear cookie categorization. Reduced ICO complaints and improved user trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Manchester SaaS</CardTitle>
                  <CardDescription>B2B software company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">SaaS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Manchester</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">UK GDPR</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Implemented granular cookie consent for B2B clients. Enhanced data protection and competitive advantage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Edinburgh Financial Services</CardTitle>
                  <CardDescription>Investment management firm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Finance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Edinburgh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">FCA + UK GDPR</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Financial services cookie consent with enhanced security. Met FCA requirements and client expectations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Birmingham Healthcare</CardTitle>
                  <CardDescription>Private medical practice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Healthcare</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Birmingham</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">UK GDPR + NHS</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Healthcare-specific cookie consent with patient data protection. Maintained NHS compliance standards.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Liverpool Education</CardTitle>
                  <CardDescription>University online platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Education</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Liverpool</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">UK GDPR</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Student-friendly cookie consent with education-specific categories. Improved learning platform compliance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Belfast Government</CardTitle>
                  <CardDescription>Northern Ireland public sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Government</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Belfast</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">Public Sector GDPR</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Public sector cookie consent with transparency requirements. Enhanced citizen trust and engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ICO Enforcement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ICO Enforcement and Fines
              </h2>
              <p className="text-xl text-gray-600">
                Understanding ICO enforcement actions and penalty structure
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Cookie Violations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Major Cookie Fines</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• British Airways: £20 million (data breach)</li>
                        <li>• Marriott: £18.4 million (data breach)</li>
                        <li>• Google: £44 million (cookie consent)</li>
                        <li>• Facebook: £500,000 (Cambridge Analytica)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Common Violations</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Non-compliant cookie banners</li>
                        <li>• Pre-ticked consent boxes</li>
                        <li>• Lack of granular control</li>
                        <li>• Insufficient cookie information</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Compliance Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">ICO Recommendations</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Clear, prominent cookie notices</li>
                        <li>• Granular cookie category control</li>
                        <li>• No pre-ticked consent boxes</li>
                        <li>• Easy consent withdrawal</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Risk Mitigation</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Regular compliance audits</li>
                        <li>• Staff privacy training</li>
                        <li>• Privacy impact assessments</li>
                        <li>• Documentation and records</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-orange-50 to-green-50 border-orange-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">ICO Penalty Structure</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">£17.5M</div>
                    <div className="text-sm text-gray-600">Maximum Fine</div>
                    <div className="text-xs text-gray-500 mt-1">or 4% of annual turnover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">£8.7M</div>
                    <div className="text-sm text-gray-600">Higher Standard</div>
                    <div className="text-xs text-gray-500 mt-1">or 2% of annual turnover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">Enforcement</div>
                    <div className="text-sm text-gray-600">Notices & Orders</div>
                    <div className="text-xs text-gray-500 mt-1">Non-monetary penalties</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                UK Compliance Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to achieving UK privacy law compliance
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Assess UK Privacy Law Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Determine which UK privacy laws apply to your organization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>UK GDPR applies to all organizations processing personal data</li>
                    <li>PECR applies to all organizations using cookies and electronic marketing</li>
                    <li>Data Protection Act 2018 provides additional UK-specific requirements</li>
                    <li>Consider sector-specific regulations (FCA, NHS, etc.)</li>
                    <li>Review Brexit implications for EU data transfers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Implement PECR-Compliant Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up cookie consent meeting PECR requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure strictly necessary cookie exemptions</li>
                    <li>Implement explicit consent for all other cookies</li>
                    <li>Provide granular cookie category control</li>
                    <li>Enable easy consent withdrawal</li>
                    <li>Follow ICO cookie consent guidance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Create UK-Compliant Privacy Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Develop comprehensive privacy documentation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Draft UK GDPR-compliant privacy notice</li>
                    <li>Create comprehensive cookie policy</li>
                    <li>Develop data processing records</li>
                    <li>Prepare consent withdrawal procedures</li>
                    <li>Establish data protection impact assessments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Establish Data Protection Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up proper data protection governance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Appoint Data Protection Officer if required</li>
                    <li>Train staff on UK privacy requirements</li>
                    <li>Implement privacy by design principles</li>
                    <li>Establish data breach response procedures</li>
                    <li>Create regular compliance monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor and Maintain UK Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ongoing compliance monitoring and updates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor ICO guidance updates</li>
                    <li>Track consent rates and user feedback</li>
                    <li>Regular privacy audits and assessments</li>
                    <li>Stay updated on Brexit-related changes</li>
                    <li>Handle ICO inquiries and complaints</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for UK Privacy Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join UK organizations using our PECR and UK GDPR compliant cookie consent solution. ICO guidance compliance, Brexit-ready, and UK privacy expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get UK Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download ICO Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
