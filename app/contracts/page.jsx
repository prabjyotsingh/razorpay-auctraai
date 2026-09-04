"use client";

import React, { useEffect } from "react";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import Step4ContractGeneration from "@/components/steps/Step4ContractGeneration";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function ContractsPage() {
  const { setCurrentView, setActiveStep } = useProcurementStore();

  useEffect(() => {
    setCurrentView("step4");
    setActiveStep(4);
  }, [setCurrentView, setActiveStep]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans">
      <EnterpriseNavbar />
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <Step4ContractGeneration />
      </main>
      <EnterpriseFooter />
    </div>
  );
}
