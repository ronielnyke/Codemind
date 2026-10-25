(function () {
  'use strict';
  var CM = window.CM, $ = CM.$;
  var filter = 'all';

  function render() {
    var grid = $('trackGrid');
    grid.innerHTML = '';
    CM.ALL.filter(function (t) { return filter === 'all' || t.group === filter; }).forEach(function (t) {
      var s = CM.state.tracks[t.id];
      var col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4';
      col.innerHTML =
        '<a class="card track-card ' + (s.passed ? 'passed' : '') + '" style="--c:' + t.color + '" href="quiz.html?track=' + encodeURIComponent(t.id) + '">' +
        '<div class="card-body">' +
        '<div class="d-flex align-items-center gap-3 mb-2"><div class="track-icon"><i class="bi ' + t.icon + '"></i></div>' +
        '<div><h5 class="mb-0">' + t.name + '</h5><span class="text-secondary small">' + t.desc + '</span></div>' +
        (s.passed ? '<i class="bi bi-patch-check-fill text-success fs-4 ms-auto"></i>' : '') + '</div>' +
        '<div class="d-flex gap-2 flex-wrap mb-3"><span class="badge text-bg-secondary pill">' + t.qs.length + ' problems</span>' +
        '<span class="badge text-bg-dark pill">Best ' + s.best + '/' + CM.size(t) + '</span>' +
        '<span class="badge text-bg-dark pill">Attempts ' + s.attempts + '</span></div>' +
        '<span class="btn btn-sm btn-neon w-100"><i class="bi bi-play-fill"></i> ' + (s.attempts ? 'New Round' : 'Start') + '</span>' +
        '</div></a>';
      grid.appendChild(col);
    });
  }

  CM.ready(function () {
    render();
    $('trackFilter').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-f]');
      if (!b) return;
      filter = b.getAttribute('data-f');
      var btns = $('trackFilter').querySelectorAll('button');
      for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', btns[i] === b);
      render();
    });
  });
})();
