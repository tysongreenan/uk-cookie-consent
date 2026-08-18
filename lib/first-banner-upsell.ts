/**
 * First-banner Layout should not nag Upgrade. Bottom Bar is free and
 * should just work. Defer the Pro layouts upsell until after save + install.
 */
export function shouldShowLayoutProUpsell(options: {
  hasSavedBanner: boolean
  hasCopiedInstallSnippet: boolean
}): boolean {
  return options.hasSavedBanner && options.hasCopiedInstallSnippet
}
