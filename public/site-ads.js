/* Adsterra slots for the Free GIF Maker tool page — isolated banner iframes, placeholders until deploy. */
(function () {
  'use strict';
  if (window.__wfSiteAds) return;
  window.__wfSiteAds = 1;

  const BANNER_BASE = 'https://bauval.org/22';

  function bannerIframe(key, w, h) {
    const atOptions = JSON.stringify({ key, format: 'iframe', height: h, width: w, params: {} });
    const src = `${BANNER_BASE}/${key}`;
    const box = document.createElement('div');
    box.className = `wf-ad wf-ad-${w}x${h}`;
    box.setAttribute('aria-label', 'Advertisement');
    box.style.cssText = 'margin:1rem auto;text-align:center;max-width:100%;overflow:hidden';
    const f = document.createElement('iframe');
    f.title = 'Advertisement';
    f.width = w;
    f.height = h;
    f.setAttribute('scrolling', 'no');
    f.setAttribute('frameborder', '0');
    f.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation',
    );
    f.style.cssText = `border:0;display:block;margin:0 auto;width:${w}px;height:${h}px;max-width:100%`;
    f.srcdoc =
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent">` +
      `<script type="text/javascript">var atOptions = ${atOptions};</script>` +
      `<script type="text/javascript" src="${src}"><\/script></body></html>`;
    box.appendChild(f);
    return box;
  }

  function injectScript(src, marker, parent) {
    if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-ad', marker);
    (parent || document.body).appendChild(s);
  }

  async function run() {
    let cfg;
    try {
      const res = await fetch('/ads.json');
      cfg = await res.json();
    } catch {
      return;
    }
    if (!cfg?.enabled) return;

    const header = document.getElementById('wf-ad-header');
    if (header && cfg.banners?.banner728x90) {
      const b = cfg.banners.banner728x90;
      header.appendChild(bannerIframe(b.key, b.width, b.height));
    }

    const between = document.getElementById('wf-ad-between');
    if (between && cfg.banners?.banner468x60) {
      const b = cfg.banners.banner468x60;
      between.appendChild(bannerIframe(b.key, b.width, b.height));
    }

    const nativeHost = document.getElementById('wf-ad-native');
    if (nativeHost && cfg.nativeBanner) {
      const nc = document.createElement('div');
      nc.id = cfg.nativeBanner.containerId;
      nativeHost.appendChild(nc);
      injectScript(cfg.nativeBanner.src, 'native-banner', nativeHost);
    }

    const mobile = document.getElementById('wf-ad-mobile-sticky');
    if (mobile && cfg.banners?.banner320x50) {
      const b = cfg.banners.banner320x50;
      mobile.appendChild(bannerIframe(b.key, b.width, b.height));
    }

    if (cfg.smartlink?.url) {
      const sl = document.getElementById('wf-smartlink');
      if (sl && !sl.querySelector('a')) {
        const a = document.createElement('a');
        a.href = cfg.smartlink.url;
        a.target = '_blank';
        a.rel = 'sponsored noopener noreferrer';
        a.textContent = cfg.smartlink.label || 'Sponsored';
        sl.appendChild(a);
      }
    }

    injectScript(cfg.socialBar, 'social-bar', document.body);
    injectScript(cfg.popunder, 'popunder', document.head);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();