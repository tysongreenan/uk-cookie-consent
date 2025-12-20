'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Sparkles, CheckCircle, Zap, Shield, Settings, Star, ArrowRight, Gift } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

interface UpdateNotificationProps {
  isVisible: boolean
  onDismiss: () => void
  migrationNotes?: string[]
  onUpdateBanner?: () => void
}

export function UpdateNotification({ 
  isVisible, 
  onDismiss, 
  migrationNotes = [],
  onUpdateBanner 
}: UpdateNotificationProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    // Check if user has dismissed this notification before
    const dismissed = localStorage.getItem('banner-update-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  useEffect(() => {
    if (isVisible && !isDismissed) {
      setShowCelebration(true)
      // Hide celebration after 3 seconds
      const timer = setTimeout(() => setShowCelebration(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('banner-update-dismissed', 'true')
    onDismiss()
  }

  if (!isVisible || isDismissed) {
    return null
  }

  const features = migrationNotes.length > 0 ? migrationNotes : [
    '🎯 Perfect icon centering with Material Symbols integration',
    '🛡️ Bulletproof CSS that resists external website interference',
    '⏱️ Enhanced banner timing - floating button appears after consent',
    '🔧 Improved toggle functionality and modal state management',
    '✨ Better user experience with centered icons and smooth interactions'
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 shadow-lg">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-pulse"></div>
          
          {/* Celebration particles */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 200 - 100
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  className="absolute text-yellow-400"
                >
                  <Star className="w-4 h-4" />
                </motion.div>
              ))}
            </div>
          )}

          <CardContent className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {/* Animated icon */}
                <motion.div 
                  className="flex-shrink-0"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  {/* Header with animated badge */}
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.h3 
                      className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      🎉 Major Update Available!
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-md">
                        <Zap className="w-3 h-3 mr-1" />
                        v2.0.1
                      </Badge>
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-sm text-gray-700 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your cookie banners have been <span className="font-semibold text-purple-600">automatically upgraded</span> with reliability improvements:
                  </motion.p>
                  
                  {/* Feature list with staggered animation */}
                  <div className="space-y-2 mb-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Action buttons with hover effects */}
                  <div className="flex items-center space-x-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-md"
                        onClick={onUpdateBanner}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        View Improvements
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        onClick={handleDismiss}
                      >
                        Maybe Later
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Close button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
