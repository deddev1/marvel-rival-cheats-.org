import { siteConfig } from '../site';
import {
	defaultLocale,
	isLocaleCode,
	localeCodes,
	localeMap,
	type LocaleCode,
	locales,
} from './locales';
import { getCannibalTargetId, isCannibalPageId } from '../seo-cannibal-map';

/** Canonical page identifiers shared across all locales. */
export type PageId =
	| 'home'
	| 'marvel-rivals-esp'
	| 'marvel-rivals-aimbot'
	| 'features'
	| 'pricing'
	| 'setup'
	| 'updates'
	| 'faq'
	| 'support'
	| 'undetected'
	| 'wallhack'
	| 'radar'
	| 'neac'
	| 'cheats-2026'
	| 'hacks'
	| 'cheat-download'
	| 'mod-menu'
	| 'soft-aim'
	| 'best-cheats'
	| 'aimbot-hack'
	| 'esp-hack'
	| 'unlock-all'
	| 'privacy'
	| 'refund'
	| 'terms';

/** English (official) paths — served at site root without /en/ prefix. */
export const englishPaths: Record<PageId, string> = {
	home: '/',
	'marvel-rivals-esp': '/marvel-rivals-esp/',
	'marvel-rivals-aimbot': '/marvel-rivals-aimbot/',
	features: '/features/',
	pricing: '/pricing/',
	setup: '/setup/',
	updates: '/updates/',
	faq: '/faq/',
	support: '/support/',
	undetected: '/undetected-marvel-rivals-cheats/',
	wallhack: '/marvel-rivals-wallhack/',
	radar: '/marvel-rivals-radar-hack/',
	'neac': '/neac-bypass/',
	'cheats-2026': '/marvel-rivals-cheats-2026/',
	hacks: '/marvel-rivals-cheats/',
	'cheat-download': '/marvel-rivals-cheat-download/',
	'mod-menu': '/marvel-rivals-mod-menu/',
	'soft-aim': '/marvel-rivals-soft-aim/',
	'best-cheats': '/best-marvel-rivals-cheats/',
	'aimbot-hack': '/marvel-rivals-aimbot-hack/',
	'esp-hack': '/marvel-rivals-esp-hack/',
	'unlock-all': '/marvel-rivals-unlock-all/',
	privacy: '/privacy-policy/',
	refund: '/refund-policy/',
	terms: '/terms/',
};

/**
 * Localized URL slugs (path after /{lang}/).
 * English uses englishPaths at root; other locales use these slugs under /{lang}/.
 */
