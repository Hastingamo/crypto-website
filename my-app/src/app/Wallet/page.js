"use client";
import React from 'react'
import { Web3Provider } from '../Component/Waa'
import 
function Page() {
  return (
    <div>
        <h1> wallet </h1>
    <Web3Provider>
      <ConnectKitButton />
    </Web3Provider>    </div>
  )
}

export default Page
