/**
 * Dolhar o.p. d.o.o. — Corporate Design Theme, Teal & Mode Switcher
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

  setupToggle('.teal-btn', 'teal', 'dolhar4-teal', 'custom');
  setupToggle('.typo-btn', 'typo', 'dolhar4-typo', 'auto');
  setupToggle('.logocase-btn', 'logocase', 'dolhar4-logocase', 'upper');
  setupToggle('.mode-btn', 'mode', 'dolhar4-mode', 'light');
  setupToggle('.herostyle-btn', 'herostyle', 'dolhar4-herostyle', 'dark');

  // Body EB Garamond checkbox
  const bodyCB = document.getElementById('body-cinzel');
  if (bodyCB) {
    const saved = localStorage.getItem('dolhar4-bodycinzel') === 'on';
    bodyCB.checked = saved;
    root.dataset.bodycinzel = saved ? 'on' : 'off';
    bodyCB.addEventListener('change', () => {
      const val = bodyCB.checked ? 'on' : 'off';
      root.dataset.bodycinzel = val;
      localStorage.setItem('dolhar4-bodycinzel', val);
    });
  }

  // Wordmark muted checkbox
  const wmCB = document.getElementById('wordmark-muted');
  if (wmCB) {
    const saved = localStorage.getItem('dolhar4-wordmarkmuted') === 'on';
    wmCB.checked = saved;
    root.dataset.wordmarkmuted = saved ? 'on' : 'off';
    wmCB.addEventListener('change', () => {
      const val = wmCB.checked ? 'on' : 'off';
      root.dataset.wordmarkmuted = val;
      localStorage.setItem('dolhar4-wordmarkmuted', val);
    });
  }

  // Banner toggle (full vs slim)
  const heroFull = document.querySelector('.hero-full');
  const heroSlim = document.querySelector('.hero-slim');
  const bannerBtns = document.querySelectorAll('.banner-btn');

  function setBanner(value) {
    if (heroFull && heroSlim) {
      heroFull.style.display = value === 'full' ? '' : 'none';
      heroSlim.style.display = value === 'slim' ? '' : 'none';
    }
    bannerBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.banner === value);
    });
    localStorage.setItem('dolhar4-banner', value);
    syncNavHeight();
  }

  bannerBtns.forEach(btn => {
    btn.addEventListener('click', () => setBanner(btn.dataset.banner));
  });

  setBanner(localStorage.getItem('dolhar4-banner') || 'full');

  // Push content below fixed nav
  const nav = document.querySelector('.theme-switcher');
  function syncNavHeight() {
    if (!nav) return;
    requestAnimationFrame(() => {
      document.body.style.paddingTop = nav.offsetHeight + 'px';
    });
  }
  syncNavHeight();
  window.addEventListener('resize', syncNavHeight);
});
