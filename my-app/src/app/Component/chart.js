// "use client";
//  import React from 'react'
//  import { useEffect, useState } from 'react';
//  import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
//  function Chart({ coinId = "bitcoin"}) {
    
//      useEffect(() => {
//     fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
//       .then((res) => res.json())
//       .then((data) => {
//         const prices = data.prices.map((p) => p[1]);
//         const labels = data.prices.map((p) =>
//           new Date(p[0]).toLocaleDateString("en-US", { month: "short", day: "numeric" })
//         );

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: `${coinId.toUpperCase()} Price (USD)`,
//               data: prices,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "black",
//               fill: true,
//               tension: 0.2,
//             },
//           ],
//         });
//       });
//   }, [coinId]);

//    return (
//      <div>
       
//      </div>
//    )
//  }
 
//  export default Chart


 
// "use client";
// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// function CoinChart({ coinId = "bitcoin" }) {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
//       .then((res) => res.json())
//       .then((data) => {
//         const prices = data.prices.map((p) => p[1]);
//         const labels = data.prices.map((p) =>
//           new Date(p[0]).toLocaleDateString("en-US", { month: "short", day: "numeric" })
//         );

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: `${coinId.toUpperCase()} Price (USD)`,
//               data: prices,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "black",
//               fill: true,
//               tension: 0.2,
//             },
//           ],
//         });
//       });
//   }, [coinId]);

//   return (
//     <div className="p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4 capitalize">{coinId} - Last 7 Days</h2>
//       {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
//     </div>
//   );

// }




"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export function CoinChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Price",
        data: [100, 120, 115, 130, 125],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <Line data={data} />
    </div>
  );
}
