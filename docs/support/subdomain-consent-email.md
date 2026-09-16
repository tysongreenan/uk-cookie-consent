# Support email — shared consent across subdomains

Ready to send after the subdomain-sharing banner.js change is live in production.

---

Subject: Shared cookie consent across your *.example.com sites

Hi Hugh,

Thanks again for the clear write-up and the GTM screenshot.

The banner was storing consent on each hostname (`www`, `medicine`, `libraries`, …) instead of on the parent domain. That is why you had to accept on every site.

That is fixed for everyone, not only Dalhousie. Consent is now stored on the root domain by default (`example.com` for `www.example.com` / `shop.example.com`, and `dal.ca` for your hosts). One Accept covers the other subdomains.

Your current GTM tag is fine as-is. You do **not** need `window.CookieBannerOptions`. You can delete that first script block if you want; leaving it does no harm.

To confirm after we roll this out:

1. Open a private window.
2. Accept on www.dal.ca.
3. In DevTools → Application → Cookies, `cookie_consent` should show Domain `dal.ca`.
4. Open medicine.dal.ca — you should not be asked again.

If an old per-host cookie is still sitting there, the private window (or deleting `cookie_consent` once) clears it.

Happy to jump on a call if anything looks off.

Best,
Tyson

---

## Generic version (any customer)

Hi,

Consent is now shared across subdomains by default. One Accept on www.example.com also covers shop.example.com and other hosts under example.com. You do not need extra GTM options for that.

If you ever need each hostname to ask separately, that is under Behavior → This hostname only. Saving a new choice in that mode clears the shared cookie on sibling subdomains.

Best,
Tyson
