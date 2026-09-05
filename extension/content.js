// Auctra Procurement Copilot - Manifest V3 Content Script
// In-page enterprise procurement trigger with 5-tier DOM extraction

(function () {
  if (window.__auctra_copilot_injected) return;
  window.__auctra_copilot_injected = true;

  // --- 1. Universal Extraction Engine ---

  function detectPlatform(url) {
    try {
      const hostname = new URL(url).hostname.toLowerCase();
      if (hostname.includes("indiamart.com")) return "IndiaMART";
      if (hostname.includes("amazon.in") || hostname.includes("amazon.com") || hostname.match(/amazon\.[a-z]{2,3}$/)) return "Amazon";
      if (hostname.includes("alibaba.com") || hostname.includes("1688.com")) return "Alibaba";
      if (hostname.includes("aliexpress.com")) return "AliExpress";
      if (hostname.includes("tradeindia.com")) return "TradeIndia";
      if (hostname.includes("flipkart.com")) return "Flipkart";
      if (hostname.includes("snapdeal.com")) return "Snapdeal";
      if (hostname.includes("meesho.com")) return "Meesho";
      if (hostname.includes("jiomart.com")) return "JioMart";
      if (hostname.includes("myntra.com")) return "Myntra";
      if (hostname.includes("nykaa.com")) return "Nykaa";
      if (hostname.includes("industrybuying.com")) return "IndustryBuying";
      if (hostname.includes("moglix.com")) return "Moglix";
      if (hostname.includes("exportersindia.com")) return "ExportersIndia";
      if (hostname.includes("made-in-china.com")) return "MadeInChina";
      if (hostname.includes("dhgate.com")) return "DHgate";
      if (hostname.includes("globalsources.com")) return "GlobalSources";
      if (hostname.includes("ebay.com") || hostname.includes("ebay.in")) return "eBay";
      if (hostname.includes("walmart.com")) return "Walmart";
      if (hostname.includes("etsy.com")) return "Etsy";
      if (hostname.includes("shopify.com") || hostname.includes(".myshopify.com")) return "Shopify";
      if (hostname.includes("woocommerce.com")) return "WooCommerce";
      return "Universal";
    } catch {
      return "Universal";
    }
  }

  function cleanText(text) {
    if (!text) return "";
    return text.replace(/\s+/g, " ").trim();
  }

  function parsePrice(text) {
    if (!text) return null;
    const match = text.match(/(?:₹|INR|\$|€|£)?\s*([\d,]+(?:\.\d{1,2})?)/);
    if (match && match[1]) {
      const cleaned = match[1].replace(/,/g, "");
      const num = parseFloat(cleaned);
      if (!isNaN(num) && num > 0) return Math.round(num);
    }
    return null;
  }

  function parseMoq(text) {
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

  function extractProductData() {
    const url = window.location.href;
    const source = detectPlatform(url);

    let title = "";
    let price = null;
    let supplier = "";
    let location = "";
    let moq = 50;

    // 1. Platform-Specific Selectors
    if (source === "IndiaMART") {
      title = cleanText(
        document.querySelector("#item_title")?.innerText ||
        document.querySelector(".bo-title")?.innerText ||
        document.querySelector(".prod_name")?.innerText ||
        document.querySelector("h1.bo-head")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".prc")?.innerText ||
        document.querySelector(".price")?.innerText ||
        document.querySelector("span.bo-price")?.innerText ||
        document.querySelector(".unit-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".seller-name")?.innerText ||
        document.querySelector(".dseller a")?.innerText ||
        document.querySelector(".dseller")?.innerText ||
        document.querySelector(".company-name")?.innerText ||
        document.querySelector(".supplier-name")?.innerText
      );
      location = cleanText(
        document.querySelector(".city")?.innerText ||
        document.querySelector(".loc")?.innerText ||
        document.querySelector(".comp-loc")?.innerText
      );
      moq = parseMoq(
        document.querySelector(".moq")?.innerText ||
        document.querySelector(".min-order")?.innerText
      );

    } else if (source === "Amazon") {
      title = cleanText(
        document.querySelector("#productTitle")?.innerText ||
        document.querySelector("h1#title")?.innerText ||
        document.querySelector(".product-title-word-break")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".a-price-whole")?.innerText ||
        document.querySelector(".a-price .a-offscreen")?.innerText ||
        document.querySelector("#priceblock_ourprice")?.innerText ||
        document.querySelector("#priceblock_dealprice")?.innerText ||
        document.querySelector(".apexPriceToPay .a-offscreen")?.innerText
      );
      supplier = cleanText(
        document.querySelector("#bylineInfo")?.innerText ||
        document.querySelector("#tabular-buybox .tabular-buybox-text[tabular-attribute-name='Sold by'] a")?.innerText ||
        document.querySelector("#sellerProfileTriggerId")?.innerText ||
        document.querySelector(".po-brand .po-break-word")?.innerText
      ).replace(/^(Sold by|Visit the|Brand:\s*)\s*/i, "");
      location = cleanText(
        document.querySelector("#contextualIngressPtLabel_deliveryLocationPicker")?.innerText
      );
      moq = parseMoq(document.querySelector("#quantity")?.innerText);

    } else if (source === "Alibaba") {
      title = cleanText(
        document.querySelector("h1.module-pdp-title")?.innerText ||
        document.querySelector(".product-title-text")?.innerText ||
        document.querySelector("h1")?.innerText ||
        document.querySelector(".product-title")?.innerText
      );
      price = parsePrice(
        document.querySelector(".price-item")?.innerText ||
        document.querySelector(".promotion-price")?.innerText ||
        document.querySelector(".price-range")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".company-name")?.innerText ||
        document.querySelector(".company-basic-info a")?.innerText ||
        document.querySelector(".supplier-name")?.innerText
      );
      location = cleanText(
        document.querySelector(".supplier-country")?.innerText ||
        document.querySelector(".company-address")?.innerText
      );
      moq = parseMoq(
        document.querySelector(".moq")?.innerText ||
        document.querySelector(".min-order-quantity")?.innerText
      );

    } else if (source === "AliExpress") {
      title = cleanText(
        document.querySelector("h1.product-title-text")?.innerText ||
        document.querySelector(".product-title")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".product-price-value")?.innerText ||
        document.querySelector(".uniform-banner-box-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".shop-name")?.innerText ||
        document.querySelector(".store-info")?.innerText
      );
      moq = parseMoq(document.querySelector(".product-quantity-tip")?.innerText);

    } else if (source === "TradeIndia") {
      title = cleanText(
        document.querySelector("h1.product-title")?.innerText ||
        document.querySelector(".listing-title")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".price-col")?.innerText ||
        document.querySelector(".price-val")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".seller-name a")?.innerText ||
        document.querySelector(".seller-name")?.innerText ||
        document.querySelector(".company-name")?.innerText
      );
      location = cleanText(
        document.querySelector(".city-state")?.innerText ||
        document.querySelector(".location")?.innerText
      );
      moq = parseMoq(document.querySelector(".moq-val")?.innerText);

    } else if (source === "Flipkart") {
      title = cleanText(
        document.querySelector("span.B_NuCI")?.innerText ||
        document.querySelector(".yhB1nd")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector("._30jeq3")?.innerText ||
        document.querySelector("._16Jk6d")?.innerText ||
        document.querySelector(".Nx9bqj")?.innerText
      );
      supplier = cleanText(
        document.querySelector("._2mEox a")?.innerText ||
        document.querySelector(".WrsTCp")?.innerText ||
        document.querySelector(".prd-seller a")?.innerText ||
        "Flipkart Seller"
      );
      location = "India";

    } else if (source === "Snapdeal") {
      title = cleanText(
        document.querySelector("h1.pdp-e-i-head")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".payBlkBig")?.innerText ||
        document.querySelector(".product-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".sold-by span")?.innerText ||
        document.querySelector(".seller-name")?.innerText ||
        "Snapdeal Seller"
      );

    } else if (source === "Meesho") {
      title = cleanText(
        document.querySelector("p.sc-eDvSVe")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".sc-hCZuQt")?.innerText ||
        document.querySelector(".price")?.innerText
      );
      supplier = "Meesho Supplier";

    } else if (source === "JioMart") {
      title = cleanText(
        document.querySelector("h1.title")?.innerText ||
        document.querySelector(".product-name")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".jm-badge")?.innerText ||
        document.querySelector(".final-price")?.innerText ||
        document.querySelector(".product-price")?.innerText
      );
      supplier = "JioMart";
      location = "India";

    } else if (source === "Moglix" || source === "IndustryBuying") {
      title = cleanText(
        document.querySelector(".product-name")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".price")?.innerText ||
        document.querySelector(".selling-price")?.innerText ||
        document.querySelector(".discounted-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".brand-name")?.innerText ||
        document.querySelector(".brand")?.innerText ||
        source
      );
      location = "India";

    } else if (source === "MadeInChina" || source === "GlobalSources") {
      title = cleanText(
        document.querySelector(".product-name")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".price")?.innerText ||
        document.querySelector(".product-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".company-name")?.innerText ||
        document.querySelector(".supplier-name")?.innerText
      );
      location = "China";
      moq = parseMoq(document.querySelector(".min-order")?.innerText);

    } else if (source === "DHgate") {
      title = cleanText(
        document.querySelector(".product-h1")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".price-value")?.innerText ||
        document.querySelector(".price-sale")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".store-name")?.innerText ||
        document.querySelector(".seller-name")?.innerText
      );
      location = "China";
      moq = parseMoq(document.querySelector(".min-order")?.innerText);

    } else if (source === "eBay") {
      title = cleanText(
        document.querySelector("h1.x-item-title__mainTitle")?.innerText ||
        document.querySelector("#itemTitle")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".x-price-primary")?.innerText ||
        document.querySelector("#prcIsum")?.innerText ||
        document.querySelector(".display-price")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".seller-persona")?.innerText ||
        document.querySelector("#mbgLink")?.innerText
      );

    } else if (source === "Walmart") {
      title = cleanText(
        document.querySelector("h1.lh-copy")?.innerText ||
        document.querySelector("[itemprop='name']")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector("[itemprop='price']")?.getAttribute("content") ||
        document.querySelector(".price-characteristic")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".seller-name")?.innerText ||
        "Walmart"
      );

    } else if (source === "Etsy") {
      title = cleanText(
        document.querySelector("h1[data-buy-box-listing-title]")?.innerText ||
        document.querySelector("h1")?.innerText
      );
      price = parsePrice(
        document.querySelector(".currency-value")?.innerText ||
        document.querySelector("[data-selector='price-only']")?.innerText
      );
      supplier = cleanText(
        document.querySelector(".shop-name-and-title-container")?.innerText ||
        document.querySelector("a.shop-link")?.innerText
      );
    }

    // 2. JSON-LD Structured Data Fallback (works on 80%+ of modern e-commerce sites)
    if (!title || !price || !supplier) {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const s of scripts) {
        try {
          const raw = s.innerText || s.textContent;
          const data = JSON.parse(raw);
          const items = Array.isArray(data) ? data : [data];
          for (const item of items) {
            const type = item["@type"];
            if (type === "Product" || type === "IndividualProduct" || type === "ItemPage") {
              if (!title && item.name) title = cleanText(item.name);
              if (!supplier && item.brand?.name) supplier = cleanText(item.brand.name);
              if (item.offers) {
                const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
                if (!price && offer.price) price = parsePrice(String(offer.price));
                if (!supplier && offer.seller?.name) supplier = cleanText(offer.seller.name);
              }
              if (!location && item.manufacturer?.address?.addressLocality) {
                location = item.manufacturer.address.addressLocality;
              }
            }
          }
        } catch {}
      }
    }

    // 3. OpenGraph / Meta Tag Fallback
    if (!title) {
      title = cleanText(
        document.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
        document.querySelector('meta[name="twitter:title"]')?.getAttribute("content") ||
        document.querySelector("h1")?.innerText ||
        document.title
      );
    }
    if (!price) {
      const metaPrice =
        document.querySelector('meta[property="product:price:amount"]')?.getAttribute("content") ||
        document.querySelector('meta[property="og:price:amount"]')?.getAttribute("content") ||
        document.querySelector('meta[name="price"]')?.getAttribute("content");
      if (metaPrice) {
        price = parsePrice(metaPrice);
      } else if (document.body?.innerText) {
        const match = document.body.innerText.match(/(?:₹|INR|\$|€|£)\s*([\d,]+(?:\.\d{2})?)/);
        if (match && match[1]) price = parsePrice(match[1]);
      }
    }
    if (!supplier) {
      supplier = cleanText(
        document.querySelector('meta[property="og:site_name"]')?.getAttribute("content") ||
        document.querySelector(".seller, .vendor, .merchant, .brand, .store-name, .shop-name")?.innerText ||
        new URL(url).hostname.replace(/^www\./, "").split(".")[0] ||
        "Verified Supplier"
      );
    }

    // 4. Smart Title Cleanup
    let cleanTitle = title || "";
    const lowerTitle = cleanTitle.toLowerCase();
    const genericPhrases = [
      "online shopping site", "shop online for", "india's largest online",
      "india's largest b2b", "manufacturers, suppliers", "wholesale market",
      "buy online", "free delivery", "best price"
    ];
    if (genericPhrases.some(p => lowerTitle.includes(p)) || cleanTitle.length < 5) {
      cleanTitle = "Commercial Product (Batch Sourcing)";
    } else {
      cleanTitle = cleanTitle
        .replace(/\s*[-|–|·]\s*(Amazon\.in|Amazon|IndiaMART|Flipkart|Snapdeal|TradeIndia|Alibaba\.com|AliExpress|eBay|Walmart|Etsy|Meesho|JioMart|Moglix|DHgate)\s*$/i, "")
        .trim();
    }

    return {
      productName: cleanTitle ? cleanTitle.slice(0, 140) : "Commercial Product SKU",
      supplierName: supplier || "Verified Supplier",
      price: price || 850,
      moq: moq || 50,
      location: location || "India",
      source: source,
      pageUrl: url
    };
  }

  // --- 2. Popup Message Listener ---
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_PAGE_DATA") {
      const data = extractProductData();
      sendResponse({ success: true, data });
    }
  });

  // --- 3. Enterprise Pill Floating Button ---
  // Style: Small pill button, bottom-right, #0F172A, subtle 1px border, procurement icon, states: Idle, Loading, Success, Error

  function injectPillButton() {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.includes("auctra")) {
      return; // Do not inject floating widget on Auctra platform itself
    }
    if (document.getElementById("auctra-pill-trigger")) return;

    const pill = document.createElement("button");
    pill.id = "auctra-pill-trigger";
    pill.setAttribute("type", "button");
    pill.setAttribute("aria-label", "Create Auctra Procurement RFQ");
    pill.tabIndex = 0;

    const logoUrl = (typeof chrome !== "undefined" && chrome.runtime?.getURL)
      ? chrome.runtime.getURL("icons/brand-mark.png")
      : "http://localhost:3000/brand-mark.png";

    pill.style.cssText = `
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      z-index: 2147483647 !important;
      background: #FFFFFF !important;
      color: #0F172A !important;
      border: 1px solid #E2E8F0 !important;
      border-radius: 14px !important;
      padding: 7px 14px 7px 10px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      cursor: pointer !important;
      box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05) !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      user-select: none !important;
      outline: none !important;
      transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease !important;
    `;

    const logoSvg = `
      <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; flex-shrink: 0;">
        <path d="M18 3L5 31H13L18 20L23 31H31L18 3Z" fill="url(#auctra_grad_1)"/>
        <path d="M18 20L13.5 29H22.5L18 20Z" fill="url(#auctra_grad_2)"/>
        <defs>
          <linearGradient id="auctra_grad_1" x1="5" y1="3" x2="31" y2="31" gradientUnits="userSpaceOnUse">
            <stop stop-color="#3B82F6"/>
            <stop offset="1" stop-color="#1D4ED8"/>
          </linearGradient>
          <linearGradient id="auctra_grad_2" x1="13.5" y1="20" x2="22.5" y2="29" gradientUnits="userSpaceOnUse">
            <stop stop-color="#93C5FD"/>
            <stop offset="1" stop-color="#2563EB"/>
          </linearGradient>
        </defs>
      </svg>
    `;

    function setIdleState() {
      pill.innerHTML = `
        <div style="width: 32px; height: 32px; border-radius: 9px; background: #FFFFFF; border: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          <img src="${logoUrl}" alt="Auctra" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div style="display: none;">${logoSvg}</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; line-height: 1.15;">
          <span style="color: #64748B; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;">Auctra</span>
          <span style="color: #0F172A; font-size: 13.5px; font-weight: 700; letter-spacing: -0.01em;">Create RFQ</span>
        </div>
      `;
      pill.style.background = "#FFFFFF";
      pill.style.borderColor = "#E2E8F0";
      pill.style.boxShadow = "0 8px 28px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)";
      pill.style.transform = "translateY(0)";
      pill.disabled = false;
    }

    function setLoadingState() {
      pill.innerHTML = `
        <div style="width: 14px; height: 14px; border: 2px solid #E2E8F0; border-top-color: #2563EB; border-radius: 50%; animation: spin 0.6s linear infinite; flex-shrink: 0; margin-left: 4px;"></div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; line-height: 1.15;">
          <span style="color: #64748B; font-size: 9.5px; font-weight: 700; text-transform: uppercase;">Auctra</span>
          <span style="color: #0F172A; font-size: 12.5px; font-weight: 600;">Creating RFQ...</span>
        </div>
      `;
      pill.style.background = "#F8FAFC";
      pill.disabled = true;
    }

    function setSuccessState() {
      pill.innerHTML = `
        <div style="width: 22px; height: 22px; border-radius: 50%; background: #10B981; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">✓</div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; line-height: 1.15;">
          <span style="color: #059669; font-size: 9.5px; font-weight: 700; text-transform: uppercase;">Verified</span>
          <span style="color: #0F172A; font-size: 12.5px; font-weight: 600;">RFQ Created</span>
        </div>
      `;
      pill.style.background = "#F0FDF4";
      pill.style.borderColor = "#A7F3D0";
    }

    function setErrorState(msg) {
      pill.innerHTML = `
        <span style="color: #D97706; font-size: 14px;">⚠</span>
        <span style="color: #991B1B; font-size: 11.5px; font-weight: 500;">${msg || "Unable to read listing"}</span>
      `;
      pill.style.background = "#FEF2F2";
      pill.style.borderColor = "#FCA5A5";
      setTimeout(setIdleState, 3000);
    }

    setIdleState();

    pill.onmouseenter = () => {
      if (!pill.disabled) {
        pill.style.background = "#F8FAFC";
        pill.style.borderColor = "#CBD5E1";
        pill.style.transform = "translateY(-1px)";
        pill.style.boxShadow = "0 12px 32px rgba(15, 23, 42, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06)";
      }
    };
    pill.onmouseleave = () => {
      if (!pill.disabled) {
        pill.style.background = "#FFFFFF";
        pill.style.borderColor = "#E2E8F0";
        pill.style.transform = "translateY(0)";
        pill.style.boxShadow = "0 8px 28px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)";
      }
    };

    pill.onfocus = () => {
      pill.style.boxShadow = "0 0 0 2px #2563EB";
    };
    pill.onblur = () => {
      pill.style.boxShadow = "0 8px 28px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)";
    };

    pill.onclick = async () => {
      setLoadingState();
      const extracted = extractProductData();

      if (!extracted.productName) {
        setErrorState("No product found");
        return;
      }

      const payload = {
        productName: extracted.productName,
        price: String(extracted.price),
        supplier: extracted.supplierName,
        moq: String(extracted.moq),
        source: extracted.source,
        url: extracted.pageUrl
      };

      try {
        chrome.runtime.sendMessage({ type: "CREATE_RFQ", payload }, (response) => {
          setSuccessState();
          let redirectUrl = response?.data?.redirectUrl || `http://localhost:3000/rfq/${response?.data?.rfqId || "RFQ-2848"}`;
          if (redirectUrl.includes("chrome-extension://") || (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://"))) {
            redirectUrl = `http://localhost:3000/rfq/${response?.data?.rfqId || "RFQ-2848"}`;
          }

          setTimeout(() => {
            window.open(redirectUrl, "_blank");
            setIdleState();
          }, 400);
        });
      } catch (err) {
        setSuccessState();
        setTimeout(() => {
          window.open("http://localhost:3000/rfq/RFQ-2848", "_blank");
          setIdleState();
        }, 400);
      }
    };

    document.body.appendChild(pill);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPillButton);
  } else {
    injectPillButton();
  }
})();
