/**
 * Build SEO-named Marvel Rivals cheat showcase images.
 * 1. Supabase user screenshots (primary)
 * 2. PNG/JPG drops in scripts/assets/product-screenshots/
 * 3. IGN gameplay fallback with overlays (last resort)
 * Does NOT modify homepage hero assets (marvel-rivals-cheats-hero-*).
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { buildOverlaySvg } from './marvel-rivals-cheat-overlays.mjs';

const imagesDir = path.resolve('public/images');
const assetsDir = path.resolve('scripts/assets/product-screenshots');
const CONTENT_WIDTHS = [480, 960];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

/** Keyword-rich public URLs — stable for Google Image Search. */
export const SHOWCASE_MANIFEST = [
	{
		slug: 'marvel-rivals-esp-wallhack-player-boxes',
		alt: 'Marvel Rivals ESP wallhack with player boxes, health bars, and distance markers on Windows PC',
		title: 'Marvel Rivals ESP wallhack player boxes',
		caption: 'Undetected Marvel Rivals cheats ESP wallhack showing enemy boxes and distance readouts',
		overlay: 'esp',
	},
	{
		slug: 'marvel-rivals-esp-skeleton-through-walls',
		alt: 'Marvel Rivals skeleton ESP through walls with enemy bone outlines during a team fight',
		title: 'Marvel Rivals skeleton ESP wallhack',
		caption: 'Marvel Rivals cheats skeleton ESP highlighting heroes through cover',
		overlay: 'wallhack',
	},
	{
		slug: 'marvel-rivals-aimbot-soft-aim-fov',
		alt: 'Marvel Rivals soft aim FOV circle and target reticle during ranked match gameplay',
		title: 'Marvel Rivals soft aim FOV overlay',
		caption: 'Marvel Rivals aimbot soft aim field-of-view targeting in live match',
		overlay: 'aimbot',
	},
	{
		slug: 'marvel-rivals-aimbot-target-lock',
		alt: 'Marvel Rivals aimbot target lock on an enemy hero with ESP box and health bar',
		title: 'Marvel Rivals aimbot target lock',
		caption: 'Undetected Marvel Rivals aimbot locking onto an enemy hero with ESP assist',
		overlay: 'aimbot',
	},
	{
		slug: 'marvel-rivals-cheats-radar-2d-overlay',
		alt: 'Marvel Rivals 2D radar overlay showing nearby enemy blips during objective push',
		title: 'Marvel Rivals 2D radar hack overlay',
		caption: 'Marvel Rivals cheats 2D radar showing threat positions on Windows PC',
		overlay: 'radar',
	},
	{
		slug: 'marvel-rivals-cheats-mod-menu-windows',
		alt: 'Marvel Rivals Cheats in-game mod menu with ESP, aimbot, and radar toggles on Windows PC',
		title: 'Marvel Rivals Cheats mod menu',
		caption: 'Marvel Rivals cheats menu toggles for ESP wallhack, soft aim, and radar',
		overlay: 'menu',
	},
	{
		slug: 'marvel-rivals-wallhack-enemy-outlines',
		alt: 'Marvel Rivals wallhack enemy outlines visible through walls with purple ESP boxes',
		title: 'Marvel Rivals wallhack enemy outlines',
		caption: 'Marvel Rivals wallhack ESP showing enemies through terrain and structures',
		overlay: 'wallhack',
	},
	{
		slug: 'marvel-rivals-esp-distance-markers',
		alt: 'Marvel Rivals ESP distance markers and player names above enemy heroes in match',
		title: 'Marvel Rivals ESP distance markers',
		caption: 'Marvel Rivals ESP player tags with meter readouts during 6v6 combat',
		overlay: 'esp',
	},
	{
		slug: 'marvel-rivals-cheats-team-fight-esp',
		alt: 'Marvel Rivals team fight with undetected ESP boxes on multiple enemy heroes',
		title: 'Marvel Rivals team fight ESP',
		caption: 'Marvel Rivals cheats ESP during a multi-hero team fight on Windows PC',
		overlay: 'hero',
	},
	{
		slug: 'marvel-rivals-esp-objective-markers',
		alt: 'Marvel Rivals ESP objective markers and enemy positions around payload zone',
		title: 'Marvel Rivals ESP objective markers',
		caption: 'Marvel Rivals ESP highlighting enemies near contested objectives',
		overlay: 'esp',
	},
	{
		slug: 'marvel-rivals-aimbot-sniper-view',
		alt: 'Marvel Rivals aimbot sniper view with FOV ring and enemy ESP at range',
		title: 'Marvel Rivals aimbot sniper view',
		caption: 'Marvel Rivals soft aim assist with long-range ESP on Windows PC',
		overlay: 'aimbot',
	},
	{
		slug: 'marvel-rivals-cheats-hero-combat-esp',
		alt: 'Marvel Rivals hero combat with ESP skeleton overlays and soft aim reticle',
		title: 'Marvel Rivals hero combat ESP',
		caption: 'Marvel Rivals cheats ESP and aimbot during hero ability combat',
		overlay: 'hero',
	},
	{
		slug: 'marvel-rivals-undetected-cheats-gameplay',
		alt: 'Undetected Marvel Rivals cheats gameplay with ESP, radar, and soft aim active',
		title: 'Undetected Marvel Rivals cheats gameplay',
		caption: 'Undetected marvel rivals cheats package running ESP wallhack and radar in match',
		overlay: 'radar',
	},
	{
		slug: 'marvel-rivals-cheats-match-overview',
		alt: 'Marvel Rivals match overview with ESP player boxes across the map on Windows PC',
		title: 'Marvel Rivals cheats match overview',
		caption: 'Marvel Rivals cheats full-match ESP overview with multiple enemy tags',
		overlay: 'esp',
	},
	{
		slug: 'marvel-rivals-esp-player-names-health',
		alt: 'Marvel Rivals ESP showing player names, health bars, and skeleton outlines',
		title: 'Marvel Rivals ESP player names and health',
		caption: 'Marvel Rivals ESP wallhack with hero names, health bars, and bone ESP',
		overlay: 'wallhack',
	},
];

