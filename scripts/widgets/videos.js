/* ================================================================
   CYBERDASH — videos.js
   Video feed widget: mock data, grid layout, hover play overlay
   ================================================================ */

(function () {
  'use strict';

  const VIDEOS = [
    { id: 1,  title: 'Neural Interface Deep Dive: The Future of Brain-Computer Interaction',
      channel: 'TechVision',     duration: '18:42', views: '2.4M',
      thumb: 'https://picsum.photos/seed/neural-bci-tech/280/158',    url: '#' },
    { id: 2,  title: 'Building a Cyberpunk Dashboard with Pure CSS Animations',
      channel: 'CodeCraft',      duration: '24:15', views: '891K',
      thumb: 'https://picsum.photos/seed/cyberpunk-css-code/280/158', url: '#' },
    { id: 3,  title: 'Quantum Computing Explained: From Qubits to Supremacy',
      channel: 'ScienceLab',     duration: '31:07', views: '1.7M',
      thumb: 'https://picsum.photos/seed/quantum-qubit-lab/280/158',  url: '#' },
    { id: 4,  title: 'Motion Design Masterclass: Crafting Immersive UI Transitions',
      channel: 'DesignPulse',    duration: '45:20', views: '654K',
      thumb: 'https://picsum.photos/seed/motion-ui-design/280/158',   url: '#' },
    { id: 5,  title: 'The Architecture of Modern AI Systems at Scale',
      channel: 'AIWeekly',       duration: '52:33', views: '3.1M',
      thumb: 'https://picsum.photos/seed/ai-architecture-scale/280/158', url: '#' },
    { id: 6,  title: 'Rust vs Go in 2025: Systems Programming Showdown',
      channel: 'DevForum',       duration: '28:49', views: '1.2M',
      thumb: 'https://picsum.photos/seed/rust-go-systems-prog/280/158', url: '#' },
  ];

  // ── Build DOM for one card ────────────────────────────────────
  function buildCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';

    // Thumbnail wrapper (.video-thumb-wrap = container, .video-thumb = img)
    const wrap = document.createElement('div');
    wrap.className = 'video-thumb-wrap';

    const img = document.createElement('img');
    img.src       = video.thumb;
    img.alt       = '';
    img.className = 'video-thumb';
    img.loading   = 'lazy';

    // Play overlay — class must match widgets.css .video-play-icon
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

    // Duration badge
    const dur = document.createElement('span');
    dur.className   = 'video-duration';
    dur.textContent = video.duration;

    wrap.appendChild(img);
    wrap.appendChild(overlay);
    wrap.appendChild(dur);

    // Info section
    const info = document.createElement('div');
    info.className = 'video-info';

    const title = document.createElement('p');
    title.className   = 'video-title';
    title.textContent = video.title;   // textContent — safe

    const meta = document.createElement('div');
    meta.className = 'video-meta';

    const ch = document.createElement('span');
    ch.className   = 'video-channel';
    ch.textContent = video.channel;

    const vw = document.createElement('span');
    vw.className   = 'video-channel';   // reuse same subtle style
    vw.textContent = video.views + ' views';

    meta.appendChild(ch);
    meta.appendChild(vw);
    info.appendChild(title);
    info.appendChild(meta);

    card.appendChild(wrap);
    card.appendChild(info);

    card.addEventListener('click', function () {
      if (video.url && video.url !== '#') window.open(video.url, '_blank', 'noopener');
    });

    return card;
  }

  // ── Render ────────────────────────────────────────────────────
  function render() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    grid.textContent = '';
    VIDEOS.forEach(function (video, i) {
      const card = buildCard(video);
      card.style.animationDelay = Math.min(i * 60, 240) + 'ms';
      grid.appendChild(card);
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    render();

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
        render();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
