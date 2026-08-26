import { describe, expect, it } from 'vitest'
import {
  shouldRedirectZeroBannerToBuilder,
  shouldShowBannerSearchEmpty,
  shouldShowZeroBannerEmptyState,
} from './dashboard-empty'

describe('shouldRedirectZeroBannerToBuilder', () => {
  it('redirects first-time empty sessions after the list loads', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: false,
        bannerCount: 0,
        hasEverCreatedBanner: false,
      }),
    ).toBe(true)
  })

  it('does not remint/redirect after the user deleted their last banner', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: false,
        bannerCount: 0,
        hasEverCreatedBanner: true,
      }),
    ).toBe(false)
  })

  it('does not redirect when banners exist', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: false,
        bannerCount: 1,
        hasEverCreatedBanner: true,
      }),
    ).toBe(false)
  })

  it('waits until the banner list has loaded', () => {
    expect(
      shouldRedirectZeroBannerToBuilder({
        isLoading: true,
        bannerCount: 0,
        hasEverCreatedBanner: false,
      }),
    ).toBe(false)
  })
})

describe('shouldShowZeroBannerEmptyState', () => {
  it('shows the empty CTA after delete-last so the user can create again', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: false,
        bannerCount: 0,
        hasEverCreatedBanner: true,
      }),
    ).toBe(true)
  })

  it('does not show the empty CTA for first-time empty (those redirect)', () => {
    expect(
      shouldShowZeroBannerEmptyState({
        isLoading: false,
        bannerCount: 0,
        hasEverCreatedBanner: false,
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
