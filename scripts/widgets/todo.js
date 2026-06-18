/* ================================================================
   CYBERDASH — todo.js
   Todo widget: add, complete, delete — localStorage persistence
   All user content rendered via DOM methods (no innerHTML for data)
   ================================================================ */

(function () {
  'use strict';

  const KEY = 'cyberdash_todo';
  let todos = [];

  // ── Persistence ───────────────────────────────────────────────
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) todos = JSON.parse(raw);
    } catch (_) { todos = []; }

    if (!Array.isArray(todos) || todos.length === 0) {
      todos = [
        { id: 1, text: 'CALIBRATE NEURAL INTERFACE',         priority: 'high', done: false },
        { id: 2, text: 'UPDATE FIREWALL PROTOCOLS',          priority: 'high', done: false },
        { id: 3, text: 'SYNC BACKUP TO OFFSITE NODE',        priority: 'med',  done: true  },
        { id: 4, text: 'REVIEW SECTOR 7 ACCESS LOGS',        priority: 'med',  done: false },
        { id: 5, text: 'OPTIMIZE MEMORY ALLOCATION',         priority: 'low',  done: false },
      ];
    }
  }

  function saveState() {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }

  function nextId() {
    return todos.length ? Math.max.apply(null, todos.map(function (t) { return t.id; })) + 1 : 1;
  }

  // ── Render ────────────────────────────────────────────────────
  function buildItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');
    li.dataset.id = String(todo.id);

    // Checkbox
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'todo-check';
    chk.checked = todo.done;
    chk.setAttribute('aria-label', 'Toggle complete');

    // Priority dot
    const dot = document.createElement('span');
    dot.className = 'todo-pri-dot ' + todo.priority;

    // Text
    const txt = document.createElement('span');
    txt.className = 'todo-text';
    txt.textContent = todo.text;   // textContent — safe for user input

    // Delete button
    const del = document.createElement('button');
    del.className = 'todo-del';
    del.textContent = '✕';    // ✕
    del.title = 'Delete';

    li.appendChild(chk);
    li.appendChild(dot);
    li.appendChild(txt);
    li.appendChild(del);
    return li;
  }

  function render() {
    const list = document.getElementById('todoList');
    if (!list) return;
    list.textContent = '';   // clear safely
    todos.forEach(function (todo) {
      list.appendChild(buildItem(todo));
    });
    updateCounts();
  }

  function updateCounts() {
    const remaining = todos.filter(function (t) { return !t.done; }).length;
    const countEl = document.getElementById('todoCount');
    const nbEl    = document.getElementById('nb-todo');
    if (countEl) countEl.textContent = String(remaining);
    if (nbEl)    nbEl.textContent    = String(remaining);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    loadState();
    render();

    // Add task
    const form = document.getElementById('todoForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const inp = document.getElementById('todoInp');
        const pri = document.getElementById('todoPri');
        const text = inp ? inp.value.trim() : '';
        if (!text) return;

        todos.unshift({ id: nextId(), text: text, priority: pri ? pri.value : 'med', done: false });
        saveState();
        render();
        if (inp) inp.value = '';
      });
    }

    // Delegate list events
    const list = document.getElementById('todoList');
    if (!list) return;

    list.addEventListener('change', function (e) {
      if (!e.target.classList.contains('todo-check')) return;
      const item = e.target.closest('.todo-item');
      if (!item) return;
      const id   = parseInt(item.dataset.id, 10);
      const todo = todos.find(function (t) { return t.id === id; });
      if (!todo) return;
      todo.done = e.target.checked;
      item.classList.toggle('done', todo.done);
      saveState();
      updateCounts();
    });

    list.addEventListener('click', function (e) {
      const btn = e.target.closest('.todo-del');
      if (!btn) return;
      const item = btn.closest('.todo-item');
      if (!item) return;
      const id = parseInt(item.dataset.id, 10);
      todos = todos.filter(function (t) { return t.id !== id; });
      saveState();
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', init);

}());
