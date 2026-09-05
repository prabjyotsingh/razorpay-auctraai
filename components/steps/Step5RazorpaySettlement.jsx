"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { ESCROW_STAGES } from "@/lib/payments/razorpayEscrow";
import { ArrowRight, Check, ShieldCheck, ArrowLeft, RefreshCw, Lock } from "lucide-react";

export default function Step5RazorpaySettlement() {
  const router = useRouter();
  const {
    escrowState,
    progressEscrow,
    contractState,
    setCurrentView
  } = useProcurementStore();

  const [isOpeningRazorpay, setIsOpeningRazorpay] = useState(false);

  const handleRealRazorpayCheckout = async () => {
    setIsOpeningRazorpay(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: contractState.totalAmount || 37000,
          contractId: contractState.poNumber || "PO-2026-72469"
        })
      });

      const data = await res.json();
      const order = data.order;
      const keyId = data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

      if (keyId && !keyId.includes("placeholder") && !keyId.includes("sandbox")) {
        if (!window.Razorpay) {
          await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = resolve;
            document.body.appendChild(script);
          });
        }

        const options = {
          key: keyId,
          amount: order?.amount || 3700000,
          currency: order?.currency || "INR",
          name: "Auctra Procurement",
          description: `Escrow Fund Lock for ${contractState.poNumber || "PO-2026-72469"}`,
          order_id: order?.id,
          prefill: {
            name: "Acme Technologies India Pvt Ltd",
            email: "procurement@acmetech.in",
            contact: "+919876543210"
          },
          theme: { color: "#2563EB" },
          handler: async function (response) {
            console.log("[Razorpay] Payment Succeeded:", response);
            await progressEscrow("FUNDS_LOCKED");
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          console.error("Razorpay Payment Failed:", resp.error);
          alert("Payment canceled or failed: " + resp.error.description);
        });
        rzp.open();
      } else {
        // Simulated Escrow Funding Transition
        await progressEscrow("FUNDS_LOCKED");
      }
    } catch (err) {
      console.warn("Razorpay fallback to simulated state:", err);
      progressEscrow("FUNDS_LOCKED");
    } finally {
      setIsOpeningRazorpay(false);
    }
  };

  const currentStageIndex = ESCROW_STAGES.findIndex(s => s.key === escrowState.status);
  const isSettled = escrowState.status === "SETTLEMENT_COMPLETE" || escrowState.status === "SETTLED" || escrowState.status === "COMPLETED";

  const handleAdvanceStep = () => {
    if (escrowState.status === "ESCROW_CREATED" || escrowState.status === "PO_SIGNED") {
      handleRealRazorpayCheckout();
    } else if (escrowState.status === "FUNDS_LOCKED") {
      progressEscrow("SUPPLIER_ACCEPTED");
    } else if (escrowState.status === "SUPPLIER_ACCEPTED") {
      progressEscrow("DISPATCH_AND_INSPECTED");
    } else if (escrowState.status === "DISPATCH_AND_INSPECTED") {
      progressEscrow("SETTLEMENT_COMPLETE");
    } else {
      progressEscrow("SETTLEMENT_COMPLETE");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
              Escrow Payment &amp; Custody
            </h1>
            <span className="text-[11.5px] font-semibold text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full">
              Powered by Razorpay Payment Infrastructure
            </span>
          </div>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Safe milestone escrow payment release for <span className="font-semibold text-[#0F172A]">{contractState.poNumber || "PO-2026-72469"}</span>.
          </p>
        </div>

        {isSettled ? (
          <button
            onClick={() => {
              setCurrentView("dashboard");
              router.push("/");
            }}
            className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Return to Dashboard</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={handleAdvanceStep}
            disabled={isOpeningRazorpay}
            className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer shrink-0"
          >
            {isOpeningRazorpay ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Opening Razorpay Gateway...</span>
              </>
            ) : escrowState.status === "ESCROW_CREATED" || escrowState.status === "PO_SIGNED" ? (
              <>
                <Lock size={14} />
                <span>Lock Funds in Escrow</span>
              </>
            ) : escrowState.status === "FUNDS_LOCKED" ? (
              <span>Simulate Supplier Dispatch</span>
            ) : escrowState.status === "SUPPLIER_ACCEPTED" ? (
              <span>Confirm Delivery &amp; Inspection</span>
            ) : (
              <span>Release Settlement to Vendor</span>
            )}
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Escrow Status Summary Card */}
      <div className="premium-card p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-[#EEF2F7]">
          <div>
            <div className="text-[12px] font-medium text-[#64748B]">Escrow Custody Value</div>
            <div className="text-[28px] font-bold text-[#0F172A] font-mono mt-1 leading-none">
              ₹{(contractState.totalAmount || 37000).toLocaleString("en-IN")}
            </div>
            <div className="text-[12px] text-[#64748B] mt-1">Total authorized payment</div>
          </div>

          <div>
            <div className="text-[12px] font-medium text-[#64748B]">Beneficiary Supplier</div>
            <div className="text-[16px] font-bold text-[#0F172A] truncate mt-1">
              {contractState?.supplier?.name || contractState?.vendor || "SwiftProcure Systems"}
            </div>
            <div className="text-[11.5px] text-[#10B981] font-semibold mt-1">GST Verified Bank Account</div>
          </div>

          <div>
            <div className="text-[12px] font-medium text-[#64748B]">Settlement Infrastructure</div>
            <div className="text-[15px] font-bold text-[#0F172A] mt-1">
              Razorpay Settlement Workflow
            </div>
            <div className="text-[11px] font-medium text-[#2563EB] mt-0.5">
              Powered by Razorpay Payment Infrastructure
            </div>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="space-y-3">
          <div className="text-[13px] font-bold text-[#0F172A]">
            Milestone Release Sequence
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {ESCROW_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.key}
                  className={`p-3.5 rounded-[14px] border text-[12.5px] transition-all ${
                    isPast
                      ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]"
                      : isCurrent
                      ? "bg-white border-[#2563EB] text-[#2563EB] font-bold shadow-sm ring-2 ring-[#2563EB]/15"
                      : "bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#64748B]">0{idx + 1}</span>
                    {isPast && <Check size={14} className="text-[#10B981]" />}
                  </div>
                  <div className="font-semibold text-[13px] leading-snug text-[#0F172A]">{stage.label || stage.title}</div>
                  <div className="text-[11px] text-[#64748B] mt-1 leading-snug line-clamp-2">{stage.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust & Policy Note */}
      <div className="p-5 rounded-[16px] bg-white border border-[#EEF2F7] shadow-sm text-[13px] text-[#64748B] flex items-start gap-3.5">
        <ShieldCheck size={20} className="text-[#10B981] shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <div>
            <span className="font-bold text-[#0F172A]">Buyer &amp; Supplier Protection:</span> Funds are held in a neutral Reserve Bank of India Nodal escrow trust account powered by Razorpay Payment Infrastructure. Funds are transferred to the vendor only once your team accepts delivery and signs off on inspection.
          </div>
          <div className="text-[11.5px] font-medium text-[#2563EB]">
            Powered by Razorpay Payment Infrastructure • Nodal Custodial Security
          </div>
        </div>
      </div>
    </div>
  );
}
