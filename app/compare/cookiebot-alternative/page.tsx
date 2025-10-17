import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertTriangle, DollarSign, Zap, Shield, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookiebot Alternative | Free vs Paid Cookie Consent Solutions 2025',
  description: 'Compare Cookiebot vs our free cookie consent solution. Better performance, unlimited customization, no monthly fees. Complete feature comparison and migration guide.',
  keywords: 'cookiebot alternative, free cookiebot, cookiebot vs, cookie consent comparison, cookiebot pricing',
  openGraph: {
    title: 'Cookiebot Alternative | Free vs Paid Cookie Consent Solutions 2025',
    description: 'Compare Cookiebot vs our free cookie consent solution. Better performance, unlimited customization, no monthly fees. Complete feature comparison and migration guide.',
    type: 'article',
  },
}

export default function CookiebotAlternativePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500 text-white">Free Alternative</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cookiebot Alternative
              <span className="block text-green-200">Free Cookie Consent Solution</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">
              Why pay $9-199/month for Cookiebot when you can get better performance, unlimited customization, and complete compliance for free?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="mr-2 h-5 w-5" />
                See Migration Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cookiebot vs Our Solution
              </h2>
              <p className="text-xl text-gray-600">
                See why thousands of businesses are switching from Cookiebot to our free alternative
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    Cookiebot
                  </CardTitle>
                  <Badge className="w-fit bg-red-100 text-red-800">Paid Solution</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-red-600">$9-199/month</div>
                      <div className="text-sm text-red-600">Starting price</div>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Limited customization options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Slow loading times (200ms+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Generic cookie categorization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Complex setup process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>Limited language support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Our Solution
                  </CardTitle>
                  <Badge className="w-fit bg-green-100 text-green-800">Free Forever</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">Free</div>
                      <div className="text-sm text-green-600">No monthly fees</div>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Unlimited customization options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Lightning fast (under 50ms)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Custom cookie categorization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>5-minute setup process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>20+ language support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Detailed Feature Comparison
              </h2>
              <p className="text-xl text-gray-600">
                Complete comparison of features, pricing, and performance
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold bg-green-50">Our Solution</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Cookiebot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Monthly Cost</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <span className="text-lg font-bold text-green-600">Free</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span className="text-lg font-bold text-red-600">$9-199/month</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Setup Time</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">5 minutes</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">30+ minutes</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Performance Impact</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Minimal (50ms)</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      <span className="text-sm text-red-600">High (200ms+)</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">GDPR Compliance</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">PIPEDA Compliance</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">CCPA Compliance</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Customization</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Unlimited</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Cookie Scanning</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Advanced</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Language Support</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">20+ languages</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Support</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Community + Docs</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Email Support</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium">Data Ownership</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">You own all data</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      <span className="text-sm text-red-600">Third-party servers</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-3 px-4 py-3 font-medium">White Label</td>
                    <td className="border border-gray-300 px-4 py-3 text-center bg-green-50">
                      <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="text-sm text-green-600">Full white label</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mx-auto" />
                      <span className="text-sm text-orange-600">Limited</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Switch from Cookiebot?
              </h2>
              <p className="text-xl text-gray-600">
                Thousands of businesses have already made the switch. Here's why:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-green-500" />
                    <CardTitle>Save Money</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stop paying $108-2,388 per year for basic cookie consent. Our solution is completely free with no hidden costs or limitations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-blue-500" />
                    <CardTitle>Better Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our solution loads 4x faster than Cookiebot, improving your website's Core Web Vitals and user experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-purple-500" />
                    <CardTitle>Complete Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Own your data and have complete control over your cookie consent implementation. No third-party dependencies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-orange-500" />
                    <CardTitle>Easy Migration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Migrate from Cookiebot in minutes with our step-by-step migration guide and automated cookie detection.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-red-500" />
                    <CardTitle>Better UX</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Modern, beautiful design that matches your brand. No more generic Cookiebot interfaces that hurt your conversion rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Future-Proof</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Regular updates and new features without additional costs. Stay ahead of privacy law changes with our free solution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Migration from Cookiebot
              </h2>
              <p className="text-xl text-gray-600">
                Switch from Cookiebot to our solution in 5 simple steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Export Your Cookiebot Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Export your current cookie categorization from Cookiebot:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Log into your Cookiebot dashboard</li>
                    <li>Go to Settings → Cookie Declaration</li>
                    <li>Export your cookie list as CSV</li>
                    <li>Note your current consent settings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Create Your Free Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Sign up for our free service and create your cookie banner:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Create your free account (no credit card required)</li>
                    <li>Use our cookie scanner to audit your website</li>
                    <li>Import your Cookiebot cookie list</li>
                    <li>Configure your consent preferences</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Customize Your Banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Customize your cookie banner to match your brand:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Choose colors that match your website</li>
                    <li>Select banner position and style</li>
                    <li>Customize text and messaging</li>
                    <li>Configure cookie categories and purposes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Replace Cookiebot Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Remove Cookiebot and add our code to your website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Remove Cookiebot script from your website</li>
                    <li>Add our generated code snippet</li>
                    <li>Test the implementation</li>
                    <li>Verify all cookies are properly categorized</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Cancel Cookiebot Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Once everything is working, cancel your Cookiebot subscription:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Verify our solution is working correctly</li>
                    <li>Test consent flows and cookie blocking</li>
                    <li>Cancel your Cookiebot subscription</li>
                    <li>Enjoy the savings and better performance!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Calculate Your Savings
              </h2>
              <p className="text-xl text-gray-600">
                See how much you'll save by switching from Cookiebot
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Cookiebot Costs</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Starter Plan (up to 1 domain)</span>
                        <span className="font-bold text-red-600">$9/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional Plan (up to 5 domains)</span>
                        <span className="font-bold text-red-600">$29/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Enterprise Plan (unlimited domains)</span>
                        <span className="font-bold text-red-600">$199/month</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-600">Annual cost range:</div>
                      <div className="text-lg font-bold text-red-600">$108 - $2,388</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>All Features Included</span>
                        <span className="font-bold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unlimited Domains</span>
                        <span className="font-bold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unlimited Customization</span>
                        <span className="font-bold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Advanced Analytics</span>
                        <span className="font-bold text-green-600">Free</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600">Annual cost:</div>
                      <div className="text-lg font-bold text-green-600">$0</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                  <h4 className="text-lg font-bold text-blue-900 mb-2">Potential Annual Savings</h4>
                  <div className="text-3xl font-bold text-blue-600">$108 - $2,388</div>
                  <p className="text-sm text-blue-700 mt-1">Plus better performance and more features</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ditch Cookiebot?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of businesses saving money with our free cookie consent solution. Better performance, more features, zero cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Shield className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Users className="mr-2 h-5 w-5" />
                Download Migration Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
