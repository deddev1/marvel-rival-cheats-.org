import CANNIBAL_REDIRECTS from './cannibal-redirects.json';

const CANONICAL_ORIGIN = 'https://marvelrivals.org';
const APEX_HOST = 'marvelrivals.org';
const WWW_HOST = 'www.marvelrivals.org';

/** Legacy domains → canonical apex (301). */
const LEGACY_HOSTS = new Set([
	'marathoncheats.org',
	'www.marathoncheats.org',
	'marathoncheat.org',
	'www.marathoncheat.org',
	'bestmarathoncheats.com',
	'www.bestmarathoncheats.com',
	'fortnitehack.net',
	'www.fortnitehack.net',
	'fortnitecheats.xyz',
	'www.fortnitecheats.xyz',
	'fortnitecheats.net',
	'www.fortnitecheats.net',
	'fortnitecheats.com',
	'www.fortnitecheats.com',
	'warzonehacks.net',
	'www.warzonehacks.net',
	'warzonescheats.net',
	'www.warzonescheats.net',
	'warzonescheats.com',
	'www.warzonescheats.com',
	'warzonescheats.xyz',
	'www.warzonescheats.xyz',
]);

// Keep in sync with public/_redirects (which preserves query strings by default, as we do below).
const PATH_REDIRECTS = {
	'/sitemap-0.xml': '/sitemap.xml',
	'/sitemap-index.xml': '/sitemap.xml',
	'/sitemap.xml/': '/sitemap.xml',
	'/sitemap-en.xml/': '/sitemap-en.xml',
	'/sitemap-i18n.xml/': '/sitemap-i18n.xml',
	'/sitemap-images.xml/': '/sitemap-images.xml',
	// Exact-match keyword → homepage (primary money URL)
	'/marvel-rivals-cheats': '/',
	'/marvel-rivals-cheats/': '/',
	'/marvel-rivals-hacks': '/',
	'/marvel-rivals-cheats/': '/',
	// Cannibalization → homepage (money URL = /)
	'/marvel-rivals-esp-hack': '/marvel-rivals-esp/',
	'/marvel-rivals-esp-hack/': '/marvel-rivals-esp/',
	'/marvel-rivals-aimbot-hack': '/marvel-rivals-aimbot/',
	'/marvel-rivals-aimbot-hack/': '/marvel-rivals-aimbot/',
	'/best-marvel-rivals-cheats': '/',
	'/best-marvel-rivals-cheats/': '/',
	'/marvel-rivals-cheats-2026': '/',
	'/marvel-rivals-cheats-2026/': '/',
	'/undetected-marvel-rivals-cheats': '/',
	'/undetected-marvel-rivals-cheats/': '/',
	'/marvel-rivals-mod-menu': '/',
	'/marvel-rivals-mod-menu/': '/',
	'/marvel-rivals-unlock-all': '/',
	'/marvel-rivals-unlock-all/': '/',
	'/marvel-rivals-soft-aim': '/marvel-rivals-aimbot/',
	'/marvel-rivals-soft-aim/': '/marvel-rivals-aimbot/',
	'/marvel-rivals-wallhack': '/marvel-rivals-esp/',
	'/marvel-rivals-wallhack/': '/marvel-rivals-esp/',
	'/marvel-rivals-cheat-download': '/setup/',
	'/marvel-rivals-cheat-download/': '/setup/',
	'/neac-bypass': '/updates/',
	'/neac-bypass/': '/updates/',
	'/warzone-cheats': '/',
	'/warzone-cheats/': '/',
	'/warzone-hacks': '/',
	'/warzone-hacks/': '/',
	'/warzone-esp': '/marvel-rivals-esp/',
	'/warzone-esp/': '/marvel-rivals-esp/',
	'/warzone-aimbot': '/marvel-rivals-aimbot/',
	'/warzone-aimbot/': '/marvel-rivals-aimbot/',
	'/ricochet-bypass': '/updates/',
	'/ricochet-bypass/': '/updates/',
	'/fortnite-aimbot': '/marvel-rivals-aimbot/',
	'/fortnite-aimbot/': '/marvel-rivals-aimbot/',
	'/fortnite-esp': '/marvel-rivals-esp/',
	'/fortnite-esp/': '/marvel-rivals-esp/',
	'/fortnite-hacks': '/',
	'/fortnite-hacks/': '/',
	'/neac-bypass': '/updates/',
	'/neac-bypass/': '/updates/',
	'/neac-bypass-fortnite': '/updates/',
	'/neac-bypass-fortnite/': '/updates/',
	'/blog/patch-notes-buffs-nerfs-vaults': '/blog/marvel-rivals-patch-notes-guide/',
	'/blog/patch-notes-buffs-nerfs-vaults/': '/blog/marvel-rivals-patch-notes-guide/',
	'/blog/chapter-7-season-3-skin-leaks-vbucks': '/blog/marvel-rivals-skin-leaks-guide/',
	'/blog/chapter-7-season-3-skin-leaks-vbucks/': '/blog/marvel-rivals-skin-leaks-guide/',
	'/blog/hammer-ar-s-tier-data-analysis': '/blog/marvel-rivals-dinosaur-tier-list/',
	'/blog/hammer-ar-s-tier-data-analysis/': '/blog/marvel-rivals-dinosaur-tier-list/',
	'/blog/zero-build-meta-broken-aggressive-strategies': '/blog/marvel-rivals-growth-run-aggressive-strategies/',
	'/blog/zero-build-meta-broken-aggressive-strategies/': '/blog/marvel-rivals-growth-run-aggressive-strategies/',
	'/blog/fncs-meta-watch-community-event-drops': '/blog/marvel-rivals-competitive-meta-guide/',
	'/blog/fncs-meta-watch-community-event-drops/': '/blog/marvel-rivals-competitive-meta-guide/',
	'/blog/secret-loot-routes-full-gold': '/blog/marvel-rivals-map-callouts-guide/',
	'/blog/secret-loot-routes-full-gold/': '/blog/marvel-rivals-map-callouts-guide/',
	'/blog/bugha-settings-pro-setup': '/blog/marvel-rivals-pro-settings-guide/',
	'/blog/bugha-settings-pro-setup/': '/blog/marvel-rivals-pro-settings-guide/',
	'/blog/creative-warmup-maps-pros-use': '/blog/marvel-rivals-warmup-practice-ranked/',
	'/blog/creative-warmup-maps-pros-use/': '/blog/marvel-rivals-warmup-practice-ranked/',
	'/reviews/marvel-rivals-esp-zero-build-review-buildsr4k': '/reviews/marvel-rivals-esp-growth-run-review-buildsr4k/',
	'/reviews/marvel-rivals-esp-zero-build-review-buildsr4k/': '/reviews/marvel-rivals-esp-growth-run-review-buildsr4k/',
	'/reviews/marvel-rivals-radar-hack-review-vanlifefn': '/reviews/marvel-rivals-radar-hack-review-vanlifemarvelrivals/',
	'/reviews/marvel-rivals-radar-hack-review-vanlifefn/': '/reviews/marvel-rivals-radar-hack-review-vanlifemarvelrivals/',
	'/reviews/marvel-rivals-radar-hack-review-vanlifewz': '/reviews/marvel-rivals-radar-hack-review-vanlifemarvelrivals/',
	'/reviews/marvel-rivals-radar-hack-review-vanlifewz/': '/reviews/marvel-rivals-radar-hack-review-vanlifemarvelrivals/',
	'/reviews/marvel-rivals-controller-soft-aim-review-ctrl-player99': '/reviews/marvel-rivals-soft-aim-review-ctrl-player99/',
	'/reviews/marvel-rivals-controller-soft-aim-review-ctrl-player99/': '/reviews/marvel-rivals-soft-aim-review-ctrl-player99/',
};