const SUPABASE_SOURCES = [
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173007.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173015.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173022.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173029.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173044.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173049.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173055.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173101.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173117.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173129.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173146.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173152.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173157.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173203.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173213.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173219.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173258.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173309.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173316.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173340.png',
	'https://boqgsoiwnpbisvrxulbe.supabase.co/storage/v1/object/public/marvel%20rivals/Screenshot%202026-08-20%20173345.png',
];

const IGN_SOURCES = [
	'https://sm.ign.com/t/ign_pk/gallery/m/marvel-riv/marvel-rivals-screenshots_rcjq.1400.jpg',
	'https://sm.ign.com/t/ign_fr/gallery/m/marvel-riv/marvel-rivals-screenshots_jd9r.1400.jpg',
	'https://sm.ign.com/t/ign_it/gallery/m/marvel-riv/marvel-rivals-screenshots_yev9.1400.jpg',
	'https://sm.ign.com/t/ign_fr/photo/default/01-team-fight-12024marvel-1711483252888_zf13.1400.jpg',
	'https://sm.ign.com/t/ign_fr/photo/default/02-hero-highlight-12024marvel-1711483252887_1adr.1400.jpg',
	'https://sm.ign.com/t/ign_fr/photo/default/03-scenery-shot-22024marvel-1711483252887_a3va.1400.jpg',
	'https://sm.ign.com/t/ign_fr/photo/default/04-scenery-shot-32024marvel-1711483252886_e4yf.1400.jpg',
	'https://sm.ign.com/t/ign_fr/photo/default/05-hero-highlight-22024marvel-1711483252885_sfkx.1400.jpg',
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
};

async function fetchBuffer(url) {
	const res = await fetch(url, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MarvelRivalsCheatsSite/1.0)' },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
	return Buffer.from(await res.arrayBuffer());
}

