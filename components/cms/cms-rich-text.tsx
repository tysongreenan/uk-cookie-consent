export function CmsRichText({ html }: { html: string }) {
  if (!html.trim()) return null

  return (
    <div
      className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-p:tracking-tight"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
