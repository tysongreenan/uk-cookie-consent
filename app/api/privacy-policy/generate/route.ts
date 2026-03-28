/**
 * Public privacy policy generator endpoint.
 *
 * POST /api/privacy-policy/generate
 *   Accepts PrivacyPolicyInputs, validates with Zod, generates policy HTML/JSON.
 *   No auth required (free tier can use this).
 *   Rate limited: 10/hour unauthenticated, 100/hour authenticated.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { RateLimit } from '@/lib/rate-limit'
import { z } from 'zod'
import { generatePolicyFromInputs } from '@/lib/privacy-policy/generator'

// Unauthenticated: 10 requests per hour per IP
const unauthRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 10,
})

// Authenticated: 100 requests per hour per IP
const authRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 100,
})

const privacyPolicyInputsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200),
  businessType: z.enum(['website', 'saas', 'ecommerce', 'mobile_app', 'other']),
  websiteUrl: z.string().url('Invalid website URL').max(500),
  contactEmail: z.string().email('Invalid contact email').max(200),
  country: z.string().min(1).max(100),
  province: z.string().max(100).optional(),
  dataCollected: z.array(z.string().max(100)).default([]),
  collectionMethods: z.array(z.string().max(100)).default([]),
  cookieCategories: z.array(z.string().max(100)).default([]),
  thirdPartyServices: z.array(z.string().max(100)).default([]),
  dataPurposes: z.array(z.string().max(100)).default([]),
  sharesDataWithThirdParties: z.boolean().default(false),
  thirdPartyRecipients: z.array(z.string().max(200)).optional(),
  transfersDataInternationally: z.boolean().default(false),
  dataRetentionPeriod: z.string().max(100).default(''),
  customRetentionPeriod: z.string().max(200).optional(),
  allowsUserDeletion: z.boolean().default(false),
  allowsUserExport: z.boolean().default(false),
  jurisdictions: z.array(z.string().max(50)).default([]),
  language: z.enum(['en', 'fr']).default('en'),
  collectsChildrenData: z.boolean().default(false),
  minimumAge: z.number().int().min(0).max(21).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ───────────────────────────────────────────────

    const session = await getServerSession(authOptions)
    const limiter = session?.user?.id ? authRateLimit : unauthRateLimit

    const rateLimitResult = await limiter.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // ── Parse & validate ────────────────────────────────────────────

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = privacyPolicyInputsSchema.safeParse(body)
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    // ── Generate policy ─────────────────────────────────────────────

    const policyOutput = await generatePolicyFromInputs(parsed.data)

    return NextResponse.json(policyOutput)
  } catch (error) {
    console.error('[PRIVACY-POLICY-GENERATE] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
