"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../loa";

function Page() {
  const [news, setNews] = useState([]);
  const [load, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const apikey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    getNews();
    setLoading(false);
  }, []);

  const getNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=forex&token=${apikey}`
        // `https://finnhub.io/api/v1/news?category=forex&token=${apikey}`
      );
      const result = await res.json();

      setNews(result);
      console.log(result);
    } catch (err) {
      console.error("Error fetching forex data:", err);
    } finally {
      setLoading(false);
    }
  };

  // const filtered = news.filter((item) =>
  //   item.displaySymbol.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Forex Symbols</h1>

      <input
        type="text"
        placeholder="Search symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {load ? (
           <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          <Loader/>
       
           </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {news.map((item, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-100 rounded shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              {item.image && (
      <Image
        src={item.image}
        alt={item.headline}
        width={400}
        height={200}
        className="w-full h-40 object-cover rounded mb-2"
      />
    )}
              <h2 className="font-semibold">{item.headline}</h2>
              <p className="text-sm text-gray-500">{item.source}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read more →
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Page;
