/** Zero-banner sessions skip the empty dashboard CTA and go to the builder. */
export function shouldRedirectZeroBannerToBuilder(options: {
  isLoading: boolean
  bannerCount: number
}): boolean {
  if (options.isLoading) return false
  return options.bannerCount === 0
}

export function shouldShowZeroBannerEmptyState(_options: {
  isLoading: boolean
  bannerCount: number
  searchTerm?: string
}): boolean {
  return false
}

export function shouldShowBannerSearchEmpty(options: {
  bannerCount: number
  filteredCount: number
  searchTerm: string
}): boolean {
  return options.bannerCount > 0 && options.filteredCount === 0 && options.searchTerm.trim().length > 0
}
