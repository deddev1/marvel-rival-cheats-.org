import { HERO_IMAGES, clampTitle, clampDesc, section, stripZadeyoFromMeta } from './constants.mjs';
import { phrases } from './phrases.mjs';
import { PAGE_IMAGE_ALTS } from './image-alts.mjs';
import { FOCUS_I18N } from './focus-i18n.mjs';
import { LEGAL_I18N } from './legal-i18n.mjs';

/** Page-specific translated meta for home across locales. */
const PAGE_META_HOME = {
	es: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack y Aimbot', desc: 'Trucos Marvel Rivals indetectables para Marvel Rivals en PC. ESP wallhack, radar hack y Aimbot con mantenimiento NetEase Anti-Cheat. Entrega digital instantánea.', h1: 'Marvel Rivals Cheats — ESP, Wallhack y Aimbot indetectables', intro: 'Paquete undetected para Marvel Rivals en Windows PC: ESP wallhack, radar y Aimbot con mantenimiento NetEase Anti-Cheat tras cada parche.', imageAlt: 'Marvel Rivals ESP — etiquetas de jugador hack', gallery: 'Galería Marvel Rivals Cheats — ESP, Aimbot y wallhack', cta2: 'Ver funciones', h2a: 'Por qué eligen Marvel Rivals Cheats en 2026', h2b: 'ESP wallhack, radar y Aimbot en una licencia', topicA: 'Ideal para leer escuadrones enemigos en BR y ranked match.', topicB: 'Una licencia en lugar de herramientas separadas.' },
	fr: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack et Aimbot', desc: 'Triches Marvel Rivals indétectables pour Marvel Rivals sur PC. ESP wallhack, radar hack et Aimbot avec maintenance NetEase Anti-Cheat. Livraison numérique instantanée.', h1: 'Marvel Rivals Cheats — ESP, Wallhack et Aimbot indétectables', intro: 'Pack undetected pour Marvel Rivals sur PC Windows : ESP wallhack, radar et Aimbot avec maintenance NetEase Anti-Cheat après chaque patch.', imageAlt: 'Marvel Rivals ESP — tags joueur hack', gallery: 'Galerie Marvel Rivals Cheats — ESP, Aimbot et wallhack', cta2: 'Voir les fonctions', h2a: 'Pourquoi choisir Marvel Rivals Cheats en 2026', h2b: 'ESP wallhack, radar et Aimbot en une licence', topicA: 'Parfait pour lire les escouades ennemies en BR et ranked match.', topicB: 'Une licence au lieu d\'outils séparés.' },
	de: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected Marvel Rivals Cheats für Marvel Rivals auf PC. ESP Wallhack, Radar Hack und Aimbot mit NetEase Anti-Cheat-Wartung. Sofortige digitale Lieferung.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack und Aimbot', intro: 'Undetected Windows PC Paket für Marvel Rivals: ESP Wallhack, Radar und Aimbot mit NetEase Anti-Cheat-Wartung nach jedem Patch.', imageAlt: 'Marvel Rivals ESP — Spieler-Tags Hack', gallery: 'Marvel Rivals Cheats Galerie — ESP, Aimbot und Wallhack', cta2: 'Features ansehen', h2a: 'Warum Marvel Rivals Cheats 2026 führt', h2b: 'ESP Wallhack, Radar und Aimbot in einer Lizenz', topicA: 'Ideal um feindliche Squads in BR und ranked match zu lesen.', topicB: 'Eine Lizenz statt separater Tools.' },
	pt: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheats Marvel Rivals indetectáveis para Marvel Rivals no PC. ESP wallhack, radar hack e Aimbot com manutenção NetEase Anti-Cheat. Entrega digital instantánea.', h1: 'Marvel Rivals Cheats — ESP, Wallhack e Aimbot indetectáveis', intro: 'Pacote undetected para Marvel Rivals no Windows PC: ESP wallhack, radar e Aimbot com manutenção NetEase Anti-Cheat após cada patch.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galeria Marvel Rivals Cheats — ESP, Aimbot e wallhack', cta2: 'Ver recursos', h2a: 'Por que escolher Marvel Rivals Cheats em 2026', h2b: 'ESP wallhack, radar e Aimbot numa licença', topicA: 'Ideal para ler epackrões inimigos em BR e ranked match.', topicB: 'Uma licença em vez de ferramentas separadas.' },
	it: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack e Aimbot', desc: 'Cheat Marvel Rivals indetectable per Marvel Rivals su PC. ESP wallhack, radar hack e Aimbot con manutenzione NetEase Anti-Cheat. Consegna digitale istantanea.', h1: 'Marvel Rivals Cheats — ESP, Wallhack e Aimbot indetectable', intro: 'Pacchetto undetected per Marvel Rivals su PC Windows: ESP wallhack, radar e Aimbot con manutenzione NetEase Anti-Cheat dopo ogni patch.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galleria Marvel Rivals Cheats — ESP, Aimbot e wallhack', cta2: 'Vedi funzioni', h2a: 'Perché scegliere Marvel Rivals Cheats nel 2026', h2b: 'ESP wallhack, radar e Aimbot in una licenza', topicA: 'Ideale per leggere packre nemiche in BR e ranked match.', topicB: 'Una licenza invece di tool separati.' },
	nl: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected marvel rivals cheats voor Marvel Rivals op PC. ESP wallhack, radar hack en Aimbot met NetEase Anti-Cheat-onderhoud. Directe digitale levering.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Undetected Windows PC pakket voor Marvel Rivals: ESP wallhack, radar en Aimbot met NetEase Anti-Cheat-onderhoud na elke patch.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Marvel Rivals Cheats galerij — ESP, Aimbot en wallhack', cta2: 'Bekijk functies', h2a: 'Waarom Marvel Rivals Cheats in 2026', h2b: 'ESP wallhack, radar en Aimbot in één licentie', topicA: 'Ideaal om vijandelijke packs te lezen in BR en ranked match.', topicB: 'Eén licentie in plaats van losse tools.' },
	pl: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack i Aimbot', desc: 'Undetected cheaty Marvel Rivals dla Marvel Rivals na PC. ESP wallhack, radar hack i Aimbot z konserwacją NetEase Anti-Cheat. Natychmiastowa dostawa cyfrowa.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack i Aimbot', intro: 'Pakiet undetected dla Marvel Rivals na Windows PC: ESP wallhack, radar i Aimbot z konserwacją NetEase Anti-Cheat po każdym patchu.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galeria Marvel Rivals Cheats — ESP, Aimbot i wallhack', cta2: 'Zobacz funkcje', h2a: 'Dlaczego Marvel Rivals Cheats w 2026', h2b: 'ESP wallhack, radar i Aimbot w jednej licencji', topicA: 'Idealny do czytania wrogich packów w BR i ranked match.', topicB: 'Jedna licencja zamiast osobnych narzędzi.' },
	ru: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack и Aimbot', desc: 'Undetected читы Marvel Rivals для Marvel Rivals на PC. ESP wallhack, radar hack и Aimbot с обслуживанием NetEase Anti-Cheat. Мгновенная цифровая доставка.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack и Aimbot', intro: 'Undetected пакет для Marvel Rivals на Windows PC: ESP wallhack, radar и Aimbot с обслуживанием NetEase Anti-Cheat после патчей.', imageAlt: 'Marvel Rivals ESP — теги игроков hack', gallery: 'Галерея Marvel Rivals Cheats — ESP, Aimbot и wallhack', cta2: 'Смотреть функции', h2a: 'Почему выбирают Marvel Rivals Cheats в 2026', h2b: 'ESP wallhack, radar и Aimbot в одной лицензии', topicA: 'Идеально для чтения вражеских отрядов в BR и ranked match.', topicB: 'Одна лицензия вместо отдельных инструментов.' },
	tr: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack ve Aimbot', desc: 'Marvel Rivals için undetected hileler. ESP wallhack, radar hack ve Aimbot — NetEase Anti-Cheat bakımı. Anında dijital teslimat.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack ve Aimbot', intro: 'Marvel Rivals Windows PC undetected paketi: ESP wallhack, radar ve Aimbot — NetEase Anti-Cheat bakımı dahil.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Marvel Rivals Cheats galeri — ESP, Aimbot ve wallhack', cta2: 'Özellikleri gör', h2a: '2026\'da neden Marvel Rivals Cheats', h2b: 'ESP wallhack, radar ve Aimbot tek lisans', topicA: 'BR ve ranked match\'da düşman pack okumak için ideal.', topicB: 'Ayrı araçlar yerine tek lisans.' },
	ar: { title: 'Marvel Rivals Cheats 2026 | ESP وWallhack وAimbot', desc: 'غش Marvel Rivals undetected لـ Marvel Rivals على PC. ESP wallhack ورadar hack وAimbot مع صيانة NetEase Anti-Cheat. تسليم رقمي فوري.', h1: 'Marvel Rivals Cheats — ESP وWallhack وAimbot غير مكتشف', intro: 'حزمة undetected لـ Marvel Rivals على Windows PC: ESP wallhack ورadar وAimbot مع صيانة NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'معرض Marvel Rivals Cheats — ESP وAimbot وwallhack', cta2: 'عرض الميزات', h2a: 'لماذا Marvel Rivals Cheats في 2026', h2b: 'ESP wallhack ورadar وAimbot في ترخيص واحد', topicA: 'مثالي لقراءة فرق العدو في BR وranked match.', topicB: 'ترخيص واحد بدلاً من أدوات منفصلة.' },
	ja: { title: 'Marvel Rivals Cheats 2026 | ESP・Wallhack・Aimbot', desc: 'Marvel Rivals向けundetectedチート。ESP wallhack、radar hack、Aimbot、NetEase Anti-Cheatメンテナンス。即時デジタル配信。', h1: 'Marvel Rivals Cheats — Undetected ESP・Wallhack・Aimbot', intro: 'Marvel Rivals Windows PC向けundetectedパッケージ：ESP wallhack、radar、Aimbot、NetEase Anti-Cheatメンテナンス付き。', imageAlt: 'marvel rivals cheats hero ESP aimbot wallhack', gallery: 'Marvel Rivals Cheatsギャラリー — ESP、Aimbot、wallhack', cta2: '機能を見る', h2a: '2026年にMarvel Rivals Cheatsを選ぶ理由', h2b: 'ESP wallhack、radar、Aimbotが1ライセンス', topicA: 'BRとranked matchで敵スクワッドを読むのに最適。', topicB: '別ツールではなく1ライセンス。' },
	ko: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack, Aimbot', desc: 'Marvel Rivals undetected 치트. ESP wallhack, radar hack, Aimbot, NetEase Anti-Cheat 유지보수. 즉시 디지털 배송.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack, Aimbot', intro: 'Marvel Rivals Windows PC undetected 패키지: ESP wallhack, radar, Aimbot, NetEase Anti-Cheat 유지보수 포함.', imageAlt: 'marvel rivals cheats hero ESP aimbot wallhack', gallery: 'Marvel Rivals Cheats 갤러리 — ESP, Aimbot, wallhack', cta2: '기능 보기', h2a: '2026년 Marvel Rivals Cheats를 선택하는 이유', h2b: 'ESP wallhack, radar, Aimbot 단일 라이선스', topicA: 'BR 및 ranked match에서 적 분대 읽기에 이상적.', topicB: '별도 도구 대신 단일 라이선스.' },
	zh: { title: 'Marvel Rivals Cheats 2026 | ESP、Wallhack、Aimbot', desc: 'Marvel Rivals undetected作弊。ESP wallhack、radar hack、Aimbot、NetEase Anti-Cheat维护。即时数字交付。', h1: 'Marvel Rivals Cheats — Undetected ESP、Wallhack、Aimbot', intro: 'Marvel Rivals Windows PC undetected套餐：ESP wallhack、radar、Aimbot，含NetEase Anti-Cheat维护。', imageAlt: 'marvel rivals cheats hero ESP aimbot wallhack', gallery: 'Marvel Rivals Cheats图库 — ESP、Aimbot、wallhack', cta2: '查看功能', h2a: '2026年选择Marvel Rivals Cheats的原因', h2b: 'ESP wallhack、radar、Aimbot单一许可证', topicA: '适合在BR和ranked match中读取敌方小队。', topicB: '一个许可证而非多个工具。' },
	hi: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack और Aimbot', desc: 'Marvel Rivals undetected cheats. ESP wallhack, radar hack, Aimbot, NetEase Anti-Cheat maintenance. Instant digital delivery.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack और Aimbot', intro: 'Marvel Rivals Windows PC undetected पैकेज: ESP wallhack, radar, Aimbot, NetEase Anti-Cheat maintenance सहित.', imageAlt: 'marvel rivals cheats hero ESP aimbot wallhack', gallery: 'Marvel Rivals Cheats gallery — ESP, Aimbot, wallhack', cta2: 'फ़ीचर्स देखें', h2a: '2026 में Marvel Rivals Cheats क्यों', h2b: 'ESP wallhack, radar, Aimbot एक लाइसेंस में', topicA: 'BR और ranked match में दुश्मन pack पढ़ने के लिए आदर्श.', topicB: 'अलग टूल्स के बजाय एक लाइसेंस.' },
	id: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Marvel Rivals undetected untuk Marvel Rivals di PC. ESP wallhack, radar hack, Aimbot, pemeliharaan NetEase Anti-Cheat. Pengiriman digital instan.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Paket undetected Marvel Rivals di Windows PC: ESP wallhack, radar, Aimbot dengan pemeliharaan NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galeri Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'Lihat fitur', h2a: 'Mengapa Marvel Rivals Cheats di 2026', h2b: 'ESP wallhack, radar, Aimbot dalam satu lisensi', topicA: 'Ideal membaca pack musuh di BR dan ranked match.', topicB: 'Satu lisensi alih-alih alat terpisah.' },
	th: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack และ Aimbot', desc: 'Cheat Marvel Rivals undetected สำหรับ Marvel Rivals บน PC. ESP wallhack, radar hack, Aimbot, NetEase Anti-Cheat maintenance. จัดส่งดิจิทัลทันที.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack และ Aimbot', intro: 'แพ็ก undetected สำหรับ Marvel Rivals บน Windows PC: ESP wallhack, radar, Aimbot พร้อม NetEase Anti-Cheat maintenance', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'แกลเลอรี Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'ดูฟีเจอร์', h2a: 'ทำไมเลือก Marvel Rivals Cheats ปี 2026', h2b: 'ESP wallhack, radar, Aimbot ในใบอนุญาตเดียว', topicA: 'เหมาะสำหรับอ่าน pack ศัตรูใน BR และ ranked match', topicB: 'ใบอนุญาตเดียวแทนเครื่องมือแยก' },
	vi: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Cheat Marvel Rivals undetected cho Marvel Rivals trên PC. ESP wallhack, radar hack, Aimbot, bảo trì NetEase Anti-Cheat. Giao hàng kỹ thuật số tức thì.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Gói undetected Marvel Rivals trên Windows PC: ESP wallhack, radar, Aimbot với bảo trì NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Thư viện Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'Xem tính năng', h2a: 'Vì sao chọn Marvel Rivals Cheats 2026', h2b: 'ESP wallhack, radar, Aimbot trong một giấy phép', topicA: 'Lý tưởng đọc pack địch trong BR và ranked match.', topicB: 'Một giấy phép thay vì công cụ riêng.' },
	uk: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack і Aimbot', desc: 'Undetected чіти Marvel Rivals для Marvel Rivals на PC. ESP wallhack, radar hack, Aimbot, обслуговування NetEase Anti-Cheat. Мгновенная цифровая доставка.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack і Aimbot', intro: 'Undetected пакет для Marvel Rivals на Windows PC: ESP wallhack, radar, Aimbot з обслуговуванням NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Галерея Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'Дивитися функції', h2a: 'Чому Marvel Rivals Cheats у 2026', h2b: 'ESP wallhack, radar і Aimbot в одній ліцензії', topicA: 'Ідеально для читання ворожих загонів у BR і ranked match.', topicB: 'Одна ліцензія замість окремих інструментів.' },
	cs: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack a Aimbot', desc: 'Undetected marvel rivals cheaty pro Marvel Rivals na PC. ESP wallhack, radar hack, Aimbot, údržba NetEase Anti-Cheat. Okamžité digitální doručení.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack a Aimbot', intro: 'Undetected balíček pro Marvel Rivals na Windows PC: ESP wallhack, radar, Aimbot s údržbou NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galerie Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'Zobrazit funkce', h2a: 'Proč Marvel Rivals Cheats v roce 2026', h2b: 'ESP wallhack, radar a Aimbot v jedné licenci', topicA: 'Ideální pro čtení nepřátelských packů v BR a ranked match.', topicB: 'Jedna licence místo samostatných nástrojů.' },
	ro: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack și Aimbot', desc: 'Cheats Marvel Rivals undetected pentru Marvel Rivals pe PC. ESP wallhack, radar hack, Aimbot, mentenanță NetEase Anti-Cheat. Livrare digitală instantă.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack și Aimbot', intro: 'Pachet undetected Marvel Rivals pe Windows PC: ESP wallhack, radar, Aimbot cu mentenanță NetEase Anti-Cheat.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Galerie Marvel Rivals Cheats — ESP, Aimbot, wallhack', cta2: 'Vezi funcții', h2a: 'De ce Marvel Rivals Cheats în 2026', h2b: 'ESP wallhack, radar și Aimbot într-o licență', topicA: 'Ideal pentru citirea pack-urilor inamice în BR și ranked match.', topicB: 'O licență în loc de instrumente separate.' },
	sv: { title: 'Marvel Rivals Cheats 2026 | ESP, Wallhack & Aimbot', desc: 'Undetected marvel rivals cheats för Marvel Rivals på PC. ESP wallhack, radar hack, Aimbot, NetEase Anti-Cheat-underhåll. Omedelbar digital leverans.', h1: 'Marvel Rivals Cheats — Undetected ESP, Wallhack & Aimbot', intro: 'Undetected paket för Marvel Rivals på Windows PC: ESP wallhack, radar, Aimbot med NetEase Anti-Cheat-underhåll.', imageAlt: 'Marvel Rivals ESP player tags hack', gallery: 'Marvel Rivals Cheats galleri — ESP, Aimbot, wallhack', cta2: 'Se funktioner', h2a: 'Varför Marvel Rivals Cheats 2026', h2b: 'ESP wallhack, radar och Aimbot i en licens', topicA: 'Ideal för att läsa fiendepacks i BR och ranked match.', topicB: 'En licens istället för separata verktyg.' },
};

