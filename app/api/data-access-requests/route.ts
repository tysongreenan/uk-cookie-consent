/**
 * DSAR CRUD — List and Create data access requests
 *
 * POST: Create a new DSAR (admin+ only)
 * GET:  List DSARs for the current team (editor+ can view)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authorizeDSAR, getSupabaseAdmin, computeDeadline, rowToDataAccessRequest } from '@/lib/dsar-helpers'
import { logActivity, AuditAction } from '@/lib/audit-log'
import type { DSARIdentifierType, DSARReportFormat } from '@/types'

const VALID_IDENTIFIER_TYPES: DSARIdentifierType[] = ['email', 'ip', 'name']
const VALID_FORMATS: DSARReportFormat[] = ['json', 'csv', 'pdf']

// POST /api/data-access-requests
export async function POST(request: NextRequest) {
  try {
    const auth = await authorizeDSAR(request, 'admin')
    if (!auth.authorized) return auth.response

    const body = await request.json()
    const {
      subjectIdentifierType,
      subjectIdentifierValue,
      subjectEmail,
      reportFormat = 'json',
      orgTimezone = 'America/Toronto',
    } = body

    // Validate inputs
    if (!subjectIdentifierType || !VALID_IDENTIFIER_TYPES.includes(subjectIdentifierType)) {
      return NextResponse.json({ error: 'Invalid subject_identifier_type. Must be: email, ip, or name' }, { status: 400 })
    }
    if (!subjectIdentifierValue || typeof subjectIdentifierValue !== 'string' || subjectIdentifierValue.trim().length === 0) {
      return NextResponse.json({ error: 'subject_identifier_value is required' }, { status: 400 })
    }
    const maxLengths: Record<string, number> = { email: 254, ip: 45, name: 200 }
    if (subjectIdentifierValue.trim().length > (maxLengths[subjectIdentifierType] || 254)) {
      return NextResponse.json({ error: `subject_identifier_value too long (max ${maxLengths[subjectIdentifierType]} chars)` }, { status: 400 })
    }
    if (!VALID_FORMATS.includes(reportFormat)) {
      return NextResponse.json({ error: 'Invalid report_format. Must be: json, csv, or pdf' }, { status: 400 })
    }

    // Validate timezone
    try {
      Intl.DateTimeFormat(undefined, { timeZone: orgTimezone })
    } catch {
      return NextResponse.json({ error: 'Invalid orgTimezone. Must be a valid IANA timezone (e.g. America/Toronto)' }, { status: 400 })
    }

    const requestedAt = new Date()
    const deadlineAt = computeDeadline(requestedAt, orgTimezone)

    const supabase = getSupabaseAdmin()

    const { data: created, error } = await supabase
      .from('data_access_requests')
      .insert({
        organization_user_id: auth.userId,
        team_id: auth.teamId,
        subject_identifier_type: subjectIdentifierType,
        subject_identifier_value: subjectIdentifierValue.trim(),
        subject_email: subjectEmail?.trim() || null,
        report_format: reportFormat,
        org_timezone: orgTimezone,
        requested_at: requestedAt.toISOString(),
        deadline_at: deadlineAt.toISOString(),
      })
      .select()
      .single()

    if (error) {
      // Unique constraint violation = duplicate active request
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'An active request for this subject already exists' },
          { status: 409 }
        )
      }
      console.error('[DSAR] Create failed:', error)
      return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
    }

    logActivity(auth.userId, AuditAction.DATA_REQUEST_CREATE, request, {
      requestId: created.id,
      subjectIdentifierType,
    })

    return NextResponse.json({ data: rowToDataAccessRequest(created) }, { status: 201 })
  } catch (error) {
    console.error('[DSAR] Create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/data-access-requests?status=pending&cursor=xxx&limit=20
export async function GET(request: NextRequest) {
  try {
    const auth = await authorizeDSAR(request, 'view')
    if (!auth.authorized) return auth.response

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const cursor = searchParams.get('cursor')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    const supabase = getSupabaseAdmin()

    let query = supabase
      .from('data_access_requests')
      .select('*')
      .eq('team_id', auth.teamId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit)

    const VALID_STATUSES = ['pending', 'identity_verified', 'processing', 'completed', 'partially_refused', 'refused', 'failed']
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: `Invalid status filter. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 })
      }
      query = query.eq('status', status)
    }
    // Cursor format: "created_at|id" for stable pagination
    if (cursor) {
      const [cursorTime, cursorId] = cursor.split('|')
      if (cursorTime && cursorId) {
        query = query.or(`created_at.lt.${cursorTime},and(created_at.eq.${cursorTime},id.lt.${cursorId})`)
      } else {
        query = query.lt('created_at', cursor)
      }
    }

    const { data: rows, error } = await query

    if (error) {
      console.error('[DSAR] List failed:', error)
      return NextResponse.json({ error: 'Failed to list requests' }, { status: 500 })
    }

    const data = (rows || []).map(rowToDataAccessRequest)
    const lastItem = data[data.length - 1]
    const nextCursor = data.length === limit && lastItem ? `${lastItem.createdAt}|${lastItem.id}` : null

    return NextResponse.json({ data, nextCursor })
  } catch (error) {
    console.error('[DSAR] List error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
