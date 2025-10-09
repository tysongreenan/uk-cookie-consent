import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function CookieBannerFAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about cookie banners and compliance
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="need-canada" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Do I need a cookie banner in Canada?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. Under <strong>PIPEDA</strong> and <strong>CASL</strong>, Canadian websites must disclose and gain consent for tracking cookies — just like under GDPR. If you collect any personal information through cookies or track user behavior, you need to inform visitors and get their consent first.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gdpr-compliant" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Is this tool compliant with GDPR?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. Our cookie banner generator supports proper cookie consent, opt-in logic, and legal language that meets GDPR standards. You can customize the banner to include all required elements like granular consent options, easy opt-out, and clear cookie descriptions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="multiple-sites" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Can I use it on multiple websites?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes — unlike other tools, we give you <strong>unlimited banners</strong>. No domain limits. No per-site fees. Create as many custom cookie banners as you need for all your websites, and customize each one to match the unique branding of each site.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="match-design" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Will this match my site&apos;s design?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Absolutely. You control colors, fonts, placement, button styles, and more — so your banner feels native to your brand. Our visual builder gives you a live preview, so you can see exactly how it will look before you deploy it.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-install" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">How do I install the cookie banner?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="mb-3 leading-relaxed">
              Installation is simple — just copy the generated code and paste it into your website&apos;s HTML, right before the closing <code className="rounded bg-muted px-1 py-0.5">&lt;/body&gt;</code> tag. It works on:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>WordPress</li>
              <li>Webflow</li>
              <li>Shopify</li>
              <li>Squarespace</li>
              <li>Custom HTML sites</li>
              <li>And virtually any other platform</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing-later" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">What happens after the first 1,000 accounts?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Once we reach 1,000 accounts, new users will be charged a monthly fee. But if you&apos;re one of the first 1,000, you&apos;re <strong>grandfathered in at $0 forever</strong>. No hidden fees, no surprise charges — you keep full access for free, permanently.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tracking-scripts" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Can I manage my tracking scripts through the banner?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes! Our tool lets you add and manage tracking scripts like Google Analytics, Facebook Pixel, and other third-party tools. The banner automatically blocks these scripts until the user gives consent, ensuring you stay compliant with privacy laws.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Do you offer support?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes! Even though the first 1,000 accounts are free, you still get full support. If you run into any issues or have questions about compliance, customization, or installation, we&apos;re here to help.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}