#!/usr/bin/env node
/**
 * Completes marvel-rivals-cheats SEO audit: add missing pages, fix leftovers, strip Zadeyo from meta.
 * Run: node scripts/complete-seo-audit.mjs
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NODE = 'C:\\Program Files\\nodejs\\node.exe';

const EXTRA_PAGES = [
	{ id: 'hacks', dir: 'marvel-rivals-cheats', pageId: 'hacks' },
	{ id: 'cheat-download', dir: 'marvel-rivals-cheat-download', pageId: 'cheat-download' },
	{ id: 'mod-menu', dir: 'marvel-rivals-mod-menu', pageId: 'mod-menu' },
	{ id: 'soft-aim', dir: 'marvel-rivals-soft-aim', pageId: 'soft-aim' },
	{ id: 'best-cheats', dir: 'best-marvel-rivals-cheats', pageId: 'best-cheats' },
	{ id: 'aimbot-hack', dir: 'marvel-rivals-aimbot-hack', pageId: 'aimbot-hack' },
	{ id: 'esp-hack', dir: 'marvel-rivals-esp-hack', pageId: 'esp-hack' },
	{ id: 'unlock-all', dir: 'marvel-rivals-unlock-all', pageId: 'unlock-all' },
];

const GLOBAL_REPLACEMENTS = [
	[/marvel-rivals-marvel-rivals/g, 'marvel-rivals'],
	[/neac-bypass-marvel-rivals/g, 'neac-bypass'],
	[/Marvel Rivals/g, 'Marvel Rivals'],
	[/Marvel Rivals/g, 'Marvel Rivals'],
	[/Call of Duty/g, 'Marvel Rivals'],
	[/Marvel Rivals Wallhack/g, 'Marvel Rivals Wallhack'],
	[/Marvel Rivals Radar Hack/g, 'Marvel Rivals Radar Hack'],
	[/Marvel Rivals Cheat Features/g, 'Marvel Rivals Cheat Features'],
	[/Marvel Rivals Cheat Pricing/g, 'Marvel Rivals Cheat Pricing'],
	[/Marvel Rivals Cheat Setup/g, 'Marvel Rivals Cheat Setup'],
	[/Marvel Rivals Cheat Status/g, 'Marvel Rivals Cheat Status'],
	[/Marvel Rivals Cheat Support/g, 'Marvel Rivals Cheat Support'],
	[/Marvel Rivals pack fight/g, 'Marvel Rivals pack fight'],
	[/Marvel Rivals pack builder/g, 'Marvel Rivals hero builder'],
	[/Marvel Rivals store header/g, 'Marvel Rivals header'],
	[/Marvel Rivals wasteland combat/g, 'Marvel Rivals battle royale combat'],
	[/Marvel Rivals hero builder/g, 'Marvel Rivals hero builder'],
	[/Marvel Rivals pricing/g, 'Marvel Rivals pricing'],
	[/Marvel Rivals NetEase Anti-Cheat/g, 'Marvel Rivals NetEase Anti-Cheat'],
	[/on Marvel Rivals/g, 'on Marvel Rivals'],
	[/for Marvel Rivals/g, 'for Marvel Rivals'],
	[/Marvel Rivals guides/g, 'Marvel Rivals guides'],
	[/Marvel Rivals guide/g, 'Marvel Rivals guide'],
	[/Marvel Rivals hileleri/g, 'Marvel Rivals hileleri'],
	[/Marvel Rivals hile/g, 'Marvel Rivals hile'],
	[/Marvel Rivals hileleri/g, 'Marvel Rivals hileleri'],
	[/cheatów Marvel Rivals/g, 'cheatów Marvel Rivals'],
	[/cheat Marvel Rivals/g, 'cheat Marvel Rivals'],
	[/cheats Marvel Rivals/g, 'cheats Marvel Rivals'],
	[/trucos Marvel Rivals/g, 'trucos Marvel Rivals'],
	[/triche Marvel Rivals/g, 'triche Marvel Rivals'],
	[/trucchi Marvel Rivals/g, 'trucchi Marvel Rivals'],
	[/Wallhack Marvel Rivals/g, 'Marvel Rivals Wallhack'],
	[/cheat Marvel Rivals undetected/g, 'cheat Marvel Rivals undetected'],
	[/cheats Marvel Rivals undetected/g, 'cheats Marvel Rivals undetected'],
	[/Verdansk beams/g, 'long-range AR beams'],
	[/ranked match room clears/g, 'close-quarters room clears'],
	[/Verdansk and Urzikstan/g, 'Verdansk and ranked match'],
	[/Verdansk, Urzikstan/g, 'Verdansk, ranked match'],
	[/session and ranked match/g, 'session and ranked match'],
	[/Activision's anti-cheat/g, "Epic Games' anti-cheat"],
	[/Activision anti-cheat/g, 'Epic Games anti-cheat'],
	[/Activision ships/g, 'Epic Games ships'],
	[/Activision security/g, 'Epic Games security'],
	[/Activision bans/g, 'Epic Games bans'],
	[/Activision/g, 'Epic Games'],
	[/eac/gi, 'neac'],
	[/NetEase Anti-Cheat/g, 'NetEase Anti-Cheat'],
	[/marvel-rivals-cheats/g, 'marvel-rivals-cheats'],
	[/the-marvel-rivals/g, 'marvel-rivals'],
	[/Undetected Wallhack for Call of Duty/g, 'Undetected Wallhack for Marvel Rivals'],
	[/How ESP wallhack, radar, and Aimbot rebuild after Call of Duty anti-cheat/g,
		'How ESP wallhack, radar, and Aimbot rebuild after Marvel Rivals anti-cheat'],
];

/** Remove Zadeyo from meta description/title strings only */
function stripZadeyoFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en Zadeyo\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout via Zadeyo\.?/gi, '.')
		.replace(/\s*with Zadeyo checkout\.?/gi, '.')
		.replace(/\s*via Zadeyo checkout\.?/gi, '.')
		.replace(/\s*Checkout via Zadeyo\.?/gi, '')
		.replace(/\s*Zadeyo checkout,?\s*/gi, ' ')
		.replace(/\s*Zadeyo delivery\.?/gi, 'instant digital delivery.')
		.replace(/\s*and Zadeyo delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant Zadeyo Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy on Zadeyo/g, 'Buy Marvel Rivals Cheats')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

