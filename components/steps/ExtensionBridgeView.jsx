"use client";

import React, { useState } from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  Puzzle, 
  ExternalLink, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Globe, 
  Code, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function ExtensionBridgeView() {
  const { ingestFromExtension, setActiveStep } = useProcurementStore();
  const [platform, setPlatform] = useState("IndiaMART");
  const [productTitle, setProductTitle] = useState("Ergonomic Memory Foam Wrist Rest Set with Gel Cooling");
  const [price, setPrice] = useState(850);
  const [quantity, setQuantity] = useState(50);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const sampleCatalog = {
    IndiaMART: {
      title: "Ergonomic Memory Foam Wrist Rest Set with Gel Cooling",
      price: 850,
      vendor: "ComfortTech Supplies Bengaluru"
    },
    Moglix: {
      title: "Bosch Professional GSB 500W Impact Drill Kit",
      price: 3499,
      vendor: "Industrial Tools Express Hub"
    },
    Alibaba: {
      title: "Custom Anodized CNC Mechanical Keyboard Housing & Switches",
      price: 2400,
      vendor: "Shenzhen Precision Hardware Co."
    },
    "Amazon Business": {
      title: "Dell UltraSharp 27-inch 4K UHD USB-C Hub Monitor (U2723QE)",
      price: 31500,
      vendor: "Appario Retail Private Ltd"
    }
  };

  const handlePlatformChange = (p) => {
    setPlatform(p);
    const item = sampleCatalog[p];
    if (item) {
      setProductTitle(item.title);
      setPrice(item.price);
    }
  };

  const handleSendToAuctra = async () => {
    setIsSending(true);
    setSentSuccess(false);

    try {
      const payload = {
        platform,
        url: `https://www.${platform.toLowerCase().replace(" ", "")}.com/product/sample-sku`,
        title: productTitle,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        vendor: sampleCatalog[platform]?.vendor
      };

      const res = await fetch("/api/extension/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSentSuccess(true);
        setTimeout(() => {
          ingestFromExtension(payload);
        }, 800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <Puzzle size={15} />
          Ecosystem Integrations • Chrome Extension V3
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 mt-1">
          Auctra Chrome Extension &amp; Web Ingestion Bridge
        </h1>
        <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
          Browse IndiaMART, Moglix, Alibaba, or Amazon Business and create RFQs directly from supplier listings.
        </p>
      </div>

      {/* Simulator Test Bench Card */}
      <div className="enterprise-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              One-Click Ingestion Test Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate capturing an active product page from external B2B portals into Auctra
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            API /api/extension/ingest Ready
          </span>
        </div>

        {/* Platform Selector Tabs */}
        <div className="space-y-1.5 text-xs">
          <label className="font-semibold text-slate-700">Simulate Browsing External Portal:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(sampleCatalog).map((plat) => (
              <button
                key={plat}
                type="button"
                onClick={() => handlePlatformChange(plat)}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                  platform === plat
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-2xs"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Scraped Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-slate-700">Detected Product Title:</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-2.5 outline-none focus:border-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Target Ceiling Price (₹):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full text-xs font-mono font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-2.5 outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        {/* Action Trigger */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            Simulates: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">POST /api/extension/ingest</code>
          </div>

          <button
            onClick={handleSendToAuctra}
            disabled={isSending}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            {isSending ? (
              <span>Broadcasting to Auctra Engine...</span>
            ) : sentSuccess ? (
              <>
                <CheckCircle2 size={15} />
                <span>Ingested! Opening Procurement Workflow...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>⚡ Start Reverse Auction on Auctra</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Chrome Extension Unpacked Instructions */}
      <div className="enterprise-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">
          How to Install the Auctra AI Chrome Extension V3
        </h2>
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            1. Open Google Chrome and navigate to <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">chrome://extensions</code>.
          </p>
          <p>
            2. Enable <strong>Developer mode</strong> using the toggle in the top-right corner.
          </p>
          <p>
            3. Click <strong>Load unpacked</strong> and select the project directory: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">e:\auctra\extension</code>.
          </p>
          <p>
            4. The Auctra AI icon will appear in your Chrome toolbar. When browsing IndiaMART, Moglix, Alibaba, or Amazon Business, click the icon to launch an automated reverse auction instantly!
          </p>
        </div>
      </div>
    </div>
  );
}
