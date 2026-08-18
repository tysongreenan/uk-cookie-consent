import { describe, expect, it } from 'vitest'
import { getScanNextAction, scanActionImportsSelected } from './scan-next-action'

describe('getScanNextAction', () => {
  it('picks replace-CMP-and-gate-GTM when CookieYes and managed GTM are both present', () => {
    const action = getScanNextAction({
      cmpDetected: true,
      cmpVendor: 'CookieYes',
      managedCount: 2,
      managedByLabel: 'GTM-WL72WX4W',
      selectedImportableCount: 1,
    })
    expect(action.kind).toBe('replace_cmp_and_gate_gtm')
    expect(action.label).toMatch(/Replace CookieYes/i)
    expect(action.label).toMatch(/gate existing GTM-WL72WX4W/i)
    expect(scanActionImportsSelected(action.kind)).toBe(true)
  })

  it('picks gate GTM when there is no foreign CMP', () => {
    const action = getScanNextAction({
      cmpDetected: false,
      cmpVendor: null,
      managedCount: 2,
      managedByLabel: 'GTM-WL72WX4W',
      selectedImportableCount: 1,
    })
    expect(action.kind).toBe('gate_gtm')
    expect(action.label).toMatch(/Gate existing GTM-WL72WX4W/i)
  })

  it('does not treat our own banner as a CMP to replace', () => {
    const action = getScanNextAction({
      cmpDetected: true,
      cmpVendor: 'UK Cookie Consent',
      managedCount: 0,
      selectedImportableCount: 2,
    })
    expect(action.kind).toBe('import_selected')
  })

  it('replaces a foreign CMP when there is no tag manager to gate', () => {
    const action = getScanNextAction({
      cmpDetected: true,
      cmpVendor: 'CookieYes',
      managedCount: 0,
      selectedImportableCount: 0,
    })
    expect(action.kind).toBe('replace_cmp')
    expect(scanActionImportsSelected(action.kind)).toBe(false)
  })

  it('falls back to continue when nothing is selected', () => {
    expect(
      getScanNextAction({
        cmpDetected: false,
        managedCount: 0,
        selectedImportableCount: 0,
      }).kind,
    ).toBe('continue')
  })
})
