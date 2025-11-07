"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
function Page() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    if (!id) return;

      fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            duration: 0.4,
          }}
        >
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </motion.div>
      </div>
    );
  }

  if (!details) return <p className="p-6">No data found</p>;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{details.name}</h1>
      <p>{details.description?.en?.slice(0, 200)}...</p>

      <div className="mt-4 space-y-2">
        {details.market_data ? (
          <>
            <p>
              💵 Current Price: $
              {details.market_data.current_price?.usd?.toLocaleString()}
            </p>
            <p>
              📈 Market Cap: $
              {details.market_data.market_cap?.usd?.toLocaleString()}
            </p>
            <p>🏆 Rank: {details.market_cap_rank}</p>
            <p>
              🔄 24h Change:{" "}
              {details.market_data.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </>
        ) : (
          <p>Market data unavailable</p>
        )}
      </div>
    </div>

  );
}

export default Page;
