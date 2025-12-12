import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateBannerHTML, generateBannerCSS, generateBannerJS, generateConsentInitScript } from '@/lib/banner-generator'
import { RateLimit } from '@/lib/rate-limit'
import { SECURITY_HEADERS } from '@/lib/security-validation'
import { 
  bannerCache, 
  CACHE_TTL_MS, 
  getCachedBanner, 
  setCachedBanner, 
  cleanupExpiredCache 
} from '@/lib/banner-cache'

// Lazy initialization to avoid build-time errors and ensure service role key is used
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Use service role key for public banner access (bypasses RLS)
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  
  if (!url || !key) {
    throw new Error('Supabase configuration is missing')
  }
  
  return createClient(url, key)
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
    const nocache = searchParams.get('nocache') === 'true' // Allow cache bypass for testing
    
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
    
    // Clean up expired cache entries occasionally (1% chance per request)
    if (Math.random() < 0.01) {
      cleanupExpiredCache()
    }
    
    // Check server-side cache first (reduces database queries by 95%+)
    // Skip cache if nocache parameter is set (for testing/updates)
    const cached = nocache ? null : getCachedBanner(bannerId)
    
    // Always fetch updatedAt from DB for ETag generation (lightweight query)
    // This ensures proper HTTP caching even with server-side cache
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
    
    // Generate ETag for conditional requests
    const etag = updatedAt ? `"${bannerId}-${updatedAt}"` : `"${bannerId}-${Date.now()}"`
    const ifNoneMatch = request.headers.get('if-none-match')
    
    // If client has matching ETag, return 304 Not Modified
    if (ifNoneMatch === etag && cached) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
          'X-Cache': 'HIT',
          ...SECURITY_HEADERS,
        },
      })
    }
    
    // If we have cached script and banner is active, return it with ETag
    if (cached && cached.isActive) {
      console.log(`📦 Banner cache HIT for: ${bannerId}`)
      return new NextResponse(cached.script, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
          'ETag': etag,
          'Access-Control-Allow-Origin': '*',
          'X-Cache': 'HIT',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          ...SECURITY_HEADERS,
        },
      })
    }
    
    if (cached && !cached.isActive) {
      console.log(`📦 Banner cache HIT (inactive) for: ${bannerId}`)
      return new NextResponse('console.log("Cookie Banner: Banner is inactive");', { 
        headers: { 
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
          'ETag': etag,
          'X-Cache': 'HIT',
          ...SECURITY_HEADERS,
        }
      })
    }
    
    console.log(`📦 Banner cache MISS for: ${bannerId}`)
    
    // Cache miss - fetch full banner from database
    
    // Fetch config by banner ID from SimpleBanners table (using service role to bypass RLS)
    // Try SimpleBanners first (new system)
    let banner: any = null
    let error: any = null
    
    // First try SimpleBanners table
    const { data: simpleBanner, error: simpleError } = await supabase
      .from('SimpleBanners')
      .select('id, name, config, "isActive", "updatedAt"')
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
    
    // Cache inactive banners too (to avoid repeated DB queries)
    if (!banner.isActive) {
      setCachedBanner(bannerId, {
        script: 'console.log("Cookie Banner: Banner is inactive");',
        isActive: false
      })
      
      // Check if client has cached version (304 Not Modified)
      if (ifNoneMatch === finalEtag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': finalEtag,
            'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
            ...SECURITY_HEADERS,
          },
        })
      }
      
      return new NextResponse('console.log("Cookie Banner: Banner is inactive");', { 
        headers: { 
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
          'ETag': finalEtag,
          'X-Cache': 'MISS',
          ...SECURITY_HEADERS,
        }
      })
    }
    
    const config = typeof banner.config === 'string' 
      ? JSON.parse(banner.config) 
      : banner.config
    
    // Generate all components
    const html = generateBannerHTML(config)
    const css = generateBannerCSS(config)
    const js = generateBannerJS(config)
    const consentInit = generateConsentInitScript()
    
    // Extract the inner JS from the consent init script tag
    const consentInitJs = consentInit
      .replace('<script>', '')
      .replace('</script>', '')
      .trim()

    // Combine into a single executable script
    const combinedScript = `
(function() {
  // 1. Initialize Consent Mode (Critical)
  ${consentInitJs}

  // 2. Inject CSS
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(css)};
  document.head.appendChild(style);

  // 3. Inject HTML
  // We need to wait for body to be available
  function injectHTML() {
    if (!document.body) {
      setTimeout(injectHTML, 10);
      return;
    }

    // Prevent duplicate injection
    if (document.getElementById('cookie-consent-banner')) {
      return;
    }
    
    // Prevent duplicate injection
    if (document.getElementById('cookie-consent-banner')) {
      return;
    }
    
    // Prevent duplicate injection
    if (document.getElementById('cookie-consent-banner')) {
      return;
    }
    
    var div = document.createElement('div');
    div.innerHTML = ${JSON.stringify(html)};
    
    // Append all children to body
    while (div.firstChild) {
      document.body.appendChild(div.firstChild);
    }
    
    // 4. Execute Banner Logic
    ${js}
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHTML);
  } else {
    injectHTML();
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
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=10',
          'X-Cache': 'HIT',
          ...SECURITY_HEADERS,
        },
      })
    }
    
    // Cache the generated script (shared cache can be invalidated from update endpoints)
    setCachedBanner(bannerId, {
      script: combinedScript,
      isActive: true
    })
    
    return new NextResponse(combinedScript, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=10', // Reduced for faster updates
        'ETag': finalEtag, // ETag based on updatedAt - changes when banner updates
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS', // Indicates this was fetched from database
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
