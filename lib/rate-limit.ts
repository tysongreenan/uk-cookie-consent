/**
 * Rate Limiter — Upstash Redis for Vercel serverless
 *
 * Previous version used in-memory Map which reset on every cold start.
 * This version uses Upstash Redis for persistent, distributed rate limiting.
 *
 * Falls back to in-memory (permissive) if Upstash is not configured,
 * so the app still works without Redis — just without rate limiting.
 *
 * API is unchanged: new RateLimit({ windowMs, maxRequests }) → .check(request)
 */

import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Lazy init — only create Redis client if env vars exist
let redis: Redis | null = null
function getRedis(): Redis | null {
  if (redis) return redis
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  return redis
}

export interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  keyGenerator?: (req: Request) => string
}

export class RateLimit {
  private windowMs: number
  private maxRequests: number
  private keyGenerator: (req: Request) => string
  private upstashLimiter: Ratelimit | null = null

  constructor(options: RateLimitOptions) {
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

  private getLimiter(): Ratelimit | null {
    if (this.upstashLimiter) return this.upstashLimiter
    const r = getRedis()
    if (!r) return null
    // Convert windowMs to seconds for Upstash sliding window
    const windowSeconds = Math.max(1, Math.ceil(this.windowMs / 1000))
    this.upstashLimiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(this.maxRequests, `${windowSeconds} s`),
      analytics: false, // Keep it fast
    })
    return this.upstashLimiter
  }

  public async check(req: Request): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = this.keyGenerator(req)
    const limiter = this.getLimiter()

    if (!limiter) {
      // No Redis configured — allow all requests (dev mode / fallback)
      return { allowed: true, remaining: this.maxRequests, resetTime: Date.now() + this.windowMs }
    }

    try {
      const result = await limiter.limit(key)
      return {
        allowed: result.success,
        remaining: result.remaining,
        resetTime: result.reset,
      }
    } catch (error) {
      // Redis error — fail open (don't block users if Redis is down)
      console.error('[RATE-LIMIT] Upstash error, failing open:', error)
      return { allowed: true, remaining: this.maxRequests, resetTime: Date.now() + this.windowMs }
    }
  }
}

// Pre-configured rate limiters (same config as before)
export const authRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
})

export const strictAuthRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
})

export const apiRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
})

export const bannerRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10,
})

export const registrationRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
})

export const passwordResetRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
})

export const enterpriseRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
})

export const freeTierRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
})
