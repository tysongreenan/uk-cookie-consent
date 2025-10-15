'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Sparkles, Zap, Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAnnouncement } from '@/lib/announcement-context'

export function UpdateAnnouncement() {
  const { isVisible, setIsVisible } = useAnnouncement()
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true)
      // Hide particles after 4 seconds
      const particleTimer = setTimeout(() => {
        setShowParticles(false)
      }, 4000)
      return () => clearTimeout(particleTimer)
    }
  }, [isVisible])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-50"
        >
          {/* Background with gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-2xl">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 animate-pulse"></div>
            
            {/* Floating particles */}
            {showParticles && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * 80
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute text-yellow-300"
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="relative container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Animated icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex-shrink-0"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <motion.h2 
                        className="text-lg font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        🎉 Major Update: v2.0.0 is Here!
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="bg-white/20 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                      >
                        <Zap className="w-3 h-3 inline mr-1" />
                        NEW
                      </motion.div>
                    </div>
                    
                    <motion.p 
                      className="text-sm text-blue-100 mt-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Enhanced preferences modal, better UX, and advanced cookie management! 
                      <span className="font-semibold text-yellow-200"> Try it now →</span>
                    </motion.p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button 
                      asChild
                      size="sm"
                      className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg"
                    >
                      <Link href="/dashboard/builder">
                        Try New Features
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      className="text-white hover:bg-white/20 rounded-full p-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

