import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StructuredData } from '@/components/seo/structured-data'

// FAQ data for structured data schema
const faqData = [
  {
    question: "Do I need a cookie banner in Canada?",
    answer: "Yes. Under PIPEDA and CASL, Canadian websites must disclose and gain consent for tracking cookies — just like under GDPR. If you collect any personal information through cookies or track user behavior, you need to inform visitors and get their consent first."
  },
  {
    question: "Is this tool compliant with GDPR?",
    answer: "Yes. Our cookie banner generator supports proper cookie consent, opt-in logic, and legal language that meets GDPR standards. You can customize the banner to include all required elements like granular consent options, easy opt-out, and clear cookie descriptions."
  },
  {
    question: "Can I use it on multiple websites?",
    answer: "Yes — unlike other tools, we give you unlimited banners. No domain limits. No per-site fees. Create as many custom cookie banners as you need for all your websites, and customize each one to match the unique branding of each site."
  },
  {
    question: "Will this match my site's design?",
    answer: "Absolutely. You control colors, fonts, placement, button styles, and more — so your banner feels native to your brand. Our visual builder gives you a live preview, so you can see exactly how it will look before you deploy it."
  },
  {
    question: "How do I install the cookie banner?",
    answer: "Installation is simple — just copy the generated code and paste it into your website's HTML, right before the closing </body> tag. It works on WordPress, Webflow, Shopify, Squarespace, custom HTML sites, and virtually any other platform."
  },
  {
    question: "What happens after the first 1,000 accounts?",
    answer: "Once we reach 1,000 accounts, new users will be charged a monthly fee. But if you're one of the first 1,000, you're grandfathered in at $0 forever. No hidden fees, no surprise charges — you keep full access for free, permanently."
  },
  {
    question: "Can I manage my tracking scripts through the banner?",
    answer: "Yes! Our tool lets you add and manage tracking scripts like Google Analytics, Facebook Pixel, and other third-party tools. The banner automatically blocks these scripts until the user gives consent, ensuring you stay compliant with privacy laws."
  },
  {
    question: "Do you offer support?",
    answer: "Yes! Even though the first 1,000 accounts are free, you still get full support. If you run into any issues or have questions about compliance, customization, or installation, we're here to help."
  },
  {
    question: "Does the tool really block non-essential cookies until consent is given?",
    answer: "Yes. According to Canadian standards and GDPR requirements, our cookie banner automatically blocks all non-essential cookies (analytics, marketing, preferences) until users provide explicit opt-in consent. You can test this in your environment with third-party tags, analytics, and ad pixels."
  },
  {
    question: "Does the tool provide audit/records of consent?",
    answer: "Yes. Our tool provides consent transaction logging and records. You can access consent logs through our dashboard for compliance purposes and internal auditing. This helps you demonstrate compliance if required."
  },
  {
    question: "How does the tool handle multiple sites or domains?",
    answer: "The free tier includes unlimited banners and websites. You can manage multiple sites, domains, or sub-domains from a single account. Each banner can be customized independently to match each site's branding."
  },
  {
    question: "Does it integrate with Google Tag Manager and custom scripts?",
    answer: "Yes. The banner integrates smoothly with Google Tag Manager, custom scripts, and other tag management systems. Non-essential tags are automatically gated by consent, ensuring compliance while maintaining your tracking setup."
  },
  {
    question: "What is the performance impact of the banner script?",
    answer: "The banner script has zero performance impact. It's optimized to load in milliseconds and doesn't affect Core Web Vitals or page speed. The lightweight code (under 10KB) ensures fast loading without impacting your site's performance."
  },
  {
    question: "Does it support bilingual (English/French) for Quebec Law 25?",
    answer: "Yes. Our cookie banner includes full bilingual support (English/French) with automatic language detection. This satisfies Quebec's Law 25 requirements and ensures compliance for Canadian businesses operating in Quebec."
  },
  {
    question: "How long does it take to set up?",
    answer: "Setup takes approximately 5 minutes. The process is: pick a template, customize your banner (colors, fonts, text), copy the generated code, and paste it into your website. No coding knowledge required."
  }
]

export function CookieBannerFAQ() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      {/* FAQPage Structured Data */}
      <StructuredData type="faq" data={faqData} />
      
      <div className="container">
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

        <AccordionItem value="blocking-behavior" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Does the tool really block non-essential cookies until consent is given?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. According to Canadian standards and GDPR requirements, our cookie banner automatically blocks all non-essential cookies (analytics, marketing, preferences) until users provide explicit opt-in consent. You can test this in your environment with third-party tags, analytics, and ad pixels.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consent-records" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Does the tool provide audit/records of consent?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. Our tool provides consent transaction logging and records. You can access consent logs through our dashboard for compliance purposes and internal auditing. This helps you demonstrate compliance if required.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="multi-site" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">How does the tool handle multiple sites or domains?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              The free tier includes unlimited banners and websites. You can manage multiple sites, domains, or sub-domains from a single account. Each banner can be customized independently to match each site&apos;s branding.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tag-manager" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Does it integrate with Google Tag Manager and custom scripts?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. The banner integrates smoothly with Google Tag Manager, custom scripts, and other tag management systems. Non-essential tags are automatically gated by consent, ensuring compliance while maintaining your tracking setup.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="performance" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">What is the performance impact of the banner script?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              The banner script has zero performance impact. It&apos;s optimized to load in milliseconds and doesn&apos;t affect Core Web Vitals or page speed. The lightweight code (under 10KB) ensures fast loading without impacting your site&apos;s performance.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bilingual" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">Does it support bilingual (English/French) for Quebec Law 25?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Yes. Our cookie banner includes full bilingual support (English/French) with automatic language detection. This satisfies Quebec&apos;s Law 25 requirements and ensures compliance for Canadian businesses operating in Quebec.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="setup-time" className="rounded-lg border bg-background px-6">
          <AccordionTrigger className="text-left hover:no-underline">
            <span className="text-lg font-semibold">How long does it take to set up?</span>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p className="leading-relaxed">
              Setup takes approximately 5 minutes. The process is: pick a template, customize your banner (colors, fonts, text), copy the generated code, and paste it into your website. No coding knowledge required.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>
      </div>
    </section>
  )
}