// Auctra AI - Chrome Extension Create RFQ API Route
import { NextResponse } from "next/server";
import { saveRfq, getRfqById, getAllRfqs } from "@/lib/rfq/rfqStore";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const { productName, price, supplier, moq, source, url } = payload;

    if (!productName && !payload.title) {
      return NextResponse.json(
        { success: false, error: "Product name is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const createdRfq = saveRfq({
      productName: productName || payload.title,
      price: price || payload.targetPrice,
      supplier: supplier || payload.supplierName,
      moq: moq || payload.quantity,
      source: source || payload.platform || "IndiaMART",
      url: url || payload.pageUrl || ""
    });

    let baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const host = req.headers.get("host");
    if (host && !host.includes("chrome-extension") && !host.includes("undefined")) {
      baseUrl = host.startsWith("http") ? host : `http://${host}`;
    }
    const redirectUrl = `${baseUrl}/rfq/${createdRfq.id}`;

    return NextResponse.json(
      {
        success: true,
        rfqId: createdRfq.id,
        redirectUrl,
        rfq: createdRfq,
        message: "RFQ created successfully in Auctra AI engine."
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const rfq = getRfqById(id);
      if (!rfq) {
        return NextResponse.json(
          { success: false, error: `RFQ with id ${id} not found` },
          { status: 404, headers: corsHeaders }
        );
      }
      return NextResponse.json({ success: true, rfq }, { headers: corsHeaders });
    }

    const rfqs = getAllRfqs();
    return NextResponse.json({ success: true, rfqs }, { headers: corsHeaders });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
