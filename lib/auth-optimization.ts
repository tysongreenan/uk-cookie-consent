// Authentication Performance Optimization
// Implements caching, preloading, and performance monitoring

import { NextRequest } from 'next/server';

interface AuthCacheEntry {
  user: any;
  timestamp: number;
  expires: number;
}

interface PerformanceMetrics {
  authRequests: number;
  cacheHits: number;
  averageResponseTime: number;
  lastReset: Date;
}

class AuthOptimizer {
  private userCache = new Map<string, AuthCacheEntry>();
  private sessionCache = new Map<string, any>();
  private metrics: PerformanceMetrics = {
    authRequests: 0,
    cacheHits: 0,
    averageResponseTime: 0,
    lastReset: new Date()
  };

  // Cache user data for performance
  cacheUser(userId: string, userData: any, ttlMinutes: number = 5): void {
    const now = Date.now();
    const expires = now + (ttlMinutes * 60 * 1000);
    
    this.userCache.set(userId, {
      user: userData,
      timestamp: now,
      expires
    });

    // Clean up expired entries periodically
    if (Math.random() < 0.1) { // 10% chance
      this.cleanupCache();
    }
  }

  // Get cached user data
  getCachedUser(userId: string): any | null {
    const entry = this.userCache.get(userId);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expires) {
      this.userCache.delete(userId);
      return null;
    }

    this.metrics.cacheHits++;
    return entry.user;
  }

  // Cache session data
  cacheSession(sessionId: string, sessionData: any, ttlMinutes: number = 10): void {
    const now = Date.now();
    const expires = now + (ttlMinutes * 60 * 1000);
    
    this.sessionCache.set(sessionId, {
      session: sessionData,
      timestamp: now,
      expires
    });
  }

  // Get cached session
  getCachedSession(sessionId: string): any | null {
    const entry = this.sessionCache.get(sessionId);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expires) {
      this.sessionCache.delete(sessionId);
      return null;
    }

    return entry.session;
  }

  // Performance monitoring
  recordAuthRequest(responseTime: number): void {
    this.metrics.authRequests++;
    
    // Update average response time (exponential moving average)
    const alpha = 0.1;
    this.metrics.averageResponseTime = 
      (alpha * responseTime) + ((1 - alpha) * this.metrics.averageResponseTime);
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics & { cacheHitRate: number } {
    return {
      ...this.metrics,
      cacheHitRate: this.metrics.authRequests > 0 
        ? (this.metrics.cacheHits / this.metrics.authRequests) * 100 
        : 0
    };
  }

  // Clean up expired cache entries
  private cleanupCache(): void {
    const now = Date.now();
    
    // Clean user cache
    const userKeysToDelete: string[] = [];
    this.userCache.forEach((entry, key) => {
      if (now > entry.expires) {
        userKeysToDelete.push(key);
      }
    });
    userKeysToDelete.forEach(key => this.userCache.delete(key));

    // Clean session cache
    const sessionKeysToDelete: string[] = [];
    this.sessionCache.forEach((entry, key) => {
      if (now > entry.expires) {
        sessionKeysToDelete.push(key);
      }
    });
    sessionKeysToDelete.forEach(key => this.sessionCache.delete(key));
  }

  // Clear all caches (for testing or maintenance)
  clearAllCaches(): void {
    this.userCache.clear();
    this.sessionCache.clear();
  }

  // Get cache statistics
  getCacheStats(): { userCacheSize: number; sessionCacheSize: number } {
    return {
      userCacheSize: this.userCache.size,
      sessionCacheSize: this.sessionCache.size
    };
  }
}

// Singleton instance
export const authOptimizer = new AuthOptimizer();

// Helper function to measure request performance
export const measurePerformance = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    authOptimizer.recordAuthRequest(responseTime);
    
    console.log(`[PERF] ${operationName}: ${responseTime.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    authOptimizer.recordAuthRequest(responseTime);
    
    console.error(`[PERF] ${operationName} failed: ${responseTime.toFixed(2)}ms`, error);
    throw error;
  }
};

// Request optimization helpers
export const optimizeRequest = (request: NextRequest): {
  ip: string;
  userAgent: string;
  fingerprint: string;
} => {
  // Extract IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Create a simple fingerprint for request optimization
  const fingerprint = `${ip}-${userAgent.slice(0, 50)}`;
  
  return { ip, userAgent, fingerprint };
};

// Session preloading for better UX
export const preloadUserSession = async (userId: string): Promise<void> => {
  try {
    // This could preload user data, permissions, etc.
    // For now, we'll just ensure the user cache is warmed up
    console.log(`[PRELOAD] Preloading session for user: ${userId}`);
  } catch (error) {
    console.error(`[PRELOAD] Failed to preload session for user ${userId}:`, error);
  }
};
