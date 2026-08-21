/**
 * Home about showcase + sitewide product screenshots.
 * Paths are keyword-rich for Google Image Search; alts describe visible cheat features.
 */
export type ShowcaseImage = {
	src: string;
	alt: string;
	title: string;
	caption: string;
};

const shot = (slug: string) => `/images/${slug}.webp`;

export const homeShowcaseImages: ShowcaseImage[] = [
	{
		src: shot('marvel-rivals-esp-wallhack-player-boxes'),
		alt: 'Marvel Rivals ESP wallhack with player boxes, health bars, and distance markers on Windows PC',
		title: 'Marvel Rivals ESP wallhack player boxes',
		caption: 'Undetected Marvel Rivals cheats ESP wallhack showing enemy boxes and distance readouts',
	},
	{
		src: shot('marvel-rivals-esp-skeleton-through-walls'),
		alt: 'Marvel Rivals skeleton ESP through walls with enemy bone outlines during a team fight',
		title: 'Marvel Rivals skeleton ESP wallhack',
		caption: 'Marvel Rivals cheats skeleton ESP highlighting heroes through cover',
	},
	{
		src: shot('marvel-rivals-aimbot-soft-aim-fov'),
		alt: 'Marvel Rivals soft aim FOV circle and target reticle during ranked match gameplay',
		title: 'Marvel Rivals soft aim FOV overlay',
		caption: 'Marvel Rivals aimbot soft aim field-of-view targeting in live match',
	},
	{
		src: shot('marvel-rivals-aimbot-target-lock'),
		alt: 'Marvel Rivals aimbot target lock on an enemy hero with ESP box and health bar',
		title: 'Marvel Rivals aimbot target lock',
		caption: 'Undetected Marvel Rivals aimbot locking onto an enemy hero with ESP assist',
	},
	{
		src: shot('marvel-rivals-cheats-radar-2d-overlay'),
		alt: 'Marvel Rivals 2D radar overlay showing nearby enemy blips during objective push',
		title: 'Marvel Rivals 2D radar hack overlay',
		caption: 'Marvel Rivals cheats 2D radar showing threat positions on Windows PC',
	},
	{
		src: shot('marvel-rivals-cheats-mod-menu-windows'),
		alt: 'Marvel Rivals Cheats in-game mod menu with ESP, aimbot, and radar toggles on Windows PC',
		title: 'Marvel Rivals Cheats mod menu',
		caption: 'Marvel Rivals cheats menu toggles for ESP wallhack, soft aim, and radar',
	},
	{
		src: shot('marvel-rivals-wallhack-enemy-outlines'),
		alt: 'Marvel Rivals wallhack enemy outlines visible through walls with purple ESP boxes',
		title: 'Marvel Rivals wallhack enemy outlines',
		caption: 'Marvel Rivals wallhack ESP showing enemies through terrain and structures',
	},
	{
		src: shot('marvel-rivals-esp-distance-markers'),
		alt: 'Marvel Rivals ESP distance markers and player names above enemy heroes in match',
		title: 'Marvel Rivals ESP distance markers',
		caption: 'Marvel Rivals ESP player tags with meter readouts during 6v6 combat',
	},
	{
		src: shot('marvel-rivals-cheats-team-fight-esp'),
		alt: 'Marvel Rivals team fight with undetected ESP boxes on multiple enemy heroes',
		title: 'Marvel Rivals team fight ESP',
		caption: 'Marvel Rivals cheats ESP during a multi-hero team fight on Windows PC',
	},
	{
		src: shot('marvel-rivals-esp-objective-markers'),
		alt: 'Marvel Rivals ESP objective markers and enemy positions around payload zone',
		title: 'Marvel Rivals ESP objective markers',
		caption: 'Marvel Rivals ESP highlighting enemies near contested objectives',
	},
];

export const homeShowcaseFeatured = homeShowcaseImages[0];
