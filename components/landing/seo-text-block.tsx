import { Card, CardContent } from '@/components/ui/card'
import { Shield, FileText, AlertCircle } from 'lucide-react'

export function SEOTextBlock() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              What Is a Cookie Banner and Why Does It Matter in Canada?
            </h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="leading-relaxed text-foreground">
                        A <strong>cookie banner</strong> is a notice on your website that asks for user consent to collect data. Under laws like <strong>GDPR</strong> (Europe), <strong>PIPEDA</strong> (Canada), and <strong>CASL</strong>, your website is legally required to tell users about cookies and give them control.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="leading-relaxed text-foreground">
                        Failing to do this can lead to <strong>fines</strong>, loss of trust, and <strong>SEO penalties</strong>. Our tool helps you avoid that — with banners that look good and just work.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key compliance points */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-6 text-center">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">GDPR</h3>
                  <p className="text-sm text-muted-foreground">European data protection standard</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-6 text-center">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">PIPEDA</h3>
                  <p className="text-sm text-muted-foreground">Canadian privacy law compliance</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardContent className="p-6 text-center">
                  <Shield className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">CASL</h3>
                  <p className="text-sm text-muted-foreground">Anti-spam legislation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
