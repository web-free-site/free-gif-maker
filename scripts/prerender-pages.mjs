#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-gif-maker.web-free.site';
const dist = path.resolve('dist');

const pages = [
  {
    path: '/how-to-make-a-gif-from-images',
    title: 'How to Make a GIF from Images — Free Browser Guide',
    description:
      'Step-by-step: add local JPG or PNG stills, reorder frames, set delay and loop, then download an animated GIF with no upload.',
    h1: 'How to make a GIF from images',
    body: `
      <ol>
        <li>Open the <a href="/">Free GIF Maker</a> on your phone or computer.</li>
        <li>Choose two or more still images from your device, or drag them onto the drop zone.</li>
        <li>Drag thumbnails to reorder frames. Use the filmstrip tools to remove or duplicate frames.</li>
        <li>Set <strong>Speed</strong> (delay between frames) and choose whether the GIF should loop.</li>
        <li>Click <strong>Create GIF</strong>, preview the animation, then <strong>Download the GIF</strong>.</li>
      </ol>
      <p>Nothing is uploaded. Encoding uses Gifio’s in-browser GIF89a encoder. For video clips, try our
        <a href="https://free-video-to-gif.web-free.site/?ref=gif-maker">Video to GIF Converter</a>.</p>
      <p>See also <a href="/gif-maker-for-discord/">GIF size tips for Discord</a> and
        <a href="/images-to-gif/">images to GIF overview</a>.</p>`,
  },
  {
    path: '/gif-maker-for-discord',
    title: 'GIF Maker for Discord — Size and Loop Tips',
    description:
      'Make Discord-friendly GIFs from still images: keep dimensions modest, short loops, and smaller color palettes.',
    h1: 'GIF maker for Discord',
    body: `
      <p>Discord accepts GIF uploads, but large files may fail on mobile or slow connections. When you build a GIF from
        still images:</p>
      <ul>
        <li>Use fewer frames (3–8 is often enough for a reaction GIF).</li>
        <li>Lower output width in the tool (480px or less works well).</li>
        <li>Keep loops short; disable boomerang unless you need it.</li>
        <li>Try dithering off if the file is still too big—flat art compresses better.</li>
      </ul>
      <p>Need to trim a screen recording instead? Use the
        <a href="https://free-video-to-gif.web-free.site/?ref=gif-maker">Free Video to GIF Converter</a>
        with its Discord-oriented presets.</p>
      <p>Back to the <a href="/">image GIF maker</a>.</p>`,
  },
  {
    path: '/images-to-gif',
    title: 'Images to GIF — Turn Photos into an Animated GIF',
    description:
      'Convert a sequence of local still images into one looping GIF. Private, free, and watermark-free.',
    h1: 'Images to GIF converter',
    body: `
      <p>An animated GIF is a flipbook of still pictures. This tool reads JPG, PNG, WebP, and GIF frames locally,
        lets you reorder them, and exports a single looping file—ideal for memes, tutorials, and chat reactions.</p>
      <p>Unlike cloud converters, your images never leave the browser. The encoder is based on
        <a href="https://github.com/dabirdwell/gifio" rel="noopener noreferrer" target="_blank">Gifio</a> (MIT).</p>
      <p><a href="/">Start converting images to GIF</a> or read
        <a href="/how-to-make-a-gif-from-images/">how to make a GIF from images</a>.</p>`,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Free GIF Maker',
    description: 'Privacy policy for Free GIF Maker: local-only processing, analytics, and ads.',
    h1: 'Privacy policy',
    body: `
      <p>Your image files are processed entirely in your web browser. We do not receive, store, or analyze your pictures
        on our servers.</p>
      <p>This site may use Cloudflare Web Analytics and Adsterra advertising. Those services may collect standard
        connection metadata (IP address, browser type, page views). Ad scripts load from third-party domains in isolated
        iframes where possible.</p>
      <p>Contact: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>.</p>`,
  },
  {
    path: '/terms',
    title: 'Terms of Use — Free GIF Maker',
    description: 'Terms for using the free browser-based GIF maker.',
    h1: 'Terms of use',
    body: `
      <p>The tool is provided “as is” without warranty. You are responsible for images you convert and how you share
        resulting GIFs. Do not use the service for unlawful content.</p>
      <p>Upstream GIF encoding software is licensed under MIT (Gifio / Humanity and AI LLC).</p>`,
  },
  {
    path: '/about',
    title: 'About — Free GIF Maker',
    description: 'About this site: Gifio base, MIT license, and the web-free.site tool family.',
    h1: 'About Free GIF Maker',
    body: `
      <p>Free GIF Maker turns local still images into animated GIFs in your browser. It is a rebrand and deployment of
        <a href="https://github.com/dabirdwell/gifio" rel="noopener noreferrer" target="_blank">Gifio</a>
        (MIT, Copyright (c) 2026 Humanity and AI LLC), which includes a built-in GIF89a encoder with dithering—no
        gif.js dependency and no server-side encoding.</p>
      <p>Part of the <a href="https://web-free.site/?ref=gif-maker">web-free.site</a> family. For video sources, see
        <a href="https://free-video-to-gif.web-free.site/?ref=gif-maker">Free Video to GIF Converter</a>.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact — Free GIF Maker',
    description: 'Contact the maintainers of Free GIF Maker.',
    h1: 'Contact',
    body: `
      <p>Questions or feedback: <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>.</p>
      <p>Upstream Gifio issues: <a href="https://github.com/dabirdwell/gifio" rel="noopener noreferrer" target="_blank">GitHub</a>.</p>`,
  },
];

function pageHtml(page) {
  const url = `${HOST}${page.path}/`;
  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.h1,
    url,
    description: page.description,
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${page.title}</title>
<meta name="description" content="${page.description}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.description}" />
<link rel="icon" href="/mark.svg" type="image/svg+xml" />
<link rel="stylesheet" href="/site-chrome.css" />
<style>
body{font-family:Roboto,system-ui,sans-serif;margin:0;background:#faf6f1;color:#3a3530;line-height:1.55}
main{max-width:720px;margin:0 auto;padding:1.25rem 1rem 3rem}
article h1{font-family:'Roboto Serif',Georgia,serif;font-weight:400;font-style:italic;color:#5c4f42}
article a{color:#8b7355}
article li{margin:.35rem 0}
.muted{font-size:.9rem;color:#9a8e82}
</style>
<script type="application/ld+json">${ld}</script>
<script src="https://ref.web-free.site/r.js" defer></script>
<meta property="og:image" content="https://free-gif-maker.web-free.site/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:image" content="https://free-gif-maker.web-free.site/og.png" />
</head>
<body>
<header class="site-chrome">
  <div class="site-chrome__brand">
    <a href="/">Free GIF Maker</a>
    <nav class="site-nav" aria-label="Site">
      <a href="/">Tool</a>
      <a href="/how-to-make-a-gif-from-images/">How-to</a>
      <a href="/gif-maker-for-discord/">Discord</a>
      <a href="/about/">About</a>
      <a href="/privacy/">Privacy</a>
    </nav>
  </div>
</header>
<main>
<article>
<h1>${page.h1}</h1>
${page.body}
<p class="muted"><a href="/">← Back to Free GIF Maker</a></p>
</article>
</main>
<script src="/wf-ads.js" defer></script>
</body>
</html>`;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(page));
}

console.log('Prerendered', pages.length, 'static HTML pages');