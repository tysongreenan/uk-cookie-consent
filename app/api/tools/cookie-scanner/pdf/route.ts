import { NextRequest, NextResponse } from 'next/server'

import {
  renderCookieScannerReportPDF,
  sanitizeScannerReport,
  scannerReportFilename,
} from '@/lib/cookie-scanner-report'
import { RateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 30

const pdfRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000,
  maxRequests: 20,
})

export async function POST(request: NextRequest) {
  const rateLimitResult = await pdfRateLimit.check(request)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many report downloads. Please wait before trying again.' },
      { status: 429 }
    )
  }

  const body = await request.json().catch(() => ({}))
  const report = sanitizeScannerReport(body?.result)

  if (!report) {
    return NextResponse.json({ error: 'A valid scan result is required.' }, { status: 400 })
  }

  try {
    const pdf = await renderCookieScannerReportPDF(report)
    const filename = scannerReportFilename(report, 'pdf')
    const body = pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer

    return new NextResponse(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      },
    })
  } catch (error) {
    console.error('Cookie scanner PDF error:', error)
    return NextResponse.json({ error: 'Could not generate the PDF report.' }, { status: 500 })
  }
}
