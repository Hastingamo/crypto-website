
"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../loa';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
    const { Id: id } = useParams();
      const [loading, setLoading] = useState(true);
      const [coin, setCoin] = useState(null);
        const apikey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ;

      useEffect(() => {
        forex();
        setLoading(true);
      }, [id]);

        const forex = () => {

        fetch(
        `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCoin(data);
        console.log(data);
        setLoading(false);
      });
  };
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      );
    }
  
  return (
    <div>
      <h1 className='text-2xl font-bold'>forex detail page</h1>
         <div className="mb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{coin.symbol} </h1>
           </div>
           <Link href="/Product/Forex" className="bg-gray-200 px-4 py-2 rounded">Back</Link>
         </div>

    </div>
  )
}

export default Page
