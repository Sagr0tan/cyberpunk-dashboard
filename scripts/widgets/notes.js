/* ================================================================
   CYBERDASH — notes.js
   Notes widget: multi-note with localStorage persistence
   ================================================================ */

(function () {
  'use strict';

  const KEY = 'cyberdash_notes';
  let notes    = {};
  let activeId = null;

  // ── Persistence ───────────────────────────────────────────────
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p  = JSON.parse(raw);
        notes    = p.notes    || {};
        activeId = p.activeId || null;
      }
    } catch (_) { notes = {}; }

    if (Object.keys(notes).length === 0) {
      const id = 'note-' + Date.now();
      notes[id] = { name: 'Quick Notes', content: '// CyberDash initialized\n// Ready for input...' };
      activeId  = id;
    }
    if (!activeId || !notes[activeId]) {
      activeId = Object.keys(notes)[0];
    }
  }

  function saveState() {
    localStorage.setItem(KEY, JSON.stringify({ notes, activeId }));
  }

  // ── Render ────────────────────────────────────────────────────
  function renderSelect() {
    const sel = document.getElementById('notesSel');
    if (!sel) return;
    sel.innerHTML = '';
    Object.entries(notes).forEach(function ([id, note]) {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = note.name;   // textContent = safe
      if (id === activeId) opt.selected = true;
      sel.appendChild(opt);
    });
    updateNavBadge();
  }

  function renderContent() {
    const area = document.getElementById('notesArea');
    if (!area || !activeId) return;
    area.value = notes[activeId] ? notes[activeId].content : '';
    updateCharCount();
  }

  function updateCharCount() {
    const area = document.getElementById('notesArea');
    const cc   = document.getElementById('notesCC');
    if (!area || !cc) return;
    cc.textContent = area.value.length.toLocaleString() + ' chars';
  }

  function updateNavBadge() {
    const el = document.getElementById('nb-notes');
    if (el) el.textContent = Object.keys(notes).length;
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    loadState();
    renderSelect();
    renderContent();

    // Note selector
    const sel = document.getElementById('notesSel');
    if (sel) {
      sel.addEventListener('change', function () {
        const area = document.getElementById('notesArea');
        if (area && activeId) notes[activeId].content = area.value;
        activeId = sel.value;
        renderContent();
        saveState();
      });
    }

    // Textarea typing
    const area = document.getElementById('notesArea');
    if (area) {
      area.addEventListener('input', function () {
        if (activeId) notes[activeId].content = area.value;
        updateCharCount();
      });
      area.addEventListener('blur', function () {
        if (activeId) notes[activeId].content = area.value;
        saveState();
      });
    }

    // Save button
    const saveBtn = document.getElementById('notesSaveBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        const area = document.getElementById('notesArea');
        if (area && activeId) notes[activeId].content = area.value;
        saveState();
        saveBtn.textContent = 'SAVED';
        saveBtn.style.color = 'var(--c-green)';
        setTimeout(function () {
          saveBtn.textContent = 'SAVE';
          saveBtn.style.color = '';
        }, 1400);
      });
    }

    // New note
    const newBtn = document.getElementById('noteNewBtn');
    if (newBtn) {
      newBtn.addEventListener('click', function () {
        const area = document.getElementById('notesArea');
        if (area && activeId) notes[activeId].content = area.value;

        const id = 'note-' + Date.now();
        const n  = 'Note ' + (Object.keys(notes).length + 1);
        notes[id] = { name: n, content: '' };
        activeId  = id;
        saveState();
        renderSelect();
        renderContent();
        if (area) area.focus();
      });
    }

    // Delete note
    const delBtn = document.getElementById('noteDelBtn');
    if (delBtn) {
      delBtn.addEventListener('click', function () {
        if (Object.keys(notes).length <= 1) return;
        delete notes[activeId];
        activeId = Object.keys(notes)[0];
        saveState();
        renderSelect();
        renderContent();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