const SECURITY_HEADERS = {
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-Frame-Options': 'DENY',
	'Cross-Origin-Opener-Policy': 'same-origin',
	'Cross-Origin-Resource-Policy': 'same-origin',
	'Cross-Origin-Embedder-Policy': 'credentialless',
	'Origin-Agent-Cluster': '?1',
	'Permissions-Policy':
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
	'Content-Security-Policy': [
		"default-src 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		"form-action 'self' https://zadeyo.com",
		"img-src 'self' data: blob: https:",
		"media-src 'self' https: blob:",
		"font-src 'self' data:",
		"style-src 'self' 'unsafe-inline'",
		"script-src 'self'",
		"connect-src 'self'",
		"upgrade-insecure-requests",
		"trusted-types default",
		"require-trusted-types-for 'script'",
	].join('; '),
};

function getClientProtocol(request) {
	const visitor = request.headers.get('cf-visitor');
	if (visitor) {
		try {
			const scheme = JSON.parse(visitor).scheme;
			if (scheme) return String(scheme).toLowerCase();
		} catch {
			// ignore malformed cf-visitor
		}
	}

	const forwarded = request.headers.get('x-forwarded-proto');
	if (forwarded) {
		return forwarded.split(',')[0].trim().toLowerCase();
	}

	return new URL(request.url).protocol.replace(':', '').toLowerCase();
}

