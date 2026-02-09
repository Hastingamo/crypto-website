// // "use client";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import Loader from "../Forex/loa";
// // import { set } from "better-auth/*";
// // function Page() {
// //   const { id } = useParams();
// //   const [loading, setLoading] = useState(true);
// //   const [coins, setCoins] = useState([]);
// //   const [error, setError] = useState(null);

// //   if (!loading) {
// //     return (
// //       <div>
// //         <Loader />
// //       </div>
// //     );
// //   }

// //     useEffect(() => {
// //       const fetchCoins = async () => {
// //         try {
// //           const res = await fetch(
// //             "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
// //           )
// //           const data = res
// //           setCoins(data)
// //         }catch(err){
// //           setError(error)
// //         }
// //       }
// //       })

// //   return (
// //     <div>
// //       <h1>Product Id Pages</h1>
// //       <Link href="/Product/Note">
// //         <h1>create note </h1>
// //       </Link>
// //       <h1>{coins.id}</h1>
// //       <h1>
// //         {" "}
// //         {coins.id} ({coins.symbol.toUpperCase()} || {item.category})
// //       </h1>
// //     </div>
// //   );
// // }

// // export default Page;

// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { Minimize2, Maximize2 } from "lucide-react";

// function Page() {
//   const { id } = useParams();

//   const [coin, setCoin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);
//   const [currentSymbol, setCurrentSymbol] = useState("");

//   const chartContainerRef = useRef(null);
//   const widgetRef = useRef(null);

//   // 1️⃣ Fetch coins and find the selected one

//   useEffect(() => {
//     const fetchCoin = async () => {
//       try {
//         const res = await fetch(
//           "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
//         );
//         const data = await res.json();

//         const selectedCoin = data.find(
//           (c) =>
//             (c.id && id && c.id.toLowerCase() === id.toLowerCase()) ||
//             (c.symbol && id && c.symbol.toLowerCase() === id.toLowerCase()),
//         );

//         if (selectedCoin) {
//           setCoin(selectedCoin);

//           // Convert to TradingView format
//           setCurrentSymbol(`BINANCE:${selectedCoin.symbol.toUpperCase()}USDT`);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoin();
//   }, [id]);

//   // 2️⃣ Load TradingView script
//   useEffect(() => {
//     if (window.TradingView) {
//       setIsScriptLoaded(true);
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/tv.js";
//     script.async = true;
//     script.onload = () => setIsScriptLoaded(true);
//     document.head.appendChild(script);

//     return () => document.head.removeChild(script);
//   }, []);

//   // 3️⃣ Initialize chart
//   useEffect(() => {
//     if (!isScriptLoaded || !currentSymbol || !chartContainerRef.current) return;

//     if (widgetRef.current) {
//       widgetRef.current.remove();
//     }

//     widgetRef.current = new window.TradingView.widget({
//       autosize: true,
//       symbol: currentSymbol,
//       interval: "15",
//       timezone: "Etc/UTC",
//       theme: "light",
//       style: "1",
//       locale: "en",
//       enable_publishing: false,
//       container_id: chartContainerRef.current.id,
//     });
//   }, [isScriptLoaded, currentSymbol]);

//   if (loading) return <p>Loading...</p>;
//   if (!coin) return <p>Coin not found</p>;

//   return (
//     <>
//       <h1 className="text-2xl font-bold">
//         {coin.name} ({coin.symbol.toUpperCase()})
//       </h1>

//       <div className="w-full md:w-4/6 lg:w-3/4">
//         <div
//           className={`bg-[#C9B59C] rounded-2xl shadow-xl p-4 ${
//             isFullScreen ? "fixed inset-0 z-50" : "relative"
//           }`}
//         >
//           <button
//             onClick={() => setIsFullScreen(!isFullScreen)}
//             className="mb-3 flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md"
//           >
//             {isFullScreen ? (
//               <>
//                 <Minimize2 className="w-4 h-4" /> Exit
//               </>
//             ) : (
//               <>
//                 <Maximize2 className="w-4 h-4" /> Fullscreen
//               </>
//             )}
//           </button>

//           <div
//             id="tradingview-chart"
//             ref={chartContainerRef}
//             className="w-full h-[500px]"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Page;
"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../Forex/loa";
import Record from "../../Component/Record";

function Page() {
  const { Id: id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response.ok) throw new Error("Coin not found");
        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCoin();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-red-500">Error: {error || "Coin not found"}</h1>
        <Link href="/Product" className="text-blue-500 underline">Go back to products</Link>
      </div>
    );
  }

  const tradingViewSymbol = `BINANCE:${coin.symbol.toUpperCase()}USDT`;

  return (
    <div className="p-4 bg-[#AFC9DC] min-h-screen">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Image src={coin.image.small} alt={coin.name} width={40} height={40} className="w-10 h-10" />
           <h1 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        </div>
        <Link href="/Product" className="bg-gray-200 px-4 py-2 rounded">Back</Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Record initialSymbol={tradingViewSymbol} />
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Market Stats</h2>
          <div className="space-y-2">
            <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
            <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>24h High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()}</p>
            <p><strong>24h Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}</p>
            <p><strong>Price Change (24h):</strong> 
              <span className={coin.market_data.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
          </div>
          
          <div className="mt-8">
            <Link href="/Product/Note" className="block text-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
              Create Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
