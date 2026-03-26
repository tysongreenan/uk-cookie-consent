'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown, Shield } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function PricingPage() {
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<'annual' | 'one_time'>('annual')

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start free. Upgrade when you're ready. No surprises.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center rounded-full border p-1 mb-8">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="ml-1.5 text-xs opacity-80">Save 100%+ vs monthly competitors</span>
            </button>
            <button
              onClick={() => setBillingCycle('one_time')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'one_time'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              One-Time
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free */}
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-xl">Free</CardTitle>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <CardDescription>Build your first banner free</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  '1 Cookie Banner',
                  'GDPR, PIPEDA & CCPA Compliance',
                  '7 Standard Layouts',
                  'Works on Unlimited Websites',
                  'Copy & Paste in 5 Minutes',
                  '"Powered by" Branding',
                  'Community Support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/builder">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro */}
          <Card className="relative border-primary shadow-lg scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1">
                Recommended
              </Badge>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  <Crown className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-xl">Pro</CardTitle>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground ml-1">
                  {billingCycle === 'annual' ? '/year' : ' one-time'}
                </span>
              </div>
              <CardDescription>
                {billingCycle === 'annual'
                  ? 'All features, always updated'
                  : 'Everything today, yours forever'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  'Unlimited Banners',
                  'GA4 Analytics Integration',
                  '14 Layouts Including Modal & Slide-In',
                  'Remove "Powered by" Branding',
                  'Analytics Dashboard & Insights',
                  'Invite Unlimited Team Members',
                  'Upload Your Logo & Images',
                  'Geo-Targeting (Quebec Law 25)',
                  'Priority Email Support',
                  billingCycle === 'annual'
                    ? 'All Future Features Included'
                    : 'Current Features — Frozen at Purchase',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full" asChild>
                <Link href={`/upgrade?billing=${billingCycle}`}>
                  Upgrade to Pro
                </Link>
              </Button>
              {billingCycle === 'one_time' && (
                <p className="text-xs text-center text-muted-foreground">
                  Security patches included forever. New features require annual plan.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-muted">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <CardDescription>For large organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  'Everything in Pro',
                  'Dedicated Support Contact',
                  'Custom Onboarding & Setup',
                  'SLA & Uptime Guarantee',
                  'Annual Support Agreement',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href="mailto:sales@cookie-banner.ca">Contact Sales</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Cookie Banner?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2">No Monthly Fees</h3>
              <p className="text-sm text-muted-foreground">
                Competitors charge $9-19/month. Our one-time option saves you $200+ over 2 years.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Multi-Law Compliance</h3>
              <p className="text-sm text-muted-foreground">
                GDPR, PIPEDA, CCPA, and Quebec Law 25 built in. Automatic geo-targeting on Pro.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Under 10KB</h3>
              <p className="text-sm text-muted-foreground">
                Our banner script won't slow your site. No impact on page load speed or Core Web Vitals.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What's the difference between one-time and annual?</h3>
              <p className="text-sm text-muted-foreground">
                Both plans include all current Pro features. The annual plan ($99/year) also includes every new feature we release, priority support, and early access. The one-time plan ($99 once) gives you everything available today, forever — security patches included, but new features require the annual plan.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What happens if I cancel my annual plan?</h3>
              <p className="text-sm text-muted-foreground">
                You keep access to all features through the end of your paid period. After that, you keep everything you had at the time of cancellation — just like a one-time purchase. You never lose access to features you've already paid for.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is there a money-back guarantee?</h3>
              <p className="text-sm text-muted-foreground">
                Yes — 30-day money-back guarantee on both plans. If you're not satisfied, contact us for a full refund.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I switch from one-time to annual later?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely. One-time Pro customers get a loyalty discount when upgrading to annual — $49/year instead of $99/year.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                The Free plan is your trial. Build a banner, install it on your site, and see how it works. Upgrade to Pro whenever you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
