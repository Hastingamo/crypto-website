"use client";
import React from 'react'
import ConnectButton from '../Component/ConnectButton';
// import { Web3Provider } from '../Component/Waa'
// import { ConnectKitButton } from 'connectkit';
function Page() {
  return (
    <div>
        <h1> wallet </h1>
      {/* <ConnectKitButton/> */}
      <ConnectButton/>
  </div>
  )
}


export default Page
