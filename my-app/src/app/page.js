"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
const width = 300;
const height = 400;

function Page() {
  const [coin, setCoin] = useState([]);
  const router = useRouter();
  const navigates = () => {
    router.push("/Product");
  };

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
    )
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomThree = shuffled.slice(0, 3);
        setCoin(randomThree);
      });
  }, []);
  const randomCoin = coin[Math.floor(Math.random() * coin.length)];
  return (
    <div className="overflow-hidden">
      <h1 className="text-center mt-10 md:mt-[4rem] lg:mt-[6rem] xl:mt-[3rem] text-3xl md:text-6xl">
        welcome<p className="mt-0.5 transform   translate-x-[10%]">to Dams</p>
      </h1>
      <div className="home-bg md:mt-5 transform translate-x-[60%] md:translate-x-[90%] lg:translate-x-[130%] xl:ml-[15rem]">
        <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: -50 }}

                  animate={{ opacity: 1, x: 50, scale: 1 }}
                  
          transition={{ duration: 6 }}
         className="grid grid-cols-3  gap-4">
          {coin.map((item) => (
            <Image
              key={item.id}
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className=" mt-10 md:mt-28"
            />
          ))}
        </motion.div>
      </div>
      <div className="w-[10rem]">
        <h1 className="ml-5">
          ultimate place to see live chart or trade crypto currencys
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={navigates}
          >
            {" "}
            click here
          </span>
        </h1>
      </div>

    </div>
  );
}

export default Page;
