#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "NetEase Games'"],
	['Activision\u2019', "NetEase Games'"],
	['Activision services', 'NetEase Games services'],
	['Activision service', 'NetEase Games service'],
	['Activision platform', 'NetEase Games platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'NetEase Games bans'],
	['Activision security', 'NetEase Anti-Cheat security'],
	['Activision Status', 'Marvel Rivals on Steam'],
	['Activision Marvel Rivals', 'Marvel Rivals'],
	['Activision Support', 'Marvel Rivals on Steam'],
	['Activision', 'NetEase Games'],
	['EAC guide', 'NetEase Anti-Cheat guide'],
	['undetected EAC notes', 'undetected NetEase Anti-Cheat notes'],
	['status.epicgames.com', 'store.steampowered.com/app/2767030/Marvel_Rivals'],
	['www.epicgames.com/marvel-rivals', 'store.steampowered.com/app/2767030/Marvel_Rivals'],
	['www.marvel-rivals.com/official server', 'store.steampowered.com/app/2767030/Marvel_Rivals'],
	['https://www.marvel-rivals.com/', 'https://store.steampowered.com/app/2767030/Marvel_Rivals/'],
	['Marvel Rivals.com', 'Marvel Rivals'],
	['Marvel Rivals Competitive', 'Marvel Rivals'],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
