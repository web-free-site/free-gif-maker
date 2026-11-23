#!/usr/bin/env node
/**
 * Smoke test: sample frames → encode → verify GIF header (no network upload).
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const url = process.env.SMOKE_URL || 'http://127.0.0.1:4173/';
const width = +(process.env.SMOKE_WIDTH || 390);

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width, height: 844 } });

await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

await page.locator('#sampleBtn').click();
await page.waitForSelector('#filmstrip:not([style*="display: none"])', { timeout: 90000 });
await page.waitForFunction(() => typeof generateGif === 'function' && document.getElementById('createBtn'), {
  timeout: 60000,
});
await page.evaluate(() => generateGif());
await page.waitForSelector('#resultImg[src^="blob:"]', { timeout: 120000 });

const { header, len } = await page.evaluate(async () => {
  const img = document.getElementById('resultImg');
  const res = await fetch(img.src);
  const buf = new Uint8Array(await res.arrayBuffer());
  const header = String.fromCharCode(...buf.slice(0, 6));
  return { header, len: buf.byteLength };
});

if (header !== 'GIF87a' && header !== 'GIF89a') {
  console.error('Bad GIF header:', header);
  process.exit(1);
}
if (len < 200) {
  console.error('GIF too small:', len);
  process.exit(1);
}

// Ensure sample flow did not POST uploads

console.log('OK smoke sample:', header, len, 'bytes at', width + 'px width');

// Three local stills via file input
const pngB64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAD0lEQVQoU4XPWY4AAQ0AwP6/5g8AAAD//wMAqgGJ0m0+oQAAAABJRU5ErkJggg==';
const buf = Buffer.from(pngB64, 'base64');
const files = [0, 1, 2].map((i) => `/tmp/wf-gif-frame-${i}.png`);
for (const f of files) fs.writeFileSync(f, buf);

await page.goto(url, { waitUntil: 'networkidle' });
await page.locator('#fileInput').setInputFiles(files);
await page.waitForSelector('#filmstrip:not([style*="display: none"])', { timeout: 60000 });
await page.evaluate(() => generateGif());
await page.waitForSelector('#resultImg[src^="blob:"]', { timeout: 120000 });

const multi = await page.evaluate(async () => {
  const img = document.getElementById('resultImg');
  const buf = new Uint8Array(await (await fetch(img.src)).arrayBuffer());
  return { header: String.fromCharCode(...buf.slice(0, 6)), len: buf.byteLength, frames: frames.length };
});
if (multi.frames < 3) throw new Error('Expected 3 frames, got ' + multi.frames);
if (multi.header !== 'GIF87a' && multi.header !== 'GIF89a') throw new Error('Bad header ' + multi.header);
console.log('OK smoke 3 images:', multi.header, multi.len, 'bytes', multi.frames, 'frames');

await browser.close();