import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog/blog'
import { Clock, Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

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
        <ReadingProgress />
        <Header />
        <main className="container max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
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


          {/* Mobile Table of Contents */}
          <div className="mb-8 lg:hidden">
            <TableOfContents content={post.content} />
          </div>

          {/* Content Layout with Table of Contents */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
                {/* Process the HTML content and render with custom styling */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
            
            {/* Table of Contents Sidebar */}
            <div className="lg:col-span-1">
              <div className="hidden lg:block">
                <TableOfContents content={post.content} />
              </div>
            </div>
          </div>

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
        </main>
        <Footer />
      </div>
    </>
  )
}

