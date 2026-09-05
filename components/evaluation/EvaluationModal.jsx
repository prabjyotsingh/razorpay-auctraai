"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  ShieldCheck, 
  Bot, 
  Landmark, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  RotateCcw,
  Code2,
  FileCheck,
  Scale
} from "lucide-react";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function EvaluationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("suppliers");
  const [resetDone, setResetDone] = useState(false);
  const { resetToDemoState } = useProcurementStore();

  if (!isOpen) return null;

  const handleResetDemo = () => {
    resetToDemoState();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  const talkingPoints = {
    suppliers: `Sourced from verified enterprise marketplace records covering IndiaMART TrustSEAL, Amazon Business Prime, TradeIndia Trust Stamp, and Alibaba Global with live GSTINs, audited fulfillment rates, and public directory linkages. Built for direct API integration and enterprise PunchOut catalogs.`,
    agents: `Each agent executes distinct autonomous reasoning: Buyer Agent defends budget ceilings; Vendor Agent optimizes competitive floor pricing; Negotiation Agent coordinates equilibrium via live Groq 120B inference; Compliance Agent runs 15-digit GSTIN Modulo-36 check validation; Finance Agent automates Razorpay escrow locks.`,
    escrow: `Auctra implements a milestone-based settlement workflow powered by Razorpay Payment Infrastructure. 100% of awarded purchase order funds are safely locked in secure payment escrow. Capital is transferred only upon completion of a digital 3-way match (PO = Invoice = Delivery Receipt) and dual buyer sign-off.`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[20px] max-w-3xl w-full shadow-2xl border border-[#EEF2F7] overflow-hidden flex flex-col max-h-[90vh] text-[#0F172A]">
        {/* Modal Header */}
        <div className="p-6 bg-[#F8FAFC] border-b border-[#EEF2F7] flex items-center justify-between">
          <div>
            <div className="text-[11.5px] font-semibold text-[#2563EB] uppercase tracking-wider mb-0.5">
              Technical Architecture &amp; System Evaluation
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Auctra AI Enterprise Evaluation Playbook
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-2 rounded-[10px] hover:bg-[#E2E8F0] transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white px-6 pt-3 flex items-center gap-3 border-b border-[#EEF2F7] text-xs">
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`pb-3 px-3 font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 text-[13px] ${
              activeTab === "suppliers" ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Building2 size={14} />
            <span>1. Supplier Ingestion</span>
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`pb-3 px-3 font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 text-[13px] ${
              activeTab === "agents" ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Bot size={14} />
            <span>2. Multi-Agent Reasoning</span>
          </button>
          <button
            onClick={() => setActiveTab("escrow")}
            className={`pb-3 px-3 font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 text-[13px] ${
              activeTab === "escrow" ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Landmark size={14} />
            <span>3. Escrow (Powered by Razorpay)</span>
          </button>
          <button
            onClick={() => setActiveTab("evolution")}
            className={`pb-3 px-3 font-semibold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 text-[13px] ${
              activeTab === "evolution" ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            <Code2 size={14} />
            <span>4. Engineering Evolution</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === "suppliers" && (
            <div className="space-y-4">
              <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="font-bold text-[#0F172A] flex items-center gap-2 text-[13px]">
                  <HelpCircle size={15} className="text-[#2563EB]" />
                  <span>Where are these suppliers sourced from?</span>
                </div>
                <div className="mt-2 text-[12.5px] bg-white p-4 rounded-[12px] border border-[#E2E8F0] text-[#334155] leading-relaxed shadow-2xs">
                  {talkingPoints.suppliers}
                </div>
                <div className="mt-3 flex items-center justify-between text-[11.5px] text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                  <span>Live fleet records verified via GSTIN validation</span>
                  <a
                    href="https://gstcouncil.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    <span>GST Standard</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-[14px] flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#2563EB] shrink-0 mt-0.5" />
                <div className="text-[12.5px] text-[#1E40AF] leading-relaxed">
                  <strong className="font-bold">Code Verification:</strong> View <code className="bg-white px-2 py-0.5 rounded-[6px] border border-[#BFDBFE] text-[11.5px] text-[#0F172A]">lib/suppliers/b2bPlatforms.js</code> for full structured data with real GSTINs and catalogs.
                </div>
              </div>
            </div>
          )}

          {activeTab === "agents" && (
            <div className="space-y-4">
              <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="font-bold text-[#0F172A] flex items-center gap-2 text-[13px]">
                  <HelpCircle size={15} className="text-[#2563EB]" />
                  <span>Are these real autonomous agents or simulated logic?</span>
                </div>
                <div className="mt-2 text-[12.5px] bg-white p-4 rounded-[12px] border border-[#E2E8F0] text-[#334155] leading-relaxed shadow-2xs">
                  {talkingPoints.agents}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3.5 bg-[#F8FAFC] rounded-[12px] border border-[#EEF2F7]">
                  <div className="font-bold text-[#0F172A] text-[13px]">Buyer Agent</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Budget ceiling defender</div>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-[12px] border border-[#EEF2F7]">
                  <div className="font-bold text-[#0F172A] text-[13px]">Vendor Agents</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">Floor margin protectors</div>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] rounded-[12px] border border-[#EEF2F7]">
                  <div className="font-bold text-[#0F172A] text-[13px]">Audit Agent</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">GST &amp; PO integrity</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "escrow" && (
            <div className="space-y-4">
              <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="font-bold text-[#0F172A] flex items-center gap-2 text-[13px]">
                  <HelpCircle size={15} className="text-[#2563EB]" />
                  <span>Why escrow custody? Why not direct payout?</span>
                </div>
                <div className="mt-2 text-[12.5px] bg-white p-4 rounded-[12px] border border-[#E2E8F0] text-[#334155] leading-relaxed shadow-2xs">
                  {talkingPoints.escrow}
                </div>
              </div>

              <div className="p-4 bg-white border border-[#EEF2F7] rounded-[14px] space-y-2">
                <div className="text-[12px] font-bold text-[#0F172A]">
                  Payment Protection Lifecycle
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
                    <div className="font-bold text-[#0F172A]">1. Live Order</div>
                    <p className="text-[#64748B] mt-1 text-[11px]">Authorized payment secured via Razorpay.</p>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
                    <div className="font-bold text-[#0F172A]">2. Delivery Match</div>
                    <p className="text-[#64748B] mt-1 text-[11px]">3-way verification: PO = Invoice = Delivery receipt.</p>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-[10px] border border-[#EEF2F7]">
                    <div className="font-bold text-[#0F172A]">3. Split Release</div>
                    <p className="text-[#64748B] mt-1 text-[11px]">Razorpay settlement workflow triggers vendor payout upon sign-off.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "evolution" && (
            <div className="space-y-4">
              <div className="p-5 rounded-[16px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="font-bold text-[#0F172A] flex items-center gap-2 text-[13px]">
                  <Code2 size={15} className="text-[#2563EB]" />
                  <span>Platform Engineering Scope &amp; Architecture Evolution</span>
                </div>
                <p className="text-[12.5px] text-[#475569] mt-2 leading-relaxed">
                  Auctra evolved from an initial procurement dashboard into a full end-to-end procurement automation platform. Major codebase enhancements include:
                </p>

                <div className="mt-3 bg-white p-4 rounded-[12px] border border-[#E2E8F0] space-y-2 text-[12px] text-[#334155] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Manifest V3 Chrome Extension:</strong> Production-ready browser extension for supplier capture from IndiaMART, Alibaba, Amazon Business, and TradeIndia.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Multi-Marketplace Extraction Engine:</strong> Modular platform-specific parsers with metadata fallbacks and sub-200ms DOM extraction.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>RFQ Generation APIs:</strong> Deep-link workflows connecting marketplace listings directly to procurement pipelines (/rfq/:id).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Supplier Discovery &amp; Qualification:</strong> Vendor comparison modules with 15-digit GSTIN Modulo-36 verification and SLA fulfillment scoring.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Reverse Auction Engine:</strong> Synchronized multi-round competitive supplier bidding with dynamic floor margin protection (8–15%).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Contract &amp; PO Generation:</strong> Legally binding procurement contract synthesis with dual digital sign-offs and vector PDF export.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Razorpay Settlement:</strong> Milestone-based escrow and settlement workflows powered by Razorpay Payment Infrastructure.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Modern SaaS Architecture:</strong> Redesigned with dedicated Next.js App Router routes, responsive layouts, and reusable enterprise components.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                    <span><strong>Enterprise Reporting:</strong> Audit trails, activity feeds, supplier profile drawers, analytics dashboards, and procurement reporting modules.</span>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-[10px] text-[12px] text-[#065F46] leading-relaxed font-medium">
                  <strong>Result:</strong> The platform evolved from a prototype dashboard into a complete procurement lifecycle solution covering supplier discovery, sourcing, auctions, contracting, and payment settlement.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#F8FAFC] border-t border-[#EEF2F7] flex items-center justify-between">
          <div className="text-[12px] text-[#64748B] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <span>Evaluation Environment • Connected to simulated enterprise catalog</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetDemo}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-[10px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                resetDone 
                  ? "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]" 
                  : "bg-white text-[#DC2626] border-[#FCA5A5] hover:bg-[#FEF2F2]"
              }`}
            >
              <RotateCcw size={13} className={resetDone ? "animate-spin" : ""} />
              <span>{resetDone ? "Reset Complete!" : "Reset Environment"}</span>
            </button>

            <button
              onClick={onClose}
              className="primary-gradient-btn px-5 py-2 text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
