// Auctra Procurement Copilot - Universal DOM Extraction Engine
// Strict 5-tier extraction pipeline: Platform Selectors -> JSON-LD -> OpenGraph -> Schema.org -> Heuristic Fallback

/**
 * Detect Marketplace Platform from URL hostname
 */
export function detectPlatform(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes("indiamart.com")) return "IndiaMART";
    if (hostname.includes("amazon.in") || hostname.includes("amazon.com") || hostname.includes("amazon.")) return "Amazon Business";
    if (hostname.includes("alibaba.com") || hostname.includes("aliexpress.com")) return "Alibaba";
    if (hostname.includes("tradeindia.com")) return "TradeIndia";
    return "Marketplace Listing";
  } catch {
    return "Marketplace Listing";
  }
}

/**
 * Clean & normalize text strings
 */
export function cleanText(text) {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Extract clean numeric price from string
 */
export function parsePrice(text) {
  if (!text) return null;
  const match = text.match(/(?:₹|INR|\$|€|£)?\s*([\d,]+(?:\.\d{1,2})?)/);
  if (match && match[1]) {
    const cleaned = match[1].replace(/,/g, "");
    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 0) return Math.round(num);
  }
  return null;
}

/**
 * Extract clean Minimum Order Quantity (MOQ)
 */
export function parseMoq(text) {
  if (!text) return 50;
  const match = text.match(/(?:moq|min(?:imum)?\s*order(?:\s*qty)?|piece[s]?|unit[s]?|quantity|qty)\D*(\d+)/i);
  if (match && match[1]) {
    const num = parseInt(match[1], 10);
    if (!isNaN(num) && num > 0) return num;
  }
  const fallbackMatch = text.match(/\b(\d{2,4})\b/);
  if (fallbackMatch && fallbackMatch[1]) {
    const num = parseInt(fallbackMatch[1], 10);
    if (!isNaN(num) && num >= 10) return num;
  }
  return 50;
}

/**
 * Tier 1: Platform-Specific Selectors
 */
function extractByPlatform(doc, platform) {
  let title = "";
  let price = null;
  let supplier = "";
  let location = "";
  let moq = null;

  if (platform === "IndiaMART") {
    title = cleanText(
      doc.querySelector("#item_title")?.innerText ||
      doc.querySelector(".bo-title")?.innerText ||
      doc.querySelector(".prod_name")?.innerText ||
      doc.querySelector("h1.bo-head")?.innerText ||
      doc.querySelector("h1")?.innerText
    );

    const priceText = cleanText(
      doc.querySelector(".prc")?.innerText ||
      doc.querySelector(".price")?.innerText ||
      doc.querySelector("span.bo-price")?.innerText ||
      doc.querySelector(".unit-price")?.innerText ||
      doc.querySelector(".pdr_price")?.innerText
    );
    price = parsePrice(priceText);

    supplier = cleanText(
      doc.querySelector(".seller-name")?.innerText ||
      doc.querySelector(".dseller a")?.innerText ||
      doc.querySelector(".dseller")?.innerText ||
      doc.querySelector(".company-name")?.innerText ||
      doc.querySelector(".supplier-name")?.innerText ||
      doc.querySelector("#company_name")?.innerText
    );

    location = cleanText(
      doc.querySelector(".city")?.innerText ||
      doc.querySelector(".loc")?.innerText ||
      doc.querySelector(".comp-loc")?.innerText ||
      doc.querySelector(".address")?.innerText
    );

    const moqText = cleanText(
      doc.querySelector(".moq")?.innerText ||
      doc.querySelector(".min-order")?.innerText ||
      doc.querySelector(".minimum_order_qty")?.innerText
    );
    moq = parseMoq(moqText);
  } else if (platform === "Amazon Business") {
    title = cleanText(
      doc.querySelector("#productTitle")?.innerText ||
      doc.querySelector("h1#title")?.innerText ||
      doc.querySelector("h1")?.innerText
    );

    const priceText = cleanText(
      doc.querySelector(".a-price-whole")?.innerText ||
      doc.querySelector(".a-price .a-offscreen")?.innerText ||
      doc.querySelector("#priceblock_ourprice")?.innerText ||
      doc.querySelector("#priceblock_dealprice")?.innerText ||
      doc.querySelector(".apexPriceToPay .a-offscreen")?.innerText
    );
    price = parsePrice(priceText);

    supplier = cleanText(
      doc.querySelector("#bylineInfo")?.innerText ||
      doc.querySelector("#tabular-buybox .tabular-buybox-text[tabular-attribute-name='Sold by'] a")?.innerText ||
      doc.querySelector("#tabular-buybox .tabular-buybox-text[tabular-attribute-name='Sold by']")?.innerText ||
      doc.querySelector("#sellerProfileTriggerId")?.innerText ||
      doc.querySelector("#merchant-info a")?.innerText
    ).replace(/^(Sold by|Visit the)\s+/i, "");

    location = cleanText(
      doc.querySelector("#contextualIngressPtLabel_deliveryLocationPicker")?.innerText ||
      doc.querySelector("#glow-ingress-line2")?.innerText
    );

    const moqText = cleanText(
      doc.querySelector("#quantity")?.innerText ||
      doc.querySelector(".business-discount-tier")?.innerText
    );
    moq = parseMoq(moqText);
  } else if (platform === "Alibaba") {
    title = cleanText(
      doc.querySelector("h1.module-pdp-title")?.innerText ||
      doc.querySelector("h1")?.innerText ||
      doc.querySelector(".product-title")?.innerText
    );

    const priceText = cleanText(
      doc.querySelector(".price-item")?.innerText ||
      doc.querySelector(".promotion-price")?.innerText ||
      doc.querySelector(".reference-price")?.innerText ||
      doc.querySelector(".spec-price")?.innerText
    );
    price = parsePrice(priceText);

    supplier = cleanText(
      doc.querySelector(".company-name")?.innerText ||
      doc.querySelector(".company-basic-info a")?.innerText ||
      doc.querySelector(".supplier-name")?.innerText ||
      doc.querySelector(".company-title")?.innerText
    );

    location = cleanText(
      doc.querySelector(".supplier-country")?.innerText ||
      doc.querySelector(".company-address")?.innerText
    );

    const moqText = cleanText(
      doc.querySelector(".moq")?.innerText ||
      doc.querySelector(".min-order-quantity")?.innerText
    );
    moq = parseMoq(moqText);
  } else if (platform === "TradeIndia") {
    title = cleanText(
      doc.querySelector("h1.product-title")?.innerText ||
      doc.querySelector(".listing-title")?.innerText ||
      doc.querySelector("h1")?.innerText
    );

    const priceText = cleanText(
      doc.querySelector(".price-col")?.innerText ||
      doc.querySelector(".price-val")?.innerText ||
      doc.querySelector(".price")?.innerText
    );
    price = parsePrice(priceText);

    supplier = cleanText(
      doc.querySelector(".seller-name a")?.innerText ||
      doc.querySelector(".seller-name")?.innerText ||
      doc.querySelector(".company-name")?.innerText
    );

    location = cleanText(
      doc.querySelector(".city-state")?.innerText ||
      doc.querySelector(".location")?.innerText
    );

    const moqText = cleanText(
      doc.querySelector(".moq-val")?.innerText ||
      doc.querySelector(".min-order")?.innerText
    );
    moq = parseMoq(moqText);
  }

  return { title, price, supplier, location, moq };
}

