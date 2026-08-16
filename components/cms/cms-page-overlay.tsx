import { getCmsPageBySlug } from '@/lib/cms-content'
import { CmsRichText } from '@/components/cms/cms-rich-text'

interface CmsPageOverlayProps {
  slug: string
  children: React.ReactNode
}

/**
 * If Agency CMS has published body copy for this slug, render that.
 * Otherwise keep the existing page (do not invent copy, do not blank product UI).
 */
export async function CmsPageOverlay({ slug, children }: CmsPageOverlayProps) {
  const page = await getCmsPageBySlug(slug)
  if (!page?.contentHtml) {
    return <>{children}</>
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
        {page.title}
      </h1>
      <CmsRichText html={page.contentHtml} />
    </div>
  )
}
