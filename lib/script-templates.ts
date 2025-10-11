// Pre-filled script templates for common tracking tools
export interface ScriptTemplate {
  name: string
  category: 'strictly-necessary' | 'functionality' | 'tracking-performance' | 'targeting-advertising'
  description: string
  scriptCode: string
  instructions?: string
}

export const scriptTemplates: Record<string, ScriptTemplate> = {
  // Analytics & Performance
  'google-analytics-4': {
    name: 'Google Analytics 4',
    category: 'tracking-performance',
    description: 'Track website traffic and user behavior with Google Analytics 4',
    scriptCode: `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`,
    instructions: 'Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)'
  },
  
  'google-analytics-universal': {
    name: 'Google Analytics (Universal)',
    category: 'tracking-performance',
    description: 'Legacy Google Analytics tracking (Universal Analytics)',
    scriptCode: `<!-- Google Analytics (Universal) -->
<script async src="https://www.googletagmanager.com/ga.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>`,
    instructions: 'Replace UA-XXXXX-Y with your Google Analytics tracking ID'
  },
  
  'microsoft-clarity': {
    name: 'Microsoft Clarity',
    category: 'tracking-performance',
    description: 'User behavior analytics with session recordings and heatmaps',
    scriptCode: `<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "PROJECT_ID");
</script>`,
    instructions: 'Replace PROJECT_ID with your Microsoft Clarity project ID'
  },
  
  'hotjar': {
    name: 'Hotjar',
    category: 'tracking-performance',
    description: 'Heatmaps, session recordings, and user feedback',
    scriptCode: `<!-- Hotjar Tracking Code -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:SITE_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`,
    instructions: 'Replace SITE_ID with your Hotjar site ID'
  },
  
  // Advertising & Marketing
  'facebook-pixel': {
    name: 'Facebook Pixel',
    category: 'targeting-advertising',
    description: 'Facebook/Meta advertising and conversion tracking',
    scriptCode: `<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1"
/></noscript>`,
    instructions: 'Replace PIXEL_ID with your Facebook Pixel ID'
  },
  
  'google-ads': {
    name: 'Google Ads',
    category: 'targeting-advertising',
    description: 'Google Ads conversion tracking',
    scriptCode: `<!-- Google Ads Conversion Tracking -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-CONVERSION_ID');
</script>`,
    instructions: 'Replace AW-CONVERSION_ID with your Google Ads conversion ID'
  },
  
  'google-tag-manager': {
    name: 'Google Tag Manager',
    category: 'tracking-performance',
    description: 'Manage all your tracking scripts in one place',
    scriptCode: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXX');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) - Add to <body> -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
    instructions: 'Replace GTM-XXXX with your Google Tag Manager container ID'
  },
  
  'linkedin-insight': {
    name: 'LinkedIn Insight Tag',
    category: 'targeting-advertising',
    description: 'LinkedIn advertising and conversion tracking',
    scriptCode: `<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "PARTNER_ID";
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
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=PARTNER_ID&fmt=gif" />
</noscript>`,
    instructions: 'Replace PARTNER_ID with your LinkedIn Partner ID'
  },
  
  'tiktok-pixel': {
    name: 'TikTok Pixel',
    category: 'targeting-advertising',
    description: 'TikTok advertising and conversion tracking',
    scriptCode: `<!-- TikTok Pixel Code -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  
  ttq.load('PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>`,
    instructions: 'Replace PIXEL_ID with your TikTok Pixel ID'
  },
  
  // Functionality
  'intercom': {
    name: 'Intercom',
    category: 'functionality',
    description: 'Customer messaging and live chat',
    scriptCode: `<!-- Intercom -->
<script>
  window.intercomSettings = {
    app_id: "APP_ID"
  };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>`,
    instructions: 'Replace APP_ID with your Intercom app ID'
  },
  
  'zendesk': {
    name: 'Zendesk Chat',
    category: 'functionality',
    description: 'Customer support live chat widget',
    scriptCode: `<!-- Zendesk Chat -->
<script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=ZENDESK_KEY"></script>`,
    instructions: 'Replace ZENDESK_KEY with your Zendesk widget key'
  }
}

export function getTemplatesByCategory(category: ScriptTemplate['category']): ScriptTemplate[] {
  return Object.values(scriptTemplates).filter(template => template.category === category)
}

export function getTemplateByName(name: string): ScriptTemplate | undefined {
  return scriptTemplates[name]
}

export function getAllTemplateNames(): string[] {
  return Object.values(scriptTemplates).map(t => t.name)
}
