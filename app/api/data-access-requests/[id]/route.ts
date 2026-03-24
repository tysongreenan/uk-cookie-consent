/**
 * DSAR Detail — Get and Update a specific data access request
 *
 * GET:   Get request details (editor+ can view)
 * PATCH: Update status, verification, refusal (admin+ only)
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  authorizeDSAR,
  getSupabaseAdmin,
  isValidTransition,
  rowToDataAccessRequest,
} from '@/lib/dsar-helpers'
import { logActivity, AuditAction } from '@/lib/audit-log'
import type { DSARStatus, DSARVerificationMethod } from '@/types'

// GET /api/data-access-requests/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authorizeDSAR(request, 'view')
    if (!auth.authorized) return auth.response

    const { id } = await params
    const supabase = getSupabaseAdmin()

    const { data: row, error } = await supabase
      .from('data_access_requests')
      .select('*')
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .is('deleted_at', null)
      .single()

    if (error || !row) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    return NextResponse.json({ data: rowToDataAccessRequest(row) })
  } catch (error) {
    console.error('[DSAR] Get error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/data-access-requests/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authorizeDSAR(request, 'admin')
    if (!auth.authorized) return auth.response

    const { id } = await params
    const body = await request.json()
    const supabase = getSupabaseAdmin()

    // Fetch current state
    const { data: current, error: fetchError } = await supabase
      .from('data_access_requests')
      .select('*')
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .is('deleted_at', null)
      .single()

    if (fetchError || !current) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }

    // Handle status transition
    if (body.status && body.status !== current.status) {
      const newStatus = body.status as DSARStatus
      if (!isValidTransition(current.status, newStatus)) {
        return NextResponse.json(
          { error: `Invalid status transition: ${current.status} → ${newStatus}` },
          { status: 409 }
        )
      }
      updates.status = newStatus

      // Handle refusal
      if (newStatus === 'refused') {
        if (!body.refusalReason) {
          return NextResponse.json({ error: 'refusalReason is required when refusing' }, { status: 400 })
        }
        updates.refusal_reason = body.refusalReason
        logActivity(auth.userId, AuditAction.DATA_REQUEST_REFUSE, request, {
          requestId: id,
          subjectIdentifierType: current.subject_identifier_type,
        })
      }
    }

    // Handle identity verification
    if (body.identityVerified === true && !current.identity_verified) {
      if (!body.verificationMethod) {
        return NextResponse.json({ error: 'verificationMethod is required for identity verification' }, { status: 400 })
      }
      const validMethods: DSARVerificationMethod[] = ['government_id', 'email_confirmation', 'in_person', 'other']
      if (!validMethods.includes(body.verificationMethod)) {
        return NextResponse.json({ error: 'Invalid verification method' }, { status: 400 })
      }

      updates.identity_verified = true
      updates.verification_method = body.verificationMethod
      updates.verification_notes = body.verificationNotes || null
      updates.verified_at = new Date().toISOString()
      updates.verified_by = auth.userId

      // Auto-transition to identity_verified if still pending
      if (current.status === 'pending' && !updates.status) {
        updates.status = 'identity_verified'
      }

      logActivity(auth.userId, AuditAction.DATA_REQUEST_VERIFY, request, {
        requestId: id,
        subjectIdentifierType: current.subject_identifier_type,
      })
    }

    // Handle partial refusal sections — validate shape
    if (body.refusedSections !== undefined) {
      if (!Array.isArray(body.refusedSections)) {
        return NextResponse.json({ error: 'refusedSections must be an array' }, { status: 400 })
      }
      const VALID_SECTIONS = ['consent_records', 'analytics_events', 'technical_data', 'processing_purposes', 'retention_info']
      for (const entry of body.refusedSections) {
        if (!entry || typeof entry.section !== 'string' || typeof entry.reason !== 'string') {
          return NextResponse.json({ error: 'Each refusedSection must have { section: string, reason: string }' }, { status: 400 })
        }
        if (!VALID_SECTIONS.includes(entry.section)) {
          return NextResponse.json({ error: `Invalid section: ${entry.section}` }, { status: 400 })
        }
      }
      updates.refused_sections = body.refusedSections
    }

    // Handle subject email update
    if (body.subjectEmail !== undefined) {
      updates.subject_email = body.subjectEmail?.trim() || null
    }

    const { data: updated, error: updateError } = await supabase
      .from('data_access_requests')
      .update(updates)
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .select()
      .single()

    if (updateError) {
      console.error('[DSAR] Update failed:', updateError)
      return NextResponse.json({ error: 'Failed to update request' }, { status: 500 })
    }

    logActivity(auth.userId, AuditAction.DATA_REQUEST_UPDATE, request, {
      requestId: id,
      subjectIdentifierType: current.subject_identifier_type,
    })

    return NextResponse.json({ data: rowToDataAccessRequest(updated) })
  } catch (error) {
    console.error('[DSAR] Update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
