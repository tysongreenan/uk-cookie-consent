// Tiny visitor-geolocation endpoint for geo-targeted banners.
//
// banner.js responses are shared across all visitors so Vercel's edge cache
// can serve them without invoking a function. That means the server can no
// longer bake the visitor's country into the script — instead, banners with
// geo rules load a small stub that asks this endpoint for the visitor's
// location, caches it in sessionStorage, and then loads the country-specific
// banner variant (which is itself edge-cached per country).
//
// Runs on the Edge runtime: it only echoes two Vercel-provided headers, and
// edge invocations are an order of magnitude cheaper than serverless ones.

export const runtime = 'edge'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function sanitize(value: string | null, pattern: RegExp): string {
  return value && pattern.test(value) ? value : ''
}

export async function GET(request: Request) {
  const country = sanitize(request.headers.get('x-vercel-ip-country'), /^[A-Z]{2}$/)
  const region = sanitize(request.headers.get('x-vercel-ip-country-region'), /^[A-Z0-9]{1,3}$/)

  return new Response(JSON.stringify({ country, region }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Per-visitor response: browsers may cache it for a day (a visitor's
      // country rarely changes mid-day) but CDNs must never share it.
      'Cache-Control': 'private, max-age=86400',
      ...CORS_HEADERS,
    },
  })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}
