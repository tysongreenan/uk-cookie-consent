import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, Download, ExternalLink, ShoppingCart, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shopify Cookie Consent Integration | GDPR App Alternative 2025',
  description: 'Step-by-step Shopify cookie consent integration guide. Easy GDPR compliance without apps. Better performance than Cookiebot, OneTrust Shopify apps.',
  keywords: 'shopify cookie consent, shopify gdpr app, shopify privacy compliance, cookie consent shopify store',
  openGraph: {
    title: 'Shopify Cookie Consent Integration | GDPR App Alternative 2025',
    description: 'Step-by-step Shopify cookie consent integration guide. Easy GDPR compliance without apps. Better performance than Cookiebot, OneTrust Shopify apps.',
    type: 'article',
  },
}

export default function ShopifyIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500 text-white">Shopify Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Shopify Cookie Consent
              <span className="block text-green-200">Integration Guide</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Step-by-step Shopify cookie consent integration. Easy GDPR compliance without apps. Better performance than Cookiebot, OneTrust Shopify apps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get Shopify Code
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Shopify Cookie Banner?
              </h2>
              <p className="text-xl text-gray-600">
                Superior to popular Shopify cookie consent apps in every way
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-green-500" />
                    <CardTitle>Lightning Fast</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No app overhead. Our solution loads in under 50ms compared to 200ms+ for most Shopify cookie apps.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                    <CardTitle>100% Compliant</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built-in GDPR, PIPEDA, and CCPA compliance. No configuration needed - works out of the box.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>E-commerce Optimized</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Designed specifically for online stores. Works perfectly with Shopify checkout and conversion tracking.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-orange-500" />
                    <CardTitle>No App Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simple code snippet integration. No app store fees, updates, or security vulnerabilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>Secure & Reliable</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No external dependencies or third-party servers. Your customer data stays on your Shopify store.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Multi-Language</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built-in support for 20+ languages. Perfect for international Shopify stores with multiple markets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shopify Cookie App Comparison
              </h2>
              <p className="text-xl text-gray-600">
                See how we compare to popular Shopify cookie consent apps
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold bg-green-50">Our Solution</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Cookiebot</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">OneTrust</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Cookie Notice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Setup Time</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">5 minutes</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">30+ minutes</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">60+ minutes</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">45+ minutes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Performance Impact</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Minimal</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                      <span className="text-sm text-red-600">High</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                      <span className="text-sm text-red-600">High</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Moderate</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">GDPR Compliance</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Customization</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Unlimited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Monthly Cost</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <span className="text-lg font-bold text-green-600">Free</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="text-lg font-bold text-red-600">$9-199/month</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="text-lg font-bold text-red-600">$100-500/month</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="text-lg font-bold text-red-600">$9-29/month</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">E-commerce Features</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Optimized</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Basic</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Basic</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Shopify-Specific Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shopify E-commerce Features
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for online stores and e-commerce compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Checkout Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ensures cookie consent is properly handled throughout the entire checkout process, including payment pages.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Conversion Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Properly manages Facebook Pixel, Google Ads, and other tracking pixels to maintain accurate conversion data.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Segmentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Allows you to segment customers based on their cookie consent choices for targeted marketing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Multi-Market Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically detects customer location and shows appropriate compliance framework (GDPR, PIPEDA, CCPA).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Payment Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ensures payment processing cookies and security features work correctly while maintaining compliance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Shopify Plus Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Works seamlessly with Shopify Plus features including Script Editor and advanced checkout customization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shopify Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Choose the integration method that works best for your Shopify store
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Method 1: Theme Code Editor (Recommended)
                  </CardTitle>
                  <Badge className="w-fit">Best Performance</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add our code directly to your theme using Shopify's built-in code editor:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Go to Online Store → Themes</li>
                    <li>Click "Actions" → "Edit code"</li>
                    <li>Open theme.liquid file</li>
                    <li>Add code before closing &lt;/body&gt; tag</li>
                    <li>Save changes</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Best performance - no app overhead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>No monthly fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires theme file editing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Method 2: Shopify Script Editor
                  </CardTitle>
                  <Badge className="w-fit">Shopify Plus</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use Shopify Script Editor for advanced customization (Shopify Plus only):
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Go to Settings → Checkout</li>
                    <li>Scroll to "Script Editor" section</li>
                    <li>Create new script for cookie consent</li>
                    <li>Add your generated code</li>
                    <li>Activate the script</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advanced checkout integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Conditional logic support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires Shopify Plus</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Method 3: Google Tag Manager
                  </CardTitle>
                  <Badge className="w-fit">Advanced Users</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrate through Google Tag Manager for advanced tracking control:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Install Google Tag Manager in your theme</li>
                    <li>Create new Custom HTML tag</li>
                    <li>Add your cookie banner code</li>
                    <li>Set trigger to "All Pages"</li>
                    <li>Publish your GTM container</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advanced tracking integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Easy to manage and update</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires GTM knowledge</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Method 4: Shopify App Alternative
                  </CardTitle>
                  <Badge className="w-fit">No Code Required</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use a simple header/footer injection app:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Install "Code Injector" or similar app</li>
                    <li>Configure the app settings</li>
                    <li>Paste your cookie banner code</li>
                    <li>Set injection point to "Footer"</li>
                    <li>Activate the app</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>No code editing required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Easy to manage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>May require paid app</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Compliance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                E-commerce Cookie Compliance
              </h2>
              <p className="text-xl text-gray-600">
                Special considerations for online stores and Shopify merchants
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Shopping Cart & Checkout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cart abandonment tracking cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Payment processor cookies (Stripe, PayPal)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Shipping and tax calculation cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Order confirmation and tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Marketing & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Facebook Pixel for retargeting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Google Analytics e-commerce tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Email marketing platform cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Affiliate and referral tracking</span>
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
                      <span>Personalized product recommendations</span>
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
                      <span>Multi-currency and localization</span>
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
                      <span>CAPTCHA and bot protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Session management and security</span>
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

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shopify Integration Step-by-Step
              </h2>
              <p className="text-xl text-gray-600">
                Complete guide to adding our cookie banner to your Shopify store
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Generate Your Cookie Banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    First, create your custom cookie banner using our builder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Choose your compliance framework (GDPR, PIPEDA, CCPA)</li>
                    <li>Customize colors to match your Shopify theme</li>
                    <li>Configure e-commerce specific cookie categories</li>
                    <li>Set up conversion tracking and analytics</li>
                    <li>Generate your unique implementation code</li>
                  </ul>
                  <Button className="mt-4">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Banner Builder
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Access Shopify Admin
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Navigate to your Shopify admin panel:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Log in to your Shopify admin</li>
                    <li>Go to "Online Store" → "Themes"</li>
                    <li>Find your current theme and click "Actions"</li>
                    <li>Select "Edit code" from the dropdown menu</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Add Code to Theme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Insert your cookie banner code into the theme:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4">
                    <li>Open the "theme.liquid" file</li>
                    <li>Find the closing &lt;/body&gt; tag</li>
                    <li>Paste your generated code just before the closing tag</li>
                    <li>Save the file</li>
                  </ol>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`<!-- Add your cookie banner code here -->
<script>
(function() {
    // Your generated cookie banner code goes here
    // This code will be provided by our banner builder
})();
</script>
</body>`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test Your Store
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Verify your cookie banner is working correctly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Visit your live store in an incognito/private window</li>
                    <li>Verify the banner appears on your homepage</li>
                    <li>Test the Accept, Reject, and Preferences buttons</li>
                    <li>Check that tracking pixels work after consent</li>
                    <li>Test the checkout process</li>
                    <li>Verify banner works on mobile devices</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Add Cookie Banner to Shopify?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Get started with our Shopify cookie banner integration. No apps required, maximum performance, complete e-commerce compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get Shopify Code
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Integration Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
