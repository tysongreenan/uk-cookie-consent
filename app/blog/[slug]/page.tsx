import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog/blog'
import { Clock, Calendar, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { BlogCTA } from '@/components/blog/blog-cta'
import { EmailSignup } from '@/components/blog/email-signup'
import { BlogRecap } from '@/components/blog/blog-recap'
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

          <article className="prose prose-lg max-w-none">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold mb-4 sm:text-5xl">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {post.image && (
                <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Top CTA Callout */}
            <div className="mb-8">
              <BlogCTA />
            </div>

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
                  
                  {/* Email Signup in Middle */}
                  <div className="my-12">
                    <EmailSignup />
                  </div>
                  
                  {/* Blog Recap */}
                  <div className="my-12">
                    <BlogRecap />
                  </div>
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
              <p className="mb-6 text-muted-foreground">
                Get your free, compliant cookie banner in minutes. No credit card required.
              </p>
              <Button asChild size="lg">
                <Link href="/auth/signup">
                  Create Your Banner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.slug} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedPost.readingTime} min read</span>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                        >
                          Read more
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}