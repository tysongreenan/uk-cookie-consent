export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #cookie-consent-banner,
            #cookie-preferences-modal,
            #cookie-settings-float,
            #cookie-banner-attribution {
              display: none !important;
            }
          `,
        }}
      />
      {children}
    </>
  )
}
