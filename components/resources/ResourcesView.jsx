"use client";

import React from "react";
import Link from "next/link";
import { 
  Layers, 
  BookOpen, 
  Scale, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Landmark, 
  FileText, 
  Headphones,
  PackageCheck,
  CheckCircle2,
  Building2,
  Bot
} from "lucide-react";

export default function ResourcesView() {
  const resourceCategories = [
    {
      title: "Technical Architecture",
      description: "Interactive system blueprint, 5-layer pipeline architecture, and autonomous multi-agent synchronization specs.",
      icon: Layers,
      href: "/architecture",
      tag: "Core Engineering",
      color: "blue"
    },
    {
      title: "System Documentation",
      description: "REST API endpoints, Chrome Extension Manifest V3 integration, Razorpay webhook schemas, and Prisma models.",
      icon: BookOpen,
      href: "/documentation",
      tag: "API & Reference",
      color: "indigo"
    },
    {
      title: "Security & Compliance",
      description: "Razorpay payment integration, SHA-256 cryptographic verification, Modulo-36 GSTIN audits, and SOC2 readiness.",
      icon: ShieldCheck,
      href: "/security",
      tag: "Trust & Safety",
      color: "emerald"
    },
    {
      title: "Enterprise Support & SLAs",
      badge: "48-Hour SLA",
      description: "Enterprise helpdesk, ERP PunchOut integration advisory, solutions engineering, and priority incident triage.",
      icon: Headphones,
      href: "/support",
      tag: "Client Services",
      color: "amber"
    },
    {
      title: "System Evaluation",
      description: "Auditing guidelines, multi-agent constraint logic, floor margin protection proofs, and procurement benchmarks.",
      icon: Scale,
      href: "/evaluation",
      tag: "Audit & Verification",
      color: "purple"
    },
    {
      title: "Razorpay Escrow Settlement",
      description: "Razorpay payment infrastructure, digital 3-way matching logic, and milestone-based disbursement tracking.",
      icon: Landmark,
      href: "/escrow",
      tag: "Payment Rails",
      color: "cyan"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-blue-50/50 via-white to-slate-50 border border-[#EEF2F7]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <FileText size={13} />
            <span>Enterprise Knowledge &amp; Developer Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Auctra AI Resources &amp; System Infrastructure
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Explore architectural blueprints, developer API documentation, enterprise security compliance, and support services for Auctra Autonomous Procurement.
          </p>
        </div>
      </div>

      {/* Grid of Resource Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resourceCategories.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="enterprise-card p-5 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EEF2F7] flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Access Resource</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
