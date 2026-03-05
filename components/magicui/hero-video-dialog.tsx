"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Play, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface HeroVideoDialogProps {
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt: string
  thumbnailSrcDark?: string
  className?: string
  animationStyle?: "from-center" | "from-bottom" | "from-top" | "from-left" | "from-right"
}

const animationVariants = {
  "from-center": {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  "from-bottom": {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  },
  "from-top": {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  "from-left": {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  },
  "from-right": {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt,
  thumbnailSrcDark,
  className,
  animationStyle = "from-center",
}: HeroVideoDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const animation = animationVariants[animationStyle]

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    
    setIsLoading(true)
    try {
      // Normalize URL
      let normalizedUrl = url.trim()
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`
      }
      
      router.push(`/builder?url=${encodeURIComponent(normalizedUrl)}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-24">
      {/* Background decoration - minimal grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Text Content - Centered */}
          <div className="flex flex-col items-center gap-4 text-center max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-foreground" />
              <span className="text-muted-foreground">Used by 1,000+ websites</span>
            </div>

            {/* H1 - Following Audience + Outcome + Proof formula */}
            <div className="space-y-4">
              <h1 className="font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground">
                Create GDPR-Compliant Cookie Banners in 5 Minutes —{' '}
                <span className="text-foreground/80">
                  Used by 1,000+ Websites
                </span>
              </h1>
              
              <div className="mx-auto max-w-2xl space-y-3">
                <p className="text-lg font-semibold text-foreground">
                  ✓ Save 3+ Hours Per Website Setup
                </p>
                
                <p className="text-lg font-semibold text-foreground">
                  ✓ Avoid $20K+ GDPR Fines Automatically
                </p>
                
                <p className="text-lg font-semibold text-foreground">
                  ✓ Copy & Paste in 5 Minutes
                </p>
              </div>
            </div>

            {/* CTA - More prominent */}
            <div className="w-full max-w-sm">
              {session ? (
                <Button asChild size="lg" className="w-full h-12 text-base font-semibold">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <form onSubmit={handleUrlSubmit} className="space-y-2">
                  <div className="flex flex-col gap-2">
                    <Input
                      type="url"
                      placeholder="millerwaste.ca"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      className="h-11 text-base"
                      autoComplete="url"
                      inputMode="url"
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-11 w-full text-base font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Scanning...' : 'Scan Website'}
                    </Button>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      ✓ We will search your website for any scripts and import them for you as well as branding
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Free forever. No credit card required.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Video Dialog - Centered Below */}
          <div className="flex justify-center w-full">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.button
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-lg w-full max-w-2xl",
                    className
                  )}
                  initial={animation.initial}
                  animate={animation.animate}
                  exit={animation.exit}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    {thumbnailSrcDark ? (
                      <>
                        <img
                          src={thumbnailSrc}
                          alt={thumbnailAlt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 block dark:hidden"
                        />
                        <img
                          src={thumbnailSrcDark}
                          alt={thumbnailAlt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 hidden dark:block"
                        />
                      </>
                    ) : (
                      <img
                        src={thumbnailSrc}
                        alt={thumbnailAlt}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                        <Play className="ml-1 h-8 w-8 text-black" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0">
                <div className="aspect-video w-full">
                  <iframe
                    src={videoSrc}
                    className="h-full w-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={thumbnailAlt}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}

