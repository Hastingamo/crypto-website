"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function Page() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("homeNotes");
    // const saves = localStorage.getItem("homeNotess");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
    // if (saves) {
    //   setNotes(JSON.parse(saves));
    // }
  }, []);

  return (
    <div className="p-4 h-">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Link key={note.id} to={`/note/${note.id}`}>
              <div className="bg-gray-100 p-2 rounded h-44 flex items-center justify-center overflow-hidden hover:scale-105 transition">
                {note.elements?.find((el) => el.type === "image") ? (
                  <>
                    <Image
                      src={note.elements.find((el) => el.type === "image").src}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </>
                ) : (
                  <p className="text-gray-700 text-center text-sm">
                    {note.elements?.find((el) => el.type === "text")?.text ||
                      "Empty Note"}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="fixed bottom-10 right-10">
            <Link href="/Product/Note/Pages">
           <Image src={"/images/newFile.png"} alt="note" width={15} height={15}/>
            </Link>
            <h1>add</h1>
          </div>
        )}
        {/* <div className="fixed bottom-10 right-10">
          <Link to="/note">
            <Image
              src="/Images/newFile.png"
              className="w-20 h-20 inline-block drop-shadow-lg"
              alt="new note"
            />
          </Link>
          <h1>new</h1>
        </div> */}
      </div>
    </div>
  );
}

export default Page;
