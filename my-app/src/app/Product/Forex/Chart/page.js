"use client";
import React from "react";
import { useState, useEffect } from "react";
// import Record from "../../Component/Record";
import Image from "next/image";
import { motion } from "framer-motion";
import ForexChart from "./ForexChart";
function Page() {
  const [coins, setCoins] = useState([]);
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
        );
        const data = await res.json();
        const randomThree = data.slice(0, 7);
        setCoins(randomThree);
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
        <ForexChart/>
        </div>
        <div className="md:w-1/3 lg:w-1/4 md:bg-[#D9CFC7] md:h-screen">
          <h1>coins list</h1>
          <div className="grid grid-cols-3">
            <h1>name</h1>
            <h1>price</h1>
            <h1>24h%</h1>
          </div>
          <div className="hidden md:grid md:grid-cols-1">
            {/* {coins.map((coin) => (
              <div key={coin.id} className="p-4 border-b border-gray-300">
                <div className="flex flex-row">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 "
                  />
                  <p>{coin.symbol.toUpperCase()}</p>

                  <p className="md:ml-5">
                    ${coin.current_price.toLocaleString()}
                  </p>

                  <p
                    className={`font-semibold ${
                      (coin.price_change_percentage_24h ?? 0) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {typeof coin.price_change_percentage_24h === "number"
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))} */}
            {coins.map((item, index) => {
              const [base, quote] = item.displaySymbol.split("/");
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  key={index}
                  className="border rounded-lg bg-[#F2F4F6] dark:bg-[#5C5470] dark:text-[#DBD8E3] p-4 shadow-md hover:shadow-lg transition"
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