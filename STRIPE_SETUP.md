# Stripe Payment Setup Guide

## Overview
This guide walks you through setting up Stripe payments for UK Cookie Consent Pro ($99 one-time payment).

## Prerequisites
- Stripe account (activated and ready for live payments)
- Production Stripe keys
- Access to your Vercel/hosting environment variables

## Your Stripe Keys

Get your keys from the Stripe Dashboard at https://dashboard.stripe.com/apikeys

```bash
# Publishable Key (client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Get from Stripe Dashboard

# Secret Key (server-side)
STRIPE_SECRET_KEY="sk_live_..." # Get from Stripe Dashboard
```

## Step 1: Configure Environment Variables

Add these to your `.env.local` (development) and Vercel (production):

```bash
# Stripe Keys
STRIPE_SECRET_KEY="sk_live_..." # Get from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Get from Stripe Dashboard
STRIPE_WEBHOOK_SECRET="whsec_..." # Get this in Step 2

# App URL
NEXT_PUBLIC_BASE_URL="https://www.cookie-banner.ca"
```

## Step 2: Set Up Stripe Webhook

### 2.1 Create Webhook Endpoint in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter URL: `https://www.cookie-banner.ca/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click "Add endpoint"

### 2.2 Get Webhook Signing Secret

1. After creating the endpoint, click on it
2. Click "Reveal" under "Signing secret"
3. Copy the secret (starts with `whsec_`)
4. Add to your environment variables as `STRIPE_WEBHOOK_SECRET`

## Step 3: Update Database Schema

Run Prisma migrations to add the Payment model:

```bash
npx prisma db push
npx prisma generate
```

## Step 4: Configure Stripe Customer Portal

The customer portal allows users to view their invoices and receipts.

1. Go to https://dashboard.stripe.com/settings/billing/portal
2. Enable "Customer portal"
3. Configure settings:
   - **Business information**: Add your business name, support email, etc.
   - **Invoice history**: Enable (users can download invoices)
   - **Payment methods**: Disable (one-time payment, no updates needed)
   - **Subscriptions**: Disable (not using subscriptions)
   - **Cancellation**: Disable (one-time payment)

## Step 5: Test Payment Flow

### Test Mode First (Recommended)

1. Use test keys from Stripe Dashboard
2. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
3. Complete a test purchase
4. Verify user is upgraded to Pro in database

### Production Testing

1. Use a real card (recommend using a small amount first)
2. Complete purchase
3. Verify:
   - User upgraded to Pro
   - Payment record created in database
   - Stripe webhook received and processed
   - Invoice available in Stripe Dashboard

## Step 6: Monitor and Verify

### Check Stripe Dashboard
- https://dashboard.stripe.com/payments - View payments
- https://dashboard.stripe.com/webhooks - Monitor webhook deliveries
- https://dashboard.stripe.com/logs - Check for errors

### Check Application Logs
Look for these log patterns:
```
[WEBHOOK] Received event: checkout.session.completed
[WEBHOOK] User upgraded successfully
```

### Verify Database
```sql
-- Check recent payments
SELECT * FROM "Payment" ORDER BY "createdAt" DESC LIMIT 10;

-- Check Pro users
SELECT email, "planTier", "upgradedAt" FROM "User" WHERE "planTier" = 'pro';
```

## Revenue Analytics

Access revenue dashboard (admin only):
```
GET /api/admin/revenue?period=30d
```

Update admin email in `/app/api/admin/revenue/route.ts`:
```typescript
const ADMIN_EMAILS = [
  'your-email@example.com', // Replace with your email
]
```

## Common Issues & Solutions

### Issue: Webhook not receiving events
**Solution:**
1. Check webhook URL is correct and accessible
2. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
3. Check Stripe Dashboard > Webhooks > Event log for delivery failures
4. Ensure endpoint is returning 200 status

### Issue: Payment succeeds but user not upgraded
**Solution:**
1. Check Vercel logs for errors
2. Verify database connection
3. Check webhook signature verification
4. Ensure metadata (userId) is being passed correctly

### Issue: "Invalid signature" error
**Solution:**
1. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
2. Don't parse request body before passing to `constructEvent`
3. Ensure raw body is being used (not JSON parsed)

## Security Checklist

- ✅ Webhook signature verification enabled
- ✅ Server-side validation of payment amounts
- ✅ Idempotency check (prevent duplicate processing)
- ✅ User validation before upgrade
- ✅ Secure API keys (never expose secret key to client)
- ✅ HTTPS only in production
- ✅ Security headers on all responses

## Revenue Metrics to Track

With $99 one-time payment to reach $10k/month:
- **101 sales per month** = $9,999/month
- **1,212 sales per year** = $119,988/year

Monitor:
- Conversion rate (visitors → customers)
- Average order value (with promo codes)
- Refund rate
- Customer acquisition cost
- Lifetime value

## Next Steps

1. Set up promotional codes in Stripe Dashboard for special offers
2. Configure email notifications (Stripe sends receipt emails automatically)
3. Set up monitoring/alerts for failed payments
4. Consider implementing:
   - Abandoned cart recovery
   - Upsell opportunities
   - Referral program
   - Annual reporting for taxes

## Support

If you encounter issues:
1. Check Stripe Dashboard logs
2. Check Vercel/application logs
3. Review this guide
4. Contact Stripe support: https://support.stripe.com

---

**Production Ready**: This setup is production-ready and secure. All payments are processed securely by Stripe with PCI DSS compliance.
