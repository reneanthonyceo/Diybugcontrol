# Store setup

Order matters. Definitions must exist before content references them, and
content must exist before the theme has anything to render.

## 1. Create the metafield and metaobject definitions

The theme reads product and collection metafields in the `dbc` namespace, plus a
`treatment_step` metaobject. Without them the product and pest templates render
their empty states rather than failing — but they will be empty.

```bash
export SHOPIFY_STORE=your-store.myshopify.com
export SHOPIFY_ADMIN_TOKEN=shpat_...

npm run seed -- --definitions-only
```

The token needs `write_products`, `write_publications`, and `write_metaobjects`.
Create it under **Settings → Apps and sales channels → Develop apps**.

Preview without touching the store first:

```bash
npm run seed:dry
```

Definitions are also documented in `metafield-definitions.json` if you would
rather create them by hand in the admin.

## 2. Seed pests and products

```bash
npm run seed
```

This creates:

- one **collection per pest**, handle matching the slug, with
  `templateSuffix: pest` so it uses `templates/collection.pest.json`
- `dbc.is_pest = true` on each, which is what puts it in the pest finder
- `treatment_step` metaobjects for each pest's sequence
- **twelve products** as **DRAFT**, joined to their pest collections, priced from
  the catalog

Products land as draft deliberately. Review the label copy before publishing —
see the warning below.

## 3. Push the theme

```bash
shopify theme push --store $SHOPIFY_STORE
```

Or `shopify theme dev` to preview against live store data.

## 4. Create the menus

The header reads a link list named `main-menu`; the footer blocks read
`main-menu` and `footer`. Create them under **Content → Menus**:

- **Main menu** — Shop (`/collections/all`), Find your pest, Guides
- **Footer** — the pest collections you want surfaced

## 5. Reviews

The theme reads Shopify's standard `reviews.rating` and `reviews.rating_count`
metafields, which Judge.me, Okendo, and Shopify Product Reviews all write to.
Install a review app and ratings appear on cards and product pages
automatically. With no app installed the star rating renders nothing rather than
an empty five-star row — an unrated product should not look like a zero-star
one.

Individual review bodies are not rendered by this theme; review apps supply
their own blocks for that.

---

## Before you publish

**The seeded catalog is placeholder content.** Every SKU, price, and product
claim in `seed-data.json` was written to build and exercise the templates.

The fields below carry legal weight and must be replaced with text from the
registered product label before anything is published:

| Metafield | Why |
| --- | --- |
| `dbc.kills` | Target-species claims are part of the registered label |
| `dbc.safety` | Precautionary statements are legally prescribed wording |
| `dbc.application_steps` | Directions for use are legally prescribed |
| `dbc.coverage` | Application rate claims |

In the US, pesticide labelling is regulated under FIFRA and it is unlawful to
sell or distribute a pesticide with claims that differ from its registered
label. This is not a copy-quality problem — it is a compliance one. Get the
label text from the manufacturer and, if you are unsure, have counsel review it.

The product template carries a label disclaimer under the safety panel, set in
the section settings. Leave it on.
