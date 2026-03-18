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

  setupToggle('.theme-btn', 'theme', 'dolhar-theme', 'classic');
  setupToggle('.teal-btn', 'teal', 'dolhar-teal', 'custom');
  setupToggle('.typo-btn', 'typo', 'dolhar-typo', 'auto');
  setupToggle('.logocase-btn', 'logocase', 'dolhar-logocase', 'upper');
  setupToggle('.mode-btn', 'mode', 'dolhar-mode', 'light');

  // Body Cinzel checkbox
  const bodyCB = document.getElementById('body-cinzel');
  if (bodyCB) {
    const saved = localStorage.getItem('dolhar-bodycinzel') === 'on';
    bodyCB.checked = saved;
    root.dataset.bodycinzel = saved ? 'on' : 'off';
    bodyCB.addEventListener('change', () => {
      const val = bodyCB.checked ? 'on' : 'off';
      root.dataset.bodycinzel = val;
      localStorage.setItem('dolhar-bodycinzel', val);
    });
  }

  // Push hero below fixed nav (height varies with wrapping)
  const nav = document.querySelector('.theme-switcher');
  const hero = document.querySelector('.hero');
  if (nav && hero) {
    function syncTop() {
      hero.style.marginTop = nav.offsetHeight + 'px';
    }
    syncTop();
    window.addEventListener('resize', syncTop);
  }
});
