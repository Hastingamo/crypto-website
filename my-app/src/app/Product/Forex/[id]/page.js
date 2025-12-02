"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
  const Router = useRouter();
  const Navigate=()=>{
    Router.push('/app/Product/Forex/Notess')
  }
  return (
    <div>
      <h1>Product Id Page</h1>
      <h1 onClick={Navigate}>create Note</h1>

    </div>
  )
}

export default Page
