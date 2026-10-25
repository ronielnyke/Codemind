(function () {
  'use strict';
  var CM = window.CM, $ = CM.$;

  function render() {
    var s = CM.state, pc = CM.passedCount();
    $('lvl').textContent = CM.level();
    $('xpText').textContent = s.xp;
    $('xpBar').style.width = (s.xp % 100) + '%';
    $('overallText').textContent = pc + '/' + CM.ALL.length + ' completed';
    $('overallBar').style.width = Math.round(pc / CM.ALL.length * 100) + '%';
    $('sXp').textContent = s.xp;
    $('sAcc').textContent = CM.accuracy() + '%';
    $('sStreak').textContent = s.streak;
    $('sDone').textContent = pc;
    $('learnerName').value = s.name || '';

    var weak = CM.TRACKS.filter(function (t) {
      var ts = s.tracks[t.id];
      return ts.total >= 3 && ts.right / ts.total < 0.7;
    }).map(function (t) { return t.name; });
    $('weakTopics').innerHTML = weak.length
      ? '<i class="bi bi-exclamation-triangle-fill text-warning"></i> Needs improvement: <b>' + weak.join(', ') + '</b>'
      : '';
  }

  CM.ready(function () {
    CM.checkBadges();
    CM.save();
    render();

    $('saveName').addEventListener('click', function () {
      var n = $('learnerName').value.trim().replace(/\s+/g, ' ');
      if (n.length < 2) { CM.toast('Please enter a valid name (2+ letters).', 'danger'); return; }
      if (CM.state.name !== n) CM.state.cert = null; // new name => new certificate ID
      CM.state.name = n;
      CM.save();
      render();
      CM.toast('Name saved: ' + n, 'success');
    });
    $('learnerName').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('saveName').click(); });
  });
})();
