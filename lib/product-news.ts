/**
 * The signed-in notice reads this and nothing else.
 * Leave it null until there is a real product change worth one sentence.
 * A styling tweak, a version number, or a feature that has been out for months
 * is not news.
 */
export type ProductNews = {
  id: string
  title: string
  body: string
  href?: string
  linkLabel?: string
}

export const PRODUCT_NEWS: ProductNews | null = null
