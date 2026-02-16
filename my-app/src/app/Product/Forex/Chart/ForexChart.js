"use client";

import { Search, Minimize2, Maximize2 } from "lucide-react";

import React, { useState, useEffect, useRef } from "react";
import ForexSearch from "./ForexSearch";

function ForexChart() {
  const [currentSymbol, setCurrentSymbol] = useState("OANDA:XAUCAD");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [search, setSearch] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [pairss, setPairss] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [filtered, setFilteredData] = useState([]);

  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";

  const chartContainerRef = useRef(null);
  const widgetRef = useRef(null);

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
  }, [apikey]);

  // useEffect(() => {
  //   const fetchPairs = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
  //       );
  //       const data = await res.json();
  //       const checked = [];
  //       for (const pair of data) {
  //         const symbol = pair.symbol.includes(":")
  //           ? pair.symbol
  //           : `OANDA:${pair.symbol}`;
  //         const isValid = await validateSymbol(symbol);
  //         if (isValid) {
  //           checked.push({ ...pair, symbol });
  //         }
  //         if (checked.length === 100) break;
  //         setPairs(checked);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching forex pairs:", err);
  //     }
  //   };

  //   if (isScriptLoaded) fetchPairs();
  // }, [isScriptLoaded]);

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

    widgetRef.current = new window.TradingView.widget({
      autosize: true,
      symbol: currentSymbol,
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

  const validateSymbol = (symbol) => {
    return new Promise((resolve) => {
      const testId = "tv-test";

      const div = document.createElement("div");
      div.id = testId;
      div.style.display = "none";
      document.body.appendChild(div);
      try {
        new window.TradingView.widget({
          symbol,
          container_id: testId,
          width: 1,
          height: 1,
        });

        setTimeout(() => {
          document.body.removeChild(div);
          resolve(true);
        }, 500);
      } catch (err) {
        document.body.removeChild(div);
        resolve(false);
      }
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    if (search.trim()) {
      const input = search.trim().toLowerCase();

      const coin = pairs.find(
        (c) =>
          c.symbol.toLowerCase() === input || c.name.toLowerCase() === input,
      );

      if (coin) {
        setCurrentSymbol(input);
        setSearch("");
      } else {
        setError("Coin does not exist");
      }
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

  const Searchss = (e) => {
    setSearch(e.target.value);
  };

  const onType = (e) => {
    setSearch(e.target.value);
    setShow(true);
  };

  const selectedPair = pairs.find((p) => p.symbol.replace(/_/g, "") === currentSymbol);

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
            {selectedPair ? selectedPair.displaySymbol : "Loading..."}
          </p>
          <h2 className="text-sm font-bold text-gray-800">{currentSymbol}</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                placeholder="Enter crypto symbol"
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
                        <div>
                          <p
                            className="font-semibold"
                            onClick={() => setCurrentSymbol(item.symbol.replace(/_/g, ""))}
                          >
                            {item.displaySymbol}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                          {/* <p className="text-sm text-gray-500">{item.symbol}</p> */}
                        </div>
                        <div className="flex items-center space-x-3"></div>
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
            // onClick={() => setCurrentSymbol(pair.symbol)}
            onClick={() => setCurrentSymbol(pair.symbol.replace(/_/g, ""))}
            className={`px-3 py-1 rounded-full text-sm text-center truncate ${
              currentSymbol === pair.symbol.replace(/_/g, "")
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
