(function () {
  'use strict';
  var CM = window.CM;
  var SEEN_KEY = 'cm_intro_seen';
  var DUR = [4600, 3800, 3800, 4600, 3800]; // last scene (call to action) stays until the user continues
  var el = null, timers = [], progRAF = null, keyFn = null;
  var pRunning = false, pRAF = null, resizeFn = null;
  var soundOn = true, hintEl = null, actx = null, pad = null, padGain = null, curScene = 0, unlockFn = null;

  function sceneHTML() {
    var letters = 'CODEMIND'.split('').map(function (ch, i) {
      return '<span class="' + (i >= 4 ? 'hl' : '') + '" style="--i:' + i + '">' + ch + '</span>';
    }).join('');
    var tiles = CM.TRACKS.map(function (t, i) {
      return '<div class="tile" style="--i:' + i + ';--c:' + t.color + '"><i class="bi ' + t.icon + '"></i><span>' + t.name + '</span></div>';
    }).join('');
    var stack = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Bootstrap Icons', 'Canvas API', 'LocalStorage'].map(function (c, i) {
      return '<span style="--i:' + i + '">' + c + '</span>';
    }).join('');
    var total = CM.TRACKS.reduce(function (n, t) { return n + t.qs.length; }, 0);
    return '' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<div class="rings"><span style="--i:0"></span><span style="--i:1"></span><span style="--i:2"></span></div>' +
        '<div class="logo-core"><i class="bi bi-cpu-fill"></i></div>' +
        '<h1 class="i-title" aria-label="CODEMIND">' + letters + '</h1>' +
        '<p class="i-tag fade-up" style="--d:1.9s">Train Your Mind. Think Like a Developer.</p>' +
      '</div>' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<div class="avatar pop-in" style="--d:.1s"><i class="bi bi-person-fill"></i></div>' +
        '<p class="i-label fade-up" style="--d:.4s">System Developed By :</p>' +
        '<h2 class="i-name"><span class="wipe" style="--d:.7s">' + CM.DEV + '</span></h2>' +
        '<div class="i-line"></div>' +
        '<p class="i-text fade-up" style="--d:1.6s">' + CM.DEV_ROLE + '</p>' +
      '</div>' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<div class="emblem pop-in" style="--d:.1s"><i class="bi bi-building"></i></div>' +
        '<p class="i-label fade-up" style="--d:.4s">Proudly Sponsored By : </p>' +
        '<h2 class="i-name gold"><span class="wipe" style="--d:.7s">' + CM.SPONSOR + '</span></h2>' +
        '<div class="i-line"></div>' +
        '<p class="i-text fade-up" style="--d:1.6s"><i class="bi bi-geo-alt-fill"></i> ' + CM.SPONSOR_LOC + ', Philippines</p>' +
      '</div>' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<p class="i-label fade-up" style="--d:.1s">Learn by solving</p>' +
        '<div class="tiles">' + tiles + '</div>' +
        '<p class="i-text fade-up" style="--d:1.9s"><b>' + CM.TRACKS.length + '</b> tracks • <b>' + total + '</b> challenges • XP, badges &amp; a certificate</p>' +
      '</div>' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<p class="i-label fade-up" style="--d:.1s">Built with</p>' +
        '<div class="chips">' + stack + '</div>' +
        '<p class="i-tag fade-up" style="--d:1.6s">Debug. Think. Prove your skills.</p>' +
      '</div>' +
      '<div class="scene"><div class="i-sweep"></div>' +
        '<h2 class="i-name fade-up" style="--d:.1s">Ready, Developer?</h2>' +
        '<div class="i-line"></div>' +
        '<button id="introEnter" class="btn btn-lg btn-neon pulse fade-up" style="--d:.6s"><i class="bi bi-rocket-takeoff-fill"></i> ENTER CODEMIND</button>' +
        '<p class="i-text mt-3 fade-up" style="--d:1s">or press Enter</p>' +
      '</div>';
  }

  function build() {
    if (el) el.remove();
    el = document.createElement('div');
    el.id = 'intro';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'CODEMIND introduction');
    el.innerHTML =
      '<canvas class="i-canvas" id="introCanvas"></canvas>' +
      '<div class="i-grid"></div><div class="i-vignette"></div>' +
      '<div class="i-bar top"></div><div class="i-bar bottom"></div>' +
      '<button id="introSkip" class="btn btn-sm btn-outline-light i-ctrl right">Skip <i class="bi bi-skip-forward-fill"></i></button>' +
      sceneHTML() +
      '<div class="i-progress"><span id="introBar"></span></div>';
    document.body.appendChild(el);
  }

  function tone(freq, dur, delay, vol) {
    if (!soundOn || !actx) return;
    try {
      var o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + (delay || 0);
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.08, t0 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    } catch (e) { /* ignore audio errors */ }
  }
  var NOTES = [[220, 330, 440, 660], [330, 392, 494], [392, 494, 587], [262, 330, 392, 523], [294, 370, 440], [440, 554, 659, 880]];
  function sceneSound(i) {
    (NOTES[i] || []).forEach(function (f, k) { tone(f, 1.2, k * 0.18, 0.12); });
  }
  function initAudio() {
    if (!actx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try { actx = new AC(); } catch (e) { return; }
    }
    if (!pad) {
      try {
        pad = actx.createOscillator(); padGain = actx.createGain();
        pad.type = 'sine'; pad.frequency.value = 110;
        padGain.gain.value = soundOn ? 0.05 : 0;
        pad.connect(padGain); padGain.connect(actx.destination); pad.start();
      } catch (e) { pad = null; }
    }
    function resume() {
      if (actx && actx.state === 'suspended' && actx.resume) actx.resume();
      if (actx && actx.state === 'running') {
        sceneSound(curScene); removeUnlock();
        if (hintEl) { hintEl.remove(); hintEl = null; }
      }
    }
    resume();
    if (actx.state !== 'running' && el && !hintEl) {
      hintEl = document.createElement('div');
      hintEl.className = 'sound-hint';
      hintEl.innerHTML = '<i class="bi bi-volume-up-fill"></i> Tap anywhere to start the sound';
      el.appendChild(hintEl);
    }
    if (actx.state !== 'running' && !unlockFn) {
      unlockFn = resume;
      ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend'].forEach(function (ev) { document.addEventListener(ev, unlockFn); });
    }
  }
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && actx && actx.state === 'suspended' && actx.resume) actx.resume();
  });
  function removeUnlock() {
    if (!unlockFn) return;
    ['pointerdown', 'pointerup', 'click', 'keydown', 'touchstart', 'touchend'].forEach(function (ev) { document.removeEventListener(ev, unlockFn); });
    unlockFn = null;
  }
  function stopAudio() {
    removeUnlock();
    if (pad) { try { pad.stop(); } catch (e) { /* ignore */ } pad = null; padGain = null; }
  }

  function startParticles() {
    stopParticles();
    var c = CM.$('introCanvas');
    if (!c || !c.getContext) return;
    var ctx = c.getContext('2d');
    function size() { c.width = window.innerWidth; c.height = window.innerHeight; }
    size();
    resizeFn = size;
    window.addEventListener('resize', resizeFn);
    var pts = [], i;
    for (i = 0; i < 80; i++) pts.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7, r: Math.random() * 2 + 1 });
    var glyphs = '{}<>/;=()[]01$#'.split('');
    var drops = [];
    for (i = 0; i < Math.ceil(c.width / 22); i++) drops.push(Math.random() * c.height / 22);
    pRunning = true;
    function frame() {
      if (!pRunning) return;
      if (drops.length < Math.ceil(c.width / 22)) { for (var n = drops.length; n < Math.ceil(c.width / 22); n++) drops.push(0); }
      ctx.fillStyle = 'rgba(2,4,13,.2)'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'rgba(0,229,255,.28)'; ctx.font = '16px monospace';
      for (var x = 0; x < drops.length; x++) {
        ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x * 22, drops[x] * 22);
        if (drops[x] * 22 > c.height && Math.random() > 0.975) drops[x] = 0;
        drops[x] += 0.5;
      }
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = 'rgba(124,77,255,.9)'; ctx.fill();
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.strokeStyle = 'rgba(0,229,255,' + ((1 - d / 120) * 0.35) + ')'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      pRAF = requestAnimationFrame(frame);
    }
    frame();
  }
  function stopParticles() {
    pRunning = false;
    if (pRAF) cancelAnimationFrame(pRAF);
    pRAF = null;
    if (resizeFn) { window.removeEventListener('resize', resizeFn); resizeFn = null; }
  }

  function showScene(i) {
    var scenes = el.querySelectorAll('.scene');
    for (var k = 0; k < scenes.length; k++) scenes[k].classList.toggle('active', k === i);
    curScene = i;
    sceneSound(i);
  }

  function play() {
    clearTimers();
    build();
    document.body.style.overflow = 'hidden';
    var total = DUR.reduce(function (a, b) { return a + b; }, 0), start = Date.now(), at = 0;
    requestAnimationFrame(function () { if (el) el.classList.add('playing'); });
    var sceneCount = el.querySelectorAll('.scene').length;
    for (var i = 0; i < sceneCount; i++) {
      (function (idx, when) { timers.push(setTimeout(function () { showScene(idx); }, when)); })(i, at + 300);
      at += DUR[i] || 0;
    }
    function bar() {
      if (!el) return;
      var p = Math.min(1, (Date.now() - start) / total), b = CM.$('introBar');
      if (b) b.style.width = (p * 100) + '%';
      if (p < 1) progRAF = requestAnimationFrame(bar);
    }
    bar();
    startParticles();
    initAudio();

    CM.$('introSkip').addEventListener('click', close);
    CM.$('introEnter').addEventListener('click', close);
    keyFn = function (e) { if (e.key === 'Enter' || e.key === 'Escape') close(); };
    document.addEventListener('keydown', keyFn);
  }

  function clearTimers() {
    timers.forEach(clearTimeout); timers = [];
    if (progRAF) cancelAnimationFrame(progRAF);
    progRAF = null;
    if (keyFn) { document.removeEventListener('keydown', keyFn); keyFn = null; }
  }

  function close() {
    if (!el) return;
    clearTimers();
    stopParticles();
    stopAudio();
    hintEl = null;
    el.classList.add('hide');
    document.body.style.overflow = '';
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* ignore */ }
    var gone = el;
    el = null;
    setTimeout(function () { gone.remove(); }, 1000);
  }

  CM.ready(function () {
    var replay = CM.$('replayIntro');
    if (replay) replay.addEventListener('click', play);
    var seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* ignore */ }
    if (!seen) play();
  });
})();
