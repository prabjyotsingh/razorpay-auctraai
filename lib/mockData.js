// Auctra AI Enterprise Mock Datasets & Benchmarks

export const ENTERPRISE_ORG = {
  id: "org_acme_enterprise_01",
  name: "Acme Technologies India Pvt. Ltd.",
  taxId: "29AABCU9603R1ZM",
  domain: "acmetech.in",
  currency: "INR",
  currencySymbol: "₹",
  procurementPolicy: "Tier-1 Autonomous Reverse Auction Mandatory for RFQs > ₹25,000",
  activeUser: {
    name: "Vikramaditya Sharma",
    role: "Head of Global Procurement",
    email: "v.sharma@acmetech.in",
    avatar: "VS",
    approvalLimit: 5000000 // ₹50 Lakhs
  }
};

export const VERIFIED_VENDORS = [
  {
    id: "ven_techhub_01",
    name: "TechHub Direct",
    legalName: "TechHub Direct Sourcing Pvt Ltd",
    trustScore: 98,
    slaHours: 24,
    currentBid: 850,
    rating: 4.9,
    city: "Bengaluru",
    state: "Karnataka",
    isVerified: true,
    isoCertified: true,
    msmeRegistered: true,
    pastFulfillmentRate: 99.2,
    categories: ["IT Peripherals", "Ergonomics", "Electronics"],
    minLeadTimeHours: 24,
    baseMargin: 0.12,
    gstin: "29AAACT9812M1Z2",
    contactEmail: "contracts@techhubdirect.com",
    contactPhone: "+91 80 4122 8900"
  },
  {
    id: "ven_voltmart_02",
    name: "VoltMart Electronics",
    legalName: "VoltMart Electronics India LLP",
    trustScore: 95,
    slaHours: 36,
    currentBid: 870,
    rating: 4.8,
    city: "Noida",
    state: "Uttar Pradesh",
    isVerified: true,
    isoCertified: true,
    msmeRegistered: false,
    pastFulfillmentRate: 98.4,
    categories: ["Monitors", "IT Hardware", "Office Supplies"],
    minLeadTimeHours: 36,
    baseMargin: 0.15,
    gstin: "07AABCV5519L1Z5",
    contactEmail: "b2b@voltmartelectronics.in",
    contactPhone: "+91 120 689 4400"
  },
  {
    id: "ven_swiftprocure_03",
    name: "SwiftProcure Systems",
    legalName: "SwiftProcure Rapid Systems Ltd",
    trustScore: 96,
    slaHours: 24,
    currentBid: 840,
    rating: 4.8,
    city: "Gurugram",
    state: "Haryana",
    isVerified: true,
    isoCertified: true,
    msmeRegistered: true,
    pastFulfillmentRate: 98.9,
    categories: ["Keyboards", "Ergonomics", "Cables"],
    minLeadTimeHours: 24,
    baseMargin: 0.14,
    gstin: "06AAACS7721N1ZM",
    contactEmail: "rfq@swiftprocuresystems.com",
    contactPhone: "+91 124 456 7890"
  },
  {
    id: "ven_gadgetzone_04",
    name: "GadgetZone Prime",
    legalName: "GadgetZone Prime Commercial Corp",
    trustScore: 92,
    slaHours: 48,
    currentBid: 890,
    rating: 4.7,
    city: "Pune",
    state: "Maharashtra",
    isVerified: true,
    isoCertified: true,
    msmeRegistered: true,
    pastFulfillmentRate: 97.8,
    categories: ["Docking Stations", "Peripherals", "Hubs"],
    minLeadTimeHours: 48,
    baseMargin: 0.18,
    gstin: "27AAACG4412P1ZK",
    contactEmail: "sales@gadgetzoneprime.in",
    contactPhone: "+91 20 2749 5500"
  },
  {
    id: "ven_nexus_05",
    name: "Nexus Industrial",
    legalName: "Nexus Industrial Wholesale Solutions",
    trustScore: 94,
    slaHours: 48,
    currentBid: 865,
    rating: 4.8,
    city: "Chennai",
    state: "Tamil Nadu",
    isVerified: true,
    isoCertified: true,
    msmeRegistered: false,
    pastFulfillmentRate: 98.1,
    categories: ["Headsets", "Audio", "Industrial IT"],
    minLeadTimeHours: 48,
    baseMargin: 0.16,
    gstin: "33AABCN3391C1ZT",
    contactEmail: "orders@nexusindustrial.org",
    contactPhone: "+91 44 2811 0932"
  }
];