export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {
	home: {
		en: '',
		es: '',
		fr: '',
		de: '',
		pt: '',
		it: '',
		nl: '',
		pl: '',
		ru: '',
		tr: '',
		ar: '',
		ja: '',
		ko: '',
		zh: '',
		hi: '',
		id: '',
		th: '',
		vi: '',
		uk: '',
		cs: '',
		ro: '',
		sv: '',
	},
	'marvel-rivals-esp': {
		en: 'marvel-rivals-esp',
		es: 'trucos-marvel-rivals-esp',
		fr: 'triche-marvel-rivals-esp',
		de: 'marvel-rivals-esp-wallhack',
		pt: 'cheats-marvel-rivals-esp',
		it: 'trucchi-marvel-rivals-esp',
		nl: 'marvel-rivals-esp-wallhack',
		pl: 'cheaty-marvel-rivals-esp',
		ru: 'marvel-rivals-esp-chity',
		tr: 'marvel-rivals-esp-hile',
		ar: 'marvel-rivals-esp-wallhack',
		ja: 'marvel-rivals-esp-wallhack',
		ko: 'marvel-rivals-esp-wallhack',
		zh: 'marvel-rivals-esp-wallhack',
		hi: 'marvel-rivals-esp-wallhack',
		id: 'marvel-rivals-esp-wallhack',
		th: 'marvel-rivals-esp-wallhack',
		vi: 'marvel-rivals-esp-wallhack',
		uk: 'marvel-rivals-esp-chity',
		cs: 'marvel-rivals-esp-wallhack',
		ro: 'marvel-rivals-esp-wallhack',
		sv: 'marvel-rivals-esp-wallhack',
	},
	'marvel-rivals-aimbot': {
		en: 'marvel-rivals-aimbot',
		es: 'trucos-marvel-rivals-aimbot',
		fr: 'triche-marvel-rivals-aimbot',
		de: 'marvel-rivals-aimbot',
		pt: 'cheats-marvel-rivals-aimbot',
		it: 'trucchi-marvel-rivals-aimbot',
		nl: 'marvel-rivals-aimbot',
		pl: 'cheaty-marvel-rivals-aimbot',
		ru: 'marvel-rivals-aimbot-chity',
		tr: 'marvel-rivals-aimbot-hile',
		ar: 'marvel-rivals-aimbot',
		ja: 'marvel-rivals-aimbot',
		ko: 'marvel-rivals-aimbot',
		zh: 'marvel-rivals-aimbot',
		hi: 'marvel-rivals-aimbot',
		id: 'marvel-rivals-aimbot',
		th: 'marvel-rivals-aimbot',
		vi: 'marvel-rivals-aimbot',
		uk: 'marvel-rivals-aimbot-chity',
		cs: 'marvel-rivals-aimbot',
		ro: 'marvel-rivals-aimbot',
		sv: 'marvel-rivals-aimbot',
	},
	features: {
		en: 'features',
		es: 'caracteristicas-trucos-marvel-rivals',
		fr: 'fonctionnalites-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-funktionen',
		pt: 'recursos-cheats-marvel-rivals',
		it: 'funzioni-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-functies',
		pl: 'funkcje-cheatow-marvel-rivals',
		ru: 'funkcii-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-ozellikleri',
		ar: 'marvel-rivals-cheats-features',
		ja: 'marvel-rivals-cheats-features',
		ko: 'marvel-rivals-cheats-features',
		zh: 'marvel-rivals-cheats-features',
		hi: 'marvel-rivals-cheats-features',
		id: 'marvel-rivals-cheats-features',
		th: 'marvel-rivals-cheats-features',
		vi: 'marvel-rivals-cheats-features',
		uk: 'funkcii-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-funkce',
		ro: 'functii-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-funktioner',
	},
	pricing: {
		en: 'pricing',
		es: 'precios-trucos-marvel-rivals',
		fr: 'prix-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-preise',
		pt: 'precos-cheats-marvel-rivals',
		it: 'prezzi-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-prijzen',
		pl: 'ceny-cheatow-marvel-rivals',
		ru: 'ceny-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-fiyatlari',
		ar: 'marvel-rivals-cheats-pricing',
		ja: 'marvel-rivals-cheats-pricing',
		ko: 'marvel-rivals-cheats-pricing',
		zh: 'marvel-rivals-cheats-pricing',
		hi: 'marvel-rivals-cheats-pricing',
		id: 'marvel-rivals-cheats-pricing',
		th: 'marvel-rivals-cheats-pricing',
		vi: 'marvel-rivals-cheats-pricing',
		uk: 'ciny-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-ceny',
		ro: 'preturi-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-priser',
	},
	setup: {
		en: 'setup',
		es: 'instalacion-trucos-marvel-rivals',
		fr: 'installation-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-installation',
		pt: 'instalacao-cheats-marvel-rivals',
		it: 'installazione-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-installatie',
		pl: 'instalacja-cheatow-marvel-rivals',
		ru: 'ustanovka-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-kurulum',
		ar: 'marvel-rivals-cheats-setup',
		ja: 'marvel-rivals-cheats-setup',
		ko: 'marvel-rivals-cheats-setup',
		zh: 'marvel-rivals-cheats-setup',
		hi: 'marvel-rivals-cheats-setup',
		id: 'marvel-rivals-cheats-setup',
		th: 'marvel-rivals-cheats-setup',
		vi: 'marvel-rivals-cheats-setup',
		uk: 'vstanovka-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-instalace',
		ro: 'instalare-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-installation',
	},
	updates: {
		en: 'updates',
		es: 'actualizaciones-trucos-marvel-rivals',
		fr: 'mises-a-jour-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-updates',
		pt: 'atualizacoes-cheats-marvel-rivals',
		it: 'aggiornamenti-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-updates',
		pl: 'aktualizacje-cheatow-marvel-rivals',
		ru: 'obnovleniya-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-guncellemeleri',
		ar: 'marvel-rivals-cheats-updates',
		ja: 'marvel-rivals-cheats-updates',
		ko: 'marvel-rivals-cheats-updates',
		zh: 'marvel-rivals-cheats-updates',
		hi: 'marvel-rivals-cheats-updates',
		id: 'marvel-rivals-cheats-updates',
		th: 'marvel-rivals-cheats-updates',
		vi: 'marvel-rivals-cheats-updates',
		uk: 'onovlennya-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-aktualizace',
		ro: 'actualizari-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-uppdateringar',
	},
	faq: {
		en: 'faq',
		es: 'preguntas-trucos-marvel-rivals',
		fr: 'faq-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-faq',
		pt: 'faq-cheats-marvel-rivals',
		it: 'faq-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-faq',
		pl: 'faq-cheatow-marvel-rivals',
		ru: 'faq-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-sss',
		ar: 'marvel-rivals-cheats-faq',
		ja: 'marvel-rivals-cheats-faq',
		ko: 'marvel-rivals-cheats-faq',
		zh: 'marvel-rivals-cheats-faq',
		hi: 'marvel-rivals-cheats-faq',
		id: 'marvel-rivals-cheats-faq',
		th: 'marvel-rivals-cheats-faq',
		vi: 'marvel-rivals-cheats-faq',
		uk: 'faq-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-faq',
		ro: 'faq-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-faq',
	},
	support: {
		en: 'support',
		es: 'soporte-trucos-marvel-rivals',
		fr: 'support-triche-marvel-rivals',
		de: 'marvel-rivals-cheats-support',
		pt: 'suporte-cheats-marvel-rivals',
		it: 'supporto-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats-support',
		pl: 'wsparcie-cheatow-marvel-rivals',
		ru: 'podderzhka-chitov-marvel-rivals',
		tr: 'marvel-rivals-hile-destek',
		ar: 'marvel-rivals-cheats-support',
		ja: 'marvel-rivals-cheats-support',
		ko: 'marvel-rivals-cheats-support',
		zh: 'marvel-rivals-cheats-support',
		hi: 'marvel-rivals-cheats-support',
		id: 'marvel-rivals-cheats-support',
		th: 'marvel-rivals-cheats-support',
		vi: 'marvel-rivals-cheats-support',
		uk: 'pidtrymka-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheats-podpora',
		ro: 'suport-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats-support',
	},
	undetected: {
		en: 'undetected-marvel-rivals-cheats',
		es: 'trucos-marvel-rivals-indetectables',
		fr: 'triche-marvel-rivals-indetectable',
		de: 'unentdeckte-marvel-rivals-cheats',
		pt: 'cheats-marvel-rivals-indetectaveis',
		it: 'trucchi-marvel-rivals-indetectabili',
		nl: 'undetected-marvel-rivals-cheats',
		pl: 'niewykrywalne-cheats-marvel-rivals',
		ru: 'nedecektiruemye-chity-marvel-rivals',
		tr: 'tespit-edilemeyen-marvel-rivals-hileleri',
		ar: 'undetected-marvel-rivals-cheats',
		ja: 'undetected-marvel-rivals-cheats',
		ko: 'undetected-marvel-rivals-cheats',
		zh: 'undetected-marvel-rivals-cheats',
		hi: 'undetected-marvel-rivals-cheats',
		id: 'undetected-marvel-rivals-cheats',
		th: 'undetected-marvel-rivals-cheats',
		vi: 'undetected-marvel-rivals-cheats',
		uk: 'nedecektovani-chity-marvel-rivals',
		cs: 'undetected-marvel-rivals-cheats',
		ro: 'cheats-marvel-rivals-nedetectabile',
		sv: 'undetected-marvel-rivals-cheats',
	},
	wallhack: {
		en: 'marvel-rivals-wallhack',
		es: 'wallhack-trucos-marvel-rivals',
		fr: 'wallhack-triche-marvel-rivals',
		de: 'marvel-rivals-wallhack',
		pt: 'wallhack-cheats-marvel-rivals',
		it: 'wallhack-trucchi-marvel-rivals',
		nl: 'marvel-rivals-wallhack',
		pl: 'wallhack-cheatow-marvel-rivals',
		ru: 'wallhack-chity-marvel-rivals',
		tr: 'marvel-rivals-wallhack-hile',
		ar: 'marvel-rivals-wallhack',
		ja: 'marvel-rivals-wallhack',
		ko: 'marvel-rivals-wallhack',
		zh: 'marvel-rivals-wallhack',
		hi: 'marvel-rivals-wallhack',
		id: 'marvel-rivals-wallhack',
		th: 'marvel-rivals-wallhack',
		vi: 'marvel-rivals-wallhack',
		uk: 'wallhack-chity-marvel-rivals',
		cs: 'marvel-rivals-wallhack',
		ro: 'wallhack-cheats-marvel-rivals',
		sv: 'marvel-rivals-wallhack',
	},
	radar: {
		en: 'marvel-rivals-radar-hack',
		es: 'radar-hack-trucos-marvel-rivals',
		fr: 'radar-hack-triche-marvel-rivals',
		de: 'marvel-rivals-radar-hack',
		pt: 'radar-hack-cheats-marvel-rivals',
		it: 'radar-hack-trucchi-marvel-rivals',
		nl: 'marvel-rivals-radar-hack',
		pl: 'radar-hack-cheatow-marvel-rivals',
		ru: 'radar-hack-chity-marvel-rivals',
		tr: 'marvel-rivals-radar-hack',
		ar: 'marvel-rivals-radar-hack',
		ja: 'marvel-rivals-radar-hack',
		ko: 'marvel-rivals-radar-hack',
		zh: 'marvel-rivals-radar-hack',
		hi: 'marvel-rivals-radar-hack',
		id: 'marvel-rivals-radar-hack',
		th: 'marvel-rivals-radar-hack',
		vi: 'marvel-rivals-radar-hack',
		uk: 'radar-hack-chity-marvel-rivals',
		cs: 'marvel-rivals-radar-hack',
		ro: 'radar-hack-cheats-marvel-rivals',
		sv: 'marvel-rivals-radar-hack',
	},
	'neac': {
		en: 'neac-bypass',
		es: 'neac-bypass-trucos',
		fr: 'neac-bypass-triche',
		de: 'neac-bypass',
		pt: 'neac-bypass-cheats',
		it: 'neac-bypass-trucchi',
		nl: 'neac-bypass',
		pl: 'neac-bypass-cheatow',
		ru: 'neac-bypass-chity',
		tr: 'neac-bypass',
		ar: 'neac-bypass',
		ja: 'neac-bypass',
		ko: 'neac-bypass',
		zh: 'neac-bypass',
		hi: 'neac-bypass',
		id: 'neac-bypass',
		th: 'neac-bypass',
		vi: 'neac-bypass',
		uk: 'neac-bypass-chity',
		cs: 'neac-bypass',
		ro: 'neac-bypass-cheats',
		sv: 'neac-bypass',
	},
	'cheats-2026': {
		en: 'marvel-rivals-cheats-2026',
		es: 'trucos-marvel-rivals-2026',
		fr: 'triche-marvel-rivals-2026',
		de: 'marvel-rivals-cheats-2026',
		pt: 'cheats-marvel-rivals-2026',
		it: 'trucchi-marvel-rivals-2026',
		nl: 'marvel-rivals-cheats-2026',
		pl: 'cheaty-marvel-rivals-2026',
		ru: 'chity-marvel-rivals-2026',
		tr: 'marvel-rivals-hileleri-2026',
		ar: 'marvel-rivals-cheats-2026',
		ja: 'marvel-rivals-cheats-2026',
		ko: 'marvel-rivals-cheats-2026',
		zh: 'marvel-rivals-cheats-2026',
		hi: 'marvel-rivals-cheats-2026',
		id: 'marvel-rivals-cheats-2026',
		th: 'marvel-rivals-cheats-2026',
		vi: 'marvel-rivals-cheats-2026',
		uk: 'chity-marvel-rivals-2026',
		cs: 'marvel-rivals-cheats-2026',
		ro: 'cheats-marvel-rivals-2026',
		sv: 'marvel-rivals-cheats-2026',
	},
	hacks: {
		en: 'marvel-rivals-cheats',
		es: 'hacks-trucos-marvel-rivals',
		fr: 'hacks-triche-marvel-rivals',
		de: 'marvel-rivals-cheats',
		pt: 'hacks-cheats-marvel-rivals',
		it: 'hacks-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheats',
		pl: 'hacks-cheatow-marvel-rivals',
		ru: 'haksy-chity-marvel-rivals',
		tr: 'marvel-rivals-hile-hacks',
		ar: 'marvel-rivals-cheats',
		ja: 'marvel-rivals-cheats',
		ko: 'marvel-rivals-cheats',
		zh: 'marvel-rivals-cheats',
		hi: 'marvel-rivals-cheats',
		id: 'marvel-rivals-cheats',
		th: 'marvel-rivals-cheats',
		vi: 'marvel-rivals-cheats',
		uk: 'haksy-chity-marvel-rivals',
		cs: 'marvel-rivals-cheats',
		ro: 'hacks-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheats',
	},
	'cheat-download': {
		en: 'marvel-rivals-cheat-download',
		es: 'descarga-trucos-marvel-rivals',
		fr: 'telechargement-triche-marvel-rivals',
		de: 'marvel-rivals-cheat-download',
		pt: 'download-cheats-marvel-rivals',
		it: 'download-trucchi-marvel-rivals',
		nl: 'marvel-rivals-cheat-download',
		pl: 'pobieranie-cheatow-marvel-rivals',
		ru: 'skachat-chity-marvel-rivals',
		tr: 'marvel-rivals-hile-indir',
		ar: 'marvel-rivals-cheat-download',
		ja: 'marvel-rivals-cheat-download',
		ko: 'marvel-rivals-cheat-download',
		zh: 'marvel-rivals-cheat-download',
		hi: 'marvel-rivals-cheat-download',
		id: 'marvel-rivals-cheat-download',
		th: 'marvel-rivals-cheat-download',
		vi: 'marvel-rivals-cheat-download',
		uk: 'zavantazhennya-chitiv-marvel-rivals',
		cs: 'marvel-rivals-cheat-download',
		ro: 'descarcare-cheats-marvel-rivals',
		sv: 'marvel-rivals-cheat-download',
	},
	'mod-menu': {
		en: 'marvel-rivals-mod-menu',
		es: 'menu-mod-trucos-marvel-rivals',
		fr: 'menu-mod-triche-marvel-rivals',
		de: 'marvel-rivals-mod-menu',
		pt: 'menu-mod-cheats-marvel-rivals',
		it: 'menu-mod-trucchi-marvel-rivals',
		nl: 'marvel-rivals-mod-menu',
		pl: 'menu-mod-cheatow-marvel-rivals',
		ru: 'mod-menu-chity-marvel-rivals',
		tr: 'marvel-rivals-mod-menu',
		ar: 'marvel-rivals-mod-menu',
		ja: 'marvel-rivals-mod-menu',
		ko: 'marvel-rivals-mod-menu',
		zh: 'marvel-rivals-mod-menu',
		hi: 'marvel-rivals-mod-menu',
		id: 'marvel-rivals-mod-menu',
		th: 'marvel-rivals-mod-menu',
		vi: 'marvel-rivals-mod-menu',
		uk: 'mod-menu-chity-marvel-rivals',
		cs: 'marvel-rivals-mod-menu',
		ro: 'meniu-mod-cheats-marvel-rivals',
		sv: 'marvel-rivals-mod-menu',
	},
	'soft-aim': {
		en: 'marvel-rivals-soft-aim',
		es: 'soft-aim-trucos-marvel-rivals',
		fr: 'soft-aim-triche-marvel-rivals',
		de: 'marvel-rivals-soft-aim',
		pt: 'soft-aim-cheats-marvel-rivals',
		it: 'soft-aim-trucchi-marvel-rivals',
		nl: 'marvel-rivals-soft-aim',
		pl: 'soft-aim-cheatow-marvel-rivals',
		ru: 'soft-aim-chity-marvel-rivals',
		tr: 'marvel-rivals-soft-aim',
		ar: 'marvel-rivals-soft-aim',
		ja: 'marvel-rivals-soft-aim',
		ko: 'marvel-rivals-soft-aim',
		zh: 'marvel-rivals-soft-aim',
		hi: 'marvel-rivals-soft-aim',
		id: 'marvel-rivals-soft-aim',
		th: 'marvel-rivals-soft-aim',
		vi: 'marvel-rivals-soft-aim',
		uk: 'soft-aim-chity-marvel-rivals',
		cs: 'marvel-rivals-soft-aim',
		ro: 'soft-aim-cheats-marvel-rivals',
		sv: 'marvel-rivals-soft-aim',
	},
	'best-cheats': {
		en: 'best-marvel-rivals-cheats',
		es: 'mejores-trucos-marvel-rivals',
		fr: 'meilleures-triches-marvel-rivals',
		de: 'beste-marvel-rivals-cheats',
		pt: 'melhores-cheats-marvel-rivals',
		it: 'migliori-trucchi-marvel-rivals',
		nl: 'beste-marvel-rivals-cheats',
		pl: 'najlepsze-cheats-marvel-rivals',
		ru: 'luchshie-chity-marvel-rivals',
		tr: 'en-iyi-marvel-rivals-hileleri',
		ar: 'best-marvel-rivals-cheats',
		ja: 'best-marvel-rivals-cheats',
		ko: 'best-marvel-rivals-cheats',
		zh: 'best-marvel-rivals-cheats',
		hi: 'best-marvel-rivals-cheats',
		id: 'best-marvel-rivals-cheats',
		th: 'best-marvel-rivals-cheats',
		vi: 'best-marvel-rivals-cheats',
		uk: 'naykrashchi-chity-marvel-rivals',
		cs: 'nejlepsi-marvel-rivals-cheats',
		ro: 'cele-mai-bune-cheats-marvel-rivals',
		sv: 'basta-marvel-rivals-cheats',
	},
	'aimbot-hack': {
		en: 'marvel-rivals-aimbot-hack',
		es: 'aimbot-hack-trucos-marvel-rivals',
		fr: 'aimbot-hack-triche-marvel-rivals',
		de: 'marvel-rivals-aimbot-hack',
		pt: 'aimbot-hack-cheats-marvel-rivals',
		it: 'aimbot-hack-trucchi-marvel-rivals',
		nl: 'marvel-rivals-aimbot-hack',
		pl: 'aimbot-hack-cheatow-marvel-rivals',
		ru: 'aimbot-hack-chity-marvel-rivals',
		tr: 'marvel-rivals-aimbot-hack',
		ar: 'marvel-rivals-aimbot-hack',
		ja: 'marvel-rivals-aimbot-hack',
		ko: 'marvel-rivals-aimbot-hack',
		zh: 'marvel-rivals-aimbot-hack',
		hi: 'marvel-rivals-aimbot-hack',
		id: 'marvel-rivals-aimbot-hack',
		th: 'marvel-rivals-aimbot-hack',
		vi: 'marvel-rivals-aimbot-hack',
		uk: 'aimbot-hack-chity-marvel-rivals',
		cs: 'marvel-rivals-aimbot-hack',
		ro: 'aimbot-hack-cheats-marvel-rivals',
		sv: 'marvel-rivals-aimbot-hack',
	},
	'esp-hack': {
		en: 'marvel-rivals-esp-hack',
		es: 'esp-hack-trucos-marvel-rivals',
		fr: 'esp-hack-triche-marvel-rivals',
		de: 'marvel-rivals-esp-hack',
		pt: 'esp-hack-cheats-marvel-rivals',
		it: 'esp-hack-trucchi-marvel-rivals',
		nl: 'marvel-rivals-esp-hack',
		pl: 'esp-hack-cheatow-marvel-rivals',
		ru: 'esp-hack-chity-marvel-rivals',
		tr: 'marvel-rivals-esp-hack',
		ar: 'marvel-rivals-esp-hack',
		ja: 'marvel-rivals-esp-hack',
		ko: 'marvel-rivals-esp-hack',
		zh: 'marvel-rivals-esp-hack',
		hi: 'marvel-rivals-esp-hack',
		id: 'marvel-rivals-esp-hack',
		th: 'marvel-rivals-esp-hack',
		vi: 'marvel-rivals-esp-hack',
		uk: 'esp-hack-chity-marvel-rivals',
		cs: 'marvel-rivals-esp-hack',
		ro: 'esp-hack-cheats-marvel-rivals',
		sv: 'marvel-rivals-esp-hack',
	},
	'unlock-all': {
		en: 'marvel-rivals-unlock-all',
		es: 'unlock-all-trucos-marvel-rivals',
		fr: 'unlock-all-triche-marvel-rivals',
		de: 'marvel-rivals-unlock-all',
		pt: 'unlock-all-cheats-marvel-rivals',
		it: 'unlock-all-trucchi-marvel-rivals',
		nl: 'marvel-rivals-unlock-all',
		pl: 'unlock-all-cheatow-marvel-rivals',
		ru: 'unlock-all-chity-marvel-rivals',
		tr: 'marvel-rivals-unlock-all',
		ar: 'marvel-rivals-unlock-all',
		ja: 'marvel-rivals-unlock-all',
		ko: 'marvel-rivals-unlock-all',
		zh: 'marvel-rivals-unlock-all',
		hi: 'marvel-rivals-unlock-all',
		id: 'marvel-rivals-unlock-all',
		th: 'marvel-rivals-unlock-all',
		vi: 'marvel-rivals-unlock-all',
		uk: 'unlock-all-chity-marvel-rivals',
		cs: 'marvel-rivals-unlock-all',
		ro: 'unlock-all-cheats-marvel-rivals',
		sv: 'marvel-rivals-unlock-all',
	},
	privacy: {
		en: 'privacy-policy',
		es: 'politica-privacidad',
		fr: 'politique-confidentialite',
		de: 'datenschutz',
		pt: 'politica-privacidade',
		it: 'privacy-policy',
		nl: 'privacybeleid',
		pl: 'polityka-prywatnosci',
		ru: 'politika-konfidencialnosti',
		tr: 'gizlilik-politikasi',
		ar: 'privacy-policy',
		ja: 'privacy-policy',
		ko: 'privacy-policy',
		zh: 'privacy-policy',
		hi: 'privacy-policy',
		id: 'privacy-policy',
		th: 'privacy-policy',
		vi: 'privacy-policy',
		uk: 'polityka-konfidentsijnosti',
		cs: 'ochrana-osobnich-udaju',
		ro: 'politica-confidentialitate',
		sv: 'integritetspolicy',
	},
	refund: {
		en: 'refund-policy',
		es: 'politica-reembolso',
		fr: 'politique-remboursement',
		de: 'rueckerstattung',
		pt: 'politica-reembolso',
		it: 'politica-rimborso',
		nl: 'terugbetalingsbeleid',
		pl: 'polityka-zwrotow',
		ru: 'politika-vozvrata',
		tr: 'iade-politikasi',
		ar: 'refund-policy',
		ja: 'refund-policy',
		ko: 'refund-policy',
		zh: 'refund-policy',
		hi: 'refund-policy',
		id: 'refund-policy',
		th: 'refund-policy',
		vi: 'refund-policy',
		uk: 'polityka-povorennya',
		cs: 'refund-policy',
		ro: 'politica-rambursare',
		sv: 'aterbetalningspolicy',
	},
	terms: {
		en: 'terms',
		es: 'terminos-uso',
		fr: 'conditions-utilisation',
		de: 'nutzungsbedingungen',
		pt: 'termos-uso',
		it: 'termini-uso',
		nl: 'gebruiksvoorwaarden',
		pl: 'regulamin',
		ru: 'usloviya-ispolzovaniya',
		tr: 'kullanim-kosullari',
		ar: 'terms',
		ja: 'terms',
		ko: 'terms',
		zh: 'terms',
		hi: 'terms',
		id: 'terms',
		th: 'terms',
		vi: 'terms',
		uk: 'umovy-vykorystannya',
		cs: 'podminky-uziti',
		ro: 'termeni-utilizare',
		sv: 'anvandarvillkor',
	},
};

