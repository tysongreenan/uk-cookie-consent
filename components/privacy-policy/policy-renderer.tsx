'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, Printer } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface PolicyRendererProps {
  /** Server-generated HTML from our own API -- treated as trusted content */
  contentHtml: string
}

export function PolicyRenderer({ contentHtml }: PolicyRendererProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contentHtml)
      setCopied(true)
      toast.success('Policy HTML copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(
        '<!DOCTYPE html><html><head><title>Privacy Policy</title>' +
        '<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:0 auto;padding:40px 20px;color:#1a1a1a;line-height:1.7}' +
        'h1{font-size:1.75rem;margin-bottom:.5rem}h2{font-size:1.35rem;margin-top:2rem}h3{font-size:1.1rem;margin-top:1.5rem}' +
        'ul,ol{padding-left:1.5rem}li{margin-bottom:.25rem}p{margin:.75rem 0}</style>' +
        '</head><body>' + contentHtml + '</body></html>'
      )
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Content is generated server-side by our own API route, not from user input.
  // This follows the same pattern used by the blog renderer (app/blog/[slug]/page.tsx).
  const markup = { __html: contentHtml }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1.5" />
              Copy HTML
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-1.5" />
          Print
        </Button>
      </div>

      <div
        className="prose prose-sm sm:prose max-w-none rounded-md border border-border bg-card p-6 sm:p-8
          prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90
          prose-strong:text-foreground prose-a:text-primary
          prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-2
          prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8
          prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6"
        dangerouslySetInnerHTML={markup}
      />
    </div>
  )
}
