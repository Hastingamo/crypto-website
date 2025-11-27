"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MarketComp from "./MarketComp";
import Mini from "./Mini";
function Minibar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Image
        src="/Images/menu.png"
        alt="menu"
        height={20}
        width={20}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -60 }}
          animate={{ opacity: 1, y: 20, scale: 1 }}
          transition={{ duration: 3 }}
          className="fixed top-40  left-[70%] -translate-y-2/4 -translate-x-2/4 w-2/4 h-1/3 flex shadow-2xl flex-col items-center justify-center bg-[#E3E3E3] bg-opacity-70 z-[9]"
        >
          <Image
            src="/Images/error.png"
            height={20}
            width={20}
            alt="close"
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <Mini
            label="Product"
            className="block px-2 py-1 " 
            items={[
              { label: "Forex", href: "/Product/Forex" },
              { label: "Crypto", href: "/Product" },
              // { label: "Accessories", href: "/Product/accessories" },
            ]}
          />
          <Link className="block px-2 py-1 hover:bg-gray-100" href="/Market">
            {" "}
            <h1>Market</h1>{" "}
          </Link>
          <Link className="block px-2 py-1 hover:bg-gray-100" href="/News">
            {" "}
            <h1>News</h1>{" "}
          </Link>
          <Link className="block px-2 py-1 hover:bg-gray-100" href="/Register">
            <h1>register</h1>
          </Link>
          <Link className="block px-2 py-1 hover:bg-gray-100" href="/Wallet">
            <h1>wallet</h1>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Minibar;
