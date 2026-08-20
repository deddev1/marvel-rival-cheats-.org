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
		accent: '#E62429',
		bg: '#0A0E14',
		soft: '#F5F5F5',
		deep: '#8B0000',
		hover: '#FF4444',
		panel: '#141820',
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
				src: '/images/marvel-rivals-screenshot-01.webp',
				title: 'Marvel Rivals gameplay screenshot 1',
				caption: 'Marvel Rivals hero shooter gameplay on Windows PC',
			},
			{
				src: '/images/marvel-rivals-screenshot-02.webp',
				title: 'Marvel Rivals gameplay screenshot 2',
				caption: 'Team fight on Midtown in Marvel Rivals on Windows PC',
			},
			{
				src: '/images/marvel-rivals-screenshot-03.webp',
				title: 'Marvel Rivals gameplay screenshot 3',
				caption: 'Hero abilities and ultimates in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-04.webp',
				title: 'Marvel Rivals gameplay screenshot 4',
				caption: 'Objective zones and map control in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-05.webp',
				title: 'Marvel Rivals gameplay screenshot 5',
				caption: 'Squad pushes and team coordination in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-06.webp',
				title: 'Marvel Rivals gameplay screenshot 6',
				caption: 'Payload zone and contested objective gameplay in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-07.webp',
				title: 'Marvel Rivals gameplay screenshot 7',
				caption: '6v6 hero shooter action in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-08.webp',
				title: 'Marvel Rivals gameplay screenshot 8',
				caption: 'Hero roster and team composition in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-09.webp',
				title: 'Marvel Rivals gameplay screenshot 9',
				caption: 'Late-game team fight tactics in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-10.webp',
				title: 'Marvel Rivals gameplay screenshot 10',
				caption: 'Flanking and ability combos in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-11.webp',
				title: 'Marvel Rivals gameplay screenshot 11',
				caption: 'Urban and sci-fi maps in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-12.webp',
				title: 'Marvel Rivals gameplay screenshot 12',
				caption: 'Team survival under pressure in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-13.webp',
				title: 'Marvel Rivals gameplay screenshot 13',
				caption: 'Night and low-light matches in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-14.webp',
				title: 'Marvel Rivals gameplay screenshot 14',
				caption: 'Map traversal and positioning in Marvel Rivals',
			},
			{
				src: '/images/marvel-rivals-screenshot-15.webp',
				title: 'Marvel Rivals gameplay screenshot 15',
				caption: 'Ranked match gameplay in Marvel Rivals',
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
