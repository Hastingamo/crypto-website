"use client";
import Link from "next/link";
import { Search, Minimize2, Maximize2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";

function Page() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { Id: id } = useParams();
  const apikey = process.env.NEXT_PUBLIC_COIN_API_KEY;

  useEffect(() => {
    fetchPairs();
  }, [id]);

  const fetchPairs = async () => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
      ).then((res) => res.json());
      setPairs(res);
      console.log("Pairs data:", res);
    } catch (err) {
      setError("pairs were not found");
    } finally {
      setLoading(true);
    }
  };

  const Navigate = () => {
    Router.push("/Product/Forex/Notess");
  };

if (!pairs?.symbol) return null;
const tradingViewSymbol = `OANDA:${pairs.symbol.toUpperCase()}`;
      
      

  return (
    <div>
      <h1>Product Id Page</h1>
      
      <h1>{pairs.Id}</h1>
      <h1>{pairs.description}</h1>
     <div className="grid grid-cols-1-1">
            <div className="lg:col-span-2">
               <Chart initialSymbol={tradingViewSymbol} />
            </div>
      <div >
        <h1 onClick={Navigate} className="cursor-pointer text-blue-500 hover:underline">create Note</h1>
      </div>
     </div>

      </div>

  );
}

export default Page;
