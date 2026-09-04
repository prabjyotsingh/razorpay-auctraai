// Auctra AI - AI Intent Extraction API Route
import { NextResponse } from "next/server";
import { extractProcurementIntent } from "@/lib/ai/intentParser";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Natural language procurement prompt is required." },
        { status: 400 }
      );
    }

    const structuredIntent = await extractProcurementIntent(prompt);

    return NextResponse.json({
      success: true,
      data: structuredIntent
    });
  } catch (error) {
    console.error("AI Intent Extraction Route Error:", error);
    return NextResponse.json(
      { error: "Failed to extract procurement intent", details: error.message },
      { status: 500 }
    );
  }
}
