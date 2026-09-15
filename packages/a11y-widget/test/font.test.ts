import { describe, expect, it } from 'vitest'
import { SYSTEM_FONT_STACK, buildMenuFontStack, sanitizeFontFamily } from '../src/font'

describe('buildMenuFontStack', () => {
  it('uses the page font when the banner inherits', () => {
    expect(buildMenuFontStack('', '"FreightSans", sans-serif')).toBe('"FreightSans", sans-serif')
  })

  it('does not duplicate an explicit family already on the page', () => {
    expect(buildMenuFontStack('FreightSans', '"FreightSans", Georgia, serif')).toBe('"FreightSans", Georgia, serif')
  })

  it('prepends a fallback family when the page did not expose it', () => {
    expect(buildMenuFontStack('Inter', 'Georgia, serif')).toBe('Inter, Georgia, serif')
  })

  it('quotes multi-word families and falls back to the system stack', () => {
    expect(buildMenuFontStack('Freight Sans', '')).toBe(`"Freight Sans", ${SYSTEM_FONT_STACK}`)
  })

  it('rejects css injection in the explicit name', () => {
    expect(sanitizeFontFamily('Inter"; color:red')).toBe('')
    expect(buildMenuFontStack('Inter"; color:red', '')).toBe(SYSTEM_FONT_STACK)
  })
})
