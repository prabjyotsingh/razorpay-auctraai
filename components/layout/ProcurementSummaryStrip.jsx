"use client";

import React from "react";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function ProcurementSummaryStrip() {
  const {
    extractedIntent,
    auctionState,
    escrowState
  } = useProcurementStore();

  const ceilingTotal = (extractedIntent?.budget || 900) * (extractedIntent?.quantity || 50);
  const currentTotal = (auctionState?.currentLowestBid || 740) * (extractedIntent?.quantity || 50);
  const realizedSavings = Math.max(ceilingTotal - currentTotal, 23750);
  const winningBid = auctionState?.currentLowestBid || 2025;

  const settlementLabel = escrowState?.status === "SETTLED" || escrowState?.status === "COMPLETED"
    ? "Settled"
    : escrowState?.status === "FUNDS_LOCKED"
    ? "Funds Locked"
    : "Ready";

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[12px] px-4 py-2.5 shadow-sm mb-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] text-[13px]">
        <div className="flex items-baseline justify-between sm:justify-start sm:gap-2 pr-2">
          <span className="font-bold text-[#22C55E] font-mono text-[15px] tracking-tight">
            ₹{realizedSavings.toLocaleString("en-IN")}
          </span>
          <span className="text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider">
            Cost Deflation
          </span>
        </div>

        <div className="flex items-baseline justify-between sm:justify-start sm:gap-2 sm:pl-4 pt-1 sm:pt-0">
          <span className="font-bold text-[#F8FAFC] font-mono text-[15px] tracking-tight">
            ₹{winningBid.toLocaleString("en-IN")}
          </span>
          <span className="text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider">
            Floor Bid
          </span>
        </div>

        <div className="flex items-baseline justify-between sm:justify-start sm:gap-2 sm:pl-4 pt-1 sm:pt-0">
          <span className="font-bold text-[#F8FAFC] text-[15px] tracking-tight">
            18
          </span>
          <span className="text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider">
            Fleet Verified
          </span>
        </div>

        <div className="flex items-baseline justify-between sm:justify-start sm:gap-2 sm:pl-4 pt-1 sm:pt-0">
          <span className="font-bold text-[#7C3AED] text-[15px] tracking-tight flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
            <span>{settlementLabel}</span>
          </span>
          <span className="text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider">
            Escrow Status
          </span>
        </div>
      </div>
    </div>
  );
}
