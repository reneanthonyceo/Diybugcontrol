# Store setup

Order matters. Definitions must exist before content references them, and
content must exist before the theme has anything to render.

## 1. Create the metafield and metaobject definitions

The theme reads product and collection metafields in the `dbc` namespace, plus a
`treatment_step` metaobject. Without them the product and pest templates render
their empty states rather than failing — but they will be empty.

```bash
cp .env.example .env
# then edit .env and paste your token

npm run seed:definitions
```

The token needs `write_products`, `write_publications`, `write_metaobjects`, and
`write_content`. Create it under **Settings → Apps and sales channels →
Develop apps**. Full walkthrough in [`../INSTALL.md`](../INSTALL.md).

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
shopify theme push --store fcphwt-ms.myshopify.com --unpublished
```

Or `shopify theme dev` to preview against live store data.

## 4. Create the menus

The header reads a link list named `main-menu`; the footer blocks read
`main-menu` and `footer`. Create them under **Content → Menus**:

- **Main menu** — Shop (`/collections/all`), Find your pest, Guides
- **Footer** — the pest collections you want surfaced

## 5. Reviews

Two halves, and they are independent.

**The rating summary** is read from Shopify's standard `reviews.rating` and
`reviews.rating_count` metafields, which Judge.me, Okendo, Yotpo, Loox, and
Shopify's own review app all write to. Install any of them and stars appear on
product cards, in the product page summary, and in the JSON-LD `aggregateRating`
— no configuration. With nothing installed, the star rating renders nothing
rather than an empty five-star row, because an unrated product should not look
like a zero-star one.

**Individual reviews** come from the app's own block. The `product-reviews`
section accepts `@app` blocks, so:

1. Install your review app
2. **Online Store → Themes → Customize → Products**
3. Select the **Product reviews** section
4. **Add block** → pick the app's review block

Switching vendors later is a theme-editor change, not a code change. That is the
reason the section takes app blocks instead of hardcoding one vendor's snippet.

## 6. Guides

`npm run seed` creates a **Guides** blog with six articles, all **unpublished**.

Point each article at its relevant pest collection so the related-products strip
at the end has something to show: **Customize → Article →** set **Related
collection**. This is per-template rather than per-article, so if you want
different products per guide, create article templates
(`article.roaches.json`, etc.) and assign them.

Add the blog to your main menu once the articles are reviewed and published.

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

The six seeded guide articles describe general technique rather than specific
products, so they carry less regulatory exposure than label copy — but they do
make efficacy claims and are also placeholder. Review them before publishing.

In the US, pesticide labelling is regulated under FIFRA and it is unlawful to
sell or distribute a pesticide with claims that differ from its registered
label. This is not a copy-quality problem — it is a compliance one. Get the
label text from the manufacturer and, if you are unsure, have counsel review it.

The product template carries a label disclaimer under the safety panel, set in
the section settings. Leave it on.
