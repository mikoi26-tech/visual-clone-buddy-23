
    const cards = document.querySelectorAll('.visual-card');
    const transition = document.querySelector('.transition');
    const transitionName = document.getElementById('transitionName');
    const transitionSymbol = document.getElementById('transitionSymbol');
  const launchSymbols = {
    'FC27 Visual': 'FC',
    '2K27 Visual': '2K',
    'Fortnite Visual': 'FN',
    'Gift Card Visual': 'GC',
    'Roblox Mobile Visual': 'RB',
    'Cash App Visual': '$',
  };

    cards.forEach(card => {
      card.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(x - .5) * 8}deg`);
        card.style.setProperty('--rx', `${(.5 - y) * 7}deg`);
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });

      card.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        const href = card.getAttribute('href');
        const name = card.dataset.name || 'visual';
        const accent = getComputedStyle(card).getPropertyValue('--accent').trim() || '126 130 255';
        transitionName.textContent = name;
        transitionSymbol.textContent = launchSymbols[name] || 'LV';
        transition.style.setProperty('--launch-accent', accent);
        transition.classList.add('active');
        transition.setAttribute('aria-hidden', 'false');
        setTimeout(() => { window.location.href = href; }, 620);
      });
    });

    window.addEventListener('pageshow', () => {
      transition.classList.remove('active');
      transition.setAttribute('aria-hidden', 'true');
    });
  