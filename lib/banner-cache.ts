import { invalidateByTag } from '@vercel/functions'

/**
 * CDN cache purge for banner scripts.
 *
 * (This file previously held the in-memory banner cache, which was removed:
 * per-instance memory can't be invalidated across serverless instances and
 * caused stale banners. Nothing imported it anymore. Today banner.js is cached
 * on Vercel's CDN — see app/api/v1/banner.js/route.ts — and every cached
 * response carries a `banner-<id>` cache tag so it can be purged on demand.)
 *
 * Purge the CDN-cached banner script for a banner. All geo/GPC variants share
 * the same cache tag, so one call clears every variant worldwide. Called after
 * any banner write (update, toggle, delete) so edits reach new page loads
 * within seconds instead of waiting out the CDN s-maxage.
 *
 * Fail-soft by design: a purge failure must never fail the save — worst case
 * the edge keeps serving the previous version until s-maxage expires (~5 min).
 */
export async function invalidateBannerCache(bannerId: string): Promise<void> {
  // Purging only exists on Vercel; locally there is no CDN cache either
  if (!process.env.VERCEL) return

  try {
    await invalidateByTag(`banner-${bannerId}`)
  } catch (error) {
    console.error('[BANNER-CACHE] CDN purge failed (stale for up to 5 min):', error)
  }
}
