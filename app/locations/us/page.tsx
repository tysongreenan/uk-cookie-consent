import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { MapPin, Shield, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, FileText, Scale, Building, Flag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'US Cookie Consent | CCPA, CPRA & State Privacy Laws Guide 2025',
  description: 'Complete guide to US cookie consent compliance. CCPA, CPRA, state privacy laws (Virginia VCDPA, Colorado CPA, Connecticut CTDPA), and federal privacy regulations.',
  keywords: 'us cookie consent, ccpa compliance, cpra california, state privacy laws, vcdpa virginia, cpa colorado, ctdpa connecticut, us privacy law',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: 'US Cookie Consent | CCPA, CPRA & State Privacy Laws Guide 2025',
    description: 'Complete guide to US cookie consent compliance. CCPA, CPRA, and state privacy laws.',
    type: 'article',
  },
}

export default function USCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 text-white">US Compliance</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              US Cookie Consent
              <span className="block text-red-200">CCPA + State Privacy Laws</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8">
              Complete guide to US cookie consent compliance. CCPA, CPRA, state privacy laws (Virginia VCDPA, Colorado CPA, Connecticut CTDPA), and federal privacy regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get US Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download CCPA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* US Privacy Landscape */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                US Privacy Law Landscape
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the complex patchwork of federal and state privacy laws in the United States
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>CCPA/CPRA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    California Consumer Privacy Act and California Privacy Rights Act - comprehensive privacy laws for California residents.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-blue-500" />
                    <CardTitle>Virginia VCDPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Virginia Consumer Data Protection Act - Virginia's comprehensive privacy law with consumer rights and business obligations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-500" />
                    <CardTitle>Colorado CPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Colorado Privacy Act - Colorado's privacy law with consumer rights, data protection assessments, and opt-out mechanisms.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-purple-500" />
                    <CardTitle>Connecticut CTDPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connecticut Data Privacy Act - Connecticut's privacy law with consumer rights, data minimization, and privacy by design.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-500" />
                    <CardTitle>Federal Laws</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Federal privacy laws including COPPA, HIPAA, GLBA, and sector-specific regulations affecting cookie consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Flag className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Emerging Laws</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    New state privacy laws in Utah, Iowa, Indiana, Montana, and Tennessee with varying requirements and effective dates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CCPA/CPRA Deep Dive */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                CCPA/CPRA Compliance Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding California's comprehensive privacy framework and cookie consent obligations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Shield className="h-5 w-5" />
                    CCPA/CPRA Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Consumer Rights</h4>
                      <p className="text-sm text-gray-600">Right to know, delete, opt-out, correct, and limit sensitive personal information</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparency</h4>
                      <p className="text-sm text-gray-600">Clear disclosure of data collection, use, and sharing practices</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Minimization</h4>
                      <p className="text-sm text-gray-600">Collect only personal information that is necessary for disclosed purposes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Purpose Limitation</h4>
                      <p className="text-sm text-gray-600">Use personal information only for purposes disclosed at collection</p>
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
                      <h4 className="font-semibold text-gray-900">"Do Not Sell" Rights</h4>
                      <p className="text-sm text-gray-600">Clear opt-out mechanism for sale of personal information including cookies</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Opt-Out Preference Signals</h4>
                      <p className="text-sm text-gray-600">Honor global privacy controls and opt-out preference signals</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cookie Disclosure</h4>
                      <p className="text-sm text-gray-600">Clear information about cookie use and data collection purposes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Third-Party Sharing</h4>
                      <p className="text-sm text-gray-600">Disclose third-party cookie usage and data sharing arrangements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">CCPA/CPRA vs. GDPR: Key Differences</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-3">CCPA/CPRA (California)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Opt-out model for most data processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>"Do Not Sell My Personal Information"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>California Attorney General enforcement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Private right of action for data breaches</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">GDPR (EU)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Explicit consent required for processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Granular consent categories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Data Protection Authority enforcement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Privacy by design requirements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State Privacy Laws */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                State Privacy Laws
              </h2>
              <p className="text-xl text-gray-600">
                Understanding state-specific privacy laws and their cookie consent requirements
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Scale className="h-5 w-5" />
                    Virginia VCDPA (Consumer Data Protection Act)
                  </CardTitle>
                  <CardDescription>Effective January 1, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Consumer rights to access, delete, and opt-out</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out of targeted advertising and profiling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Data protection impact assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy notice requirements</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Cookie Implications</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out mechanisms for targeted advertising cookies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Clear disclosure of cookie data collection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Data processing transparency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Consumer control over personal data</span>
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
                    Colorado CPA (Privacy Act)
                  </CardTitle>
                  <CardDescription>Effective July 1, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Consumer Rights</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Right to access and correct personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Right to delete personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Right to opt-out of targeted advertising</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Right to data portability</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Business Obligations</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Data protection assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy notice requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Data minimization principles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out preference signals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Building className="h-5 w-5" />
                    Connecticut CTDPA (Data Privacy Act)
                  </CardTitle>
                  <CardDescription>Effective July 1, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Provisions</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Consumer rights to access, delete, and opt-out</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Right to correct inaccurate personal data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Data portability rights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out of targeted advertising</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Compliance Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Data protection impact assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy by design principles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Data minimization requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span>Transparent privacy notices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Globe className="h-5 w-5" />
                    Emerging State Laws
                  </CardTitle>
                  <CardDescription>New privacy laws coming into effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">2024-2025 Effective Dates</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Utah CPA: December 31, 2023</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Iowa CDPA: January 1, 2025</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Indiana CDPA: January 1, 2026</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Montana CDPA: October 1, 2024</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Common Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Consumer rights to access and delete</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Opt-out of targeted advertising</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Privacy notice requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>Data protection assessments</span>
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

      {/* Federal Privacy Laws */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Federal Privacy Laws
              </h2>
              <p className="text-xl text-gray-600">
                Understanding federal privacy regulations affecting cookie consent
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Users className="h-5 w-5" />
                    COPPA
                  </CardTitle>
                  <CardDescription>Children's Online Privacy Protection Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Parental consent for children under 13</li>
                      <li>• Enhanced privacy protections</li>
                      <li>• Limited data collection</li>
                      <li>• Clear privacy notices</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        FTC enforcement, applies to websites directed to children
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Shield className="h-5 w-5" />
                    HIPAA
                  </CardTitle>
                  <CardDescription>Health Insurance Portability and Accountability Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Protected health information (PHI)</li>
                      <li>• Administrative, physical, technical safeguards</li>
                      <li>• Business associate agreements</li>
                      <li>• Patient privacy rights</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        HHS enforcement, applies to healthcare entities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Scale className="h-5 w-5" />
                    GLBA
                  </CardTitle>
                  <CardDescription>Gramm-Leach-Bliley Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Financial privacy notices</li>
                      <li>• Opt-out mechanisms</li>
                      <li>• Safeguards rule compliance</li>
                      <li>• Customer information protection</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        Multiple agency enforcement, applies to financial institutions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Building className="h-5 w-5" />
                    CAN-SPAM
                  </CardTitle>
                  <CardDescription>Controlling the Assault of Non-Solicited Pornography and Marketing Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Email marketing consent</li>
                      <li>• Clear opt-out mechanisms</li>
                      <li>• Accurate sender identification</li>
                      <li>• Honest subject lines</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        FTC enforcement, applies to commercial email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Globe className="h-5 w-5" />
                    FERPA
                  </CardTitle>
                  <CardDescription>Family Educational Rights and Privacy Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Student education records</li>
                      <li>• Parental consent for disclosure</li>
                      <li>• Directory information opt-out</li>
                      <li>• Audit trail requirements</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        Department of Education enforcement, applies to educational institutions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <Flag className="h-5 w-5" />
                    TCPA
                  </CardTitle>
                  <CardDescription>Telephone Consumer Protection Act</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Prior express consent</li>
                      <li>• Automated call restrictions</li>
                      <li>• Do-not-call registry</li>
                      <li>• Text message consent</li>
                    </ul>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        FCC enforcement, applies to telemarketing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* US Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                US Case Studies
              </h2>
              <p className="text-xl text-gray-600">
                Real-world examples of US organizations achieving state privacy law compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">San Francisco E-commerce</CardTitle>
                  <CardDescription>California online retailer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">E-commerce</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">California</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">CCPA/CPRA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Achieved 91% opt-out compliance with "Do Not Sell" mechanisms. Reduced CCPA enforcement risk.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Richmond SaaS Company</CardTitle>
                  <CardDescription>Virginia B2B software platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">SaaS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Virginia</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">VCDPA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Implemented VCDPA-compliant cookie consent with consumer rights. Enhanced B2B client trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Denver Financial Services</CardTitle>
                  <CardDescription>Colorado investment platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Finance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Colorado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">CPA + GLBA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Multi-law compliance with CPA and GLBA requirements. Enhanced investor confidence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Hartford Healthcare</CardTitle>
                  <CardDescription>Connecticut medical practice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Healthcare</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Connecticut</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">CTDPA + HIPAA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Healthcare-specific cookie consent with CTDPA and HIPAA compliance. Maintained patient trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Austin Education</CardTitle>
                  <CardDescription>Texas e-learning platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Education</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Texas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">FERPA + COPPA</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Student-friendly cookie consent with FERPA and COPPA compliance. Enhanced learning experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Seattle Government</CardTitle>
                  <CardDescription>Washington state portal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Government</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Washington</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">Public Records</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Public sector cookie consent with transparency requirements. Enhanced citizen engagement.
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
                US Compliance Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to achieving US privacy law compliance
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Assess US Privacy Law Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Determine which US privacy laws apply to your organization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>CCPA/CPRA for California consumers</li>
                    <li>VCDPA for Virginia residents</li>
                    <li>CPA for Colorado residents</li>
                    <li>CTDPA for Connecticut residents</li>
                    <li>Federal laws (COPPA, HIPAA, GLBA) based on industry</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Implement US-Compliant Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up cookie consent meeting US requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure "Do Not Sell My Personal Information" mechanisms</li>
                    <li>Implement opt-out of targeted advertising</li>
                    <li>Provide clear cookie disclosure and purposes</li>
                    <li>Enable consumer rights (access, delete, correct)</li>
                    <li>Honor global privacy controls and preference signals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Create US-Compliant Privacy Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Develop comprehensive privacy documentation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Draft state-specific privacy notices</li>
                    <li>Create comprehensive cookie policies</li>
                    <li>Develop consumer rights request procedures</li>
                    <li>Prepare data protection assessments</li>
                    <li>Establish opt-out preference signal handling</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Establish Privacy Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up proper privacy governance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Train staff on state privacy requirements</li>
                    <li>Implement data minimization principles</li>
                    <li>Establish consumer request handling procedures</li>
                    <li>Create privacy by design practices</li>
                    <li>Develop regular compliance monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor and Maintain US Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ongoing compliance monitoring and updates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor state privacy law developments</li>
                    <li>Track consumer request handling</li>
                    <li>Regular privacy audits and assessments</li>
                    <li>Stay updated on enforcement trends</li>
                    <li>Handle attorney general inquiries</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for US Privacy Compliance?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Join US organizations using our CCPA, CPRA, and state privacy law compliant cookie consent solution. Multi-state compliance, attorney general guidance, and US privacy expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get US Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download CCPA Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
