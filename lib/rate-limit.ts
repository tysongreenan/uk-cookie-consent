// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (req: Request) => string; // Custom key generator
}

export class RateLimit {
  private windowMs: number;
  private maxRequests: number;
  private keyGenerator: (req: Request) => string;

  constructor(options: RateLimitOptions) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
    this.keyGenerator = options.keyGenerator || this.defaultKeyGenerator;
  }

  private defaultKeyGenerator(req: Request): string {
    // Get IP from various headers (for different hosting platforms)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    
    // Combine IP with user agent for better uniqueness
    const userAgent = req.headers.get('user-agent') || '';
    return `${ip}-${userAgent.slice(0, 50)}`;
  }

  public async check(req: Request): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const key = this.keyGenerator(req);
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    // Clean up expired entries periodically
    if (Math.random() < 0.01) { // 1% chance
      this.cleanup();
    }

    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.windowMs
      };
      rateLimitStore.set(key, newEntry);
      
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: newEntry.resetTime
      };
    }

    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime
      };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      rateLimitStore.delete(key);
    });
  }
}

// Pre-configured rate limiters
export const authRateLimit = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
});

export const apiRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
});

export const bannerRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 banner operations per minute
});
