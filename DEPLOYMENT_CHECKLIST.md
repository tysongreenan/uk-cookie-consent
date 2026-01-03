# Deployment Checklist - Stripe Integration

## Pre-Deployment

### 1. Environment Variables (Vercel)
```bash
# Add these to Vercel Dashboard > Settings > Environment Variables

STRIPE_SECRET_KEY="sk_live_..." # Get from Stripe Dashboard

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Get from Stripe Dashboard

STRIPE_WEBHOOK_SECRET="whsec_..." # Get from Stripe Dashboard after creating webhook

NEXT_PUBLIC_BASE_URL="https://www.cookie-banner.ca"

# Ensure these are already set:
DATABASE_URL="..." # PostgreSQL connection
NEXTAUTH_URL="https://www.cookie-banner.ca"
NEXTAUTH_SECRET="..." # Your NextAuth secret
```

### 2. Database Migration
```bash
# Run this before deploying
npx prisma db push
npx prisma generate
```

### 3. Code Review
- ✅ All pricing updated to $99
- ✅ Webhook uses Prisma (not Supabase)
- ✅ Payment tracking implemented
- ✅ Idempotency checks in place
- ✅ Security headers added
- ✅ Customer portal endpoint created

## Deployment Steps

### 1. Push to Git
```bash
git add .
git commit -m "Implement Stripe $99 one-time payment with revenue tracking"
git push origin master  # or your branch name
```

### 2. Deploy to Vercel
Vercel will auto-deploy from your Git push, or manually trigger:
```bash
vercel --prod
```

### 3. Set Up Stripe Webhook (CRITICAL)
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://www.cookie-banner.ca/api/stripe/webhook`
4. Select events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
5. Copy webhook signing secret (whsec_...)
6. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`
7. Redeploy Vercel after adding webhook secret

### 4. Configure Stripe Customer Portal
1. Go to https://dashboard.stripe.com/settings/billing/portal
2. Enable customer portal
3. Configure:
   - Business name and support email
   - Enable invoice history
   - Disable payment method updates (one-time payment)
   - Disable subscriptions
   - Disable cancellations

## Post-Deployment Testing

### Test 1: Payment Flow
1. Create new test account or use existing free account
2. Navigate to `/upgrade`
3. Click "Upgrade to Pro"
4. Complete Stripe checkout with real card
5. Verify:
   - ✅ Redirected to success page
   - ✅ User planTier changed to 'pro'
   - ✅ Payment record created in database
   - ✅ Stripe customer ID saved

### Test 2: Webhook Verification
1. Check Stripe Dashboard > Webhooks
2. Find recent `checkout.session.completed` event
3. Verify:
   - ✅ Status: Succeeded (green checkmark)
   - ✅ Response: 200 OK
   - ✅ Check logs show "[WEBHOOK] User upgraded successfully"

### Test 3: Customer Portal
1. As Pro user, navigate to `/dashboard/settings`
2. Add button to access billing portal (if not already present)
3. Click billing portal link
4. Verify:
   - ✅ Can view invoice
   - ✅ Can download receipt
   - ✅ Return URL works

### Test 4: Revenue Analytics (Admin)
1. Update admin email in `/app/api/admin/revenue/route.ts`
2. Access: `https://www.cookie-banner.ca/api/admin/revenue?period=30d`
3. Verify:
   - ✅ Shows correct revenue
   - ✅ Shows payment count
   - ✅ Shows recent transactions

## Monitoring

### Daily Checks (First Week)
- Check Stripe Dashboard for new payments
- Check webhook delivery success rate
- Monitor Vercel logs for errors
- Verify database integrity

### Stripe Dashboard URLs
- Payments: https://dashboard.stripe.com/payments
- Webhooks: https://dashboard.stripe.com/webhooks
- Customers: https://dashboard.stripe.com/customers
- Logs: https://dashboard.stripe.com/logs

### Key Metrics to Watch
- **Conversion Rate**: Visitors to /upgrade → successful purchases
- **Webhook Success Rate**: Should be 100%
- **Failed Payments**: Investigate any failures
- **Refund Requests**: Handle promptly (good customer service)

## Emergency Procedures

### If webhook fails:
1. Check Vercel logs for errors
2. Verify webhook secret matches Stripe
3. Check database connection
4. Test webhook manually in Stripe Dashboard

### If user pays but not upgraded:
1. Find payment in Stripe Dashboard
2. Get session ID and payment intent ID
3. Manually upgrade user in database:
```sql
UPDATE "User"
SET "planTier" = 'pro',
    "upgradedAt" = NOW(),
    "stripeCustomerId" = '...',
    "stripePaymentIntentId" = '...'
WHERE id = '...';
```
4. Create payment record manually if needed

### If duplicate charges occur:
1. Issue refund in Stripe Dashboard
2. Check idempotency logic in webhook
3. Investigate database constraints

## Success Criteria

- ✅ Users can purchase Pro for $99
- ✅ Payment immediately upgrades account
- ✅ Webhooks process 100% successfully
- ✅ Payments tracked in database
- ✅ Invoices accessible to customers
- ✅ Revenue analytics working
- ✅ No security vulnerabilities
- ✅ Error handling graceful

## Revenue Goal Tracking

To reach $10,000/month at $99 per purchase:
- **Target**: 101 sales per month
- **Daily target**: ~3.4 sales per day
- **Weekly target**: ~24 sales per week

Track weekly and adjust marketing accordingly.

## Next Optimizations (Optional)

1. **Email marketing**: Send upgrade reminder emails
2. **Abandoned checkout**: Stripe Checkout supports this
3. **Promotional codes**: Create discount codes in Stripe
4. **A/B testing**: Test different pricing ($89, $99, $119)
5. **Upsells**: Offer premium support or consulting
6. **Referral program**: Give credit for referrals
7. **Annual plans**: Offer subscription option later if needed

---

**Status**: Ready for production deployment
**Last Updated**: 2025-01-03
