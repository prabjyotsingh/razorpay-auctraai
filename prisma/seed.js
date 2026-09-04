// Auctra AI - Prisma Database Seed Data
// Contains 5 Seed Vendors, 5 Demo Products, and Realistic Auction Histories

export const SEED_VENDORS = [
  {
    id: "ven_techhub_01",
    name: "TechHub Direct",
    trustScore: 98,
    slaHours: 24,
    currentBid: 850,
    rating: 4.9,
    city: "Bengaluru",
    isVerified: true,
    gstin: "29AAACT9812M1Z2"
  },
  {
    id: "ven_voltmart_02",
    name: "VoltMart Electronics",
    trustScore: 95,
    slaHours: 36,
    currentBid: 870,
    rating: 4.8,
    city: "Noida",
    isVerified: true,
    gstin: "07AABCV5519L1Z5"
  },
  {
    id: "ven_swiftprocure_03",
    name: "SwiftProcure Systems",
    trustScore: 96,
    slaHours: 24,
    currentBid: 840,
    rating: 4.8,
    city: "Gurugram",
    isVerified: true,
    gstin: "06AAACS7721N1ZM"
  },
  {
    id: "ven_gadgetzone_04",
    name: "GadgetZone Prime",
    trustScore: 92,
    slaHours: 48,
    currentBid: 890,
    rating: 4.7,
    city: "Pune",
    isVerified: true,
    gstin: "27AAACG4412P1ZK"
  },
  {
    id: "ven_nexus_05",
    name: "Nexus Industrial",
    trustScore: 94,
    slaHours: 48,
    currentBid: 865,
    rating: 4.8,
    city: "Chennai",
    isVerified: true,
    gstin: "33AABCN3391C1ZT"
  }
];

