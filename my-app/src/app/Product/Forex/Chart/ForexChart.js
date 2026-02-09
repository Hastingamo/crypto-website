"use client";

import { Search, Minimize2, Maximize2 } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";

function ForexChart({ symbol, onSymbolChange }) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol || "OANDA:XAU_CAD");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [search, setSearch] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [pairss, setPairss] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [filtered, setFilteredData] = useState([]);

  const apikey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  const chartContainerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (symbol) {
      setCurrentSymbol(symbol);
    }
  }, [symbol]);

  const handleSymbolChange = (newSymbol) => {
    setCurrentSymbol(newSymbol);
    if (onSymbolChange) {
      onSymbolChange(newSymbol);
    }
  };

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
        );
        const data = await res.json();
        setPairs(data.slice(0, 100));
        setPairss(data.slice(0, 7));
      } catch (err) {
        console.error("Error fetching forex pairs:", err);
      }
    };

    fetchPairs();
  }, []);

  useEffect(() => {
    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.head.appendChild(script);

    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !chartContainerRef.current) return;

    if (widgetRef.current) widgetRef.current.remove();

    chartContainerRef.current.innerHTML = "";

    // OANDA symbols in TradingView usually don't have the underscore
    const tvSymbol = currentSymbol.replace("_", "");

    widgetRef.current = new window.TradingView.widget({
      autosize: true,
      symbol: tvSymbol,
      container_id: chartContainerRef.current.id,
      interval: "1",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
    });
  }, [isScriptLoaded, currentSymbol]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!search.trim()) return;

    const input = search.trim().toLowerCase();

    const pair = pairs.find(
      (p) =>
        p.symbol.toLowerCase() === input ||
        p.displaySymbol.toLowerCase() === input ||
        p.description.toLowerCase().includes(input)
    );

    if (pair) {
      handleSymbolChange(pair.symbol);
      setSearch("");
      setShow(false);
    } else {
      setError("Pair does not exist");
    }
  };

  useEffect(() => {
    const filtered = pairs.filter(
      (item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase()) ||
        item.displaySymbol?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [search, pairs]);

  const onType = (e) => {
    setSearch(e.target.value);
    setShow(true);
  };

  const selectedPair = pairs.find((p) => p.symbol === currentSymbol);

  useEffect(() => {
    const close = () => setShow(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      className={`bg-[#C9B59C] rounded-2xl shadow-xl p-4 ${
        isFullScreen ? "fixed inset-0 w-full h-full z-50" : "relative"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-lg text-gray-100 font-semibold">
            {selectedPair ? selectedPair.displaySymbol : currentSymbol.split(":")[1] || currentSymbol}
          </p>
          <h2 className="text-sm font-bold text-gray-800">{currentSymbol}</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter forex symbol"
                value={search}
                onChange={onType}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {show && search && (
                <div
                  className=" absolute top-full left-0 mt-2 w-[20rem] md:w-[20rem] 
                  max-h-[12rem] overflow-y-auto pl-4 pt-4 pb-4
                  bg-white shadow-xl rounded-lg z-[9999] border"
                >
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div>
                    {filtered.map((item, index) => (
                      <div key={index}>
                        <div
                          className="cursor-pointer hover:bg-gray-100 p-1"
                          onClick={() => {
                            handleSymbolChange(item.symbol);
                            setShow(false);
                            setSearch("");
                          }}
                        >
                          <p className="font-semibold">{item.displaySymbol}</p>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              search
            </button>
          </form>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="w-4 h-4" /> Exit
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" /> Fullscreen
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
        {pairss.map((pair) => (
          <button
            key={pair.symbol}
            onClick={() => handleSymbolChange(pair.symbol)}
            className={`px-3 py-1 rounded-full text-sm text-center truncate ${
              currentSymbol === pair.symbol
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {pair.displaySymbol}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-4 w-full h-[60vh] lg:h-[75vh] relative bg-white rounded-md overflow-hidden">
        <div
          ref={chartContainerRef}
          id="tradingview-chart"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}

export default ForexChart;
