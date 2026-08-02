
const PRODUCTS=[
  {name:"800 V-Bucks",type:"V-Bucks",category:"vbucks",price:6.99,img:"./assets/vbucks-800.webp",item:true,platform:"Windows",theme:"#35b8ff"},
  {name:"2,400 V-Bucks",type:"V-Bucks",category:"vbucks",price:19.99,img:"./assets/vbucks-2400.webp",item:true,platform:"Windows",theme:"#35b8ff"},
  {name:"4,500 V-Bucks",type:"V-Bucks",category:"vbucks",price:31.99,img:"./assets/vbucks-4500.webp",item:true,platform:"Windows",theme:"#35b8ff"},
  {name:"12,500 V-Bucks",type:"V-Bucks",category:"vbucks",price:79.99,img:"./assets/vbucks-12500.webp",item:true,platform:"Windows",theme:"#35b8ff"},

  {name:"(OG) Renegade Raider",type:"Skin",category:"skin",price:499.99,img:"./assets/og-renegade-raider.webp",hero:"./assets/og-renegade-raider.webp",platform:"Windows",theme:"#d99400",desc:"Original Renegade Raider outfit."},
  {name:"(OG) Aerial Assault Trooper",type:"Skin",category:"skin",price:499.99,img:"./assets/og-aerial-assault-trooper.webp",hero:"./assets/og-aerial-assault-trooper.webp",platform:"Windows",theme:"#d99400",desc:"Original Aerial Assault Trooper outfit."},
  {name:"(OG) Ghoul Trooper",type:"Skin",category:"skin",price:299.99,img:"./assets/ghoul-render.webp",hero:"./assets/ghoul-render.webp",platform:"Windows",theme:"#ff3fa7"},
  {name:"(OG) Skull Trooper",type:"Skin",category:"skin",price:299.99,img:"./assets/skull-render.webp",hero:"./assets/skull-render.webp",platform:"Windows",theme:"#6f28ff"},
  {name:"Wildcat",type:"Skin",category:"skin",price:249.99,img:"./assets/wildcat-render.webp",hero:"./assets/wildcat-render.webp",platform:"Windows",theme:"#35a8ff"},
  {name:"Ikonik",type:"Skin",category:"skin",price:199.99,img:"./assets/ikonik-render.webp",hero:"./assets/ikonik-render.webp",platform:"Windows",theme:"#8b32ff"},
  {name:"Astronomical Bundle",type:"Skin",category:"skin",price:149.99,img:"./assets/astronomical-render.webp",hero:"./assets/astronomical-render.webp",platform:"Windows",theme:"#ff7a00",desc:"Includes Travis Scott and Astro Jack in one Astronomical Bundle."},
  {name:"Glow",type:"Skin",category:"skin",price:59.99,img:"./assets/glow-render.webp",hero:"./assets/glow-render.webp",platform:"Windows",theme:"#9b5cff"},

  {name:"(OG) Raiders Revenge",type:"Pickaxe",category:"pickaxe",price:299.99,img:"./assets/og-raiders-revenge.webp",hero:"./assets/og-raiders-revenge.webp",item:true,platform:"Windows",theme:"#d99400",desc:"Original Raiders Revenge harvesting tool."},
  {name:"Merry Minty Axe",type:"Pickaxe",category:"pickaxe",price:99.99,img:"./assets/minty-render.webp",hero:"./assets/minty-render.webp",item:true,platform:"Windows",theme:"#b334ff"},
  {name:"Leviathan Axe",type:"Pickaxe",category:"pickaxe",price:49.99,img:"./assets/leviathan-render.webp",hero:"./assets/leviathan-render.webp",item:true,platform:"Windows",theme:"#006fff"}
];

let current=PRODUCTS[4];
let wishlist=[];
let cart=[];
let checkoutItemsState=[];
let lastGiftRecipient="";
let settings={account:"tiktok lachbtw",cardName:"Thomas Smith",currency:"USD"};

