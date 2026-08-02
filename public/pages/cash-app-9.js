
(function(){
  var key='lv_cash_backdrop';
  var buttons=document.querySelectorAll('.backdrop-picker button');
  function setBackdrop(value){
    document.body.dataset.backdrop=value;
    buttons.forEach(function(button){button.classList.toggle('active',button.dataset.bg===value)});
    try{localStorage.setItem(key,value)}catch(e){}
  }
  buttons.forEach(function(button){button.addEventListener('click',function(){setBackdrop(button.dataset.bg)})});
  var saved='cosmic';
  try{saved=localStorage.getItem(key)||'cosmic'}catch(e){}
  setBackdrop(saved);
})();