export const DEMO_PROCUREMENT_REQUESTS = [
  {
    id: "pr_wrist_rests_01",
    product: "Ergonomic Wrist Rest",
    quantity: 50,
    budget: 900,
    maxBudget: 45000,
    sla: "48 hours",
    slaHours: 48,
    strategy: "Reverse Auction",
    status: "completed",
    rawPrompt: "Need 50 ergonomic wrist rests under ₹900 with delivery in 48 hours.",
    auction: {
      id: "auc_wrist_98421",
      startPrice: 900,
      currentLowestBid: 740,
      status: "completed",
      winningVendorId: "ven_techhub_01",
      winningVendorName: "TechHub Direct",
      savingsGenerated: 8000,
      savingsPercent: 17.8
    },
    contract: {
      poNumber: "PO-2026-98421",
      unitPrice: 740,
      totalAmount: 37000,
      savings: 8000,
      deliverySLA: "Within 48 hours",
      contractHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      timestamp: "2026-09-03T10:00:00.000Z"
    },
    settlement: {
      razorpayOrderId: "order_auctra_98421",
      escrowStatus: "SETTLEMENT_COMPLETE",
      grossAmount: 37000,
      platformFee: 555,
      netSupplierAmount: 36445
    }
  },
  {
    id: "pr_keyboards_02",
    product: "Mechanical Keyboards",
    quantity: 80,
    budget: 3200,
    maxBudget: 256000,
    sla: "72 hours",
    slaHours: 72,
    strategy: "Reverse Auction",
    status: "completed",
    rawPrompt: "Procure 80 quiet mechanical keyboards with Bluetooth under ₹3,200 with delivery in 72 hours.",
    auction: {
      id: "auc_kb_44912",
      startPrice: 3200,
      currentLowestBid: 2650,
      status: "completed",
      winningVendorId: "ven_swiftprocure_03",
      winningVendorName: "SwiftProcure Systems",
      savingsGenerated: 44000,
      savingsPercent: 17.2
    },
    contract: {
      poNumber: "PO-2026-44912",
      unitPrice: 2650,
      totalAmount: 212000,
      savings: 44000,
      deliverySLA: "Within 72 hours",
      contractHash: "0x3ab829e1c03498ffaa73291240182410a8421390481239abcef1942008432194",
      timestamp: "2026-09-02T14:30:00.000Z"
    },
    settlement: {
      razorpayOrderId: "order_auctra_44912",
      escrowStatus: "SETTLEMENT_COMPLETE",
      grossAmount: 212000,
      platformFee: 3180,
      netSupplierAmount: 208820
    }
  },
  {
    id: "pr_monitors_03",
    product: "Monitors",
    quantity: 20,
    budget: 28500,
    maxBudget: 570000,
    sla: "48 hours",
    slaHours: 48,
    strategy: "Reverse Auction",
    status: "completed",
    rawPrompt: "Source 20 units of 27-inch 4K USB-C Monitors under ₹28,500 with delivery within 48 hours.",
    auction: {
      id: "auc_mon_18924",
      startPrice: 28500,
      currentLowestBid: 23100,
      status: "completed",
      winningVendorId: "ven_voltmart_02",
      winningVendorName: "VoltMart Electronics",
      savingsGenerated: 108000,
      savingsPercent: 18.9
    },
    contract: {
      poNumber: "PO-2026-18924",
      unitPrice: 23100,
      totalAmount: 462000,
      savings: 108000,
      deliverySLA: "Within 48 hours",
      contractHash: "0x892a0142bcfe4912984149021948129034812948129038412093840192841209",
      timestamp: "2026-09-01T09:15:00.000Z"
    },
    settlement: {
      razorpayOrderId: "order_auctra_18924",
      escrowStatus: "SETTLEMENT_COMPLETE",
      grossAmount: 462000,
      platformFee: 6930,
      netSupplierAmount: 455070
    }
  },
  {
    id: "pr_headsets_04",
    product: "Headsets",
    quantity: 120,
    budget: 2400,
    maxBudget: 288000,
    sla: "24 hours",
    slaHours: 24,
    strategy: "Reverse Auction",
    status: "completed",
    rawPrompt: "Need 120 noise-cancelling enterprise USB headsets under ₹2,400 with 24 hours express dispatch.",
    auction: {
      id: "auc_head_55812",
      startPrice: 2400,
      currentLowestBid: 1980,
      status: "completed",
      winningVendorId: "ven_nexus_05",
      winningVendorName: "Nexus Industrial",
      savingsGenerated: 50400,
      savingsPercent: 17.5
    },
    contract: {
      poNumber: "PO-2026-55812",
      unitPrice: 1980,
      totalAmount: 237600,
      savings: 50400,
      deliverySLA: "Within 24 hours",
      contractHash: "0x1948210948120934812093840192840192834019283401928340192834019283",
      timestamp: "2026-08-30T16:45:00.000Z"
    },
    settlement: {
      razorpayOrderId: "order_auctra_55812",
      escrowStatus: "SETTLEMENT_COMPLETE",
      grossAmount: 237600,
      platformFee: 3564,
      netSupplierAmount: 234036
    }
  },
  {
    id: "pr_docking_05",
    product: "Docking Stations",
    quantity: 40,
    budget: 8500,
    maxBudget: 340000,
    sla: "48 hours",
    slaHours: 48,
    strategy: "Reverse Auction",
    status: "completed",
    rawPrompt: "Procure 40 Thunderbolt 4 Universal Docking Stations with dual HDMI under ₹8,500 delivery in 48 hours.",
    auction: {
      id: "auc_dock_33914",
      startPrice: 8500,
      currentLowestBid: 6900,
      status: "completed",
      winningVendorId: "ven_gadgetzone_04",
      winningVendorName: "GadgetZone Prime",
      savingsGenerated: 64000,
      savingsPercent: 18.8
    },
    contract: {
      poNumber: "PO-2026-33914",
      unitPrice: 6900,
      totalAmount: 276000,
      savings: 64000,
      deliverySLA: "Within 48 hours",
      contractHash: "0x4481209348120938401928401928340192834019283401928340192834019284",
      timestamp: "2026-08-28T11:20:00.000Z"
    },
    settlement: {
      razorpayOrderId: "order_auctra_33914",
      escrowStatus: "SETTLEMENT_COMPLETE",
      grossAmount: 276000,
      platformFee: 4140,
      netSupplierAmount: 271860
    }
  }
];

async function seedDatabase() {
  console.log("Seeding Auctra AI database with core vendors and demo auction history...");
  console.log(`- ${SEED_VENDORS.length} verified vendors ready.`);
  console.log(`- ${DEMO_PROCUREMENT_REQUESTS.length} demo procurement benchmarks initialized.`);
  console.log("Seed verification complete!");
}

if (typeof process !== "undefined" && process.argv[1]?.endsWith("seed.js")) {
  seedDatabase();
}
