/**
 * Shared banner cache module
 * Provides centralized cache management for banner scripts
 * Can be invalidated from update endpoints to ensure live updates
 */

export interface BannerCacheEntry {
  script: string
  expiresAt: number
  isActive: boolean
}

// Shared cache map - can be invalidated from update endpoints
export const bannerCache = new Map<string, BannerCacheEntry>()

// Cache TTL - 2 minutes (reduced for faster updates)
export const CACHE_TTL_MS = 2 * 60 * 1000

/**
 * Invalidate a specific banner from the cache
 * Call this after updating a banner to ensure changes are reflected immediately
 */
export function invalidateBannerCache(bannerId: string): void {
  const deleted = bannerCache.delete(bannerId)
  console.log(`🗑️ Banner cache ${deleted ? 'invalidated' : 'not found'} for: ${bannerId}`)
}

/**
 * Clear all banner cache entries
 * Useful for deployments or system-wide cache refresh
 */
export function clearAllBannerCache(): void {
  const count = bannerCache.size
  bannerCache.clear()
  console.log(`🗑️ All banner cache cleared (${count} entries)`)
}

/**
 * Get a cached banner entry
 * Returns null if not found or expired
 */
export function getCachedBanner(bannerId: string): BannerCacheEntry | null {
  const cached = bannerCache.get(bannerId)
  if (!cached) return null
  
  const now = Date.now()
  if (now > cached.expiresAt) {
    bannerCache.delete(bannerId)
    return null
  }
  
  return cached
}

/**
 * Set a banner in the cache
 */
export function setCachedBanner(bannerId: string, entry: Omit<BannerCacheEntry, 'expiresAt'>): void {
  bannerCache.set(bannerId, {
    ...entry,
    expiresAt: Date.now() + CACHE_TTL_MS
  })
}

/**
 * Clean up expired cache entries
 * Call this periodically (e.g., on 1% of requests) to prevent memory leaks
 */
export function cleanupExpiredCache(): void {
  const now = Date.now()
  const keysToDelete: string[] = []
  
  bannerCache.forEach((entry, key) => {
    if (now > entry.expiresAt) {
      keysToDelete.push(key)
    }
  })
  
  keysToDelete.forEach(key => bannerCache.delete(key))
  
  if (keysToDelete.length > 0) {
    console.log(`🧹 Cleaned up ${keysToDelete.length} expired cache entries`)
  }
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats(): { size: number; entries: string[] } {
  return {
    size: bannerCache.size,
    entries: Array.from(bannerCache.keys())
  }
}

