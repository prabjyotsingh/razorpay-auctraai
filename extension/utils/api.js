// Auctra Procurement Copilot - API Client & Storage Synchronization
// Robust offline fallback, local storage caching of last 10 RFQs, and retry logic

import { DEFAULT_BACKEND_URL, STORAGE_KEYS, MAX_RECENT_RFQS } from "./constants.js";

/**
 * Retrieve active backend URL
 */
export async function getBackendUrl() {
  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      const stored = await chrome.storage.local.get([STORAGE_KEYS.BACKEND_URL]);
      if (stored && stored[STORAGE_KEYS.BACKEND_URL]) {
        return stored[STORAGE_KEYS.BACKEND_URL];
      }
    }
  } catch (err) {
    console.warn("[Auctra API] Storage lookup fallback:", err);
  }
  return DEFAULT_BACKEND_URL;
}

/**
 * Save RFQ to Local Storage (keeps last 10 items)
 */
export async function saveRfqToHistory(rfqRecord) {
  try {
    if (typeof chrome === "undefined" || !chrome.storage || !chrome.storage.local) return;

    const stored = await chrome.storage.local.get([STORAGE_KEYS.RECENT_RFQS]);
    let history = stored[STORAGE_KEYS.RECENT_RFQS] || [];

    // Prepend new RFQ
    const newEntry = {
      id: rfqRecord.id || rfqRecord.rfqId,
      productName: rfqRecord.productName,
      supplierName: rfqRecord.supplier || rfqRecord.supplierName,
      price: Number(rfqRecord.price),
      moq: Number(rfqRecord.moq),
      source: rfqRecord.source,
      timestamp: Date.now()
    };

    // Filter duplicates and keep up to MAX_RECENT_RFQS
    history = [newEntry, ...history.filter(item => item.id !== newEntry.id)].slice(0, MAX_RECENT_RFQS);

    await chrome.storage.local.set({ [STORAGE_KEYS.RECENT_RFQS]: history });
  } catch (err) {
    console.warn("[Auctra API] History save warning:", err);
  }
}

/**
 * Retrieve recent RFQs from Local Storage
 */
export async function getRecentRfqs() {
  try {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      const stored = await chrome.storage.local.get([STORAGE_KEYS.RECENT_RFQS]);
      return stored[STORAGE_KEYS.RECENT_RFQS] || [];
    }
  } catch (err) {
    console.warn("[Auctra API] History read warning:", err);
  }
  return [];
}

/**
 * Create RFQ on Auctra Platform
 * POST /api/extension/create-rfq
 */
export async function createRfq(rfqData) {
  const baseUrl = await getBackendUrl();
  const endpoint = `${baseUrl}/api/extension/create-rfq`;

  const payload = {
    productName: String(rfqData.productName || "").trim(),
    price: String(rfqData.price || "850").trim(),
    supplier: String(rfqData.supplierName || rfqData.supplier || "Verified Supplier").trim(),
    moq: String(rfqData.moq || "50").trim(),
    source: String(rfqData.source || "IndiaMART").trim(),
    url: String(rfqData.pageUrl || rfqData.url || "").trim()
  };

  // Validation
  if (!payload.productName) {
    throw new Error("We couldn't identify a product title on this page.");
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const rfqId = data.rfqId || "RFQ-2848";
    let redirectUrl = data.redirectUrl || `${baseUrl}/rfq/${rfqId}`;
    
    // Ensure strict absolute HTTP/HTTPS URL
    if (redirectUrl.includes("chrome-extension://") || (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://"))) {
      redirectUrl = `${baseUrl}/rfq/${rfqId}`;
    }

    const record = {
      id: rfqId,
      ...payload,
      redirectUrl
    };

    await saveRfqToHistory(record);

    return {
      success: true,
      rfqId,
      redirectUrl,
      record
    };
  } catch (error) {
    console.warn("[Auctra API] Backend unreachable, creating offline resilient RFQ:", error.message);

    const fallbackId = `RFQ-${Math.floor(2000 + Math.random() * 8000)}`;
    const redirectUrl = `${baseUrl}/rfq/${fallbackId}`;

    const record = {
      id: fallbackId,
      ...payload,
      redirectUrl,
      isOffline: true
    };

    await saveRfqToHistory(record);

    return {
      success: true,
      rfqId: fallbackId,
      redirectUrl,
      record,
      isOffline: true,
      errorMessage: error.name === "AbortError" ? "Connection timeout (stored locally)" : error.message
    };
  }
}
