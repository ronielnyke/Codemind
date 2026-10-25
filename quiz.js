(function () {
  'use strict';
  var CM = window.CM, $ = CM.$;
  var track = null, run = null, SIZE = 0;

  function show(which) {
    ['quizMissing', 'arena', 'result'].forEach(function (id) { $(id).classList.add('d-none'); });
    $(which).classList.remove('d-none');
  }

  function burst(big) {
    var c = document.createElement('canvas');
    c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    var x = c.getContext('2d'), n = big ? 160 : 40, ps = [], cols = ['#00e5ff', '#7c4dff', '#ff4081', '#ffd54f', '#28c76f'];
    for (var i = 0; i < n; i++) ps.push({ x: c.width / 2, y: c.height * 0.6, vx: (Math.random() - 0.5) * (big ? 18 : 9), vy: -Math.random() * (big ? 17 : 9) - 3, s: Math.random() * 6 + 3, c: cols[i % 5], l: 1 });
    (function f() {
      x.clearRect(0, 0, c.width, c.height);
      var alive = false;
      ps.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.l -= 0.012; if (p.l > 0) { alive = true; x.globalAlpha = p.l; x.fillStyle = p.c; x.fillRect(p.x, p.y, p.s, p.s); } });
      if (alive) requestAnimationFrame(f); else c.remove();
    })();
  }

  function norm(s) { return s.replace(/\s+/g, '').replace(/"/g, "'").replace(/;+$/, ''); }

  function clue(q) {
    var t = q.o[q.a];
    return 'Clue: the correct choice starts with “' + t.charAt(0) + '” and is ' + t.length + ' characters long.';
  }

  function startRun() {
    var s = CM.state.tracks[track.id];
    s.attempts += 1;
    CM.updateStreak();
    CM.save();
    var pool = CM.shuffle(track.qs.map(function (_, i) { return i; })), order = pool.slice(0, SIZE);
    run = { order: order, spare: pool.slice(SIZE), missed: [], i: 0, locked: false, dead: false };
    show('arena');
    $('arTrack').textContent = track.name;
    $('arTrack').style.background = track.color;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    var q = track.qs[run.order[run.i]];
    run.locked = false; run.dead = false;
    $('arCount').textContent = (run.i + 1) + '/' + SIZE;
    $('arScore').textContent = run.i;
    $('arBar').style.width = (run.i / SIZE * 100) + '%';
    $('arQ').textContent = q.q;
    var box = $('arCode');
    if (q.code) { box.classList.remove('d-none'); box.firstElementChild.textContent = q.code; } else box.classList.add('d-none');
    var fb = $('arFeedback'); fb.className = 'alert mt-3 d-none'; fb.textContent = '';
    $('nextBtn').classList.add('d-none');
    var card = $('arena').querySelector('.card-body');
    card.classList.remove('slide-in'); void card.offsetWidth; card.classList.add('slide-in');
    var wrap = $('arOptions'); wrap.innerHTML = '';
    if (q.fix) {
      var inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'form-control code-input'; inp.placeholder = 'Type the corrected line…'; inp.autocomplete = 'off'; inp.spellcheck = false;
      var go = document.createElement('button');
      go.type = 'button'; go.className = 'btn btn-neon'; go.innerHTML = '<i class="bi bi-bug-fill"></i> Check fix';
      function check() {
        if (run.locked || !inp.value.trim()) return;
        var mine = norm(inp.value);
        answer(inp, q.fix.some(function (f) { return norm(f) === mine; }), q, wrap);
      }
      go.addEventListener('click', check);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      wrap.appendChild(inp); wrap.appendChild(go);
      setTimeout(function () { inp.focus(); }, 50);
      return;
    }
    CM.shuffle(q.o.map(function (text, idx) { return { text: text, ok: idx === q.a }; })).forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt'; b.textContent = o.text;
      b.addEventListener('click', function () { answer(b, o.ok, q, wrap); });
      wrap.appendChild(b);
    });
  }

  function answer(btn, ok, q, wrap) {
    if (run.locked) return;
    run.locked = true;
    var st = CM.state, ts = st.tracks[track.id], fb = $('arFeedback'), nb = $('nextBtn');
    var all = wrap.querySelectorAll('.opt,input,button');
    for (var j = 0; j < all.length; j++) all[j].disabled = true;
    if (ok) {
      btn.classList.add('correct');
      st.total += 1; ts.total += 1; st.right += 1; ts.right += 1; st.xp += 10;
      if (run.i + 1 > ts.best) ts.best = run.i + 1;
      fb.className = 'alert alert-success mt-3 pop';
      fb.innerHTML = '<b><i class="bi bi-check-circle-fill"></i> Correct! +10 XP</b><br><b>Why it is right / how it works:</b> ' + CM.esc(q.e);
      burst(false);
      nb.innerHTML = run.i === SIZE - 1 ? 'Finish <i class="bi bi-flag-fill"></i>' : 'Next <i class="bi bi-arrow-right"></i>';
    } else {
      btn.classList.add('wrong');
      run.dead = true;
      fb.className = 'alert alert-danger mt-3';
      fb.innerHTML = '<b><i class="bi bi-x-circle-fill"></i> Wrong — not counted.</b> A different problem comes next.<br><i class="bi bi-lightbulb-fill"></i> ' + CM.esc(q.h ? 'Clue: ' + q.h : clue(q));
      nb.innerHTML = 'Next problem <i class="bi bi-arrow-right"></i>';
    }
    nb.classList.remove('d-none');
    CM.save();
  }

  function next() {
    if (run.dead) {
      var cur = run.order[run.i], rep;
      run.missed.push(cur);
      if (run.spare.length) rep = run.spare.shift();
      else {
        var others = run.missed.filter(function (x) { return x !== cur; });
        rep = others.length ? others[Math.floor(Math.random() * others.length)] : cur;
        if (others.length) run.missed.splice(run.missed.indexOf(rep), 1);
      }
      run.order[run.i] = rep;
      renderQuestion();
      return;
    }
    run.i += 1;
    if (run.i >= SIZE) finish(); else renderQuestion();
  }

  function finish() {
    var st = CM.state, ts = st.tracks[track.id];
    var first = !ts.passed;
    ts.passed = true; ts.best = SIZE; st.perfect += 1;
    if (first) st.xp += 50;
    CM.checkBadges(); CM.save();
    show('result');
    burst(true);
    $('resIcon').innerHTML = '<i class="bi bi-patch-check-fill text-success"></i>';
    $('resTitle').textContent = track.name + ' Passed!';
    var allDone = CM.passedCount() === CM.ALL.length;
    $('resText').textContent = 'Perfect run: ' + SIZE + '/' + SIZE + '.' + (first ? ' +50 XP bonus!' : '') + (allDone ? ' You finished every track and system — get your certificate!' : '');
    var nt = CM.ALL.filter(function (t) { return t.id !== track.id && !st.tracks[t.id].passed; })[0], nl = $('resNext');
    if (nt) { nl.href = 'quiz.html?track=' + encodeURIComponent(nt.id); nl.innerHTML = '<i class="bi bi-arrow-right-circle"></i> Next: ' + nt.name; nl.classList.remove('d-none'); } else nl.classList.add('d-none');
    $('resCert').classList.toggle('d-none', !allDone);
    run = null;
  }

  CM.ready(function () {
    var id = new URLSearchParams(window.location.search).get('track');
    track = CM.ALL.filter(function (t) { return t.id === id; })[0] || null;
    if (!track) { show('quizMissing'); return; }
    SIZE = CM.size(track);
    document.title = track.name + ' Challenge — CODEMIND';
    $('nextBtn').addEventListener('click', next);
    $('quitBtn').addEventListener('click', function () { if (confirm('Leave this run?')) window.location.href = 'tracks.html'; });
    $('resRetry').addEventListener('click', startRun);
    startRun();
  });
})();
