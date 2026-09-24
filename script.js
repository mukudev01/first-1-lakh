/*
  KUBER BOUTIQUE — QUICK EDITS
  1) Change product names, prices, categories and photo paths in PRODUCTS below.
  2) Put your own photos in an "images" folder and set image: "images/my-photo.jpg".
  3) Add your Google Apps Script web-app URL to ORDER_ENDPOINT after deployment.
*/
const STORE = {
  orderEndpoint: "", // Example: https://script.google.com/macros/s/DEPLOYMENT_ID/exec
  currency: "INR",
  storeName: "Kuber Boutique"
};

const CATEGORIES = ["All pieces", "Sarees", "Kurtis", "Men's wear", "Co-ord sets"];

const PRODUCTS = [
  { sku:"KB-SAR-01", name:"Paithani-Inspired Silk Saree", category:"Sarees", price:2490, compareAt:2990, tag:"Festive favourite", color:"#a16b69", bg:"linear-gradient(145deg,#e8cfbb,#b98578)", image:"", kind:"saree", sizes:["Free size"], shades:["#8c3f4c","#be9a57","#334b48"] },
  { sku:"KB-SAR-02", name:"Soft-Glow Organza Saree", category:"Sarees", price:1890, compareAt:2290, tag:"New in", color:"#8d6572", bg:"linear-gradient(145deg,#eedfe2,#b78f9b)", image:"", kind:"saree", sizes:["Free size"], shades:["#b990a0","#ded0b8"] },
  { sku:"KB-SAR-03", name:"Garden Print Cotton Saree", category:"Sarees", price:1590, compareAt:1890, tag:"Easy drape", color:"#6b7e70", bg:"linear-gradient(145deg,#d6dfcf,#829987)", image:"", kind:"saree", sizes:["Free size"], shades:["#8d9f84","#c16c62","#d1af69"] },
  { sku:"KB-KUR-01", name:"Embroidered Straight Kurti", category:"Kurtis", price:1290, compareAt:1590, tag:"Bestseller", color:"#79566a", bg:"linear-gradient(145deg,#ece0dc,#bd9b91)", image:"", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#9c6573","#d0ad7d"] },
  { sku:"KB-KUR-02", name:"Flowy Cotton Anarkali", category:"Kurtis", price:1490, compareAt:1790, tag:"Made for twirling", color:"#8a704c", bg:"linear-gradient(145deg,#eddfc5,#c6a87c)", image:"", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#ba8d63","#8d6477","#80917d"] },
  { sku:"KB-KUR-03", name:"Printed Everyday Kurta Set", category:"Kurtis", price:1790, compareAt:2190, tag:"Just landed", color:"#627765", bg:"linear-gradient(145deg,#dce1d3,#96a38f)", image:"", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#79896e","#b5847a"] },
  { sku:"KB-MEN-01", name:"Linen-Blend Kurta", category:"Men's wear", price:1490, compareAt:1790, tag:"An easy classic", color:"#74806d", bg:"linear-gradient(145deg,#e4dfcf,#a5a58e)", image:"", kind:"mens", sizes:["S","M","L","XL","XXL"], shades:["#92947b","#b88e76","#46534f"] },
  { sku:"KB-MEN-02", name:"Textured Festive Kurta", category:"Men's wear", price:1890, compareAt:2290, tag:"Occasion edit", color:"#865d55", bg:"linear-gradient(145deg,#ebd9ca,#ba9383)", image:"", kind:"mens", sizes:["S","M","L","XL","XXL"], shades:["#a36c5d","#807355"] },
  { sku:"KB-MEN-03", name:"Classic Cotton Shirt", category:"Men's wear", price:1190, compareAt:1490, tag:"Everyday pick", color:"#63727b", bg:"linear-gradient(145deg,#dce5e7,#9aaab0)", image:"", kind:"mens", sizes:["S","M","L","XL","XXL"], shades:["#819da5","#d0c5b5","#59626a"] },
  { sku:"KB-SET-01", name:"Mirror-Work Co-ord Set", category:"Co-ord sets", price:2190, compareAt:2590, tag:"Festive favourite", color:"#90566a", bg:"linear-gradient(145deg,#eed8d8,#be909a)", image:"", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#a55f77","#d4b05f"] },
  { sku:"KB-SET-02", name:"Soft Cotton Co-ord Set", category:"Co-ord sets", price:1690, compareAt:1990, tag:"Easy days", color:"#687b75", bg:"linear-gradient(145deg,#dce6de,#a1b0a3)", image:"", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#809687","#bf8c7c","#d0c0a4"] },
  { sku:"KB-SET-03", name:"Draped Celebration Set", category:"Co-ord sets", price:2490, compareAt:2990, tag:"The occasion edit", color:"#76526a", bg:"linear-gradient(145deg,#e7d4df,#a9879e)", image:"", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#936c8d","#d1a773"] }
];

const money = value => new Intl.NumberFormat("en-IN", { style:"currency", currency:STORE.currency, maximumFractionDigits:0 }).format(value);
let activeCategory = "All pieces";
let searchTerm = "";
let likedProducts = new Set();
let selectedProduct = null;
let toastTimer;

const categoryNav = document.querySelector("#categoryNav");
const categoryTiles = document.querySelector("#categoryTiles");
const filterChips = document.querySelector("#filterChips");
const productGrid = document.querySelector("#productGrid");
const orderDialog = document.querySelector("#orderDialog");
const orderForm = document.querySelector("#orderForm");

function renderCategoryNav(){
  categoryNav.innerHTML = CATEGORIES.slice(1).map(category => `<a href="#collection" data-category-link="${escapeHtml(category)}">${escapeHtml(category)}</a>`).join("");
  categoryNav.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => setCategory(link.dataset.categoryLink)));
}

function renderCategoryTiles(){
  const tileData = [
    {name:"Sarees", bg:"linear-gradient(145deg,#d9bba9,#966b68)", shape:"#714b53"},
    {name:"Kurtis", bg:"linear-gradient(145deg,#e9d9cc,#b88a79)", shape:"#855868"},
    {name:"Men's wear", bg:"linear-gradient(145deg,#d9d9cb,#859188)", shape:"#465951"},
    {name:"Co-ord sets", bg:"linear-gradient(145deg,#e9d5d4,#be9195)", shape:"#864e60"},
    {name:"All pieces", bg:"linear-gradient(145deg,#e6d5b8,#b89868)", shape:"#795843"}
  ];
  categoryTiles.innerHTML = tileData.map(tile => `<a href="#collection" class="category-tile" data-tile-category="${escapeHtml(tile.name)}" style="--tile-bg:${tile.bg};--tile-shape:${tile.shape}"><span class="tile-glow"></span><span class="tile-label">${escapeHtml(tile.name)}</span><span class="tile-arrow" aria-hidden="true">↗</span></a>`).join("");
  categoryTiles.querySelectorAll("[data-tile-category]").forEach(tile => tile.addEventListener("click", () => setCategory(tile.dataset.tileCategory)));
}

function renderFilters(){
  filterChips.innerHTML = CATEGORIES.map(category => `<button class="filter-chip${category===activeCategory?" active":""}" type="button" data-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("");
  filterChips.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => setCategory(button.dataset.filter)));
}

function setCategory(category){
  activeCategory = category === "All pieces" ? "All pieces" : category;
  renderFilters();
  renderProducts();
  document.querySelectorAll("[data-category-link]").forEach(link => link.classList.toggle("active", link.dataset.categoryLink===category));
}

function renderProducts(){
  const sort = document.querySelector("#sortSelect").value;
  let items = PRODUCTS.filter(product => (activeCategory==="All pieces" || product.category===activeCategory) && `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(searchTerm));
  if(sort==="low") items.sort((a,b)=>a.price-b.price);
  if(sort==="high") items.sort((a,b)=>b.price-a.price);
  productGrid.innerHTML = items.map(productCard).join("");
  document.querySelector("#emptyState").hidden = items.length > 0;
  productGrid.querySelectorAll("[data-buy]").forEach(button => button.addEventListener("click", () => openOrder(button.dataset.buy)));
  productGrid.querySelectorAll("[data-like]").forEach(button => button.addEventListener("click", () => toggleLike(button.dataset.like, button)));
}

function productCard(product){
  const discount = Math.round((1-product.price/product.compareAt)*100);
  const photo = product.image ? `<img class="product-photo" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">` : "";
  const hint = product.image ? "" : `<span class="image-edit-hint">Add your product photo here</span>`;
  const shades = product.shades.map(color => `<i style="background:${color}" aria-hidden="true"></i>`).join("");
  return `<article class="product-card"><div class="product-visual${product.image?"":" no-photo"}" data-kind="${product.kind}" style="--product-bg:${product.bg};--product-gradient:${product.bg};--silhouette:${product.color}">${photo}<span class="product-label">${escapeHtml(product.tag)}</span><button class="heart-button${likedProducts.has(product.sku)?" is-liked":""}" type="button" data-like="${product.sku}" aria-label="${likedProducts.has(product.sku)?"Remove from":"Add to"} favourites">${likedProducts.has(product.sku)?"♥":"♡"}</button>${hint}<button class="quick-buy" type="button" data-buy="${product.sku}">CHOOSE YOUR SIZE <span aria-hidden="true">↗</span></button></div><div class="product-info"><span class="product-category">${escapeHtml(product.category)}</span><h3 class="product-name">${escapeHtml(product.name)}</h3><div class="price-row"><span class="price-current">${money(product.price)}</span><span class="price-old">${money(product.compareAt)}</span><span class="price-off">${discount}% off</span></div><div class="product-meta"><span>Sizes ${product.sizes[0]==="Free size"?"Free size":"XS–XXL"}</span><span class="swatch-dots" aria-label="Available colour options">${shades}</span></div></div></article>`;
}

function toggleLike(sku, button){
  likedProducts.has(sku) ? likedProducts.delete(sku) : likedProducts.add(sku);
  button.classList.toggle("is-liked", likedProducts.has(sku));
  button.textContent = likedProducts.has(sku) ? "♥" : "♡";
  button.setAttribute("aria-label", `${likedProducts.has(sku)?"Remove from":"Add to"} favourites`);
}

function openOrder(sku){
  selectedProduct = PRODUCTS.find(product => product.sku===sku);
  if(!selectedProduct) return;
  const visual = document.querySelector("#dialogProduct");
  visual.style.background = selectedProduct.bg;
  visual.innerHTML = `${selectedProduct.image?`<img src="${escapeHtml(selectedProduct.image)}" alt="">`:""}<div class="dialog-product-copy"><small>${escapeHtml(selectedProduct.category)} · ${escapeHtml(selectedProduct.sku)}</small><strong>${escapeHtml(selectedProduct.name)}</strong><span>${money(selectedProduct.price)}</span></div>`;
  document.querySelector("#orderSku").value = selectedProduct.sku;
  document.querySelector("#orderProductName").value = selectedProduct.name;
  document.querySelector("#orderCategory").value = selectedProduct.category;
  document.querySelector("#formMessage").textContent = "";
  const size = document.querySelector("#productSize");
  size.innerHTML = selectedProduct.sizes.map(value=>`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  orderDialog.showModal();
}

function submitOrder(event){
  event.preventDefault();
  if(!orderForm.reportValidity()) return;
  if(!STORE.orderEndpoint.trim()){
    document.querySelector("#formMessage").textContent = "Preview only: add your Google Apps Script web-app URL in script.js before taking real orders. No details were sent or saved.";
    return;
  }
  const cleanEndpoint = STORE.orderEndpoint.trim();
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[^\s]+\/exec(?:\?.*)?$/.test(cleanEndpoint)){
    document.querySelector("#formMessage").textContent = "Please add the Google Apps Script web-app URL ending in /exec in script.js.";
    return;
  }
  orderForm.action = cleanEndpoint;
  orderForm.method = "POST";
  orderForm.target = "_self";
  orderForm.submit();
}

function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}

function showToast(message){
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2300);
}

renderCategoryNav();
renderCategoryTiles();
renderFilters();
renderProducts();
document.querySelector("#currentYear").textContent = new Date().getFullYear();
document.querySelector("#sortSelect").addEventListener("change", renderProducts);
document.querySelector("#searchInput").addEventListener("input", event=>{searchTerm=event.target.value.trim().toLowerCase();renderProducts();});
document.querySelector("#mobileSearchButton").addEventListener("click",()=>{const header=document.querySelector(".site-header");const input=document.querySelector("#searchInput");const isOpen=header.classList.toggle("search-is-open");if(isOpen)input.focus();else input.blur();});
document.querySelector("#menuButton").addEventListener("click",()=>document.querySelector("#categoryNav").scrollIntoView({behavior:"smooth",block:"start"}));
document.querySelector("#closeDialog").addEventListener("click",()=>orderDialog.close());
orderDialog.addEventListener("click",event=>{if(event.target===orderDialog)orderDialog.close();});
orderForm.addEventListener("submit",submitOrder);
