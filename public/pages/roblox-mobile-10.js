
(function(){
  'use strict';
  var appRoot=document.querySelector('.app-root');
  var screen=document.querySelector('.iphone-screen');
  var nav=document.querySelector('.bottom-nav');
  var notice=document.querySelector('.concept-notice');
  var addFriendSheet=document.getElementById('addFriendSheet');
  if(screen&&appRoot&&nav&&nav.parentNode===appRoot) screen.appendChild(nav);
  if(screen&&addFriendSheet&&addFriendSheet.parentNode!==screen) screen.appendChild(addFriendSheet);
  if(notice&&notice.parentNode!==document.body) document.body.appendChild(notice);
  if(appRoot){
    try{history.scrollRestoration='manual'}catch(_){ }
    requestAnimationFrame(function(){appRoot.scrollTop=0});
  }

  function apiBase(){
    if(window.ROBLOX_API_BASE) return String(window.ROBLOX_API_BASE).replace(/\/$/,'');
    return location.protocol==='file:'?'http://localhost:3000':'';
  }
  function apiUrl(route,username){return apiBase()+route+'?q='+encodeURIComponent(username);}
  async function lookupUser(username){
    var response=await fetch(apiUrl('/api/search',username),{headers:{Accept:'application/json'}});
    var data=null;
    try{data=await response.json()}catch(_){ }
    if(!response.ok||!data||data.error){
      var err=new Error(data&&data.message?data.message:(response.status===404?'That Roblox user could not be found.':'Unable to reach Roblox right now.'));
      err.status=response.status; throw err;
    }
    if(data && data.id){
      data.avatar = data.avatar || ('/api/avatar?id=' + encodeURIComponent(data.id));
    }
    return data;
  }
  function avatarUrlForId(id, current){
    var numeric=Number(id);
    if(Number.isFinite(numeric)&&numeric>0)return '/api/avatar?id='+encodeURIComponent(String(numeric));
    return current||'assets/avatar-placeholder.png';
  }
  function applyAvatar(img, src, id){
    if(!img)return;
    var fallback='assets/avatar-placeholder.png';
    var preferred=avatarUrlForId(id,src);
    img.dataset.avatarUserId=id||'';
    img.style.opacity='0';
    img.onload=function(){img.style.opacity='1'};
    img.onerror=function(){
      img.onerror=null;
      img.onload=function(){img.style.opacity='1'};
      img.src=fallback;
    };
    img.src=preferred||fallback;
  }

  // Replace only the network/search layer; the original selection and send functions remain in use.
  var searchTimer=0,searchSequence=0;
  window.srFilterSearch=function(){
    var input=document.getElementById('srSearch'),dropdown=document.getElementById('srDropdown');
    if(!input||!dropdown)return;
    clearTimeout(searchTimer);
    var query=input.value.trim();
    if(query.length<2){dropdown.style.display='none';dropdown.innerHTML='';return;}
    var seq=++searchSequence;
    dropdown.innerHTML='<div class="api-state-row"><span class="api-spinner"></span>Searching Roblox…</div>';
    dropdown.style.display='block';
    searchTimer=setTimeout(async function(){
      try{
        var user=await lookupUser(query);
        if(seq!==searchSequence)return;
        dropdown.innerHTML='';
        var row=document.createElement('button'); row.type='button'; row.className='api-user-row';
        var avatar=document.createElement('img'); avatar.className='api-user-avatar'; avatar.alt=''; applyAvatar(avatar,user.avatar,user.id);
        var copy=document.createElement('span'); copy.className='api-user-copy';
        var display=document.createElement('span'); display.className='api-display-name'; display.textContent=user.displayName||user.name;
        var handle=document.createElement('span'); handle.className='api-username'; handle.textContent='@'+user.name;
        copy.append(display,handle); row.append(avatar,copy);
        var picked=false;
        function pickResult(event){
          if(event){event.preventDefault();event.stopPropagation();}
          if(picked)return;
          picked=true;
          ++searchSequence;
          if(typeof window.srSelectFriend==='function') window.srSelectFriend(user.displayName||user.name,user.name,user.avatar,user.id);
          if(input)input.blur();
          requestAnimationFrame(function(){closeKeyboard(true)});
        }
        row.addEventListener('pointerdown',pickResult);
        row.addEventListener('click',pickResult);
        dropdown.appendChild(row);
      }catch(error){
        if(seq!==searchSequence)return;
        var message=error&&error.message?error.message:'Unable to reach Roblox right now.';
        if(location.protocol==='file:'&&(!error.status||error.status===0)) message='Start the included local server, then search again.';
        dropdown.innerHTML='';
        var state=document.createElement('div'); state.className='api-state-row'; state.textContent=message; dropdown.appendChild(state);
      }
    },280);
  };

  window.srSearchUser=async function(username){
    try{
      var user=await lookupUser(username);
      return {results:[{id:user.id,name:user.name,username:user.name,displayName:user.displayName||user.name,avatar:user.avatar,created:user.created}]};
    }catch(error){return {error:true,results:[],message:error.message};}
  };

  window.cpConfirm=async function(){
    var input=document.getElementById('cpInput'),errorEl=document.getElementById('cpError'),button=document.getElementById('cpConfirmBtn');
    if(!input||!button)return;
    var username=input.value.trim();
    errorEl.style.display='none';
    if(!username){errorEl.textContent='Enter a Roblox username.';errorEl.style.display='block';return;}
    var old=button.textContent; button.disabled=true; button.textContent='Searching…';
    try{
      var user=await lookupUser(username);
      if(typeof window.applyProfileChange==='function') window.applyProfileChange(user.name,user.avatar);
      closeKeyboard(true);
      if(typeof window.closeChangeProfile==='function') window.closeChangeProfile();
    }catch(error){
      errorEl.textContent=location.protocol==='file:'&&(!error.status||error.status===0)?'Start the included local server, then try again.':(error.message||'That user could not be found.');
      errorEl.style.display='block';
    }finally{button.disabled=false;button.textContent=old;}
  };

  // Create an iOS-like keyboard for the original username fields.
  var activeInput=null,shift=false,keyClickIndex=0;
  var keyClickPool=Array.from({length:10},function(){
    var audio=new Audio('/cash-keyboard-click.mp3');
    audio.preload='auto';
    audio.volume=.46;
    return audio;
  });
  function playKeySound(kind){
    try{
      var audio=keyClickPool[keyClickIndex++%keyClickPool.length];
      audio.pause();
      audio.currentTime=0;
      audio.playbackRate=kind==='delete'?.94:kind==='space'?.98:1;
      audio.volume=kind==='delete'?.42:.46;
      var playback=audio.play();
      if(playback&&typeof playback.catch==='function')playback.catch(function(){});
    }catch(_){ }
  }
  function makeKey(label,value,classes){
    var button=document.createElement('button'); button.type='button'; button.className='keyboard-key '+(classes||''); button.textContent=label; button.dataset.key=value;
    button.addEventListener('pointerdown',function(e){e.preventDefault();pressVirtualKey(value,button)});
    return button;
  }
  var keyboard=document.createElement('div');keyboard.id='iosSimKeyboard';keyboard.className='ios-sim-keyboard';keyboard.setAttribute('aria-label','On-screen keyboard');
  var topLine=document.createElement('div');topLine.className='keyboard-topline';
  var dismiss=document.createElement('button');dismiss.type='button';dismiss.className='keyboard-dismiss';dismiss.textContent='⌄';dismiss.setAttribute('aria-label','Hide keyboard');dismiss.onclick=closeKeyboard;topLine.appendChild(dismiss);keyboard.appendChild(topLine);
  [['QWERTYUIOP',''],['ASDFGHJKL','row-two']].forEach(function(row){var wrap=document.createElement('div');wrap.className='keyboard-row '+row[1];row[0].split('').forEach(function(k){wrap.appendChild(makeKey(k,k.toLowerCase()))});keyboard.appendChild(wrap)});
  var third=document.createElement('div');third.className='keyboard-row';
  var shiftKey=makeKey('⇧','shift','wide');shiftKey.setAttribute('aria-label','Shift');third.appendChild(shiftKey);
  'ZXCVBNM'.split('').forEach(function(k){third.appendChild(makeKey(k,k.toLowerCase()))});
  var deleteKey=makeKey('⌫','delete','wide');deleteKey.setAttribute('aria-label','Delete');third.appendChild(deleteKey);keyboard.appendChild(third);
  var bottom=document.createElement('div');bottom.className='keyboard-bottom';
  bottom.append(makeKey('123','numbers','wide keyboard-globe'),makeKey('space',' ','space'),makeKey('return','return','return'));keyboard.appendChild(bottom);
  if(screen)screen.appendChild(keyboard);

  var keyboardMode='letters';
  var letterRows=Array.from(keyboard.querySelectorAll('.keyboard-row'));
  var modeKey=keyboard.querySelector('[data-key="numbers"]');
  var symbolLayer=document.createElement('div');
  symbolLayer.className='keyboard-symbol-layer';
  [['1234567890',''],['_','row-two']].forEach(function(row){
    var wrap=document.createElement('div');wrap.className='keyboard-row '+row[1];
    row[0].split('').forEach(function(k){wrap.appendChild(makeKey(k,k))});
    symbolLayer.appendChild(wrap);
  });
  keyboard.insertBefore(symbolLayer,bottom);
  function toggleKeyboardMode(){
    keyboardMode=keyboardMode==='letters'?'symbols':'letters';
    var symbols=keyboardMode==='symbols';
    letterRows.forEach(function(row){row.style.display=symbols?'none':''});
    symbolLayer.classList.toggle('visible',symbols);
    if(modeKey)modeKey.textContent=symbols?'ABC':'123';
  }

  function eligible(input){return input&&(input.id==='srSearch'||input.id==='cpInput'||input.id==='addFriendInput'||input.id==='friendNicknameInput');}
  var keyboardGuardUntil=0;
  var keyboardClosing=false;
  var keyboardFocusTimers=[];
  function prepareKeyboardInput(input){
    if(!eligible(input))return;
    input.setAttribute('inputmode','none');
    input.setAttribute('autocomplete','off');
    input.setAttribute('autocorrect','off');
    input.setAttribute('autocapitalize','none');
    input.setAttribute('spellcheck','false');
  }
  function inputSheetIsOpen(input){
    if(!input||!input.isConnected)return false;
    var owner=input.closest&&input.closest('#sendRobuxModal,#cpSheet,#addFriendSheet,#friendActionSheet');
    if(!owner)return true;
    var style=getComputedStyle(owner);
    return style.display!=='none'&&style.visibility!=='hidden'&&owner.getAttribute('aria-hidden')!=='true';
  }
  function focusKeyboardInput(input){
    if(!eligible(input)||activeInput!==input||keyboardClosing||!keyboard.classList.contains('visible')||!inputSheetIsOpen(input))return;
    try{input.focus({preventScroll:true})}catch(_){input.focus()}
    try{var pos=input.value.length;input.setSelectionRange(pos,pos)}catch(_){ }
  }
  function clearKeyboardFocusTimers(){keyboardFocusTimers.forEach(clearTimeout);keyboardFocusTimers=[];}
  function openKeyboard(input){
    if(!eligible(input))return;
    prepareKeyboardInput(input);
    keyboardClosing=false;
    activeInput=input;
    keyboardGuardUntil=performance.now()+520;
    clearKeyboardFocusTimers();
    /* Focus before changing layout. This prevents the Send Robux field from
       losing focus while its sheet resizes for the iOS-style keyboard. */
    try{input.focus({preventScroll:true})}catch(_){input.focus()}
    if(screen)screen.classList.add('keyboard-open');
    keyboard.style.display='block';
    keyboard.classList.add('visible');
    [0,32,110].forEach(function(delay){keyboardFocusTimers.push(setTimeout(function(){focusKeyboardInput(input)},delay))});
    var panel=input.closest&&input.closest('#sendRobuxPanel,#cpPanel,#addFriendPanel,#friendActionPanel');
    if(panel&&typeof input.scrollIntoView==='function')keyboardFocusTimers.push(setTimeout(function(){
      if(activeInput===input&&keyboard.classList.contains('visible'))input.scrollIntoView({block:'nearest',behavior:'smooth'});
    },72));
  }
  function closeKeyboard(force){
    if(!force&&performance.now()<keyboardGuardUntil)return;
    keyboardClosing=true;
    clearKeyboardFocusTimers();
    var previousInput=activeInput;
    activeInput=null;
    keyboard.classList.remove('visible');
    setTimeout(function(){if(!keyboard.classList.contains('visible'))keyboard.style.display='none'},300);
    if(screen)screen.classList.remove('keyboard-open');
    if(previousInput&&document.activeElement===previousInput){try{previousInput.blur()}catch(_){ }}
    shift=false;shiftKey.classList.remove('shift-on');keyboardMode='letters';letterRows.forEach(function(row){row.style.display=''});symbolLayer.classList.remove('visible');if(modeKey)modeKey.textContent='123';
    setTimeout(function(){keyboardClosing=false},140);
  }
  window.closeKeyboard=function(){closeKeyboard(true)};
  var originalCloseSendRobuxForKeyboard=window.closeSendRobux;
  if(typeof originalCloseSendRobuxForKeyboard==='function'){
    window.closeSendRobux=function(){
      closeKeyboard(true);
      var search=document.getElementById('srSearch');if(search)search.blur();
      return originalCloseSendRobuxForKeyboard.apply(this,arguments);
    };
  }
  var originalCloseChangeProfileForKeyboard=window.closeChangeProfile;
  if(typeof originalCloseChangeProfileForKeyboard==='function'){
    window.closeChangeProfile=function(){
      closeKeyboard(true);
      var profileInput=document.getElementById('cpInput');if(profileInput)profileInput.blur();
      return originalCloseChangeProfileForKeyboard.apply(this,arguments);
    };
  }
  function dispatchInput(){if(!activeInput)return;activeInput.dispatchEvent(new Event('input',{bubbles:true}));}
  function insertText(text){
    if(!activeInput)return;var start=activeInput.selectionStart==null?activeInput.value.length:activeInput.selectionStart,end=activeInput.selectionEnd==null?start:activeInput.selectionEnd;
    activeInput.value=activeInput.value.slice(0,start)+text+activeInput.value.slice(end);var pos=start+text.length;try{activeInput.setSelectionRange(pos,pos)}catch(_){ }dispatchInput();
  }
  function deleteText(){
    if(!activeInput)return;var start=activeInput.selectionStart==null?activeInput.value.length:activeInput.selectionStart,end=activeInput.selectionEnd==null?start:activeInput.selectionEnd;
    if(start!==end)activeInput.value=activeInput.value.slice(0,start)+activeInput.value.slice(end);else if(start>0){activeInput.value=activeInput.value.slice(0,start-1)+activeInput.value.slice(end);start--}
    try{activeInput.setSelectionRange(start,start)}catch(_){ }dispatchInput();
  }
  function pressVirtualKey(value,button){
    playKeySound(value==='delete'?'delete':value===' '?'space':'tap');button.classList.add('active');setTimeout(function(){button.classList.remove('active')},70);
    if(value==='shift'){shift=!shift;shiftKey.classList.toggle('shift-on',shift);return}
    if(value==='delete'){deleteText();return}
    if(value==='numbers'){toggleKeyboardMode();return;}
    if(value==='return'){
      if(activeInput&&activeInput.id==='cpInput')window.cpConfirm();
      else if(activeInput&&activeInput.id==='addFriendInput'&&typeof window.addFriendSubmit==='function')window.addFriendSubmit();
      else {var first=document.querySelector('#srDropdown .api-user-row');if(first)first.click();else closeKeyboard(true)}
      return;
    }
    var text=value;if(shift&&/[a-z]/.test(text)){text=text.toUpperCase();shift=false;shiftKey.classList.remove('shift-on')}insertText(text);
  }
  document.querySelectorAll('#srSearch,#cpInput,#addFriendInput').forEach(prepareKeyboardInput);
  document.addEventListener('focusin',function(e){
    if(!eligible(e.target)||keyboardClosing)return;
    prepareKeyboardInput(e.target);
    activeInput=e.target;
    /* Wait until the tap has completed before resizing the sheet. Resizing on
       pointer-down made the eventual click land on the modal backdrop. */
    setTimeout(function(){
      if(document.activeElement===e.target&&!keyboard.classList.contains('visible'))openKeyboard(e.target);
    },90);
  });
  document.addEventListener('focusout',function(e){
    var input=e.target;
    if(!eligible(input))return;
    setTimeout(function(){
      if(!keyboardClosing&&activeInput===input&&keyboard.classList.contains('visible')&&inputSheetIsOpen(input))focusKeyboardInput(input);
    },0);
  });
  document.addEventListener('pointerdown',function(e){
    if(keyboard.contains(e.target))return;
    var target=e.target&&e.target.closest?e.target.closest('#srSearch,#cpInput,#addFriendInput,#friendNicknameInput'):null;
    if(eligible(target)){
      prepareKeyboardInput(target);
      activeInput=target;
      return;
    }
    var inSheet=e.target.closest&&e.target.closest('#sendRobuxPanel,#cpPanel,#addFriendPanel,#friendActionPanel');
    if(!inSheet)closeKeyboard(false);
  },true);
  document.addEventListener('click',function(e){
    var target=e.target&&e.target.closest?e.target.closest('#srSearch,#cpInput,#addFriendInput,#friendNicknameInput'):null;
    if(eligible(target))openKeyboard(target);
  },true);
  document.addEventListener('keydown',function(e){
    if(!eligible(document.activeElement))return;activeInput=document.activeElement;
    if(e.key.length===1||['Backspace','Enter',' '].includes(e.key))playKeySound(e.key==='Backspace'?'delete':e.key===' '?'space':'tap');
    var keyValue=e.key==='Backspace'?'delete':e.key==='Enter'?'return':e.key.toLowerCase();
    var visual=keyboard.querySelector('[data-key="'+CSS.escape(keyValue)+'"]');if(visual){visual.classList.add('active');setTimeout(function(){visual.classList.remove('active')},70)}
    if(e.key==='Escape'){e.preventDefault();closeKeyboard(true)}
  });


  // Ensure every player selection, including old friend-list selections, dismisses the keyboard.
  var originalSelectFriendForKeyboard=window.srSelectFriend;
  if(typeof originalSelectFriendForKeyboard==='function'){
    window.srSelectFriend=function(){
      var result=originalSelectFriendForKeyboard.apply(this,arguments);
      var search=document.getElementById('srSearch');
      if(search)search.blur();
      requestAnimationFrame(function(){closeKeyboard(true)});
      return result;
    };
  }

  // User-managed friend list. It begins empty and contains only accounts resolved by Roblox's API.
  var ADDED_FRIENDS_KEY='rbxAddedFriendsV1';
  var BLOCKED_USERS_KEY='rbxBlockedUsersV1';
  function loadAddedFriends(){
    try{
      var parsed=JSON.parse(localStorage.getItem(ADDED_FRIENDS_KEY)||'[]');
      if(!Array.isArray(parsed))return [];
      return parsed.filter(function(f){return f&&f.user;}).map(function(f){
        return {
          id:f.id,
          name:f.name||f.user,
          nickname:typeof f.nickname==='string'?f.nickname:'',
          user:f.user,
          avatar:avatarUrlForId(f.id,f.avatar)
        };
      });
    }catch(_){return [];}
  }
  function loadBlockedUsers(){
    try{var parsed=JSON.parse(localStorage.getItem(BLOCKED_USERS_KEY)||'[]');return Array.isArray(parsed)?parsed:[];}catch(_){return [];}
  }
  function saveBlockedUsers(items){try{localStorage.setItem(BLOCKED_USERS_KEY,JSON.stringify(items))}catch(_){ }}
  function saveAddedFriends(friends){
    try{localStorage.setItem(ADDED_FRIENDS_KEY,JSON.stringify(friends));}catch(_){ }
  }
  function syncOriginalFriendSource(friends){
    window.SR_FRIENDS=friends.map(function(f){return {id:Number(f.id)||Date.now(),name:f.nickname||f.name||f.user,user:f.user,avatar:avatarUrlForId(f.id,f.avatar)};});
  }
  function updateFriendCount(count){
    var countEl=document.getElementById('srFriendCount');
    if(countEl)countEl.textContent='('+count+')';
  }
  function createHomeFriend(friend){
    var card=document.createElement('div');card.className='friend added-friend-card';card.dataset.friendId=String(friend.id);card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Options for '+friend.user);
    var circle=document.createElement('div');circle.className='friend-circle';
    var img=document.createElement('img');img.alt=friend.user;applyAvatar(img,friend.avatar,friend.id);circle.appendChild(img);
    var name=document.createElement('div');name.className='friend-name';name.textContent=friend.nickname||friend.name||friend.user;
    var handle=document.createElement('div');handle.className='friend-game';handle.textContent='@'+friend.user;
    card.addEventListener('click',function(){openFriendActions(friend.id)});
    card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openFriendActions(friend.id)}});
    card.append(circle,name,handle);return card;
  }
  function renderHomeFriends(){
    var list=document.getElementById('homeFriendsList');if(!list)return;
    Array.from(list.querySelectorAll('.added-friend-card')).forEach(function(el){el.remove()});
    loadAddedFriends().forEach(function(friend){list.appendChild(createHomeFriend(friend))});
  }
  window.srRenderFriends=function(){
    var friends=loadAddedFriends();syncOriginalFriendSource(friends);updateFriendCount(friends.length);
    var list=document.getElementById('srFriendList');if(!list)return;
    list.innerHTML='';
    if(!friends.length){
      var empty=document.createElement('div');empty.className='sr-empty-friends';empty.textContent='No friends added yet. Add a Roblox username from Home, or search above.';list.appendChild(empty);return;
    }
    friends.forEach(function(friend){
      var row=document.createElement('button');row.type='button';row.className='api-friend-row';
      var avatar=document.createElement('img');avatar.alt='';applyAvatar(avatar,friend.avatar,friend.id);
      var text=document.createElement('span');text.className='api-friend-text';
      var display=document.createElement('span');display.className='api-friend-display';display.textContent=friend.nickname||friend.name||friend.user;
      var handle=document.createElement('span');handle.className='api-friend-handle';handle.textContent='@'+friend.user;
      text.append(display,handle);row.append(avatar,text);
      row.addEventListener('click',function(){window.srSelectFriend(friend.nickname||friend.name||friend.user,friend.user,avatarUrlForId(friend.id,friend.avatar),friend.id)});
      list.appendChild(row);
    });
  };
  window.openAddFriend=function(){
    var sheet=document.getElementById('addFriendSheet'),input=document.getElementById('addFriendInput'),error=document.getElementById('addFriendError');
    if(!sheet||!input)return;
    if(error)error.textContent='';input.value='';sheet.style.display='flex';sheet.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){sheet.classList.add('open');openKeyboard(input)});
  };
  window.closeAddFriend=function(){
    var sheet=document.getElementById('addFriendSheet'),input=document.getElementById('addFriendInput');
    closeKeyboard(true);if(input)input.blur();if(!sheet)return;sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');
    setTimeout(function(){if(!sheet.classList.contains('open'))sheet.style.display='none'},280);
  };
  window.addFriendSubmit=async function(){
    var input=document.getElementById('addFriendInput'),error=document.getElementById('addFriendError'),button=document.getElementById('addFriendSubmitBtn');
    if(!input||!button)return;var username=input.value.trim();if(error)error.textContent='';
    if(!username){if(error)error.textContent='Enter a Roblox username.';return;}
    var previous=button.textContent;button.disabled=true;button.textContent='Searching…';
    try{
      var user=await lookupUser(username),friends=loadAddedFriends();
      var duplicate=friends.some(function(f){return String(f.id)===String(user.id)||f.user.toLowerCase()===user.name.toLowerCase()});
      if(duplicate){if(error)error.textContent='That player is already in your friends row.';return;}
      var blocked=loadBlockedUsers().some(function(item){return String(item.id)===String(user.id)});
      if(blocked){if(error)error.textContent='This player is blocked in this interface.';return;}
      friends.push({id:user.id,name:user.displayName||user.name,nickname:'',user:user.name,avatar:avatarUrlForId(user.id,user.avatar)});saveAddedFriends(friends);syncOriginalFriendSource(friends);renderHomeFriends();window.srRenderFriends();
      input.blur();closeKeyboard(true);window.closeAddFriend();
    }catch(err){
      var message=err&&err.message?err.message:'Unable to reach Roblox right now.';
      if(location.protocol==='file:'&&(!err.status||err.status===0))message='Start the included local server, then try again.';
      if(error)error.textContent=message;
    }finally{button.disabled=false;button.textContent=previous;}
  };
  window.removeAddedFriend=function(id){
    var friends=loadAddedFriends().filter(function(friend){return String(friend.id)!==String(id)});saveAddedFriends(friends);syncOriginalFriendSource(friends);renderHomeFriends();window.srRenderFriends();
  };

  var actionFriendId=null;
  function getActionFriend(){return loadAddedFriends().find(function(friend){return String(friend.id)===String(actionFriendId)})||null;}
  function ensureFriendActionSheet(){
    var sheet=document.getElementById('friendActionSheet');if(sheet)return sheet;
    sheet=document.createElement('div');sheet.id='friendActionSheet';sheet.className='friend-action-sheet';sheet.setAttribute('aria-hidden','true');
    sheet.innerHTML='<div class="friend-action-backdrop"></div><div id="friendActionPanel" class="friend-action-panel" role="dialog" aria-modal="true" aria-labelledby="friendActionName"><div class="friend-action-handle"></div><div class="friend-action-person"><img id="friendActionAvatar" src="/roblox-mobile/assets/avatar-placeholder.png" alt=""><div><div id="friendActionName" class="friend-action-name"></div><div id="friendActionHandle" class="friend-action-handle-text"></div></div></div><div id="friendActionOptions" class="friend-action-options"><button type="button" data-action="profile"><span>View Profile</span><span class="friend-chevron">›</span></button><button type="button" data-action="nickname"><span>Change Nickname</span><span class="friend-chevron">›</span></button><button type="button" class="friend-action-danger" data-action="remove">Remove Friend</button><button type="button" class="friend-action-danger" data-action="block">Block User</button><button type="button" class="friend-action-cancel" data-action="cancel">Cancel</button></div><div id="friendNicknameView" class="friend-nickname-view"><div class="friend-nickname-title">Change Nickname</div><div class="friend-nickname-copy">This nickname is only saved in this interface.</div><input id="friendNicknameInput" maxlength="20" placeholder="Nickname" inputmode="none"><div class="friend-nickname-buttons"><button type="button" data-action="nickname-cancel">Cancel</button><button type="button" class="primary" data-action="nickname-save">Save</button></div></div><div id="friendConfirmView" class="friend-confirm-view"><div id="friendConfirmTitle" class="friend-confirm-title"></div><div id="friendConfirmCopy" class="friend-confirm-copy"></div><div class="friend-confirm-buttons"><button type="button" data-action="confirm-cancel">Cancel</button><button id="friendConfirmButton" type="button" class="danger"></button></div></div></div>';
    screen.appendChild(sheet);
    sheet.querySelector('.friend-action-backdrop').addEventListener('click',closeFriendActions);
    sheet.addEventListener('click',function(e){var button=e.target.closest('[data-action]');if(!button)return;handleFriendAction(button.dataset.action)});
    return sheet;
  }
  function setFriendActionView(view){
    var sheet=ensureFriendActionSheet();
    sheet.querySelector('#friendActionOptions').classList.toggle('hidden',view!=='options');
    sheet.querySelector('#friendNicknameView').classList.toggle('visible',view==='nickname');
    sheet.querySelector('#friendConfirmView').classList.toggle('visible',view==='confirm');
  }
  function openFriendActions(id){
    closeKeyboard(true);
    var friend=loadAddedFriends().find(function(item){return String(item.id)===String(id)});if(!friend)return;
    actionFriendId=friend.id;var sheet=ensureFriendActionSheet();
    applyAvatar(sheet.querySelector('#friendActionAvatar'),friend.avatar,friend.id);
    sheet.querySelector('#friendActionName').textContent=friend.nickname||friend.name||friend.user;
    sheet.querySelector('#friendActionHandle').textContent='@'+friend.user;
    setFriendActionView('options');sheet.style.display='flex';sheet.setAttribute('aria-hidden','false');
    requestAnimationFrame(function(){sheet.classList.add('open')});
  }
  window.openFriendActions=openFriendActions;
  function closeFriendActions(){
    var sheet=document.getElementById('friendActionSheet');if(!sheet)return;closeKeyboard(true);sheet.classList.remove('open');sheet.setAttribute('aria-hidden','true');
    setTimeout(function(){if(!sheet.classList.contains('open'))sheet.style.display='none'},260);
  }
  function showFriendConfirmation(kind){
    var friend=getActionFriend();if(!friend)return;var sheet=ensureFriendActionSheet();
    var title=sheet.querySelector('#friendConfirmTitle'),copy=sheet.querySelector('#friendConfirmCopy'),button=sheet.querySelector('#friendConfirmButton');
    button.dataset.confirmKind=kind;
    if(kind==='block'){title.textContent='Block @'+friend.user+'?';copy.textContent='They will be removed from your friends row and added to the local blocked list.';button.textContent='Block';}
    else{title.textContent='Remove @'+friend.user+'?';copy.textContent='They will be removed from your friends row.';button.textContent='Remove';}
    setFriendActionView('confirm');
  }
  function saveFriendNickname(){
    var friend=getActionFriend(),input=document.getElementById('friendNicknameInput');if(!friend||!input)return;
    var nickname=input.value.trim();var friends=loadAddedFriends();friends.forEach(function(item){if(String(item.id)===String(friend.id))item.nickname=nickname});
    saveAddedFriends(friends);syncOriginalFriendSource(friends);renderHomeFriends();window.srRenderFriends();closeKeyboard(true);closeFriendActions();
  }
  function handleFriendAction(action){
    var friend=getActionFriend();if(action==='cancel'){closeFriendActions();return;}
    if(action==='profile'&&friend){window.open('https://www.roblox.com/users/'+encodeURIComponent(friend.id)+'/profile','_blank','noopener');return;}
    if(action==='nickname'&&friend){var input=document.getElementById('friendNicknameInput');input.value=friend.nickname||'';setFriendActionView('nickname');requestAnimationFrame(function(){openKeyboard(input)});return;}
    if(action==='nickname-cancel'){closeKeyboard(true);setFriendActionView('options');return;}
    if(action==='nickname-save'){saveFriendNickname();return;}
    if(action==='remove'||action==='block'){showFriendConfirmation(action);return;}
    if(action==='confirm-cancel'){setFriendActionView('options');return;}
    if((action==='confirm-remove'||action==='confirm-block')&&friend)return;
    var confirmButton=document.getElementById('friendConfirmButton');
    if(action==='confirm-action'&&confirmButton&&friend){
      var kind=confirmButton.dataset.confirmKind;
      if(kind==='block'){var blocked=loadBlockedUsers();if(!blocked.some(function(item){return String(item.id)===String(friend.id)}))blocked.push({id:friend.id,user:friend.user,name:friend.name});saveBlockedUsers(blocked);}
      window.removeAddedFriend(friend.id);closeFriendActions();
    }
  }
  // The confirm button has a dynamic action so it can share the same polished confirmation view.
  ensureFriendActionSheet().querySelector('#friendConfirmButton').dataset.action='confirm-action';

  syncOriginalFriendSource(loadAddedFriends());renderHomeFriends();window.srRenderFriends();

  // Keep the original send action: update the local balance and close the Send Robux sheet.

  // Small copy polish for purchase completion.
  var success=document.getElementById('successPopup');
  if(success){
    var textNodes=Array.from(success.querySelectorAll('div')).filter(function(el){return el.children.length===0&&/Purchase successful/i.test(el.textContent)});
    textNodes.forEach(function(el){el.textContent='Purchase complete. Your Robux have been added to your balance.'});
  }
})();
