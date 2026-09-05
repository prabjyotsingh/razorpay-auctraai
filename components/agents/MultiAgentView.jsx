"use client";

import React, { useState } from "react";
import { AGENT_REGISTRY, getInterAgentEventStream } from "@/lib/agents/agentOrchestrator";
import { useProcurementStore } from "@/store/useProcurementStore";
import { 
  Bot, 
  Terminal, 
  Scale, 
  ShieldCheck, 
  Landmark, 
  UserCheck, 
  Zap, 
  ArrowRight, 
  Sliders
} from "lucide-react";

export default function MultiAgentView() {
  const {
    activeStep,
    extractedIntent,
    auctionState,
    contractState,
    escrowState,
    setActiveStep
  } = useProcurementStore();

  const [selectedAgentId, setSelectedAgentId] = useState("negotiation_agent");
  const [negotiationAggressiveness, setNegotiationAggressiveness] = useState("high");
  const [complianceStrictness, setComplianceStrictness] = useState("strict");

  const events = getInterAgentEventStream(activeStep, extractedIntent, auctionState, contractState, escrowState);
  const activeAgent = AGENT_REGISTRY.find(a => a.id === selectedAgentId) || AGENT_REGISTRY[2];

  const getAgentIcon = (id) => {
    switch (id) {
      case "buyer_agent": return <UserCheck size={16} className="text-[#2563EB]" />;
      case "vendor_agent": return <Zap size={16} className="text-[#2563EB]" />;
      case "negotiation_agent": return <Scale size={16} className="text-[#2563EB]" />;
      case "compliance_agent": return <ShieldCheck size={16} className="text-[#16A34A]" />;
      case "finance_agent": return <Landmark size={16} className="text-[#2563EB]" />;
      default: return <Bot size={16} className="text-[#2563EB]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="pb-4 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Procurement Workflow Mesh
          </h1>
          <p className="text-[13px] text-[#6B7280] mt-0.5">
            5 specialized AI agents orchestrating RFQ creation, supplier qualification, reverse auction bidding, contract verification, and escrow payment.
          </p>
        </div>

        <button
          onClick={() => setActiveStep(3)}
          className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#172554] text-white px-4 py-2 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          <span>View Reverse Auction</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Visual Agent Mesh Topology */}
      <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-xs">
          <span className="font-semibold text-[#111827] uppercase tracking-wider">
            Agent Cluster Status
          </span>
          <div className="flex items-center gap-1.5 text-[#16A34A] font-semibold text-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span>5 / 5 Operational</span>
          </div>
        </div>

        {/* 5 Interactive Agent Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {AGENT_REGISTRY.map((agent) => {
            const isSelected = selectedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-4 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? "bg-[#EFF6FF] border-[#1E3A8A] shadow-xs"
                    : "bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] flex items-center justify-center shadow-2xs">
                    {getAgentIcon(agent.id)}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#111827] leading-tight">{agent.name}</div>
                  <div className="text-[11px] text-[#1E3A8A] font-semibold mt-0.5">{agent.persona}</div>
                  <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">{agent.title}</div>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB]/60 flex items-center justify-between text-[10px] text-[#6B7280]">
                  <span>Status:</span>
                  <span className="text-[#16A34A] font-semibold">ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Agent Control & Diagnostic Panel */}
        <div className="p-4 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <strong className="text-[#111827] text-sm font-semibold">{activeAgent.name} ({activeAgent.persona})</strong>
              <span className="px-2 py-0.5 rounded-[6px] bg-white text-[#1E3A8A] border border-[#DBEAFE] text-[11px] font-semibold">
                {activeAgent.title}
              </span>
            </div>
            <p className="text-[#6B7280] max-w-2xl">{activeAgent.role}</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {activeAgent.capabilities.map((cap, i) => (
              <span key={i} className="px-2.5 py-1 rounded-[6px] bg-white text-[#374151] text-[11px] border border-[#E5E7EB]">
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Grid: Agent Parameters & Live Event Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Agent Parameters */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <h3 className="text-xs font-semibold text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <Sliders size={14} className="text-[#1E3A8A]" />
              <span>Governance Parameters</span>
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[#374151] font-medium flex justify-between">
                <span>Negotiation Aggressiveness:</span>
                <span className="text-[#1E3A8A] font-semibold uppercase">{negotiationAggressiveness}</span>
              </label>
              <select
                value={negotiationAggressiveness}
                onChange={(e) => setNegotiationAggressiveness(e.target.value)}
                className="w-full p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[8px] text-xs text-[#111827]"
              >
                <option value="moderate">Moderate (-10% to -15% Target)</option>
                <option value="high">High Velocity Game-Theoretic (-18% to -24%)</option>
                <option value="maximum">Maximum Deflation Pressure (-25%+)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[#374151] font-medium flex justify-between">
                <span>Compliance Strictness:</span>
                <span className="text-[#16A34A] font-semibold uppercase">{complianceStrictness}</span>
              </label>
              <select
                value={complianceStrictness}
                onChange={(e) => setComplianceStrictness(e.target.value)}
                className="w-full p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#111827]"
              >
                <option value="strict">Strict (GSTIN + ISO 9001 + Anti-Collusion)</option>
                <option value="msme">MSME Priority Sector Focused</option>
                <option value="expedited">Expedited Sourcing (GSTIN Validated)</option>
              </select>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-[#374151] font-medium">Escrow Payment Workflow:</label>
              <div className="p-3 bg-[#F9FAFB] rounded-md border border-[#E5E7EB] text-[11px] text-[#4B5563] space-y-1">
                <div className="font-semibold text-[#111827]">Razorpay Escrow Settlement</div>
                <p className="text-[#6B7280]">100% of awarded PO capital secured in escrow powered by Razorpay. Payout release authorized only after digital QA verification.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Inter-Agent Event Bus Terminal */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-lg p-5 space-y-3 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#2563EB]" />
              <span className="font-semibold text-[#111827] text-xs uppercase tracking-wider">Inter-Agent Event Stream</span>
            </div>
            <span className="text-[#16A34A] text-[11px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Live Feed
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-md bg-[#F9FAFB] border border-[#F3F4F6] text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#9CA3AF]">{evt.timestamp}</span>
                    <span className="font-semibold text-[#111827]">{evt.agentName}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    evt.level === "SUCCESS" ? "bg-[#DCFCE7] text-[#166534]" :
                    evt.level === "FINANCE" ? "bg-[#EFF6FF] text-[#1E40AF]" :
                    evt.level === "PROGRESS" ? "bg-[#FEF3C7] text-[#92400E]" :
                    "bg-[#F3F4F6] text-[#374151]"
                  }`}>
                    {evt.level}
                  </span>
                </div>
                <p className="text-[#4B5563] text-xs leading-relaxed">{evt.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
