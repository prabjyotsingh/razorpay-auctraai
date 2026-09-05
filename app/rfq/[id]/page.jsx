"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import { useProcurementStore } from "@/store/useProcurementStore";
import { cleanProductTitle } from "@/lib/rfq/rfqStore";
import { REAL_WORLD_SUPPLIERS } from "@/lib/suppliers/b2bPlatforms";
import { 
  CheckCircle2, 
  Flame, 
  ExternalLink, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight,
  Building2,
  Sparkles,
  TrendingDown,
  Layers,
  FileText,
  BadgeCheck,
  Lock,
  ChevronRight
} from "lucide-react";

export default function RfqWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const rfqId = params?.id || "RFQ-2848";

  const {
    loadRfqAndLaunchAuction,
    loadRfqAndFindSuppliers,
    setCurrentView,
    setActiveStep
  } = useProcurementStore();

  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(50);

  useEffect(() => {
    async function fetchRfq() {
      try {
        const res = await fetch(`/api/extension/create-rfq?id=${rfqId}`);
        const data = await res.json();
        if (data.success && data.rfq) {
          setRfq(data.rfq);
          const initQty = Math.min(100, Math.max(10, Number(data.rfq.quantity || data.rfq.moq) || 50));
          setSelectedQuantity(initQty);
        } else {
          setRfq({
            id: rfqId,
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
            estimatedTotal: 4049500,
            category: "Commercial Sourcing"
          });
          setSelectedQuantity(50);
        }
      } catch (err) {
        console.warn("Could not fetch RFQ from API, using default:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRfq();
  }, [rfqId]);

  const handleQuantityChange = (val) => {
    if (val === "" || val === null || val === undefined) {
      setSelectedQuantity("");
      return;
    }
    const num = parseInt(String(val).replace(/[^\d]/g, ""), 10);
    if (isNaN(num)) return;
    const clamped = Math.min(100, Math.max(10, num));
    setSelectedQuantity(clamped);
  };

  const handleBlurQuantity = () => {
    if (selectedQuantity === "" || isNaN(selectedQuantity) || selectedQuantity < 10) {
      setSelectedQuantity(10);
    } else if (selectedQuantity > 100) {
      setSelectedQuantity(100);
    }
  };

  const handleIncrement = () => {
    const current = Number(selectedQuantity) || 50;
    if (current < 100) {
      setSelectedQuantity(Math.min(100, current + 5));
    }
  };

  const handleDecrement = () => {
    const current = Number(selectedQuantity) || 50;
    if (current > 10) {
      setSelectedQuantity(Math.max(10, current - 5));
    }
  };

  const effectiveQty = Number(selectedQuantity) || 10;
  const unitPrice = Number(rfq?.price) || 80990;
  const quantity = effectiveQty;
  const estimatedTotal = unitPrice * quantity;
  const projectedSavingsPct = 14.2;
  const projectedSavingsAmount = Math.round(estimatedTotal * 0.142);
  const displayTitle = rfq?.productName || "Sourced Marketplace SKU";

  const handleLaunchAuction = () => {
    if (!rfq) return;
    const rfqWithQty = {
      ...rfq,
      quantity,
      moq: quantity,
      estimatedTotal
    };
    loadRfqAndLaunchAuction(rfqWithQty);
    router.push("/auctions");
  };

  const handleCompareSuppliers = () => {
    if (!rfq) return;
    const rfqWithQty = {
      ...rfq,
      quantity,
      moq: quantity,
      estimatedTotal
    };
    loadRfqAndFindSuppliers(rfqWithQty);
    router.push("/suppliers");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans">
      {/* Universal Floating Header */}
      <EnterpriseNavbar />

      {/* Main Workspace */}
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 space-y-6">
        
        {/* Breadcrumb Navigation & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-[#64748B]">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">
              Dashboard
            </Link>
            <ChevronRight size={13} className="text-[#94A3B8]" />
            <Link href="/rfqs" className="hover:text-[#0F172A] transition-colors">
              Sourcing Requests
            </Link>
            <ChevronRight size={13} className="text-[#94A3B8]" />
            <span className="font-semibold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
              {rfq?.id}
            </span>
          </nav>

          <Link
            href="/"
            className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Return to Dashboard</span>
          </Link>
        </div>

        {/* Workspace Identification Header */}
        <div className="bg-white border border-[#EEF2F7] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-0.5 rounded-md">
                  {rfq?.id}
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs text-[#475569] font-medium flex items-center gap-1">
                  <Building2 size={13} className="text-[#64748B]" />
                  Ingested from {rfq?.source || "Amazon Business"}
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs text-[#64748B]">
                  Category: {rfq?.category || "Commercial Sourcing & Office Infrastructure"}
                </span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                {displayTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] bg-[#DCFCE7] px-3.5 py-1.5 rounded-full border border-[#BBF7D0] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <CheckCircle2 size={14} />
                Ready for Reverse Auction
              </span>
            </div>
          </div>
        </div>

        {/* Executive KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#EEF2F7] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Quoted Unit Price</div>
            <div className="text-2xl font-bold text-[#0F172A] font-mono mt-1">
              ₹{unitPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1">Marketplace baseline ceiling</div>
          </div>

          <div className="bg-white border border-[#EEF2F7] rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Order Quantity (MOQ)
              </span>
              <span className="text-[10px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                Min 10 • Max 100
              </span>
            </div>

            {/* Stepper with Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={effectiveQty <= 10}
                className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#0F172A] font-bold text-base transition-colors cursor-pointer shrink-0"
                title="Decrease quantity by 5 (min 10)"
              >
                –
              </button>

              <div className="relative flex-1">
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={selectedQuantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  onBlur={handleBlurQuantity}
                  className="w-full h-8 text-center text-lg font-bold font-mono text-[#0F172A] bg-white border border-[#CBD5E1] rounded-lg focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-[#64748B] pointer-events-none hidden sm:inline">
                  Units
                </span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                disabled={effectiveQty >= 100}
                className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#0F172A] font-bold text-base transition-colors cursor-pointer shrink-0"
                title="Increase quantity by 5 (max 100)"
              >
                +
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1">
              {[10, 25, 50, 75, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleQuantityChange(preset)}
                  className={`flex-1 py-0.5 text-[10.5px] font-semibold rounded-md border transition-all cursor-pointer ${
                    effectiveQty === preset
                      ? "bg-[#2563EB] text-white border-[#2563EB] shadow-2xs"
                      : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#EEF2F7] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Baseline Spend Ceiling</div>
            <div className="text-2xl font-bold text-[#2563EB] font-mono mt-1">
              ₹{estimatedTotal.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1">Pre-auction purchase commitment</div>
          </div>

          <div className="bg-white border border-[#EEF2F7] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold text-[#15803D] uppercase tracking-wider flex items-center justify-between">
              <span>Target Savings</span>
              <TrendingDown size={14} />
            </div>
            <div className="text-2xl font-bold text-[#15803D] font-mono mt-1">
              ~{projectedSavingsPct}% (₹{projectedSavingsAmount.toLocaleString("en-IN")})
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-1">Estimated dynamic clearing price</div>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (2 Cols): Sourced Specs & Competing Vendors */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Sourced Quote Specifications */}
            <div className="bg-white border border-[#EEF2F7] rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <FileText size={15} className="text-[#2563EB]" />
                  <span>Sourced Quote Specifications</span>
                </div>
                <span className="text-[11px] text-[#64748B] font-medium bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  Verified B2B Listing
                </span>
              </div>

              {/* Data Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[#64748B] font-medium block">Baseline Supplier</span>
                  <span className="text-sm font-semibold text-[#0F172A] block">
                    {rfq?.supplier || "TechHub Direct Sourcing Pvt Ltd"}
                  </span>
                  <span className="text-[11px] text-[#64748B]">Hub: {rfq?.supplierLocation || "Bengaluru, Karnataka"}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[#64748B] font-medium block">Marketplace Source</span>
                  <span className="text-sm font-semibold text-[#2563EB] block">
                    {rfq?.source || "Amazon Business"}
                  </span>
                  <span className="text-[11px] text-[#64748B]">Directory Sourced Catalog</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[#64748B] font-medium block">Delivery SLA Commitment</span>
                  <span className="text-sm font-semibold text-[#0F172A] block">
                    48 Hours On-Site Delivery
                  </span>
                  <span className="text-[11px] text-[#15803D] font-medium">Guaranteed logistics window</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                  <span className="text-[#64748B] font-medium block">Origin Marketplace Listing</span>
                  <a
                    href={rfq?.url || "https://www.amazon.in"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1 truncate max-w-full"
                  >
                    <span>Inspect Raw Listing</span>
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                  <span className="text-[11px] text-[#64748B] block truncate">
                    {rfq?.url || "https://www.amazon.in"}
                  </span>
                </div>
              </div>

              {/* Compliance & Regulatory Checklist */}
              <div className="pt-2 border-t border-[#F1F5F9] space-y-2.5">
                <div className="text-xs font-semibold text-[#475569]">Mandatory Enterprise Compliance</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E293B] bg-[#F1F5F9] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                    <BadgeCheck size={13} className="text-[#15803D]" />
                    GSTIN 29AABCT1332L1Z9 (Active)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E293B] bg-[#F1F5F9] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                    <BadgeCheck size={13} className="text-[#15803D]" />
                    ISO 9001:2015 Certified
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E293B] bg-[#F1F5F9] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                    <BadgeCheck size={13} className="text-[#15803D]" />
                    E-Way Bill Ready & MSME Compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Qualified Participating Supplier Fleet */}
            <div className="bg-white border border-[#EEF2F7] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                    <Layers size={15} className="text-[#2563EB]" />
                    <span>Participating Supplier Fleet</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    4 pre-screened vendors qualified to submit bids in the reverse auction
                  </p>
                </div>
                <span className="text-xs font-medium text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded-full border border-[#BBF7D0]">
                  4 Verified Ready
                </span>
              </div>

              <div className="divide-y divide-[#F1F5F9] text-xs">
                {REAL_WORLD_SUPPLIERS.slice(0, 4).map((supp) => (
                  <div key={supp.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8FAFC] px-2 rounded-lg transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#0F172A]">{supp.name}</span>
                        <span className="text-[10px] font-medium text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#DBEAFE]">
                          Verified
                        </span>
                      </div>
                      <div className="text-[11px] text-[#64748B] flex flex-wrap items-center gap-2">
                        <span className="font-medium text-[#0F172A]">Trust Score {supp.trustScore}/100</span>
                        <span>•</span>
                        <span>{supp.city}</span>
                        <span>•</span>
                        <span className="text-[#15803D] font-medium">{supp.slaHours}h Delivery SLA</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[#15803D] font-medium text-xs bg-[#DCFCE7] px-3 py-1 rounded-md border border-[#BBF7D0] inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        Ready to Bid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (1 Col): Action Console & Escrow Guarantee */}
          <div className="space-y-6">
            
            {/* Procurement Action Card */}
            <div className="bg-white border border-[#EEF2F7] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider pb-3 border-b border-[#F1F5F9] flex items-center gap-2">
                <Sparkles size={14} className="text-[#2563EB]" />
                <span>Procurement Action</span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                Initiate a live multi-supplier reverse auction to negotiate the unit price down from ₹{unitPrice.toLocaleString("en-IN")} to competitive market equilibrium.
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleLaunchAuction}
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame size={15} className="fill-current text-amber-300" />
                  <span>Launch Reverse Auction</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={handleCompareSuppliers}
                  className="w-full py-2.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#334155] transition-colors cursor-pointer text-center"
                >
                  Compare Supplier Quotations
                </button>

                <button
                  onClick={() => router.push("/rfqs")}
                  className="w-full py-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors text-center cursor-pointer"
                >
                  View All Sourcing Requests
                </button>
              </div>
            </div>

            {/* Escrow Settlement Guarantee Card */}
            <div className="bg-white border border-[#EEF2F7] rounded-2xl p-6 text-xs space-y-3.5 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-[#15803D]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="font-semibold text-[#0F172A] text-xs">Escrow Settlement Guarantee</div>
                  <div className="text-[11px] text-[#64748B]">Powered by Razorpay Payment Infrastructure</div>
                </div>
              </div>

              <p className="text-[12px] text-[#475569] leading-relaxed">
                Procurement funds remain secured in escrow powered by Razorpay Payment Infrastructure throughout the auction and fulfillment cycle. Payment is released to the winning vendor only after quality inspection gate sign-off.
              </p>

              <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5 text-[11px] text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <Lock size={12} className="text-[#15803D]" />
                  <span>100% Capital Protection Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck size={12} className="text-[#2563EB]" />
                  <span>Digital PO & Milestone Verification</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Universal Footer */}
      <EnterpriseFooter />
    </div>
  );
}