function buildHome(locale) {
	const p = phrases[locale];
	const m = PAGE_META_HOME[locale];
	return {
		title: clampTitle(stripZadeyoFromMeta(m.title)),
		description: clampDesc(stripZadeyoFromMeta(m.desc)),
		h1: m.h1,
		intro: m.intro,
		imageAlt: m.imageAlt,
		galleryTitle: m.gallery,
		heroImage: HERO_IMAGES.home,
		ctaPrimary: p.buy,
		ctaSecondary: m.cta2,
		ctaSecondaryHref: '/features/',
		sections: [
			section(m.h2a, p.s1(m.topicA), p.s2()),
			section(m.h2b, p.s1(m.topicB), p.s3()),
		],
	};
}

/** Unique title/desc tails per page — English base + locale overrides for hero H1/subtitle. */
const PAGE_META_TAILS = {
	'marvel-rivals-esp': { suffix: 'Player Boxes & Wallhack', focus: 'player boxes, objective markers, and wallhack overlays', altKeyword: 'ESP wallhack overlay' },
	'marvel-rivals-aimbot': { suffix: 'Soft Aim Controls', focus: 'soft aim, FOV, and per-species Aimbot profiles', altKeyword: 'aimbot combat' },
	features: { suffix: 'Full Feature List', focus: 'ESP, soft aim, radar controls', altKeyword: 'cheats package ESP aimbot' },
	pricing: { suffix: 'Monthly & Lifetime', focus: '$35 monthly or $150 lifetime licenses', altKeyword: 'cheats pricing' },
	setup: { suffix: 'PC Setup Guide', focus: 'Windows PC activation and first-launch setup', altKeyword: 'setup PC activation' },
	updates: { suffix: 'NetEase Anti-Cheat Maintenance Log', focus: 'NetEase Anti-Cheat patch status and rebuild notes', altKeyword: 'updates NetEase Anti-Cheat maintenance' },
	faq: { suffix: 'Common Answers', focus: 'ESP, soft aim, delivery, and NetEase Anti-Cheat questions', altKeyword: 'FAQ ESP aimbot' },
	support: { suffix: 'Help & Contact', focus: 'order help and license support contact', altKeyword: 'support license help' },
	undetected: { suffix: 'NetEase Anti-Cheat Safe Status', focus: 'undetected maintenance after NetEase Anti-Cheat patches', altKeyword: 'undetected cheats ESP' },
	wallhack: { suffix: 'ESP Visibility', focus: 'wallhack ESP for players, objectives, and distance', altKeyword: 'wallhack ESP visibility' },
	radar: { suffix: '2D Threat Overlay', focus: '2D radar cues for flanks and rotations', altKeyword: 'radar hack overlay' },
	nneac: { suffix: 'Patch Maintenance', focus: 'how NetEase Anti-Cheat updates are handled for Marvel Rivals cheats', altKeyword: 'NetEase Anti-Cheat bypass ESP aimbot' },
	'cheats-2026': { suffix: 'Buyer Guide', focus: '2026 marvel rivals cheats checklist before checkout', altKeyword: 'cheats 2026 ESP aimbot' },
	hacks: { suffix: 'ESP Aimbot Guide', focus: 'Marvel Rivals Cheats pillar for ESP and Aimbot', altKeyword: 'hacks ESP aimbot' },
	'cheat-download': { suffix: 'Instant Access', focus: 'digital license download after payment', altKeyword: 'cheat download ESP aimbot' },
	'mod-menu': { suffix: 'In-Game Toggles', focus: 'in-client ESP and soft aim toggles', altKeyword: 'mod menu ESP aimbot' },
	'soft-aim': { suffix: 'Smooth Aim Settings', focus: 'smooth soft aim settings for Windows PC', altKeyword: 'soft aim aimbot' },
	'best-cheats': { suffix: 'Buyer Checklist', focus: 'what to compare before buying marvel rivals cheats', altKeyword: 'best cheats ESP aimbot' },
	'aimbot-hack': { suffix: 'Soft Aim Assist', focus: 'undetected Aimbot hack assist for Marvel Rivals', altKeyword: 'aimbot hack combat' },
	'esp-hack': { suffix: 'Boxes & Loot', focus: 'ESP hack boxes, carcass pins, and distance', altKeyword: 'ESP hack wallhack' },
	'unlock-all': { suffix: 'What It Means', focus: 'unlock-all searches vs real ESP and Aimbot tools', altKeyword: 'unlock all species ESP aimbot' },
};

