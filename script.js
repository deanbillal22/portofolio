// 1. Tombol salin kontak (Email & WhatsApp)
(function () {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (!target) return;
      var text = target.textContent.trim();
      var original = btn.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Tersalin ✓';
          setTimeout(function () {
            btn.textContent = original;
          }, 1600);
        });
      }
    });
  });
})();

// 2. Sorot tautan navigasi aktif saat scroll
(function () {
  var links = document.querySelectorAll('.nav-inner a');
  var sections = document.querySelectorAll('section[id], footer[id]');
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  sections.forEach(function (sec) {
    observer.observe(sec);
  });
})();

// 3. Lightbox untuk memperbesar tangkapan layar proyek
(function () {
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-caption');
  var lbClose = document.getElementById('lb-close');
  if (!lb) return;

  document.querySelectorAll('.shot.zoomable img').forEach(function (img) {
    img.addEventListener('click', function () {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
  }

  lbClose.addEventListener('click', closeModal);
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeModal();
  });
})();