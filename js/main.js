// Fieldcraft — scroll reveal + mobile nav
(function () {
  // Scroll reveal
  var reveals = document.querySelectorAll('[data-reveal]');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Safety net: nothing may stay invisible. If the observer hasn't revealed a
  // section within 2.5s of load, reveal everything unconditionally.
  function revealAll() {
    document.querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach(function (el) { el.classList.add('is-visible'); });
  }
  window.addEventListener('load', function () { setTimeout(revealAll, 2500); });
  setTimeout(revealAll, 4000);

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.main-nav');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
