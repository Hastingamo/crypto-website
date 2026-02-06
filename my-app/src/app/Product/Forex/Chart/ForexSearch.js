import React from 'react'
import { useState } from 'react'
function ForexSearch(onType, show, error, filtered, setCurrentSymbol){
    const [isOpen, setIsOpen] = useState(false);

    const onSearch = () => {
        onType()
    }
  return (
    <>
        <h1 onClick={() => setIsOpen(true)}>search</h1>
        {
            isOpen && (
                <div>
              {show && (
                <div className="  absolute md:w-[30rem] md:h-[10rem] shadow-lg bg-white">
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <h1 onClick={() => setIsOpen(false)}>close</h1>
                  <h1 onClick={onSearch}>opensss</h1>
                  <div>
                    {filtered.map((item, index) => (
                      <div key={index}>
                        <div>
                          <p
                            className="font-semibold"
                            onClick={() => setCurrentSymbol(item.symbol)}
                          >
                            {item.displaySymbol}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                          {/* <p className="text-sm text-gray-500">{item.symbol}</p> */}
                        </div>
                        <div className="flex items-center space-x-3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                </div>
            )

        }
    </>
  )
}

export default ForexSearch;