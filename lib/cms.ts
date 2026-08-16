type Collection = 'posts' | 'pages' | 'site-settings'

export type CmsFindResult = { docs: unknown[] }

/**
 * Read-only Agency CMS GET helper.
 * Tenant filter is always applied. Posts/pages also request `_status=published`.
 * GET only — never POST/PATCH/PUT/DELETE, never `/api/mcp`.
 */
export async function cmsFind(
  collection: Collection,
  extra: Record<string, string> = {}
): Promise<CmsFindResult> {
  const cmsUrl = process.env.CMS_URL
  const tenant = process.env.CMS_TENANT_SLUG

  if (!cmsUrl || !tenant) {
    throw new Error('CMS_URL and CMS_TENANT_SLUG are required')
  }

  const params = new URLSearchParams({
    'where[and][0][tenant.slug][equals]': tenant,
    depth: '1',
    limit: collection === 'site-settings' ? '1' : '50',
    ...extra,
  })

  if (collection !== 'site-settings') {
    params.set('where[and][1][_status][equals]', 'published')
  }

  try {
    const res = await fetch(`${cmsUrl}/api/${collection}?${params}`)
    if (!res.ok) return { docs: [] as unknown[] }
    const data = (await res.json()) as { docs?: unknown[] }
    return { docs: Array.isArray(data.docs) ? data.docs : [] }
  } catch {
    return { docs: [] as unknown[] }
  }
}

/**
 * Public page callers: missing env or a thrown helper error is an empty result,
 * so preview/CI without secrets does not 500 the blog.
 */
export async function cmsFindPublic(
  collection: Collection,
  extra: Record<string, string> = {}
): Promise<CmsFindResult> {
  try {
    return await cmsFind(collection, extra)
  } catch {
    return { docs: [] as unknown[] }
  }
}
