"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
    const router = useRouter()
    const navigate = () =>{
        router.push("/food")
    }
  return (
    <div>
      <h1>hello world</h1>
      <div className="flex flex-col gap-4 mt-4">
        <Link href="/food" className="text-blue-600 underline">Go to Food (Link)</Link>
        <button
          onClick={navigate}
          className="w-fit px-4 py-2 bg-black text-white rounded cursor-pointer"
        >
          Go to Food (Router)
        </button>
      </div>
    </div>
  )
}

export default Page
