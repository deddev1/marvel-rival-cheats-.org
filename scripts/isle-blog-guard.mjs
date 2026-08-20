/** Shared Isle/The Isle leak detection and Marvel Rivals Cheats replacements. */

/** Regex patterns that must not appear in published blog or EN page copy. */
export const MARATHON_BANNED = [
	/\bmarathon\b/i,
	/\bMarathon\b/,
	/\bmarathoncheats\b/i,
	/\bbungie\b/i,
	/\bBungie\b/,
	/\bBattlEye\b/i,
	/\bbattleye\b/i,
	/\bTau Ceti\b/i,
	/\bUESC\b/,
	/\bRunner(s)?\b/,
	/\bexfil\b/i,
	/\bextraction run\b/i,
	/\bextraction shooter\b/i,
];

/** Regex patterns that must not appear in published blog or EN page copy. */
export const ISLE_BANNED = [
	/\bdinosaur(s)?\b/i,
	/\bjuvenile(s)?\b/i,
	/\bnest(s)?\b/i,
	/\bspecies\b/i,
	/\bcarnivore(s)?\b/i,
	/\bapex spawn\b/i,
	/\bgrowth tier(s)?\b/i,
	/\bgrown dinosaur\b/i,
	/\bCarcass ESP\b/i,
	/\bNest cues\b/i,
	/\bper-species\b/i,
	/\bbite (damage|height)\b/i,
	/\bAI dinosaur\b/i,
	/\bmarvel-rivals-dinosaur-tier-list\b/i,
	/\bmarvel-rivals-growth-run-aggressive-strategies\b/i,
	/\bundetected-marvel-rivals-cheats-eac\b/i,
	/\bEAC maintenance\b/i,
	/\beac patch\b/i,
	/\beac 2026\b/i,
	/\beac marvel-rivals\b/i,
	/\b\bEAC\b/,
];

