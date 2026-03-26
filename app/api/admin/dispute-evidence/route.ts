// Admin endpoint to pull dispute evidence for a customer
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateDisputeEvidence } from '@/lib/dispute-evidence'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim())
  : ['support@cookie-banner.ca']

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const customerId = searchParams.get('customerId')

  if (!email && !customerId) {
    return NextResponse.json(
      { error: 'Provide ?email= or ?customerId=' },
      { status: 400 }
    )
  }

  // Resolve stripeCustomerId from email if needed
  let stripeCustomerId = customerId
  if (!stripeCustomerId && email) {
    const user = await prisma.user.findFirst({
      where: { email },
      select: { stripeCustomerId: true },
    })
    stripeCustomerId = user?.stripeCustomerId || null
  }

  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: 'Customer not found or no Stripe ID linked' },
      { status: 404 }
    )
  }

  const evidence = await generateDisputeEvidence(stripeCustomerId)
  if (!evidence) {
    return NextResponse.json({ error: 'No user found for this customer' }, { status: 404 })
  }

  return NextResponse.json(evidence)
}
