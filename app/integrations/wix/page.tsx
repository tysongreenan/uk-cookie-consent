import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Zap, Users, CheckCircle, ExternalLink, Download, Settings, Smartphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Wix Cookie Consent Integration | Velo Custom Code Guide 2025',
  description: 'Complete Wix cookie consent integration guide. Velo integration, app market alternative, performance optimization. GDPR, PIPEDA, CCPA compliant cookie banner for Wix sites.',
  keywords: 'wix cookie consent, wix gdpr compliance, wix velo integration, wix custom code, wix privacy banner, wix cookie banner',
  openGraph: {
    title: 'Wix Cookie Consent Integration | Velo Custom Code Guide 2025',
    description: 'Complete Wix cookie consent integration guide. Velo integration, app market alternative, performance optimization.',
    type: 'article',
  },
}

export default function WixIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-500 text-white">Wix Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Wix Cookie Consent
              <span className="block text-orange-200">Velo-Ready Solution</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8">
              Complete Wix cookie consent integration guide. Velo integration, app market alternative, performance optimization. GDPR, PIPEDA, CCPA compliant cookie banner for Wix sites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <Code className="mr-2 h-5 w-5" />
                Get Wix Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Zap className="mr-2 h-5 w-5" />
                View Integration Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Wix Needs Cookie Consent */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Wix Sites Need Cookie Consent
              </h2>
              <p className="text-xl text-gray-600">
                Wix sites use various tracking and analytics tools that require compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-orange-500" />
                    <CardTitle>Wix Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Built-in Wix Analytics and visitor insights require cookie consent under GDPR, PIPEDA, and CCPA.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-blue-500" />
                    <CardTitle>Velo Custom Code</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Google Analytics, Facebook Pixel, and other tracking scripts added via Velo require explicit consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>E-commerce Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Wix Stores uses cookies for cart tracking, conversion measurement, and customer analytics.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-green-500" />
                    <CardTitle>Form Submissions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Contact forms, newsletter signups, and other data collection forms require proper consent handling.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-red-500" />
                    <CardTitle>App Market Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Third-party apps from the Wix App Market often use cookies that require consent management.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Global Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Wix sites serving international audiences must comply with multiple privacy laws and regulations.
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
                Wix Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to integrate cookie consent with your Wix site
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    HTML Embed Element
                  </CardTitle>
                  <CardDescription>Easiest method for most Wix users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Add via HTML Embed Element -->
<div id="cookie-consent-banner">
  <!-- Cookie banner HTML -->
</div>

<script>
(function() {
  // Cookie consent code here
  console.log('Cookie consent loaded');
})();
</script>

<style>
#cookie-consent-banner {
  /* Custom styles */
}
</style>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Works with all Wix plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>No coding knowledge required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Visual editor compatible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Easy to update and maintain</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Velo Integration
                  </CardTitle>
                  <CardDescription>Advanced integration for developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Velo (Wix Code) integration
import wixWindow from 'wix-window';

$w.onReady(function () {
  // Initialize cookie consent
  initCookieConsent();
});

function initCookieConsent() {
  // Check if consent already given
  const consent = wixStorage.getItem('cookie-consent');
  
  if (!consent) {
    // Show consent banner
    showConsentBanner();
  }
}

function handleConsent(accepted) {
  // Store consent in Wix storage
  wixStorage.setItem('cookie-consent', accepted);
  
  // Hide banner
  hideConsentBanner();
  
  // Initialize tracking based on consent
  if (accepted) {
    initTracking();
  }
}`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Full Wix API integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Wix Storage integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Dynamic content management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Advanced customization options</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    App Market Alternative
                  </CardTitle>
                  <CardDescription>Custom solution vs. marketplace apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Why choose our solution over App Market apps:

✅ No monthly subscription fees
✅ No app marketplace limitations
✅ Full customization control
✅ Better performance optimization
✅ Direct support and updates
✅ No vendor lock-in

// App Market apps often have:
❌ Limited customization options
❌ Monthly subscription costs
❌ Performance overhead
❌ Dependency on third-party servers
❌ Limited support and updates`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>No subscription fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Full customization control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Better performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Direct support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    E-commerce Integration
                  </CardTitle>
                  <CardDescription>Specialized for Wix Stores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-orange-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Wix Stores integration
import wixStores from 'wix-stores';

$w.onReady(function () {
  // Listen for cart events
  $w('#cart').onItemAdded((event) => {
    if (hasConsent('analytics')) {
      trackCartEvent('add_to_cart', event.item);
    }
  });
  
  // Listen for purchase events
  wixStores.onPurchaseComplete((event) => {
    if (hasConsent('analytics')) {
      trackPurchase(event.order);
    }
  });
});

function trackPurchase(order) {
  // Google Analytics Enhanced Ecommerce
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      transaction_id: order.orderNumber,
      value: order.total,
      currency: order.currency
    });
  }
}`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Wix Stores integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cart tracking with consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Conversion tracking compliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Customer analytics protection</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Wix Integration Guide
              </h2>
              <p className="text-xl text-gray-600">
                Get your Wix site compliant in 5 simple steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Generate Your Cookie Banner Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create your cookie consent banner using our builder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure compliance framework (GDPR, PIPEDA, CCPA)</li>
                    <li>Customize design to match your Wix template</li>
                    <li>Set up cookie categories and tracking scripts</li>
                    <li>Configure consent behavior and preferences</li>
                    <li>Generate your implementation code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Add HTML Embed Element
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add the code to your Wix site:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Open your Wix site in the Editor</li>
                    <li>Add an HTML Embed element to your page</li>
                    <li>Paste the cookie consent code</li>
                    <li>Position the element where you want the banner</li>
                    <li>Save and publish your site</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Configure Wix Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up consent-aware analytics:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Enable Wix Analytics in your dashboard</li>
                    <li>Configure Google Analytics with consent checking</li>
                    <li>Set up Facebook Pixel with consent gates</li>
                    <li>Configure other tracking scripts</li>
                    <li>Test analytics firing after consent</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test and Customize
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ensure everything works correctly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Test consent banner appearance and functionality</li>
                    <li>Verify analytics only fire after consent</li>
                    <li>Test consent withdrawal and re-consent</li>
                    <li>Check mobile responsiveness</li>
                    <li>Validate compliance with your target regulations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor and Maintain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Keep your compliance up to date:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent rates and user feedback</li>
                    <li>Update cookie categories as needed</li>
                    <li>Review and update privacy policies</li>
                    <li>Stay informed about regulation changes</li>
                    <li>Regular compliance audits</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Wix-Specific Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Wix-Specific Features
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for Wix templates and functionality
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Template Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Works with all Wix templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Responsive design for all devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Custom CSS integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Template-specific styling options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    E-commerce Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Wix Stores integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Cart tracking with consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Conversion tracking compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Customer analytics protection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Form Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Contact form consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Newsletter signup compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Data collection consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Third-party form integrations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Minimal impact on page load speed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Wix hosting optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>CDN integration for global performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Lazy loading and conditional scripts</span>
                    </li>
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
              Ready to Make Your Wix Site Compliant?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of Wix users using our cookie consent solution. Easy integration, professional results, and full compliance without App Market limitations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <Code className="mr-2 h-5 w-5" />
                Get Wix Solution
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
