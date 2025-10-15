import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Helper function to verify JWT token
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

// Generate cookie banner code
function generateBannerCode(config: any) {
  const {
    title,
    message,
    primaryColor,
    textColor,
    acceptText,
    preferencesText,
    position
  } = config

  return `<!-- Cookie Consent Banner -->
<div id="cookie-banner" style="
    position: fixed;
    ${position === 'top' ? 'top: 0' : 'bottom: 0'};
    left: 0;
    right: 0;
    background: ${primaryColor};
    color: ${textColor};
    padding: 20px;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-shadow: ${position === 'top' ? '0 2px 10px rgba(0,0,0,0.1)' : '0 -2px 10px rgba(0,0,0,0.1)'};
    ${position === 'top' ? 'border-bottom: 1px solid rgba(0,0,0,0.1)' : 'border-top: 1px solid rgba(0,0,0,0.1)'};
">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
            <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: ${textColor};">${title}</h4>
            <p style="margin: 0; font-size: 14px; opacity: 0.9; color: ${textColor};">${message}</p>
        </div>
        <div style="display: flex; gap: 12px; flex-shrink: 0;">
            <button onclick="acceptAllCookies()" style="
                background: ${textColor};
                color: ${primaryColor};
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                ${acceptText}
            </button>
            <button onclick="showCookieSettings()" style="
                background: transparent;
                color: ${textColor};
                border: 1px solid ${textColor};
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                ${preferencesText}
            </button>
        </div>
    </div>
</div>

<script>
// Cookie Consent Functions
function acceptAllCookies() {
    // Set consent cookies
    document.cookie = 'cookie_consent=accepted; expires=' + new Date(Date.now() + 365*24*60*60*1000).toUTCString() + '; path=/';
    document.cookie = 'analytics_consent=true; expires=' + new Date(Date.now() + 365*24*60*60*1000).toUTCString() + '; path=/';
    document.cookie = 'marketing_consent=true; expires=' + new Date(Date.now() + 365*24*60*60*1000).toUTCString() + '; path=/';
    
    // Hide banner
    document.getElementById('cookie-banner').style.display = 'none';
    
    // Load analytics scripts here (Google Analytics, etc.)
    console.log('All cookies accepted - load your tracking scripts here');
    
    // Example: Load Google Analytics
    // gtag('consent', 'update', {
    //     'analytics_storage': 'granted',
    //     'ad_storage': 'granted'
    // });
}

function showCookieSettings() {
    // Simple settings modal (you can enhance this)
    const settings = confirm('Cookie Settings:\\n\\n1. Necessary cookies (always active)\\n2. Analytics cookies (currently disabled)\\n3. Marketing cookies (currently disabled)\\n\\nClick OK to accept all, Cancel to keep current settings.');
    
    if (settings) {
        acceptAllCookies();
    }
}

// Check if user has already consented
function checkConsent() {
    const consent = document.cookie.includes('cookie_consent=accepted');
    if (consent) {
        document.getElementById('cookie-banner').style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkConsent);
</script>

<!-- Add this to your <head> section for Google Analytics consent mode -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to denied
gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted'
});

// Update consent when user accepts
function updateConsent() {
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted'
    });
}
</script>`
}

// GET /api/banners/[id]/code - Get generated code for a banner
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select('id, config, userId')
      .eq('id', params.id)
      .eq('userId', user.userId)
      .single()

    if (error || !banner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      )
    }

    const config = banner.config || {}
    
    // Generate the code
    const code = generateBannerCode(config)

    return NextResponse.json({
      code,
      banner: {
        id: banner.id,
        title: config.title,
        message: config.message
      }
    })

  } catch (error) {
    console.error('Get banner code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
