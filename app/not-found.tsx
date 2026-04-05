import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Home, Wrench, BookOpen, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-6">404</Badge>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Page not found
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Here are some helpful links instead.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Link href="/">
              <Button variant="outline" className="w-full h-14 justify-start gap-3">
                <Home className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">Home</p>
                  <p className="text-xs text-muted-foreground">Back to the homepage</p>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full h-14 justify-start gap-3">
                <Wrench className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">Banner Builder</p>
                  <p className="text-xs text-muted-foreground">Create your banner</p>
                </div>
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="w-full h-14 justify-start gap-3">
                <BookOpen className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">Blog</p>
                  <p className="text-xs text-muted-foreground">Guides and tutorials</p>
                </div>
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" className="w-full h-14 justify-start gap-3">
                <HelpCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">Support</p>
                  <p className="text-xs text-muted-foreground">Get help</p>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
