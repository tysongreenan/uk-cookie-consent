// Stripe Customer Portal for invoice and receipt access.
// Uses Supabase client (not Prisma) to avoid PgBouncer / direct-DB connectivity issues on serverless.
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const getStripe = () => {
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

export async function POST(request: NextRequest) {
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
      .select('id, email, stripeCustomerId, planTier')
      .eq('id', session.user.id)
      .single()

    if (userError || !user) {
      console.error('[PORTAL] User lookup failed:', userError?.message || 'not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No payment history found' },
        { status: 404 }
      )
    }

    const stripe = getStripe()

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'}/dashboard/settings`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[PORTAL] Error creating portal session:', message)
    // Never return internal/DB/Stripe details to the client
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
