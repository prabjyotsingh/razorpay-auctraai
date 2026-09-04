// Auctra AI - Reverse Auction API Route
import { NextResponse } from "next/server";
import { createReverseAuctionSession, generateNextBid } from "@/lib/auction/auctionEngine";
import { VERIFIED_VENDORS } from "@/lib/mockData";

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, intent, currentState, selectedVendorIds } = body;

    if (action === "create") {
      const invited = selectedVendorIds 
        ? VERIFIED_VENDORS.filter(v => selectedVendorIds.includes(v.id))
        : VERIFIED_VENDORS;
      const session = createReverseAuctionSession(intent, invited);
      return NextResponse.json({ success: true, session });
    }

    if (action === "step_bid" && currentState) {
      const updatedState = generateNextBid(currentState);
      return NextResponse.json({ success: true, session: updatedState });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
