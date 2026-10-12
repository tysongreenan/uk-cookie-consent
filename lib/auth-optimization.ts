// Authentication Performance Optimization
// Implements caching, preloading, and performance monitoring

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
