// Auctra Procurement Copilot - Shared Constants
// Enterprise Configuration, Storage Keys, and Supplier Intelligence

export const DEFAULT_BACKEND_URL = "http://localhost:3000";

export const STORAGE_KEYS = {
  RECENT_RFQS: "auctra_recent_rfqs",
  BACKEND_URL: "auctra_backend_url",
  LAST_CREATED_RFQ: "auctra_last_created_rfq",
  SETTINGS: "auctra_settings"
};

export const MAX_RECENT_RFQS = 10;

export const MARKETPLACE_DOMAINS = {
  INDIAMART: "indiamart.com",
  AMAZON_IN: "amazon.in",
  AMAZON_COM: "amazon.com",
  ALIBABA: "alibaba.com",
  TRADEINDIA: "tradeindia.com"
};

export const SUPPLIER_INTELLIGENCE_DB = {
  techhub: {
    trustScore: 94,
    gstin: "29AABCT1332L1Z4",
    gstStatus: "Verified",
    msmeStatus: "UDYAM-KR-03-0029144 (Active)",
    riskRating: "Low Risk",
    riskClass: "low",
    slaHours: 36,
    historicalFulfillmentRate: 98.4
  },
  voltmart: {
    trustScore: 91,
    gstin: "27AABCV8912M1Z2",
    gstStatus: "Verified",
    msmeStatus: "UDYAM-MH-01-0018239 (Active)",
    riskRating: "Low Risk",
    riskClass: "low",
    slaHours: 48,
    historicalFulfillmentRate: 97.2
  },
  nexus: {
    trustScore: 88,
    gstin: "33AABCN4512P1Z8",
    gstStatus: "Verified",
    msmeStatus: "UDYAM-TN-02-0044192 (Active)",
    riskRating: "Low Risk",
    riskClass: "low",
    slaHours: 48,
    historicalFulfillmentRate: 96.5
  },
  gadgetzone: {
    trustScore: 84,
    gstin: "07AABCG7821Q1Z6",
    gstStatus: "Verified",
    msmeStatus: "UDYAM-DL-05-0012983 (Active)",
    riskRating: "Moderate Risk",
    riskClass: "mod",
    slaHours: 72,
    historicalFulfillmentRate: 94.0
  },
  default: {
    trustScore: 89,
    gstin: "29AABCS9823R1Z5",
    gstStatus: "Verified",
    msmeStatus: "UDYAM-Active",
    riskRating: "Low Risk",
    riskClass: "low",
    slaHours: 48,
    historicalFulfillmentRate: 96.8
  }
};
