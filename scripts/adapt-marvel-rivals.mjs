#!/usr/bin/env node
/**
 * One-time migration: Marathon Cheats → Marvel Rivals Cheats.
 * Domain: marvelrivals.org
 * Run from project root: node scripts/adapt-marvel-rivals.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['marathon-aimbot', 'marvel-rivals-aimbot'],
	['marathon-esp', 'marvel-rivals-esp'],
	['marathon-wallhack', 'marvel-rivals-wallhack'],
	['marathon-radar-hack', 'marvel-rivals-radar-hack'],
	['undetected-marathon-cheats', 'undetected-marvel-rivals-cheats'],
	['marathon-cheats-2026', 'marvel-rivals-cheats-2026'],
	['battleye-bypass', 'neac-bypass'],
	['marathon-cheat-download', 'marvel-rivals-cheat-download'],
	['marathon-mod-menu', 'marvel-rivals-mod-menu'],
	['marathon-soft-aim', 'marvel-rivals-soft-aim'],
	['best-marathon-cheats', 'best-marvel-rivals-cheats'],
	['marathon-aimbot-hack', 'marvel-rivals-aimbot-hack'],
	['marathon-esp-hack', 'marvel-rivals-esp-hack'],
	['marathon-unlock-all', 'marvel-rivals-unlock-all'],
	['marathon-cheats', 'marvel-rivals-cheats'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	// Domains & URLs
	['https://www.marathoncheats.org', 'https://www.marvelrivals.org'],
	['https://marathoncheats.org', 'https://marvelrivals.org'],
	['www.marathoncheats.org', 'www.marvelrivals.org'],
	['marathoncheats.org', 'marvelrivals.org'],
	['support@marathoncheats.org', 'support@marvelrivals.org'],
	['marathoncheat.org', 'marvelrivals.org'],
	['www.marathoncheat.org', 'www.marvelrivals.org'],
	['bestmarathoncheats.com', 'marvelrivals.org'],
	['www.bestmarathoncheats.com', 'www.marvelrivals.org'],
	['marathon-cheats-org', 'marvel-rivals-cheats-org'],
	['marathon-cheats-.org', 'marvel-rivals-cheats-org'],

	// External game URLs
	['https://store.steampowered.com/app/3065800/Marathon/', 'https://store.steampowered.com/app/2767030/Marvel_Rivals/'],
	['https://store.steampowered.com/app/3065800/news/', 'https://store.steampowered.com/app/2767030/news/'],
	['store.steampowered.com/app/3065800/Marathon', 'store.steampowered.com/app/2767030/Marvel_Rivals'],
	['steamcommunity.com/app/3065800', 'steamcommunity.com/app/2767030'],
	['https://www.bungie.net/7/en/Marathon', 'https://www.marvelrivals.com/'],
	['https://marathondb.gg/', 'https://marvelrivals.fandom.com/wiki/Marvel_Rivals_Wiki'],
	['marathondb.gg', 'marvelrivals.fandom.com'],
	['https://www.battleye.com/', 'https://help.marvelrivals.com/'],
	['www.battleye.com', 'help.marvelrivals.com'],
	['/products/marathon', '/products/marvel-rivals'],
	['project-name=marathoncheats', 'project-name=marvelrivals'],
	['name = "marathoncheats"', 'name = "marvelrivals"'],
	['"name": "marathon-cheats"', '"name": "marvel-rivals-cheats"'],

	// Image paths
	['marathon-esp-player-tags', 'marvel-rivals-esp-player-tags'],
	['marathon-wallhack-skeleton', 'marvel-rivals-wallhack-skeleton'],
	['marathon-aimbot-skeleton', 'marvel-rivals-aimbot-skeleton'],
	['marathon-aimbot-sniper', 'marvel-rivals-aimbot-sniper'],
	['marathon-esp-radar', 'marvel-rivals-esp-radar'],
	['marathon-cheats-combat', 'marvel-rivals-cheats-combat'],
	['marathon-cheats-wallhack', 'marvel-rivals-cheats-wallhack'],
	['marathon-cheats-aimbot-view', 'marvel-rivals-cheats-aimbot-view'],
	['marathon-cheats-aimbot', 'marvel-rivals-cheats-aimbot'],
	['marathon-cheats-radar', 'marvel-rivals-cheats-radar'],
	['marathon-cheats-hero', 'marvel-rivals-cheats-hero'],
	['marathon-cheats-logo', 'marvel-rivals-cheats-logo'],
	['marathon-cheats-run', 'marvel-rivals-cheats-match'],
	['marathon-cheats-esp', 'marvel-rivals-cheats-esp'],
	['marathon-hero-banner', 'marvel-rivals-hero-banner'],
	['marathon-hero-ghost', 'marvel-rivals-hero-ghost'],
	['marathon-hero-source', 'marvel-rivals-hero-source'],
	['marathon-preview-video-poster', 'marvel-rivals-preview-video-poster'],
	['marathon-screenshot', 'marvel-rivals-screenshot'],

	// Page slugs (longest first)
	['undetected-marathon-cheats', 'undetected-marvel-rivals-cheats'],
	['best-marathon-cheats', 'best-marvel-rivals-cheats'],
	['marathon-cheat-download', 'marvel-rivals-cheat-download'],
	['marathon-cheats-2026', 'marvel-rivals-cheats-2026'],
	['marathon-radar-hack', 'marvel-rivals-radar-hack'],
	['marathon-aimbot-hack', 'marvel-rivals-aimbot-hack'],
	['marathon-esp-hack', 'marvel-rivals-esp-hack'],
	['marathon-unlock-all', 'marvel-rivals-unlock-all'],
	['marathon-soft-aim', 'marvel-rivals-soft-aim'],
	['marathon-mod-menu', 'marvel-rivals-mod-menu'],
	['marathon-wallhack', 'marvel-rivals-wallhack'],
	['marathon-aimbot', 'marvel-rivals-aimbot'],
	['marathon-esp', 'marvel-rivals-esp'],
	['marathon-cheats', 'marvel-rivals-cheats'],
	['battleye-bypass', 'neac-bypass'],
	['/marathon-cheats/', '/marvel-rivals-cheats/'],

	// Page IDs & keys
	["pageId: 'battleye'", "pageId: 'neac'"],
	['pageId="battleye"', 'pageId="neac"'],
	["'battleye'", "'neac'"],
	['"battleye"', '"neac"'],
	['| battleye', '| neac'],
	['KW.battleye', 'KW.neac'],
	['EXT.battleye', 'EXT.neac'],

	// Script / module renames
	['marathonImages', 'marvelRivalsImages'],
	["from './marathon'", "from './marvel-rivals'"],
	["from '../data/marathon'", "from '../data/marvel-rivals'"],
	["from '../../data/marathon'", "from '../../data/marvel-rivals'"],
	['fetch-marathon-images', 'fetch-marvel-rivals-images'],
	['fetch-marathon-hero', 'fetch-marvel-rivals-hero'],
	['import-marathon-screenshots', 'import-marvel-rivals-screenshots'],
	['import-marathon-user-images', 'import-marvel-rivals-user-images'],
	['marathon-cheat-overlays', 'marvel-rivals-cheat-overlays'],
	['fix-marathon-copy', 'fix-marvel-rivals-copy'],
	['fix-marathon-content', 'fix-marvel-rivals-content'],
	['adapt-marathon', 'adapt-marvel-rivals'],
	['fix-bsg-copy', 'fix-netease-copy'],

	// Blog slugs
	['marathon-patch-notes-guide', 'marvel-rivals-patch-notes-guide'],
	['marathon-skin-leaks-guide', 'marvel-rivals-skin-leaks-guide'],
	['marathon-loadout-tier-list', 'marvel-rivals-hero-tier-list'],
	['marathon-extraction-run-strategies', 'marvel-rivals-ranked-strategies'],
	['marathon-competitive-meta-guide', 'marvel-rivals-competitive-meta-guide'],
	['marathon-loot-routes-guide', 'marvel-rivals-map-callouts-guide'],
	['marathon-pro-settings-guide', 'marvel-rivals-pro-settings-guide'],
	['marathon-warmup-maps-ranked', 'marvel-rivals-warmup-practice-ranked'],
	['marathon-cheats-complete-guide-2026', 'marvel-rivals-cheats-complete-guide-2026'],
	['marathon-cheats-buyers-guide', 'marvel-rivals-cheats-buyers-guide'],
	['marathon-cheats-2026-whats-new', 'marvel-rivals-cheats-2026-whats-new'],
	['marathon-aimbot-settings-guide', 'marvel-rivals-aimbot-settings-guide'],
	['marathon-esp-wallhack-explained', 'marvel-rivals-esp-wallhack-explained'],
	['undetected-marathon-cheats-battleye', 'undetected-marvel-rivals-cheats-neac'],
	['marathon-cheats-vs-cheatvault-comparison', 'marvel-rivals-cheats-vs-cheatvault-comparison'],
	['elitefn-vs-marathon-cheats-two-week-test', 'elitefn-vs-marvel-rivals-cheats-two-week-test'],
	['marathon-cheats-vs-ghostware-features-pricing', 'marvel-rivals-cheats-vs-ghostware-features-pricing'],
	['what-are-marathon-cheats', 'what-are-marvel-rivals-cheats'],
	['are-marathon-cheats-undetected-in-2026', 'are-marvel-rivals-cheats-undetected-in-2026'],
	['what-is-a-marathon-wallhack', 'what-is-a-marvel-rivals-wallhack'],
	['does-marathon-cheats-include-radar-hack', 'does-marvel-rivals-cheats-include-radar-hack'],
	['battleye-anti-cheat-and-marathon-cheats', 'neac-anti-cheat-and-marvel-rivals-cheats'],
	['buy-undetected-marathon-cheats-windows-pc', 'buy-undetected-marvel-rivals-cheats-windows-pc'],

	// Review slugs
	['marathon-soft-aim-review', 'marvel-rivals-soft-aim-review'],
	['marathon-esp-loot-run-review', 'marvel-rivals-esp-ranked-review'],
	['marathon-cloud-dma-review', 'marvel-rivals-cloud-dma-review'],
	['marathon-cheat-setup-review', 'marvel-rivals-cheat-setup-review'],
	['marathon-loot-esp-review', 'marvel-rivals-hero-esp-review'],
	['marathon-soft-aim-run-review', 'marvel-rivals-soft-aim-match-review'],
	['marathon-radar-hack-review', 'marvel-rivals-radar-hack-review'],
	['marathon-battleye-update-review', 'marvel-rivals-neac-update-review'],
	['marathon-sniper-soft-aim-review', 'marvel-rivals-sniper-soft-aim-review'],

	// i18n slug prefixes (localized)
	['trucos-marathon', 'trucos-marvel-rivals'],
	['triche-marathon', 'triche-marvel-rivals'],
	['cheats-marathon', 'cheats-marvel-rivals'],
	['trucchi-marathon', 'trucchi-marvel-rivals'],
	['cheaty-marathon', 'cheaty-marvel-rivals'],
	['chity-marathon', 'chity-marvel-rivals'],
	['chitov-marathon', 'chitov-marvel-rivals'],
	['chitiv-marathon', 'chitiv-marvel-rivals'],
	['cheatow-marathon', 'cheatow-marvel-rivals'],
	['hile-marathon', 'hile-marvel-rivals'],
	['marathon-hile', 'marvel-rivals-hile'],
	['marathon-esp-chity', 'marvel-rivals-esp-chity'],
	['marathon-aimbot-chity', 'marvel-rivals-aimbot-chity'],
	['unentdeckte-marathon-cheats', 'unentdeckte-marvel-rivals-cheats'],
	['cheats-marathon-indetectaveis', 'cheats-marvel-rivals-indetectaveis'],
	['trucchi-marathon-indetectabili', 'trucchi-marvel-rivals-indetectabili'],
	['niewykrywalne-cheats-marathon', 'niewykrywalne-cheats-marvel-rivals'],
	['nedecektiruemye-chity-marathon', 'nedecektiruemye-chity-marvel-rivals'],
	['tespit-edilemeyen-marathon-hileleri', 'tespit-edilemeyen-marvel-rivals-hileleri'],
	['nedecektovani-chity-marathon', 'nedecektovani-chity-marvel-rivals'],
	['cheats-marathon-nedetectabile', 'cheats-marvel-rivals-nedetectabile'],
	['basta-marathon-cheats', 'basta-marvel-rivals-cheats'],
	['marathon-cheats-funktionen', 'marvel-rivals-cheats-funktionen'],
	['marathon-cheats-functies', 'marvel-rivals-cheats-functies'],
	['caracteristicas-trucos-marathon', 'caracteristicas-trucos-marvel-rivals'],
	['fonctionnalites-triche-marathon', 'fonctionnalites-triche-marvel-rivals'],
	['recursos-cheats-marathon', 'recursos-cheats-marvel-rivals'],

	// Game mechanics → Marvel Rivals hero shooter
	['Tau Ceti IV, outposts, and extraction zones', 'Marvel Rivals maps, objectives, and team fight zones'],
	['Tau Ceti IV, outposts and extraction zones', 'Marvel Rivals maps, objectives and team fight zones'],
	['Tau Ceti IV maps', 'Marvel Rivals maps'],
	['Tau Ceti IV', 'Marvel Rivals maps'],
	['extraction shooter', 'hero shooter'],
	['Extraction Runs', 'Ranked Matches'],
	['extraction runs', 'ranked matches'],
	['extraction run', 'ranked match'],
	['Extraction run', 'Ranked match'],
	['extraction-run', 'ranked-match'],
	['extraction tips', 'hero meta tips'],
	['extraction aggression', 'team fight aggression'],
	['extraction strategies', 'ranked strategies'],
	['exfil zones', 'objective zones'],
	['exfil zone', 'objective zone'],
	['Exfil zones', 'Objective zones'],
	['exfil markers', 'objective markers'],
	['exfil cues', 'objective callouts'],
	['exfil awareness', 'map awareness'],
	['exfil campers', 'objective campers'],
	['exfil camping', 'objective camping'],
	['exfil hold patterns', 'objective hold patterns'],
	['exfil plans', 'team plans'],
	['exfil plan', 'team plan'],
	['exfil route', 'map rotation'],
	['exfil timing', 'objective timing'],
	['holding an exfil', 'holding an objective'],
	['who holds exfil', 'who holds objective'],
	['exfil callouts', 'map callouts'],
	['exfil safety', 'position safety'],
	['and extract before', 'and secure the objective before'],
	['exfil and loot zones', 'objective and health pack zones'],
	['exfil camping patterns', 'objective hold patterns'],
	['loot routes', 'map callouts'],
	['loot route', 'map callout'],
	['loot runs', 'ranked matches'],
	['loot run', 'ranked match'],
	['Loot ESP', 'Hero ESP'],
	['loot ESP', 'hero ESP'],
	['loot markers', 'objective markers'],
	['loot tools', 'hero tools'],
	['loot spawn rules', 'spawn rules'],
	['loot economy', 'hero meta economy'],
	['loot drops', 'ability cooldowns'],
	['loot drops pools', 'ability cooldown pools'],
	['high-value loot', 'high-value objectives'],
	['loot worth the detour', 'objectives worth the detour'],
	['loot panic', 'ult panic'],
	['rival runners and UESC patrols', 'enemy heroes and AI'],
	['runners and enemy forces', 'heroes and enemy team'],
	['runners and UESC forces', 'heroes and enemy team'],
	['Runner and UESC ESP', 'Hero and enemy ESP'],
	['Runner and UESC ESP / wallhack', 'Hero and enemy ESP / wallhack'],
	['Container and loot highlights', 'Health pack and objective highlights'],
	['PvP and PvE extraction runs', 'PvP team fights and objective modes'],
	['PvP and PvE extraction run', 'PvP team fight and objective mode'],
	['PvP & PvE', 'PvP & team fight'],
	['PvP and PvE', 'PvP and team fight'],

	// Anti-cheat
	['BattlEye maintenance', 'NetEase Anti-Cheat maintenance'],
	['BattlEye bypass', 'NetEase Anti-Cheat bypass'],
	['BattlEye Bypass', 'NetEase Anti-Cheat Bypass'],
	['BattlEye patches', 'NetEase Anti-Cheat patches'],
	['BattlEye patch', 'NetEase Anti-Cheat patch'],
	['BattlEye updates', 'NetEase Anti-Cheat updates'],
	['BattlEye update', 'NetEase Anti-Cheat update'],
	['after BattlEye', 'after NetEase Anti-Cheat'],
	['BattlEye rebuilds', 'NetEase Anti-Cheat rebuilds'],
	['BattlEye security', 'NetEase Anti-Cheat security'],
	['BattlEye guide', 'NetEase Anti-Cheat guide'],
	['undetected BattlEye notes', 'undetected NetEase Anti-Cheat notes'],
	['battleye patch', 'neac patch'],
	['battleye 2026', 'neac 2026'],
	['battleye marathon', 'neac marvel rivals'],
	['battleye updates', 'neac updates'],
	['BattlEye', 'NetEase Anti-Cheat'],

	// Developer / brand
	['Bungie server status', 'NetEase server status'],
	['Bungie terms', 'NetEase terms'],
	['Bungie patch', 'Marvel Rivals patch'],
	['Marathon community event', 'Marvel Rivals community event'],
	['The Isle team', 'NetEase Games'],
	['Bungie', 'NetEase Games'],
	['MarathonCheatsSite', 'MarvelRivalsCheatsSite'],
	['Marathon Intel', 'Marvel Rivals Intel'],
	['Marathon Cheats', 'Marvel Rivals Cheats'],
	['marathon cheats', 'marvel rivals cheats'],
	['Marathon cheats', 'Marvel Rivals cheats'],
	['marathon cheat', 'marvel rivals cheat'],
	['Marathon cheat', 'Marvel Rivals cheat'],
	['Marathon hack', 'Marvel Rivals cheat'],
	['marathon hack', 'marvel rivals cheat'],
	['Marathon ESP', 'Marvel Rivals ESP'],
	['Marathon Aimbot', 'Marvel Rivals Aimbot'],
	['marathon esp', 'marvel rivals esp'],
	['marathon aimbot', 'marvel rivals aimbot'],
	['marathon wallhack', 'marvel rivals wallhack'],
	['marathon radar', 'marvel rivals radar'],
	['undetected marathon cheats', 'undetected marvel rivals cheats'],
	['best marathon cheats', 'best marvel rivals cheats'],
	['Buy Marathon Cheats', 'Buy Marvel Rivals Cheats'],
	['EXT.marathon', 'EXT.marvelRivals'],
	['Marathon on Steam', 'Marvel Rivals on Steam'],
	['Marathon on Steam', 'Marvel Rivals on Steam'],

	// Session/run terminology
	['drop in faster', 'queue in faster'],
	['before you drop in', 'before you queue in'],
	['you drop in', 'you queue in'],
	['drop in', 'queue in'],
	[' a run', ' a match'],
	[' runs', ' matches'],
	[' run', ' match'],
	['session rounds', 'match rounds'],
	['session grinders', 'ranked grinders'],
	['before a run', 'before a match'],
	['survival run', 'ranked match'],
	['survival runs', 'ranked matches'],
	['survival flow', 'match flow'],
	['survival rate', 'win rate'],
	['survival sessions', 'ranked matches'],
	['survival session', 'ranked match'],
	['survival tips', 'hero meta tips'],
	['survival queues', 'ranked queues'],
	['survival queue', 'ranked queue'],
	['Survival Session', 'Ranked Match'],
	['Survival Sessions', 'Ranked Matches'],
	['survival run', 'ranked match'],
	['survival runs', 'ranked matches'],
	['this wipe cycle', 'this patch cycle'],
	['wipe cycle', 'patch cycle'],

	// Loadout / weapon terms (keep generic shooter terms)
	['loadout tier list', 'hero tier list'],
	['loadout tiers', 'hero tiers'],
	['loadout tier', 'hero tier'],
	['loadout build', 'hero build'],
	['loadout choice', 'hero choice'],
	['main loadout', 'main hero'],
	['loadout unlocks', 'hero unlocks'],
	['contested loadouts', 'contested hero picks'],
	['Per-weapon profiles', 'Per-hero profiles'],
	['per-weapon profiles', 'per-hero profiles'],
	['weapon profiles', 'hero profiles'],
	['weapon stats', 'hero stats'],
	['meta loadouts', 'meta heroes'],
	['best marathon loadouts', 'best Marvel Rivals heroes'],
	['marathon meta loadouts', 'Marvel Rivals meta heroes'],
	['marathon loadout tier list', 'Marvel Rivals hero tier list'],
	['Marathon Loadout Tier List', 'Marvel Rivals Hero Tier List'],
	['Marathon loadout tier list', 'Marvel Rivals hero tier list'],

	// Map/location terms
	['in outpost zones', 'on urban maps'],
	['outpost zones', 'urban maps'],
	['Gateway', 'Midtown'],
	['in contested zones', 'in contested lanes'],
	['high-traffic zones', 'high-traffic lanes'],
	['pack pushs', 'team pushes'],
	['pack push', 'team push'],
	['pushs', 'pushes'],

	// Social handles
	['xKrypt0_Marathon', 'xKrypt0_MarvelRivals'],
	['vanLifeMarathon', 'vanLifeMarvelRivals'],

	// Cookie / misc leftovers
	['fc_locale', 'mr_locale'],
	['Buy Marathon Cheats', 'Buy Marvel Rivals Cheats'],

	// Final game name (careful order — after compound replacements)
	['Marathon Wiki', 'Marvel Rivals Wiki'],
	['Marathon wiki', 'Marvel Rivals wiki'],
	['Official Marathon website', 'Official Marvel Rivals website'],
	['Marathon on Steam', 'Marvel Rivals on Steam'],
	['Marathon patch notes', 'Marvel Rivals patch notes'],
	['Marathon patch', 'Marvel Rivals patch'],
	['Marathon cosmetics', 'Marvel Rivals cosmetics'],
	['Marathon skins', 'Marvel Rivals skins'],
	['Marathon character', 'Marvel Rivals hero'],
	['Marathon gameplay', 'Marvel Rivals gameplay'],
	['Marathon extraction', 'Marvel Rivals ranked'],
	['Marathon competitive', 'Marvel Rivals competitive'],
	['Marathon pro settings', 'Marvel Rivals pro settings'],
	['Marathon warmup', 'Marvel Rivals warmup'],
	['Marathon buyers', 'Marvel Rivals buyers'],
	['Marathon buyers guide', 'Marvel Rivals buyers guide'],
	['Marathon complete guide', 'Marvel Rivals complete guide'],
	['Marathon aimbot settings', 'Marvel Rivals aimbot settings'],
	['Marathon ESP wallhack', 'Marvel Rivals ESP wallhack'],
	['Marathon status page', 'Marvel Rivals status page'],
	['Marathon status', 'Marvel Rivals status'],
	['Marathon Intel', 'Marvel Rivals Intel'],
	['Marathon Dinosaur', 'Marvel Rivals Hero'],
	['Marathon Growth', 'Marvel Rivals Ranked'],
	['Marathon Extraction', 'Marvel Rivals Ranked'],
	['play Marathon', 'play Marvel Rivals'],
	['for Marathon', 'for Marvel Rivals'],
	['in Marathon', 'in Marvel Rivals'],
	['Marathon —', 'Marvel Rivals —'],
	['Marathon.', 'Marvel Rivals.'],
	['Marathon,', 'Marvel Rivals,'],
	['Marathon ', 'Marvel Rivals '],
	['>Marathon<', '>Marvel Rivals<'],
	['"Marathon"', '"Marvel Rivals"'],
	["'Marathon'", "'Marvel Rivals'"],
	['marathon intel', 'marvel rivals intel'],
	['marathon major update', 'marvel rivals major update'],
	['marathon meta', 'marvel rivals meta'],
	['marathon hacks', 'marvel rivals hacks'],
	['marathon hile', 'marvel rivals hile'],
	['marathon hileleri', 'marvel rivals hileleri'],
	['marathon undetected', 'marvel rivals undetected'],
	['marathon hile', 'marvel rivals hile'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-tarkov.mjs',
	'adapt-theisle.mjs',
	'adapt-marathon.mjs',
	'adapt-marvel-rivals.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameDataTs() {
	const from = path.join(ROOT, 'src', 'data', 'marathon.ts');
	const to = path.join(ROOT, 'src', 'data', 'marvel-rivals.ts');
	try {
		await rename(from, to);
		console.log('Renamed marathon.ts → marvel-rivals.ts');
	} catch (e) {
		console.warn(`marathon.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-marathon-images.mjs', 'fetch-marvel-rivals-images.mjs'],
		['fetch-marathon-hero.mjs', 'fetch-marvel-rivals-hero.mjs'],
		['import-marathon-screenshots.mjs', 'import-marvel-rivals-screenshots.mjs'],
		['import-marathon-user-images.mjs', 'import-marvel-rivals-user-images.mjs'],
		['marathon-cheat-overlays.mjs', 'marvel-rivals-cheat-overlays.mjs'],
		['fix-marathon-copy.mjs', 'fix-marvel-rivals-copy.mjs'],
		['fix-marathon-content.mjs', 'fix-marvel-rivals-content.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'marvel-rivals-aimbot': 'marvel-rivals-aimbot',
		'marvel-rivals-esp': 'marvel-rivals-esp',
		'marvel-rivals-wallhack': 'wallhack',
		'marvel-rivals-radar-hack': 'radar',
		'undetected-marvel-rivals-cheats': 'undetected',
		'marvel-rivals-cheats-2026': 'cheats-2026',
		'neac-bypass': 'neac',
		'marvel-rivals-cheat-download': 'cheat-download',
		'marvel-rivals-mod-menu': 'mod-menu',
		'marvel-rivals-soft-aim': 'soft-aim',
		'best-marvel-rivals-cheats': 'best-cheats',
		'marvel-rivals-aimbot-hack': 'aimbot-hack',
		'marvel-rivals-esp-hack': 'esp-hack',
		'marvel-rivals-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function createMarvelRivalsCheatsPage() {
	const dir = path.join(ROOT, 'src', 'pages', 'marvel-rivals-cheats');
	const file = path.join(dir, 'index.astro');
	try {
		await writeFile(
			file,
			`---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="hacks" />
`,
			'utf8',
		);
		console.log('Created marvel-rivals-cheats page');
	} catch (e) {
		console.warn(`marvel-rivals-cheats page: ${e.message}`);
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('marathon')) continue;
		const newName = file
			.replace(/marathon-cheats/g, 'marvel-rivals-cheats')
			.replace(/marathon/g, 'marvel-rivals');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Marathon Cheats → Marvel Rivals Cheats (marvelrivals.org)...\n');
	await renamePageDirs();
	await renameDataTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await createMarvelRivalsCheatsPage();
	await renameImages();
	console.log('\nDone. Next: sync:brand, generate:i18n, generate blog, build.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
