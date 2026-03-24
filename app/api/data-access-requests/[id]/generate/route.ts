/**
 * DSAR Report Generation — triggers report creation
 *
 * POST: Generate report (admin+ only, identity must be verified)
 * maxDuration: 300s (configured in vercel.json)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authorizeDSAR, getSupabaseAdmin, rowToDataAccessRequest } from '@/lib/dsar-helpers'
import { generateDSARReport, formatReportAsCSV, formatReportAsJSON } from '@/lib/data-access-report'
import { renderDSARReportPDF } from '@/lib/dsar-pdf-template'
import { logActivity, AuditAction } from '@/lib/audit-log'
import type { DataAccessRequest } from '@/types'

// POST /api/data-access-requests/[id]/generate
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authorizeDSAR(request, 'admin')
    if (!auth.authorized) return auth.response

    const { id } = await params
    const supabase = getSupabaseAdmin()

    // Fetch the request
    const { data: row, error: fetchError } = await supabase
      .from('data_access_requests')
      .select('*')
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .is('deleted_at', null)
      .single()

    if (fetchError || !row) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Precondition: must be identity_verified
    if (row.status !== 'identity_verified') {
      return NextResponse.json(
        { error: `Cannot generate report: status is "${row.status}", must be "identity_verified"` },
        { status: 409 }
      )
    }

    // Rate limit: max 10 processing requests per org per hour
    const { count } = await supabase
      .from('data_access_requests')
      .select('id', { count: 'exact', head: true })
      .eq('team_id', auth.teamId)
      .eq('status', 'processing')
      .gte('updated_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())

    if ((count || 0) >= 10) {
      return NextResponse.json(
        { error: 'Rate limit exceeded: maximum 10 report generations per hour' },
        { status: 429 }
      )
    }

    // Parse body for language preference (do this before any async work to avoid stream issues)
    let language: 'en' | 'fr' = 'en'
    try {
      const body = await request.json()
      if (body.language === 'fr') language = 'fr'
    } catch {
      // No body or invalid JSON — use default
    }

    // Atomic compare-and-swap: only transition if still identity_verified (prevents race condition)
    const { data: casResult } = await supabase
      .from('data_access_requests')
      .update({ status: 'processing', updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .eq('status', 'identity_verified')
      .select('id')

    if (!casResult || casResult.length === 0) {
      return NextResponse.json(
        { error: 'Request is already being processed or status has changed' },
        { status: 409 }
      )
    }

    // Get org name
    const { data: team } = await supabase
      .from('Team')
      .select('name')
      .eq('id', auth.teamId)
      .single()

    const dsarRequest = rowToDataAccessRequest(row) as DataAccessRequest

    try {
      // Generate the report
      const report = await generateDSARReport({
        request: dsarRequest,
        organizationName: team?.name || 'Unknown Organization',
        language,
      })

      // Format based on requested format
      let content: string | Buffer
      let contentType: string
      let fileExtension: string

      if (dsarRequest.reportFormat === 'pdf') {
        content = await renderDSARReportPDF(report)
        contentType = 'application/pdf'
        fileExtension = 'pdf'
      } else if (dsarRequest.reportFormat === 'csv') {
        content = formatReportAsCSV(report)
        contentType = 'text/csv'
        fileExtension = 'csv'
      } else {
        content = formatReportAsJSON(report)
        contentType = 'application/json'
        fileExtension = 'json'
      }

      // Upload to Supabase Storage
      const storagePath = `${auth.teamId}/${id}/report.${fileExtension}`
      const { error: uploadError } = await supabase.storage
        .from('dsar-reports')
        .upload(storagePath, content, {
          contentType,
          upsert: true,
        })

      if (uploadError) {
        console.error('[DSAR] Storage upload failed:', uploadError)
        throw new Error('Failed to store report')
      }

      // Determine final status
      const hasRefusedSections = (dsarRequest.refusedSections || []).length > 0
      const finalStatus = hasRefusedSections ? 'partially_refused' : 'completed'

      // Update request as completed
      await supabase
        .from('data_access_requests')
        .update({
          status: finalStatus,
          report_storage_path: storagePath,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('team_id', auth.teamId)

      logActivity(auth.userId, AuditAction.DATA_REQUEST_GENERATE, request, {
        requestId: id,
        subjectIdentifierType: dsarRequest.subjectIdentifierType,
        recordsFound: report.metadata.recordsFound,
        durationMs: report.metadata.generationDurationMs,
      })

      return NextResponse.json({
        data: {
          status: finalStatus,
          recordsFound: report.metadata.recordsFound,
          generationDurationMs: report.metadata.generationDurationMs,
        },
      })
    } catch (genError) {
      // Mark as failed
      console.error('[DSAR] Generation failed:', genError)
      await supabase
        .from('data_access_requests')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('team_id', auth.teamId)

      // Audit log the failure for compliance trail
      logActivity(auth.userId, AuditAction.DATA_REQUEST_GENERATE, request, {
        requestId: id,
        subjectIdentifierType: dsarRequest.subjectIdentifierType,
        failed: true,
        error: genError instanceof Error ? genError.message : 'Unknown error',
      })

      return NextResponse.json({ error: 'Report generation failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('[DSAR] Generate error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
