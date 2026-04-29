import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import Stripe from 'stripe'

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
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

    const supabase = getSupabaseAdmin()
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('stripeCustomerId')
      .eq('id', session.user.id)
      .maybeSingle()

    if (userError) {
      throw userError
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
  } catch (error) {
    console.error('[INVOICES] Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}
