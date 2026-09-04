"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  FileText, 
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Check
} from "lucide-react";
import { useProcurementStore } from "@/store/useProcurementStore";

export default function SupplierProfileDrawer({ supplier, isOpen, onClose, onSelectForRfq }) {
  const router = useRouter();
  const { setActiveStep, setCurrentView } = useProcurementStore();

  if (!isOpen || !supplier) return null;

  const trustScore = supplier.trustScore || 94;
  const fulfillmentRate = supplier.pastFulfillmentRate || 98.2;
  const avgDeliveryHours = supplier.slaHours || supplier.avgDeliveryHours || 36;
  const totalTransactions = supplier.totalTransactions || 2431;
  const contractValue = supplier.contractValueCr || "4.2";
  const gstin = supplier.gstin || "33AABCN3391C1ZT";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EEF2F7] shadow-2xl flex flex-col text-[#0F172A]">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#EEF2F7] bg-[#F8FAFC] flex items-start justify-between">
            <div className="space-y-1">
              <div className="text-[11.5px] font-semibold text-[#64748B] uppercase tracking-wider">
                Supplier Profile &amp; Governance
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                {supplier.name || "Nexus Industrial"}
              </h2>
              <div className="text-xs text-[#64748B]">
                {supplier.legalName || "Nexus Industrial Wholesale Solutions"}
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-[10.5px] font-semibold border border-[#BFDBFE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                  Demo Environment • Sample Supplier Record
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-[#0F172A]">
            {/* Verification Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-semibold text-[11.5px]">
                <Check size={12} strokeWidth={2.5} />
                GSTIN Audited
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-medium text-[11.5px]">
                MSME Registered
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-bold text-[11.5px]">
                <Award size={13} />
                Trust Score {trustScore}
              </span>
            </div>

            {/* 4 Core Performance Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="text-[11.5px] font-semibold text-[#64748B]">
                  Fulfillment Rate
                </div>
                <div className="text-[22px] font-bold text-[#0F172A] font-mono mt-0.5">
                  {fulfillmentRate}%
                </div>
                <div className="text-[11px] text-[#10B981] font-semibold mt-0.5">
                  Top 2% of fleet
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="text-[11.5px] font-semibold text-[#64748B]">
                  Delivery Turnaround
                </div>
                <div className="text-[22px] font-bold text-[#0F172A] font-mono mt-0.5">
                  {avgDeliveryHours} Hours
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Contractual SLA
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="text-[11.5px] font-semibold text-[#64748B]">
                  Completed POs
                </div>
                <div className="text-[22px] font-bold text-[#0F172A] font-mono mt-0.5">
                  {totalTransactions.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Historical orders
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7]">
                <div className="text-[11.5px] font-semibold text-[#64748B]">
                  Catalog Volume
                </div>
                <div className="text-[20px] font-bold text-[#2563EB] font-mono mt-0.5">
                  {supplier.contractVolume || "₹32.5 Lakhs"}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Sample dataset
                </div>
              </div>
            </div>

            {/* Corporate Compliance Registry */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[12px] font-bold text-[#0F172A]">
                Corporate Compliance Registry
              </div>

              <div className="p-4 rounded-[14px] border border-[#EEF2F7] bg-[#F8FAFC] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] font-medium">GSTIN:</span>
                  <span className="font-mono text-[#0F172A] font-bold">{gstin}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] font-medium">Headquarters:</span>
                  <span className="text-[#0F172A]">{supplier.city || "Chennai"}, {supplier.state || "Tamil Nadu"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] font-medium">Credit Rating:</span>
                  <span className="font-mono text-[#2563EB] font-bold">{supplier.creditRating || "AA"} Rating</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] font-medium">Dispute History:</span>
                  <span className="text-[#10B981] font-semibold">0 Litigations (Clean Record)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] font-medium">Directory Source:</span>
                  <span className="text-[#0F172A] capitalize">{supplier.platformLabel || supplier.platform || "TradeIndia Verified"}</span>
                </div>
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="space-y-2 pt-1">
              <div className="text-[12px] font-bold text-[#0F172A]">
                Enterprise Contact Information
              </div>
              <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#EEF2F7] space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#64748B]">
                  <Mail size={14} className="text-[#94A3B8] shrink-0" />
                  <span className="text-[#0F172A] font-medium">{supplier.contactEmail || "procurement@nexusindustrial.org"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#64748B]">
                  <Phone size={14} className="text-[#94A3B8] shrink-0" />
                  <span className="text-[#0F172A] font-medium">{supplier.contactPhone || "+91 44 2811 0932"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-[#EEF2F7] bg-[#F8FAFC] flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] rounded-[12px] text-xs font-semibold text-[#0F172A] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                if (onSelectForRfq) onSelectForRfq(supplier);
                setActiveStep(1);
                setCurrentView("step1");
                router.push("/rfqs");
              }}
              className="primary-gradient-btn flex-1 py-2.5 px-3 rounded-[12px] text-xs font-semibold text-white shadow-sm transition-all cursor-pointer text-center"
            >
              Create RFQ with Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
