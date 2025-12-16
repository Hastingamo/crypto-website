import React, { useState } from "react";
import TemplateUploader from "./TemplateUploader";
import Image from "next/image";

function OpenModal({ saveNote }) {
  const [openModal1, setOpenModal1] = useState(false);
  const [openFront, setOpenFront] = useState(false);
  const [openBack, setOpenBack] = useState(false);

  const HandleClose = () => {
    setOpenModal1(false);
    setOpenFront(false);
    setOpenBack(false);
  };

  const save = () => {
    saveNote();
    HandleClose();
  };

  return (
    <div className="relative z-[9999]">
      <Image
      
        src="/Images/dots.png"
        className="w-10 h-10 cursor-pointer"
        alt="menu"
        onClick={() => setOpenModal1(true)}
      />

      {openModal1 && (
        <div className="fixed top-0 right-8 rounded-[20px] w-[12rem] md:w-[15rem] h-[20rem] backdrop-blur-sm shadow-lg bg-white dark:bg-gray-600 bg-opacity-90 flex flex-col items-center justify-center z-[9999]">
          <Image
            src="/Images/close.png"
            alt="close"
            className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
            onClick={HandleClose}
          />
          <button
            onClick={() => {
              setOpenModal1(false);
              setOpenFront(true);
            }}
            className="mt-10 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Open Front Template
          </button>
          <button
            onClick={() => {
              setOpenModal1(false);
              setOpenBack(true);
            }}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Open Back Template
          </button>
          <button
            onClick={save}
            className="fixed bottom-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Save Note
          </button>
        </div>
      )}

      {/* Front Modal */}
      {openFront && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[99999]">
          <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full h-screen relative">
            <Image
              src="/Images/back.png"
              alt="back"
              className="w-6 h-6 absolute top-4 left-4 cursor-pointer"
              onClick={HandleClose}
            />
            <TemplateUploader side="front" />
          </div>
        </div>
      )}

      {/* Back Modal */}
      {openBack && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[99999]">
          <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full h-screen relative">
            <Image
              src="/Images/back.png"
              alt="back"
              className="w-6 h-6 absolute top-4 left-4 cursor-pointer"
              onClick={HandleClose}
            />
            <TemplateUploader side="back" />
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenModal;
