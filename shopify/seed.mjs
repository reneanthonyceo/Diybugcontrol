#!/usr/bin/env node
/**
 * Seeds a Shopify store with the structures this theme reads:
 * metafield definitions, a treatment_step metaobject definition, one collection
 * per pest, and the products from seed-data.json.
 *
 * The catalog in seed-data.json is PLACEHOLDER CONTENT. Fields carrying legal
 * weight — kills, safety, application_steps, coverage — must be replaced with
 * text from the registered product label before a store goes live.
 *
 * Usage:
 *   SHOPIFY_STORE=your-store.myshopify.com \
 *   SHOPIFY_ADMIN_TOKEN=shpat_... \
 *   node shopify/seed.mjs [--definitions-only] [--dry-run]
 *
 * The token needs write_products, write_publications and write_metaobjects.
 * Create it under Settings → Apps and sales channels → Develop apps.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const API_VERSION = '2025-07';

const STORE = process.env.SHOPIFY_STORE;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const DEFINITIONS_ONLY = process.argv.includes('--definitions-only');
const DRY_RUN = process.argv.includes('--dry-run');

if (!DRY_RUN && (!STORE || !TOKEN)) {
  console.error('Set SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN, or pass --dry-run.');
  process.exit(1);
}

const defs = JSON.parse(readFileSync(join(HERE, 'metafield-definitions.json'), 'utf8'));
const { pests, products } = JSON.parse(readFileSync(join(HERE, 'seed-data.json'), 'utf8'));
const guides = JSON.parse(readFileSync(join(HERE, 'seed-guides.json'), 'utf8'));

/** Minimal Admin GraphQL client with useful error surfacing. */
async function gql(query, variables = {}) {
  if (DRY_RUN) {
    console.log('  [dry-run]', query.trim().split('\n')[0].slice(0, 72));
    return {};
  }
  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${await res.text()}`);
  }

  const body = await res.json();
  if (body.errors) {
    throw new Error(`GraphQL: ${JSON.stringify(body.errors, null, 2)}`);
  }
  return body.data;
}

/** Collects userErrors from any mutation payload and throws if non-empty. */
function assertNoUserErrors(payload, label) {
  const errors = payload?.userErrors ?? [];
  // "already taken" is expected on re-run; the script is idempotent by design.
  const fatal = errors.filter((e) => !/taken|already exists/i.test(e.message));
  if (fatal.length) {
    throw new Error(`${label}: ${fatal.map((e) => e.message).join('; ')}`);
  }
  if (errors.length) console.log(`  · ${label} already existed, skipping`);
}

const handle = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Definitions ---------------------------------------------------------- */

async function createMetaobjectDefinitions() {
  for (const def of defs.metaobjects) {
    console.log(`metaobject definition: ${def.type}`);
    const data = await gql(
      `mutation Create($definition: MetaobjectDefinitionCreateInput!) {
        metaobjectDefinitionCreate(definition: $definition) {
          metaobjectDefinition { id type }
          userErrors { field message }
        }
      }`,
      { definition: def },
    );
    assertNoUserErrors(data?.metaobjectDefinitionCreate, def.type);
  }
}

async function createMetafieldDefinitions(list, ownerType) {
  for (const def of list) {
    console.log(`${ownerType.toLowerCase()} metafield: ${def.namespace}.${def.key}`);
    const data = await gql(
      `mutation Create($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition { id key }
          userErrors { field message }
        }
      }`,
      {
        definition: {
          name: def.name,
          namespace: def.namespace,
          key: def.key,
          description: def.description,
          type: def.type,
          ownerType,
          validations: def.validations ?? [],
          access: { storefront: 'PUBLIC_READ' },
        },
      },
    );
    assertNoUserErrors(data?.metafieldDefinitionCreate, def.key);
  }
}

/* Content -------------------------------------------------------------- */

async function createTreatmentStep(step) {
  const data = await gql(
    `mutation Create($metaobject: MetaobjectCreateInput!) {
      metaobjectCreate(metaobject: $metaobject) {
        metaobject { id }
        userErrors { field message }
      }
    }`,
    {
      metaobject: {
        type: 'treatment_step',
        capabilities: { publishable: { status: 'ACTIVE' } },
        fields: [
          { key: 'title', value: step.title },
          { key: 'detail', value: step.detail },
        ],
      },
    },
  );
  return data?.metaobjectCreate?.metaobject?.id;
}

async function createPestCollections() {
  const bySlug = {};

  for (const pest of pests) {
    console.log(`collection: ${pest.name}`);

    const stepIds = [];
    for (const step of pest.steps) {
      const id = await createTreatmentStep(step);
      if (id) stepIds.push(id);
    }

    const data = await gql(
      `mutation Create($input: CollectionInput!) {
        collectionCreate(input: $input) {
          collection { id handle }
          userErrors { field message }
        }
      }`,
      {
        input: {
          title: pest.name,
          handle: pest.slug,
          descriptionHtml: `<p>${pest.tagline}</p>`,
          templateSuffix: 'pest',
          metafields: [
            { namespace: 'dbc', key: 'is_pest', type: 'boolean', value: 'true' },
            { namespace: 'dbc', key: 'short_name', type: 'single_line_text_field', value: pest.shortName },
            { namespace: 'dbc', key: 'glyph', type: 'single_line_text_field', value: pest.glyph },
            { namespace: 'dbc', key: 'tagline', type: 'single_line_text_field', value: pest.tagline },
            { namespace: 'dbc', key: 'signs', type: 'list.single_line_text_field', value: JSON.stringify(pest.signs) },
            ...(stepIds.length
              ? [{ namespace: 'dbc', key: 'steps', type: 'list.metaobject_reference', value: JSON.stringify(stepIds) }]
              : []),
          ],
        },
      },
    );

    assertNoUserErrors(data?.collectionCreate, pest.slug);
    const id = data?.collectionCreate?.collection?.id;
    if (id) bySlug[pest.slug] = id;
  }

  return bySlug;
}

async function createProducts(collectionsBySlug) {
  for (const product of products) {
    console.log(`product: ${product.name}`);

    const metafields = [
      { key: 'summary', type: 'multi_line_text_field', value: product.summary },
      { key: 'unit', type: 'single_line_text_field', value: product.unit },
      { key: 'glyph', type: 'single_line_text_field', value: product.glyph },
      { key: 'coverage', type: 'single_line_text_field', value: product.coverage },
      { key: 'kills', type: 'list.single_line_text_field', value: JSON.stringify(product.kills) },
      { key: 'use_where', type: 'list.single_line_text_field', value: JSON.stringify(product.useWhere) },
      { key: 'application_steps', type: 'list.single_line_text_field', value: JSON.stringify(product.applicationSteps) },
      { key: 'safety', type: 'list.single_line_text_field', value: JSON.stringify(product.safety) },
    ]
      .filter((m) => m.value && m.value !== '[]')
      .map((m) => ({ ...m, namespace: 'dbc' }));

    if (product.badge) {
      metafields.push({ namespace: 'dbc', key: 'badge', type: 'single_line_text_field', value: product.badge });
    }

    const collectionIds = product.pests
      .map((slug) => collectionsBySlug[slug])
      .filter(Boolean);

    const data = await gql(
      `mutation Create($input: ProductInput!) {
        productCreate(input: $input) {
          product { id handle }
          userErrors { field message }
        }
      }`,
      {
        input: {
          title: product.name,
          handle: product.slug,
          descriptionHtml: `<p>${product.summary}</p>`,
          status: 'DRAFT',
          productType: 'Pest control',
          vendor: 'DIY Bug Control',
          metafields,
          ...(collectionIds.length ? { collectionsToJoin: collectionIds } : {}),
        },
      },
    );

    assertNoUserErrors(data?.productCreate, product.slug);

    const productId = data?.productCreate?.product?.id;
    if (!productId || DRY_RUN) continue;

    // Price lives on the variant, not the product.
    const variants = await gql(
      `query Variants($id: ID!) {
        product(id: $id) { variants(first: 1) { nodes { id } } }
      }`,
      { id: productId },
    );
    const variantId = variants?.product?.variants?.nodes?.[0]?.id;
    if (!variantId) continue;

    const priced = await gql(
      `mutation SetPrice($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      {
        productId,
        variants: [
          {
            id: variantId,
            price: product.price.toFixed(2),
            inventoryPolicy: 'DENY',
          },
        ],
      },
    );
    assertNoUserErrors(priced?.productVariantsBulkUpdate, `${product.slug} price`);
  }
}

