"use client";

import React, { useState } from "react";
import { REAL_WORLD_SUPPLIERS } from "@/lib/suppliers/b2bPlatforms";
import { Search } from "lucide-react";
import SupplierProfileDrawer from "@/components/suppliers/SupplierProfileDrawer";

export default function SupplierRiskView() {
  const [filterRisk, setFilterRisk] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const filtered = REAL_WORLD_SUPPLIERS.filter(s => {
    if (filterRisk === "low") return s.riskScore <= 15;
    if (filterRisk === "mod") return s.riskScore > 15;
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827] tracking-tight">
            Supplier Risk Management &amp; Audit
          </h1>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Financial health, delivery probability, GSTIN filings, and single-source concentration risk.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[12px] font-semibold text-[#1D4ED8] self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span>Demo Environment • Based on sample procurement dataset</span>
        </div>
      </div>

      {/* Metric Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-[#E5E7EB] rounded-lg p-4 shadow-xs">
        <div>
          <div className="text-xs font-medium text-[#6B7280]">Fleet Average Risk</div>
          <div className="text-xl font-semibold text-[#111827] font-mono mt-0.5">
            15.8 / 100
          </div>
          <div className="text-[11px] text-[#16A34A] font-medium">18 sample catalog vendors</div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#6B7280]">Credit Health</div>
          <div className="text-xl font-semibold text-[#111827] font-mono mt-0.5">
            14 of 18 AAA
          </div>
          <div className="text-[11px] text-[#9CA3AF]">Sample directory baseline</div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#6B7280]">GST Compliance</div>
          <div className="text-xl font-semibold text-[#16A34A] font-mono mt-0.5">
            18/18 Verified
          </div>
          <div className="text-[11px] text-[#16A34A] font-medium">100% Modulo-36 compliant</div>
        </div>

        <div>
          <div className="text-xs font-medium text-[#6B7280]">Fulfillment SLA</div>
          <div className="text-xl font-semibold text-[#111827] font-mono mt-0.5">
            97.8%
          </div>
          <div className="text-[11px] text-[#9CA3AF]">Historical sample log rate</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {["all", "low", "mod"].map((k) => (
          <button
            key={k}
            onClick={() => setFilterRisk(k)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer capitalize ${
              filterRisk === k
                ? "bg-[#111827] text-white"
                : "bg-white hover:bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB]"
            }`}
          >
            {k === "all" ? "All Suppliers" : k === "low" ? "Low Risk Tier-1" : "Moderate Risk"}
          </button>
        ))}
      </div>

      {/* Supplier Risk Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F9FAFB] text-[11px] font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Supplier</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Credit Rating</th>
              <th className="py-3 px-4 text-center">Risk Score</th>
              <th className="py-3 px-4 text-center">Fulfillment</th>
              <th className="py-3 px-4 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[#374151]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#F9FAFB]/60 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-[#111827]">{s.name}</div>
                  <div className="text-[11px] text-[#6B7280] font-mono">{s.gstin}</div>
                </td>
                <td className="py-3 px-4 text-[#4B5563]">{s.city}</td>
                <td className="py-3 px-4">
                  <span className="font-medium text-[#111827]">{s.creditRating || "AAA"}</span>
                  <span className="text-[11px] text-[#9CA3AF] ml-1">Prime</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`font-mono font-semibold ${s.riskScore <= 15 ? "text-[#16A34A]" : "text-[#D97706]"}`}>
                    {s.riskScore}
                  </span>
                  <span className="text-[10px] text-[#9CA3AF]">/100</span>
                </td>
                <td className="py-3 px-4 text-center font-mono text-[#4B5563]">
                  {s.fulfillmentRate || "98.2%"}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedSupplier(s)}
                    className="px-2.5 py-1 text-[11px] font-medium text-[#374151] hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
