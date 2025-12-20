'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Shield, CheckCircle, FileText, Globe, Zap, Repeat, Palette } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Feature {
  title: string
  description: string
  icon?: React.ElementType
  skeleton?: React.ReactNode | (() => React.ReactNode)
  className?: string
}

interface ModernFeaturesSectionProps {
  title?: string
  description?: string
  features: Feature[]
}

export function ModernFeaturesSection({
  title = "Packed with powerful features",
  description,
  features
}: ModernFeaturesSectionProps) {
  return (
    <div className="relative z-20 py-10 lg:py-20 max-w-7xl mx-auto">
      {(title || description) && (
        <div className="px-8 mb-12">
          {title && (
            <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-semibold text-foreground">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-muted-foreground text-center font-normal">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 border rounded-md border-border">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} className={feature.className} index={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              {feature.skeleton && (
                <div className="h-full w-full mt-4">
                  {typeof feature.skeleton === 'function' ? feature.skeleton() : feature.skeleton}
                </div>
              )}
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({
  children,
  className,
  index
}: {
  children?: React.ReactNode
  className?: string
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}
    >
      {children}
    </motion.div>
  )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-foreground text-xl md:text-2xl md:leading-snug font-semibold">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base max-w-4xl text-left mx-auto text-muted-foreground font-normal text-left max-w-sm mx-0 md:text-sm my-2">
      {children}
    </p>
  )
}

// Skeleton components for visual interest
export const ComplianceSkeleton = () => {
  const items = [
    { icon: Shield, text: "GDPR Compliant" },
    { icon: CheckCircle, text: "PIPEDA Compliant" },
    { icon: FileText, text: "CASL Compliant" },
    { icon: Globe, text: "Quebec Law 25" },
  ]

  return (
    <div className="relative flex flex-col gap-4 h-full">
      {items.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <Icon className="h-5 w-5 text-foreground" />
            <span className="text-sm font-medium text-foreground">{item.text}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export const FeaturesListSkeleton = () => {
  const features = [
    { icon: Repeat, title: "Unlimited Banners", desc: "Use on unlimited websites" },
    { icon: Palette, title: "Brand Customization", desc: "Match your brand perfectly" },
    { icon: Globe, title: "Multi-Platform", desc: "Works everywhere" },
    { icon: Zap, title: "Zero Performance Impact", desc: "Lightning fast" },
  ]

  return (
    <div className="relative flex flex-col gap-3 h-full">
      {features.map((feature, idx) => {
        const Icon = feature.icon
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <Icon className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export const VerificationSkeleton = () => {
  const steps = [
    "Check consent logs",
    "Verify cookie blocking",
    "Test compliance features",
    "Review monitoring tools",
  ]

  return (
    <div className="relative flex flex-col gap-3 h-full">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
            {idx + 1}
          </div>
          <span className="text-sm font-medium text-foreground">{step}</span>
        </motion.div>
      ))}
    </div>
  )
}

