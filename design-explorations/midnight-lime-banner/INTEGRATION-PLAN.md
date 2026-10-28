# "Midnight Lime" — new banner design style

A dark / lime-accent banner skin modelled on the reference screenshots, adapted to be
**UK GDPR + PECR compliant**. This doc maps every element of the reference to the existing
generator so we know what's free, what's cosmetic, and what's genuinely new.

- **Prototype:** `prototype.html` (open in a browser — fully interactive)
- **Generator:** `lib/banner-generator.ts` (~2,621 lines, builds HTML/CSS/JS as strings)
- **Config type:** `types/index.ts` → `BannerConfig`
- **Builder UI:** `app/dashboard/builder/page.tsx` (the "Design" tab) + `components/banner/banner-preview.tsx`

---

## 1. What the reference actually is

It is **not** a new layout/position — it's a **skin** (visual style + two structural additions).
The product already has the layout primitives it needs:

| Reference trait | Status | Already provided by |
| --- | --- | --- |
| Bottom-left compact card | ✅ Free | `position: 'floating-bottom-left'` → `bottom:20px; left:20px; max-width:400px` (generator L351) |
| Dark base | ✅ Free | `theme: 'dark'` |
| Rounded card + subtle border | ✅ Free | `layout.borderRadius`, theme border color (`getBorderColor`, L282) |
| Lime accent, near-black inset boxes | 🎨 Cosmetic | `colors.button` = lime + skin CSS |
| Pill toggles w/ checkmark | 🎨 Cosmetic | restyle the existing 44×24 toggle markup |
| "Overview" pill button (cookie icon) | 🎨 Cosmetic | restyle/relabel the existing preferences button |
| 3-button row (Reject all / Accept Selection / Accept all) | 🟡 Small new | new button-row variant + "Accept Selection" semantics |
| **Inline category toggles on the banner body** | 🟠 New structure | banner body has no toggles today (L422–452) |
| **Overview modal with per-vendor rows + expand box** | 🔴 Biggest new build | modal lists 5 fixed categories only (L571–662); no vendor iteration |

---

## 2. ⚠️ Compliance constraint (do NOT copy the screenshot's defaults)

In the reference, **Analytics and Marketing are pre-toggled ON**. For a UK GDPR / PECR product
that is **non-compliant** — non-essential consent must be **opt-in** (default OFF), and the
strictly-necessary category must be **locked ON**.

The "Midnight Lime" skin therefore **replicates the look, not the default state**:
- Functional / Strictly-Necessary → locked ON, non-interactive (rendered lime + checkmark + "Always on").
- Analytics → default **OFF**.
- Marketing & Social → default **OFF**.
- "Accept Selection" saves only the categories the user toggled on; "Reject all" forces non-essential OFF.

The prototype already behaves this way. Anyone implementing this must keep these defaults and
must respect existing `behavior.gpc` / geo opt-in logic.

---

## 3. Recommended approach: add a `designStyle` dimension

The generator currently branches on `theme` + `position` only. Rather than overloading `position`,
add a small, explicit style axis so the skin is selectable and future skins are cheap:

```ts
// types/index.ts → BannerConfig
designStyle?: 'classic' | 'midnight'   // default 'classic' (back-compat)
```

- Defaulting to `'classic'` means **every existing banner is unchanged** (matches the
  `banner-generator-defensive-defaults` rule — null-check and default at the top of the generator).
- Add the default in the same place the other config defaults are backfilled (top of
  `generateBannerCode`, near L260) and bump the migration in `lib/banner-version.ts` /
  `lib/banner-migration.ts`.

### Generator changes (`lib/banner-generator.ts`)
1. **Banner body (L422–452):** when `designStyle === 'midnight'`, render the variant that adds the
   inline pill toggles (necessary locked, analytics/marketing off) and the 3-button row, plus the
   "Overview" pill in the header. Keep the classic body untouched for `'classic'`.
2. **Toggle markup:** extract the toggle into one helper so the pill+checkmark skin and the classic
   round skin share wiring (there are already ~5 near-duplicate toggle blocks at L599–658 — fold them
   into a helper while here; see `simplify`).
3. **Overview modal:** add a midnight variant of `preferencesModal` (L512–681) that **iterates
   `config.scripts.{strictlyNecessary,functionality,trackingPerformance,targetingAdvertising}`** into
   per-vendor rows. Each `TrackingScript.name` becomes a row; the diagonal-arrow box expands to show
   purpose/retention. Group the four script arrays into the 3 visible categories (necessary+functional
   → "Functional", performance → "Analytics", advertising → "Marketing & Social").
4. **Runtime JS:** wire the inline banner toggles to the same consent state the modal toggles use, so
   "Accept Selection" reads them. Reuse the existing `window.showCookiePreferences()` plumbing for the
   Overview button.
5. **CSS:** append a scoped midnight stylesheet (tokens from the prototype `:root`). Keep colors driven
   by `config.colors` where possible so users can still recolor the accent.

### Builder UI changes (`app/dashboard/builder/page.tsx`)
- Add a **"Design Style"** selector in the existing Design tab (alongside the theme `Select` at L1674).
  Two cards: **Classic** and **Midnight Lime** (thumbnail swatch like the existing template cards).
- Selecting **Midnight Lime** should set a sensible bundle: `theme:'dark'`,
  `position:'floating-bottom-left'`, `colors.button` = lime, `behavior.showPreferences:true` — but
  leave the user free to re-tweak.
- `components/banner/banner-preview.tsx` must render the new skin so the live preview matches.

---

## 4. Build size estimate

| Piece | Effort | Risk |
| --- | --- | --- |
| `designStyle` field + default + migration | XS | low |
| Skin CSS + pill toggles + Overview pill + 3-button row | S | low |
| Inline banner toggles wired to consent state | M | med (JS state sync) |
| Overview modal: per-vendor rows from `scripts.*` + expand | **L** | med (new data iteration, empty-state when a category has no scripts) |
| Builder "Design Style" picker + preview parity | M | low |

Net: one focused feature. The per-vendor Overview modal is ~60% of the work; everything else is
cosmetic or a small structural add.

## 5. Open questions for the user
1. **Naming** — "Midnight Lime"? Or keep the accent user-recolorable and name it just "Midnight"
   (dark) so the lime is a default, not a hard requirement?
2. **Inline toggles** — keep all three on the banner (denser), or only show them in `floating`
   positions and fall back to "Customise" for `top`/`bottom` bars where horizontal space is tight?
3. **Vendor detail source** — per-vendor purpose/retention isn't stored on `TrackingScript` today
   (only `name` + `category`). Do we (a) show name only, (b) add optional `purpose`/`retention`
   fields, or (c) auto-map known vendors (Google, Cloudflare, Meta…) to canned descriptions?
