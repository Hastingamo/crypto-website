"use client"
import { useState } from 'react'
import React from 'react'
function Page() {
      const apikey = "LWLNJQBFYP46XL2L"
      const symbol = "IBM"
      const [data, setData] = useState([]);
    const charts = (as) => {
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
    }
  return (

    <div className="">
        <h1 className='ml-4'>Product Page</h1>
        <div className='grid grid-cols-3' >
          {
            data.map((item, index) => (
              <div key={index} className='m-4 p-4 border-2'>
                <h1>{item.date}</h1>
                <h1>{item.open}</h1>
                <h1>{item.high}</h1>
                <h1>{item.low}</h1>
                <h1>{item.close}</h1>
                <h1>{item.volume}</h1>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Page
