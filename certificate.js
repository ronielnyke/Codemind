(function () {
  'use strict';
  var CM = window.CM, $ = CM.$;

  function hashId(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ('00000000' + (h >>> 0).toString(16).toUpperCase()).slice(-8);
  }

  function wrapText(ctx, text, x, y, maxW, lh) {
    var words = text.split(' '), line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line + words[i] + ' ';
      if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line.trim(), x, y); line = words[i] + ' '; y += lh; } else { line = test; }
    }
    ctx.fillText(line.trim(), x, y);
    return y;
  }

  function draw(c) {
    var st = CM.state, ctx = c.getContext('2d'), W = c.width, H = c.height;
    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#fffdf5'); g.addColorStop(1, '#f1ead2');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#0b1b4d'; ctx.lineWidth = 14; ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.strokeStyle = '#c9a227'; ctx.lineWidth = 4; ctx.strokeRect(70, 70, W - 140, H - 140);
    ctx.lineWidth = 1.5; ctx.strokeRect(84, 84, W - 168, H - 168);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0b1b4d'; ctx.font = 'bold 54px Segoe UI, Arial'; ctx.fillText('CODEMIND', W / 2, 190);
    ctx.fillStyle = '#6b7390'; ctx.font = '24px Segoe UI, Arial'; ctx.fillText('Train Your Mind. Think Like a Developer.', W / 2, 230);
    ctx.fillStyle = '#c9a227'; ctx.font = 'bold 70px Georgia, serif'; ctx.fillText('CERTIFICATE OF COMPLETION', W / 2, 345);
    ctx.fillStyle = '#333'; ctx.font = 'italic 30px Georgia, serif'; ctx.fillText('This is to certify that', W / 2, 425);
    ctx.fillStyle = '#0b1b4d';
    var size = 96; ctx.font = 'bold ' + size + 'px Georgia, serif';
    while (ctx.measureText(st.name).width > W - 300 && size > 40) { size -= 4; ctx.font = 'bold ' + size + 'px Georgia, serif'; }
    ctx.fillText(st.name, W / 2, 535);
    ctx.strokeStyle = '#c9a227'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(300, 565); ctx.lineTo(W - 300, 565); ctx.stroke();
    ctx.fillStyle = '#333'; ctx.font = '28px Georgia, serif';
    var names = CM.ALL.map(function (t) { return t.name; }).join(', ');
    var y = wrapText(ctx, 'has successfully completed and passed all ' + CM.ALL.length + ' tracks and system challenges of the CODEMIND Developer Thinking Lab: ' + names + '.', W / 2, 625, W - 400, 42);
    ctx.fillStyle = '#6b7390'; ctx.font = '24px Georgia, serif';
    ctx.fillText('Total XP: ' + st.xp + '   •   Accuracy: ' + CM.accuracy() + '%   •   Level ' + CM.level(), W / 2, y + 60);
    var sx = W / 2, sy = 880;
    ctx.beginPath(); ctx.arc(sx, sy, 62, 0, Math.PI * 2); ctx.fillStyle = '#c9a227'; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, 50, 0, Math.PI * 2); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 20px Segoe UI, Arial'; ctx.fillText('CODEMIND', sx, sy - 4);
    ctx.font = '15px Segoe UI, Arial'; ctx.fillText('COMPLETED', sx, sy + 20);
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(190, 905); ctx.lineTo(610, 905); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 610, 905); ctx.lineTo(W - 190, 905); ctx.stroke();
    ctx.fillStyle = '#0b1b4d'; ctx.font = 'italic bold 40px Georgia, serif';
    ctx.fillText(CM.DEV, 400, 890); ctx.fillText(CM.SPONSOR, W - 400, 890);
    ctx.fillStyle = '#333'; ctx.font = 'bold 22px Segoe UI, Arial';
    ctx.fillText(CM.DEV, 400, 937); ctx.fillText(CM.SPONSOR + ' — ' + CM.SPONSOR_LOC, W - 400, 937);
    ctx.fillStyle = '#6b7390'; ctx.font = '19px Segoe UI, Arial';
    ctx.fillText(CM.DEV_ROLE, 400, 965); ctx.fillText('Official Sponsor', W - 400, 965);
    ctx.fillStyle = '#333'; ctx.font = '21px Segoe UI, Arial';
    ctx.fillText('Date issued: ' + st.cert.date + '   •   Certificate ID: ' + st.cert.id, W / 2, 1010);
    ctx.fillStyle = '#8a8f9f'; ctx.font = '16px Segoe UI, Arial';
    ctx.fillText('Certificate of completion issued by the CODEMIND learning platform. It is not an accredited academic degree or government-issued license.', W / 2, 1040);
  }

  function update() {
    var st = CM.state, pc = CM.passedCount(), total = CM.ALL.length, done = pc === total;
    $('certName').value = st.name || '';
    $('certProgText').textContent = pc + '/' + total;
    $('certProgBar').style.width = Math.round(pc / total * 100) + '%';
    var ready = done && !!st.name;
    $('certLocked').classList.toggle('d-none', ready);
    $('certUnlocked').classList.toggle('d-none', !ready);
    if (!done) { $('certLockText').textContent = 'Locked. Finish all ' + total + ' tracks and systems to unlock your certificate.'; return; }
    if (!st.name) { $('certLockText').textContent = 'You finished everything! Enter your name above and click Save.'; return; }
    if (!st.cert) {
      var date = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
      st.cert = { date: date, id: 'CM-' + new Date().getFullYear() + '-' + hashId(st.name + date + st.xp) };
      CM.save();
    }
    draw($('certCanvas'));
  }

  function fileName() { return 'CODEMIND-Certificate-' + (CM.state.name || 'Learner').replace(/[^a-z0-9]+/gi, '_') + '.png'; }

  function download() {
    var c = $('certCanvas');
    draw(c);
    c.toBlob(function (blob) {
      if (!blob) { CM.toast('Could not generate the image. Please try again.', 'danger'); return; }
      var url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = fileName();
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      CM.toast('Certificate downloaded!', 'success');
    }, 'image/png');
  }

  function print() {
    var c = $('certCanvas'), img = $('certPrintImg');
    draw(c);
    img.onload = function () { img.onload = null; window.print(); };
    img.src = c.toDataURL('image/png');
    if (img.complete && img.naturalWidth) { img.onload = null; window.print(); }
  }

  CM.ready(function () {
    CM.checkBadges();
    CM.save();
    update();
    $('certSaveName').addEventListener('click', function () {
      var n = $('certName').value.trim().replace(/\s+/g, ' ');
      if (n.length < 2) { CM.toast('Please enter a valid name (2+ letters).', 'danger'); return; }
      if (CM.state.name !== n) CM.state.cert = null;
      CM.state.name = n;
      CM.save();
      update();
      CM.toast('Name saved: ' + n, 'success');
    });
    $('certName').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('certSaveName').click(); });
    $('certDownload').addEventListener('click', download);
    $('certPrint').addEventListener('click', print);
  });
})();
