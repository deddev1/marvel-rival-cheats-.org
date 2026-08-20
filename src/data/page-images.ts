import { siteConfig } from './site';
import { pageIds, type PageId } from './i18n/routing';
import { pageSitemapImageLabels } from './brand-sitemap';

const shot = (n: number) => `/images/marvel-rivals-screenshot-${String(n).padStart(2, '0')}.webp`;

/** Rotating product screenshots for FAQ / review detail URLs. */
export const crawlPhotoPool = [
	shot(2),
	shot(3),
	shot(4),
	shot(5),
	shot(6),
	shot(7),
] as const;

/**
 * One primary crawl/OG photo per product page.
 * Prefer compressed WebP screenshots so Google can fetch them quickly.
 */
export const pageImageSrcById: Record<PageId, string> = {
	home: '/images/marvel-rivals-cheats-hero-1024w.webp',
	'marvel-rivals-esp': shot(2),
	'marvel-rivals-aimbot': shot(4),
	features: shot(5),
	pricing: shot(7),
	setup: shot(2),
	updates: shot(1),
	faq: shot(5),
	support: shot(7),
	undetected: shot(3),
	wallhack: shot(3),
	radar: shot(6),
	neac: shot(4),
	'cheats-2026': shot(1),
	hacks: shot(7),
	'cheat-download': shot(7),
	'mod-menu': shot(6),
	'soft-aim': shot(5),
	'best-cheats': shot(1),
	'aimbot-hack': shot(5),
	'esp-hack': shot(3),
	'unlock-all': shot(6),
	privacy: shot(4),
	refund: shot(7),
	terms: shot(5),
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
