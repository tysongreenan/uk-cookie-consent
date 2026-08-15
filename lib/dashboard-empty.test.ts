import { describe, expect, it } from 'vitest'
import { shouldShowBannerSearchEmpty, shouldShowZeroBannerEmptyState } from './dashboard-empty'

describe('shouldShowZeroBannerEmptyState', () => {
  it('shows the create-first-banner CTA when the user has zero banners', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: false,
        bannerCount: 0,
      }),
    ).toBe(true)
  })

  it('does not hide existing banners', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: false,
        bannerCount: 1,
      }),
    ).toBe(false)
  })

  it('waits until the banner list has loaded', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: true,
        bannerCount: 0,
      }),
    ).toBe(false)
  })
})

describe('shouldShowBannerSearchEmpty', () => {
  it('keeps search-empty separate from the zero-banner CTA', () => {
    expect(
      shouldShowBannerSearchEmpty({
        bannerCount: 2,
        filteredCount: 0,
        searchTerm: 'acme',
      }),
    ).toBe(true)
    expect(
      shouldShowBannerSearchEmpty({
        bannerCount: 0,
        filteredCount: 0,
        searchTerm: '',
      }),
    ).toBe(false)
  })
})
