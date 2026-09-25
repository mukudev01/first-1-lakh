/*
  KUBER BOUTIQUE — GOOGLE SHEETS ORDER RECEIVER

  SETUP:
  1. Open your Google Sheet, then Extensions > Apps Script.
  2. Replace the editor contents with this file.
  3. Paste your Sheet ID below (the part between /d/ and /edit in the Sheet URL).
  4. Add a hosted payment URL beside each SKU after creating it with your provider.
  5. Deploy > New deployment > Web app. Execute as: Me. Access: Anyone.
  6. Copy the deployed URL ending in /exec into STORE.orderEndpoint in script.js.

  Product names and prices here match the sample storefront. Update both files if
  you change a product or price. Payment links must charge the amount shown here.
*/
const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const SHEET_TAB = "Orders";
const ORDER_PRODUCTS = {
  "KB-SAR-01": { name:"Kardana Jamdani Saree — Mustard", category:"Sarees", price:3290, paymentUrl:"" },
  "KB-SAR-02": { name:"Kardana Jamdani Saree — Ivory Rust", category:"Sarees", price:3490, paymentUrl:"" },
  "KB-SAR-03": { name:"Kardana Jamdani Saree — Teal Plum", category:"Sarees", price:3690, paymentUrl:"" },
  "KB-SAR-04": { name:"Blush Floral Saree", category:"Sarees", price:2990, paymentUrl:"" },
  "KB-SAR-05": { name:"Ruby Embroidered Saree", category:"Sarees", price:3990, paymentUrl:"" },
  "KB-LEH-01": { name:"Blush Shimmer Tiered Lehenga", category:"Lehengas", price:4990, paymentUrl:"" },
  "KB-LEH-02": { name:"Gopi Lehenga Choli with Dupatta", category:"Lehengas", price:2790, paymentUrl:"" },
  "KB-DRS-01": { name:"Floral Cotton Square-Neck Skater Dress", category:"Dresses", price:1590, paymentUrl:"" },
  "KB-DRS-02": { name:"Floral Rayon Midi Dress", category:"Dresses", price:1890, paymentUrl:"" },
  "KB-DRS-03": { name:"Floral Print Fit-and-Flare Dress", category:"Dresses", price:1690, paymentUrl:"" },
  "KB-BLO-01": { name:"Luxury Floral Print Blouse", category:"Blouses", price:1290, paymentUrl:"" },
  "KB-BLO-02": { name:"Shiny Puff Sleeve Blouse", category:"Blouses", price:1490, paymentUrl:"" },
  "KB-BLO-03": { name:"Emerald Puff-Sleeve Blouse", category:"Blouses", price:1390, paymentUrl:"" },
  "KB-BLO-04": { name:"Wine Printed Sleeveless Blouse", category:"Blouses", price:1190, paymentUrl:"" },
  "KB-SET-01": { name:"Mustard Embroidered Co-ord Set", category:"Co-ord sets", price:1990, paymentUrl:"" },
  "KB-SET-02": { name:"White Floral Thread-Work Co-ord Set", category:"Co-ord sets", price:1890, paymentUrl:"" },
  "KB-BOT-01": { name:"Wide-Leg Korean Pants", category:"Bottoms", price:1190, paymentUrl:"" }
};

function doPost(e) {
  try {
    if (!SHEET_ID || SHEET_ID === "PASTE_GOOGLE_SHEET_ID_HERE") throw new Error("The store owner still needs to connect the order Sheet.");
    const form = (e && e.parameter) || {};
    const product = ORDER_PRODUCTS[form.sku];
    if (!product) throw new Error("This product is no longer available. Please contact the boutique.");
    const name = required_(form.customerName, "Please enter your name.");
    const phone = required_(form.customerPhone, "Please enter a phone number.");
    const address = required_(form.customerAddress, "Please enter a delivery address.");
    const pincode = required_(form.pincode, "Please enter a PIN code.");
    const size = String(form.size || "One size").slice(0, 24);
    const orderId = "KB-" + Utilities.getUuid().slice(0, 8).toUpperCase();
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_TAB) || spreadsheet.insertSheet(SHEET_TAB);
    if (sheet.getLastRow() === 0) sheet.appendRow(["Order ID","Submitted at","SKU","Product","Category","Price (INR)","Size","Customer name","Phone","Delivery address","PIN code","Payment status"]);
    sheet.appendRow([orderId,new Date(),form.sku,product.name,product.category,product.price,size,name,phone,address,pincode,"Awaiting payment"]);
    return paymentPage_(orderId, product);
  } catch (error) {
    return HtmlService.createHtmlOutput("<main style='font:16px Arial,sans-serif;max-width:560px;margin:12vh auto;padding:24px;color:#292725'><p style='letter-spacing:.16em;font-size:11px;color:#92765b'>KUBER BOUTIQUE</p><h1 style='font:32px Georgia,serif'>We couldn't place this order yet.</h1><p>" + escape_(error.message || "Please try again.") + "</p><p>Please go back to the boutique and check the form details, or contact the store.</p></main>").setTitle("Kuber Boutique order");
  }
}

function paymentPage_(orderId, product) {
  const hasLink = /^https:\/\//i.test(product.paymentUrl || "");
  const action = hasLink
    ? "<p>Your order details are saved. Complete payment to confirm the order.</p><a href='" + escape_(product.paymentUrl) + "' style='display:inline-block;background:#292725;color:#fff;padding:14px 20px;text-decoration:none;margin-top:10px'>Pay ₹" + product.price + " securely ↗</a>"
    : "<p>Your order details are saved. The store still needs to add a payment link for this item, so payment is not available yet. Please contact Kuber Boutique before your order is confirmed.</p>";
  const html = "<!doctype html><html><meta name='viewport' content='width=device-width, initial-scale=1'><body style='background:#fbf8f2;font:15px Arial,sans-serif;color:#292725'><main style='max-width:570px;margin:9vh auto;padding:32px;background:#fff'><p style='letter-spacing:.16em;font-size:11px;color:#92765b'>KUBER BOUTIQUE</p><h1 style='font:36px Georgia,serif;margin-bottom:8px'>Thank you for your order.</h1><p style='color:#777'>Order reference <strong>" + escape_(orderId) + "</strong></p><p><strong>" + escape_(product.name) + "</strong> · ₹" + product.price + "</p>" + action + "<p style='font-size:12px;color:#777;margin-top:28px'>Your order is pending until payment is completed and confirmed.</p></main></body></html>";
  return HtmlService.createHtmlOutput(html).setTitle("Kuber Boutique order");
}

function required_(value, message) {
  const text = String(value || "").trim();
  if (!text) throw new Error(message);
  return text.slice(0, 300);
}

function escape_(value) {
  return String(value).replace(/[&<>"']/g, function(char) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}
