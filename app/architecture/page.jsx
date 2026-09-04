"use client";

import React, { useEffect } from "react";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import ArchitectureView from "@/components/resources/ArchitectureView";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function ArchitecturePage() {
  const { setCurrentView } = useProcurementStore();

  useEffect(() => {
    setCurrentView("architecture");
  }, [setCurrentView]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans">
      <EnterpriseNavbar />
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <ArchitectureView />
      </main>
      <EnterpriseFooter />
    </div>
  );
}
