# Cookie Banner GTM Analytics Implementation Plan

## 🎯 Project Overview

Transform your cookie consent banner into a compliance tool that integrates with Google Analytics 4 via Google Tag Manager events.

**Current State:**
- Users customize banner in dashboard
- Users copy/paste full code into their website
- No analytics tracking
- No recurring revenue

**Target State:**
- Users customize banner in dashboard
- Users embed lightweight script: `<script src="https://yourapp.com/api/banner.js?id={userId}"></script>`
- Banner fires GTM events (accepts, rejects, impressions, time-to-decision)
- Events flow directly into their GA4 → Looker Studio
- Tiered pricing with analytics add-on

**Key Benefits:**
- ✅ Zero backend infrastructure for analytics
- ✅ Zero ongoing costs (no API calls to track)
- ✅ Customers use their own analytics tools
- ✅ More powerful for customers (full GA4/Looker Studio capabilities)
- ✅ Faster to build (days, not weeks)

---

## 📊 Phase 1: Database Schema (Supabase) - MINIMAL

We only need to store user settings, not analytics data (that goes to their GA4).

### Step 1.1: Add Subscription Fields to User Settings

```sql
-- Add subscription/analytics fields to existing user settings table
ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free' 
  CHECK (subscription_tier IN ('free', 'starter', 'agency', 'agency_pro', 'enterprise'));

ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS analytics_enabled boolean DEFAULT false;

ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS max_websites integer DEFAULT 1;

ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS stripe_customer_id text;

ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS stripe_subscription_id text;

-- Add index
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription 
ON user_settings(user_id, analytics_enabled);
```

That's it for database! No analytics tables needed.

---

## 🔧 Phase 2: Banner.js with GTM Events

### Step 2.1: Update Config Endpoint

**File:** `app/api/v1/config/[userId]/route.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(request, { params }) {
  const { userId } = params
  
  // Fetch user's banner configuration
  const { data: config, error: configError } = await supabase
    .from('banner_configs')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  // Fetch user's subscription settings
  const { data: settings, error: settingsError } = await supabase
    .from('user_settings')
    .select('analytics_enabled, subscription_tier')
    .eq('user_id', userId)
    .single()
  
  if (configError || !config) {
    return Response.json({ error: 'Configuration not found' }, { status: 404 })
  }
  
  return Response.json({
    colors: config.colors,
    text: config.text,
    position: config.position,
    buttons: config.buttons,
    scripts: config.scripts,
    analyticsEnabled: settings?.analytics_enabled || false
  })
}
```

### Step 2.2: Enhanced Banner.js with GTM Events

**File:** `app/api/v1/banner.js/route.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  
  if (!userId) {
    return new Response('Missing user ID', { status: 400 })
  }
  
  // Fetch config and settings
  const { data: config } = await supabase
    .from('banner_configs')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  const { data: settings } = await supabase
    .from('user_settings')
    .select('analytics_enabled')
    .eq('user_id', userId)
    .single()
  
  if (!config) {
    return new Response('Config not found', { status: 404 })
  }
  
  const bannerCode = generateBannerJS(config, settings?.analytics_enabled || false)
  
  return new Response(bannerCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'Access-Control-Allow-Origin': '*',
    },
  })
}

function generateBannerJS(config, analyticsEnabled) {
  return `
