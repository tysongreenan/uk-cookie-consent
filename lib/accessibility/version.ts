/**
 * Accessibility Menu widget version.
 *
 * Ordinary fixes do NOT need a bump: `npm run build:a11y` writes a content hash to
 * `build-hash.ts` and the loader appends it as `?b=…`, so the immutable-cached
 * bundle gets a fresh URL on every rebuild. Bump the version only when the
 * runtime-config contract (`A11yRuntimeConfig`) changes incompatibly — the
 * version is part of the filename, so old banner.js copies keep loading the old
 * file until they refresh.
 */
export const A11Y_WIDGET_VERSION = 1

export interface A11yUpdate {
  version: number
  date: string
  title: string
  changes: string[]
}

export const A11Y_UPDATES: A11yUpdate[] = [
  {
    version: 1,
    date: '2026-09-11',
    title: 'Accessibility Menu (initial release)',
    changes: [
      'Profiles: seizure safe, read aloud, visually impaired, ADHD friendly, cognitive & learning, motor impaired',
      'Content: font size, weight, line height, letter spacing, dyslexia font, highlight links/titles',
      'Visual & navigation: super focus, read aloud, reading guide, big cursor, page structure',
      'Colour: monochrome, low/high saturation, high/light/dark contrast',
      'Tools: stop animations, hide images, image tooltips, mute sounds',
      'Preferences stored locally on the visitor\u2019s device; no cookies, no server calls',
    ],
  },
]
