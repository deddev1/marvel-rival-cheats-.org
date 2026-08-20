import { brand } from './brand';
import type { PageId } from './i18n/routing';

export type ExternalResource = {
	label: string;
	href: string;
	note?: string;
};

export type GuideCta = {
	label: string;
	href: string;
};

/** Canonical outbound URLs — single source for CTAs, pills, and resource blocks. */
export const externalUrls = {
	steam: brand.gameUrl,
	steamNews: 'https://store.steampowered.com/app/2767030/news/',
	officialSite: 'https://www.marvelrivals.com/',
	wiki: 'https://marvelrivals.fandom.com/wiki/Marvel_Rivals_Wiki',
	steamCommunity: 'https://steamcommunity.com/app/2767030',
} as const;

/** Authoritative third-party guides — cite official game sources for readers and search engines. */
export const externalResources: ExternalResource[] = [
	{
		label: 'Marvel Rivals on Steam',
		href: externalUrls.steam,
		note: 'Official store page, system requirements, and player reviews.',
	},
	{
		label: 'Steam patch notes & news',
		href: externalUrls.steamNews,
		note: 'Read official update posts before you change your loadout.',
	},
	{
		label: 'Official Marvel Rivals website',
		href: externalUrls.officialSite,
		note: 'Game overview from NetEase Games.',
	},
	{
		label: 'Marvel Rivals Wiki (Fandom)',
		href: externalUrls.wiki,
		note: 'Maps, matchners, loot, and objectiveion mechanics.',
	},
	{
		label: 'Steam Community hub',
		href: externalUrls.steamCommunity,
		note: 'Announcements and community discussions.',
	},
];

/** Compact above-the-fold guide links for blogs and page banners. */
export const featuredGuidePills: GuideCta[] = [
	{ label: 'Marvel Rivals on Steam', href: externalUrls.steam },
	{ label: 'Official patch notes', href: externalUrls.steamNews },
	{ label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
];

/**
 * Secondary banner buttons that should point to official guides — not internal sales pages.
 * Keeps primary Buy CTAs while giving Google clear outbound citations.
 */
export const externalSecondaryByPageId: Partial<Record<PageId, GuideCta>> = {
	features: { label: 'Official patch notes', href: externalUrls.steamNews },
	updates: { label: 'Steam patch notes', href: externalUrls.steamNews },
	hacks: { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'marvel-rivals-esp': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'marvel-rivals-aimbot': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	radar: { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	setup: { label: 'Official game site', href: externalUrls.officialSite },
	support: { label: 'Steam Community', href: externalUrls.steamCommunity },
	faq: { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	undetected: { label: 'Steam patch notes', href: externalUrls.steamNews },
	wallhack: { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	neac: { label: 'Steam patch notes', href: externalUrls.steamNews },
	'cheats-2026': { label: 'Marvel Rivals on Steam', href: externalUrls.steam },
	'cheat-download': { label: 'Official game site', href: externalUrls.officialSite },
	'mod-menu': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'soft-aim': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'best-cheats': { label: 'Steam Community', href: externalUrls.steamCommunity },
	'aimbot-hack': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'esp-hack': { label: 'Marvel Rivals Wiki', href: externalUrls.wiki },
	'unlock-all': { label: 'Official game site', href: externalUrls.officialSite },
	pricing: { label: 'Marvel Rivals on Steam', href: externalUrls.steam },
};

export function getExternalSecondaryCta(pageId: PageId): GuideCta | undefined {
	return externalSecondaryByPageId[pageId];
}

export function isExternalHref(href: string): boolean {
	return href.startsWith('http');
}
