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

interface HeroAction {
  text: string
  href?: string
  variant?: "default" | "outline" | "glow"
  icon?: React.ReactNode
  onClick?: () => void
}

interface HeroBadge {
  text: string
  action?: {
    text: string
    href: string
  }
}

interface HeroImage {
  light: string
  dark?: string
  alt: string
}

interface HeroVideo {
  src: string
  thumbnail: {
    light: string
    dark?: string
    alt: string
  }
}

interface HeroSectionProps {
  badge?: HeroBadge
  title: string
  description?: string
  actions?: HeroAction[]
  image?: HeroImage
  video?: HeroVideo
  emailCapture?: boolean
  className?: string
  useGeometricBackground?: boolean
  title2?: string
}

function MiniCookieBanner({
    delay = 0,
    width = 280,
    height = 90,
    rotate = 0,
    position = "bottom",
    bannerIndex = 0,
    isAttracting = false,
    attractX = 0,
    attractY = 0,
    originalX = 0,
    originalY = 0,
    index = 0,
}: {
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    position?: "top" | "bottom" | "left" | "right";
    bannerIndex?: number;
    isAttracting?: boolean;
    attractX?: number;
    attractY?: number;
    originalX?: number;
    originalY?: number;
    index?: number;
}) {
    // Deterministic banner configs based on index to avoid hydration errors
    const bannerConfigs = [
        { title: "We use cookies", message: "Enhance your experience", buttons: ["Accept", "Reject"] },
        { title: "Cookie preferences", message: "Manage your settings", buttons: ["Accept All", "Preferences"] },
        { title: "We use cookies", message: "Analyze our traffic", buttons: ["Accept", "Reject"] },
        { title: "Cookie consent", message: "Choose your preferences", buttons: ["Accept All", "Customize"] },
        { title: "We use cookies", message: "Improve our website", buttons: ["Accept", "Settings"] },
        { title: "Cookie preferences", message: "Control your data", buttons: ["Accept All", "Manage"] },
    ];
    
    const config = bannerConfigs[bannerIndex % bannerConfigs.length];

    // Calculate full attraction to target (shapes go into the input field)
    // When not attracting, keep at 0,0 (stays in wrapper div's position)
    const attractOffsetX = isAttracting && originalX > 0 && originalY > 0 ? (attractX - originalX) : 0;
    const attractOffsetY = isAttracting && originalX > 0 && originalY > 0 ? (attractY - originalY) : 0;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: position === "top" ? -100 : 100,
                rotate: rotate - 8,
                scale: 0.8,
                x: 0,
            }}
            animate={{
                opacity: isAttracting ? [0.35, 0.6, 0] : 0.35,
                rotate: isAttracting ? [rotate, rotate * 1.2, rotate * 1.5] : rotate,
                scale: isAttracting ? [1, 0.8, 0.3] : 1,
                x: attractOffsetX,
                y: attractOffsetY,
            }}
            transition={{
                duration: isAttracting ? 1.2 : 2.4,
                delay: isAttracting ? index * 0.1 : delay,
                ease: isAttracting ? [0.23, 0.86, 0.39, 0.96] : [0.23, 0.86, 0.39, 0.96],
                opacity: { 
                    duration: isAttracting ? 1.2 : 1.5,
                    times: isAttracting ? [0, 0.7, 1] : undefined,
                },
            }}
            className="relative"
            style={{ 
                zIndex: isAttracting ? 10 : 0,
                pointerEvents: 'none',
            }}
        >
            <motion.div
                animate={{
                    y: isAttracting ? 0 : [0, 12, 0],
                }}
                transition={{
                    duration: isAttracting ? 1.2 : 14,
                    repeat: isAttracting ? 0 : Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                {/* Mini Cookie Banner - matches actual banner structure */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-lg",
                        "bg-background/85 backdrop-blur-sm",
                        "border border-foreground/[0.12]",
                        "shadow-lg shadow-foreground/[0.05]",
                        "p-2.5 flex flex-col gap-1.5"
                    )}
                >
                    {/* Close button (top right) */}
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-foreground/[0.15]" />
                    
                    {/* Title */}
                    <h3 className="text-[9px] font-semibold text-foreground/60 leading-tight m-0">
                        {config.title}
                    </h3>
                    
                    {/* Message */}
                    <p className="text-[7px] leading-tight text-foreground/40 m-0 flex-1">
                        {config.message}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex gap-1.5 mt-auto">
                        <div className="h-2.5 flex-1 rounded bg-foreground/[0.12] border border-foreground/[0.08]" />
                        <div className="h-2.5 w-10 rounded bg-foreground/[0.15] border border-foreground/[0.1]" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function HeroSection({
  badge,
  title,
  description,
  actions = [],
  image,
  video,
  emailCapture = false,
  className,
  useGeometricBackground = false,
  title2,
}: HeroSectionProps) {
  const [open, setOpen] = React.useState(false)
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isUrlFocused, setIsUrlFocused] = React.useState(false)
  const [urlInputPosition, setUrlInputPosition] = React.useState({ x: 0, y: 0 })
  const [sectionDimensions, setSectionDimensions] = React.useState({ width: 1200, height: 800 })
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const sectionRef = React.useRef<HTMLElement>(null)
  const { data: session } = useSession()
  const router = useRouter()

  // Track section dimensions
  React.useEffect(() => {
    const updateDimensions = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setSectionDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('scroll', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('scroll', updateDimensions)
    }
  }, [])

  // Track URL input position for attraction animation
  React.useEffect(() => {
    const updateUrlPosition = () => {
      if (urlInputRef.current && sectionRef.current) {
        const inputRect = urlInputRef.current.getBoundingClientRect()
        const sectionRect = sectionRef.current.getBoundingClientRect()
        setUrlInputPosition({
          x: inputRect.left + inputRect.width / 2 - sectionRect.left,
          y: inputRect.top + inputRect.height / 2 - sectionRect.top,
        })
      }
    }

    if (isUrlFocused) {
      updateUrlPosition()
      window.addEventListener('resize', updateUrlPosition)
      window.addEventListener('scroll', updateUrlPosition)
    }

    return () => {
      window.removeEventListener('resize', updateUrlPosition)
      window.removeEventListener('scroll', updateUrlPosition)
    }
  }, [isUrlFocused])

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
      
      // Navigate to builder with URL as query param
      // The builder will handle discovery
      router.push(`/builder?url=${encodeURIComponent(normalizedUrl)}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      setIsLoading(false)
    }
  }

  const handleUrlFocus = () => {
    setIsUrlFocused(true)
    if (urlInputRef.current) {
      const rect = urlInputRef.current.getBoundingClientRect()
      const sectionRect = urlInputRef.current.closest('section')?.getBoundingClientRect()
      if (sectionRect) {
        setUrlInputPosition({
          x: rect.left + rect.width / 2 - sectionRect.left,
          y: rect.top + rect.height / 2 - sectionRect.top,
        })
      }
    }
  }

  const handleUrlBlur = () => {
    setIsUrlFocused(false)
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  // Banner positions (relative to section) - stored as refs to get actual positions
  const bannerRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const [bannerPositions, setBannerPositions] = React.useState<Array<{ x: number; y: number }>>([])

  // Update banner positions when section dimensions change
  React.useEffect(() => {
    const updateBannerPositions = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const positions = bannerRefs.current.map((bannerRef) => {
          if (bannerRef) {
            const bannerRect = bannerRef.getBoundingClientRect()
            return {
              x: bannerRect.left + bannerRect.width / 2 - sectionRect.left,
              y: bannerRect.top + bannerRect.height / 2 - sectionRect.top,
            }
          }
          return { x: 0, y: 0 }
        })
        setBannerPositions(positions)
      }
    }

    // Wait for banners to render
    const timer = setTimeout(updateBannerPositions, 100)
    window.addEventListener('resize', updateBannerPositions)
    window.addEventListener('scroll', updateBannerPositions)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateBannerPositions)
      window.removeEventListener('scroll', updateBannerPositions)
    }
  }, [sectionDimensions, useGeometricBackground])

  return (
    <section ref={sectionRef} className={cn("relative overflow-hidden bg-background py-12 sm:py-16 md:py-24", className)}>
      {/* Mini Cookie Banner Background Shapes */}
      {useGeometricBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.01] via-transparent to-foreground/[0.01] blur-3xl -z-10" />
          <div className="absolute inset-0 overflow-hidden -z-10" style={{ zIndex: 0 }}>
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const pos = bannerPositions[index] || { x: 0, y: 0 }
              
              // Position classes for each banner - distributed on both sides
              // On mobile, only show first 3 banners (indices 0, 1, 2)
              const positionClasses = [
                "left-[5%] md:left-[8%] top-[12%] md:top-[15%]",      // Left side, top
                "right-[3%] md:right-[5%] top-[65%] md:top-[70%]",   // Right side, middle
                "left-[8%] md:left-[12%] bottom-[8%] md:bottom-[12%]", // Left side, bottom
                "hidden md:block right-[12%] md:right-[18%] top-[8%] md:top-[12%]",   // Right side, top (hidden on mobile)
                "hidden md:block left-[18%] md:left-[25%] top-[5%] md:top-[8%]",      // Left side, top-middle (hidden on mobile)
                "hidden md:block right-[8%] md:right-[12%] bottom-[15%] md:bottom-[18%]", // Right side, bottom (hidden on mobile)
              ]

              return (
                <div
                  key={index}
                  ref={(el) => {
                    bannerRefs.current[index] = el
                  }}
                  className={cn("absolute", positionClasses[index])}
                  style={{ pointerEvents: 'none' }}
                >
                  <MiniCookieBanner
                    delay={0.3 + index * 0.1}
                    width={[280, 240, 200, 220, 180, 260][index]}
                    height={[90, 85, 80, 85, 75, 90][index]}
                    rotate={[8, -12, -6, 15, -20, 10][index]}
                    position={index < 3 ? "top" : "bottom"}
                    bannerIndex={index}
                    index={index}
                    isAttracting={isUrlFocused}
                    attractX={urlInputPosition.x}
                    attractY={urlInputPosition.y}
                    originalX={pos.x}
                    originalY={pos.y}
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
      
      {/* Background decoration - minimal grid (only if not using geometric) */}
      {!useGeometricBackground && (
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      )}
      
      <div className="container max-w-7xl px-4 sm:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8 lg:gap-12 relative z-10">
          {/* Badge */}
          {badge && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              {useGeometricBackground ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                  <Circle className="h-2 w-2 fill-foreground/60" />
                  <span className="text-sm text-muted-foreground tracking-wide">
                    {badge.text}
                  </span>
                </div>
              ) : (
                <Badge variant="outline" className="px-3 py-1.5">
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  {badge.text}
                </Badge>
              )}
              {badge.action && (
                <Link 
                  href={badge.action.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {badge.action.text}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl space-y-4"
          >
            <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground">
              {useGeometricBackground && title2 ? (
                <>
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
                    {title}
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 via-foreground to-foreground/90">
                    {title2}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>
            
            {description && (
              <motion.p
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </motion.div>

          {/* Actions */}
          {(actions.length > 0 || emailCapture) && (
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 w-full max-w-lg"
            >
              {emailCapture && !session ? (
                <div className="w-full space-y-4">
                  <form onSubmit={handleUrlSubmit} className="w-full space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3 p-1 bg-muted/50 rounded-lg border border-border relative z-30">
                      <Input
                        ref={urlInputRef}
                        type="url"
                        placeholder="millerwaste.ca"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={handleUrlFocus}
                        onBlur={handleUrlBlur}
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
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      We will search your website for any scripts and import them for you as well as branding.
                    </p>
                  </div>
                </div>
              ) : session ? (
                <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      asChild={!!action.href}
                      variant={action.variant === "glow" ? "default" : action.variant || "default"}
                      size="lg"
                      className={cn(
                        "h-12 px-8 text-base font-semibold",
                        action.variant === "glow" && "shadow-lg shadow-primary/50"
                      )}
                      onClick={action.onClick}
                    >
                      {action.href ? (
                        <Link href={action.href} className="flex items-center gap-2">
                          {action.text}
                          {action.icon}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2">
                          {action.text}
                          {action.icon}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Image or Video */}
          {(image || video) && (
            <div className="w-full max-w-5xl mt-4">
              {video ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <motion.button
                      className="group relative cursor-pointer overflow-hidden rounded-lg w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
                        {video.thumbnail.dark ? (
                          <>
                            <Image
                              src={video.thumbnail.light}
                              alt={video.thumbnail.alt}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105 block dark:hidden"
                              quality={85}
                            />
                            <Image
                              src={video.thumbnail.dark}
                              alt={video.thumbnail.alt}
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                              className="object-cover transition-transform duration-300 group-hover:scale-105 hidden dark:block"
                              quality={85}
                            />
                          </>
                        ) : (
                          <Image
                            src={video.thumbnail.light}
                            alt={video.thumbnail.alt}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            quality={85}
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                            <Play className="ml-1 h-10 w-10 text-black" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl p-0">
                    <div className="aspect-video w-full">
                      <iframe
                        src={video.src}
                        className="h-full w-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.thumbnail.alt}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ) : image ? (
                <motion.div
                  className="relative rounded-lg border border-border overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {image.dark ? (
                    <>
                      <Image
                        src={image.light}
                        alt={image.alt}
                        width={1280}
                        height={720}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                        className="w-full h-auto block dark:hidden"
                        quality={85}
                      />
                      <Image
                        src={image.dark}
                        alt={image.alt}
                        width={1280}
                        height={720}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                        className="w-full h-auto hidden dark:block"
                        quality={85}
                      />
                    </>
                  ) : (
                    <Image
                      src={image.light}
                      alt={image.alt}
                      width={1280}
                      height={720}
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                      className="w-full h-auto"
                      quality={85}
                    />
                  )}
                </motion.div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

