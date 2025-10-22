"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import CoinChart from "../Component/chart";
function Page() {
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crypto();
    setLoading(true);
  }, []);

  // const stock = () => {
  //   fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apikey}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data.slice(0, 10));
  //       setLoading(false);
  //     });
  // };

  const crypto = () => {
    // fetch(
    //   `https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=${apikey}`
    // )
        fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.slice(0, 30));
        setLoading(false);
      });
  };

  // const forex = () => {
  //   fetch(
  //     `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data.slice(0, 10));
  //       setLoading(false);
  //     });
  // };
  useEffect(() => {
    const interval = setInterval(() => {
      crypto();
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="">
      <h1 className="ml-4">crypto Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-1 ">
            {data.map((item, index) => (
              <div
                key={index}
                className="m-4 p-6 border-2 rounded grid  md:grid-cols-2 lg:p-0 lg:grid-cols-4 xl:grid-cols-7"
              >
                <Image src={item.image} alt={item.name} width={50} height={50} />
                <p>
                  #{index + 1} {item.name} ({item.symbol.toUpperCase()})
                </p>
                <p>💰 Price: ${item.current_price.toLocaleString()}</p>
                <p>📈 Market Cap: ${item.market_cap.toLocaleString()}</p>
                <p
                  className={`font-semibold ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  1min Change: {item.price_change_percentage_24h.toFixed(2)}%
                </p>
                                <p>🔄 Volume: ${item.total_volume.toLocaleString()}</p>
                  {/* <Image */}
                  <CoinChart coinId={item.id}   />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
