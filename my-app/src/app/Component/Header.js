"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MarketComp from "./MarketComp";
import Minibar from "./Minibar";

function Header() {
  // const routers = useRouter()
  // const navigates = () => {
  //   routers.push("/Product");
  // }
  return (
    <>
      <div className="hidden md:grid md:grid-cols-6 md:p-4 bg-[#F2F4F6]">
        <Link href="/"><h1>Dams</h1></Link  >
        <MarketComp
          label="Product"
          items={[
            { label: "Forex", href: "/Product/Forex" },
            { label: "Crypto", href: "/Product" },
            // { label: "Accessories", href: "/Product/accessories" },
          ]}
        />   
            <Link  href="/Market"> <h1>Market</h1> </Link>
       <Link href="/Login"> <h1>Login</h1> </Link>
       <Link href="/Signup"> <h1>Sign Up</h1> </Link>
       <Link href="/News"> <h1>News</h1> </Link>
       <Link href="/Register"><h1>register</h1></Link>
       <Link href="Wallet"><h1>wallet</h1></Link>
      </div>
      <div className="grid p-4 grid-cols-4 md:hidden">
        <h1>Dams</h1>
        <Link href="/Login"><h1>login</h1></Link>
        <Link href="/Signup"><h1>Sign Up</h1></Link>
        <Minibar/>
        {/* <img src="" alt="" /> */}
      </div>
    </>
  );
}

export default Header;
