/** First-time empty sessions skip the dashboard CTA and go to the builder. */
export function shouldRedirectZeroBannerToBuilder(options: {
  isLoading: boolean
  bannerCount: number
  hasEverCreatedBanner: boolean
}): boolean {
  if (options.isLoading) return false
  if (options.bannerCount > 0) return false
  // Signup / never-had-a-banner only — not after delete-last.
  return !options.hasEverCreatedBanner
}

export function shouldShowZeroBannerEmptyState(options: {
  isLoading: boolean
  bannerCount: number
  hasEverCreatedBanner: boolean
  searchTerm?: string
}): boolean {
  if (options.isLoading) return false
  if (options.bannerCount > 0) return false
  return options.hasEverCreatedBanner
}

export function shouldShowBannerSearchEmpty(options: {
  bannerCount: number
  filteredCount: number
  searchTerm: string
}): boolean {
  return options.bannerCount > 0 && options.filteredCount === 0 && options.searchTerm.trim().length > 0
}
