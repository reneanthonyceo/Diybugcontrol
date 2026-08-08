import { chromium } from 'playwright';
const OUT = './.smoke-shots';
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

// Use a preinstalled Chromium when one is present (CI images often ship it),
// otherwise fall back to Playwright's own resolution.
import { existsSync } from 'fs';
const PREINSTALLED = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const launchOpts = existsSync(PREINSTALLED) ? { executablePath: PREINSTALLED } : {};
const browser = await chromium.launch(launchOpts);
const BASE = process.env.SMOKE_BASE_URL ?? 'http://localhost:4321';
const problems = [];

const pages = [
  ['home', '/', 1280],
  ['home-mobile', '/', 375],
  ['pest', '/pests/cockroaches/', 1280],
  ['product', '/products/roach-gel-bait/', 1280],
  ['product-mobile', '/products/roach-gel-bait/', 375],
  ['shop', '/shop/', 1280],
  ['pests-index', '/pests/', 1280],
  ['guides', '/guides/', 1280],
];

for (const [name, path, width] of pages) {
  for (const scheme of ['light', 'dark']) {
    if (scheme === 'dark' && !['home', 'product'].includes(name)) continue;
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') problems.push(`[console] ${name}/${scheme}: ${m.text()}`); });
    page.on('pageerror', e => problems.push(`[pageerror] ${name}/${scheme}: ${e.message}`));
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    if (res.status() !== 200) problems.push(`[status] ${name}: ${res.status()}`);
    // horizontal scroll check
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) problems.push(`[overflow-x] ${name}/${scheme} at ${width}px`);
    // font actually loaded?
    const fontOk = await page.evaluate(() => document.fonts.check('700 16px Rubik'));
    if (!fontOk) problems.push(`[font] Rubik not loaded on ${name}/${scheme}`);
    await page.screenshot({ path: `${OUT}/${name}-${scheme}.png`, fullPage: true });
    await ctx.close();
  }
}

// interaction: add to cart -> badge -> cart page
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', e => problems.push(`[pageerror] cart-flow: ${e.message}`));
await page.goto(`${BASE}/products/roach-gel-bait/`);
await page.click('[data-add-to-cart]');
await page.waitForTimeout(400);
const badge = await page.textContent('[data-cart-count]');
if (badge !== '1') problems.push(`[cart] badge showed "${badge}" after one add`);
const toastVisible = await page.isVisible('[data-toast]');
if (!toastVisible) problems.push('[cart] toast did not appear');
await page.screenshot({ path: `${OUT}/toast.png` });
await page.goto(`${BASE}/cart/`);
await page.waitForTimeout(300);
const subtotal = await page.textContent('[data-cart-subtotal]');
if (subtotal !== '$34.99') problems.push(`[cart] subtotal was "${subtotal}", expected $34.99`);
await page.click('[data-inc]');
await page.waitForTimeout(200);
const subtotal2 = await page.textContent('[data-cart-subtotal]');
if (subtotal2 !== '$69.98') problems.push(`[cart] subtotal after increment was "${subtotal2}", expected $69.98`);
await page.screenshot({ path: `${OUT}/cart.png`, fullPage: true });
await ctx.close();

await browser.close();
if (problems.length) {
  console.error('PROBLEMS:\n' + problems.join('\n'));
  process.exit(1);
}
console.log(`No problems found. Screenshots in ${OUT}`);
