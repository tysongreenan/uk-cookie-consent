/** Builder sections, in progress-bar order. Install stays last in this list. */
export const BUILDER_STEP_ORDER = [
  'compliance',
  'brand',
  'design',
  'content',
  'language',
  'scripts',
  'cookie-settings',
  'accessibility',
  'behavior',
  'geo-targeting',
  'analytics',
  'code',
] as const

export type BuilderStep = (typeof BUILDER_STEP_ORDER)[number]

/**
 * Open the install step once, when the first banner row exists.
 * A URL tab or a click the person already made wins — don't pull them back.
 */
export function shouldOpenInstallAfterFirstCreate(options: {
  bannerId: string | null
  explicitTab: string | null
  userChoseTab: boolean
  snippetAlreadyCopied: boolean
}): boolean {
  if (!options.bannerId) return false
  if (options.snippetAlreadyCopied) return false
  if (options.userChoseTab) return false
  if (options.explicitTab && options.explicitTab !== 'code') return false
  return true
}

/** Snippet + copy stay on screen while they configure, until they copy. */
export function shouldShowInstallCallout(options: {
  hasBannerId: boolean
  activeTab: string
  snippetCopied: boolean
}): boolean {
  return options.hasBannerId && options.activeTab !== 'code' && !options.snippetCopied
}

/** Pin Install above the other sections until the snippet has been copied. */
export function shouldPinInstallNav(options: {
  hasBannerId: boolean
  snippetCopied: boolean
}): boolean {
  return options.hasBannerId && !options.snippetCopied
}

export function builderProgress(options: {
  activeTab: string
  snippetCopied: boolean
}): { label: string; detail: string; percent: number } {
  const idx = Math.max(0, BUILDER_STEP_ORDER.indexOf(options.activeTab as BuilderStep))
  const total = BUILDER_STEP_ORDER.length
  const percent = Math.round(((idx + 1) / total) * 100)
  if (options.activeTab === 'code' && !options.snippetCopied) {
    return { label: 'Install your banner', detail: 'Last step', percent: 100 }
  }
  return {
    label: `Step ${idx + 1} of ${total}`,
    detail: `${percent}%`,
    percent,
  }
}