/** Localized H1 suffixes (title/subtitle language change on product pages). */
const SUFFIX_I18N = {
	es: {
		'marvel-rivals-esp': 'Cajas de jugador y wallhack',
		'marvel-rivals-aimbot': 'Controles soft aim',
		features: 'Lista completa de funciones',
		pricing: 'Mensual y de por vida',
		setup: 'Guía de instalación PC',
		updates: 'Registro NetEase Anti-Cheat',
		faq: 'Preguntas frecuentes',
		support: 'Ayuda y contacto',
		undetected: 'Estado indetectable',
		wallhack: 'Visibilidad ESP',
		radar: 'Radar 2D de amenazas',
		nneac: 'Mantenimiento de parches',
		'cheats-2026': 'Guía del comprador',
		hacks: 'Guía ESP y Aimbot',
		'cheat-download': 'Acceso instantáneo',
		'mod-menu': 'Controles en partida',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Lista de compra',
		'aimbot-hack': 'Asistencia soft aim',
		'esp-hack': 'Cajas y objectives',
		'unlock-all': 'Qué significa',
	},
	fr: {
		'marvel-rivals-esp': 'Boîtes joueur et wallhack',
		'marvel-rivals-aimbot': 'Contrôles soft aim',
		features: 'Liste complète des fonctions',
		pricing: 'Mensuel et à vie',
		setup: 'Guide d\'installation PC',
		updates: 'Journal NetEase Anti-Cheat',
		faq: 'Questions fréquentes',
		support: 'Aide et contact',
		undetected: 'Statut indétectable',
		wallhack: 'Visibilité ESP',
		radar: 'Radar 2D des menaces',
		nneac: 'Maintenance des patchs',
		'cheats-2026': 'Guide acheteur',
		hacks: 'Guide ESP et Aimbot',
		'cheat-download': 'Accès instantané',
		'mod-menu': 'Contrôles en jeu',
		'soft-aim': 'Réglages soft aim',
		'best-cheats': 'Checklist acheteur',
		'aimbot-hack': 'Assistance soft aim',
		'esp-hack': 'Boîtes et objectives',
		'unlock-all': 'Ce que ça signifie',
	},
	de: {
		'marvel-rivals-esp': 'Spielerboxen & Wallhack',
		'marvel-rivals-aimbot': 'Soft-Aim Steuerung',
		features: 'Vollständige Feature-Liste',
		pricing: 'Monatlich & Lifetime',
		setup: 'PC Setup-Anleitung',
		updates: 'NetEase Anti-Cheat Wartungslog',
		faq: 'Häufige Fragen',
		support: 'Hilfe & Kontakt',
		undetected: 'Undetected Status',
		wallhack: 'ESP Sichtbarkeit',
		radar: '2D Bedrohungsradar',
		nneac: 'Patch-Wartung',
		'cheats-2026': 'Käuferleitfaden',
		hacks: 'ESP Aimbot Guide',
		'cheat-download': 'Sofortzugang',
		'mod-menu': 'In-Game Toggles',
		'soft-aim': 'Soft-Aim Einstellungen',
		'best-cheats': 'Käufer-Checkliste',
		'aimbot-hack': 'Soft-Aim Assist',
		'esp-hack': 'Boxen & Loot',
		'unlock-all': 'Was es bedeutet',
	},
	pt: {
		'marvel-rivals-esp': 'Caixas de jogador e wallhack',
		'marvel-rivals-aimbot': 'Controles soft aim',
		features: 'Lista completa de recursos',
		pricing: 'Mensal e vitalício',
		setup: 'Guia de instalação PC',
		updates: 'Registro NetEase Anti-Cheat',
		faq: 'Perguntas frequentes',
		support: 'Ajuda e contato',
		undetected: 'Status indetectável',
		wallhack: 'Visibilidade ESP',
		radar: 'Radar 2D de ameaças',
		nneac: 'Manutenção de patches',
		'cheats-2026': 'Guia do comprador',
		hacks: 'Guia ESP e Aimbot',
		'cheat-download': 'Acesso instantâneo',
		'mod-menu': 'Controles in-game',
		'soft-aim': 'Ajustes soft aim',
		'best-cheats': 'Checklist do comprador',
		'aimbot-hack': 'Assistência soft aim',
		'esp-hack': 'Caixas e objectives',
		'unlock-all': 'O que significa',
	},
	it: {
		'marvel-rivals-esp': 'Box giocatore e wallhack',
		'marvel-rivals-aimbot': 'Controlli soft aim',
		features: 'Elenco completo funzioni',
		pricing: 'Mensile e lifetime',
		setup: 'Guida setup PC',
		updates: 'Log manutenzione NetEase Anti-Cheat',
		faq: 'Domande frequenti',
		support: 'Aiuto e contatto',
		undetected: 'Stato indetectable',
		wallhack: 'Visibilità ESP',
		radar: 'Radar 2D minacce',
		nneac: 'Manutenzione patch',
		'cheats-2026': 'Guida acquirente',
		hacks: 'Guida ESP e Aimbot',
		'cheat-download': 'Accesso istantaneo',
		'mod-menu': 'Toggle in-game',
		'soft-aim': 'Impostazioni soft aim',
		'best-cheats': 'Checklist acquirente',
		'aimbot-hack': 'Assist soft aim',
		'esp-hack': 'Box e objectives',
		'unlock-all': 'Cosa significa',
	},
	ru: {
		'marvel-rivals-esp': 'Боксы игроков и wallhack',
		'marvel-rivals-aimbot': 'Управление soft aim',
		features: 'Полный список функций',
		pricing: 'Месяц и lifetime',
		setup: 'Гайд по установке',
		updates: 'Журнал NetEase Anti-Cheat',
		faq: 'Частые вопросы',
		support: 'Помощь и контакт',
		undetected: 'Статус undetected',
		wallhack: 'Видимость ESP',
		radar: '2D радар угроз',
		nneac: 'Обслуживание патчей',
		'cheats-2026': 'Гайд покупателя',
		hacks: 'Гайд ESP и Aimbot',
		'cheat-download': 'Мгновенный доступ',
		'mod-menu': 'Игровые переключатели',
		'soft-aim': 'Настройки soft aim',
		'best-cheats': 'Чеклист покупателя',
		'aimbot-hack': 'Soft aim ассист',
		'esp-hack': 'Боксы и лут',
		'unlock-all': 'Что это значит',
	},
};

