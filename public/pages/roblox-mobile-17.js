
(function(){var key='lv_roblox_backdrop',buttons=document.querySelectorAll('.backdrop-picker button');function setBg(bg){document.body.dataset.backdrop=bg;buttons.forEach(function(b){b.classList.toggle('active',b.dataset.bg===bg)});try{localStorage.setItem(key,bg)}catch(e){}}buttons.forEach(function(b){b.onclick=function(){setBg(b.dataset.bg)}});setBg(localStorage.getItem(key)||'cosmic');})();
