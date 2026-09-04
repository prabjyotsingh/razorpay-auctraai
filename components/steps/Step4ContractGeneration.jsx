"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { Download, Printer, ArrowRight, Check, ShieldCheck, FileCheck } from "lucide-react";

export default function Step4ContractGeneration() {
  const router = useRouter();
  const {
    contractState,
    approveContractByBuyer,
    downloadPdf,
    isPdfExporting,
    setActiveStep,
    setCurrentView,
    org
  } = useProcurementStore();

  const [approvalStatus, setApprovalStatus] = useState("Pending Approval");
  const isSigned = contractState?.signatures?.buyer?.isSigned || approvalStatus === "Approved";

  const handleApprove = () => {
    approveContractByBuyer();
    setApprovalStatus("Approved");
  };

  const poNumber = contractState?.poNumber || "PO-2026-72469";
  const issueDate = contractState?.issueDate || "September 3, 2026";
  const supplierName = contractState?.supplier?.name || contractState?.vendor || "SwiftProcure Systems";
  const buyerName = contractState?.buyer?.name || org?.name || "Acme Technologies India Pvt Ltd";
  const productName = contractState?.productName || "Ergonomic Memory Foam Wrist Rest (Commercial Spec)";
  const quantity = contractState?.quantity || 50;
  const unitPrice = contractState?.unitPrice || 740;
  const totalAmount = contractState?.totalAmount || unitPrice * quantity;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
              Contract Verification &amp; PO
            </h1>
            <span className="text-[12px] font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-[8px] border border-[#BFDBFE]">
              {poNumber}
            </span>
          </div>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Commercial procurement agreement awarded to <span className="font-semibold text-[#0F172A]">{supplierName}</span>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="h-10 inline-flex items-center gap-1.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-3.5 rounded-[12px] text-[13px] font-medium transition-colors cursor-pointer"
          >
            <Printer size={14} className="text-[#64748B]" />
            <span>Print</span>
          </button>

          <button
            onClick={downloadPdf}
            disabled={isPdfExporting}
            className="h-10 inline-flex items-center gap-1.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-3.5 rounded-[12px] text-[13px] font-medium transition-colors cursor-pointer"
          >
            <Download size={14} className="text-[#64748B]" />
            <span>{isPdfExporting ? "Exporting..." : "Download PDF"}</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(5);
              setCurrentView("step5");
              router.push("/escrow");
            }}
            className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Proceed to Escrow Payment</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Enterprise Legal Document Container */}
      <div className="premium-card p-8 space-y-6 text-[#0F172A] text-[13.5px] leading-relaxed">
        
        {/* Document Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#EEF2F7]">
          <div className="space-y-1">
            <div className="text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wider">
              Commercial Procurement Agreement
            </div>
            <div className="text-[22px] font-bold text-[#0F172A] font-mono tracking-tight">
              Purchase Order: {poNumber}
            </div>
            <div className="text-[13px] text-[#64748B]">
              Issued Date: <span className="text-[#0F172A] font-medium">{issueDate}</span>
            </div>
          </div>

          <div className="sm:text-right space-y-1.5">
            <div className="text-[11.5px] font-medium text-[#64748B] uppercase tracking-wider">Status</div>
            <div className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full border ${
              isSigned 
                ? "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" 
                : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isSigned ? "bg-[#10B981]" : "bg-[#F59E0B]"}`} />
              <span>{isSigned ? "Approved & Executed" : "Pending Signature"}</span>
            </div>
          </div>
        </div>

        {/* Counterparty Entity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Buyer Entity</div>
            <div className="font-bold text-[14px] text-[#0F172A]">{buyerName}</div>
            <div className="text-[#64748B] text-[12.5px]">Prestige Tech Park, Bengaluru, Karnataka 560103</div>
            <div className="text-[#64748B] font-mono text-[11.5px]">GSTIN: 29AAACA1234A1Z5</div>
          </div>

          <div className="space-y-1 p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Supplier Entity</div>
            <div className="font-bold text-[14px] text-[#0F172A]">{supplierName}</div>
            <div className="text-[#64748B] text-[12.5px]">Tech Industrial Park, Electronic City, Bengaluru</div>
            <div className="text-[#64748B] font-mono text-[11.5px]">GSTIN: 29AABCS8821L1Z8 (Verified)</div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-[#EEF2F7] rounded-[14px] overflow-hidden">
          <table className="w-full text-left divide-y divide-[#EEF2F7]">
            <thead className="bg-[#F8FAFC] text-[12px] font-semibold text-[#64748B]">
              <tr>
                <th className="py-3 px-4">Item Description</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-[13px]">
              <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                <td className="py-3.5 px-4 font-medium text-[#0F172A]">
                  {productName} (Commercial Spec • ISO Verified)
                </td>
                <td className="py-3.5 px-4 text-center font-mono text-[#64748B]">{quantity}</td>
                <td className="py-3.5 px-4 text-right font-mono text-[#64748B]">₹{unitPrice.toLocaleString("en-IN")}</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-[#0F172A]">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-[#F8FAFC] text-[13px] font-semibold text-[#0F172A]">
              <tr>
                <td colSpan="3" className="py-2.5 px-4 text-right text-[#64748B] font-normal">Subtotal:</td>
                <td className="py-2.5 px-4 text-right font-mono">₹{totalAmount.toLocaleString("en-IN")}</td>
              </tr>
              <tr>
                <td colSpan="3" className="py-2 px-4 text-right text-[#64748B] font-normal">GST (18% Applicable):</td>
                <td className="py-2 px-4 text-right font-mono">₹{Math.round(totalAmount * 0.18).toLocaleString("en-IN")}</td>
              </tr>
              <tr className="border-t border-[#EEF2F7]">
                <td colSpan="3" className="py-3 px-4 text-right text-[#0F172A] text-[13.5px] font-bold">Total Contract Value:</td>
                <td className="py-3 px-4 text-right font-mono text-[16px] text-[#2563EB] font-bold">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Commercial Terms */}
        <div className="space-y-2 pt-2 border-t border-[#EEF2F7]">
          <div className="text-[11.5px] font-semibold uppercase tracking-wider text-[#64748B]">Standard Terms of Order</div>
          <ol className="list-decimal pl-4 space-y-1 text-[#64748B] text-[12.5px]">
            <li><strong className="text-[#0F172A]">Guaranteed Delivery:</strong> Dispatch within 48 hours from contract execution date.</li>
            <li><strong className="text-[#0F172A]">Quality Acceptance:</strong> 3-day inspection window upon delivery prior to milestone payment release.</li>
            <li><strong className="text-[#0F172A]">Payment Protection:</strong> Funds held in neutral RBI Nodal custody powered by Razorpay Payment Infrastructure.</li>
          </ol>
        </div>

        {/* Verification Status */}
        <div className="p-4 bg-[#F8FAFC] border border-[#EEF2F7] rounded-[14px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#0F172A]">
              <FileCheck size={15} className="text-[#10B981]" />
              <span>Contract Verification &amp; Compliance</span>
            </div>
            <span className="text-[11.5px] font-mono text-[#64748B]">Ref: {poNumber}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12.5px]">
            <div>
              <div className="text-[#64748B] text-[11px]">Audit Status</div>
              <div className="font-semibold text-[#10B981] flex items-center gap-1 mt-0.5">
                <Check size={12} strokeWidth={2.5} />
                <span>Verified Clean</span>
              </div>
            </div>

            <div>
              <div className="text-[#64748B] text-[11px]">Issuing System</div>
              <div className="font-medium text-[#0F172A] mt-0.5">
                Auctra Platform
              </div>
            </div>

            <div>
              <div className="text-[#64748B] text-[11px]">GST Compliance</div>
              <div className="font-semibold text-[#10B981] flex items-center gap-1 mt-0.5">
                <Check size={12} strokeWidth={2.5} />
                <span>GSTIN Validated</span>
              </div>
            </div>

            <div>
              <div className="text-[#64748B] text-[11px]">Contract Reference</div>
              <div className="font-mono font-semibold text-[#2563EB] mt-0.5">
                {poNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Authorization Execution */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wider">Buyer Sign-off</div>
            {isSigned ? (
              <div className="text-[13.5px] text-[#10B981] font-semibold flex items-center gap-1.5">
                <Check size={15} strokeWidth={2.5} />
                <span>Authorized by Procurement Officer ({issueDate})</span>
              </div>
            ) : (
              <button
                onClick={handleApprove}
                className="h-10 px-4 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-[12px] text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Sign &amp; Approve Purchase Order
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setActiveStep(5);
              setCurrentView("step5");
              router.push("/escrow");
            }}
            className="primary-gradient-btn h-11 px-5 text-[13.5px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Continue to Escrow Payment</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
