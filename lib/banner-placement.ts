export type BarButtonPlacement = 'inline' | 'stacked-right' | 'categories'

const PLACEMENTS: BarButtonPlacement[] = ['inline', 'stacked-right', 'categories']

function isBar(position: string | undefined) {
  return position === 'top' || position === 'bottom'
}

/**
 * Categories and stacked buttons only apply when that placement was saved
 * on a top or bottom bar. Anything else stays on the inline row.
 */
export function resolveButtonPlacement(
  position: string | undefined,
  placement: string | undefined
): BarButtonPlacement {
  const explicit = PLACEMENTS.find((value) => value === placement)
  if (!isBar(position)) return 'inline'
  if (explicit === 'stacked-right' || explicit === 'categories') return explicit
  return 'inline'
}
