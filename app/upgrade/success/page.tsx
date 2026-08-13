'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, RefreshCw, Clock, Rocket } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { captureEvent } from '@/lib/analytics'

export default function UpgradeSuccessPage() {
  const { data: session, update } = useSession()
  const planTier = session?.user?.planTier || 'pro_lifetime'
  const capturedSuccess = useRef(false)
  const [existingBannerId, setExistingBannerId] = useState<string | null>(null)

  // Force session refresh so the new planTier from the webhook is reflected immediately
  useEffect(() => { update() }, [])
  useEffect(() => {
    if (!session?.user?.id || capturedSuccess.current) return
    capturedSuccess.current = true
    captureEvent('upgrade_success_viewed', { plan_tier: planTier })
  }, [planTier, session?.user?.id])
  useEffect(() => {
    let cancelled = false
    fetch('/api/banners/simple')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return
        const first = data?.banners?.[0]
        setExistingBannerId(first?.id ?? null)
      })
      .catch(() => {
        if (!cancelled) setExistingBannerId(null)
      })
    return () => {
      cancelled = true
    }
  }, [])
  const isAnnual = planTier === 'pro_annual'
  const hasBanner = Boolean(existingBannerId)
  const primaryHref = hasBanner
    ? `/dashboard/builder?id=${existingBannerId}&tab=code`
    : '/dashboard/builder'

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="mx-auto h-20 w-20 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Pro!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {hasBanner
              ? 'Your account has been upgraded. Copy the install snippet onto your site to go live.'
              : 'Your account has been upgraded. Create your banner next — then copy the install snippet onto your site.'}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              Pro Account Active
            </div>
            <div className="bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
              {isAnnual
                ? <><RefreshCw className="h-3.5 w-3.5" /> All Future Features Included</>
                : <><Clock className="h-3.5 w-3.5" /> Lifetime Access</>
              }
            </div>
          </div>
          <Button size="lg" className="mt-8 h-12 px-8" asChild>
            <Link href={primaryHref}>
              <Rocket className="h-4 w-4 mr-2" />
              {hasBanner ? 'Copy your install snippet' : 'Create your first banner'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            {hasBanner
              ? 'Open the Install snippet step, copy the one-line script, and paste it in your site header.'
              : 'Takes about 2 minutes. PIPEDA, Law 25, GPC, and geo rules are ready in the builder.'}
          </p>
        </div>

        {/* Activation steps */}
        <ol className="grid sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
          {[
            { step: '1', title: 'Design your banner', desc: 'Pick PIPEDA or Law 25, then match your brand.' },
            { step: '2', title: 'Copy the snippet', desc: 'One script tag — WordPress, Shopify, or any site.' },
            { step: '3', title: 'Paste and go live', desc: 'Drop it in your site header. You\'re compliant.' },
          ].map((item) => (
            <li key={item.step} className="rounded-lg border bg-muted/30 p-4 text-center">
              <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {item.step}
              </div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </li>
          ))}
        </ol>

        {/* Secondary next steps */}
        <p className="text-center text-sm text-muted-foreground mb-12">
          Analytics, team invites, and integrations are in the dashboard after you install.
        </p>

        {/* Info card */}
        {isAnnual ? (
          <div className="text-center border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold mb-2">Annual Subscription Active</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your plan renews automatically. You can manage your subscription, update payment methods, or view invoices anytime.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/settings">Manage Subscription</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold mb-2">Lifetime Access Activated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All current Pro features are yours forever. Want all future features too? You can upgrade to annual anytime at a loyalty discount.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href={hasBanner ? primaryHref : '/dashboard'}>{hasBanner ? 'Open installer' : 'Go to Dashboard'}</Link>
            </Button>
          </div>
        )}

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:support@cookie-banner.ca" className="text-primary hover:underline">
              support@cookie-banner.ca
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
