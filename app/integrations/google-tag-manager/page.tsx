import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, Download, ExternalLink, BarChart3, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Google Tag Manager Cookie Consent | Consent Mode v2 Integration 2025',
  description: 'Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.',
  keywords: 'gtm cookie consent, google tag manager gdpr, consent mode v2, gtm consent management',
  openGraph: {
    title: 'Google Tag Manager Cookie Consent | Consent Mode v2 Integration 2025',
    description: 'Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.',
    type: 'article',
  },
}

export default function GTMIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-500 text-white">GTM Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Google Tag Manager
              <span className="block text-orange-200">Cookie Consent Integration</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8">
              Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <BarChart3 className="mr-2 h-5 w-5" />
                Get GTM Code
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why GTM + Cookie Consent */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Use GTM for Cookie Consent?
              </h2>
              <p className="text-xl text-gray-600">
                Google Tag Manager provides powerful consent management capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-orange-500" />
                    <CardTitle>Consent Mode v2</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built-in Consent Mode v2 support for Google Analytics 4, Google Ads, and other Google services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                    <CardTitle>Tag Firing Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Granular control over when tags fire based on user consent choices. No more wasted tracking.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Centralized Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Manage all your tracking tags and consent logic from one central GTM container.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                    <CardTitle>Advanced Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Track consent rates, user behavior, and conversion impact with detailed GTM reporting.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>GDPR Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built-in GDPR compliance features including consent state management and data retention controls.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Cross-Domain Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Maintain consent state across multiple domains and subdomains with GTM's cross-domain capabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consent Mode v2 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Consent Mode v2 Implementation
              </h2>
              <p className="text-xl text-gray-600">
                Google's latest consent framework for privacy-compliant tracking
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    What is Consent Mode v2?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Consent Mode v2 is Google's framework for handling user consent in Google Analytics, Google Ads, and other Google services:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Automatically adjusts data collection based on consent</li>
                    <li>• Provides modeling for consented data</li>
                    <li>• Required for Google Ads conversion tracking</li>
                    <li>• Supports granular consent categories</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Required Consent Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Consent Mode v2 requires these specific consent types:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>ad_storage:</strong> Advertising cookies</li>
                    <li>• <strong>analytics_storage:</strong> Analytics cookies</li>
                    <li>• <strong>functionality_storage:</strong> Functional cookies</li>
                    <li>• <strong>personalization_storage:</strong> Personalization cookies</li>
                    <li>• <strong>security_storage:</strong> Security cookies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Consent Mode v2 Implementation Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Default consent state (denied)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'security_storage': 'granted' // Usually granted for security
});

