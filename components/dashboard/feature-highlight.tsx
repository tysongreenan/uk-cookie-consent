'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewBadge } from '@/components/ui/new-badge'
import { ArrowRight } from 'lucide-react'

interface FeatureHighlightProps {
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
  isNew?: boolean
  actionText?: string
  onAction?: () => void
  onDismiss?: () => void
  delay?: number
}

export function FeatureHighlight({
  title,
  description,
  icon,
  badge,
  isNew = false,
  actionText = "Learn More",
  onAction,
  onDismiss,
  delay = 0
}: FeatureHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay,
        ease: "easeOut"
      }}
      className="group"
    >
      <Card className="relative overflow-hidden border bg-card">
        {isNew && (
          <div className="absolute top-4 right-4 z-10">
            <NewBadge variant="pulse" />
          </div>
        )}

        <CardContent className="relative p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                {icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2 pr-16">
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                {badge && (
                  <Badge variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center gap-3">
                {onAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onAction}
                    className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium"
                  >
                    {actionText}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className="text-muted-foreground hover:text-foreground p-0 h-auto font-medium"
                  >
                    Dismiss
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface FeatureHighlightsProps {
  features: Array<{
    title: string
    description: string
    icon: React.ReactNode
    badge?: string
    isNew?: boolean
    actionText?: string
    onAction?: () => void
    onDismiss?: () => void
  }>
}

export function FeatureHighlights({ features }: FeatureHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureHighlight
          key={index}
          {...feature}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}
