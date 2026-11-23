# Cursor agent brief — free-gif-maker

Target: https://free-gif-maker.web-free.site
Repo name (wrangler `name`): `free-gif-maker`
English name: "Free GIF Maker". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is an **images-to-GIF maker** (not a video-to-GIF converter — that already exists at free-video-to-gif.web-free.site). Users drop local stills, reorder frames, set delay/loop, and download an animated GIF. No uploads, no account, no watermark.

## Recommended base (use this)

- Repo: https://github.com/dabirdwell/gifio
- License: MIT (keep `LICENSE`, credit Gifio / Humanity and AI LLC in the footer and on `/about`)
- Stars: 0
- Last commit: 12 Nov 2026, 00:06 Africa/Kigali — `5caeba5e60` on `main`
- Official demo: `https://dabirdwell.github.io/gifio/`
- Stack: a complete single-file browser GIF maker (`index.html`): drag-and-drop, reorder, timing, styling, local download. No server. You must still add prerendered how-to/legal pages around this home tool (do not leave a single unmarked SPA with no crawlable HTML).
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. `LICENSE` is a real MIT file (Copyright (c) 2026 Humanity and AI LLC). Root is `index.html` + `mark.svg` + README — no backend.
- Why this one: MIT with a real `LICENSE` file, a complete working no-upload GIF product that already does images-to-GIF, and a live demo.

## Backup (MIT encoder library)

- Repo: https://github.com/jnordberg/gif.js
- License: MIT (LICENSE file)
- Stars: 4983
- Last commit: 4 Nov 2019, 11:43 Africa/Kigali — `92d27a0284` on `master`
- Official demo: `http://jnordberg.github.io/gif.js/`
- This is the classic browser GIF encoder, not a complete product site. Use it only if Gifio cannot be rebranded cleanly; you would still need prerendered pages and a simple frames UI.

## Do not use these

- `TayMcQuaya/pic2gif-converter` — **no license file**.
- Video-to-GIF apps (including `fireship-io/react-wasm-gif-maker` and our own `web-free-site/free-video-to-gif`). Those solve a different query. A discreet link to `https://free-video-to-gif.web-free.site/?ref=gif-maker` is welcome.
- Server-side, Electron, or FFmpeg-only tools used as the primary images-to-GIF path if a lighter encoder already works.

## What to build on top of dabirdwell/gifio

1. Import the base into this repo, keep the MIT license, and credit Gifio / Humanity and AI LLC (and gif.js if you use it). Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them).
2. Rebrand to "Free GIF Maker". English primary. No FR/SW translations of the site. The home tool turns local images into an animated GIF (reorder, delay, loop, download). Do not make video-to-GIF the primary UX.
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no file upload.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not break frame editing or download.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-gif-maker.web-free.site`; English how-to pages, at least `/how-to-make-a-gif-from-images`, `/gif-maker-for-discord`, and `/images-to-gif` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-gif-maker.web-free.site`. No French landing page.
6. Footer: credit the upstream project, and add a link back to the hub `https://web-free.site/?ref=gif-maker`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the nine other sites in this batch (50 tools in total). Show **Free GIF Maker** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=gif-maker`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=gif-maker`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=gif-maker`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=gif-maker`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=gif-maker`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=gif-maker`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=gif-maker`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=gif-maker`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=gif-maker`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=gif-maker`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=gif-maker`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=gif-maker`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=gif-maker`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=gif-maker`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=gif-maker`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=gif-maker`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=gif-maker`), Free Meme Generator (`https://free-meme-generator.web-free.site/?ref=gif-maker`), Free Color Picker (`https://free-color-picker.web-free.site/?ref=gif-maker`), **Free GIF Maker**, Free Photo Editor (`https://free-photo-editor.web-free.site/?ref=gif-maker`), Free Logo Maker (`https://free-logo-maker.web-free.site/?ref=gif-maker`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/?ref=gif-maker`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=gif-maker`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=gif-maker`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=gif-maker`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=gif-maker`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=gif-maker`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=gif-maker`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=gif-maker`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=gif-maker`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=gif-maker`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=gif-maker`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=gif-maker`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=gif-maker`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=gif-maker`), Free Citation Generator (`https://free-citation-generator.web-free.site/?ref=gif-maker`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=gif-maker`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=gif-maker`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=gif-maker`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=gif-maker`), Free Video to GIF Converter (`https://free-video-to-gif.web-free.site/?ref=gif-maker`), Free Audio Converter (`https://free-audio-converter.web-free.site/?ref=gif-maker`), Free Video Converter (`https://free-video-converter.web-free.site/?ref=gif-maker`).
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=gif-maker`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=gif-maker`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=gif-maker`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=gif-maker`).
     - **Time:** Free Time Zone Converter (`https://free-time-zone-converter.web-free.site/?ref=gif-maker`).
     - **Drawing:** Free Whiteboard (`https://free-whiteboard.web-free.site/?ref=gif-maker`).
     - **Random & pickers:** Free Spin Wheel (`https://free-spin-wheel.web-free.site/?ref=gif-maker`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-gif-maker"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-gif-maker.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally, drop at least 3 images, set a delay, download a GIF, open it and confirm it animates, check mobile at 390px, confirm no file is uploaded, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, which encoder you shipped, pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes are not ready yet (sites are not live). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23bplaceholder`). After a browser agent writes real keys to `adsterra-codes.md`, a later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-gif-maker.web-free.site — site ID SITE_ID_PENDING
Popunder wf23bplaceholderpopunder00000000
Native Banner wf23bplaceholdernativebanner0000
Smartlink wf23bplaceholdersmartlink0000000
Social Bar wf23bplaceholdersocialbar0000000
468x60 wf23bplaceholderbanner468x600000
160x300 wf23bplaceholderbanner160x300000
320x50 wf23bplaceholderbanner320x500000
300x250 wf23bplaceholderbanner300x250000
160x600 wf23bplaceholderbanner160x600000
728x90 wf23bplaceholderbanner728x900000
