import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateBannerHTML, generateBannerCSS, generateBannerJS, generateConsentInitScript } from '@/lib/banner-generator'
import { RateLimit } from '@/lib/rate-limit'
import { SECURITY_HEADERS } from '@/lib/security-validation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'placeholder-key'
)

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
    
    // Fetch config by banner ID
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id,
        name,
        config,
        "isActive"
      `)
      .eq('id', bannerId)
      .single()
    
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
    
    if (!banner.isActive) {
      return new NextResponse('console.log("Cookie Banner: Banner is inactive");', { 
        headers: { 
          'Content-Type': 'application/javascript',
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
    
    return new NextResponse(combinedScript, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60', // Cache for 5 minutes
        'Access-Control-Allow-Origin': '*',
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
