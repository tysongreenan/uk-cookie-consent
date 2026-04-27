export interface FontPreset {
  name: string
  value: string
  category: 'sans-serif' | 'serif' | 'monospace'
}

export const FONT_PRESETS: FontPreset[] = [
  { name: 'Inherit from website (recommended)', value: '', category: 'sans-serif' },
  { name: 'System UI', value: 'system-ui', category: 'sans-serif' },
  { name: 'Arial', value: 'Arial', category: 'sans-serif' },
  { name: 'Helvetica', value: 'Helvetica Neue', category: 'sans-serif' },
  { name: 'Verdana', value: 'Verdana', category: 'sans-serif' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS', category: 'sans-serif' },
  { name: 'Georgia', value: 'Georgia', category: 'serif' },
  { name: 'Times New Roman', value: 'Times New Roman', category: 'serif' },
  { name: 'Courier New', value: 'Courier New', category: 'monospace' },
]
