"use client";

import React from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { SAMPLE_PROMPT_PRESETS } from "@/lib/mockData";
import { ArrowUpRight } from "lucide-react";

export default function IntelligencePanel() {
  const {
    extractedIntent,
    auctionState,
    escrowState,
    loadPreset
  } = useProcurementStore();

  const ceilingTotal = (extractedIntent?.budget || 900) * (extractedIntent?.quantity || 50);
  const currentTotal = (auctionState?.currentLowestBid || extractedIntent?.budget || 740) * (extractedIntent?.quantity || 50);
  const realizedSavings = ceilingTotal - currentTotal;
  const unitBid = auctionState?.currentLowestBid || 740;

  const settlementStatus = escrowState?.status === "FUNDS_LOCKED" 
    ? "Funds Locked" 
    : escrowState?.status === "SETTLEMENT_COMPLETE"
    ? "Settled"
    : "Ready";

  return (
    <aside className="w-64 bg-white border-l border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
      {/* Panel Header */}
      <div className="pb-2 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-900">
          AI Procurement Assistant
        </h3>
      </div>

      {/* Single Consolidated Procurement Summary Card (as specifically requested) */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
        {/* Savings Generated */}
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            Savings Generated
          </div>
          <div className="text-base font-semibold text-emerald-600 font-mono mt-0.5">
            ₹{realizedSavings > 0 ? realizedSavings.toLocaleString("en-IN") : "3,150"}
          </div>
        </div>

        {/* Winning Bid */}
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            Winning Bid
          </div>
          <div className="text-sm font-semibold text-slate-900 font-mono mt-0.5">
            ₹{unitBid} <span className="text-xs font-normal text-slate-500">/ unit</span>
          </div>
        </div>

        {/* Vendors Evaluated */}
        <div>
          <div className="text-[11px] font-medium text-slate-500">
            Vendors Evaluated
          </div>
          <div className="text-sm font-semibold text-slate-900 font-mono mt-0.5">
            18
          </div>
        </div>

        {/* Escrow Payment Status */}
        <div className="pt-2 border-t border-slate-200/60">
          <div className="text-[11px] font-medium text-slate-500">
            Escrow Payment
          </div>
          <div className="text-xs font-medium text-indigo-600 mt-0.5">
            {settlementStatus}
          </div>
        </div>
      </div>

      {/* Enterprise Benchmarks List */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Standard Presets
        </div>
        <div className="space-y-1">
          {SAMPLE_PROMPT_PRESETS.slice(0, 3).map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="w-full text-left p-2 rounded-md bg-white hover:bg-slate-50 border border-slate-200/80 transition-colors text-xs text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-between group"
            >
              <span className="truncate font-normal">{preset.title}</span>
              <ArrowUpRight size={12} className="text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