/** Ordered replacements — longer / URL-specific patterns first. */
export const ISLE_REPLACEMENTS = [
	['/blog/marvel-rivals-dinosaur-tier-list/', '/blog/marvel-rivals-hero-tier-list/'],
	['/blog/marvel-rivals-growth-run-aggressive-strategies/', '/blog/marvel-rivals-ranked-strategies/'],
	['/blog/undetected-marvel-rivals-cheats-eac/', '/blog/undetected-marvel-rivals-cheats-neac/'],
	['marvel-rivals-dinosaur-tier-list', 'marvel-rivals-hero-tier-list'],
	['marvel-rivals-growth-run-aggressive-strategies', 'marvel-rivals-ranked-strategies'],
	['undetected-marvel-rivals-cheats-eac', 'undetected-marvel-rivals-cheats-neac'],
	['Marvel Rivals Hero Tier List', 'Marvel Rivals Hero Tier List'],
	['Marvel Rivals dinosaur tier list', 'Marvel Rivals hero tier list'],
	['dinosaur tier list', 'hero tier list'],
	['dinosaur tiers', 'hero tiers'],
	['dinosaur build', 'hero build'],
	['meta dinosaurs', 'meta heroes'],
	['best marvel-rivals dinosaurs', 'best Marvel Rivals heroes'],
	['marvel rivals meta dinosaurs', 'marvel rivals meta heroes'],
	['marvel-rivals dinosaur tier list', 'marvel-rivals hero tier list'],
	['Marvel Rivals Ranked Run Strategies', 'Marvel Rivals Ranked Run Strategies'],
	['Marvel Rivals Ranked Run Strategies That Actually Find Carcasses', 'Marvel Rivals Ranked Run Strategies That Actually Pay Off'],
	['growth-run strategies', 'ranked-match strategies'],
	['growth aggression guide', 'team fight aggression guide'],
	['growth aggression', 'team fight aggression'],
	['growth strategies article', 'ranked strategies article'],
	['growth strategies', 'ranked strategies'],
	['growth advantage', 'kit advantage'],
	['growth panic', 'ult panic'],
	['growth path', 'map callout'],
	['growth goals', 'credit goals'],
	['growth economy', 'hero meta economy'],
	['growth stats', 'hero stats'],
	['Growth Runs', 'Ranked Matches'],
	['growth match', 'ranked match'],
	['Growth match', 'Ranked match'],
	['marvel-rivals juvenile', 'marvel-rivals objectiveion'],
	['Juvenile timing', 'Early-run timing'],
	['spawn as a juvenile', 'queue your first match'],
	['Passive juvenile players', 'Passive early-run players'],
	['juvenile builds', 'starter kits'],
	['focused juvenile', 'focused practice'],
	['quiet juvenile', 'quiet practice lobby'],
	['Carcass ESP', 'Hero ESP'],
	['Nest cues', 'Exfil cues'],
	['nest awareness', 'map awareness'],
	['nest campers', 'objective campers'],
	['nest camping', 'objective camping'],
	['nest camping patterns', 'objective hold patterns'],
	['nest plans', 'team plans'],
	['nest plan', 'team plan'],
	['nest route', 'map rotation'],
	['nest timing', 'objective timing'],
	['holding a nest', 'holding an objective'],
	['who holds nest', 'who holds objective'],
	['nest calls', 'map callouts'],
	['nest safety', 'position safety'],
	['and nest before', 'and secure the objective before'],
	['per-species profiles', 'per-hero profiles'],
	['species profiles', 'hero profiles'],
	['species choice', 'hero choice'],
	['main species', 'main hero'],
	['species unlocks', 'hero unlocks'],
	['mid-tier species', 'mid-tier weapons'],
	['long-range species', 'long-range weapons'],
	['adult carnivores', 'contested hero picks'],
	['mid-tier carnivore', 'reliable primary'],
	['mid-tier carnivores', 'reliable primaries'],
	['reliable mid-tier carnivore', 'reliable primary weapon'],
	['carnivore, ambush', 'SMG, DMR'],
	['carnivores, ambush', 'SMG, DMR'],
	['carnivore, ambush, and long-range', 'SMG, DMR, and long-range'],
	['Save carnivore, ambush, and long-range profiles', 'Save SMG, DMR, and long-range profiles'],
	['grown dinosaur', 'expensive kit'],
	['grown dinosaurs', 'expensive kits'],
	['AI dinosaur shuffle', 'AI patrol shuffle'],
	['AI dinosaurs', 'AI patrols'],
	['practice server with AI dinosaurs', 'firing range with moving targets'],
	['pre-aim bite height', 'pre-aim head level'],
	['bite damage', 'damage'],
	['attack timing', 'recoil control'],
	['apex spawn rates', 'hot spawn rates'],
	['apex spawn changes', 'hot spawn changes'],
	['an growth tier', 'a backup loadout'],
	['growth tier', 'hero tier'],
	['EAC maintenance', 'NetEase Anti-Cheat maintenance'],
	['eac patch', 'neac patch'],
	['eac 2026', 'neac 2026'],
	['eac marvel-rivals', 'neac marvel rivals'],
	['eac updates', 'neac updates'],
	['${EXT.neac}', '${EXT.neac}'], // no-op anchor
];

export function applyIsleReplacements(text) {
	let out = text;
	for (const [from, to] of ISLE_REPLACEMENTS) {
		if (out.includes(from)) out = out.split(from).join(to);
	}
	return out;
}

export function findMarathonLeaks(text, label = 'content') {
	const hits = [];
	for (const re of MARATHON_BANNED) {
		const m = text.match(re);
		if (m) hits.push({ label, pattern: re.source, match: m[0] });
	}
	return hits;
}

export function findIsleLeaks(text, label = 'content') {
	const hits = [];
	for (const re of ISLE_BANNED) {
		const m = text.match(re);
		if (m) hits.push({ label, pattern: re.source, match: m[0] });
	}
	return hits;
}
