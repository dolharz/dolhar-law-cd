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

  setupToggle('.logocase-btn', 'logocase', 'dolhar7-logocase', 'upper');
  setupToggle('.bodyfont-btn', 'bodyfont', 'dolhar7-bodyfont', 'sans');
  setupToggle('.stampfirm-btn', 'stampfirm', 'dolhar7-stampfirm', 'full');
  setupToggle('.docstampshape-btn', 'docstampshape', 'dolhar7-docstampshape', 'round');
  setupToggle('.docstampcolor-btn', 'docstampcolor', 'dolhar7-docstampcolor', 'teal');
  setupToggle('.mode-btn', 'mode', 'dolhar7-mode', 'light');

  // Sync stamp wordmarks with logo case toggle
  function updateStampWordmarks() {
    const isUpper = root.dataset.logocase === 'upper';
    document.querySelectorAll('.stamp-wordmark').forEach(el => {
      const tspan = el.querySelector('tspan');
      if (tspan) {
        el.firstChild.textContent = isUpper ? 'DOLHAR' : 'Dolhar';
      } else {
        el.textContent = isUpper ? 'DOLHAR' : 'Dolhar';
      }
    });
    // Also refresh round stamp arc text if in short mode
    if (root.dataset.stampfirm === 'short') updateStampFirm();
  }

  document.querySelectorAll('.logocase-btn').forEach(btn => {
    btn.addEventListener('click', updateStampWordmarks);
  });
  updateStampWordmarks();

  // Sync round stamp firm name (full / short / horizontal)
  function updateStampFirm() {
    const mode = root.dataset.stampfirm || 'full';
    const isHoriz = mode === 'horiz';

    document.querySelectorAll('.stamp-firm-text').forEach(el => {
      const tp = el.querySelector('textPath');
      if (isHoriz) {
        el.setAttribute('display', 'none');
      } else {
        el.removeAttribute('display');
        if (tp) {
          if (mode === 'full') {
            tp.innerHTML = 'ODVETNIŠKA DRUŽBA DOLHAR O.P. D.O.O.';
          } else {
            const isUpper = root.dataset.logocase === 'upper';
            const wm = isUpper ? 'DOLHAR' : 'Dolhar';
            tp.innerHTML = wm + '<tspan font-family="var(--font-body)" font-size="10" font-weight="400" letter-spacing="0.04em" dx="3">o.p. d.o.o.</tspan>';
          }
        }
        el.setAttribute('font-family', "var(--font-display)");
        el.setAttribute('font-weight', mode === 'full' ? '400' : '700');
        el.setAttribute('font-size', mode === 'full' ? '12' : '16');
        el.setAttribute('letter-spacing', mode === 'full' ? '0.06em' : '0.1em');
      }
    });

    document.querySelectorAll('.stamp-firm-horiz').forEach(el => {
      el.setAttribute('display', isHoriz ? '' : 'none');
      el.setAttribute('font-family', 'var(--font-display)');
      el.setAttribute('font-weight', '700');
    });
  }

  document.querySelectorAll('.stampfirm-btn').forEach(btn => {
    btn.addEventListener('click', updateStampFirm);
  });
  updateStampFirm();

  // Update color swatch HEX/RGB values
  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function updateSwatchHex() {
    const styles = getComputedStyle(root);
    document.querySelectorAll('.swatch-hex').forEach(el => {
      const varName = el.dataset.var;
      const raw = styles.getPropertyValue(varName).trim();
      if (!raw) return;
      // Handle hex values
      const hexMatch = raw.match(/^#([0-9a-fA-F]{3,8})$/);
      if (hexMatch) {
        let hex = raw.toUpperCase();
        // Expand 3-digit hex
        if (hexMatch[1].length === 3) {
          hex = '#' + hexMatch[1].split('').map(c => c + c).join('').toUpperCase();
        }
        const [r, g, b] = hexToRgb(hex);
        el.textContent = hex + '  ·  RGB(' + r + ', ' + g + ', ' + b + ')';
        return;
      }
      // Handle rgb() values
      const rgbMatch = raw.match(/(\d+)/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        el.textContent = hex + '  ·  RGB(' + r + ', ' + g + ', ' + b + ')';
      }
    });
  }

  updateSwatchHex();
  // Re-run on any toggle that changes colors
  new MutationObserver(() => requestAnimationFrame(updateSwatchHex))
    .observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-teal', 'data-mode'] });

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
