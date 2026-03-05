import { load } from 'cheerio/slim'
import type { CheerioAPI } from 'cheerio/slim'
import { fetchSafeText } from '@/lib/fetchSafe'
import { TrackingScript } from '@/types'

export interface ScriptDiscoveryResult {
  scripts: TrackingScript[]
  warnings: string[]
  fetchedAt: string
}

interface ScriptPattern {
  name: string
  category: TrackingScript['category']
  patterns: {
    src?: RegExp[]
    content?: RegExp[]
    id?: RegExp[]
    className?: RegExp[]
  }
  extractScript?: (element: any, $: CheerioAPI, baseUrl: URL) => { scriptCode: string; bodyCode?: string }
}

const scriptPatterns: ScriptPattern[] = [
  // Google Analytics 4
  {
    name: 'Google Analytics 4',
    category: 'tracking-performance',
    patterns: {
      src: [/googletagmanager\.com\/gtag\/js/, /google-analytics\.com\/g\/js/],
      content: [/gtag\(/, /GA_MEASUREMENT_ID/],
    },
    extractScript: (element, $, baseUrl) => {
      const src = $(element).attr('src')
      const content = $(element).html() || ''
      const scriptCode = src 
        ? `<script async src="${src}"></script>`
        : `<script>${content}</script>`
      return { scriptCode }
    },
  },
  // Google Analytics Universal
  {
    name: 'Google Analytics (Universal)',
    category: 'tracking-performance',
    patterns: {
      src: [/google-analytics\.com\/analytics\.js/, /google-analytics\.com\/ga\.js/],
      content: [/ga\(/, /_gaq\.push/],
    },
    extractScript: (element, $, baseUrl) => {
      const src = $(element).attr('src')
      const content = $(element).html() || ''
      const scriptCode = src 
        ? `<script src="${src}"></script>`
        : `<script>${content}</script>`
      return { scriptCode }
    },
  },
  // Google Tag Manager
  {
    name: 'Google Tag Manager',
    category: 'tracking-performance',
    patterns: {
      src: [/googletagmanager\.com\/gtm\.js/],
      content: [/GTM-[A-Z0-9]+/],
    },
    extractScript: (element, $, baseUrl) => {
      const src = $(element).attr('src')
      const content = $(element).html() || ''
      const gtmMatch = content.match(/GTM-[A-Z0-9]+/) || src?.match(/GTM-[A-Z0-9]+/)
      const gtmId = gtmMatch ? gtmMatch[0] : ''
      
      if (gtmId) {
        const scriptCode = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`
        const bodyCode = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
        return { scriptCode, bodyCode }
      }
      
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Facebook Pixel
  {
    name: 'Facebook Pixel',
    category: 'targeting-advertising',
    patterns: {
      src: [/connect\.facebook\.net\/en_US\/fbevents\.js/],
      content: [/fbq\(/, /facebook\.com\/tr/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const pixelMatch = content.match(/fbq\('init',\s*['"](\d+)['"]\)/) || content.match(/pixelId['"]?\s*[:=]\s*['"]?(\d+)/)
      const pixelId = pixelMatch ? pixelMatch[1] : ''
      
      if (pixelId) {
        const scriptCode = `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Microsoft Clarity
  {
    name: 'Microsoft Clarity',
    category: 'tracking-performance',
    patterns: {
      src: [/clarity\.ms\/clarity\.js/],
      content: [/clarity\.ms/, /clarity\(/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const clarityMatch = content.match(/clarity\(['"]init['"],\s*['"]([^'"]+)['"]/) || content.match(/projectId['"]?\s*[:=]\s*['"]?([^'"]+)/)
      const projectId = clarityMatch ? clarityMatch[1] : ''
      
      if (projectId) {
        const scriptCode = `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${projectId}");
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Hotjar
  {
    name: 'Hotjar',
    category: 'tracking-performance',
    patterns: {
      src: [/static\.hotjar\.com/],
      content: [/hj\(/, /hotjar\.com/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const hjMatch = content.match(/hjid['"]?\s*[:=]\s*['"]?(\d+)/) || content.match(/hj\(['"]init['"],\s*['"]?(\d+)/)
      const siteId = hjMatch ? hjMatch[1] : ''
      
      if (siteId) {
        const scriptCode = `<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${siteId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // LinkedIn Insight Tag
  {
    name: 'LinkedIn Insight Tag',
    category: 'targeting-advertising',
    patterns: {
      src: [/snap\.licdn\.com/],
      content: [/_linkedin_partner_id/, /linkedin\.com\/li\/trk/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const partnerMatch = content.match(/_linkedin_partner_id\s*=\s*['"]?(\d+)/) || content.match(/partner_id['"]?\s*[:=]\s*['"]?(\d+)/)
      const partnerId = partnerMatch ? partnerMatch[1] : ''
      
      if (partnerId) {
        const scriptCode = `<script type="text/javascript">
_linkedin_partner_id = "${partnerId}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // TikTok Pixel
  {
    name: 'TikTok Pixel',
    category: 'targeting-advertising',
    patterns: {
      src: [/analytics\.tiktok\.com/],
      content: [/ttq\.(load|page|track)/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const pixelMatch = content.match(/ttq\.load\(['"]?([^'"]+)['"]?/) || content.match(/pixelCode['"]?\s*[:=]\s*['"]?([^'"]+)/)
      const pixelCode = pixelMatch ? pixelMatch[1] : ''
      
      if (pixelCode) {
        const scriptCode = `<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${pixelCode}');
  ttq.page();
}(window, document, 'ttq');
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Google Ads
  {
    name: 'Google Ads',
    category: 'targeting-advertising',
    patterns: {
      src: [/googletagservices\.com\/tag\/js\/gpt\.js/, /googlesyndication\.com/],
      content: [/gtag\(['"]config['"],\s*['"]AW-/, /googletag\.defineSlot/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const conversionMatch = content.match(/gtag\(['"]config['"],\s*['"]AW-(\d+)/)
      const conversionId = conversionMatch ? `AW-${conversionMatch[1]}` : ''
      
      if (conversionId) {
        const scriptCode = `<script async src="https://www.googletagmanager.com/gtag/js?id=${conversionId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${conversionId}');
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Intercom
  {
    name: 'Intercom',
    category: 'functionality',
    patterns: {
      src: [/widget\.intercom\.io/],
      content: [/Intercom\(/, /intercomSettings/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const appIdMatch = content.match(/app_id['"]?\s*[:=]\s*['"]?([^'"]+)/) || content.match(/Intercom\(['"]boot['"],\s*\{[^}]*app_id['"]?\s*[:=]\s*['"]?([^'"]+)/)
      const appId = appIdMatch ? appIdMatch[1] : ''
      
      if (appId) {
        const scriptCode = `<script>
  window.intercomSettings = { app_id: "${appId}" };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/'+appId;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
  // Zendesk Chat
  {
    name: 'Zendesk Chat',
    category: 'functionality',
    patterns: {
      src: [/zdassets\.com\/widget/, /zendesk\.com\/embeddable/],
      content: [/zE\(/, /zendesk\.com/],
    },
    extractScript: (element, $, baseUrl) => {
      const content = $(element).html() || ''
      const keyMatch = content.match(/zE\(['"]webWidget['"],\s*['"]set['"],\s*\{[^}]*key['"]?\s*[:=]\s*['"]?([^'"]+)/) || content.match(/key['"]?\s*[:=]\s*['"]?([^'"]+)/)
      const key = keyMatch ? keyMatch[1] : ''
      
      if (key) {
        const scriptCode = `<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=${key}"></script>`
        return { scriptCode }
      }
      
      const src = $(element).attr('src')
      return { scriptCode: src ? `<script src="${src}"></script>` : `<script>${content}</script>` }
    },
  },
]

function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  if (!trimmed) {
    throw new Error('URL is required')
  }

  // Add protocol if missing
  if (!trimmed.match(/^https?:\/\//i)) {
    return `https://${trimmed}`
  }

  return trimmed
}

function generateScriptId(): string {
  return `script-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export async function discoverScripts(targetUrl: string): Promise<ScriptDiscoveryResult> {
  const warnings: string[] = []
  const discoveredScripts: TrackingScript[] = []
  const foundPatterns = new Set<string>()

  try {
    const sanitizedUrl = normalizeUrl(targetUrl)
    const url = new URL(sanitizedUrl)

    const { text: html } = await fetchSafeText(url, { timeoutMs: 15000 })
    const $ = load(html)

    // Find all script tags
    const scriptTags = $('script').toArray()

    for (const scriptTag of scriptTags) {
      const $script = $(scriptTag)
      const src = $script.attr('src') || ''
      const content = $script.html() || ''
      const id = $script.attr('id') || ''
      const className = $script.attr('class') || ''

      // Check each pattern
      for (const pattern of scriptPatterns) {
        // Skip if we already found this script type
        if (foundPatterns.has(pattern.name)) continue

        let matches = false

        // Check src patterns
        if (pattern.patterns.src) {
          matches = pattern.patterns.src.some(regex => regex.test(src))
        }

        // Check content patterns
        if (!matches && pattern.patterns.content) {
          matches = pattern.patterns.content.some(regex => regex.test(content))
        }

        // Check id patterns
        if (!matches && pattern.patterns.id) {
          matches = pattern.patterns.id.some(regex => regex.test(id))
        }

        // Check className patterns
        if (!matches && pattern.patterns.className) {
          matches = pattern.patterns.className.some(regex => regex.test(className))
        }

        if (matches) {
          foundPatterns.add(pattern.name)

          try {
            const extracted = pattern.extractScript
              ? pattern.extractScript(scriptTag, $, url)
              : {
                  scriptCode: src
                    ? `<script src="${src}"></script>`
                    : `<script>${content}</script>`,
                }

            discoveredScripts.push({
              id: generateScriptId(),
              name: pattern.name,
              category: pattern.category,
              scriptCode: extracted.scriptCode,
              bodyCode: extracted.bodyCode,
              enabled: true,
            })
          } catch (error) {
            warnings.push(`Failed to extract ${pattern.name}: ${(error as Error).message}`)
          }
        }
      }
    }

    // Also check for inline scripts in noscript tags (e.g., GTM)
    const noscriptTags = $('noscript').toArray()
    for (const noscriptTag of noscriptTags) {
      const content = $(noscriptTag).html() || ''
      
      // Check for GTM noscript
      if (content.includes('googletagmanager.com/ns.html')) {
        const gtmMatch = content.match(/id=([^"'\s]+)/)
        if (gtmMatch && !foundPatterns.has('Google Tag Manager')) {
          // This will be handled by the GTM script pattern above
          // But we can add the noscript part if needed
        }
      }
    }

    if (discoveredScripts.length === 0) {
      warnings.push('No common tracking scripts detected. You may need to add them manually.')
    }
  } catch (error) {
    warnings.push(`Failed to fetch website: ${(error as Error).message}`)
  }

  return {
    scripts: discoveredScripts,
    warnings,
    fetchedAt: new Date().toISOString(),
  }
}

