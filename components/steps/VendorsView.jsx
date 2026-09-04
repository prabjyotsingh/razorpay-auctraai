"use client";

import React, { useState } from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { Search, ShieldCheck, ArrowRight, Check } from "lucide-react";
import SupplierProfileDrawer from "@/components/suppliers/SupplierProfileDrawer";

export default function VendorsView() {
  const { allVendors } = useProcurementStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filtered = allVendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Supplier Fleet
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Audited enterprise vendors qualified for competitive reverse auctions and commercial procurement.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search suppliers, categories, cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3.5 text-[12.5px] bg-white border border-[#E2E8F0] rounded-[12px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Modern Data Grid */}
      <div className="premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#EEF2F7] text-[12px] font-semibold text-[#64748B]">
                <th className="py-3 px-5">Supplier Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">GSTIN Registry</th>
                <th className="py-3 px-4 text-center">Trust Score</th>
                <th className="py-3 px-4 text-center">Delivery SLA</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-[13px]">
              {filtered.map((vendor, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr 
                    key={vendor.id} 
                    className={`transition-colors hover:bg-[#F1F5F9]/60 ${isEven ? "bg-white" : "bg-[#FAFAFA]/50"}`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-[#0F172A] text-[13.5px] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                        <span>{vendor.name}</span>
                      </div>
                      <div className="text-[11.5px] text-[#64748B] pl-4">{vendor.categories?.slice(0, 2).join(", ")}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[13px] text-[#64748B]">{vendor.city}, {vendor.state}</td>
                    <td className="py-3.5 px-4 font-mono text-[12px] text-[#64748B]">{vendor.gstin}</td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="font-bold text-[#0F172A] font-mono text-[13.5px]">{vendor.trustScore}</span>
                      <span className="text-[11px] text-[#94A3B8]">/100</span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="font-mono font-semibold text-[13px] text-[#0F172A]">{vendor.minLeadTimeHours || 48}h</span>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedSupplier(vendor)}
                        className="h-8 px-3 text-[12px] font-medium border border-[#E2E8F0] rounded-[10px] text-[#0F172A] bg-white hover:bg-[#F8FAFC] hover:border-[#2563EB] transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center mx-auto mb-3">
                <Search size={20} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0F172A]">No suppliers match your search</h3>
              <p className="text-[12.5px] text-[#64748B] mt-1 max-w-sm mx-auto">
                Try searching for a different supplier name, city, or product category.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-[10px] transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
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
