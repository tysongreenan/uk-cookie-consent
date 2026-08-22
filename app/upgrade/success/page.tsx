'use client'

import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Crown,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  Palette,
  RefreshCw,
  Rocket,
  Shield,
  Users,
} from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { captureEvent } from '@/lib/analytics'
import {
  formatUsdCents,
  isCheckoutSessionId,
  isPaidPlan,
  planLabel,
} from '@/lib/upgrade-success'

type PurchaseState =
  | { status: 'loading' }
  | { status: 'unsigned' }
  | { status: 'missing' }
  | { status: 'error'; message: string }
  | {
      status: 'ready'
      paid: boolean
      paymentStatus: string
      planTier: string | null
      billingCycle: string | null
      amount: number | null
      currency: string | null
      customerEmail: string | null
      receiptUrl: string | null
      invoicePdf: string | null
      invoiceNumber: string | null
      hasBillingPortal: boolean
      activated: boolean
      accountPlanTier: string
    }

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

function readyPurchase(data: Record<string, unknown>): Extract<PurchaseState, { status: 'ready' }> {
  return {
    status: 'ready',
    paid: Boolean(data.paid),
    paymentStatus: typeof data.paymentStatus === 'string' ? data.paymentStatus : 'unpaid',
    planTier: typeof data.planTier === 'string' ? data.planTier : null,
    billingCycle: typeof data.billingCycle === 'string' ? data.billingCycle : null,
    amount: typeof data.amount === 'number' ? data.amount : null,
    currency: typeof data.currency === 'string' ? data.currency : null,
    customerEmail: typeof data.customerEmail === 'string' ? data.customerEmail : null,
    receiptUrl: typeof data.receiptUrl === 'string' ? data.receiptUrl : null,
    invoicePdf: typeof data.invoicePdf === 'string' ? data.invoicePdf : null,
    invoiceNumber: typeof data.invoiceNumber === 'string' ? data.invoiceNumber : null,
    hasBillingPortal: Boolean(data.hasBillingPortal),
    activated: Boolean(data.activated),
    accountPlanTier: typeof data.accountPlanTier === 'string' ? data.accountPlanTier : 'free',
  }
}

const PREVIEW_PAID: Extract<PurchaseState, { status: 'ready' }> = {
  status: 'ready',
  paid: true,
  paymentStatus: 'paid',
  planTier: 'pro_lifetime',
  billingCycle: 'one_time',
  amount: 9900,
  currency: 'usd',
  customerEmail: 'you@studio.com',
  receiptUrl: 'https://invoice.stripe.com/i/preview',
  invoicePdf: 'https://pay.stripe.com/invoice/preview.pdf',
  invoiceNumber: 'INV-1042',
  hasBillingPortal: true,
  activated: true,
  accountPlanTier: 'pro_lifetime',
}

function UpgradeSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id') || ''
  const isPaidPreview =
    process.env.NODE_ENV === 'development' && searchParams.get('preview') === 'paid'
  const { data: authSession, status: authStatus, update } = useSession()
  const [purchase, setPurchase] = useState<PurchaseState>(
    isPaidPreview ? PREVIEW_PAID : { status: 'loading' }
  )
  const [existingBannerId, setExistingBannerId] = useState<string | null>(null)
  const [activationTimedOut, setActivationTimedOut] = useState(false)
  const [openingPortal, setOpeningPortal] = useState(false)
  const [portalError, setPortalError] = useState('')
  const capturedSuccess = useRef(false)

  useEffect(() => {
    if (isPaidPreview) {
      setPurchase(PREVIEW_PAID)
      return
    }
    if (authStatus === 'loading') return
    if (authStatus === 'unauthenticated') {
      setPurchase({ status: 'unsigned' })
    }
  }, [authStatus, isPaidPreview])

  useEffect(() => {
    if (isPaidPreview) return
    if (authStatus !== 'authenticated' || sessionId) return
    if (isPaidPlan(authSession?.user?.planTier)) {
      setPurchase({
        status: 'ready',
        paid: true,
        paymentStatus: 'paid',
        planTier: authSession?.user?.planTier || 'pro_lifetime',
        billingCycle: authSession?.user?.planTier === 'pro_annual' ? 'annual' : 'one_time',
        amount: null,
        currency: null,
        customerEmail: authSession?.user?.email || null,
        receiptUrl: null,
        invoicePdf: null,
        invoiceNumber: null,
        hasBillingPortal: true,
        activated: true,
        accountPlanTier: authSession?.user?.planTier || 'pro_lifetime',
      })
      return
    }
    setPurchase({ status: 'missing' })
  }, [authStatus, sessionId, authSession?.user?.planTier, authSession?.user?.email, isPaidPreview])

  useEffect(() => {
    if (isPaidPreview) return
    if (authStatus !== 'authenticated' || !sessionId) return

    if (!isCheckoutSessionId(sessionId)) {
      setPurchase({ status: 'error', message: 'That checkout link is not valid.' })
      return
    }

    let cancelled = false
    setPurchase({ status: 'loading' })

    fetch(`/api/upgrade/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (res.status === 401) {
          setPurchase({ status: 'unsigned' })
          return
        }
        if (!res.ok) {
          setPurchase({
            status: 'error',
            message: data.error === 'Checkout session not found'
              ? 'We could not find this checkout session.'
              : 'We could not confirm this payment yet.',
          })
          return
        }
        setPurchase(readyPurchase(data))
      })
      .catch(() => {
        if (!cancelled) {
          setPurchase({ status: 'error', message: 'We could not confirm this payment yet.' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [authStatus, sessionId, isPaidPreview])

  const paid = purchase.status === 'ready' && purchase.paid
  const activated = purchase.status === 'ready' && purchase.activated

  useEffect(() => {
    if (!paid || activated || activationTimedOut || !sessionId) {
      return
    }

    let cancelled = false
    const poll = window.setInterval(async () => {
      try {
        const res = await fetch(`/api/upgrade/session?session_id=${encodeURIComponent(sessionId)}`)
        const data = await res.json()
        if (cancelled || !res.ok) return
        setPurchase(readyPurchase(data))
        if (data.activated) {
          await update()
        }
      } catch {
        // Keep the paid confirmation on screen while the webhook catches up.
      }
    }, 2000)

    const timeout = window.setTimeout(() => {
      setActivationTimedOut(true)
      window.clearInterval(poll)
    }, 20000)

    return () => {
      cancelled = true
      window.clearInterval(poll)
      window.clearTimeout(timeout)
    }
  }, [paid, activated, sessionId, activationTimedOut, update])

  useEffect(() => {
    if (isPaidPreview) return
    if (purchase.status !== 'ready' || !purchase.paid || capturedSuccess.current) return
    capturedSuccess.current = true
    captureEvent('upgrade_success_viewed', {
      plan_tier: purchase.planTier || purchase.accountPlanTier,
      billing_cycle: purchase.billingCycle,
      activated: purchase.activated,
    })
  }, [purchase, isPaidPreview])

  useEffect(() => {
    if (authStatus !== 'authenticated') return
    let cancelled = false
    fetch('/api/banners/simple')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return
        setExistingBannerId(data?.banners?.[0]?.id ?? null)
      })
      .catch(() => {
        if (!cancelled) setExistingBannerId(null)
      })
    return () => {
      cancelled = true
    }
  }, [authStatus])

  const hasBanner = Boolean(existingBannerId)
  const primaryHref = hasBanner
    ? `/dashboard/builder?id=${existingBannerId}&tab=code`
    : '/dashboard/builder'
  const confirmedPlan =
    purchase.status === 'ready'
      ? planLabel(purchase.planTier || purchase.accountPlanTier, purchase.billingCycle)
      : 'Pro'
  const isAnnual =
    purchase.status === 'ready' &&
    (purchase.planTier === 'pro_annual' || purchase.billingCycle === 'annual')

  const openBillingPortal = async () => {
    setOpeningPortal(true)
    setPortalError('')
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId || undefined,
          returnUrl: `${window.location.pathname}${window.location.search}`,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && typeof data.url === 'string') {
        window.location.href = data.url
        return
      }
      setPortalError(
        res.status === 401
          ? 'Sign in to open your Stripe invoices.'
          : data.error || 'Could not open the billing portal.'
      )
    } catch {
      setPortalError('Could not open the billing portal.')
    } finally {
      setOpeningPortal(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative overflow-hidden px-4 pb-16 pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-3xl">
          {purchase.status === 'loading' && (
            <StatusCard
              icon={<Loader2 className="h-8 w-8 animate-spin text-primary" />}
              title={sessionId ? 'Confirming your payment' : 'Loading your account'}
              body={
                sessionId
                  ? 'Hang on — we are checking Stripe and activating Pro on your account.'
                  : 'Checking whether this purchase is already attached to your account.'
              }
            />
          )}

          {purchase.status === 'unsigned' && (
            <StatusCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Sign in to see your receipt"
              body={
                sessionId
                  ? 'Your payment went through Stripe. Sign in with the same account to confirm Pro and copy your install snippet.'
                  : 'If you just completed checkout, sign in with the same account to confirm Pro and get your install snippet.'
              }
              action={
                <Button size="lg" className="h-12 px-8 active:scale-[0.96]" asChild>
                  <Link href={`/auth/signin?callbackUrl=${encodeURIComponent(`/upgrade/success${sessionId ? `?session_id=${sessionId}` : ''}`)}`}>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              }
            />
          )}

          {purchase.status === 'missing' && (
            <StatusCard
              icon={<Crown className="h-8 w-8 text-primary" />}
              title="No purchase to confirm"
              body="This page is for completed checkouts. If you were trying to upgrade, start from pricing."
              action={
                <Button size="lg" className="h-12 px-8 active:scale-[0.96]" asChild>
                  <Link href="/upgrade">Go to upgrade</Link>
                </Button>
              }
            />
          )}

          {purchase.status === 'error' && (
            <StatusCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="We could not confirm this payment"
              body={`${purchase.message} If you were charged, email support and we will activate Pro by hand.`}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" className="h-12 px-8 active:scale-[0.96]" asChild>
                    <Link href="/upgrade">Try checkout again</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 active:scale-[0.96]" asChild>
                    <a href="mailto:support@cookie-banner.ca">Email support</a>
                  </Button>
                </div>
              }
            />
          )}

          {purchase.status === 'ready' && !purchase.paid && (
            <StatusCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Payment is not complete"
              body="Stripe has not marked this checkout as paid yet. If you closed the window early, start checkout again."
              action={
                <Button size="lg" className="h-12 px-8 active:scale-[0.96]" asChild>
                  <Link href="/upgrade">Return to upgrade</Link>
                </Button>
              }
            />
          )}

          {purchase.status === 'ready' && purchase.paid && (
            <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-8">
              <motion.div variants={fadeUp} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-[0_0_0_8px_hsl(var(--primary)/0.06)]">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-primary">
                  Payment confirmed
                </p>
                <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                  Welcome to {confirmedPlan}
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
                  {purchase.activated
                    ? hasBanner
                      ? 'Pro is active. Copy the install snippet onto your site to go live.'
                      : 'Pro is active. Create your banner next, then paste the one-line script in your site header.'
                    : 'Stripe has the payment. We are turning Pro on for this account — usually a few seconds.'}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {purchase.activated ? 'Pro account active' : 'Activating Pro'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
                    {isAnnual ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5" />
                        Future features included
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5" />
                        Lifetime access
                      </>
                    )}
                  </span>
                </div>
              </motion.div>

              <motion.section
                variants={fadeUp}
                className="rounded-2xl border bg-card p-5 shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)] sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">Your invoice</h2>
                  {purchase.activated ? (
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">Paid</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Activating
                    </span>
                  )}
                </div>
                <dl className="divide-y rounded-xl bg-muted/40">
                  <ReceiptRow label="Plan" value={confirmedPlan} />
                  {purchase.amount != null && (
                    <ReceiptRow
                      label="Amount"
                      value={formatUsdCents(purchase.amount, purchase.currency || 'usd')}
                    />
                  )}
                  {purchase.invoiceNumber && (
                    <ReceiptRow label="Invoice" value={purchase.invoiceNumber} />
                  )}
                  {purchase.customerEmail && (
                    <ReceiptRow label="Sent to" value={purchase.customerEmail} />
                  )}
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  {purchase.receiptUrl && (
                    <Button variant="outline" size="sm" className="active:scale-[0.96]" asChild>
                      <a href={purchase.receiptUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-3.5 w-3.5" />
                        View invoice
                      </a>
                    </Button>
                  )}
                  {purchase.invoicePdf && (
                    <Button variant="outline" size="sm" className="active:scale-[0.96]" asChild>
                      <a href={purchase.invoicePdf} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Download PDF
                      </a>
                    </Button>
                  )}
                  {purchase.hasBillingPortal && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="active:scale-[0.96]"
                      onClick={openBillingPortal}
                      disabled={openingPortal}
                    >
                      {openingPortal ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                      )}
                      All invoices in Stripe
                    </Button>
                  )}
                </div>
                <p className="mt-3 text-pretty text-sm text-muted-foreground">
                  This is your tax invoice. Download the PDF if you need it for bookkeeping — you do not have to save it now. The same invoice lives in Settings, and every invoice is in your Stripe customer portal.
                </p>
                {portalError && (
                  <p className="mt-2 text-sm text-red-600">{portalError}</p>
                )}
                {!purchase.receiptUrl && !purchase.invoicePdf && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Stripe is still preparing the invoice file. Check your email, or open the billing portal in a moment.
                  </p>
                )}
                {!purchase.activated && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {activationTimedOut
                      ? 'Payment is confirmed. If Pro features are not visible in a minute, refresh or email support@cookie-banner.ca.'
                      : 'This page will update as soon as the webhook activates your plan.'}
                  </p>
                )}
              </motion.section>

              <motion.div variants={fadeUp} className="text-center">
                <Button size="lg" className="h-12 px-8 active:scale-[0.96]" asChild>
                  <Link href={primaryHref}>
                    <Rocket className="mr-2 h-4 w-4" />
                    {hasBanner ? 'Copy your install snippet' : 'Create your first banner'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">
                  {hasBanner
                    ? 'Open the Install snippet step, copy the one-line script, and paste it in your site header.'
                    : 'Takes about 2 minutes. PIPEDA, Law 25, GPC, and geo rules are ready in the builder.'}
                </p>
              </motion.div>

              <motion.ol variants={fadeUp} className="grid gap-3 sm:grid-cols-3">
                {[
                  { step: '1', title: 'Design your banner', desc: 'Pick PIPEDA or Law 25, then match your brand.', icon: Palette },
                  { step: '2', title: 'Copy the snippet', desc: 'One script tag — WordPress, Shopify, or any site.', icon: Rocket },
                  { step: '3', title: 'Paste and go live', desc: 'Drop it in your site header. You are compliant.', icon: Shield },
                ].map((item) => (
                  <li key={item.step} className="rounded-2xl border bg-card p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {item.step}
                      </span>
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-pretty text-xs text-muted-foreground">{item.desc}</p>
                  </li>
                ))}
              </motion.ol>

              <motion.section
                variants={fadeUp}
                className="rounded-2xl border bg-muted/30 p-5 sm:p-6"
              >
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Unlocked with {confirmedPlan}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Crown, label: 'Unlimited banners' },
                    { icon: Shield, label: 'PIPEDA, Law 25, GPC, geo rules' },
                    { icon: BarChart3, label: 'GA4 consent analytics' },
                    { icon: Users, label: 'Team invites and roles' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-2.5 text-sm">
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </motion.section>

              {isAnnual ? (
                <motion.div variants={fadeUp} className="rounded-2xl border bg-card p-6 text-center">
                  <h3 className="font-semibold">Annual subscription active</h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    Your plan renews automatically. Manage payment methods or invoices anytime.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 active:scale-[0.96]" asChild>
                    <Link href="/dashboard/settings">Manage subscription</Link>
                  </Button>
                </motion.div>
              ) : (
                <motion.div variants={fadeUp} className="rounded-2xl border bg-card p-6 text-center">
                  <h3 className="font-semibold">Lifetime access activated</h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    Current Pro features are yours forever. Want every future feature too? Upgrade to annual later at a loyalty discount.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 active:scale-[0.96]" asChild>
                    <Link href={hasBanner ? primaryHref : '/dashboard'}>
                      {hasBanner ? 'Open installer' : 'Go to dashboard'}
                    </Link>
                  </Button>
                </motion.div>
              )}

              <motion.p variants={fadeUp} className="text-center text-sm text-muted-foreground">
                <Mail className="mr-1 inline h-3.5 w-3.5" />
                Questions? Email{' '}
                <a href="mailto:support@cookie-banner.ca" className="text-primary hover:underline">
                  support@cookie-banner.ca
                </a>
              </motion.p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function StatusCard({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode
  title: string
  body: string
  action?: ReactNode
}) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 text-center shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h1 className="text-balance text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-pretty text-muted-foreground">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium tabular-nums">{value}</dd>
    </div>
  )
}

export default function UpgradeSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      }
    >
      <UpgradeSuccessContent />
    </Suspense>
  )
}
