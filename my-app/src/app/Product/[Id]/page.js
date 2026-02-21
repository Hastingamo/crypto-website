"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../Forex/loa";
import Record from "../../Component/Record";
import Recordss from "./Recordss";

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
           <Recordss initialSymbol={tradingViewSymbol} />
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
            <Link href={`/Product/${id}/Notess`}
            className="block text-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
              Create Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
