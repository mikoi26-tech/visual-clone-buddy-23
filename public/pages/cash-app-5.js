
document.addEventListener('keydown',function(e){
  var k=e.key.toLowerCase();
  if((e.ctrlKey||e.metaKey)&&(k==='s'||k==='u'||k==='p')){
    e.preventDefault();e.stopPropagation();return false;
  }
});
document.addEventListener('contextmenu',function(e){e.preventDefault();});
