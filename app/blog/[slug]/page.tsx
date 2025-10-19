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
import { CopyAllButton } from '@/components/blog/copy-all-button'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { StructuredData } from '@/components/seo/structured-data'

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
      
      {/* FAQ Structured Data if available */}
      {post.schema && (
        <StructuredData 
          type="faq" 
          data={post.schema.mainEntity || []} 
        />
      )}

      <div className="min-h-screen bg-background">
        <ReadingProgress />
        <Header />
        
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            {/* Back Button */}
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Written by {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    Updated: {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Key Takeaways:</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>✓ Learn the latest compliance requirements</div>
                  <div>✓ Get step-by-step implementation guide</div>
                  <div>✓ Avoid common compliance mistakes</div>
                </div>
              </div>

              {/* Copy All Button */}
              <div className="flex justify-center mb-8">
                <CopyAllButton content={post.content} />
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
          </div>
        </section>

        <main className="mx-auto max-w-2xl px-6 py-12">
          <article>
            {/* Top CTA Callout */}
            <div className="mb-16">
              <BlogCTA />
            </div>

            {/* Mobile Table of Contents */}
            <div className="mb-12 lg:hidden">
              <TableOfContents content={post.content} />
            </div>

            {/* Main Content - Clean and Focused */}
            <div 
              className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:text-center
                prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-left prose-h2:font-semibold
                prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-left prose-h3:font-medium
                prose-p:mb-6 prose-p:leading-relaxed prose-p:text-left prose-p:text-base
                prose-ul:mb-8 prose-ul:pl-0 prose-ul:text-left
                prose-ol:mb-8 prose-ol:pl-0 prose-ol:text-left
                prose-li:mb-3 prose-li:leading-relaxed prose-li:pl-2
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-strong:font-semibold prose-strong:text-gray-900
                prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto prose-img:my-8
                prose-hr:border-gray-200 prose-hr:my-12"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
            
            {/* Email Signup in Middle */}
            <div className="my-16">
              <EmailSignup />
            </div>
            
            {/* Blog Recap */}
            <div className="my-16">
              <BlogRecap />
            </div>

            {/* CTA Section */}
            <div className="mt-20 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Ready to Implement What You Learned?
                </h3>
                <div className="mb-6 text-gray-600 text-lg leading-relaxed space-y-2">
                  <div>✓ Get your free cookie banner in 5 minutes</div>
                  <div>✓ No credit card required</div>
                  <div>✓ Fully compliant with all privacy laws</div>
                </div>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/signup">
                    Create My Free Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </main>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-2xl px-6 py-16">
            <h2 className="mb-12 text-2xl font-bold text-center text-gray-900">Related Articles</h2>
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
        
        <Footer />
      </div>
    </>
  )
}