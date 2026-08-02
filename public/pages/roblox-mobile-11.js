
(function(){
  'use strict';
  function installNotificationBadge(){
    var bell=document.querySelector('.topbar-right img[alt="Bell"]');
    if(!bell||bell.closest('.notification-wrap'))return;
    var wrap=document.createElement('span');
    wrap.className='notification-wrap';
    wrap.setAttribute('role','button');
    wrap.setAttribute('tabindex','0');
    wrap.setAttribute('aria-label','Notifications, 7 unread');
    bell.parentNode.insertBefore(wrap,bell);
    wrap.appendChild(bell);
    var badge=document.createElement('span');
    badge.className='notification-badge';
    badge.textContent='7';
    wrap.appendChild(badge);
  }
  function applyImageFallbacks(){
    document.addEventListener('error',function(event){
      var img=event.target;
      if(!(img instanceof HTMLImageElement)||img.dataset.fallbackApplied)return;
      if(img.matches('.api-user-avatar,.api-friend-row img,.added-friend-card .friend-circle img')){
        img.dataset.fallbackApplied='1';
        img.src='assets/avatar-placeholder.png';
      }
    },true);
  }
  function normalizeRatingLabels(){
    document.querySelectorAll('.game-rating').forEach(function(rating){
      Array.from(rating.childNodes).forEach(function(node){
        if(node.nodeType===Node.TEXT_NODE&&node.textContent.trim()){
          var span=document.createElement('span');
          span.className='rating-label';
          span.textContent=node.textContent.trim();
          node.replaceWith(span);
        }
      });
    });
  }
  function ensureSendSuccess(){
    var overlay=document.getElementById('robuxSendSuccess');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.id='robuxSendSuccess';
    overlay.className='robux-send-success';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-labelledby','robuxSendSuccessTitle');
    overlay.innerHTML='<div class="robux-send-success-card"><div class="robux-send-success-body"><div class="robux-send-success-icon" aria-hidden="true">✓</div><div id="robuxSendSuccessTitle" class="robux-send-success-title">Robux sent successfully</div><div id="robuxSendSuccessCopy" class="robux-send-success-copy"></div></div><button class="robux-send-success-ok" type="button">OK</button></div>';
    document.querySelector('.iphone-screen').appendChild(overlay);
    function close(){overlay.classList.remove('open');setTimeout(function(){overlay.style.display='none'},210)}
    overlay.querySelector('.robux-send-success-ok').addEventListener('click',close);
    overlay.addEventListener('click',function(e){if(e.target===overlay)close()});
    return overlay;
  }
  function installStableRobuxAmounts(){
    document.querySelectorAll('[data-robux-amount]').forEach(function(button){
      if(button.dataset.stableAmount==='true')return;
      button.dataset.stableAmount='true';
      button.removeAttribute('onclick');
      button.addEventListener('click',function(){
        var value=Number(button.dataset.robuxAmount)||0;
        var input=document.getElementById('srAmountInput');
        var display=document.getElementById('srAmountDisplay');
        var next=document.getElementById('srNextBtn');
        try{srAmount=value}catch(e){}
        try{window.srAmount=value}catch(e){}
        if(input)input.value=String(value);
        if(display)display.textContent=value.toLocaleString();
        document.querySelectorAll('[data-robux-amount]').forEach(function(option){option.style.background=option===button?'#dce5ff':'#fff'});
        if(next){next.disabled=value<=0;next.style.background=value>0?'#2563eb':'#9faee8'}
      });
    });
  }
  function installSendCompletion(){
    var button=document.getElementById('srConfirmSendButton');
    if(!button||button.dataset.stableSend==='true')return;
    button.dataset.stableSend='true';
    button.removeAttribute('onclick');
    button.addEventListener('click',function(){
      var username=(document.getElementById('srConfirmAt').textContent||document.getElementById('srConfirmName').textContent||'').trim().replace(/^@/,'');
      var amount=Number((document.getElementById('srConfirmAmt').textContent||'').replace(/[^0-9]/g,''))||0;
      var balanceNode=document.getElementById('robuxBalanceNum');
      var currentBalance=Number((balanceNode&&balanceNode.textContent||'').replace(/[^0-9]/g,''))||0;
      try{if(typeof _robuxBal==='number')currentBalance=_robuxBal}catch(e){}
      if(!username||amount<=0||amount>currentBalance)return;
      if(typeof window.closeKeyboard==='function')window.closeKeyboard(true);
      var search=document.getElementById('srSearch');if(search)search.blur();
      var nextBalance=currentBalance-amount;
      try{_robuxBal=nextBalance}catch(e){}
      try{localStorage.setItem('robuxBalance',String(nextBalance))}catch(e){}
      if(typeof updateBalanceDisplay==='function')updateBalanceDisplay();
      if(typeof srSyncBal==='function')srSyncBal();
      ['robuxBalanceNum','robuxBalanceTop','srBal1','srBal2','srBal3'].forEach(function(id){var node=document.getElementById(id);if(node)node.textContent=nextBalance.toLocaleString()});
      if(typeof closeSendRobux==='function')closeSendRobux();
      var overlay=ensureSendSuccess();
      document.getElementById('robuxSendSuccessCopy').textContent=Number(amount).toLocaleString()+' Robux sent successfully to @'+username+'.';
      setTimeout(function(){if(typeof window.closeKeyboard==='function')window.closeKeyboard(true);overlay.style.display='flex';requestAnimationFrame(function(){overlay.classList.add('open')})},310);
    });
  }
  document.addEventListener('DOMContentLoaded',function(){
    installNotificationBadge();
    applyImageFallbacks();
    normalizeRatingLabels();
    installStableRobuxAmounts();
    installSendCompletion();
    ['gjBanner','srRecipImg','srConfirmImg'].forEach(function(id){
      var img=document.getElementById(id);
      if(img&&!img.getAttribute('src'))img.src='assets/avatar-placeholder.png';
    });
  });
})();
