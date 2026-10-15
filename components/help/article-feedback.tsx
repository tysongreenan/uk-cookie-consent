'use client'

import { useState } from 'react'
import Link from 'next/link'
import { captureEvent } from '@/lib/analytics'

export function ArticleFeedback({ slug }: { slug: string }) {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null)

  const vote = (value: 'yes' | 'no') => {
    setAnswer(value)
    captureEvent('help_article_feedback', { slug, helpful: value === 'yes' })
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-y py-6" role="status" aria-live="polite">
      {answer ? (
        <p className="text-foreground">
          <span className="font-semibold">Thanks for your feedback.</span>
          {answer === 'no' && (
            <span className="text-muted-foreground">
              {' '}Still stuck?{' '}
              <Link href="/support" className="font-medium text-primary hover:underline">
                Contact support
              </Link>{' '}
              and we&apos;ll sort it out with you.
            </span>
          )}
        </p>
      ) : (
        <>
          <span className="font-semibold text-foreground">Was this article helpful?</span>
          <button
            type="button"
            onClick={() => vote('yes')}
            className="rounded-md bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => vote('no')}
            className="rounded-md bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            No
          </button>
        </>
      )}
    </div>
  )
}
