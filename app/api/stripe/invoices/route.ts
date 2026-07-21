// Stripe invoice list for paid members.
// Uses Supabase client (not Prisma) to avoid PgBouncer / direct-DB connectivity issues on serverless.
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase configuration is missing')
  }
  return createClient(url, key)
}

function isStripeUrl(url: string | null): boolean {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return parsed.hostname.endsWith('.stripe.com')
  } catch {
    return false
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = getSupabase()
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('stripeCustomerId')
      .eq('id', session.user.id)
      .single()

    if (userError) {
      console.error('[INVOICES] User lookup failed:', userError.message)
      return NextResponse.json(
        { error: 'Failed to fetch invoices' },
        { status: 500 }
      )
    }

    if (!user?.stripeCustomerId) {
      return NextResponse.json({ invoices: [] })
    }

    const stripe = getStripe()
    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
      limit: 10,
      status: 'paid',
    })

    const formatted = invoices.data.map((inv) => ({
      id: inv.id,
      number: inv.number,
      amount: inv.total,
      currency: inv.currency,
      status: inv.status,
      created: inv.created,
      pdf: isStripeUrl(inv.invoice_pdf ?? null) ? inv.invoice_pdf! : null,
      hosted_url: isStripeUrl(inv.hosted_invoice_url ?? null) ? inv.hosted_invoice_url! : null,
    }))

    return NextResponse.json({ invoices: formatted })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[INVOICES] Error fetching invoices:', message)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}
