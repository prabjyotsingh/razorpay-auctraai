// Auctra AI - Razorpay Escrow Settlement & Webhook Simulator API Route
import { NextResponse } from "next/server";
import { initializeRazorpayEscrow, advanceEscrowStage } from "@/lib/payments/razorpayEscrow";

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, contract, currentEscrow, targetStage } = body;

    if (action === "init") {
      const escrow = initializeRazorpayEscrow(contract);
      return NextResponse.json({ success: true, escrow });
    }

    if (action === "advance") {
      if (!currentEscrow || !targetStage) {
        return NextResponse.json({ error: "Missing currentEscrow or targetStage" }, { status: 400 });
      }
      const updated = advanceEscrowStage(currentEscrow, targetStage);
      return NextResponse.json({ success: true, escrow: updated });
    }

    // Webhook receiver simulator
    if (action === "webhook") {
      const { event, orderId } = body;
      return NextResponse.json({
        success: true,
        acknowledged: true,
        receivedEvent: event,
        orderId,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ error: "Invalid settlement action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
