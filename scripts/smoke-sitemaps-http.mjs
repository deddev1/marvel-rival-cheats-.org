#!/usr/bin/env node
/**
 * HTTP smoke test for sitemap index + child sitemaps.
 * Usage:
 *   node scripts/smoke-sitemaps-http.mjs
 *   node scripts/smoke-sitemaps-http.mjs --base http://127.0.0.1:8788 --host marvelrivalscheats.org
 */

const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const hostIdx = args.indexOf('--host');
const BASE = baseIdx >= 0 ? args[baseIdx + 1] : 'https://marvelrivalscheats.org';
const HOST = hostIdx >= 0 ? args[hostIdx + 1] : new URL(BASE).host;

const INDEX_CHILDREN = [
	'sitemap-en.xml',
	'sitemap-es.xml',
	'sitemap-fr.xml',
	'sitemap-de.xml',
	'sitemap-pt.xml',
	'sitemap-it.xml',
	'sitemap-nl.xml',
	'sitemap-pl.xml',
	'sitemap-ru.xml',
	'sitemap-tr.xml',
	'sitemap-ar.xml',
	'sitemap-ja.xml',
	'sitemap-ko.xml',
	'sitemap-zh.xml',
	'sitemap-hi.xml',
	'sitemap-id.xml',
	'sitemap-th.xml',
	'sitemap-vi.xml',
	'sitemap-uk.xml',
	'sitemap-cs.xml',
	'sitemap-ro.xml',
	'sitemap-sv.xml',
	'sitemap-images.xml',
];

async function fetchCheck(path) {
	const url = `${BASE.replace(/\/$/, '')}${path}`;
	const res = await fetch(url, {
		redirect: 'manual',
		headers: {
			Host: HOST,
			'X-Forwarded-Proto': 'https',
		},
	});
	const type = res.headers.get('content-type') || '';
	const text = res.status === 200 ? await res.text() : '';
	return { url, status: res.status, type, text, location: res.headers.get('location') };
}

let failed = 0;
const ok = (msg) => console.log(`✓ ${msg}`);
const fail = (msg) => {
	console.error(`✗ ${msg}`);
	failed += 1;
};

console.log(`Sitemap HTTP smoke test → ${BASE} (Host: ${HOST})\n`);

const index = await fetchCheck('/sitemap.xml');
if (index.status !== 200) fail(`sitemap.xml HTTP ${index.status}${index.location ? ` → ${index.location}` : ''}`);
else if (!index.type.includes('xml')) fail(`sitemap.xml wrong Content-Type: ${index.type}`);
else if (!index.text.includes('<sitemapindex')) fail('sitemap.xml is not a sitemap index');
else ok('sitemap.xml returns 200 application/xml');

for (const child of INDEX_CHILDREN) {
	const r = await fetchCheck(`/${child}`);
	if (r.status !== 200) {
		fail(`${child} HTTP ${r.status}`);
		continue;
	}
	if (!r.type.includes('xml')) {
		fail(`${child} wrong Content-Type: ${r.type}`);
		continue;
	}
	if (!r.text.includes('<urlset') && !r.text.includes('<sitemapindex')) {
		fail(`${child} body is not XML urlset`);
		continue;
	}
	ok(`${child} OK`);
}

const robots = await fetchCheck('/robots.txt');
if (robots.status !== 200) fail(`robots.txt HTTP ${robots.status}`);
else if (!robots.text.includes('Sitemap:')) fail('robots.txt missing Sitemap directive');
else ok('robots.txt OK');

if (failed) {
	console.error(`\n${failed} check(s) failed`);
	process.exit(1);
}
console.log('\nAll sitemap HTTP checks passed.');
