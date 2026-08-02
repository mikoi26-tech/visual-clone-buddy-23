(() => {
  'use strict';

  const randomUnit = () => {
    if (globalThis.crypto?.getRandomValues) {
      const value = new Uint32Array(1);
      globalThis.crypto.getRandomValues(value);
      return value[0] / 4294967296;
    }
    return Math.random();
  };
  const between = (minimum, maximum) => minimum + (maximum - minimum) * randomUnit();
  const fixed = (minimum, maximum, places = 2) => between(minimum, maximum).toFixed(places);
  const pick = values => values[Math.floor(randomUnit() * values.length)];

  function createStaticStars(container) {
    container.querySelectorAll('.lv-static-star').forEach(star => star.remove());
    const isMobileVisual = container.classList.contains('visual-backdrop');
    const amount = isMobileVisual ? 68 : container.classList.contains('lv-cosmos') ? 92 : 78;
    const fragment = document.createDocumentFragment();
    const colors = document.body.dataset.starTheme === 'green'
      ? ['#ffffff', '#dcffe9', '#a8ffc8', '#62ff9d', '#c9ffdc']
      : ['#ffffff', '#dcecff', '#a9d8ff', '#d8c3ff', '#8cbfff'];

    for (let index = 0; index < amount; index += 1) {
      const star = document.createElement('b');
      const large = randomUnit() > .91;
      const opacity = between(.28, large ? .94 : .76);
      star.className = 'lv-static-star';
      star.setAttribute('aria-hidden', 'true');
      star.style.setProperty('--star-x', `${fixed(.4, 99.2)}%`);
      star.style.setProperty('--star-y', `${fixed(.8, 98.8)}%`);
      star.style.setProperty('--star-size', `${fixed(large ? 1.7 : .45, large ? 3.15 : 1.55)}px`);
      star.style.setProperty('--star-opacity', opacity.toFixed(2));
      star.style.setProperty('--star-dim', Math.max(.05, opacity * between(.12, .4)).toFixed(2));
      star.style.setProperty('--star-bright', Math.min(1, opacity * between(1.05, 1.42)).toFixed(2));
      star.style.setProperty('--star-glow', `${fixed(large ? 7 : 2, large ? 16 : 9)}px`);
      star.style.setProperty('--star-twinkle', `${fixed(1.7, 7.9)}s`);
      star.style.setProperty('--star-twinkle-delay', `-${fixed(.2, 15.5)}s`);
      star.style.setProperty('--star-color', pick(colors));
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  }

  function createShootingStars(container) {
    const isMobileVisual = container.classList.contains('visual-backdrop');
    const tagName = isMobileVisual ? 'i' : 'span';
    const className = container.classList.contains('lv-cosmos') ? 'lv-star' : '';
    const wanted = isMobileVisual ? 9 : 11;
    let shooters = [...container.children].filter(node => node.matches('span,i'));

    while (shooters.length < wanted) {
      const shooter = document.createElement(tagName);
      if (className) shooter.className = className;
      shooter.setAttribute('aria-hidden', 'true');
      container.appendChild(shooter);
      shooters.push(shooter);
    }

    shooters.forEach(shooter => {
      const speed = between(8.5, 25.5);
      shooter.style.setProperty('--shoot-left', `${fixed(102, 128)}%`);
      shooter.style.setProperty('--shoot-top', `${fixed(-4, 93)}%`);
      shooter.style.setProperty('--shoot-tail', `${fixed(62, 258, 0)}px`);
      shooter.style.setProperty('--shoot-height', `${fixed(.55, 2.15)}px`);
      shooter.style.setProperty('--shoot-angle', `${fixed(-41, -17, 1)}deg`);
      shooter.style.setProperty('--shoot-speed', `${speed.toFixed(2)}s`);
      shooter.style.setProperty('--shoot-delay', `-${fixed(.15, speed * 1.4)}s`);
      shooter.style.setProperty('--shoot-opacity', fixed(.42, 1));
      shooter.style.setProperty('--shoot-travel-x', `${fixed(-1540, -680, 0)}px`);
      shooter.style.setProperty('--shoot-travel-y', `${fixed(210, 720, 0)}px`);
      shooter.style.setProperty('--shoot-head', `${fixed(2, 5.2)}px`);
      shooter.style.setProperty('--shoot-glow', `${fixed(3, 11)}px`);
    });
  }

  function buildStarfields() {
    document.querySelectorAll('.starfield,.lv-cosmos,.visual-backdrop').forEach(container => {
      createShootingStars(container);
      createStaticStars(container);
      container.dataset.starfieldReady = 'true';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildStarfields, { once: true });
  } else {
    buildStarfields();
  }
})();
