"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Code2, 
  Terminal, 
  Layers, 
  Key, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Landmark,
  FileCode,
  Package
} from "lucide-react";

export default function DocumentationView() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeSection, setActiveSection] = useState("api");

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const apis = [
    {
      method: "POST",
      path: "/api/razorpay/order",
      desc: "Creates a verified Razorpay order in INR for custodial escrow funding.",
      body: `{
  "amount": 268000,
  "currency": "INR",
  "receipt": "rcpt_auctra_8842"
}`,
      response: `{
  "success": true,
  "order": {
    "id": "order_auctra_8842",
    "amount": 26800000,
    "currency": "INR",
    "status": "created"
  }
}`
    },
    {
      method: "POST",
      path: "/api/settlement/razorpay",
      desc: "Executes state transitions and Smart Route payouts for escrow custody.",
      body: `{
  "action": "init" | "advance",
  "contract": { "id": "CTR-2024-8842", "grossAmount": 268000 },
  "targetStage": "SETTLEMENT_COMPLETE"
}`,
      response: `{
  "success": true,
  "escrow": {
    "orderId": "order_auctra_8842",
    "status": "SETTLEMENT_COMPLETE",
    "grossAmount": 268000,
    "netDisbursed": 263980,
    "platformFeeRetained": 4020
  }
}`
    },
    {
      method: "POST",
      path: "/api/extension/create-rfq",
      desc: "Receives raw supplier extraction payload from Chrome Extension Manifest V3.",
      body: `{
  "sourceUrl": "https://dir.indiamart.com/...",
  "marketplace": "IndiaMART",
  "extractedProducts": [...]
}`,
      response: `{
  "success": true,
  "rfqId": "RFQ-2848",
  "itemCount": 3,
  "redirectUrl": "/rfq/RFQ-2848"
}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <BookOpen size={13} />
              <span>Developer Reference &amp; System Docs</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Auctra AI Developer Documentation
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Complete technical documentation for APIs, Chrome Extension integration, Razorpay Smart Route custody, and database schemas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/architecture"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 flex items-center gap-1.5"
            >
              <Layers size={13} />
              <span>Architecture Specs</span>
            </Link>
            <Link
              href="/resources"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
            >
              <span>Resources Hub</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-[#EEF2F7] gap-2">
        <button
          onClick={() => setActiveSection("api")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeSection === "api"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          REST API Reference
        </button>
        <button
          onClick={() => setActiveSection("extension")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeSection === "extension"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          Chrome Extension Manifest V3
        </button>
        <button
          onClick={() => setActiveSection("escrow")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeSection === "escrow"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          Razorpay Custody Protocol
        </button>
        <button
          onClick={() => setActiveSection("db")}
          className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeSection === "db"
              ? "border-[#2563EB] text-[#2563EB]"
              : "border-transparent text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          Database Schema (Supabase / Prisma)
        </button>
      </div>

      {/* Section 1: REST API Reference */}
      {activeSection === "api" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {apis.map((api, idx) => (
              <div key={idx} className="enterprise-card p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600 text-white">
                      {api.method}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#0F172A]">
                      {api.path}
                    </span>
                  </div>
                  <span className="text-xs text-[#64748B]">{api.desc}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Request Payload</span>
                      <button
                        onClick={() => copyToClipboard(api.body, `req-${idx}`)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `req-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedKey === `req-${idx}` ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                      {api.body}
                    </pre>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Success Response (200 OK)</span>
                      <button
                        onClick={() => copyToClipboard(api.response, `res-${idx}`)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `res-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copiedKey === `res-${idx}` ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                      {api.response}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Chrome Extension */}
      {activeSection === "extension" && (
        <div className="enterprise-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-[#2563EB]" />
            <h3 className="text-base font-bold text-[#0F172A]">Auctra Procurement Copilot (Manifest V3)</h3>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            The Chrome extension injects an autonomous supplier scraper directly into supplier directories (IndiaMART, Alibaba, Amazon Business, TradeIndia) and bridges product listings directly into the Auctra RFQ Engine.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">1. Load Unpacked</div>
              <p className="text-slate-600 leading-relaxed">
                Open <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">chrome://extensions</code>, enable Developer mode, and select the <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[11px]">/extension</code> folder.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">2. Multi-Marketplace Extraction</div>
              <p className="text-slate-600 leading-relaxed">
                DOM observer extracts seller business name, verified rating, price per unit, MOQ, and catalog link in under 200ms.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">3. Auto-Pipeline Handoff</div>
              <p className="text-slate-600 leading-relaxed">
                Clicking &quot;Capture to Auctra RFQ&quot; synchronizes the supplier batch to the cloud database and opens the dedicated workspace.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Razorpay Custody */}
      {activeSection === "escrow" && (
        <div className="enterprise-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-[#2563EB]" />
            <h3 className="text-base font-bold text-[#0F172A]">Reserve Bank of India (RBI) Escrow Compliance</h3>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            All commercial transactions processed through Auctra follow the RBI nodal account directive powered by Razorpay Payment Infrastructure.
          </p>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-blue-600" />
              <span>Dual Protection Guarantee</span>
            </div>
            <p>
              1. <strong>Buyer Protection:</strong> Capital remains in neutral custodial status until the buyer certifies delivery compliance against the PO SLA.
            </p>
            <p>
              2. <strong>Vendor Assurance:</strong> The vendor receives an irrevocable cryptographic guarantee that 100% of order funds are held in escrow before manufacturing commences.
            </p>
          </div>
        </div>
      )}

      {/* Section 4: Database Schema */}
      {activeSection === "db" && (
        <div className="enterprise-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode size={20} className="text-[#2563EB]" />
              <h3 className="text-base font-bold text-[#0F172A]">Prisma PostgreSQL Schema (Supabase Ready)</h3>
            </div>
            <span className="text-xs font-mono text-[#64748B]">prisma/schema.prisma</span>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Rfq {
  id              String      @id @default(cuid())
  product         String
  category        String
  quantity        Int
  targetBudget    Float
  status          String      // DRAFT, SOURCING, AUCTION, CONTRACT, SETTLED
  createdAt       DateTime    @default(now())
  bids            Bid[]
  contract        Contract?
}

model Supplier {
  id              String      @id @default(cuid())
  name            String
  gstin           String      @unique
  marketplace     String      // IndiaMART, Amazon, TradeIndia, Alibaba
  trustScore      Int
  bids            Bid[]
}

model EscrowSettlement {
  id              String      @id @default(cuid())
  orderId         String      @unique
  virtualAccount  String
  grossAmount     Float
  status          String      // ESCROW_CREATED, FUNDS_LOCKED, RELEASE_PENDING, COMPLETE
  createdAt       DateTime    @default(now())
}`}
          </pre>
        </div>
      )}
    </div>
  );
}
