/**
 * Dispute Evidence Generator
 *
 * Pulls together all evidence needed to respond to a Stripe chargeback:
 * user profile, audit log, service usage, and payment history.
 */

import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  if (!url || !key) throw new Error('Supabase config missing')
  return createClient(url, key)
}

export interface DisputeEvidence {
  generatedAt: string
  customer: {
    name: string | null
    email: string
    registeredAt: string
    planTier: string
    upgradedAt: string | null
    stripeCustomerId: string | null
  }
  productDescription: string
  accessLog: Array<{
    action: string
    ip: string | null
    timestamp: string
    details: Record<string, unknown>
  }>
  serviceUsage: {
    bannersCreated: number
    bannerNames: string[]
  }
  payments: Array<{
    amount: number
    currency: string
    status: string
    createdAt: string
    stripePaymentIntentId: string | null
  }>
  accessActivityLogText: string
  summaryText: string
}

const PRODUCT_DESCRIPTION =
  'cookie-banner.ca Pro Plan - Lifetime Access. A premium digital SaaS service providing GDPR/PECR-compliant cookie consent banner management for websites, including advanced customization, analytics, geo-targeting, and priority support. Access is delivered immediately upon purchase.'

export async function generateDisputeEvidence(
  stripeCustomerId: string
): Promise<DisputeEvidence | null> {
  const supabase = getSupabaseAdmin()

  // 1. Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      planTier: true,
      upgradedAt: true,
      stripeCustomerId: true,
    },
  })

  if (!user) return null

  // 2. Pull audit log
  const { data: auditEntries } = await supabase
    .from('audit_log')
    .select('action, ip_address, created_at, metadata')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(500)

  // 3. Pull banners
  const { data: banners } = await supabase
    .from('SimpleBanners')
    .select('name, created_at')
    .eq('userId', user.id)

  // 4. Pull payments
  const payments = await prisma.payment.findMany({
    where: { userId: user.id },
    select: {
      amount: true,
      currency: true,
      status: true,
      createdAt: true,
      stripePaymentIntentId: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  // 5. Format access log
  const accessLog = (auditEntries || []).map((e) => ({
    action: e.action,
    ip: e.ip_address,
    timestamp: e.created_at,
    details: e.metadata || {},
  }))

  // 6. Distinct IPs and login count
  const loginEntries = accessLog.filter((e) => e.action === 'login')
  const distinctIps = new Set(loginEntries.map((e) => e.ip).filter(Boolean))
  const firstLogin = loginEntries[0]?.timestamp
  const lastLogin = loginEntries[loginEntries.length - 1]?.timestamp

  // 7. Build access activity log text
  const accessLines = [
    `Customer: ${user.name || 'N/A'} (${user.email})`,
    `Account created: ${formatDate(user.createdAt)}`,
    user.upgradedAt ? `Account upgraded to Pro plan: ${formatDate(user.upgradedAt)}` : null,
    loginEntries.length > 0
      ? `Total logins: ${loginEntries.length} from ${distinctIps.size} distinct IP(s)`
      : null,
    firstLogin ? `First login: ${formatDate(new Date(firstLogin))}` : null,
    lastLogin && lastLogin !== firstLogin
      ? `Last login: ${formatDate(new Date(lastLogin))}`
      : null,
    ...accessLog.map(
      (e) =>
        `${formatDate(new Date(e.timestamp))} — ${e.action}${e.ip ? ` (IP: ${e.ip})` : ''}`
    ),
  ].filter(Boolean)

  const accessActivityLogText = accessLines.join('\n')

  // 8. Build summary text
  const bannerCount = banners?.length || 0
  const bannerNames = (banners || []).map((b) => b.name).filter(Boolean)
  const paymentAmount = payments[0] ? (payments[0].amount / 100).toFixed(2) : '99.00'
  const paymentCurrency = payments[0]?.currency?.toUpperCase() || 'USD'

  const summaryParts = [
    `This transaction was authorized by ${user.name || 'the cardholder'} (${user.email}).`,
    `The customer registered on ${formatDate(user.createdAt)}${user.upgradedAt ? ` and upgraded to Pro on ${formatDate(user.upgradedAt)}` : ''} via a one-time payment of $${paymentAmount} ${paymentCurrency}.`,
  ]

  if (bannerCount > 0) {
    summaryParts.push(
      `They have actively used the service, creating ${bannerCount} cookie banner${bannerCount > 1 ? 's' : ''}.`
    )
  }

  if (loginEntries.length > 0) {
    summaryParts.push(
      `Their access log shows ${loginEntries.length} login${loginEntries.length > 1 ? 's' : ''} from ${distinctIps.size} distinct IP${distinctIps.size > 1 ? 's' : ''}.`
    )
  }

  summaryParts.push(
    'The product is a self-service SaaS tool for cookie consent banner generation and management delivered immediately upon purchase.',
    'No communication was received from the cardholder prior to this dispute — they did not contact cookie-banner.ca to request a refund or report any issue.'
  )

  return {
    generatedAt: new Date().toISOString(),
    customer: {
      name: user.name,
      email: user.email!,
      registeredAt: user.createdAt.toISOString(),
      planTier: user.planTier,
      upgradedAt: user.upgradedAt?.toISOString() || null,
      stripeCustomerId: user.stripeCustomerId,
    },
    productDescription: PRODUCT_DESCRIPTION,
    accessLog,
    serviceUsage: {
      bannersCreated: bannerCount,
      bannerNames,
    },
    payments: payments.map((p) => ({
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      stripePaymentIntentId: p.stripePaymentIntentId,
    })),
    accessActivityLogText,
    summaryText: summaryParts.join(' '),
  }
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}