(function() {
  'use strict';
  
  const CONFIG = ${JSON.stringify(config)};
  const ANALYTICS_ENABLED = ${analyticsEnabled};
  
  let bannerShownAt = null;
  const isReturning = localStorage.getItem('cookie_banner_shown') === 'true';
  
  // GTM Event Tracking
  function trackEvent(action, metadata = {}) {
    if (!ANALYTICS_ENABLED) return;
    
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Push event to GTM
    window.dataLayer.push({
      'event': 'cookie_consent',
      'consent_action': action,
      'consent_category': 'compliance',
      ...metadata
    });
    
    // Debug logging (remove in production)
    if (window.location.hostname === 'localhost') {
      console.log('[Cookie Banner] GTM Event:', action, metadata);
    }
  }
  
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
          <p style="margin: 0; font-size: 14px; line-height: 1.5;">\${CONFIG.text.message}</p>
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
            font-weight: 500;
            font-size: 14px;
            transition: opacity 0.2s;
          " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            \${CONFIG.text.rejectButton}
          </button>
          <button id="cookie-dismiss" style="
            background: transparent;
            color: \${CONFIG.colors.text};
            border: 1px solid \${CONFIG.colors.text};
            padding: 12px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
            transition: background 0.2s;
          " onmouseover="this.style.background='rgba(0,0,0,0.05)'" onmouseout="this.style.background='transparent'">
            ×
          </button>
        </div>
      </div>
    \`;
    
    document.body.appendChild(banner);
    bannerShownAt = Date.now();
    
    // Track impression
    trackEvent('impression', {
      'consent_is_returning_visitor': isReturning,
      'consent_banner_position': CONFIG.position
    });
    
    // Mark as shown
    localStorage.setItem('cookie_banner_shown', 'true');
    
    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', handleAccept);
    document.getElementById('cookie-reject').addEventListener('click', handleReject);
    document.getElementById('cookie-dismiss').addEventListener('click', handleDismiss);
  }
  
  function handleAccept() {
    const decisionTimeSeconds = ((Date.now() - bannerShownAt) / 1000).toFixed(2);
    
    // Track accept event
    trackEvent('accept', {
      'consent_time_to_decision_seconds': parseFloat(decisionTimeSeconds),
      'consent_is_returning_visitor': isReturning
    });
    
    // Inject user's tracking scripts
    CONFIG.scripts.forEach(script => {
      const scriptTag = document.createElement('script');
      if (script.src) {
        scriptTag.src = script.src;
        scriptTag.async = true;
      } else if (script.code) {
        scriptTag.textContent = script.code;
      }
      if (script.id) scriptTag.id = script.id;
      document.head.appendChild(scriptTag);
    });
    
    // Update consent mode for GA4 (if using consent mode)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
    
    localStorage.setItem('cookie_consent', 'accepted');
    hideBanner();
  }
  
  function handleReject() {
    const decisionTimeSeconds = ((Date.now() - bannerShownAt) / 1000).toFixed(2);
    
    // Track reject event
    trackEvent('reject', {
      'consent_time_to_decision_seconds': parseFloat(decisionTimeSeconds),
      'consent_is_returning_visitor': isReturning
    });
    
    // Update consent mode for GA4 (if using consent mode)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
    
    localStorage.setItem('cookie_consent', 'rejected');
    hideBanner();
  }
  
  function handleDismiss() {
    // Track dismiss event (no decision time since they didn't make a choice)
    trackEvent('dismiss', {
      'consent_is_returning_visitor': isReturning
    });
    
    hideBanner();
  }
  
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.3s';
      setTimeout(() => banner.remove(), 300);
    }
  }
  
  // Check if user already made a choice
  const consent = localStorage.getItem('cookie_consent');
  
  if (!consent) {
    // First time visitor - show banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createBanner);
    } else {
      createBanner();
    }
  } else if (consent === 'accepted') {
    // Returning visitor who previously accepted - re-inject scripts
    CONFIG.scripts.forEach(script => {
      const scriptTag = document.createElement('script');
      if (script.src) {
        scriptTag.src = script.src;
        scriptTag.async = true;
      } else if (script.code) {
        scriptTag.textContent = script.code;
      }
      if (script.id) scriptTag.id = script.id;
      document.head.appendChild(scriptTag);
    });
    
    // Update consent mode
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  }
})();
  `.trim()
}
```

---

## 📈 Phase 3: User Dashboard Updates

### Step 3.1: Settings Page - Analytics Toggle

**File:** `app/dashboard/settings/page.jsx`

```javascript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function SettingsPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [subscriptionTier, setSubscriptionTier] = useState('free')
  const [userId, setUserId] = useState(null)
  const [copied, setCopied] = useState(false)
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  )
  
  useEffect(() => {
    fetchSettings()
  }, [])
  
  async function fetchSettings() {
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user.id)
    
    const { data } = await supabase
      .from('user_settings')
      .select('analytics_enabled, subscription_tier')
      .eq('user_id', user.id)
      .single()
    
    if (data) {
      setAnalyticsEnabled(data.analytics_enabled)
      setSubscriptionTier(data.subscription_tier)
    }
  }
  
  async function handleToggleAnalytics() {
    if (subscriptionTier === 'free') {
      alert('Please upgrade to enable analytics')
      return
    }
    
    const newValue = !analyticsEnabled
    
    const { error } = await supabase
      .from('user_settings')
      .update({ analytics_enabled: newValue })
      .eq('user_id', userId)
    
    if (!error) {
      setAnalyticsEnabled(newValue)
    }
  }
  
  function copyEmbedCode() {
    const code = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/api/v1/banner.js?id=${userId}"></script>`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      {/* Subscription Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium capitalize">{subscriptionTier} Plan</p>
            <p className="text-sm text-gray-600">
              {subscriptionTier === 'free' 
                ? 'Upgrade to enable analytics' 
                : 'Analytics integration enabled'}
            </p>
          </div>
          {subscriptionTier === 'free' && (
            <a 
              href="/pricing"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            >
              Upgrade
            </a>
          )}
        </div>
      </div>
      
      {/* Analytics Toggle */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Analytics Integration</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="font-medium mb-1">Enable GTM Event Tracking</p>
            <p className="text-sm text-gray-600">
              Send cookie consent events to Google Tag Manager / Google Analytics 4
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={analyticsEnabled}
              onChange={handleToggleAnalytics}
              disabled={subscriptionTier === 'free'}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {subscriptionTier === 'free' && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
            <p className="font-semibold text-blue-900 mb-1">🚀 Upgrade to unlock analytics</p>
            <p className="text-blue-700">
              Track acceptance rates, time-to-decision, and estimate your true website traffic in Google Analytics 4 and Looker Studio.
            </p>
          </div>
        )}
        
        {analyticsEnabled && (
          <div className="bg-green-50 border border-green-200 rounded p-4 text-sm mt-4">
            <p className="font-semibold text-green-900 mb-2">✅ Analytics enabled</p>
            <p className="text-green-700 mb-2">
              Your banner will now send these events to Google Tag Manager:
            </p>
            <ul className="text-green-700 text-xs space-y-1 ml-4">
              <li>• <code className="bg-green-100 px-1 rounded">cookie_consent</code> (impression, accept, reject, dismiss)</li>
              <li>• <code className="bg-green-100 px-1 rounded">consent_time_to_decision_seconds</code></li>
              <li>• <code className="bg-green-100 px-1 rounded">consent_is_returning_visitor</code></li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Embed Code */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add this code to your website's <code className="bg-gray-100 px-2 py-1 rounded">&lt;head&gt;</code> section:
        </p>
        <div className="bg-gray-50 border rounded p-4 mb-4 font-mono text-sm overflow-x-auto">
          <code>&lt;script src="{process.env.NEXT_PUBLIC_APP_URL}/api/v1/banner.js?id={userId}"&gt;&lt;/script&gt;</code>
        </div>
        <button 
          onClick={copyEmbedCode}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm font-semibold"
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
        
        {analyticsEnabled && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold mb-2">📊 Setup Google Tag Manager (Optional)</h3>
            <p className="text-sm text-gray-600 mb-3">
              To track these events in GA4, ensure Google Tag Manager is installed on your site. 
              <a href="/docs/gtm-setup" className="text-blue-600 hover:underline ml-1">
                View setup guide →
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## 📘 Phase 4: Documentation & Setup Guide

### Step 4.1: GTM Setup Documentation

**File:** `app/docs/gtm-setup/page.jsx`

```javascript
export default function GTMSetupGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 prose prose-blue">
      <h1>Google Tag Manager Setup Guide</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
        <p className="font-semibold">Prerequisites:</p>
        <ul className="text-sm mb-0">
          <li>Google Tag Manager installed on your website</li>
          <li>Google Analytics 4 property created</li>
          <li>Analytics add-on enabled in your account</li>
        </ul>
      </div>
      
      <h2>Step 1: Verify GTM Installation</h2>
      <p>Make sure you have the GTM container code in your website's <code>&lt;head&gt;</code>:</p>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto"><code>{`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`}</code></pre>
      
      <h2>Step 2: Events Automatically Tracked</h2>
      <p>Once your cookie banner is installed, it will automatically push these events to <code>dataLayer</code>:</p>
      
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Event Name</th>
            <th className="p-2 text-left">When It Fires</th>
            <th className="p-2 text-left">Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-t"><code>cookie_consent</code></td>
            <td className="p-2 border-t">Banner shown, accepted, rejected, or dismissed</td>
            <td className="p-2 border-t text-xs">
              • consent_action<br/>
              • consent_time_to_decision_seconds<br/>
              • consent_is_returning_visitor
            </td>
          </tr>
        </tbody>
      </table>
      
      <h2>Step 3: View Events in GA4</h2>
      <ol>
        <li>Go to your GA4 property</li>
        <li>Navigate to <strong>Reports → Realtime</strong></li>
        <li>Trigger your cookie banner on your website</li>
        <li>You should see <code>cookie_consent</code> events appear in real-time</li>
      </ol>
      
      <h2>Step 4: Create Custom Dimensions (Optional)</h2>
      <p>To segment data by consent action or decision time:</p>
      <ol>
        <li>Go to <strong>Admin → Custom Definitions → Custom Dimensions</strong></li>
        <li>Click <strong>Create Custom Dimension</strong></li>
        <li>Add these dimensions:
          <ul>
            <li><strong>Consent Action</strong> → Event parameter: <code>consent_action</code></li>
            <li><strong>Time to Decision</strong> → Event parameter: <code>consent_time_to_decision_seconds</code></li>
            <li><strong>Returning Visitor</strong> → Event parameter: <code>consent_is_returning_visitor</code></li>
          </ul>
        </li>
      </ol>
      
      <h2>Step 5: Build Reports in Looker Studio</h2>
      <p>Connect your GA4 property to Looker Studio and create reports showing:</p>
      <ul>
        <li>📊 Consent acceptance rate over time</li>
        <li>⏱️ Average time to decision</li>
        <li>🔄 Returning vs new visitor behavior</li>
        <li>🌍 Consent rates by country/device/traffic source</li>
      </ul>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
        <p className="font-semibold mb-2">🎉 You're all set!</p>
        <p className="text-sm mb-0">
          Your cookie consent data is now flowing into Google Analytics 4. 
          You can build custom reports, export to BigQuery, or use any analytics tool that connects to GA4.
        </p>
      </div>
      
      <h2>Troubleshooting</h2>
      <details className="my-4">
        <summary className="cursor-pointer font-semibold">Events not showing up in GA4?</summary>
        <ul className="text-sm mt-2">
          <li>Check that GTM is properly installed (use GTM Preview mode)</li>
          <li>Verify analytics is enabled in your account settings</li>
          <li>Make sure your embed script is in the <code>&lt;head&gt;</code> section</li>
          <li>Clear browser cache and test in incognito mode</li>
          <li>Check browser console for any JavaScript errors</li>
        </ul>
      </details>
      
      <details className="my-4">
        <summary className="cursor-pointer font-semibold">How long until I see data?</summary>
        <p className="text-sm mt-2">
          Events appear in <strong>Realtime reports</strong> within seconds. 
          Standard reports may take 24-48 hours to populate fully.
        </p>
      </details>
    </div>
  )
}
```

---

## 💳 Phase 5: Pricing Page

### Step 5.1: Updated Pricing Component

**File:** `app/pricing/page.jsx`

```javascript
'use client'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Unlimited banner customization',
        'Script injection on consent',
        'Up to 1 website',
        '❌ No analytics integration'
      ],
      cta: 'Get Started',
      tier: 'free'
    },
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'For individual websites',
      features: [
        'Everything in Free',
        '✅ GTM event tracking',
        'Up to 5 websites',
        'GA4 & Looker Studio integration',
        'Pre-built dashboard templates',
        'Setup documentation'
      ],
      cta: 'Start Free Trial',
      tier: 'starter',
      popular: true
    },
    {
      name: 'Agency',
      price: '$19',
      period: '/month',
      description: 'For agencies & multi-site businesses',
      features: [
        'Everything in Starter',
        'Up to 25 websites',
        'Just $0.76 per site',
        'Consolidated reporting',
        'Priority support',
        'Onboarding call'
      ],
      cta: 'Start Free Trial',
      tier: 'agency'
    },
    {
      name: 'Agency Pro',
      price: '$39',
      period: '/month',
      description: 'For large agencies',
      features: [
        'Everything in Agency',
        'Up to 100 websites',
        'Just $0.39 per site',
        'White-label ready',
        'Custom GTM configurations',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      tier: 'agency_pro'
    }
  ]
  
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Cookie compliance that works with your existing analytics stack
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
      
      {/* Value Propositions */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Add Analytics Integration?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold mb-2">Use Your Own Tools</h3>
            <p className="text-sm text-gray-600">
              Events flow directly to Google Analytics 4, Looker Studio, or any tool connected to GTM. 
              No new dashboards to learn.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2">Understand True Traffic</h3>
            <p className="text-sm text-gray-600">
              Your Google Analytics is missing 20-40% of visitors who reject cookies. 
              See acceptance rates and estimate your real traffic.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-semibold mb-2">Prove Compliance</h3>
            <p className="text-sm text-gray-600">
              GDPR/CCPA requires proof of consent. Track consent decisions automatically 
              without storing any personal data.
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem 
            question="Do I need Google Tag Manager?"
            answer="Yes, if you want analytics integration. GTM is free and most websites already have it installed. If you don't have it, we provide setup instructions."
          />
          <FAQItem 
            question="Does this work with Looker Studio?"
            answer="Absolutely! Since events go to GA4, you can build any reports you want in Looker Studio, Data Studio, or export to BigQuery."
          />
          <FAQItem 
            question="Is tracking consent decisions legal?"
            answer="Yes. Tracking the consent mechanism itself (accept/reject rates) is considered 'strictly necessary' for compliance and doesn't require consent under GDPR/CCPA."
          />
          <FAQItem 
            question="Can agencies use this for multiple clients?"
            answer="Yes! Our Agency plans are designed for this. Track all client sites from one account and bill them individually."
          />
          <FAQItem 
            question="What if my clients don't have GA4?"
            answer="They can still use the banner for compliance. Analytics integration is optional. But we recommend GA4 as it's free and provides valuable insights."
          />
        </div>
      </div>
    </div>
  )
}

function PricingCard({ name, price, period, description, features, cta, tier, popular }) {
  return (
    <div className={`relative rounded-xl border-2 p-6 ${
      popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 shadow-lg'
    }`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {period && <span className="text-gray-600">{period}</span>}
      </div>
      <p className="text-gray-600 mb-6 min-h-[40px]">{description}</p>
      
      <ul className="space-y-3 mb-8 min-h-[200px]">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-green-500 mt-0.5 flex-shrink-0">
              {feature.startsWith('❌') ? '❌' : '✓'}
            </span>
            <span>{feature.replace(/^[✅❌]\s*/, '')}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
        popular 
          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}>
        {cta}
      </button>
    </div>
  )
}

function FAQItem({ question, answer }) {
  return (
    <details className="bg-white rounded-lg shadow p-6 cursor-pointer">
      <summary className="font-semibold text-lg">{question}</summary>
      <p className="text-gray-600 mt-3 text-sm">{answer}</p>
    </details>
  )
}
```

---

## 🚀 Phase 6: Implementation Checklist

### Complete Implementation Steps

**Step 1: Database Updates** ✅
```bash
# Run in Supabase SQL editor
```
- [ ] Add subscription fields to `user_settings` table
- [ ] Test that fields are created correctly

**Step 2: API Routes** ✅
- [ ] Create/update `app/api/v1/config/[userId]/route.js`
- [ ] Create/update `app/api/v1/banner.js/route.js`
- [ ] Test config endpoint returns correct data
- [ ] Test banner.js generates correct JavaScript

**Step 3: Frontend Updates** ✅
- [ ] Update settings page with analytics toggle
- [ ] Add embed code display with copy button
- [ ] Create GTM setup documentation page
- [ ] Update pricing page

**Step 4: Testing** ✅
- [ ] Test banner.js on local test site
- [ ] Verify GTM events fire correctly
- [ ] Check events appear in GA4 Realtime
- [ ] Test with analytics enabled/disabled
- [ ] Test accept/reject/dismiss flows

**Step 5: Documentation** ✅
- [ ] Write GTM setup guide
- [ ] Create video tutorial (optional)
- [ ] Add troubleshooting section
- [ ] Create FAQ

**Step 6: Deployment** ✅
- [ ] Deploy to Vercel
- [ ] Test production banner.js URL
- [ ] Verify CORS headers work
- [ ] Monitor for errors

---

## 💻 Cursor Implementation Prompts

### Prompt 1: Database Setup
```
I'm building a cookie consent banner app with analytics integration via Google Tag Manager.

I need to add subscription management fields to my existing user_settings table in Supabase:
- subscription_tier (text): 'free', 'starter', 'agency', 'agency_pro', or 'enterprise'
- analytics_enabled (boolean): whether GTM tracking is enabled
- max_websites (integer): how many sites they can use
- stripe_customer_id (text): for Stripe integration later
- stripe_subscription_id (text): for Stripe integration later

Create the SQL migration file to add these columns with appropriate defaults and constraints.
```

### Prompt 2: Config API Endpoint
```
Create an API endpoint at app/api/v1/config/[userId]/route.js that:

1. Accepts a GET request with userId as a URL parameter
2. Fetches the user's banner configuration from Supabase 'banner_configs' table
3. Fetches the user's analytics_enabled setting from 'user_settings' table
4. Returns JSON with: colors, text, position, buttons, scripts, and analyticsEnabled
5. Returns 404 if config not found
6. Uses Supabase service key for auth

Use Next.js 14+ App Router syntax with proper TypeScript types.
```

### Prompt 3: Dynamic Banner.js Generator
```
Create an API endpoint at app/api/v1/banner.js/route.js that:

1. Accepts GET request with 'id' query parameter (userId)
2. Fetches user's banner config and analytics_enabled setting from Supabase
3. Dynamically generates JavaScript code that:
   - Creates a styled cookie consent banner based on their config
   - Tracks events to window.dataLayer (for GTM) if analytics is enabled
   - Events to track: impression, accept, reject, dismiss
   - Includes parameters: consent_action, consent_time_to_decision_seconds, consent_is_returning_visitor
   - Handles localStorage for consent persistence
   - Injects user's scripts on accept
   - Handles returning visitors who already accepted
4. Returns JavaScript with proper Content-Type and CORS headers
5. Cache response for 5 minutes

The generated JavaScript should be production-ready and work without any external dependencies.
```

### Prompt 4: Settings Page with Analytics Toggle
```
Create a settings page at app/dashboard/settings/page.jsx with:

1. Display current subscription tier (free/starter/agency/agency_pro)
2. Toggle switch for enabling/disabling analytics integration
   - Disabled if subscription_tier is 'free'
   - Show upgrade prompt for free users
3. Display the embed code: <script src="...?id={userId}"></script>
4. Copy-to-clipboard button for embed code
5. Show green success message when analytics is enabled, explaining what GTM events will fire
6. Link to GTM setup documentation
7. Use Tailwind CSS for styling
8. Fetch data from Supabase on page load
9. Update analytics_enabled in Supabase when toggled

Use Next.js 14 App Router with 'use client' and proper async/await patterns.
```

### Prompt 5: GTM Documentation Page
```
Create a comprehensive documentation page at app/docs/gtm-setup/page.jsx that explains:

1. Prerequisites (GTM installed, GA4 property, analytics add-on enabled)
2. What events are automatically tracked (cookie_consent with parameters)
3. Step-by-step guide to view events in GA4 Realtime
4. How to create custom dimensions in GA4
5. How to build Looker Studio reports
6. Troubleshooting section
7. FAQ section

Use Tailwind prose classes for readable documentation styling.
Include code examples, tables, and expandable details sections.
```

### Prompt 6: Pricing Page
```
Update the pricing page at app/pricing/page.jsx with these tiers:

- Free: $0 - 1 website, no analytics
- Starter: $9/mo - 5 websites, GTM tracking, GA4 integration
- Agency: $19/mo - 25 websites ($0.76/site), consolidated reporting
- Agency Pro: $39/mo - 100 websites ($0.39/site), white-label, custom configs

Include:
- Feature comparison cards with popular badge on Starter
- "Why Add Analytics?" section with 3 benefits
- FAQ section with 5 common questions
- Use Tailwind CSS for responsive grid layout
- CTA buttons for each tier

Make the Starter plan visually prominent (scale, shadow, blue border).
```

---

## 📊 What Gets Tracked (GTM Events)

### Event Structure

**Event Name:** `cookie_consent`

**Parameters:**
- `consent_action` (string): "impression", "accept", "reject", or "dismiss"
- `consent_time_to_decision_seconds` (number): Time from impression to decision (only on accept/reject)
- `consent_is_returning_visitor` (boolean): true if user has seen banner before
- `consent_banner_position` (string): "top" or "bottom"
- `consent_category` (string): "compliance" (for GTM categorization)

### Example dataLayer Pushes

```javascript
// When banner appears
{
  event: 'cookie_consent',
  consent_action: 'impression',
  consent_is_returning_visitor: false,
  consent_banner_position: 'bottom',
  consent_category: 'compliance'
}

// When user accepts
{
  event: 'cookie_consent',
  consent_action: 'accept',
  consent_time_to_decision_seconds: 8.35,
  consent_is_returning_visitor: false,
  consent_category: 'compliance'
}

// When user rejects
{
  event: 'cookie_consent',
  consent_action: 'reject',
  consent_time_to_decision_seconds: 3.12,
  consent_is_returning_visitor: true,
  consent_category: 'compliance'
}
```

---

## 🎨 Looker Studio Template Ideas (Future Enhancement)

### Template 1: Consent Overview Dashboard
- Acceptance rate gauge (0-100%)
- Total impressions vs decisions
- Decision breakdown (accept/reject/dismiss) pie chart
- 30-day trend line chart

### Template 2: Traffic Estimation Report
- Estimated true traffic calculation
- Sessions vs impressions comparison
- "Hidden visitors" metric
- Traffic source breakdown with consent rates

### Template 3: Optimization Dashboard
- Average time to decision
- Returning vs new visitor behavior
- Device/browser consent rates
- Geographic consent patterns

---

## 🔐 Privacy & Compliance Notes

### What Makes This Legal

1. **First-party tracking**: Events go to their own GA4, not your servers
2. **Consent mechanism tracking**: You're measuring the consent tool, not user behavior
3. **No PII**: No user identifiers, IP addresses, or personal data tracked
4. **Strictly necessary**: Compliance reporting is a legitimate business need
5. **Transparent**: Users can see what's being tracked in GTM

### What NOT to Track

- ❌ Individual user journeys across sessions
- ❌ Personal identifiers (email, name, user IDs)
- ❌ Behavior beyond the banner interaction
- ❌ Third-party data sharing

---

## 💰 Cost Analysis (Updated)

### Infrastructure Costs: ~$0-5/month

**Vercel:**
- Free tier: 100GB bandwidth, 100,000 function invocations
- banner.js is cached (CDN edge), minimal function calls
- Config endpoint called once per page load
- **Cost: $0** (stays in free tier easily)

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth
- Only storing user settings (tiny data)
- No analytics storage needed
- **Cost: $0** (stays in free tier)

**Total infrastructure: $0/month** for first 100+ customers

### Revenue Model

**100 customers at $9/month each:**
- Revenue: $900/month
- Costs: $0/month
- **Profit: $900/month (100% margin)**

**100 agencies at $19/month each:**
- Revenue: $1,900/month
- Costs: $0-20/month (if you exceed Vercel free tier)
- **Profit: $1,880/month (99% margin)**

This is significantly better than the original API-tracking approach!

---

## ✅ Success Metrics

### Technical Metrics
- [ ] Banner loads in <500ms
- [ ] GTM events fire 100% of time when enabled
- [ ] Zero errors in production
- [ ] 99%+ uptime

### Business Metrics
- [ ] 30% free → paid conversion rate
- [ ] <5% churn rate
- [ ] 20+ agency customers within 6 months
- [ ] $1,000+ MRR within 3 months

### User Satisfaction
- [ ] 90%+ setup success rate
- [ ] <5 support tickets per 100 customers
- [ ] 4.5+ star rating
- [ ] 10+ testimonials

---

## 🚀 Launch Plan

### Week 1: Build
- Day 1-2: Database setup + API endpoints
- Day 3-4: Settings page + embed code
- Day 5: Documentation + pricing page
- Day 6-7: Testing + bug fixes

### Week 2: Polish
- Day 1-2: Create Looker Studio template
- Day 3: Record video tutorial
- Day 4: Write blog post about setup
- Day 5: Beta test with 5 users
- Day 6-7: Fix feedback issues

### Week 3: Launch
- Day 1: Deploy to production
- Day 2: Announce on Product Hunt
- Day 3-7: Outreach to agencies, respond to feedback

---

## 📞 Next Steps

1. **Run Prompt 1** in Cursor to set up database
2. **Run Prompts 2-3** to create API endpoints
3. **Test banner.js** on a local HTML file
4. **Run Prompts 4-6** for frontend pages
5. **Deploy to Vercel** and test in production
6. **Create GTM test setup** to verify events fire
7. **Invite beta users** for feedback

---

## 🎉 Summary

**What changed from original plan:**
- ❌ Removed: Custom analytics API, database storage, aggregate functions
- ✅ Added: GTM event tracking, Looker Studio integration, zero backend costs
- ✅ Result: 90% simpler, $0 infrastructure, more valuable to customers

**Why this is better:**
- Customers use tools they already know (GA4, Looker Studio)
- You maintain zero analytics infrastructure
- More powerful analytics capabilities for customers
- Easier to build and launch
- Better profit margins

**Time to launch:** 1-2 weeks instead of 4-6 weeks

Ready to start building? Begin with Prompt 1! 🚀