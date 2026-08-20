import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: {
		eyebrow: 'marvel rivals cheats',
		title: 'marvel rivals cheats gallery',
		subtitle: 'Simple marvel rivals cheats visuals — ESP, wallhack, aimbot, and radar for Marvel Rivals on PC.',
		lead: 'Marvel Rivals Cheats helps you spot players, enemy forces, objectives, and objectives with ESP, aimbot, and radar in one license.',
		highlights: [
			{ title: 'marvel rivals cheats esp', copy: 'See players through walls with marvel rivals cheats esp and wallhack overlays.' },
			{ title: 'marvel rivals cheats radar', copy: 'Track nearby threats with marvel rivals cheats radar before you push or objective.' },
			{ title: 'marvel rivals cheats aimbot', copy: 'Use soft aim and aimbot controls tuned for Marvel Rivals matches on Windows PC.' },
		],
		updatesLabel: 'marvel rivals cheats updates',
		updatesShort: 'Updates',
	},
	es: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galería Marvel Rivals',
		subtitle: 'Visuales de Marvel Rivals con loadouts, peleas de escuadrón y combate match — junto a herramientas ESP, radar y Aimbot.',
		lead: 'Marvel Rivals Cheats está pensado para el loop de Marvel Rivals: leer el mapa, rastrear escuadrones enemigos, objectivesear y sobrevivir al objective.',
		highlights: [
			{ title: 'ESP de players y escuadrones', copy: 'Detecta players enemigos y contornos de escuadrón en Marvel Rivals maps y ranked match para elegir peleas con mejor información.' },
			{ title: 'Marcadores de objectives y cofres', copy: 'Resalta loadouts, cofres y objectives de alto nivel sin saturar la pantalla en plena partida.' },
			{ title: 'Controles Aimbot Marvel Rivals', copy: 'Ajusta suavidad, prioridad de objetivo y teclas para AR, SMG y francotirador antes de comprar.' },
		],
		updatesLabel: 'Actualizaciones Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	fr: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galerie Marvel Rivals',
		subtitle: 'Visuels Marvel Rivals — loadouts, combats d\'escouade et match — avec ESP, radar et Aimbot.',
		lead: 'Marvel Rivals Cheats suit la boucle BR de Marvel Rivals : lire la carte, suivre les escouades, objectives et survivre au objective.',
		highlights: [
			{ title: 'ESP players & escouades', copy: 'Repérez les players ennemis sur Marvel Rivals maps et ranked match pour choisir vos engagements.' },
			{ title: 'Marqueurs objectives & coffres', copy: 'Mettez en évidence loadouts, coffres et objectives haut niveau sans encombrer l\'écran.' },
			{ title: 'Réglages Aimbot Marvel Rivals', copy: 'Ajustez fluidité, priorité cible et raccourcis pour AR, SMG et sniper.' },
		],
		updatesLabel: 'Mises à jour Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	de: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals Galerie',
		subtitle: 'Marvel Rivals-Bilder zu Loadouts, Squad-Kämpfen und match — mit ESP, Radar und Aimbot.',
		lead: 'Marvel Rivals Cheats passt zur Raid-Schleife von Marvel Rivals: Karte lesen, Gegner-Trupps tracken, jagen und Nester überleben.',
		highlights: [
			{ title: 'Player- & Squad-ESP', copy: 'Erkenne feindliche Playeren auf Marvel Rivals maps und ranked match für bessere Rotationsentscheidungen.' },
			{ title: 'Loot- & Vertragsmarker', copy: 'Hebe Loadout-Drops, Verträge und High-Tier-Loot hervor ohne Screen-Spam.' },
			{ title: 'The Marvel Rivals Aimbot Steuerung', copy: 'Feinjustiere Glätte, Zielpriorität und Hotkeys für AR, SMG und Sniper.' },
		],
		updatesLabel: 'Marvel Rivals Cheats Updates',
		updatesShort: 'Updates',
	},
	pt: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galeria Marvel Rivals',
		subtitle: 'Visuais de Marvel Rivals com loadouts, combates de epackrão e match — com ESP, radar e Aimbot.',
		lead: 'Marvel Rivals Cheats segue o loop de Marvel Rivals: ler o mapa, rastrear epackrões, objectivesar e sobreviver ao objective.',
		highlights: [
			{ title: 'ESP de players e epackrões', copy: 'Detecte players inimigos em Marvel Rivals maps e ranked match para escolher lutas com melhor intel.' },
			{ title: 'Marcadores de objectives e cofres', copy: 'Destaque loadouts, cofres e objectives de alto nível sem poluir a tela.' },
			{ title: 'Controles Aimbot Marvel Rivals', copy: 'Ajuste suavidade, prioridade de alvo e atalhos para AR, SMG e sniper.' },
		],
		updatesLabel: 'Atualizações Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	it: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galleria Marvel Rivals',
		subtitle: 'Immagini Marvel Rivals — loadout, scontri di packra e match — con ESP, radar e Aimbot.',
		lead: 'Marvel Rivals Cheats è pensato per il loop di Marvel Rivals: leggere la mappa, tracciare packre nemiche, objectives e sopravvivere al objective.',
		highlights: [
			{ title: 'ESP playeri e packre', copy: 'Individua playeri nemici su Marvel Rivals maps e ranked match per scegliere i fight con più intel.' },
			{ title: 'Marker objectives e coffreti', copy: 'Evidenzia loadout, coffreti e objectives di alto livello senza riempire lo schermo.' },
			{ title: 'Controlli Aimbot Marvel Rivals', copy: 'Regola smoothness, priorità bersaglio e hotkey per AR, SMG e sniper.' },
		],
		updatesLabel: 'Aggiornamenti Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	nl: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals galerij',
		subtitle: 'Marvel Rivals-beelden van loadouts, packgevechten en match — met ESP, radar en Aimbot.',
		lead: 'Marvel Rivals Cheats volgt de match-loop van Marvel Rivals: kaart lezen, vijandelijke packs volgen, jagen en objective zones overleven.',
		highlights: [
			{ title: 'Player- & pack-ESP', copy: 'Spot vijandelijke players op Marvel Rivals maps en ranked match voor betere rotatiebeslissingen.' },
			{ title: 'Loot- & chestmarkers', copy: 'Markeer loadout-drops, chesten en high-tier objectives zonder schermoverlast.' },
			{ title: 'The Marvel Rivals Aimbot instellingen', copy: 'Stel smoothness, doelprioriteit en hotkeys af voor AR, SMG en sniper.' },
		],
		updatesLabel: 'Marvel Rivals Cheats updates',
		updatesShort: 'Updates',
	},
	pl: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galeria Marvel Rivals',
		subtitle: 'Grafiki Marvel Rivals — loadouty, walki drużynowe i match — z ESP, radar i Aimbot.',
		lead: 'Marvel Rivals Cheats pasuje do pętli Marvel Rivals: czytaj mapę, śledź wrogie drużyny, objectivesuj i przeżyj objective.',
		highlights: [
			{ title: 'ESP players i drużyn', copy: 'Wykrywaj wrogich players na Marvel Rivals maps i ranked match dla lepszych decyzji rotacyjnych.' },
			{ title: 'Markery objectivesu i skrzyń', copy: 'Podświetlaj loadouty, petity i wysokiej klasy objectives bez zaśmiecania ekranu.' },
			{ title: 'Sterowanie Aimbot Marvel Rivals', copy: 'Dostosuj płynność, priorytet celu i skróty dla AR, SMG i snajperki.' },
		],
		updatesLabel: 'Aktualizacje Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	ru: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Галерея Marvel Rivals',
		subtitle: 'Визуалы Marvel Rivals — лоадауты, бои отрядов и match — с ESP, радаром и Aimbot.',
		lead: 'Marvel Rivals Cheats создан для рейд-циклу Marvel Rivals: читать карту, отслеживать вражеские отряды, лут и выживать в objective.',
		highlights: [
			{ title: 'ESP игроков и отрядов', copy: 'Замечайте вражеских игроков на Marvel Rivals maps и ranked match для лучших решений по ротации.' },
			{ title: 'Маркеры лута и сундуков', copy: 'Подсвечивайте loadout, сундуки и высокий лут без перегрузки экрана.' },
			{ title: 'Настройки Aimbot Marvel Rivals', copy: 'Настройте плавность, приоритет цели и горячие клавиши для AR, SMG и снайперки.' },
		],
		updatesLabel: 'Обновления Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	tr: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals galerisi',
		subtitle: 'Loadout, takım savaşları ve match görselleri — ESP, radar ve Aimbot ile.',
		lead: 'Marvel Rivals Cheats, Marvel Rivals BR döngüsü için: haritayı oku, düşman takımları izle, objectives al ve objective\'da hayatta kal.',
		highlights: [
			{ title: 'Player ve takım ESP', copy: 'Marvel Rivals maps ve ranked match\'da düşman playerleri görerek daha iyi rotasyon kararları alın.' },
			{ title: 'Loot ve kontrat işaretleri', copy: 'Loadout, kontrat ve üst seviye objectives\'u ekranı doldurmadan vurgulayın.' },
			{ title: 'The Marvel Rivals Aimbot kontrolleri', copy: 'AR, SMG ve sniper için yumuşaklık, hedef önceliği ve kısayolları ayarlayın.' },
		],
		updatesLabel: 'Marvel Rivals Cheats güncellemeleri',
		updatesShort: 'Updates',
	},
	ar: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'معرض Marvel Rivals',
		subtitle: 'صور Marvel Rivals — loadouts ومعارك الفرق وsession — مع ESP ورادار وAimbot.',
		lead: 'Marvel Rivals Cheats مبني لحلقة BR في Marvel Rivals: قراءة الخريطة، تتبع الفرق، جمع اللوت والنجاة في objective.',
		highlights: [
			{ title: 'ESP للمشغلين والفرق', copy: 'اكتشف players المعادين على Marvel Rivals maps وranked match لاختيار القتالات بذكاء.' },
			{ title: 'علامات اللوت والصناديق', copy: 'أبرز loadouts والصناديق واللوت العالي دون ازدحام الشاشة.' },
			{ title: 'تحكم Aimbot Marvel Rivals', copy: 'اضبط النعومة وأولوية الهدف والاختصارات للـ AR وSMG والقناص.' },
		],
		updatesLabel: 'تحديثات Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	ja: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals ギャラリー',
		subtitle: 'ロードアウト、スクワッド戦、BRコンバットのMarvel Rivalsビジュアル — ESP、レーダー、エイムボット付き。',
		lead: 'Marvel Rivals CheatsはMarvel RivalsのBRループ向け：マップを読み、敵スクワッドを追跡し、ルートしてobjectiveを生き延びる。',
		highlights: [
			{ title: 'players＆スクワッドESP', copy: 'Marvel Rivals mapsとranked matchで敵playersを把握し、ローテ判断を改善。' },
			{ title: 'ルート＆チェストマーカー', copy: 'ロードアウト、チェスト、高ティアルートを画面を埋めずに表示。' },
			{ title: 'Marvel Rivalsエイムボット設定', copy: 'AR、SMG、スナイパー向けにスムーズさ、ターゲット優先度、ホットキーを調整。' },
		],
		updatesLabel: 'Marvel Rivals Cheats更新',
		updatesShort: 'Updates',
	},
	ko: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals 갤러리',
		subtitle: '로드아웃, 스쿼드 전투, BR 컴뱃 Marvel Rivals 비주얼 — ESP, 레이더, 에임봇 포함.',
		lead: 'Marvel Rivals Cheats는 Marvel Rivals survival loop용: 맵 읽기, 적 스쿼드 추적, 루트 수집, objective 생존.',
		highlights: [
			{ title: 'players & 스쿼드 ESP', copy: 'Marvel Rivals maps와 ranked match에서 적 players를 파악해 로테이션 결정을 개선.' },
			{ title: '루트 & 상자 마커', copy: '로드아웃, 상자, 고티어 루트를 화면을 가리지 않고 강조.' },
			{ title: 'Marvel Rivals 에임봇 컨트롤', copy: 'AR, SMG, 스나이퍼용 부드러움, 타겟 우선순위, 단축키 조정.' },
		],
		updatesLabel: 'Marvel Rivals Cheats 업데이트',
		updatesShort: 'Updates',
	},
	zh: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals 图库',
		subtitle: 'Marvel Rivals 视觉 — 配装、小队战斗和大逃杀 — 配合 ESP、雷达和自瞄。',
		lead: 'Marvel Rivals Cheats 为 Marvel Rivals survival loop设计：读图、追踪敌方小队、搜刮并在 nest survival。',
		highlights: [
			{ title: 'players与小队 ESP', copy: '在 Marvel Rivals maps 和 ranked match 发现敌方players，做出更好的转点决策。' },
			{ title: '物资与宝箱标记', copy: '高亮配装、宝箱和高级物资，不遮挡屏幕。' },
			{ title: 'Marvel Rivals 自瞄控制', copy: '调整 AR、SMG 和狙击的平滑度、目标优先级和热键。' },
		],
		updatesLabel: 'Marvel Rivals Cheats 更新',
		updatesShort: 'Updates',
	},
	hi: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals गैलरी',
		subtitle: 'Loadout, pack fights और match visuals — ESP, radar और Aimbot के साथ।',
		lead: 'Marvel Rivals Cheats Marvel Rivals survival loop के लिए: map पढ़ें, enemy packs track करें, objectives करें और nest survival करें।',
		highlights: [
			{ title: 'Player & Squad ESP', copy: 'Marvel Rivals maps और ranked match पर enemy players spot करें बेहतर rotation decisions के लिए।' },
			{ title: 'Loot & Chest Markers', copy: 'Loadout drops, chests और high-tier objectives highlight करें screen clutter के बिना।' },
			{ title: 'The Marvel Rivals Aimbot Controls', copy: 'AR, SMG और sniper के लिए smoothness, target priority और hotkeys tune करें।' },
		],
		updatesLabel: 'Marvel Rivals Cheats updates',
		updatesShort: 'Updates',
	},
	id: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galeri Marvel Rivals',
		subtitle: 'Visual Marvel Rivals — loadout, pertempuran pack, dan match — dengan ESP, radar, dan Aimbot.',
		lead: 'Marvel Rivals Cheats untuk loop Marvel Rivals: baca peta, lacak pack musuh, objectives, dan selamat di objective.',
		highlights: [
			{ title: 'ESP player & pack', copy: 'Deteksi player musuh di Marvel Rivals maps dan ranked match untuk keputusan rotasi lebih baik.' },
			{ title: 'Marker objectives & peti', copy: 'Sorot loadout, peti, dan objectives tier tinggi tanpa membanjiri layar.' },
			{ title: 'Kontrol Aimbot Marvel Rivals', copy: 'Atur smoothness, prioritas target, dan hotkey untuk AR, SMG, dan sniper.' },
		],
		updatesLabel: 'Update Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	th: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'แกลเลอรี Marvel Rivals',
		subtitle: 'ภาพ Marvel Rivals — loadout การต่อสู้ทีม และ match — พร้อม ESP เรดาร์และ Aimbot',
		lead: 'Marvel Rivals Cheats สำหรับลูป ของ Marvel Rivals: อ่านแผนที่ ติดตามทีมศัตรู เก็บ objectives และรอด objective',
		highlights: [
			{ title: 'ESP ผู้เล่นและทีม', copy: 'มองเห็นศัตรูบน Marvel Rivals maps และ ranked match เพื่อตัดสินใจหมุนเวียนได้ดีขึ้น' },
			{ title: 'มาร์กเกอร์ objectives และหีบ', copy: 'เน้น loadout หีบและ objectives ระดับสูงโดยไม่รกหน้าจอ' },
			{ title: 'ควบคุม Aimbot Marvel Rivals', copy: 'ปรับความนุ่ม ลำดับเป้าหมาย และ hotkey สำหรับ AR SMG และ sniper' },
		],
		updatesLabel: 'อัปเดต Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	vi: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Thư viện Marvel Rivals',
		subtitle: 'Hình ảnh Marvel Rivals — loadout, chiến đấu pack và match — với ESP, radar và Aimbot.',
		lead: 'Marvel Rivals Cheats cho vòng Marvel Rivals: đọc bản đồ, theo dõi pack địch, objectives và sống sót objective.',
		highlights: [
			{ title: 'ESP player & pack', copy: 'Phát hiện player địch trên Marvel Rivals maps và ranked match để quyết định rotate tốt hơn.' },
			{ title: 'Đánh dấu objectives & rương', copy: 'Làm nổi bật loadout, rương và objectives cao cấp mà không che màn hình.' },
			{ title: 'Điều khiển Aimbot Marvel Rivals', copy: 'Tinh chỉnh độ mượt, ưu tiên mục tiêu và phím tắt cho AR, SMG và sniper.' },
		],
		updatesLabel: 'Cập nhật Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	uk: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Галерея Marvel Rivals',
		subtitle: 'Візуали Marvel Rivals — loadout, бої загонів і match — з ESP, радаром і Aimbot.',
		lead: 'Marvel Rivals Cheats для рейд-циклу Marvel Rivals: читати карту, відстежувати ворожі загони, лут і виживати в objective.',
		highlights: [
			{ title: 'ESP гравців і загонів', copy: 'Помічайте ворожих гравців на Marvel Rivals maps і ranked match для кращих ротацій.' },
			{ title: 'Маркери луту й скринь', copy: 'Підсвічуйте loadout, контракти та високий лут без перевантаження екрана.' },
			{ title: 'Налаштування Aimbot Marvel Rivals', copy: 'Налаштуйте плавність, пріоритет цілі та гарячі клавіші для AR, SMG і снайперки.' },
		],
		updatesLabel: 'Оновлення Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	cs: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galerie Marvel Rivals',
		subtitle: 'Marvel Rivals vizuály — loadouty, pack souboje a match — s ESP, radarem a Aimbot.',
		lead: 'Marvel Rivals Cheats pro BR smyčku Marvel Rivals: číst mapu, sledovat nepřátelské packy, objectives a přežít objective.',
		highlights: [
			{ title: 'ESP players a packů', copy: 'Spozorujte nepřátelské operátory na Marvel Rivals maps a ranked match pro lepší rotační rozhodnutí.' },
			{ title: 'Markery objectivesu a petitů', copy: 'Zvýrazněte loadouty, petity a high-tier objectives bez přeplnění obrazovky.' },
			{ title: 'Ovládání Aimbot Marvel Rivals', copy: 'Nastavte smoothness, prioritu cíle a hotkeys pro AR, SMG a sniper.' },
		],
		updatesLabel: 'Aktualizace Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	ro: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Galerie Marvel Rivals',
		subtitle: 'Vizualuri Marvel Rivals — loadout, lupte de pack și match — cu ESP, radar și Aimbot.',
		lead: 'Marvel Rivals Cheats pentru bucla Marvel Rivals: citește harta, urmărește pack-uri inamice, objectives și supraviețuiește objective.',
		highlights: [
			{ title: 'ESP playeri și pack-uri', copy: 'Detectează playeri inamici pe Marvel Rivals maps și ranked match pentru decizii de rotație mai bune.' },
			{ title: 'Markere objectives și cheste', copy: 'Evidențiază loadout-uri, cheste și objectives de nivel înalt fără a aglomera ecranul.' },
			{ title: 'Controale Aimbot Marvel Rivals', copy: 'Ajustează smoothness, prioritate țintă și hotkeys pentru AR, SMG și sniper.' },
		],
		updatesLabel: 'Actualizări Marvel Rivals Cheats',
		updatesShort: 'Updates',
	},
	sv: {
		eyebrow: 'Marvel Rivals Cheats',
		title: 'Marvel Rivals galleri',
		subtitle: 'Marvel Rivals-bilder — loadouts, packstrider och match — med ESP, radar och Aimbot.',
		lead: 'Marvel Rivals Cheats för Marvel Rivals:s match-loop: läs kartan, spåra fiendepacks, objectivesa och överlev objective.',
		highlights: [
			{ title: 'Player- & pack-ESP', copy: 'Spotta fiendeplayerer på Marvel Rivals maps och ranked match för bättre rotationsbeslut.' },
			{ title: 'Loot- & petitsmarkörer', copy: 'Markera loadout-drops, petit och high-tier objectives utan skärmklutter.' },
			{ title: 'The Marvel Rivals Aimbot-kontroller', copy: 'Justera smoothness, målprioritet och snabbtangenter för AR, SMG och sniper.' },
		],
		updatesLabel: 'Marvel Rivals Cheats uppdateringar',
		updatesShort: 'Updates',
	},
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
