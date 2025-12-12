# Banner API Cost Analysis & Optimization Plan

## Current Situation

### API Endpoint: `/api/v1/banner.js`
- **Called on:** Every page load for every visitor
- **Database queries per request:** 1-2 queries (SimpleBanners, fallback to ConsentBanner)
- **Current caching:** Browser-side only (5 minutes via Cache-Control header)
- **Rate limiting:** 100 requests/minute per IP (in-memory)

### Cost Breakdown

#### Supabase Pricing (as of 2024)
- **Free Tier:** 
  - 500MB database storage
  - 2GB bandwidth/month
  - 50,000 monthly active users
  - Unlimited API requests (within bandwidth limits)
  
- **Pro Tier ($25/month):**
  - 8GB database storage
  - 250GB bandwidth/month
  - 100,000 monthly active users
  - Unlimited API requests (within bandwidth limits)

#### Cost Scenarios

**Scenario 1: Small Site (10,000 page views/month)**
- Database queries: 10,000 - 20,000 queries/month
- Bandwidth: ~50MB/month (assuming 5KB per response)
- **Cost:** FREE (within free tier limits)

**Scenario 2: Medium Site (100,000 page views/month)**
- Database queries: 100,000 - 200,000 queries/month
- Bandwidth: ~500MB/month
- **Cost:** FREE (within free tier limits)

**Scenario 3: Large Site (1,000,000 page views/month)**
- Database queries: 1,000,000 - 2,000,000 queries/month
- Bandwidth: ~5GB/month
- **Cost:** $25/month (Pro tier) - still within limits

**Scenario 4: Very Large Site (10,000,000 page views/month)**
- Database queries: 10,000,000 - 20,000,000 queries/month
- Bandwidth: ~50GB/month
- **Cost:** $25/month (Pro tier) - still within 250GB limit

### The Real Cost: Database Load

While Supabase doesn't charge per query, **high query volume can:**
1. Slow down your database
2. Hit connection limits
3. Cause timeouts
4. Impact other operations

## Optimization Strategy

### 1. Server-Side Caching (CRITICAL)
**Current:** Every request hits the database
**Optimized:** Cache banner configs server-side for 5-15 minutes

**Impact:**
- Reduces database queries by 95-99%
- Faster response times
- Lower database load

### 2. CDN/Edge Caching
**Current:** Browser cache only
**Optimized:** Vercel Edge Cache + CDN

**Impact:**
- Serves from edge locations
- Reduces origin requests
- Faster global response times

### 3. Database Query Optimization
**Current:** 1-2 queries per request (with fallback)
**Optimized:** Single query with UNION or better indexing

**Impact:**
- Faster queries
- Lower database CPU usage

### 4. Response Compression
**Current:** Uncompressed JavaScript
**Optimized:** Gzip/Brotli compression

**Impact:**
- Reduces bandwidth by 70-80%
- Faster downloads

## Recommended Implementation Priority

1. **HIGH:** Server-side caching (in-memory or Redis/Vercel KV)
2. **HIGH:** CDN/Edge caching via Vercel
3. **MEDIUM:** Database query optimization
4. **LOW:** Response compression (Vercel handles this automatically)

## Estimated Cost Savings

With optimizations:
- **Database queries:** Reduced by 95-99%
- **Bandwidth:** Reduced by 70-80% (via compression + caching)
- **Response time:** Improved by 50-90%

## Cost at Scale

**Without optimization:**
- 10M page views/month = 10-20M database queries
- Risk of hitting connection limits
- Slower response times

**With optimization:**
- 10M page views/month = 50K-200K database queries (95% reduction)
- Smooth performance
- Fast response times
- **Cost:** Still $25/month (Pro tier)

## Conclusion

**Good news:** Supabase pricing is very generous. Even at high scale, you'll likely stay within the Pro tier ($25/month).

**Bad news:** Without caching, you'll hit performance issues before cost issues.

**Recommendation:** Implement server-side caching immediately to:
1. Reduce database load
2. Improve performance
3. Scale better
4. Stay within free tier longer

