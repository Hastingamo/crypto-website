"use client";
import React from "react";
import { useState, useEffect } from "react";
// import Record from "../../Component/Record";
import Image from "next/image";
import { motion } from "framer-motion";
import ForexChart from "./ForexChart";
function Page() {
  const [coins, setCoins] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState("OANDA:XAUCAD");
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
        );
        const data = await res.json();
        setCoins(data.slice(0, 100));
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
      <h1>chart Page</h1>
      <div className=" flex flex-row">
        <div className=" w-full md:w-4/6 lg:w-3/4">
          <ForexChart
            currentSymbol={currentSymbol}
            setCurrentSymbol={setCurrentSymbol}
            pairs={coins}
          />
        </div>
        <div className="md:w-1/3 lg:w-1/4 md:bg-[#D9CFC7] md:h-screen">
          <h1>coins list</h1>
          <div className="grid grid-cols-3">
            <h1>name</h1>
            <h1>price</h1>
            <h1>24h%</h1>
          </div>
          <div className="hidden md:grid md:grid-cols-1 overflow-y-auto max-h-[calc(100vh-100px)]">
            {coins.slice(0, 10).map((item, index) => {
              const [base, quote] = item.displaySymbol.split("/");
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  key={index}
                  onClick={() => setCurrentSymbol(item.symbol)}
                  className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer
                    ${
                      currentSymbol === item.symbol
                        ? "bg-blue-100 border-blue-500"
                        : "bg-[#F2F4F6]"
                    }
                    dark:bg-[#5C5470] dark:text-[#DBD8E3]`}
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
                      {/* <p className="text-sm text-gray-500">{item.symbol}</p> */}
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