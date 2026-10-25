(function () {
  'use strict';

  var CM = window.CM = window.CM || {};
  CM.DEV = 'Roniel Nyke Gonzales';
  CM.DEV_ROLE = 'System Owner / Web Development';
  CM.SPONSOR = 'Iloilo Tech Company';
  CM.SPONSOR_LOC = 'Iloilo City';
  CM.ROUND_SIZE = 50;
  CM.PASS_SCORE = 4;

  var STORE_KEY = 'codemind_v2';
  var THEME_KEY = 'codemind_theme';

  CM.$ = function (id) { return document.getElementById(id); };
  CM.esc = function (t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; };
  CM.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  function today() { return new Date().toISOString().slice(0, 10); }

  CM.defaultState = function () {
    var tr = {};
    CM.ALL.forEach(function (t) { tr[t.id] = { passed: false, best: 0, attempts: 0, seen: [], right: 0, total: 0 }; });
    return { name: '', xp: 0, right: 0, total: 0, streak: 0, lastDay: '', perfect: 0, tracks: tr, badges: [], cert: null };
  };
  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return CM.defaultState();
      var s = JSON.parse(raw), d = CM.defaultState();
      Object.keys(d).forEach(function (k) { if (s[k] === undefined) s[k] = d[k]; });
      if (!s.tracks) s.tracks = d.tracks;
      CM.ALL.forEach(function (t) { if (!s.tracks[t.id]) s.tracks[t.id] = d.tracks[t.id]; });
      return s;
    } catch (e) { return CM.defaultState(); }
  }
  CM.state = loadState();
  CM.save = function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(CM.state)); } catch (e) { /* storage unavailable */ } };
  CM.passedCount = function (s) {
    s = s || CM.state;
    return CM.ALL.filter(function (t) { return s.tracks[t.id] && s.tracks[t.id].passed; }).length;
  };
  CM.level = function () { return Math.floor(CM.state.xp / 100) + 1; };
  CM.accuracy = function () { return CM.state.total ? Math.round(CM.state.right / CM.state.total * 100) : 0; };

  CM.updateStreak = function () {
    var s = CM.state, t = today();
    if (s.lastDay === t) return;
    var y = new Date(); y.setDate(y.getDate() - 1);
    s.streak = s.lastDay === y.toISOString().slice(0, 10) ? s.streak + 1 : 1;
    s.lastDay = t;
  };

  CM.toast = function (msg, type) {
    var box = CM.$('toasts');
    if (!box || !window.bootstrap) return;
    var el = document.createElement('div');
    el.className = 'toast align-items-center text-bg-' + (type || 'info') + ' border-0';
    el.innerHTML = '<div class="d-flex"><div class="toast-body">' + CM.esc(msg) + '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
    box.appendChild(el);
    var t = new bootstrap.Toast(el, { delay: 3500 });
    el.addEventListener('hidden.bs.toast', function () { el.remove(); });
    t.show();
  };

  CM.checkBadges = function () {
    CM.BADGES.forEach(function (b) {
      if (CM.state.badges.indexOf(b.id) === -1 && b.test(CM.state)) {
        CM.state.badges.push(b.id);
        CM.toast('Badge unlocked: ' + b.name, 'warning');
      }
    });
  };

  function applyTheme(t) {
    document.documentElement.setAttribute('data-bs-theme', t);
    var b = CM.$('themeBtn');
    if (b) b.innerHTML = t === 'dark' ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
    try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* ignore */ }
  }
  (function earlyTheme() {
    var t = 'dark';
    try { t = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { /* ignore */ }
    document.documentElement.setAttribute('data-bs-theme', t);
  })();

  var PAGES = [
    ['home', 'index.html', 'Dashboard', 'bi-speedometer2'],
    ['tracks', 'tracks.html', 'Tracks', 'bi-grid-fill'],
    ['badges', 'badges.html', 'Badges', 'bi-trophy-fill'],
    ['certificate', 'certificate.html', 'Certificate', 'bi-award-fill'],
    ['about', 'about.html', 'About', 'bi-info-circle-fill']
  ];

  function injectLayout() {
    var page = document.body.getAttribute('data-page') || 'home';
    if (page === 'quiz') page = 'tracks';
    var links = PAGES.map(function (p) {
      return '<li class="nav-item"><a class="nav-link' + (p[0] === page ? ' active' : '') + '" href="' + p[1] + '"><i class="bi ' + p[3] + '"></i> ' + p[2] + '</a></li>';
    }).join('');
    var nav = CM.$('siteNav');
    if (nav) {
      nav.innerHTML =
        '<nav class="navbar navbar-expand-lg sticky-top glass-nav"><div class="container">' +
        '<a class="navbar-brand fw-bold brand" href="index.html"><i class="bi bi-cpu-fill"></i> CODE<span>MIND</span></a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>' +
        '<div class="collapse navbar-collapse" id="navMenu"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">' + links +
        '<li class="nav-item ms-lg-2"><button id="themeBtn" class="btn btn-sm btn-outline-secondary" title="Toggle theme"></button></li>' +
        (page === 'home' ? '<li class="nav-item ms-1"><button id="replayIntro" class="btn btn-sm btn-outline-secondary" title="Replay intro"><i class="bi bi-play-circle"></i> Intro</button></li>' : '') +
        '</ul></div></div></nav>';
    }
    var foot = CM.$('siteFooter');
    if (foot) {
      foot.innerHTML =
        '<div class="container text-center py-4">' +
        '<div class="brand mb-2"><i class="bi bi-cpu-fill"></i> CODE<span>MIND</span></div>' +
        '<p class="mb-1">Developed By : <b>' + CM.DEV + '</b> — ' + CM.DEV_ROLE + '</p>' +
        '<p class="mb-1">Sponsored By : <b>' + CM.SPONSOR + '</b> — ' + CM.SPONSOR_LOC + '</p>' +
        '<p class="small text-secondary mb-2">HTML • CSS • JavaScript • Bootstrap 5</p>' +
        '<button id="resetBtn" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i> Reset Progress</button>' +
        '<p class="small text-secondary mt-3 mb-0">&copy; 2026 ' + CM.DEV + '. Released under the <a href="LICENSE" target="_blank" rel="noopener">THIRD-PARTY License</a>.</p></div>';
    }
    var tb = document.createElement('div');
    tb.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    tb.id = 'toasts';
    document.body.appendChild(tb);

    var theme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
    applyTheme(theme);
    var themeBtn = CM.$('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
    });
    var reset = CM.$('resetBtn');
    if (reset) reset.addEventListener('click', function () {
      if (confirm('Erase all progress, XP, badges and certificate?')) {
        CM.state = CM.defaultState();
        CM.save();
        window.location.href = 'index.html';
      }
    });
  }

  function setupReveal() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { for (var i = 0; i < els.length; i++) els[i].classList.add('in'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }
  CM.setupReveal = setupReveal;

  var queue = [], booted = false;
  CM.ready = function (fn) { if (booted) fn(); else queue.push(fn); };
  function boot() {
    if (booted) return;
    booted = true;
    injectLayout();
    queue.forEach(function (f) { f(); });
    queue = [];
    setupReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
