'use client';
import React from 'react'
import { useEffect, useState } from 'react'
function Page() {
  const apikey = "d3s1cj1r01qldtrbhibgd3s1cj1r01qldtrbhic0";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    forex();
    setLoading(true);
  }, []);

  const forex = () => {
    fetch(
      `https://finnhub.io/api/v1/forex/symbol?exchange=OANDA&token=${apikey}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.slice(0, 10));
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>forex Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data.map((item, index) => (
            <div className='grid grid-cols-4 border rounded-2xl' key={index}>
              <h1>{item.name} </h1>
              <h1>{item.description} </h1>
              <h1>{item.displaySymbol} </h1>
              <h1>{item.symbol} </h1>
            </div>
          ))}
        
        </div>

      )}
    </div>
  )
}

export default Page
