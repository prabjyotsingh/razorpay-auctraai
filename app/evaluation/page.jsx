"use client";

import React, { useEffect } from "react";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import EvaluationView from "@/components/evaluation/EvaluationView";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function EvaluationPage() {
  const { setCurrentView } = useProcurementStore();

  useEffect(() => {
    setCurrentView("evaluation");
  }, [setCurrentView]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans">
      <EnterpriseNavbar />
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <EvaluationView />
      </main>
      <EnterpriseFooter />
    </div>
  );
}
