export function shouldShowZeroBannerEmptyState(options: {
  isLoading: boolean
  bannerCount: number
  searchTerm?: string
}): boolean {
  if (options.isLoading) return false
  if (options.bannerCount > 0) return false
  return true
}

export function shouldShowBannerSearchEmpty(options: {
  bannerCount: number
  filteredCount: number
  searchTerm: string
}): boolean {
  return options.bannerCount > 0 && options.filteredCount === 0 && options.searchTerm.trim().length > 0
}
