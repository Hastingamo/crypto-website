"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function CoinChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Price",
        data: [100, 120, 115, 130, 125],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.1)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: true },
      y: { display: true, beginAtZero: false },
    },
  };

  return (
    <div className="w-full md:w-3/4 mx-auto" style={{ height: 320 }}>
      <Line data={data} options={options} />
    </div>
  );
}
