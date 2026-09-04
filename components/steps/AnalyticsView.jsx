"use client";

import React from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { TrendingUp, Award, Clock, CheckCircle2 } from "lucide-react";

export default function AnalyticsView() {
  const { metrics, org } = useProcurementStore();

  const monthlyData = [
    { month: "Jan", spend: 32, savings: 6.4 },
    { month: "Feb", spend: 40, savings: 7.8 },
    { month: "Mar", spend: 48, savings: 9.2 },
    { month: "Apr", spend: 38, savings: 7.1 },
    { month: "May", spend: 52, savings: 10.4 },
    { month: "Jun", spend: 60, savings: 12.3 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEF2F7]">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight">
            Spend &amp; Savings Analytics
          </h1>
          <p className="text-[13px] text-[#64748B] mt-0.5 font-normal">
            Turnaround compression, sample procurement volume, and price deflation models.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[12px] font-semibold text-[#1D4ED8] self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span>Demo Environment • Based on sample procurement dataset</span>
        </div>
      </div>

      {/* Numbers-First Executive KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Sample Volume Analyzed</div>
          <div className="text-[28px] font-bold text-[#0F172A] font-mono mt-1 leading-none">
            ₹{(metrics.totalSpendYTD / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11.5px] text-[#64748B] mt-1.5 font-normal">Based on sample procurement dataset</div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Simulated Deflation</div>
          <div className="text-[28px] font-bold text-[#10B981] font-mono mt-1 leading-none">
            ₹{(metrics.totalSavingsYTD / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[11.5px] text-[#10B981] font-semibold mt-1.5">18.7% average savings vs ceiling</div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Catalog Suppliers</div>
          <div className="text-[28px] font-bold text-[#0F172A] font-mono mt-1 leading-none">
            18 Verified
          </div>
          <div className="text-[11.5px] text-[#64748B] mt-1.5 font-normal">GSTIN &amp; MSME sample directory</div>
        </div>

        <div className="premium-card p-5">
          <div className="text-[12px] font-medium text-[#64748B]">Sample RFQ Events</div>
          <div className="text-[28px] font-bold text-[#0F172A] font-mono mt-1 leading-none">
            4 Scenarios
          </div>
          <div className="text-[11.5px] text-[#64748B] mt-1.5 font-normal">Demo Environment test pipelines</div>
        </div>
      </div>

      {/* Monthly Spend & Savings Chart */}
      <div className="premium-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EEF2F7]">
          <div>
            <h2 className="text-[16px] font-bold text-[#0F172A]">
              Monthly Volume &amp; Realized Deflation (₹ Lakhs)
            </h2>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Simulated 6-month historical performance across verified reverse auctions
            </p>
          </div>
          <div className="flex items-center gap-4 text-[12.5px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[4px] bg-[#E2E8F0]" />
              <span className="text-[#64748B] font-medium">Total Spend</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[4px] bg-[#2563EB]" />
              <span className="text-[#0F172A] font-bold">Savings Realized</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                formatter={(val, name) => [`₹${val} Lakhs`, name === "spend" ? "Total Spend" : "Savings"]}
                contentStyle={{ 
                  backgroundColor: "#FFFFFF", 
                  borderColor: "#EEF2F7", 
                  borderRadius: "14px", 
                  fontSize: "12px",
                  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                  color: "#0F172A" 
                }}
              />
              <Bar dataKey="spend" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
              <Bar dataKey="savings" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Cycle Time Benchmark Table */}
      <div className="premium-card space-y-4">
        <div className="pb-3 border-b border-[#EEF2F7]">
          <h2 className="text-[16px] font-bold text-[#0F172A]">
            Operational Efficiency Benchmark
          </h2>
          <p className="text-[12px] text-[#64748B] mt-0.5">
            Turnaround compression: Traditional Enterprise RFP vs. Auctra AI Platform
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-[12px] font-semibold text-[#64748B] border-b border-[#EEF2F7] bg-[#F8FAFC]">
              <tr>
                <th className="py-3 px-4">Procurement Workflow Stage</th>
                <th className="py-3 px-4 text-right">Traditional RFP SLA</th>
                <th className="py-3 px-4 text-right">Auctra AI Duration</th>
                <th className="py-3 px-4 text-right">Turnaround Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7]">
              <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0F172A]">Supplier Discovery &amp; Qualification</td>
                <td className="py-3 px-4 text-right font-mono text-[#64748B]">4-5 Days</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-[#2563EB]">&lt; 30 Seconds</td>
                <td className="py-3 px-4 text-right font-semibold text-[#10B981]">Instant Multi-Platform Match</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0F172A]">Competitive Bidding &amp; Price Discovery</td>
                <td className="py-3 px-4 text-right font-mono text-[#64748B]">6-8 Days</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-[#2563EB]">3-5 Minutes</td>
                <td className="py-3 px-4 text-right font-semibold text-[#10B981]">Live Dynamic Reverse Auction</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0F172A]">Contract PO Generation &amp; Tax Audit</td>
                <td className="py-3 px-4 text-right font-mono text-[#64748B]">2-3 Days</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-[#2563EB]">Instant (&lt; 1s)</td>
                <td className="py-3 px-4 text-right font-semibold text-[#10B981]">Deterministic Modulo-36 Check</td>
              </tr>
              <tr className="hover:bg-[#F8FAFC]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#0F172A]">Escrow Fund Locking &amp; Milestone Release</td>
                <td className="py-3 px-4 text-right font-mono text-[#64748B]">3-5 Days</td>
                <td className="py-3 px-4 text-right font-mono font-bold text-[#2563EB]">1-Click Route</td>
                <td className="py-3 px-4 text-right font-semibold text-[#10B981]">RBI Nodal Smart Route Escrow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
