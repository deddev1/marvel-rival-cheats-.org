#!/usr/bin/env node
/**
 * Ensures every <img> in built HTML has a non-empty alt attribute.
 * Run after build: npm run validate:img-alts
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(ROOT, 'dist');
const issues = [];

function walk(dir) {
	for (const name of readdirSync(dir)) {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) walk(full);
		else if (name.endsWith('.html')) {
			const html = readFileSync(full, 'utf8');
			for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
				const tag = m[0];
				const alt = tag.match(/\balt=("([^"]*)"|'([^']*)')/i);
				const src = tag.match(/\bsrc=("([^"]*)"|'([^']*)')/i);
				const altVal = alt ? alt[2] ?? alt[3] ?? '' : null;
				const srcVal = src ? src[2] ?? src[3] ?? '' : '';
				if (altVal === null) issues.push({ kind: 'missing-alt', src: srcVal, file: full });
				else if (!altVal.trim()) issues.push({ kind: 'empty-alt', src: srcVal, file: full });
			}
		}
	}
}

walk(dist);

if (issues.length === 0) {
	console.log('✓ All images in dist HTML have non-empty alt attributes.');
	process.exit(0);
}

console.error(`✗ ${issues.length} image(s) missing or empty alt in built HTML:\n`);
for (const i of issues.slice(0, 40)) {
	console.error(`  ${i.kind} ${i.src} → ${path.relative(dist, i.file)}`);
}
if (issues.length > 40) console.error(`  … and ${issues.length - 40} more`);
process.exit(1);
