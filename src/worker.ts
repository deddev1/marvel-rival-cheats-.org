/**
 * Cloudflare Worker — canonical host + path redirects before static assets.
 * Locale cannibal 301s live in functions/cannibal-redirects.json (not _redirects)
 * to stay under Cloudflare's 100 dynamic _redirects rule limit.
 */
import { applySecurityHeaders } from './lib/security-headers.js';
import { isBrandStudioPath, resolvePathRedirect } from './worker-redirects.js';

export interface Env {
	ASSETS: Fetcher;
}

const CANONICAL_ORIGIN = 'https://marvelrivals.org';
const CANONICAL_HOST = 'marvelrivals.org';
const WWW_HOST = `www.${CANONICAL_HOST}`;

const LEGACY_HOSTS = new Set([
	'marathoncheats.org',
	'www.marathoncheats.org',
	'marathoncheat.org',
	'www.marathoncheat.org',
	'bestmarathoncheats.com',
	'www.bestmarathoncheats.com',
	'theislehacks.org',
	'www.theislehacks.org',
	'theislehack.org',
	'www.theislehack.org',
	'bestislecheats.com',
	'www.bestislecheats.com',
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

/** /sitemap.xml and /sitemap-*.xml — must stay application/xml for Google Search Console. */
const SITEMAP_PATH = /^\/sitemap(?:-[a-z0-9-]+)?\.xml$/;

function isSitemapPath(pathname: string): boolean {
	return SITEMAP_PATH.test(pathname);
}

function isInsecureRequest(request: Request, url: URL): boolean {
	const forwarded = request.headers.get('X-Forwarded-Proto');
	if (forwarded) {
		return forwarded.split(',')[0]?.trim().toLowerCase() !== 'https';
	}
	const cfVisitor = request.headers.get('CF-Visitor');
	if (cfVisitor?.includes('"scheme":"https"')) {
		return false;
	}
	return url.protocol === 'http:';
}

function redirectResponse(target: string, status = 301): Response {
	const headers = new Headers({
		Location: target,
		'Cache-Control': 'no-store',
		'CDN-Cache-Control': 'no-store',
		'Cloudflare-CDN-Cache-Control': 'no-store',
	});
	applySecurityHeaders(headers);
	return new Response(null, { status, headers });
}

function canonicalHostRedirect(request: Request, url: URL): Response | null {
	const host = (request.headers.get('host') || url.hostname).split(':')[0].toLowerCase();
	const isLegacy = LEGACY_HOSTS.has(host);
	const isWww = host === WWW_HOST || url.hostname === WWW_HOST;
	const isHttp = isInsecureRequest(request, url);

	if (!isLegacy && !isWww && !isHttp) return null;

	const mappedPath = resolvePathRedirect(url.pathname) ?? url.pathname;
	const target = new URL(mappedPath + url.search, CANONICAL_ORIGIN);
	return redirectResponse(target.toString());
}

async function fetchSitemapAsset(env: Env, request: Request): Promise<Response> {
	if (!env.ASSETS) {
		const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
		applySecurityHeaders(headers, { html: false });
		return new Response('Assets binding unavailable', { status: 503, headers });
	}

	try {
		// Use the incoming request so the ASSETS binding resolves the same pathname.
		const response = await env.ASSETS.fetch(request);
		const upstreamType = response.headers.get('Content-Type') || '';

		if (!response.ok || upstreamType.includes('text/html')) {
			const headers = new Headers();
			headers.set('Content-Type', 'text/plain; charset=utf-8');
			applySecurityHeaders(headers, { html: false });
			return new Response('Sitemap not found', { status: 404, headers });
		}

		const headers = new Headers();
		headers.set('Content-Type', 'application/xml; charset=utf-8');
		headers.set('Cache-Control', 'public, max-age=3600');
		applySecurityHeaders(headers, { html: false });
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	} catch {
		const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
		applySecurityHeaders(headers, { html: false });
		return new Response('Sitemap fetch failed', { status: 500, headers });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		const hostRedirect = canonicalHostRedirect(request, url);
		if (hostRedirect) return hostRedirect;

		if (isBrandStudioPath(url.pathname)) {
			const headers = new Headers({
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-store',
				'X-Robots-Tag': 'noindex, nofollow',
			});
			applySecurityHeaders(headers, { html: false });
			return new Response('Not Found', { status: 404, headers });
		}

		const pathRedirect = resolvePathRedirect(url.pathname);
		if (pathRedirect) {
			const target = new URL(pathRedirect + url.search, CANONICAL_ORIGIN);
			return redirectResponse(target.toString());
		}

		if (isSitemapPath(url.pathname)) {
			return fetchSitemapAsset(env, request);
		}

		if (!env.ASSETS) {
			const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
			applySecurityHeaders(headers, { html: false });
			return new Response('Assets binding unavailable', { status: 503, headers });
		}

		try {
			const response = await env.ASSETS.fetch(request);
			const headers = new Headers(response.headers);
			const contentType = headers.get('Content-Type') || '';
			const isHtml = contentType.includes('text/html');
			applySecurityHeaders(headers, { html: isHtml });

			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers,
			});
		} catch {
			const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
			applySecurityHeaders(headers, { html: false });
			return new Response('Internal error', { status: 500, headers });
		}
	},
};
