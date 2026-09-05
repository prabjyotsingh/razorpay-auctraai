// Auctra AI - 5-Agent Procurement Workflow Layer
// Manages inter-agent communication, telemetry, and collaborative procurement workflow execution

export const AGENT_REGISTRY = [
  {
    id: "buyer_agent",
    name: "Buyer Agent",
    persona: "Aura",
    title: "Procurement Policy Strategist",
    color: "indigo",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    avatarBg: "bg-indigo-600",
    role: "Formulates procurement mandates, enforces enterprise budget ceilings, and sets non-negotiable delivery SLAs.",
    status: "ACTIVE",
    capabilities: ["Create RFQ", "Budget Guardrails", "Dual-Signoff Routing", "ESG Enforcement"]
  },
  {
    id: "vendor_agent",
    name: "Vendor Agent",
    persona: "Nexus",
    title: "Autonomous Supplier Representative",
    color: "blue",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    avatarBg: "bg-blue-600",
    role: "Represents verified suppliers, calculates dynamic margin floors, and submits competitive quotes on supplier behalf.",
    status: "ACTIVE",
    capabilities: ["Warehouse Stock Check", "Margin Floor Calculation", "Bid Counter-Offers", "SLA Guarantees"]
  },
  {
    id: "negotiation_agent",
    name: "Negotiation Agent",
    persona: "Tactix",
    title: "Game-Theoretic Auctioneer",
    color: "amber",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    avatarBg: "bg-amber-600",
    role: "Orchestrates competitive real-time reverse auctions, paces undercutting rounds, and detects market price equilibrium.",
    status: "ACTIVE",
    capabilities: ["Reverse Auction Engine", "Equilibrium Discovery", "Anti-Sniping Logic", "Deflation Acceleration"]
  },
  {
    id: "compliance_agent",
    name: "Compliance Agent",
    persona: "Lex",
    title: "Regulatory & Tax Auditor",
    color: "emerald",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    avatarBg: "bg-emerald-600",
    role: "Validates supplier GSTINs, 3-way matching rules, ISO 9001:2015 certs, MSME priority lending, and anti-collusion checks.",
    status: "ACTIVE",
    capabilities: ["GSTIN Live Validation", "MSME Proof Checks", "Anti-Collusion Audit", "E-Way Bill Compliance"]
  },
  {
    id: "finance_agent",
    name: "Finance Agent",
    persona: "Kuber",
    title: "Razorpay Escrow Custodian",
    color: "purple",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    avatarBg: "bg-purple-600",
    role: "Manages Razorpay payment workflows, executes escrow locking, and tracks milestone payouts.",
    status: "ACTIVE",
    capabilities: ["Escrow Payment", "Contract Verification", "Milestone Payout Release", "Treasury Earmarks"]
  }
];

// Generate structured inter-agent dialogue events based on the current step and auction/contract state
export function getInterAgentEventStream(step, intent, auction, contract, escrow) {
  const events = [];
  const now = new Date();
  const timeStr = (offsetSeconds = 0) => {
    const d = new Date(now.getTime() - offsetSeconds * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const product = intent?.product || "Ergonomic Wrist Rest";
  const ceiling = intent?.budget || 900;
  const qty = intent?.quantity || 50;

  // 1. Intent Extraction / Step 1
  events.push({
    id: "evt_1",
    timestamp: timeStr(45),
    agentId: "buyer_agent",
    agentName: "Buyer Agent (Aura)",
    level: "INFO",
    message: `Extracted intent from enterprise prompt: "${product}". Established budget ceiling at ₹${ceiling}/unit for ${qty} units. Mandating ${intent?.sla || "48 hours"} SLA.`
  });

  events.push({
    id: "evt_2",
    timestamp: timeStr(40),
    agentId: "compliance_agent",
    agentName: "Compliance Agent (Lex)",
    level: "SUCCESS",
    message: `Audited category "${intent?.category || "IT Peripherals"}". GSTIN verification rule applied (18% ITC applicable). ISO 9001:2015 required.`
  });

  // 2. Vendor Discovery / Step 2
  events.push({
    id: "evt_3",
    timestamp: timeStr(30),
    agentId: "vendor_agent",
    agentName: "Vendor Agent (Nexus)",
    level: "INFO",
    message: `Sourced suppliers across IndiaMART, TradeIndia, Alibaba, and Amazon Business. 5 qualified bidders meet compliance threshold (Trust Score > 90).`
  });

  // 3. Auction Running / Completed / Step 3
  if (auction && auction.status !== "scheduled") {
    events.push({
      id: "evt_4",
      timestamp: timeStr(20),
      agentId: "negotiation_agent",
      agentName: "Negotiation Agent (Tactix)",
      level: "PROGRESS",
      message: `Reverse auction active. Opening bid established at ₹${auction.startPrice || ceiling}/unit. Pacing rounds at 2.5s intervals.`
    });

    events.push({
      id: "evt_5",
      timestamp: timeStr(12),
      agentId: "vendor_agent",
      agentName: "Vendor Agent (Nexus)",
      level: "SUCCESS",
      message: `${auction.winningVendor || "TechHub Direct"} executed automated undercut to ₹${auction.currentLowestBid}/unit. Floor margin preserved at 12.4%.`
    });

    if (auction.status === "completed" || auction.isFinished) {
      events.push({
        id: "evt_6",
        timestamp: timeStr(5),
        agentId: "negotiation_agent",
        agentName: "Negotiation Agent (Tactix)",
        level: "SUCCESS",
        message: `Auction concluded. Optimal market equilibrium achieved: ₹${auction.currentLowestBid}/unit. Realized total savings of ₹${(auction.savingsAmount || 8000).toLocaleString("en-IN")} (${auction.savingsPercent || "17.8"}% deflation).`
      });
    }
  }

  // 4. Contract Generation / Step 4
  if (step >= 4 || contract) {
    events.push({
      id: "evt_7",
      timestamp: timeStr(3),
      agentId: "compliance_agent",
      agentName: "Compliance Agent (Lex)",
      level: "SUCCESS",
      message: `Generated Purchase Order ${contract?.poNumber || "PO-2026-98421"}. Document Reference: ${contract?.contractHash?.slice(0, 18) || "0x7f83b165..."}...`
    });
  }

  // 5. Escrow Payment / Step 5
  if (step >= 5 || escrow) {
    events.push({
      id: "evt_8",
      timestamp: timeStr(1),
      agentId: "finance_agent",
      agentName: "Finance Agent (Kuber)",
      level: "FINANCE",
      message: `Razorpay Escrow order initialized (${escrow?.orderId || "order_auctra_live"}). Escrow amount: ₹${(contract?.totalAmount || 37000).toLocaleString("en-IN")}. Payout locked pending physical inspection gate.`
    });
  }

  return events;
}
