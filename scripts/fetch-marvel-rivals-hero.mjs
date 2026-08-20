import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const HERO_URL =
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel-rivals/ChatGPT%20Image%20Aug%2019,%202026,%2005_51_32%20PM.png';
const imagesDir = path.resolve('public/images');
const HERO_WEBP = { quality: 82, effort: 6, smartSubsample: true };

/** Match homepage hero — preserve source aspect ratio (~16:9). */
const BANNER_RATIO = 1672 / 941;

async function renderHero(width) {
	const height = Math.round(width / BANNER_RATIO);
	return sharp(heroBuffer)
		.resize(width, height, { fit: 'cover', position: 'centre' })
		.webp(HERO_WEBP)
		.toBuffer();
}

const heroBuffer = Buffer.from(
	await fetch(HERO_URL, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TheMarvelRivalsCheatsSite/1.0)' },
	}).then((r) => {
		if (!r.ok) throw new Error(`HTTP ${r.status}`);
		return r.arrayBuffer();
	}),
);

for (const width of [640, 1024, 1536]) {
	const height = Math.round(width / BANNER_RATIO);
	const webp = await renderHero(width);
	await writeFile(path.join(imagesDir, `marvel-rivals-cheats-hero-${width}w.webp`), webp);
	console.log(`✓ marvel-rivals-cheats-hero-${width}w.webp (${width}x${height}, ${Math.round(webp.length / 1024)}KB)`);
}

const canonicalHeight = Math.round(1024 / BANNER_RATIO);
const canonical = await renderHero(1024);
const canonicalPng = await sharp(heroBuffer)
	.resize(1024, canonicalHeight, { fit: 'cover', position: 'centre' })
	.png()
	.toBuffer();
for (const name of ['marvel-rivals-cheats-hero.webp', 'marvel-rivals-hero-banner.webp', 'hero-banner.webp']) {
	await writeFile(path.join(imagesDir, name), canonical);
}
await writeFile(path.join(imagesDir, 'marvel-rivals-cheats-hero.png'), canonicalPng);
await writeFile(path.join(imagesDir, 'marvel-rivals-hero-source.png'), heroBuffer);

console.log(`Done — hero banner ${BANNER_RATIO.toFixed(2)}:1 (1024x${canonicalHeight})`);