export const SAMPLE_PROMPT_PRESETS = [
  {
    id: "preset_wrist_rests",
    title: "Ergonomic Wrist Rests (50 units)",
    badge: "Office Ergonomics",
    prompt: "Need 50 ergonomic memory foam wrist rests under ₹900/unit with guaranteed delivery within 48 hours for our new engineering floor.",
    expected: {
      product: "Ergonomic Memory Foam Wrist Rest",
      category: "Office Ergonomics & Peripherals",
      quantity: 50,
      budgetPerUnit: 900,
      maxBudget: 45000,
      sla: "Within 48 hours",
      strategy: "AGGRESSIVE_REVERSE_AUCTION"
    }
  },
  {
    id: "preset_monitors",
    title: "Dell 27-inch 4K Monitors (20 units)",
    badge: "IT Infrastructure",
    prompt: "Source 20 units of Dell UltraSharp 27-inch 4K USB-C Hub Monitors under ₹28,500/unit with 3-year enterprise warranty and delivery in 72 hours.",
    expected: {
      product: "Dell UltraSharp 27-inch 4K USB-C Monitor",
      category: "IT Hardware & Displays",
      quantity: 20,
      budgetPerUnit: 28500,
      maxBudget: 570000,
      sla: "Within 72 hours",
      strategy: "QUALITY_FIRST"
    }
  },
  {
    id: "preset_cables",
    title: "Cat6 Ethernet Cables 3m (500 units)",
    badge: "Networking",
    prompt: "Procure 500 shielded Cat6 10Gbps Ethernet Patch Cables (3 meter length, snagless boot) under ₹160/unit, need batch dispatch in 5 days.",
    expected: {
      product: "Shielded Cat6 10Gbps Ethernet Patch Cable (3m)",
      category: "Networking & Cabling",
      quantity: 500,
      budgetPerUnit: 160,
      maxBudget: 80000,
      sla: "Within 5 days",
      strategy: "AGGRESSIVE_REVERSE_AUCTION"
    }
  },
  {
    id: "preset_keyboards",
    title: "Wireless Mechanical Keyboards (80 units)",
    badge: "Workstation Peripherals",
    prompt: "Procure 80 quiet mechanical wireless keyboards with Bluetooth & 2.4Ghz dongle under ₹3,200/unit, delivery within 4 days to Bengaluru HQ.",
    expected: {
      product: "Quiet Wireless Mechanical Keyboard (Multi-device)",
      category: "Workstation Peripherals",
      quantity: 80,
      budgetPerUnit: 3200,
      maxBudget: 256000,
      sla: "Within 4 days",
      strategy: "BALANCED"
    }
  }
];

export const EXECUTIVE_DASHBOARD_METRICS = {
  isDemoEnvironment: true,
  datasetNotice: "Based on sample procurement dataset",
  totalSpendYTD: 2845000, // ₹28.45 Lakhs (realistic demo pilot volume)
  totalSavingsYTD: 532000, // ₹5.32 Lakhs (18.7% deflation)
  auctionsCompleted: 12,
  activeAuctions: 1,
  connectedSuppliers: 18, // Verified suppliers in demo dataset
  activeContracts: 4,
  avgCycleTimeReduction: "88%",
  escrowVolumeProtected: 1890000, // ₹18.9 Lakhs
  monthlySpendTrend: [
    { month: "Jan", spend: 180000, budget: 220000, savings: 40000 },
    { month: "Feb", spend: 210000, budget: 260000, savings: 50000 },
    { month: "Mar", spend: 250000, budget: 310000, savings: 60000 },
    { month: "Apr", spend: 220000, budget: 275000, savings: 55000 },
    { month: "May", spend: 310000, budget: 380000, savings: 70000 },
    { month: "Jun", spend: 290000, budget: 360000, savings: 70000 },
    { month: "Jul", spend: 340000, budget: 420000, savings: 80000 },
    { month: "Aug", spend: 380000, budget: 470000, savings: 90000 },
    { month: "Sep", spend: 410000, budget: 510000, savings: 100000 },
    { month: "Oct", spend: 390000, budget: 480000, savings: 90000 },
    { month: "Nov", spend: 440000, budget: 540000, savings: 100000 },
    { month: "Dec", spend: 470000, budget: 580000, savings: 110000 }
  ],
  categoryBreakdown: [
    { name: "IT Hardware", value: 42, color: "#4F46E5" },
    { name: "Ergonomics & Furniture", value: 24, color: "#0EA5E9" },
    { name: "Office Consumables", value: 16, color: "#10B981" },
    { name: "Networking & Cables", value: 12, color: "#F59E0B" },
    { name: "Logistics & Packaging", value: 6, color: "#8B5CF6" }
  ],
  recentActivity: [
    {
      id: "act_01",
      type: "AUCTION_WON",
      title: "Reverse Auction #AUC-9842 Completed",
      description: "TechSupply India won bid for 50 Ergonomic Wrist Rests at ₹740/unit (17.8% under budget)",
      timestamp: "12 minutes ago",
      status: "success",
      amount: "₹37,000"
    },
    {
      id: "act_02",
      type: "ESCROW_LOCKED",
      title: "Razorpay Escrow Created",
      description: "Buyer funded ₹37,000 into Smart Collect account. Order #order_O9zKmPq14sL",
      timestamp: "24 minutes ago",
      status: "info",
      amount: "₹37,000"
    },
    {
      id: "act_03",
      type: "CONTRACT_SIGNED",
      title: "Purchase Order Authorized",
      description: "PO-2026-09842 digitally authorized and approved by Procurement Controller",
      timestamp: "1 hour ago",
      status: "purple",
      amount: "PO-2026-09842"
    },
    {
      id: "act_04",
      type: "INTENT_EXTRACTED",
      title: "New Sourcing Requisition",
      description: "Requisition created: 20x Dell UltraSharp 27'' Monitors with 72h SLA cap",
      timestamp: "2 hours ago",
      status: "neutral",
      amount: "₹5,70,000"
    },
    {
      id: "act_05",
      type: "SETTLEMENT_RELEASED",
      title: "Escrow Released to Vendor",
      description: "Two-way receipt match confirmed. Payout of ₹2,34,500 transferred to Apex Precision",
      timestamp: "5 hours ago",
      status: "success",
      amount: "₹2,34,500"
    }
  ]
};
