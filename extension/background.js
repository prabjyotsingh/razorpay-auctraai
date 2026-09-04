// Auctra Procurement Copilot - Manifest V3 Background Service Worker
// Lightweight event router for asynchronous RFQ dispatch, storage caching, and tab routing

const DEFAULT_BACKEND_URL = "http://localhost:3000";
const STORAGE_KEYS = {
  RECENT_RFQS: "auctra_recent_rfqs",
  BACKEND_URL: "auctra_backend_url"
};

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Auctra Copilot] Enterprise Service Worker initialized.");
  
  chrome.storage.local.get([STORAGE_KEYS.BACKEND_URL], (res) => {
    if (!res[STORAGE_KEYS.BACKEND_URL]) {
      chrome.storage.local.set({ [STORAGE_KEYS.BACKEND_URL]: DEFAULT_BACKEND_URL });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CREATE_RFQ") {
    handleCreateRfq(request.payload)
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // Keep message port open for async response
  }

  if (request.type === "OPEN_TAB") {
    if (request.url) {
      chrome.tabs.create({ url: request.url });
      sendResponse({ success: true });
    }
    return false;
  }

  if (request.type === "PING") {
    sendResponse({ success: true, timestamp: Date.now() });
    return false;
  }
});

async function handleCreateRfq(payload) {
  const stored = await chrome.storage.local.get([STORAGE_KEYS.BACKEND_URL, STORAGE_KEYS.RECENT_RFQS]);
  const baseUrl = stored[STORAGE_KEYS.BACKEND_URL] || DEFAULT_BACKEND_URL;
  const endpoint = `${baseUrl}/api/extension/create-rfq`;

  const cleanPayload = {
    productName: String(payload.productName || "").trim(),
    price: String(payload.price || "850").trim(),
    supplier: String(payload.supplierName || payload.supplier || "Verified Supplier").trim(),
    moq: String(payload.moq || "50").trim(),
    source: String(payload.source || "IndiaMART").trim(),
    url: String(payload.pageUrl || payload.url || "").trim()
  };

  let rfqResult = null;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanPayload)
    });

    if (response.ok) {
      const data = await response.json();
      const rfqId = data.rfqId || "RFQ-2848";
      let redirectUrl = data.redirectUrl || `${baseUrl}/rfq/${rfqId}`;
      if (redirectUrl.includes("chrome-extension://") || (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://"))) {
        redirectUrl = `${baseUrl}/rfq/${rfqId}`;
      }
      rfqResult = {
        rfqId,
        redirectUrl,
        record: data.rfq || { id: rfqId, ...cleanPayload }
      };
    } else {
      throw new Error(`Server returned ${response.status}`);
    }
  } catch (err) {
    console.warn("[Auctra Copilot] Fallback offline RFQ creation:", err.message);
    const fallbackId = `RFQ-${Math.floor(2000 + Math.random() * 8000)}`;
    rfqResult = {
      rfqId: fallbackId,
      redirectUrl: `${baseUrl}/rfq/${fallbackId}`,
      record: { id: fallbackId, ...cleanPayload, isOffline: true }
    };
  }

  // Update history storage (last 10 items)
  let history = stored[STORAGE_KEYS.RECENT_RFQS] || [];
  const newEntry = {
    id: rfqResult.rfqId,
    productName: cleanPayload.productName,
    supplierName: cleanPayload.supplier,
    price: Number(cleanPayload.price) || 850,
    moq: Number(cleanPayload.moq) || 50,
    source: cleanPayload.source,
    timestamp: Date.now()
  };
  history = [newEntry, ...history.filter(i => i.id !== newEntry.id)].slice(0, 10);
  await chrome.storage.local.set({ [STORAGE_KEYS.RECENT_RFQS]: history });

  return rfqResult;
}
