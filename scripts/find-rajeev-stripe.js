require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

(async () => {
  const customers = await stripe.customers.search({
    query: `email:'rajeev.sharma@well.ca'`,
  });
  console.log('CUSTOMERS:', JSON.stringify(customers.data.map(c => ({
    id: c.id, email: c.email, name: c.name, created: new Date(c.created * 1000).toISOString(),
  })), null, 2));

  for (const c of customers.data) {
    const sessions = await stripe.checkout.sessions.list({ customer: c.id, limit: 10 });
    console.log(`SESSIONS for ${c.id}:`, JSON.stringify(sessions.data.map(s => ({
      id: s.id, mode: s.mode, status: s.status, payment_status: s.payment_status,
      amount: s.amount_total, currency: s.currency, subscription: s.subscription,
      metadata: s.metadata, created: new Date(s.created * 1000).toISOString(),
    })), null, 2));

    const subs = await stripe.subscriptions.list({ customer: c.id, limit: 10, status: 'all' });
    console.log(`SUBSCRIPTIONS for ${c.id}:`, JSON.stringify(subs.data.map(s => ({
      id: s.id, status: s.status, current_period_end: new Date(s.current_period_end * 1000).toISOString(),
    })), null, 2));
  }
})().catch(e => { console.error(e); process.exit(1); });
