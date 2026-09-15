export function isCheckoutSessionId(value: string): boolean {
  return /^cs_(test_|live_)?[A-Za-z0-9]+$/.test(value)
}

export function planLabel(planTier?: string | null, billingCycle?: string | null): string {
  if (planTier === 'pro_annual' || billingCycle === 'annual') return 'Pro Annual'
  if (planTier === 'pro_lifetime' || planTier === 'pro' || billingCycle === 'one_time') {
    return 'Pro Lifetime'
  }
  return 'Pro'
}

export function isPaidPlan(planTier?: string | null): boolean {
  return Boolean(planTier && planTier !== 'free')
}

export function formatUsdCents(amount: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export function isStripeHostedUrl(url: string | null | undefined): url is string {
  if (!url) return false
  try {
    return new URL(url).hostname.endsWith('.stripe.com')
  } catch {
    return false
  }
}

export function invoiceLinks(invoice: {
  hosted_invoice_url?: string | null
  invoice_pdf?: string | null
  number?: string | null
} | null | undefined) {
  const hosted = invoice?.hosted_invoice_url
  const pdf = invoice?.invoice_pdf
  return {
    hostedUrl: isStripeHostedUrl(hosted) ? hosted : null,
    pdfUrl: isStripeHostedUrl(pdf) ? pdf : null,
    number: invoice?.number || null,
  }
}

export function safePortalReturnPath(value: unknown): string {
  if (typeof value !== 'string') return '/dashboard/settings'
  if (!value.startsWith('/') || value.startsWith('//')) return '/dashboard/settings'
  if (value.startsWith('/upgrade/success') || value.startsWith('/dashboard/settings')) {
    return value
  }
  return '/dashboard/settings'
}
