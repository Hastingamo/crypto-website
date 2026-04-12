"use client";
import Link from "next/link";
import { Search, Minimize2, Maximize2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";

function Page() {
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pair, setPair] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const apikey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    if (id) {
      fetchPair();
    }
  }, [id]);

  const fetchPair = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
      ).then((res) => res.json());

      const decodedId = decodeURIComponent(id);
      const foundPair = res.find((p) => p.symbol === id || p.symbol === decodedId);
      if (foundPair) {
        setPair(foundPair);
      } else {
        setError("Pair not found");
      }
    } catch (err) {
      setError("Error fetching forex data");
    } finally {
      setLoading(false);
    }
  };

  const Navigate = () => {
    Router.push("/Product/Forex/Notesss");
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!pair) return <div className="p-6">Pair not found</div>;

  const symbol = pair.symbol.replace(/_/g, "").toUpperCase();
  const tradingViewSymbol = symbol.includes(":") ? symbol : `OANDA:${symbol}`;

  return (
    <div className="p-6 bg-[#AFC9DC] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{pair.displaySymbol}</h1>
          <p className="text-gray-700">{pair.description}</p>
        </div>
        <button
          onClick={Navigate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Note
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Chart initialSymbol={tradingViewSymbol} />
      </div>
    </div>
  );
}

export default Page;
