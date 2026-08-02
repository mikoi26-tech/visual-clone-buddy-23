
(function(){
  function updateIOSClock(){
    var d=new Date(), raw=d.getHours(), h=String(raw%12||12), m=String(d.getMinutes()).padStart(2,'0');
    var el=document.getElementById('iosClock'); if(el) el.textContent=h+':'+m;
  }
  updateIOSClock(); setInterval(updateIOSClock,15000);
  var island=document.getElementById('dynamicIsland');
  function toggleIsland(){
    if(!island)return;
    var expanded=island.dataset.state!=='expanded';
    island.dataset.state=expanded?'expanded':'idle';
    island.setAttribute('aria-expanded',String(expanded));
    island.setAttribute('aria-label',expanded?'Collapse Dynamic Island':'Expand Dynamic Island');
  }
  if(island){
    island.addEventListener('click',toggleIsland);
    island.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleIsland();}});
    document.addEventListener('pointerdown',function(e){if(island.dataset.state==='expanded'&&!island.contains(e.target)){island.dataset.state='idle';island.setAttribute('aria-expanded','false');island.setAttribute('aria-label','Expand Dynamic Island');}});
  }
  document.addEventListener('keydown',function(e){
    if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.classList&&e.target.classList.contains('game-card')){
      e.preventDefault(); e.target.classList.add('keyboard-press'); setTimeout(function(){e.target.classList.remove('keyboard-press')},160);
    }
  });
})();
