"use client";
import Link from "next/link";
import { Search, Minimize2, Maximize2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { Id } = useParams();
  const apikey = process.env.NEXT_PUBLIC_COIN_API_KEY;

  useEffect(() => {
    fetchPairs();
  }, [Id]);

  const fetchPairs = async () => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`,
      ).then((res) => res.json());
      setPairs(res);
    } catch (err) {
      setError("pairs were not found");
    } finally {
      setLoading(true);
    }
  };

  const Navigate = () => {
    Router.push("/Product/Forex/Notess");
  };
  return (
    <div>
      <h1>Product Id Page</h1>
      <h1 onClick={Navigate}>create Note</h1>
      <h1>{pairs.Id}</h1>
      <h1>{pairs.description}</h1>
     
      <div className="w-full md:w-4/6 lg:w-3/4">
        <div
          className={`bg-[#C9B59C] rounded-2xl shadow-xl p-4 ${
            isFullScreen ? "fixed inset-0 w-full h-full z-50" : "relative"
          }`}
        >
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            {isFullScreen ? (
              <>
                <Minimize2 className="w-4 h-4" /> Exit
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" /> Fullscreen
              </>
            )}
          </button>
        </div>
      </div>
      </div>

  );
}

export default Page;
