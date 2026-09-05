"use client";

import React, { useState } from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import EvaluationModal from "@/components/evaluation/EvaluationModal";
import { 
  Search, 
  BookOpen, 
  ChevronDown, 
  Plus,
  Layers,
  FileText,
  Scale
} from "lucide-react";

export default function Topbar() {
  const { 
    setActiveStep, 
    setCurrentView, 
    currentView 
  } = useProcurementStore();

  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getViewTitle = () => {
    switch (currentView) {
      case "dashboard": return "Dashboard";
      case "step1": return "Create RFQ";
      case "step2": return "Suppliers";
      case "step3": return "Auctions";
      case "step4": return "Contract Verification";
      case "step5": return "Escrow Payment";
      case "analytics": return "Spend";
      case "risk": return "Risk";
      case "extension": return "Chrome Copilot";
      case "architecture": return "Architecture";
      case "documentation": return "Documentation";
      case "resources": return "Resources";
      case "evaluation": return "Evaluation";
      default: return "Dashboard";
    }
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Path Breadcrumb & Search */}
        <div className="flex items-center gap-5 flex-1 max-w-xl">
          <div 
            onClick={() => setCurrentView("dashboard")}
            className="cursor-pointer shrink-0"
          >
            <div className="text-xs text-slate-500 font-normal flex items-center gap-1.5">
              <span className="hover:text-slate-900 transition-colors">Auctra</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-medium">{getViewTitle()}</span>
            </div>
          </div>

          {/* Search Procurement Input */}
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-9 py-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded px-1 shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Resources Dropdown + Exactly 1 Primary Action */}
        <div className="flex items-center gap-3">
          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsResourcesMenuOpen(!isResourcesMenuOpen)}
              className="text-xs font-normal text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <BookOpen size={13} className="text-slate-400" />
              <span>Resources</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {isResourcesMenuOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-md shadow-md border border-slate-200 py-1 text-xs text-slate-700 z-50">
                <button
                  onClick={() => {
                    setIsResourcesMenuOpen(false);
                    setCurrentView("documentation");
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800 font-normal cursor-pointer flex items-center gap-2"
                >
                  <BookOpen size={13} className="text-blue-600" />
                  <span>Documentation</span>
                </button>
                <button
                  onClick={() => {
                    setIsResourcesMenuOpen(false);
                    setCurrentView("resources");
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800 font-normal cursor-pointer flex items-center gap-2"
                >
                  <FileText size={13} className="text-emerald-600" />
                  <span>Resources Hub</span>
                </button>
                <button
                  onClick={() => {
                    setIsResourcesMenuOpen(false);
                    setCurrentView("architecture");
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800 font-normal cursor-pointer flex items-center gap-2"
                >
                  <Layers size={13} className="text-purple-600" />
                  <span>Architecture</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => {
                    setIsResourcesMenuOpen(false);
                    setIsEvaluationModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800 font-normal cursor-pointer flex items-center gap-2"
                >
                  <Scale size={13} className="text-amber-600" />
                  <span>Evaluation &amp; Methodology</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action: New RFQ (#4F46E5) */}
          <button
            onClick={() => setActiveStep(1)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#4F46E5] hover:bg-indigo-700 px-3 py-1.5 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={13} strokeWidth={2} />
            <span>New RFQ</span>
          </button>
        </div>
      </header>

      {/* Evaluation Modal */}
      <EvaluationModal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
      />
    </>
  );
}
