import { siteConfig } from './site';
import { pageIds, type PageId } from './i18n/routing';
import { pageSitemapImageLabels } from './brand-sitemap';
import { homeShowcaseImages } from './product-showcase';

const shot = (n: number) => `/images/marvel-rivals-screenshot-${String(n).padStart(2, '0')}.webp`;
const slugShot = (slug: string) => `/images/${slug}.webp`;

/** Rotating product screenshots for FAQ / review detail URLs. */
export const crawlPhotoPool = [
	slugShot('marvel-rivals-esp-wallhack-player-boxes'),
	slugShot('marvel-rivals-aimbot-soft-aim-fov'),
	slugShot('marvel-rivals-cheats-radar-2d-overlay'),
	slugShot('marvel-rivals-wallhack-enemy-outlines'),
	slugShot('marvel-rivals-cheats-team-fight-esp'),
	slugShot('marvel-rivals-esp-player-names-health'),
] as const;

/**
 * One primary crawl/OG photo per product page.
 * Prefer compressed WebP screenshots so Google can fetch them quickly.
 */
export const pageImageSrcById: Record<PageId, string> = {
	home: '/images/marvel-rivals-cheats-hero-1024w.webp',
	'marvel-rivals-esp': slugShot('marvel-rivals-esp-wallhack-player-boxes'),
	'marvel-rivals-aimbot': slugShot('marvel-rivals-aimbot-soft-aim-fov'),
	features: slugShot('marvel-rivals-cheats-mod-menu-windows'),
	pricing: slugShot('marvel-rivals-cheats-team-fight-esp'),
	setup: slugShot('marvel-rivals-cheats-mod-menu-windows'),
	updates: slugShot('marvel-rivals-undetected-cheats-gameplay'),
	faq: slugShot('marvel-rivals-esp-distance-markers'),
	support: slugShot('marvel-rivals-cheats-match-overview'),
	undetected: slugShot('marvel-rivals-undetected-cheats-gameplay'),
	wallhack: slugShot('marvel-rivals-wallhack-enemy-outlines'),
	radar: slugShot('marvel-rivals-cheats-radar-2d-overlay'),
	nneac: slugShot('marvel-rivals-undetected-cheats-gameplay'),
	'cheats-2026': slugShot('marvel-rivals-cheats-hero-combat-esp'),
	hacks: slugShot('marvel-rivals-cheats-team-fight-esp'),
	'cheat-download': slugShot('marvel-rivals-cheats-mod-menu-windows'),
	'mod-menu': slugShot('marvel-rivals-cheats-mod-menu-windows'),
	'soft-aim': slugShot('marvel-rivals-aimbot-target-lock'),
	'best-cheats': slugShot('marvel-rivals-undetected-cheats-gameplay'),
	'aimbot-hack': slugShot('marvel-rivals-aimbot-sniper-view'),
	'esp-hack': slugShot('marvel-rivals-esp-skeleton-through-walls'),
	'unlock-all': slugShot('marvel-rivals-cheats-match-overview'),
	privacy: shot(14),
	refund: shot(15),
	terms: shot(13),
};

for (const pageId of pageIds) {
	if (!pageImageSrcById[pageId]) {
		throw new Error(`[page-images] No image path configured for pageId: ${pageId}`);
	}
}

export function absoluteImageUrl(path: string): string {
	return new URL(path, siteConfig.url).href;
}

export function getPageImageSrc(pageId: PageId): string {
	return pageImageSrcById[pageId];
}

export function getPageCrawlImage(pageId: PageId): {
	src: string;
	url: string;
	title: string;
	caption: string;
} {
	const src = pageImageSrcById[pageId];
	const labels = pageSitemapImageLabels(pageId);
	return {
		src,
		url: absoluteImageUrl(src),
		title: labels.title,
		caption: labels.caption,
	};
}

/** Stable pick from the photo pool (FAQ answers, reviews, etc.). */
export function pickCrawlPhoto(seed: string): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) {
		hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
	}
	return crawlPhotoPool[hash % crawlPhotoPool.length];
}

export function crawlPhotoMeta(
	seed: string,
	title: string,
	caption: string,
): { src: string; url: string; title: string; caption: string } {
	const src = pickCrawlPhoto(seed);
	return {
		src,
		url: absoluteImageUrl(src),
		title,
		caption,
	};
}

/** Default large social / SERP image when a page has no specific asset. */
export const defaultCrawlImageSrc = pageImageSrcById.home;

/** Keyword-rich gallery entries shared with sitemap generation. */
export const productShowcaseSitemapImages = homeShowcaseImages;
