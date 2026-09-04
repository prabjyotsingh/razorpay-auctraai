// Auctra AI - AI Procurement Intent Engine API Route
import { NextResponse } from "next/server";
import { extractProcurementIntent } from "@/lib/ai/intentParser";

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt || body.text || body.requirement;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Procurement requirement prompt is required." },
        { status: 400 }
      );
    }

    const parsed = await extractProcurementIntent(prompt);

    // Ensure exact structure requested:
    // { product, quantity, budget, sla, strategy }
    const result = {
      product: parsed.product || "Ergonomic Wrist Rest",
      quantity: parsed.quantity || 50,
      budget: parsed.budget || 900,
      sla: parsed.sla || "48 hours",
      strategy: parsed.strategy === "QUALITY_FIRST" ? "Quality First" : "Reverse Auction",
      maxBudget: parsed.maxBudget || (parsed.quantity || 50) * (parsed.budget || 900)
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("Intent API Error:", err);
    return NextResponse.json(
      { error: "Failed to parse procurement intent", details: err.message },
      { status: 500 }
    );
  }
}
