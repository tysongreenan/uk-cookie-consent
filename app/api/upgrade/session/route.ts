import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import {
  invoiceLinks,
  isCheckoutSessionId,
  isPaidPlan,
} from '@/lib/upgrade-success'

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function customerIdFrom(checkout: Stripe.Checkout.Session): string | null {
  if (typeof checkout.customer === 'string') return checkout.customer
  return checkout.customer?.id || null
}

async function resolveInvoice(
  stripe: Stripe,
  checkout: Stripe.Checkout.Session
): Promise<Stripe.Invoice | null> {
  if (typeof checkout.invoice === 'object' && checkout.invoice) {
    return checkout.invoice
  }

  if (typeof checkout.invoice === 'string') {
    return stripe.invoices.retrieve(checkout.invoice)
  }

  const customerId = customerIdFrom(checkout)
  if (!customerId) return null

  const invoices = await stripe.invoices.list({
    customer: customerId,
    status: 'paid',
    limit: 5,
  })

  return (
    invoices.data.find((invoice) => invoice.amount_paid === checkout.amount_total) ||
    invoices.data[0] ||
    null
  )
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionId = request.nextUrl.searchParams.get('session_id') || ''
    if (!isCheckoutSessionId(sessionId)) {
      return NextResponse.json({ error: 'Invalid checkout session' }, { status: 400 })
    }

    const stripe = getStripe()
    const checkout = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['invoice'],
    })

    if (checkout.metadata?.userId !== session.user.id) {
      return NextResponse.json({ error: 'Checkout session not found' }, { status: 404 })
    }

    const invoice = await resolveInvoice(stripe, checkout)
    const links = invoiceLinks(invoice)

    const supabase = getSupabase()
    const { data: user } = await supabase
      .from('User')
      .select('planTier, stripeCustomerId')
      .eq('id', session.user.id)
      .single()

    const paid = checkout.payment_status === 'paid'
    const planTier = checkout.metadata?.planTier || null
    const billingCycle = checkout.metadata?.billingCycle || null
    const checkoutCustomer =
      typeof checkout.customer === 'string'
        ? checkout.customer
        : checkout.customer?.id || null

    return NextResponse.json({
      paid,
      paymentStatus: checkout.payment_status,
      planTier,
      billingCycle,
      amount: checkout.amount_total,
      currency: checkout.currency,
      customerEmail: checkout.customer_details?.email || session.user.email || null,
      receiptUrl: links.hostedUrl,
      invoicePdf: links.pdfUrl,
      invoiceNumber: links.number,
      hasBillingPortal: Boolean(user?.stripeCustomerId || checkoutCustomer),
      activated: isPaidPlan(user?.planTier),
      accountPlanTier: user?.planTier || 'free',
    })
  } catch (error: unknown) {
    const stripeError = error as { statusCode?: number; type?: string }
    if (stripeError.statusCode === 404 || stripeError.type === 'StripeInvalidRequestError') {
      return NextResponse.json({ error: 'Checkout session not found' }, { status: 404 })
    }
    console.error('[UPGRADE SESSION] Failed to load checkout session:', error)
    return NextResponse.json({ error: 'Failed to confirm purchase' }, { status: 500 })
  }
}
