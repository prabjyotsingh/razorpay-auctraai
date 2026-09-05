"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Bot, 
  Landmark, 
  Code2, 
  CheckCircle2, 
  ExternalLink, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Zap,
  Cpu,
  Layers,
  Scale
} from "lucide-react";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function EvaluationView() {
  const [activeTab, setActiveTab] = useState("overview");
  const [resetDone, setResetDone] = useState(false);
  const { resetToDemoState } = useProcurementStore();

  const handleReset = () => {
    resetToDemoState();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30 border border-[#EEF2F7]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
              <Scale size={13} />
              <span>Enterprise Evaluation &amp; Verification Framework</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Auctra AI System Evaluation &amp; Architecture Review
            </h1>
            <p className="text-sm text-[#64748B] mt-1 max-w-3xl">
              Comprehensive architectural audit, verification vectors, and autonomous procurement execution benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className={`px-4 py-2 text-xs font-semibold rounded-[12px] border transition-all flex items-center gap-2 cursor-pointer ${
                resetDone
                  ? "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]"
                  : "bg-white text-[#DC2626] border-[#FCA5A5] hover:bg-[#FEF2F2]"
              }`}
            >
              <RotateCcw size={13} className={resetDone ? "animate-spin" : ""} />
              <span>{resetDone ? "Reset Complete!" : "Reset Demo Environment"}</span>
            </button>

            <Link
              href="/documentation"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors flex items-center gap-1.5"
            >
              <span>Documentation</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#EEF2F7] gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "overview"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          1. System Pillars &amp; Verification
        </button>
        <button
          onClick={() => setActiveTab("agents")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "agents"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          2. Multi-Agent Reasoning Architecture
        </button>
        <button
          onClick={() => setActiveTab("escrow")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "escrow"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          3. Razorpay Escrow Settlement
        </button>
        <button
          onClick={() => setActiveTab("evolution")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "evolution"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          4. Platform Engineering Scope
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="enterprise-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Real Marketplace Ingestion</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Multi-marketplace parser engine extracts verified listings from IndiaMART TrustSEAL, Amazon Business, TradeIndia, and Alibaba Global with valid GSTINs and audited fulfillment metrics.
            </p>
            <div className="pt-2 border-t border-[#EEF2F7] flex items-center justify-between text-[11px] text-[#2563EB] font-semibold">
              <span>lib/suppliers/b2bPlatforms.js</span>
              <CheckCircle2 size={14} className="text-[#16A34A]" />
            </div>
          </div>

          <div className="enterprise-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Bot size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Autonomous Agent Fleet</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              5 synchronized agents (Buyer, Vendor, Negotiation, Compliance, and Finance) running real-time constraint satisfaction, Groq 120B reasoning, and dynamic floor margin protection.
            </p>
            <div className="pt-2 border-t border-[#EEF2F7] flex items-center justify-between text-[11px] text-[#2563EB] font-semibold">
              <span>lib/agents/ &amp; useProcurementStore.js</span>
              <CheckCircle2 size={14} className="text-[#16A34A]" />
            </div>
          </div>

          <div className="enterprise-card p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Landmark size={20} />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Razorpay Escrow Settlement</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Milestone-based payment fund locking. Funds stay protected until digital 3-way match (PO = Invoice = Delivery Receipt) triggers Razorpay automated vendor disbursement.
            </p>
            <div className="pt-2 border-t border-[#EEF2F7] flex items-center justify-between text-[11px] text-[#2563EB] font-semibold">
              <span>lib/payments/razorpayEscrow.js</span>
              <CheckCircle2 size={14} className="text-[#16A34A]" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "agents" && (
        <div className="enterprise-card p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Multi-Agent Autonomous Execution Logic</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Every stage of procurement runs through dedicated agent verification with deterministic checks and LLM inference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">01. Buyer Agent</div>
              <div className="text-sm font-semibold text-slate-900">Budget Ceiling Defender</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Calculates unit target caps, evaluates SLA tolerances, enforces budget ceiling constraints, and tracks marginal cost savings across auction rounds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">02. Vendor Agent</div>
              <div className="text-sm font-semibold text-slate-900">Competitive Margin Optimization</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Defends supplier floor margins (8-15%), counters aggressive buyer bids with tiered quantity volume concessions, and computes delivery penalty tolerances.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">03. Negotiation Agent</div>
              <div className="text-sm font-semibold text-slate-900">Nash Equilibrium Coordinator</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Runs live inference using Groq 120B / Llama 3 models to coordinate price discovery, detect supplier concessions, and recommend optimal counter-offers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">04. Compliance Agent</div>
              <div className="text-sm font-semibold text-slate-900">GSTIN &amp; Regulatory Audit</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Executes Modulo-36 checksum validation on 15-character GSTINs, audits state jurisdiction codes, and verifies ISO 9001/14001 certification records.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">05. Finance Agent</div>
              <div className="text-sm font-semibold text-slate-900">Razorpay Escrow Governor</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Generates virtual escrow nodal accounts, signs cryptographic payload hashes, verifies 3-way matching, and initiates milestone-based vendor releases.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-cyan-600 uppercase tracking-wide mb-1">06. Audit Supervisor</div>
              <div className="text-sm font-semibold text-slate-900">Immutable Log Serialization</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Records state transitions with timestamps, actor IDs, and cryptographic hashes into the global audit feed for enterprise compliance.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "escrow" && (
        <div className="enterprise-card p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Razorpay Payment Infrastructure Integration</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Dual-layer escrow custody protecting both enterprise buyers and vendor capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <div className="font-bold text-[#2563EB] text-sm mb-1">01</div>
              <div className="font-bold text-slate-900">Escrow Created</div>
              <p className="text-slate-500 mt-1.5 text-[11px] leading-relaxed">
                Virtual custodial account generated with buyer PO specifications and SLA terms.
              </p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <div className="font-bold text-[#2563EB] text-sm mb-1">02</div>
              <div className="font-bold text-slate-900">Funds Locked</div>
              <p className="text-slate-500 mt-1.5 text-[11px] leading-relaxed">
                Buyer deposits 100% PO value into neutral nodal account. Capital safely held in trust.
              </p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <div className="font-bold text-[#2563EB] text-sm mb-1">03</div>
              <div className="font-bold text-slate-900">Supplier Confirmed</div>
              <p className="text-slate-500 mt-1.5 text-[11px] leading-relaxed">
                Vendor receives irrevocable payment guarantee and initiates manufacturing &amp; dispatch.
              </p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <div className="font-bold text-[#2563EB] text-sm mb-1">04</div>
              <div className="font-bold text-slate-900">Inspection Done</div>
              <p className="text-slate-500 mt-1.5 text-[11px] leading-relaxed">
                Goods Receipt Note (GRN) verified against PO specifications and signed off.
              </p>
            </div>
            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <div className="font-bold text-[#2563EB] text-sm mb-1">05</div>
              <div className="font-bold text-slate-900">Settled via Route</div>
              <p className="text-slate-500 mt-1.5 text-[11px] leading-relaxed">
                Automated disbursement to vendor bank account; Auctra retains 1.5% platform fee.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "evolution" && (
        <div className="enterprise-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-[#2563EB]" />
            <h3 className="text-base font-bold text-[#0F172A]">Platform Engineering Evolution</h3>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Auctra AI was engineered as an enterprise-grade autonomous procurement infrastructure platform:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <span className="font-bold text-slate-900">Manifest V3 Extension:</span>
              <p className="text-slate-600 mt-1">Cross-marketplace supplier scraping engine with sub-200ms DOM extraction.</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <span className="font-bold text-slate-900">Reverse Auction Engine:</span>
              <p className="text-slate-600 mt-1">Multi-round bidding with dynamic floor margin protection and cost reduction curve.</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <span className="font-bold text-slate-900">Contract Synthesis:</span>
              <p className="text-slate-600 mt-1">Legally binding commercial PO and contract generation with digital sign-offs.</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#EEF2F7]">
              <span className="font-bold text-slate-900">Razorpay Escrow Settlement:</span>
              <p className="text-slate-600 mt-1">Payment authorization and settlement tracking via Razorpay payment workflow.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
