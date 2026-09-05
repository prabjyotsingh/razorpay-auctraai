"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Headphones, 
  Clock, 
  MessageSquare, 
  Mail, 
  FileQuestion, 
  CheckCircle2, 
  ArrowRight,
  Send,
  LifeBuoy,
  PhoneCall,
  ShieldCheck
} from "lucide-react";

export default function SupportView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("AUC-849201");
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    organization: "",
    priority: "Standard",
    category: "Procurement Workflow",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneratedTicketId(`AUC-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setTicketData({
        name: "",
        email: "",
        organization: "",
        priority: "Standard",
        category: "Procurement Workflow",
        message: ""
      });
    }, 4000);
  };

  const supportChannels = [
    {
      title: "Enterprise Helpdesk & SLA",
      badge: "48-Hour SLA Guarantee",
      description: "Dedicated procurement operations desk providing round-the-clock incident management and commercial dispatch triage.",
      icon: Clock,
      detail: "support@auctra.ai • Guaranteed Response < 48 Hours"
    },
    {
      title: "Solutions Engineering",
      badge: "ERP & PunchOut Integration",
      description: "Direct assistance for connecting SAP Ariba, Coupa, Oracle Fusion, or custom REST APIs to the Auctra RFQ Engine.",
      icon: Headphones,
      detail: "integrations@auctra.ai • Technical Account Engineers"
    },
    {
      title: "Escrow & Settlement Advisory",
      badge: "Razorpay Payment Rails",
      description: "Specialized support for settlement workflows, GST invoice matching, dispute mediation, and vendor bank account validation.",
      icon: ShieldCheck,
      detail: "settlements@auctra.ai • Payment Settlement Team"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="enterprise-card p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <LifeBuoy size={13} />
              <span>Enterprise Client Services &amp; Advisory</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Auctra AI Enterprise Support Center
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Get technical, operational, and financial settlement assistance from our dedicated procurement engineering team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/documentation"
              className="px-4 py-2 text-xs font-semibold rounded-[12px] bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 flex items-center gap-1.5"
            >
              <span>API Documentation</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {supportChannels.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <div key={idx} className="enterprise-card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {channel.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A]">
                  {channel.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EEF2F7] text-xs font-mono text-blue-600 font-semibold">
                {channel.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 enterprise-card p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Submit an Enterprise Support Request</h3>
            <p className="text-xs text-[#64748B] mt-1">
              Your inquiry will be automatically routed to the designated account engineering lead.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in">
              <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Request Registered Successfully</h4>
              <p className="text-xs text-emerald-700">
                Ticket <strong>#{generatedTicketId}</strong> generated. An enterprise solutions engineer will respond within the guaranteed 48-hour SLA window.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Work Email</label>
                  <input
                    type="email"
                    required
                    value={ticketData.email}
                    onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                    placeholder="procurement@acmetech.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Organization</label>
                  <input
                    type="text"
                    required
                    value={ticketData.organization}
                    onChange={(e) => setTicketData({ ...ticketData, organization: e.target.value })}
                    placeholder="Acme Technologies India Pvt Ltd"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={ticketData.category}
                    onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Procurement Workflow">Procurement Workflow</option>
                    <option value="Chrome Extension">Chrome Extension Copilot</option>
                    <option value="Razorpay Escrow">Razorpay Escrow &amp; Payouts</option>
                    <option value="API Integration">REST API &amp; ERP Webhooks</option>
                    <option value="Billing & Platform">Billing &amp; Account Access</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Priority Level</label>
                  <select
                    value={ticketData.priority}
                    onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Standard">Standard (48-Hour SLA)</option>
                    <option value="High">High (24-Hour SLA)</option>
                    <option value="Urgent">Urgent - Transaction Blocked</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Description of Issue / Requisition ID</label>
                <textarea
                  rows={4}
                  required
                  value={ticketData.message}
                  onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                  placeholder="Provide context regarding RFQ, PO contract number, or integration endpoint..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="primary-gradient-btn px-5 py-2.5 flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <Send size={14} />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="enterprise-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FileQuestion size={18} className="text-blue-600" />
            <h3 className="text-base font-bold text-[#0F172A]">Quick FAQ</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">How do I verify a supplier&apos;s GSTIN?</div>
              <p className="text-slate-600 leading-relaxed">
                The platform runs an automated Modulo-36 check-digit algorithm synchronously when suppliers are discovered or saved.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">When are settlement funds disbursed?</div>
              <p className="text-slate-600 leading-relaxed">
                Funds are held in secure escrow custody until buyer inspection sign-off (3-way match: PO = Invoice = GRN) is confirmed.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">Is there an on-premise deployment option?</div>
              <p className="text-slate-600 leading-relaxed">
                Yes, enterprise clients can deploy Auctra within private AWS, GCP, or Azure VPC clusters using our containerized Docker/Helm charts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
