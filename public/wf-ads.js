/* web-free.site ad loader for static guide/legal pages (Adsterra placeholders). */
(function () {
  'use strict';
  if (window.__wfAds) return;
  window.__wfAds = 1;
  var C = {
    pop: 'https://abscloud.org/1/723ef0edef91260acdd45ae86816ebbe',
    social: 'https://bauval.org/14/60d3d29f6304da2b5e5092d99e1e8c3b',
    native: 'https://bauval.org/21/d760933c32f1bf27fa4c132bf4291158',
    nativeId: 'container-d760933c32f1bf27fa4c132bf4291158',
    smart: 'https://araplhn.org/4/b1ff469b7eb678d9f228cfa635cab39b',
    bannerBase: 'https://bauval.org/22/',
    banners: {
      '728x90': '9711fbb9ed23d348226540f7143b6689',
      '468x60': 'f460921b8e24ad1f5ae1e875c499e168',
      '300x250': '3a5a63e865de7bbec675f5ea68fed62c',
      '160x600': '7b1f08ae4cd3ad8b706bb1655fc82f2d',
      '160x300': '39cd994ffa8ac795956c9003766f64f4',
      '320x50': '26a4519b4af88d23c48b0382119c2e3a',
    },
  };
  var d = document;
  var html =
    (d.body ? d.body.innerHTML : '') +
    [].map
      .call(d.scripts, function (s) {
        return s.src || '';
      })
      .join(' ');
  function has(k) {
    return html.indexOf(k) > -1;
  }
  function addScript(src, parent) {
    if (has(src.slice(-8))) return;
    var s = d.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    (parent || d.body).appendChild(s);
  }
  function banner(size, extraStyle) {
    var k = C.banners[size];
    if (!k) return null;
    var wh = size.split('x'),
      w = +wh[0],
      h = +wh[1];
    var box = d.createElement('div');
    box.className = 'wf-ad wf-ad-' + size;
    box.setAttribute('aria-label', 'Advertisement');
    box.style.cssText =
      'margin:1.25rem auto;text-align:center;max-width:100%;overflow:hidden;' + (extraStyle || '');
    var f = d.createElement('iframe');
    f.title = 'Advertisement';
    f.width = w;
    f.height = h;
    f.setAttribute('scrolling', 'no');
    f.setAttribute('frameborder', '0');
    f.setAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation',
    );
    f.style.cssText =
      'border:0;display:block;margin:0 auto;width:' + w + 'px;height:' + h + 'px;max-width:100%';
    f.srcdoc =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>' +
      "<script>atOptions={'key':'" +
      k +
      "','format':'iframe','height':" +
      h +
      ",'width':" +
      w +
      ",'params':{}};</scr" +
      'ipt>' +
      '<script src="' +
      C.bannerBase +
      k +
      '"></scr' +
      'ipt></body></html>';
    box.appendChild(f);
    return box;
  }
  function after(ref, node) {
    if (ref && node && ref.parentNode) ref.parentNode.insertBefore(node, ref.nextSibling);
  }
  function run() {
    var vw = window.innerWidth || d.documentElement.clientWidth || 1024;
    var root = d.querySelector('article') || d.querySelector('main') || d.body;
    var kids = [];
    for (var i = 0; i < root.children.length; i++) {
      var t = root.children[i].tagName;
      if (t !== 'SCRIPT' && t !== 'STYLE') kids.push(root.children[i]);
    }
    var h1 = root.querySelector('h1');
    var firstP = h1 ? h1.nextElementSibling : null;
    var topRef = firstP && firstP.tagName === 'P' ? firstP : h1 || null;
    var topSize = vw >= 780 ? '728x90' : vw >= 500 ? '468x60' : '320x50';
    var top = has(C.banners[topSize]) ? null : banner(topSize);
    if (top) {
      if (topRef) after(topRef, top);
      else root.insertBefore(top, root.firstChild);
    }
    if (!has(C.nativeId)) {
      var nb = d.createElement('div');
      nb.className = 'wf-ad wf-ad-native';
      nb.style.cssText = 'margin:1.5rem 0';
      var nc = d.createElement('div');
      nc.id = C.nativeId;
      nb.appendChild(nc);
      var mid = kids.length > 3 ? kids[Math.floor(kids.length / 2)] : null;
      if (mid && mid !== topRef && mid !== h1) root.insertBefore(nb, mid);
      else root.appendChild(nb);
      addScript(C.native, nb);
    }
    if (!has(C.banners['300x250'])) {
      var b3 = banner('300x250');
      if (b3) root.appendChild(b3);
    }
    if (vw >= 780 && !has(C.banners['468x60']) && topSize !== '468x60') {
      var b4 = banner('468x60');
      if (b4) root.appendChild(b4);
    }
    if (C.smart && !has('araplhn.org')) {
      var p = d.createElement('p');
      p.className = 'wf-ad wf-sponsored';
      p.style.cssText = 'font-size:.8rem;opacity:.75;text-align:center;margin:1rem 0';
      var a = d.createElement('a');
      a.href = C.smart;
      a.target = '_blank';
      a.rel = 'sponsored nofollow noopener';
      a.textContent = 'Sponsored: recommended offers';
      p.appendChild(a);
      root.appendChild(p);
    }
    addScript(C.social, d.body);
    addScript(C.pop, d.body);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', run);
  else run();
})();