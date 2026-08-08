#!/usr/bin/env node
/**
 * Builds an uploadable theme ZIP.
 *
 * Shopify's admin uploader expects a theme archive containing only the theme
 * directories. This repo also holds the seed scripts, the design system, and
 * the old Astro prototype — none of which belong in the archive, and some of
 * which would make the upload fail validation.
 *
 * Output: dist/diybugcontrol-theme.zip
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const OUT = join(DIST, 'diybugcontrol-theme.zip');

// Exactly the directories Shopify recognises. Anything else is rejected or
// silently dropped, so be explicit rather than excluding by pattern.
const THEME_DIRS = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];

const missing = THEME_DIRS.filter((dir) => !existsSync(join(ROOT, dir)));
if (missing.length) {
  console.error(`Missing theme directories: ${missing.join(', ')}`);
  process.exit(1);
}

rmSync(OUT, { force: true });
mkdirSync(DIST, { recursive: true });

execFileSync(
  'zip',
  ['-r', '-q', OUT, ...THEME_DIRS, '-x', '*.DS_Store', '-x', '__MACOSX/*'],
  { cwd: ROOT, stdio: 'inherit' },
);

const kb = Math.round(statSync(OUT).size / 1024);
console.log(`Built ${OUT.replace(ROOT + '/', '')} (${kb} KB)`);
console.log('Upload via Online Store → Themes → Add theme → Upload zip file.');
