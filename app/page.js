"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnterpriseNavbar from "@/components/layout/EnterpriseNavbar";
import EnterpriseFooter from "@/components/layout/EnterpriseFooter";
import DashboardView from "@/components/dashboard/DashboardView";
import Step1IntentCapture from "@/components/steps/Step1IntentCapture";
import Step2VendorDiscovery from "@/components/steps/Step2VendorDiscovery";
import Step3ReverseAuction from "@/components/steps/Step3ReverseAuction";
import Step4ContractGeneration from "@/components/steps/Step4ContractGeneration";
import Step5RazorpaySettlement from "@/components/steps/Step5RazorpaySettlement";
import AnalyticsView from "@/components/steps/AnalyticsView";
import VendorsView from "@/components/steps/VendorsView";
import ChromeExtensionDemoView from "@/components/extension/ChromeExtensionDemoView";
import MultiAgentView from "@/components/agents/MultiAgentView";
import SupplierRiskView from "@/components/risk/SupplierRiskView";
import ArchitectureView from "@/components/resources/ArchitectureView";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function AuctraApp() {
  const { currentView } = useProcurementStore();

  const renderActiveView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "step1":
        return <Step1IntentCapture />;
      case "step2":
        return <Step2VendorDiscovery />;
      case "step3":
        return <Step3ReverseAuction />;
      case "step4":
        return <Step4ContractGeneration />;
      case "step5":
        return <Step5RazorpaySettlement />;
      case "agents":
        return <MultiAgentView />;
      case "risk":
        return <SupplierRiskView />;
      case "extension":
        return <ChromeExtensionDemoView />;
      case "analytics":
        return <AnalyticsView />;
      case "vendors":
        return <VendorsView />;
      case "architecture":
        return <ArchitectureView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col font-sans" suppressHydrationWarning>
      {/* 1. Floating Pill Navigation */}
      <EnterpriseNavbar />

      {/* 2. Main Executive SaaS Container */}
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Professional Enterprise Footer */}
      <EnterpriseFooter />
    </div>
  );
}
