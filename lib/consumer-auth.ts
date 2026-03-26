import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
 * Generate a new API key for the Chrome extension
 * Returns the raw key (show once), prefix (for display), and hash (for storage)
 */
export function generateApiKey(): { raw: string; prefix: string; hash: string } {
  const raw = `ck_${crypto.randomBytes(32).toString('base64url')}`
  const prefix = raw.slice(0, 11) // "ck_" + 8 chars
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  return { raw, prefix, hash }
}

/**
 * Verify an API key from an Authorization header
 * Uses SHA-256 + constant-time comparison (not bcrypt — performance matters for per-request auth)
 */
export async function verifyApiKey(rawKey: string): Promise<{ userId: string; consumerTier: string } | null> {
  if (!rawKey.startsWith('ck_') || rawKey.length < 20) return null

  const prefix = rawKey.slice(0, 11)
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex')

  const supabase = getSupabase()
  const { data } = await supabase
    .from('consumer_api_keys')
    .select('user_id, key_hash')
    .eq('prefix', prefix)
    .is('revoked_at', null)
    .single()

  if (!data) return null

  // Constant-time comparison to prevent timing attacks
  const expected = Buffer.from(data.key_hash, 'hex')
  const actual = Buffer.from(hash, 'hex')
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null

  // Update last_used_at asynchronously (don't block the response)
  supabase
    .from('consumer_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('prefix', prefix)
    .then(() => {})

  // Fetch consumer tier
  const { data: user } = await supabase
    .from('User')
    .select('consumerTier')
    .eq('id', data.user_id)
    .single()

  return {
    userId: data.user_id,
    consumerTier: user?.consumerTier || 'free',
  }
}

/**
 * Middleware helper: extract and verify API key from request
 * Returns the authenticated user context or a 401 response
 */
export async function requireConsumerApiKey(
  request: NextRequest
): Promise<{ userId: string; consumerTier: string } | NextResponse> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ck_')) {
    return NextResponse.json(
      { error: 'invalid_api_key', message: 'Missing or invalid API key. Use Authorization: Bearer ck_xxxxx' },
      { status: 401, headers: CORS_HEADERS }
    )
  }

  const rawKey = authHeader.slice(7) // Remove "Bearer "
  const result = await verifyApiKey(rawKey)

  if (!result) {
    return NextResponse.json(
      { error: 'invalid_api_key', message: 'API key is invalid or revoked' },
      { status: 401, headers: CORS_HEADERS }
    )
  }

  return result
}

/**
 * Validate a domain string using WHATWG URL API
 * Returns normalized lowercase domain or null if invalid
 */
export function validateDomain(input: string): string | null {
  if (!input || input.length > 253) return null
  try {
    const url = new URL('https://' + input)
    const host = url.hostname
    if (host === input.toLowerCase() && host.includes('.') && host.length <= 253) {
      return host
    }
    return null
  } catch {
    return null
  }
}

export { CORS_HEADERS }
