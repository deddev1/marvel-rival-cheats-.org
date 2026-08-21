#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Marvel Rivals source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['marvel-rivals-esp', 'marvel-rivals-esp'],
	['marvel-rivals-aimbot', 'marvel-rivals-aimbot'],
	["'neac'", "'neac'"],
	['neac-bypass', 'neac-bypass'],
	['undetected-marvel-rivals-cheats', 'undetected-marvel-rivals-cheats'],
	['marvel-rivals-wallhack', 'marvel-rivals-wallhack'],
	['marvel-rivals-radar-hack', 'marvel-rivals-radar-hack'],
	['marvel-rivals-cheats-2026', 'marvel-rivals-cheats-2026'],
	['marvel-rivals-cheats', 'marvel-rivals-cheats'],
	['the-marvel-rivals', 'marvel-rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['Marvel Rivals Cheats', 'Marvel Rivals Cheats'],
	['marvel rivals cheats', 'marvel rivals cheats'],
	['marvel rivals cheat', 'marvel rivals cheat'],
	['Marvel Rivals ESP', 'The Marvel Rivals ESP'],
	['Marvel Rivals Aimbot', 'The Marvel Rivals Aimbot'],
	['marvel rivals wallhack', 'Marvel Rivals wallhack'],
	['marvel rivals radar', 'Marvel Rivals radar'],
	['Marvel Rivals pushes', 'Marvel Rivals pushes'],
	['Marvel Rivals combat', 'Marvel Rivals combat'],
	['Marvel Rivals patches', 'Marvel Rivals patches'],
	['Marvel Rivals updates', 'Marvel Rivals updates'],
	['Marvel Rivals setup', 'Marvel Rivals setup'],
	['Marvel Rivals license', 'Marvel Rivals license'],
	['Marvel Rivals licenses', 'Marvel Rivals licenses'],
	['Marvel Rivals matches', 'Marvel Rivals matches'],
	['in Marvel Rivals', 'in Marvel Rivals'],
	['for Marvel Rivals', 'for Marvel Rivals'],
	['Marvel Rivals on', 'Marvel Rivals on'],
	['Marvel Rivals or', 'Marvel Rivals or'],
	['Marvel Rivals\'s', 'Marvel Rivals\'s'],
	['Marvel Rivals ', 'Marvel Rivals '],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['NetEase Anti-Cheat maintenance', 'NetEase Anti-Cheat maintenance'],
	['NetEase Anti-Cheat bypass', 'NetEase Anti-Cheat bypass'],
	['NetEase Anti-Cheat Bypass', 'NetEase Anti-Cheat Bypass'],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['neac', 'neac'],
	['support@marvelrivalscheats.org', 'support@marvelrivalscheats.org'],
	['Marvel Rivals maps, objectives, and team fight zones', 'Marvel Rivals maps, objectives, and team fight zones'],
	['Marvel Rivals maps, objectives and team fight zones', 'Marvel Rivals maps, objectives and team fight zones'],
	['exfil fights', 'exfil fights'],
	['exfil fight', 'exfil fight'],
	['run rounds', 'run rounds'],
	['objective', 'objective'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['exfil timer', 'exfil timer'],
	['PvP and team fight ranked matches', 'PvP and team fight ranked matches'],
	['PvP and team fight ranked matches', 'PvP and team fight ranked matches'],
	['PvP & team fight', 'PvP & team fight'],
	['high-value objectives', 'high-value objectives'],
	['high-value objectives', 'high-value objectives'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['Call of Duty combat pace', 'Marvel Rivals combat pace'],
	['COD', 'Marvel Rivals'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Marvel Rivals Cheats',
	game: 'Marvel Rivals',
	checkout: 'Zadeyo',
	eac: 'NetEase Anti-Cheat',
};`,
);
phrases = phrases.replace(/KW\.eac/g, 'KW.neac');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'Marvel Rivals maps, objectives, and team fight zones'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
