/**
 * Shared helpers for DSAR API routes
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canAccessFeature } from '@/lib/plan-restrictions'
import type { PlanTier, TeamRole, DSARStatus } from '@/types'
import { hasTeamPermission, DSAR_STATUS_TRANSITIONS } from '@/types'

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase config missing: SUPABASE_SERVICE_ROLE_KEY is required for DSAR operations')
  return createClient(url, key)
}

/** Standard auth + plan + role check for DSAR routes */
export async function authorizeDSAR(
  request: Request,
  requiredPermission: 'view' | 'admin' = 'admin'
): Promise<
  | { authorized: true; userId: string; teamId: string; userRole: TeamRole; planTier: PlanTier }
  | { authorized: false; response: NextResponse }
> {
  // CSRF check for state-mutating requests
  if (['POST', 'PATCH', 'DELETE'].includes(request.method)) {
    if (!request.headers.get('x-requested-with')) {
      return { authorized: false, response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
    }
  }

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return { authorized: false, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const planTier = (session.user.planTier || 'free') as PlanTier
  if (!canAccessFeature(planTier, 'hasDataAccessRequests')) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Pro plan required for data access requests' },
        { status: 403 }
      ),
    }
  }

  const teamId = session.user.currentTeamId
  const userRole = (session.user.userRole || 'viewer') as TeamRole

  if (!teamId) {
    return { authorized: false, response: NextResponse.json({ error: 'No team selected' }, { status: 400 }) }
  }

  const permissionNeeded = requiredPermission === 'admin' ? 'admin' : 'view'
  if (!hasTeamPermission(userRole, permissionNeeded)) {
    return { authorized: false, response: NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 }) }
  }

  return { authorized: true, userId: session.user.id, teamId, userRole, planTier }
}

/** Validate DSAR status transition using the canonical map from types */
export function isValidTransition(from: DSARStatus, to: DSARStatus): boolean {
  return DSAR_STATUS_TRANSITIONS[from]?.includes(to) ?? false
}

/** Compute deadline: 30 calendar days from requested_at in org timezone */
export function computeDeadline(requestedAt: Date, timezone: string): Date {
  // Get the calendar date in the org's timezone using formatToParts (reliable across all envs)
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(requestedAt)
  const year = parseInt(parts.find((p) => p.type === 'year')!.value)
  const month = parseInt(parts.find((p) => p.type === 'month')!.value) - 1
  const day = parseInt(parts.find((p) => p.type === 'day')!.value)

  // Add 30 calendar days, end of day (23:59:59) in the org's timezone
  // Use Intl to get the UTC offset at the deadline date by extracting the offset string
  const offsetFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  })
  // Format a date near the deadline to extract the offset
  const approxDeadline = new Date(Date.UTC(year, month, day + 30, 12, 0, 0))
  const offsetParts = offsetFmt.formatToParts(approxDeadline)
  const tzName = offsetParts.find((p) => p.type === 'timeZoneName')?.value || 'GMT'

  // Parse offset like "GMT-5", "GMT+5:30", "GMT"
  let offsetMs = 0
  const offsetMatch = tzName.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/)
  if (offsetMatch) {
    const sign = offsetMatch[1] === '+' ? 1 : -1
    const hours = parseInt(offsetMatch[2])
    const minutes = parseInt(offsetMatch[3] || '0')
    offsetMs = sign * (hours * 60 + minutes) * 60 * 1000
  }

  // Construct end-of-day in org timezone as UTC
  // End of day in local time = local 23:59:59 = UTC 23:59:59 minus the offset
  const deadlineUtc = new Date(Date.UTC(year, month, day + 30, 23, 59, 59) - offsetMs)
  return deadlineUtc
}

/** Convert DB row (snake_case) to TypeScript interface (camelCase) */
export function rowToDataAccessRequest(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    organizationUserId: row.organization_user_id as string,
    teamId: row.team_id as string | null,
    subjectIdentifierType: row.subject_identifier_type as string,
    subjectIdentifierValue: row.subject_identifier_value as string,
    subjectEmail: row.subject_email as string | null,
    status: row.status as string,
    reportFormat: row.report_format as string,
    reportStoragePath: row.report_storage_path as string | null,
    identityVerified: row.identity_verified as boolean,
    verificationMethod: row.verification_method as string | null,
    verificationNotes: row.verification_notes as string | null,
    verifiedAt: row.verified_at as string | null,
    verifiedBy: row.verified_by as string | null,
    refusedSections: (row.refused_sections || []) as Array<{ section: string; reason: string }>,
    refusalReason: row.refusal_reason as string | null,
    requestedAt: row.requested_at as string,
    orgTimezone: row.org_timezone as string,
    deadlineAt: row.deadline_at as string,
    completedAt: row.completed_at as string | null,
    deletedAt: row.deleted_at as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}
