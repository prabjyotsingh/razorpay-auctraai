"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  Sparkles, 
  Search, 
  ChevronDown, 
  Layers, 
  BookOpen,
  FileText,
  Scale, 
  ShieldCheck,
  Headphones,
  Plus,
  RotateCcw,
  Compass,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import EvaluationModal from "@/components/evaluation/EvaluationModal";

export default function EnterpriseNavbar() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { currentView, setCurrentView, resetToDemoState } = useProcurementStore();
  const [showResources, setShowResources] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetToDemoState();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "/", view: "dashboard" },
    { key: "rfqs", label: "Create RFQ", href: "/rfqs", view: "step1" },
    { key: "suppliers", label: "Suppliers", href: "/suppliers", view: "vendors" },
    { key: "auctions", label: "Auctions", href: "/auctions", view: "step3" },
    { key: "contracts", label: "Contracts & POs", href: "/contracts", view: "step4" },
    { key: "analytics", label: "Analytics", href: "/analytics", view: "analytics" },
    { key: "copilot", label: "Chrome Copilot", href: "/extension", view: "extension" },
  ];

  const getIsActive = (item) => {
    if (item.href === "/" && (pathname === "/" || pathname === "")) {
      return pathname === "/" && (currentView === "dashboard" || !pathname.includes("/"));
    }
    if (item.href === "/rfqs" && (pathname === "/rfqs" || pathname.startsWith("/rfq"))) return true;
    if (item.href === "/suppliers" && (pathname === "/suppliers" || pathname === "/vendors")) return true;
    if (item.href === "/auctions" && (pathname === "/auctions" || pathname.startsWith("/auction"))) return true;
    if (item.href === "/contracts" && pathname === "/contracts") return true;
    if (item.href === "/analytics" && pathname === "/analytics") return true;
    if (item.href === "/extension" && (pathname === "/extension" || pathname === "/copilot")) return true;
    return false;
  };

  return (
    <>
      <div className="w-full pt-4 px-4 sm:px-6 lg:px-8 xl:px-10 sticky top-0 z-40">
        <header className="w-full max-w-[1680px] mx-auto h-[72px] rounded-[24px] bg-white/90 backdrop-blur-[20px] border border-[#EEF2F7] shadow-[0_8px_32px_rgba(15,23,42,0.08)] px-5 sm:px-7 flex items-center justify-between transition-all">
          
          {/* Logo Brand Group */}
          <Link 
            href="/"
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            onClick={() => setCurrentView("dashboard")}
          >
            <img
              src="/brand-mark.png"
              alt="Auctra"
              className="h-9 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />

            <div className="flex flex-col">
              <span className="text-[17px] font-bold text-[#0F172A] tracking-tight leading-none">
                Auctra
              </span>
              <span className="text-[10.5px] font-medium text-[#64748B] leading-tight mt-1 tracking-normal hidden sm:inline">
                Enterprise Procurement Platform
              </span>
            </div>

            <div 
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] font-semibold text-[#065F46] ml-2"
              title="Live Procurement Network"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>Live Operations</span>
            </div>
          </Link>

          {/* Navigation Pill Container */}
          <nav className="hidden lg:flex items-center bg-[#F1F5F9]/80 p-1.5 rounded-[18px] border border-[#E2E8F0]/60">
            {navItems.map((item) => {
              const active = getIsActive(item);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setCurrentView(item.view)}
                  className={`relative px-3.5 py-1.5 text-[13px] transition-all duration-200 cursor-pointer rounded-[12px] ${
                    active
                      ? "bg-white text-[#0F172A] font-semibold shadow-[0_2px_8px_rgba(15,23,42,0.06)] border border-[#E2E8F0]/80"
                      : "text-[#64748B] hover:text-[#0F172A] font-medium hover:bg-white/40"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#2563EB] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Bar (Trigger) */}
            <div className="relative hidden xl:block w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                readOnly
                placeholder="Search RFQ, Vendor..."
                onClick={() => router.push("/rfqs")}
                className="w-full h-9 pl-8 pr-3 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none hover:border-[#CBD5E1] cursor-pointer transition-colors"
              />
            </div>

            {/* Resources & Architecture Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowResources(!showResources)}
                className={`h-9 px-3 text-[12.5px] font-medium rounded-[10px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                  showResources 
                    ? "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]" 
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] border-[#E2E8F0]"
                }`}
              >
                <span>Resources</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${showResources ? "rotate-180" : ""}`} />
              </button>

              {showResources && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white border border-[#EEF2F7] rounded-[16px] shadow-[0_12px_32px_rgba(15,23,42,0.1)] p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowResources(false)}
                >
                  <Link
                    href="/documentation"
                    onClick={() => {
                      setCurrentView("documentation");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <BookOpen size={14} className="text-[#2563EB]" />
                    <span>Documentation</span>
                  </Link>

                  <Link
                    href="/resources"
                    onClick={() => {
                      setCurrentView("resources");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText size={14} className="text-[#059669]" />
                    <span>Resources Hub</span>
                  </Link>

                  <Link
                    href="/architecture"
                    onClick={() => {
                      setCurrentView("architecture");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Layers size={14} className="text-[#7C3AED]" />
                    <span>Architecture Blueprint</span>
                  </Link>

                  <Link
                    href="/security"
                    onClick={() => {
                      setCurrentView("security");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldCheck size={14} className="text-[#0284C7]" />
                    <span>Security &amp; Compliance</span>
                  </Link>

                  <Link
                    href="/support"
                    onClick={() => {
                      setCurrentView("support");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Headphones size={14} className="text-[#F59E0B]" />
                    <span>Enterprise Support &amp; SLA</span>
                  </Link>

                  <Link
                    href="/evaluation"
                    onClick={() => {
                      setCurrentView("evaluation");
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#0F172A] hover:bg-[#F8FAFC] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Scale size={14} className="text-[#D97706]" />
                    <span>Evaluation &amp; Methodology</span>
                  </Link>

                  <div className="h-[1px] bg-[#EEF2F7] my-1" />

                  <button
                    onClick={() => {
                      handleReset();
                      setShowResources(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] font-medium text-[#DC2626] hover:bg-[#FEF2F2] rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} className="text-[#DC2626]" />
                    <span>Reset Environment</span>
                  </button>
                </div>
              )}
            </div>

            {/* One-Click Reset Demo Button */}
            <button
              onClick={handleReset}
              title="Reset to clean baseline environment"
              className={`h-9 px-3 text-[12.5px] font-medium rounded-[12px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                resetSuccess 
                  ? "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]" 
                  : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] border-transparent hover:border-[#E2E8F0]"
              }`}
            >
              <RotateCcw size={13} className={resetSuccess ? "animate-spin" : ""} />
              <span className="hidden md:inline">{resetSuccess ? "Reset Applied!" : "Reset Environment"}</span>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/rfqs"
              onClick={() => setCurrentView("step1")}
              className="h-9 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-[13px] font-semibold rounded-[10px] flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.25)] cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create RFQ</span>
            </Link>
          </div>
        </header>
      </div>

      {/* Evaluation Modal */}
      <EvaluationModal isOpen={showEvaluationModal} onClose={() => setShowEvaluationModal(false)} />
    </>
  );
}
