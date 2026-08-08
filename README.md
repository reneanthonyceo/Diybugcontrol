# DIY Bug Control

A pest-control storefront built on Astro, designed against the system in
`design-system/diy-bug-control/`.

> **This is a demonstration build.** Every product, price, rating, and review in
> `src/data/catalog.ts` is placeholder content written to exercise the templates.
> Nothing is for sale and no claim has been verified. Efficacy and safety copy in
> particular must be replaced with text from the actual product label before this
> site goes anywhere near a customer — that text is regulated.

## Commands

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # static build to dist/
npm run preview  # serve the build
npm run check    # Astro + TypeScript diagnostics
npm run smoke    # browser smoke test against a running preview
```

`npm run smoke` drives a real Chromium over the key pages in light and dark at
desktop and mobile widths. It fails on console errors, non-200 responses,
horizontal overflow, fonts that failed to load, and a broken add-to-cart flow,
and drops full-page screenshots in `.smoke-shots/`. Point it elsewhere with
`SMOKE_BASE_URL`.

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Hero, pest finder, best sellers, trust band, how-it-works |
| `/pests/` | All pests, with the signs that distinguish them |
| `/pests/[slug]/` | Identification, treatment sequence, ranked products, comparison table, pest-filtered reviews |
| `/products/[slug]/` | Buy box, what it kills, where to use, safety, application steps, rating breakdown, reviews |
| `/shop/` | Full catalog |
| `/guides/` | The mistakes that cause most DIY treatments to fail |
| `/cart/` | Cart review — **stubbed**, see below |

Pest landing pages are the intended acquisition channel, which is why the site is
static-first: they need to be fast and indexable.

## Architecture

- **Astro 7, zero client framework.** The only JavaScript shipped is the cart
  stub — a few dozen lines of vanilla JS. Everything else is static HTML.
- **`src/data/catalog.ts` is the single source of content.** Pests and products
  cross-reference by slug; every route derives from it. Replacing the catalog
  replaces the site.
- **Design tokens live in `src/styles/global.css`,** mirroring
  `design-system/diy-bug-control/tokens.css`. Components read tokens and never
  hard-code color.
- **Fonts are self-hosted and subset.** Rubik and Nunito Sans, latin only,
  variable weight axis preserved — 54KB total, no third-party request on the
  critical path.

### The cart is a stub

`/cart/` keeps line items in `localStorage` so the flow can be reviewed end to
end. There is no backend, no inventory check, no tax or shipping logic, and no
payment processing. The checkout button says so rather than pretending. Wiring
real commerce means introducing a provider (Shopify Storefront, Stripe, or
similar) and moving cart state server-side.

## Design system

Tokens, type scale, contrast verification, and component rules are documented in
`design-system/diy-bug-control/MASTER.md`. `swatches.html` in that folder is a
visual reference for the palette and type.

Three rules from that document shape the UI directly:

- **One accent CTA per viewport.** Orange is reserved for the single primary
  action — the hero CTA, the buy box. Product cards are entirely clickable
  instead of carrying competing buttons.
- **Interactive borders are a separate token.** `--color-border` is decorative
  and fails 3:1; `--color-border-interactive` carries anything a user must aim
  at.
- **Safety and application copy sit above marketing copy** on product pages.

## Accessibility

Skip link, landmark structure, visible focus states, 44×44px minimum targets,
`aria-current` on active navigation, `role="alert"` on errors, and
`prefers-reduced-motion` honored. Contrast pairs are calculated and recorded in
`MASTER.md` §3 — the palette deviates from the generated one specifically to
clear AA for normal-size button text.

## Replacing the placeholder catalog

`src/data/catalog.ts` exports `pests` and `products` against typed interfaces.
Swap the arrays for real data and every route follows. Fields that carry legal
weight — `kills`, `safety`, `applicationSteps`, `coverage` — must come from the
registered product label, not from marketing copy.
