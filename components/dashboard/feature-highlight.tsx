'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewBadge } from '@/components/ui/new-badge'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'

interface FeatureHighlightProps {
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
  isNew?: boolean
  actionText?: string
  onAction?: () => void
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
  delay = 0
}: FeatureHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* New badge */}
        {isNew && (
          <div className="absolute top-4 right-4 z-10">
            <NewBadge variant="pulse" />
          </div>
        )}

        <CardContent className="relative p-6">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-colors duration-300">
                {icon}
              </div>
            </motion.div>

            <div className="flex-1 min-w-0">
              {/* Title and badge */}
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {title}
                </h3>
                {badge && (
                  <Badge variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {description}
              </p>

              {/* Action button */}
              {onAction && (
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onAction}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto font-medium"
                  >
                    {actionText}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Feature highlights grid component
interface FeatureHighlightsProps {
  features: Array<{
    title: string
    description: string
    icon: React.ReactNode
    badge?: string
    isNew?: boolean
    actionText?: string
    onAction?: () => void
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
