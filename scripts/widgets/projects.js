/* ================================================================
   CYBERDASH — projects.js
   Projects widget: progress bars, add/delete, localStorage
   Progress bars use transform:scaleX for perf (no layout thrash)
   DOM structure matches widgets.css (.proj-head, .proj-bar-track)
   ================================================================ */

(function () {
  'use strict';

  const KEY = 'cyberdash_projects';
  let projects = [];

  // ── Persistence ───────────────────────────────────────────────
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) projects = JSON.parse(raw);
    } catch (_) { projects = []; }

    if (!Array.isArray(projects) || projects.length === 0) {
      projects = [
        { id: 1, name: 'NEXUS UPLINK',    progress: 100, status: 'done',   due: '2026-04-15' },
        { id: 2, name: 'GHOST PROTOCOL',  progress: 67,  status: 'active', due: '2026-07-01' },
        { id: 3, name: 'CIPHER MATRIX',   progress: 34,  status: 'active', due: '2026-08-20' },
        { id: 4, name: 'SHADOW NODE',     progress: 20,  status: 'active', due: '2026-09-10' },
      ];
    }
  }

  function saveState() {
    localStorage.setItem(KEY, JSON.stringify(projects));
  }

  function nextId() {
    return projects.length
      ? Math.max.apply(null, projects.map(function (p) { return p.id; })) + 1
      : 1;
  }

  // ── Build DOM for one item ────────────────────────────────────
  // Matches widgets.css structure:
  //   .proj-item > .proj-head(.proj-status + .proj-name + .proj-pct + .proj-del)
  //              > .proj-bar-track > .proj-bar-fill
  //              > .proj-meta(.proj-due)
  function buildItem(proj) {
    const li = document.createElement('li');
    li.className  = 'proj-item' + (proj.status === 'done' ? ' done' : '');
    li.dataset.id = String(proj.id);

    // ── Header row ──
    const head = document.createElement('div');
    head.className = 'proj-head';

    const dot = document.createElement('span');
    dot.className = 'proj-status ' + proj.status;

    const nameEl = document.createElement('span');
    nameEl.className   = 'proj-name';
    nameEl.textContent = proj.name;   // textContent — safe

    const pctEl = document.createElement('span');
    pctEl.className   = 'proj-pct';
    pctEl.textContent = proj.progress + '%';

    const del = document.createElement('button');
    del.className   = 'proj-del';
    del.textContent = '✕';
    del.title       = 'Delete project';

    head.appendChild(dot);
    head.appendChild(nameEl);
    head.appendChild(pctEl);
    head.appendChild(del);

    // ── Progress bar ──
    const track = document.createElement('div');
    track.className = 'proj-bar-track';

    const fill = document.createElement('div');
    fill.className = 'proj-bar-fill' + (proj.progress === 100 ? ' complete' : '');
    // Set immediately — CSS transition will animate from 0 via animateFills()
    fill.style.transform = 'scaleX(0)';

    track.appendChild(fill);

    // ── Meta row (due date) ──
    const meta = document.createElement('div');
    meta.className = 'proj-meta';

    const due = document.createElement('span');
    due.className   = 'proj-due';
    due.textContent = proj.due ? 'DUE ' + proj.due : '';

    meta.appendChild(due);

    li.appendChild(head);
    li.appendChild(track);
    li.appendChild(meta);
    return li;
  }

  // ── Render ────────────────────────────────────────────────────
  function render() {
    const list = document.getElementById('projList');
    if (!list) return;
    list.textContent = '';
    projects.forEach(function (proj, i) {
      const li = buildItem(proj);
      li.style.animationDelay = Math.min(i * 50, 200) + 'ms';
      list.appendChild(li);
    });
    updateCount();
  }

  function updateCount() {
    const active = projects.filter(function (p) { return p.status !== 'done'; }).length;
    const nb = document.getElementById('nb-projects');
    if (nb) nb.textContent = String(active);
  }

  // ── Animate fills (reset→0 then transition to target) ────────
  function animateFills() {
    document.querySelectorAll('.proj-bar-fill').forEach(function (fill) {
      const li   = fill.closest('.proj-item');
      const id   = li ? parseInt(li.dataset.id, 10) : NaN;
      const proj = projects.find(function (p) { return p.id === id; });
      if (!proj) return;
      fill.style.transition = 'none';
      fill.style.transform  = 'scaleX(0)';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          fill.style.transition = '';
          fill.style.transform  = 'scaleX(' + proj.progress / 100 + ')';
        });
      });
    });
  }

  // ── Modal ─────────────────────────────────────────────────────
  function openModal() {
    const modal = document.getElementById('projModal');
    if (modal) modal.classList.add('open');
  }

  function closeModal() {
    const modal = document.getElementById('projModal');
    if (modal) modal.classList.remove('open');
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    loadState();
    render();
    requestAnimationFrame(animateFills);

    // Add button
    const addBtn = document.getElementById('projAddBtn');
    if (addBtn) addBtn.addEventListener('click', openModal);

    // Modal close buttons
    const closeBtn  = document.getElementById('projModalClose');
    const cancelBtn = document.getElementById('projCancelBtn');
    if (closeBtn)  closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Backdrop click
    const modal = document.getElementById('projModal');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Form submit
    const form = document.getElementById('projForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInp = document.getElementById('projNameInp');
        const progInp = document.getElementById('projProgInp');
        const statSel = document.getElementById('projStatSel');
        const dueInp  = document.getElementById('projDueInp');

        const name     = nameInp ? nameInp.value.trim() : '';
        const progress = progInp
          ? Math.max(0, Math.min(100, parseInt(progInp.value, 10) || 0))
          : 0;
        const status   = statSel ? statSel.value : 'active';
        const due      = dueInp  ? dueInp.value  : '';

        if (!name) return;

        projects.unshift({
          id:       nextId(),
          name:     name,
          progress: progress,
          status:   progress === 100 ? 'done' : status,
          due:      due,
        });

        saveState();
        render();
        requestAnimationFrame(animateFills);
        closeModal();
        form.reset();
      });
    }

    // Delete delegation
    const list = document.getElementById('projList');
    if (list) {
      list.addEventListener('click', function (e) {
        const btn = e.target.closest('.proj-del');
        if (!btn) return;
        const item = btn.closest('.proj-item');
        if (!item) return;
        const id   = parseInt(item.dataset.id, 10);
        projects   = projects.filter(function (p) { return p.id !== id; });
        saveState();
        render();
        requestAnimationFrame(animateFills);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
