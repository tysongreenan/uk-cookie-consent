# Quick Start - Stripe Payment Setup

## 🚀 Deploy in 5 Steps

### 1. Add Environment Variables to Vercel

```bash
STRIPE_SECRET_KEY="sk_live_..." # Get from Stripe Dashboard

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." # Get from Stripe Dashboard

NEXT_PUBLIC_BASE_URL="https://www.cookie-banner.ca"

# You'll add this after Step 3:
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 2. Update Database

```bash
npx prisma db push
npx prisma generate
```

### 3. Deploy Code

```bash
git add .
git commit -m "Add Stripe $99 payment system"
git push origin develop  # or master
```

### 4. Configure Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://www.cookie-banner.ca/api/stripe/webhook`
4. Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
5. Copy the webhook secret (starts with `whsec_`)
6. Add to Vercel as `STRIPE_WEBHOOK_SECRET`
7. **Redeploy** Vercel

### 5. Test Payment

1. Go to https://www.cookie-banner.ca/upgrade
2. Click "Upgrade to Pro"
3. Complete checkout with real card
4. Verify user upgraded to Pro

## ✅ Verification Checklist

- [ ] Environment variables added to Vercel
- [ ] Database schema updated (Payment model added)
- [ ] Code deployed to production
- [ ] Stripe webhook configured
- [ ] Webhook secret added to Vercel
- [ ] Redeployed after webhook secret
- [ ] Test purchase completed successfully
- [ ] User upgraded to Pro
- [ ] Payment appears in Stripe Dashboard

## 📊 Key URLs

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Webhooks**: https://dashboard.stripe.com/webhooks
- **Payments**: https://dashboard.stripe.com/payments
- **Upgrade Page**: https://www.cookie-banner.ca/upgrade
- **Revenue API**: https://www.cookie-banner.ca/api/admin/revenue?period=30d

## 🎯 Revenue Goal

**Target**: $10,000/month at $99 per sale
- **101 sales per month**
- **3.4 sales per day**
- **24 sales per week**

## 📞 Support

- Issues? Check `/STRIPE_SETUP.md` for detailed troubleshooting
- Deployment help? See `/DEPLOYMENT_CHECKLIST.md`
- Full details? Read `/PAYMENT_IMPLEMENTATION_SUMMARY.md`

---

**Everything is configured for `www.cookie-banner.ca`** ✅
