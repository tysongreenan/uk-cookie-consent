// Secure Stripe webhook handler with comprehensive validation
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { 
  validatePaymentAmount, 
  SECURITY_HEADERS, 
  logSecurityEvent 
} from '@/lib/security-validation'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Track processed events to prevent duplicates
const processedEvents = new Set<string>()

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  // Validate webhook signature
  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    logSecurityEvent('stripe_webhook_signature_failed', 'system', {
      error: err instanceof Error ? err.message : 'Unknown error',
      signature: signature.substring(0, 20) + '...'
    })
    return NextResponse.json(
      { error: 'Invalid signature' }, 
      { status: 400, headers: SECURITY_HEADERS }
    )
  }

  // Check for duplicate events
  if (processedEvents.has(event.id)) {
    logSecurityEvent('stripe_duplicate_event', 'system', { eventId: event.id })
    return NextResponse.json(
      { error: 'Event already processed' }, 
      { status: 400, headers: SECURITY_HEADERS }
    )
  }

  // Add to processed events (in production, use Redis or database)
  processedEvents.add(event.id)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Validate payment status
        if (session.payment_status !== 'paid') {
          logSecurityEvent('stripe_payment_not_paid', 'system', {
            sessionId: session.id,
            paymentStatus: session.payment_status
          })
          return NextResponse.json(
            { error: 'Payment not completed' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Validate payment amount
        const amount = session.amount_total
        const amountValidation = validatePaymentAmount(amount || 0)
        if (!amountValidation.valid) {
          logSecurityEvent('stripe_invalid_payment_amount', 'system', {
            sessionId: session.id,
            expectedAmount: 4899,
            actualAmount: amount,
            error: amountValidation.error
          })
          return NextResponse.json(
            { error: 'Invalid payment amount' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Extract metadata
        const userId = session.metadata?.userId
        const userEmail = session.metadata?.userEmail
        const planTier = session.metadata?.planTier || 'pro'

        if (!userId) {
          logSecurityEvent('stripe_missing_user_metadata', 'system', {
            sessionId: session.id,
            metadata: session.metadata
          })
          return NextResponse.json(
            { error: 'Missing user metadata' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Validate user exists
        const { data: user, error: userError } = await supabase
          .from('User')
          .select('id, email, planTier')
          .eq('id', userId)
          .single()

        if (userError || !user) {
          logSecurityEvent('stripe_user_not_found', 'system', {
            sessionId: session.id,
            userId,
            error: userError?.message
          })
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404, headers: SECURITY_HEADERS }
          )
        }

        // Check if user is already upgraded
        if (user.planTier === 'pro' || user.planTier === 'enterprise') {
          logSecurityEvent('stripe_user_already_upgraded', 'system', {
            sessionId: session.id,
            userId,
            currentPlan: user.planTier
          })
          return NextResponse.json(
            { error: 'User already upgraded' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Update user's plan tier with transaction safety
        const { error: updateError } = await supabase
          .from('User')
          .update({
            planTier: planTier,
            upgradedAt: new Date().toISOString(),
            stripeCustomerId: session.customer as string,
            stripePaymentIntentId: session.payment_intent as string
          })
          .eq('id', userId)
          .eq('planTier', 'free') // Only update if currently free

        if (updateError) {
          logSecurityEvent('stripe_user_update_failed', 'system', {
            sessionId: session.id,
            userId,
            error: updateError.message
          })
          return NextResponse.json(
            { error: 'Failed to update user plan' },
            { status: 500, headers: SECURITY_HEADERS }
          )
        }

        logSecurityEvent('stripe_user_upgraded', 'system', {
          sessionId: session.id,
          userId,
          planTier,
          amount: amount
        })

        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        logSecurityEvent('stripe_payment_succeeded', 'system', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        logSecurityEvent('stripe_payment_failed', 'system', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          lastPaymentError: paymentIntent.last_payment_error
        })
        break
      }
      
      default:
        logSecurityEvent('stripe_unhandled_event', 'system', {
          eventType: event.type,
          eventId: event.id
        })
    }

    return NextResponse.json(
      { received: true },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Webhook processing error:', error)
    logSecurityEvent('stripe_webhook_error', 'system', {
      eventId: event.id,
      eventType: event.type,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}
