import Script from 'next/script'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cookie Banner Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'First 1,000 accounts free forever',
    },
    description: 'Create unlimited, GDPR & PIPEDA compliant cookie banners custom-branded to match your website.',
    featureList: [
      'Unlimited cookie banners',
      'GDPR compliant',
      'PIPEDA compliant',
      'CASL compliant',
      'Custom branding',
      'Easy installation',
      'Multi-language support',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need a cookie banner in Canada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under PIPEDA and CASL, Canadian websites must disclose and gain consent for tracking cookies — just like under GDPR. If you collect any personal information through cookies or track user behavior, you need to inform visitors and get their consent first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this tool compliant with GDPR?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our cookie banner generator supports proper cookie consent, opt-in logic, and legal language that meets GDPR standards. You can customize the banner to include all required elements like granular consent options, easy opt-out, and clear cookie descriptions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use it on multiple websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — unlike other tools, we give you unlimited banners. No domain limits. No per-site fees. Create as many custom cookie banners as you need for all your websites.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will this match my site\'s design?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. You control colors, fonts, placement, button styles, and more — so your banner feels native to your brand. Our visual builder gives you a live preview.',
        },
      },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create a Cookie Consent Banner',
    description: 'Simple 3-step process to create and install a compliant cookie banner',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Customize',
        text: 'Customize your banner to match your brand using our visual builder',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Copy and Paste',
        text: 'Copy the generated code and paste it into your website',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Stay Compliant',
        text: 'Your site is now compliant with GDPR, PIPEDA, and CASL',
      },
    ],
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
    </>
  )
}
