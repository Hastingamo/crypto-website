"use client"
import { useState, useEffect } from "react";
import Notess from "./Notess";
import Notes from "./Notes";
export default function Note() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isFlipped]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-black ov">
      <div className="relative w-full min-h-screen [perspective:2000px]">
        <div
          className={`relative w-full min-h-screen transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div
            className="absolute inset-0 [backface-visibility:hidden] h-screen overflow-y-auto bg-white dark:bg-black overflow-x-hidden"
            style={{ pointerEvents: isFlipped ? "none" : "auto" }}
          >
            <Notes/>
          </div>

          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] h-screen overflow-y-auto bg-white dark:bg-black"
            style={{ pointerEvents: isFlipped ? "auto" : "none" }}
          >
            <Notess/>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="fixed top-16 right-4 px-4 xl:right-16 py-2 rounded-lg bg-blue-500 text-white shadow-md"
      >
        {isFlipped ? "Go to Front" : "Go to Back"}
      </button>
    </div>
  );
}