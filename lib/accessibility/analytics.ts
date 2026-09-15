export const A11Y_TRACK_EVENTS = ['a11y_open', 'a11y_toggle', 'a11y_reset', 'a11y_profile'] as const

export type A11yTrackEvent = (typeof A11Y_TRACK_EVENTS)[number]

const EVENT_SET = new Set<string>(A11Y_TRACK_EVENTS)

export function isA11yTrackEvent(type: unknown): type is A11yTrackEvent {
  return typeof type === 'string' && EVENT_SET.has(type)
}
