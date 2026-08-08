# DIY Bug Control

A Shopify theme (Online Store 2.0) for a pest-control storefront, built against
the design system in `design-system/diy-bug-control/`.

> **The seeded catalog is placeholder content.** Every SKU, price, and product
> claim in `shopify/seed-data.json` was written to exercise the templates.
> Pesticide label copy is regulated — see
> [Before you publish](shopify/SETUP.md#before-you-publish) before anything goes
> live.

## Layout

```
assets/         base.css, subset fonts, favicon
config/         theme settings
layout/         theme.liquid
locales/        en.default.json
sections/       header, footer, hero, pest-finder, product, collection, cart, …
snippets/       product-card, star-rating, glyph, metafield-list
templates/      JSON templates, including collection.pest.json
shopify/        metafield definitions, seed script, store setup guide
design-system/  tokens, contrast verification, visual swatch reference
reference/      earlier Astro prototype, kept for reference only
```

## Commands

```bash
npm install
npm run check      # Shopify theme-check; fails on errors
npm run seed:dry   # preview the store seed without sending requests
npm run seed       # create definitions, pest collections, and products

shopify theme dev --store your-store.myshopify.com
shopify theme push --store your-store.myshopify.com
```

Store setup, in order, is in [`shopify/SETUP.md`](shopify/SETUP.md).

## How pests are modelled

A pest is a **collection** carrying `dbc.is_pest = true`, not a metaobject or a
page. That choice does real work:

- a product joins a pest through ordinary collection membership, which a
  merchant already understands
- collection pages, search, and filtering keep working with no extra wiring
- `templateSuffix: pest` gives pest collections their own template
  (`collection.pest.json`) while plain collections stay on `collection.json`

Identification and treatment content lives in collection metafields — `tagline`,
`signs`, and `steps` (a list of `treatment_step` metaobjects). The pest finder
section discovers pests by filtering all collections on `dbc.is_pest`, so adding
a pest is one collection with one boolean, no theme edit.

Pest landing pages are the intended acquisition channel, which is why they get a
dedicated template rather than a generic collection page.

## Design rules that shaped the markup

From `design-system/diy-bug-control/MASTER.md`:

- **One accent CTA per viewport.** Orange is reserved for a single action —
  the hero button, the add-to-cart, the checkout button. Product cards are
  therefore entirely clickable with no competing button, which also gives them
  one accessible name instead of two tab stops.
- **Interactive borders are a separate token.** `--color-border` is decorative
  and measures 1.28:1; `--color-border-interactive` carries anything a user has
  to aim at, and clears the 3:1 UI-component threshold.
- **Safety and application copy sit above marketing copy** on product pages.

Every colour pair in `assets/base.css` is contrast-verified; the measurements
are recorded in MASTER.md §3. The palette deliberately departs from the one the
design generator produced, which targeted 3:1 and failed AA for normal-size
button text.

## No theme JavaScript

Cart count, variant selection, and quantity updates are server-rendered or plain
form posts. The storefront works with scripting disabled and ships nothing to
parse. Fonts are self-hosted and subset to latin with the weight axis preserved
— 54KB for both faces, no third-party request on the critical path.

## Verification

`npm run check` runs Shopify theme-check and currently passes clean. That
validates Liquid syntax, schema shape, translation keys, and asset usage.

It does **not** substitute for rendering against a real store. Nothing here has
been run on a live Shopify instance — the theme should be pushed to a
development store and walked through before it is trusted.

## Reference prototype

`reference/astro-prototype/` holds an earlier static Astro implementation of the
same design and content, built before the platform decision. It is not part of
the theme and is not deployed. It remains useful as a rendered reference for the
intended layout — it has been screenshot-tested across light and dark at desktop
and mobile — and as the origin of `shopify/seed-data.json`. Delete it once the
Shopify build has been reviewed on a real store.
