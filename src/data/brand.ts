/**
 * SINGLE SOURCE OF TRUTH for template rebrands.
 * Employees: use Brand Studio at http://localhost:4321/brand-studio/ during `astro dev`.
 * Do not scatter brand strings across components.
 */
export const brand = {
	/** Public brand name (nav, footer, H1 hero, schema Organization) */
	name: 'Marvel Rivals Cheats',
	/** Short product label if needed */
	shortName: 'Marvel Rivals Cheats',
	/** Canonical origin — no trailing slash */
	url: 'https://marvelrivals.org',
	locale: 'en',
	market: 'Worldwide',
	supportEmail: 'support@marvelrivals.org',
	checkoutUrl: 'https://zadeyo.com/go/QRH?to=%2Fproducts%2Fmarvel-rivals',

	/** Game this template instance targets */
	game: 'Marvel Rivals',
	/** Official game store page — linked from the hero image */
	gameUrl: 'https://store.steampowered.com/app/2767030/Marvel_Rivals/',
	/** Anti-cheat name used in Status / FAQ copy */
	antiCheat: 'NetEase Anti-Cheat',

	logo: '/images/marvel-rivals-cheats-logo.webp',
	logoRaster: '/images/marvel-rivals-cheats-logo.png',
	logoRasterWidth: 512,
	logoRasterHeight: 512,
	logoAlt: 'Marvel Rivals Cheats logo',
	defaultOgImage: '/images/marvel-rivals-cheats-hero-1024w.webp',
	heroImage: '/images/marvel-rivals-cheats-hero-1024w.webp',

	plans: [
		{ id: 'monthly', label: 'Monthly', price: 35, duration: 'P30D' },
		{ id: 'lifetime', label: 'Lifetime', price: 150, duration: 'P99Y' },
	] as const,
	currency: 'USD',
	platforms: ['Windows PC'] as const,

	/**
	 * Site color tones — accent + canvas + soft/deep/hover/panel.
	 * Edit in Brand Studio → Colors (tones are fully customizable).
	 */
	theme: {
		accent: '#A855F7',
		bg: '#08070D',
		soft: '#C084FC',
		deep: '#7E22CE',
		hover: '#D946EF',
		panel: '#12101A',
	},

	/**
	 * Keyword system — primary drives titles; list feeds schema / light targeting.
	 */
	keywords: {
		primary: 'marvel rivals cheats',
		list: [
			'marvel rivals cheats',
			'marvel rivals hacks',
			'marvel rivals aimbot',
			'marvel rivals esp',
			'Marvel Rivals ESP',
			'Marvel Rivals Aimbot',
			'marvel rivals wallhack',
			'marvel rivals cheat',
			'undetected marvel rivals cheats',
			'best marvel rivals cheats',
		] as const,
	},

	/**
	 * Editable SEO meta — tokens: {brand} {game} {antiCheat} {email} {primaryKeyword}
	 * Aim ~50–60 chars titles, ~140–160 chars descriptions.
	 */
	seo: {
		homeTitle: 'Marvel Rivals Cheats | Undetected Aimbot, ESP & Wallhack 2026',
		homeDescription:
			'Marvel Rivals cheats for PC with aimbot, ESP and wallhack features. Explore gameplay features, pricing, setup information and the latest updates.',
		featuresTitle: '{game} Features | {brand}',
		featuresDescription: 'Everything in one {game} license for Windows PC — ESP, soft aim, radar, hero tools, and patch updates after {antiCheat}. See what is included.',
		storeTitle: '{game} Store | {brand}',
		storeDescription: 'Monthly and lifetime {game} plans for Windows PC. Same ESP, aimbot, and radar features on both. Instant delivery after payment checkout.',
		statusTitle: '{game} Status | {brand}',
		statusDescription: 'Live undetected status for {brand} after {game} or {antiCheat} patches. Check here before you queue in on Windows PC today.',
		previewTitle: 'Marvel Rivals Cheats | Undetected ESP & Aimbot',
		previewDescription: 'Buy undetected marvel rivals cheats for Marvel Rivals on Windows PC. ESP, soft aim, radar, and NetEase Anti-Cheat patch updates in one license with instant delivery.',
		setupTitle: '{game} Setup | {brand}',
		setupDescription: 'Install and launch {brand} on Windows PC after checkout. Short setup steps so you can queue in faster. Follow each step in order before your first match.',
		supportTitle: '{game} Support | {brand}',
		supportDescription: 'Get help with {brand} on Windows PC. Email {email} with your order ID for setup, delivery, or billing help after you buy.',
		faqTitle: '{game} FAQ | {brand}',
		faqDescription: 'Short answers about {brand} for Marvel Rivals — delivery, setup, {antiCheat} updates, refunds, and Windows PC system notes before you buy.',
		reviewsTitle: '{brand} Reviews | Buyer Feedback',
		reviewsDescription: 'Buyer reviews for {brand} — ESP, soft aim, radar, and patch updates for Marvel Rivals on Windows PC. Real feedback from license holders.',
		blogTitle: '{game} Intel | {brand}',
		blogDescription: 'Guides and notes for {game} — hero meta tips, ESP, aimbot, map callouts, and {antiCheat} update coverage for Windows PC players.',
	},

	/** On-page marketing copy (tokens allowed) */
	copy: {
		tagline: 'Undetected {primaryKeyword} — ESP, aimbot, and radar for PC',
		summary: '{brand} is an undetected {game} cheat package for Windows PC. Includes ESP, soft aim, and radar, with {antiCheat} maintenance after patches.',
		heroLede: 'Undetected ESP, soft aim, and radar for Marvel Rivals on Windows PC.',
		blogLabel: 'Marvel Rivals Intel',
		ctaBuy: 'Get Access',
		ctaBuyShort: 'Buy',
		featuresIntro: 'Everything included in one license for {game} on Windows PC.',
		storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
		statusIntro: 'Check here after a {game} or {antiCheat} patch before you queue in.',
		previewIntro: '{brand} for Marvel Rivals — ESP wallhack, soft aim, 2D radar, and NetEase Anti-Cheat rebuilds after patches.',
		setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
		supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
		faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
		reviewsIntro: 'Feedback from {brand} buyers — ESP, soft aim, radar, and support.',
		chipEsp: 'ESP / wallhack',
		chipAim: 'Soft aim',
		chipRadar: '2D radar',
		chipUpdates: 'Patch updates',
		navPreview: 'Hacks',
		navFeatures: 'Features',
		navStore: 'Store',
		navStatus: 'Status',
		navReviews: 'Reviews',
	},

	/**
	 * Sitemap labels — XML is generated at build/dev from routes + these strings.
	 * Domain comes from `url` (also written to robots.txt via sync:brand).
	 * Tokens: {brand} {game} {antiCheat} {email} {primaryKeyword}
	 */
	sitemap: {
		/** YYYY-MM-DD — Brand Studio can bump this on save to refresh crawl dates */
		contentLastmod: '2026-08-15',
		blogImageTitle: '{brand} blog',
		blogImageCaption: 'Tips and updates for {primaryKeyword}',
		reviewsImageTitle: '{brand} reviews',
		reviewsImageCaption: 'What buyers say about {primaryKeyword}',
		images: [
			{
				src: '/images/marvel-rivals-esp-wallhack-player-boxes.webp',
				title: 'Marvel Rivals ESP wallhack player boxes',
				caption: 'Undetected Marvel Rivals cheats ESP wallhack with player boxes and distance markers',
			},
			{
				src: '/images/marvel-rivals-esp-skeleton-through-walls.webp',
				title: 'Marvel Rivals skeleton ESP wallhack',
				caption: 'Marvel Rivals cheats skeleton ESP showing enemy heroes through walls',
			},
			{
				src: '/images/marvel-rivals-aimbot-soft-aim-fov.webp',
				title: 'Marvel Rivals soft aim FOV overlay',
				caption: 'Marvel Rivals aimbot soft aim field-of-view during ranked match gameplay',
			},
			{
				src: '/images/marvel-rivals-cheats-radar-2d-overlay.webp',
				title: 'Marvel Rivals 2D radar hack overlay',
				caption: 'Marvel Rivals cheats 2D radar showing nearby threats on Windows PC',
			},
			{
				src: '/images/marvel-rivals-wallhack-enemy-outlines.webp',
				title: 'Marvel Rivals wallhack enemy outlines',
				caption: 'Marvel Rivals wallhack ESP with enemy outlines through terrain',
			},
			{
				src: '/images/marvel-rivals-cheats-team-fight-esp.webp',
				title: 'Marvel Rivals team fight ESP',
				caption: 'Marvel Rivals cheats ESP during a multi-hero team fight',
			},
			{
				src: '/images/marvel-rivals-cheats-mod-menu-windows.webp',
				title: 'Marvel Rivals Cheats mod menu',
				caption: 'Marvel Rivals cheats menu toggles for ESP, soft aim, and radar on Windows PC',
			},
			{
				src: '/images/marvel-rivals-esp-distance-markers.webp',
				title: 'Marvel Rivals ESP distance markers',
				caption: 'Marvel Rivals ESP player tags with meter readouts in match',
			},
			{
				src: '/images/marvel-rivals-aimbot-target-lock.webp',
				title: 'Marvel Rivals aimbot target lock',
				caption: 'Undetected Marvel Rivals aimbot locking onto an enemy hero with ESP assist',
			},
			{
				src: '/images/marvel-rivals-undetected-cheats-gameplay.webp',
				title: 'Undetected Marvel Rivals cheats gameplay',
				caption: 'Undetected marvel rivals cheats package with ESP wallhack and radar active',
			},
			{
				src: '/images/marvel-rivals-cheats-match-overview.webp',
				title: 'Marvel Rivals cheats match overview',
				caption: 'Marvel Rivals cheats full-match ESP overview with multiple enemy tags',
			},
			{
				src: '/images/marvel-rivals-esp-objective-markers.webp',
				title: 'Marvel Rivals ESP objective markers',
				caption: 'Marvel Rivals ESP highlighting enemies near contested objectives',
			},
			{
				src: '/images/marvel-rivals-aimbot-sniper-view.webp',
				title: 'Marvel Rivals aimbot sniper view',
				caption: 'Marvel Rivals soft aim assist with long-range ESP on Windows PC',
			},
			{
				src: '/images/marvel-rivals-cheats-hero-combat-esp.webp',
				title: 'Marvel Rivals hero combat ESP',
				caption: 'Marvel Rivals cheats ESP and aimbot during hero ability combat',
			},
			{
				src: '/images/marvel-rivals-esp-player-names-health.webp',
				title: 'Marvel Rivals ESP player names and health',
				caption: 'Marvel Rivals ESP wallhack with hero names, health bars, and bone ESP',
			},
		],
	},
} as const;

