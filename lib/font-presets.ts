export interface FontPreset {
  name: string
  value: string
  category: 'sans-serif' | 'serif' | 'display'
}

export const FONT_PRESETS: FontPreset[] = [
  { name: 'System Default', value: '', category: 'sans-serif' },
  { name: 'Inter', value: 'Inter', category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto', category: 'sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', value: 'Lato', category: 'sans-serif' },
  { name: 'Poppins', value: 'Poppins', category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', category: 'sans-serif' },
  { name: 'Nunito', value: 'Nunito', category: 'sans-serif' },
  { name: 'DM Sans', value: 'DM Sans', category: 'sans-serif' },
  { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans', category: 'sans-serif' },
  { name: 'Work Sans', value: 'Work Sans', category: 'sans-serif' },
  { name: 'Outfit', value: 'Outfit', category: 'sans-serif' },
  { name: 'Manrope', value: 'Manrope', category: 'sans-serif' },
  { name: 'Raleway', value: 'Raleway', category: 'display' },
  { name: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { name: 'Source Serif 4', value: 'Source Serif 4', category: 'serif' },
]

export function getGoogleFontUrl(fontFamily: string): string {
  if (!fontFamily) return ''
  const encoded = fontFamily.replace(/ /g, '+')
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`
}
