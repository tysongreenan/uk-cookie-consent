import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CookieScanner } from './cookie-scanner'
import { ScannerAnimation } from '@/components/landing/visuals/tools/ScannerAnimation'
import { CookieResultsVisual } from '@/components/landing/visuals/tools/CookieResultsVisual'
import { ThreeStepAnimation } from '@/components/landing/visuals/core/ThreeStepAnimation'

export const metadata: Metadata = {
  title: 'Free Cookie Scanner | Website Cookie Audit Tool 2025',
  description: 'Free cookie scanner tool to audit your website cookies. Find all cookies, analyze compliance, and get recommendations for GDPR, PIPEDA, and CCPA compliance.',
  keywords: 'cookie scanner, website cookie audit, find cookies on website, cookie compliance audit, free cookie checker',
  openGraph: {
    title: 'Free Cookie Scanner | Website Cookie Audit Tool 2025',
    description: 'Free cookie scanner tool to audit your website cookies. Find all cookies, analyze compliance, and get recommendations for GDPR, PIPEDA, and CCPA compliance.',
    type: 'article',
  },
}

export default function CookieScannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">Free Tool</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Cookie Scanner — See What's Tracking Your Visitors
            </h1>
            <div className="text-xl md:text-2xl text-blue-100 mb-8 space-y-2">
              <div>✓ Instant scan reveals all cookies</div>
              <div>✓ Risk analysis and compliance check</div>
              <div>✓ 100% free, no registration required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scanner Interface */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Website Cookie Scanner
                </CardTitle>
                <CardDescription>
                  Enter your website URL below to scan for cookies and analyze compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CookieScanner />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Demo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScannerAnimation />
          </div>
        </div>
      </section>

      {/* Results Demo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <CookieResultsVisual />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works — 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600">
                Get comprehensive cookie analysis in minutes
              </p>
            </div>
            
            <ThreeStepAnimation />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Cookie Scanner Finds
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive cookie analysis for complete compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍪</span>
                    <CardTitle>All Cookies Detected</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Identifies first-party and third-party cookies, including session cookies, persistent cookies, and secure cookies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <CardTitle>Cookie Categorization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically categorizes cookies into necessary, analytics, marketing, and functional categories.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <CardTitle>Compliance Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Analyzes your cookies against GDPR, PIPEDA, and CCPA requirements with specific recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <CardTitle>Performance Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Identifies cookies that may impact website performance and provides optimization suggestions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <CardTitle>Security Assessment</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Evaluates cookie security settings including HttpOnly, Secure, and SameSite attributes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <CardTitle>Detailed Report</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Generates a comprehensive report with actionable recommendations for compliance and optimization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Our Cookie Scanner Works
              </h2>
              <p className="text-xl text-gray-600">
                Advanced technology to provide accurate cookie analysis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Website Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our scanner visits your website and analyzes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>All HTTP requests and responses</li>
                    <li>JavaScript execution and cookie creation</li>
                    <li>Third-party scripts and services</li>
                    <li>Local storage and session storage</li>
                    <li>Cookie attributes and security settings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Cookie Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Advanced algorithms identify and categorize:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>First-party vs third-party cookies</li>
                    <li>Session vs persistent cookies</li>
                    <li>Functional vs tracking cookies</li>
                    <li>Marketing and advertising cookies</li>
                    <li>Analytics and performance cookies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Compliance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Analyzes cookies against privacy laws:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>GDPR requirements and consent needs</li>
                    <li>PIPEDA compliance requirements</li>
                    <li>CCPA "Do Not Sell" implications</li>
                    <li>Cookie policy requirements</li>
                    <li>Consent management recommendations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Report Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Generates comprehensive compliance report:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Complete cookie inventory</li>
                    <li>Compliance risk assessment</li>
                    <li>Actionable recommendations</li>
                    <li>Implementation priority guide</li>
                    <li>Best practice suggestions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Use Our Cookie Scanner?
              </h2>
              <p className="text-xl text-gray-600">
                Professional-grade cookie analysis for free
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Completely Free
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Our cookie scanner is completely free to use with no hidden costs or limitations:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Unlimited website scans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Detailed compliance reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>No registration required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Export reports as PDF</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Accurate Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Advanced scanning technology provides accurate and comprehensive results:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Real browser environment scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>JavaScript execution analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Dynamic cookie detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Third-party service identification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    Fast & Reliable
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Quick and reliable scanning with instant results:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Results in under 30 seconds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>99.9% uptime guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>No server overload</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Consistent performance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">📈</span>
                    Actionable Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get actionable recommendations to improve compliance:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Priority-based recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Implementation guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Best practice suggestions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Compliance checklist</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Fix Your Cookie Compliance?
            </h2>
            <div className="text-xl text-blue-100 mb-8 space-y-2">
              <div>✓ Get instant compliance solution</div>
              <div>✓ Address all issues found in scan</div>
              <div>✓ 5-minute setup, zero maintenance</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <span className="mr-2">🍪</span>
                Get My Cookie Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <span className="mr-2">📋</span>
                Download Compliance Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
