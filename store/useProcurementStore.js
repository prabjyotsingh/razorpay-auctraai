// Auctra AI - Central State Store (Zustand)
// Orchestrates End-to-End Autonomous Procurement, Live Simulation, and Telemetry

import { create } from "zustand";
import { 
  ENTERPRISE_ORG, 
  VERIFIED_VENDORS, 
  SAMPLE_PROMPT_PRESETS, 
  EXECUTIVE_DASHBOARD_METRICS 
} from "@/lib/mockData";
import { extractProcurementIntent } from "@/lib/ai/intentParser";
import { createReverseAuctionSession, generateNextBid } from "@/lib/auction/auctionEngine";
import { generateProcurementContract } from "@/lib/contracts/contractGenerator";
import { initializeRazorpayEscrow, advanceEscrowStage } from "@/lib/payments/razorpayEscrow";
import { downloadPurchaseOrderPdf } from "@/lib/pdf/generatePdf";
import { calculatePlatformAnalytics } from "@/lib/analytics/calculateMetrics";
import { cleanProductTitle } from "@/lib/rfq/rfqStore";

// Initial default intent
const DEFAULT_PRESET = SAMPLE_PROMPT_PRESETS[0];

export const useProcurementStore = create((set, get) => {
  // Initialize default states
  const initialIntent = {
    product: "Ergonomic Wrist Rest",
    category: "Office Ergonomics & Peripherals",
    quantity: 50,
    budget: 900,
    maxBudget: 45000,
    sla: "48 hours",
    slaHours: 48,
    strategy: "Reverse Auction",
    confidence: 0.96,
    keySpecs: [
      "Target Unit Budget: ₹900",
      "Total Budget Ceiling: ₹45,000",
      "Mandatory SLA: 48 hours",
      "High density ergonomic memory foam core",
      "Anti-skid rubberized backing base"
    ],
    complianceRequired: ["GSTIN Invoice", "ISO 9001:2015", "E-Way Bill Compliance"],
    rawPrompt: DEFAULT_PRESET.prompt,
    engineSource: "AI_PROCUREMENT_ASSISTANT"
  };

  const initialAuction = createReverseAuctionSession(initialIntent, VERIFIED_VENDORS, "AUC-98421");
  const initialContract = generateProcurementContract(initialAuction, initialIntent, ENTERPRISE_ORG, "PO-2026-98421");
  const initialEscrow = initializeRazorpayEscrow(initialContract);

  return {
    // Current navigation view
    currentView: "dashboard", // 'dashboard' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'analytics' | 'vendors' | 'extension'
    activeStep: 1, // 1 to 5
    sidebarCollapsed: false,
    
    // Enterprise Organization & User Profile
    org: ENTERPRISE_ORG,
    metrics: EXECUTIVE_DASHBOARD_METRICS,
    dynamicAnalytics: calculatePlatformAnalytics(initialAuction, initialContract),

    // Step 1: Create RFQ
    promptInput: DEFAULT_PRESET.prompt,
    isExtracting: false,
    extractedIntent: initialIntent,

    // Step 2: Vendor Discovery
    allVendors: VERIFIED_VENDORS,
    selectedVendorIds: VERIFIED_VENDORS.map(v => v.id),
    vendorFilters: {
      minTrustScore: 90,
      maxSlaHours: 48,
      verifiedOnly: true
    },

    // Step 3: Reverse Auction (Core Simulation)
    auctionState: initialAuction,
    auctionTimerId: null,
    auctionSpeed: 1, // 1x, 2x
    isAuctionSimulating: false,

    // Step 4: Contract Verification
    contractState: initialContract,
    isPdfExporting: false,

    // Step 5: Escrow Payment
    escrowState: initialEscrow,

    // Chrome Extension Bridge State
    extensionConnected: true,
    lastScrapedItem: null,

    // One-Click Autonomous AutoPilot State
    isAutoPilotRunning: false,
    autoPilotStep: 0,
    autoPilotMessage: "",

    // --- Actions ---

    setCurrentView: (view) => set({ currentView: view }),
    
    setActiveStep: (step) => {
      const viewMap = {
        1: "step1",
        2: "step2",
        3: "step3",
        4: "step4",
        5: "step5"
      };
      set({ activeStep: step, currentView: viewMap[step] || "step1" });
    },

    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    setPromptInput: (text) => set({ promptInput: text }),

    loadPreset: (presetId) => {
      const preset = SAMPLE_PROMPT_PRESETS.find(p => p.id === presetId);
      if (preset) {
        set({ promptInput: preset.prompt });
        get().triggerIntentExtraction(preset.prompt);
      }
    },

    // Priority 2: Connect to /api/intent
    triggerIntentExtraction: async (textToExtract) => {
      const prompt = textToExtract || get().promptInput;
      set({ isExtracting: true });

      try {
        let parsed = null;
        // Call /api/intent
        try {
          const res = await fetch("/api/intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
          });
          if (res.ok) {
            parsed = await res.json();
          }
        } catch {
          // Fallback to local parser
          parsed = await extractProcurementIntent(prompt);
        }

        if (!parsed) {
          parsed = await extractProcurementIntent(prompt);
        }

        const normalizedIntent = {
          ...get().extractedIntent,
          product: parsed.product || "Ergonomic Wrist Rest",
          quantity: parsed.quantity || 50,
          budget: parsed.budget || 900,
          maxBudget: parsed.maxBudget || (parsed.quantity || 50) * (parsed.budget || 900),
          sla: parsed.sla || "48 hours",
          strategy: parsed.strategy || "Reverse Auction",
          rawPrompt: prompt,
          confidence: 0.96
        };

        // Re-initialize downstream dependent steps with the newly extracted intent
        const newAuction = createReverseAuctionSession(normalizedIntent, get().allVendors);
        const newContract = generateProcurementContract(newAuction, normalizedIntent, get().org);
        const newEscrow = initializeRazorpayEscrow(newContract);
        const newAnalytics = calculatePlatformAnalytics(newAuction, newContract);

        set({
          extractedIntent: normalizedIntent,
          auctionState: newAuction,
          contractState: newContract,
          escrowState: newEscrow,
          dynamicAnalytics: newAnalytics,
          isExtracting: false
        });
      } catch (err) {
        console.error("Intent extraction error:", err);
        set({ isExtracting: false });
      }
    },

    updateExtractedIntent: (field, value) => {
      set((state) => {
        const updated = { ...state.extractedIntent, [field]: value };
        if (field === "budget" || field === "quantity") {
          updated.maxBudget = (updated.budget || 0) * (updated.quantity || 0);
        }
        return { extractedIntent: updated };
      });
    },

    // Step 2 actions
    toggleVendorSelection: (vendorId) => {
      set((state) => {
        const selected = state.selectedVendorIds.includes(vendorId)
          ? state.selectedVendorIds.filter(id => id !== vendorId)
          : [...state.selectedVendorIds, vendorId];
        return { selectedVendorIds: selected };
      });
    },

    selectAllVendors: () => {
      set((state) => ({
        selectedVendorIds: state.allVendors.map(v => v.id)
      }));
    },

    // Step 3 actions: Reverse Auction
    startLiveAuction: () => {
      const state = get();
      const participating = state.allVendors.filter(v => state.selectedVendorIds.includes(v.id));
      const freshAuction = createReverseAuctionSession(state.extractedIntent, participating);

      set({
        auctionState: { ...freshAuction, status: "running", isLive: true },
        isAuctionSimulating: true
      });
    },

    loadRfqAndFindSuppliers: (rfq) => {
      const state = get();
      const priceNum = parseFloat(String(rfq.price || "850").replace(/[^\d.]/g, "")) || 850;
      const qtyNum = parseInt(String(rfq.quantity || rfq.moq || "50").replace(/[^\d]/g, ""), 10) || 50;
      const cleanedTitle = cleanProductTitle(rfq.productName || rfq.title || "Ergonomic Memory Foam Wrist Rest Set");
      
      const updatedIntent = {
        ...state.extractedIntent,
        product: cleanedTitle,
        budget: priceNum,
        maxBudget: priceNum * qtyNum,
        quantity: qtyNum,
        sla: rfq.sla || "48 hours",
        slaHours: 48,
        rawPrompt: `Source ${qtyNum} units of ${cleanedTitle} under ₹${priceNum}/unit with guaranteed delivery within 48 hours. Sourced from ${rfq.source || "IndiaMART"} (${rfq.supplier || "TechHub Direct"}).`,
        engineSource: "CHROME_EXTENSION_INGESTION"
      };

      const participating = state.allVendors.filter(v => state.selectedVendorIds.includes(v.id));
      const freshAuction = createReverseAuctionSession(updatedIntent, participating);

      set({
        extractedIntent: updatedIntent,
        promptInput: updatedIntent.rawPrompt,
        auctionState: freshAuction,
        isAuctionSimulating: false,
        activeStep: 2,
        currentView: "step2"
      });
    },

    loadRfqAndLaunchAuction: (rfq) => {
      const state = get();
      const priceNum = parseFloat(String(rfq.price || "850").replace(/[^\d.]/g, "")) || 850;
      const qtyNum = parseInt(String(rfq.quantity || rfq.moq || "50").replace(/[^\d]/g, ""), 10) || 50;
      const cleanedTitle = cleanProductTitle(rfq.productName || rfq.title || "Commercial Ergonomic Workstation Equipment");
      
      const updatedIntent = {
        ...state.extractedIntent,
        product: cleanedTitle,
        budget: priceNum,
        maxBudget: priceNum * qtyNum,
        quantity: qtyNum,
        sla: rfq.sla || "48 hours",
        slaHours: 48,
        rawPrompt: `Source ${qtyNum} units of ${cleanedTitle} under ₹${priceNum}/unit with guaranteed delivery within 48 hours. Sourced from ${rfq.source || "Marketplace"} (${rfq.supplier || "Verified Directory Supplier"}).`,
        engineSource: "CHROME_EXTENSION_INGESTION"
      };

      const participating = state.allVendors.filter(v => state.selectedVendorIds.includes(v.id));
      const freshAuction = createReverseAuctionSession(updatedIntent, participating);

      set({
        extractedIntent: updatedIntent,
        promptInput: updatedIntent.rawPrompt,
        auctionState: { ...freshAuction, status: "running", isLive: true },
        isAuctionSimulating: true,
        activeStep: 3,
        currentView: "step3"
      });
    },

    stepSimulateNextBid: () => {
      const current = get().auctionState;
      if (current.isFinished || current.currentLowestBid <= current.reserveTarget) {
        // Complete auction and sync contract
        const completed = { ...current, status: "completed", isLive: false, isFinished: true };
        const contract = generateProcurementContract(completed, get().extractedIntent, get().org);
        const escrow = initializeRazorpayEscrow(contract);
        const analytics = calculatePlatformAnalytics(completed, contract);

        set({
          auctionState: completed,
          isAuctionSimulating: false,
          contractState: contract,
          escrowState: escrow,
          dynamicAnalytics: analytics
        });
        return;
      }

      const nextState = generateNextBid(current);
      if (nextState.isFinished) {
        const contract = generateProcurementContract(nextState, get().extractedIntent, get().org);
        const escrow = initializeRazorpayEscrow(contract);
        const analytics = calculatePlatformAnalytics(nextState, contract);

        set({
          auctionState: nextState,
          isAuctionSimulating: false,
          contractState: contract,
          escrowState: escrow,
          dynamicAnalytics: analytics
        });
      } else {
        set({ auctionState: nextState });
      }
    },

    fastForwardAuction: () => {
      let current = get().auctionState;
      for (let i = 0; i < 6; i++) {
        current = generateNextBid(current);
        if (current.isFinished) break;
      }
      current.status = "completed";
      current.isLive = false;
      current.isFinished = true;

      const contract = generateProcurementContract(current, get().extractedIntent, get().org);
      const escrow = initializeRazorpayEscrow(contract);
      const analytics = calculatePlatformAnalytics(current, contract);

      set({
        auctionState: current,
        isAuctionSimulating: false,
        contractState: contract,
        escrowState: escrow,
        dynamicAnalytics: analytics
      });
    },

    resetAuction: () => {
      const state = get();
      const participating = state.allVendors.filter(v => state.selectedVendorIds.includes(v.id));
      const fresh = createReverseAuctionSession(state.extractedIntent, participating);
      set({
        auctionState: fresh,
        isAuctionSimulating: false
      });
    },

    // Step 4 actions: Contract signoff & PDF download
    approveContractByBuyer: () => {
      set((state) => {
        const updated = {
          ...state.contractState,
          status: "APPROVED",
          treasuryApproved: true,
          signatures: {
            ...state.contractState.signatures,
            financeController: {
              name: "Priyanka Nair",
              title: "Director of Enterprise Treasury",
              isSigned: true,
              signedAt: new Date().toISOString(),
              signatureHash: `TREASURY-SIG-${state.contractState.contractHash.slice(10, 26).toUpperCase()}`
            }
          }
        };
        return { contractState: updated };
      });
    },

    downloadPdf: async () => {
      const contract = get().contractState;
      set({ isPdfExporting: true });
      try {
        await downloadPurchaseOrderPdf(contract);
      } catch (err) {
        console.error("Failed to download PDF:", err);
      } finally {
        set({ isPdfExporting: false });
      }
    },

    // Step 5 actions: Razorpay Escrow with API call
    progressEscrow: async (targetStage) => {
      const current = get().escrowState;
      const nextEscrow = advanceEscrowStage(current, targetStage);
      set({ escrowState: nextEscrow });

      // Trigger /api/razorpay/webhook to simulate real webhook receipt
      try {
        await fetch("/api/razorpay/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: targetStage === "FUNDS_LOCKED" ? "payment.captured" : 
                   targetStage === "SUPPLIER_ACCEPTED" ? "order.supplier_acknowledged" : 
                   targetStage === "DISPATCH_AND_INSPECTED" ? "delivery.qa_verified" : "payout.processed",
            orderId: nextEscrow.orderId
          })
        });
      } catch (e) {
        console.log("Simulated webhook event locally:", e);
      }
    },

    // Create Razorpay Order via /api/razorpay/order
    createRazorpayOrder: async () => {
      const contract = get().contractState;
      try {
        const res = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: contract.totalAmount,
            contractId: contract.poNumber
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.order?.id) {
            set((state) => ({
              escrowState: {
                ...state.escrowState,
                orderId: data.order.id
              }
            }));
          }
        }
      } catch (e) {
        console.error("Failed to call razorpay order API:", e);
      }
    },

    // Ingest product from Chrome extension
    ingestFromExtension: (productData) => {
      const syntheticPrompt = `Need ${productData.quantity || 50} units of ${productData.title} under ₹${productData.targetPrice || 1200}/unit with delivery within 48 hours sourced from ${productData.platform}.`;
      set({
        promptInput: syntheticPrompt,
        lastScrapedItem: productData,
        currentView: "step1",
        activeStep: 1
      });
      get().triggerIntentExtraction(syntheticPrompt);
    },

    // Priority Tier 1: One-Click Autonomous Procurement Auto-Pilot Demo
    runAutoPilotDemo: async () => {
      if (get().isAutoPilotRunning) return;
      set({ 
        isAutoPilotRunning: true, 
        autoPilotStep: 1, 
        autoPilotMessage: "Step 1 of 5: Parsing Requisition Specifications..." 
      });
      get().setActiveStep(1);

      // Step 1: Intent Extraction
      await new Promise(r => setTimeout(r, 1500));
      set({ 
        autoPilotStep: 2, 
        autoPilotMessage: "Step 2 of 5: Matching Verified Commercial Suppliers..." 
      });
      get().setActiveStep(2);

      // Step 2: Vendor Discovery
      await new Promise(r => setTimeout(r, 1500));
      set({ 
        autoPilotStep: 3, 
        autoPilotMessage: "Step 3 of 5: Running Competitive Reverse Auction..." 
      });
      get().setActiveStep(3);
      get().startLiveAuction();

      // Bidding loop in auction
      for (let i = 0; i < 4; i++) {
        await new Promise(r => setTimeout(r, 700));
        get().stepSimulateNextBid();
      }
      get().fastForwardAuction();

      // Step 4: Purchase Order Contract
      await new Promise(r => setTimeout(r, 1400));
      set({ 
        autoPilotStep: 4, 
        autoPilotMessage: "Step 4 of 5: Generating Purchase Order & Authorizing Sign-off..." 
      });
      get().setActiveStep(4);
      get().approveContractByBuyer();

      // Step 5: Razorpay Escrow Settlement
      await new Promise(r => setTimeout(r, 1500));
      set({ 
        autoPilotStep: 5, 
        autoPilotMessage: "Step 5 of 5: Locking Funds via Razorpay Payment Infrastructure..." 
      });
      get().setActiveStep(5);
      await get().createRazorpayOrder();
      await get().progressEscrow("FUNDS_LOCKED");

      // Complete Celebration
      await new Promise(r => setTimeout(r, 1500));
      set({
        isAutoPilotRunning: false,
        autoPilotStep: 5,
        autoPilotMessage: "Procurement Workflow Complete: ₹8,000 Cost Reduction & Escrow Secured!"
      });
    },

    // One-Click Reset for Enterprise Evaluation & Clean Demo Environment
    resetToDemoState: () => {
      const currentTimer = get().auctionTimerId;
      if (currentTimer) {
        clearInterval(currentTimer);
      }
      const defaultIntent = {
        product: "Ergonomic Wrist Rest",
        category: "Office Ergonomics & Peripherals",
        quantity: 50,
        budget: 900,
        maxBudget: 45000,
        sla: "48 hours",
        slaHours: 48,
        strategy: "Reverse Auction",
        confidence: 0.96,
        keySpecs: [
          "Target Unit Budget: ₹900",
          "Total Budget Ceiling: ₹45,000",
          "Mandatory SLA: 48 hours",
          "High density ergonomic memory foam core",
          "Anti-skid rubberized backing base"
        ],
        complianceRequired: ["GSTIN Invoice", "ISO 9001:2015", "E-Way Bill Compliance"],
        rawPrompt: DEFAULT_PRESET.prompt,
        engineSource: "AI_PROCUREMENT_ASSISTANT"
      };

      const defaultAuction = createReverseAuctionSession(defaultIntent, VERIFIED_VENDORS, "AUC-98421");
      const defaultContract = generateProcurementContract(defaultAuction, defaultIntent, ENTERPRISE_ORG, "PO-2026-98421");
      const defaultEscrow = initializeRazorpayEscrow(defaultContract);

      set({
        currentView: "dashboard",
        activeStep: 1,
        sidebarCollapsed: false,
        org: ENTERPRISE_ORG,
        metrics: EXECUTIVE_DASHBOARD_METRICS,
        dynamicAnalytics: calculatePlatformAnalytics(defaultAuction, defaultContract),
        promptInput: DEFAULT_PRESET.prompt,
        isExtracting: false,
        extractedIntent: defaultIntent,
        allVendors: VERIFIED_VENDORS,
        selectedVendorIds: VERIFIED_VENDORS.map(v => v.id),
        vendorFilters: {
          minTrustScore: 90,
          maxSlaHours: 48,
          verifiedOnly: true
        },
        auctionState: defaultAuction,
        auctionTimerId: null,
        auctionSpeed: 1,
        isAuctionSimulating: false,
        contractState: defaultContract,
        isPdfExporting: false,
        escrowState: defaultEscrow,
        lastScrapedItem: null,
        isAutoPilotRunning: false,
        autoPilotStep: 0,
        autoPilotMessage: ""
      });
    }
  };
});
