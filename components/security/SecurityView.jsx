"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Landmark, 
  FileCheck, 
  KeyRound, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Server,
  Fingerprint,
  FileKey,
  Scale
} from "lucide-react";

export default function SecurityView() {
  const securityPillars = [
    {
      title: "Razorpay Escrow Integration",
      badge: "Payment Workflow",
      description: "Integrated with Razorpay Payment Infrastructure. 100% of awarded PO capital is locked in secure payment workflows until delivery acceptance.",
      icon: Landmark,
      color: "blue",
      specs: ["Razorpay Standard Checkout", "Dual-party milestone authorization", "No commingling of corporate operating funds"]
    },
    {
      title: "Cryptographic Milestone Settlement",
      badge: "Settlement Tracking",
      description: "Settlements require a digital 3-way match: Purchase Order specifications, Vendor Tax Invoice, and digital Goods Receipt Note (GRN) sign-off before funds are unblocked and routed.",
      icon: Lock,
      color: "indigo",
      specs: ["SHA-256 state hashing", "Zero unauthorized early disbursements", "Automated milestone disbursement tracking"]
    },
    {
      title: "Statutory GSTIN Tax Check",
      badge: "Modulo-36 Algorithm",
      description: "Real-time mathematical check-digit validation across 15-character Indian GSTIN identifiers, cross-verifying state jurisdiction codes, PAN checksums, and compliance entity records.",
      icon: FileCheck,
      color: "emerald",
      specs: ["Modulo-36 check-digit verification", "Jurisdiction state code audits", "Sub-10ms synchronous validation"]
    },
    {
      title: "Immutable Enterprise Audit Trails",
      badge: "Full Observability",
      description: "Every requisition, RFQ status change, supplier bid decrement, contract signature, and escrow release is serialized with immutable timestamps, actor IDs, and audit payloads.",
      icon: Fingerprint,
      color: "purple",
      specs: ["Append-only transaction ledger", "Exportable audit logs for statutory reporting", "Granular actor identification"]
    },
    {
      title: "Enterprise RBAC & Access Control",
      badge: "Least Privilege",
      description: "Strict Role-Based Access Control dividing procurement operations into Procurement Managers, Department Heads, Finance Officers, and Vendor Representatives.",
      icon: KeyRound,
      color: "amber",
      specs: ["Multi-tier approval thresholds", "Separation of duties (SoD) enforcement", "JWT-based session integrity"]
    },
    {
      title: "Cloud Infrastructure & SOC 2 Readiness",
      badge: "Infrastructure Hardening",
      description: "Hosted on resilient cloud infrastructure with TLS 1.3 in transit, AES-256 encryption at rest, automated vulnerability scans, and strict Content Security Policy (CSP).",
      icon: Server,
      color: "cyan",
      specs: ["TLS 1.3 / AES-256 encryption", "Strict CSP headers for Chrome Extension", "Zero hardcoded production secrets"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <ShieldCheck size={13} />
              <span>Enterprise Trust &amp; Regulatory Compliance</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Auctra AI Security &amp; Compliance Center
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Engineered for institutional-grade reliability, Razorpay payment custody, settlement tracking, and automated statutory tax verification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/documentation"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 flex items-center gap-1.5"
            >
              <FileKey size={13} />
              <span>Security Specs</span>
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Contact Security</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Security Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {securityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="enterprise-card p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EEF2F7] space-y-1.5">
                {pillar.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Escrow Custody Assurance Callout */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-blue-50/70 via-white to-slate-50 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Landmark size={22} />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#0F172A]">
              Powered by Razorpay Payment Infrastructure
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              Auctra AI functions strictly as a software orchestrator and workflow governance layer. All financial settlement and payment authorizations are executed directly through Razorpay Payment Infrastructure. Neither Auctra nor any intermediate worker has direct access to buyer funds.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-blue-600">
              <Link href="/architecture" className="hover:underline flex items-center gap-1">
                <span>View Settlement Architecture</span>
                <ArrowRight size={12} />
              </Link>
              <Link href="/documentation" className="hover:underline flex items-center gap-1">
                <span>Escrow API Specifications</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