function applySecurityHeaders(headers, { html = false } = {}) {
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(key, value);
	}

	if (html) {
		const contentType = headers.get('Content-Type') || '';
		if (!/charset=/i.test(contentType)) {
			headers.set('Content-Type', 'text/html; charset=utf-8');
		}
		// Browser always revalidates; Cloudflare edge caches briefly for TTFB.
		headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		headers.set('CDN-Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
		headers.set('Cloudflare-CDN-Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
	}
}

/** Flat .xml sitemaps — redirect any other *.xml/ trailing-slash URL (locale sitemaps). */
function xmlTrailingSlashRedirect(pathname) {
	if (!pathname.endsWith('.xml/')) return null;
	return pathname.slice(0, -1);
}

/** Add trailing slash for directory-style paths (matches Astro trailingSlash: 'always'). */
function trailingSlashRedirect(pathname) {
	if (!pathname || pathname === '/' || pathname.includes('.') || pathname.endsWith('/')) {
		return null;
	}
	return `${pathname}/`;
}

export async function onRequest(context) {
	const url = new URL(context.request.url);
	const host = url.hostname.toLowerCase();
	const proto = getClientProtocol(context.request);

	const isLegacyHost = LEGACY_HOSTS.has(host);
	const isProductionHost = host === APEX_HOST || host === WWW_HOST || isLegacyHost;
	const needsHostRedirect = host === WWW_HOST || isLegacyHost;
	const needsHttpsRedirect = isProductionHost && proto === 'http';

	if (needsHostRedirect || needsHttpsRedirect) {
		const mappedPath = PATH_REDIRECTS[url.pathname] ?? url.pathname;
		const target = new URL(mappedPath + url.search, CANONICAL_ORIGIN);
		const headers = new Headers({
			Location: target.toString(),
			'Cache-Control': 'no-store',
			'CDN-Cache-Control': 'no-store',
			'Cloudflare-CDN-Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 301, headers });
	}

	const pathRedirect =
		PATH_REDIRECTS[url.pathname] ??
		CANNIBAL_REDIRECTS[url.pathname] ??
		xmlTrailingSlashRedirect(url.pathname) ??
		trailingSlashRedirect(url.pathname);
	if (pathRedirect) {
		const headers = new Headers({
			Location: new URL(pathRedirect + url.search, CANONICAL_ORIGIN).toString(),
			'Cache-Control': 'no-store',
		});
		applySecurityHeaders(headers);
		return new Response(null, { status: 301, headers });
	}

	const response = await context.next();
	const headers = new Headers(response.headers);
	const contentType = headers.get('Content-Type') || '';
	const isHtml = contentType.includes('text/html');
	const isImmutableAsset = /\.(?:webp|png|jpe?g|gif|svg|ico|woff2?|ttf|eot)$/i.test(url.pathname);

	if (isImmutableAsset) {
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
		headers.set('CDN-Cache-Control', 'public, s-maxage=31536000, immutable');
		headers.set('Cloudflare-CDN-Cache-Control', 'public, s-maxage=31536000, immutable');
	}

	applySecurityHeaders(headers, { html: isHtml });

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
