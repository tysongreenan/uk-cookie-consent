'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { captureEvent } from '@/lib/analytics'

export function ArticleFeedback({ slug }: { slug: string }) {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)

  const vote = (value: 'yes' | 'no') => {
    setAnswer(value)
    captureEvent('help_article_feedback', { slug, helpful: value === 'yes' })
  }

  if (answer) {
    return (
      <div className="rounded-xl border bg-muted/30 p-6 text-center" role="status">
        <p className="font-medium text-foreground">Thanks for letting us know.</p>
        {answer === 'no' && (
          <p className="mt-1 text-sm text-muted-foreground">
            Still stuck?{' '}
            <Link href="/support" className="font-medium text-primary hover:underline">
              Contact support
            </Link>{' '}
            and we&apos;ll sort it out with you.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-muted/30 p-6 text-center">
      <p className="font-medium text-foreground">Was this article helpful?</p>
      <div className="mt-3 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => vote('yes')}
          className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ThumbsUp className="h-4 w-4" aria-hidden="true" />
          Yes
        </button>
        <button
          type="button"
          onClick={() => vote('no')}
          className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ThumbsDown className="h-4 w-4" aria-hidden="true" />
          No
        </button>
      </div>
    </div>
  )
}
