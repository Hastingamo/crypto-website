"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Recordss from "./Recordss";
import Loader from "../loa";

function Page() {
  const { Id: id } = useParams(); // e.g. EURUSD
  const [loading, setLoading] = useState(true);
  const [forex, setForex] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchForex = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=OANDA:${id}&token=${apiKey}`
        );

        if (!response.ok) throw new Error("Forex data not found");

        const data = await response.json();

        // Finnhub returns { c, h, l, o, pc }
        if (!data || data.c === 0) {
          throw new Error("Invalid forex data");
        }

        setForex(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchForex();
  }, [id, apiKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !forex) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-red-500">
          Error: {error || "Forex not found"}
        </h1>
        <Link href="/Product/Forex" className="text-blue-500 underline">
          Go back
        </Link>
      </div>
    );
  }

  const tradingViewSymbol = `OANDA:${id}`;

  return (
    <div className="p-4 bg-[#AFC9DC] min-h-screen">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{id}</h1>

        <Link
          href="/Product/Forex"
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART */}
        <div className="lg:col-span-2">
          {/* <Recordss initialSymbol={tradingViewSymbol} /> */}
        </div>

        {/* STATS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Market Stats</h2>

          <div className="space-y-2">
            <p>
              <strong>Current Price:</strong> {forex.c}
            </p>

            <p>
              <strong>High (Today):</strong> {forex.h}
            </p>

            <p>
              <strong>Low (Today):</strong> {forex.l}
            </p>

            <p>
              <strong>Open Price:</strong> {forex.o}
            </p>

            <p>
              <strong>Previous Close:</strong> {forex.pc}
            </p>

            <p>
              <strong>Change:</strong>{" "}
              <span
                className={
                  forex.c > forex.pc ? "text-green-500" : "text-red-500"
                }
              >
                {((forex.c - forex.pc) / forex.pc * 100).toFixed(2)}%
              </span>
            </p>
          </div>

          {/* NOTE BUTTON */}
          <div className="mt-8">
            <Link
              href={`/Product/Forex/${id}/Notess`}
              className="block text-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Create Note
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;