
    const amounts=[25,50,100];
    const avatars=window.LVAvatarPools?.all||{ps:['/assets/avatars/ps-avatar-02.webp'],xbox:['/assets/avatars/xbox-avatar-01.webp']};
    const state={platform:'ps',amount:25,username:'',hasSelectedAmount:false};
    const cfg={
      ps:{name:'PlayStation',account:'PSN Online ID',logo:'assets/playstation-logo.png'},
      xbox:{name:'Xbox',account:'Xbox Gamertag',logo:'assets/xbox-logo.png'}
    };
    const cards=document.getElementById('cards');
    const overlay=document.getElementById('overlay');
    const modalContent=document.getElementById('modalContent');
    const platformWord=document.querySelector('.platform-word');
    const psTab=document.getElementById('psTab');
    const xboxTab=document.getElementById('xboxTab');
    const selectionNote=document.getElementById('selectionNote');
    const customAmountButton=document.getElementById('customAmountButton');

    const escapeHtml=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
    const random=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;
    const orderNo=()=>`${random(1000,9999)}-${random(1000,9999)}-${random(1000,9999)}`;
    const emailFor=name=>`${name.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,14)||'customer'}${random(10,999)}@gmail.com`;
    const settings=()=>window.LVGlobalSettings?.load?.()||{username:'tiktok lachbtw',paymentName:'Thomas Smith',currency:'USD'};
    const currencyMeta={
      USD:{code:'USD',symbol:'$',prefix:'$'},
      NZD:{code:'NZD',symbol:'NZ$',prefix:'NZ$'},
      AUD:{code:'AUD',symbol:'A$',prefix:'A$'},
      GBP:{code:'GBP',symbol:'£',prefix:'£'}
    };
    const currentCurrency=()=>{const code=String(settings().currency||'USD').toUpperCase();return currencyMeta[code]||currencyMeta.USD};
    const money=(amount,decimals=false)=>{const c=currentCurrency();return `${c.prefix}${Number(amount).toFixed(decimals?2:0)}`};
    const delay=(min,max,kind='loading')=>window.LVRuntime?.delay(min,max,kind)??random(min,max);
    const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// Auto Gift is controlled by the shared unattended product controller.
    const autoGift=Object.freeze({
      isEnabled:()=>false,
      setEnabled:()=>{},
      onRecipientReady:()=>{},
      onPaymentReady:()=>{},
      onSuccess:()=>{},
      onAmountSelected:()=>{},
      onSelectionReset:()=>{}
    });

