import React from 'react'
import { Document, Page, Path, Svg, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'

export interface CookieScannerReportCookie {
  name: string
  domain: string
  purpose: string
  category: 'necessary' | 'analytics' | 'marketing' | 'functional'
  expires: string
  secure: boolean
  httpOnly: boolean
  sameSite: string
  thirdParty: boolean
}

export interface CookieScannerReportResult {
  url: string
  cookies: CookieScannerReportCookie[]
  overallGrade: string
  overallScore: number
  compliance: Record<string, { score: number; grade: string; issues: string[] }>
  recommendations: { text: string; regulation: string }[]
  timestamp: string
  consentBanner?: { detected: boolean; vendor: string | null }
  privacyPolicyUrl?: string | null
  scriptsDetected?: { name: string; category: string }[]
  note?: string
  scanMethod?: 'headless' | 'static-html'
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatRegulationName(key: string): string {
  return key === 'law25' ? 'Law 25' : key.toUpperCase()
}

export function sanitizeScannerReport(input: unknown): CookieScannerReportResult | null {
  if (!input || typeof input !== 'object') return null
  const raw = input as Partial<CookieScannerReportResult>
  if (typeof raw.url !== 'string' || !/^https?:\/\//.test(raw.url)) return null
  if (!Array.isArray(raw.cookies)) return null
  if (!raw.compliance || typeof raw.compliance !== 'object') return null

  return {
    url: raw.url.slice(0, 500),
    cookies: raw.cookies.slice(0, 200).map(cookie => ({
      name: String(cookie.name || '').slice(0, 120),
      domain: String(cookie.domain || '').slice(0, 180),
      purpose: String(cookie.purpose || '').slice(0, 500),
      category: ['necessary', 'analytics', 'marketing', 'functional'].includes(cookie.category)
        ? cookie.category
        : 'functional',
      expires: String(cookie.expires || '').slice(0, 120),
      secure: !!cookie.secure,
      httpOnly: !!cookie.httpOnly,
      sameSite: String(cookie.sameSite || '').slice(0, 40),
      thirdParty: !!cookie.thirdParty,
    })),
    overallGrade: String(raw.overallGrade || 'N/A').slice(0, 4),
    overallScore: Number.isFinite(raw.overallScore) ? Number(raw.overallScore) : 0,
    compliance: Object.fromEntries(
      Object.entries(raw.compliance).slice(0, 8).map(([key, value]) => [
        key,
        {
          score: Number.isFinite(value?.score) ? Number(value.score) : 0,
          grade: String(value?.grade || '').slice(0, 4),
          issues: Array.isArray(value?.issues) ? value.issues.slice(0, 20).map(issue => String(issue).slice(0, 500)) : [],
        },
      ])
    ),
    recommendations: Array.isArray(raw.recommendations)
      ? raw.recommendations.slice(0, 20).map(rec => ({
          text: String(rec.text || '').slice(0, 700),
          regulation: String(rec.regulation || '').slice(0, 120),
        }))
      : [],
    timestamp: String(raw.timestamp || new Date().toISOString()),
    consentBanner: raw.consentBanner
      ? { detected: !!raw.consentBanner.detected, vendor: raw.consentBanner.vendor ? String(raw.consentBanner.vendor).slice(0, 120) : null }
      : undefined,
    privacyPolicyUrl: raw.privacyPolicyUrl ? String(raw.privacyPolicyUrl).slice(0, 500) : null,
    scriptsDetected: Array.isArray(raw.scriptsDetected)
      ? raw.scriptsDetected.slice(0, 50).map(script => ({
          name: String(script.name || '').slice(0, 160),
          category: String(script.category || '').slice(0, 120),
        }))
      : [],
    note: raw.note ? String(raw.note).slice(0, 1000) : undefined,
    scanMethod: raw.scanMethod === 'headless' ? 'headless' : raw.scanMethod === 'static-html' ? 'static-html' : undefined,
  }
}

export function scannerReportFilename(result: CookieScannerReportResult, extension: 'pdf' | 'json' = 'pdf'): string {
  const hostname = new URL(result.url).hostname.replace(/^www\./, '').replace(/[^a-z0-9.-]/gi, '-')
  const date = new Date(result.timestamp).toISOString().slice(0, 10)
  return `cookie-scan-${hostname}-${date}.${extension}`
}

export function buildScannerReportText(result: CookieScannerReportResult): string {
  const lines = [
    `Cookie scan report for ${result.url}`,
    `Generated: ${new Date(result.timestamp).toLocaleString('en-CA')}`,
    `Overall grade: ${result.overallGrade} (${result.overallScore}/100)`,
    `Scan method: ${result.scanMethod === 'headless' ? 'Browser scan' : 'Static HTML scan'}`,
    `Cookies found: ${result.cookies.length}`,
    `Consent banner: ${result.consentBanner?.detected ? result.consentBanner.vendor || 'Detected' : 'Not detected'}`,
    `Privacy policy: ${result.privacyPolicyUrl || 'Not found'}`,
    '',
    'Compliance',
    ...Object.entries(result.compliance).map(([key, reg]) => {
      const issues = reg.issues.length ? ` - ${reg.issues.join('; ')}` : ''
      return `${formatRegulationName(key)}: ${reg.grade || ''} (${reg.score}/100)${issues}`
    }),
    '',
    'Recommendations',
    ...result.recommendations.map((rec, index) => `${index + 1}. ${rec.text} (${rec.regulation})`),
  ]
  return lines.join('\n')
}

export function buildScannerReportEmailHtml(result: CookieScannerReportResult): string {
  const complianceRows = Object.entries(result.compliance).map(([key, reg]) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;font-weight:600;">${escapeHtml(formatRegulationName(key))}</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;">${escapeHtml(reg.grade || '-')} (${escapeHtml(reg.score)}/100)</td>
      <td style="padding:10px;border-bottom:1px solid #e5e7eb;color:#6b7280;">${escapeHtml(reg.issues[0] || 'No major issue listed')}</td>
    </tr>
  `).join('')

  const recommendations = result.recommendations.map(rec => `
    <li style="margin-bottom:8px;">${escapeHtml(rec.text)} <span style="color:#6b7280;">(${escapeHtml(rec.regulation)})</span></li>
  `).join('')

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:680px;margin:0 auto;padding:28px 0;color:#111827;">
      <div style="background:#0E768C;color:#fff;padding:24px 28px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:22px;">Cookie Scan Report</h1>
        <p style="margin:6px 0 0;color:#dff5f8;">${escapeHtml(result.url)}</p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;padding:28px;background:#fff;">
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:22px;">
          <div style="border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;min-width:120px;">
            <div style="font-size:12px;color:#6b7280;">Overall</div>
            <div style="font-size:28px;font-weight:700;color:#0E768C;">${escapeHtml(result.overallGrade)}</div>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;min-width:120px;">
            <div style="font-size:12px;color:#6b7280;">Cookies</div>
            <div style="font-size:28px;font-weight:700;">${escapeHtml(result.cookies.length)}</div>
          </div>
          <div style="border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;min-width:170px;">
            <div style="font-size:12px;color:#6b7280;">Consent banner</div>
            <div style="font-size:15px;font-weight:600;">${result.consentBanner?.detected ? escapeHtml(result.consentBanner.vendor || 'Detected') : 'Not detected'}</div>
          </div>
        </div>
        <h2 style="font-size:16px;margin:0 0 10px;">Compliance Analysis</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:22px;font-size:14px;">${complianceRows}</table>
        <h2 style="font-size:16px;margin:0 0 10px;">Recommendations</h2>
        <ol style="padding-left:20px;line-height:1.5;">${recommendations || '<li>No recommendations listed.</li>'}</ol>
        ${result.note ? `<p style="font-size:12px;color:#6b7280;margin-top:20px;">${escapeHtml(result.note)}</p>` : ''}
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:18px;">cookie-banner.ca</p>
    </div>
  `
}

const pdfStyles = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: 'Helvetica', color: '#111827' },
  header: { borderBottomWidth: 2, borderBottomColor: '#0E768C', paddingBottom: 14, marginBottom: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  brandMark: { width: 30, height: 22, marginRight: 8 },
  brandName: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#111827' },
  brandDomain: { fontSize: 8, color: '#6b7280', marginTop: 1 },
  title: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#0E768C', marginBottom: 5 },
  subtitle: { fontSize: 10, color: '#4b5563' },
  summaryGrid: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  summaryBox: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, padding: 10, flex: 1 },
  summaryLabel: { fontSize: 8, color: '#6b7280', marginBottom: 4 },
  summaryValue: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#0E768C' },
  sectionTitle: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#0E768C', marginTop: 14, marginBottom: 8 },
  row: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 5 },
  cellStrong: { flex: 1, fontFamily: 'Helvetica-Bold', paddingRight: 8 },
  cell: { flex: 2, color: '#4b5563', paddingRight: 8 },
  item: { marginBottom: 6, lineHeight: 1.35 },
  note: { marginTop: 14, padding: 10, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', color: '#6b7280' },
  footer: { position: 'absolute', bottom: 24, left: 36, right: 36, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: '#d1d5db', paddingTop: 8 },
  footerText: { fontSize: 7, color: '#9ca3af' },
})

function PdfLogo() {
  return (
    <View style={pdfStyles.brandRow}>
      <Svg viewBox="0 0 126 76" style={pdfStyles.brandMark}>
        <Path d="M58.5377 76L0 48.3855V29.2971L58.5377 0V14.1395L7.76261 42.4045L4.4186 38.8837L7.76261 35.2781L58.5377 60.093V76Z" fill="#0E768C" />
        <Path d="M88.6582 29.1628L101.628 14.1395H114H126.658V29.1628L88.6582 29.1628Z" fill="#0E768C" />
        <Path d="M85.0493 0H62.0726V76H85.0493V0Z" fill="#0E768C" />
        <Path d="M86.6046 59.2093L99.5743 44.1861H111.946H124.605V59.2093L86.6046 59.2093Z" fill="#0E768C" />
      </Svg>
      <View>
        <Text style={pdfStyles.brandName}>Cookie Banner</Text>
        <Text style={pdfStyles.brandDomain}>cookie-banner.ca</Text>
      </View>
    </View>
  )
}

function ScannerPDFDocument({ result }: { result: CookieScannerReportResult }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <PdfLogo />
          <Text style={pdfStyles.title}>Cookie Scan Report</Text>
          <Text style={pdfStyles.subtitle}>{result.url}</Text>
          <Text style={pdfStyles.subtitle}>Generated {new Date(result.timestamp).toLocaleString('en-CA')}</Text>
        </View>

        <View style={pdfStyles.summaryGrid}>
          <View style={pdfStyles.summaryBox}>
            <Text style={pdfStyles.summaryLabel}>Overall grade</Text>
            <Text style={pdfStyles.summaryValue}>{result.overallGrade}</Text>
          </View>
          <View style={pdfStyles.summaryBox}>
            <Text style={pdfStyles.summaryLabel}>Score</Text>
            <Text style={pdfStyles.summaryValue}>{result.overallScore}/100</Text>
          </View>
          <View style={pdfStyles.summaryBox}>
            <Text style={pdfStyles.summaryLabel}>Cookies found</Text>
            <Text style={pdfStyles.summaryValue}>{result.cookies.length}</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>Detected Signals</Text>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.cellStrong}>Consent banner</Text>
          <Text style={pdfStyles.cell}>{result.consentBanner?.detected ? result.consentBanner.vendor || 'Detected' : 'Not detected'}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.cellStrong}>Privacy policy</Text>
          <Text style={pdfStyles.cell}>{result.privacyPolicyUrl || 'Not found'}</Text>
        </View>
        <View style={pdfStyles.row}>
          <Text style={pdfStyles.cellStrong}>Scan method</Text>
          <Text style={pdfStyles.cell}>{result.scanMethod === 'headless' ? 'Browser scan' : 'Static HTML scan'}</Text>
        </View>

        <Text style={pdfStyles.sectionTitle}>Compliance Analysis</Text>
        {Object.entries(result.compliance).map(([key, reg]) => (
          <View key={key} style={pdfStyles.row}>
            <Text style={pdfStyles.cellStrong}>{formatRegulationName(key)}</Text>
            <Text style={pdfStyles.cell}>{reg.grade || '-'} ({reg.score}/100)</Text>
            <Text style={pdfStyles.cell}>{reg.issues[0] || 'No major issue listed'}</Text>
          </View>
        ))}

        <Text style={pdfStyles.sectionTitle}>Cookie Inventory</Text>
        {result.cookies.length === 0 ? (
          <Text style={pdfStyles.item}>No cookies were detected by this scan.</Text>
        ) : (
          result.cookies.slice(0, 30).map(cookie => (
            <View key={`${cookie.name}-${cookie.domain}`} style={pdfStyles.row}>
              <Text style={pdfStyles.cellStrong}>{cookie.name}</Text>
              <Text style={pdfStyles.cell}>{cookie.category} — {cookie.domain}</Text>
              <Text style={pdfStyles.cell}>{cookie.purpose}</Text>
            </View>
          ))
        )}

        <Text style={pdfStyles.sectionTitle}>Recommendations</Text>
        {result.recommendations.map((rec, index) => (
          <Text key={`${rec.text}-${index}`} style={pdfStyles.item}>
            {index + 1}. {rec.text} ({rec.regulation})
          </Text>
        ))}

        {result.note && <Text style={pdfStyles.note}>{result.note}</Text>}

        <View style={pdfStyles.footer} fixed>
          <Text style={pdfStyles.footerText}>cookie-banner.ca — Cookie Scan Report</Text>
          <Text style={pdfStyles.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}

export async function renderCookieScannerReportPDF(result: CookieScannerReportResult): Promise<Buffer> {
  return await renderToBuffer(<ScannerPDFDocument result={result} />)
}
