"use client";

import React, { useState } from "react";
import { useProcurementStore } from "@/store/useProcurementStore";
import { AGENT_REGISTRY, getInterAgentEventStream } from "@/lib/agents/agentOrchestrator";
import { 
  Bot, 
  X, 
  Activity, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  Landmark, 
  CheckCircle2, 
  Clock, 
  TrendingDown,
  UserCheck,
  Zap
} from "lucide-react";

export default function MultiAgentConsole({ isOpen, onClose }) {
  const {
    activeStep,
    extractedIntent,
    auctionState,
    contractState,
    escrowState
  } = useProcurementStore();

  const [activeTab, setActiveTab] = useState("network"); // 'network' | 'live_feed'

  if (!isOpen) return null;

  const events = getInterAgentEventStream(activeStep, extractedIntent, auctionState, contractState, escrowState);

  const getAgentIcon = (id) => {
    switch (id) {
      case "buyer_agent": return <UserCheck size={16} className="text-white" />;
      case "vendor_agent": return <Zap size={16} className="text-white" />;
      case "negotiation_agent": return <Scale size={16} className="text-white" />;
      case "compliance_agent": return <ShieldCheck size={16} className="text-white" />;
      case "finance_agent": return <Landmark size={16} className="text-white" />;
      default: return <Bot size={16} className="text-white" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Bot size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm lg:text-base font-bold text-white">
                  Auctra Multi-Agent Orchestrator
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  5 Agents Synchronized
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Collaborative enterprise intelligence replacing monolithic AI models
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab("network")}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  activeTab === "network" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-300 hover:text-white"
                }`}
              >
                Agent Network (5)
              </button>
              <button
                onClick={() => setActiveTab("live_feed")}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "live_feed" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-300 hover:text-white"
                }`}
              >
                <Terminal size={12} />
                <span>Live Event Bus</span>
                <span className="px-1 py-0.2 rounded-full bg-indigo-500 text-[9px] font-mono">{events.length}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === "network" ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            <div className="text-xs text-slate-600 max-w-2xl">
              Each specialized agent runs dedicated deterministic rules, compliance constraints, and game-theoretic optimization loops across the procurement lifecycle.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGENT_REGISTRY.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${agent.avatarBg} flex items-center justify-center shadow-xs shrink-0`}>
                        {getAgentIcon(agent.id)}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 leading-tight">
                          {agent.name}
                        </h3>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Persona: <strong>{agent.persona}</strong>
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                      ONLINE
                    </span>
                  </div>

                  <div className="text-[10px] font-semibold text-indigo-700 uppercase tracking-wider">
                    {agent.title}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {agent.role}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                    {agent.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Live Inter-Agent Event Bus Feed */
          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-950 font-mono text-xs">
            <div className="text-[11px] text-slate-500 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>REAL-TIME INTER-AGENT EVENT BUS [SECURE WORKFLOW STREAM]</span>
              <span className="text-emerald-400">STATUS: BROADCASTING</span>
            </div>

            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{evt.timestamp}</span>
                    <span className="font-bold text-indigo-400">{evt.agentName}</span>
                  </div>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    evt.level === "SUCCESS" ? "bg-emerald-500/20 text-emerald-300" :
                    evt.level === "FINANCE" ? "bg-purple-500/20 text-purple-300" :
                    evt.level === "PROGRESS" ? "bg-amber-500/20 text-amber-300" :
                    "bg-blue-500/20 text-blue-300"
                  }`}>
                    {evt.level}
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {evt.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Auctra Agent Mesh • Verified against Enterprise Procurement Standards</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
}
