'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Zap, Star } from 'lucide-react'

interface NewBadgeProps {
  children?: React.ReactNode
  variant?: 'default' | 'pulse' | 'glow' | 'sparkle'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function NewBadge({ 
  children = 'NEW', 
  variant = 'pulse', 
  size = 'sm',
  className = '' 
}: NewBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  const baseClasses = `inline-flex items-center font-semibold rounded-full border-0 shadow-md ${sizeClasses[size]} ${className}`

  if (variant === 'pulse') {
    return (
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 0 rgba(168, 85, 247, 0.4)',
            '0 0 0 10px rgba(168, 85, 247, 0)',
            '0 0 0 0 rgba(168, 85, 247, 0)'
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Badge className={`${baseClasses} bg-gradient-to-r from-purple-500 to-pink-500 text-white`}>
          <Zap className="w-3 h-3 mr-1" />
          {children}
        </Badge>
      </motion.div>
    )
  }

  if (variant === 'glow') {
    return (
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 5px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.8)',
            '0 0 5px rgba(59, 130, 246, 0.5)'
          ]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Badge className={`${baseClasses} bg-gradient-to-r from-blue-500 to-cyan-500 text-white`}>
          <Sparkles className="w-3 h-3 mr-1" />
          {children}
        </Badge>
      </motion.div>
    )
  }

  if (variant === 'sparkle') {
    return (
      <motion.div className="relative">
        <Badge className={`${baseClasses} bg-gradient-to-r from-yellow-400 to-orange-500 text-white`}>
          <Star className="w-3 h-3 mr-1" />
          {children}
        </Badge>
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-2 h-2 text-yellow-300" />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <Badge className={`${baseClasses} bg-gradient-to-r from-green-500 to-emerald-500 text-white`}>
      {children}
    </Badge>
  )
}


