/* ================================================================
   CYBERDASH — videos.js
   Video feed widget: carousel (default) + grid toggle
   ================================================================ */

(function () {
  'use strict';

  const VIDEOS = [
    { id: 1, title: 'NEURAL LINK PROTOCOL — Hardwiring Human Cognition',
      channel: 'NETCORE.TV',   duration: '18:42',
      thumb: 'https://picsum.photos/seed/neural-link-protocol/800/450', url: '#' },
    { id: 2, title: 'DARK WEB ARCHITECTURE — Ghost Routing Explained',
      channel: 'CIPHER.NET',   duration: '24:15',
      thumb: 'https://picsum.photos/seed/dark-web-arch-ghost/800/450',  url: '#' },
    { id: 3, title: 'QUANTUM BREACH — Inside a Zero-Day Exploit Chain',
      channel: 'BLACKHAT.IO',  duration: '31:07',
      thumb: 'https://picsum.photos/seed/quantum-breach-exploit/800/450', url: '#' },
    { id: 4, title: 'SYNTHETIC VISION — Retinal HUD Implant Review',
      channel: 'AUGMENT.FX',   duration: '45:20',
      thumb: 'https://picsum.photos/seed/synthetic-vision-hud/800/450',  url: '#' },
    { id: 5, title: 'SHADOWGRID — Building Anonymous Mesh Networks',
      channel: 'GHOST.SIGNAL', duration: '52:33',
      thumb: 'https://picsum.photos/seed/shadowgrid-mesh-anon/800/450',  url: '#' },
    { id: 6, title: 'CIPHER MATRIX — Cracking Post-Quantum Encryption',
      channel: 'CRYPTEX.LAB',  duration: '28:49',
      thumb: 'https://picsum.photos/seed/cipher-matrix-pqc/800/450',    url: '#' },
  ];

  let viewMode   = 'carousel';
  let currentIdx = 0;

  // ── Carousel ──────────────────────────────────────────────────
  function buildSlide(video) {
    const slide = document.createElement('div');
    slide.className = 'vc-slide';

    const img = document.createElement('img');
    img.src     = video.thumb;
    img.alt     = '';
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'vc-play-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('fill', 'currentColor');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '5,3 19,12 5,21');
    svg.appendChild(poly);
    overlay.appendChild(svg);

    const info = document.createElement('div');
    info.className = 'vc-info';

    const title = document.createElement('p');
    title.className   = 'vc-title';
    title.textContent = video.title;

    const meta = document.createElement('div');
    meta.className = 'vc-meta';

    const ch = document.createElement('span');
    ch.className   = 'vc-channel';
    ch.textContent = video.channel;

    const dur = document.createElement('span');
    dur.className   = 'vc-duration';
    dur.textContent = video.duration;

    meta.appendChild(ch);
    meta.appendChild(dur);
    info.appendChild(title);
    info.appendChild(meta);

    slide.appendChild(img);
    slide.appendChild(overlay);
    slide.appendChild(info);

    slide.addEventListener('click', function () {
      if (video.url && video.url !== '#') window.open(video.url, '_blank', 'noopener');
    });

    return slide;
  }

  function renderCarousel() {
    const stage = document.getElementById('vcStage');
    const dots  = document.getElementById('vcDots');
    if (!stage || !dots) return;

    stage.textContent = '';
    dots.textContent  = '';

    VIDEOS.forEach(function (video, i) {
      const slide = buildSlide(video);
      if (i === currentIdx) slide.classList.add('active');
      stage.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'vc-dot' + (i === currentIdx ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dots.appendChild(dot);
    });
  }

  function goTo(idx) {
    const stage = document.getElementById('vcStage');
    const dots  = document.getElementById('vcDots');
    if (!stage || !dots) return;

    const slides   = stage.querySelectorAll('.vc-slide');
    const dotBtns  = dots.querySelectorAll('.vc-dot');

    slides[currentIdx].classList.remove('active');
    dotBtns[currentIdx].classList.remove('active');

    currentIdx = (idx + VIDEOS.length) % VIDEOS.length;

    slides[currentIdx].classList.add('active');
    dotBtns[currentIdx].classList.add('active');
  }

  // ── Grid ──────────────────────────────────────────────────────
  function buildCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    const wrap = document.createElement('div');
    wrap.className = 'video-thumb-wrap';

    const img = document.createElement('img');
    img.src       = 'https://picsum.photos/seed/' + video.thumb.split('/seed/')[1].replace('/800/450', '/280/158');
    img.alt       = '';
    img.className = 'video-thumb';
    img.loading   = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'video-play-icon';
    overlay.setAttribute('aria-hidden', 'true');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '28');
    svg.setAttribute('height', '28');
    svg.setAttribute('fill', 'currentColor');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '5,3 19,12 5,21');
    svg.appendChild(poly);
    overlay.appendChild(svg);

    const dur = document.createElement('span');
    dur.className   = 'video-duration';
    dur.textContent = video.duration;

    wrap.appendChild(img);
    wrap.appendChild(overlay);
    wrap.appendChild(dur);

    const info = document.createElement('div');
    info.className = 'video-info';

    const title = document.createElement('p');
    title.className   = 'video-title';
    title.textContent = video.title;

    const meta = document.createElement('div');
    meta.className = 'video-meta';

    const ch = document.createElement('span');
    ch.className   = 'video-channel';
    ch.textContent = video.channel;

    meta.appendChild(ch);
    info.appendChild(title);
    info.appendChild(meta);

    card.appendChild(wrap);
    card.appendChild(info);

    card.addEventListener('click', function () {
      if (video.url && video.url !== '#') window.open(video.url, '_blank', 'noopener');
    });

    return card;
  }

  function renderGrid() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.textContent = '';
    VIDEOS.forEach(function (video, i) {
      const card = buildCard(video);
      card.style.animationDelay = Math.min(i * 60, 240) + 'ms';
      grid.appendChild(card);
    });
  }

  // ── View toggle ───────────────────────────────────────────────
  function setView(mode) {
    viewMode = mode;
    const carousel    = document.getElementById('videoCarousel');
    const grid        = document.getElementById('videoGrid');
    const btnGrid     = document.getElementById('videoToggleGrid');
    const btnCarousel = document.getElementById('videoToggleCarousel');

    if (mode === 'carousel') {
      if (carousel) carousel.classList.remove('vc-hidden');
      if (grid)     grid.classList.add('vc-hidden');
      if (btnCarousel) btnCarousel.classList.add('wc-active');
      if (btnGrid)     btnGrid.classList.remove('wc-active');
    } else {
      if (carousel) carousel.classList.add('vc-hidden');
      if (grid)     grid.classList.remove('vc-hidden');
      if (btnGrid)     btnGrid.classList.add('wc-active');
      if (btnCarousel) btnCarousel.classList.remove('wc-active');
      renderGrid();
    }
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    renderCarousel();
    setView('carousel');

    const prev = document.getElementById('vcPrev');
    const next = document.getElementById('vcNext');
    if (prev) prev.addEventListener('click', function () { goTo(currentIdx - 1); });
    if (next) next.addEventListener('click', function () { goTo(currentIdx + 1); });

    const btnGrid     = document.getElementById('videoToggleGrid');
    const btnCarousel = document.getElementById('videoToggleCarousel');
    if (btnGrid)     btnGrid.addEventListener('click', function () { setView('grid'); });
    if (btnCarousel) btnCarousel.addEventListener('click', function () { setView('carousel'); });

    const ref = document.getElementById('videoRefBtn');
    if (ref) {
      ref.addEventListener('click', function () {
        const svg = ref.querySelector('svg');
        if (svg) {
          svg.classList.add('spinning');
          svg.addEventListener('animationend', function () {
            svg.classList.remove('spinning');
          }, { once: true });
        }
        currentIdx = 0;
        if (viewMode === 'carousel') renderCarousel();
        else renderGrid();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
