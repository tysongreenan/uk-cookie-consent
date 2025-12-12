# Banner API Cache Implementation

## What Was Added

Server-side in-memory caching for the `/api/v1/banner.js` endpoint to dramatically reduce database queries.

## How It Works

1. **Cache Check**: Every request first checks the in-memory cache
2. **Cache Hit**: If banner is cached and not expired, return cached script immediately (no DB query)
3. **Cache Miss**: Fetch from database, generate script, cache it for 10 minutes
4. **Cache Cleanup**: Expired entries are cleaned up periodically (1% chance per request)

## Cache Configuration

- **TTL**: 10 minutes (configurable via `CACHE_TTL_MS`)
- **Storage**: In-memory Map (per serverless function instance)
- **Cache Headers**: Added `X-Cache: HIT` or `X-Cache: MISS` for monitoring

## Performance Impact

### Before Caching
- **Database queries**: 1-2 per request
- **10,000 page views/day**: 10,000-20,000 DB queries/day
- **1M page views/month**: 1M-2M DB queries/month

### After Caching
- **Database queries**: ~1-2 per banner per 10 minutes (95-99% reduction)
- **10,000 page views/day**: ~100-200 DB queries/day (assuming 10 unique banners)
- **1M page views/month**: ~10K-20K DB queries/month

**Estimated reduction: 95-99%**

## Cache Invalidation

### Current Limitation
In-memory cache is per serverless function instance. When a banner is updated:
- Cache on that instance will be invalidated on next request (after TTL expires)
- Other instances may still serve cached version until TTL expires
- **Maximum delay**: 10 minutes

### When Banner is Updated
The cache will automatically refresh:
- When TTL expires (10 minutes max)
- On next request after update

### For Production at Scale
Consider upgrading to shared cache:
- **Vercel KV** ($20/month): Shared Redis cache across all instances
- **Upstash Redis** (free tier available): Serverless Redis
- **Redis Cloud** (various plans): Full Redis instance

Benefits of shared cache:
- Instant invalidation across all instances
- Better cache hit rates
- More predictable performance

## Monitoring

Check cache performance via response headers:
- `X-Cache: HIT` = Served from cache (no DB query)
- `X-Cache: MISS` = Fetched from database

Monitor in your analytics/logging:
```javascript
// Example: Log cache hit rate
const cacheStatus = response.headers.get('X-Cache')
if (cacheStatus === 'HIT') {
  // Increment cache hit counter
}
```

## Cost Savings

### Supabase Costs
- **Before**: High database load, potential connection limit issues
- **After**: Minimal database load, smooth performance
- **Cost**: Still $0-25/month (Free/Pro tier)

### Vercel Costs
- **Before**: More function invocations hitting database
- **After**: More cache hits = faster responses = lower compute time
- **Cost**: Potentially lower due to faster execution

## Configuration

To adjust cache TTL, modify `CACHE_TTL_MS` in `app/api/v1/banner.js/route.ts`:

```typescript
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes
```

Recommended values:
- **5 minutes**: More real-time updates, more DB queries
- **10 minutes**: Good balance (current)
- **15 minutes**: Maximum performance, slightly stale data
- **30 minutes**: Maximum performance, but updates take longer

## Future Improvements

1. **Shared Cache**: Migrate to Vercel KV or Redis for instant invalidation
2. **Cache Warming**: Pre-cache popular banners
3. **Cache Analytics**: Track hit rates and optimize TTL
4. **Selective Caching**: Cache only active banners, always fetch inactive ones fresh

