import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/** Original from https://hdqwalls.com/guardians-of-the-galaxy-in-marvel-rivals-wallpaper */
const HERO_URL =
	'https://hdqwalls.com/guardians-of-the-galaxy-in-marvel-rivals-wallpaper';
const LOCAL_SOURCE = path.resolve('scripts/assets/guardians-hero-source.jpg');
const imagesDir = path.resolve('public/images');
const HERO_WEBP = { quality: 82, effort: 6, smartSubsample: true };

async function loadHeroSource() {
	try {
		return await readFile(LOCAL_SOURCE);
	} catch {
		throw new Error(
			`Missing ${LOCAL_SOURCE}. Download the HDQWalls original to scripts/assets/guardians-hero-source.jpg`,
		);
	}
}

async function renderHero(source, width) {
	const meta = await sharp(source).metadata();
	const ratio = (meta.width ?? 5120) / (meta.height ?? 2880);
	const height = Math.round(width / ratio);
	return sharp(source)
		.resize(width, height, { fit: 'cover', position: 'centre' })
		.webp(HERO_WEBP)
		.toBuffer();
}

const heroBuffer = await loadHeroSource();
await writeFile(path.join(imagesDir, 'marvel-rivals-hero-source.jpg'), heroBuffer);

const cleanedMeta = await sharp(heroBuffer).metadata();
const cleanedRatio = (cleanedMeta.width ?? 5120) / (cleanedMeta.height ?? 2880);

for (const width of [640, 1024, 1536]) {
	const height = Math.round(width / cleanedRatio);
	const webp = await renderHero(heroBuffer, width);
	await writeFile(path.join(imagesDir, `marvel-rivals-cheats-hero-${width}w.webp`), webp);
	console.log(`✓ marvel-rivals-cheats-hero-${width}w.webp (${width}x${height}, ${Math.round(webp.length / 1024)}KB)`);
}

const canonicalHeight = Math.round(1024 / cleanedRatio);
const canonical = await renderHero(heroBuffer, 1024);
const canonicalPng = await sharp(heroBuffer)
	.resize(1024, canonicalHeight, { fit: 'cover', position: 'centre' })
	.png()
	.toBuffer();

for (const name of ['marvel-rivals-cheats-hero.webp', 'marvel-rivals-hero-banner.webp', 'hero-banner.webp']) {
	await writeFile(path.join(imagesDir, name), canonical);
}
await writeFile(path.join(imagesDir, 'marvel-rivals-cheats-hero.png'), canonicalPng);
await writeFile(path.join(imagesDir, 'marvel-rivals-hero-source.png'), heroBuffer);

console.log(`Done — Guardians hero ${cleanedRatio.toFixed(2)}:1 (1024x${canonicalHeight}) from ${HERO_URL}`);
