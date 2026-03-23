"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Play, Sparkles, ArrowRight, Circle } from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

/**
 * V2 Hero — A/B test variant
 *
 * Changes from V1:
 * 1. Faster animation (0.1s base + 0.15s steps vs 0.5s + 0.2s)
 * 2. h1 uses font-bold (700) instead of font-semibold (600)
 * 3. Stronger supporting copy under the form
 * 4. Removed invisible gradient on h1 text
 */
export function HeroSectionV2() {
  const { data: session } = useSession()
  const router = useRouter()
  const [url, setUrl] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const urlInputRef = React.useRef<HTMLInputElement>(null)

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    try {
      let domain = url.trim().toLowerCase()
      domain = domain.replace(/^https?:\/\//, '')
      domain = domain.replace(/^www\./, '')
      domain = domain.replace(/\/+$/, '')
      domain = domain.split('/')[0].split('?')[0].split('#')[0]

      const normalizedUrl = `https://${domain}`
      router.push(`/builder?url=${encodeURIComponent(normalizedUrl)}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      setIsLoading(false)
    }
  }

  // V2: Faster animation — content visible sooner
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              Used by 1,000+ websites
            </Badge>
          </motion.div>

          {/* V2: Title with font-bold and no invisible gradient */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl space-y-4"
          >
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground">
              Free Cookie Banner Generator
              <br />
              <span className="text-primary">GDPR, PIPEDA & Law 25 Compliant</span>
            </h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Generate cookie consent banners in 5 minutes. Match your brand. Works on any platform. Free plan available — upgrade to Pro for $99 one-time.
            </motion.p>
          </motion.div>

          {/* Actions */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4 w-full max-w-lg"
          >
            {!session ? (
              <div className="w-full space-y-4">
                <form onSubmit={handleUrlSubmit} className="w-full space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 p-1 bg-muted/50 rounded-lg border border-border relative z-30">
                    <Input
                      ref={urlInputRef}
                      type="text"
                      placeholder="yourdomain.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      className="h-14 text-base flex-1 border-0 bg-background focus-visible:ring-2 focus-visible:ring-primary relative z-30"
                      autoComplete="url"
                      inputMode="url"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-14 px-8 text-base font-semibold whitespace-nowrap"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Scanning...' : 'Scan Website'}
                    </Button>
                  </div>
                </form>
                {/* V2: Stronger supporting copy */}
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">
                    We detect your scripts and match your brand automatically — banner ready in minutes.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Start free, no credit card.{' '}
                    <Link href="/pricing" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                      Pro plan
                    </Link>
                    {' '}is $99 one-time — competitors charge $9-15/month.
                  </p>
                </div>
              </div>
            ) : (
              <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
