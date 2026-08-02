
(()=>{
  const ready=()=>document.body.classList.add('page-ready');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(ready),{once:true});else requestAnimationFrame(ready);

  const nav=document.querySelector('.local-nav');
  const syncNav=()=>nav&&nav.classList.toggle('is-scrolled',window.scrollY>18);
  syncNav();window.addEventListener('scroll',syncNav,{passive:true});

  const groups=[
    '.green-section .section-head > *','.bonus-card','.edition-card','.compare-row',
    '.feature','.about-grid > *','.rec-card','.footer .wrap > *'
  ];
  const targets=[];
  groups.forEach(selector=>document.querySelectorAll(selector).forEach((node,index)=>{
    node.classList.add('reveal-target',`reveal-delay-${(index%4)}`);targets.push(node);
  }));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
    }),{rootMargin:'0px 0px -8% 0px',threshold:.08});
    targets.forEach(node=>observer.observe(node));
  }else targets.forEach(node=>node.classList.add('is-visible'));

  const stage=document.getElementById('galleryStage');
  if(stage&&'MutationObserver' in window){
    new MutationObserver(()=>{
      stage.classList.remove('gallery-swap');void stage.offsetWidth;stage.classList.add('gallery-swap');
    }).observe(stage,{childList:true});
  }
})();
