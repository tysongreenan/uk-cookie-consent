/** Relative luminance → black or white text for a given background (WCAG-ish 4.5:1). */
export function readableOn(bg: string): string {
  const rgb = parseHex(bg)
  if (!rgb) return '#ffffff'
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return l > 0.45 ? '#111111' : '#ffffff'
}

export function parseHex(c: string): [number, number, number] | null {
  const hex = /^#([0-9a-f]{3,8})$/i.exec(c.trim())
  if (!hex) return null
  let v = hex[1]
  if (v.length === 3 || v.length === 4) v = v.split('').map((ch) => ch + ch).join('')
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}

export function contrast(fg: string, bg: string): number {
  const a = parseHex(fg)
  const b = parseHex(bg)
  if (!a || !b) return 0
  const lin = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const L = (rgb: [number, number, number]) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2])
  const la = L(a)
  const lb = L(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim())
}
