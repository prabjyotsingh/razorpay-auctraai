"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { REAL_WORLD_SUPPLIERS } from "@/lib/suppliers/b2bPlatforms";
import { ArrowRight, Search, Check, Filter, ShieldCheck, ChevronRight } from "lucide-react";
import SupplierProfileDrawer from "@/components/suppliers/SupplierProfileDrawer";

export default function Step2VendorDiscovery() {
  const router = useRouter();
  const {
    selectedVendorIds,
    toggleVendorSelection,
    selectAllVendors,
    setActiveStep,
    setCurrentView,
    startLiveAuction,
    extractedIntent
  } = useProcurementStore();

  const [activePlatform, setActivePlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrawerSupplier, setSelectedDrawerSupplier] = useState(null);

  const filteredVendors = REAL_WORLD_SUPPLIERS.filter((vendor) => {
    if (activePlatform !== "all" && vendor.platform !== activePlatform) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = vendor.name.toLowerCase().includes(q);
      const matchCity = vendor.city?.toLowerCase().includes(q);
      if (!matchName && !matchCity) return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Find Qualified Suppliers
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Select verified vendors to invite to competitive bidding for <span className="font-semibold text-[#0F172A]">{extractedIntent?.product || "Ergonomic Memory Foam Wrist Rest"}</span>.
          </p>
        </div>

        <button
          onClick={() => {
            startLiveAuction();
            setActiveStep(3);
            setCurrentView("step3");
            router.push("/auctions");
          }}
          disabled={selectedVendorIds.length === 0}
          className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <span>Launch Live Reverse Auction ({selectedVendorIds.length} Suppliers)</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#EEF2F7] rounded-[18px] p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {["all", "indiamart", "amazon_business", "tradeindia", "alibaba"].map((p) => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`px-3.5 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-all cursor-pointer capitalize ${
                activePlatform === p
                  ? "bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)]"
                  : "bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              {p === "all" ? "All Marketplaces" : p.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search suppliers or cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3.5 text-[12.5px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Modern Suppliers Data Grid */}
      <div className="premium-card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-[#EEF2F7] flex items-center justify-between text-[12.5px] bg-[#F8FAFC]">
          <div className="text-[#64748B] font-medium">
            Showing <span className="font-bold text-[#0F172A]">{filteredVendors.length}</span> verified commercial suppliers
          </div>
          <button
            onClick={selectAllVendors}
            className="text-[#2563EB] hover:underline font-semibold cursor-pointer text-[12.5px]"
          >
            {selectedVendorIds.length === filteredVendors.length ? "Deselect All" : "Select All Suppliers"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#EEF2F7] text-[12px] font-semibold text-[#64748B]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedVendorIds.length === filteredVendors.length && filteredVendors.length > 0}
                    onChange={selectAllVendors}
                    className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Supplier &amp; Platform</th>
                <th className="py-3 px-4">Location &amp; Delivery SLA</th>
                <th className="py-3 px-4 text-center">MOQ</th>
                <th className="py-3 px-4 text-center">Trust Score</th>
                <th className="py-3 px-4 text-center">Compliance</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-[13px]">
              {filteredVendors.map((vendor, idx) => {
                const isSelected = selectedVendorIds.includes(vendor.id);
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={vendor.id}
                    className={`transition-colors hover:bg-[#F1F5F9]/60 ${isSelected ? "bg-[#EFF6FF]/40" : isEven ? "bg-white" : "bg-[#FAFAFA]/50"}`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleVendorSelection(vendor.id)}
                        className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        onClick={() => setSelectedDrawerSupplier(vendor)}
                        className="font-semibold text-[#0F172A] hover:text-[#2563EB] cursor-pointer transition-colors text-[13.5px]"
                      >
                        {vendor.name}
                      </div>
                      <div className="text-[11.5px] text-[#64748B] capitalize">{vendor.platform?.replace("_", " ")}</div>
                    </td>
                    <td className="py-3 px-4 text-[12.5px] text-[#64748B]">
                      <div>{vendor.city}</div>
                      <div className="text-[11.5px] font-mono text-[#0F172A] font-medium">{vendor.slaHours}h SLA</div>
                    </td>
                    <td className="py-3 px-4 text-center text-[12.5px] font-mono text-[#0F172A]">
                      {vendor.moq || 50} units
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="font-bold text-[#0F172A] font-mono text-[13.5px]">
                        {vendor.trustScore}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">/100</span>
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                        <Check size={11} strokeWidth={2.5} />
                        <span>GST Verified</span>
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedDrawerSupplier(vendor)}
                        className="h-8 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] rounded-[10px] text-[12px] font-medium text-[#0F172A] transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredVendors.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center mx-auto mb-3">
                <Search size={20} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0F172A]">No suppliers match your search</h3>
              <p className="text-[12.5px] text-[#64748B] mt-1 max-w-sm mx-auto">
                No verified vendors matched your filter criteria or search keyword.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-[10px] transition-colors cursor-pointer"
              >
                Reset Search Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Supplier Profile Drawer */}
      {selectedDrawerSupplier && (
        <SupplierProfileDrawer
          supplier={selectedDrawerSupplier}
          isOpen={!!selectedDrawerSupplier}
          onClose={() => setSelectedDrawerSupplier(null)}
        />
      )}
    </div>
  );
}
