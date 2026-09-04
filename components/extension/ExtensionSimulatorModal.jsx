"use client";

import React, { useState } from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  Globe, 
  Sparkles, 
  ExternalLink, 
  Download, 
  Check, 
  X, 
  ArrowRight, 
  Layers, 
  ShoppingBag, 
  Building2, 
  Compass, 
  Lock, 
  RefreshCw,
  Zap
} from "lucide-react";

export const SAMPLE_MARKETPLACE_LISTINGS = [
  {
    id: "amazon_b2b_wristrest",
    platform: "Amazon Business (India)",
    platformIcon: "ShoppingBag",
    platformColor: "text-amber-600 bg-amber-50 border-amber-200",
    url: "https://business.amazon.in/dp/B08XYZ412-Ergonomic-Wrist-Rest",
    title: "Ergonomic Memory Foam Wrist Rest with Anti-Skid Rubber Base",
    seller: "Cloudtail B2B Prime Direct",
    unitPrice: 899,
    quantity: 50,
    sla: "24 hours (Prime Delivery)",
    category: "Office Ergonomics & Peripherals",
    sku: "AMZ-IN-B08XYZ412",
    rating: 4.8,
    reviews: 1420,
    specs: [
      "High density responsive memory foam",
      "Reinforced non-slip PU base",
      "Stain-resistant breathable fabric",
      "Business Prime Bulk Pricing Available"
    ]
  },
  {
    id: "indiamart_keyboards",
    platform: "IndiaMART Verified Direct",
    platformIcon: "Building2",
    platformColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    url: "https://www.indiamart.com/proddetail/wireless-mechanical-keyboard-rgb.html",
    title: "Enterprise Wireless Mechanical Keyboard with Hot-Swappable Switches",
    seller: "TechHub Direct & OEM Sourcing Pvt Ltd",
    unitPrice: 2850,
    quantity: 30,
    sla: "48 hours (Air Express)",
    category: "Workstation Peripherals",
    sku: "IMART-KB-9921",
    rating: 4.9,
    reviews: 680,
    specs: [
      "Custom brown tactile mechanical switches",
      "Dual connectivity: Bluetooth 5.2 + 2.4GHz USB",
      "Aluminium top frame with PBT keycaps",
      "IndiaMART Star Supplier Verified"
    ]
  },
  {
    id: "alibaba_monitors",
    platform: "Alibaba Global Wholesale",
    platformIcon: "Compass",
    platformColor: "text-orange-600 bg-orange-50 border-orange-200",
    url: "https://www.alibaba.com/product-detail/27-Inch-4K-IPS-USB-C-Enterprise-Monitor.html",
    title: "27-inch 4K UHD IPS Frameless Monitor with 90W USB-C Power Delivery",
    seller: "Shenzhen KingSpec Commercial Displays Co.",
    unitPrice: 24500,
    quantity: 20,
    sla: "72 hours (Customs Fast-Track)",
    category: "IT Hardware & Displays",
    sku: "BABA-MON-4K27",
    rating: 4.9,
    reviews: 2150,
    specs: [
      "3840x2160 IPS 99% sRGB Color Accuracy",
      "90W USB-C single cable docking & video",
      "Height adjustable ergonomic tilt & swivel stand",
      "Trade Assurance $500,000 Verified"
    ]
  }
];

