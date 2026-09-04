"use client";

import React from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { Check, ChevronRight } from "lucide-react";

export default function ProcurementStepper() {
  const { activeStep, setActiveStep } = useProcurementStore();

  const steps = [
    { num: 1, label: "Create RFQ" },
    { num: 2, label: "Suppliers" },
    { num: 3, label: "Auction" },
    { num: 4, label: "Contract Verification" },
    { num: 5, label: "Escrow Payment" }
  ];

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[12px] px-4 py-2.5 shadow-sm mb-3 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[500px]">
        {steps.map((step, idx) => {
          const isPassed = step.num < activeStep;
          const isCurrent = step.num === activeStep;

          return (
            <React.Fragment key={step.num}>
              <button
                onClick={() => setActiveStep(step.num)}
                className={`flex items-center gap-2 text-[12.5px] transition-all cursor-pointer py-1.5 px-3 rounded-[8px] ${
                  isCurrent
                    ? "font-semibold text-[#F8FAFC] bg-white/[0.08] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : isPassed
                    ? "font-medium text-[#F8FAFC] hover:bg-white/[0.04]"
                    : "font-normal text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-semibold transition-all ${
                    isPassed
                      ? "bg-[#22C55E] text-white"
                      : isCurrent
                      ? "bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                      : "bg-white/[0.06] text-[#94A3B8]"
                  }`}
                >
                  {isPassed ? <Check size={11} strokeWidth={2.5} /> : step.num}
                </span>
                <span>{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <ChevronRight size={13} className="text-white/[0.2] shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
