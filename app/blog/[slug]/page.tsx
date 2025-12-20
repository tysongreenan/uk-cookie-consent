import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog/blog'
import { ArrowLeft, Calendar, Clock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { MobileTableOfContents } from '@/components/blog/mobile-toc'
import { AuthorCard } from '@/components/blog/author-card'
import { ReadMoreSection } from '@/components/blog/read-more-section'
import { HashScrollHandler } from '@/components/blog/hash-scroll-handler'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { StructuredData } from '@/components/seo/structured-data'
import { getAuthor } from '@/lib/authors'
import { formatDate } from '@/lib/utils'

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

  const date = new Date(post.date)
  const formattedDate = formatDate(date)
  const author = getAuthor(post.author || 'cookie-banner-team')

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

      <div className="min-h-screen bg-background relative">
        <HashScrollHandler />
        <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.2}
            flickerChance={0.05}
          />
        </div>

        <Header />

        <div className="space-y-4 border-b border-border relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
            <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
              <Button variant="outline" asChild className="h-6 w-6">
                <Link href="/blog">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="sr-only">Back to all articles</span>
                </Link>
              </Button>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 text-muted-foreground">
                  {post.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <time className="font-medium text-muted-foreground">
                {formattedDate}
              </time>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-balance">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
                {post.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0 z-10">
          <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
          <main className="w-full p-0 overflow-hidden">
            {post.image && (
              <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 lg:p-10">
              <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
            <div className="mt-10">
              <ReadMoreSection
                currentSlug={post.slug}
                currentTags={post.tags}
              />
            </div>
          </main>

          <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
            <div className="sticky top-20 space-y-8">
              <AuthorCard author={author} />
              <div className="border border-border rounded-lg p-6 bg-card">
                <TableOfContents />
              </div>
            </div>
          </aside>
        </div>

        <MobileTableOfContents />
        <Footer />
      </div>
    </>
  )
}
