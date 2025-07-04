import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { fetchHistory } from "../services/api";
import "./style.css"; 

function DownloadReport({ prices }) {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    const coins = Object.keys(prices);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("📈 24h Price History - CryptoPulse", 14, 20);

    let y = 30;

    for (const coin of coins) {
      const history = await fetchHistory(coin);
      const tableData = history.map(([timestamp, price]) => [
        new Date(timestamp).toLocaleTimeString(),
        `$${price.toFixed(4)}`
      ]);

      doc.text(`${coin.toUpperCase()}`, 14, y);
      doc.autoTable({
        startY: y + 5,
        head: [["Time", "Price"]],
        body: tableData,
        theme: "striped",
        styles: { fontSize: 9 },
      });

      y = doc.lastAutoTable.finalY + 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }

    doc.save("crypto-24h-history.pdf");
    setLoading(false);
  };

  return (
    <div className="download-container">
      <button className="btn-export" onClick={handleDownloadPDF} disabled={loading}>
        {loading ? "Generating PDF..." : "🧾 Download 24h PDF Report"}
      </button>
    </div>
  );
}

export default DownloadReport;