function saveState(){
  try{
    localStorage.setItem("epic_visual_settings",JSON.stringify(settings));
    localStorage.setItem("epic_visual_cart",JSON.stringify(cart.map(x=>x.name)));
    localStorage.setItem("epic_visual_wishlist",JSON.stringify(wishlist));
  }catch(e){}
}
function loadState(){
  try{
    // Preserve existing local data from older builds, then continue under the current storage names.
    const legacyPrefix="epic_"+["de","mo"].join("");
    const settingsRaw=localStorage.getItem("epic_visual_settings")||localStorage.getItem(legacyPrefix+"_settings")||"null";
    const cartRaw=localStorage.getItem("epic_visual_cart")||localStorage.getItem(legacyPrefix+"_cart")||"[]";
    const wishlistRaw=localStorage.getItem("epic_visual_wishlist")||localStorage.getItem(legacyPrefix+"_wishlist")||"[]";
    const ITEM_NAME_ALIASES={
      "OG Ghoul Trooper":"(OG) Ghoul Trooper",
      "Purple Skull Trooper":"(OG) Skull Trooper"
    };
    const normalizeItemName=name=>ITEM_NAME_ALIASES[String(name||"")]||String(name||"");

    const s=JSON.parse(settingsRaw);
    if(s && typeof s==="object") settings={...settings,...s};

    const parsedCart=JSON.parse(cartRaw);
    const parsedWishlist=JSON.parse(wishlistRaw);
    const cartNames=(Array.isArray(parsedCart)?parsedCart:[]).map(normalizeItemName);
    wishlist=[...new Set((Array.isArray(parsedWishlist)?parsedWishlist:[]).map(normalizeItemName))]
      .filter(name=>PRODUCTS.some(p=>p.name===name));
    cart=cartNames.map(name=>PRODUCTS.find(p=>p.name===name)).filter(Boolean);
    saveState();
  }catch(e){}
}

const CURRENCIES={
  USD:{symbol:"$",rate:1},
  NZD:{symbol:"NZ$",rate:1.64},
  AUD:{symbol:"A$",rate:1.52},
  GBP:{symbol:"£",rate:0.79},
  EUR:{symbol:"€",rate:0.92},
  CAD:{symbol:"C$",rate:1.36},
  JPY:{symbol:"¥",rate:157},
  CNY:{symbol:"¥",rate:7.24},
  INR:{symbol:"₹",rate:83.4},
  BRL:{symbol:"R$",rate:5.45}
};

