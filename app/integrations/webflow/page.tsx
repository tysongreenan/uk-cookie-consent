import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Code, Zap, Users, CheckCircle, ExternalLink, Download, Settings } from 'lucide-react'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { PluginComparisonTable } from '@/components/landing/visuals/integration/PluginComparisonTable'
import { BeforeAfterSlider } from '@/components/landing/visuals/integration/BeforeAfterSlider'

export const metadata: Metadata = {
  title: 'Webflow Cookie Consent Integration | Designer Extension 2025',
  description: 'Complete Webflow cookie consent integration guide. Custom code injection, Designer extension, CMS compliance, client billing. GDPR, PIPEDA, CCPA compliant cookie banner for Webflow sites.',
  keywords: 'webflow cookie consent, webflow gdpr compliance, webflow designer extension, webflow custom code, webflow privacy banner',
  openGraph: {
    title: 'Webflow Cookie Consent Integration | Designer Extension 2025',
    description: 'Complete Webflow cookie consent integration guide. Custom code injection, Designer extension, CMS compliance.',
    type: 'article',
  },
}

export default function WebflowIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500 text-white">Webflow Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Webflow Cookie Banner — Copy, Paste, Done in 5 Minutes
            </h1>
            <div className="text-xl md:text-2xl text-purple-100 mb-8 space-y-2">
              <div className="font-bold">✓ Save 3+ Hours vs Custom Development</div>
              <div className="font-bold">✓ Avoid $20K+ GDPR Fines Automatically</div>
              <div className="font-bold">✓ Works with All Webflow Plans</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Palette className="mr-2 h-5 w-5" />
                Get Webflow Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Code className="mr-2 h-5 w-5" />
                View Integration Guide
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
                Watch how easy it is to add cookie consent to your Webflow site
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Webflow Embed Code</h3>
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
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Palette className="mr-2 h-5 w-5" />
                Build My Webflow Banner
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
                Why Choose Our Webflow Solution?
              </h2>
              <p className="text-xl text-gray-600">
                See how we compare to other Webflow cookie consent options
              </p>
            </div>

            <PluginComparisonTable />

            <div className="text-center mt-8">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Palette className="mr-2 h-5 w-5" />
                Get My Webflow Banner
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
                Get your Webflow site compliant in minutes, not hours
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                  <CardTitle>Build Your Banner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use our visual builder to create a custom cookie banner that matches your Webflow design.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                  <CardTitle>Copy & Paste Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Copy the generated code and paste it into your Webflow Project Settings &gt; Custom Code.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                  <CardTitle>Publish & Done</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Publish your site and you're compliant! The banner automatically handles all consent management.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Palette className="mr-2 h-5 w-5" />
                Start Building My Banner
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Webflow Site Compliant?
            </h2>
            <div className="text-xl text-purple-100 mb-8 space-y-2">
              <div className="font-bold">✓ 5-Minute Setup, Zero Maintenance</div>
              <div className="font-bold">✓ Works with All Webflow Plans</div>
              <div className="font-bold">✓ 100% GDPR, PIPEDA, CCPA Compliant</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Palette className="mr-2 h-5 w-5" />
                Build My Webflow Banner
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
