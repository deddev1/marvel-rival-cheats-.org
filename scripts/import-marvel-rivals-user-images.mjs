#!/usr/bin/env node
/**
 * Import Marvel Rivals gameplay images from Supabase public bucket.
 * Replaces screenshots + product page images — does NOT touch homepage hero ladder.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const CONTENT_WIDTHS = [480, 960];
const WEBP = { quality: 80, effort: 6, smartSubsample: true };

const SOURCES = [
	{
		label: 'marvel-rivals.png',
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/marvel-rivals.png',
	},
	{
		label: 'marvel-rivals (2).png',
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/marvel-rivals%20(2).png',
	},
	{
		label: 'marvel-rivals (3).png',
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/marvel-rivals%20(3).png',
	},
	{
		label: 'sc2.webp',
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/sc2.webp',
	},
	{
		label: 'sc3.webp',
		url: 'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/sc3.webp',
	},
];

const LEGACY_MAP = {
	'marvel-rivals-screenshot-02': ['marvel-rivals-cheats-esp.webp'],
	'marvel-rivals-screenshot-03': ['marvel-rivals-cheats-wallhack.webp'],
	'marvel-rivals-screenshot-04': ['marvel-rivals-cheats-aimbot.webp'],
	'marvel-rivals-screenshot-05': ['marvel-rivals-cheats-aimbot-view.webp'],
	'marvel-rivals-screenshot-06': ['marvel-rivals-cheats-radar.webp'],
	'marvel-rivals-screenshot-07': ['marvel-rivals-cheats-match.webp'],
	'marvel-rivals-screenshot-08': ['marvel-rivals-cheats-combat.webp'],
	'marvel-rivals-screenshot-09': ['marvel-rivals-esp-player-tags.webp', 'marvel-rivals-esp-radar.webp'],
	'marvel-rivals-screenshot-10': ['marvel-rivals-aimbot-skeleton.webp', 'marvel-rivals-aimbot-sniper.webp'],
	'marvel-rivals-screenshot-11': ['marvel-rivals-objective-fight.webp'],
	'marvel-rivals-screenshot-12': ['marvel-rivals-growth-run-combat.webp'],
	'marvel-rivals-screenshot-13': ['marvel-rivals-growth-run-mode.webp'],
	'marvel-rivals-screenshot-14': ['marvel-rivals-verdansk-map.webp'],
	'marvel-rivals-screenshot-15': ['marvel-rivals-wallhack-skeleton.webp'],
};

async function downloadSources() {
	const buffers = [];
	for (const source of SOURCES) {
		const res = await fetch(source.url, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MarvelRivalsCheatsSite/1.0)' },
		});
		if (!res.ok) throw new Error(`Download failed for ${source.label}: HTTP ${res.status}`);
		buffers.push(Buffer.from(await res.arrayBuffer()));
		console.log(`✓ downloaded ${source.label}`);
	}
	return buffers;
}

async function encodeWebp(input, width) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 595) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: false })
		.webp(WEBP)
		.toBuffer();
}

async function writeScreenshotSet(input, baseName) {
	let canonical = null;
	for (const width of CONTENT_WIDTHS) {
		const webp = await encodeWebp(input, width);
		await writeFile(path.join(imagesDir, `${baseName}-${width}w.webp`), webp);
	}
	canonical = await encodeWebp(input, 960);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	for (const name of LEGACY_MAP[baseName] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
	}
	return canonical;
}

const sources = await downloadSources();

for (let n = 1; n <= 15; n += 1) {
	const num = String(n).padStart(2, '0');
	const base = `marvel-rivals-screenshot-${num}`;
	const source = sources[(n - 1) % sources.length];
	console.log(`Processing ${base} ← ${SOURCES[(n - 1) % SOURCES.length].label}`);
	await writeScreenshotSet(source, base);
}

console.log('\nDone — replaced marvel-rivals-screenshot-01…15 and linked product images (hero untouched).');
