"use client";
import Link from "next/link";
import React, { use, useState } from "react";
function page() {
  return (
    <div>
      <h1>Product Id Page</h1>
      <Link href="/Product/Note">
        <h1>create note </h1>
      </Link>
    </div>
  );
}

export default page;
