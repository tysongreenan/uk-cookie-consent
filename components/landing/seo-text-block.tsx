import { Card, CardContent } from '@/components/ui/card'
import { Shield, FileText, AlertCircle } from 'lucide-react'

export function SEOTextBlock() {
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-3 font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              What Is a Cookie Banner and Why Does It Matter in Canada?
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                      <FileText className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed text-foreground sm:text-base">
                        A <strong>cookie banner</strong> is a notice on your website that asks for user consent to collect data. Under laws like <strong>GDPR</strong> (Europe), <strong>PIPEDA</strong> (Canada), and <strong>CASL</strong>, your website is legally required to tell users about cookies and give them control.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 sm:h-10 sm:w-10">
                      <AlertCircle className="h-4 w-4 text-amber-600 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed text-foreground sm:text-base">
                        Failing to do this can lead to <strong>fines</strong>, loss of trust, and <strong>SEO penalties</strong>. Our tool helps you avoid that — with banners that look good and just work.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key compliance points */}
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-4 text-center sm:p-6">
                  <Shield className="mx-auto mb-2 h-7 w-7 text-primary sm:mb-3 sm:h-8 sm:w-8" />
                  <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">GDPR</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">European data protection standard</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-4 text-center sm:p-6">
                  <Shield className="mx-auto mb-2 h-7 w-7 text-primary sm:mb-3 sm:h-8 sm:w-8" />
                  <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">PIPEDA</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">Canadian privacy law compliance</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-4 text-center sm:p-6">
                  <Shield className="mx-auto mb-2 h-7 w-7 text-primary sm:mb-3 sm:h-8 sm:w-8" />
                  <h3 className="mb-1 text-sm font-semibold sm:mb-2 sm:text-base">CASL</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">Anti-spam legislation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
