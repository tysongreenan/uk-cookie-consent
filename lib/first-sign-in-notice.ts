import type { ProductNews } from '@/lib/product-news'

export function newsStorageKey(userId: string, newsId: string): string {
  return `cb-news:${userId}:${newsId}`
}

/**
 * Show the note once: the first signed-in visit after a real news item exists.
 * `openThisSession` keeps it on screen if this tab already opened it, including
 * a React strict-mode remount. The next visit hides it.
 */
export function shouldShowFirstSignInNotice(input: {
  userId?: string | null
  news: ProductNews | null
  seen: boolean
  openThisSession: boolean
}): boolean {
  if (!input.userId || !input.news) return false
  if (input.seen && !input.openThisSession) return false
  return true
}