async function walkFiles(dir, exts, files = []) {
	const entries = await import('node:fs/promises').then((fs) => fs.readdir(dir, { withFileTypes: true }));
	for (const e of entries) {
		if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
		const full = path.join(dir, e.name);
		if (e.isDirectory()) await walkFiles(full, exts, files);
		else if (exts.some((x) => e.name.endsWith(x))) files.push(full);
	}
	return files;
}

async function applyGlobalFixes() {
	const targets = await walkFiles(path.join(ROOT, 'src'), ['.ts', '.astro']);
	targets.push(
		path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'pages-i18n.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'ui-strings-part1.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'ui-strings-part2.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'phrases.mjs'),
		path.join(ROOT, 'scripts', 'i18n-data', 'gallery-ui.ts'),
		path.join(ROOT, 'src', 'data', 'i18n', 'gallery-ui.ts'),
		path.join(ROOT, 'functions', '_middleware.js'),
	);

	for (const file of targets) {
		try {
			await access(file);
		} catch {
			continue;
		}
		let content = await readFile(file, 'utf8');
		const original = content;
		for (const [pattern, replacement] of GLOBAL_REPLACEMENTS) {
			content = content.replace(pattern, replacement);
		}
		if (file.endsWith('pages-en.mjs')) {
			// Strip Zadeyo from description: and title: lines
			content = content.replace(/(description:\s*['"])([^'"]+)(['"])/g, (_, pre, body, post) =>
				pre + stripZadeyoFromMeta(body) + post,
			);
			content = content.replace(/(title:\s*['"])([^'"]+)(['"])/g, (_, pre, body, post) =>
				pre + stripZadeyoFromMeta(body) + post,
			);
		}
		if (content !== original) {
			await writeFile(file, content, 'utf8');
			console.log(`Fixed: ${path.relative(ROOT, file)}`);
		}
	}
}

