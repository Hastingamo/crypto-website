"use client";
import { useState } from "react";
import Link from "next/link";

export default function MarketComp({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-blue-500"
      >
        {label}
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-2 py-1 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
