/**
 * DSAR Report Download — generates a signed URL for the report
 *
 * GET: Download report (admin+ only, report must be completed)
 */

import { NextRequest, NextResponse } from 'next/server'
import { authorizeDSAR, getSupabaseAdmin } from '@/lib/dsar-helpers'
import { logActivity, AuditAction } from '@/lib/audit-log'

// GET /api/data-access-requests/[id]/download
export async function GET(
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
      .select('id, status, report_storage_path, report_format, team_id, subject_identifier_type')
      .eq('id', id)
      .eq('team_id', auth.teamId)
      .is('deleted_at', null)
      .single()

    if (fetchError || !row) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    if (!['completed', 'partially_refused'].includes(row.status)) {
      return NextResponse.json(
        { error: 'Report is not ready for download' },
        { status: 409 }
      )
    }

    if (!row.report_storage_path) {
      return NextResponse.json({ error: 'Report file not found' }, { status: 404 })
    }

    // Defence-in-depth: verify storage path matches expected pattern
    const expectedPrefix = `${auth.teamId}/${row.id}/report.`
    if (!row.report_storage_path.startsWith(expectedPrefix)) {
      console.error('[DSAR] Storage path mismatch:', row.report_storage_path, 'expected prefix:', expectedPrefix)
      return NextResponse.json({ error: 'Report path integrity check failed' }, { status: 500 })
    }

    // Generate a signed URL with 15-minute expiry
    const { data: signedUrl, error: signError } = await supabase.storage
      .from('dsar-reports')
      .createSignedUrl(row.report_storage_path, 15 * 60) // 900 seconds = 15 minutes

    if (signError || !signedUrl) {
      console.error('[DSAR] Signed URL generation failed:', signError)
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 })
    }

    logActivity(auth.userId, AuditAction.DATA_REQUEST_DOWNLOAD, request, {
      requestId: id,
      subjectIdentifierType: row.subject_identifier_type,
    })

    return NextResponse.json({
      data: {
        url: signedUrl.signedUrl,
        expiresIn: 900,
        format: row.report_format,
      },
    })
  } catch (error) {
    console.error('[DSAR] Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
