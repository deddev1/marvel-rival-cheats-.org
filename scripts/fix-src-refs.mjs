#!/usr/bin/env node
/** Final pass: fix remaining Marvel Rivals references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['marvelRivalsImages', 'marvelRivalsImages'],
	["from '../data/marvel-rivals'", "from '../data/marvel-rivals'"],
	["from './marvel-rivals'", "from './marvel-rivals'"],
	['/undetected-marvel-rivals-cheats/', '/undetected-marvel-rivals-cheats/'],
	['/marvel-rivals-wallhack/', '/marvel-rivals-wallhack/'],
	['/marvel-rivals-radar-hack/', '/marvel-rivals-radar-hack/'],
	['/neac-bypass/', '/neac-bypass/'],
	['/marvel-rivals-cheats-2026/', '/marvel-rivals-cheats-2026/'],
	['/marvel-rivals-aimbot/', '/marvel-rivals-aimbot/'],
	['/marvel-rivals-esp/', '/marvel-rivals-esp/'],
	['/marvel-rivals-cheats/', '/marvel-rivals-esp/'],
	['Marvel Rivals Cheats', 'Marvel Rivals Cheats'],
	['marvel rivals cheats', 'marvel rivals cheats'],
	['marvel rivals wallhack', 'Marvel Rivals wallhack'],
	['marvel rivals radar', 'Marvel Rivals radar'],
	['Marvel Rivals Aimbot', 'The Marvel Rivals Aimbot'],
	['Marvel Rivals ESP', 'The Marvel Rivals ESP'],
	['Marvel Rivals', 'Marvel Rivals'],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['neac', 'neac'],
	['marvelrivalscheats.org', 'marvelrivalscheats.org'],
	['operatorEsp', 'dinoEsp'],
	['objectiveFight', 'ambushFight'],
	['alMazrah', 'survivalIsland'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
