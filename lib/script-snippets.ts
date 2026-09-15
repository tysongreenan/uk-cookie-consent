import type { TrackingScript } from '@/types'

export type ScriptTemplateId =
  | 'google-analytics-4'
  | 'google-tag-manager'
  | 'facebook-pixel'
  | 'microsoft-clarity'
  | 'hotjar'
  | 'linkedin-insight'
  | 'tiktok-pixel'
  | 'google-ads'
  | 'intercom'
  | 'custom'

export type ScriptCategory = TrackingScript['category']

export type ScriptIdField =
  | 'measurementId'
  | 'containerId'
  | 'pixelId'
  | 'projectId'
  | 'siteId'
  | 'partnerId'
  | 'conversionId'
  | 'appId'

export interface ScriptTemplateMeta {
  id: ScriptTemplateId
  name: string
  category: ScriptCategory
  description: string
  idField?: ScriptIdField
  idExample?: string
  idPattern?: string
  /** GA4 is stored as integrations.googleAnalytics on Pro; as a script on Free. */
  usesGa4Integration?: boolean
}

export class ScriptSnippetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ScriptSnippetError'
  }
}

export const SCRIPT_TEMPLATES: ScriptTemplateMeta[] = [
  {
    id: 'google-analytics-4',
    name: 'Google Analytics 4',
    category: 'tracking-performance',
    description: 'Consent-gated GA4. Pro uses the native integration; Free stores the gtag snippet as a script.',
    idField: 'measurementId',
    idExample: 'G-XXXXXXXXXX',
    idPattern: '^G-[A-Z0-9]+$',
    usesGa4Integration: true,
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    category: 'tracking-performance',
    description: 'Loads the GTM container after analytics consent.',
    idField: 'containerId',
    idExample: 'GTM-XXXXXXX',
    idPattern: '^GTM-[A-Z0-9]+$',
  },
  {
    id: 'facebook-pixel',
    name: 'Meta Pixel',
    category: 'targeting-advertising',
    description: 'Meta / Facebook advertising pixel. Loads after marketing consent.',
    idField: 'pixelId',
    idExample: '123456789012345',
    idPattern: '^\\d{5,}$',
  },
  {
    id: 'microsoft-clarity',
    name: 'Microsoft Clarity',
    category: 'tracking-performance',
    description: 'Session recordings and heatmaps. Loads after analytics consent.',
    idField: 'projectId',
    idExample: 'tmo89p0av9',
    idPattern: '^[A-Za-z0-9]+$',
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'tracking-performance',
    description: 'Heatmaps and recordings. Loads after analytics consent.',
    idField: 'siteId',
    idExample: '1778278',
    idPattern: '^\\d+$',
  },
  {
    id: 'linkedin-insight',
    name: 'LinkedIn Insight Tag',
    category: 'targeting-advertising',
    description: 'LinkedIn conversion tracking. Loads after marketing consent.',
    idField: 'partnerId',
    idExample: '1234567',
    idPattern: '^\\d+$',
  },
  {
    id: 'tiktok-pixel',
    name: 'TikTok Pixel',
    category: 'targeting-advertising',
    description: 'TikTok advertising pixel. Loads after marketing consent.',
    idField: 'pixelId',
    idExample: 'CXXXXXXXXXXXX',
    idPattern: '^[A-Z0-9]+$',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'targeting-advertising',
    description: 'Google Ads conversion tag. Loads after marketing consent.',
    idField: 'conversionId',
    idExample: 'AW-123456789',
    idPattern: '^AW-\\d+$',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    category: 'functionality',
    description: 'Customer messaging widget. Loads after functionality consent.',
    idField: 'appId',
    idExample: 'abcd1234',
    idPattern: '^[A-Za-z0-9_-]+$',
  },
  {
    id: 'custom',
    name: 'Custom script',
    category: 'tracking-performance',
    description: 'Paste raw <script> HTML. Provide name, category, and scriptCode.',
  },
]

export function getScriptTemplate(id: string): ScriptTemplateMeta | undefined {
  return SCRIPT_TEMPLATES.find((t) => t.id === id)
}

