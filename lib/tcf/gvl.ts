/**
 * GVL (Global Vendor List) utilities for server-side use.
 *
 * Fetches and queries the IAB TCF Global Vendor List v3.
 * The GVL is a JSON document listing all registered ad-tech vendors,
 * their declared purposes, features, and policy URLs.
 */

export const GVL_CDN_URL = 'https://vendor-list.consensu.org/v3/vendor-list.json'

export interface GVLVendor {
  id: number
  name: string
  purposes: number[]
  legIntPurposes: number[]
  features: number[]
  specialFeatures: number[]
  policyUrl: string
  flexiblePurposes?: number[]
  cookieMaxAgeSeconds?: number
  usesCookies?: boolean
  cookieRefresh?: boolean
  usesNonCookieAccess?: boolean
  deviceStorageDisclosureUrl?: string
}

export interface GVL {
  gvlSpecificationVersion: number
  vendorListVersion: number
  tcfPolicyVersion: number
  lastUpdated: string
  vendors: Record<string, GVLVendor>
  purposes: Record<string, { id: number; name: string; description: string }>
  specialPurposes: Record<string, { id: number; name: string; description: string }>
  features: Record<string, { id: number; name: string; description: string }>
  specialFeatures: Record<string, { id: number; name: string; description: string }>
  stacks: Record<string, { id: number; name: string; description: string; purposes: number[]; specialFeatures: number[] }>
}

/**
 * Fetch the latest GVL from the IAB CDN.
 *
 * The CDN itself has good caching headers, so each serverless invocation
 * will benefit from Vercel's edge cache / fetch cache without us needing
 * an in-memory cache (which doesn't persist across invocations anyway).
 */
export async function fetchGVL(): Promise<GVL> {
  const response = await fetch(GVL_CDN_URL, {
    headers: {
      'Accept': 'application/json',
    },
    // Allow Next.js to cache this fetch for up to 24 hours
    next: { revalidate: 86400 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch GVL: ${response.status} ${response.statusText}`)
  }

  const gvl: GVL = await response.json()

  if (!gvl.vendors || typeof gvl.vendors !== 'object') {
    throw new Error('Invalid GVL structure: missing vendors object')
  }

  return gvl
}

/**
 * Extract a single vendor by ID from the GVL.
 * Returns null if the vendor is not found.
 */
export function getVendorById(gvl: GVL, vendorId: number): GVLVendor | null {
  const vendor = gvl.vendors[String(vendorId)]
  return vendor || null
}

/**
 * Search vendors by name (case-insensitive substring match).
 * Returns matching vendors sorted alphabetically by name.
 */
export function searchVendors(gvl: GVL, query: string): GVLVendor[] {
  if (!query || !query.trim()) {
    return Object.values(gvl.vendors).sort((a, b) => a.name.localeCompare(b.name))
  }

  const lowerQuery = query.toLowerCase().trim()

  return Object.values(gvl.vendors)
    .filter((vendor) => vendor.name.toLowerCase().includes(lowerQuery))
    .sort((a, b) => {
      // Exact prefix matches first, then alphabetical
      const aStartsWith = a.name.toLowerCase().startsWith(lowerQuery) ? 0 : 1
      const bStartsWith = b.name.toLowerCase().startsWith(lowerQuery) ? 0 : 1
      if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith
      return a.name.localeCompare(b.name)
    })
}
