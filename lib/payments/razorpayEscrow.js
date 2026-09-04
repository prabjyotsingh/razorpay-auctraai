// Auctra AI - Enterprise Razorpay Escrow & Settlement Layer
// Modeled on Stripe Dashboard & Razorpay Route Smart Collect

export const ESCROW_STAGES = [
  {
    key: "ESCROW_CREATED",
    label: "Escrow Created",
    description: "Razorpay Smart Route escrow ledger generated. Awaiting buyer corporate treasury deposit.",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    key: "FUNDS_LOCKED",
    label: "Funds Locked",
    description: "Capital deposited into neutral escrow vault. Supplier notified of verified funding.",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    key: "SUPPLIER_ACCEPTED",
    label: "Supplier Accepted",
    description: "Vendor acknowledged verified escrow and initiated express factory dispatch.",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    key: "DISPATCH_AND_INSPECTED",
    label: "Release Pending",
    description: "Shipment delivered. Physical QA inspection gate verified by receiving facility.",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    key: "SETTLEMENT_COMPLETE",
    label: "Settlement Complete",
    description: "Dual-control signoff verified. Automated payout disbursed to vendor bank account.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  }
];

export function initializeRazorpayEscrow(contract) {
  const totalAmount = contract?.totalAmount || 37000;
  const platformFeeRate = 0.015; // 1.5% Auctra Platform fee
  const platformFee = Math.round(totalAmount * platformFeeRate);
  const gstOnFee = Math.round(platformFee * 0.18); // 18% GST
  const netSupplierDisbursement = totalAmount - platformFee;

  const orderId = contract?.poNumber 
    ? `order_auctra_${contract.poNumber.replace(/\D/g, "")}` 
    : "order_auctra_09842";
  const virtualAccountId = "va_escrow_882914";
  const now = "2026-09-03T10:00:00.000Z";

  return {
    orderId,
    virtualAccountId,
    status: "ESCROW_CREATED",
    contractPo: contract?.poNumber || "PO-2026-09842",
    contractHash: contract?.contractHash || "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    supplierName: contract?.supplier?.name || "TechSupply India Logistics",
    supplierGstin: contract?.supplier?.gstin || "27AABCT4829E1Z8",
    buyerName: contract?.buyer?.name || "Acme Technologies India Pvt. Ltd.",
    currency: "INR",
    currencySymbol: "₹",
    grossAmount: totalAmount,
    platformFee,
    gstOnFee,
    netSupplierDisbursement,
    createdAt: now,
    updatedAt: now,
    escrowAccountDetails: {
      bankName: "HDFC Bank Ltd. (Auctra Escrow Trustee)",
      accountNumber: "50200098412894",
      ifscCode: "HDFC0000240",
      accountHolder: "Auctra Technologies Escrow Trust A/C",
      smartCollectVpa: `auctra.${orderId.toLowerCase()}@hdfcbank`
    },
    webhooks: [
      {
        id: "wh_init_09842",
        event: "escrow.order.created",
        status: "delivered",
        timestamp: "10:00:00 AM",
        payloadSummary: `Escrow order ${orderId} initialized for ₹${totalAmount.toLocaleString("en-IN")}`
      }
    ],
    timeline: [
      {
        stage: "ESCROW_CREATED",
        timestamp: "10:00 AM",
        actor: "Auctra Autonomous Engine",
        details: "Smart Collect Escrow Ledger initialized with dual-key release policy."
      }
    ]
  };
}

export function advanceEscrowStage(currentEscrow, targetStage) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const timelineMessages = {
    FUNDS_LOCKED: {
      actor: "Buyer Enterprise Treasury",
      details: `Buyer funded ₹${currentEscrow.grossAmount.toLocaleString("en-IN")} via NEFT/RTGS into Escrow Vault. Funds locked.`
    },
    SUPPLIER_ACCEPTED: {
      actor: currentEscrow.supplierName,
      details: "Supplier confirmed PO receipt and verified escrow deposit. Preparing batch dispatch."
    },
    DISPATCH_AND_INSPECTED: {
      actor: "Receiving Warehouse QA Gate",
      details: "Consignment received, QR codes verified, inspection passed with 100% acceptance."
    },
    SETTLEMENT_COMPLETE: {
      actor: "Razorpay Payouts Engine",
      details: `Net payout of ₹${currentEscrow.netSupplierDisbursement.toLocaleString("en-IN")} successfully disbursed to vendor bank account.`
    }
  };

  const webhookEvents = {
    FUNDS_LOCKED: "payment.captured",
    SUPPLIER_ACCEPTED: "order.supplier_acknowledged",
    DISPATCH_AND_INSPECTED: "delivery.qa_verified",
    SETTLEMENT_COMPLETE: "payout.processed"
  };

  const newWebhook = {
    id: `wh_${Math.random().toString(36).substring(2, 8)}`,
    event: webhookEvents[targetStage] || "escrow.updated",
    status: "delivered",
    timestamp: timeStr,
    payloadSummary: timelineMessages[targetStage]?.details || `Escrow transitioned to ${targetStage}`
  };

  const newTimelineItem = {
    stage: targetStage,
    timestamp: timeStr,
    actor: timelineMessages[targetStage]?.actor || "System",
    details: timelineMessages[targetStage]?.details || `Stage updated to ${targetStage}`
  };

  return {
    ...currentEscrow,
    status: targetStage,
    updatedAt: now.toISOString(),
    webhooks: [newWebhook, ...currentEscrow.webhooks],
    timeline: [...currentEscrow.timeline, newTimelineItem]
  };
}
