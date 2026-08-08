# Getting this onto your Shopify store

Two separate things have to happen, and they are independent:

1. **The theme** — the design and templates. Upload a ZIP, or push with the CLI.
2. **The content** — metafield definitions, pest collections, products, guides.

The theme will install and preview fine with no content, but the pest finder and
product pages will look empty until step 2 runs. Do the theme first so you can
see something; do the content before you judge it.

Nothing here publishes anything to customers. The theme installs unpublished and
the seeded products and articles are created as drafts.

---

## Step 1 — Install the theme

### Option A: upload the ZIP (no tools needed)

Best if you just want it on the store now.

1. Download `dist/diybugcontrol-theme.zip` (build it with `npm run package`, or
   use the copy already sent to you)
2. In Shopify admin: **Online Store → Themes**
3. **Add theme → Upload zip file**
4. Select the ZIP and upload

It lands in **Theme library** as an unpublished theme. Click **Customize** to
open it, or **Preview** to walk the storefront without going live.

### Option B: Shopify CLI (better for ongoing changes)

Best if you'll keep editing. Gives you live reload and one-command deploys.

```bash
npm install -g @shopify/cli@latest

git clone https://github.com/reneanthonyceo/Diybugcontrol.git
cd Diybugcontrol

# Live preview against your real store data, hot-reloading as you edit
shopify theme dev --store fcphwt-ms.myshopify.com

# Or upload it as an unpublished theme
shopify theme push --store fcphwt-ms.myshopify.com --unpublished
```

The first command opens a browser and asks you to log in — no API tokens to
handle.

`fcphwt-ms.myshopify.com` is this store's permanent domain, already filled in.
Use it rather than `diybugcontrol.com` for every command and API call: the
Admin API and the CLI only answer on the `.myshopify.com` domain. The custom
domain is for customers.

---

## Step 2 — Create the content

This needs an Admin API token. It runs from your machine; the token never leaves
it.

### Get a token

1. Shopify admin → **Settings → Apps and sales channels**
2. **Develop apps → Create an app**, name it anything (e.g. "Seed script")
3. **Configure Admin API scopes** → tick:
   - `write_products`
   - `write_publications`
   - `write_metaobjects`
   - `write_content` (needed for the guides blog)
4. **Save → Install app**
5. **Reveal token once** and copy it — it starts `shpat_`

### Run the seed

```bash
cp .env.example .env
# then edit .env and paste your token

npm install
npm run seed:dry    # prints what it would do, sends nothing
npm run seed        # actually creates it
```

That creates:

- the `dbc` metafield definitions and the `treatment_step` metaobject
- 8 pest collections, each with `dbc.is_pest = true` so it appears in the finder
- 12 products, **as drafts**, joined to their pest collections and priced
- a Guides blog with 6 articles, **unpublished**

Re-running is safe. Anything that already exists is skipped rather than
duplicated.

### If you'd rather not run scripts

Everything the script does can be done by hand in the admin —
`shopify/metafield-definitions.json` lists every field with its exact type. It's
roughly an hour of clicking for 8 collections and 12 products. The script is
faster and less error-prone, but nothing about the theme depends on it having
been used.

---

## Step 3 — Menus

The theme reads two menus by handle. Under **Content → Menus**:

- **`main-menu`** — Shop, Find your pest, Guides
- **`footer`** — whichever pest collections you want in the footer

Without these the header nav renders empty. It's the most common thing to miss.

---

## Step 4 — Reviews (optional)

Install any review app — Judge.me, Okendo, Yotpo, Loox. Star ratings appear on
product cards and product pages automatically, because the theme reads Shopify's
standard rating metafields that all of them write to.

For the review list itself: **Customize → Products →** select the
**Product reviews** section **→ Add block →** pick your app's block.

---

## Step 5 — Look at it before you publish

Preview the theme and walk through:

- home — is the pest finder populated?
- a pest page — `/collections/cockroaches`
- a product page — does the buy box work, does add-to-cart reach the cart?
- the cart — update quantity, remove a line
- a guide article
- the same pages on a phone

**This step matters more than usual.** The theme passes Shopify's `theme-check`
static analysis, but it has never been rendered against a live store. If
something is going to be wrong, this is where you'll find it — and I'd rather
you find it in preview than after publishing.

When you're satisfied: **Online Store → Themes → Actions → Publish**.

---

## Before customers see it

The seeded catalog is placeholder. Product claims — what a product kills, its
safety statements, its directions for use — are regulated content under FIFRA
in the US, and must match the manufacturer's registered label exactly. That's
why products seed as drafts.

See [`shopify/SETUP.md`](shopify/SETUP.md#before-you-publish) for the specific
fields that must be replaced.

---

## If something goes wrong

**Upload rejected** — the ZIP must contain the theme folders at the top level.
Rebuild it with `npm run package`; don't zip the repo folder itself.

**Pest finder is empty** — no collection has `dbc.is_pest` set to true. Either
the seed hasn't run, or it ran before the metafield definitions existed.

**Header nav is empty** — the `main-menu` menu doesn't exist. See step 3.

**Product page missing the kills / safety / application panels** — those
products have no `dbc` metafields. The panels hide themselves rather than
rendering empty boxes, which is intended.

**Stars missing** — no review app installed, or no product has a rating yet. An
unrated product deliberately shows nothing rather than an empty five-star row.
