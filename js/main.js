/* Small enhancements: scroll spy, back-to-top, current year */
(function () {
  'use strict';

  // Current year in footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Back to top button
  var toTop = document.getElementById('toTop');
  var onScrollTop = function () {
    toTop.classList.toggle('show', window.scrollY > 420);
  };
  if (toTop) {
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll spy: activate the section currently at the top of the viewport
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if (!links.length) return;

  var targets = links
    .map(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  var OFFSET = 96; // sticky bar height + breathing room
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;
    var atBottom = y > 0 &&
      y + window.innerHeight >= document.documentElement.scrollHeight - 4;

    var current = null;
    if (atBottom) {
      current = targets[targets.length - 1];
    } else {
      targets.forEach(function (t) {
        if (t.el.offsetTop - OFFSET <= y) current = t;
      });
    }

    links.forEach(function (a) {
      a.classList.toggle('active', !!current && a === current.link);
    });
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
