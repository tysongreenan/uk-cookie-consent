import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Shield, Lock, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, CreditCard, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financial Cookie Consent | Banking GDPR Compliance Solution 2025',
  description: 'Complete financial cookie consent solution for banks, fintech, and investment platforms. GLBA, PCI-DSS + cookie law compliance, fraud prevention, security-focused cookie management.',
  keywords: 'financial website cookies, banking gdpr compliance, fintech privacy, investment platform cookies, financial data protection',
  openGraph: {
    title: 'Financial Cookie Consent | Banking GDPR Compliance Solution 2025',
    description: 'Complete financial cookie consent solution for banks, fintech, and investment platforms. GLBA, PCI-DSS + cookie law compliance.',
    type: 'article',
  },
}

export default function FinanceSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-slate-600 text-white">Financial Solution</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Financial Cookie Consent
              <span className="block text-slate-200">Security-First Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8">
              Complete financial cookie consent solution for banks, fintech, and investment platforms. GLBA, PCI-DSS + cookie law compliance with fraud prevention and security-focused cookie management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-700 hover:bg-slate-50">
                <DollarSign className="mr-2 h-5 w-5" />
                Get Financial Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Shield className="mr-2 h-5 w-5" />
                Download Security Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial Cookie Compliance Challenges
              </h2>
              <p className="text-xl text-gray-600">
                Financial institutions face complex regulatory requirements across multiple jurisdictions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>Multi-Layer Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Balancing GLBA, PCI-DSS, SOX, and international privacy laws (GDPR, PIPEDA, CCPA) with cookie consent requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-blue-500" />
                    <CardTitle>Fraud Prevention vs Privacy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing cookies for fraud detection, risk assessment, and security while respecting user privacy rights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-green-500" />
                    <CardTitle>Payment Processing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stripe, PayPal, and other payment processors require cookies for security, but need explicit consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <CardTitle>Investment Platform Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Trading platforms, robo-advisors, and investment apps must balance analytics with financial data protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-orange-500" />
                    <CardTitle>Customer Identity Verification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    KYC/AML requirements and identity verification services use cookies that require special consent handling.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Cross-Border Operations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    International banks must comply with multiple regional privacy laws while maintaining consistent security standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Framework */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial Regulatory Framework
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the complex web of financial privacy regulations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Shield className="h-5 w-5" />
                    Financial Privacy Laws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">GLBA (Gramm-Leach-Bliley Act)</h4>
                      <p className="text-sm text-gray-600">Protects consumer financial information, requires privacy notices</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PCI-DSS (Payment Card Industry)</h4>
                      <p className="text-sm text-gray-600">Security standards for payment card data processing</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">SOX (Sarbanes-Oxley Act)</h4>
                      <p className="text-sm text-gray-600">Financial reporting and internal controls requirements</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">CCPA (California Consumer Privacy Act)</h4>
                      <p className="text-sm text-gray-600">Consumer privacy rights for California residents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Globe className="h-5 w-5" />
                    International Privacy Laws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">GDPR (General Data Protection Regulation)</h4>
                      <p className="text-sm text-gray-600">EU privacy law with strict consent requirements</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PIPEDA (Personal Information Protection)</h4>
                      <p className="text-sm text-gray-600">Canadian privacy law for commercial activities</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PDPA (Personal Data Protection Act)</h4>
                      <p className="text-sm text-gray-600">Singapore's comprehensive data protection law</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PDPA (Personal Data Protection Act)</h4>
                      <p className="text-sm text-gray-600">Malaysia's data protection and privacy law</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Integrated Financial Compliance</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Security First</h4>
                    <p className="text-sm text-gray-600">Fraud prevention and security without compromising privacy</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Global Compliance</h4>
                    <p className="text-sm text-gray-600">Multi-jurisdictional privacy law compliance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customer Trust</h4>
                    <p className="text-sm text-gray-600">Transparent privacy practices build financial confidence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial Industry Use Cases
              </h2>
              <p className="text-xl text-gray-600">
                Specialized solutions for different financial services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Traditional Banking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Online banking session management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Fraud detection and risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Payment processing security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Customer service and support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regulatory reporting and compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Trading platform analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Portfolio management tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Market data and research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Robo-advisor algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Investment performance tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Fintech & Digital Banking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Mobile banking applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Peer-to-peer payment platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cryptocurrency exchanges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Digital wallet services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Lending and credit platforms</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Insurance & Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Risk assessment and underwriting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Claims processing and investigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Customer onboarding and KYC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Policy management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Fraud detection and prevention</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial-Grade Security Features
              </h2>
              <p className="text-xl text-gray-600">
                Enterprise security standards for financial institutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Lock className="h-5 w-5" />
                    Security & Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>AES-256 encryption at rest and in transit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>End-to-end encryption for consent data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Multi-factor authentication support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Hardware security module (HSM) integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Zero-knowledge architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="h-5 w-5" />
                    Compliance & Audit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>SOC 2 Type II certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>ISO 27001 compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Comprehensive audit trails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regulatory reporting capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Penetration testing and vulnerability assessments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Users className="h-5 w-5" />
                    Access Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Privileged access management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Single sign-on (SSO) integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Session management and timeout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Anomaly detection and monitoring</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Globe className="h-5 w-5" />
                    Data Residency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Multi-region data centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Data sovereignty controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cross-border data transfer compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Local data processing options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Regulatory reporting by jurisdiction</span>
                    </li>
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
                Financial Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Secure, compliant cookie consent for financial institutions
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Regulatory Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Assess your regulatory requirements and cookie usage:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Identify applicable financial privacy laws (GLBA, PCI-DSS, SOX)</li>
                    <li>Map international privacy law requirements (GDPR, PIPEDA, CCPA)</li>
                    <li>Catalog cookies used for fraud prevention and security</li>
                    <li>Document payment processor and third-party integrations</li>
                    <li>Assess data residency and cross-border transfer requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Security Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Configure enterprise-grade security settings:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Enable end-to-end encryption for consent data</li>
                    <li>Configure role-based access controls</li>
                    <li>Set up comprehensive audit logging</li>
                    <li>Implement fraud detection cookie categories</li>
                    <li>Configure data retention and deletion policies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Customer-Facing Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Deploy customer-friendly consent interfaces:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use clear, financial-industry appropriate language</li>
                    <li>Explain security and fraud prevention benefits</li>
                    <li>Provide granular consent options for different services</li>
                    <li>Enable easy consent management in customer portals</li>
                    <li>Ensure accessibility and multi-language support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Staff Training & Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Train staff on financial privacy compliance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Provide GLBA and privacy law training</li>
                    <li>Train customer service on consent procedures</li>
                    <li>Establish incident response protocols</li>
                    <li>Create consent management workflows</li>
                    <li>Regular compliance updates and refresher training</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Ongoing Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Maintain continuous compliance monitoring:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent rates and customer feedback</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Audit trail reviews and regulatory reporting</li>
                    <li>Update privacy practices for new regulations</li>
                    <li>Annual compliance assessments and gap analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-700 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Financial-Grade Cookie Consent?
            </h2>
            <p className="text-xl text-slate-100 mb-8">
              Join leading financial institutions using our security-first cookie consent solution. Enterprise-grade compliance with fraud prevention and customer trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-700 hover:bg-slate-50">
                <DollarSign className="mr-2 h-5 w-5" />
                Get Financial Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Shield className="mr-2 h-5 w-5" />
                Download Security Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
