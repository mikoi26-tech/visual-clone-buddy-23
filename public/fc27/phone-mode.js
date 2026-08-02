(()=>{
  'use strict';
  const STORAGE_KEY='fc27_phone_mode';
  let enabled=false,stage=null,content=null,screen=null,scrollTop=0,clockTimer=0;
  const safeGet=()=>{try{return localStorage.getItem(STORAGE_KEY)==='1'}catch{return false}};
  const safeSet=value=>{try{localStorage.setItem(STORAGE_KEY,value?'1':'0')}catch{}};
  const pad=value=>String(value).padStart(2,'0');

  function updateClock(){
    const clock=document.getElementById('fcPhoneClock');
    if(!clock)return;
    const now=new Date();clock.textContent=`${now.getHours()}:${pad(now.getMinutes())}`;
  }

  function createStage(){
    stage=document.createElement('div');stage.className='fc-phone-stage';stage.setAttribute('aria-label','FC 27 phone view');
    stage.innerHTML=`<div class="fc-phone-shell"><div class="fc-phone-screen">
      <div class="fc-phone-status" aria-hidden="true"><span class="fc-phone-time" id="fcPhoneClock">9:41</span>
        <button class="fc-phone-island" type="button" tabindex="-1"><span class="fc-phone-island-copy"><i></i>FC 27 Mobile</span></button>
        <span class="fc-phone-status-icons"><img src="../roblox-mobile/assets/status-signal.png" alt=""><img src="../roblox-mobile/assets/status-wifi.png" alt=""><img src="../roblox-mobile/assets/status-battery.png" alt=""></span>
      </div><div class="fc-phone-content"></div><span class="fc-phone-home" aria-hidden="true"></span></div></div>`;
    screen=stage.querySelector('.fc-phone-screen');content=stage.querySelector('.fc-phone-content');
    content.innerHTML=`<main class="fc-mobile-app"><header class="fc-mobile-nav"><img src="assets/images/fc27-header-logo.png" alt="EA SPORTS FC 27"><button type="button" class="fc-mobile-buy">Order</button></header><section class="fc-mobile-hero"><span class="fc-mobile-kicker">EA SPORTS FC 27</span><h1>The world’s game,<br>built for mobile.</h1><p>Choose your platform and edition in a clean checkout designed for this screen.</p><img class="fc-mobile-cover" src="assets/checkout/fc27-standard-mbappe-city-cover-v6.jpg" alt="FC 27 Standard Edition"><button type="button" class="fc-mobile-primary">Choose edition</button></section><section class="fc-mobile-highlights"><article><strong>25 SEP</strong><span>Worldwide release</span></article><article><strong>3 EDITIONS</strong><span>PC, PlayStation, Xbox</span></article></section><section class="fc-mobile-slide"><span>FEATURED</span><h2>More responsive. More authentic.</h2><p>Improved movement, defending, and match presentation in one focused experience.</p></section></main>`;
    content.querySelectorAll('.fc-mobile-buy,.fc-mobile-primary').forEach(button=>button.addEventListener('click',()=>document.querySelector('body > .local-nav .preorder-top,.preorder-top')?.click()));
    stage.querySelector('.fc-phone-island').addEventListener('click',event=>event.currentTarget.classList.toggle('open'));
    content.addEventListener('scroll',()=>content.querySelector('.local-nav')?.classList.toggle('is-scrolled',content.scrollTop>18),{passive:true});
  }

  function activate(){
    if(enabled)return;enabled=true;scrollTop=window.scrollY||0;createStage();
    const checkout=document.getElementById('buyModal');
    if(checkout)screen.appendChild(checkout);
    document.body.appendChild(stage);document.body.classList.add('fc-phone-mode');
    content.scrollTop=scrollTop;updateClock();clockTimer=window.setInterval(updateClock,15000);
  }

  function deactivate(){
    if(!enabled)return;enabled=false;scrollTop=content?.scrollTop||0;window.clearInterval(clockTimer);
    const checkout=screen?.querySelector(':scope > #buyModal');
    if(checkout)document.body.insertBefore(checkout,stage);
    stage?.remove();stage=null;content=null;screen=null;document.body.classList.remove('fc-phone-mode');
    window.scrollTo({top:scrollTop,behavior:'instant'});
  }

  function setMode(next,persist=true){
    next?activate():deactivate();
    const toggle=document.getElementById('fcPhoneToggle');
    if(toggle){toggle.setAttribute('aria-pressed',String(next));toggle.setAttribute('aria-label',next?'Exit FC 27 phone view':'Open FC 27 phone view');toggle.title=next?'Exit phone view':'Phone view'}
    if(persist)safeSet(next);
    window.dispatchEvent(new CustomEvent('fc27-phone-mode',{detail:{enabled:next}}));
  }

  function mount(){
    if(document.getElementById('fcPhoneToggle'))return;
    const button=document.createElement('button');button.id='fcPhoneToggle';button.type='button';button.setAttribute('aria-pressed','false');
    button.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="6.5" y="2.5" width="11" height="19" rx="2.4"></rect><path d="M10 5h4M10.5 18.5h3"></path></svg><span class="fc-phone-toggle-dot" aria-hidden="true"></span>';
    button.addEventListener('click',()=>setMode(!enabled));document.body.appendChild(button);
    setMode(safeGet(),false);
    window.FC27PhoneMode={enable:()=>setMode(true),disable:()=>setMode(false),toggle:()=>setMode(!enabled),isEnabled:()=>enabled};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(mount,0),{once:true});else setTimeout(mount,0);
})();
