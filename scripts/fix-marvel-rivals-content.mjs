#!/usr/bin/env node
/** Second-pass cleanup after adapt-marvel-rivals.mjs */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const REPLACEMENTS = [
	['marvelRivalsScreenshot', 'marvelRivalsScreenshot'],
	['EXT.marvelRivals', 'EXT.marvelRivals'],
	['KW.neac', 'KW.neac'],
	['pageId: neac', 'pageId: neac'],
	["'neac'", "'neac'"],
	['"neac"', '"neac"'],
	['neac-bypass', 'neac-bypass'],
	['marvel-rivals-cheats-run', 'marvel-rivals-cheats-run'],
	['marvel-rivals-cheats-run', 'marvel-rivals-cheats-run'],
	['Galería Marvel Rivals', 'Galería Marvel Rivals'],
	['Galerie Marvel Rivals', 'Galerie Marvel Rivals'],
	['Galeria Marvel Rivals', 'Galeria Marvel Rivals'],
	['Galerie Marvel Rivals', 'Galerie Marvel Rivals'],
	['Galeria Marvel Rivals', 'Galeria Marvel Rivals'],
	['Galeri Marvel Rivals', 'Galeri Marvel Rivals'],
	['Галерея Marvel Rivals', 'Галерея Marvel Rivals'],
	['معرض Marvel Rivals', 'معرض Marvel Rivals'],
	['แกลเลอรี Marvel Rivals', 'แกลเลอรี Marvel Rivals'],
	['Thư viện Marvel Rivals', 'Thư viện Marvel Rivals'],
	['Marvel Rivals-beelden', 'Marvel Rivals-beelden'],
	['Marvel Rivals-bilder', 'Marvel Rivals-bilder'],
	['Marvel Rivalsビジュアル', 'Marvel Rivalsビジュアル'],
	['Marvel Rivalsエイムボット', 'Marvel Rivalsエイムボット'],
	['Aimbot Marvel Rivals', 'Aimbot Marvel Rivals'],
	['loop de Marvel Rivals', 'loop de Marvel Rivals'],
	['loop de Marvel Rivals', 'loop de Marvel Rivals'],
	['loop di Marvel Rivals', 'loop di Marvel Rivals'],
	['loop Marvel Rivals', 'loop Marvel Rivals'],
	['Match-Loop von Marvel Rivals', 'Match-Loop von Marvel Rivals'],
	['match-loop van Marvel Rivals', 'match-loop van Marvel Rivals'],
	['Marvel Rivals match-loop', 'Marvel Rivals match-loop'],
	['ของ Marvel Rivals', 'ของ Marvel Rivals'],
	['в Marvel Rivals', 'в Marvel Rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['de Marvel Rivals', 'de Marvel Rivals'],
	['do Marvel Rivals', 'do Marvel Rivals'],
	['di Marvel Rivals', 'di Marvel Rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['de Marvel Rivals:', 'de Marvel Rivals:'],
	['do Marvel Rivals:', 'do Marvel Rivals:'],
	['di Marvel Rivals:', 'di Marvel Rivals:'],
	['von Marvel Rivals:', 'von Marvel Rivals:'],
	['van Marvel Rivals:', 'van Marvel Rivals:'],
	['Marvel Rivals:', 'Marvel Rivals:'],
	['Marvel Rivals,', 'Marvel Rivals,'],
	['Marvel Rivals ', 'Marvel Rivals '],
	[' Marvel Rivals', ' Marvel Rivals'],
	['objectives', 'objectives'],
	['objectivesear', 'farm objectives'],
	['objectivesuj', 'farm objectives'],
	['objectives', 'objectives'],
	['objective', 'objective'],
	['meilleures-triches-marvel-rivals', 'meilleures-triches-marvel-rivals'],
	['vanlifemarvelrivals', 'vanlifemarvelrivals'],
	['marvel-rivals', 'marvel-rivals'],
	['Marvel Rivals', 'Marvel Rivals'],
	['NetEase Games', 'NetEase Games'],
	['NetEase Games', 'NetEase Games'],
	['NetEase Anti-Cheat', 'NetEase Anti-Cheat'],
	['neac', 'neac'],
	['Marvel Rivals maps', 'Marvel Rivals maps'],
	['enemy team', 'enemy team'],
	['Hero', 'Hero'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-marvel-rivals.mjs',
	'adapt-marvel-rivals.mjs',
	'adapt-theisle.mjs',
	'adapt-fortnite.mjs',
	'adapt-warzone.mjs',
	'adapt-tarkov.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		let updated = original;
		for (const [from, to] of REPLACEMENTS) {
			if (from === to) continue;
			updated = updated.split(from).join(to);
		}
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Second-pass fixed ${changed} files`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
