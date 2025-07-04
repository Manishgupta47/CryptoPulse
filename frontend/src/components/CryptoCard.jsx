import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import './style.css'; // Make sure this exists

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function CryptoCard({ name, price }) {
  const [priceHistory, setPriceHistory] = useState([]);

  // Update rolling 30-point history for live chart
  useEffect(() => {
    if (!price) return;
    setPriceHistory((prev) => {
      const updated = [...prev, parseFloat(price)];
      return updated.length > 30 ? updated.slice(-30) : updated;
    });
  }, [price]);

  const chartData = {
    labels: priceHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: `${name} (Live)`,
        data: priceHistory,
        fill: false,
        borderColor: "#00ffff",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { display: false },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "#444" },
      },
    },
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="crypto-card">
      <h2>{name.toUpperCase()}</h2>
      <p>💰 ${parseFloat(price).toFixed(2) || "Loading..."}</p>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default CryptoCard;
