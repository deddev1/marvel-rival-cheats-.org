#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clea Marvel Rivals source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['marvel-rivals-esp', 'marvel-rivals-esp'],
	['marvel-rivals-aimbot', 'marvel-rivals-aimbot'],
	['neac', 'neac'],
	['undetected-marvel-rivals-cheats', 'undetected-marvel-rivals-cheats'],
	['marvel-rivals-wallhack', 'marvel-rivals-wallhack'],
	['marvel-rivals-radar-hack', 'marvel-rivals-radar-hack'],
	['marvel-rivals-cheats-2026', 'marvel-rivals-cheats-2026'],
	['neac-bypass', 'neac-bypass'],
	['marvelrivals.org', 'marvelrivals.org'],
	['trucos-marvel-rivals', 'trucos-marvel-rivals'],
	['triche-marvel-rivals', 'triche-marvel-rivals'],
	['marvel-rivals-cheats', 'marvel-rivals-cheats'],
	['cheats-marvel-rivals', 'cheats-marvel-rivals'],
	['trucchi-marvel-rivals', 'trucchi-marvel-rivals'],
	['cheaty-marvel-rivals', 'cheaty-marvel-rivals'],
	['chity-marvel-rivals', 'chity-marvel-rivals'],
	['chitov-marvel-rivals', 'chitov-marvel-rivals'],
	['chitiv-marvel-rivals', 'chitiv-marvel-rivals'],
	['cheatow-marvel-rivals', 'cheatow-marvel-rivals'],
	['hile-marvel-rivals', 'hile-marvel-rivals'],
	['marvel-rivals-hile', 'marvel-rivals-hile'],
	['marvel-rivals-esp-chity', 'marvel-rivals-esp-chity'],
	['marvel-rivals-aimbot-chity', 'marvel-rivals-aimbot-chity'],
	['unentdeckte-marvel-rivals-cheats', 'unentdeckte-marvel-rivals-cheats'],
	['cheats-marvel-rivals-indetectaveis', 'cheats-marvel-rivals-indetectaveis'],
	['trucchi-marvel-rivals-indetectabili', 'trucchi-marvel-rivals-indetectabili'],
	['niewykrywalne-cheats-marvel-rivals', 'niewykrywalne-cheats-marvel-rivals'],
	['nedecektiruemye-chity-marvel-rivals', 'nedecektiruemye-chity-marvel-rivals'],
	['tespit-edilemeyen-marvel-rivals-hileleri', 'tespit-edilemeyen-marvel-rivals-hileleri'],
	['nedecektovani-chity-marvel-rivals', 'nedecektovani-chity-marvel-rivals'],
	['cheats-marvel-rivals-nedetectabile', 'cheats-marvel-rivals-nedetectabile'],
	['basta-marvel-rivals-cheats', 'basta-marvel-rivals-cheats'],
	['neac-bypass-trucos-marvel-rivals', 'neac-bypass-trucos-marvel-rivals'],
	['neac-bypass-triche-marvel-rivals', 'neac-bypass-triche-marvel-rivals'],
	['neac-bypass-cheats-marvel-rivals', 'neac-bypass-cheats-marvel-rivals'],
	['neac-bypass-chity-marvel-rivals', 'neac-bypass-chity-marvel-rivals'],
	['neac-bypass-marvel-rivals', 'neac-bypass'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix eac key in englishPaths
	content = content.replace(/\teac: '/, "\t'neac': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Hero image per page topic — keyword-rich marvel-rivals-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/the-marvel-rivals-cheats-hero.webp',
	'marvel-rivals-esp': '/images/the-marvel-rivals-cheats-esp-wallhack.webp',
	'marvel-rivals-aimbot': '/images/the-marvel-rivals-cheats-aimbot-combat.webp',
	features: '/images/marvel-rivals-cheats-package.webp',
	pricing: '/images/marvel-rivals-cheats-cover.webp',
	setup: '/images/marvel-rivals-loadout-builder.webp',
	updates: '/images/marvel-rivals-header-art.webp',
	faq: '/images/marvel-rivals-pack-fight.webp',
	support: '/images/marvel-rivals-cheats-package.webp',
	undetected: '/images/marvel-rivals-survival-game-combat.webp',
	wallhack: '/images/the-marvel-rivals-cheats-esp-wallhack.webp',
	radar: '/images/marvel-rivals-player-esp.webp',
	'neac': '/images/marvel-rivals-reboot-van-fight.webp',
	'cheats-2026': '/images/the-marvel-rivals-cheats-hero.webp',
	privacy: '/images/the-marvel-rivals-cheats-aimbot-combat.webp',
	refund: '/images/marvel-rivals-cheats-cover.webp',
	terms: '/images/marvel-rivals-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'marvel-rivals-esp', 'marvel-rivals-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'neac',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Hero image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'marvel-rivals-esp' | 'marvel-rivals-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'neac' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'dinoEsp');
	content = content.replace(/objectiveFight/g, 'ambushFight');
	content = content.replace(/alMazrah/g, 'survivalIsland');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
