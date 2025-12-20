
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock } from 'lucide-react'
import { ComplianceBadgeAnimator } from '@/components/landing/visuals/compliance/ComplianceBadgeAnimator'
import { ConsentFlowDiagram } from '@/components/landing/visuals/compliance/ConsentFlowDiagram'
import { BannerTextPreview } from '@/components/landing/visuals/compliance/BannerTextPreview'

export const metadata: Metadata = {
  title: 'GDPR Cookie Consent Requirements | Complete Compliance Guide 2025',
  description: 'Complete GDPR cookie consent guide for EU businesses. Learn requirements, implementation, and compliance best practices for EU privacy law.',
  keywords: 'gdpr cookie consent requirements, eu privacy law cookies, gdpr compliance checklist, ico compliance',
  openGraph: {
    title: 'GDPR Cookie Consent Requirements | Complete Compliance Guide 2025',
    description: 'Complete GDPR cookie consent guide for EU businesses. Learn requirements, implementation, and compliance best practices for EU privacy law.',
    type: 'article',
  },
}

export default function GDPRCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">EU Privacy Law</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GDPR Compliance Made Simple — 100% Automatic
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-lg font-semibold text-white">
                ✓ Avoid €20M+ GDPR Fines Automatically
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Save 10+ Hours of Legal Research
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ We Handle This Automatically
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Shield className="mr-2 h-5 w-5" />
                Get GDPR Compliant Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download Checklist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3 Big Problems GDPR Solves
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Explicit Consent</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">
                    Avoid €20M+ Fines with Explicit Consent
                  </p>
                  <p className="text-gray-600">
                    We handle this automatically. No pre-checked boxes, no legal headaches.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <CardTitle>Clear Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">
                    Save 10+ Hours with Plain Language
                  </p>
                  <p className="text-gray-600">
                    We write clear explanations automatically. No legal jargon, no confusion.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Granular Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">
                    Build Trust with Granular Control
                  </p>
                  <p className="text-gray-600">
                    Users choose what they want. We handle the technical implementation automatically.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-orange-500" />
                    <CardTitle>Easy Withdrawal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Users must be able to withdraw consent as easily as they gave it, with immediate effect.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <CardTitle>No Pre-ticking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Consent boxes cannot be pre-checked. Users must actively choose to accept cookies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Consent Records</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Keep records of when and how consent was obtained for audit purposes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Compliance Check */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ComplianceBadgeAnimator />
        </div>
      </section>

      {/* Consent Flow Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ConsentFlowDiagram />
        </div>
      </section>

      {/* Banner Text Examples */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <BannerTextPreview />
        </div>
      </section>

      {/* Cookie Categories - Temporarily disabled for build */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <CategorySelector />
        </div>
      </section> */}

      {/* Country-Specific Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Country-Specific GDPR Requirements
              </h2>
              <p className="text-xl text-gray-600">
                While GDPR is EU-wide, individual countries have additional requirements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇬🇧 United Kingdom
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• UK GDPR applies post-Brexit</li>
                    <li>• ICO enforcement and guidance</li>
                    <li>• PECR (Privacy and Electronic Communications Regulations)</li>
                    <li>• Cookie consent required for all non-essential cookies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇩🇪 Germany
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• TTDSG (Telecommunications Act) requirements</li>
                    <li>• Stricter consent requirements</li>
                    <li>• Cookie walls generally prohibited</li>
                    <li>• Data Protection Authority enforcement</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇫🇷 France
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• CNIL (Commission Nationale de l'Informatique) guidance</li>
                    <li>• Specific cookie banner requirements</li>
                    <li>• French language requirements</li>
                    <li>• Granular consent emphasized</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇳🇱 Netherlands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AP (Autoriteit Persoonsgegevens) oversight</li>
                    <li>• Dutch language requirements</li>
                    <li>• Strict interpretation of consent</li>
                    <li>• Regular enforcement actions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇪🇸 Spain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AEPD (Agencia Española de Protección de Datos)</li>
                    <li>• Spanish language requirements</li>
                    <li>• Cookie policy requirements</li>
                    <li>• Regular compliance audits</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🇮🇹 Italy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Garante Privacy oversight</li>
                    <li>• Italian language requirements</li>
                    <li>• Cookie consent records required</li>
                    <li>• Stricter enforcement approach</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GDPR Cookie Consent Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to implementing GDPR-compliant cookie consent
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Audit Your Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    First, identify all cookies on your website and categorize them:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Strictly necessary cookies (no consent required)</li>
                    <li>Performance/analytics cookies (consent required)</li>
                    <li>Functionality cookies (consent required)</li>
                    <li>Marketing/advertising cookies (consent required)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Implement Consent Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up a consent management platform that provides:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Clear cookie information and purposes</li>
                    <li>Granular consent options by category</li>
                    <li>Easy consent withdrawal mechanism</li>
                    <li>Consent records and audit trail</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Block Non-Essential Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ensure non-essential cookies are blocked until consent is given:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Analytics scripts (Google Analytics, etc.)</li>
                    <li>Marketing pixels (Facebook, Google Ads)</li>
                    <li>Third-party tracking scripts</li>
                    <li>Social media widgets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Update Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ensure your privacy policy includes detailed cookie information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Complete list of cookies used</li>
                    <li>Purpose and legal basis for each cookie</li>
                    <li>Cookie retention periods</li>
                    <li>User rights and how to exercise them</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties and Enforcement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GDPR Penalties and Enforcement
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the risks of non-compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Maximum Penalties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Tier 1 Violations</h4>
                      <p className="text-2xl font-bold text-red-600">€20 million</p>
                      <p className="text-sm text-gray-600">or 4% of annual global turnover</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tier 2 Violations</h4>
                      <p className="text-2xl font-bold text-orange-600">€10 million</p>
                      <p className="text-sm text-gray-600">or 2% of annual global turnover</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-600">Common Violations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Pre-checked consent boxes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Cookie walls (blocking access without consent)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Insufficient cookie information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>No consent withdrawal mechanism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Processing without valid consent</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get GDPR Compliant?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our cookie consent solution makes GDPR compliance simple and automatic. Get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download GDPR Checklist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
