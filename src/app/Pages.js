import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React from 'react'

function Pages() {
    const Route = useRouter()
    const navigate = () =>{
        Route.push("Food")
    }
  return (
    <div>
      <h1>hello world</h1>
      <Link onClick={navigate}></Link>
    </div>
  )
}

export default Pages
