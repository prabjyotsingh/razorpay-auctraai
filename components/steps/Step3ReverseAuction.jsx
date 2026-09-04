"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProcurementStore } from "@/store/useProcurementStore";
import { ArrowRight, Play, FastForward, RotateCcw, Check, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Step3ReverseAuction() {
  const router = useRouter();
  const {
    auctionState,
    startLiveAuction,
    stepSimulateNextBid,
    fastForwardAuction,
    resetAuction,
    setActiveStep,
    setCurrentView
  } = useProcurementStore();

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

  const ceilingTotal = (auctionState.ceilingPrice || 900) * auctionState.quantity;
  const currentLowest = auctionState.currentLowestBid || auctionState.ceilingPrice || 740;
  const currentTotal = currentLowest * auctionState.quantity;
  const totalSavings = Math.max(ceilingTotal - currentTotal, 8000);
  const savingsPct = ceilingTotal > 0 ? (((ceilingTotal - currentLowest) / ceilingTotal) * 100).toFixed(1) : "17.8";

  const isScheduled = auctionState.status === "scheduled" || auctionState.status === "SCHEDULED";
  const isRunning = auctionState.status === "running" || auctionState.status === "LIVE";
  const isCompleted = auctionState.status === "completed" || auctionState.status === "COMPLETED" || auctionState.isFinished;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF2F7]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
              Live Auction
            </h1>
            <span className="text-[12px] font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-[8px] border border-[#BFDBFE]">
              {auctionState.auctionId || "AUC-86915"}
            </span>
          </div>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Real-time competitive price discovery for <span className="font-semibold text-[#0F172A]">{auctionState.quantity}x {auctionState.productName}</span>.
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
                {auctionState.winningVendor || "SwiftProcure Systems"} won at ₹{currentLowest.toLocaleString("en-IN")}/unit
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
            {auctionState.winningVendor || "SwiftProcure Systems"}
          </div>
          <div className="text-[11.5px] text-[#10B981] font-semibold mt-0.5 flex items-center gap-1">
            <Check size={12} strokeWidth={2.5} />
            <span>GST Verified Vendor</span>
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
                Real-time round bids submitted by competing vendors
              </p>
            </div>
            <span className="text-[12px] text-[#2563EB] font-mono font-semibold bg-[#EFF6FF] px-2.5 py-1 rounded-[8px]">
              Round {auctionState.currentRound} of 5
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={auctionState.chartData || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={["dataMin - 20", "dataMax + 20"]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val) => [`₹${val}`, "Unit Bid Price"]}
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    borderColor: "#EEF2F7", 
                    borderRadius: "14px", 
                    fontSize: "12px", 
                    color: "#0F172A",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.08)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "#FFFFFF" }} 
                  activeDot={{ r: 6, fill: "#1D4ED8" }} 
                />
              </LineChart>
            </ResponsiveContainer>
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

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {(auctionState.bids || []).slice(0, 8).map((bid, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#EEF2F7] flex items-center justify-between text-[12.5px] hover:border-[#CBD5E1] transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-semibold text-[#0F172A] truncate">{bid.vendorName}</div>
                  <div className="text-[11px] text-[#64748B]">{bid.timestamp || "Just now"}</div>
                </div>
                <div className="font-mono font-bold text-[#0F172A] text-right shrink-0">
                  ₹{bid.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
