"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Clock, 
  Award,
  ArrowUpDown,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import SupplierProfileDrawer from "@/components/suppliers/SupplierProfileDrawer";

export default function DashboardView() {
  const router = useRouter();
  const { 
    metrics, 
    setActiveStep, 
    setCurrentView,
    extractedIntent,
    auctionState,
    allVendors
  } = useProcurementStore();

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [rfqSearch, setRfqSearch] = useState("");
  const [supplierSortKey, setSupplierSortKey] = useState("trustScore");
  const [supplierSortAsc, setSupplierSortAsc] = useState(false);

  const currentLowest = auctionState?.currentLowestBid || 740;
  const ceiling = extractedIntent?.budget || 900;
  const quantity = extractedIntent?.quantity || 50;
  const savingsPct = ceiling > 0 ? (((ceiling - currentLowest) / ceiling) * 100).toFixed(1) : "17.8";

  // Active RFQs Dataset
  const rfqList = useMemo(() => [
    {
      id: "RFQ-2847",
      title: extractedIntent?.product || "Ergonomic Memory Foam Wrist Rest",
      category: "IT Hardware & Peripherals",
      costCenter: "Corp Tech Operations",
      quantity: quantity,
      unit: "Units",
      ceilingPrice: ceiling,
      bestBidPrice: currentLowest,
      savingsPct: savingsPct,
      savingsAmount: (ceiling - currentLowest) * quantity,
      deliverySla: "48 Hours",
      status: "AUCTION_ACTIVE",
      suppliersActive: 18,
      actionStep: 3,
      actionLabel: "Enter Auction"
    },
    {
      id: "RFQ-2846",
      title: "High-Density 42U Server Rack Enclosures",
      category: "Data Center Infrastructure",
      costCenter: "Cloud Engineering",
      quantity: 12,
      unit: "Racks",
      ceilingPrice: 70000,
      bestBidPrice: 61833,
      savingsPct: "11.7",
      savingsAmount: 98000,
      deliverySla: "5 Days",
      status: "CONTRACT_READY",
      suppliersActive: 8,
      actionStep: 4,
      actionLabel: "Review Contract"
    },
    {
      id: "RFQ-2845",
      title: "Enterprise Laptops (i7 / 32GB RAM / 1TB SSD)",
      category: "End-User Computing",
      costCenter: "Product Engineering",
      quantity: 120,
      unit: "Laptops",
      ceilingPrice: 90000,
      bestBidPrice: 78500,
      savingsPct: "12.8",
      savingsAmount: 1380000,
      deliverySla: "7 Days",
      status: "COMPLETED",
      suppliersActive: 14,
      actionStep: 5,
      actionLabel: "View Payment"
    },
    {
      id: "RFQ-2844",
      title: "Mesh Ergonomic High-Back Executive Chairs",
      category: "Facilities & Workplace",
      costCenter: "Workspace Experience",
      quantity: 80,
      unit: "Chairs",
      ceilingPrice: 16000,
      bestBidPrice: 13875,
      savingsPct: "13.3",
      savingsAmount: 170000,
      deliverySla: "3 Days",
      status: "EVALUATING",
      suppliersActive: 11,
      actionStep: 2,
      actionLabel: "Find Suppliers"
    }
  ], [extractedIntent, currentLowest, ceiling, quantity, savingsPct]);

  // Supplier fleet list
  const suppliers = useMemo(() => [
    {
      id: "VEN-001",
      name: "TechHub Direct Pvt Ltd",
      gstin: "29AABCT1334Q1ZV",
      category: "IT Hardware & Peripherals",
      city: "Bengaluru, Karnataka",
      trustScore: 98,
      slaRating: "99.4%",
      contractVolume: "₹42.5 Lakhs",
      complianceStatus: "GST Verified"
    },
    {
      id: "VEN-002",
      name: "OfficeMart India Commercial",
      gstin: "27AAACA9876C1Z4",
      category: "Office Ergonomics",
      city: "Mumbai, Maharashtra",
      trustScore: 95,
      slaRating: "98.7%",
      contractVolume: "₹28.0 Lakhs",
      complianceStatus: "GST Verified"
    },
    {
      id: "VEN-003",
      name: "SwiftProcure Systems",
      gstin: "29AABCS8821L1Z8",
      category: "Commercial Office Supplies",
      city: "Bengaluru, Karnataka",
      trustScore: 97,
      slaRating: "99.1%",
      contractVolume: "₹36.0 Lakhs",
      complianceStatus: "GST Verified"
    },
    {
      id: "VEN-004",
      name: "Bharat Wholesale Distribution",
      gstin: "33AABCN3391C1ZT",
      category: "Enterprise Consumables",
      city: "Chennai, Tamil Nadu",
      trustScore: 92,
      slaRating: "97.5%",
      contractVolume: "₹19.5 Lakhs",
      complianceStatus: "GST Verified"
    }
  ], []);

  // Filtered RFQs
  const filteredRfqs = rfqList.filter(rfq => 
    rfq.id.toLowerCase().includes(rfqSearch.toLowerCase()) ||
    rfq.title.toLowerCase().includes(rfqSearch.toLowerCase()) ||
    rfq.category.toLowerCase().includes(rfqSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Cockpit Header & Demo Environment Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Procurement Operations
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Enterprise supplier discovery, competitive reverse auctions, and milestone escrow settlement.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[12px] font-semibold text-[#1D4ED8] self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span>Demo Environment • Live Operations</span>
        </div>
      </div>

      {/* 1. 4 Realistic Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Batch Savings Generated */}
        <div className="premium-card">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Batch Cost Deflation</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
              <TrendingUp size={11} strokeWidth={2.5} />
              -{savingsPct}%
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-none font-mono">
                ₹{((ceiling - currentLowest) * quantity).toLocaleString("en-IN")}
              </div>
              <p className="text-[11.5px] text-[#64748B] mt-1 font-normal">
                vs ₹{(ceiling * quantity).toLocaleString("en-IN")} ceiling budget
              </p>
            </div>

            {/* Tiny SVG Sparkline */}
            <div className="w-16 h-8 pb-1">
              <svg viewBox="0 0 64 32" fill="none" className="w-full h-full">
                <path
                  d="M2 28 C 12 24, 20 20, 30 14 C 40 18, 50 8, 62 4"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Current Best Bid */}
        <div className="premium-card">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Current Lowest Bid</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
              <TrendingDown size={11} strokeWidth={2.5} />
              Auction Live
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-none font-mono">
                ₹{currentLowest.toLocaleString("en-IN")}
              </div>
              <p className="text-[11.5px] text-[#64748B] mt-1 font-normal">
                Per unit (50-unit active RFQ)
              </p>
            </div>

            {/* Tiny SVG Sparkline */}
            <div className="w-16 h-8 pb-1">
              <svg viewBox="0 0 64 32" fill="none" className="w-full h-full">
                <path
                  d="M2 6 C 14 8, 24 16, 36 20 C 46 22, 54 26, 62 28"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Qualified Suppliers */}
        <div className="premium-card">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Verified Suppliers</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
              <CheckCircle2 size={11} strokeWidth={2.5} />
              GSTIN Audited
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-none font-mono">
                18
              </div>
              <p className="text-[11.5px] text-[#64748B] mt-1 font-normal">
                B2B catalog dataset
              </p>
            </div>

            {/* Tiny SVG Sparkline */}
            <div className="w-16 h-8 pb-1">
              <svg viewBox="0 0 64 32" fill="none" className="w-full h-full">
                <path
                  d="M2 24 C 16 22, 28 16, 40 12 C 50 14, 56 6, 62 4"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Sample RFQ Pipelines */}
        <div className="premium-card">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-[#64748B]">Sample Procurement Events</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full">
              <CheckCircle2 size={11} strokeWidth={2.5} />
              Sample Dataset
            </span>
          </div>

          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[28px] font-bold text-[#0F172A] tracking-tight leading-none font-mono">
                4 RFQs
              </div>
              <p className="text-[11.5px] text-[#64748B] mt-1 font-normal">
                Pre-configured test events
              </p>
            </div>

            {/* Tiny SVG Sparkline */}
            <div className="w-16 h-8 pb-1">
              <svg viewBox="0 0 64 32" fill="none" className="w-full h-full">
                <path
                  d="M2 20 C 14 18, 24 14, 38 10 C 48 8, 56 6, 62 4"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Modern Data Grid: Active RFQs & Sourcing Events */}
      <div className="premium-card p-0 overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-5 pb-4 border-b border-[#EEF2F7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
              Active RFQs &amp; Sourcing Events
            </h2>
            <p className="text-[12.5px] text-[#64748B] mt-0.5 font-normal">
              Manage competitive bidding, supplier quotes, and purchase orders in real time.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search RFQs, categories..."
                value={rfqSearch}
                onChange={(e) => setRfqSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3.5 text-[12.5px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all"
              />
            </div>

            <button
              onClick={() => {
                setActiveStep(1);
                setCurrentView("step1");
                router.push("/rfqs");
              }}
              className="primary-gradient-btn h-9 px-3.5 text-[12.5px] flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>New RFQ</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#EEF2F7] text-[12px] font-semibold text-[#64748B]">
                <th className="py-3 px-5">Requisition</th>
                <th className="py-3 px-4">Cost Center</th>
                <th className="py-3 px-4 text-center">Volume</th>
                <th className="py-3 px-4 text-right">Target Price</th>
                <th className="py-3 px-4 text-right">Best Bid</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px] divide-y divide-[#EEF2F7]">
              {filteredRfqs.map((rfq, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr 
                    key={rfq.id}
                    className={`transition-colors hover:bg-[#F1F5F9]/60 ${isEven ? "bg-white" : "bg-[#FAFAFA]/50"}`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-[#0F172A] flex items-center gap-2">
                        <span>{rfq.title}</span>
                      </div>
                      <div className="text-[11.5px] text-[#64748B] flex items-center gap-2 mt-0.5 font-normal">
                        <span className="font-mono text-[#2563EB] font-medium">{rfq.id}</span>
                        <span>•</span>
                        <span>{rfq.category}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#64748B] text-[12.5px]">
                      {rfq.costCenter}
                    </td>

                    <td className="py-3.5 px-4 text-center text-[#0F172A] font-medium text-[12.5px]">
                      {rfq.quantity} {rfq.unit}
                    </td>

                    <td className="py-3.5 px-4 text-right text-[#64748B] font-mono text-[13px]">
                      ₹{rfq.ceilingPrice.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-[#0F172A] font-mono text-[13.5px]">
                        ₹{rfq.bestBidPrice.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">
                        Save {rfq.savingsPct}%
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {rfq.status === "AUCTION_ACTIVE" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                          Live Auction
                        </span>
                      )}
                      {rfq.status === "CONTRACT_READY" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          Contract Ready
                        </span>
                      )}
                      {rfq.status === "COMPLETED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          Settled
                        </span>
                      )}
                      {rfq.status === "EVALUATING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F8FAFC] text-[#4F46E5] border border-[#E2E8F0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
                          Finding Suppliers
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => {
                          setActiveStep(rfq.actionStep);
                          if (rfq.actionStep === 1) { setCurrentView("step1"); router.push("/rfqs"); }
                          else if (rfq.actionStep === 2) { setCurrentView("step2"); router.push("/suppliers"); }
                          else if (rfq.actionStep === 3) { setCurrentView("step3"); router.push("/auctions"); }
                          else if (rfq.actionStep === 4) { setCurrentView("step4"); router.push("/contracts"); }
                          else if (rfq.actionStep === 5) { setCurrentView("step5"); router.push("/escrow"); }
                        }}
                        className="h-8 px-3 text-[12px] font-medium text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] rounded-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>{rfq.actionLabel}</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRfqs.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center mx-auto mb-3">
                <Search size={20} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0F172A]">No RFQs match your search</h3>
              <p className="text-[12.5px] text-[#64748B] mt-1 max-w-sm mx-auto">
                No active sourcing events or purchase orders found matching &ldquo;{rfqSearch}&rdquo;.
              </p>
              <button
                onClick={() => setRfqSearch("")}
                className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-[10px] transition-colors cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Section: Verified Suppliers & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Verified Supplier Fleet */}
        <div className="lg:col-span-2 premium-card p-0 overflow-hidden">
          <div className="p-5 pb-3.5 border-b border-[#EEF2F7] flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
                Verified Supplier Fleet
              </h3>
              <p className="text-[12px] text-[#64748B] mt-0.5">
                Qualified vendors with audited GSTIN and SLA compliance.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView("vendors");
                router.push("/suppliers");
              }}
              className="text-[12.5px] font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Fleet</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="divide-y divide-[#EEF2F7]">
            {suppliers.map((supp) => (
              <div 
                key={supp.id} 
                className="p-4 px-5 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                onClick={() => setSelectedSupplier(supp)}
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#0F172A] text-[13.5px] flex items-center gap-2">
                    <span>{supp.name}</span>
                    <span className="text-[10.5px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-[6px]">
                      {supp.gstin}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#64748B] flex items-center gap-3">
                    <span>{supp.category}</span>
                    <span>•</span>
                    <span>{supp.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[13px] font-bold text-[#0F172A] font-mono">
                      {supp.trustScore}
                      <span className="text-[11px] text-[#94A3B8] font-normal">/100</span>
                    </div>
                    <div className="text-[11px] text-[#10B981] font-medium">
                      {supp.slaRating} SLA
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSupplier(supp);
                    }}
                    className="h-8 px-3 text-[12px] font-medium text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-[10px] transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Live Activity Stream */}
        <div className="premium-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F7]">
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
                Activity Stream
              </h3>
              <p className="text-[12px] text-[#64748B] mt-0.5">
                Real-time procurement audit trail
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          </div>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 text-[12.5px]">
              <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                ₹
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-semibold text-[#0F172A] leading-snug">
                  New Lowest Bid Placed
                </p>
                <p className="text-[#64748B] text-[11.5px]">
                  SwiftProcure placed ₹740 on RFQ-2847
                </p>
                <span className="text-[10.5px] text-[#94A3B8]">2 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[12.5px]">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={13} />
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-semibold text-[#0F172A] leading-snug">
                  Purchase Order Approved
                </p>
                <p className="text-[#64748B] text-[11.5px]">
                  PO-2026-72469 signed by Procurement Officer
                </p>
                <span className="text-[10.5px] text-[#94A3B8]">18 minutes ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[12.5px]">
              <div className="w-7 h-7 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={13} />
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-semibold text-[#0F172A] leading-snug">
                  Escrow Deposit Secured
                </p>
                <p className="text-[#64748B] text-[11.5px]">
                  ₹37,000 locked • Powered by Razorpay Payment Infrastructure
                </p>
                <span className="text-[10.5px] text-[#94A3B8]">1 hour ago</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[12.5px]">
              <div className="w-7 h-7 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <Clock size={13} />
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-semibold text-[#0F172A] leading-snug">
                  RFQ Ingested from Chrome
                </p>
                <p className="text-[#64748B] text-[11.5px]">
                  50x Ergonomic Wrist Rests captured from IndiaMART
                </p>
                <span className="text-[10.5px] text-[#94A3B8]">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Supplier Profile Drawer */}
      {selectedSupplier && (
        <SupplierProfileDrawer
          supplier={selectedSupplier}
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </div>
  );
}
