"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "./loa";
function Page() {
  // const apikeys = "MYBRGA85QP1HBBAL";
  const apikey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
      forex();
  }, []);

  // const getForex = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
  //     );
  //     const result = await res.json();

  //     setData(results);
  //   } catch (err) {
  //     console.error("Error fetching forex data:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 const forexs = () => {
    const selectedPair = pairs.find((p) => p.symbol.replace(/_/g, "") === currentSymbol);
    router.push('/Product/Forex');
  };
  
  const forex = () => {

        fetch(
        `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // setData(data.slice(0, 30));
        setData(data);
        console.log(data);
        setLoading(false);
      });
  };



  const getFlag = (currency) => {
    if (!currency) return "🏳️";
    const code = currency.slice(0, 2).toUpperCase();
    return code.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
  };

  useEffect(() => {
    const filteredResults = data && Array.isArray(data)
      ? data.filter((item) =>
          item.displaySymbol.toLowerCase().includes(search.toLowerCase())
        )
      : [];
    setFiltered(filteredResults);
  }, [search, data]);

  const router = useRouter();
  const news = () => {
    router.push("/Product/Forex/News");
  };

  const chart = () => {
    router.push("/Product/Forex/Chart");
  };

  return (
    <div className="p-6 bg-[#AFC9DC] ">
      <h1 className="text-3xl font-bold mb-4">Forex Market</h1>

      {loading ? (
        <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3">
            <input
              className="mb-6 p-2 border-2 rounded w-full max-w-md"
              type="text"
              placeholder="🔍 Search forex pair (e.g. EUR/USD)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="m-4 p-2 bg-blue-600 text-white rounded"
              onClick={news}
            >
              News
            </button>
            <button
              className="m-4 p-2 bg-blue-600 text-white rounded"
              onClick={chart}
            >
              Chart
            </button>
          </div>
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
                  className="border rounded-lg bg-[#F2F4F6]  p-4 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {getFlag(base)} / {getFlag(quote)}
                    </div>
                    <div>
                      <Link href={`/Product/Forex/${item.symbol}`}>
                        <p className="font-semibold">{item.symbol}</p>
                      </Link>

                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
