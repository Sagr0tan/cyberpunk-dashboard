/* ================================================================
   CYBERDASH — app.js
   Clock, sidebar, nav accordion, widget collapse, sys stats
   ================================================================ */

(function () {
  'use strict';

  // ── Clock ─────────────────────────────────────────────────────
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const timeStr = hh + ':' + mm + ':' + ss;

    const yyyy = now.getFullYear();
    const mo   = String(now.getMonth() + 1).padStart(2, '0');
    const dd   = String(now.getDate()).padStart(2, '0');

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('scTime', timeStr);
    set('scDate', yyyy + '.' + mo + '.' + dd);
    set('tbTime', timeStr);
    set('tbDate', yyyy + ' / ' + mo + ' / ' + dd);
  }

  // ── Sidebar toggle ────────────────────────────────────────────
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const btn     = document.getElementById('sbToggle');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
  }

  // ── Nav accordion ─────────────────────────────────────────────
  function initAccordion() {
    document.querySelectorAll('.nav-group-hd').forEach(function (hd) {
      const target = hd.dataset.target;
      const list   = target ? document.getElementById(target) : null;
      if (!list) return;

      if (!list.classList.contains('collapsed')) hd.classList.add('open');

      hd.addEventListener('click', function () {
        const open = hd.classList.toggle('open');
        list.classList.toggle('collapsed', !open);
      });
    });
  }

  // ── Module nav ────────────────────────────────────────────────
  function initModuleNav() {
    document.querySelectorAll('.nav-item[data-module]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.nav-item[data-module]').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        // Update topbar breadcrumb
        const sub = document.getElementById('topbarSub');
        const label = btn.querySelector('span:nth-child(2)');
        if (sub && label) sub.textContent = label.textContent;

        // Flash the target widget
        const wid    = btn.dataset.module;
        const widget = document.getElementById('w-' + wid);
        if (!widget) return;
        widget.style.transition = 'box-shadow 80ms ease';
        widget.style.boxShadow  = '0 0 28px rgba(0,217,255,0.35)';
        setTimeout(function () { widget.style.boxShadow = ''; }, 450);
      });
    });

    // Feed nav dots
    document.querySelectorAll('.nav-item--feed').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.nav-item--feed').forEach(function (b) {
          b.classList.remove('active');
          const dot = b.querySelector('.feed-dot');
          if (dot) dot.classList.remove('on');
        });
        btn.classList.add('active');
        const dot = btn.querySelector('.feed-dot');
        if (dot) dot.classList.add('on');

        // Sync news filter if matching
        const feed = btn.dataset.feed;
        const newsTab = document.querySelector('.news-tab[data-cat="' + feed + '"]');
        if (newsTab) newsTab.click();
      });
    });
  }

  // ── Widget collapse ───────────────────────────────────────────
  function initCollapse() {
    document.querySelectorAll('.wc-collapse').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const wid  = btn.dataset.wid;
        const body = document.getElementById('wb-' + wid);
        if (!body) return;

        const wasCollapsed = body.classList.toggle('collapsed');
        const svg = btn.querySelector('svg');
        if (!svg) return;

        // Toggle icon: minus = collapse, plus = expand
        if (wasCollapsed) {
          svg.innerHTML = '<line x1="6.5" y1="1" x2="6.5" y2="12" stroke="currentColor" stroke-width="1.5"/>'
                        + '<line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" stroke-width="1.5"/>';
        } else {
          svg.innerHTML = '<line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" stroke-width="1.5"/>';
        }
      });
    });
  }

  // ── System stats (simulated) ──────────────────────────────────
  function initSysStats() {
    const cpuFill = document.getElementById('sysCpu');
    const cpuVal  = document.getElementById('sysCpuVal');
    const memFill = document.getElementById('sysMem');
    const memVal  = document.getElementById('sysMemVal');

    let cpu = 30 + Math.random() * 25;
    let mem = 50 + Math.random() * 20;

    function update() {
      cpu = Math.max(5,  Math.min(95, cpu + (Math.random() - 0.48) * 14));
      mem = Math.max(25, Math.min(88, mem + (Math.random() - 0.5)  *  6));

      const cpuR = Math.round(cpu);
      const memR = Math.round(mem);

      // Use transform: scaleX for perf (see widgets.css .sys-fill)
      if (cpuFill) cpuFill.style.transform = 'scaleX(' + cpuR / 100 + ')';
      if (cpuVal)  cpuVal.textContent = cpuR + '%';
      if (memFill) memFill.style.transform = 'scaleX(' + memR / 100 + ')';
      if (memVal)  memVal.textContent = memR + '%';
    }

    update();
    setInterval(update, 3200);
  }

  // ── Refresh button ────────────────────────────────────────────
  function initRefresh() {
    const btn = document.getElementById('tbRefresh');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const svg = btn.querySelector('svg');
      if (!svg) return;
      svg.classList.add('spinning');
      svg.addEventListener('animationend', function () {
        svg.classList.remove('spinning');
      }, { once: true });
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    initSidebar();
    initAccordion();
    initModuleNav();
    initCollapse();
    initSysStats();
    initRefresh();
  }

  document.addEventListener('DOMContentLoaded', init);

}());
