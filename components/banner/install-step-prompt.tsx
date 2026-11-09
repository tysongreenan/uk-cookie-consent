'use client'

import { Code, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function InstallStepCallout({
  snippet,
  copied,
  onCopy,
  onShowInstallStep,
}: {
  snippet: string
  copied: boolean
  onCopy: () => void
  onShowInstallStep: () => void
}) {
  return (
    <div className="mb-6 rounded-lg border border-primary/40 bg-primary/[0.04] p-4 sm:p-5">
      <h3 className="font-semibold">Install your banner</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Paste this line in your site&apos;s &lt;head&gt;. Visitors will not see the banner until you do.
        WordPress, Shopify, Wix, and Squarespace steps are on the install page.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-md bg-muted/60 p-3 text-sm">
        <code>{snippet}</code>
      </pre>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={onCopy} className="sm:min-w-[12rem]">
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy install snippet'}
        </Button>
        <Button type="button" variant="outline" onClick={onShowInstallStep}>
          Where to paste it
        </Button>
      </div>
    </div>
  )
}

export function InstallStepNavButton({
  active,
  pending,
  onSelect,
}: {
  active: boolean
  pending: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="code-panel"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : pending
            ? 'text-foreground bg-primary/10 hover:bg-primary/15'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      <Code className="h-4 w-4" />
      <span className="flex-1 text-left">Install snippet</span>
      {pending && !active && (
        <span className="text-[10px] font-semibold uppercase tracking-wide">Next</span>
      )}
    </button>
  )
}
