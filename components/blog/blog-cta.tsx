import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function BlogCTA() {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            Start Building Today
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">
          Ready to add a cookie banner to your site?
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join 1,000+ Canadian businesses who trust our free cookie banner generator. 
          No credit card required, unlimited banners, fully compliant with PIPEDA & CASL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/auth/signup">
              Get Your Free Banner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              Learn More
            </Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          First 1,000 accounts are free forever. No catches, no limits.
        </p>
      </CardContent>
    </Card>
  )
}