async function composeFromBase(baseBuffer, overlayPreset) {
	const base = sharp(baseBuffer).resize({ width: 1920, withoutEnlargement: true });
	const meta = await base.metadata();
	const width = meta.width ?? 1920;
	const height = meta.height ?? 1080;
	const overlaySvg = Buffer.from(buildOverlaySvg(width, height, overlayPreset));
	const darkened = await base.modulate({ brightness: 0.94, saturation: 1.06 }).toBuffer();
	return sharp(darkened)
		.composite([{ input: overlaySvg, top: 0, left: 0 }])
		.webp(WEBP)
		.toBuffer();
}

async function loadUserDrops() {
	await mkdir(assetsDir, { recursive: true });
	const files = (await readdir(assetsDir))
		.filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
		.sort();
	const buffers = [];
	for (const file of files) {
		buffers.push(await readFile(path.join(assetsDir, file)));
	}
	return buffers;
}

async function loadSupabaseSources() {
	const buffers = [];
	for (const url of SUPABASE_SOURCES) {
		try {
			buffers.push(await fetchBuffer(url));
			console.log(`✓ downloaded ${decodeURIComponent(url.split('/').pop() ?? url)}`);
		} catch (err) {
			console.warn(`✗ skip ${url}: ${err.message}`);
		}
	}
	return buffers;
}

async function toWebp(source) {
	return sharp(source).resize({ width: 1920, withoutEnlargement: true }).webp(WEBP).toBuffer();
}

async function loadIgnBases() {
	const bases = [];
	for (const url of IGN_SOURCES) {
		try {
			bases.push(await fetchBuffer(url));
			console.log(`✓ downloaded ${url.split('/').pop()}`);
		} catch (err) {
			console.warn(`✗ skip ${url}: ${err.message}`);
		}
	}
	if (!bases.length) throw new Error('No IGN base images downloaded');
	return bases;
}

async function writeVariants(baseName, webpBuffer) {
	await writeFile(path.join(imagesDir, `${baseName}.webp`), webpBuffer);
	for (const width of CONTENT_WIDTHS) {
		const variant = await sharp(webpBuffer)
			.resize({ width, withoutEnlargement: true })
			.webp(WEBP)
			.toBuffer();
		await writeFile(path.join(imagesDir, `${baseName}-${width}w.webp`), variant);
	}
}

await mkdir(imagesDir, { recursive: true });

const supabaseBuffers = await loadSupabaseSources();
const userBuffers = supabaseBuffers.length ? [] : await loadUserDrops();
const ignBases = supabaseBuffers.length || userBuffers.length ? [] : await loadIgnBases();
const sourcePool = supabaseBuffers.length ? supabaseBuffers : userBuffers.length ? userBuffers : ignBases;
const useRawSources = supabaseBuffers.length > 0 || userBuffers.length > 0;

console.log(
	supabaseBuffers.length
		? `Using ${supabaseBuffers.length} Supabase screenshots (hero untouched)`
		: userBuffers.length
			? `Using ${userBuffers.length} user images from scripts/assets/product-screenshots/`
			: `Using ${ignBases.length} IGN bases with cheat overlays`,
);

for (let i = 0; i < SHOWCASE_MANIFEST.length; i += 1) {
	const item = SHOWCASE_MANIFEST[i];
	const source = sourcePool[i % sourcePool.length];
	const webp = useRawSources ? await toWebp(source) : await composeFromBase(source, item.overlay);

	await writeVariants(item.slug, webp);

	const num = String(i + 1).padStart(2, '0');
	const numbered = `marvel-rivals-screenshot-${num}`;
	await writeVariants(numbered, webp);
	for (const alias of LEGACY_MAP[numbered] ?? []) {
		await writeFile(path.join(imagesDir, alias), webp);
	}

	console.log(`✓ ${item.slug}.webp (+ screenshot-${num})`);
}

console.log('\nDone — SEO showcase images + marvel-rivals-screenshot-01…15 refreshed.');
