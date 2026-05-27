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
  name: 'privacy-policy-unauth',
  windowMs: 60 * 60 * 1000,
  maxRequests: 10,
})

// Authenticated: 100 requests per hour per IP
const authRateLimit = new RateLimit({
  name: 'privacy-policy-auth',
  windowMs: 60 * 60 * 1000,
  maxRequests: 100,
})

// Coerce common URL/email shortcomings into something the user expected.
const websiteUrlSchema = z
  .string()
  .min(1, 'Website URL is required')
  .max(500)
  .transform((v) => {
    const trimmed = v.trim()
    if (!trimmed) return trimmed
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  })
  .pipe(z.string().url('Enter a valid website URL (e.g. https://example.com)'))

const cookieDetailSchema = z.object({
  name: z.string().min(1).max(200),
  provider: z.string().max(200).optional(),
  category: z.enum(['necessary', 'analytics', 'marketing', 'functional', 'social_media']),
  duration: z.string().max(100).optional(),
  purpose: z.string().max(500).optional(),
})

const privacyPolicyInputsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200),
  businessType: z.enum(['website', 'saas', 'ecommerce', 'mobile_app', 'other']),
  websiteUrl: websiteUrlSchema,
  contactEmail: z.string().min(1, 'Contact email is required').email('Enter a valid contact email').max(200),
  country: z.string().min(1, 'Country is required').max(100),
  province: z.string().max(100).optional(),
  // Data URLs can be large (a few hundred KB); cap to keep payload sane.
  logoUrl: z.string().max(500_000).optional(),
  dataCollected: z.array(z.string().max(100)).default([]),
  collectionMethods: z.array(z.string().max(100)).default([]),
  cookieCategories: z.array(z.string().max(100)).default([]),
  cookies: z.array(cookieDetailSchema).max(200).optional(),
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
      const flat = parsed.error.flatten()
      const fieldErrors = flat.fieldErrors as Record<string, string[] | undefined>
      const firstField = Object.keys(fieldErrors)[0]
      const firstMessage = firstField ? fieldErrors[firstField]?.[0] : undefined
      return NextResponse.json(
        {
          error: firstMessage || 'Please review the form — some fields need fixing.',
          field: firstField,
          details: fieldErrors,
        },
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
