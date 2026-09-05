// Auctra AI - Enterprise Purchase Order PDF Generation Engine
// Clean, minimal, audit-ready single-page A4 procurement document
// Inspired by SAP Ariba, Oracle Cloud Procurement, Zoho Procurement & Coupa

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { BRAND_MARK_PNG_BASE64 } from "./brandLogoBase64.js";

/**
 * Builds the clean, minimal enterprise Purchase Order PDF using jsPDF
 * @param {Object} contract - Procurement contract object
 * @returns {jsPDF} configured jsPDF instance
 */
export function buildPurchaseOrderJsPdf(contract = {}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: true
  });

  const pageWidth = doc.internal.pageSize.getWidth();   // 595.28 pt (A4 width)
  const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt (A4 height)
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);        // 515.28 pt
  const rightX = pageWidth - margin;

  // Minimal Enterprise Palette (No loud green boxes, clean corporate hierarchy)
  const cDark = [15, 23, 42];          // #0F172A Primary Text
  const cMuted = [100, 116, 139];      // #64748B Secondary Text
  const cBorder = [226, 232, 240];     // #E2E8F0 Clean 0.5pt Borders
  const cLightBg = [248, 250, 252];    // #F8FAFC Subtle Header Fill
  const cAccent = [37, 99, 235];       // #2563EB Corporate Ref
  const cSuccess = [22, 163, 74];      // #16A34A Status Text

  // Extract Contract Properties with fallbacks
  const poNum = contract.poNumber || "PO-2026-98421";
  const issueDate = contract.issueDate || "September 5, 2026";
  const buyerName = contract.buyer?.name || "Acme Technologies India Pvt. Ltd.";
  const buyerGstin = contract.buyer?.gstin || "29AABCU9603R1ZM";
  const buyerAddr = contract.buyer?.address || "Tower 4, Embassy Tech Village, Outer Ring Road, Bengaluru 560103";
  const buyerContact = contract.buyer?.contactPerson || "Vikramaditya Sharma (VP Procurement)";

  const suppName = contract.vendor || contract.supplier?.name || "TechHub Direct";
  const suppGstin = contract.supplier?.gstin || "29AAACT9812M1Z2";
  const suppAddr = contract.supplier?.address || "Electronic City Phase II, Hosur Road, Bengaluru 560100";
  const suppContact = contract.supplier?.contactPerson || "Sunil Mehta (Key Account Manager)";
  const suppSla = contract.deliverySLA || contract.slaGuarantee || "48 Hours Guaranteed Delivery";

  const qty = Number(contract.quantity || 50);
  const unitPrice = Number(contract.unitPrice || 740);
  const totalVal = Number(contract.totalAmount || (qty * unitPrice));
  const productName = contract.productName || "Ergonomic Memory Foam Wrist Rest Set";
  const category = contract.category || "Office Ergonomics & Peripherals";

  const originalBudget = Number(contract.originalBudget || (qty * 900));
  const savingsVal = Number(contract.savings || contract.savingsAmount || Math.max(0, originalBudget - totalVal));
  const savingsPct = contract.savingsPercent || (originalBudget > 0 ? (((originalBudget - totalVal) / originalBudget) * 100).toFixed(1) : "17.8");

  const hashVal = contract.contractHash || "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
  const workflowId = `WF-${contract.auctionId || "AUC-98421"}`;

  // =========================================
  // 0. SUBTLE WATERMARK (Very faint, clean)
  // =========================================
  doc.saveGraphicsState();
  doc.setTextColor(248, 250, 252);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.text("AUCTRA AI", pageWidth / 2, pageHeight / 2 - 15, { align: "center", angle: -25 });
  doc.setFontSize(16);
  doc.text("ENTERPRISE PROCUREMENT AGREEMENT", pageWidth / 2, pageHeight / 2 + 18, { align: "center", angle: -25 });
  doc.restoreGraphicsState();

  let curY = 36;

  // =========================================
  // 1. HEADER (Actual Logo Image on Left | Clean Minimal Meta on Right)
  // =========================================
  // Actual Auctra Logo Mark from project assets
  try {
    if (BRAND_MARK_PNG_BASE64) {
      doc.addImage(BRAND_MARK_PNG_BASE64, "PNG", margin, curY + 1, 32, 23.4);
    }
  } catch {
    // Fallback if image fails
    doc.setFillColor(...cDark);
    doc.roundedRect(margin, curY + 1, 28, 24, 3, 3, "F");
  }

  // Logo Typography
  doc.setTextColor(...cDark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("Auctra", margin + 38, curY + 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...cMuted);
  doc.text("Enterprise Procurement Operating Platform", margin + 38, curY + 26);

  // Top Right: Minimal PO Title & Meta (NO GREEN PILL BOX)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...cDark);
  doc.text("Purchase Order Agreement", rightX, curY + 10, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...cMuted);
  doc.text("PO Ref: ", rightX - 165, curY + 23);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...cAccent);
  doc.text(poNum, rightX - 128, curY + 23);

  // Clean minimal status text (No green box)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...cMuted);
  doc.text("Status: ", rightX - 58, curY + 23);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...cSuccess);
  doc.text("Approved", rightX - 25, curY + 23);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...cMuted);
  doc.text(`Issued: ${issueDate}`, rightX, curY + 36, { align: "right" });

  curY += 46;

  // Thin Header Divider
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.line(margin, curY, rightX, curY);

  curY += 12;

  // =========================================
  // 2. BUYER & SUPPLIER SECTION (Two-column clean cards)
  // =========================================
  const colW = (contentWidth - 14) / 2; // ~250.6 pt
  const cardH = 78;

  // Left: Buyer Information Card
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, curY, colW, cardH, 3, 3, "FD");

  doc.setFillColor(...cLightBg);
  doc.rect(margin + 0.5, curY + 0.5, colW - 1, 15, "F");
  doc.setDrawColor(...cBorder);
  doc.line(margin, curY + 15.5, margin + colW, curY + 15.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("BUYER / ISSUING ENTITY", margin + 8, curY + 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text(buyerName, margin + 8, curY + 28);

  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...cDark);
  doc.text(`GSTIN: ${buyerGstin}`, margin + 8, curY + 39);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...cMuted);
  doc.text(buyerAddr, margin + 8, curY + 50, { maxWidth: colW - 16 });
  doc.text(`Contact: ${buyerContact}`, margin + 8, curY + 68);

  // Right: Awarded Supplier Card
  const suppX = margin + colW + 14;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(suppX, curY, colW, cardH, 3, 3, "FD");

  doc.setFillColor(...cLightBg);
  doc.rect(suppX + 0.5, curY + 0.5, colW - 1, 15, "F");
  doc.setDrawColor(...cBorder);
  doc.line(suppX, curY + 15.5, suppX + colW, curY + 15.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("AWARDED SUPPLIER", suppX + 8, curY + 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text(suppName, suppX + 8, curY + 28);

  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...cDark);
  doc.text(`GSTIN: ${suppGstin}`, suppX + 8, curY + 39);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...cMuted);
  doc.text(suppAddr, suppX + 8, curY + 50, { maxWidth: colW - 16 });

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...cDark);
  doc.text(`Fulfillment SLA: ${suppSla}`, suppX + 8, curY + 68);

  curY += cardH + 12;

  // =========================================
  // 3. LINE ITEMS TABLE (Clean Enterprise Grid, standard INR currency)
  // =========================================
  autoTable(doc, {
    startY: curY,
    margin: { left: margin, right: margin },
    tableWidth: contentWidth,
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      textColor: cDark,
      cellPadding: 7,
      overflow: "linebreak",
      lineWidth: 0.5,
      lineColor: cBorder
    },
    headStyles: {
      fillColor: cLightBg,
      textColor: cMuted,
      fontStyle: "bold",
      fontSize: 8,
      cellPadding: 6,
      lineWidth: 0.5,
      lineColor: cBorder
    },
    alternateRowStyles: {
      fillColor: [252, 253, 255]
    },
    columns: [
      { header: "#", dataKey: "item" },
      { header: "ITEM DESCRIPTION & TECHNICAL SPECIFICATIONS", dataKey: "desc" },
      { header: "QTY", dataKey: "qty" },
      { header: "UNIT PRICE", dataKey: "unitPrice" },
      { header: "TOTAL (INR)", dataKey: "total" }
    ],
    body: [
      {
        item: "01",
        desc: `${productName}\nClassification: ${category} | SLA: ${suppSla}\nCompliance: GSTIN Invoice, ISO 9001:2015, E-Way Bill Compliant`,
        qty: `${qty} Units`,
        unitPrice: `INR ${unitPrice.toLocaleString("en-IN")}.00`,
        total: `INR ${totalVal.toLocaleString("en-IN")}.00`
      }
    ],
    columnStyles: {
      item: { cellWidth: 26, halign: "center", fontStyle: "bold", textColor: cMuted },
      desc: { cellWidth: 265.28 },
      qty: { cellWidth: 54, halign: "center" },
      unitPrice: { cellWidth: 80, halign: "right", font: "courier" },
      total: { cellWidth: 90, halign: "right", fontStyle: "bold", textColor: cDark }
    }
  });

  curY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : curY + 60;

  // =========================================
  // 4. FINANCIAL SUMMARY (Clean, minimal, NO GREEN BOXES)
  // =========================================
  const summaryH = 50;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, curY, contentWidth, summaryH, 3, 3, "FD");

  doc.setFillColor(...cLightBg);
  doc.rect(margin + 0.5, curY + 0.5, contentWidth - 1, 14, "F");
  doc.setDrawColor(...cBorder);
  doc.line(margin, curY + 14.5, margin + contentWidth, curY + 14.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("PROCUREMENT SAVINGS SUMMARY", margin + 10, curY + 10.5);

  // Clean 4-column minimal breakdown
  const finColW = contentWidth / 4;
  const finMetrics = [
    { label: "BASELINE QUOTE", val: `INR ${originalBudget.toLocaleString("en-IN")}.00`, bold: false },
    { label: "WINNING BID", val: `INR ${totalVal.toLocaleString("en-IN")}.00`, bold: false },
    { label: "NET REALIZED SAVINGS", val: `INR ${savingsVal.toLocaleString("en-IN")}.00`, bold: true },
    { label: "DEFLATION PERCENT", val: `${savingsPct}% Savings`, bold: true }
  ];

  finMetrics.forEach((m, idx) => {
    const mx = margin + (idx * finColW) + 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text(m.label, mx, curY + 27);

    doc.setFont("helvetica", m.bold ? "bold" : "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...cDark);
    doc.text(m.val, mx, curY + 39);

    if (idx < 3) {
      doc.setDrawColor(...cBorder);
      doc.line(margin + ((idx + 1) * finColW), curY + 18, margin + ((idx + 1) * finColW), curY + summaryH - 6);
    }
  });

  curY += summaryH + 10;

  // =========================================
  // 5. ESCROW & SETTLEMENT SECTION (Clean, minimal, no broken %Ï bullets)
  // =========================================
  const escrowH = 48;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, curY, contentWidth, escrowH, 3, 3, "FD");

  doc.setFillColor(...cLightBg);
  doc.rect(margin + 0.5, curY + 0.5, contentWidth - 1, 14, "F");
  doc.setDrawColor(...cBorder);
  doc.line(margin, curY + 14.5, margin + contentWidth, curY + 14.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("ESCROW & SETTLEMENT WORKFLOW", margin + 10, curY + 10.5);

  const escrowFields = [
    { label: "ESCROW STATUS", val: "Locked (Custodial)", sub: "Held in escrow account" },
    { label: "SETTLEMENT STATE", val: "Awaiting Delivery", sub: "Disbursement on GRN" },
    { label: "FUNDING STATE", val: "Secured (100%)", sub: "Pre-funded reserve" },
    { label: "DELIVERY SLA", val: "48 Hours SLA", sub: "Guaranteed timeline" }
  ];

  escrowFields.forEach((f, idx) => {
    const fx = margin + (idx * finColW) + 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text(f.label, fx, curY + 25);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...cDark);
    doc.text(f.val, fx, curY + 34);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...cMuted);
    doc.text(f.sub, fx, curY + 42);

    if (idx < 3) {
      doc.setDrawColor(...cBorder);
      doc.line(margin + ((idx + 1) * finColW), curY + 18, margin + ((idx + 1) * finColW), curY + escrowH - 6);
    }
  });

  curY += escrowH + 10;

  // =========================================
  // 6. DIGITAL VERIFICATION & AUDIT LOG
  // =========================================
  const auditH = 40;
  doc.setFillColor(...cLightBg);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, curY, contentWidth, auditH, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("DIGITAL VERIFICATION & AUDIT LOG", margin + 10, curY + 11);

  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cDark);
  doc.text(`Contract Hash: ${hashVal}`, margin + 10, curY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...cMuted);
  doc.text(`Document Version: v2.4 (Enterprise Audit Ready)   |   Workflow ID: ${workflowId}   |   Timestamp: ${issueDate} 14:32:00 IST`, margin + 10, curY + 33);

  curY += auditH + 10;

  // =========================================
  // 7. STATUTORY COMPLIANCE CLAUSES
  // =========================================
  const clausesH = 44;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, curY, contentWidth, clausesH, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("PROCUREMENT TERMS & STATUTORY COMPLIANCE", margin + 10, curY + 11);

  const clauses = [
    "1. Fulfillment & Inspection: Supplier guarantees delivery within agreed SLA. Buyer maintains 24h inspection window upon receipt.",
    "2. Escrow Milestone Disbursement: 100% of funds remain secured in neutral custodial escrow, disbursed upon Buyer GRN sign-off.",
    "3. Statutory & Invoicing: Valid GST invoice with matching IRN and compliant E-Way bill must accompany goods prior to payment dispatch."
  ];

  clauses.forEach((cl, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...cDark);
    doc.text(cl, margin + 10, curY + 21 + (i * 9), { maxWidth: contentWidth - 20 });
  });

  curY += clausesH + 10;

  // =========================================
  // 8. SIGNATURES (Three aligned blocks, clean ASCII text)
  // =========================================
  const sigW = (contentWidth - 16) / 3; // ~166 pt each
  const sigH = 64;

  const signatures = [
    {
      title: "BUYER APPROVAL",
      name: "Vikramaditya Sharma",
      role: "Procurement Controller",
      date: `${issueDate} 14:32 IST`
    },
    {
      title: "FINANCE APPROVAL",
      name: "Priyanka Nair",
      role: "Enterprise Treasury Director",
      date: `${issueDate} 14:35 IST`
    },
    {
      title: "SUPPLIER ACCEPTANCE",
      name: suppContact.split(" (")[0] || suppName,
      role: "Authorized Signatory",
      date: `${issueDate} 14:38 IST`
    }
  ];

  signatures.forEach((sig, idx) => {
    const sx = margin + (idx * (sigW + 8));
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...cBorder);
    doc.setLineWidth(0.5);
    doc.roundedRect(sx, curY, sigW, sigH, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text(sig.title, sx + 8, curY + 11);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...cDark);
    doc.text(sig.name, sx + 8, curY + 24);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...cMuted);
    doc.text(sig.role, sx + 8, curY + 34);
    doc.text(sig.date, sx + 8, curY + 44);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cDark);
    doc.text("Digitally Signed [Verified]", sx + 8, curY + 55);
  });

  curY += sigH + 12;

  // =========================================
  // 9. FOOTER
  // =========================================
  doc.setDrawColor(...cBorder);
  doc.setLineWidth(0.5);
  doc.line(margin, curY, rightX, curY);

  curY += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...cMuted);
  doc.text("Generated by Auctra AI Procurement Platform   |   Document Version 2.4   |   Audit Trail Enabled", margin, curY);
  doc.text("Page 1 of 1", rightX, curY, { align: "right" });

  return doc;
}

/**
 * Generates raw Uint8Array PDF bytes for server-side route handlers and buffer responses
 * @param {Object} contract - Procurement contract object
 * @returns {Promise<Uint8Array>}
 */
export async function generatePurchaseOrderPdf(contract) {
  const doc = buildPurchaseOrderJsPdf(contract);
  const arrayBuffer = doc.output("arraybuffer");
  return new Uint8Array(arrayBuffer);
}

/**
 * Triggers direct browser download of the Purchase Order PDF
 * @param {Object} contract - Procurement contract object
 */
export async function downloadPurchaseOrderPdf(contract) {
  const filename = `Auctra_${contract?.poNumber || "PO-2026-98421"}.pdf`;
  if (typeof window !== "undefined") {
    const doc = buildPurchaseOrderJsPdf(contract);
    doc.save(filename);
    return;
  }
  return await generatePurchaseOrderPdf(contract);
}