async function createExtraPages() {
	const template = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="PAGE_ID" />
`;
	for (const page of EXTRA_PAGES) {
		const dir = path.join(ROOT, 'src', 'pages', page.dir);
		await mkdir(dir, { recursive: true });
		const file = path.join(dir, 'index.astro');
		try {
			await access(file);
		} catch {
			await writeFile(file, template.replace('PAGE_ID', page.pageId), 'utf8');
			console.log(`Created page: src/pages/${page.dir}/index.astro`);
		}
	}
}

async function fixLocalesBlogUi() {
	const file = path.join(ROOT, 'src', 'data', 'i18n', 'locales.ts');
	let content = await readFile(file, 'utf8');
	content = content.replace(/Marvel Rivals guides/g, 'Marvel Rivals guides');
	content = content.replace(/Marvel Rivals guide/g, 'Marvel Rivals guide');
	content = content.replace(/Marvel Rivals hileleri/g, 'Marvel Rivals hileleri');
	content = content.replace(/Marvel Rivals hile/g, 'Marvel Rivals hile');
	content = content.replace(/cheat Marvel Rivals/g, 'cheat Marvel Rivals');
	content = content.replace(/cheats Marvel Rivals/g, 'cheats Marvel Rivals');
	content = content.replace(/trucos Marvel Rivals/g, 'trucos Marvel Rivals');
	content = content.replace(/triche Marvel Rivals/g, 'triche Marvel Rivals');
	content = content.replace(/trucchi Marvel Rivals/g, 'trucchi Marvel Rivals');
	content = content.replace(/cheatów Marvel Rivals/g, 'cheatów Marvel Rivals');
	content = content.replace(/читов Marvel Rivals/g, 'читов Marvel Rivals');
	content = content.replace(/читів Marvel Rivals/g, 'читів Marvel Rivals');
	content = content.replace(/Marvel Rivalsチート/g, 'Marvel Rivalsチート');
	content = content.replace(/Marvel Rivals 치트/g, 'Marvel Rivals 치트');
	content = content.replace(/Marvel Rivals作弊/g, 'Marvel Rivals作弊');
	content = content.replace(/Marvel Rivals rehberleri/g, 'Marvel Rivals rehberleri');
	content = content.replace(/Marvel Rivals gidsen/g, 'Marvel Rivals gidsen');
	content = content.replace(/Marvel Rivals průvodce/g, 'Marvel Rivals průvodce');
	content = content.replace(/Marvel Rivals guider/g, 'Marvel Rivals guider');
	content = content.replace(/Marvel Rivals related/g, 'Marvel Rivals related');
	content = content.replace(/Marvel Rivals ガイド/g, 'Marvel Rivals ガイド');
	content = content.replace(/Marvel Rivals 가이드/g, 'Marvel Rivals 가이드');
	content = content.replace(/Marvel Rivals指南/g, 'Marvel Rivals指南');
	content = content.replace(/Marvel Rivals गाइड/g, 'Marvel Rivals गाइड');
	content = content.replace(/Marvel Rivals panduan/g, 'Marvel Rivals panduan');
	content = content.replace(/Marvel Rivals คู่มือ/g, 'Marvel Rivals คู่มือ');
	content = content.replace(/Marvel Rivals hướng dẫn/g, 'Marvel Rivals hướng dẫn');
	await writeFile(file, content, 'utf8');
	console.log('Fixed locales.ts blogUi');
}

console.log('=== Marvel Rivals Cheats SEO completion ===\n');
await applyGlobalFixes();
await createExtraPages();
await fixLocalesBlogUi();
console.log('\nDone. Next: update routing.ts manually, then match generate:i18n, fetch:images, build:validate');
