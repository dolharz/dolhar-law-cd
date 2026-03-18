/**
 * Dolhar o.p. d.o.o. — Sample 5
 * Scroll-driven hero: full (dark) → slim (light) on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  function setupToggle(selector, attr, storageKey, fallback) {
    const buttons = document.querySelectorAll(selector);

    function set(value) {
      root.dataset[attr] = value;
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset[attr] === value);
      });
      localStorage.setItem(storageKey, value);
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => set(btn.dataset[attr]));
    });

    const saved = localStorage.getItem(storageKey) || fallback;
    set(saved);
  }

  setupToggle('.teal-btn', 'teal', 'dolhar5-teal', 'custom');
  setupToggle('.logocase-btn', 'logocase', 'dolhar5-logocase', 'upper');
  setupToggle('.bodyfont-btn', 'bodyfont', 'dolhar5-bodyfont', 'sans');
  setupToggle('.mode-btn', 'mode', 'dolhar5-mode', 'light');

  // Push content below fixed nav
  const nav = document.querySelector('.theme-switcher');
  function syncNavHeight() {
    if (!nav) return;
    requestAnimationFrame(() => {
      const h = nav.offsetHeight;
      document.body.style.paddingTop = h + 'px';
      // Position slim hero right below nav
      if (heroSlim) heroSlim.style.top = h + 'px';
    });
  }

  const heroFull = document.querySelector('.hero-full');
  const heroSlim = document.querySelector('.hero-slim');

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);

  // Scroll-driven hero: when hero-full leaves viewport → show slim
  if (heroFull && heroSlim) {
    const observer = new IntersectionObserver((entries) => {
      heroSlim.classList.toggle('visible', !entries[0].isIntersecting);
    }, {
      threshold: 0,
      rootMargin: `-${nav ? nav.offsetHeight : 0}px 0px 0px 0px`
    });

    observer.observe(heroFull);
  }
});
