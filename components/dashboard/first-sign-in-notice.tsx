'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PRODUCT_NEWS } from '@/lib/product-news'
import { newsStorageKey, shouldShowFirstSignInNotice } from '@/lib/first-sign-in-notice'

export function FirstSignInNotice() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const userId = session?.user?.id
  const [visible, setVisible] = useState(false)
  const news = PRODUCT_NEWS

  useEffect(() => {
    if (status !== 'authenticated' || !userId || !news || !pathname) return
    try {
      const key = newsStorageKey(userId, news.id)
      const seen = localStorage.getItem(key) === 'seen'
      const openThisSession = sessionStorage.getItem(key) === pathname
      if (
        !shouldShowFirstSignInNotice({
          userId,
          news,
          seen,
          openThisSession,
        })
      ) {
        setVisible(false)
        return
      }
      localStorage.setItem(key, 'seen')
      sessionStorage.setItem(key, pathname)
      setVisible(true)
    } catch {
      setVisible(false)
    }
  }, [status, userId, news, pathname])

  if (!visible || !news) return null

  const dismiss = () => {
    if (userId) {
      try {
        sessionStorage.setItem(newsStorageKey(userId, news.id), 'dismissed')
      } catch {
        /* ignore */
      }
    }
    setVisible(false)
  }

  return (
    <Card className="mx-6 mt-6 border border-border bg-card">
      <CardContent className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">{news.title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{news.body}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {news.href ? (
            <Button asChild size="sm" onClick={dismiss}>
              <Link href={news.href}>{news.linkLabel || 'Open'}</Link>
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" aria-label="Dismiss" onClick={dismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
