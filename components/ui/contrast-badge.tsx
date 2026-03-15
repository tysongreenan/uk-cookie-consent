'use client'

import chroma from 'chroma-js'

interface ContrastBadgeProps {
  foreground: string
  background: string
}

function getContrastRatio(fg: string, bg: string): number {
  try {
    return chroma.contrast(fg, bg)
  } catch {
    return 0
  }
}

function wcagLevel(ratio: number): { level: string; pass: boolean } {
  if (ratio >= 7) return { level: 'AAA', pass: true }
  if (ratio >= 4.5) return { level: 'AA', pass: true }
  if (ratio >= 3) return { level: 'AA Large', pass: true }
  return { level: 'Fail', pass: false }
}

export function ContrastBadge({ foreground, background }: ContrastBadgeProps) {
  const ratio = getContrastRatio(foreground, background)
  const { level, pass } = wcagLevel(ratio)

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
        pass
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
      title={`Contrast ratio: ${ratio.toFixed(1)}:1 (WCAG ${level})`}
    >
      {pass ? '✓' : '✗'} {ratio.toFixed(1)}:1
    </span>
  )
}
