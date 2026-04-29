const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bamunfrbhopzrjobowfx.supabase.co',
  'sb_secret_I8bupz3lhrPKSDeo2oTq_g_Izyksayc',
  { auth: { persistSession: false } }
);

const userId = 'a2667102-c91c-4b0a-af4e-1a3e808f6783';
const subscriptionEndsAt = new Date();
subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1);

(async () => {
  const { data: updated, error: uErr } = await supabase
    .from('User')
    .update({
      planTier: 'pro_annual',
      billingCycle: 'annual',
      subscriptionStatus: 'active',
      stripeCustomerId: 'cus_UN5XxEra24kUtY',
      stripeSubscriptionId: 'sub_1TOLMlANLJbikAiYg9QHTgDe',
      upgradedAt: new Date().toISOString(),
      subscriptionEndsAt: subscriptionEndsAt.toISOString(),
      featureFreezeDate: null,
      loyaltyUpgradeEligible: false,
    })
    .eq('id', userId)
    .select()
    .single();

  if (uErr) { console.error('UPDATE ERR:', uErr); process.exit(1); }
  console.log('UPDATED USER:', JSON.stringify(updated, null, 2));

  const { data: pay, error: pErr } = await supabase
    .from('Payment')
    .insert({
      userId,
      amount: 9900,
      currency: 'usd',
      status: 'succeeded',
      planTier: 'pro_annual',
      paymentType: 'subscription',
      stripeSessionId: 'cs_live_b1esqQ7YNEY6h44W7PRh18e5tsgdpL5zebtdGVCxpx32cNv5QzMZwh51X9',
      stripePaymentIntentId: '',
      stripeCustomerId: 'cus_UN5XxEra24kUtY',
    })
    .select()
    .single();

  if (pErr) { console.error('PAYMENT ERR:', pErr); process.exit(1); }
  console.log('PAYMENT:', JSON.stringify(pay, null, 2));
})();
