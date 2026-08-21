#!/usr/bin/env node
/**
 * Notify search engines after deploy that sitemap.xml changed.
 * Run: npm run ping:sitemap
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readBrandUrl() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/(?:^|\n)\turl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing url');
	return m[1].replace(/\\'/g, "'").replace(/\/$/, '');
}

const SITE = readBrandUrl();
const SITEMAP = `${SITE}/sitemap.xml`;

async function ping(name, url) {
	try {
		const res = await fetch(url, { redirect: 'follow' });
		// Google/Bing deprecated sitemap ping (404/410) — GSC submission is the reliable path.
		const ok = res.ok || res.status === 204 || res.status === 404 || res.status === 410;
		const note = res.status === 404 || res.status === 410 ? ' (endpoint deprecated — use Search Console)' : '';
		console.log(`${ok ? '·' : '✗'} ${name}: HTTP ${res.status}${note}`);
		return ok;
	} catch (err) {
		console.log(`✗ ${name}: ${err instanceof Error ? err.message : err}`);
		return false;
	}
}

async function indexNow() {
	const keyPath = path.join(ROOT, 'public', `${new URL(SITE).hostname}.txt`);
	let key;
	try {
		key = readFileSync(keyPath, 'utf8').trim();
	} catch {
		console.log('· IndexNow: skipped (no public/' + new URL(SITE).hostname + '.txt key file)');
		return true;
	}

	try {
		const res = await fetch('https://api.indexnow.org/indexnow', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({
				host: new URL(SITE).hostname,
				key,
				keyLocation: `${SITE}/${new URL(SITE).hostname}.txt`,
				urlList: [SITE + '/', SITEMAP],
			}),
		});
		const ok = res.ok || res.status === 202;
		console.log(`${ok ? '✓' : '✗'} IndexNow: HTTP ${res.status}`);
		return ok;
	} catch (err) {
		console.log(`✗ IndexNow: ${err instanceof Error ? err.message : err}`);
		return false;
	}
}

console.log(`Pinging search engines for ${SITEMAP}\n`);

const googleOk = await ping(
	'Google sitemap ping',
	`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
);
const bingOk = await ping(
	'Bing sitemap ping',
	`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
);
const indexNowOk = await indexNow();

if (!indexNowOk) {
	process.exitCode = 1;
} else {
	console.log('\nSubmit in Google Search Console: ' + SITEMAP);
}
