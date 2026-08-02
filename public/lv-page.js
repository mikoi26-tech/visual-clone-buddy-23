(()=>{

    const form = document.getElementById('keyForm');
    const input = document.getElementById('keyInput');
    const button = document.getElementById('submitButton');
    const message = document.getElementById('message');

    function setMessage(text, type = '') {
      message.textContent = text;
      message.className = `message ${type}`.trim();
    }

    function normalizeUserAgent(ua) {
      return String(ua || '').replace(/\b\d+(?:\.\d+){1,4}\b/g, 'v');
    }

    async function sha256(value) {
      const data = new TextEncoder().encode(value);
      const hash = await crypto.subtle.digest('SHA-256', data);
      return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function getDeviceId() {
      try {
        const bound = localStorage.getItem('lv_bound_device_id');
        if (/^[a-f0-9]{64}$/.test(bound || '')) return bound;
      } catch {}

      let seed = '';
      try {
        seed = localStorage.getItem('lv_device_seed') || '';
        if (!/^[a-f0-9]{64}$/.test(seed)) {
          const bytes = new Uint8Array(32);
          crypto.getRandomValues(bytes);
          seed = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
          localStorage.setItem('lv_device_seed', seed);
        }
      } catch {
        seed = String(Math.random()) + Date.now();
      }

      const parts = [
        normalizeUserAgent(navigator.userAgent),
        navigator.platform || '',
        navigator.vendor || '',
        navigator.language || '',
        (navigator.languages || []).join(','),
        Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        String(navigator.hardwareConcurrency || ''),
        String(navigator.deviceMemory || ''),
        String(navigator.maxTouchPoints || ''),
        String(screen.colorDepth || ''),
        `${screen.width}x${screen.height}`,
        seed,
      ];
      const deviceId = await sha256(parts.join('|'));
      try { localStorage.setItem('lv_bound_device_id', deviceId); } catch {}
      return deviceId;
    }

    async function checkExistingSession() {
      try {
        const response = await fetch('/api/check-session', { credentials: 'same-origin', cache: 'no-store' });
        const data = await response.json();
        if (data.authenticated) {
          try { if (data.deviceId) localStorage.setItem('lv_bound_device_id', data.deviceId); } catch {}
          location.replace('/app/');
        }
      } catch {
        // The gate stays visible if the site is opened locally or the backend is unavailable.
      }
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const key = input.value.trim().toUpperCase();
      if (!key) return;

      if (location.protocol === 'file:') {
        setMessage('Local access detected. Opening the library…', 'ok');
        setTimeout(() => { location.href = 'app/index.html'; }, 300);
        return;
      }

      button.disabled = true;
      button.classList.add('loading');
      input.disabled = true;
      setMessage('Checking key…');
      const loaderStartedAt = Date.now();
      const keepLoaderVisible = () => new Promise(resolve => {
        setTimeout(resolve, Math.max(0, 520 - (Date.now() - loaderStartedAt)));
      });

      try {
        const deviceId = await getDeviceId();
        const response = await fetch('/api/redeem-key', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ key, deviceId })
        });
        const data = await response.json().catch(() => ({}));
        await keepLoaderVisible();
        if (!response.ok || !data.ok) throw new Error(data.error || 'Unable to verify this key.');

        try { localStorage.setItem('lv_access_key', key); localStorage.setItem('lv_bound_device_id', deviceId); } catch {}
        setMessage(data.firstUse ? 'Key linked to this device. Opening…' : 'Device verified. Opening…', 'ok');
        setTimeout(() => location.replace(data.redirect || '/app/'), 450);
      } catch (error) {
        await keepLoaderVisible();
        setMessage(error.message || 'Unable to verify this key.', 'error');
        button.disabled = false;
        button.classList.remove('loading');
        input.disabled = false;
        input.focus();
        input.select();
      }
    });

    input.addEventListener('input', () => {
      const start = input.selectionStart;
      input.value = input.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
      if (start !== null) input.setSelectionRange(Math.min(start, input.value.length), Math.min(start, input.value.length));
      if (message.classList.contains('error')) setMessage('');
    });

    const query = new URLSearchParams(location.search);
    if (query.get('logout') === '1') setMessage('Logged out. Your key is still bound to this device.');
    if (query.get('access') === 'removed') setMessage('Access ended. Enter a valid key to continue.', 'error');
    checkExistingSession();
    setTimeout(() => input.focus(), 120);
  
})();
(()=>{

    (() => {
      document.querySelectorAll('.box, .shop').forEach(panel => {
        panel.addEventListener('pointermove', event => {
          if (event.pointerType === 'touch') return;
          const rect = panel.getBoundingClientRect();
          panel.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
          panel.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
        });
        panel.addEventListener('pointerleave', () => {
          panel.style.setProperty('--mx', '50%');
          panel.style.setProperty('--my', '50%');
        });
      });
    })();
  
})();
(()=>{

    (() => {
      const carousel = document.getElementById('visualCarousel');
      const track = document.getElementById('visualTrack');
      const slides = [...track.querySelectorAll('.visual-tile')];
      const dots = document.getElementById('carouselDots');
      const counter = document.getElementById('currentSlide');
      const previous = document.getElementById('previousSlide');
      const next = document.getElementById('nextSlide');
      let index = 0;
      let timer = null;
      let pointerStart = null;

      const dotButtons = slides.map((slide, slideIndex) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Show visual ${slideIndex + 1}: ${slide.querySelector('h3').textContent}`);
        dot.addEventListener('click', () => show(slideIndex, true));
        dots.appendChild(dot);
        return dot;
      });

      function show(nextIndex, userInitiated = false) {
        index = (nextIndex + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        counter.textContent = String(index + 1).padStart(2, '0');
        slides.forEach((slide, slideIndex) => slide.setAttribute('aria-hidden', slideIndex === index ? 'false' : 'true'));
        dotButtons.forEach((dot, slideIndex) => dot.setAttribute('aria-current', slideIndex === index ? 'true' : 'false'));
        if (userInitiated) restart();
      }

      function stop() {
        if (timer) clearInterval(timer);
        timer = null;
      }

      function start() {
        if (timer) return;
        timer = setInterval(() => show(index + 1), 5200);
      }

      function restart() {
        stop();
        start();
      }

      previous.addEventListener('click', () => show(index - 1, true));
      next.addEventListener('click', () => show(index + 1, true));
      carousel.addEventListener('mouseenter', stop);
      carousel.addEventListener('mouseleave', start);
      carousel.addEventListener('focusin', stop);
      carousel.addEventListener('focusout', event => {
        if (!carousel.contains(event.relatedTarget)) start();
      });
      carousel.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse') return;
        pointerStart = event.clientX;
      });
      carousel.addEventListener('pointerup', event => {
        if (pointerStart === null) return;
        const distance = event.clientX - pointerStart;
        pointerStart = null;
        if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1), true);
      });
      document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

      show(0);
      start();
    })();
  
})();