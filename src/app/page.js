"use client";
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
function Page() {
      const route = useRouter()
  const handleNavigation = () =>{
    route.push("/Pages")
    
  }
  return (
    <div>
      <h1>hello world</h1>
      <button onClick={handleNavigation}>food</button>
    </div>
  )
}

export default Page
