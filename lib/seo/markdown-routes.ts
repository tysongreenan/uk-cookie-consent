/** HTML path → markdown source key. Safe to import from Edge middleware. */
export const PAGE_MARKDOWN_KEYS: Record<string, string> = {
  '/docs': 'docs',
  '/tools/cookie-scanner': 'tools-cookie-scanner',
  '/tools/privacy-policy': 'tools-privacy-policy',
  '/tools/cookie-policy': 'tools-cookie-policy',
}

export function getPageMarkdownKey(pathname: string): string | null {
  const normalized = pathname.replace(/\/$/, '') || '/'
  return PAGE_MARKDOWN_KEYS[normalized] ?? null
}
