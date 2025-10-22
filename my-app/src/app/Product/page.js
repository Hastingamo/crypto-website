"use client";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import CoinChart from "../Component/chart";
import { useRouter } from "next/navigation";
function Page() {
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    crypto();
    setLoading(true);
  }, []);
  const router = useRouter();
  const forex = () => {
    router.push('/Product/Forex');
  };
  // const stock = () => {
  //   fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apikey}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data.slice(0, 10));
  //       setLoading(false);
  //     });
  // };

  const crypto = () => {

        fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
    )
      .then((response) => response.json())
      .then((data) => {
        // setData(data.slice(0, 30));
        setData(data);
        setLoading(false);
      });
  };
  const news = () => {
  fetch(`https://finnhub.io/api/v1/news?category=crypto&token=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.slice(0, 10));
        
        console.log(data);
      });
  };

  // const searchCrypto = (e) => {
  //   setSearch(e.target.value);
  //   const filtered = data.filter((item) =>
  //     item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //     item.symbol.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // };
   
  useEffect(() => {
    
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, data]);

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
          <div>
            <input  className="m-4 p-2 border-2 rounded" type="text" placeholder="Search Crypto"  value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="m-4 p-2 bg-blue-600 text-white rounded" onClick={news}>News</button>
            <button className="m-4 p-2 bg-green-600 text-white rounded" onClick={forex}>forex</button>
          </div>
          <div className="grid grid-cols-1 ">
            {filteredData.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                key={index}
                // onViewportEnter={}
                // onViewportLeave={}
                viewport={{once:true}}
                whileInView={{opacity: 1, y:0}}
                className="m-4 p-6 border-2 shadow-2xl xl:ml-[2rem] rounded-2xl xl:rounded-[10px] xl:pt-4 xl:pb-4 grid  md:grid-cols-2 lg:p-0 lg:grid-cols-4 xl:grid-cols-7"
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
                  {/* <CoinChart coinId={item.id}   /> */}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;