"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ForexChart from "./ForexChart";

function Page() {
  const [coins, setCoins] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("OANDA:XAU_CAD");
  const apikey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
        );
        const data = await res.json();
        // Take some random-ish but stable pairs for the sidebar
        const samplePairs = data.slice(0, 10);
        setCoins(samplePairs);
      } catch (err) {
        console.error("Error fetching coins:", err);
      }
    };

    fetchCoins();
  }, []);

  const getFlag = (currency) => {
    if (!currency) return "🏳️";
    const code = currency.slice(0, 2).toUpperCase();
    return code.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Forex Chart Page</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/6 lg:w-3/4 p-2">
          <ForexChart
            symbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
        </div>
        <div className="w-full md:w-2/6 lg:w-1/4 bg-[#D9CFC7] min-h-screen p-4">
          <h1 className="text-xl font-bold mb-4">Forex Pairs</h1>
          <div className="flex flex-col gap-3">
            {coins.map((item, index) => {
              const [base, quote] = item.displaySymbol.split("/");
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={index}
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className={`border rounded-lg p-4 shadow-md cursor-pointer transition ${
                    selectedSymbol === item.symbol
                      ? "bg-blue-100 border-blue-500"
                      : "bg-[#F2F4F6] hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {getFlag(base)} / {getFlag(quote)}
                    </div>
                    <div>
                      <p className="font-semibold">{item.displaySymbol}</p>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