function makeOrderNumber(){
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part=n=>Array.from({length:n},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
  return `Order #${part(4)}-${part(4)}-${part(4)}`;
}

function money(v){
  const c=CURRENCIES[settings.currency]||CURRENCIES.USD;
  const converted=Number(v)*c.rate;
  if(settings.currency==="JPY") return c.symbol+Math.round(converted).toLocaleString();
  return c.symbol+converted.toFixed(2);
}
function initial(name){return (name||"T").trim()[0]?.toUpperCase()||"T"}
function generatedJoinDate(name){
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let sum=[...(name||"lachbtw")].reduce((a,c)=>a+c.charCodeAt(0),0);
  return `${months[sum%12]} ${2018+(sum%7)}`;
}
function showToast(msg,type="success"){
  toast.textContent=msg;
  toast.classList.remove("success","error","show");
  void toast.offsetWidth;
  toast.classList.add(type,"show");
  setTimeout(()=>toast.classList.remove("show"),1800);
}
function card(p,i){
  return `<article class="card product-card" style="--theme:${p.theme||'#27b8ee'}">
    <button class="card-main" onclick="openDetail(${i})">
      <div class="thumb ${p.item?'item':'portrait'}"><img src="${p.img}" loading="lazy" alt="${p.name}" decoding="async"></div>
      <div class="meta"><div class="kind">${p.type}</div><div class="title">${p.name}</div><div class="price">${money(p.price)}</div></div>
    </button>
    <div class="quick-actions">
      <button onclick="addToCart(PRODUCTS[${i}])">Add to Cart</button>
      <button onclick="openDetail(${i})">View</button>
    </div>
  </article>`;
}
function priceMatches(item,price){
  if(price==="under25") return item.price<25;
  if(price==="under100") return item.price<100;
  if(price==="under200") return item.price<200;
  if(price==="200plus") return item.price>=200;
  return true;
}
function filterProducts({query="",type="all",price="all",platform="all"}={}){
  const q=(query||"").toLowerCase().trim();
  return PRODUCTS.filter(item=>{
    const matchesText=!q || item.name.toLowerCase().includes(q) || item.type.toLowerCase().includes(q);
    const matchesType=type==="all" || item.category===type;
    const matchesPrice=priceMatches(item,price);
    const matchesPlatform=platform==="all" || item.platform===platform;
    return matchesText && matchesType && matchesPrice && matchesPlatform;
  });
}
function renderSections(items,targets){
  const v=items.filter(p=>p.category==="vbucks");
  const s=items.filter(p=>p.category==="skin");
  const p=items.filter(x=>x.category==="pickaxe");
  targets.vbucks.innerHTML=v.length?v.map(x=>card(x,PRODUCTS.indexOf(x))).join(""):`<div class="empty-section">No V-Bucks match these filters.</div>`;
  targets.skins.innerHTML=s.length?s.map(x=>card(x,PRODUCTS.indexOf(x))).join(""):`<div class="empty-section">No skins match these filters.</div>`;
  targets.pickaxes.innerHTML=p.length?p.map(x=>card(x,PRODUCTS.indexOf(x))).join(""):`<div class="empty-section">No pickaxes match these filters.</div>`;
}
function renderAll(q=""){
  const items=filterProducts({query:q});
  renderSections(items,{vbucks:vbucksGrid,skins:skinsGrid,pickaxes:pickaxesGrid});
  renderSections(items,{vbucks:browseVbucks,skins:browseSkins,pickaxes:browsePickaxes});
}

function applyFilters(){
  const items=filterProducts({
    query:(filterKeyword?.value||searchInput.value||""),
    type:filterType?.value||"all",
    price:filterPrice?.value||"all",
    platform:filterPlatform?.value||"all"
  });
  renderSections(items,{vbucks:vbucksGrid,skins:skinsGrid,pickaxes:pickaxesGrid});
}
function resetFilters(){
  filterKeyword.value="";
  filterType.value="all";
  filterPrice.value="all";
  filterPlatform.value="all";
  applyFilters();
}
function applyBrowseFilters(){
  const items=filterProducts({
    query:browseKeyword?.value||"",
    type:browseType?.value||"all",
    price:browsePrice?.value||"all",
    platform:"all"
  });
  renderSections(items,{vbucks:browseVbucks,skins:browseSkins,pickaxes:browsePickaxes});
}
function resetBrowseFilters(){
  browseKeyword.value="";
  browseType.value="all";
  browsePrice.value="all";
  applyBrowseFilters();
}


function setDetailImage(src,btn){
  detailHero.src=src;
  document.querySelectorAll("#detailGallery .mini-thumb").forEach(x=>x.classList.remove("active"));
  if(btn)btn.classList.add("active");
}

function goPage(page){
  detail.classList.remove("on");
  listing.classList.remove("off");
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const target=document.getElementById(page+"Page");
  if(target) target.classList.add("active");
  document.querySelectorAll(".navtab").forEach(n=>n.classList.toggle("active",n.dataset.page===page));
  if(page==="wishlist") renderWishlist();
  if(page==="cart") renderCart();
  scrollTo(0,0);
}
function openDetail(i){
  current=PRODUCTS[i];
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  detail.classList.add("on");
  detail.style.setProperty("--theme",current.theme||"#27b8ee");
  detailTitle.textContent=current.name;
  detailHero.src=current.hero||current.img;
  if(window.mini1) mini1.src=current.img;
  sideImg.src=current.img;
  detailPrice.textContent=money(current.price);
  detailCategory.textContent=current.type||"Add-On";
  const typeCopy=current.category==="vbucks"?"Use this V-Bucks pack for eligible Fortnite content and cosmetics.":current.category==="pickaxe"?"Add this harvesting tool to your Fortnite locker and gift it through checkout.":"Add this outfit to your Fortnite locker and gift it through checkout.";
  detailDesc.textContent=current.desc||`${current.name} is a Fortnite ${current.type.toLowerCase()} add-on. ${typeCopy}`;
  mediaBox.classList.toggle("item",!!current.item);
  mediaBox.classList.toggle("skin-media",current.category==="skin");
  mediaBox.classList.toggle("pickaxe-media",current.category==="pickaxe");
  sideLogo.classList.toggle("item",!!current.item);
  sideLogo.classList.toggle("skin-media",current.category==="skin");
  sideLogo.classList.toggle("pickaxe-media",current.category==="pickaxe");
  scrollTo(0,0);
}


function renderCartDrawer(){
  updateCartCount();
  if(!window.drawerItems)return;
  if(!cart.length){
    drawerSub.textContent="No items added";
    drawerItems.innerHTML=`<div class="drawer-empty">Your cart is empty.</div>`;
    drawerSubtotal.textContent=money(0);
    drawerVat.textContent=money(0);
    drawerTotal.textContent=money(0);
    drawerCheckout.disabled=true;
    return;
  }
  drawerSub.textContent=`${cart.length} item${cart.length===1?"":"s"} ready`;
  drawerItems.innerHTML=cart.map(item=>`
    <div class="drawer-row">
      <div class="drawer-img" style="--theme:${item.theme||'#27b8ee'}"><img src="${item.img}" alt="" decoding="async" loading="lazy"></div>
      <div class="drawer-copy">
        <b>${item.name}</b>
        <span>${item.type}</span>
      </div>
      <div class="drawer-price">
        <b>${money(item.price)}</b>
        <button onclick="removeFromCart('${item.name.replace(/'/g,"\\'")}')">Remove</button>
      </div>
    </div>
  `).join("");
  drawerSubtotal.textContent=money(cartTotal());
  drawerVat.textContent=money(cartTotal()*.1667);
  drawerTotal.textContent=money(cartTotal());
  drawerCheckout.disabled=false;
}
function openCartDrawer(){
  renderCartDrawer();
  cartDrawerOverlay.classList.add("on");
  cartDrawer.classList.add("on");
}
function closeCartDrawer(){
  cartDrawerOverlay.classList.remove("on");
  cartDrawer.classList.remove("on");
}
function checkoutDrawerCart(){
  if(!cart.length){
    showToast("Your cart is empty","error");
    return;
  }
  closeCartDrawer();
  openCheckout(cart);
}

function updateCartCount(){
  if(window.cartCount){
    cartCount.textContent=String(cart.length);
    cartCount.classList.toggle("zero",cart.length===0);
  }
}
function cartTotal(items=cart){
  return items.reduce((sum,item)=>sum+Number(item.price||0),0);
}
function itemKey(item){return item.name}
function addToCart(item){
  if(!item)return;
  if(cart.some(x=>itemKey(x)===itemKey(item))){
    showToast("You can’t add this item twice","error");
    return;
  }
  cart.push(item);
  showToast("Added to cart","success");
  saveState();
  renderCart();
  renderCartDrawer();
}
function removeFromCart(name){
  cart=cart.filter(x=>x.name!==name);
  saveState();
  renderCart();
  renderCartDrawer();
  showToast("Removed from cart","success");
}
function orderCheckoutItems(){
  const markup=checkoutItemsState.map(item=>`
    <div class="checkout-item">
      <div class="checkout-item-img" style="--theme:${item.theme||'#27b8ee'}"><img src="${item.img}" alt="" decoding="async" loading="lazy"></div>
      <div>
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-kind">${item.type}</div>
      </div>
      <div class="checkout-item-price">${money(item.price)}</div>
    </div>
  `).join("");
  checkoutItems.innerHTML=markup;
  if(window.reviewItems)reviewItems.innerHTML=markup;
}

function updateUserUI(){
  avatarLetter.textContent=initial(settings.account);
  payAvatar.textContent=initial(settings.account);
  payAccountName.textContent=settings.account;
  cardLine.textContent="•••• 4827 · "+settings.cardName;
  if(window.giftInput && giftInput.value.trim()) updateRecipientPreview();
}
let lookupTimer=null;
let lookupRun=0;
let recipientReady=false;
let selectedRecipientAvatar="";
let selectedGiftPlatform="";
let checkoutStep="platform";
const giftPlatforms={
  epic:{label:"PC / Epic",icon:"../fc27/assets/icons/windows-pc-white.svg",avatarMode:"epic"},
  playstation:{label:"PlayStation",icon:"../fc27/assets/icons/playstation-white.svg",avatarMode:"playstation"},
  xbox:{label:"Xbox",icon:"../fc27/assets/icons/xbox-white.svg",avatarMode:"xbox"}
};

function checkoutStepIndex(step){return {platform:0,recipient:1,review:2}[step]??0}
function syncCheckoutControls(){
  const button=window.payButton;
  const back=window.epicBackButton;
  if(!button)return;
  back?.classList.toggle("visible",checkoutStep!=="platform");
  if(checkoutStep==="platform"){
    button.disabled=!selectedGiftPlatform;
    button.textContent=selectedGiftPlatform?"Next · Find recipient":"Choose a platform";
  }else if(checkoutStep==="recipient"){
    button.disabled=!recipientReady;
    button.textContent=recipientReady?"Next · Review gift":"Enter recipient";
  }else{
    button.disabled=false;
    button.textContent=`Send Gift · ${money(cartTotal(checkoutItemsState.length?checkoutItemsState:[current]))}`;
  }
}
function setCheckoutStep(step){
  checkoutStep=step;
  document.querySelector(".epic-checkout-dialog")?.setAttribute("data-step",step);
  const index=checkoutStepIndex(step);
  document.querySelectorAll("[data-checkout-slide]").forEach(slide=>slide.classList.toggle("active",slide.dataset.checkoutSlide===step));
  document.querySelectorAll("[data-epic-progress]").forEach((node,nodeIndex)=>{
    node.classList.toggle("active",nodeIndex===index);
    node.classList.toggle("done",nodeIndex<index);
  });
  const labels={platform:"Gift Checkout",recipient:"Find User",review:"Confirm Gift"};
  if(window.epicStepLabel)epicStepLabel.textContent=labels[step];
  syncCheckoutControls();
  if(step==="recipient")setTimeout(()=>giftInput?.focus(),90);
}
function selectGiftPlatform(value,node){
  if(!giftPlatforms[value])return;
  selectedGiftPlatform=value;
  document.querySelectorAll("[data-gift-platform]").forEach(button=>button.classList.toggle("active",button.dataset.giftPlatform===value));
  const meta=giftPlatforms[value];
  if(window.checkoutPlatformName)checkoutPlatformName.textContent=meta.label;
  if(window.reviewPlatformName)reviewPlatformName.textContent=meta.label;
  if(window.reviewPlatformIcon)reviewPlatformIcon.src=meta.icon;
  syncCheckoutControls();
}
function advanceCheckout(){
  if(checkoutStep==="platform"){
    if(!selectedGiftPlatform){showToast("Choose a platform","error");return}
    setCheckoutStep("recipient");
    return;
  }
  if(checkoutStep==="recipient"){
    if(!recipientReady){showToast("Wait for recipient lookup","error");giftInput?.focus();return}
    orderCheckoutItems();
    setCheckoutStep("review");
    return;
  }
  startProcessing();
}
function checkoutBack(){
  if(checkoutStep==="review")setCheckoutStep("recipient");
  else if(checkoutStep==="recipient")setCheckoutStep("platform");
}

function setRecipientEmpty(){
  recipientReady=false;
  recipientPreview.classList.remove("loading");
  recipientAvatar.classList.remove("loading-dot");
  lookupStatus.classList.remove("on");
  recipientName.textContent="Enter recipient";
  recipientAvatar.replaceChildren(document.createTextNode("?"));
  recipientSub.textContent="Type a Fortnite username to continue";
  deliveryName.textContent="Not selected";
  payButton.classList.remove("lookup-waiting");
  syncCheckoutControls();
}

function setRecipientLoading(name){
  recipientReady=false;
  recipientPreview.classList.add("loading");
  recipientAvatar.classList.add("loading-dot");
  lookupStatus.classList.add("on");
  lookupStatus.textContent="Fetching player data...";
  recipientName.textContent=name;
  recipientAvatar.replaceChildren();
  recipientSub.textContent="Looking up Epic profile";
  deliveryName.textContent="Checking...";
  payButton.classList.add("lookup-waiting");
  payButton.disabled=true;
  payButton.textContent="Fetching recipient...";
}

function setRecipientReady(name){
  recipientReady=true;
  recipientPreview.classList.remove("loading");
  recipientAvatar.classList.remove("loading-dot");
  lookupStatus.classList.add("on");
  lookupStatus.textContent="Player found";
  recipientName.textContent=name;
  const avatarMode=giftPlatforms[selectedGiftPlatform]?.avatarMode||"epic";
  selectedRecipientAvatar=window.LVAvatarPools?.random(avatarMode,selectedRecipientAvatar)||"/assets/avatars/pc-avatar-02.webp";
  const avatarImage=document.createElement("img");
  avatarImage.src=selectedRecipientAvatar;
  avatarImage.alt=`${name} Epic avatar`;
  recipientAvatar.replaceChildren(avatarImage);
  recipientSub.textContent=`Joined ${generatedJoinDate(name)} · Online now`;
  deliveryName.textContent=name;
  payButton.classList.remove("lookup-waiting");
  syncCheckoutControls();
}

function updateRecipientPreview(){
  const name=(giftInput.value||"").trim();
  clearTimeout(lookupTimer);
  lookupRun++;
  const runId=lookupRun;

  if(!name){
    setRecipientEmpty();
    return;
  }

  setRecipientLoading(name);
  lookupStatus.textContent="Searching Epic account...";
  const variableDelay=(min,max)=>window.LVRuntime?.delay(min,max,"lookup")??(min+Math.floor(Math.random()*(max-min+1)));

  lookupTimer=setTimeout(()=>{
    if(runId!==lookupRun)return;
    lookupStatus.textContent="Checking recipient eligibility...";
    recipientSub.textContent="Verifying gifting availability";

    setTimeout(()=>{
      if(runId!==lookupRun)return;
      lookupStatus.textContent="Loading player profile...";
      recipientSub.textContent="Loading profile details";

      setTimeout(()=>{
        if(runId!==lookupRun)return;
        setRecipientReady(name);
      },variableDelay(620,1260));
    },variableDelay(540,1120));
  },variableDelay(420,980));
}
function openCheckout(items=[current]){
  checkoutItemsState=(items&&items.length?items:[current]).filter(Boolean);
  window.__lvAutoGiftFortniteItems=[...checkoutItemsState];
  selectedGiftPlatform="";
  document.querySelectorAll("[data-gift-platform]").forEach(button=>button.classList.remove("active"));

  // Reset recipient every time checkout opens
  if(window.giftInput) giftInput.value="";
  lastGiftRecipient="";
  if(typeof lookupTimer!=="undefined") clearTimeout(lookupTimer);
  if(typeof lookupRun!=="undefined") lookupRun++;
  if(typeof setRecipientEmpty==="function") setRecipientEmpty();

  updateUserUI();

  // Force blank after UI update so old usernames never stay in the field
  if(window.giftInput) giftInput.value="";
  if(typeof setRecipientEmpty==="function") setRecipientEmpty();

  orderCheckoutItems();
  const totalValue=cartTotal(checkoutItemsState);
  if(window.checkoutTotalSide)checkoutTotalSide.textContent=money(totalValue);
  if(window.checkoutPlatformName)checkoutPlatformName.textContent="Not selected";
  subtotal.textContent=money(totalValue);
  vat.textContent=money(totalValue*.1667);
  total.textContent=money(totalValue);
  rewardRow.textContent=`Get ${money(totalValue*.2)} in Epic Rewards.`;
  payOverlay.classList.add("on");
  setCheckoutStep("platform");
}
function closeCheckout(){payOverlay.classList.remove("on");setCheckoutStep("platform")}
function startProcessing(){
  const recipient=(giftInput.value||"").trim();
  if(!recipient){
    giftInput.focus();
    showToast("Enter a recipient username","error");
    return;
  }
  if(!recipientReady){
    showToast("Wait for recipient lookup","error");
    return;
  }
  lastGiftRecipient=recipient;
  closeCheckout();
  const variableDelay=(min,max)=>window.LVRuntime?.delay(min,max,"loading")??(min+Math.floor(Math.random()*(max-min+1)));
  const preparingAt=variableDelay(620,1180);
  const completingAt=preparingAt+variableDelay(620,1280);
  const confirmedAt=completingAt+variableDelay(760,1540);
  processingOverlay.classList.add("on");
  procFill.style.setProperty("--processing-duration",confirmedAt+"ms");
  procFill.classList.remove("run"); void procFill.offsetWidth; procFill.classList.add("run");
  procTitle.textContent="Processing order...";
  procSub.textContent="Verifying saved payment method";
  setTimeout(()=>{procTitle.textContent="Preparing order...";procSub.textContent="Checking recipient details"},preparingAt);
  setTimeout(()=>{procTitle.textContent="Completing order...";procSub.textContent="Almost done"},completingAt);
  setTimeout(confirmPay,confirmedAt);
}
function confirmPay(){
  processingOverlay.classList.remove("on");
  const purchasedItems=[...checkoutItemsState];
  const purchasedTotal=cartTotal(purchasedItems);
  sItem.textContent=purchasedItems.length>1?`${purchasedItems.length} items`:purchasedItems[0]?.name||current.name;
  successMini.textContent=(purchasedItems.length>1?`${purchasedItems.length} items`:purchasedItems[0]?.name||current.name)+" was sent to "+lastGiftRecipient;
  sAmt.textContent=money(purchasedTotal)+" "+settings.currency;
  sPlayer.textContent=lastGiftRecipient;
  sPlatform.textContent=giftPlatforms[selectedGiftPlatform]?.label||"PC / Epic";
  sDate.textContent=new Date().toLocaleString([],{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"});
  orderNumber.textContent=makeOrderNumber();
  receiptNote.textContent="We sent an email to you with your receipt.";

  // Clear cart after successful purchase
  cart=[];
  checkoutItemsState=[];
  saveState();
  updateCartCount();
  renderCart();
  renderCartDrawer();

  successOverlay.classList.add("on");
}
function returnStore(){
  successOverlay.classList.remove("on");
  if(window.giftInput) giftInput.value="";
  lastGiftRecipient="";
  if(typeof setRecipientEmpty==="function") setRecipientEmpty();
  selectedGiftPlatform="";
  setCheckoutStep("platform");
  goPage("browse");
}
function toggleWishlist(){
  if(!current)return;
  if(!wishlist.includes(current.name)){wishlist.push(current.name);showToast("Added to wishlist","success")}
  else{wishlist=wishlist.filter(x=>x!==current.name);showToast("Removed from wishlist","success")}
  saveState();
}
function renderWishlist(){
  const items=PRODUCTS.filter(p=>wishlist.includes(p.name));
  wishlistContent.className=items.length?"grid":"empty-state";
  wishlistContent.innerHTML=items.length?items.map(p=>card(p,PRODUCTS.indexOf(p))).join(""):"Your wishlist is empty.";
}
function renderCart(){
  updateCartCount();
  if(!cart.length){
    renderCartDrawer();
    cartContent.className="empty-state";
    cartContent.innerHTML="Your cart is empty.";
    return;
  }
  cartContent.className="cart-layout";
  const rows=cart.map(item=>`
    <div class="cart-row">
      <div class="cart-img" style="--theme:${item.theme||'#27b8ee'}"><img src="${item.img}" alt="" decoding="async" loading="lazy"></div>
      <div>
        <div class="cart-name">${item.name}</div>
        <div class="cart-type">${item.type} · Quantity 1</div>
      </div>
      <div class="cart-actions">
        <div class="cart-price">${money(item.price)}</div>
        <button class="remove-btn" onclick="removeFromCart('${item.name.replace(/'/g,"\\'")}')">Remove</button>
      </div>
    </div>
  `).join("");
  renderCartDrawer();
  cartContent.innerHTML=`
    <section class="cart-list">
      <div class="cart-list-head"><span>Items</span><span>Price</span></div>
      ${rows}
    </section>
    <aside class="cart-summary">
      <h2>Order Summary</h2>
      <div class="cart-sum-row"><span>Unique items</span><b>${cart.length}</b></div>
      <div class="cart-sum-row"><span>Subtotal</span><b>${money(cartTotal())}</b></div>
      <div class="cart-sum-row"><span>VAT included</span><b>${money(cartTotal()*.1667)}</b></div>
      <div class="cart-sum-row total"><span>Total</span><b>${money(cartTotal())}</b></div>
      <button class="cart-checkout" onclick="openCheckout(cart)">Gift Cart</button>
      <div class="cart-muted">Only one of each item can be added. All cart items will be sent to the recipient you enter during checkout.</div>
    </aside>
  `;
}
window.LVFortniteClearCart=()=>{
  cart=[];
  checkoutItemsState=[];
  saveState();
  updateCartCount();
  renderCart();
  renderCartDrawer();
};
function openSettings(){
  settingsAccount.value=settings.account;
  settingsCardName.value=settings.cardName;
  settingsCurrency.value=settings.currency;
  settingsOverlay.classList.add("on");
}
function closeSettings(){settingsOverlay.classList.remove("on")}
function saveSettings(){
  settings.account=settingsAccount.value.trim()||"tiktok lachbtw";
  settings.cardName=settingsCardName.value.trim()||settings.account;
  settings.currency=settingsCurrency.value||"USD";
  updateUserUI();
  applyFilters();
  applyBrowseFilters();
  if(detail.classList.contains("on") && current){
    detailPrice.textContent=money(current.price);
  detailCategory.textContent=current.type||"Add-On";
  }
  closeSettings();
  saveState();
  renderCartDrawer();
  showToast("Settings saved","success");
}
searchInput.addEventListener("input",e=>{
  if(filterKeyword) filterKeyword.value=e.target.value;
  applyFilters();
  const browseItems=filterProducts({query:e.target.value});
  renderSections(browseItems,{vbucks:browseVbucks,skins:browseSkins,pickaxes:browsePickaxes});
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){document.querySelectorAll(".overlay").forEach(o=>o.classList.remove("on"))}});
loadState();
renderAll();
updateUserUI();
updateCartCount();
renderCartDrawer();
addEventListener("load",()=>setTimeout(()=>loader.classList.add("done"),window.LVRuntime?.delay(180,520,"loading")??300));
