/* ================================================================
   CYBERDASH — news.js
   News feed widget: mock data, category filter, refresh
   ================================================================ */

(function () {
  'use strict';

  const NEWS = [
    { id:1,  headline: 'Neural Interface Achieves 1 Gbps Direct Brain-Computer Transfer Rate',
      source: 'TechCrunch',   time: '2h ago',  cat: 'tech',
      thumb: 'https://picsum.photos/seed/neural-interface-tech/120/90',   url: '#' },
    { id:2,  headline: 'Quantum Processors Crack Drug Discovery Barrier — 300x Faster Than Classical Systems',
      source: 'MIT Review',   time: '4h ago',  cat: 'science',
      thumb: 'https://picsum.photos/seed/quantum-chip-blue/120/90',       url: '#' },
    { id:3,  headline: 'Apple Announces AR Glasses Powered by On-Device Neural Engine',
      source: 'The Verge',    time: '5h ago',  cat: 'tech',
      thumb: 'https://picsum.photos/seed/ar-glasses-future/120/90',       url: '#' },
    { id:4,  headline: 'New Design System Bridges Physical and Digital Interaction Paradigms',
      source: 'Designmodo',   time: '6h ago',  cat: 'design',
      thumb: 'https://picsum.photos/seed/design-system-ui/120/90',        url: '#' },
    { id:5,  headline: 'Mars Colonization Timeline Revised: First Crewed Landing Now 2031',
      source: 'SpaceNews',    time: '8h ago',  cat: 'science',
      thumb: 'https://picsum.photos/seed/mars-colony-red/120/90',         url: '#' },
    { id:6,  headline: 'Rust Overtakes Go as Most-Used Systems Language in Developer Survey',
      source: 'Stack Overflow', time: '10h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/rust-programming/120/90',        url: '#' },
    { id:7,  headline: 'Generative UI: How AI Is Reshaping Interface Design Workflows',
      source: 'UX Collective', time: '12h ago', cat: 'design',
      thumb: 'https://picsum.photos/seed/generative-ui-ai/120/90',        url: '#' },
    { id:8,  headline: 'CRISPR Gene Editing Successfully Reverses Aging Markers in Human Trial',
      source: 'Nature',       time: '14h ago', cat: 'science',
      thumb: 'https://picsum.photos/seed/crispr-dna-lab/120/90',          url: '#' },
    { id:9,  headline: 'Edge AI Chips Now Perform Inference at 10 TOPS per Milliwatt',
      source: 'IEEE Spectrum', time: '16h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/ai-chip-edge/120/90',            url: '#' },
    { id:10, headline: 'Motion Design Trends 2025: Physics-Based Interactions Take Center Stage',
      source: 'Dribbble Blog', time: '18h ago', cat: 'design',
      thumb: 'https://picsum.photos/seed/motion-design-trend/120/90',     url: '#' },
    { id:11, headline: 'Open-Source LLM Surpasses GPT-4 on Coding Benchmarks With 7B Parameters',
      source: 'HuggingFace',  time: '20h ago', cat: 'tech',
      thumb: 'https://picsum.photos/seed/llm-ai-model/120/90',            url: '#' },
    { id:12, headline: 'Dark Matter Detection Experiment Records First Statistically Significant Signal',
      source: 'CERN Bulletin', time: '22h ago', cat: 'science',
      thumb: 'https://picsum.photos/seed/dark-matter-physics/120/90',     url: '#' },
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
