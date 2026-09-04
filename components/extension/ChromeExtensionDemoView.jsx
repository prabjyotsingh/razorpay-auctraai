"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import SupplierProfileDrawer from "@/components/suppliers/SupplierProfileDrawer";
import { REAL_WORLD_SUPPLIERS } from "@/lib/suppliers/b2bPlatforms";
import { 
  Building2, 
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  ShoppingBag,
  Layers,
  FileDown,
  Download,
  ChevronRight,
  Info
} from "lucide-react";

export default function ChromeExtensionDemoView() {
  const router = useRouter();
  const { loadRfqAndLaunchAuction } = useProcurementStore();

  const [selectedSupplierForDrawer, setSelectedSupplierForDrawer] = useState(null);
  const [activeMarketplace, setActiveMarketplace] = useState("indiamart");
  const [simulatedButtonState, setSimulatedButtonState] = useState("idle"); // "idle" | "loading" | "success"

  const marketplaceOptions = {
    indiamart: {
      name: "IndiaMART Verified",
      color: "#059669",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      url: "https://dir.indiamart.com/proddetail/ergonomic-wrist-rest-9812.html",
      productName: "Ergonomic Memory Foam Wrist Rest Set (Gel Cooling)",
      supplier: "TechHub Direct Sourcing Pvt Ltd",
      quotedPrice: 850,
      moq: 50,
      bestMarketBid: 689,
      potentialSavings: 8050,
      suppliersAvailable: 18,
      slaHours: 24,
      gstin: "29AAACT9812M1Z2",
      rating: "4.9 / 5.0 (3,810 B2B orders)"
    },
    amazon: {
      name: "Amazon Business (India)",
      color: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
      url: "https://business.amazon.in/dp/B08XYZ412-Ergonomic-Wrist-Rest",
      productName: "Ergonomic Dual-Density Memory Foam Wrist Rest with Non-Skid PU Base",
      supplier: "Cloudtail Commercial Direct",
      quotedPrice: 899,
      moq: 50,
      bestMarketBid: 710,
      potentialSavings: 9450,
      suppliersAvailable: 14,
      slaHours: 24,
      gstin: "27AABCC4432F1Z8",
      rating: "4.8 / 5.0 (1,420 Business Prime Orders)"
    },
    alibaba: {
      name: "Alibaba Global Wholesale",
      color: "#EA580C",
      bg: "#FFF7ED",
      border: "#FED7AA",
      url: "https://www.alibaba.com/product-detail/Industrial-Memory-Foam-Wrist-Rest.html",
      productName: "OEM Industrial Memory Foam Support Cushion for High-Usage Workstations",
      supplier: "Shenzhen Ergonomic Dynamics Co., Ltd.",
      quotedPrice: 820,
      moq: 100,
      bestMarketBid: 650,
      potentialSavings: 17000,
      suppliersAvailable: 22,
      slaHours: 72,
      gstin: "IEC-9821039841",
      rating: "4.9 / 5.0 ($500k Trade Assurance)"
    }
  };

  const activeQuote = marketplaceOptions[activeMarketplace];

  const techHubSupplier = REAL_WORLD_SUPPLIERS.find(s => s.name.includes("TechHub")) || {
    id: "ven_techhub_01",
    name: "TechHub Direct",
    legalName: "TechHub Direct Sourcing Pvt Ltd",
    trustScore: 98,
    pastFulfillmentRate: 99.2,
    slaHours: 24,
    totalTransactions: 3810,
    contractValueCr: 6.8,
    gstin: "29AAACT9812M1Z2",
    city: "Bengaluru",
    state: "Karnataka",
    creditRating: "AAA",
    platformLabel: "IndiaMART Star Supplier"
  };

  const handleLaunchAuction = () => {
    loadRfqAndLaunchAuction({
      productName: activeQuote.productName,
      price: activeQuote.quotedPrice,
      quantity: activeQuote.moq,
      supplier: activeQuote.supplier,
      source: activeQuote.name,
      url: activeQuote.url
    });
    router.push("/");
  };

  const handleCreateRfqAndOpenPage = async () => {
    try {
      const res = await fetch("/api/extension/create-rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: activeQuote.productName,
          price: activeQuote.quotedPrice,
          moq: activeQuote.moq,
          supplier: activeQuote.supplier,
          source: activeQuote.name,
          url: activeQuote.url
        })
      });
      const data = await res.json();
      const rfqId = data?.rfqId || "RFQ-2848";
      router.push(`/rfq/${rfqId}`);
    } catch {
      router.push("/rfq/RFQ-2848");
    }
  };

  const handleSimulatedPillClick = async () => {
    setSimulatedButtonState("loading");
    try {
      const res = await fetch("/api/extension/create-rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: activeQuote.productName,
          price: activeQuote.quotedPrice,
          moq: activeQuote.moq,
          supplier: activeQuote.supplier,
          source: activeQuote.name,
          url: activeQuote.url
        })
      });
      const data = await res.json();
      const rfqId = data?.rfqId || "RFQ-2848";

      setTimeout(() => {
        setSimulatedButtonState("success");
        setTimeout(() => {
          router.push(`/rfq/${rfqId}`);
        }, 500);
      }, 700);
    } catch {
      setTimeout(() => {
        setSimulatedButtonState("success");
        setTimeout(() => {
          router.push("/rfq/RFQ-2848");
        }, 500);
      }, 700);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 text-[#0F172A] font-sans pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[11px] bg-white border border-[#EEF2F7] shadow-xs flex items-center justify-center p-1.5 shrink-0">
              <img src="/brand-mark.png" alt="Auctra AI" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-0.5 rounded-full">
                Chrome Copilot
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Browser Sourcing Active
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Chrome Copilot Sourcing
          </h1>
          <p className="text-[13.5px] text-[#64748B]">
            One-click quote capture from IndiaMART, Amazon Business &amp; Alibaba directly into your procurement workspace.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/auctra-procurement-copilot-v1.0.0.zip"
            download
            className="h-10 text-[12.5px] font-semibold text-[#0F172A] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 rounded-[12px] flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Download size={14} className="text-[#64748B]" />
            <span>Download Extension ZIP</span>
          </a>
        </div>
      </div>

      {/* End-to-End Evaluation Workflow Banner */}
      <div className="p-4 rounded-[18px] bg-gradient-to-r from-[#EFF6FF] via-[#F8FAFC] to-[#EFF6FF] border border-[#BFDBFE] space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#2563EB]" />
            <span className="text-[12.5px] font-bold text-[#1E40AF] uppercase tracking-wider">
              Chrome Extension Procurement Flow
            </span>
          </div>
          <span className="text-[11.5px] font-semibold text-[#059669] bg-white border border-[#A7F3D0] px-2.5 py-0.5 rounded-full">
            Live Verified Pipeline
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-[11.5px] font-semibold text-[#334155] py-1">
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0 text-[#2563EB]">
            1. IndiaMART Product
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0 text-[#2563EB]">
            2. Click Auctra Extension
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0 text-[#2563EB]">
            3. Create RFQ
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0 text-[#2563EB]">
            4. RFQ Page Opens
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0">
            5. Find Suppliers
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0">
            6. Launch Auction
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0">
            7. Winning Bid
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0">
            8. Generate PO
          </span>
          <ChevronRight size={12} className="text-[#94A3B8] shrink-0" />
          <span className="px-2 py-1 rounded-[8px] bg-white border border-[#CBD5E1] shadow-2xs shrink-0 text-[#059669]">
            9. Escrow
          </span>
        </div>
      </div>

      {/* 2. Interactive Marketplace Window Preview with the EXACT Floating Pill */}
      <div className="premium-card p-0 overflow-hidden border border-[#EEF2F7]">
        {/* Browser Mockup Chrome Bar */}
        <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#EEF2F7] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/70" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/70" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/70" />
            </div>

            {/* Marketplace Selectors */}
            <div className="flex items-center gap-1 bg-[#EEF2F7]/80 p-0.5 rounded-[10px]">
              {Object.keys(marketplaceOptions).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMarketplace(key)}
                  className={`px-3 py-1 text-[11.5px] font-medium rounded-[8px] transition-all cursor-pointer ${
                    activeMarketplace === key
                      ? "bg-white text-[#0F172A] font-semibold shadow-2xs"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {marketplaceOptions[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-md bg-white border border-[#E2E8F0] rounded-[10px] px-3 py-1 text-[11px] font-mono text-[#64748B] truncate">
            <Lock size={11} className="text-[#10B981] shrink-0" />
            <span className="truncate">{activeQuote.url}</span>
          </div>
        </div>

        {/* Simulated Webpage Surface */}
        <div className="relative p-6 lg:p-8 bg-gradient-to-b from-[#FAFAFA] to-white min-h-[360px] flex flex-col justify-between">
          {/* Simulated Marketplace Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Product Image & Badge */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-[16px] bg-gradient-to-tr from-[#EFF6FF] to-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden shadow-2xs">
                <div className="w-14 h-14 rounded-[14px] bg-white border border-[#DBEAFE] shadow-sm flex items-center justify-center mb-2">
                  <ShoppingBag size={24} className="text-[#2563EB]" />
                </div>
                <div className="text-[12px] font-bold text-[#0F172A]">{activeQuote.name}</div>
                <div className="text-[10.5px] text-[#64748B] mt-0.5">Verified Commercial SKU</div>
              </div>

              <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] text-[11.5px] space-y-1">
                <div className="text-[#64748B]">Sourced Vendor:</div>
                <div className="font-semibold text-[#0F172A]">{activeQuote.supplier}</div>
                <div className="text-[#059669] font-medium">{activeQuote.rating}</div>
              </div>
            </div>

            {/* Sourcing Specs */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span 
                  className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border mb-2 bg-white shadow-2xs"
                  style={{ color: activeQuote.color, borderColor: activeQuote.border }}
                >
                  <CheckCircle2 size={11} />
                  {activeQuote.name} Ingestion Active
                </span>
                <h2 className="text-lg lg:text-xl font-bold text-[#0F172A] leading-snug">
                  {activeQuote.productName}
                </h2>
                <div className="text-[12px] text-[#64748B] mt-1 flex items-center gap-3">
                  <span>GSTIN: <strong className="font-mono text-[#0F172A]">{activeQuote.gstin}</strong></span>
                  <span>•</span>
                  <span>Turnaround SLA: <strong className="text-[#0F172A]">{activeQuote.slaHours} Hours</strong></span>
                </div>
              </div>

              {/* Price & Commitment Box - Pure White Background */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-[16px] bg-white border border-[#E2E8F0] shadow-xs">
                <div>
                  <div className="text-[11px] font-medium text-[#64748B]">Quoted Wholesale Rate</div>
                  <div className="text-xl font-bold text-[#0F172A] font-mono mt-0.5">
                    ₹{activeQuote.quotedPrice} <span className="text-xs font-normal text-[#64748B]">/ unit</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-[#64748B]">Commitment MOQ</div>
                  <div className="text-xl font-bold text-[#0F172A] font-mono mt-0.5">
                    {activeQuote.moq} Units
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-medium text-[#64748B]">Total Batch Spend</div>
                  <div className="text-xl font-bold text-[#2563EB] font-mono mt-0.5">
                    ₹{(activeQuote.quotedPrice * activeQuote.moq).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Notice Banner - Pure White Background */}
              <div className="flex items-center gap-2.5 p-3 rounded-[12px] bg-white border border-[#E2E8F0] text-[12px] text-[#334155] shadow-xs">
                <Info size={14} className="shrink-0 text-[#2563EB]" />
                <span>
                  Auctra captures product specifications, order quantities, and pricing from active supplier listings.
                </span>
              </div>
            </div>
          </div>

          {/* THE EXACT FLOATING BUTTON REQUESTED BY USER - White Background & White Badge */}
          <div className="pt-8 flex justify-end">
            <div className="relative">
              <button
                type="button"
                onClick={handleSimulatedPillClick}
                disabled={simulatedButtonState !== "idle"}
                className="group relative flex items-center gap-3 px-4 py-2.5 rounded-[14px] bg-white text-[#0F172A] border border-[#E2E8F0] shadow-[0_8px_28px_rgba(15,23,42,0.12)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.18)] hover:border-[#CBD5E1] transition-all duration-200 cursor-pointer select-none hover:-translate-y-0.5 active:translate-y-0 text-left"
              >
                {/* Official Auctra Logo Mark with White Background */}
                <div className="w-8 h-8 rounded-[9px] bg-white border border-[#E2E8F0] flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src="/brand-mark.png"
                    alt="Auctra"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Button Typography */}
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-bold tracking-[0.06em] text-[#64748B] uppercase">
                    Auctra
                  </span>
                  <span className="text-[13.5px] font-bold tracking-tight text-[#0F172A] flex items-center gap-1.5">
                    {simulatedButtonState === "idle" && (
                      <>
                        <span>Create RFQ</span>
                        <ChevronRight size={13} className="text-[#2563EB] group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                    {simulatedButtonState === "loading" && (
                      <>
                        <RefreshCw size={13} className="animate-spin text-[#2563EB]" />
                        <span>Analyzing Vendor...</span>
                      </>
                    )}
                    {simulatedButtonState === "success" && (
                      <>
                        <span className="text-[#059669]">✓ RFQ Created</span>
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Callout Indicator pointing to the button - White Background */}
              <div className="absolute -top-7 right-0 flex items-center gap-1 text-[11px] font-bold text-[#0F172A] bg-white border border-[#E2E8F0] px-2.5 py-0.5 rounded-full shadow-xs pointer-events-none whitespace-nowrap">
                <Sparkles size={10} className="text-[#2563EB]" />
                <span>Chrome Extension Bridge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deflation Intelligence & Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="premium-card p-5 space-y-1">
          <div className="text-[11.5px] font-medium text-[#64748B]">Quoted Baseline</div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono">
            ₹{activeQuote.quotedPrice}
          </div>
          <div className="text-[11px] text-[#64748B]">Single supplier rate</div>
        </div>

        <div className="premium-card p-5 space-y-1">
          <div className="text-[11.5px] font-medium text-[#64748B]">Expected Auction Floor</div>
          <div className="text-2xl font-bold text-[#2563EB] font-mono">
            ₹{activeQuote.bestMarketBid}
          </div>
          <div className="text-[11px] text-[#2563EB] font-medium">18.9% target deflation</div>
        </div>

        <div className="premium-card p-5 space-y-1">
          <div className="text-[11.5px] font-medium text-[#64748B]">Total Opportunity Savings</div>
          <div className="text-2xl font-bold text-[#10B981] font-mono">
            ₹{activeQuote.potentialSavings.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-[#059669] font-medium">Direct gross savings</div>
        </div>

        <div className="premium-card p-5 space-y-1">
          <div className="text-[11.5px] font-medium text-[#64748B]">Qualified Fleet</div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono">
            {activeQuote.suppliersAvailable} Vendors
          </div>
          <div className="text-[11px] text-[#64748B]">Ready for reverse bidding</div>
        </div>
      </div>

      {/* 4. Action Deck & Vendor Due Diligence */}
      <div className="premium-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-[#0F172A]">
              Start Reverse Auction
            </h3>
            <span className="text-[11px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
              Escrow Protected
            </span>
          </div>
          <p className="text-[13px] text-[#64748B]">
            Invite verified commercial suppliers to a real-time reverse auction to discover competitive market pricing.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setSelectedSupplierForDrawer(techHubSupplier)}
            className="h-10 px-4 text-[12.5px] font-medium text-[#0F172A] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] transition-colors cursor-pointer"
          >
            Audit Supplier
          </button>

          <button
            onClick={handleCreateRfqAndOpenPage}
            className="primary-gradient-btn h-10 px-5 text-[12.5px] flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Sparkles size={14} />
            <span>Create RFQ &amp; Open Page</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Supplier Profile Drawer */}
      <SupplierProfileDrawer
        supplier={selectedSupplierForDrawer}
        isOpen={Boolean(selectedSupplierForDrawer)}
        onClose={() => setSelectedSupplierForDrawer(null)}
        onSelectForRfq={handleLaunchAuction}
      />
    </div>
  );
}