export const pageIds = Object.keys(englishPaths) as PageId[];

export function getLocalizedPath(pageId: PageId, locale: LocaleCode): string {
	const resolved = (isCannibalPageId(pageId) ? getCannibalTargetId(pageId) : pageId) as PageId;
	if (locale === defaultLocale) {
		return englishPaths[resolved];
	}
	const slug = localizedSlugs[resolved][locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Map English root paths to the correct locale URL (for CTAs and inline links). */
export function localizeInternalHref(href: string, locale: LocaleCode): string {
	if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
		return href;
	}
	const trimmed = href.replace(/\/+$/, '') || '/';
	const withSlash = trimmed === '/' ? '/' : `${trimmed}/`;
	for (const pageId of pageIds) {
		const english = englishPaths[pageId];
		if (english === withSlash || english.replace(/\/+$/, '') === trimmed) {
			const targetId = getCannibalTargetId(pageId) as PageId;
			return getLocalizedPath(targetId, locale);
		}
	}
	return href;
}

/** Canonical absolute URL — always https apex with trailing slash (matches Layout.astro). */
export function buildCanonicalUrl(path: string): string {
	const normalized =
		!path || path === '/'
			? '/'
			: path.endsWith('/') || path.includes('.')
				? path
				: `${path}/`;
	return new URL(normalized, siteConfig.url).href;
}

export function absoluteLocalizedUrl(pageId: PageId, locale: LocaleCode): string {
	return buildCanonicalUrl(getLocalizedPath(pageId, locale));
}

export type HreflangAlternate = { hreflang: string; href: string };

/** Self-referential hreflang for single-locale pages (reviews, 404). */
export function getSelfHreflangAlternates(
	path: string,
	locale: LocaleCode = defaultLocale,
): HreflangAlternate[] {
	const href = buildCanonicalUrl(path);
	return [
		{ hreflang: localeMap[locale].hreflang, href },
		{ hreflang: 'x-default', href },
	];
}

export function getHreflangAlternates(pageId: PageId, currentLocale: LocaleCode = defaultLocale) {
	const resolvedId = (isCannibalPageId(pageId) ? getCannibalTargetId(pageId) : pageId) as PageId;
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteLocalizedUrl(resolvedId, code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	const xDefault = {
		hreflang: 'x-default' as const,
		href: absoluteLocalizedUrl(resolvedId, defaultLocale),
	};
	// Self-referential hreflang first — required by Google/Seobility for the active locale.
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		xDefault,
	];
}

export function resolvePageIdFromPath(path: string): PageId | undefined {
	const normalized = path.endsWith('/') ? path : `${path}/`;
	for (const id of pageIds) {
		if (englishPaths[id] === normalized) return id;
	}
	return undefined;
}

/** Parsed locale + page from any site URL (English root or /{lang}/…). */
export type PageContext = {
	locale: LocaleCode;
	pageId?: PageId;
	isBlogIndex?: boolean;
	blogSlug?: string;
};

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	if (pathname.includes('.') || pathname.endsWith('/')) return pathname;
	return `${pathname}/`;
}

