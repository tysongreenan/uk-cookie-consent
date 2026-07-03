/**
 * Public cookie policy generator endpoint.
 *
 * POST /api/cookie-policy/generate
 *   Accepts CookiePolicyInputs, validates with Zod, generates cookie policy HTML.
 *   No auth required. Rate limited: 10/hour unauth, 100/hour auth.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { RateLimit } from '@/lib/rate-limit'
import { z } from 'zod'
import { generateCookiePolicy } from '@/lib/cookie-policy/generator'

const unauthRateLimit = new RateLimit({
  name: 'cookie-policy-unauth',
  windowMs: 60 * 60 * 1000,
  maxRequests: 10,
})

const authRateLimit = new RateLimit({
  name: 'cookie-policy-auth',
  windowMs: 60 * 60 * 1000,
  maxRequests: 100,
})

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

const inputsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200),
  websiteUrl: websiteUrlSchema,
  contactEmail: z.string().min(1, 'Contact email is required').email('Enter a valid contact email').max(200),
  country: z.string().min(1, 'Country is required').max(100),
  province: z.string().max(100).optional(),
  logoUrl: z.string().max(500_000).optional(),
  cookies: z.array(cookieDetailSchema).max(200).default([]),
  cookieCategories: z.array(z.string().max(100)).default([]),
  thirdPartyServices: z.array(z.string().max(100)).default([]),
  jurisdictions: z.array(z.string().max(50)).default([]),
  language: z.enum(['en', 'fr']).default('en'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const limiter = session?.user?.id ? authRateLimit : unauthRateLimit

    const rateLimitResult = await limiter.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = inputsSchema.safeParse(body)
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
        { status: 400 },
      )
    }

    const output = generateCookiePolicy(parsed.data)
    return NextResponse.json(output)
  } catch (error) {
    console.error('[COOKIE-POLICY-GENERATE] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
