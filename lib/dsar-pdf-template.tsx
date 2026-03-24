/**
 * DSAR PDF Report Template — generates a formal PDF document
 * using @react-pdf/renderer for Law 25 / GDPR data access reports.
 */

import React from 'react'
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'
import type { DSARReport, DSARReportSection } from '@/types'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#0E768C',
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#0E768C',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  metaLabel: {
    width: 140,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#555',
  },
  metaValue: {
    fontSize: 9,
    color: '#333',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0E768C',
    marginTop: 20,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionDescription: {
    fontSize: 9,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  refusedBadge: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  refusedText: {
    fontSize: 9,
    color: '#dc2626',
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    flex: 1,
    paddingRight: 4,
  },
  tableCell: {
    fontSize: 8,
    color: '#4b5563',
    flex: 1,
    paddingRight: 4,
  },
  emptySection: {
    fontSize: 9,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#d1d5db',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: '#999',
  },
  pageNumber: {
    fontSize: 7,
    color: '#999',
  },
  disclaimer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  disclaimerText: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.4,
  },
})

const MAX_TABLE_ROWS = 100 // Limit rows per section in PDF to keep file size reasonable

function ReportSection({ section }: { section: DSARReportSection }) {
  if (section.refused) {
    return (
      <View>
        <Text style={styles.sectionTitle}>{section.name}</Text>
        <View style={styles.refusedBadge}>
          <Text style={styles.refusedText}>
            REFUSED: {section.refusalReason || 'No reason provided'}
          </Text>
        </View>
      </View>
    )
  }

  if (section.data.length === 0) {
    return (
      <View>
        <Text style={styles.sectionTitle}>{section.name}</Text>
        <Text style={styles.sectionDescription}>{section.description}</Text>
        <Text style={styles.emptySection}>No data found for this section.</Text>
      </View>
    )
  }

  const headers = Object.keys(section.data[0])
  const rows = section.data.slice(0, MAX_TABLE_ROWS)
  const truncated = section.data.length > MAX_TABLE_ROWS

  return (
    <View>
      <Text style={styles.sectionTitle}>{section.name}</Text>
      <Text style={styles.sectionDescription}>{section.description}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {headers.map((h) => (
            <Text key={h} style={styles.tableHeaderCell}>
              {h.replace(/_/g, ' ').toUpperCase()}
            </Text>
          ))}
        </View>
        {rows.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            {headers.map((h) => (
              <Text key={h} style={styles.tableCell}>
                {String(row[h] ?? '')}
              </Text>
            ))}
          </View>
        ))}
      </View>
      {truncated && (
        <Text style={styles.emptySection}>
          Showing {MAX_TABLE_ROWS} of {section.data.length} records. Full data available in JSON/CSV format.
        </Text>
      )}
    </View>
  )
}

function DSARPDFDocument({ report }: { report: DSARReport }) {
  const lang = report.language
  const reportTitle = lang === 'fr'
    ? "Rapport d'acces aux donnees personnelles"
    : 'Data Subject Access Report'
  const generatedLabel = lang === 'fr' ? 'Genere le' : 'Generated'
  const requestIdLabel = lang === 'fr' ? 'No de demande' : 'Request ID'
  const subjectLabel = lang === 'fr' ? 'Sujet' : 'Subject'
  const orgLabel = lang === 'fr' ? 'Organisation' : 'Organization'
  const recordsLabel = lang === 'fr' ? 'Enregistrements trouves' : 'Records found'

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.subtitle}>
            {lang === 'fr'
              ? 'Conformement a la Loi 25 du Quebec — Droit d\'acces'
              : 'Pursuant to Quebec Law 25 — Right of Access'}
          </Text>
        </View>

        {/* Metadata */}
        <View style={{ marginBottom: 16 }}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{requestIdLabel}:</Text>
            <Text style={styles.metaValue}>{report.requestId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{generatedLabel}:</Text>
            <Text style={styles.metaValue}>{new Date(report.generatedAt).toLocaleString()}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{subjectLabel}:</Text>
            <Text style={styles.metaValue}>
              {report.subjectIdentifier.type}: {report.subjectIdentifier.value}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{orgLabel}:</Text>
            <Text style={styles.metaValue}>{report.organization.name}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>{recordsLabel}:</Text>
            <Text style={styles.metaValue}>{report.metadata.recordsFound}</Text>
          </View>
        </View>

        {/* Sections */}
        {report.sections.map((section, i) => (
          <ReportSection key={i} section={section} />
        ))}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            {lang === 'fr'
              ? 'Ce rapport a ete genere automatiquement par cookie-banner.ca conformement a la Loi 25 du Quebec. Les donnees presentees refletent les informations personnelles detenues par l\'organisation au moment de la generation. Pour toute question, veuillez contacter l\'organisation directement.'
              : 'This report was automatically generated by cookie-banner.ca pursuant to Quebec Law 25. The data presented reflects the personal information held by the organization at the time of generation. For any questions, please contact the organization directly.'}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>cookie-banner.ca — Law 25 Data Access Report</Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}

/**
 * Render a DSAR report as a PDF buffer.
 * The buffer can be uploaded directly to Supabase Storage.
 */
export async function renderDSARReportPDF(report: DSARReport): Promise<Buffer> {
  return await renderToBuffer(<DSARPDFDocument report={report} />)
}
