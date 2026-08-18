const OWN_CMP = 'UK Cookie Consent'

export type ScanNextActionKind =
  | 'replace_cmp_and_gate_gtm'
  | 'gate_gtm'
  | 'replace_cmp'
  | 'import_selected'
  | 'continue'

export type ScanNextAction = {
  kind: ScanNextActionKind
  label: string
}

function isForeignCmp(vendor: string | null | undefined, detected: boolean): vendor is string {
  return Boolean(detected && vendor && vendor !== OWN_CMP)
}

/**
 * After a scan, show one next action — replace the old CMP or gate GTM —
 * not "don't import" and "Import selected" at the same time.
 */
export function getScanNextAction(input: {
  cmpDetected: boolean
  cmpVendor?: string | null
  managedCount: number
  managedByLabel?: string | null
  selectedImportableCount: number
}): ScanNextAction {
  const vendor = input.cmpVendor || 'old CMP'
  const gtmLabel = input.managedByLabel || 'GTM'
  const foreignCmp = isForeignCmp(input.cmpVendor, input.cmpDetected)

  if (foreignCmp && input.managedCount > 0) {
    return {
      kind: 'replace_cmp_and_gate_gtm',
      label: `Replace ${vendor} — gate existing ${gtmLabel}`,
    }
  }

  if (input.managedCount > 0) {
    return {
      kind: 'gate_gtm',
      label: `Gate existing ${gtmLabel}`,
    }
  }

  if (foreignCmp) {
    return {
      kind: 'replace_cmp',
      label: `Replace ${vendor}`,
    }
  }

  if (input.selectedImportableCount > 0) {
    return {
      kind: 'import_selected',
      label: 'Import selected scripts',
    }
  }

  return {
    kind: 'continue',
    label: 'Continue without importing',
  }
}

export function scanActionImportsSelected(kind: ScanNextActionKind): boolean {
  return kind === 'replace_cmp_and_gate_gtm' || kind === 'gate_gtm' || kind === 'import_selected'
}
