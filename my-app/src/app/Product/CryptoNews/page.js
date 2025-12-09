"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../Forex/loa";
function Page() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";

  const news = () => {
    fetch(`https://finnhub.io/api/v1/news?category=crypto&token=${apikey}`)
      .then((response) => response.json())
      .then((newsData) => {
        setNewsData(newsData.slice(0, 20));
        setLoading(false);
        console.log(newsData);
      });
  };
  useEffect(() => {
    news();
  });

  useEffect(() => {
    const filtered = newsData.filter(
      (item) =>
        item.headline.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  }, [search, newsData]);
  return (
    <div>
      <h1>Crypto News</h1>
      {loading ? (
           <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
          <Loader/>
       
           </div>
      ) : (
        <>
          <div>
            <input
              className="m-4 p-2 border-2 rounded"
              type="text"
              placeholder="Search Crypto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            {filtered.map((newsItem, index) => (
              <div
                key={index}
                className="m-4 p-4 border-2 rounded-lg bg-white dark:bg-gray-800"
              >
                
                <Image
                  src={newsItem.image}
                  alt={newsItem.headline}
                  width={400}
                  height={200}
                  unoptimized
                  className="rounded-lg object-cover w-full h-48"
                />
                <p className="text-sm text-gray-600">{newsItem.headline}</p>
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
