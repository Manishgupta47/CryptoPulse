import PDFDocument from "pdfkit";
import { Parser } from "json2csv";

export const exportPDF = (req, res) => {
  const { prices } = req.body;

  if (!prices || typeof prices !== "object") {
    return res.status(400).json({ error: "Invalid price data" });
  }

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=crypto_report.pdf");

  doc.pipe(res);
  doc.fontSize(18).text("📈 Crypto Prices Report", { underline: true });
  doc.moveDown();

  Object.entries(prices).forEach(([coin, price]) => {
    doc.fontSize(14).text(`${coin.toUpperCase()}: $${parseFloat(price).toFixed(2)}`);
  });

  doc.end();
};

