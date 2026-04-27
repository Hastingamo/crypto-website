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
      <div className="hidden md:flex md:gap-10 md:flex-row md:p-4 bg-[#F2F4F6]">
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
       <nav style={{
          position: "relative", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "1.5rem 2.5rem",
          borderBottom: "0.5px solid rgba(99,102,241,0.2)",
        }} className="md:hidden">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
            DAMS
          </div>

          {/* <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
            {["Markets", "Trade", "Portfolio", "Learn"].map(link => (
              <li key={link}><a href="#" className="nav-link">{link}</a></li>
            ))}
          </ul> */}

          <button className="nav-cta" onClick={() => router.push("/Product")}>
            Launch App →
          </button>
        </nav>
    </>
  );
}

export default Header;
