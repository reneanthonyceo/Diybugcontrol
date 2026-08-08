#!/usr/bin/env node
/** Runs Shopify theme-check over this theme and exits non-zero on any error. */
import { themeCheckRun } from '@shopify/theme-check-node';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEVERITY = { 0: 'ERROR', 1: 'WARNING', 2: 'INFO' };

const { offenses } = await themeCheckRun(root);

if (offenses.length === 0) {
  console.log('theme-check: clean');
  process.exit(0);
}

for (const offense of offenses.sort((a, b) => a.severity - b.severity)) {
  const file = String(offense.uri).replace(`file://${root}/`, '');
  const line = (offense.start?.line ?? 0) + 1;
  console.log(`${SEVERITY[offense.severity] ?? offense.severity} ${offense.check}  ${file}:${line}`);
  console.log(`   ${offense.message}`);
}

const errors = offenses.filter((o) => o.severity === 0).length;
console.log(`\n${offenses.length} offenses (${errors} errors)`);
process.exit(errors > 0 ? 1 : 0);
