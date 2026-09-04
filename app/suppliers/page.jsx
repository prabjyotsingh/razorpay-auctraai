"use client";

import React, { useEffect } from "react";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import VendorsView from "@/components/steps/VendorsView";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function SuppliersPage() {
  const { setCurrentView } = useProcurementStore();

  useEffect(() => {
    setCurrentView("vendors");
  }, [setCurrentView]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans">
      <EnterpriseNavbar />
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <VendorsView />
      </main>
      <EnterpriseFooter />
    </div>
  );
}
