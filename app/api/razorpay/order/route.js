// Auctra AI - Razorpay Order Creation API Route
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const amount = body.amount || 37000; // in INR
    const currency = body.currency || "INR";
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const contractId = body.contractId || "PO-2026-98421";

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 1. If real Razorpay credentials provided, invoke Razorpay API
    if (keyId && keySecret && !keyId.includes("sandbox")) {
      try {
        const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
        const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
          },
          body: JSON.stringify({
            amount: amount * 100, // amount in paise
            currency,
            receipt,
            notes: {
              contractId,
              platform: "Auctra AI Autonomous Procurement"
            }
          })
        });

        if (rzpResponse.ok) {
          const rzpData = await rzpResponse.json();
          return NextResponse.json({
            success: true,
            order: rzpData,
            keyId,
            mode: "LIVE_RAZORPAY"
          });
        }
      } catch (err) {
        console.warn("Razorpay live call error, falling back to sandbox simulator:", err.message);
      }
    }

    // 2. High-Fidelity Sandbox Escrow Order
    const orderId = `order_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    const simulatedOrder = {
      id: orderId,
      entity: "order",
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt,
      status: "created",
      attempts: 0,
      notes: {
        contractId,
        platform: "Auctra AI Autonomous Procurement",
        escrowLedger: "Route Smart Collect Neutral Trust Account"
      },
      created_at: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json({
      success: true,
      order: simulatedOrder,
      keyId: keyId || "",
      mode: "SANDBOX"
    });
  } catch (error) {
    console.error("Razorpay Order API Error:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay escrow order", details: error.message },
      { status: 500 }
    );
  }
}
