'use client'

import { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Users, Palette, Upload, BarChart3, Shield, Clock, ArrowLeft, RefreshCw } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

function UpgradeContent() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const initialBilling = searchParams.get('billing') === 'one_time' ? 'one_time' : 'annual'
  const [billingCycle, setBillingCycle] = useState<'one_time' | 'annual'>(initialBilling)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isLifetimeUser = session?.user?.planTier === 'pro_lifetime' || session?.user?.planTier === 'pro'

  const handleUpgrade = async () => {
    if (!session?.user?.id) {
      window.location.href = '/auth/signin?callbackUrl=/upgrade'
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/upgrade/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, billingCycle }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Failed to create checkout session. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const proFeatures = [
    { icon: <Crown className="h-5 w-5" />, title: 'Unlimited Banners', desc: 'Create as many banners as you need' },
    { icon: <BarChart3 className="h-5 w-5" />, title: 'GA4 Analytics Integration', desc: 'Track consent events and impressions in Google Analytics' },
    { icon: <Shield className="h-5 w-5" />, title: 'Remove Branding', desc: 'Remove "Powered by cookie-banner.ca"' },
    { icon: <Users className="h-5 w-5" />, title: 'Team Collaboration', desc: 'Invite team members with role-based permissions' },
    { icon: <Palette className="h-5 w-5" />, title: '14 Custom Layouts', desc: 'Modal, slide-in, floating, and more' },
    { icon: <Upload className="h-5 w-5" />, title: 'Logo & Image Upload', desc: 'Add custom branding to your banners' },
  ]

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto text-center">
          <Crown className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sign up for a free account first, then upgrade
          </p>
          <Button size="lg" className="w-full max-w-md" asChild>
            <Link href="/auth/signup?callbackUrl=/upgrade">
              Create Free Account & Upgrade
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/auth/signin?callbackUrl=/upgrade" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            {isLifetimeUser ? 'Upgrade to Annual' : 'Upgrade to Pro'}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {isLifetimeUser
              ? 'Get all new features as they launch for $49/year (loyalty discount)'
              : 'Choose the plan that works for you'}
          </p>
        </div>

        {/* Billing toggle (hide for lifetime users — they only see annual) */}
        {!isLifetimeUser && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center rounded-full border p-1">
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                $99/year
              </button>
              <button
                onClick={() => setBillingCycle('one_time')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'one_time'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                $99 one-time
              </button>
            </div>
          </div>
        )}

        {/* Plan card */}
        <Card className="border-primary shadow-lg max-w-2xl mx-auto mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                {isLifetimeUser ? 'Pro Annual' : billingCycle === 'annual' ? 'Pro Annual' : 'Pro Lifetime'}
              </CardTitle>
              {(billingCycle === 'annual' || isLifetimeUser) && (
                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              )}
            </div>
            <CardDescription>
              {isLifetimeUser
                ? 'Everything you have now, plus all future features'
                : billingCycle === 'annual'
                  ? 'All current + future features, always updated'
                  : 'All current features, yours forever'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="text-primary mt-0.5">{f.icon}</div>
                  <div>
                    <span className="text-sm font-medium">{f.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">{f.desc}</span>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <div className="text-primary mt-0.5">
                  {billingCycle === 'annual' || isLifetimeUser
                    ? <RefreshCw className="h-5 w-5" />
                    : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <span className="text-sm font-medium">
                    {billingCycle === 'annual' || isLifetimeUser
                      ? 'All Future Features Included'
                      : 'Current Features — Frozen at Purchase'}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {billingCycle === 'annual' || isLifetimeUser
                      ? 'Every new feature we ship is yours automatically'
                      : 'Security patches forever. New features require annual.'}
                  </span>
                </div>
              </li>
            </ul>

            <div className="border-t pt-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold">
                  {isLifetimeUser ? '$49' : '$99'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isLifetimeUser
                    ? '/year (loyalty discount — regular $99/year)'
                    : billingCycle === 'annual' ? '/year' : 'one-time payment'}
                </div>
              </div>

              <Button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4 mr-2" />
                    {isLifetimeUser
                      ? 'Upgrade to Annual — $49/year'
                      : billingCycle === 'annual'
                        ? 'Start Annual Plan — $99/year'
                        : 'Buy Lifetime — $99'}
                  </>
                )}
              </Button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                </div>
              )}

              <p className="text-xs text-center text-muted-foreground mt-4">
                30-day money-back guarantee. Cancel anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Comparison for non-lifetime users */}
        {!isLifetimeUser && billingCycle === 'one_time' && (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Want all future features too?{' '}
              <button
                onClick={() => setBillingCycle('annual')}
                className="text-primary hover:underline font-medium"
              >
                Switch to annual ($99/year)
              </button>
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default function UpgradePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    }>
      <UpgradeContent />
    </Suspense>
  )
}
