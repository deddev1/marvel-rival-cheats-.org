# Marvel Rivals Cheats — Marketing Site

Static Astro 7 site for [marvelrivals.org](https://marvelrivals.org). Primary SEO keyword: **marvel rivals cheats** (secondary: marvel rivals hacks, marvel rivals aimbot, marvel rivals ESP).

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- 22-locale i18n (English at root, `/es/`, `/fr/`, …)
- Cloudflare Workers deployment with `src/worker.ts`

## Quick start

**On your own PC (real localhost):**

```bash
npm install
npm run localhost
# open http://localhost:8080
```

Or use the helper script:

```bash
./scripts/start-localhost.sh
```

**Dev mode with hot reload:**

```bash
npm install
npm run generate:i18n   # after editing scripts/i18n-data/*
node scripts/generate-blog-posts.mjs
npm run dev           # http://localhost:4321
```

Build and validate sitemaps:

```bash
npm run build:validate
```

## Deploy (Cloudflare Workers)

1. Create a Cloudflare Workers project named **marvelrivals**
2. Connect this repo or upload `dist/` after `npm run build`
3. Build command: `npm run build`
4. Custom domains: **marvelrivals.org** (apex) and **www.marvelrivals.org** (redirect → apex)
5. Enable SSL **Always Use HTTPS**

CLI deploy:

```bash
npm run deploy
```

## Environment

- Node.js >= 22.12.0
- Checkout URL: Zadeyo Marvel Rivals product (`siteConfig.checkoutUrl` in `src/data/site.ts`)

## License

Private — for marvelrivals.org deployment only.