// Update consent when user makes choice
gtag('consent', 'update', {
  'ad_storage': 'granted', // User consented to advertising
  'analytics_storage': 'granted' // User consented to analytics
});`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GTM Integration Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GTM Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Choose the integration method that works best for your GTM setup
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Method 1: Custom HTML Tag
                  </CardTitle>
                  <Badge className="w-fit">Recommended</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add our cookie consent as a Custom HTML tag in GTM:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Create new Custom HTML tag</li>
                    <li>Add your generated cookie banner code</li>
                    <li>Set trigger to "All Pages"</li>
                    <li>Configure Consent Mode v2 integration</li>
                    <li>Publish your container</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Easy to implement and manage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Full GTM integration</span>
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
                    <BarChart3 className="h-5 w-5" />
                    Method 2: Consent Mode Template
                  </CardTitle>
                  <Badge className="w-fit">Advanced</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use GTM's built-in Consent Mode template:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Install Consent Mode template from Gallery</li>
                    <li>Configure consent categories</li>
                    <li>Set up consent triggers</li>
                    <li>Configure tag firing rules</li>
                    <li>Test and publish</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Native GTM integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advanced consent management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Complex setup</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Method 3: External Consent API
                  </CardTitle>
                  <Badge className="w-fit">Developer</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Integrate with external consent management platform:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Set up external CMP (Consent Management Platform)</li>
                    <li>Configure GTM consent API</li>
                    <li>Map consent categories</li>
                    <li>Set up data layer events</li>
                    <li>Configure tag firing rules</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Enterprise-grade solution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advanced consent features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires technical expertise</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Method 4: Custom JavaScript Variable
                  </CardTitle>
                  <Badge className="w-fit">Flexible</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create custom JavaScript variables for consent state:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Create custom JavaScript variables</li>
                    <li>Define consent state logic</li>
                    <li>Configure trigger conditions</li>
                    <li>Set up tag firing rules</li>
                    <li>Test consent state changes</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Maximum flexibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Custom consent logic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires JavaScript knowledge</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tag Firing Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GTM Tag Firing Rules
              </h2>
              <p className="text-xl text-gray-600">
                Configure when your tags should fire based on consent choices
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analytics Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Google Analytics 4</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: analytics_storage = granted</li>
                        <li>• Include consent state in configuration</li>
                        <li>• Use enhanced measurement events</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Google Analytics Universal</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: analytics_storage = granted</li>
                        <li>• Configure anonymize IP setting</li>
                        <li>• Set cookie expiration based on consent</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Advertising Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Google Ads</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: ad_storage = granted</li>
                        <li>• Include conversion tracking</li>
                        <li>• Set up remarketing audiences</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Facebook Pixel</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: ad_storage = granted</li>
                        <li>• Configure advanced matching</li>
                        <li>• Set up conversion API</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Functional Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Chat Widgets</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: functionality_storage = granted</li>
                        <li>• Include user identification</li>
                        <li>• Set up conversation tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Personalization</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: personalization_storage = granted</li>
                        <li>• Configure user preferences</li>
                        <li>• Set up recommendation engines</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fraud Detection</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: security_storage = granted (default)</li>
                        <li>• Include device fingerprinting</li>
                        <li>• Set up risk scoring</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">CAPTCHA</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Trigger: security_storage = granted (default)</li>
                        <li>• Configure bot detection</li>
                        <li>• Set up rate limiting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Implementation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GTM Implementation Step-by-Step
              </h2>
              <p className="text-xl text-gray-600">
                Complete guide to implementing cookie consent with Google Tag Manager
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Set Up Consent Mode v2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Configure Consent Mode v2 in your GTM container:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Go to your GTM container</li>
                    <li>Navigate to "Tags" → "New"</li>
                    <li>Choose "Consent Mode" tag type</li>
                    <li>Set default consent state to "denied"</li>
                    <li>Configure all required consent types</li>
                    <li>Set trigger to "All Pages"</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Create Cookie Consent Tag
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add our cookie consent as a Custom HTML tag:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Create new "Custom HTML" tag</li>
                    <li>Paste your generated cookie banner code</li>
                    <li>Configure consent update events</li>
                    <li>Set trigger to "All Pages"</li>
                    <li>Ensure tag fires before other tags</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Configure Tag Firing Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up triggers for your existing tags:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Create consent-based triggers for each tag type</li>
                    <li>Set Google Analytics to fire only with analytics_storage = granted</li>
                    <li>Configure advertising tags to fire only with ad_storage = granted</li>
                    <li>Set functional tags to fire only with functionality_storage = granted</li>
                    <li>Test all trigger conditions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test and Publish
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Verify your GTM implementation works correctly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Use GTM Preview mode to test consent flow</li>
                    <li>Verify consent state changes trigger tag updates</li>
                    <li>Check that denied consent prevents tag firing</li>
                    <li>Test all consent categories independently</li>
                    <li>Publish your container and test on live site</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Implement GTM Cookie Consent?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Get started with our GTM cookie consent integration. Complete Consent Mode v2 support, advanced tag management, and full GDPR compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <BarChart3 className="mr-2 h-5 w-5" />
                Get GTM Code
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
