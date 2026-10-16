/**
 * Visual spec for the floating "Cookie Settings" button, shared by the live
 * banner (lib/banner-generator.ts) and every dashboard/landing preview so they
 * can't drift apart.
 *
 * The button lives on customers' sites, so it pins its own font and text
 * metrics instead of inheriting the host page's (serif body fonts, uppercase
 * or letter-spaced themes made it look dated).
 */

export const SYSTEM_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

type Size = 'small' | 'medium' | 'large'
type Shape = 'pill' | 'circle' | 'square'

const SIZES: Record<Size, { box: number; padding: string; fontSize: number; icon: number }> = {
  small: { box: 40, padding: '8px 14px', fontSize: 13, icon: 16 },
  medium: { box: 48, padding: '10px 16px', fontSize: 14, icon: 18 },
  large: { box: 56, padding: '12px 20px', fontSize: 15, icon: 20 },
}

export interface FloatingButtonStyle {
  background: string
  color: string
  border: string
  padding: string
  borderRadius: string
  width: string
  height: string
  fontSize: string
  fontFamily: string
  iconSize: number
}

export function getFloatingButtonStyle(config: any): FloatingButtonStyle {
  const floatingStyle = config?.branding?.footerLink?.floatingStyle || {}
  const shape: Shape = floatingStyle.shape || 'pill'
  const size = SIZES[(floatingStyle.size as Size) || 'small'] || SIZES.small
  const custom = floatingStyle.useCustomColors ? floatingStyle.customColors || {} : null

  const iconOnly = shape === 'circle' || shape === 'square'
  const fontFamily = config?.fontFamily ? `'${config.fontFamily}', ${SYSTEM_FONT_STACK}` : SYSTEM_FONT_STACK

  return {
    background: custom ? custom.background || '#374151' : config?.colors?.button || '#3b82f6',
    color: custom ? custom.text || '#ffffff' : config?.colors?.buttonText || '#ffffff',
    border: custom?.border ? `1px solid ${custom.border}` : 'none',
    padding: iconOnly ? '0' : size.padding,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '12px' : '999px',
    width: iconOnly ? `${size.box}px` : 'auto',
    height: iconOnly ? `${size.box}px` : 'auto',
    fontSize: `${size.fontSize}px`,
    fontFamily,
    iconSize: size.icon,
  }
}

export const FLOATING_BUTTON_SHADOW = '0 4px 14px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)'

/** Same spec as React inline styles, for dashboard and landing previews */
export function getFloatingButtonCssProperties(config: any): Record<string, string | number> {
  const style = getFloatingButtonStyle(config)
  return {
    background: style.background,
    color: style.color,
    border: style.border,
    padding: style.padding,
    borderRadius: style.borderRadius,
    width: style.width,
    height: style.height,
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: 600,
    fontStyle: 'normal',
    lineHeight: 1,
    letterSpacing: '-0.01em',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    gap: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
    boxShadow: FLOATING_BUTTON_SHADOW,
    WebkitFontSmoothing: 'antialiased',
  }
}
