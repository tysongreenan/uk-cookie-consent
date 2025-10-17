import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, MapPin } from 'lucide-react'

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
              PIPEDA Cookie Consent
              <span className="block text-red-200">Requirements Guide</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8">
              Complete compliance guide for Canadian businesses. Learn what you need to know about PIPEDA cookie consent requirements, implementation, and best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Shield className="mr-2 h-5 w-5" />
                Get PIPEDA Compliant
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download Checklist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* PIPEDA Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is PIPEDA?
              </h2>
              <p className="text-xl text-gray-600">
                Personal Information Protection and Electronic Documents Act - Canada's federal privacy law
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">PIPEDA Basics</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Applies to private sector organizations in Canada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Governs collection, use, and disclosure of personal information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Less strict than GDPR - allows implied consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Enforced by Privacy Commissioner of Canada</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Cookie Requirements</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Notice required for cookie collection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Implied consent acceptable for some cookies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Explicit consent for sensitive data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Opt-out mechanism required</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PIPEDA Principles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                PIPEDA's 10 Privacy Principles
              </h2>
              <p className="text-xl text-gray-600">
                Core principles that guide PIPEDA compliance for cookies and personal information
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">1. Accountability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Organizations are responsible for personal information under their control and must designate someone accountable for compliance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg">2. Identifying Purposes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Organizations must identify the purposes for collecting personal information before or at the time of collection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-lg">3. Consent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Knowledge and consent of the individual are required for the collection, use, or disclosure of personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-lg">4. Limiting Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Organizations must limit collection to what is necessary for the identified purposes and collect it fairly and lawfully.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg">5. Limiting Use & Disclosure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Personal information must not be used or disclosed for purposes other than those for which it was collected, except with consent or as required by law.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <CardTitle className="text-lg">6. Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Personal information must be as accurate, complete, and up-to-date as necessary for the purposes for which it is to be used.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-pink-500">
                <CardHeader>
                  <CardTitle className="text-lg">7. Safeguards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Organizations must protect personal information against loss or theft, as well as unauthorized access, disclosure, copying, use, or modification.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-teal-500">
                <CardHeader>
                  <CardTitle className="text-lg">8. Openness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Organizations must make readily available to individuals specific information about their policies and practices relating to the management of personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg">9. Individual Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Upon request, an individual must be informed of the existence, use, and disclosure of their personal information and be given access to that information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-gray-500">
                <CardHeader>
                  <CardTitle className="text-lg">10. Challenging Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    An individual must be able to challenge an organization's compliance with these principles and have the matter addressed by the organization.
                  </p>
                </CardContent>
              </Card>
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
            <p className="text-xl text-red-100 mb-8">
              Our cookie consent solution makes Canadian privacy law compliance simple and automatic. Get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
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
