// Auctra AI - In-Memory / Persistent RFQ Storage & Management
// Stores RFQs ingested via Chrome Extension and natural language intent

export function cleanProductTitle(rawTitle) {
  if (!rawTitle || typeof rawTitle !== "string") return "Commercial Sourced Item";
  return rawTitle.trim();
}

const INITIAL_RFQS = [
  {
    id: "RFQ-2847",
    productName: "Ergonomic Memory Foam Wrist Rest Set",
    price: 850,
    targetPrice: 850,
    budget: 900,
    quantity: 50,
    moq: 50,
    supplier: "TechHub Direct",
    supplierLocation: "Bengaluru, Karnataka",
    source: "IndiaMART",
    url: "https://www.indiamart.com/proddetail/ergonomic-wrist-rest-foam.html",
    status: "AUCTION_SCHEDULED",
    createdAt: "2026-09-04T09:30:00Z",
    sla: "48 hours",
    slaHours: 48,
    category: "Office Ergonomics & Peripherals",
    estimatedTotal: 42500,
    competingSuppliersCount: 5,
    keySpecs: [
      "Target Unit Budget: ₹850",
      "Total Ceiling: ₹42,500",
      "High density ergonomic memory foam core",
      "Anti-skid rubberized backing base",
      "Mandatory delivery SLA: 48 hours"
    ],
    complianceRequired: ["GSTIN Invoice", "ISO 9001:2015", "E-Way Bill Compliance"]
  },
  {
    id: "RFQ-2848",
    productName: "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in",
    price: 80990,
    targetPrice: 80990,
    budget: 85000,
    quantity: 50,
    moq: 50,
    supplier: "TechHub Direct",
    supplierLocation: "Bengaluru, Karnataka",
    source: "Amazon Business",
    url: "https://www.amazon.in",
    status: "READY_FOR_AUCTION",
    createdAt: "2026-09-04T12:00:00Z",
    sla: "48 hours",
    slaHours: 48,
    category: "Commercial Sourcing",
    estimatedTotal: 4049500,
    competingSuppliersCount: 4,
    keySpecs: [
      "Quoted Unit Price: ₹80,990",
      "Total Baseline Spend: ₹40,49,500",
      "Verified Directory Supplier Sourced",
      "Batch commitment: 50 Units MOQ",
      "Mandatory delivery SLA: 48 hours"
    ],
    complianceRequired: ["GSTIN Invoice", "MSME/ISO Verification", "E-Way Bill Compliant"]
  }
];

// Global registry cache in Node memory
let rfqRegistry = [...INITIAL_RFQS];

export function getAllRfqs() {
  return rfqRegistry.map(r => ({
    ...r,
    productName: cleanProductTitle(r.productName)
  }));
}

export function getRfqById(id) {
  if (!id) return null;
  const normalizedId = id.toUpperCase();
  const found = rfqRegistry.find(r => r.id.toUpperCase() === normalizedId);
  if (found) {
    return {
      ...found,
      productName: cleanProductTitle(found.productName)
    };
  }
  return null;
}

export function saveRfq(data) {
  const nextNumber = 2848 + rfqRegistry.length - INITIAL_RFQS.length;
  const rfqId = data.id || `RFQ-${nextNumber}`;
  
  const priceNum = parseFloat(String(data.price || "850").replace(/[^\d.]/g, "")) || 850;
  const moqNum = parseInt(String(data.moq || data.quantity || "50").replace(/[^\d]/g, ""), 10) || 50;

  const rawTitle = data.productName || data.title || "Commercial Ergonomic Workstation Fleet";
  const cleanedTitle = cleanProductTitle(rawTitle);

  const newRfq = {
    id: rfqId,
    productName: cleanedTitle,
    price: priceNum,
    targetPrice: priceNum,
    budget: Math.round(priceNum * 1.05), // slightly higher ceiling for reverse auction room
    quantity: moqNum,
    moq: moqNum,
    supplier: data.supplier || data.supplierName || "Verified Directory Supplier",
    supplierLocation: data.supplierLocation || "Bengaluru, Karnataka",
    source: data.source || data.platform || "Amazon Business",
    url: data.url || data.pageUrl || "",
    status: "READY_FOR_AUCTION",
    createdAt: new Date().toISOString(),
    sla: "48 hours",
    slaHours: 48,
    category: "Commercial Sourcing & Office Infrastructure",
    estimatedTotal: Math.round(priceNum * moqNum),
    competingSuppliersCount: 4,
    keySpecs: [
      `Target Unit Price: ₹${priceNum.toLocaleString("en-IN")}`,
      `Order Quantity: ${moqNum} units`,
      `Baseline Supplier: ${data.supplier || "Verified Directory Vendor"}`,
      `Marketplace Source: ${data.source || "Amazon Business"}`,
      "Mandatory delivery SLA: 48 hours"
    ],
    complianceRequired: ["GSTIN Invoice", "MSME/ISO Verification", "E-Way Bill Compliant"]
  };

  // Prepend to list
  rfqRegistry = [newRfq, ...rfqRegistry.filter(r => r.id !== rfqId)];
  return newRfq;
}
