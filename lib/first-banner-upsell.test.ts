import { describe, expect, it } from 'vitest'
import { shouldShowLayoutProUpsell } from './first-banner-upsell'

describe('shouldShowLayoutProUpsell', () => {
  it('hides the Layout Pro nag while building the first banner', () => {
    expect(shouldShowLayoutProUpsell({ hasSavedBanner: false, hasCopiedInstallSnippet: false })).toBe(false)
    expect(shouldShowLayoutProUpsell({ hasSavedBanner: true, hasCopiedInstallSnippet: false })).toBe(false)
  })

  it('allows a non-blocking note after save and install', () => {
    expect(shouldShowLayoutProUpsell({ hasSavedBanner: true, hasCopiedInstallSnippet: true })).toBe(true)
  })
})
