
(function(){
  function isVisible(el){return !!el && getComputedStyle(el).display !== 'none';}
  function syncTransactionChrome(){
    var screen=document.querySelector('.iphone-screen');
    var shell=document.querySelector('.iphone-shell');
    if(!screen)return;
    var ids=['robuxModal','appStoreModal','sendRobuxModal','successPopup'];
    var open=ids.some(function(id){return isVisible(document.getElementById(id));});
    screen.classList.toggle('transaction-open',open);
    if(shell)shell.classList.toggle('transaction-open',open);
  }
  document.addEventListener('DOMContentLoaded',function(){
    var ids=['robuxModal','appStoreModal','sendRobuxModal','successPopup'];
    ids.forEach(function(id){
      var el=document.getElementById(id);
      if(el)new MutationObserver(syncTransactionChrome).observe(el,{attributes:true,attributeFilter:['style','class']});
    });
    syncTransactionChrome();
    if(typeof applyProfileChange==='function'){
      var savedName=localStorage.getItem('rbxProfileName');
      if(!savedName||String(savedName).toLowerCase()==='wsplachy'){
        applyProfileChange('wsplachy','assets/wsplachy-avatar.png');
      }
    }
  });
})();
