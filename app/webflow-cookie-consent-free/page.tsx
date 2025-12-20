import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  Download, 
  Code, 
  Palette, 
  Zap, 
  Shield, 
  Globe, 
  Users,
  ArrowRight,
  ExternalLink,
  Copy,
  Play
} from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'Webflow Cookie Consent Free | GDPR Compliant Banner Generator 2025',
  description: 'Free Webflow cookie consent banner generator. GDPR, PIPEDA, CCPA compliant. No coding required. Easy integration with Webflow Designer. Free forever plan available.',
  keywords: 'webflow cookie consent free, webflow gdpr free, webflow cookie banner free, webflow privacy compliance free, webflow cookie consent generator',
  openGraph: {
    title: 'Webflow Cookie Consent Free | GDPR Compliant Banner Generator 2025',
    description: 'Free Webflow cookie consent banner generator. GDPR, PIPEDA, CCPA compliant. No coding required.',
    type: 'website',
  },
}

export default function WebflowCookieConsentFreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Free Forever
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Webflow Cookie Banner — 5-Minute Setup, Zero Cost
            </h1>
            <div className="space-y-3 mb-8">
              <p className="text-lg font-semibold text-white">
                ✓ Save 3+ Hours Per Webflow Site
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Avoid $20K+ GDPR Fines Automatically
              </p>
              <p className="text-lg font-semibold text-white">
                ✓ Copy & Paste in 5 Minutes
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Palette className="mr-2 h-5 w-5" />
                Get My Free Webflow Banner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              ✓ No credit card required ✓ Free forever ✓ Used by 500+ Webflow Sites
            </p>
          </div>
        </div>
      </section>


      {/* Free Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free Features — No Limits
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>GDPR Compliance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Full GDPR compliance with granular consent options, withdrawal mechanisms, and audit trails.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>PIPEDA & CCPA Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Canadian PIPEDA and California CCPA compliance built-in for North American businesses.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Webflow Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Easy copy-paste integration with Webflow custom code. No technical knowledge required.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Custom Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Match your Webflow site's design with custom colors, fonts, and positioning options.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Mobile Responsive</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically responsive design that works perfectly on all devices and screen sizes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Analytics Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Works with Google Analytics, Facebook Pixel, and other tracking scripts you use in Webflow.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Cookie Categories</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Essential, functionality, analytics, and marketing cookie categories with user control.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Consent Logging</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatic logging of consent decisions for compliance auditing and legal protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle>Free Forever</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No time limits, no hidden costs, no credit card required. Use it forever at no cost.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How to Add Cookie Consent to Your Webflow Site
              </h2>
              <p className="text-xl text-gray-600">
                Get compliant in under 5 minutes with our free solution
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Create Your Free Banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Use our free banner builder to create your cookie consent banner:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Choose your compliance framework (GDPR, PIPEDA, CCPA)</li>
                        <li>Customize colors to match your Webflow site</li>
                        <li>Set your cookie categories and descriptions</li>
                        <li>Configure consent behavior and preferences</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <pre>{`// Free banner configuration
{
  "compliance": "GDPR",
  "design": {
    "colors": {
      "primary": "#your-brand-color"
    }
  },
  "cookies": {
    "essential": true,
    "analytics": true,
    "marketing": false
  }
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Copy the Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Get your personalized code and copy it to your clipboard:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Generated code is ready to use</li>
                        <li>No additional configuration needed</li>
                        <li>Includes all compliance features</li>
                        <li>Works with any Webflow plan</li>
                      </ul>
                    </div>
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`<!-- Copy this code to Webflow -->
<script>
(function() {
  // Your personalized cookie consent code
  // Generated for your specific configuration
  // Includes GDPR compliance features
})();
</script>`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Add to Webflow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Paste the code into your Webflow project settings:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Go to Project Settings in Webflow Designer</li>
                        <li>Navigate to Custom Code section</li>
                        <li>Paste code in the "Head Code" field</li>
                        <li>Save and publish your site</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold text-purple-800">Webflow Project Settings</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Settings → Custom Code → Head Code → Paste your banner code → Save & Publish
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Test & Go Live
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Test your banner and make sure everything works:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Visit your live Webflow site</li>
                        <li>Check banner appearance and functionality</li>
                        <li>Test consent acceptance and withdrawal</li>
                        <li>Verify analytics only fire after consent</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">You're Compliant!</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your Webflow site is now GDPR, PIPEDA, and CCPA compliant with our free solution.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Paid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free vs Premium Features
              </h2>
              <p className="text-xl text-gray-600">
                Our free plan covers the essentials. Upgrade for advanced features.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-green-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Free Plan</CardTitle>
                  <CardDescription className="text-lg font-semibold text-green-600">$0/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>GDPR, PIPEDA, CCPA compliance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Basic cookie categories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Custom design options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Webflow integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Mobile responsive</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Community support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" size="lg">
                    Get Free Banner
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Pro Plan</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">$19/month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>Everything in Free</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>Advanced cookie management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>White-label options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>Client management dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span>API access</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by Webflow Designers
              </h2>
              <p className="text-xl text-gray-600">
                See what our free users are saying
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Perfect for my Webflow clients! The free plan has everything I need for basic compliance. 
                    Easy integration and professional results."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Miller</p>
                      <p className="text-sm text-gray-500">Freelance Webflow Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Finally, a GDPR solution that doesn't break the bank! The free tier is perfect for 
                    small businesses using Webflow."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">MJ</span>
                    </div>
                    <div>
                      <p className="font-semibold">Mike Johnson</p>
                      <p className="text-sm text-gray-500">Small Business Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "As a Webflow agency, this free solution saves us thousands. Our clients love the 
                    professional compliance without the cost."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">AL</span>
                    </div>
                    <div>
                      <p className="font-semibold">Alex Lee</p>
                      <p className="text-sm text-gray-500">Webflow Agency Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our free Webflow cookie consent
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Is the free plan really free forever?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! Our free plan has no time limits, no hidden costs, and no credit card required. 
                    You can use it forever for your Webflow sites without any restrictions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Does the free plan include GDPR compliance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely! Our free plan includes full GDPR compliance with granular consent options, 
                    withdrawal mechanisms, and proper audit trails. Perfect for European visitors.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Can I customize the design to match my Webflow site?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! The free plan includes custom colors, fonts, positioning, and styling options 
                    to perfectly match your Webflow site's design and brand.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Will it work with my Webflow analytics and tracking?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! Our free solution works with Webflow Analytics, Google Analytics, Facebook Pixel, 
                    and other tracking scripts. It ensures they only fire after user consent.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do I need coding knowledge to use the free plan?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Not at all! Our free plan is designed for non-technical users. Simply copy the 
                    generated code and paste it into your Webflow project settings. That's it!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What's the difference between free and paid plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The free plan covers all essential compliance features. Paid plans add advanced 
                    analytics, white-label options, client management, and priority support for agencies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Free Webflow Cookie Consent Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of Webflow designers using our free solution. 
              No credit card required, no time limits, no hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Palette className="mr-2 h-5 w-5" />
                Create Free Banner Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Setup Guide
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              ✓ Free forever ✓ GDPR compliant ✓ No coding required ✓ 5-minute setup
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
