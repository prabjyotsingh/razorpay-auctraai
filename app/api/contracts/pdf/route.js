// Auctra AI - PDF Purchase Order Download API Route
import { NextResponse } from "next/server";
import { generatePurchaseOrderPdf } from "@/lib/pdf/generatePdf";
import { generateProcurementContract } from "@/lib/contracts/contractGenerator";
import { ENTERPRISE_ORG } from "@/lib/mockData";

export async function GET(req) {
  try {
    const contract = generateProcurementContract(
      { auctionId: "AUC-98421", quantity: 50, currentLowestBid: 740, winningVendor: "TechHub Direct" },
      { product: "Ergonomic Memory Foam Wrist Rest Set", budget: 900, quantity: 50, sla: "48 hours" },
      ENTERPRISE_ORG
    );

    const pdfBytes = await generatePurchaseOrderPdf(contract);
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": buffer.length.toString(),
        "Content-Disposition": `inline; filename="Auctra_${contract.poNumber || "PO-98421"}.pdf"`
      }
    });
  } catch (err) {
    console.error("PDF GET Route Error:", err);
    return NextResponse.json({ error: "Failed to generate PDF", details: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const contract = body.contract || generateProcurementContract(
      { auctionId: "AUC-98421", quantity: 50, currentLowestBid: 740, winningVendor: "TechHub Direct" },
      { product: "Ergonomic Memory Foam Wrist Rest Set", budget: 900, quantity: 50, sla: "48 hours" },
      ENTERPRISE_ORG
    );

    const pdfBytes = await generatePurchaseOrderPdf(contract);
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": buffer.length.toString(),
        "Content-Disposition": `attachment; filename="Auctra_${contract.poNumber || "PO-98421"}.pdf"`
      }
    });
  } catch (err) {
    console.error("PDF Route Error:", err);
    return NextResponse.json({ error: "Failed to generate PDF", details: err.message }, { status: 500 });
  }
}
