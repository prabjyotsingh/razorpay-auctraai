"use client";

import React, { useEffect, useRef, useSyncExternalStore, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  ArrowRight, 
  Play, 
  FastForward, 
  RotateCcw, 
  Check, 
  TrendingDown, 
  Users, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award,
  Sparkles
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const emptySubscribe = () => () => {};

export default function Step3ReverseAuction() {
  const router = useRouter();
  const {
    auctionState,
    allVendors,
    startLiveAuction,
    stepSimulateNextBid,
    fastForwardAuction,
    resetAuction,
    setActiveStep,
    setCurrentView
  } = useProcurementStore();

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const timerRef = useRef(null);

  // Auto-run simulation when auction is active
  useEffect(() => {
    const isRunning = (auctionState.status === "running" || auctionState.status === "LIVE") && !auctionState.isFinished;
    if (isRunning) {
      timerRef.current = setInterval(() => {
        stepSimulateNextBid();
      }, 2000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auctionState.status, auctionState.isFinished, stepSimulateNextBid]);

  const ceilingPrice = Number(auctionState.ceilingPrice || 900);
  const qty = Number(auctionState.quantity || 50);
  const ceilingTotal = ceilingPrice * qty;
  const hasBids = Boolean(auctionState.bids && auctionState.bids.length > 0);
  const currentLowest = hasBids 
    ? Number(auctionState.currentLowestBid || ceilingPrice) 
    : ceilingPrice;
  const currentTotal = currentLowest * qty;
  const totalSavings = hasBids ? Math.max(0, ceilingTotal - currentTotal) : 0;
  const savingsPct = (hasBids && ceilingTotal > 0) 
    ? (((ceilingTotal - currentTotal) / ceilingTotal) * 100).toFixed(1) 
    : "0.0";

  const isScheduled = auctionState.status === "scheduled" || auctionState.status === "SCHEDULED";
  const isRunning = auctionState.status === "running" || auctionState.status === "LIVE";
  const isCompleted = auctionState.status === "completed" || auctionState.status === "COMPLETED" || auctionState.isFinished;

  // Normalize Chart Deflation Curve Data so it starts cleanly and updates dynamically
  const chartData = useMemo(() => {
    const rawData = (auctionState.chartData && auctionState.chartData.length > 0)
      ? auctionState.chartData
      : (auctionState.priceTrajectory && auctionState.priceTrajectory.length > 0)
      ? auctionState.priceTrajectory
      : [];

    if (rawData.length > 0) {
      return rawData.map((d, i) => {
        const val = Number(d.price ?? d.lowestBid ?? d.amount ?? auctionState.currentLowestBid ?? ceilingPrice);
        return {
          time: d.time || `R${i}`,
          round: d.round || `R${i}`,
          price: isNaN(val) ? ceilingPrice : val,
          lowestBid: isNaN(val) ? ceilingPrice : val,
          ceiling: Number(d.ceiling ?? ceilingPrice),
          vendor: d.vendor || d.vendorName || "Active Bidder"
        };
      });
    }

    if (hasBids) {
      const sortedBids = [...auctionState.bids].reverse();
      return sortedBids.map((b, i) => {
        const val = Number(b.amountPerUnit || b.amount || b.price || ceilingPrice);
        return {
          time: b.timestamp ? b.timestamp.slice(0, 5) : `Bid ${i + 1}`,
          round: `R${Math.min(5, Math.floor(i / 2) + 1)}`,
          price: isNaN(val) ? ceilingPrice : val,
          lowestBid: isNaN(val) ? ceilingPrice : val,
          ceiling: ceilingPrice,
          vendor: b.vendorName || "Verified Bidder"
        };
      });
    }

    // Baseline point when no bids have occurred yet (flat opening ceiling anchor)
    return [
      { time: "Start", round: "R0", price: ceilingPrice, lowestBid: ceilingPrice, ceiling: ceilingPrice, vendor: "Opening Ceiling" }
    ];
  }, [auctionState, ceilingPrice, hasBids]);

  // Dynamic Y-Axis scale calculation
  const { yMin, yMax } = useMemo(() => {
    const validPrices = chartData.map(d => d.price).filter(p => typeof p === "number" && !isNaN(p) && p > 0);
    if (validPrices.length === 0) return { yMin: Math.max(0, Math.round(ceilingPrice * 0.7)), yMax: Math.round(ceilingPrice * 1.1) };
    const min = Math.min(...validPrices);
    const max = Math.max(...validPrices, ceilingPrice);
    const pad = Math.max(20, Math.round((max - min) * 0.25) || Math.round(ceilingPrice * 0.1));
    return {
      yMin: Math.max(0, Math.floor(min - pad)),
      yMax: Math.ceil(max + pad)
    };
  }, [chartData, ceilingPrice]);

  // Aggregate active participating auctioneers (10 verified enterprise suppliers)
  const participatingAuctioneers = useMemo(() => {
    const vendorsList = (allVendors && allVendors.length > 0) ? allVendors : [];
    const isWinnerDeclared = hasBids && Boolean(auctionState.winningVendor && auctionState.winningVendor !== "Awaiting Live Bidding");

    // Map participating list
    const combined = vendorsList.map((vendor, idx) => {
      const matchingBids = (auctionState.bids || []).filter(b => b.vendorId === vendor.id || b.vendorName === vendor.name);
      const hasPlacedBid = matchingBids.length > 0;
      const latestBid = hasPlacedBid ? matchingBids[0] : null;
      const isWinner = isWinnerDeclared && (vendor.name === auctionState.winningVendor || vendor.id === auctionState.winningVendorId);
      const latestPrice = hasPlacedBid
        ? Number(latestBid.amountPerUnit || latestBid.amount || latestBid.price)
        : ceilingPrice;

      return {
        ...vendor,
        currentBid: isWinner ? currentLowest : latestPrice,
        isWinning: isWinner,
        rank: isWinner ? 1 : (hasPlacedBid ? idx + 2 : idx + 1),
        bidsPlaced: matchingBids.length
      };
    });

    return combined.sort((a, b) => a.currentBid - b.currentBid);
  }, [allVendors, auctionState, currentLowest, ceilingPrice, hasBids]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
              Live Reverse Auction
            </h1>
            <span className="text-[12px] font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-[8px] border border-[#BFDBFE]">
              {auctionState.auctionId || "AUC-86915"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              {participatingAuctioneers.length} Verified Auctioneers
            </span>
          </div>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Real-time competitive dynamic price discovery for <span className="font-semibold text-[#0F172A]">{auctionState.quantity}x {auctionState.productName}</span>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {isScheduled && (
            <button
              onClick={startLiveAuction}
              className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer"
            >
              <Play size={14} className="fill-current" />
              <span>Start Live Bidding</span>
            </button>
          )}

          {isRunning && (
            <button
              onClick={fastForwardAuction}
              className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer"
            >
              <FastForward size={14} />
              <span>Conclude Auction</span>
            </button>
          )}

          {isCompleted && (
            <button
              onClick={() => {
                setActiveStep(4);
                setCurrentView("step4");
                router.push("/contracts");
              }}
              className="primary-gradient-btn h-10 px-4 text-[13px] flex items-center gap-2 cursor-pointer"
            >
              <span>Award PO &amp; Review Contract</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={resetAuction}
            className="h-10 w-10 flex items-center justify-center border border-[#E2E8F0] bg-white rounded-[12px] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            title="Reset Auction"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Winning Bid Spotlight Banner */}
      {isCompleted && (
        <div className="p-5 rounded-[18px] bg-[#ECFDF5] border border-[#A7F3D0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-[14px] bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Check size={22} strokeWidth={2.5} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] bg-white border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                  Winning Bid Declared
                </span>
                <span className="text-[12px] font-mono text-[#065F46] font-semibold">
                  5/5 Rounds Completed
                </span>
              </div>
              <div className="text-[16px] font-bold text-[#065F46]">
                {auctionState.winningVendor || "VoltMart Electronics"} won at ₹{currentLowest.toLocaleString("en-IN")}/unit
              </div>
              <div className="text-[12.5px] text-[#047857]">
                Total Commitment: <span className="font-bold">₹{currentTotal.toLocaleString("en-IN")}</span> • Saved <span className="font-bold">₹{totalSavings.toLocaleString("en-IN")} ({savingsPct}% deflation)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveStep(4);
              setCurrentView("step4");
              router.push("/contracts");
            }}
            className="primary-gradient-btn h-11 px-5 text-[13.5px] flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
          >
            <span>Generate PO &amp; Review Contract</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Metric Summary Strip (Numbers First) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Target Ceiling Quote</div>
          <div className="text-2xl font-bold text-[#0F172A] font-mono mt-1">
            ₹{(auctionState.ceilingPrice || 900).toLocaleString("en-IN")}
          </div>
          <div className="text-[11.5px] text-[#64748B] mt-0.5">Opening maximum budget</div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Current Best Bid</div>
          <div className="text-2xl font-bold text-[#2563EB] font-mono mt-1">
            ₹{currentLowest.toLocaleString("en-IN")}
          </div>
          <div className="text-[11.5px] text-[#10B981] font-semibold mt-0.5 flex items-center gap-1">
            <TrendingDown size={12} />
            <span>-{savingsPct}% under ceiling</span>
          </div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Net Realized Savings</div>
          <div className="text-2xl font-bold text-[#10B981] font-mono mt-1">
            ₹{totalSavings.toLocaleString("en-IN")}
          </div>
          <div className="text-[11.5px] text-[#10B981] font-semibold mt-0.5">
            Total cost reduction
          </div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Leading Supplier</div>
          <div className="text-[16px] font-bold text-[#0F172A] truncate mt-1">
            {hasBids ? (auctionState.winningVendor || "Top Bidder") : "Awaiting Live Bidding"}
          </div>
          <div className={`text-[11.5px] font-semibold mt-0.5 flex items-center gap-1 ${hasBids ? "text-[#10B981]" : "text-[#64748B]"}`}>
            {hasBids ? (
              <>
                <Check size={12} strokeWidth={2.5} />
                <span>GST Verified Vendor</span>
              </>
            ) : (
              <>
                <Clock size={12} />
                <span>Auction Ready</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart & Live Bid History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Price Compression Chart (2 Cols) */}
        <div className="lg:col-span-2 premium-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F7]">
            <div>
              <h2 className="text-[15px] font-bold text-[#0F172A]">
                Unit Price Deflation Curve
              </h2>
              <p className="text-[12px] text-[#64748B] mt-0.5">
                Real-time multi-round bids submitted across competing suppliers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#2563EB] font-mono font-semibold bg-[#EFF6FF] px-2.5 py-1 rounded-[8px] border border-[#BFDBFE]">
                {auctionState.currentRound && auctionState.currentRound > 0
                  ? `Round ${auctionState.currentRound} of 5`
                  : "Round 0 of 5 (Ready)"}
              </span>
            </div>
          </div>

          <div className="h-72 w-full min-h-[280px]">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 15, right: 20, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="auctionDeflationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    dy={5} 
                  />
                  <YAxis 
                    domain={[yMin, yMax]} 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
                    dx={-5}
                  />
                  <Tooltip
                    formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Unit Bid Price"]}
                    labelFormatter={(label) => `Time / Round: ${label}`}
                    contentStyle={{ 
                      backgroundColor: "#FFFFFF", 
                      borderColor: "#EEF2F7", 
                      borderRadius: "14px", 
                      fontSize: "12px", 
                      color: "#0F172A",
                      boxShadow: "0 10px 25px rgba(15,23,42,0.12)"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#2563EB" 
                    strokeWidth={3} 
                    fillOpacity={1}
                    fill="url(#auctionDeflationGrad)"
                    dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "#FFFFFF" }} 
                    activeDot={{ r: 6, fill: "#1D4ED8", strokeWidth: 2, stroke: "#FFFFFF" }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-[#94A3B8] text-sm">
                Initializing Real-Time Deflation Curve...
              </div>
            )}
          </div>
        </div>

        {/* Live Bid Log (1 Col) */}
        <div className="premium-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F7]">
            <h2 className="text-[15px] font-bold text-[#0F172A]">
              Live Bid Feed
            </h2>
            <span className="text-[11.5px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-[6px]">
              {auctionState.bids?.length || 0} bids
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {(auctionState.bids || []).length === 0 ? (
              <div className="py-9 text-center px-4 rounded-[12px] bg-[#F8FAFC] border border-dashed border-[#CBD5E1]">
                <Clock size={24} className="mx-auto text-[#94A3B8] mb-2 animate-pulse" />
                <div className="text-[13px] font-semibold text-[#334155]">No live bids placed yet</div>
                <p className="text-[11.5px] text-[#64748B] mt-1 max-w-[220px] mx-auto">
                  Click <span className="font-semibold text-[#2563EB]">&quot;Start Live Bidding&quot;</span> above to trigger real-time multi-round reverse auctioning.
                </p>
              </div>
            ) : (
              (auctionState.bids || []).slice(0, 10).map((bid, idx) => {
                const displayAmount = Number(bid.amountPerUnit || bid.amount || bid.price || 0);
                return (
                  <div 
                    key={bid.bidId || idx} 
                    className={`p-3 rounded-[12px] border flex items-center justify-between text-[12.5px] transition-colors ${
                      idx === 0 
                        ? "bg-[#EFF6FF] border-[#BFDBFE]" 
                        : "bg-[#F8FAFC] border-[#EEF2F7] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#0F172A] truncate">{bid.vendorName}</span>
                        {idx === 0 && (
                          <span className="text-[9.5px] font-bold text-[#2563EB] bg-white px-1.5 py-0.2 rounded border border-[#BFDBFE]">
                            BEST
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 mt-0.5">
                        <span>{bid.timestamp || "Just now"}</span>
                        {bid.city && <span>• {bid.city}</span>}
                      </div>
                    </div>
                    <div className="font-mono font-bold text-[#0F172A] text-right shrink-0">
                      ₹{displayAmount.toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Participating Auctioneers Section (Satisfies Expanded Auctioneers) */}
      <div className="premium-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EEF2F7]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#0F172A]">
                Participating Auctioneers &amp; Suppliers
              </h2>
              <span className="text-[11px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                {participatingAuctioneers.length} Verified Vendors
              </span>
            </div>
            <p className="text-[12.5px] text-[#64748B] mt-0.5">
              Enterprise suppliers actively competing in the current reverse auction session
            </p>
          </div>
          <div className="text-[12px] text-[#64748B]">
            All bidders undergo GSTIN, ISO 9001, and SLA background verification
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {participatingAuctioneers.map((vendor, idx) => (
            <div 
              key={vendor.id || idx}
              className={`p-3.5 rounded-[14px] border transition-all ${
                vendor.isWinning 
                  ? "bg-[#F0FDF4] border-[#86EFAC] ring-2 ring-[#22C55E]/20 shadow-xs" 
                  : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#F1F5F9] text-[#0F172A] font-bold text-xs flex items-center justify-center">
                  {vendor.name.slice(0, 2).toUpperCase()}
                </div>
                {vendor.isWinning ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                    <Award size={11} />
                    LEADER
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-semibold text-[#64748B] bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                    #{vendor.rank}
                  </span>
                )}
              </div>

              <div className="font-semibold text-[13px] text-[#0F172A] truncate" title={vendor.name}>
                {vendor.name}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#64748B] mt-0.5">
                <MapPin size={10} />
                <span className="truncate">{vendor.city || "Bengaluru"}, {vendor.state || "India"}</span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#EEF2F7] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64748B]">Best Quote</div>
                  <div className="text-[13.5px] font-mono font-bold text-[#0F172A]">
                    ₹{Number(vendor.currentBid || 0).toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[#64748B]">Trust Score</div>
                  <div className="text-[11px] font-bold text-[#059669] flex items-center justify-end gap-0.5">
                    <ShieldCheck size={11} />
                    {vendor.trustScore || 95}%
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[10.5px] text-[#64748B] flex items-center gap-1">
                <Clock size={10} />
                <span>{vendor.slaHours || 48}h Guaranteed SLA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
