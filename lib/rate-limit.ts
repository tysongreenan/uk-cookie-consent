/**
 * Rate Limiter — Postgres-backed (Supabase) for Vercel serverless
 *
 * Uses a single atomic RPC (check_rate_limit) per request. No external
 * service, no quota — just rows in the existing Supabase DB.
 *
 * Fails open if the DB call errors, so an outage doesn't lock users out.
 *
 * API is unchanged: new RateLimit({ windowMs, maxRequests }) → .check(request)
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null
function getClient(): SupabaseClient | null {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  try {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    return client
  } catch (error) {
    console.error('[RATE-LIMIT] Failed to create Supabase client:', error)
    return null
  }
}

export interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  keyGenerator?: (req: Request) => string
  /** Optional human-readable label for logs/metrics. */
  name?: string
}

export class RateLimit {
  private name: string
  private windowMs: number
  private maxRequests: number
  private keyGenerator: (req: Request) => string

  constructor(options: RateLimitOptions) {
    this.name = options.name ?? 'rl'
    this.windowMs = options.windowMs
    this.maxRequests = options.maxRequests
    this.keyGenerator = options.keyGenerator || this.defaultKeyGenerator
  }

  private defaultKeyGenerator(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const ip = forwarded?.split(',')[0]?.trim() || realIp || 'unknown'
    return ip
  }

  public async check(req: Request): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const fallback = { allowed: true, remaining: this.maxRequests, resetTime: Date.now() + this.windowMs }

    const supabase = getClient()
    if (!supabase) return fallback

    // Name is part of the key so limiters that share (windowMs, maxRequests)
    // get separate buckets instead of colliding (e.g. registration vs
    // password-reset, both 1h/3 previously shared one bucket per IP).
    const key = `${this.name}:${this.windowMs}:${this.maxRequests}:${this.keyGenerator(req)}`
    const windowSeconds = Math.max(1, Math.ceil(this.windowMs / 1000))

    try {
      const { data, error } = await supabase.rpc('check_rate_limit', {
        p_key: key,
        p_window_seconds: windowSeconds,
        p_max_requests: this.maxRequests,
      })

      if (error || !data || !Array.isArray(data) || data.length === 0) {
        if (error) console.error('[RATE-LIMIT] RPC error, failing open:', error.message)
        return fallback
      }

      const row = data[0] as { allowed: boolean; remaining: number; reset_at: string }
      return {
        allowed: row.allowed,
        remaining: row.remaining,
        resetTime: new Date(row.reset_at).getTime(),
      }
    } catch (error) {
      console.error('[RATE-LIMIT] Unexpected error, failing open:', error)
      return fallback
    }
  }
}

// Pre-configured rate limiters. Each has a distinct `name` so limiters that
// share the same (windowMs, maxRequests) don't collide on the same bucket.
export const authRateLimit = new RateLimit({
  name: 'auth',
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
})

export const strictAuthRateLimit = new RateLimit({
  name: 'auth-strict',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
})

export const apiRateLimit = new RateLimit({
  name: 'api',
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
})

export const bannerRateLimit = new RateLimit({
  name: 'banner',
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10,
})

export const registrationRateLimit = new RateLimit({
  name: 'registration',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
})

// Limits how often a reset EMAIL can be requested (forgot-password).
export const passwordResetRateLimit = new RateLimit({
  name: 'password-reset',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
})

// Separate, looser limit for SUBMITTING a new password (reset-password).
// Kept apart from the email-request limiter so requesting links never blocks
// the actual reset. The 32-byte token already prevents brute force; this just
// caps abuse of the token-verification endpoint.
export const passwordResetSubmitRateLimit = new RateLimit({
  name: 'password-reset-submit',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
})

export const enterpriseRateLimit = new RateLimit({
  name: 'enterprise',
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
})

export const freeTierRateLimit = new RateLimit({
  name: 'free-tier',
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
})
