import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  X, 
  Zap, 
  Shield, 
  Globe, 
  Users,
  ArrowRight,
  DollarSign,
  Clock,
  Sparkles,
  Heart,
  AlertTriangle
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'

export const metadata: Metadata = {
  title: 'Free Cookie Banner Generator | No Cost GDPR Compliance 2025',
  description: 'Create unlimited free cookie banners. GDPR, PIPEDA & CCPA compliant. No credit card, no limits, no catch. Better than paid alternatives like Cookiebot & OneTrust.',
  keywords: [
    'free cookie banner', 
    'free cookie consent', 
    'free gdpr banner', 
    'cookiebot alternative free', 
    'onetrust alternative free',
    'free privacy compliance',
    'no cost cookie banner'
  ],
  openGraph: {
    title: 'Free Cookie Banner Generator | No Cost GDPR Compliance 2025',
    description: 'Create unlimited free cookie banners. GDPR, PIPEDA & CCPA compliant. No credit card, no limits, no catch. Better than paid alternatives.',
    type: 'website',
  },
}

export default function FreeCookieBannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <LiveCookieBanner />
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-2">
        <div className="container px-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">›</span>
            <span>Free Cookie Banner</span>
          </nav>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 py-16 sm:py-20 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          <div className="container max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-6">
                <Heart className="h-4 w-4" />
                <span>100% Free Forever — No Catch</span>
              </div>

              {/* H1 */}
              <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
                Free Cookie Banner Generator —{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Better Than Paid Alternatives
                </span>
              </h1>
              
              {/* Value Props */}
              <div className="mx-auto max-w-4xl space-y-4 mb-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg font-semibold">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>$0 Forever</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>No Credit Card</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>Same Compliance</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="h-5 w-5" />
                    <span>No Limits</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 text-amber-800">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-semibold">Why pay $50-200/month when you can get the same GDPR compliance for free?</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button asChild size="lg" className="h-12 px-8 text-base font-semibold bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/builder">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get My Free Banner Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                  <Link href="/demo">
                    <Zap className="mr-2 h-5 w-5" />
                    See Live Demo
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                ✓ Join 1,000+ websites that chose free over paid ✓ No vendor lock-in ✓ Same features as $200/month tools
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Free vs Paid Cookie Banner Solutions
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  See how our free solution compares to expensive alternatives like Cookiebot, OneTrust, and others.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                      <th className="text-center p-4 font-semibold text-green-600 bg-green-50">
                        <div className="flex items-center justify-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>Our Free Solution</span>
                        </div>
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-600">Cookiebot</th>
                      <th className="text-center p-4 font-semibold text-gray-600">OneTrust</th>
                      <th className="text-center p-4 font-semibold text-gray-600">Termly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Monthly Cost</td>
                      <td className="p-4 text-center bg-green-50">
                        <Badge className="bg-green-100 text-green-800">$0 Forever</Badge>
                      </td>
                      <td className="p-4 text-center text-red-600 font-semibold">$9-200/month</td>
                      <td className="p-4 text-center text-red-600 font-semibold">$200+/month</td>
                      <td className="p-4 text-center text-red-600 font-semibold">$10-150/month</td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="p-4 font-medium">GDPR Compliance</td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">PIPEDA & CCPA Support</td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="p-4 font-medium">Custom Design</td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Cookie Categories</td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="p-4 font-medium">Analytics Integration</td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Setup Time</td>
                      <td className="p-4 text-center bg-green-50">
                        <Badge className="bg-green-100 text-green-800">5 Minutes</Badge>
                      </td>
                      <td className="p-4 text-center text-amber-600">15-30 min</td>
                      <td className="p-4 text-center text-red-600">Hours</td>
                      <td className="p-4 text-center text-amber-600">10-20 min</td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="p-4 font-medium">Credit Card Required</td>
                      <td className="p-4 text-center"><X className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">Vendor Lock-in</td>
                      <td className="p-4 text-center"><X className="h-5 w-5 text-green-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><CheckCircle className="h-5 w-5 text-red-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/builder">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Start Using Our Free Solution
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Free Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose Free Over Paid?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get the same compliance and features without the monthly fees, contracts, or vendor lock-in.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle>Save Thousands Per Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Paid solutions cost $600-2,400+ per year. Our free solution gives you the same compliance for $0.
                    </p>
                    <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-green-800">
                        Annual Savings: $600-2,400+
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Same Compliance Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      GDPR, PIPEDA, and CCPA compliance with granular consent options, audit trails, and proper documentation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>No Vendor Lock-in</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Your code is yours. No monthly subscriptions, no contract renewals, no risk of service discontinuation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle>Faster Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      5-minute setup vs hours of configuration. No account setup fees, no implementation consultants needed.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle>No Hidden Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      No setup fees, no overage charges, no premium feature upsells. What you see is what you get - forever.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <CardTitle>Proven by 1,000+ Sites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Join thousands of websites that chose our free solution over expensive alternatives. Trusted and reliable.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                  <span className="text-2xl font-bold text-green-800">1,000+ Websites</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chose Free Over Paid Solutions
                </h3>
                <p className="text-gray-600 mb-6">
                  Smart businesses are switching from expensive cookie banner services to our free solution. 
                  Same compliance, zero cost, no vendor lock-in.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <span>✓ E-commerce stores</span>
                  <span>✓ SaaS companies</span>
                  <span>✓ Marketing agencies</span>
                  <span>✓ Webflow designers</span>
                  <span>✓ WordPress developers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Free vs Paid: Common Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Addressing concerns about choosing free over paid cookie banner solutions
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Is free really as good as paid solutions?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes! Our free solution includes the same GDPR compliance features as $200/month tools: 
                      granular consent, audit trails, cookie categorization, and proper legal documentation. 
                      The main difference is we don't charge for basic compliance features.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What's the catch with your free solution?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      There's no catch. We offer free cookie banners to build trust and showcase our technology. 
                      Advanced features like white-labeling and agency tools are available in paid plans, 
                      but basic compliance is free forever.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How much can I save compared to paid alternatives?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Cookiebot costs $108-2,400/year, OneTrust starts at $2,400/year, and Termly costs $120-1,800/year. 
                      Our free solution saves you $100-2,400+ annually while providing the same compliance level.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Will you start charging in the future?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our free plan will always remain free. We may add premium features for agencies and enterprises, 
                      but basic GDPR compliance will never require payment. Early users are grandfathered in forever.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How does support compare to paid services?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Free users get community support and documentation. Paid services often charge extra for priority support anyway. 
                      Our solution is designed to be simple enough that most users don't need extensive support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Stop Paying for Basic Compliance
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Join 1,000+ smart businesses that chose our free solution over expensive alternatives. 
                Same GDPR compliance, zero cost, no vendor lock-in.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  <Link href="/builder">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get My Free Banner Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/compare/cookiebot-alternative">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Compare vs Cookiebot
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-green-200">
                ✓ Free forever ✓ No credit card ✓ 5-minute setup ✓ Same compliance as $200/month tools
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
