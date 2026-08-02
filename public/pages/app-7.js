
    (() => {
      if (!Element.prototype.animate) return;

      const ease = 'cubic-bezier(.2,.82,.2,1)';
      const play = (el, frames, options) => {
        if (!el) return;
        try { el.animate(frames, { ...options, easing: ease }); } catch {}
      };

      // Animate immediately. Nothing is hidden while waiting for JavaScript.
      requestAnimationFrame(() => {
        document.body.classList.add('selection-loaded');
        play(document.querySelector('.topbar'), [
          { opacity: 0, transform: 'translateY(-18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 650, delay: 40, fill: 'backwards' });

        play(document.querySelector('.hero-copy'), [
          { opacity: 0, transform: 'translateY(34px) scale(.975)', filter: 'blur(8px)' },
          { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
        ], { duration: 900, delay: 100, fill: 'backwards' });

        play(document.querySelector('.section-head'), [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 650, delay: 420, fill: 'backwards' });

        document.querySelectorAll('.visual-card').forEach((card, index) => {
          play(card, [
            { opacity: 0, transform: 'translateY(44px) scale(.965)', filter: 'blur(7px)' },
            { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
          ], { duration: 780, delay: 520 + index * 105, fill: 'backwards' });
        });

        const about = document.querySelector('#about');
        play(about, [
          { opacity: 0, transform: 'translateY(28px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 760, delay: 1050, fill: 'backwards' });
      });
    })();
  