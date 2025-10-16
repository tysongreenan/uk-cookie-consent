import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog/blog'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

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

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <div className="text-center">
              <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Cookie Compliance Insights
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Stay informed about cookie consent laws, privacy regulations, and best practices for website compliance.
              </p>
            </div>
          </div>
        </section>

      {/* Blog Posts Grid */}
      <section className="mx-auto max-w-4xl px-4 py-12">
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full transition-all hover:shadow-lg">
                    {post.image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5 sm:p-6">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="mb-3 font-heading text-xl font-bold leading-tight transition-colors group-hover:text-primary sm:text-2xl">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground sm:text-base">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
      </section>
      </main>
      <Footer />
    </div>
  )
}

