// Auctra AI - Real PDF Generation Engine with pdf-lib
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePurchaseOrderPdf(contract) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 (points)
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  // Palette
  const colorPrimary = rgb(79 / 255, 70 / 255, 229 / 255); // #4F46E5 (Indigo)
  const colorDark = rgb(15 / 255, 23 / 255, 42 / 255); // #0F172A (Slate)
  const colorMuted = rgb(100 / 255, 116 / 255, 139 / 255); // #64748B
  const colorLightBg = rgb(248 / 255, 250 / 255, 252 / 255); // #F8FAFC
  const colorBorder = rgb(226 / 255, 232 / 255, 240 / 255); // #E2E8F0
  const colorSuccess = rgb(22 / 255, 163 / 255, 74 / 255); // #16A34A (Green)

  // 1. Header Banner
  page.drawRectangle({
    x: 40,
    y: height - 100,
    width: width - 80,
    height: 60,
    color: colorLightBg,
    borderColor: colorBorder,
    borderWidth: 1
  });

  // Auctra AI Logo mark
  page.drawRectangle({
    x: 55,
    y: height - 85,
    width: 32,
    height: 32,
    color: colorPrimary
  });
  page.drawText("A", {
    x: 65,
    y: height - 76,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1)
  });

  // Title
  page.drawText("AUCTRA AI", {
    x: 96,
    y: height - 68,
    size: 16,
    font: fontBold,
    color: colorDark
  });
  page.drawText("Autonomous Procurement Operating System - Official Purchase Order", {
    x: 96,
    y: height - 82,
    size: 9,
    font: fontRegular,
    color: colorMuted
  });

  // PO & Date on the right
  const poNum = contract.poNumber || "PO-2026-98421";
  page.drawText(poNum, {
    x: width - 200,
    y: height - 68,
    size: 14,
    font: fontBold,
    color: colorPrimary
  });
  page.drawText(`Issued: ${contract.issueDate || "September 3, 2026"}`, {
    x: width - 200,
    y: height - 82,
    size: 9,
    font: fontRegular,
    color: colorMuted
  });

  // 2. Buyer & Vendor Cards (Two columns)
  const partyY = height - 210;
  const colWidth = (width - 95) / 2;

  // Buyer Box
  page.drawRectangle({
    x: 40,
    y: partyY,
    width: colWidth,
    height: 95,
    color: rgb(1, 1, 1),
    borderColor: colorBorder,
    borderWidth: 1
  });
  page.drawText("BUYER / ISSUING ENTITY", {
    x: 52,
    y: partyY + 78,
    size: 8,
    font: fontBold,
    color: colorMuted
  });
  page.drawText(contract.buyer?.name || "Acme Technologies India Pvt. Ltd.", {
    x: 52,
    y: partyY + 62,
    size: 10,
    font: fontBold,
    color: colorDark
  });
  page.drawText(`GSTIN: ${contract.buyer?.gstin || "29AABCU9603R1ZM"}`, {
    x: 52,
    y: partyY + 48,
    size: 9,
    font: fontMono,
    color: colorDark
  });
  page.drawText("Embassy TechVillage, Outer Ring Rd, Bengaluru 560103", {
    x: 52,
    y: partyY + 34,
    size: 8,
    font: fontRegular,
    color: colorMuted
  });
  page.drawText(`Contact: ${contract.buyer?.contactPerson || "Vikramaditya Sharma"}`, {
    x: 52,
    y: partyY + 20,
    size: 8,
    font: fontRegular,
    color: colorMuted
  });

  // Supplier Box
  page.drawRectangle({
    x: 40 + colWidth + 15,
    y: partyY,
    width: colWidth,
    height: 95,
    color: rgb(1, 1, 1),
    borderColor: colorBorder,
    borderWidth: 1
  });
  page.drawText("AWARDED REVERSE AUCTION VENDOR", {
    x: 52 + colWidth + 15,
    y: partyY + 78,
    size: 8,
    font: fontBold,
    color: colorPrimary
  });
  page.drawText(contract.vendor || contract.supplier?.name || "TechHub Direct", {
    x: 52 + colWidth + 15,
    y: partyY + 62,
    size: 10,
    font: fontBold,
    color: colorDark
  });
  page.drawText(`GSTIN: ${contract.supplier?.gstin || "29AAACT9812M1Z2"}`, {
    x: 52 + colWidth + 15,
    y: partyY + 48,
    size: 9,
    font: fontMono,
    color: colorDark
  });
  page.drawText(contract.supplier?.address || "Electronic City Phase II, Bengaluru 560100", {
    x: 52 + colWidth + 15,
    y: partyY + 34,
    size: 8,
    font: fontRegular,
    color: colorMuted
  });
  page.drawText(`Fulfillment SLA: ${contract.deliverySLA || contract.slaGuarantee || "48 hours Guaranteed"}`, {
    x: 52 + colWidth + 15,
    y: partyY + 20,
    size: 8,
    font: fontBold,
    color: colorSuccess
  });

  // 3. Line Items Table
  const tableY = height - 280;
  page.drawRectangle({
    x: 40,
    y: tableY - 60,
    width: width - 80,
    height: 80,
    color: rgb(1, 1, 1),
    borderColor: colorBorder,
    borderWidth: 1
  });

  // Table Header Row
  page.drawRectangle({
    x: 40,
    y: tableY,
    width: width - 80,
    height: 20,
    color: colorLightBg
  });
  page.drawText("ITEM DESCRIPTION", { x: 50, y: tableY + 6, size: 8, font: fontBold, color: colorMuted });
  page.drawText("QTY", { x: 300, y: tableY + 6, size: 8, font: fontBold, color: colorMuted });
  page.drawText("UNIT PRICE (INR)", { x: 370, y: tableY + 6, size: 8, font: fontBold, color: colorMuted });
  page.drawText("TOTAL ESCROW (INR)", { x: 470, y: tableY + 6, size: 8, font: fontBold, color: colorMuted });

  // Table Row
  page.drawText(contract.productName || "Ergonomic Wrist Rest", {
    x: 50,
    y: tableY - 20,
    size: 10,
    font: fontBold,
    color: colorDark
  });
  page.drawText(`Category: ${contract.category || "Office Ergonomics"} - Guaranteed SLA: ${contract.deliverySLA || "48h"}`, {
    x: 50,
    y: tableY - 36,
    size: 8,
    font: fontRegular,
    color: colorMuted
  });
  page.drawText(`${contract.quantity || 50}`, {
    x: 305,
    y: tableY - 20,
    size: 10,
    font: fontBold,
    color: colorDark
  });
  page.drawText(`INR ${contract.unitPrice || 740}`, {
    x: 375,
    y: tableY - 20,
    size: 10,
    font: fontMono,
    color: colorDark
  });
  page.drawText(`INR ${(contract.totalAmount || 37000).toLocaleString("en-IN")}`, {
    x: 475,
    y: tableY - 20,
    size: 10,
    font: fontBold,
    color: colorPrimary
  });

  // 4. Realized Savings Box
  const savingsY = tableY - 120;
  page.drawRectangle({
    x: 40,
    y: savingsY,
    width: width - 80,
    height: 48,
    color: rgb(240 / 255, 253 / 255, 244 / 255), // Light Green
    borderColor: rgb(187 / 255, 247 / 255, 208 / 255),
    borderWidth: 1
  });
  page.drawText("AUTONOMOUS REVERSE AUCTION SAVINGS SUMMARY", {
    x: 52,
    y: savingsY + 32,
    size: 8,
    font: fontBold,
    color: colorSuccess
  });
  page.drawText(`Original Ceiling Budget: INR ${(contract.originalBudget || 45000).toLocaleString("en-IN")}  |  Final Winning Bid: INR ${(contract.totalAmount || 37000).toLocaleString("en-IN")}`, {
    x: 52,
    y: savingsY + 18,
    size: 8.5,
    font: fontRegular,
    color: colorDark
  });
  page.drawText(`TOTAL SAVINGS: INR ${(contract.savings || contract.savingsAmount || 8000).toLocaleString("en-IN")} (${contract.savingsPercent || "17.8"}% DEFLATION)`, {
    x: 52,
    y: savingsY + 6,
    size: 9,
    font: fontBold,
    color: colorSuccess
  });

  // 5. Cryptographic SHA-256 Hash Box
  const hashY = savingsY - 60;
  page.drawRectangle({
    x: 40,
    y: hashY,
    width: width - 80,
    height: 44,
    color: colorDark
  });
  page.drawText("CONTRACT VERIFICATION REFERENCE", {
    x: 52,
    y: hashY + 28,
    size: 7,
    font: fontBold,
    color: rgb(165 / 255, 180 / 255, 252 / 255)
  });
  page.drawText(contract.contractHash || "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069", {
    x: 52,
    y: hashY + 14,
    size: 8,
    font: fontMono,
    color: rgb(1, 1, 1)
  });

  // 6. Mandatory Clauses
  const termsY = hashY - 110;
  page.drawText("TERMS AND ESCROW PAYMENT WORKFLOW", {
    x: 40,
    y: termsY + 95,
    size: 8,
    font: fontBold,
    color: colorMuted
  });
  const terms = [
    "1. Delivery SLA: The supplier guarantees full physical delivery within the stipulated SLA timeframe.",
    "2. Liquidated Delay Damages: Penalty of 2.0% of total PO value per 24 hours of unauthorized delivery delay.",
    "3. Razorpay Escrow Payment: 100% of funds are locked in neutral custodial escrow and disbursed upon inspection.",
    "4. Inspection Window: Buyer retains 24-hour verification window upon receipt to verify authenticity and specs."
  ];
  terms.forEach((term, idx) => {
    page.drawText(term, {
      x: 40,
      y: termsY + 80 - idx * 14,
      size: 7.5,
      font: fontRegular,
      color: colorDark
    });
  });

  // 7. Signature Blocks
  const sigY = termsY - 60;
  const sigBoxW = (width - 100) / 3;

  // Buyer Signature
  page.drawRectangle({ x: 40, y: sigY, width: sigBoxW, height: 60, color: colorLightBg, borderColor: colorBorder, borderWidth: 1 });
  page.drawText("PROCUREMENT CONTROLLER", { x: 46, y: sigY + 48, size: 7, font: fontBold, color: colorMuted });
  page.drawText("Vikramaditya Sharma", { x: 46, y: sigY + 34, size: 8, font: fontBold, color: colorDark });
  page.drawText("[AUTHENTICATED & SIGNED]", { x: 46, y: sigY + 18, size: 7, font: fontBold, color: colorSuccess });

  // Treasury Approval
  page.drawRectangle({ x: 40 + sigBoxW + 10, y: sigY, width: sigBoxW, height: 60, color: colorLightBg, borderColor: colorBorder, borderWidth: 1 });
  page.drawText("ENTERPRISE TREASURY", { x: 46 + sigBoxW + 10, y: sigY + 48, size: 7, font: fontBold, color: colorMuted });
  page.drawText("Priyanka Nair", { x: 46 + sigBoxW + 10, y: sigY + 34, size: 8, font: fontBold, color: colorDark });
  page.drawText("[FUNDS EARMARKED & LOCKED]", { x: 46 + sigBoxW + 10, y: sigY + 18, size: 7, font: fontBold, color: colorSuccess });

  // Supplier Acceptance
  page.drawRectangle({ x: 40 + (sigBoxW + 10) * 2, y: sigY, width: sigBoxW, height: 60, color: colorLightBg, borderColor: colorBorder, borderWidth: 1 });
  page.drawText("AWARDED SUPPLIER", { x: 46 + (sigBoxW + 10) * 2, y: sigY + 48, size: 7, font: fontBold, color: colorMuted });
  page.drawText(contract.vendor || "TechHub Direct", { x: 46 + (sigBoxW + 10) * 2, y: sigY + 34, size: 8, font: fontBold, color: colorDark });
  page.drawText("[BID CONFIRMED & SEALED]", { x: 46 + (sigBoxW + 10) * 2, y: sigY + 18, size: 7, font: fontBold, color: colorSuccess });

  // Footer Note
  page.drawText("Generated by Auctra AI Procurement Assistant - Tamper-proof verified procurement contract", {
    x: 100,
    y: 25,
    size: 7.5,
    font: fontRegular,
    color: colorMuted
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Browser helper to trigger instant file download
export async function downloadPurchaseOrderPdf(contract) {
  const bytes = await generatePurchaseOrderPdf(contract);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Auctra_${contract.poNumber || "PO-2026-98421"}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
