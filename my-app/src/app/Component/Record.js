"use client";
import { Search, Minimize2, Maximize2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function Record() {
  const [currentSymbol, setCurrentSymbol] = useState("btc/usd");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [search, setSearch] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [coins, setCoins] = useState([]);

  const chartContainerRef = useRef(null);
  const widgetRef = useRef(null);
   const [interval, setInterval] = useState("1D");

const changeInterval = (newInterval) => {
  setInterval(newInterval);

  if (widgetRef.current ) {
    widgetRef.current.onChartReady(() => {
      widgetRef.current.chart().setResolution(newInterval);
    });
  }
};


  /* ---- Fetch coins ---- */
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
        );
        const data = await res.json();
        setCoins(data.slice(0, 7));
      } catch (err) {
        console.error("Error fetching coins:", err);
      }
    };

    fetchCoins();
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

    if (widgetRef.current) {
      widgetRef.current.remove();
    }

    chartContainerRef.current.innerHTML = "";

    widgetRef.current = new window.TradingView.widget({
      autosize: true,
      symbol: currentSymbol,
      container_id: chartContainerRef.current.id,
      interval: "hr",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
    });
  }, [isScriptLoaded, currentSymbol, interval]);

  const toggleFullscreen = () => setIsFullScreen(!isFullScreen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const symbol = search.toUpperCase().endsWith("USD")
        ? search.toUpperCase()
        : search.toUpperCase() + "/USD";

      setCurrentSymbol(symbol);
      setSearch("");
    }
  };

  const symbolOnly = currentSymbol.split("/")[0];
  const selectedCoin = coins.find(
    (coin) => coin.symbol.toUpperCase() === symbolOnly.toUpperCase()
  );

  return (
    <div
      className={`bg-[#C9B59C] rounded-2xl shadow-xl p-4
      ${isFullScreen ? "fixed inset-0 w-full h-full z-50" : "relative"}`}
    >
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-lg text-gray-100 font-semibold">
            {selectedCoin ? selectedCoin.name : "Loading..."}
          </p>
          <h2 className="text-sm font-bold text-gray-800">
            ({currentSymbol})
          </h2>
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
                placeholder="Enter crypto symbol"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Search
            </button>
          </form>

          <button
            onClick={toggleFullscreen}
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
       <div className="flex gap-2">
  <button onClick={() => changeInterval("1D")}>1D</button>
  <button onClick={() => changeInterval("1h")}>1H</button>
  <button onClick={() => changeInterval("30")}>30m</button>
  <button onClick={() => changeInterval("15")}>15m</button>
  <button onClick={() => changeInterval("5")}>5m</button>
</div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-4">
        {coins.map((coin) => (
          <button
            key={coin.id}
            onClick={() => setCurrentSymbol(coin.symbol + "/USD")}
            className={`px-3 py-1 rounded-full text-sm text-center truncate 
            ${
              currentSymbol.includes(coin.symbol.toUpperCase())
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {coin.name}
          </button>
        ))}
      </div>

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

export default Record;