"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ExternalLink,
  Check,
  Copy,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";
import { useProcurementStore } from "@/store/useProcurementStore";

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5 text-[#0A66C2]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export default function EnterpriseFooter() {
  const { setCurrentView, setActiveStep } = useProcurementStore();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("prabjyotsingh996@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full bg-white border-t border-[#EEF2F7] mt-16 text-[#0F172A]">
      <div className="w-full max-w-[1680px] mx-auto py-12 px-4 sm:px-6 lg:px-8 xl:px-10">

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#EEF2F7]">

          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/brand-horizontal.png"
                alt="Auctra"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-[13px] text-[#64748B] leading-relaxed max-w-sm">
              Enterprise procurement and escrow payment platform. Orchestrating verified supplier networks, real-time reverse auctions, and milestone escrow settlements.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[11.5px] font-semibold text-[#1D4ED8]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span>Demo Environment • Based on sample procurement dataset</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-[13px] text-[#64748B]">
              <li>
                <Link
                  href="/"
                  onClick={() => setCurrentView("dashboard")}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Operations Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/rfqs"
                  onClick={() => {
                    setActiveStep(1);
                    setCurrentView("step1");
                  }}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Create RFQ
                </Link>
              </li>
              <li>
                <Link
                  href="/suppliers"
                  onClick={() => setCurrentView("vendors")}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Verified Supplier Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/auctions"
                  onClick={() => {
                    setActiveStep(3);
                    setCurrentView("step3");
                  }}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Live Reverse Auction
                </Link>
              </li>
              <li>
                <Link
                  href="/contracts"
                  onClick={() => {
                    setActiveStep(4);
                    setCurrentView("step4");
                  }}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Contract Verification &amp; POs
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  onClick={() => setCurrentView("analytics")}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Spend &amp; Savings Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/extension"
                  onClick={() => setCurrentView("extension")}
                  className="hover:text-[#2563EB] transition-colors cursor-pointer text-left inline-block"
                >
                  Chrome Copilot
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & Security */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
              Enterprise Trust
            </h4>
            <ul className="space-y-2 text-[13px] text-[#64748B]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10B981] shrink-0" />
                <span>GSTIN Modulo-36 Validated</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10B981] shrink-0" />
                <span>RBI Nodal Trust Escrow</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10B981] shrink-0" />
                <span>Powered by Razorpay Payment Infrastructure</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10B981] shrink-0" />
                <span>3-Way Digital PO Match</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#10B981] shrink-0" />
                <span>Immutable Audit Logs</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Creator Details */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-bold text-[#0F172A] uppercase tracking-wider">
              Lead Architect
            </h4>

            {/* Profile Card */}
            <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#EEF2F7] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white font-bold flex items-center justify-center text-[13px] shadow-xs shrink-0">
                  PS
                </div>
                <div>
                  <div className="font-bold text-[14px] text-[#0F172A] leading-tight">
                    Prabjyot Singh
                  </div>
                  <div className="text-[11.5px] text-[#64748B] mt-0.5 font-medium">
                    Creator
                  </div>
                </div>
              </div>

              {/* Social / Contact Links */}
              <div className="space-y-1.5 pt-1">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/prabjyotsingh996/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-1.5 rounded-[10px] bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A] hover:text-[#2563EB] text-[12px] font-medium transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight size={12} className="text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/prabjyotsingh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-3 py-1.5 rounded-[10px] bg-white border border-[#E2E8F0] hover:border-[#0F172A] text-[#0F172A] text-[12px] font-medium transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight size={12} className="text-[#94A3B8] group-hover:text-[#0F172A] transition-colors" />
                </a>

                {/* Contact Email */}
                <div className="flex items-center gap-1.5">
                  <a
                    href="mailto:prabjyotsingh996@gmail.com"
                    className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-[#0F172A] hover:text-[#2563EB] text-[12px] font-medium transition-all truncate"
                    title="Send Email"
                  >
                    <Mail size={13} className="text-[#EA4335] shrink-0" />
                    <span className="truncate">prabjyotsingh996@gmail.com</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-[10px] bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check size={13} className="text-[#10B981]" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Details */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12.5px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <img
              src="/brand-mark.png"
              alt="Auctra AI Mark"
              className="h-4 w-auto object-contain opacity-80"
            />
            <span>
              © {new Date().getFullYear()} <strong>Auctra</strong>. Enterprise Procurement Platform. Escrow Payment.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#64748B]">
            <span>Developed with passion by Prabjyot Singh</span>
            <span>•</span>
            <a
              href="mailto:prabjyotsingh996@gmail.com"
              className="hover:text-[#2563EB] transition-colors underline"
            >
              prabjyotsingh.me
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
