(() => {
  'use strict';

  const path = location.pathname;
  const site = path.includes('/2k27') ? '2k' : path.includes('/fortnite') ? 'fortnite' : null;
  if (!site || window.__lvxCheckout) return;
  window.__lvxCheckout = true;

  const configs = {
    '2k': {
      theme: 'lvx-theme-2k', brand: 'NBA 2K27', header: '2K Checkout', logo: '/assets/2k27-logo.png',
      playerLabel: 'Player ID', placeholder: 'Enter player ID…', productName: 'Standard Edition',
      price: '$69.99', image: '/assets/standard-edition.png'
    },
    fortnite: {
      theme: 'lvx-theme-fortnite', brand: 'Epic Games', header: 'Epic Checkout', logo: '/fortnite/assets/epic-logo.png',
      playerLabel: 'Fortnite username', placeholder: 'Enter Fortnite username…', productName: 'Ikonik',
      price: '$250.00', image: '/fortnite/assets/ikonik.webp'
    }
  };
  const platformOptions = {
    pc: { label: site === 'fortnite' ? 'PC / Epic' : 'PC', icon: '/fc27/assets/icons/windows-pc-white.svg' },
    playstation: { label: 'PlayStation', icon: '/fc27/assets/icons/playstation-white.svg' },
    xbox: { label: 'Xbox', icon: '/fc27/assets/icons/xbox-white.svg' }
  };
  const config = configs[site];
  let product = { name: config.productName, price: config.price, image: config.image };
  let username = '';
  let platform = '';
  let timer = null;
  let timers = [];
  let payment = 'applepay';
  try { payment = localStorage.getItem(`lvx-payment-${site}`) === 'visa' ? 'visa' : 'applepay'; } catch {}

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
  const initial = value => String(value || '').trim().charAt(0).toUpperCase() || '?';
  const platformMeta = () => platformOptions[platform] || { label: 'Choose a platform', icon: platformOptions.pc.icon };
  const parsePrice = text => {
    const match = String(text || '').match(/[$£€]?\s*[\d,.]+/);
    return match ? match[0].replace(/\s/g, '') : site === '2k' ? '$69.99' : '$0.00';
  };
  const edition2k = id => ({
    standard: { name: 'Standard Edition', price: '$69.99', image: '/assets/standard-edition.png' },
    deluxe: { name: 'Deluxe Edition', price: '$99.99', image: '/assets/deluxe-edition.png' },
    ultra: { name: 'Ultra Edition', price: '$149.99', image: '/assets/ultra-edition.png' }
  }[id] || null);

  function from2k(button) {
    const text = (button?.textContent || '').toLowerCase();
    const id = text.includes('ultra') || button?.closest('.loyalty-section') ? 'ultra' : text.includes('deluxe') ? 'deluxe' : 'standard';
    return edition2k(id);
  }

  function fromFortnite(items) {
    if (Array.isArray(items) && items.length) {
      const total = items.reduce((sum, item) => sum + Number(item?.price || 0), 0);
      return {
        name: items.length > 1 ? `${items.length} Fortnite items` : items[0].name || 'Fortnite item',
        price: `$${total.toFixed(2)}`,
        image: items[0].img || config.image
      };
    }
    const rows = [...document.querySelectorAll('.cart-row')];
    if (rows.length) {
      const price = document.querySelector('.cart-summary .total b')?.textContent || '$0.00';
      return {
        name: rows.length > 1 ? `${rows.length} Fortnite items` : rows[0].querySelector('.cart-name')?.textContent || 'Fortnite item',
        price: parsePrice(price),
        image: rows[0].querySelector('img')?.src || config.image
      };
    }
    return {
      name: document.querySelector('#detailTitle')?.textContent?.trim() || 'Fortnite item',
      price: parsePrice(document.querySelector('#detailPrice')?.textContent),
      image: document.querySelector('#sideImg')?.src || config.image
    };
  }

  const applePayBadge = `<span class="lvx-apple-logo-crop"><img src="/fc27/assets/checkout/apple-pay-logo.png" alt="Apple Pay"></span>`;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="lvx-checkout ${config.theme}" id="lvxCheckout" aria-hidden="true">
      <div class="lvx-backdrop" data-lvx-close></div>
      <section class="lvx-shell" role="dialog" aria-modal="true" aria-label="${esc(config.brand)} checkout">
        <header class="lvx-top">
          <div class="lvx-brand"><img src="${config.logo}" alt="${esc(config.brand)}"><div><strong>${esc(config.header)}</strong><span>${esc(config.brand)}</span></div></div>
          <button class="lvx-close" type="button" aria-label="Close checkout" data-lvx-close>×</button>
        </header>
        <div class="lvx-stage">
          <section class="lvx-panel active" data-lvx-panel="player">
            <h2>Find User</h2><p class="lvx-sub">Choose a platform, then search for the ${esc(config.playerLabel)} receiving this order.</p>
            <div class="lvx-order"><img id="lvxOrderImage" src="${config.image}" alt=""><div><span>Selected item</span><strong id="lvxOrderName">${esc(config.productName)}</strong><small><b id="lvxOrderPlatform">Choose a platform</b> · Digital order</small></div></div>
            <span class="lvx-label">Platform</span>
            <div class="lvx-platform-grid" role="group" aria-label="Recipient platform">
              ${Object.entries(platformOptions).map(([key, value]) => `<button type="button" data-lvx-platform="${key}" aria-label="${esc(value.label)}"><img src="${value.icon}" alt=""><span>${esc(value.label)}</span></button>`).join('')}
            </div>
            <label class="lvx-label lvx-username-label" for="lvxUsername">${esc(config.playerLabel)}</label>
            <div class="lvx-search"><input id="lvxUsername" class="lvx-player-input" data-cash-keyboard="true" inputmode="none" autocomplete="off" placeholder="${esc(config.placeholder)}"><button id="lvxSearch" type="button" disabled>Search</button></div>
            <div class="lvx-lookup" id="lvxLookup">Choose a platform to begin.</div>
            <div class="lvx-player" id="lvxPlayer"><span class="lvx-initial" id="lvxPlayerInitial">?</span><div><strong id="lvxPlayerName">Player</strong><small id="lvxPlayerPlatform">Platform · Online recently</small></div></div>
            <button class="lvx-primary" id="lvxContinue" type="button" disabled>Continue to payment</button>
          </section>
          <section class="lvx-panel" data-lvx-panel="payment">
            <h2>Confirm order</h2><p class="lvx-sub" id="lvxPaymentSub"></p>
            <div class="lvx-order"><img id="lvxPaymentImage" src="${config.image}" alt=""><div><span>Selected item</span><strong id="lvxPaymentName">${esc(config.productName)}</strong><small><b id="lvxPaymentPlatform">Platform</b> · Global</small></div></div>
            <label class="lvx-method-label"><span>Payment method</span><select id="lvxMethod"><option value="applepay">Apple Pay</option><option value="visa">Visa •••• 4242</option></select></label>
            <div class="lvx-method-card"><div id="lvxMethodIcon">${applePayBadge}<p><strong>Apple Pay</strong><span>Continue securely with Apple Pay.</span></p></div><div class="lvx-payment-row"><span>Total</span><strong id="lvxPaymentTotal">${config.price}</strong></div></div>
            <button class="lvx-primary" id="lvxPay" type="button"></button><button class="lvx-back" id="lvxBack" type="button">Back</button>
          </section>
          <section class="lvx-panel lvx-scan-panel" data-lvx-panel="scan"><div class="lvx-scan"><img src="/fc27/assets/checkout/apple-pay-scan-code.png" alt="Scan Code with iPhone"></div><button class="lvx-scan-back" id="lvxScanBack" type="button">Back to payment methods</button></section>
          <section class="lvx-panel lvx-appstore-panel" data-lvx-panel="appstore"><div class="lvx-appstore"><div class="lvx-as-head"><strong>App Store</strong><button class="lvx-as-close" id="lvxAppBack" type="button" aria-label="Back to payment methods">×</button></div><div class="lvx-as-card"><div class="lvx-as-product"><img id="lvxAppImage" src="${config.image}" alt=""><div><strong id="lvxAppName">${esc(config.productName)}</strong><span>${esc(config.brand)} <em>13+</em></span><span>In-app purchase</span></div></div><div class="lvx-as-price"><strong id="lvxAppPrice">${config.price}</strong><span>One-time charge</span></div><div class="lvx-as-account">Account: <span id="lvxAppAccount">Player</span></div></div><button class="lvx-side-confirm" id="lvxSideConfirm" type="button"><span class="lvx-side-icon"><svg viewBox="0 0 34 34" fill="none"><rect x="9" y="3" width="16" height="28" rx="4" stroke="#007aff" stroke-width="2.5" fill="#dce8ff"></rect><rect x="12" y="5" width="10" height="2" rx="1" fill="#007aff" opacity=".5"></rect></svg></span><strong>Confirm with side button</strong></button></div></section>
          <section class="lvx-panel lvx-state" data-lvx-panel="processing"><div class="lvx-spinner"></div><h2>Processing payment</h2><p id="lvxProcessingText">Authorizing payment…</p><div class="lvx-progress"><span id="lvxProgress"></span></div></section>
          <section class="lvx-panel lvx-state" data-lvx-panel="success"><div class="lvx-check">✓</div><h2>Purchase Successful</h2><p id="lvxSuccessCopy"></p><div class="lvx-receipt"><div class="lvx-receipt-head"><span class="lvx-initial" id="lvxReceiptInitial">?</span><div><small>Gift sent to</small><strong id="lvxReceiptPlayer">Player</strong></div></div><dl class="lvx-lines"><div><dt>Item</dt><dd id="lvxReceiptItem"></dd></div><div><dt>Platform</dt><dd id="lvxReceiptPlatform">Platform</dd></div><div><dt>Amount</dt><dd id="lvxReceiptPrice"></dd></div><div><dt>Payment</dt><dd id="lvxReceiptPayment"></dd></div><div><dt>Order ID</dt><dd id="lvxReceiptOrder"></dd></div><div><dt>Status</dt><dd>Gift Sent</dd></div></dl></div><button class="lvx-primary" id="lvxDone" type="button">Done</button></section>
        </div>
      </section>
    </div>`);

  const modal = document.querySelector('#lvxCheckout');
  const $ = id => document.getElementById(id);
  const panels = [...modal.querySelectorAll('[data-lvx-panel]')];
  const speedBase = [4200, 2700, 1650, 850];
  const speed = () => {
    const globalValue = window.LVGlobalSettings?.load?.().paymentSpeed;
    if (Number.isFinite(Number(globalValue))) return Math.max(0, Math.min(3, Number(globalValue)));
    try { return Math.max(0, Math.min(3, Number(localStorage.getItem('lvx-apple-speed') ?? 1))); } catch { return 1; }
  };
  const duration = () => Math.round(speedBase[speed()] * (.78 + Math.random() * .44));
  const mobile = () => matchMedia('(max-width:680px)').matches;

  const show = name => {
    panels.forEach(panelNode => panelNode.classList.toggle('active', panelNode.dataset.lvxPanel === name));
    modal.classList.toggle('scan', name === 'scan');
    modal.classList.toggle('appstore', name === 'appstore');
  };

  function resetLookup(message = 'Choose a platform to begin.') {
    clearTimeout(timer);
    username = '';
    $('lvxUsername').value = '';
    $('lvxLookup').textContent = message;
    $('lvxPlayer').classList.remove('ready');
    $('lvxPlayerInitial').textContent = '?';
    $('lvxContinue').disabled = true;
    $('lvxSearch').disabled = !platform;
    $('lvxSearch').textContent = 'Search';
  }

  function selectPlatform(value) {
    if (!platformOptions[value]) return;
    platform = value;
    const meta = platformMeta();
    modal.querySelectorAll('[data-lvx-platform]').forEach(button => button.classList.toggle('active', button.dataset.lvxPlatform === value));
    $('lvxOrderPlatform').textContent = meta.label;
    $('lvxPlayerPlatform').textContent = `${meta.label} · Online recently`;
    resetLookup(`Ready to search ${meta.label}.`);
    setTimeout(() => $('lvxUsername').focus(), 60);
  }

  function sync() {
    const meta = platformMeta();
    $('lvxOrderName').textContent = $('lvxPaymentName').textContent = $('lvxAppName').textContent = product.name;
    ['lvxOrderImage', 'lvxPaymentImage', 'lvxAppImage'].forEach(id => { $(id).src = product.image; });
    $('lvxOrderPlatform').textContent = meta.label;
    $('lvxPaymentPlatform').textContent = meta.label;
    $('lvxPaymentTotal').textContent = $('lvxAppPrice').textContent = product.price;
    $('lvxPaymentSub').textContent = `${product.name} for ${username || 'the selected player'}.`;
    $('lvxMethod').value = payment;
    const visa = payment === 'visa';
    $('lvxMethodIcon').innerHTML = visa
      ? `<b class="lvx-visa">VISA</b><p><strong>Visa</strong><span>Saved card · •••• 4242</span></p>`
      : `${applePayBadge}<p><strong>Apple Pay</strong><span>${mobile() ? 'Continue in the App Store sheet.' : 'Scan with iPhone to continue.'}</span></p>`;
    $('lvxPay').textContent = visa ? `Confirm Visa · ${product.price}` : `Continue with Apple Pay · ${product.price}`;
  }

  function open(nextProduct) {
    product = nextProduct || product;
    platform = '';
    modal.querySelectorAll('[data-lvx-platform]').forEach(button => button.classList.remove('active'));
    resetLookup();
    sync();
    show('player');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    clearTimeout(timer);
    timers.forEach(clearTimeout);
    timers = [];
    modal.classList.remove('open', 'scan', 'appstore');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function lookup() {
    if (!platform) { $('lvxLookup').textContent = 'Choose a platform first.'; return; }
    const value = $('lvxUsername').value.trim();
    if (!value) { $('lvxLookup').textContent = `Enter a ${config.playerLabel}.`; return; }
    const meta = platformMeta();
    $('lvxSearch').disabled = true;
    $('lvxSearch').innerHTML = 'Searching<span class="lvx-dots"><i></i><i></i><i></i></span>';
    $('lvxLookup').textContent = `Searching ${meta.label}…`;
    timer = setTimeout(() => {
      username = value;
      $('lvxPlayerInitial').textContent = initial(username);
      $('lvxPlayerName').textContent = username;
      $('lvxPlayerPlatform').textContent = `${meta.label} · Online recently`;
      $('lvxPlayer').classList.add('ready');
      $('lvxLookup').textContent = 'User found.';
      $('lvxContinue').disabled = false;
      $('lvxSearch').disabled = false;
      $('lvxSearch').textContent = 'Search';
    }, window.LVRuntime?.delay?.(650, 1100, 'lookup') || 850);
  }

  function processing() {
    clearTimeout(timer);
    show('processing');
    const total = duration();
    const bar = $('lvxProgress');
    bar.style.width = '0';
    const stages = [[.05, 18, 'Authorizing payment…'], [.34, 46, 'Checking order details…'], [.67, 78, 'Finalizing order…'], [.9, 100, 'Generating receipt…']];
    stages.forEach(([part, percent, text]) => timers.push(setTimeout(() => {
      bar.style.width = `${percent}%`;
      $('lvxProcessingText').textContent = text;
    }, total * part)));
    timers.push(setTimeout(success, total));
  }

  function success() {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const part = () => Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    $('lvxReceiptInitial').textContent = initial(username);
    $('lvxReceiptPlayer').textContent = username;
    $('lvxReceiptItem').textContent = product.name;
    $('lvxReceiptPlatform').textContent = platformMeta().label;
    $('lvxReceiptPrice').textContent = product.price;
    $('lvxReceiptPayment').textContent = payment === 'visa' ? 'Visa •••• 4242' : 'Apple Pay';
    $('lvxReceiptOrder').textContent = `LV-${part()}-${part()}`;
    $('lvxSuccessCopy').textContent = `Gift sent to ${username}.`;
    if (site === 'fortnite') window.LVFortniteClearCart?.();
    show('success');
  }

  function pay() {
    if (payment === 'visa') { processing(); return; }
    if (mobile()) {
      show('appstore');
      $('lvxAppAccount').textContent = username;
      modal.classList.add('appstore');
    } else {
      show('scan');
      modal.classList.add('scan');
    }
    timer = setTimeout(processing, Math.max(650, duration() * .55));
  }

  modal.addEventListener('click', event => {
    const target = event.target.closest('button,[data-lvx-close]');
    if (!target) return;
    if (target.dataset.lvxPlatform) {
      event.preventDefault();
      selectPlatform(target.dataset.lvxPlatform);
      return;
    }
    const id = target.id;
    if (!target.matches('[data-lvx-close]') && !['lvxSearch', 'lvxContinue', 'lvxBack', 'lvxPay', 'lvxScanBack', 'lvxAppBack', 'lvxSideConfirm', 'lvxDone'].includes(id)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (target.matches('[data-lvx-close]') || id === 'lvxDone') { close(); return; }
    if (id === 'lvxSearch') { lookup(); return; }
    if (id === 'lvxContinue') { sync(); show('payment'); return; }
    if (id === 'lvxBack') { show('player'); return; }
    if (id === 'lvxPay') { pay(); return; }
    if (id === 'lvxScanBack') { clearTimeout(timer); modal.classList.remove('scan'); show('payment'); return; }
    if (id === 'lvxAppBack') { clearTimeout(timer); modal.classList.remove('appstore'); show('payment'); return; }
    if (id === 'lvxSideConfirm') { clearTimeout(timer); timer = setTimeout(processing, 300); }
  }, true);

  $('lvxUsername').addEventListener('keydown', event => { if (event.key === 'Enter') lookup(); });
  $('lvxMethod').addEventListener('change', event => {
    payment = event.target.value === 'visa' ? 'visa' : 'applepay';
    try { localStorage.setItem(`lvx-payment-${site}`, payment); } catch {}
    sync();
  });
  addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) close(); });

  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || modal.contains(button)) return;
    let match = false;
    let next = null;
    if (site === '2k' && (button.matches('.official-edition-button,.header-cta') || (/pre-order/i.test(button.textContent || '') && button.closest('.loyalty-section')))) {
      match = true;
      next = from2k(button);
    }
    if (site === 'fortnite' && button.matches('.side-buy,.cart-checkout')) {
      match = true;
      next = fromFortnite();
    }
    if (match) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      open(next);
    }
  }, true);

  if (site === 'fortnite') window.openCheckout = items => open(fromFortnite(items));
  window.LVXCheckout = { open, close, selectPlatform };
})();