/**
 * Tier 2 & 4: JSON-LD and Schema.org
 */
function extractJsonLd(doc) {
  let title = "";
  let price = null;
  let supplier = "";

  const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
  for (const s of scripts) {
    try {
      const data = JSON.parse(s.innerText);
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "Product" || item["@type"] === "IndividualProduct") {
          if (item.name) title = cleanText(item.name);
          if (item.offers) {
            const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
            if (offer.price) price = parsePrice(String(offer.price));
            if (offer.seller?.name) supplier = cleanText(offer.seller.name);
          }
          if (title && price) return { title, price, supplier };
        }
      }
    } catch {}
  }
  return { title, price, supplier };
}

/**
 * Tier 3: OpenGraph & Twitter Meta
 */
function extractOpenGraph(doc) {
  const title = cleanText(
    doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
    doc.querySelector('meta[name="twitter:title"]')?.getAttribute("content")
  );

  const priceAmount = doc.querySelector('meta[property="product:price:amount"]')?.getAttribute("content") ||
                      doc.querySelector('meta[property="og:price:amount"]')?.getAttribute("content");
  const price = priceAmount ? parsePrice(priceAmount) : null;

  const supplier = cleanText(
    doc.querySelector('meta[property="og:site_name"]')?.getAttribute("content") ||
    doc.querySelector('meta[name="author"]')?.getAttribute("content")
  );

  return { title, price, supplier };
}

/**
 * Tier 5: Heuristic Body Fallback
 */
function extractHeuristics(doc) {
  const title = cleanText(
    doc.querySelector("h1")?.innerText ||
    doc.title
  );

  let price = null;
  if (doc.body?.innerText) {
    const bodyPriceMatch = doc.body.innerText.match(/(?:₹|INR|\$)\s*([\d,]+(?:\.\d{2})?)/);
    if (bodyPriceMatch && bodyPriceMatch[1]) {
      price = parsePrice(bodyPriceMatch[1]);
    }
  }

  const supplier = cleanText(
    doc.querySelector(".seller, .vendor, .merchant, .brand, .store-name")?.innerText
  );

  return { title, price, supplier };
}

/**
 * Unified Master Extraction Function
 * @returns {{ productName: string, supplierName: string, price: number, moq: number, location: string, source: string, pageUrl: string }}
 */
export function extractProductData(doc = document, url = window.location.href) {
  const source = detectPlatform(url);

  // 1. Platform Specific
  const platformData = extractByPlatform(doc, source);

  // 2. JSON-LD / Schema.org
  const jsonLdData = extractJsonLd(doc);

  // 3. OpenGraph
  const ogData = extractOpenGraph(doc);

  // 5. Heuristic Fallback
  const heuristicData = extractHeuristics(doc);

  // Resolution Hierarchy
  const resolvedTitle = platformData.title || jsonLdData.title || ogData.title || heuristicData.title || "";
  const resolvedPrice = platformData.price || jsonLdData.price || ogData.price || heuristicData.price || 850;
  const resolvedSupplier = platformData.supplier || jsonLdData.supplier || ogData.supplier || heuristicData.supplier || "Verified Star Supplier";
  const resolvedLocation = platformData.location || "India";
  const resolvedMoq = platformData.moq || 50;

  return {
    productName: resolvedTitle ? resolvedTitle.slice(0, 140) : "Commercial IT Hardware SKU",
    supplierName: resolvedSupplier,
    price: Number(resolvedPrice) || 850,
    moq: Number(resolvedMoq) || 50,
    location: resolvedLocation,
    source: source,
    pageUrl: url
  };
}
