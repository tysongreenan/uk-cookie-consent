import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, Download, ExternalLink, ShoppingCart, Shield } from 'lucide-react'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { PluginComparisonTable } from '@/components/landing/visuals/integration/PluginComparisonTable'
import { BeforeAfterSlider } from '@/components/landing/visuals/integration/BeforeAfterSlider'

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
              Shopify Cookie Banner — No App Required, 5-Minute Setup
            </h1>
            <div className="text-xl md:text-2xl text-green-100 mb-8 space-y-2">
              <div className="font-bold">✓ No Monthly Fees vs $300+/Month Apps</div>
              <div className="font-bold">✓ 10x Faster Than Cookiebot & OneTrust</div>
              <div className="font-bold">✓ E-commerce Optimized for Conversions</div>
            </div>
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

      {/* Visual Demo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See It In Action
              </h2>
              <p className="text-xl text-gray-600">
                Watch how easy it is to add cookie consent to your Shopify store
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Shopify Theme Code</h3>
                <CodeCopyBlock />
                  </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">3-Step Installation</h3>
                <ThreeStepInstallation />
                  </div>
                  </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-center">Before vs After</h3>
              <BeforeAfterSlider />
                  </div>

            <div className="text-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Build My Shopify Banner
              </Button>
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
                Why Choose Our Shopify Solution?
              </h2>
              <p className="text-xl text-gray-600">
                See how we compare to popular Shopify cookie consent apps
              </p>
            </div>

            <PluginComparisonTable />

            <div className="text-center mt-8">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get My Shopify Banner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works — 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600">
                Get your Shopify store compliant in minutes, not hours
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                  <CardTitle>Build Your Banner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use our visual builder to create a custom cookie banner that matches your Shopify theme.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                  <CardTitle>Copy & Paste Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Copy the generated code and paste it into your Shopify theme.liquid file.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                  <CardTitle>Publish & Done</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Publish your store and you're compliant! The banner automatically handles all consent management.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Building My Banner
                  </Button>
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
            <div className="text-xl text-green-100 mb-8 space-y-2">
              <div className="font-bold">✓ No Monthly Fees vs $300+/Month Apps</div>
              <div className="font-bold">✓ 10x Faster Than Cookiebot & OneTrust</div>
              <div className="font-bold">✓ E-commerce Optimized for Conversions</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Build My Shopify Banner
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
