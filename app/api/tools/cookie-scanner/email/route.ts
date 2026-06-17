import { NextRequest, NextResponse } from 'next/server'

import {
  buildScannerReportEmailHtml,
  buildScannerReportText,
  sanitizeScannerReport,
} from '@/lib/cookie-scanner-report'
import { sendEmail } from '@/lib/email'
import { RateLimit } from '@/lib/rate-limit'
import { sanitizeEmail } from '@/lib/sanitize'

export const runtime = 'nodejs'
export const maxDuration = 30

const emailRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 5,
})

export async function POST(request: NextRequest) {
  const rateLimitResult = await emailRateLimit.check(request)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many report emails. Please wait before trying again.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => ({}))
  const email = sanitizeEmail(body?.email)
  const report = sanitizeScannerReport(body?.result)

  if (!email) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  if (!report) {
    return NextResponse.json({ error: 'A valid scan result is required.' }, { status: 400 })
  }

  const sent = await sendEmail({
    to: email,
    subject: `Cookie scan report for ${new URL(report.url).hostname}`,
    html: buildScannerReportEmailHtml(report),
    text: buildScannerReportText(report),
  })

  if (!sent) {
    return NextResponse.json(
      { error: 'Email delivery is not configured or failed. Please download the PDF instead.' },
      { status: 503 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Report sent.',
    remaining: rateLimitResult.remaining,
  })
}
