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
             F
                </div>
            )

        }
    </>
  )
}

export default ForexSearch;