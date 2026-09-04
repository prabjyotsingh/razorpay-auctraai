"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Layers,
  ArrowRight,
  Database,
  Globe,
  Cpu,
  FileCheck2,
  Landmark,
  CheckCircle2,
  ExternalLink,
  Zap,
  RotateCcw
} from "lucide-react";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function ArchitectureView() {
  const { setCurrentView } = useProcurementStore();
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      step: 1,
      title: "Requisition Ingestion",
      subtitle: "Chrome Extension & Web",
      icon: Globe,
      color: "#2563EB",
      bgColor: "#EFF6FF",
      borderColor: "#BFDBFE",
      summary: "Captures product specifications from IndiaMART, Amazon Business, TradeIndia or natural language requirements.",
      techStack: ["Chrome Extension Manifest V3", "Next.js Route Handlers", "Regex & NLP Intent Parser"],
      guarantees: "< 200ms page extraction latency, automatic MOQ and currency normalization."
    },
    {
      step: 2,
      title: "Supplier Discovery",
      subtitle: "Tax & Trust Verification",
      icon: ShieldCheck,
      color: "#059669",
      bgColor: "#ECFDF5",
      borderColor: "#A7F3D0",
      summary: "Evaluates commercial suppliers across verified marketplaces, runs 15-digit GSTIN Modulo-36 verification, and SLA scoring.",
      techStack: ["GSTIN Modulo-36 Checksum", "Trust Score Index (0-100)", "MSME UDYAM Registry Check"],
      guarantees: "100% tax compliant vendors, verified fulfillment history, and active legal entities."
    },
    {
      step: 3,
      title: "Reverse Auction Engine",
      subtitle: "Dynamic Equilibrium Simulation",
      icon: Cpu,
      color: "#D97706",
      bgColor: "#FFFBEB",
      borderColor: "#FDE68A",
      summary: "Runs synchronized multi-round decrementing auctions where participating suppliers bid downward against ceiling budgets.",
      techStack: ["Floor Margin Protection (8-15%)", "SLA Fulfillment Weighting", "Zustand Reactive State Engine"],
      guarantees: "Guaranteed cost deflation (average 17.8%), no predatory underbidding below floor margins."
    },
    {
      step: 4,
      title: "Purchase Order & Contract",
      subtitle: "Legally Binding Execution",
      icon: FileCheck2,
      color: "#7C3AED",
      bgColor: "#F5F3FF",
      borderColor: "#DDD6FE",
      summary: "Synthesizes commercial procurement agreements with itemized GST schedules, liquidated damages, and dual digital sign-offs.",
      techStack: ["Client-Side PDF Generation (jsPDF)", "Statutory Commercial Clauses", "Immutable Audit Digest"],
      guarantees: "Compliant with Indian Contract Act 1872 & IT Act 2000 digital signature standards."
    },
    {
      step: 5,
      title: "Razorpay Escrow Custody",
      subtitle: "Powered by Razorpay Payment Infrastructure",
      icon: Landmark,
      color: "#0F172A",
      bgColor: "#F8FAFC",
      borderColor: "#E2E8F0",
      summary: "Secures purchase order capital in a Reserve Bank of India (RBI) compliant nodal trust account until milestone inspection.",
      techStack: ["Razorpay Orders API", "RBI Nodal Custody Directives", "Smart Route Split Payouts"],
      guarantees: "Zero counterparty risk for buyers, guaranteed payout for suppliers upon 3-way match."
    }
  ];

  return (
    <div className="w-full space-y-8 text-[#0F172A] pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EEF2F7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[11.5px] font-semibold text-[#1D4ED8] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>Enterprise System Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-[30px] font-bold text-[#0F172A] tracking-tight">
            Technical Architecture &amp; Execution Pipeline
          </h1>
          <p className="text-[13.5px] text-[#64748B] mt-1">
            End-to-end autonomous procurement protocol from marketplace ingestion to RBI-compliant escrow settlement.
          </p>
        </div>

        <Link
          href="/"
          onClick={() => setCurrentView("dashboard")}
          className="h-10 px-4 text-xs font-semibold text-[#2563EB] bg-white border border-[#BFDBFE] hover:bg-[#EFF6FF] rounded-[12px] transition-colors cursor-pointer inline-flex items-center gap-2 self-start sm:self-center"
        >
          <span>Return to Dashboard</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Visual Pipeline Architecture Diagram */}
      <div className="premium-card p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-[#0F172A] tracking-tight">
              5-Stage Autonomous Procurement Pipeline
            </h2>
            <p className="text-[12.5px] text-[#64748B] mt-0.5">
              Click any stage in the sequence below to inspect technical specifications and data contracts.
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
            All 5 Stages Operational
          </span>
        </div>

        {/* Diagram Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = activeStage === stage.step;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStage(stage.step)}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected 
                    ? "bg-white shadow-[0_8px_24px_rgba(37,99,235,0.12)] border-[#2563EB] ring-2 ring-[#2563EB]/10" 
                    : "bg-[#F8FAFC] hover:bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="w-7 h-7 rounded-[10px] flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: stage.bgColor, color: stage.color }}
                    >
                      {stage.step}
                    </span>
                    <Icon size={16} style={{ color: stage.color }} />
                  </div>

                  <h3 className="text-[13.5px] font-bold text-[#0F172A] leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EEF2F7] flex items-center justify-between text-[11px]">
                  <span className="text-[#64748B]">Latency</span>
                  <span className="font-mono font-semibold text-[#0F172A]">
                    {stage.step === 1 ? "<200ms" : stage.step === 3 ? "Real-time" : "<500ms"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        {(() => {
          const current = stages.find(s => s.step === activeStage);
          const Icon = current.icon;
          return (
            <div className="p-6 rounded-[18px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: current.bgColor, color: current.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Stage {current.step} Technical Specification
                    </div>
                    <h3 className="text-[18px] font-bold text-[#0F172A]">
                      {current.title} — {current.subtitle}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11.5px] font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    <span>Statutory Validated</span>
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-[#334155] leading-relaxed">
                {current.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-[14px] border border-[#E2E8F0] space-y-2">
                  <span className="text-[11.5px] font-bold text-[#64748B] uppercase tracking-wider">
                    Core Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#F1F5F9] rounded-[8px] text-[11.5px] font-mono text-[#0F172A] border border-[#E2E8F0]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-[14px] border border-[#E2E8F0] space-y-2">
                  <span className="text-[11.5px] font-bold text-[#64748B] uppercase tracking-wider">
                    Execution Guarantees
                  </span>
                  <p className="text-[12.5px] text-[#0F172A] leading-relaxed">
                    {current.guarantees}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 3 Detailed Technical Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Escrow Architecture */}
        <div className="premium-card space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#EEF2F7]">
            <div className="w-8 h-8 rounded-[10px] bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <Lock size={16} />
            </div>
            <div>
              <h3 className="text-[14.5px] font-bold text-[#0F172A]">
                Escrow Custody
              </h3>
              <p className="text-[11px] text-[#64748B]">Powered by Razorpay</p>
            </div>
          </div>

          <p className="text-[12.5px] text-[#475569] leading-relaxed">
            Operates in compliance with Reserve Bank of India (RBI) Directions on Nodal Accounts and Escrow Mechanisms. 100% of awarded PO capital is locked in neutral custody before supplier fulfillment commences.
          </p>

          <div className="space-y-2 pt-1 text-[11.5px]">
            <div className="p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#EEF2F7]">
              <span className="font-semibold text-[#0F172A]">Nodal Custody:</span>
              <p className="text-[#64748B] mt-0.5">RBI licensed scheduled commercial bank nodal account.</p>
            </div>
            <div className="p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#EEF2F7]">
              <span className="font-semibold text-[#0F172A]">3-Way Match:</span>
              <p className="text-[#64748B] mt-0.5">Dual digital release: Purchase Order = Tax Invoice = Proof of Delivery.</p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Tax & Compliance */}
        <div className="premium-card space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#EEF2F7]">
            <div className="w-8 h-8 rounded-[10px] bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h3 className="text-[14.5px] font-bold text-[#0F172A]">
                Tax &amp; GSTIN Verification
              </h3>
              <p className="text-[11px] text-[#64748B]">Statutory Modulo-36</p>
            </div>
          </div>

          <p className="text-[12.5px] text-[#475569] leading-relaxed">
            All participating vendors undergo Modulo-36 check-digit validation across their 15-character Goods and Services Tax Identification Number (GSTIN) prior to auction admittance.
          </p>

          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-[11.5px] font-mono text-[#334155] leading-relaxed">
            <code>
              Formula: Modulo 36 checksum over (State Code 2d + PAN 10c + Entity 1d + Z + CheckDigit)
            </code>
          </div>

          <div className="text-[11.5px] text-[#059669] font-medium flex items-center gap-1.5">
            <CheckCircle2 size={13} />
            <span>Guaranteed active GSTIN and MSME status</span>
          </div>
        </div>

        {/* Pillar 3: Auction Algorithm */}
        <div className="premium-card space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#EEF2F7]">
            <div className="w-8 h-8 rounded-[10px] bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="text-[14.5px] font-bold text-[#0F172A]">
                Auction Equilibrium
              </h3>
              <p className="text-[11px] text-[#64748B]">Floor Margin Engine</p>
            </div>
          </div>

          <p className="text-[12.5px] text-[#475569] leading-relaxed">
            Decrementing bid simulation enforces hard supplier margin floors (8% to 15%) so cost savings do not compromise product quality or fulfillment reliability.
          </p>

          <div className="space-y-2 pt-1 text-[11.5px]">
            <div className="p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#EEF2F7]">
              <span className="font-semibold text-[#0F172A]">Dynamic Decrements:</span>
              <p className="text-[#64748B] mt-0.5">Calculated based on bidder proximity to ceiling budget.</p>
            </div>
            <div className="p-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#EEF2F7]">
              <span className="font-semibold text-[#0F172A]">SLA Penalty Factor:</span>
              <p className="text-[#64748B] mt-0.5">Suppliers with slower delivery windows receive lower priority score.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
