import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog/blog'
import { Clock, Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Cookie Banner Generator Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || '',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cookie Banner Generator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cookie-banner.ca/logos/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cookie-banner.ca/blog/${post.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <article className="container max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Back Button */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground sm:gap-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div
            className="prose prose-xl max-w-none dark:prose-invert 
                       prose-headings:font-heading prose-headings:font-black prose-headings:scroll-mt-20
                       prose-h1:text-5xl sm:prose-h1:text-6xl prose-h1:mt-20 prose-h1:mb-12 prose-h1:text-primary prose-h1:leading-tight
                       prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-primary/30 prose-h2:text-brand-red prose-h2:leading-tight
                       prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-brand-teal prose-h3:leading-tight
                       prose-h4:text-xl sm:prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-4 prose-h4:text-primary prose-h4:leading-tight
                       prose-h5:text-lg sm:prose-h5:text-xl prose-h5:mt-8 prose-h5:mb-3 prose-h5:text-foreground prose-h5:leading-tight
                       prose-h6:text-base sm:prose-h6:text-lg prose-h6:mt-6 prose-h6:mb-2 prose-h6:text-foreground prose-h6:leading-tight
                       prose-p:text-lg prose-p:leading-relaxed prose-p:my-6 prose-p:text-foreground/90
                       prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-brand-red
                       prose-strong:text-foreground prose-strong:font-extrabold
                       prose-code:text-sm prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-primary prose-code:font-semibold
                       prose-pre:bg-muted prose-pre:border-2 prose-pre:border-primary/20 prose-pre:rounded-lg prose-pre:p-6 prose-pre:my-8
                       prose-ul:my-8 prose-ul:space-y-3
                       prose-ol:my-8 prose-ol:space-y-3
                       prose-li:text-lg prose-li:leading-relaxed prose-li:my-3
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:font-medium
                       prose-hr:my-16 prose-hr:border-2 prose-hr:border-border
                       prose-table:my-8 prose-table:border-collapse
                       prose-th:bg-primary/10 prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-primary
                       prose-td:p-4 prose-td:border prose-td:border-border"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-12 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6 sm:p-8">
            <h3 className="mb-3 font-heading text-xl font-bold sm:text-2xl">
              Ready to add a cookie banner to your site?
            </h3>
            <p className="mb-4 text-muted-foreground">
              Create unlimited, fully branded cookie banners that are GDPR & PIPEDA compliant. First 1,000 accounts are free forever.
            </p>
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white">
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t bg-muted/20 px-4 py-12 sm:px-6 sm:py-16">
            <div className="container max-w-6xl">
              <h2 className="mb-8 font-heading text-2xl font-bold sm:text-3xl">
                Related Articles
              </h2>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg">
                      <CardContent className="p-5">
                        <h3 className="mb-2 font-heading text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                          {relatedPost.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                          {relatedPost.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={relatedPost.date}>
                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}

