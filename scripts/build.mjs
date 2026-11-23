#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-gif-maker.web-free.site';
const ROOT = path.resolve(import.meta.dirname, '..');
const dist = path.join(ROOT, 'dist');
const pub = path.join(ROOT, 'public');

function rimraf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

rimraf(dist);
fs.mkdirSync(dist, { recursive: true });

for (const name of fs.readdirSync(pub)) {
  const src = path.join(pub, name);
  const st = fs.statSync(src);
  if (st.isFile()) fs.copyFileSync(src, path.join(dist, name));
}

fs.copyFileSync(path.join(ROOT, 'upstream/gifio/mark.svg'), path.join(dist, 'mark.svg'));

let html = fs.readFileSync(path.join(ROOT, 'upstream/gifio/index.html'), 'utf8');

const title = 'Free GIF Maker — Create a GIF from Images in Your Browser';
const description =
  'Turn local JPG, PNG, or WebP images into an animated GIF. Reorder frames, set delay and loop, download instantly. No upload, no watermark, no account.';

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(
  /<meta name="description" content="[^"]*">/,
  `<meta name="description" content="${description}">`,
);
html = html.replace(/<h1>gifio<\/h1>/, '<h1>Free GIF Maker</h1>');
html = html.replace(
  /<p class="subtitle">[\s\S]*?<\/p>/,
  `<p class="subtitle">Drop still images, reorder frames, pick delay and loop, and download an animated GIF. Everything runs on your device—nothing is uploaded.</p>`,
);

const headExtras = `
<link rel="canonical" href="${HOST}/" />
<link rel="icon" href="/mark.svg" type="image/svg+xml" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${HOST}/" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="Free GIF Maker" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<link rel="stylesheet" href="/site-chrome.css" />
<script type="application/ld+json" id="jsonld-main">${JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free GIF Maker',
    url: HOST,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Frames are encoded in your browser with a built-in GIF89a encoder. Files never leave your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many pictures do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At least two still images. Drag to reorder, adjust frame delay, then download the GIF.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I make a GIF from a video file here?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This tool is for still images only. For video clips, use the Free Video to GIF Converter instead.',
        },
      },
    ],
  },
])}</script>
`;
html = html.replace('</head>', `${headExtras}\n</head>`);

const chrome = `
<header class="site-chrome">
  <div class="site-chrome__brand">
    <a href="/">Free GIF Maker</a>
    <nav class="site-nav" aria-label="Site">
      <a href="/how-to-make-a-gif-from-images/">How-to</a>
      <a href="/gif-maker-for-discord/">Discord tips</a>
      <a href="/images-to-gif/">Images to GIF</a>
      <a href="/about/">About</a>
      <a href="/privacy/">Privacy</a>
      <a href="https://free-video-to-gif.web-free.site/?ref=gif-maker">Video to GIF</a>
      <a href="https://web-free.site/?ref=gif-maker">More tools</a>
    </nav>
  </div>
  <div id="wf-ad-header" aria-label="Advertisement"></div>
</header>
<div id="seo-intro" class="seo-intro">
  <h1>Free GIF Maker</h1>
  <p>Make an animated GIF from local images in your browser with no upload.</p>
</div>
`;
html = html.replace('<body>', `<body>\n${chrome}`);

html = html.replace(
  '<div id="previewArea" class="preview-area" style="display:none">',
  '<div id="wf-ad-between" aria-label="Advertisement"></div>\n  <div id="previewArea" class="preview-area" style="display:none">',
);

html = html.replace(
  '</div>\n\n  <!-- Bottom -->',
  '</div>\n  <div id="wf-ad-native" aria-label="Advertisement"></div>\n  <p id="wf-smartlink"></p>\n\n  <!-- Bottom -->',
);

const legalFooter = `
<div class="site-footer-legal">
  <p>
    Based on <a href="https://github.com/dabirdwell/gifio" rel="noopener noreferrer" target="_blank">Gifio</a>
    (MIT, Humanity and AI LLC). Built-in GIF89a encoder — no server upload.
    <a href="https://web-free.site/?ref=gif-maker">web-free.site</a>
  </p>
  <p>
    <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> ·
    <a href="/about/">About</a> · <a href="/contact/">Contact</a> ·
    <a href="mailto:gentil@quevvy.com">gentil@quevvy.com</a>
  </p>
</div>
`;
html = html.replace(
  `    <span class="ae-mark" title="Made with &#xC6;">&#xC6;</span>
  </div>
</div>

<style>`,
  `    <span class="ae-mark" title="Made with &#xC6;">&#xC6;</span>
  </div>
  ${legalFooter}
</div>
<div id="wf-ad-mobile-sticky" aria-label="Advertisement" role="complementary"></div>
<script src="/site-ads.js" defer></script>

<style>`,
);

fs.writeFileSync(path.join(dist, 'index.html'), html);
console.log('Wrote dist/index.html (Gifio rebranded)');