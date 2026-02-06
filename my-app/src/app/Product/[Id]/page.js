"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../Forex/loa";
function Page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  if (!loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  // useEffect(() => {
  //   const fetchCoins = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
  //       ).then((res) => res.json());
  //       setCoins(response);
  //     } catch (error) {
  //       setError("Failed to fetch coins");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // }, [id]);

  return (
    <div>
      <h1>Product Id Pages</h1>
      <Link href="/Product/Note">
        <h1>create note </h1>
      </Link>
      <h1>{coins.id}</h1>
      <h1>
        {" "}
        {coins.id} ({coins.symbol.toUpperCase()} || {item.category})
      </h1>
    </div>
  );
}

export default Page;
