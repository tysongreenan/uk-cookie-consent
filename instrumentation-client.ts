import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // We're a privacy-compliance product: don't send visitor IPs/headers/cookies
  // to a third party by default
  sendDefaultPii: false,

  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,

  // Only record session replays when an error actually occurs
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,

  integrations: [Sentry.replayIntegration()],
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
