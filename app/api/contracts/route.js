// Auctra AI - Contract & PO Generator API Route
import { NextResponse } from "next/server";
import { generateProcurementContract } from "@/lib/contracts/contractGenerator";
import { ENTERPRISE_ORG } from "@/lib/mockData";

export async function POST(req) {
  try {
    const body = await req.json();
    const { auctionState, intent } = body;

    if (!auctionState || !intent) {
      return NextResponse.json(
        { error: "auctionState and intent are required to generate contract." },
        { status: 400 }
      );
    }

    const contract = generateProcurementContract(auctionState, intent, ENTERPRISE_ORG);
    return NextResponse.json({ success: true, contract });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
