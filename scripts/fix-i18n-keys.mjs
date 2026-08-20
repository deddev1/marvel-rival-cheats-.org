#!/usr/bin/env node
/** Fix remaining i18n key mismatches and ui-strings. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const UI_REPLACEMENTS = [
	['Marvel Rivals Cheats', 'Marvel Rivals Cheats'],
	['marvel rivals cheats', 'marvel rivals cheats'],
	['Marvel Rivals Cheats', 'Marvel Rivals Cheats'],
	['Marvel Rivals', 'Marvel Rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['Call of Duty', 'Marvel Rivals'],
	['Marvel Rivals PC', 'Marvel Rivals PC'],
	['for Marvel Rivals', 'for Marvel Rivals'],
	['Marvel Rivals ', 'Marvel Rivals '],
	['marvel-rivals ', 'marvel-rivals '],
	['NetEase Anti-Cheat maintenance', 'NetEase Anti-Cheat maintenance'],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['operatorEsp', 'dinoEsp'],
	['objectiveFight', 'ambushFight'],
	['alMazrah', 'survivalIsland'],
	['players', 'players'],
	['operator', 'player'],
	['players', 'Players'],
	['Operator', 'Player'],
	['Al Mazrah', 'Verdansk'],
	['Verdansk', 'Verdansk'],
	['ranked match', 'ranked match'],
	['objective', 'objective'],
	['marvelrivals.org', 'marvelrivals.org'],
	['Trucos Marvel Rivals', 'Trucos Marvel Rivals'],
	['Triches Marvel Rivals', 'Triches Marvel Rivals'],
	['Cheats Marvel Rivals', 'Cheats Marvel Rivals'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of UI_REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

// Rebuild ui-strings from clean source
for (const file of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	let content = await readFile(path.join(SRC, 'scripts/i18n-data', file), 'utf8');
	content = apply(content);
	await writeFile(path.join(ROOT, 'scripts/i18n-data', file), content);
	console.log('Fixed', file);
}

// Fix pages-en eac key
let pagesEn = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), 'utf8');
pagesEn = pagesEn.replace(/\teac: \{/, "\t'neac': {");
pagesEn = pagesEn.replace(/Marvel Rivals Marvel Rivals/g, 'Marvel Rivals');
pagesEn = pagesEn.replace(/for Marvel Rivals Marvel Rivals/g, 'for Marvel Rivals');
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), pagesEn);

// Fix pages-i18n
let pagesI18n = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), 'utf8');
pagesI18n = apply(pagesI18n);
pagesI18n = pagesI18n.replace(/'neac'/g, "'neac'");
pagesI18n = pagesI18n.replace(/eac:/g, "'neac':");
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), pagesI18n);

// Fix generate-i18n pages count
let gen = await readFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), 'utf8');
gen = gen.replace('Pages per locale: 25', 'Pages per locale: 17');
await writeFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), gen);

console.log('Fixed i18n keys.');
