export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** 22 locales for global Marvel Rivals Cheats blog SEO coverage. */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Worldwide' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Worldwide' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Worldwide' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Worldwide' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Worldwide' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Worldwide' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Worldwide' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Worldwide' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Worldwide' },
];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
	}
> = {
	en: {
		blogTitle: 'Marvel Rivals Cheats Blog | Raid Guides',
		blogDescription:
			'Marvel Rivals guides — hero meta tips, ESP, aimbot notes, map callouts, and NetEase Anti-Cheat update coverage. English blog at marvelrivals.org/blog/.',
		blogH1: 'Marvel Rivals Cheats Intel',
		blogIntro:
			'Short Marvel Rivals guides for PvP and team fight ranked matches. Pair these tips with Marvel Rivals Cheats product pages when you need ESP, soft aim, or radar.',
		readMore: 'Read guide',
		published: 'Published',
		updated: 'Updated',
		relatedPosts: 'Related guides',
		allPosts: 'All blog posts',
		home: 'Marvel Rivals Cheats home',
		language: 'Language',
	},
	es: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Guías en 22 idiomas',
		blogDescription:
			'Blog de Marvel Rivals Cheats con guías de trucos indetectables, ESP wallhack, radar y Aimbot para Marvel Rivals en PC Windows.',
		blogH1: 'Blog Marvel Rivals Cheats — Guías globales',
		blogIntro:
			'Guías SEO de trucos Marvel Rivals indetectables, ESP wallhack, radar hack, Aimbot y mantenimiento NetEase Anti-Cheat en 22 idiomas.',
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Marvel Rivals relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Marvel Rivals Cheats',
		language: 'Idioma',
	},
	fr: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Guides en 22 langues',
		blogDescription:
			'Blog Marvel Rivals Cheats : triches indétectables, ESP wallhack, radar et Aimbot pour Marvel Rivals sur PC Windows.',
		blogH1: 'Blog Marvel Rivals Cheats — Guides mondiaux',
		blogIntro:
			'Guides SEO triches Marvel Rivals indétectables, ESP wallhack, radar hack, Aimbot et NetEase Anti-Cheat en 22 langues.',
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Marvel Rivals associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Marvel Rivals Cheats',
		language: 'Langue',
	},
	de: {
		blogTitle: 'Marvel Rivals Cheats Blog 2026 | Guides in 22 Sprachen',
		blogDescription:
			'Marvel Rivals Cheats Blog mit undetected ESP, Wallhack, Radar und Aimbot Guides für Marvel Rivals auf Windows PC.',
		blogH1: 'Marvel Rivals Cheats Blog — Globale Guides',
		blogIntro:
			'SEO-Guides für undetected Marvel Rivals Cheats, ESP Wallhack, Radar Hack, Aimbot und NetEase Anti-Cheat in 22 Sprachen.',
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Marvel Rivals Guides',
		allPosts: 'Alle Beiträge',
		home: 'Marvel Rivals Cheats Start',
		language: 'Sprache',
	},
	pt: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Guias em 22 idiomas',
		blogDescription:
			'Blog Marvel Rivals Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Marvel Rivals no PC.',
		blogH1: 'Blog Marvel Rivals Cheats — Guias globais',
		blogIntro:
			'Guias SEO de cheats Marvel Rivals indetectáveis, ESP wallhack, radar hack, Aimbot e NetEase Anti-Cheat em 22 idiomas.',
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Marvel Rivals relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Marvel Rivals Cheats',
		language: 'Idioma',
	},
	it: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Guide in 22 lingue',
		blogDescription:
			'Blog Marvel Rivals Cheats con guide cheat indetectable, ESP wallhack, radar e Aimbot per Marvel Rivals su PC Windows.',
		blogH1: 'Blog Marvel Rivals Cheats — Guide globali',
		blogIntro:
			'Guide SEO cheat Marvel Rivals indetectable, ESP wallhack, radar hack, Aimbot e NetEase Anti-Cheat in 22 lingue.',
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Marvel Rivals correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Marvel Rivals Cheats',
		language: 'Lingua',
	},
	nl: {
		blogTitle: 'Marvel Rivals Cheats Blog 2026 | Gidsen in 22 talen',
		blogDescription:
			'Marvel Rivals Cheats blog met undetected ESP, wallhack, radar en Aimbot gidsen voor Marvel Rivals op Windows PC.',
		blogH1: 'Marvel Rivals Cheats Blog — Wereldwijde gidsen',
		blogIntro:
			'SEO-gidsen voor undetected marvel rivals cheats, ESP wallhack, radar hack, Aimbot en NetEase Anti-Cheat in 22 talen.',
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Marvel Rivals gidsen',
		allPosts: 'Alle posts',
		home: 'Marvel Rivals Cheats home',
		language: 'Taal',
	},
	pl: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Poradniki w 22 językach',
		blogDescription:
			'Blog Marvel Rivals Cheats z poradnikami undetected ESP, wallhack, radar i Aimbot dla Marvel Rivals na PC.',
		blogH1: 'Blog Marvel Rivals Cheats — Globalne poradniki',
		blogIntro:
			'Poradniki SEO undetected cheatów Marvel Rivals, ESP wallhack, radar hack, Aimbot i NetEase Anti-Cheat w 22 językach.',
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Marvel Rivals',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Marvel Rivals Cheats',
		language: 'Język',
	},
	ru: {
		blogTitle: 'Блог Marvel Rivals Cheats 2026 | Гайды на 22 языках',
		blogDescription:
			'Блог Marvel Rivals Cheats: undetected ESP, wallhack, radar и Aimbot для Marvel Rivals на Windows PC.',
		blogH1: 'Блог Marvel Rivals Cheats — Глобальные гайды',
		blogIntro:
			'SEO-гайды по undetected читам Marvel Rivals, ESP wallhack, radar hack, Aimbot и NetEase Anti-Cheat на 22 языках.',
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Marvel Rivals',
		allPosts: 'Все статьи',
		home: 'Главная Marvel Rivals Cheats',
		language: 'Язык',
	},
	tr: {
		blogTitle: 'Marvel Rivals Cheats Blog 2026 | 22 dilde rehberler',
		blogDescription:
			'Marvel Rivals Cheats blog: undetected ESP, wallhack, radar ve Aimbot rehberleri Marvel Rivals Windows PC.',
		blogH1: 'Marvel Rivals Cheats Blog — Küresel rehberler',
		blogIntro:
			'Undetected Marvel Rivals hileleri, ESP wallhack, radar hack, Aimbot ve NetEase Anti-Cheat SEO rehberleri 22 dilde.',
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Marvel Rivals rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Marvel Rivals Cheats ana sayfa',
		language: 'Dil',
	},
	ar: {
		blogTitle: 'مدونة Marvel Rivals Cheats 2026 | أدلة بـ 22 لغة',
		blogDescription:
			'مدونة Marvel Rivals Cheats: غش undetected وESP wallhack ورadar وAimbot لـ Marvel Rivals على Windows PC.',
		blogH1: 'مدونة Marvel Rivals Cheats — أدلة عالمية',
		blogIntro:
			'أدلة SEO لغش Marvel Rivals undetected وESP wallhack ورadar hack وAimbot وNetEase Anti-Cheat بـ 22 لغة.',
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Marvel Rivals ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Marvel Rivals Cheats',
		language: 'اللغة',
	},
	ja: {
		blogTitle: 'Marvel Rivals Cheats ブログ 2026 | 22言語ガイド',
		blogDescription:
			'Marvel Rivals Cheatsブログ：undetected ESP、wallhack、radar、Aimbotガイド。Marvel Rivals Windows PC向け。',
		blogH1: 'Marvel Rivals Cheats ブログ — グローバルガイド',
		blogIntro:
			'undetected Marvel Rivalsチート、ESP wallhack、radar hack、Aimbot、NetEase Anti-CheatのSEOガイドを22言語で提供。',
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Marvel Rivalsガイド',
		allPosts: 'すべての記事',
		home: 'Marvel Rivals Cheats ホーム',
		language: '言語',
	},
	ko: {
		blogTitle: 'Marvel Rivals Cheats 블로그 2026 | 22개 언어 가이드',
		blogDescription:
			'Marvel Rivals Cheats 블로그: undetected ESP, wallhack, radar, Aimbot 가이드. Marvel Rivals Windows PC.',
		blogH1: 'Marvel Rivals Cheats 블로그 — 글로벌 가이드',
		blogIntro:
			'undetected Marvel Rivals 치트, ESP wallhack, radar hack, Aimbot, NetEase Anti-Cheat SEO 가이드를 22개 언어로 제공.',
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Marvel Rivals 가이드',
		allPosts: '모든 게시물',
		home: 'Marvel Rivals Cheats 홈',
		language: '언어',
	},
	zh: {
		blogTitle: 'Marvel Rivals Cheats 博客 2026 | 22种语言指南',
		blogDescription:
			'Marvel Rivals Cheats博客：undetected ESP、wallhack、radar和Aimbot指南，适用于Marvel Rivals Windows PC。',
		blogH1: 'Marvel Rivals Cheats 博客 — 全球指南',
		blogIntro:
			'undetected Marvel Rivals作弊、ESP wallhack、radar hack、Aimbot和NetEase Anti-Cheat的SEO指南，共22种语言。',
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Marvel Rivals指南',
		allPosts: '所有文章',
		home: 'Marvel Rivals Cheats 首页',
		language: '语言',
	},
	hi: {
		blogTitle: 'Marvel Rivals Cheats ब्लॉग 2026 | 22 भाषाओं में गाइड',
		blogDescription:
			'Marvel Rivals Cheats ब्लॉग: undetected ESP, wallhack, radar और Aimbot गाइड Marvel Rivals Windows PC के लिए।',
		blogH1: 'Marvel Rivals Cheats ब्लॉग — वैश्विक गाइड',
		blogIntro:
			'undetected marvel rivals cheats, ESP wallhack, radar hack, Aimbot और NetEase Anti-Cheat SEO गाइड 22 भाषाओं में।',
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Marvel Rivals गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Marvel Rivals Cheats होम',
		language: 'भाषा',
	},
	id: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Panduan 22 bahasa',
		blogDescription:
			'Blog Marvel Rivals Cheats: panduan undetected ESP, wallhack, radar dan Aimbot untuk Marvel Rivals di PC Windows.',
		blogH1: 'Blog Marvel Rivals Cheats — Panduan global',
		blogIntro:
			'Panduan SEO cheat Marvel Rivals undetected, ESP wallhack, radar hack, Aimbot dan NetEase Anti-Cheat dalam 22 bahasa.',
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Pandua Marvel Rivals terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Marvel Rivals Cheats',
		language: 'Bahasa',
	},
	th: {
		blogTitle: 'บล็อก Marvel Rivals Cheats 2026 | คู่มือ 22 ภาษา',
		blogDescription:
			'บล็อก Marvel Rivals Cheats: คู่มือ undetected ESP, wallhack, radar และ Aimbot สำหรับ Marvel Rivals บน PC',
		blogH1: 'บล็อก Marvel Rivals Cheats — คู่มือทั่วโลก',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Marvel Rivals undetected, ESP wallhack, radar hack, Aimbot และ NetEase Anti-Cheat 22 ภาษา',
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Marvel Rivals ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Marvel Rivals Cheats',
		language: 'ภาษา',
	},
	vi: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Hướng dẫn 22 ngôn ngữ',
		blogDescription:
			'Blog Marvel Rivals Cheats: hướng dẫn undetected ESP, wallhack, radar và Aimbot cho Marvel Rivals trên PC.',
		blogH1: 'Blog Marvel Rivals Cheats — Hướng dẫn toàn cầu',
		blogIntro:
			'Hướng dẫn SEO cheat Marvel Rivals undetected, ESP wallhack, radar hack, Aimbot và NetEase Anti-Cheat bằng 22 ngôn ngữ.',
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Marvel Rivals liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Marvel Rivals Cheats',
		language: 'Ngôn ngữ',
	},
	uk: {
		blogTitle: 'Блог Marvel Rivals Cheats 2026 | Гайди 22 мовами',
		blogDescription:
			'Блог Marvel Rivals Cheats: undetected ESP, wallhack, radar та Aimbot для Marvel Rivals на Windows PC.',
		blogH1: 'Блог Marvel Rivals Cheats — Глобальні гайди',
		blogIntro:
			'SEO-гайди з undetected читів Marvel Rivals, ESP wallhack, radar hack, Aimbot та NetEase Anti-Cheat 22 мовами.',
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Marvel Rivals",
		allPosts: 'Усі статті',
		home: 'Головна Marvel Rivals Cheats',
		language: 'Мова',
	},
	cs: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Průvodce ve 22 jazycích',
		blogDescription:
			'Blog Marvel Rivals Cheats: undetected ESP, wallhack, radar a Aimbot pro Marvel Rivals na Windows PC.',
		blogH1: 'Blog Marvel Rivals Cheats — Globální průvodce',
		blogIntro:
			'SEO průvodce undetected marvel rivals cheaty, ESP wallhack, radar hack, Aimbot a NetEase Anti-Cheat ve 22 jazycích.',
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Marvel Rivals průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Marvel Rivals Cheats',
		language: 'Jazyk',
	},
	ro: {
		blogTitle: 'Blog Marvel Rivals Cheats 2026 | Ghiduri în 22 de limbi',
		blogDescription:
			'Blog Marvel Rivals Cheats: ghiduri undetected ESP, wallhack, radar și Aimbot pentru Marvel Rivals pe PC.',
		blogH1: 'Blog Marvel Rivals Cheats — Ghiduri globale',
		blogIntro:
			'Ghiduri SEO cheat-uri Marvel Rivals undetected, ESP wallhack, radar hack, Aimbot și NetEase Anti-Cheat în 22 de limbi.',
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Marvel Rivals related',
		allPosts: 'Toate articolele',
		home: 'Acasă Marvel Rivals Cheats',
		language: 'Limbă',
	},
	sv: {
		blogTitle: 'Marvel Rivals Cheats Blogg 2026 | Guider på 22 språk',
		blogDescription:
			'Marvel Rivals Cheats blogg med undetected ESP, wallhack, radar och Aimbot guider för Marvel Rivals på PC.',
		blogH1: 'Marvel Rivals Cheats Blogg — Globala guider',
		blogIntro:
			'SEO-guider för undetected marvel rivals cheats, ESP wallhack, radar hack, Aimbot och NetEase Anti-Cheat på 22 språk.',
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Marvel Rivals guider',
		allPosts: 'Alla inlägg',
		home: 'Marvel Rivals Cheats hem',
		language: 'Språk',
	},
};
