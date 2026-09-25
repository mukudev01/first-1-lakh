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

const CATEGORIES = ["All pieces", "Sarees", "Lehengas", "Dresses", "Blouses", "Co-ord sets", "Bottoms"];

const PRODUCTS = [
  { sku:"KB-SAR-01", name:"Kardana Jamdani Saree — Mustard", category:"Sarees", price:3290, compareAt:3990, tag:"Festive favourite", color:"#8c7a2e", bg:"linear-gradient(145deg,#e8d9a8,#7f7a3f)", image:"images/saree-mustard-front.png", kind:"saree", sizes:["Free size"], shades:["#b99a2f","#5c6b3f","#8a5a3a"] },
  { sku:"KB-SAR-02", name:"Kardana Jamdani Saree — Ivory Rust", category:"Sarees", price:3490, compareAt:4190, tag:"New in", color:"#b6704a", bg:"linear-gradient(145deg,#efe4d0,#c48a5f)", image:"images/saree-ivory-front.png", imageBack:"images/saree-ivory-back.png", kind:"saree", sizes:["Free size"], shades:["#c1603a","#e9dfc9"] },
  { sku:"KB-SAR-03", name:"Kardana Jamdani Saree — Teal Plum", category:"Sarees", price:3690, compareAt:4390, tag:"Statement drape", color:"#146a63", bg:"linear-gradient(145deg,#bcd6d1,#146a63)", image:"images/saree-teal-front.jpg", imageBack:"images/saree-teal-back.png", kind:"saree", sizes:["Free size"], shades:["#146a63","#5c3160","#b8434a"] },
  { sku:"KB-SAR-04", name:"Blush Floral Saree", category:"Sarees", price:2990, compareAt:3590, tag:"Soft occasionwear", color:"#be7582", bg:"linear-gradient(145deg,#f0d9dc,#be7582)", image:"images/saree-pink.webp", kind:"saree", sizes:["Free size"], shades:["#cb8390"] },
  { sku:"KB-SAR-05", name:"Ruby Embroidered Saree", category:"Sarees", price:3990, compareAt:4790, tag:"The occasion edit", color:"#9d183b", bg:"linear-gradient(145deg,#ecd7d0,#9d183b)", image:"images/saree-red.webp", kind:"saree", sizes:["Free size"], shades:["#9d183b"] },
  { sku:"KB-LEH-01", name:"Blush Shimmer Tiered Lehenga", category:"Lehengas", price:4990, compareAt:5990, tag:"Bridesmaid pick", color:"#c98fb0", bg:"linear-gradient(145deg,#f1dbe8,#c98fb0)", image:"images/lehenga-blush-front.png", imageBack:"images/lehenga-blush-back.png", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#c98fb0","#e7c9dc"] },
  { sku:"KB-LEH-02", name:"Gopi Lehenga Choli with Dupatta", category:"Lehengas", price:2790, compareAt:3290, tag:"Festive favourite", color:"#b3272c", bg:"linear-gradient(145deg,#efe3c9,#b3272c)", image:"images/lehenga-gopi.jpg", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#b3272c","#e8dcc0"] },
  { sku:"KB-DRS-01", name:"Floral Cotton Square-Neck Skater Dress", category:"Dresses", price:1590, compareAt:1990, tag:"Date night", color:"#1c1c1c", bg:"linear-gradient(145deg,#3a2b33,#1c1c1c)", image:"images/dress-skater-front.png", imageBack:"images/dress-skater-back.png", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#1c1c1c","#c23b6b","#2f8f6b"] },
  { sku:"KB-DRS-02", name:"Floral Rayon Midi Dress", category:"Dresses", price:1890, compareAt:2290, tag:"Everyday elegance", color:"#241f1d", bg:"linear-gradient(145deg,#3c2b2c,#241f1d)", image:"images/dress-midi-front.png", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#241f1d","#b06a76"] },
  { sku:"KB-DRS-03", name:"Floral Print Fit-and-Flare Dress", category:"Dresses", price:1690, compareAt:2090, tag:"Colourful pick", color:"#284248", bg:"linear-gradient(145deg,#c38a54,#284248)", image:"images/dress-floral-mini.jpg", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#284248"] },
  { sku:"KB-BLO-01", name:"Luxury Floral Print Blouse", category:"Blouses", price:1290, compareAt:1590, tag:"Pair with any saree", color:"#8a2f4e", bg:"linear-gradient(145deg,#ecd9c4,#8a2f4e)", image:"images/blouse-luxury-floral.jpg", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#8a2f4e","#2f5fa8","#c9a227"] },
  { sku:"KB-BLO-02", name:"Shiny Puff Sleeve Blouse", category:"Blouses", price:1490, compareAt:1790, tag:"New in", color:"#b492c9", bg:"linear-gradient(145deg,#ecdcf1,#b492c9)", image:"images/blouse-shiny-puff.jpg", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#b492c9"] },
  { sku:"KB-BLO-03", name:"Emerald Puff-Sleeve Blouse", category:"Blouses", price:1390, compareAt:1690, tag:"A jewel-tone pick", color:"#0c5047", bg:"linear-gradient(145deg,#c8d8cf,#0c5047)", image:"images/blouse-emerald.jpg", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#0c5047"] },
  { sku:"KB-BLO-04", name:"Wine Printed Sleeveless Blouse", category:"Blouses", price:1190, compareAt:1490, tag:"Made to mix", color:"#64233e", bg:"linear-gradient(145deg,#e4c9c5,#64233e)", image:"images/blouse-wine.jpg", kind:"kurti", sizes:["S","M","L","XL","XXL"], shades:["#64233e"] },
  { sku:"KB-SET-01", name:"Mustard Embroidered Co-ord Set", category:"Co-ord sets", price:1990, compareAt:2390, tag:"Easy days", color:"#c9a227", bg:"linear-gradient(145deg,#efe0a6,#c9a227)", image:"images/coord-mustard.webp", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#c9a227","#2b2b2b"] },
  { sku:"KB-SET-02", name:"White Floral Thread-Work Co-ord Set", category:"Co-ord sets", price:1890, compareAt:2290, tag:"Soft statement", color:"#dedace", bg:"linear-gradient(145deg,#f0eee6,#bdb9aa)", image:"images/coord-white.webp", kind:"set", sizes:["S","M","L","XL","XXL"], shades:["#e6e1d5"] },
  { sku:"KB-BOT-01", name:"Wide-Leg Korean Pants", category:"Bottoms", price:1190, compareAt:1490, tag:"Everyday pick", color:"#cbb99a", bg:"linear-gradient(145deg,#efe8db,#cbb99a)", image:"images/pants-korean.jpg", kind:"mens", sizes:["S","M","L","XL","XXL"], shades:["#cbb99a"] }
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
  const overlay = "linear-gradient(180deg,rgba(20,15,12,.05),rgba(20,15,12,.62))";
  const tileData = [
    {name:"Sarees", image:"images/saree-teal-front.jpg"},
    {name:"Lehengas", image:"images/lehenga-gopi.jpg"},
    {name:"Dresses", image:"images/dress-midi-front.png"},
    {name:"Blouses", image:"images/blouse-luxury-floral.jpg"},
    {name:"Co-ord sets", image:"images/coord-white.webp"},
    {name:"Bottoms", image:"images/pants-korean.jpg"}
  ];
  categoryTiles.innerHTML = tileData.map(tile => `<a href="#collection" class="category-tile" data-tile-category="${escapeHtml(tile.name)}" style="--tile-bg:${overlay}, url('${tile.image}') center/cover no-repeat;--tile-shape:transparent"><span class="tile-label">${escapeHtml(tile.name)}</span><span class="tile-arrow" aria-hidden="true">↗</span></a>`).join("");
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
  const frontPhoto = product.image ? `<img class="product-photo" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">` : "";
  const backPhoto = product.imageBack ? `<img class="product-photo product-photo-back" src="${escapeHtml(product.imageBack)}" alt="" loading="lazy" aria-hidden="true">` : "";
  const hint = product.image ? "" : `<span class="image-edit-hint">Add your product photo here</span>`;
  const shades = product.shades.map(color => `<i style="background:${color}" aria-hidden="true"></i>`).join("");
  return `<article class="product-card"><div class="product-visual${product.image?"":" no-photo"}" data-kind="${product.kind}" style="--product-bg:${product.bg};--product-gradient:${product.bg};--silhouette:${product.color}">${frontPhoto}${backPhoto}<span class="product-label">${escapeHtml(product.tag)}</span><button class="heart-button${likedProducts.has(product.sku)?" is-liked":""}" type="button" data-like="${product.sku}" aria-label="${likedProducts.has(product.sku)?"Remove from":"Add to"} favourites">${likedProducts.has(product.sku)?"♥":"♡"}</button>${hint}<button class="quick-buy" type="button" data-buy="${product.sku}">CHOOSE YOUR SIZE <span aria-hidden="true">↗</span></button></div><div class="product-info"><span class="product-category">${escapeHtml(product.category)}</span><h3 class="product-name">${escapeHtml(product.name)}</h3><div class="price-row"><span class="price-current">${money(product.price)}</span><span class="price-old">${money(product.compareAt)}</span><span class="price-off">${discount}% off</span></div><div class="product-meta"><span>Sizes ${product.sizes[0]==="Free size"?"Free size":"XS–XXL"}</span><span class="swatch-dots" aria-label="Available colour options">${shades}</span></div></div></article>`;
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

