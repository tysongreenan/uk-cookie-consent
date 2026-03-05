import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Square, Code, Zap, Users, CheckCircle, ExternalLink, Download, Settings } from 'lucide-react'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { PluginComparisonTable } from '@/components/landing/visuals/integration/PluginComparisonTable'
import { BeforeAfterSlider } from '@/components/landing/visuals/integration/BeforeAfterSlider'

export const metadata: Metadata = {
  title: 'Squarespace Cookie Consent Integration | Code Injection Guide 2025',
  description: 'Complete Squarespace cookie consent integration guide. Code injection, template compatibility, e-commerce integration. GDPR, PIPEDA, CCPA compliant cookie banner for Squarespace sites.',
  keywords: 'squarespace cookie consent, squarespace gdpr compliance, squarespace custom code, squarespace privacy banner, squarespace cookie banner',
  openGraph: {
    title: 'Squarespace Cookie Consent Integration | Code Injection Guide 2025',
    description: 'Complete Squarespace cookie consent integration guide. Code injection, template compatibility, e-commerce integration.',
    type: 'article',
  },
}

export default function SquarespaceIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500 text-white">Squarespace Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Squarespace Cookie Banner — Copy, Paste, Done in 5 Minutes
            </h1>
            <div className="text-xl md:text-2xl text-green-100 mb-8 space-y-2">
              <div className="font-bold">✓ Save 3+ Hours vs Custom Development</div>
              <div className="font-bold">✓ Avoid $20K+ GDPR Fines Automatically</div>
              <div className="font-bold">✓ Works with All Squarespace Plans</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Square className="mr-2 h-5 w-5" />
                Get Squarespace Solution
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
                Watch how easy it is to add cookie consent to your Squarespace site
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Squarespace Code Injection</h3>
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
                <Square className="mr-2 h-5 w-5" />
                Build My Squarespace Banner
              </Button>
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
                Squarespace Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to integrate cookie consent with your Squarespace site
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Injection (Recommended)
                  </CardTitle>
                  <CardDescription>Easiest method for most Squarespace users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Add to Settings > Advanced > Code Injection > Header -->
<script>
(function() {
  // Cookie consent code here
  console.log('Cookie consent loaded');
})();
</script>

<!-- Add to Settings > Advanced > Code Injection > Footer -->
<script>
// Additional tracking scripts with consent checks
</script>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Works with all Squarespace plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>No template modifications needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Full customization control</span>
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
                    <Square className="h-5 w-5" />
                    Code Block Integration
                  </CardTitle>
                  <CardDescription>Add banner directly to specific pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Add to any page using Code Block -->
<div id="cookie-consent-banner">
  <!-- Cookie banner HTML -->
</div>

<script>
// Cookie consent logic
document.addEventListener('DOMContentLoaded', function() {
  initCookieConsent();
});
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
                        <span>Page-specific implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Inline styling support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Visual editor compatible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Easy to preview and test</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Template Integration
                  </CardTitle>
                  <CardDescription>Advanced integration for developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Add to template files -->
{squarespace-cookie-consent}

<!-- Custom template integration -->
<script>
  window.Squarespace = window.Squarespace || {};
  window.Squarespace.onInitialize = function() {
    // Initialize cookie consent after Squarespace loads
    initCookieConsent();
  };
</script>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Full template control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Advanced customization options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Integration with Squarespace APIs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Developer-friendly approach</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    E-commerce Integration
                  </CardTitle>
                  <CardDescription>Specialized for Squarespace Commerce</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-orange-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- E-commerce specific integration -->
<script>
// Track e-commerce events with consent
function trackPurchase(orderData) {
  if (hasConsent('analytics')) {
    // Google Analytics Enhanced Ecommerce
    gtag('event', 'purchase', {
      transaction_id: orderData.id,
      value: orderData.total,
      currency: orderData.currency
    });
  }
}

// Listen for Squarespace Commerce events
Y.use('squarespace-commerce', function() {
  // Initialize e-commerce tracking
});
</script>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Enhanced E-commerce tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cart abandonment recovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Conversion tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Customer journey analytics</span>
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
                Squarespace Integration Guide
              </h2>
              <p className="text-xl text-gray-600">
                Get your Squarespace site compliant in 5 simple steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Generate Your Cookie Banner Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create your cookie consent banner using our builder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure compliance framework (GDPR, PIPEDA, CCPA)</li>
                    <li>Customize design to match your Squarespace template</li>
                    <li>Set up cookie categories and tracking scripts</li>
                    <li>Configure consent behavior and preferences</li>
                    <li>Generate your implementation code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Add Code to Squarespace Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Inject the code into your Squarespace site:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Go to Settings in your Squarespace dashboard</li>
                     <li>Navigate to Advanced &gt; Code Injection</li>
                    <li>Paste the code in the "Header" section</li>
                    <li>Save and publish your site</li>
                    <li>Test the banner on your live site</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Configure Squarespace Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up consent-aware analytics:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Enable Squarespace Analytics in Settings</li>
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
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
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
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
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

      {/* Squarespace-Specific Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Squarespace-Specific Features
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for Squarespace templates and functionality
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    Template Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Works with all Squarespace templates</span>
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
                      <span>Squarespace Commerce integration</span>
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
                      <span>Mailchimp integration support</span>
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
                      <span>Squarespace hosting optimization</span>
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Squarespace Site Compliant?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of Squarespace users using our cookie consent solution. Easy integration, professional results, and full compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Square className="mr-2 h-5 w-5" />
                Get Squarespace Solution
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
