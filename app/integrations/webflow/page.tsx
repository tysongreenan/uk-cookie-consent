import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Code, Zap, Users, CheckCircle, ExternalLink, Download, Settings } from 'lucide-react'

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
              Webflow Cookie Consent
              <span className="block text-purple-200">Designer-Ready Solution</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              Complete Webflow cookie consent integration guide. Custom code injection, Designer extension, CMS compliance, and client billing. GDPR, PIPEDA, CCPA compliant cookie banner for Webflow sites.
            </p>
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

      {/* Why Webflow Needs Cookie Consent */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Webflow Sites Need Cookie Consent
              </h2>
              <p className="text-xl text-gray-600">
                Webflow sites use various tracking and analytics tools that require compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Palette className="h-6 w-6 text-purple-500" />
                    <CardTitle>Webflow Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Webflow's built-in analytics and form tracking require cookie consent under GDPR, PIPEDA, and CCPA regulations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-blue-500" />
                    <CardTitle>Custom Code Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Google Analytics, Facebook Pixel, and other tracking scripts added via custom code require explicit consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-500" />
                    <CardTitle>Client Website Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Webflow designers and agencies need to ensure client websites comply with privacy laws across different regions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-orange-500" />
                    <CardTitle>CMS and Forms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Webflow CMS content and form submissions may collect personal data that requires proper consent handling.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-red-500" />
                    <CardTitle>Third-Party Integrations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Mailchimp, Zapier, and other Webflow integrations often use cookies that require consent management.
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
                    Webflow sites serving international audiences must comply with multiple privacy laws and regulations.
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
                Webflow Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Multiple ways to integrate cookie consent with your Webflow site
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Custom Code Injection
                  </CardTitle>
                  <CardDescription>Easiest method for most Webflow users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Add to Webflow Project Settings > Custom Code > Head Code -->
<script>
(function() {
  // Cookie consent code here
  console.log('Cookie consent loaded');
})();
</script>`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>No Designer extension required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Works with all Webflow plans</span>
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
                    <Palette className="h-5 w-5" />
                    Designer Extension
                  </CardTitle>
                  <CardDescription>Professional solution for designers and agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Webflow Designer Extension
import { CookieConsent } from '@cookiebanner/webflow';

const consentManager = new CookieConsent({
  clientId: 'your-client-id',
  projectId: 'your-project-id'
});

consentManager.init();`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Visual Designer integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Client management dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>White-label options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Billing and subscription management</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    CMS Integration
                  </CardTitle>
                  <CardDescription>Dynamic consent management for CMS content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Webflow CMS Integration
const cmsItems = document.querySelectorAll('[data-wf-cms]');

cmsItems.forEach(item => {
  const consentData = item.dataset.consentRequired;
  if (consentData === 'true') {
    checkConsentBeforeLoad(item);
  }
});`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Content-based consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Dynamic consent requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Conditional content loading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Editor-friendly setup</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    API Integration
                  </CardTitle>
                  <CardDescription>Advanced integration for custom applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-orange-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Webflow API Integration
fetch('/api/consent/check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'webflow-user-id',
    siteId: 'webflow-site-id'
  })
}).then(response => response.json());`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Real-time consent checking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cross-site consent management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Advanced analytics integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Custom consent workflows</span>
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
                Webflow Integration Guide
              </h2>
              <p className="text-xl text-gray-600">
                Get your Webflow site compliant in 5 simple steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Generate Your Cookie Banner Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create your cookie consent banner using our builder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure compliance framework (GDPR, PIPEDA, CCPA)</li>
                    <li>Customize design to match your Webflow site</li>
                    <li>Set up cookie categories and tracking scripts</li>
                    <li>Configure consent behavior and preferences</li>
                    <li>Generate your implementation code</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Add Code to Webflow Project Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Inject the code into your Webflow project:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Go to Project Settings in your Webflow Designer</li>
                    <li>Navigate to Custom Code section</li>
                    <li>Paste the code in the "Head Code" field</li>
                    <li>Save and publish your site</li>
                    <li>Test the banner on your live site</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Configure Webflow Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up consent-aware analytics:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Enable Webflow Analytics in Project Settings</li>
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
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
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
                    <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
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

      {/* Webflow-Specific Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Webflow-Specific Features
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for Webflow designers and developers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Designer Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Visual Designer extension for easy setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Webflow-style design components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Responsive design optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Custom CSS and styling support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Client Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Multi-client dashboard for agencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>White-label consent banners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Client billing and subscription management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Bulk site management tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    CMS Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Dynamic content consent management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Form submission consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Conditional content loading</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Editor-friendly consent controls</span>
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
                      <span>Webflow hosting optimization</span>
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Webflow Site Compliant?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of Webflow designers and agencies using our cookie consent solution. Easy integration, professional results, and full compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Palette className="mr-2 h-5 w-5" />
                Get Webflow Solution
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
