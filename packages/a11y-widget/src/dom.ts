export const HOST_ID = 'cb-a11y-host'
export const ADJUST_STYLE_ID = 'cb-a11y-adjust'
export const Z_HOST = 2147483001

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | number | boolean | null | undefined> = {},
  children: Array<Node | string | null | undefined> = [],
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue
    if (k === 'class') el.className = String(v)
    else if (k === 'text') el.textContent = String(v)
    else if (k === 'html') el.innerHTML = String(v)
    else el.setAttribute(k, v === true ? '' : String(v))
  }
  for (const c of children) {
    if (c === null || c === undefined) continue
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c)
  }
  return el
}

export function svg(pathMarkup: string, size = 24): SVGSVGElement {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  el.setAttribute('viewBox', '0 0 24 24')
  el.setAttribute('width', String(size))
  el.setAttribute('height', String(size))
  el.setAttribute('fill', 'none')
  el.setAttribute('stroke', 'currentColor')
  el.setAttribute('stroke-width', '1.9')
  el.setAttribute('stroke-linecap', 'round')
  el.setAttribute('stroke-linejoin', 'round')
  el.setAttribute('aria-hidden', 'true')
  el.setAttribute('focusable', 'false')
  el.innerHTML = pathMarkup
  return el
}

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`))
}

/** Relative luminance → pick black or white text for a given background. */
export function readableOn(bg: string): string {
  const rgb = parseColor(bg)
  if (!rgb) return '#ffffff'
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return l > 0.45 ? '#111111' : '#ffffff'
}

function luminance([r, g, b]: [number, number, number]): number {
  const f = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export function parseColor(c: string): [number, number, number] | null {
  const hex = /^#([0-9a-f]{3,8})$/i.exec(c.trim())
  if (hex) {
    let v = hex[1]
    if (v.length === 3 || v.length === 4) v = v.split('').map((ch) => ch + ch).join('')
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
  }
  const rgb = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i.exec(c)
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])]
  return null
}

export function contrast(fg: string, bg: string): number {
  const a = parseColor(fg)
  const b = parseColor(bg)
  if (!a || !b) return 0
  return contrastRatio(a, b)
}

/**
 * Accent as *text* on a surface: the owner's brand colour, mixed toward black
 * (light surfaces) or white (dark surfaces) only as far as needed to reach
 * 4.5:1. Keeps the hue while never printing unreadable labels.
 */
export function accentInk(accent: string, surface: string): string {
  const a = parseColor(accent)
  const s = parseColor(surface)
  if (!a || !s) return accent
  const towards: [number, number, number] = luminance(s) > 0.4 ? [0, 0, 0] : [255, 255, 255]
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const mixed = a.map((c, i) => Math.round(c + (towards[i] - c) * t)) as [number, number, number]
    if (contrastRatio(mixed, s) >= 4.5) return `rgb(${mixed.join(',')})`
  }
  return towards[0] === 0 ? '#111111' : '#ffffff'
}

export function isMobile(): boolean {
  try {
    return window.matchMedia('(max-width: 767px)').matches
  } catch {
    return false
  }
}

export function prefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

/**
 * Innermost page element for a pointer/focus event, walking composedPath so
 * we still see targets inside open shadow trees. Null if the event is inside
 * our own menu host (the visitor is using the widget, not the page).
 */
export function pageTarget(e: Event): Element | null {
  const path = typeof e.composedPath === 'function' ? e.composedPath() : []
  const nodes = path.length ? path : [e.target]
  for (const n of nodes) {
    if (!(n instanceof Element)) continue
    if (n.id === HOST_ID || n.closest?.(`#${HOST_ID}`)) return null
    return n
  }
  return null
}

export function focusables(root: ParentNode): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null || el.getClientRects().length > 0)
}
