
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, MapPin } from 'lucide-react'
import { ComplianceBadgeAnimator } from '@/components/landing/visuals/compliance/ComplianceBadgeAnimator'
import { ConsentFlowDiagram } from '@/components/landing/visuals/compliance/ConsentFlowDiagram'
import { BannerTextPreview } from '@/components/landing/visuals/compliance/BannerTextPreview'
import { BilingualBannerToggle } from '@/components/landing/visuals/compliance/BilingualBannerToggle'

export const metadata: Metadata = {
  title: 'PIPEDA Cookie Consent Requirements | Canadian Privacy Law Guide 2025',
  description: 'Complete PIPEDA cookie consent guide for Canadian businesses. Learn requirements, implementation, and compliance best practices for Canadian privacy law.',
  keywords: 'pipeda cookie consent, canadian privacy law, pipeda compliance guide, canadian privacy commissioner',
  openGraph: {
    title: 'PIPEDA Cookie Consent Requirements | Canadian Privacy Law Guide 2025',
    description: 'Complete PIPEDA cookie consent guide for Canadian businesses. Learn requirements, implementation, and compliance best practices for Canadian privacy law.',
    type: 'article',
  },
}

export default function PIPEDACompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 text-white">Canadian Privacy Law</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              PIPEDA Compliance Made Simple — 100% Automatic
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-lg font-semibold text-white">
                ✓ Avoid $100K+ PIPEDA Fines Automatically
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Save 10+ Hours of Legal Research
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ We Handle This Automatically
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Shield className="mr-2 h-5 w-5" />
                Get PIPEDA Compliant Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download Checklist
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
                See PIPEDA Compliance In Action
              </h2>
              <p className="text-xl text-gray-600">
                Watch how our solution automatically handles Canadian privacy law compliance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Automatic Compliance Verification</h3>
                <ComplianceBadgeAnimator />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Bilingual Banner Support</h3>
                <BilingualBannerToggle />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Consent Flow Comparison</h3>
                <ConsentFlowDiagram />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Banner Text Examples</h3>
                <BannerTextPreview />
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Shield className="mr-2 h-5 w-5" />
                Get PIPEDA Compliant Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Solve It */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How We Solve PIPEDA Compliance — 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600">
                Get your Canadian business compliant in minutes, not months
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                  <CardTitle>Automatic Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our system automatically detects Canadian visitors and applies the appropriate privacy law (PIPEDA, PIPA-BC, PIPA-AB, Quebec Bill 64).
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                  <CardTitle>Bilingual Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically shows English or French banners based on user location and preferences, meeting Quebec's language requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                  <CardTitle>Compliance Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically logs all consent decisions and provides audit trails for Privacy Commissioner investigations.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Shield className="mr-2 h-5 w-5" />
                Start PIPEDA Compliance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Provincial Laws */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Provincial Privacy Laws in Canada
              </h2>
              <p className="text-xl text-gray-600">
                Some provinces have their own privacy legislation that may be more stringent than PIPEDA
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    British Columbia (PIPA-BC)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Applies to private sector organizations in BC</li>
                    <li>• Similar to PIPEDA but with some differences</li>
                    <li>• More specific requirements for consent</li>
                    <li>• Stricter enforcement by BC Privacy Commissioner</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Alberta (PIPA-AB)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Applies to private sector organizations in Alberta</li>
                    <li>• Generally similar to PIPEDA</li>
                    <li>• Some additional requirements for data breach notification</li>
                    <li>• Alberta Information and Privacy Commissioner oversight</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Quebec (Bill 64)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Modernized Quebec privacy law</li>
                    <li>• More similar to GDPR requirements</li>
                    <li>• Explicit consent requirements</li>
                    <li>• Higher penalties for violations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Federal Government (Privacy Act)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Applies to federal government institutions</li>
                    <li>• Different from PIPEDA</li>
                    <li>• Privacy Commissioner of Canada oversight</li>
                    <li>• Separate from private sector requirements</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Consent Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PIPEDA Cookie Consent Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding what's required for cookie compliance under Canadian law
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Notice Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Under PIPEDA, you must provide clear notice about cookie collection:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>What cookies are being collected</li>
                    <li>Why cookies are being collected</li>
                    <li>How cookies will be used</li>
                    <li>Who will have access to the information</li>
                    <li>How long cookies will be stored</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    Consent Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Implied Consent (Acceptable for)</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Basic website functionality cookies</li>
                        <li>Analytics cookies (with clear notice)</li>
                        <li>Non-sensitive personal information</li>
                        <li>Obvious and reasonable purposes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Explicit Consent (Required for)</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Sensitive personal information</li>
                        <li>Marketing/advertising cookies</li>
                        <li>Third-party tracking</li>
                        <li>Data sharing with third parties</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-purple-500" />
                    Opt-Out Mechanism
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    PIPEDA requires that users can opt-out of cookie collection:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide clear opt-out instructions</li>
                    <li>Make opt-out as easy as opt-in</li>
                    <li>Honor opt-out requests promptly</li>
                    <li>Don't penalize users for opting out</li>
                    <li>Allow granular opt-out by cookie category</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-orange-500" />
                    Privacy Policy Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Your privacy policy must include specific cookie information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Complete list of cookies used</li>
                    <li>Purpose and legal basis for each cookie</li>
                    <li>Cookie retention periods</li>
                    <li>Third-party cookie information</li>
                    <li>User rights and how to exercise them</li>
                    <li>Contact information for privacy inquiries</li>
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
                PIPEDA Cookie Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to implementing PIPEDA-compliant cookie consent
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Cookie Audit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Conduct a comprehensive audit of all cookies on your website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Identify all first-party and third-party cookies</li>
                    <li>Categorize cookies by purpose (necessary, analytics, marketing)</li>
                    <li>Document data collection practices</li>
                    <li>Assess sensitivity of information collected</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Notice Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Implement clear notice about cookie collection:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Add cookie notice to your website</li>
                    <li>Update privacy policy with cookie details</li>
                    <li>Provide accessible cookie information</li>
                    <li>Use plain language, not legal jargon</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Consent Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up appropriate consent mechanisms:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Implied consent for non-sensitive cookies</li>
                    <li>Explicit consent for marketing/sensitive cookies</li>
                    <li>Clear opt-out mechanisms</li>
                    <li>Granular consent options where appropriate</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Ongoing Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Maintain ongoing compliance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Regular cookie audits</li>
                    <li>Update notices when practices change</li>
                    <li>Train staff on privacy requirements</li>
                    <li>Monitor for compliance violations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enforcement and Penalties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PIPEDA Enforcement and Penalties
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the consequences of non-compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-600">Privacy Commissioner Powers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Investigate complaints and initiate investigations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Issue compliance orders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Recommend corrective measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Public naming and shaming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Court applications for enforcement</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Penalties and Consequences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Administrative Penalties</h4>
                      <p className="text-lg font-bold text-red-600">Up to $100,000 CAD</p>
                      <p className="text-sm text-gray-600">For violations of PIPEDA</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Reputational Damage</h4>
                      <p className="text-lg font-bold text-orange-600">Significant</p>
                      <p className="text-sm text-gray-600">Public naming, media coverage</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Legal Costs</h4>
                      <p className="text-lg font-bold text-orange-600">High</p>
                      <p className="text-sm text-gray-600">Compliance orders, court proceedings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get PIPEDA Compliant?
            </h2>
            <div className="text-xl text-red-100 mb-8 space-y-2">
              <div className="font-bold">✓ Automatic Canadian Law Detection</div>
              <div className="font-bold">✓ Bilingual English/French Support</div>
              <div className="font-bold">✓ Privacy Commissioner Audit Ready</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Shield className="mr-2 h-5 w-5" />
                Start PIPEDA Compliance
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download PIPEDA Checklist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
