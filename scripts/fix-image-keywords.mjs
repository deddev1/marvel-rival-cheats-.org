#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const SIMPLE =
	"images: { hero: 'marvel rivals cheats', espWallhack: 'marvel rivals cheats wallhack', aimbotCombat: 'marvel rivals cheats aimbot', packFight: 'marvel rivals cheats', dinoEsp: 'marvel rivals cheats esp', headerArt: 'marvel rivals cheats aimbot', hacksPackage: 'marvel rivals cheats radar', ambushFight: 'marvel rivals cheats aimbot', battleRoyale: 'marvel rivals cheats', survivalIsland: 'marvel rivals cheats esp' }";

const re =
	/images: \{ hero: '[^']+', espWallhack: '[^']+', aimbotCombat: '[^']+', packFight: '[^']+', dinoEsp: '[^']+', headerArt: '[^']+', hacksPackage: '[^']+', ambushFight: '[^']+', battleRoyale: '[^']+', survivalIsland: '[^']+' \}/g;

for (const f of ['scripts/i18n-data/ui-strings-part1.mjs', 'scripts/i18n-data/ui-strings-part2.mjs']) {
	const c = readFileSync(f, 'utf8');
	const n = c.replace(re, SIMPLE);
	writeFileSync(f, n);
	console.log(f, (c.match(re) || []).length, 'image blocks simplified');
}

const altMap = [
	["imageAlt: 'Marvel Rivals ESP player tags hack'", "imageAlt: 'marvel rivals cheats esp'"],
	["imageAlt: 'Marvel Rivals ESP radar hack'", "imageAlt: 'marvel rivals cheats radar'"],
	["imageAlt: 'Marvel Rivals Aimbot sniper kill'", "imageAlt: 'marvel rivals cheats aimbot'"],
	["imageAlt: 'Marvel Rivals Aimbot skeleton targeting'", "imageAlt: 'marvel rivals cheats aimbot'"],
	["imageAlt: 'marvel rivals cheats ADS combat'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats setup PC activation'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats updates NetEase Anti-Cheat maintenance'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats FAQ ESP aimbot'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats support license help'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'Undetected marvel rivals cheats ESP wallhack'", "imageAlt: 'undetected marvel rivals cheats'"],
	["imageAlt: 'marvel rivals wallhack skeleton ESP'", "imageAlt: 'marvel rivals cheats wallhack'"],
	["imageAlt: 'NetEase Anti-Cheat bypass marvel-rivals ESP aimbot'", "imageAlt: 'marvel rivals cheats eac'"],
	["imageAlt: 'marvel rivals cheats 2026 ESP aimbot'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats combat aimbot'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheat download ESP aimbot'", "imageAlt: 'marvel rivals cheats download'"],
	["imageAlt: 'Marvel Rivals mod menu ESP aimbot'", "imageAlt: 'marvel rivals cheats mod menu'"],
	["imageAlt: 'Marvel Rivals soft aim aimbot settings'", "imageAlt: 'marvel rivals cheats soft aim'"],
	["imageAlt: 'Best marvel rivals cheats 2026 ESP'", "imageAlt: 'best marvel rivals cheats'"],
	["imageAlt: 'Marvel Rivals Aimbot hack combat'", "imageAlt: 'marvel rivals cheats aimbot'"],
	["imageAlt: 'Marvel Rivals ESP hack wallhack'", "imageAlt: 'marvel rivals cheats esp'"],
	["imageAlt: 'Marvel Rivals unlock all species ESP aimbot guide'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats privacy policy'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats refund policy'", "imageAlt: 'marvel rivals cheats'"],
	["imageAlt: 'marvel rivals cheats terms of use'", "imageAlt: 'marvel rivals cheats'"],
];

let pages = readFileSync('scripts/i18n-data/pages-en.mjs', 'utf8');
for (const [from, to] of altMap) pages = pages.split(from).join(to);
writeFileSync('scripts/i18n-data/pages-en.mjs', pages);
console.log('pages-en imageAlts simplified');

// productPage() imageAlt template in pages-i18n
let i18n = readFileSync('scripts/i18n-data/pages-i18n.mjs', 'utf8');
i18n = i18n
	.split("imageAlt: `Marvel Rivals ${meta.altKeyword}`")
	.join("imageAlt: 'marvel rivals cheats'")
	.split("galleryTitle: `Marvel Rivals Cheats ${topicName}`")
	.join("galleryTitle: 'marvel rivals cheats'")
	.split("imageAlt: `marvel rivals cheats ${kind} policy`")
	.join("imageAlt: 'marvel rivals cheats'")
	.split("galleryTitle: `Marvel Rivals Cheats ${kind} resources`")
	.join("galleryTitle: 'marvel rivals cheats'");
writeFileSync('scripts/i18n-data/pages-i18n.mjs', i18n);
console.log('pages-i18n image alts simplified');
