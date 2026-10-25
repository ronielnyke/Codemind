(function () {
  'use strict';
  var CM = window.CM, $ = CM.$;

  CM.ready(function () {
    CM.checkBadges();
    CM.save();

    var wrap = $('badgeList');
    wrap.innerHTML = '';
    CM.BADGES.forEach(function (b) {
      var on = CM.state.badges.indexOf(b.id) !== -1;
      var col = document.createElement('div');
      col.className = 'col-6 col-md-4 col-lg-3';
      col.innerHTML = '<div class="card badge-card h-100 ' + (on ? 'on' : '') + '"><div class="ic"><i class="bi ' + b.icon + '"></i></div>' +
        '<h6 class="mt-2 mb-1">' + b.name + '</h6><span class="small text-secondary">' + b.desc + '</span>' +
        '<div class="mt-2 small ' + (on ? 'text-success' : 'text-secondary') + '">' + (on ? 'Unlocked' : 'Locked') + '</div></div>';
      wrap.appendChild(col);
    });

    var rows = $('resultRows');
    rows.innerHTML = '';
    CM.TRACKS.forEach(function (t) {
      var s = CM.state.tracks[t.id];
      var acc = s.total ? Math.round(s.right / s.total * 100) + '%' : '—';
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><i class="bi ' + t.icon + ' me-2" style="color:' + t.color + '"></i>' + t.name + '</td>' +
        '<td>' + (s.passed ? '<span class="badge text-bg-success">Passed</span>' : '<span class="badge text-bg-secondary">Not passed</span>') + '</td>' +
        '<td>' + s.best + '/' + CM.size(t) + '</td><td>' + s.attempts + '</td><td>' + acc + '</td>' +
        '<td class="text-end"><a class="btn btn-sm btn-outline-info" href="quiz.html?track=' + encodeURIComponent(t.id) + '">' + (s.attempts ? 'Practice' : 'Start') + '</a></td>';
      rows.appendChild(tr);
    });
  });
})();