/** Resolve locale and page/blog context from the current URL path. */
export function resolvePageContextFromPath(pathname: string): PageContext {
	const path = normalizePathname(pathname);

	if (path === '/') {
		return { locale: defaultLocale, pageId: 'home' };
	}

	const segments = path.split('/').filter(Boolean);
	let locale: LocaleCode = defaultLocale;
	let offset = 0;

	if (segments.length > 0 && isLocaleCode(segments[0]) && segments[0] !== defaultLocale) {
		locale = segments[0];
		offset = 1;
	}

	const rest = segments.slice(offset);

	if (rest.length === 0) {
		return { locale, pageId: 'home' };
	}

	if (rest[0] === 'blog') {
		if (rest.length === 1) {
			return { locale, isBlogIndex: true };
		}
		return { locale, blogSlug: rest[1] };
	}

	if (locale === defaultLocale) {
		return { locale, pageId: resolvePageIdFromPath(path) };
	}

	return { locale, pageId: resolvePageFromLocalizedPath(locale, rest[0]) };
}

/** Target URL for the same page in another locale (non-blog pages). */
export function getPageLocaleSwitchHref(context: PageContext, targetLocale: LocaleCode): string {
	if (context.pageId) {
		return getLocalizedPath(context.pageId, targetLocale);
	}
	return getLocalizedPath('home', targetLocale);
}

