"use client";
import React from 'react'
import { useState, useEffect } from "react";
import Record from "../../Component/Record";
import Image from "next/image";
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
     const [coins, setCoins] = useState([]);
    //  const [isAuthenticated, setIsAuthenticated] = useState(false)
    //  const [Loading, setLoading] = useState(true);
//   useEffect(() =>{
//  const handleAuth = async () =>{
//     try{
//       const isAuthenticated = isSession
//       if(!isAuthenticated){
//         router.push("/Dashboard");
//       }
//       setIsAuthenticated(true);

//     }catch (error) {
//       router.push("/Dashboard");
//     }finally{
//       setLoading(false);
//     }
    
//  }  
//  handleAuth()  

//   }, [router])


   useEffect(() => {
      const fetchCoins = async () => {
        try {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
          );
          const data = await res.json();
          const randomThree = data.slice(0,7);
          setCoins(randomThree);
        } catch (err) {
          console.error("Error fetching coins:", err);
        }
      };
  
      fetchCoins();
    }, []);

  //     if(Loading){
  //   return(
  //   <h1>..........................................</h1>   
  //   )
  // }
  return (
  <div>
      <h1>chart Page</h1>
      <div className=" md:flex md:flex-row">
        <div className=" w-full md:w-4/6 lg:w-3/4">
          <Record />
        </div>
        <div className=" md:w-1/3 lg:w-1/4 md:bg-[#D9CFC7] md:h-screen">
          <h1>coins list</h1>
          <div className=" grid grid-cols-3">
          <h1>name</h1>
          <h1>price</h1>
          <h1>24h%</h1>
          </div>
          <div className="hidden md:grid md:grid-cols-1">
          {coins.map((coin) => (
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

                <p className="md:ml-5">${coin.current_price.toLocaleString()}</p>

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
          ))} 
          </div>


        </div>
      </div>
      {/* <div className='flex flex-col md:hidden'>
          <h1>pls rotate your phone to size </h1>
      </div> */}
    </div>
  )
}

export default Page;