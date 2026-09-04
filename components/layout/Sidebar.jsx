"use client";

import React from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import {
  LayoutDashboard,
  FileText,
  Users,
  Flame,
  FileCheck,
  Landmark,
  BarChart2,
  ShieldCheck,
  Compass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const {
    currentView,
    setCurrentView,
    activeStep,
    setActiveStep,
    sidebarCollapsed,
    toggleSidebar,
    org
  } = useProcurementStore();

  const navigationSections = [
    {
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, isStep: false }
      ]
    },
    {
      title: "Procurement Workflow",
      items: [
        { id: "step1", stepNum: 1, label: "Create RFQ", icon: FileText, isStep: true },
        { id: "step2", stepNum: 2, label: "Suppliers", icon: Users, isStep: true },
        { id: "step3", stepNum: 3, label: "Auctions", icon: Flame, isStep: true },
        { id: "step4", stepNum: 4, label: "Contract Verification", icon: FileCheck, isStep: true },
        { id: "step5", stepNum: 5, label: "Escrow Payment", icon: Landmark, isStep: true }
      ]
    },
    {
      title: "Analytics",
      items: [
        { id: "analytics", label: "Spend", icon: BarChart2, isStep: false },
        { id: "risk", label: "Risk", icon: ShieldCheck, isStep: false }
      ]
    },
    {
      items: [
        { id: "extension", label: "Chrome Copilot", icon: Compass, isStep: false }
      ]
    }
  ];

  const handleNavClick = (item) => {
    if (item.isStep && item.stepNum) {
      setActiveStep(item.stepNum);
    } else {
      setCurrentView(item.id);
    }
  };

  return (
    <aside
      className={`h-screen bg-[#0F172A] text-[#94A3B8] flex flex-col border-r border-slate-800/80 transition-all duration-150 select-none z-30 shrink-0 sticky top-0 ${
        sidebarCollapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/60">
        <div
          onClick={() => setCurrentView("dashboard")}
          className="flex items-center gap-2.5 overflow-hidden cursor-pointer"
        >
          <div className="w-6 h-6 rounded bg-[#4F46E5] flex items-center justify-center text-white font-semibold text-xs shrink-0">
            A
          </div>
          {!sidebarCollapsed && (
            <div className="text-slate-100 font-semibold text-sm tracking-tight">
              Auctra
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800/50 transition-colors"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navigationSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            {section.title && !sidebarCollapsed && (
              <div className="px-3 pb-1 text-[11px] font-medium text-slate-500 tracking-normal">
                {section.title}
              </div>
            )}
            {section.title && sidebarCollapsed && (
              <div className="h-px bg-slate-800/60 my-2" />
            )}

            {section.items.map((item) => {
              const isActive = item.isStep
                ? activeStep === item.stepNum && currentView === item.id
                : currentView === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer text-left ${
                    isActive
                      ? "text-[#FFFFFF] bg-white/[0.04] border-l-[3px] border-[#4F46E5] font-medium pl-[9px]"
                      : "text-[#94A3B8] hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={14}
                    className={`shrink-0 ${isActive ? "text-[#FFFFFF]" : "text-[#94A3B8]"}`}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Minimal Footer */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">{org?.name || "Acme Tech"}</span>
          <span className="font-mono text-[10px] text-slate-600">IN</span>
        </div>
      )}
    </aside>
  );
}