export function hreflangLinksXml(pageId: PageId, escapeXml: (v: string) => string): string {
	return getHreflangAlternates(pageId)
		.map(
			(alt) =>
				`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
		)
		.join('\n');
}

export function resolvePageFromLocalizedPath(
	locale: LocaleCode,
	slug: string | undefined,
): PageId | undefined {
	if (!slug) return 'home';
	for (const pageId of pageIds) {
		if (localizedSlugs[pageId][locale] === slug) return pageId;
	}
	return undefined;
}

/** Map Accept-Language header to preferred locale (region-aware). */
export function localeFromAcceptLanguage(header: string | null): LocaleCode {
	if (!header) return defaultLocale;
	const prefs = header
		.split(',')
		.map((part) => {
			const [tag, qPart] = part.trim().split(';');
			const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
			return { tag: tag.toLowerCase(), q };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of prefs) {
		const primary = tag.split('-')[0];
		if (localeCodes.includes(primary as LocaleCode)) return primary as LocaleCode;
	}
	return defaultLocale;
}

export function getNavForLocale(locale: LocaleCode, labels: Record<string, string>) {
	const items: { label: string; href: string; pageId?: PageId }[] = [
		{ label: labels.home, href: getLocalizedPath('home', locale), pageId: 'home' },
	{ label: labels.hacks ?? 'Hacks', href: getLocalizedPath('hacks', locale), pageId: 'hacks' },
		{ label: labels.aimbot, href: getLocalizedPath('marvel-rivals-aimbot', locale), pageId: 'marvel-rivals-aimbot' },
		{ label: labels.esp, href: getLocalizedPath('marvel-rivals-esp', locale), pageId: 'marvel-rivals-esp' },
		{ label: 'Blog', href: locale === defaultLocale ? '/blog/' : `/${locale}/blog/` },
		{ label: labels.features, href: getLocalizedPath('features', locale), pageId: 'features' },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale), pageId: 'pricing' },
		{ label: labels.setup, href: getLocalizedPath('setup', locale), pageId: 'setup' },
		{ label: labels.updates, href: getLocalizedPath('updates', locale), pageId: 'updates' },
		{ label: labels.faq, href: getLocalizedPath('faq', locale), pageId: 'faq' },
	];
	return items;
}