/* Guides --------------------------------------------------------------- */

async function createGuides() {
  console.log(`blog: ${guides.blog.title}`);

  const created = await gql(
    `mutation Create($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) {
        blog { id handle }
        userErrors { field message }
      }
    }`,
    {
      blog: {
        title: guides.blog.title,
        handle: guides.blog.handle,
      },
    },
  );
  assertNoUserErrors(created?.blogCreate, guides.blog.handle);

  let blogId = created?.blogCreate?.blog?.id;

  // On a re-run the handle is taken, so look the existing blog up instead.
  if (!blogId && !DRY_RUN) {
    const found = await gql(
      `query FindBlog($query: String!) {
        blogs(first: 1, query: $query) { nodes { id } }
      }`,
      { query: `handle:${guides.blog.handle}` },
    );
    blogId = found?.blogs?.nodes?.[0]?.id;
  }

  if (!blogId && !DRY_RUN) {
    console.log('  · could not resolve the blog, skipping articles');
    return;
  }

  for (const article of guides.articles) {
    console.log(`article: ${article.title}`);
    const result = await gql(
      `mutation Create($article: ArticleCreateInput!) {
        articleCreate(article: $article) {
          article { id handle }
          userErrors { field message }
        }
      }`,
      {
        article: {
          blogId,
          title: article.title,
          handle: article.handle,
          body: article.body,
          summary: article.summary,
          isPublished: false,
          author: { name: guides.blog.title },
        },
      },
    );
    assertNoUserErrors(result?.articleCreate, article.handle);
  }
}

/* Run ------------------------------------------------------------------ */

async function main() {
  if (DRY_RUN) console.log('Dry run — no requests will be sent.\n');

  console.log('== Definitions ==');
  await createMetaobjectDefinitions();
  await createMetafieldDefinitions(defs.productDefinitions, 'PRODUCT');
  await createMetafieldDefinitions(defs.collectionDefinitions, 'COLLECTION');

  if (DEFINITIONS_ONLY) {
    console.log('\nDefinitions created. Re-run without --definitions-only to seed content.');
    return;
  }

  console.log('\n== Pest collections ==');
  const collections = await createPestCollections();

  console.log('\n== Products ==');
  await createProducts(collections);

  console.log('\n== Guides ==');
  await createGuides();

  console.log(
    '\nDone. Products and articles were created unpublished — review the label' +
      '\nand efficacy copy, then publish.',
  );
}

main().catch((error) => {
  console.error(`\nFailed: ${error.message}`);
  process.exit(1);
});