export type Brand = typeof brand;

/** Replace {brand} {game} {antiCheat} {email} {primaryKeyword} {checkout} */
export function fillBrandTokens(input: string): string {
	return input
		.replaceAll('{brand}', brand.name)
		.replaceAll('{game}', brand.game)
		.replaceAll('{antiCheat}', brand.antiCheat)
		.replaceAll('{email}', brand.supportEmail)
		.replaceAll('{primaryKeyword}', brand.keywords.primary)
		.replaceAll('{checkout}', brand.checkoutUrl);
}

/** Locked title formula fallback: `{Game} {Topic} | {Brand}` */
export function seoTitle(topic: string): string {
	const title = `${brand.game} ${topic} | ${brand.name}`;
	return title.length <= 60 ? title : `${topic} | ${brand.name}`;
}

/** Keep descriptions short; tokens allowed. */
export function seoDescription(template: string): string {
	const text = fillBrandTokens(template).trim();
	return text.length <= 160 ? text : `${text.slice(0, 157).trim()}…`;
}

/** Resolved EN home meta from brand.seo (title clamp lives in site-core.seoPageTitle). */
export function homeSeo() {
	return {
		title: fillBrandTokens(brand.seo.homeTitle),
		description: seoDescription(brand.seo.homeDescription),
	};
}