function productPage(locale, pageKey, topicName, cta2href) {
	const p = phrases[locale];
	const home = PAGE_META_HOME[locale];
	const meta = PAGE_META_TAILS[pageKey] ?? { suffix: 'Marvel Rivals Cheats', focus: 'ESP wallhack, radar, and Aimbot', altKeyword: 'ESP aimbot wallhack' };
	const focus = FOCUS_I18N[locale]?.[pageKey] ?? meta.focus;
	const suffix = SUFFIX_I18N[locale]?.[pageKey] ?? meta.suffix;
	const titleBase = `${topicName} | ${suffix}`;
	return {
		title: clampTitle(stripZadeyoFromMeta(titleBase)),
		description: clampDesc(
			stripZadeyoFromMeta(`${topicName}: ${focus}. ${p.delivery}. ${p.undetected} — ${p.win}.`),
		),
		h1: topicName,
		intro: p.s1(`${topicName}.`),
		imageAlt: PAGE_IMAGE_ALTS[pageKey] || `${topicName} — Marvel Rivals Cheats screenshot`,
		galleryTitle: topicName,
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: p.buy,
		ctaSecondary: home.cta2,
		ctaSecondaryHref: cta2href,
		sections: [
			section(topicName, p.s1(`${focus}.`), p.s2()),
			section(`${p.undetected}`, p.s3(), p.s2()),
			section(p.delivery, p.s2(), p.legal()),
		],
	};
}

