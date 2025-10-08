import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Code, BarChart3, Shield, Zap, Globe } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Visual Builder',
    description: 'Drag-and-drop interface to customize colors, fonts, and layout with live preview.',
  },
  {
    icon: Code,
    title: 'Code Generator',
    description: 'Generate clean, optimized HTML/JS code that you can copy and paste into your website.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track consent rates, user interactions, and banner performance with detailed analytics.',
  },
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Built-in compliance with GDPR, CCPA, and other privacy regulations worldwide.',
  },
  {
    icon: Zap,
    title: 'Script Management',
    description: 'Easily manage Google Analytics, Facebook Pixel, and other tracking scripts.',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Support for multiple languages and automatic translation capabilities.',
  },
]

export function Features() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Everything you need for cookie consent
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          From simple banners to advanced consent management, we provide all the tools 
          you need to make your website compliant with privacy laws.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <feature.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
