import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, DollarSign } from 'lucide-react'
import { ComplianceBadgeAnimator } from '@/components/landing/visuals/compliance/ComplianceBadgeAnimator'
import { ConsentFlowDiagram } from '@/components/landing/visuals/compliance/ConsentFlowDiagram'
import { BannerTextPreview } from '@/components/landing/visuals/compliance/BannerTextPreview'

export const metadata: Metadata = {
  title: 'CCPA/CPRA Cookie Compliance | California Privacy Law Guide 2025',
  description: 'Complete CCPA/CPRA cookie compliance guide for California businesses. Learn requirements, "Do Not Sell" implementation, and compliance best practices.',
  keywords: 'ccpa cookie compliance, california privacy law, do not sell my info, cpra compliance guide',
  openGraph: {
    title: 'CCPA/CPRA Cookie Compliance | California Privacy Law Guide 2025',
    description: 'Complete CCPA/CPRA cookie compliance guide for California businesses. Learn requirements, "Do Not Sell" implementation, and compliance best practices.',
    type: 'article',
  },
}

export default function CCPACompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500 text-white">California Privacy Law</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CCPA Compliance Made Simple — 100% Automatic
            </h1>
            <div className="text-xl md:text-2xl text-yellow-100 mb-8 space-y-2">
              <div className="font-bold">✓ Avoid $7.5K+ CCPA Fines Automatically</div>
              <div className="font-bold">✓ "Do Not Sell" Button Built-In</div>
              <div className="font-bold">✓ California Visitor Auto-Detection</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-yellow-50">
                <Shield className="mr-2 h-5 w-5" />
                Get CCPA Compliant Now
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
                See CCPA Compliance In Action
              </h2>
              <p className="text-xl text-gray-600">
                Watch how our solution automatically handles California privacy law compliance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Automatic Compliance Verification</h3>
                <ComplianceBadgeAnimator />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Consent Flow Comparison</h3>
                <ConsentFlowDiagram />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Banner Text Examples</h3>
                <BannerTextPreview />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">"Do Not Sell" Button</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                    <h4 className="font-semibold text-gray-900 mb-2">California Privacy Rights</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      You have the right to opt-out of the sale of your personal information.
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      Do Not Sell My Personal Information
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                <Shield className="mr-2 h-5 w-5" />
                Get CCPA Compliant Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CCPA Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is CCPA/CPRA?
              </h2>
              <p className="text-xl text-gray-600">
                California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) - California's comprehensive privacy laws
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    CCPA (California Consumer Privacy Act)
                  </CardTitle>
                  <Badge className="w-fit">Effective January 1, 2020</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Applies to businesses that collect California residents' personal information</li>
                    <li>• Requires disclosure of data collection and use practices</li>
                    <li>• Grants consumers right to know, delete, and opt-out of sale</li>
                    <li>• Requires "Do Not Sell My Personal Information" link</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    CPRA (California Privacy Rights Act)
                  </CardTitle>
                  <Badge className="w-fit">Effective January 1, 2023</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Expands CCPA with additional consumer rights</li>
                    <li>• Adds right to correct inaccurate personal information</li>
                    <li>• Introduces right to limit use of sensitive personal information</li>
                    <li>• Creates California Privacy Protection Agency (CPPA)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Must Comply?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Business Requirements (Any of the following)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Annual gross revenues &gt; $25 million</li>
                      <li>• Buys/sells/shares personal information of 100,000+ consumers</li>
                      <li>• Derives 50%+ of annual revenue from selling personal information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cookie-Specific Requirements</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Collects personal information through cookies</li>
                      <li>• Uses cookies for advertising/targeting</li>
                      <li>• Shares cookie data with third parties</li>
                      <li>• Sells personal information obtained through cookies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consumer Rights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Consumer Rights Under CCPA/CPRA
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the rights California consumers have regarding their personal information
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    Right to Know
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consumers have the right to know what personal information is collected, used, shared, or sold.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Right to Delete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consumers can request deletion of their personal information, subject to certain exceptions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    Right to Opt-Out
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consumers can opt-out of the sale or sharing of their personal information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Right to Correct
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consumers can request correction of inaccurate personal information (CPRA addition).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    Right to Limit Sensitive Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consumers can limit the use of sensitive personal information (CPRA addition).
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-indigo-500" />
                    Right to Non-Discrimination
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Businesses cannot discriminate against consumers who exercise their privacy rights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* "Do Not Sell" Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                "Do Not Sell My Personal Information" Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Critical compliance requirements for businesses that sell or share personal information
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-red-600">What Constitutes "Sale" Under CCPA?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sale Includes</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Exchanging personal information for monetary consideration</li>
                      <li>Sharing data with third parties for advertising</li>
                      <li>Allowing third parties to collect data on your site</li>
                      <li>Data sharing for cross-context behavioral advertising</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Not Considered Sale</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Sharing with service providers under contract</li>
                      <li>Sharing with affiliates under common control</li>
                      <li>Disclosure required by law</li>
                      <li>Business transfers (mergers, acquisitions)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    "Do Not Sell" Link Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Must be prominently displayed on your website homepage</li>
                    <li>Link text must include "Do Not Sell My Personal Information" or "Do Not Sell or Share My Personal Information"</li>
                    <li>Must be accessible from all pages where personal information is collected</li>
                    <li>Cannot be hidden in privacy policy or footer</li>
                    <li>Must be easily accessible on mobile devices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Opt-Out Mechanism Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Must provide at least two methods for consumers to opt-out</li>
                    <li>One method must be a toll-free phone number</li>
                    <li>Alternative methods include webform, email, or postal mail</li>
                    <li>Must honor opt-out requests within 15 business days</li>
                    <li>Cannot require consumers to create an account to opt-out</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Cookie-Specific Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Third-party cookies used for advertising likely constitute "sale"</li>
                    <li>Analytics cookies shared with third parties may be "sale"</li>
                    <li>Social media widgets that track users may be "sale"</li>
                    <li>Consider implementing Global Privacy Control (GPC) signals</li>
                    <li>Cookie banners should include opt-out options</li>
                  </ul>
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
                CCPA/CPRA Cookie Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to implementing CCPA/CPRA-compliant cookie consent
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Assess Your Data Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Determine if CCPA/CPRA applies to your business:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Calculate annual revenue and data collection thresholds</li>
                    <li>Identify all personal information collected through cookies</li>
                    <li>Determine if you "sell" or "share" personal information</li>
                    <li>Map data flows to third parties</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Update Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Enhance your privacy policy with CCPA/CPRA required disclosures:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Categories of personal information collected</li>
                    <li>Sources of personal information</li>
                    <li>Business or commercial purposes for collection</li>
                    <li>Categories of third parties with whom information is shared</li>
                    <li>Consumer rights and how to exercise them</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Implement Opt-Out Mechanisms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up required opt-out mechanisms:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Add "Do Not Sell" link to website homepage</li>
                    <li>Implement opt-out webform or other methods</li>
                    <li>Provide toll-free phone number for opt-outs</li>
                    <li>Process opt-out requests within 15 business days</li>
                    <li>Implement Global Privacy Control (GPC) support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Cookie Consent Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Implement cookie consent that supports CCPA/CPRA rights:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide granular opt-out options for cookie categories</li>
                    <li>Honor opt-out requests immediately</li>
                    <li>Block third-party cookies when opt-out is exercised</li>
                    <li>Maintain records of consumer choices</li>
                    <li>Provide easy access to change preferences</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties and Enforcement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                CCPA/CPRA Penalties and Enforcement
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the consequences of non-compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-600">Penalties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Intentional Violations</h4>
                      <p className="text-2xl font-bold text-yellow-600">Up to $7,500 per violation</p>
                      <p className="text-sm text-gray-600">For intentional violations of CCPA</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Unintentional Violations</h4>
                      <p className="text-2xl font-bold text-orange-600">Up to $2,500 per violation</p>
                      <p className="text-sm text-gray-600">For unintentional violations of CCPA</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">CPRA Violations</h4>
                      <p className="text-2xl font-bold text-red-600">Up to $7,500 per violation</p>
                      <p className="text-sm text-gray-600">For violations involving minors under 16</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-600">Enforcement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>California Attorney General enforcement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>California Privacy Protection Agency (CPPA) enforcement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Private right of action for data breaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>30-day cure period before penalties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Regular enforcement actions and settlements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get CCPA/CPRA Compliant?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Our cookie consent solution makes California privacy law compliance simple and automatic. Get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-yellow-50">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download CCPA Checklist
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