const TOPIC_NAMES = {
	'marvel-rivals-esp': { en: 'Marvel Rivals ESP', es: 'ESP Marvel Rivals', fr: 'ESP Marvel Rivals', de: 'Marvel Rivals ESP', pt: 'ESP Marvel Rivals', it: 'ESP Marvel Rivals', nl: 'Marvel Rivals ESP', pl: 'ESP Marvel Rivals', ru: 'ESP Marvel Rivals', tr: 'Marvel Rivals ESP', ar: 'ESP Marvel Rivals', ja: 'Marvel Rivals ESP', ko: 'Marvel Rivals ESP', zh: 'Marvel Rivals ESP', hi: 'Marvel Rivals ESP', id: 'ESP Marvel Rivals', th: 'Marvel Rivals ESP', vi: 'ESP Marvel Rivals', uk: 'ESP Marvel Rivals', cs: 'Marvel Rivals ESP', ro: 'ESP Marvel Rivals', sv: 'Marvel Rivals ESP' },
	'marvel-rivals-aimbot': { en: 'Marvel Rivals Aimbot', es: 'Aimbot Marvel Rivals', fr: 'Aimbot Marvel Rivals', de: 'Marvel Rivals Aimbot', pt: 'Aimbot Marvel Rivals', it: 'Aimbot Marvel Rivals', nl: 'Marvel Rivals Aimbot', pl: 'Aimbot Marvel Rivals', ru: 'Aimbot Marvel Rivals', tr: 'Marvel Rivals Aimbot', ar: 'Aimbot Marvel Rivals', ja: 'Marvel Rivals Aimbot', ko: 'Marvel Rivals Aimbot', zh: 'Marvel Rivals Aimbot', hi: 'Marvel Rivals Aimbot', id: 'Aimbot Marvel Rivals', th: 'Marvel Rivals Aimbot', vi: 'Aimbot Marvel Rivals', uk: 'Aimbot Marvel Rivals', cs: 'Marvel Rivals Aimbot', ro: 'Aimbot Marvel Rivals', sv: 'Marvel Rivals Aimbot' },
	features: { en: 'Features', es: 'Funciones', fr: 'Fonctions', de: 'Features', pt: 'Recursos', it: 'Funzioni', nl: 'Functies', pl: 'Funkcje', ru: 'Функции', tr: 'Özellikler', ar: 'الميزات', ja: '機能', ko: '기능', zh: '功能', hi: 'फ़ीचर्स', id: 'Fitur', th: 'ฟีเจอร์', vi: 'Tính năng', uk: 'Функції', cs: 'Funkce', ro: 'Funcții', sv: 'Funktioner' },
	pricing: { en: 'Pricing', es: 'Precios', fr: 'Tarifs', de: 'Preise', pt: 'Preços', it: 'Prezzi', nl: 'Prijzen', pl: 'Cennik', ru: 'Цены', tr: 'Fiyatlar', ar: 'الأسعار', ja: '料金', ko: '가격', zh: '价格', hi: 'कीमत', id: 'Harga', th: 'ราคา', vi: 'Giá', uk: 'Ціни', cs: 'Ceny', ro: 'Prețuri', sv: 'Priser' },
	setup: { en: 'Setup', es: 'Instalación', fr: 'Installation', de: 'Setup', pt: 'Instalação', it: 'Setup', nl: 'Setup', pl: 'Instalacja', ru: 'Установка', tr: 'Kurulum', ar: 'التثبيت', ja: 'セットアップ', ko: '설치', zh: '安装', hi: 'सेटअप', id: 'Setup', th: 'ติดตั้ง', vi: 'Cài đặt', uk: 'Встановлення', cs: 'Instalace', ro: 'Instalare', sv: 'Installation' },
	updates: { en: 'Updates', es: 'Actualizaciones', fr: 'Mises à jour', de: 'Updates', pt: 'Atualizações', it: 'Aggiornamenti', nl: 'Updates', pl: 'Aktualizacje', ru: 'Обновления', tr: 'Güncellemeler', ar: 'التحديثات', ja: '更新', ko: '업데이트', zh: '更新', hi: 'अपडेट', id: 'Pembaruan', th: 'อัปเดต', vi: 'Cập nhật', uk: 'Оновлення', cs: 'Aktualizace', ro: 'Actualizări', sv: 'Uppdateringar' },
	faq: { en: 'FAQ', es: 'FAQ', fr: 'FAQ', de: 'FAQ', pt: 'FAQ', it: 'FAQ', nl: 'FAQ', pl: 'FAQ', ru: 'FAQ', tr: 'SSS', ar: 'الأسئلة', ja: 'FAQ', ko: 'FAQ', zh: '常见问题', hi: 'FAQ', id: 'FAQ', th: 'FAQ', vi: 'FAQ', uk: 'FAQ', cs: 'FAQ', ro: 'FAQ', sv: 'FAQ' },
	support: { en: 'Support', es: 'Soporte', fr: 'Support', de: 'Support', pt: 'Suporte', it: 'Supporto', nl: 'Support', pl: 'Wsparcie', ru: 'Поддержка', tr: 'Destek', ar: 'الدعم', ja: 'サポート', ko: '지원', zh: '支持', hi: 'सहायता', id: 'Dukungan', th: 'สนับสนุน', vi: 'Hỗ trợ', uk: 'Підтримка', cs: 'Podpora', ro: 'Suport', sv: 'Support' },
	undetected: { en: 'Undetected Cheats', es: 'Trucos indetectables', fr: 'Triches indétectables', de: 'Undetected Cheats', pt: 'Cheats indetectáveis', it: 'Cheat indetectable', nl: 'Undetected Cheats', pl: 'Cheaty undetected', ru: 'Undetected читы', tr: 'Undetected hileler', ar: 'غش undetected', ja: 'Undetectedチート', ko: 'Undetected 치트', zh: 'Undetected作弊', hi: 'Undetected cheats', id: 'Cheat undetected', th: 'Cheats undetected', vi: 'Cheat undetected', uk: 'Undetected чіти', cs: 'Undetected cheaty', ro: 'Cheats undetected', sv: 'Undetected cheats' },
	wallhack: { en: 'Marvel Rivals Wallhack', es: 'Marvel Rivals Wallhack', fr: 'Marvel Rivals Wallhack', de: 'Marvel Rivals Wallhack', pt: 'Marvel Rivals Wallhack', it: 'Marvel Rivals Wallhack', nl: 'Marvel Rivals Wallhack', pl: 'Marvel Rivals Wallhack', ru: 'Marvel Rivals Wallhack', tr: 'Marvel Rivals Wallhack', ar: 'Marvel Rivals Wallhack', ja: 'Marvel Rivals Wallhack', ko: 'Marvel Rivals Wallhack', zh: 'Marvel Rivals Wallhack', hi: 'Marvel Rivals Wallhack', id: 'Marvel Rivals Wallhack', th: 'Marvel Rivals Wallhack', vi: 'Marvel Rivals Wallhack', uk: 'Marvel Rivals Wallhack', cs: 'Marvel Rivals Wallhack', ro: 'Marvel Rivals Wallhack', sv: 'Marvel Rivals Wallhack' },
	radar: { en: 'Radar Hack', es: 'Radar hack', fr: 'Radar hack', de: 'Radar Hack', pt: 'Radar hack', it: 'Radar hack', nl: 'Radar Hack', pl: 'Radar hack', ru: 'Radar hack', tr: 'Radar hack', ar: 'Radar hack', ja: 'Radar Hack', ko: 'Radar Hack', zh: 'Radar Hack', hi: 'Radar Hack', id: 'Radar hack', th: 'Radar Hack', vi: 'Radar hack', uk: 'Radar hack', cs: 'Radar Hack', ro: 'Radar hack', sv: 'Radar Hack' },
	nneac: { en: 'NetEase Anti-Cheat Bypass', es: 'Bypass NetEase Anti-Cheat', fr: 'Bypass NetEase Anti-Cheat', de: 'NetEase Anti-Cheat Bypass', pt: 'Bypass NetEase Anti-Cheat', it: 'Bypass NetEase Anti-Cheat', nl: 'NetEase Anti-Cheat Bypass', pl: 'Bypass NetEase Anti-Cheat', ru: 'Bypass NetEase Anti-Cheat', tr: 'NetEase Anti-Cheat bypass', ar: 'Bypass NetEase Anti-Cheat', ja: 'NetEase Anti-Cheat Bypass', ko: 'NetEase Anti-Cheat Bypass', zh: 'NetEase Anti-Cheat Bypass', hi: 'NetEase Anti-Cheat Bypass', id: 'Bypass NetEase Anti-Cheat', th: 'NetEase Anti-Cheat Bypass', vi: 'Bypass NetEase Anti-Cheat', uk: 'Bypass NetEase Anti-Cheat', cs: 'NetEase Anti-Cheat Bypass', ro: 'Bypass NetEase Anti-Cheat', sv: 'NetEase Anti-Cheat Bypass' },
	'cheats-2026': { en: 'Marvel Rivals Cheats 2026', es: 'Trucos Marvel Rivals 2026', fr: 'Triches Marvel Rivals 2026', de: 'Marvel Rivals Cheats 2026', pt: 'Cheats Marvel Rivals 2026', it: 'Cheat Marvel Rivals 2026', nl: 'Marvel Rivals Cheats 2026', pl: 'Cheaty Marvel Rivals 2026', ru: 'Читы Marvel Rivals 2026', tr: 'Marvel Rivals Hileleri 2026', ar: 'غش Marvel Rivals 2026', ja: 'Marvel Rivals Cheats 2026', ko: 'Marvel Rivals Cheats 2026', zh: 'Marvel Rivals作弊 2026', hi: 'Marvel Rivals Cheats 2026', id: 'Cheat Marvel Rivals 2026', th: 'Marvel Rivals Cheats 2026', vi: 'Cheat Marvel Rivals 2026', uk: 'Чіти Marvel Rivals 2026', cs: 'marvel rivals cheaty 2026', ro: 'Cheats Marvel Rivals 2026', sv: 'Marvel Rivals Cheats 2026' },
	hacks: { en: 'Marvel Rivals Cheats', es: 'Trucos Marvel Rivals', fr: 'Triches Marvel Rivals', de: 'Marvel Rivals Cheats', pt: 'Cheats Marvel Rivals', it: 'Cheat Marvel Rivals', nl: 'Marvel Rivals Cheats', pl: 'Cheaty Marvel Rivals', ru: 'Читы Marvel Rivals', tr: 'Marvel Rivals Hileleri', ar: 'غش Marvel Rivals', ja: 'Marvel Rivals Cheats', ko: 'Marvel Rivals Cheats', zh: 'Marvel Rivals作弊', hi: 'Marvel Rivals Cheats', id: 'Cheat Marvel Rivals', th: 'Marvel Rivals Cheats', vi: 'Cheat Marvel Rivals', uk: 'Чіти Marvel Rivals', cs: 'marvel rivals cheaty', ro: 'Cheats Marvel Rivals', sv: 'Marvel Rivals Cheats' },
	'cheat-download': { en: 'Marvel Rivals Cheat Download', es: 'Descarga Marvel Rivals Cheats', fr: 'Téléchargement Marvel Rivals Cheats', de: 'Marvel Rivals Cheat Download', pt: 'Download Marvel Rivals Cheats', it: 'Download Marvel Rivals Cheats', nl: 'Marvel Rivals Cheat Download', pl: 'Pobieranie Marvel Rivals Cheats', ru: 'Скачать Marvel Rivals Cheats', tr: 'Marvel Rivals Hile İndir', ar: 'تحميل Marvel Rivals Cheats', ja: 'Marvel Rivals Cheat Download', ko: 'Marvel Rivals Cheat Download', zh: 'Marvel Rivals作弊下载', hi: 'Marvel Rivals Cheat Download', id: 'Download Cheat Marvel Rivals', th: 'ดาวน์โหลด Marvel Rivals Cheats', vi: 'Tải Cheat Marvel Rivals', uk: 'Завантаження Marvel Rivals Cheats', cs: 'Stáhnout Marvel Rivals Cheats', ro: 'Descărcare Marvel Rivals Cheats', sv: 'Marvel Rivals Cheat Download' },
	'mod-menu': { en: 'Marvel Rivals Mod Menu', es: 'Menú mod Marvel Rivals', fr: 'Menu mod Marvel Rivals', de: 'Marvel Rivals Mod-Menü', pt: 'Menu mod Marvel Rivals', it: 'Mod menu Marvel Rivals', nl: 'Marvel Rivals Mod Menu', pl: 'Mod menu Marvel Rivals', ru: 'Мод-меню Marvel Rivals', tr: 'Marvel Rivals Mod Menü', ar: 'قائمة مود Marvel Rivals', ja: 'Marvel Rivals Mod Menu', ko: 'Marvel Rivals 모드 메뉴', zh: 'Marvel Rivals修改菜单', hi: 'Marvel Rivals Mod Menu', id: 'Menu mod Marvel Rivals', th: 'เมนูมอด Marvel Rivals', vi: 'Mod menu Marvel Rivals', uk: 'Мод-меню Marvel Rivals', cs: 'Marvel Rivals mod menu', ro: 'Meniu mod Marvel Rivals', sv: 'Marvel Rivals Mod-meny' },
	'soft-aim': { en: 'Marvel Rivals Soft Aim', es: 'Soft aim Marvel Rivals', fr: 'Soft aim Marvel Rivals', de: 'Marvel Rivals Soft Aim', pt: 'Soft aim Marvel Rivals', it: 'Soft aim Marvel Rivals', nl: 'Marvel Rivals Soft Aim', pl: 'Soft aim Marvel Rivals', ru: 'Soft aim Marvel Rivals', tr: 'Marvel Rivals Soft Aim', ar: 'Soft aim Marvel Rivals', ja: 'Marvel Rivals Soft Aim', ko: 'Marvel Rivals Soft Aim', zh: 'Marvel Rivals Soft Aim', hi: 'Marvel Rivals Soft Aim', id: 'Soft aim Marvel Rivals', th: 'Marvel Rivals Soft Aim', vi: 'Soft aim Marvel Rivals', uk: 'Soft aim Marvel Rivals', cs: 'Marvel Rivals Soft Aim', ro: 'Soft aim Marvel Rivals', sv: 'Marvel Rivals Soft Aim' },
	'best-cheats': { en: 'Best Marvel Rivals Cheats', es: 'Mejores trucos Marvel Rivals', fr: 'Meilleures triches Marvel Rivals', de: 'Beste Marvel Rivals Cheats', pt: 'Melhores cheats Marvel Rivals', it: 'Migliori cheat Marvel Rivals', nl: 'Beste Marvel Rivals Cheats', pl: 'Najlepsze cheaty Marvel Rivals', ru: 'Лучшие читы Marvel Rivals', tr: 'En İyi Marvel Rivals Hileleri', ar: 'أفضل غش Marvel Rivals', ja: '最強Marvel Rivalsチート', ko: '최고의 Marvel Rivals 치트', zh: '最佳Marvel Rivals作弊', hi: 'सर्वश्रेष्ठ Marvel Rivals Cheats', id: 'Cheat Marvel Rivals terbaik', th: 'Cheat Marvel Rivals ที่ดีที่สุด', vi: 'Cheat Marvel Rivals tốt nhất', uk: 'Найкращі чіти Marvel Rivals', cs: 'Nejlepší marvel rivals cheaty', ro: 'Cele mai bune cheats Marvel Rivals', sv: 'Bästa Marvel Rivals Cheats' },
	'aimbot-hack': { en: 'Marvel Rivals Aimbot Hack', es: 'Hack aimbot Marvel Rivals', fr: 'Hack aimbot Marvel Rivals', de: 'Marvel Rivals Aimbot Hack', pt: 'Hack aimbot Marvel Rivals', it: 'Hack aimbot Marvel Rivals', nl: 'Marvel Rivals Aimbot Hack', pl: 'Hack aimbot Marvel Rivals', ru: 'Хак aimbot Marvel Rivals', tr: 'Marvel Rivals Aimbot Hilesi', ar: 'هاك Aimbot Marvel Rivals', ja: 'Marvel Rivals Aimbot Hack', ko: 'Marvel Rivals 에임봇 핵', zh: 'Marvel Rivals自瞄外挂', hi: 'Marvel Rivals Aimbot Hack', id: 'Hack aimbot Marvel Rivals', th: 'Hack Aimbot Marvel Rivals', vi: 'Hack aimbot Marvel Rivals', uk: 'Хак aimbot Marvel Rivals', cs: 'Marvel Rivals Aimbot hack', ro: 'Hack aimbot Marvel Rivals', sv: 'Marvel Rivals Aimbot Hack' },
	'esp-hack': { en: 'Marvel Rivals ESP Hack', es: 'Hack ESP Marvel Rivals', fr: 'Hack ESP Marvel Rivals', de: 'Marvel Rivals ESP Hack', pt: 'Hack ESP Marvel Rivals', it: 'Hack ESP Marvel Rivals', nl: 'Marvel Rivals ESP Hack', pl: 'Hack ESP Marvel Rivals', ru: 'Хак ESP Marvel Rivals', tr: 'Marvel Rivals ESP Hilesi', ar: 'هاك ESP Marvel Rivals', ja: 'Marvel Rivals ESP Hack', ko: 'Marvel Rivals ESP 핵', zh: 'Marvel Rivals ESP外挂', hi: 'Marvel Rivals ESP Hack', id: 'Hack ESP Marvel Rivals', th: 'Hack ESP Marvel Rivals', vi: 'Hack ESP Marvel Rivals', uk: 'Хак ESP Marvel Rivals', cs: 'Marvel Rivals ESP hack', ro: 'Hack ESP Marvel Rivals', sv: 'Marvel Rivals ESP Hack' },
	'unlock-all': { en: 'Marvel Rivals Unlock All', es: 'Unlock all Marvel Rivals', fr: 'Unlock all Marvel Rivals', de: 'Marvel Rivals Unlock All', pt: 'Unlock all Marvel Rivals', it: 'Unlock all Marvel Rivals', nl: 'Marvel Rivals Unlock All', pl: 'Unlock all Marvel Rivals', ru: 'Unlock all Marvel Rivals', tr: 'Marvel Rivals Unlock All', ar: 'Unlock all Marvel Rivals', ja: 'Marvel Rivals Unlock All', ko: 'Marvel Rivals Unlock All', zh: 'Marvel Rivals Unlock All', hi: 'Marvel Rivals Unlock All', id: 'Unlock all Marvel Rivals', th: 'Marvel Rivals Unlock All', vi: 'Unlock all Marvel Rivals', uk: 'Unlock all Marvel Rivals', cs: 'Marvel Rivals Unlock All', ro: 'Unlock all Marvel Rivals', sv: 'Marvel Rivals Unlock All' },
};

