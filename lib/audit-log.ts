/**
 * Audit Log — captures user activity for dispute evidence
 *
 * Fire-and-forget logging: does not block request handlers.
 * Uses Supabase service role to bypass RLS.
 */

import { createClient } from '@supabase/supabase-js'

export const AuditAction = {
  LOGIN: 'login',
  LOGIN_FAILED: 'login.failed',
  REGISTER: 'register',
  BANNER_CREATE: 'banner.create',
  BANNER_UPDATE: 'banner.update',
  BANNER_DELETE: 'banner.delete',
  PLAN_UPGRADE: 'plan.upgrade',
  PLAN_DOWNGRADE: 'plan.downgrade',
  CHECKOUT_STARTED: 'checkout.started',
  DATA_REQUEST_CREATE: 'data_request.create',
  DATA_REQUEST_UPDATE: 'data_request.update',
  DATA_REQUEST_GENERATE: 'data_request.generate',
  DATA_REQUEST_DOWNLOAD: 'data_request.download',
  DATA_REQUEST_REFUSE: 'data_request.refuse',
  DATA_REQUEST_VERIFY: 'data_request.verify',
} as const

export type AuditActionType = (typeof AuditAction)[keyof typeof AuditAction]

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

/** Extract client IP from request headers */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfIp = request.headers.get('cf-connecting-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || cfIp || 'unknown'
}

/** Extract user-agent, truncated to 200 chars */
function getUserAgent(request: Request): string {
  return (request.headers.get('user-agent') || '').slice(0, 200)
}

/**
 * Log a user activity event. Fire-and-forget — does not throw or block.
 */
export function logActivity(
  userId: string,
  action: AuditActionType,
  request?: Request | null,
  metadata?: Record<string, unknown>
): void {
  const supabase = getSupabaseAdmin()
  if (!supabase) return

  const ip = request ? getClientIp(request) : null
  const userAgent = request ? getUserAgent(request) : null

  supabase
    .from('audit_log')
    .insert({
      user_id: userId,
      action,
      ip_address: ip === 'unknown' ? null : ip,
      user_agent: userAgent,
      metadata: metadata || {},
    })
    .then(({ error }) => {
      if (error) console.error('[AUDIT] Failed to log activity:', error.message)
    })
}
