import { describe, expect, it } from 'vitest'
import {
  shouldRedirectZeroBannerToBuilder,
  shouldShowBannerSearchEmpty,
  shouldShowZeroBannerEmptyState,
} from './dashboard-empty'

describe('shouldRedirectZeroBannerToBuilder', () => {
  it('redirects every zero-banner session after the list loads', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: false,
        bannerCount: 0,
      }),
    ).toBe(true)
  })

  it('does not redirect when banners exist', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: false,
        bannerCount: 1,
      }),
    ).toBe(false)
  })

  it('waits until the banner list has loaded', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: true,
        bannerCount: 0,
      }),
    ).toBe(false)
  })
})

describe('shouldShowZeroBannerEmptyState', () => {
  it('no longer shows the empty dashboard CTA', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: false,
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
