/* ================================================================
   CYBERDASH — news.js
   News feed widget: mock data, category filter, refresh
   ================================================================ */

(function () {
  'use strict';

  const NEWS = [
    { id:1,  headline: 'NEURAL MESH ACHIEVES 99.7% SYNC RATE IN SECTOR 4 TRIAL',
      source: 'WIRED.NET',    time: '2h ago',  cat: 'tech',
      thumb: 'https://picsum.photos/seed/neural-mesh-sync-trial/120/90',  url: '#' },
    { id:2,  headline: 'QUANTUM PROCESSOR BREAKS POST-QUANTUM ENCRYPTION BENCHMARK',
      source: 'TECHCORE',     time: '4h ago',  cat: 'science',
      thumb: 'https://picsum.photos/seed/quantum-encrypt-break/120/90',   url: '#' },
    { id:3,  headline: 'NEW UI PARADIGM ELIMINATES PHYSICAL SCREENS ENTIRELY',
      source: 'UX WORLD',     time: '5h ago',  cat: 'design',
      thumb: 'https://picsum.photos/seed/no-screen-ui-future/120/90',     url: '#' },
    { id:4,  headline: 'DARK FIBER NETWORK NOW SPANS ENTIRE PACIFIC RIM CORRIDOR',
      source: 'NET PULSE',    time: '6h ago',  cat: 'tech',
      thumb: 'https://picsum.photos/seed/dark-fiber-pacific/120/90',      url: '#' },
    { id:5,  headline: 'SYNTHETIC BIOLOGY FIRM PATENTS FIRST BIO-CPU ARCHITECTURE',
      source: 'BIOTECH.IO',   time: '8h ago',  cat: 'science',
      thumb: 'https://picsum.photos/seed/bio-cpu-synthetic/120/90',       url: '#' },
    { id:6,  headline: 'GHOST PROTOCOL 3.0 ENABLES UNTRACEABLE P2P MESH ROUTING',
      source: 'CIPHER.LOG',   time: '10h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/ghost-protocol-mesh/120/90',     url: '#' },
    { id:7,  headline: 'HOLOGRAPHIC HUD DESIGN GUIDELINES RELEASED BY AUGMENT.FX',
      source: 'UX WORLD',     time: '12h ago', cat: 'design',
      thumb: 'https://picsum.photos/seed/holographic-hud-ux/120/90',      url: '#' },
    { id:8,  headline: 'RETINAL IMPLANT V2 ACHIEVES 8K RESOLUTION AT 240Hz REFRESH',
      source: 'AUGTECH',      time: '14h ago', cat: 'science',
      thumb: 'https://picsum.photos/seed/retinal-implant-8k/120/90',      url: '#' },
    { id:9,  headline: 'SECTOR 7 MAINFRAME BREACH: 2.4TB OF CLASSIFIED DATA LEAKED',
      source: 'DARKNET.NOW',  time: '16h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/sector7-breach-data/120/90',     url: '#' },
    { id:10, headline: 'NEON INTERFACE SYSTEMS WIN DESIGN OF THE DECADE AWARD',
      source: 'UX WORLD',     time: '18h ago', cat: 'design',
      thumb: 'https://picsum.photos/seed/neon-interface-award/120/90',    url: '#' },
    { id:11, headline: 'OPEN-SOURCE AI CORE OUTPERFORMS PROPRIETARY MODELS ON ZERO-DAY ANALYSIS',
      source: 'TECHCORE',     time: '20h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/ai-core-zeroday/120/90',         url: '#' },
    { id:12, headline: 'CRYOGENIC COMPUTE CLUSTER SETS NEW RECORD AT -269°C OPERATING TEMP',
      source: 'NET PULSE',    time: '22h ago', cat: 'science',
      thumb: 'https://picsum.photos/seed/cryo-compute-record/120/90',     url: '#' },
  ];

  let activeFilter = 'all';

  // ── Build DOM for one item ────────────────────────────────────
  function buildItem(item) {
    const li = document.createElement('li');
    li.className = 'news-item';

    const img = document.createElement('img');
    img.src     = item.thumb;
    img.alt     = '';
    img.className = 'news-thumb';
    img.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'news-content';

    const headline = document.createElement('p');
    headline.className = 'news-headline';
    headline.textContent = item.headline;   // textContent — safe

    const meta = document.createElement('div');
    meta.className = 'news-meta';

    const cat = document.createElement('span');
    cat.className = 'news-cat ' + item.cat;
    cat.textContent = item.cat.toUpperCase();

    const src = document.createElement('span');
    src.textContent = item.source;

    const time = document.createElement('span');
    time.textContent = item.time;

    meta.appendChild(cat);
    meta.appendChild(src);
    meta.appendChild(time);
    content.appendChild(headline);
    content.appendChild(meta);
    li.appendChild(img);
    li.appendChild(content);

    li.addEventListener('click', function () {
      if (item.url && item.url !== '#') window.open(item.url, '_blank', 'noopener');
    });

    return li;
  }

  // ── Render ────────────────────────────────────────────────────
  function render(animate) {
    const list = document.getElementById('newsList');
    if (!list) return;

    const items = activeFilter === 'all'
      ? NEWS
      : NEWS.filter(function (n) { return n.cat === activeFilter; });

    list.textContent = '';   // clear safely
    items.forEach(function (item, i) {
      const li = buildItem(item);
      if (animate) {
        li.style.animationDelay = Math.min(i * 40, 200) + 'ms';
      }
      list.appendChild(li);
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    render(false);

    // Category tabs
    const tabs = document.getElementById('newsTabs');
    if (tabs) {
      tabs.addEventListener('click', function (e) {
        const tab = e.target.closest('.news-tab');
        if (!tab) return;
        document.querySelectorAll('.news-tab').forEach(function (t) {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        activeFilter = tab.dataset.cat || 'all';
        render(true);
      });
    }

    // Refresh button
    const ref = document.getElementById('newsRefBtn');
    if (ref) {
      ref.addEventListener('click', function () {
        const svg = ref.querySelector('svg');
        if (svg) {
          svg.classList.add('spinning');
          svg.addEventListener('animationend', function () {
            svg.classList.remove('spinning');
          }, { once: true });
        }
        render(true);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
