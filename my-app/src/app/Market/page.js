"use client";
import React from "react";
import Record from "../Component/Record";

function Page() {
  return (
    <div className="p-4 bg-[#AFC9DC] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 ml-4">Market Overview</h1>
      <div className="w-full">
        <Record />
      </div>
    </div>
  );
}

export default Page;
