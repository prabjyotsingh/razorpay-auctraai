// Auctra AI - Chrome Extension Ingestion API Route
import { NextResponse } from "next/server";
import { extractProcurementIntent } from "@/lib/ai/intentParser";

export async function POST(req) {
  try {
    const payload = await req.json();
    const { platform, url, title, price, quantity, vendor } = payload;

    if (!title) {
      return NextResponse.json(
        { error: "Product title is required from extension payload." },
        { status: 400 }
      );
    }

    const syntheticPrompt = `Source ${quantity || 50} units of ${title} under ₹${price || 1500}/unit with guaranteed delivery within 48 hours. Identified on ${platform || "external B2B portal"}${vendor ? ` from vendor ${vendor}` : ""}.`;

    const parsedIntent = await extractProcurementIntent(syntheticPrompt);

    return NextResponse.json({
      success: true,
      ingestId: `ext_ing_${Date.now()}`,
      platform: platform || "Chrome Extension",
      originalUrl: url,
      syntheticPrompt,
      parsedIntent,
      message: "Successfully received from Auctra Chrome Extension. Ready to trigger Reverse Auction."
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
