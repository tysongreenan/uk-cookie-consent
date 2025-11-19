import { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllPosts } from '@/lib/blog/blog'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { BlogCard } from '@/components/blog/blog-card'
import { TagFilter } from '@/components/blog/tag-filter'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog - Cookie Banner Insights | Cookie Banner Generator',
  description: 'Learn about cookie compliance, GDPR, PIPEDA, CASL, and web privacy best practices. Expert insights on cookie consent management for your website.',
  openGraph: {
    title: 'Blog - Cookie Banner Insights',
    description: 'Expert insights on cookie compliance, GDPR, PIPEDA, and web privacy.',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
}

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const allPosts = getAllPosts()

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  // Get all unique tags
  const allTags = [
    'All',
    ...Array.from(
      new Set(sortedPosts.flatMap((post) => post.tags || []))
    ).sort(),
  ]

  // Filter by selected tag
  const selectedTag = resolvedSearchParams.tag || 'All'
  const filteredPosts =
    selectedTag === 'All'
      ? sortedPosts
      : sortedPosts.filter((post) => post.tags.includes(selectedTag))

  // Calculate tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === 'All') {
        acc[tag] = sortedPosts.length
      } else {
        acc[tag] = sortedPosts.filter((post) => post.tags.includes(tag)).length
      }
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-background relative">
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
        <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
                Cookie Compliance Blog
              </h1>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                Expert insights on cookie compliance, GDPR, PIPEDA, and web privacy best practices.
              </p>
            </div>
          </div>
          {allTags.length > 1 && (
            <div className="max-w-7xl mx-auto w-full">
              <TagFilter
                tags={allTags}
                selectedTag={selectedTag}
                tagCounts={tagCounts}
              />
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
          <Suspense fallback={<div>Loading articles...</div>}>
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center border-x border-border">
                <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
                  filteredPosts.length < 4 ? 'border-b' : 'border-b-0'
                }`}
              >
                {filteredPosts.map((post, index) => {
                  const date = new Date(post.date)
                  const formattedDate = formatDate(date)
                  const showRightBorder = filteredPosts.length < 3 || (index + 1) % 3 !== 0

                  return (
                    <BlogCard
                      key={post.slug}
                      url={`/blog/${post.slug}`}
                      title={post.title}
                      description={post.description}
                      date={formattedDate}
                      thumbnail={post.image}
                      showRightBorder={showRightBorder}
                    />
                  )
                })}
              </div>
            )}
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  )
}
