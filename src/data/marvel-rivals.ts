import { siteConfig } from './site';

/** Simple crawl URLs — one screenshot per asset slot. */
export const marvelRivalsScreenshot = (n: number) =>
	`/images/marvel-rivals-screenshot-${String(n).padStart(2, '0')}.webp`;

/** Screenshots used across product pages. */
export const marvelRivalsImages = {
	hero: marvelRivalsScreenshot(1),
	espWallhack: marvelRivalsScreenshot(3),
	aimbotCombat: marvelRivalsScreenshot(4),
	aimbotSkeleton: marvelRivalsScreenshot(5),
	dinoEsp: marvelRivalsScreenshot(6),
	hacksCombat: marvelRivalsScreenshot(7),
	logo: siteConfig.logo,
	/** @deprecated Blog / legacy aliases — each maps to one screenshot URL */
	cover: marvelRivalsScreenshot(7),
	nestBuilder: marvelRivalsScreenshot(6),
	packFight: marvelRivalsScreenshot(5),
	hacksPackage: marvelRivalsScreenshot(6),
	headerArt: marvelRivalsScreenshot(5),
	survivalCombat: marvelRivalsScreenshot(7),
	objectiveFight: marvelRivalsScreenshot(4),
	ambushFight: marvelRivalsScreenshot(4),
	growthRunCombat: marvelRivalsScreenshot(3),
	growthRunMode: marvelRivalsScreenshot(2),
	survivalIsland: marvelRivalsScreenshot(2),
	teamFight: marvelRivalsScreenshot(4),
	rankedCombat: marvelRivalsScreenshot(3),
	rankedMode: marvelRivalsScreenshot(2),
	heroShooter: marvelRivalsScreenshot(2),
	sessionMap: marvelRivalsScreenshot(2),
	product: [
		{ src: marvelRivalsScreenshot(2), alt: 'Marvel Rivals gameplay screenshot 2' },
		{ src: marvelRivalsScreenshot(3), alt: 'Marvel Rivals gameplay screenshot 3' },
		{ src: marvelRivalsScreenshot(4), alt: 'Marvel Rivals gameplay screenshot 4' },
		{ src: marvelRivalsScreenshot(6), alt: 'Marvel Rivals gameplay screenshot 6' },
		{ src: marvelRivalsScreenshot(7), alt: 'Marvel Rivals gameplay screenshot 7' },
		{ src: marvelRivalsScreenshot(8), alt: 'Marvel Rivals gameplay screenshot 8' },
	],
	gallery: [
		{ src: marvelRivalsScreenshot(2), alt: 'Marvel Rivals gameplay screenshot 2', featured: true },
		{ src: marvelRivalsScreenshot(3), alt: 'Marvel Rivals gameplay screenshot 3' },
		{ src: marvelRivalsScreenshot(4), alt: 'Marvel Rivals gameplay screenshot 4' },
		{ src: marvelRivalsScreenshot(9), alt: 'Marvel Rivals gameplay screenshot 9' },
		{ src: marvelRivalsScreenshot(10), alt: 'Marvel Rivals gameplay screenshot 10' },
	],
	sitemap: Array.from({ length: 15 }, (_, i) => ({
		src: marvelRivalsScreenshot(i + 1),
		title: `Marvel Rivals gameplay screenshot ${i + 1}`,
		caption: `Marvel Rivals hero shooter screenshot ${i + 1}`,
	})),
} as const;
