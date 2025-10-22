'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
function Page() {
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getForex();
  }, []);

  const getForex = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`);
      const result = await res.json();

      const limited = result.slice(0, 100);
      setData(limited);
    } catch (err) {
      console.error("Error fetching forex data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFlag = (currency) => {
    if (!currency) return "🏳️";
    const code = currency.slice(0, 2).toUpperCase();
    return code.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
  };

  // Search filter
  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.displaySymbol.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [search, data]);

  return (
    <div className="p-6 bg-[#AFC9DC] dark:bg-[#352F44]">
      <h1 className="text-3xl font-bold mb-4">Forex Market</h1>

      <input
        className="mb-6 p-2 border-2 rounded w-full max-w-md"
        type="text"
        placeholder="🔍 Search forex pair (e.g. EUR/USD)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-500 text-lg">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, index) => {
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
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    {/* <p className="text-sm text-gray-500">{item.symbol}</p> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Page;
