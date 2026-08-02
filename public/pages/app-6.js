
    (() => {
      const overlay = document.getElementById('globalSettingsOverlay');
      const openButton = document.getElementById('globalSettingsButton');
      const closeButton = document.getElementById('globalSettingsClose');
      const saveButton = document.getElementById('settingsSave');
      const logoutButton = document.getElementById('settingsLogout');
      const status = document.getElementById('settingsStatus');
      const keyField = document.getElementById('settingsAccessKey');
      const hwidField = document.getElementById('settingsHwid');
      let actualHwid = '';

      function normalizeUserAgentForHwid(ua) {
        return String(ua || '').replace(/\b\d+(?:\.\d+){1,4}\b/g, 'v');
      }

      async function sha256ForHwid(value) {
        const bytes = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
      }

      async function resolveActualHwid(apiDeviceId = '') {
        const valid = value => /^[a-f0-9]{64}$/i.test(String(value || '').trim());

        if (valid(apiDeviceId)) {
          actualHwid = String(apiDeviceId).trim().toLowerCase();
          try { localStorage.setItem('lv_bound_device_id', actualHwid); } catch {}
          return actualHwid;
        }

        try {
          const stored = localStorage.getItem('lv_bound_device_id') || '';
          if (valid(stored)) {
            actualHwid = stored.toLowerCase();
            return actualHwid;
          }
        } catch {}

        let seed = '';
        try {
          seed = localStorage.getItem('lv_device_seed') || '';
          if (!valid(seed)) {
            const randomBytes = new Uint8Array(32);
            crypto.getRandomValues(randomBytes);
            seed = [...randomBytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
            localStorage.setItem('lv_device_seed', seed);
          }
        } catch {
          seed = String(Math.random()) + Date.now();
        }

        const parts = [
          normalizeUserAgentForHwid(navigator.userAgent),
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

        actualHwid = await sha256ForHwid(parts.join('|'));
        try { localStorage.setItem('lv_bound_device_id', actualHwid); } catch {}
        return actualHwid;
      }
      const usernameField = document.getElementById('settingsGlobalUsername');
      const paymentField = document.getElementById('settingsPaymentName');
      const currencyField = document.getElementById('settingsGlobalCurrency');

      function openSettings() {
        const settings = window.LVGlobalSettings?.load?.() || { username: '', paymentName: '', currency: 'USD' };
        usernameField.value = settings.username || '';
        paymentField.value = settings.paymentName || '';
        currencyField.value = settings.currency || 'USD';
        status.textContent = '';
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        loadAccessDetails();
        setTimeout(() => usernameField.focus(), 120);
      }

      function closeSettings() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      async function loadAccessDetails() {
        keyField.value = 'Loading…';
        hwidField.value = 'Loading…';
        try {
          const response = await fetch('/api/check-session?t=' + Date.now(), { credentials: 'same-origin', cache: 'no-store' });
          const data = await response.json();
          if (!data.authenticated) {
            location.replace('/?access=removed');
            return;
          }
          try {
            if (data.deviceId) localStorage.setItem('lv_bound_device_id', data.deviceId);
          } catch {}
          let storedKey = '';
          try { storedKey = localStorage.getItem('lv_access_key') || ''; } catch {}

          const isRealAccessKey = value => {
            const candidate = String(value || '').trim();
            return /^TRYHARD-(?:[A-Z0-9]{5}-){3}[A-Z0-9]{5}$/i.test(candidate)
              && !candidate.includes('•')
              && !candidate.includes('*');
          };

          const localKey = isRealAccessKey(storedKey) ? String(storedKey).trim().toUpperCase() : '';
          const realAccessKey = localKey;

          // The API intentionally returns only a masked key. A full key is
          // available only in the browser where it was originally redeemed.
          if (realAccessKey) {
            try { localStorage.setItem('lv_access_key', realAccessKey); } catch {}
          } else {
            try {
              const current = localStorage.getItem('lv_access_key') || '';
              if (current.includes('•') || current.includes('*')) {
                localStorage.removeItem('lv_access_key');
              }
            } catch {}
          }

          const fullHwid = await resolveActualHwid(data.deviceId || '');

          keyField.value = realAccessKey || data.maskedKey || 'Active access key';
          hwidField.value = fullHwid || 'Unavailable';
          hwidField.title = fullHwid || 'Unavailable';

          // Never put a masked key into copyValue.
          keyField.dataset.copyValue = realAccessKey;
          hwidField.dataset.copyValue = fullHwid || '';
        } catch {
          keyField.value = 'Unable to load';
          hwidField.value = 'Unable to load';
        }
      }

      openButton?.addEventListener('click', openSettings);
      closeButton?.addEventListener('click', closeSettings);
      overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeSettings(); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeSettings(); });

      document.querySelectorAll('[data-copy-target]').forEach(button => {
        button.addEventListener('click', async () => {
          const target = document.getElementById(button.dataset.copyTarget);
          if (!target || target.value === 'Loading…') return;

          let copyValue = target.dataset.copyValue || '';

          if (target.id === 'settingsHwid') {
            copyValue = actualHwid || await resolveActualHwid();
            target.dataset.copyValue = copyValue;
          }

          if (target.id === 'settingsAccessKey') {
            const isRealAccessKey = value => {
              const candidate = String(value || '').trim();
              return /^TRYHARD-(?:[A-Z0-9]{5}-){3}[A-Z0-9]{5}$/i.test(candidate)
                && !candidate.includes('•')
                && !candidate.includes('*');
            };

            if (!isRealAccessKey(copyValue)) {
              // Never fall back to the visible masked field.
              button.textContent = 'Unavailable';
              setTimeout(() => button.textContent = 'Copy', 1400);
              return;
            }
          }

          if (!copyValue || copyValue === 'Unavailable') return;

          try {
            await navigator.clipboard.writeText(copyValue);
            const old = button.textContent;
            button.textContent = 'Copied';
            setTimeout(() => button.textContent = old, 1100);
          } catch {
            const helper = document.createElement('textarea');
            helper.value = copyValue;
            helper.setAttribute('readonly', '');
            helper.style.position = 'fixed';
            helper.style.left = '-9999px';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.focus();
            helper.select();
            document.execCommand('copy');
            helper.remove();

            const old = button.textContent;
            button.textContent = 'Copied';
            setTimeout(() => button.textContent = old, 1100);
          }
        });
      });

      saveButton?.addEventListener('click', () => {
        const saved = window.LVGlobalSettings?.save?.({
          username: usernameField.value,
          paymentName: paymentField.value,
          currency: currencyField.value,
        });
        if (saved) {
          usernameField.value = saved.username;
          paymentField.value = saved.paymentName;
          currencyField.value = saved.currency;
        }
        status.textContent = 'Saved across all visuals';
        setTimeout(() => status.textContent = '', 2200);
      });

      logoutButton?.addEventListener('click', async () => {
        if (!confirm('Log out of Lachy\'s Visuals on this browser? Your key stays bound to this device and can be used again here.')) return;
        logoutButton.disabled = true;
        logoutButton.textContent = 'Logging out…';
        try {
          const response = await fetch('/api/logout', { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' } });
          const data = await response.json().catch(() => ({}));
          location.replace(data.redirect || '/?logout=1');
        } catch {
          logoutButton.disabled = false;
          logoutButton.textContent = 'Log out';
          status.textContent = 'Could not log out';
        }
      });
    })();
  