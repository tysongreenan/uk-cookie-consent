import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, WarningCircle, Info } from 'lucide-react'

export function BlogRecap() {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-muted/30 to-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Compliance Requirements</h4>
              <p className="text-xs text-muted-foreground">
                PIPEDA and CASL require explicit consent for tracking cookies in Canada
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Cookie Categories</h4>
              <p className="text-xs text-muted-foreground">
                Only strictly necessary cookies can be set without consent
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <WarningCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Quebec Law 25</h4>
              <p className="text-xs text-muted-foreground">
                Stricter requirements for Quebec residents - opt-in required
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Best Practices</h4>
              <p className="text-xs text-muted-foreground">
                Use clear language, provide granular controls, and keep records
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Next Steps:</strong> Choose a cookie banner solution that's designed specifically 
            for Canadian compliance, or build your own following the guidelines above.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
