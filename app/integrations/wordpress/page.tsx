
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, CheckCircle, AlertTriangle, FileText, Globe, Users, Zap, Clock, Download, ExternalLink, Shield } from 'lucide-react'
import { CodeCopyBlock } from '@/components/landing/visuals/integration/CodeCopyBlock'
import { ThreeStepInstallation } from '@/components/landing/visuals/integration/ThreeStepInstallation'
import { PluginComparisonTable } from '@/components/landing/visuals/integration/PluginComparisonTable'
import { BeforeAfterSlider } from '@/components/landing/visuals/integration/BeforeAfterSlider'

export const metadata: Metadata = {
  title: 'WordPress Cookie Banner Integration | GDPR Plugin Alternative 2025',
  description: 'Step-by-step WordPress cookie banner integration guide. Easy GDPR compliance without plugins. Better performance than Cookie Notice, CookieBot alternatives.',
  keywords: 'wordpress cookie banner, wordpress gdpr plugin alternative, wordpress privacy compliance, cookie notice alternative',
  openGraph: {
    title: 'WordPress Cookie Banner Integration | GDPR Plugin Alternative 2025',
    description: 'Step-by-step WordPress cookie banner integration guide. Easy GDPR compliance without plugins. Better performance than Cookie Notice, CookieBot alternatives.',
    type: 'article',
  },
}

export default function WordPressIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">WordPress Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              WordPress Cookie Banner — Copy, Paste, Done in 5 Minutes
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-lg font-semibold text-white">
                ✓ Save 3+ Hours vs WordPress Plugins
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Avoid $20K+ GDPR Fines Automatically
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Copy & Paste in 5 Minutes
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Code className="mr-2 h-5 w-5" />
                Create My WordPress Banner
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
                Why WordPress Needs Cookie Consent
              </h2>
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
                  <p className="text-lg font-semibold text-gray-900">
                    Save 3+ Hours vs WordPress Plugins
                  </p>
                  <p className="text-gray-600">
                    No plugin overhead. Our solution loads in under 50ms compared to 200ms+ for most WordPress cookie plugins.
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
                    <CardTitle>User-Friendly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Beautiful, modern design that matches your WordPress theme. No ugly plugin interfaces.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-orange-500" />
                    <CardTitle>No Plugin Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simple code snippet integration. No plugin conflicts, updates, or security vulnerabilities.
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
                    No external dependencies or third-party servers. Your data stays on your WordPress site.
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
                    Built-in support for 20+ languages. Perfect for multilingual WordPress sites with WPML.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Before/After */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Code Integration */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CodeCopyBlock />
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ThreeStepInstallation />
        </div>
      </section>

      {/* Plugin Comparison */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <PluginComparisonTable />
        </div>
      </section>

      {/* Integration Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                WordPress Integration Methods
              </h2>
              <p className="text-xl text-gray-600">
                Choose the integration method that works best for your WordPress setup
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Method 1: Functions.php (Recommended)
                  </CardTitle>
                  <Badge className="w-fit">Best Performance</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add our code snippet directly to your theme's functions.php file:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Add to your theme's functions.php
function add_cookie_banner() {
    // Your generated cookie banner code here
    echo '<script>
        (function() {
            // Cookie banner implementation
        })();
    </script>';
}
add_action('wp_footer', 'add_cookie_banner');`}</pre>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Best performance - no plugin overhead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Survives plugin updates</span>
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
                    <FileText className="h-5 w-5" />
                    Method 2: Header/Footer Plugin
                  </CardTitle>
                  <Badge className="w-fit">Easy Setup</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use a header/footer plugin like "Insert Headers and Footers":
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Install "Insert Headers and Footers" plugin</li>
                    <li>Go to Settings → Insert Headers and Footers</li>
                    <li>Paste code in "Scripts in Footer" section</li>
                    <li>Save changes</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>No theme file editing required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Survives theme updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires additional plugin</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Method 3: Child Theme
                  </CardTitle>
                  <Badge className="w-fit">Developer Friendly</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create a child theme and add the code there:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// In your child theme's functions.php
add_action('wp_enqueue_scripts', 'enqueue_cookie_banner');

function enqueue_cookie_banner() {
    wp_enqueue_script(
        'cookie-banner',
        get_template_directory_uri() . '/js/cookie-banner.js',
        array(),
        '1.0.0',
        true
    );
}`}</pre>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Professional development approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Survives theme updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires child theme setup</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Method 4: Custom Plugin
                  </CardTitle>
                  <Badge className="w-fit">Most Flexible</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create a simple custom plugin for your cookie banner:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Create a new folder in /wp-content/plugins/</li>
                    <li>Add plugin header and main file</li>
                    <li>Include your cookie banner code</li>
                    <li>Activate the plugin</li>
                  </ol>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Most flexible and maintainable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Easy to manage and update</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>Requires basic PHP knowledge</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Compatibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                WordPress Theme Compatibility
              </h2>
              <p className="text-xl text-gray-600">
                Our cookie banner works with all popular WordPress themes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Astra</h3>
                  <p className="text-sm text-gray-600">Lightweight, fast, and highly customizable theme</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">GeneratePress</h3>
                  <p className="text-sm text-gray-600">Performance-focused theme with minimal bloat</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Divi</h3>
                  <p className="text-sm text-gray-600">Visual page builder with extensive customization</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">OceanWP</h3>
                  <p className="text-sm text-gray-600">Versatile theme with WooCommerce integration</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Storefront</h3>
                  <p className="text-sm text-gray-600">Official WooCommerce theme for online stores</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📰</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Newspaper</h3>
                  <p className="text-sm text-gray-600">Popular theme for news and magazine sites</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Elementor Hello</h3>
                  <p className="text-sm text-gray-600">Minimal theme designed for Elementor page builder</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Twenty Twenty-Four</h3>
                  <p className="text-sm text-gray-600">Latest default WordPress theme</p>
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
                WordPress Integration Step-by-Step
              </h2>
              <p className="text-xl text-gray-600">
                Complete guide to adding our cookie banner to your WordPress site
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Generate Your Cookie Banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    First, create your custom cookie banner using our builder:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Choose your compliance framework (GDPR, PIPEDA, CCPA)</li>
                    <li>Customize colors, text, and position</li>
                    <li>Configure cookie categories and scripts</li>
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
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Choose Integration Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Select the integration method that works best for your WordPress setup:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Functions.php (Recommended)</h4>
                      <p className="text-sm text-gray-600">Best performance, requires theme file editing</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Header/Footer Plugin</h4>
                      <p className="text-sm text-gray-600">Easiest setup, no file editing required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Add Code to WordPress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Copy and paste your generated code into WordPress:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                    <pre>{`// Copy this code to your WordPress site
<script>
(function() {
    // Your generated cookie banner code goes here
    // This code will be provided by our banner builder
})();
</script>`}</pre>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Copy the entire code block from our builder</li>
                    <li>Paste it into your chosen integration method</li>
                    <li>Save changes and test your website</li>
                    <li>Verify the cookie banner appears correctly</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test and Verify
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ensure your cookie banner is working correctly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Clear your browser cookies and reload the page</li>
                    <li>Verify the banner appears on your homepage</li>
                    <li>Test the Accept, Reject, and Preferences buttons</li>
                    <li>Check that cookies are properly blocked/allowed</li>
                    <li>Test on mobile devices</li>
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
              Ready to Add Cookie Banner to WordPress?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get started with our WordPress cookie banner integration. No plugins required, maximum performance, complete compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Code className="mr-2 h-5 w-5" />
                Get WordPress Code
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
