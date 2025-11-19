'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModernHeroProps {
  title: string
  description?: string
  badge?: string
  updatedDate?: string
  ctaText?: string
  ctaHref?: string
  directAnswer?: string
  directAnswerLink?: string
  directAnswerLinkText?: string
}

export function ModernHero({
  title,
  description,
  badge,
  updatedDate,
  ctaText = "Get Started",
  ctaHref = "/dashboard",
  directAnswer,
  directAnswerLink,
  directAnswerLinkText
}: ModernHeroProps) {
  const words = title.split(" ")

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      {/* Border decorations */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-border/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-border/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-border/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20 w-full">
        {/* Badge and Date */}
        {(badge || updatedDate) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 gap-y-5 text-sm text-muted-foreground mb-6"
          >
            {badge && (
              <Badge variant="outline" className="bg-muted text-foreground border-border">
                {badge}
              </Badge>
            )}
            {updatedDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time>Updated {new Date(updatedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
              </div>
            )}
          </motion.div>
        )}

        {/* Animated Title */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-semibold text-foreground md:text-4xl lg:text-6xl tracking-tight">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-muted-foreground"
          >
            {description}
          </motion.p>
        )}

        {/* Direct Answer Box */}
        {directAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-3xl mt-6"
          >
            <div className="direct-answer bg-muted/50 border border-border rounded-lg p-6">
              <p className="text-lg font-semibold text-foreground mb-2">Direct Answer:</p>
              <p className="text-base text-foreground leading-relaxed">
                {directAnswer}
              </p>
              {directAnswerLink && directAnswerLinkText && (
                <Link href={directAnswerLink} className="inline-flex items-center gap-2 text-sm font-medium text-foreground mt-4 hover:underline">
                  {directAnswerLinkText} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="transform transition-all duration-300 hover:-translate-y-0.5">
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

