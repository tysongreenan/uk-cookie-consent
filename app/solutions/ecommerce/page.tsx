import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, TrendingUp, Shield, Zap, Users, Globe, BarChart3, CheckCircle, AlertTriangle, ExternalLink, Download } from '@phosphor-icons/react'
import { ROICalculator } from '@/components/landing/visuals/solution/ROICalculator'
import { EcommerceBannerDemo } from '@/components/landing/visuals/solution/EcommerceBannerDemo'
import { SetupSpeedometer } from '@/components/landing/visuals/core/SetupSpeedometer'

export const metadata: Metadata = {
  title: 'E-commerce Cookie Consent | Shopify GDPR Compliance Solution 2025',
  description: 'Complete e-commerce cookie consent solution for online stores. Shopify, WooCommerce, Magento compliance with conversion optimization. Cart tracking, payment processors, advertising pixels.',
  keywords: 'ecommerce cookie consent, shopify gdpr compliance, woocommerce cookie banner, online store privacy compliance, e-commerce cookie tracking',
  openGraph: {
    title: 'E-commerce Cookie Consent | Shopify GDPR Compliance Solution 2025',
    description: 'Complete e-commerce cookie consent solution for online stores. Shopify, WooCommerce, Magento compliance with conversion optimization.',
    type: 'article',
  },
}

