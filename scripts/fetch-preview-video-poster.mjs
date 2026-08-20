#!/usr/bin/env node
/**
 * Extract a poster frame from the homepage preview video.
 * Run: node scripts/fetch-preview-video-poster.mjs
 */
import { writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import sharp from 'sharp';

const exec = promisify(execFile);
const VIDEO_URL =
	'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/ef/0510%282%29.mp4';
const imagesDir = path.resolve('public/images');
const tmpPng = path.resolve('tmp/marvel-rivals-preview-poster.png');

await exec('curl', ['-fsSL', VIDEO_URL, '-o', '/tmp/marvel-rivals-preview.mp4']);
await exec('ffmpeg', [
	'-y',
	'-ss',
	'00:00:01.5',
	'-i',
	'/tmp/marvel-rivals-preview.mp4',
	'-vframes',
	'1',
	'-q:v',
	'2',
	tmpPng,
]);

const poster = await sharp(tmpPng).webp({ quality: 82 }).toBuffer();
await writeFile(path.join(imagesDir, 'marvel-rivals-preview-video-poster.webp'), poster);
await writeFile(
	path.join(imagesDir, 'marvel-rivals-preview-video-poster-640w.webp'),
	await sharp(tmpPng).resize(640, 360, { fit: 'cover' }).webp({ quality: 78 }).toBuffer(),
);

console.log(`✓ marvel-rivals-preview-video-poster.webp (${Math.round(poster.length / 1024)}KB)`);
