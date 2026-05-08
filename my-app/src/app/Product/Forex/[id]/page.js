  "use client";

  import Link from "next/link";
  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import Chart from "./Chart";
  import Loader from "../loa";

  function Page() {
    const params = useParams();

    // Decode URL parameter
    const rawId = params?.id;
    const id = rawId ? decodeURIComponent(rawId) : null;

    // const [loading, setLoading] = useState(true);
    const [forex, setForex] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

    useEffect(() => {
      if (!id || !apiKey) return;

      const fetchForex = async () => {
        try {
          // setLoading(true);
          setError(null);

          // Ensure proper symbol format
          const symbol = id.startsWith("OANDA:")
            ? id
            : `OANDA:${id}`;

          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch forex data");
          }

          const data = await response.json();

          // Finnhub returns empty values sometimes
          if (!data || data.c === 0 || data.c === undefined) {
            throw new Error("Invalid forex data");
          }

          setForex(data);
        } catch (err) {
          setError(err.message || "Something went wrong");
        } finally {
          // setLoading(false);
        }
      };

      fetchForex();
    }, [id, apiKey]);

    // LOADING
    // if (loading) {
    //   return (
    //     <div className="flex justify-center items-center h-screen">
    //       <Loader />
    //     </div>
    //   );
    // }

    // ERROR
    if (error || !forex) {
      return (
        <div className="p-10 text-center">
          <h1 className="text-2xl text-red-500">
            Error: {error || "Forex not found"}
          </h1>

          <Link
            href="/Product/Forex"
            className="text-blue-500 underline"
          >
            Go Back
          </Link>
        </div>
      );
    }

    // TradingView symbol
    const tradingViewSymbol = id.startsWith("OANDA:")
      ? id
      : `OANDA:${id}`;

    // Safe percentage calculation
    const percentageChange =
      forex.pc && forex.pc !== 0
        ? (((forex.c - forex.pc) / forex.pc) * 100).toFixed(2)
        : "0.00";

    return (
      <div className="min-h-screen bg-[#AFC9DC] p-4">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{id}</h1>

          <Link
            href="/Product/Forex"
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Back
          </Link>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* CHART */}
          <div className="lg:col-span-2">
            <Chart initialSymbol={tradingViewSymbol} />
          </div>

          {/* MARKET STATS */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Market Stats
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Current Price:</strong> {forex.c}
              </p>

              <p>
                <strong>High Today:</strong> {forex.h}
              </p>

              <p>
                <strong>Low Today:</strong> {forex.l}
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
                    forex.c >= forex.pc
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {percentageChange}%
                </span>
              </p>
            </div>

            {/* NOTE BUTTON */}
            <div className="mt-8">
              <Link
                href={`/Product/Forex/${encodeURIComponent(id)}/Notess`}
                className="block rounded-lg bg-blue-600 p-3 text-center text-white hover:bg-blue-700"
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