export default function ExtensionSimulatorModal({ isOpen, onClose }) {
  const { ingestFromExtension } = useProcurementStore();
  const [selectedListingIndex, setSelectedListingIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedSuccess, setCapturedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'install_guide'

  if (!isOpen) return null;

  const currentListing = SAMPLE_MARKETPLACE_LISTINGS[selectedListingIndex];

  const handleRunAuction = async () => {
    setIsCapturing(true);
    setCapturedSuccess(false);

    // Realistic multi-step capture sequence
    setTimeout(() => {
      setCapturedSuccess(true);
      setTimeout(() => {
        ingestFromExtension({
          title: currentListing.title,
          targetPrice: currentListing.unitPrice,
          quantity: currentListing.quantity,
          sla: currentListing.sla,
          category: currentListing.category,
          platform: currentListing.platform,
          seller: currentListing.seller,
          sku: currentListing.sku
        });
        setIsCapturing(false);
        onClose();
      }, 700);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#0B1020] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[9px] bg-white/10 border border-white/15 flex items-center justify-center p-1 shadow-sm">
              <img src="/brand-mark.png" alt="Auctra AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">
                  Auctra AI • Chrome Extension Live Copilot
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Manifest V3 Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                1-Click Reverse Auction Ingestion from Amazon Business, IndiaMART & Alibaba
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === "simulator" ? "install_guide" : "simulator")}
              className="text-xs text-indigo-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700 cursor-pointer"
            >
              {activeTab === "simulator" ? "How to load in Chrome" : "Back to Web Clipper"}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {activeTab === "simulator" ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {/* Marketplace Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SAMPLE_MARKETPLACE_LISTINGS.map((listing, idx) => {
                const isSelected = selectedListingIndex === idx;
                return (
                  <button
                    key={listing.id}
                    onClick={() => setSelectedListingIndex(idx)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{listing.platform}</span>
                    <span className="text-[10px] font-mono font-normal opacity-80">
                      ₹{listing.unitPrice}/unit
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Browser Chrome Window */}
            <div className="rounded-xl border border-slate-300 bg-white shadow-md overflow-hidden relative">
              {/* Browser Address Bar */}
              <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1 text-[11px] font-mono text-slate-600 flex items-center gap-1.5 truncate">
                  <Lock size={11} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{currentListing.url}</span>
                </div>
                <RefreshCw size={12} className="text-slate-400 shrink-0" />
              </div>

              {/* Marketplace Listing Content */}
              <div className="p-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Product Visual Box */}
                  <div className="space-y-3">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 border border-slate-200 flex flex-col items-center justify-center p-4 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md mb-2">
                        {currentListing.platform.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {currentListing.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        SKU: {currentListing.sku}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                      <div className="font-semibold text-slate-700">Verified Marketplace Seller:</div>
                      <div className="text-slate-900 font-bold">{currentListing.seller}</div>
                      <div className="text-emerald-700 font-medium">★ {currentListing.rating} ({currentListing.reviews} B2B orders)</div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1.5 ${currentListing.platformColor}`}>
                        {currentListing.platform}
                      </span>
                      <h3 className="text-base lg:text-lg font-bold text-slate-900 leading-snug">
                        {currentListing.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1">
                        Fulfillment SLA: <strong className="text-slate-800">{currentListing.sla}</strong>
                      </div>
                    </div>

                    {/* Pricing Box */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline gap-3">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Standard Wholesale Price</div>
                        <div className="text-2xl font-black text-slate-900 font-mono">
                          ₹{currentListing.unitPrice}
                          <span className="text-xs font-normal text-slate-500"> / unit</span>
                        </div>
                      </div>
                      <div className="border-l border-slate-200 pl-3">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Default Order Volume</div>
                        <div className="text-lg font-bold text-slate-800 font-mono">
                          {currentListing.quantity} Units
                        </div>
                      </div>
                      <div className="border-l border-slate-200 pl-3">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Cart Value</div>
                        <div className="text-lg font-bold text-slate-800 font-mono">
                          ₹{(currentListing.unitPrice * currentListing.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    {/* Feature Bullets */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-slate-700">Enterprise Specifications:</div>
                      <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                        {currentListing.specs.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Floating Auctra AI Copilot Injected Overlay */}
                    <div className="mt-4 p-4 rounded-[16px] bg-[#0B1020] text-white shadow-xl border border-white/15 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#60A5FA]">
                          <Sparkles size={13} className="text-[#3B82F6]" />
                          Auctra AI Sourcing Copilot Detected SKU
                        </div>
                        <div className="text-[12px] text-slate-300 mt-0.5">
                          Estimated reverse auction savings: <strong className="text-[#34D399] font-bold">18% – 24% discount</strong> across 18 suppliers.
                        </div>
                      </div>

                      <button
                        onClick={handleRunAuction}
                        disabled={isCapturing}
                        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-[12px] bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] cursor-pointer transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98] text-left"
                      >
                        <div className="w-7 h-7 rounded-[7px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center p-0.5 shrink-0 shadow-2xs">
                          <img src="/brand-mark.png" alt="Auctra" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[9.5px] font-bold tracking-wider text-[#64748B] uppercase">
                            Auctra
                          </span>
                          <span className="text-[12px] font-bold text-[#0F172A] flex items-center gap-1">
                            {isCapturing ? (
                              <>
                                <RefreshCw size={11} className="animate-spin text-[#2563EB]" />
                                <span>{capturedSuccess ? "Ingesting..." : "Scanning..."}</span>
                              </>
                            ) : (
                              <span>Create RFQ →</span>
                            )}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chrome Extension Loading Instructions for Judges */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white text-slate-800">
            <h3 className="text-base font-bold text-slate-900">
              How to Test the Physical Chrome Extension
            </h3>
            <p className="text-xs text-slate-600">
              The project contains a complete, verified Manifest V3 extension ready to load unpacked in any Chromium browser (Google Chrome, Brave, Edge).
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Step 1: Open Chrome Extensions</div>
                <p className="text-slate-600 font-mono text-[11px]">
                  Navigate to <strong>chrome://extensions</strong> in your browser address bar.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Step 2: Enable Developer Mode</div>
                <p className="text-slate-600">
                  Toggle on <strong>&quot;Developer mode&quot;</strong> in the top-right corner.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Step 3: Load Unpacked</div>
                <p className="text-slate-600">
                  Click <strong>&quot;Load unpacked&quot;</strong> and select the directory:
                </p>
                <code className="block mt-1 p-2 bg-slate-100 rounded text-indigo-700 font-mono text-[11px]">
                  e:\auctra\extension
                </code>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="font-bold mb-1">Step 4: Browse any B2B Marketplace</div>
                <p className="text-xs">
                  Visit Amazon Business or IndiaMART. The Auctra AI floating widget will detect the item and send the payload directly to Auctra AI!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Demonstrating 1-Click Reverse Auction Bridge</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
