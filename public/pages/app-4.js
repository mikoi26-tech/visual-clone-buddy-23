
    (() => {
      const welcome = document.getElementById('lvWelcome');
      const enter = document.getElementById('lvWelcomeEnter');
      let seen = false;
      try { seen = sessionStorage.getItem('lv_welcome_seen_v33') === '1'; } catch {}
      if (seen) { welcome.hidden = true; return; }
      let closed = false;
      const closeWelcome = () => {
        if (closed) return;
        closed = true;
        welcome.classList.add('closing');
        welcome.classList.remove('open');
        welcome.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lv-welcome-active');
        try { sessionStorage.setItem('lv_welcome_seen_v33', '1'); } catch {}
        setTimeout(() => { welcome.hidden = true; }, 460);
      };
      document.body.classList.add('lv-welcome-active');
      requestAnimationFrame(() => {
        welcome.classList.add('open');
        welcome.setAttribute('aria-hidden', 'false');
      });
      enter.addEventListener('click', closeWelcome);
      setTimeout(closeWelcome, 2300);
    })();
  