function renderCards(){
      const c=cfg[state.platform];
      const cur=currentCurrency();
      cards.innerHTML=amounts.map(amount=>{
        if(state.platform==='ps'){
          return `<button class="gift-card ps-card" type="button" data-amount="${amount}" aria-label="PlayStation ${money(amount)} ${cur.code} gift card">
            <div class="ps-head">
              <div class="gift-label">GIFT CARD</div>
              <div class="amount">${money(amount)}<small>${cur.code}</small></div>
            </div>
            <div class="brand-logo"><img src="${c.logo}" alt="PlayStation"  decoding="async"/></div>
            <div class="code-strip">Digital Code</div>
            <div class="selected-badge"><i>✓</i>Selected</div>
          </button>`;
        }
        return `<button class="gift-card xbox-card" type="button" data-amount="${amount}" aria-label="Xbox ${money(amount)} ${cur.code} gift card">
          <img class="microsoft-logo" src="assets/microsoft-logo.png" alt="Microsoft"  decoding="async"/>
          <div class="amount">${money(amount)}<small>${cur.code}</small></div>
          <div class="brand-logo"><img src="${c.logo}" alt="Xbox"  decoding="async" loading="lazy"/></div>
          <div class="gift-title">GIFT CARD</div>
          <div class="card-foot">Buy Xbox games, add-ons, Game Pass, and more*</div>
          <div class="selected-badge"><i>✓</i>Selected</div>
        </button>`;
      }).join('');
      cards.querySelectorAll('.gift-card').forEach(card=>{
        card.addEventListener('click',async e=>{
          if(card.dataset.busy==='1') return;
          cards.querySelectorAll('.gift-card').forEach(c=>{
            c.classList.remove('selected','selecting');
            c.dataset.busy='0';
            c.setAttribute('aria-pressed','false');
          });

          card.dataset.busy='1';
          card.classList.add('selected','selecting');
          card.setAttribute('aria-pressed','true');

          const rect=card.getBoundingClientRect();
          const ripple=document.createElement('span');
          ripple.className='click-ripple';
          ripple.style.left=`${e.clientX ? e.clientX-rect.left : rect.width/2}px`;
          ripple.style.top=`${e.clientY ? e.clientY-rect.top : rect.height/2}px`;
          card.appendChild(ripple);
          setTimeout(()=>ripple.remove(),720);

          state.amount=Number(card.dataset.amount);
          state.username='';
          state.hasSelectedAmount=true;
          autoGift.onAmountSelected();
          selectionNote.classList.add('active');
          selectionNote.innerHTML=`<span class="selection-dot"></span><strong>${money(state.amount)} ${cfg[state.platform].name}</strong> gift card selected`;

          await sleep(delay(220,360));
          card.classList.remove('selecting');
          openRecipient();
        });
      });
    }

    function resetGiftSelection(){
      cards.querySelectorAll('.gift-card').forEach(card=>{
        card.classList.remove('selected','selecting');
        card.dataset.busy='0';
        card.setAttribute('aria-pressed','false');
      });
      customAmountButton.classList.remove('active');
      customAmountButton.disabled=false;
      state.hasSelectedAmount=false;
      autoGift.onSelectionReset();
      selectionNote.classList.remove('active');
      selectionNote.textContent='Choose a gift card to continue.';
    }

    function openCustomAmount(){
      resetGiftSelection();
      customAmountButton.classList.add('active');
      const currency=currentCurrency();

      modalContent.classList.remove('stage-swap');
      void modalContent.offsetWidth;
      modalContent.classList.add('stage-swap');
      modalContent.innerHTML=`
        <div class="modal-icon"><img src="${cfg[state.platform].logo}" alt="" decoding="async" loading="lazy"></div>
        <h2>Enter a custom amount</h2>
        <p class="sub">Choose a custom ${cfg[state.platform].name} gift-card value.</p>

        <div class="custom-amount-shell">
          <label class="custom-amount-label" for="customAmountInput">Gift-card amount</label>
          <div class="custom-amount-field">
            <span class="custom-currency-prefix">${currency.prefix}</span>
            <input id="customAmountInput" type="number" inputmode="numeric" min="1" max="500" step="1" placeholder="Enter amount" autocomplete="off">
            <span class="custom-currency-code">${currency.code}</span>
          </div>
          <div class="custom-amount-help" id="customAmountHelp">Enter a whole amount from ${currency.prefix}1 to ${currency.prefix}500.</div>
        </div>

        <button class="primary" id="customAmountContinue" disabled>Continue</button>
        <button class="secondary" id="customAmountCancel">Cancel</button>`;

      showOverlay();

      const input=document.getElementById('customAmountInput');
      const help=document.getElementById('customAmountHelp');
      const continueButton=document.getElementById('customAmountContinue');
      const cancelButton=document.getElementById('customAmountCancel');

      function validateCustomAmount(){
        const raw=input.value.trim();
        const amount=Number(raw);
        const isWhole=Number.isInteger(amount);
        const valid=raw!=='' && Number.isFinite(amount) && isWhole && amount>=1 && amount<=500;

        help.classList.toggle('error',raw!=='' && !valid);
        if(raw==='' || valid){
          help.textContent=valid
            ? `${money(amount)} ${currency.code} gift card`
            : `Enter a whole amount from ${currency.prefix}1 to ${currency.prefix}500.`;
        }else{
          help.textContent=`Enter a whole amount between ${currency.prefix}1 and ${currency.prefix}500.`;
        }

        continueButton.disabled=!valid;
        return valid ? amount : null;
      }

      input.addEventListener('input',validateCustomAmount);
      input.addEventListener('keydown',event=>{
        if(event.key==='Enter' && !continueButton.disabled){
          continueButton.click();
        }
      });

      continueButton.onclick=async()=>{
        const amount=validateCustomAmount();
        if(amount===null) return;

        state.amount=amount;
        state.username='';
        state.hasSelectedAmount=true;
        autoGift.onAmountSelected();
        customAmountButton.classList.add('active');
        selectionNote.classList.add('active');
        selectionNote.innerHTML=`<span class="selection-dot"></span><strong>${money(amount)} ${cfg[state.platform].name}</strong> custom gift card selected`;

        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden','true');
        document.body.style.overflow='';

        await sleep(220);
        openRecipient();
      };

      cancelButton.onclick=closeOverlay;
      setTimeout(()=>input.focus(),120);
    }

    customAmountButton.addEventListener('click',openCustomAmount);

    function setPlatform(platform){
      state.platform=platform;
      state.username='';
      document.body.classList.toggle('xbox',platform==='xbox');
      psTab.classList.toggle('active',platform==='ps');
      xboxTab.classList.toggle('active',platform==='xbox');
      platformWord.textContent=cfg[platform].name;
      resetGiftSelection();
      renderCards();
    }
    psTab.addEventListener('click',()=>setPlatform('ps'));
    xboxTab.addEventListener('click',()=>setPlatform('xbox'));

    function showOverlay(){
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function closeOverlay(){
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      state.username='';
      resetGiftSelection();
    }
    overlay.addEventListener('click',e=>{if(e.target===overlay)closeOverlay()});

    function openRecipient(){
      const c=cfg[state.platform];
      state.username='';
      modalContent.classList.remove('stage-swap');
      void modalContent.offsetWidth;
      modalContent.classList.add('stage-swap');
      modalContent.innerHTML=`
        <div class="modal-icon"><img src="${c.logo}" alt=""  decoding="async" loading="lazy"/></div>
        <h2>Who’s this gift for?</h2>
        <p class="sub">Search their ${c.account} to continue with the ${money(state.amount)} ${currentCurrency().code} gift card.</p>
        <div class="field"><input id="recipientInput" autocomplete="off" placeholder="Enter ${c.account}" value=""></div>
        <div class="lookup-status" id="lookupStatus">Enter a ${c.account} to continue.</div>
        <div class="account-result" id="accountResult"></div>
        <button class="primary" id="continueBtn" disabled>Continue to payment</button>
        <button class="secondary" id="cancelBtn">Cancel</button>`;
      showOverlay();

      const input=document.getElementById('recipientInput');
      const status=document.getElementById('lookupStatus');
      const result=document.getElementById('accountResult');
      const btn=document.getElementById('continueBtn');
      document.getElementById('cancelBtn').onclick=closeOverlay;

      let debounceTimer=null;
      let lookupTimer=null;
      let verifyTimer=null;
      let lookupToken=0;

      function clearLookupTimers(){
        clearTimeout(debounceTimer);
        clearTimeout(lookupTimer);
        clearTimeout(verifyTimer);
      }

      function lookup(){
        clearLookupTimers();
        const token=++lookupToken;
        state.username='';
        status.classList.remove('loading');
        result.classList.remove('show');
        result.innerHTML='';
        btn.disabled=true;

        const val=input.value.trim();
        if(!val){
          status.textContent=`Enter a ${c.account} to continue.`;
          return;
        }
        if(state.platform==='ps' && /\s/.test(val)){
          status.textContent='PSN Online IDs cannot contain spaces.';
          return;
        }

        // Wait until the user has paused typing before starting the lookup.
        // This prevents accidental partial usernames from being fetched.
        status.textContent='Waiting for you to finish typing…';
        const typingPause=delay(220,380);

        debounceTimer=setTimeout(()=>{
          if(token!==lookupToken) return;
          const requestedValue=input.value.trim();
          if(requestedValue!==val) return;

          status.classList.add('loading');
          status.innerHTML='<span class="spinner"></span> Checking account…';

          const lookupDelay=delay(480,820,'lookup');
          verifyTimer=setTimeout(()=>{
            if(token!==lookupToken || input.value.trim()!==val) return;
            status.innerHTML='<span class="spinner"></span> Verifying account…';
          },Math.min(380,Math.max(210,lookupDelay*.52)));

          lookupTimer=setTimeout(()=>{
            if(token!==lookupToken || input.value.trim()!==val) return;

            state.username=val;
            status.classList.remove('loading');
            status.textContent='Account found';
            const avatar=window.LVAvatarPools?.random(state.platform)||avatars[state.platform][0];
            result.innerHTML=`
              <img class="account-avatar" src="${avatar}" alt="" decoding="async" loading="lazy">
              <div><strong>${escapeHtml(val)}</strong><span>${c.account} found</span></div>`;
            result.classList.add('show');
            btn.disabled=false;
          },lookupDelay);
        },typingPause);
      }

      input.addEventListener('input',lookup);
      btn.onclick=openPayment;
      input.focus();
      autoGift.onRecipientReady(input,btn);
    }

    function openPayment(){
      const c=cfg[state.platform];
      const s=settings();
      modalContent.classList.remove('stage-swap'); void modalContent.offsetWidth; modalContent.classList.add('stage-swap');
      modalContent.innerHTML=`
        <div class="modal-icon"><img src="${c.logo}" alt=""  decoding="async" loading="lazy"/></div>
        <h2>Confirm payment</h2>
        <p class="sub">Send a ${money(state.amount)} ${currentCurrency().code} ${c.name} gift card to <strong>${escapeHtml(state.username)}</strong>.</p>
        <div class="pay-card">
          <div class="pay-head">
            <div class="visa">VISA</div>
            <div class="pay-name">Saved card<strong>${escapeHtml(s.paymentName||'Thomas Smith')}</strong></div>
          </div>
          <div class="pay-row"><span>Card</span><strong>•••• •••• •••• 4242</strong></div>
          <div class="pay-row"><span>Sender</span><strong>${escapeHtml(s.username||'tiktok lachbtw')}</strong></div>
          <div class="pay-row"><span>Total</span><strong>${money(state.amount,true)} ${currentCurrency().code}</strong></div>
        </div>
        <button class="primary" id="payBtn">Confirm ${money(state.amount)} payment</button>
        <button class="secondary" id="backBtn">Back</button>`;
      document.getElementById('backBtn').onclick=openRecipient;
      const payButton=document.getElementById('payBtn');
      payButton.onclick=confirming;
      autoGift.onPaymentReady(payButton);
    }

    async function confirming(){
      const c=cfg[state.platform];
      modalContent.classList.remove('stage-swap'); void modalContent.offsetWidth; modalContent.classList.add('stage-swap');
      modalContent.innerHTML=`
        <div class="loading-stage" aria-live="polite">
          <div class="gift-simple-spinner" role="status" aria-label="Processing payment"></div>
          <h2 id="paymentTitle">Authorizing payment</h2>
          <p class="sub" id="paymentDetail">Checking Visa •••• 4242…</p>
          <div class="loading-detail" id="loadingDetail">Connecting securely…</div>
          <div class="processing-summary"><span>${c.name} gift card</span><strong>${money(state.amount)} · ${escapeHtml(state.username)}</strong></div>
        </div>`;

      const total=delay(900,1450);
      const detail=document.getElementById('loadingDetail');
      const paymentDetail=document.getElementById('paymentDetail');
      const title=document.getElementById('paymentTitle');
      const ring=document.getElementById('paymentProgressRing');
      const meter=document.getElementById('paymentProgressMeter');
      const value=document.getElementById('paymentProgressValue');
      const bar=document.getElementById('paymentProgressBar');
      const updateProgress=(progress,heading,status,copy)=>{
        ring?.setAttribute('aria-valuenow',String(progress));
        if(meter) meter.style.strokeDashoffset=String(100-progress);
        if(value) value.textContent=`${progress}%`;
        if(bar) bar.style.width=`${progress}%`;
        if(title) title.textContent=heading;
        if(detail) detail.textContent=status;
        if(paymentDetail) paymentDetail.textContent=copy;
      };
      const firstStage=Math.round(total*.31);
      const secondStage=Math.round(total*.66);
      await sleep(firstStage);
      updateProgress(52,'Verifying payment','Saved Visa confirmed',`Checking ${c.name} delivery details…`);
      await sleep(secondStage-firstStage);
      updateProgress(82,'Confirming recipient','Recipient is eligible',`Preparing the ${money(state.amount)} gift card for ${escapeHtml(state.username)}…`);
      await sleep(total-secondStage);
      updateProgress(100,'Payment approved','Confirmation ready','Creating your receipt…');
      await sleep(100);
      success();
    }

    function success(){
      modalContent.classList.remove('stage-swap'); void modalContent.offsetWidth; modalContent.classList.add('stage-swap');
      const c=cfg[state.platform];
      const order=orderNo();
      const email=emailFor(state.username);
      modalContent.innerHTML=`
        <div class="success-icon"><span class="success-tick">✓</span></div>
        <h2>${money(state.amount)} sent</h2>
        <p class="sub">${c.name} store credit is on its way to <strong>${escapeHtml(state.username)}</strong>’s account.</p>
        <div class="success-meta">
          Order <strong>#${order}</strong><br>
          Invoice <strong>#${order}-${random(1000,9999)}</strong><br>
          Sent to <strong>${email}</strong><br>
          Purchased by <strong>${escapeHtml(settings().username||'tiktok lachbtw')}</strong>
        </div>
        <button class="primary" id="doneBtn">Done</button>`;
      document.getElementById('doneBtn').onclick=closeOverlay;
      autoGift.onSuccess();
    }

    renderCards();
    window.addEventListener('lv-settings-updated', renderCards);
    window.addEventListener('storage', (event)=>{ if(event.key==='lv_global_settings') renderCards(); });
    window.addEventListener('pageshow', renderCards);
  