import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateBannerHTML, generateBannerCSS, generateBannerJS, generateConsentInitScript } from '@/lib/banner-generator'
import { RateLimit } from '@/lib/rate-limit'
import { SECURITY_HEADERS } from '@/lib/security-validation'
// NOTE: In-memory banner cache removed intentionally.
// On Vercel serverless, each instance has its own memory — invalidating cache
// on one instance doesn't clear others, causing stale banners after updates.
// We rely on ETag/304 (database updatedAt) + short Cache-Control max-age instead.

// Lazy initialization to avoid build-time errors and ensure service role key is used
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Use service role key for public banner access (bypasses RLS)
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!url || !key) {
    throw new Error('Supabase configuration is missing')
  }

  return createClient(url, key, {
    global: {
      headers: {
        // Bypass Supabase/PostgREST/Kong caching to always get fresh data
        'Cache-Control': 'no-cache, no-store',
        'x-request-id': `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      }
    }
  })
}

// Rate limiter: 100 requests per minute per IP (generous for legitimate use)
const bannerScriptRateLimit = new RateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
})

// Validate banner ID format (UUID v4)
function isValidBannerId(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await bannerScriptRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      return new NextResponse('console.error("Cookie Banner: Rate limit exceeded. Please try again later.");', {
        status: 429,
        headers: {
          'Content-Type': 'application/javascript',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          ...SECURITY_HEADERS,
        },
      })
    }

    const { searchParams } = new URL(request.url)
    const bannerId = searchParams.get('id')
    
    if (!bannerId) {
      return new NextResponse('console.error("Cookie Banner: Missing banner ID");', { 
        status: 400,
        headers: { 
          'Content-Type': 'application/javascript',
          ...SECURITY_HEADERS,
        }
      })
    }

    // Validate banner ID format to prevent injection attacks
    if (!isValidBannerId(bannerId)) {
      return new NextResponse('console.error("Cookie Banner: Invalid banner ID format");', { 
        status: 400,
        headers: { 
          'Content-Type': 'application/javascript',
          ...SECURITY_HEADERS,
        }
      })
    }
    
    // Fetch updatedAt from DB for ETag generation
    // This is the source of truth for cache invalidation across serverless instances
    const supabase = getSupabaseClient()

    // Quick query to get just updatedAt for ETag
    let updatedAt: number | null = null
    const { data: bannerMeta } = await supabase
      .from('SimpleBanners')
      .select('"updatedAt"')
      .eq('id', bannerId)
      .single()

    if (bannerMeta?.updatedAt) {
      updatedAt = new Date(bannerMeta.updatedAt).getTime()
    } else {
      // Fallback to ConsentBanner
      const { data: consentMeta } = await supabase
        .from('ConsentBanner')
        .select('"updatedAt"')
        .eq('id', bannerId)
        .single()

      if (consentMeta?.updatedAt) {
        updatedAt = new Date(consentMeta.updatedAt).getTime()
      }
    }

    // Generate ETag based on database updatedAt (source of truth)
    const etag = updatedAt ? `"${bannerId}-${updatedAt}"` : `"${bannerId}-${Date.now()}"`
    const ifNoneMatch = request.headers.get('if-none-match')

    // If client has matching ETag (same updatedAt), return 304 Not Modified
    // The ETag is based on database timestamp, so this works correctly across serverless instances
    if (ifNoneMatch === etag && updatedAt) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'private, no-cache, must-revalidate',
          'X-Cache': 'NOT-MODIFIED',
          ...SECURITY_HEADERS,
        },
      })
    }

    // Fetch full banner from database
    // No in-memory cache — every request gets fresh data from DB, with ETag/304 for browser caching
    // Try SimpleBanners first (new system)
    let banner: any = null
    let error: any = null
    
    // First try SimpleBanners table
    const { data: simpleBanner, error: simpleError } = await supabase
      .from('SimpleBanners')
      .select('id, name, config, "isActive", "updatedAt", "userId"')
      .eq('id', bannerId)
      .single()

    if (!simpleError && simpleBanner) {
      banner = simpleBanner
    } else {
      // Fallback to ConsentBanner table (legacy system)
      const { data: consentBanner, error: consentError } = await supabase
        .from('ConsentBanner')
        .select('id, name, config, "isActive", "updatedAt"')
        .eq('id', bannerId)
        .single()
      
      if (!consentError && consentBanner) {
        banner = consentBanner
      } else {
        error = consentError || simpleError
      }
    }
    
    if (error || !banner) {
      console.error('Banner fetch error:', error)
      return new NextResponse('console.error("Cookie Banner: Config not found");', { 
        status: 404,
        headers: { 
          'Content-Type': 'application/javascript',
          ...SECURITY_HEADERS,
        }
      })
    }
    
    // Use updatedAt from banner (already fetched above)
    const bannerUpdatedAt = banner.updatedAt ? new Date(banner.updatedAt).getTime() : Date.now()
    const finalEtag = `"${bannerId}-${bannerUpdatedAt}"`
    
    if (!banner.isActive) {
      // Check if client has cached version (304 Not Modified)
      if (ifNoneMatch === finalEtag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': finalEtag,
            'Cache-Control': 'private, no-cache, must-revalidate',
            ...SECURITY_HEADERS,
          },
        })
      }
      
      return new NextResponse('console.log("Cookie Banner: Banner is inactive");', { 
        headers: { 
          'Content-Type': 'application/javascript',
          'Cache-Control': 'private, no-cache, must-revalidate',
          'ETag': finalEtag,
          'X-Cache': 'MISS',
          ...SECURITY_HEADERS,
        }
      })
    }
    
    const config = typeof banner.config === 'string' 
      ? JSON.parse(banner.config) 
      : banner.config
    
    // Look up banner owner's plan tier and analytics setting
    let ownerPlanTier = 'free'
    let ownerAnalyticsEnabled = false
    const bannerUserId = banner.userId || null
    if (bannerUserId) {
      const { data: bannerOwner } = await supabase
        .from('User')
        .select('planTier, analytics_enabled')
        .eq('id', bannerUserId)
        .single()
      if (bannerOwner?.planTier) {
        ownerPlanTier = bannerOwner.planTier
      }
      ownerAnalyticsEnabled = Boolean(bannerOwner?.analytics_enabled)
    } else {
      // For ConsentBanner (legacy), look up via project -> team -> owner
      try {
        const { data: consentBannerFull } = await supabase
          .from('ConsentBanner')
          .select('projectId')
          .eq('id', bannerId)
          .single()
        if (consentBannerFull?.projectId) {
          const { data: project } = await supabase
            .from('Project')
            .select('userId')
            .eq('id', consentBannerFull.projectId)
            .single()
          if (project?.userId) {
            const { data: owner } = await supabase
              .from('User')
              .select('planTier')
              .eq('id', project.userId)
              .single()
            if (owner?.planTier) {
              ownerPlanTier = owner.planTier
            }
          }
        }
      } catch (e) {
        // Default to free tier on error
      }
    }

    const showBranding = ownerPlanTier === 'free' || config.branding?.showPoweredBy !== false

    // Strip GA4 integration for free users (server-side enforcement)
    if (ownerPlanTier === 'free' && config.integrations?.googleAnalytics) {
      config.integrations.googleAnalytics.enabled = false
    }

    // Generate all components
    const html = generateBannerHTML(config, { showBranding })
    const css = generateBannerCSS(config)
    const js = generateBannerJS(config)
    const consentInit = generateConsentInitScript()
    
    // Extract the inner JS from the consent init script tag
    const consentInitJs = consentInit
      .replace('<script>', '')
      .replace('</script>', '')
      .trim()

    // Build internal analytics tracking code (only when analytics is enabled)
    const analyticsUserId = ownerAnalyticsEnabled ? (bannerUserId || '') : ''
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
    const internalAnalyticsJs = `
  // Internal Analytics Tracking
  var _cbAnalyticsUserId = ${JSON.stringify(analyticsUserId)};
  var _cbTrackUrl = ${JSON.stringify(baseUrl + '/api/v1/track')};
  var _cbBannerShownAt = 0;
  var _cbEventQueue = [];
  var _cbFlushTimer = null;

  function _cbQueueEvent(type, extra) {
    if (!_cbAnalyticsUserId) return;
    var evt = { type: type };
    if (extra) {
      if (extra.decisionTime) evt.decisionTime = extra.decisionTime;
      if (extra.isReturning) evt.isReturning = true;
    }
    _cbEventQueue.push(evt);
    // Debounce: flush after 1s of no new events, or immediately if queue has 5+
    if (_cbFlushTimer) clearTimeout(_cbFlushTimer);
    if (_cbEventQueue.length >= 5) {
      _cbFlushEvents();
    } else {
      _cbFlushTimer = setTimeout(_cbFlushEvents, 1000);
    }
  }

  function _cbFlushEvents() {
    if (_cbEventQueue.length === 0) return;
    var batch = _cbEventQueue.splice(0, 10);
    var payload = JSON.stringify({ userId: _cbAnalyticsUserId, events: batch });
    try {
      var sent = false;
      if (navigator.sendBeacon) {
        sent = navigator.sendBeacon(_cbTrackUrl, new Blob([payload], { type: 'application/json' }));
      }
      if (!sent) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', _cbTrackUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(payload);
      }
    } catch(e) {}
  }

  // Flush remaining events when page unloads
  if (typeof addEventListener !== 'undefined') {
    addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') _cbFlushEvents();
    });
  }
`

    // Combine into a single executable script
    const combinedScript = `
(function() {
  // 1. Initialize Consent Mode (Critical)
  ${consentInitJs}

  // 1b. Internal Analytics
  ${internalAnalyticsJs}

  // 2. Inject CSS
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(css)};
  document.head.appendChild(style);

  // 3. Inject HTML
  // Uses retry logic and MutationObserver for compatibility with page builders
  // (Brizy, Elementor, Divi, etc.) that may rebuild the DOM after initial load
  // Note: bannerHTMLContent is server-generated from trusted config, not user-supplied HTML
  // Hook into trackConsentEvent for internal analytics
  // This runs before the banner JS defines trackConsentEvent, so we
  // set up a global hook that the banner JS will call
  function _cbInternalTrack(action) {
    if (action === 'impression') {
      _cbBannerShownAt = Date.now();
      var isReturning = document.cookie.indexOf('cookie_consent=') !== -1;
      _cbQueueEvent('impression', { isReturning: isReturning });
    } else if (action === 'accept' || action === 'reject' || action === 'dismiss') {
      var decisionTime = _cbBannerShownAt > 0 ? Date.now() - _cbBannerShownAt : null;
      _cbQueueEvent(action, { decisionTime: decisionTime });
    }
  }

  var bannerInjected = false;
  var bannerHTMLContent = ${JSON.stringify(html)};
  var bannerJSInit = function() {
    ${js}
  };

  function injectBannerHTML() {
    if (!document.body) {
      setTimeout(injectBannerHTML, 50);
      return;
    }

    // Prevent duplicate injection
    if (document.getElementById('cookie-consent-banner')) {
      if (!bannerInjected) {
        bannerInjected = true;
        bannerJSInit();
      }
      return;
    }

    // Create a container and parse the server-generated banner markup
    var container = document.createElement('div');
    container.innerHTML = bannerHTMLContent;

    // Append all child elements to body
    while (container.firstChild) {
      document.body.appendChild(container.firstChild);
    }

    bannerInjected = true;

    // 4. Execute Banner Logic
    bannerJSInit();
  }

  // Watch for page builders that rebuild the DOM and remove our elements
  function watchForBannerRemoval() {
    if (typeof MutationObserver === 'undefined') return;
    var observer = new MutationObserver(function() {
      if (bannerInjected && !document.getElementById('cookie-consent-banner') && document.body) {
        // Banner was removed (likely by a page builder re-rendering the DOM)
        bannerInjected = false;
        injectBannerHTML();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Stop watching after 30s (page builders should be done by then)
    setTimeout(function() { observer.disconnect(); }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectBannerHTML();
      watchForBannerRemoval();
    });
  } else {
    injectBannerHTML();
    watchForBannerRemoval();
  }
})();
`
    
    // Check if client has cached version (304 Not Modified)
    // This is the key: when banner updates, updatedAt changes, ETag changes, browser re-fetches automatically
    if (ifNoneMatch === finalEtag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': finalEtag,
          'Cache-Control': 'private, no-cache, must-revalidate',
          'X-Cache': 'HIT',
          ...SECURITY_HEADERS,
        },
      })
    }
    
    return new NextResponse(combinedScript, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'private, no-cache, must-revalidate',
        'CDN-Cache-Control': 'no-store', // Prevent CDN caching (Vercel, Cloudflare, Brizy, etc.)
        'Surrogate-Control': 'no-store', // Prevent CDN caching (Fastly, Akamai, etc.)
        'ETag': finalEtag,
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        ...SECURITY_HEADERS,
      },
    })
  } catch (error) {
    console.error('Banner.js generation error:', error)
    return new NextResponse('console.error("Cookie Banner: Internal server error");', { 
      status: 500,
      headers: { 
        'Content-Type': 'application/javascript',
        ...SECURITY_HEADERS,
      }
    })
  }
}
