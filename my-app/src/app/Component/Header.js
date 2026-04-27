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
      <div className="hidden xl:h-16 xl:flex xl:gap-10 xl:flex-row xl:p-4 bg-[#050810]">
     <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
            DAMS
          </div>        <MarketComp
          label="Product"
          items={[
            { label: "Forex", href: "/Product/Forex" },
            { label: "Crypto", href: "/Product" },
            // { label: "Accessories", href: "/Product/accessories" },
          ]}
        />   
            <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }}  href="/Market"> <h1>Market</h1> </Link>
       <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }} href="/Login"> <h1>Login</h1> </Link>
       <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }}  href="/Signup"> <h1>Sign Up</h1> </Link>
       <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }} href="/News"> <h1>News</h1> </Link>
       <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }} href="/Register"><h1>register</h1></Link>
       <Link style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }} href="Wallet"><h1>wallet</h1></Link>
           <button className="nav-cta text-white" onClick={() => router.push("/Product")}>
            Launch App →
          </button>
      </div>
       <nav  className="xl:hidden bg-[#050810]">
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
            DAMS
          </div>

          {/* <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
            {["Markets", "Trade", "Portfolio", "Learn"].map(link => (
              <li key={link}><a href="#" className="nav-link">{link}</a></li>
            ))}
          </ul> */}

          <button className="nav-cta text-white" onClick={() => router.push("/Product")}>
            Launch App →
          </button>
        </nav>
    </>
  );
}

export default Header;