export default function EcommerceSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500 text-white">E-commerce Solution</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              E-commerce Cookie Consent — Protect Revenue, Stay Compliant
            </h1>
            <div className="text-xl md:text-2xl text-purple-100 mb-8 space-y-2">
              <div>✓ Maintain conversion rates while staying compliant</div>
              <div>✓ Avoid $20K+ GDPR fines automatically</div>
              <div>✓ 5-minute setup, zero maintenance</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get My E-commerce Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BarChart3 className="mr-2 h-5 w-5" />
                Calculate My ROI
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
                See E-commerce Cookie Consent In Action
              </h2>
              <p className="text-xl text-gray-600">
                Watch how our solution works on a real e-commerce product page
              </p>
            </div>
            
            <EcommerceBannerDemo />
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Calculate Your E-commerce ROI
              </h2>
              <p className="text-xl text-gray-600">
                See how much you could save by avoiding compliance fines
              </p>
            </div>
            
            <ROICalculator industry="ecommerce" />
          </div>
        </div>
      </section>

      {/* Setup Speed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Setup Speed Comparison
              </h2>
              <p className="text-xl text-gray-600">
                See how fast our solution is compared to traditional methods
              </p>
            </div>
            
            <SetupSpeedometer />
          </div>
        </div>
      </section>

      {/* 3 Problems We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3 Big Problems E-commerce Solves
              </h2>
              <p className="text-xl text-gray-600">
                The main challenges online stores face with cookie consent
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Conversion Rate Drops</h3>
                <p className="text-gray-600">
                  Generic cookie banners can reduce conversions by 15-25% due to poor user experience and unclear messaging.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance Fines</h3>
                <p className="text-gray-600">
                  GDPR fines up to 4% of annual revenue, CCPA penalties up to $7,500 per violation, plus legal costs.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Loss</h3>
                <p className="text-gray-600">
                  Without proper consent, you lose crucial tracking data for Facebook Pixel, Google Ads, and conversion optimization.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-commerce Cookie Challenges
              </h2>
              <p className="text-xl text-gray-600">
                Online stores face unique compliance challenges that require specialized solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-6 w-6 text-red-500" />
                    <CardTitle>Cart Abandonment Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Balancing cart recovery with privacy compliance. Users must consent to tracking pixels that help recover abandoned carts.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                    <CardTitle>Conversion Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Facebook Pixel, Google Ads, and other conversion tracking tools require explicit consent but are crucial for ROI measurement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-green-500" />
                    <CardTitle>Payment Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stripe, PayPal, and other payment processors use cookies for fraud prevention and security, which may require special handling.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Personalization</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Product recommendations, wishlists, and personalized experiences rely on cookies that need user consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-500" />
                    <CardTitle>Multi-Market Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Selling globally means complying with GDPR (EU), PIPEDA (Canada), CCPA (California), and other regional privacy laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Performance Impact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cookie consent solutions can impact page speed and conversion rates if not optimized for e-commerce workflows.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-commerce Platform Support
              </h2>
              <p className="text-xl text-gray-600">
                Seamless integration with all major e-commerce platforms
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Shopify</h3>
                  <p className="text-sm text-gray-600 mb-4">Theme integration, checkout compliance, app store alternative</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Full Support</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>No App Required</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">WooCommerce</h3>
                  <p className="text-sm text-gray-600 mb-4">WordPress plugin alternative, theme compatibility</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Full Support</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Performance Optimized</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Magento</h3>
                  <p className="text-sm text-gray-600 mb-4">Enterprise e-commerce, multi-store compliance</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Full Support</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Multi-Store</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">BigCommerce</h3>
                  <p className="text-sm text-gray-600 mb-4">Headless commerce, API-first integration</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Full Support</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>API Ready</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Optimization */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Conversion Rate Optimization
              </h2>
              <p className="text-xl text-gray-600">
                Maintain high conversion rates while ensuring compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Before Cookie Consent</h3>
                <div className="space-y-4">
                  <Card className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Poor User Experience</h4>
                          <p className="text-sm text-gray-600">Generic consent banners hurt conversion rates</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Compliance Risks</h4>
                          <p className="text-sm text-gray-600">Fines up to 4% of annual revenue</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Performance Issues</h4>
                          <p className="text-sm text-gray-600">Slow loading consent solutions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">With Our Solution</h3>
                <div className="space-y-4">
                  <Card className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Optimized UX</h4>
                          <p className="text-sm text-gray-600">E-commerce focused design maintains conversions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Full Compliance</h4>
                          <p className="text-sm text-gray-600">GDPR, PIPEDA, CCPA compliant out of the box</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Lightning Fast</h4>
                          <p className="text-sm text-gray-600">Under 50ms load time, no conversion impact</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Average Results</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                        <div className="text-gray-600">Consent Acceptance Rate</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">0.2%</div>
                        <div className="text-gray-600">Conversion Rate Impact</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-purple-600 mb-2">25%</div>
                        <div className="text-gray-600">Faster Page Load</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-commerce Specific Features
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for online stores and conversion optimization
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Cart & Checkout Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cart abandonment tracking with consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Checkout process compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Payment processor integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Order confirmation tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Marketing & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Facebook Pixel integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Google Ads conversion tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Email marketing platform sync</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Affiliate tracking compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Product recommendation consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Recently viewed products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Wishlist and favorites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Multi-currency support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Fraud Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Fraud detection services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>CAPTCHA integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Session management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Payment security validation</span>
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
                E-commerce Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Get your online store compliant in 5 simple steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Choose Your Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Select your e-commerce platform and integration method:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Shopify</h4>
                      <p className="text-sm text-gray-600">Theme code editor or app alternative</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">WooCommerce</h4>
                      <p className="text-sm text-gray-600">WordPress theme integration</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Magento</h4>
                      <p className="text-sm text-gray-600">Custom module or theme integration</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">BigCommerce</h4>
                      <p className="text-sm text-gray-600">Stencil template integration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Configure E-commerce Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up e-commerce specific cookie categories and tracking:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Enable cart abandonment tracking</li>
                    <li>Configure conversion tracking pixels</li>
                    <li>Set up payment processor cookies</li>
                    <li>Configure personalization features</li>
                    <li>Enable multi-currency support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Customize for Your Brand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Match your cookie banner to your store's design:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Choose colors that match your brand</li>
                    <li>Select banner position and style</li>
                    <li>Customize messaging for e-commerce</li>
                    <li>Configure checkout-specific messages</li>
                    <li>Set up mobile-optimized design</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test E-commerce Flows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Verify your implementation works correctly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Test cart abandonment tracking</li>
                    <li>Verify conversion tracking works</li>
                    <li>Check payment processor integration</li>
                    <li>Test personalization features</li>
                    <li>Verify mobile checkout experience</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor & Optimize
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Track performance and optimize for conversions:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent acceptance rates</li>
                    <li>Track conversion rate impact</li>
                    <li>A/B test banner variations</li>
                    <li>Optimize for mobile performance</li>
                    <li>Review and update cookie categories</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Calculate Your E-commerce ROI
              </h2>
              <p className="text-xl text-gray-600">
                See how cookie consent compliance impacts your bottom line
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Without Proper Consent</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>GDPR Fine Risk</span>
                        <span className="font-bold text-red-600">Up to 4% of revenue</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CCPA Penalty</span>
                        <span className="font-bold text-red-600">$2,500-7,500 per violation</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Legal Costs</span>
                        <span className="font-bold text-red-600">$10,000-50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reputation Damage</span>
                        <span className="font-bold text-red-600">Priceless</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-600">Annual risk range:</div>
                      <div className="text-lg font-bold text-red-600">$25,000 - $500,000+</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">With Our Solution</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Implementation Cost</span>
                        <span className="font-bold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Fees</span>
                        <span className="font-bold text-green-600">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup Time</span>
                        <span className="font-bold text-green-600">5 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Guarantee</span>
                        <span className="font-bold text-green-600">100%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600">Annual cost:</div>
                      <div className="text-lg font-bold text-green-600">$0</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg text-center">
                  <h4 className="text-lg font-bold text-purple-900 mb-2">Potential Savings</h4>
                  <div className="text-3xl font-bold text-purple-600">$25,000 - $500,000+</div>
                  <p className="text-sm text-purple-700 mt-1">Plus improved conversion rates and customer trust</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join 1,000+ E-commerce Stores Already Protected
            </h2>
            <div className="text-xl text-purple-100 mb-8 space-y-2">
              <div>✓ Maintain conversion rates while staying compliant</div>
              <div>✓ Avoid $20K+ GDPR fines automatically</div>
              <div>✓ 5-minute setup, zero maintenance</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get My E-commerce Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download E-commerce Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
