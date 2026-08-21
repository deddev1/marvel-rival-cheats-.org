import { siteConfig } from './site';

/** Keyword-rich crawl URL for numbered screenshots. */
export const marvelRivalsScreenshot = (n: number) =>
	`/images/marvel-rivals-screenshot-${String(n).padStart(2, '0')}.webp`;

const slug = (name: string) => `/images/${name}.webp`;

/** Screenshots used across product pages. */
export const marvelRivalsImages = {
	hero: '/images/marvel-rivals-cheats-hero-1024w.webp',
	espWallhack: slug('marvel-rivals-esp-wallhack-player-boxes'),
	aimbotCombat: slug('marvel-rivals-aimbot-soft-aim-fov'),
	aimbotSkeleton: slug('marvel-rivals-esp-skeleton-through-walls'),
	dinoEsp: slug('marvel-rivals-esp-distance-markers'),
	hacksCombat: slug('marvel-rivals-cheats-team-fight-esp'),
	logo: siteConfig.logo,
	/** @deprecated Blog / legacy aliases — each maps to one screenshot URL */
	cover: slug('marvel-rivals-cheats-team-fight-esp'),
	nestBuilder: slug('marvel-rivals-cheats-mod-menu-windows'),
	packFight: slug('marvel-rivals-cheats-hero-combat-esp'),
	hacksPackage: slug('marvel-rivals-cheats-radar-2d-overlay'),
	headerArt: slug('marvel-rivals-aimbot-target-lock'),
	survivalCombat: slug('marvel-rivals-cheats-match-overview'),
	objectiveFight: slug('marvel-rivals-esp-objective-markers'),
	ambushFight: slug('marvel-rivals-wallhack-enemy-outlines'),
	growthRunCombat: slug('marvel-rivals-esp-skeleton-through-walls'),
	growthRunMode: slug('marvel-rivals-esp-objective-markers'),
	survivalIsland: slug('marvel-rivals-cheats-team-fight-esp'),
	teamFight: slug('marvel-rivals-cheats-team-fight-esp'),
	rankedCombat: slug('marvel-rivals-aimbot-sniper-view'),
	rankedMode: slug('marvel-rivals-undetected-cheats-gameplay'),
	heroShooter: slug('marvel-rivals-cheats-hero-combat-esp'),
	sessionMap: slug('marvel-rivals-cheats-match-overview'),
	product: [
		{ src: slug('marvel-rivals-esp-wallhack-player-boxes'), alt: 'Marvel Rivals ESP wallhack with player boxes and distance markers' },
		{ src: slug('marvel-rivals-aimbot-soft-aim-fov'), alt: 'Marvel Rivals soft aim FOV circle during ranked match gameplay' },
		{ src: slug('marvel-rivals-cheats-radar-2d-overlay'), alt: 'Marvel Rivals 2D radar overlay showing nearby enemy blips' },
		{ src: slug('marvel-rivals-wallhack-enemy-outlines'), alt: 'Marvel Rivals wallhack enemy outlines through walls' },
		{ src: slug('marvel-rivals-cheats-mod-menu-windows'), alt: 'Marvel Rivals Cheats mod menu with ESP and aimbot toggles' },
		{ src: slug('marvel-rivals-undetected-cheats-gameplay'), alt: 'Undetected Marvel Rivals cheats gameplay with ESP and radar active' },
	],
	gallery: [
		{ src: slug('marvel-rivals-esp-wallhack-player-boxes'), alt: 'Marvel Rivals ESP wallhack player boxes', featured: true },
		{ src: slug('marvel-rivals-esp-skeleton-through-walls'), alt: 'Marvel Rivals skeleton ESP through walls' },
		{ src: slug('marvel-rivals-aimbot-soft-aim-fov'), alt: 'Marvel Rivals soft aim FOV overlay' },
		{ src: slug('marvel-rivals-cheats-radar-2d-overlay'), alt: 'Marvel Rivals 2D radar hack overlay' },
		{ src: slug('marvel-rivals-wallhack-enemy-outlines'), alt: 'Marvel Rivals wallhack enemy outlines' },
		{ src: slug('marvel-rivals-cheats-team-fight-esp'), alt: 'Marvel Rivals team fight ESP screenshot' },
	],
	sitemap: Array.from({ length: 15 }, (_, i) => {
		const n = i + 1;
		const src = marvelRivalsScreenshot(n);
		return {
			src,
			title: `Marvel Rivals cheats screenshot ${n} — ESP, aimbot, and radar`,
			caption: `Undetected Marvel Rivals cheats gameplay screenshot ${n} on Windows PC`,
		};
	}),
} as const;
