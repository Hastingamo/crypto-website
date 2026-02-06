"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [error, setError] = useState(null);
  const { Id } = useParams();
  const apikey = process.env.NEXT_PUBLIC_COIN_API_KEY;

  useEffect(() => {
    fetchPairs();
 
  }, [Id]);

     const fetchPairs = async () => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
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
    </div>
  );
}

export default Page;
