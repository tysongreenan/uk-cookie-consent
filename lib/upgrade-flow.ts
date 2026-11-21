export type BillingCycle = 'one_time' | 'annual'

/**
 * Lifetime is the default. Nearly every paid customer has picked it, and the
 * old annual default made buyers flip the toggle back and forth.
 */
export function resolveBillingCycle(raw: string | null | undefined): BillingCycle {
  return raw === 'annual' ? 'annual' : 'one_time'
}

/**
 * Where sign-in / sign-up should send a signed-out buyer afterwards: back to
 * /upgrade with their plan kept and checkout started for them.
 */
export function upgradeReturnPath(billing: BillingCycle): string {
  return `/upgrade?billing=${billing}&checkout=1`
}

export function authUrlForUpgrade(kind: 'signin' | 'signup', billing: BillingCycle): string {
  return `/auth/${kind}?callbackUrl=${encodeURIComponent(upgradeReturnPath(billing))}`
}

/**
 * Start Stripe checkout on load only when the buyer just came back from
 * sign-in / sign-up (`checkout=1`) and can actually buy this plan.
 */
export function shouldAutoStartCheckout(opts: {
  checkoutParam: string | null | undefined
  signedIn: boolean
  planTier: string | null | undefined
  billing: BillingCycle
}): boolean {
  if (opts.checkoutParam !== '1' || !opts.signedIn) return false
  const tier = opts.planTier || 'free'
  if (tier === 'free') return true
  // Lifetime owners may still move to annual; nobody else needs checkout.
  return opts.billing === 'annual' && (tier === 'pro_lifetime' || tier === 'pro')
}
