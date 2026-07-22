/**
 * Render a bottom-bar banner fixture for visual/layout checks at tablet widths.
 * Usage: npx tsx scripts/render-banner-fixture.mjs
 */
import fs from 'fs'
import path from 'path'

async function main() {
  const { generateBannerHTML, generateBannerCSS } = await import('../lib/banner-generator.ts')

  const logoSvg =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><path d="M10 30 L40 5 L70 30" fill="none" stroke="#c4a574" stroke-width="3"/></svg>'
    )

  const config = {
    compliance: {
      framework: 'gdpr',
      requiresExplicitConsent: true,
      requiresOptIn: true,
      requiresGranularConsent: true,
      requiresPrivacyPolicy: true,
      requiresDataRetentionPolicy: false,
      maxPenalty: '',
      consentExpiry: 12,
    },
    name: 'EagleView-like',
    position: 'bottom',
    theme: 'dark',
    language: 'en',
    colors: {
      background: '#1a2332',
      text: '#ffffff',
      button: '#c4a574',
      buttonText: '#ffffff',
      link: '#c4a574',
      rejectButton: 'transparent',
      rejectButtonText: '#ffffff',
    },
    text: {
      title: 'We use cookies',
      message:
        'This website uses cookies to enhance your browsing experience and provide personalized content.',
      acceptButton: 'Accept All',
      rejectButton: 'Reject All',
      preferencesButton: 'Preferences',
    },
    behavior: {
      autoShow: true,
      dismissOnScroll: false,
      showPreferences: true,
      cookieExpiry: 182,
      buttonLayout: 'standard',
      showRejectButton: false,
    },
    branding: {
      logo: {
        enabled: true,
        url: logoSvg,
        position: 'left',
        maxWidth: 120,
        maxHeight: 40,
      },
      privacyPolicy: {
        url: 'https://example.com/privacy',
        text: 'Privacy Policy',
        openInNewTab: true,
        required: false,
      },
      footerLink: {
        enabled: false,
        text: 'Cookie Settings',
        style: 'floating',
        floatingPosition: 'bottom-right',
      },
      showPoweredBy: false,
    },
    layout: {
      width: 'full',
      customWidth: 400,
      maxWidth: 1200,
      borderRadius: 0,
      padding: 20,
      margin: 0,
      shadow: 'medium',
      animation: 'fade',
    },
    advanced: { customCSS: '' },
    scripts: {
      strictlyNecessary: [],
      functionality: [],
      trackingPerformance: [],
      targetingAdvertising: [],
    },
  }

  const html = generateBannerHTML(config, { showBranding: false })
  const css = generateBannerCSS(config)

  // Sanity checks
  const checks = [
    ['no old flex basis', !css.includes('1 1 220px') && !html.includes('flex: 1 1 220px')],
    ['tablet breakpoint', css.includes('max-width: 1024px')],
    ['flex-basis auto', css.includes('flex-basis: auto !important')],
    ['copy flex none when stacked', css.includes('flex: 0 0 auto !important')],
    ['height auto on banner', css.includes('height: auto !important')],
  ]
  let failed = false
  for (const [name, ok] of checks) {
    console.log(ok ? `OK  ${name}` : `FAIL ${name}`)
    if (!ok) failed = true
  }
  if (failed) process.exit(1)

  const page = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Banner tablet fixture</title>
  <style>
    html, body { margin: 0; min-height: 100%; background: #e8e4dc; font-family: system-ui, sans-serif; }
    .page { padding: 24px; color: #333; min-height: 100vh; }
    ${css}
    #cookie-consent-banner { display: block !important; }
  </style>
</head>
<body>
  <div class="page">
    <h1>Site content</h1>
    <p>Background page behind the cookie banner (iPad / tablet fixture).</p>
  </div>
  ${html}
</body>
</html>`

  const out = path.resolve('scripts/banner-ipad-fixture.html')
  fs.writeFileSync(out, page)
  console.log('Wrote', out, `(${page.length} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