const CTA2_HREF = {
	'marvel-rivals-esp': '/marvel-rivals-cheats/',
	'marvel-rivals-aimbot': '/marvel-rivals-esp/',
	features: '/pricing/',
	pricing: '/setup/',
	setup: '/support/',
	updates: '/marvel-rivals-cheats/',
	faq: '/support/',
	support: '/setup/',
	undetected: '/marvel-rivals-cheats/',
	wallhack: '/marvel-rivals-esp/',
	radar: '/marvel-rivals-esp/',
	nneac: '/updates/',
	'cheats-2026': '/marvel-rivals-cheats/',
	hacks: '/features/',
	'cheat-download': '/setup/',
	'mod-menu': '/features/',
	'soft-aim': '/marvel-rivals-aimbot/',
	'best-cheats': '/pricing/',
	'aimbot-hack': '/marvel-rivals-aimbot/',
	'esp-hack': '/marvel-rivals-esp/',
	'unlock-all': '/features/',
};

function buildLegal(locale, pageKey, kind) {
	const p = phrases[locale];
	const titles = {
		privacy: { es: 'Política de privacidad', fr: 'Politique de confidentialité', de: 'Datenschutz', pt: 'Política de privacidade', it: 'Informativa privacy', nl: 'Privacybeleid', pl: 'Polityka prywatności', ru: 'Политика конфиденциальности', tr: 'Gizlilik politikası', ar: 'سياسة الخصوصية', ja: 'プライバシーポリシー', ko: '개인정보 처리방침', zh: '隐私政策', hi: 'गोपनीयता नीति', id: 'Kebijakan privasi', th: 'นโยบายความเป็นส่วนตัว', vi: 'Chính sách bảo mật', uk: 'Політика конфіденційності', cs: 'Zásady ochrany soukromí', ro: 'Politica de confidențialitate', sv: 'Integritetspolicy' },
		refund: { es: 'Política de reembolso', fr: 'Politique de remboursement', de: 'Rückerstattung', pt: 'Política de reembolso', it: 'Politica di rimborso', nl: 'Restitutiebeleid', pl: 'Polityka zwrotów', ru: 'Политика возврата', tr: 'İade politikası', ar: 'سياسة الاسترداد', ja: '返金ポリシー', ko: '환불 정책', zh: '退款政策', hi: 'रिफंड नीति', id: 'Kebijakan refund', th: 'นโยบายการคืนเงิน', vi: 'Chính sách hoàn tiền', uk: 'Політика повернення', cs: 'Zásady vrácení peněz', ro: 'Politica de rambursare', sv: 'Återbetalningspolicy' },
		terms: { es: 'Términos de uso', fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', pt: 'Termos de uso', it: 'Termini di utilizzo', nl: 'Gebruiksvoorwaarden', pl: 'Warunki użytkowania', ru: 'Условия использования', tr: 'Kullanım şartları', ar: 'شروط الاستخدام', ja: '利用規約', ko: '이용 약관', zh: '使用条款', hi: 'उपयोग की शर्तें', id: 'Syarat penggunaan', th: 'ข้อกำหนดการใช้งาน', vi: 'Điều khoản sử dụng', uk: 'Умови використання', cs: 'Podmínky použití', ro: 'Termeni de utilizare', sv: 'Användarvillkor' },
	};
	const h1 = titles[kind][locale] ?? (kind === 'privacy' ? 'Privacy Policy' : kind === 'refund' ? 'Refund Policy' : 'Terms of Use');
	const L = LEGAL_I18N[locale];
	const pageCopy = L?.[kind] ?? {};
	const h2 = pageCopy.h2 ?? ['Information we collect', 'How we use data', 'Your rights'];
	return {
		title: clampTitle(stripZadeyoFromMeta(`${h1} | Marvel Rivals Cheats`)),
		description: clampDesc(stripZadeyoFromMeta(`${h1} ${L?.descFor ?? 'for Marvel Rivals Cheats — ESP wallhack, Aimbot'}, ${p.win}.`)),
		h1,
		intro: p.s1(`${h1} ${L?.introTopic ?? 'for marvelrivals.org and Marvel Rivals licenses.'}`),
		imageAlt: 'Marvel Rivals Cheats',
		galleryTitle: 'Marvel Rivals Cheats',
		heroImage: HERO_IMAGES[pageKey],
		ctaPrimary: L?.emailSupport ?? 'Email support',
		ctaSecondary:
			kind === 'privacy'
				? L?.readTerms ?? 'Read terms'
				: L?.readPrivacy ?? 'Read privacy',
		ctaSecondaryHref: kind === 'privacy' ? '/terms/' : '/privacy-policy/',
		sections: [
			section(
				h2[0],
				p.s1(L?.sec1p1 ?? 'Contact email, Zadeyo order references, and basic site security data.'),
				kind === 'privacy'
					? L?.privacy?.sec1p2 ?? 'Payment details are processed by Zadeyo checkout — not stored on marvelrivals.org.'
					: p.s2(),
			),
			section(
				h2[1],
				p.s1(L?.privacy?.sec2p1 ?? 'Support responses, order resolution, and legal compliance when required.'),
				kind === 'terms'
					? L?.terms?.sec2p2 ?? 'Using cheats may violate NetEase terms — you assume all ban risk.'
					: p.s3(),
			),
			section(h2[2], p.legal(), `${L?.emailLabel ?? 'Email:'} support@marvelrivals.org`),
		],
	};
}

/** Build all pages for a non-English locale. */
export function buildPagesForLocale(locale) {
	const pages = { home: buildHome(locale) };
	for (const [pageKey, names] of Object.entries(TOPIC_NAMES)) {
		pages[pageKey] = productPage(locale, pageKey, names[locale], CTA2_HREF[pageKey]);
	}
	for (const kind of ['privacy', 'refund', 'terms']) {
		pages[kind] = buildLegal(locale, kind, kind);
	}
	return pages;
}
