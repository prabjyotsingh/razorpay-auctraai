"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { SAMPLE_PROMPT_PRESETS } from "@/lib/mockData";
import { ArrowRight, Sparkles, Check, RefreshCw, Layers } from "lucide-react";

export default function Step1IntentCapture() {
  const router = useRouter();
  const {
    promptInput,
    setPromptInput,
    triggerIntentExtraction,
    isExtracting,
    extractedIntent,
    updateExtractedIntent,
    setActiveStep,
    setCurrentView,
    loadPreset
  } = useProcurementStore();

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (promptInput.trim()) {
      triggerIntentExtraction(promptInput);
    }
  };

  const totalCeiling = (extractedIntent?.budget || 900) * (extractedIntent?.quantity || 50);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Create RFQ
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Generate an enterprise request for quote using natural specifications or structured inputs.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveStep(2);
            setCurrentView("step2");
            router.push("/suppliers");
          }}
          className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Find Suppliers</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Primary Requisition Input Card */}
      <div className="premium-card space-y-4">
        <div>
          <h2 className="text-[16px] font-bold text-[#0F172A]">
            Describe Requisition
          </h2>
          <p className="text-[12.5px] text-[#64748B] mt-0.5">
            Specify equipment requirements, order quantity, target ceiling budget, and delivery timelines.
          </p>
        </div>

        <form onSubmit={handlePromptSubmit} className="space-y-4">
          <textarea
            rows={3}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Need 50 ergonomic memory foam wrist rests under ₹900/unit with delivery within 48 hours for our Bangalore tech center..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-4 text-[13.5px] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 focus:outline-none transition-all resize-none"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[12px] text-[#64748B] font-medium mr-1">Sample Templates:</span>
              {SAMPLE_PROMPT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="px-3 py-1.5 text-[11.5px] rounded-[10px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#E2E8F0] transition-colors cursor-pointer font-medium"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isExtracting || !promptInput.trim()}
              className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isExtracting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Processing Specifications...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Parse Specifications</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Structured Parameters Form (52px inputs, 14px radius) */}
      {extractedIntent && (
        <div className="premium-card space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#EEF2F7]">
            <div>
              <h3 className="text-[16px] font-bold text-[#0F172A]">
                Structured RFQ Parameters
              </h3>
              <p className="text-[12.5px] text-[#64748B] mt-0.5">
                Refine commercial limits before inviting verified suppliers to the auction.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
              <Check size={12} strokeWidth={2.5} />
              Parameters Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Product Name / SKU</label>
              <input
                type="text"
                value={extractedIntent.product || ""}
                onChange={(e) => updateExtractedIntent({ product: e.target.value })}
                className="form-input-lg w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Procurement Category</label>
              <input
                type="text"
                value={extractedIntent.category || ""}
                onChange={(e) => updateExtractedIntent({ category: e.target.value })}
                className="form-input-lg w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Order Quantity (Units)</label>
              <input
                type="number"
                value={extractedIntent.quantity || 50}
                onChange={(e) => updateExtractedIntent({ quantity: parseInt(e.target.value) || 0 })}
                className="form-input-lg w-full font-mono font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Ceiling Budget (₹ / Unit)</label>
              <input
                type="number"
                value={extractedIntent.budget || 900}
                onChange={(e) => updateExtractedIntent({ budget: parseInt(e.target.value) || 0 })}
                className="form-input-lg w-full font-mono font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Delivery SLA Timeline</label>
              <input
                type="text"
                value={extractedIntent.sla || "48 hours"}
                onChange={(e) => updateExtractedIntent({ sla: e.target.value })}
                className="form-input-lg w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-[#64748B]">Quality Standard / Compliance</label>
              <input
                type="text"
                value={extractedIntent.specs || "Commercial Grade • ISO Verified"}
                onChange={(e) => updateExtractedIntent({ specs: e.target.value })}
                className="form-input-lg w-full"
              />
            </div>
          </div>

          {/* Sourcing Action Summary Banner */}
          <div className="pt-4 border-t border-[#EEF2F7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[12px] text-[#64748B]">Total Requisition Budget Ceiling</div>
              <div className="text-xl font-bold text-[#0F172A] font-mono mt-0.5">
                ₹{totalCeiling.toLocaleString("en-IN")}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveStep(2);
                setCurrentView("step2");
                router.push("/suppliers");
              }}
              className="primary-gradient-btn h-11 px-5 text-[13.5px] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Find Qualified Suppliers</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
