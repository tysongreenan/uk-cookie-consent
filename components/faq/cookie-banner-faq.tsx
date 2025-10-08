import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function CookieBannerFAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-4">Cookie Banner FAQ</h2>
        <p className="text-muted-foreground text-center text-lg">
          Everything you need to know about cookie consent banners and compliance
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-is-cookie-banner">
          <AccordionTrigger className="text-left">
            What is a cookie banner and why do I need one?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              A cookie banner is a notification that appears on your website to inform visitors about your use of cookies and tracking technologies. Think of it as your website's way of asking permission before collecting visitor data.
            </p>
            <p className="mb-4">
              You need one because privacy laws like GDPR (Europe) and CCPA (California) require websites to get explicit consent before using cookies that aren't strictly necessary for your site to function. Without proper consent, you could face hefty fines.
            </p>
            <p>
              The good news? A well-designed cookie banner actually builds trust with your visitors by being transparent about your data practices.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="what-makes-compliant">
          <AccordionTrigger className="text-left">
            What makes a cookie banner legally compliant?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              A compliant cookie banner has several key features that protect both you and your visitors:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Clear language:</strong> No legal jargon. Explain what cookies do in plain English.</li>
              <li><strong>Active consent:</strong> Visitors must click "Accept" - no pre-ticked boxes or assumed consent.</li>
              <li><strong>Equal choices:</strong> "Accept All" and "Reject All" buttons must be equally prominent.</li>
              <li><strong>Granular control:</strong> Let visitors choose which cookie categories to allow.</li>
              <li><strong>Easy changes:</strong> Visitors can change their mind anytime through a footer link.</li>
              <li><strong>Automatic blocking:</strong> Non-essential cookies stay blocked until consent is given.</li>
            </ul>
            <p>
              The goal is transparency and choice - your visitors should understand exactly what they're agreeing to and have real control over their privacy.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cookie-categories">
          <AccordionTrigger className="text-left">
            What are the different types of cookies I need to categorize?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Strictly Necessary</h4>
                <p className="mb-2">These are essential for your website to work. Think login sessions, shopping carts, and security features. These don't require consent because your site literally can't function without them.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Functionality</h4>
                <p className="mb-2">These remember user preferences like language settings, theme choices, and form data. They improve user experience but aren't critical for basic site function.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Analytics</h4>
                <p className="mb-2">These help you understand how visitors use your site - page views, time spent, popular content. Google Analytics is the most common example. Great for improving your website.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Marketing</h4>
                <p>These track visitors across sites to show targeted ads. Facebook Pixel, Google Ads, and retargeting tools fall into this category. These require the most careful handling.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="implementation-options">
          <AccordionTrigger className="text-left">
            How do I implement a cookie banner on my website?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              You have three main options, each with different complexity levels:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">1. Cookie Consent Builder (Recommended)</h4>
                <p className="mb-2">Use a tool like ours to create a custom banner, then copy-paste the code into your website's head section. Takes 5 minutes, gives you full control, and costs nothing.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">2. Consent Management Platform (CMP)</h4>
                <p className="mb-2">Services like CookieYes or Cookiebot scan your site and create banners automatically. More expensive but handles everything for you.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">3. Built-in CMS Features</h4>
                <p>If you use WordPress, Shopify, or Squarespace, they often have cookie banner plugins or built-in features. Good for simple needs but less customization.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="common-mistakes">
          <AccordionTrigger className="text-left">
            What are the most common cookie banner mistakes to avoid?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">❌ Dark Patterns</h4>
                <p className="mb-2">Making "Accept" buttons huge and green while hiding "Reject" options. This tricks users and violates regulations.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">❌ Legal Jargon</h4>
                <p className="mb-2">Using terms like "data processing" and "legitimate interest" confuses visitors. Use simple language instead.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">❌ No Granular Control</h4>
                <p className="mb-2">Only offering "Accept All" or "Reject All" doesn't give users real choice. Always include a preferences option.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">❌ Forgetting Mobile</h4>
                <p className="mb-2">Many banners work great on desktop but break on mobile. Test on all devices.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">❌ No Consent Records</h4>
                <p>You need to prove users consented if regulators ask. Keep records of when and how consent was given.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gdpr-requirements">
          <AccordionTrigger className="text-left">
            What does GDPR require for cookie consent?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              GDPR (General Data Protection Regulation) has specific requirements for cookie consent that apply to any website with EU visitors:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Explicit consent:</strong> Users must actively agree - no pre-ticked boxes or assumed consent</li>
              <li><strong>Granular control:</strong> Separate consent for different cookie purposes (analytics, marketing, etc.)</li>
              <li><strong>Easy withdrawal:</strong> Users can change their mind as easily as they consented</li>
              <li><strong>Clear information:</strong> Explain what cookies do and why you use them</li>
              <li><strong>Consent records:</strong> Keep proof of when and how consent was given</li>
              <li><strong>No bundling:</strong> Can't make consent a condition of using your site</li>
            </ul>
            
            <p>
              The key principle: consent must be freely given, specific, informed, and unambiguous. If you're not sure whether your banner meets these requirements, it probably doesn't.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="best-practices">
          <AccordionTrigger className="text-left">
            What are the best practices for cookie banner design?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Design Principles</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Keep it simple and scannable</li>
                  <li>Use contrasting colors for buttons</li>
                  <li>Make text readable on all devices</li>
                  <li>Don't block important content</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">User Experience</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Show preferences before accepting all</li>
                  <li>Remember user choices</li>
                  <li>Provide clear cookie descriptions</li>
                  <li>Link to your privacy policy</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Technical Setup</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Block non-essential cookies by default</li>
                  <li>Load scripts only after consent</li>
                  <li>Test on multiple browsers and devices</li>
                  <li>Keep consent records for compliance</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="testing-compliance">
          <AccordionTrigger className="text-left">
            How can I test if my cookie banner is compliant?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p className="mb-4">
              Testing your cookie banner is crucial before going live. Here's a simple checklist:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">User Journey Test</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Can you reject all cookies and still use the site?</li>
                  <li>Are "Accept" and "Reject" buttons equally prominent?</li>
                  <li>Can you access detailed preferences?</li>
                  <li>Does the banner remember your choice?</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Technical Test</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Are analytics scripts blocked before consent?</li>
                  <li>Do marketing pixels only fire after consent?</li>
                  <li>Does the banner work on mobile devices?</li>
                  <li>Are consent records being stored?</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Legal Test</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Is the language clear and jargon-free?</li>
                  <li>Are all cookie purposes explained?</li>
                  <li>Is your privacy policy easily accessible?</li>
                  <li>Can users withdraw consent easily?</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
