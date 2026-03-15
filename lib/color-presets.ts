export interface ColorPreset {
  name: string
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Classic Dark',
    colors: { background: '#1f2937', text: '#f9fafb', button: '#3b82f6', buttonText: '#ffffff', link: '#60a5fa' },
  },
  {
    name: 'Clean Light',
    colors: { background: '#ffffff', text: '#1f2937', button: '#2563eb', buttonText: '#ffffff', link: '#2563eb' },
  },
  {
    name: 'Minimal',
    colors: { background: '#fafafa', text: '#171717', button: '#171717', buttonText: '#fafafa', link: '#525252' },
  },
  {
    name: 'Ocean',
    colors: { background: '#0c4a6e', text: '#f0f9ff', button: '#0284c7', buttonText: '#ffffff', link: '#7dd3fc' },
  },
  {
    name: 'Forest',
    colors: { background: '#064e3b', text: '#ecfdf5', button: '#10b981', buttonText: '#ffffff', link: '#6ee7b7' },
  },
  {
    name: 'Warm',
    colors: { background: '#fef3c7', text: '#78350f', button: '#d97706', buttonText: '#ffffff', link: '#b45309' },
  },
  {
    name: 'Rose',
    colors: { background: '#fff1f2', text: '#881337', button: '#e11d48', buttonText: '#ffffff', link: '#be123c' },
  },
  {
    name: 'Purple',
    colors: { background: '#2e1065', text: '#f5f3ff', button: '#8b5cf6', buttonText: '#ffffff', link: '#c4b5fd' },
  },
]
