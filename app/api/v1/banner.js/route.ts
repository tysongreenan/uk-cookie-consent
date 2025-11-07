import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-key'
)

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bannerId = searchParams.get('id')
    
    if (!bannerId) {
      return new NextResponse('Missing banner ID', { status: 400 })
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
      console.error('Banner ID searched:', bannerId)
      return new NextResponse('Config not found', { status: 404 })
    }
    
    console.log('Banner found:', banner.id, 'Active:', banner.isActive)
    
    const config = typeof banner.config === 'string' 
      ? JSON.parse(banner.config) 
      : banner.config
    
    // Generate JavaScript code dynamically
    const bannerCode = generateBannerJS(bannerId, config)
    
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

function generateBannerJS(bannerId: string, config: any) {
  // For now, return a simple banner until we can properly import the code generator
  return `
(function() {
  'use strict';
  
  var COOKIE_NAME = 'cookie_consent';
  var COOKIE_EXPIRY = 90;
  
  // Create banner HTML
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = \`
      <div style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        color: #1f2937;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
      ">
        <div style="flex: 1; min-width: 300px;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">We use cookies</h3>
          <p style="margin: 0; line-height: 1.5;">This website uses cookies to enhance your browsing experience and provide personalized content.</p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button id="cookie-accept" style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            Accept All
          </button>
          <button id="cookie-reject" style="
            background: transparent;
            color: #3b82f6;
            border: 1px solid #3b82f6;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            Reject
          </button>
        </div>
      </div>
    \`;
    
    document.body.appendChild(banner);
    
    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', handleAccept);
    document.getElementById('cookie-reject').addEventListener('click', handleReject);
  }
  
  function handleAccept() {
    localStorage.setItem('cookie_consent', 'accepted');
    hideBanner();
  }
  
  function handleReject() {
    localStorage.setItem('cookie_consent', 'rejected');
    hideBanner();
  }
  
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(100%)';
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
  }
})();
  `;
}
