/** True when the client prefers markdown over HTML (Accept: text/markdown). */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false

  let markdownQ = 0
  let htmlQ = 0
  let sawMarkdown = false
  let sawHtml = false

  for (const part of acceptHeader.split(',')) {
    const [rawType, ...params] = part.trim().split(';')
    const type = rawType.trim().toLowerCase()
    if (!type) continue

    const qParam = params.find((param) => param.trim().startsWith('q='))
    const parsedQ = qParam ? Number.parseFloat(qParam.split('=')[1] ?? '') : 1
    const q = Number.isFinite(parsedQ) ? parsedQ : 1

    if (type === 'text/markdown' || type === 'text/x-markdown') {
      sawMarkdown = true
      markdownQ = Math.max(markdownQ, q)
    }
    if (type === 'text/html' || type === 'application/xhtml+xml') {
      sawHtml = true
      htmlQ = Math.max(htmlQ, q)
    }
  }

  if (!sawMarkdown || markdownQ <= 0) return false
  if (!sawHtml) return true
  return markdownQ >= htmlQ
}
