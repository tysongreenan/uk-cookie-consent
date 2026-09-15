import { describe, expect, it } from 'vitest'
import {
  formatUsdCents,
  invoiceLinks,
  isCheckoutSessionId,
  isPaidPlan,
  isStripeHostedUrl,
  planLabel,
  safePortalReturnPath,
} from './upgrade-success'

describe('isCheckoutSessionId', () => {
  it('accepts live and test checkout session ids', () => {
    expect(isCheckoutSessionId('cs_test_a1B2c3')).toBe(true)
    expect(isCheckoutSessionId('cs_live_abc123')).toBe(true)
  })

  it('rejects other values', () => {
    expect(isCheckoutSessionId('')).toBe(false)
    expect(isCheckoutSessionId('pi_test_abc')).toBe(false)
    expect(isCheckoutSessionId('cs_test_abc-def')).toBe(false)
  })
})

describe('planLabel', () => {
  it('labels annual and lifetime plans', () => {
    expect(planLabel('pro_annual')).toBe('Pro Annual')
    expect(planLabel('pro_lifetime')).toBe('Pro Lifetime')
    expect(planLabel('pro')).toBe('Pro Lifetime')
    expect(planLabel('free', 'annual')).toBe('Pro Annual')
  })
})

describe('isPaidPlan', () => {
  it('treats only non-free tiers as paid', () => {
    expect(isPaidPlan('pro_annual')).toBe(true)
    expect(isPaidPlan('free')).toBe(false)
    expect(isPaidPlan(null)).toBe(false)
  })
})

describe('formatUsdCents', () => {
  it('formats cents as USD', () => {
    expect(formatUsdCents(9900)).toBe('$99.00')
    expect(formatUsdCents(4900, 'usd')).toBe('$49.00')
  })
})

describe('isStripeHostedUrl', () => {
  it('allows stripe.com hosts only', () => {
    expect(isStripeHostedUrl('https://invoice.stripe.com/i/abc')).toBe(true)
    expect(isStripeHostedUrl('https://evil.example/i/abc')).toBe(false)
    expect(isStripeHostedUrl(null)).toBe(false)
  })
})

describe('invoiceLinks', () => {
  it('returns hosted invoice and pdf only for Stripe urls', () => {
    expect(
      invoiceLinks({
        hosted_invoice_url: 'https://invoice.stripe.com/i/abc',
        invoice_pdf: 'https://pay.stripe.com/invoice/inv.pdf',
        number: 'INV-1042',
      })
    ).toEqual({
      hostedUrl: 'https://invoice.stripe.com/i/abc',
      pdfUrl: 'https://pay.stripe.com/invoice/inv.pdf',
      number: 'INV-1042',
    })
    expect(
      invoiceLinks({
        hosted_invoice_url: 'https://evil.example/i/abc',
        invoice_pdf: null,
        number: null,
      })
    ).toEqual({ hostedUrl: null, pdfUrl: null, number: null })
  })
})

describe('safePortalReturnPath', () => {
  it('allows success and settings paths only', () => {
    expect(safePortalReturnPath('/upgrade/success?session_id=cs_test_abc')).toBe(
      '/upgrade/success?session_id=cs_test_abc'
    )
    expect(safePortalReturnPath('/dashboard/settings')).toBe('/dashboard/settings')
    expect(safePortalReturnPath('https://evil.example')).toBe('/dashboard/settings')
    expect(safePortalReturnPath('//evil.example')).toBe('/dashboard/settings')
  })
})
