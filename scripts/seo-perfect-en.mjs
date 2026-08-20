#!/usr/bin/env node
/**
 * Purge Fortnite/Warzone/BR leftovers from EN page source and regenerate i18n.
 * Run: node scripts/seo-perfect-en.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_EN = path.join(ROOT, 'scripts', 'i18n-data', 'pages-en.mjs');

/** @type {Array<[RegExp|string, string]>} */
const replacements = [
	['RadarRadar', 'Radar'],
	// Wrong publishers in prose (EXT.activision already links to escapefrommarvel-rivals.com)
	['published by ${EXT.activision}', 'published by NetEase Games (${EXT.marvelRivals})'],
	['from ${EXT.activision}', 'from ${EXT.marvelRivals}'],
	['via ${EXT.activision}', 'via ${EXT.marvelRivals}'],
	['belong with ${EXT.activision}', 'belong with NetEase Games'],
	['${EXT.activision} terms', 'NetEase terms'],
	['${EXT.activision} season updates', '${EXT.marvelRivals} patch cycle and map updates'],

	['PC & Controllers', 'Windows PC'],
	['PC & Controller Guide', 'Windows PC Guide'],
	['PC and controller cheats', 'Windows PC cheats'],

	// BR / Fortnite lexicon → Marvel Rivals
	['vehicles, objectives', 'players, enemy forces, objectives'],
	['notice vehicles before they push your position', 'spot heroes and enemy team before they push your angle'],
	['Player, boss, and objectives', 'Player, apex, and carcass'],
	['boss and objective awareness cues', 'apex and nest awareness cues'],
	['boss threat cues', 'apex threat cues'],
	['bosses, and objectives', 'apex dinosaurs, and objectives'],
	['track apex dinosaurs and objectives', 'track apex dinosaurs and objectives'],
	['ARs, SMGs, and long-ranges', 'carnivores, ambush builds, and long-range species'],
	['long-range DMR fights and dorms clears', 'long-range ambush pushes and high-traffic zone clears'],
	['Save separate Aimbot profiles for ARs, SMGs, and long-ranges', 'Save separate Aimbot profiles for carnivores, ambush builds, and long-range species'],
	['building and rooftop fights', 'forest and river bank ambushes'],
	['weapons, and NetEase Anti-Cheat', 'species balance, and NetEase Anti-Cheat'],
	['major weapon updates', 'major species balance updates'],
	['boss threat cues, objectives and objective markers', 'apex threat cues, carcass and water markers'],
	['objectives, objectives, and bosses', 'objectives, water sources, and apex dinosaurs'],
	['weapons, camos, skins, or battle pass tiers', 'dinosaurs, skins, or growth tiers'],
	['instant access to weapons', 'instant access to dinosaurs'],
	['enemy packs, bosses, and high-value objectives', 'enemy packs, apex dinosaurs, and high-value objectives'],
	[
		'vehicle threat cues, supply-drop awareness markers, and objectives or chest pins so only BR-critical',
		'apex markers, objective callouts, and carcass pins so only match-critical',
	],
	['Vehicle and supply-drop threat cues', 'Apex and nest awareness cues'],
	['vehicle and supply-drop threat cues', 'boss and objective awareness cues'],
	['loot or chest pins', 'carcass and carcass pins'],
	['Carcass and chest markers', 'Carcass and objective markers'],
	['carcass and chest markers', 'carcass and objective markers'],
	['chests worth the detour', 'high-value objectives worth the detour'],
	['vehicles, and chests', 'bosses, and objectives'],
	['loot, vehicles, and chests', 'loot, bosses, and objectives'],
	['players, objectives, and vehicles', 'players, enemy forces, and objectives'],
	['players, objectives, vehicles', 'players, enemy forces, objectives'],
	['vehicle threat cues', 'boss threat cues'],
	['vehicle pushes', 'flank pushes'],
	['track vehicles and chests', 'track apex dinosaurs and objectives'],
	['full BR loop', 'full match loop'],
	['BR rotations', 'map rotations'],
	['BR-critical', 'session-critical'],
	['endgame circles', 'objective zones'],
	['final circles', 'late-session exfils'],
	['final-circle scrims', 'objective camp fights'],
	['before your first ranked block', 'before your first match'],
	['before ranked', 'before you queue in'],
	['reboot rounds', 'close-range pack fights'],
	['Battle Pass', 'patch cycle progression'],
	[
		'long-range AR beams and close-quarters room clears without reopening menus every spawn',
		'long-range DMR fights and dorms clears without reopening menus every match',
	],
	['assault rifles, SMGs, and snipers', 'ARs, SMGs, and long-ranges'],
	['AR / SMG / sniper', 'AR / SMG / long-range'],
	['players, objectives, and vehicles', 'players, enemy forces, and objectives'],
	['for players, objectives, and vehicles', 'for players, objectives, and exfils'],

	// Broken / truncated meta fragments
	['soft aim, and .', 'soft aim, and radar.'],
	['soft aim, and on Windows PC', 'soft aim, and radar on Windows PC'],
	['soft aim, and for Windows PC', 'soft aim, and radar for Windows PC'],
	['soft aim, and in our', 'soft aim, and radar in our'],
	['soft aim, and maintenance', 'soft aim, and radar maintenance'],
	['soft aim, boxes, and on Windows PC', 'soft aim, and radar on Windows PC'],
	['ESP, Soft Aim, ', 'ESP, Soft Aim & Radar'],
	['Best Hacks with ESP & ', 'ESP Soft Aim & Radar'],
	// Do not replace "ESP, Soft Aim & " globally — it doubles Radar on titles that already end with "& Radar".
	['with — learn', '— learn'],
	['RNetEase Anti-Cheat out for', 'Reach out for'],
	['an NetEase Anti-Cheat', 'a NetEase Anti-Cheat'],
	['After a Escape', 'After an Escape'],
	['after a Escape', 'after an Escape'],

	// Keyword stuffing / nonsense duplicates
	['marvel rivals cheats & marvel rivals cheats', 'marvel rivals cheats'],
	[
		'covering both marvel rivals cheats and marvel rivals cheats search intent',
		'covering both “marvel rivals cheats” and “marvel rivals cheats” search intent',
	],
	[
		'also searched as marvel rivals cheats and marvel rivals cheat.',
		'built for Marvel Rivals on Windows PC.',
	],
	[
		'marvel rivals cheats vs marvel rivals cheats — same stack, clear pages',
		'How this Marvel Rivals Cheats pillar fits nearby pages',
	],
	[
		'Searchers use marvel rivals cheats and marvel rivals cheats interchangeably. This pillar focuses on hacks language; the',
		'Use this pillar for the core product overview. For year-specific buying notes, see the',
	],

	// Point cannibal URLs at canonicals
	['/marvel-rivals-esp-hack/', '/marvel-rivals-esp/'],
	['/marvel-rivals-aimbot-hack/', '/marvel-rivals-aimbot/'],
	['/best-marvel-rivals-cheats/', '/'],
	['best marvel rivals cheats guide', 'Marvel Rivals Cheats pillar'],
	['best marvel rivals cheats checklist', 'marvel rivals cheats checklist'],
	['best marvel rivals cheats', 'marvel rivals cheats'],
	[
		'Prefer softer tracking? Read the <a href="/marvel-rivals-soft-aim/">soft aim guide</a>. Want the search term most players use? See <a href="/marvel-rivals-aimbot/">aimbot hack</a>.',
		'Prefer softer tracking? Read the <a href="/marvel-rivals-soft-aim/">soft aim guide</a>.',
	],
	['Related landings: <a href="/marvel-rivals-cheat-download/">cheat download</a>, <a href="/marvel-rivals-mod-menu/">mod menu</a>, <a href="/marvel-rivals-aimbot/">aimbot hack</a>, <a href="/marvel-rivals-esp/">ESP hack</a>.',
		'Related landings: <a href="/marvel-rivals-cheat-download/">cheat download</a>, <a href="/marvel-rivals-mod-menu/">mod menu</a>, <a href="/marvel-rivals-aimbot/">aimbot</a>, <a href="/marvel-rivals-esp/">ESP</a>.'],
];

let src = readFileSync(PAGES_EN, 'utf8');
let hits = 0;
for (const [from, to] of replacements) {
	if (typeof from === 'string') {
		if (!src.includes(from)) continue;
		const count = src.split(from).length - 1;
		src = src.split(from).join(to);
		hits += count;
	} else {
		const next = src.replace(from, to);
		if (next !== src) hits += 1;
		src = next;
	}
}

writeFileSync(PAGES_EN, src);
console.log(`Replaced ${hits} occurrences in pages-en.mjs`);

const gen = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-i18n-content.mjs')], {
	cwd: ROOT,
	stdio: 'inherit',
});
if (gen.status !== 0) process.exit(gen.status ?? 1);
console.log('Regenerated content.generated.ts');
