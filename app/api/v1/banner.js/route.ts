import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-key'
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    
    if (!userId) {
      return new NextResponse('Missing user ID', { status: 400 })
    }
    
    // Fetch config
    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id,
        name,
        config,
        "isActive",
        Project!inner(
          userId
        )
      `)
      .eq('Project.userId', userId)
      .eq('isActive', true)
      .limit(1)
    
    if (error || !banners || banners.length === 0) {
      return new NextResponse('Config not found', { status: 404 })
    }
    
    const banner = banners[0]
    const config = typeof banner.config === 'string' 
      ? JSON.parse(banner.config) 
      : banner.config
    
    // Generate JavaScript code dynamically
    const bannerCode = generateBannerJS(userId, config)
    
    return new NextResponse(bannerCode, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Banner.js generation error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

function generateBannerJS(userId: string, config: any) {
  const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const gaIntegration = config.integrations?.googleAnalytics
  const gaEnabled = gaIntegration?.enabled && gaIntegration?.measurementId
  
  return `
(function() {
  const CONFIG = ${JSON.stringify(config)};
  const USER_ID = '${userId}';
  const API_BASE = '${API_BASE}';
  
  // GA4 configuration
  const GA_CONFIG = ${JSON.stringify(gaIntegration)};
  const GA_ENABLED = ${gaEnabled};
  
  // Event batching
  let eventQueue = [];
  let lastSendTime = Date.now();
  let bannerShownAt = null;
  
  // Check if returning visitor
  const isReturning = localStorage.getItem('cookie_banner_shown') === 'true';
  
  // GA4 initialization function
  function initGA4() {
    ${gaEnabled ? `
    // Inject GA4 script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${gaIntegration.measurementId}';
    document.head.appendChild(gaScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${gaIntegration.measurementId}', {
      ${gaIntegration.anonymizeIp ? "'anonymize_ip': true," : ''}
      'cookie_flags': 'SameSite=None;Secure'
    });
    ` : '// GA4 not configured'}
  }
  
  // Track consent event to GA4
  function trackConsentEvent(action) {
    if (!window.gtag) return;
    
    // Track consent events (accept/reject/dismiss)
    ${gaEnabled && gaIntegration.trackConsentEvents ? `
    if (action === 'accept' || action === 'reject' || action === 'dismiss') {
      gtag('event', 'cookie_consent', {
        'event_category': 'Cookie Consent',
        'event_label': action,
        'value': action === 'accept' ? 1 : 0
      });
    }
    ` : ''}
    
    // Track banner impressions
    ${gaEnabled && gaIntegration.trackImpressions ? `
    if (action === 'impression') {
      gtag('event', 'banner_impression', {
        'event_category': 'Cookie Banner',
        'event_label': 'banner_shown',
        'value': 1
      });
    }
    ` : ''}
  }
  
  function trackEvent(type, decisionTime = null) {
    eventQueue.push({
      type,
      decisionTime,
      isReturning
    });
    
    // Send batch if 10+ events OR 30 seconds elapsed
    if (eventQueue.length >= 10 || Date.now() - lastSendTime > 30000) {
      sendBatch();
    }
  }
  
  function sendBatch() {
    if (eventQueue.length === 0) return;
    
    fetch(API_BASE + '/api/v1/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: USER_ID,
        events: eventQueue
      })
    }).catch(() => {}); // Fail silently
    
    eventQueue = [];
    lastSendTime = Date.now();
  }
  
  // Send any remaining events before page unload
  window.addEventListener('beforeunload', sendBatch);
  
  // Create banner HTML
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = \`
      <div style="
        position: fixed;
        \${CONFIG.position === 'top' ? 'top: 0' : 'bottom: 0'};
        left: 0;
        right: 0;
        background: \${CONFIG.colors.background};
        color: \${CONFIG.colors.text};
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 99999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <div style="flex: 1; min-width: 300px;">
          <p style="margin: 0; line-height: 1.5;">\${CONFIG.text.message}</p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button id="cookie-accept" style="
            background: \${CONFIG.colors.acceptButton};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            \${CONFIG.text.acceptButton}
          </button>
          <button id="cookie-reject" style="
            background: \${CONFIG.colors.rejectButton};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            \${CONFIG.text.rejectButton}
          </button>
          <button id="cookie-dismiss" style="
            background: transparent;
            color: \${CONFIG.colors.text};
            border: 1px solid \${CONFIG.colors.text};
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
            ×
          </button>
        </div>
      </div>
    \`;
    
    document.body.appendChild(banner);
    bannerShownAt = Date.now();
    trackEvent('impression');
    trackConsentEvent('impression'); // Track GA4 impression
    
    // Mark as shown for returning visitor tracking
    localStorage.setItem('cookie_banner_shown', 'true');
    
    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', handleAccept);
    document.getElementById('cookie-reject').addEventListener('click', handleReject);
    document.getElementById('cookie-dismiss').addEventListener('click', handleDismiss);
  }
  
  function handleAccept() {
    const decisionTime = Date.now() - bannerShownAt;
    trackEvent('accept', decisionTime);
    sendBatch(); // Send immediately
    
    // Initialize GA4 on accept
    initGA4();
    trackConsentEvent('accept');
    
    // Inject user's scripts
    if (CONFIG.scripts && Array.isArray(CONFIG.scripts)) {
      CONFIG.scripts.forEach(script => {
        if (script.src) {
          const scriptTag = document.createElement('script');
          scriptTag.src = script.src;
          scriptTag.async = true;
          document.head.appendChild(scriptTag);
        } else if (script.code) {
          const scriptTag = document.createElement('script');
          scriptTag.textContent = script.code;
          document.head.appendChild(scriptTag);
        }
      });
    }
    
    localStorage.setItem('cookie_consent', 'accepted');
    hideBanner();
  }
  
  function handleReject() {
    const decisionTime = Date.now() - bannerShownAt;
    trackEvent('reject', decisionTime);
    sendBatch(); // Send immediately
    
    trackConsentEvent('reject');
    
    localStorage.setItem('cookie_consent', 'rejected');
    hideBanner();
  }
  
  function handleDismiss() {
    trackEvent('dismiss');
    sendBatch();
    
    trackConsentEvent('dismiss');
    
    hideBanner();
  }
  
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(' + (CONFIG.position === 'top' ? '-100%' : '100%') + ')';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => banner.remove(), 300);
    }
  }
  
  // Check if user already made a choice
  const consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    // Show banner after page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createBanner);
    } else {
      createBanner();
    }
  } else if (consent === 'accepted') {
    // Re-inject GA4 for returning visitors who accepted
    initGA4();
    
    // Re-inject scripts for returning visitors who accepted
    if (CONFIG.scripts && Array.isArray(CONFIG.scripts)) {
      CONFIG.scripts.forEach(script => {
        if (script.src) {
          const scriptTag = document.createElement('script');
          scriptTag.src = script.src;
          scriptTag.async = true;
          document.head.appendChild(scriptTag);
        } else if (script.code) {
          const scriptTag = document.createElement('script');
          scriptTag.textContent = script.code;
          document.head.appendChild(scriptTag);
        }
      });
    }
  }
})();
  `.trim()
}