export function listScriptTemplates(): ScriptTemplateMeta[] {
  return SCRIPT_TEMPLATES
}

export interface BuildScriptInput {
  template?: string
  measurementId?: string
  containerId?: string
  pixelId?: string
  projectId?: string
  siteId?: string
  partnerId?: string
  conversionId?: string
  appId?: string
  name?: string
  category?: ScriptCategory
  scriptCode?: string
  bodyCode?: string
  enabled?: boolean
  scriptId?: string
}

const ID_FIELDS: ScriptIdField[] = [
  'measurementId',
  'containerId',
  'pixelId',
  'projectId',
  'siteId',
  'partnerId',
  'conversionId',
  'appId',
]

export function resolveVendorId(input: BuildScriptInput, field?: ScriptIdField): string {
  if (field && input[field]) return String(input[field]).trim()
  for (const key of ID_FIELDS) {
    const value = input[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function assertId(value: string, meta: ScriptTemplateMeta): string {
  if (!value) {
    throw new ScriptSnippetError(
      `${meta.id} requires ${meta.idField} (e.g. ${meta.idExample}).`
    )
  }
  const normalized =
    meta.id === 'google-analytics-4' ||
    meta.id === 'google-tag-manager' ||
    meta.id === 'google-ads' ||
    meta.id === 'tiktok-pixel'
      ? value.toUpperCase()
      : value
  if (meta.idPattern && !new RegExp(meta.idPattern, 'i').test(normalized)) {
    throw new ScriptSnippetError(
      `Invalid ${meta.idField} "${value}". Expected format like ${meta.idExample}.`
    )
  }
  return normalized
}

function newScriptId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
}

export function buildTrackingScript(input: BuildScriptInput): TrackingScript {
  const templateId = (input.template || (input.scriptCode ? 'custom' : '')) as ScriptTemplateId
  const meta = getScriptTemplate(templateId)
  if (!meta) {
    throw new ScriptSnippetError(
      `Unknown template "${input.template}". Use list_script_templates for valid ids.`
    )
  }

  const enabled = input.enabled !== false
  const category = input.category || meta.category

  if (meta.id === 'custom') {
    const scriptCode = (input.scriptCode || '').trim()
    if (!scriptCode) {
      throw new ScriptSnippetError('custom scripts require scriptCode (the raw <script> HTML).')
    }
    return {
      id: input.scriptId || newScriptId('custom'),
      name: (input.name || 'Custom script').trim(),
      category,
      scriptCode,
      bodyCode: input.bodyCode,
      enabled,
      source: 'manual',
    }
  }

  const vendorId = assertId(resolveVendorId(input, meta.idField), meta)
  const built = snippetFor(meta.id, vendorId)

  return {
    id: input.scriptId || newScriptId(meta.id),
    name: (input.name || meta.name).trim(),
    category,
    scriptCode: built.scriptCode,
    bodyCode: built.bodyCode,
    enabled,
    source: 'template',
    detectedVendor: meta.name,
  }
}

function snippetFor(
  template: Exclude<ScriptTemplateId, 'custom'>,
  id: string
): { scriptCode: string; bodyCode?: string } {
  switch (template) {
    case 'google-analytics-4':
      return {
        scriptCode: `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`,
      }
    case 'google-tag-manager':
      return {
        scriptCode: `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');</script>`,
        bodyCode: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
      }
    case 'facebook-pixel':
      return {
        scriptCode: `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');
</script>`,
      }
    case 'microsoft-clarity':
      return {
        scriptCode: `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${id}");
</script>`,
      }
    case 'hotjar':
      return {
        scriptCode: `<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${id},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`,
      }
    case 'linkedin-insight':
      return {
        scriptCode: `<script type="text/javascript">
_linkedin_partner_id = "${id}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>`,
      }
    case 'tiktok-pixel':
      return {
        scriptCode: `<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
  ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
  var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
  var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${id}');
  ttq.page();
}(window, document, 'ttq');
</script>`,
      }
    case 'google-ads':
      return {
        scriptCode: `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`,
      }
    case 'intercom':
      return {
        scriptCode: `<script>
  window.intercomSettings = { app_id: "${id}" };
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${id}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>`,
      }
  }
}
