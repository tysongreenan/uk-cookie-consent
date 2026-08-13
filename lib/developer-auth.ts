import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

/**
 * Generate a developer/MCP API key.
 * Prefix `cb_` (cookie-banner) — distinct from consumer `ck_` keys.
 */
export function generateDeveloperApiKey(): { raw: string; prefix: string; hash: string } {
  const raw = `cb_${crypto.randomBytes(32).toString('base64url')}`
  const prefix = raw.slice(0, 11) // "cb_" + 8 chars
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  return { raw, prefix, hash }
}

export type DeveloperAuthContext = {
  userId: string
  planTier: string
  keyId: string
}

/**
 * Verify a developer API key from the raw key string.
 */
export async function verifyDeveloperApiKey(
  rawKey: string
): Promise<DeveloperAuthContext | null> {
  if (!rawKey.startsWith('cb_') || rawKey.length < 20) return null

  const prefix = rawKey.slice(0, 11)
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex')

  const supabase = getSupabase()
  const { data } = await supabase
    .from('developer_api_keys')
    .select('id, user_id, key_hash, expires_at')
    .eq('prefix', prefix)
    .is('revoked_at', null)
    .single()

  if (!data) return null

  if (data.expires_at && new Date(data.expires_at) < new Date()) return null

  const expected = Buffer.from(data.key_hash, 'hex')
  const actual = Buffer.from(hash, 'hex')
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    return null
  }

  // Fire-and-forget last_used_at
  void supabase
    .from('developer_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id)

  const { data: user } = await supabase
    .from('User')
    .select('planTier')
    .eq('id', data.user_id)
    .single()

  return {
    userId: data.user_id,
    planTier: user?.planTier || 'free',
    keyId: data.id,
  }
}

/**
 * Require Authorization: Bearer cb_… on developer API routes.
 */
export async function requireDeveloperApiKey(
  request: NextRequest
): Promise<DeveloperAuthContext | NextResponse> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer cb_')) {
    return NextResponse.json(
      {
        error: 'invalid_api_key',
        message:
          'Missing or invalid API key. Use Authorization: Bearer cb_xxxxx (generate one in Dashboard → Settings → Developer).',
      },
      { status: 401, headers: CORS_HEADERS }
    )
  }

  const rawKey = authHeader.slice(7)
  const result = await verifyDeveloperApiKey(rawKey)

  if (!result) {
    return NextResponse.json(
      { error: 'invalid_api_key', message: 'API key is invalid, expired, or revoked' },
      { status: 401, headers: CORS_HEADERS }
    )
  }

  return result
}

export function isDeveloperAuthContext(
  value: DeveloperAuthContext | NextResponse
): value is DeveloperAuthContext {
  return !(value instanceof NextResponse) && 'userId' in value
}

export { CORS_HEADERS }
