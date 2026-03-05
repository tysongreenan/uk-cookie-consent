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
              Cookie-Banner.ca is a cookie consent banner generator built in Canada, tailored for Canadian privacy laws (PIPEDA, CASL, Quebec Law 25) as well as global laws like GDPR. It helps businesses create compliant cookie banners that match their brand and work across all platforms.
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
                  <strong>Cross-platform compatibility:</strong> Works on WordPress, Shopify, Webflow, Squarespace, and custom sites. Integration instructions and code snippets are provided for each platform.
                </li>
                <li itemProp="featureList">
                  <strong>Canadian privacy law compliance:</strong> Express opt-in for non-essential cookies, support for bilingual (English/French) to satisfy Quebec's Law 25, and full PIPEDA and CASL compliance.
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
                  <strong>Tag management integration:</strong> Integrates smoothly with Google Tag Manager, custom scripts, and other tag management systems. Non-essential tags are automatically gated by consent.
                </li>
                <li itemProp="featureList">
                  <strong>Zero performance impact:</strong> Lightweight code (under 10KB) loads in milliseconds. Doesn't affect Core Web Vitals or page speed.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Pricing Model</h3>
              <p>
                Cookie-Banner.ca offers <strong>"free forever"</strong> for the first 1,000 accounts, with no credit card required. Once the first 1,000 accounts are reached, new users will be charged a monthly fee. However, early adopters (the first 1,000 accounts) are grandfathered in at $0 forever with no hidden fees or surprise charges.
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
                <li>Copy the generated HTML/JavaScript code</li>
                <li>Paste the code into your website's HTML, right before the closing <code>&lt;/body&gt;</code> tag</li>
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
                <li><strong>Canadian provinces:</strong> PIPEDA (federal), CASL (anti-spam), and Quebec Law 25</li>
                <li><strong>European Union:</strong> GDPR (General Data Protection Regulation)</li>
                <li><strong>United States:</strong> CCPA (California Consumer Privacy Act)</li>
                <li><strong>Other jurisdictions:</strong> Adaptable to various privacy regulations worldwide</li>
              </ul>
              <p className="mt-4">
                The tool automatically implements required compliance mechanisms including cookie blocking, consent logging, granular controls, and updates when privacy laws change.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">What Makes It Different</h3>
              <p>
                Unlike other cookie banner tools that charge $9-15/month and limit domains, Cookie-Banner.ca offers:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Unlimited cookie banners per account</li>
                <li>Unlimited websites and domains</li>
                <li>Free forever for early adopters (first 1,000 accounts)</li>
                <li>Canadian-first compliance with bilingual support</li>
                <li>Zero performance impact on your website</li>
                <li>Full support even on the free tier</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Who Should Use This Tool?</h3>
              <p>
                Cookie-Banner.ca is ideal for:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Canadian businesses requiring PIPEDA, CASL, or Quebec Law 25 compliance</li>
                <li>International businesses needing GDPR compliance</li>
                <li>Marketing teams managing multiple websites</li>
                <li>Businesses that want branded cookie banners without custom development</li>
                <li>Organizations needing consent audit trails for compliance</li>
                <li>Anyone who wants to avoid $20K+ privacy law fines</li>
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
                If you're one of the first 1,000 accounts, you'll have free access forever with unlimited banners and websites.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}

