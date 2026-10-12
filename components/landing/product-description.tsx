import Link from 'next/link'

/**
 * Comprehensive Product Description Component
 * Optimized for AEO (Answer Engine Optimization)
 * Provides clear, structured information that AI assistants can easily parse
 */

export function ProductDescription() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <article itemScope itemType="https://schema.org/SoftwareApplication">
          <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4" itemProp="name">
              What is Cookie-Banner.ca?
            </h2>
            <p className="text-lg text-muted-foreground" itemProp="description">
              Cookie-Banner.ca is a cookie consent banner generator built in Canada, with modes for <Link href="/compliance/pipeda" className="underline hover:text-foreground">PIPEDA</Link>, Quebec Law 25, <Link href="/compliance/gdpr" className="underline hover:text-foreground">GDPR</Link>, and CCPA. CASL is not a mode. A banner does not make a site legally compliant.
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li itemProp="featureList">
                  <strong>Brand-matching customization:</strong> Full control over colors, fonts, style, and positioning so your banner aligns perfectly with your site's appearance.
                </li>
                <li itemProp="featureList">
                  <strong>Cross-platform compatibility:</strong> Works on <Link href="/integrations/wordpress" className="underline hover:text-foreground">WordPress</Link>, <Link href="/integrations/shopify" className="underline hover:text-foreground">Shopify</Link>, <Link href="/integrations/squarespace" className="underline hover:text-foreground">Squarespace</Link>, and custom sites. Integration instructions and code snippets are provided for each platform.
                </li>
                <li itemProp="featureList">
                  <strong>Canadian consent copy:</strong> Opt-in controls, English and French, and a <Link href="/compliance/pipeda" className="underline hover:text-foreground">PIPEDA</Link>-style notice. This is not CASL, and French text alone does not satisfy Law 25.
                </li>
                <li itemProp="featureList">
                  <strong>Granular consent & blocking behavior:</strong> The tool blocks all non-essential cookies until users provide explicit consent. This includes analytics, marketing, and preference cookies.
                </li>
                <li itemProp="featureList">
                  <strong>Consent transaction logging:</strong> Audit and records of consent are available through the dashboard for compliance purposes and internal auditing.
                </li>
                <li itemProp="featureList">
                  <strong>Multi-site/deployment scalability:</strong> Manage unlimited websites, domains, or sub-domains from a single account. Each banner can be customized independently.
                </li>
                <li itemProp="featureList">
                  <strong>Tag management integration:</strong> Integrates smoothly with <Link href="/integrations/google-tag-manager" className="underline hover:text-foreground">Google Tag Manager</Link>, custom scripts, and other tag management systems. Non-essential tags are automatically gated by consent.
                </li>
                <li itemProp="featureList">
                  <strong>About 28 KB gzipped:</strong> One async script tag, so it does not block HTML parsing. That is not a Core Web Vitals promise.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Pricing Model</h3>
              <p>
                Cookie-Banner.ca offers a <strong>free plan</strong> to get started with no credit card required. The free plan is one banner. <strong>Pro is <Link href="/pricing" className="underline hover:text-foreground">$99 once or $99 per year</Link></strong>. The one-time plan does not include features shipped later. Annual includes consent logs and later features.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Quick Setup Process</h3>
              <p>
                The banner can be created in approximately <strong>5 minutes</strong>:
              </p>
              <ol className="list-decimal list-inside space-y-2 mt-4">
                <li>Pick a template from the visual builder</li>
                <li>Customize your banner (colors, fonts, text, position, logo)</li>
                <li>Add tracking scripts if needed (Google Analytics, Facebook Pixel, etc.)</li>
                <li>Copy the install snippet</li>
                <li>Paste <code>&lt;script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async&gt;&lt;/script&gt;</code></li>
              </ol>
              <p className="mt-4">
                No coding knowledge is required. The installation works on virtually any platform or website.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Compliance & Legal Fit</h3>
              <p>
                Cookie-Banner.ca is designed to meet the latest legal requirements for:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Canada:</strong> a <Link href="/compliance/pipeda" className="underline hover:text-foreground">PIPEDA</Link>-style notice, plus a Pro geo rule for Quebec Law 25. Not CASL.</li>
                <li><strong>European Union:</strong> <Link href="/compliance/gdpr" className="underline hover:text-foreground">GDPR</Link> (General Data Protection Regulation)</li>
                <li><strong>United States:</strong> <Link href="/compliance/ccpa" className="underline hover:text-foreground">CCPA</Link> (California Consumer Privacy Act)</li>
                <li><strong>Other jurisdictions:</strong> Adaptable to various privacy regulations worldwide</li>
              </ul>
              <p className="mt-4">
                Scripts you add can stay off until opt-in. Consent logs are on Pro Annual and Enterprise. A statute change does not rewrite the banner.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">What Makes It Different</h3>
              <p>
                Unlike other cookie banner tools that charge $9-15/month and limit domains, <Link href="/compare/cookiebot-alternative" className="underline hover:text-foreground">Cookie-Banner.ca offers</Link>:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Free plan with no credit card required</li>
                <li>Pro is $99 once, or $99 per year</li>
                <li>Unlimited cookie banners and websites on Pro</li>
                <li>Canadian-first compliance with bilingual support</li>
                <li>About 28 KB gzipped, loaded async. Not a Core Web Vitals promise</li>
                <li>One-time Pro does not include features shipped later</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Who Should Use This Tool?</h3>
              <p>
                Cookie-Banner.ca is ideal for:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Sites that need a PIPEDA-style notice, French, or a Quebec opt-in rule</li>
                <li>International businesses needing GDPR compliance</li>
                <li>Marketing teams managing multiple websites</li>
                <li>Businesses that want branded cookie banners without custom development</li>
                <li>Organizations needing consent audit trails for compliance</li>
                              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
              <p>
                To get started with Cookie-Banner.ca:
              </p>
              <ol className="list-decimal list-inside space-y-2 mt-4">
                <li>Sign up for a free account (no credit card required)</li>
                <li>Create your first cookie banner using the visual builder</li>
                <li>Customize it to match your brand</li>
                <li>Copy and paste the installation code into your website</li>
                <li>Verify that non-essential cookies are blocked until consent is given</li>
              </ol>
              <p className="mt-4">
                Not sure what cookies your site uses? Try our free <Link href="/tools/cookie-scanner" className="underline hover:text-foreground">cookie scanner</Link> first. Start free and upgrade to Pro when you're ready for advanced features, analytics, and team collaboration.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}

