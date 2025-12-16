import React, { useState, useEffect } from "react";
import { set, get, keys, del } from "idb-keyval";
import Image from "next/image";
import { useRouter } from "next/navigation";


function TemplateUploader({ side }) {
  const [templates, setTemplates] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const loadTemplates = async () => {
      const allKeys = await keys();
      const loaded = [];
      for (let key of allKeys) {
        const value = await get(key);
        loaded.push(value);
      }
      setTemplates(loaded);
    };
    loadTemplates();
  }, []);

  const handleUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newTemplate = {
          id: Date.now() + Math.random(),
          name: file.name,
          preview: reader.result,
        };

        await set(newTemplate.id, newTemplate);

        setTemplates((prev) => [...prev, newTemplate]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = async (id) => {
    await del(id);
    setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
  };

  // const handleImageClick = (template) => {
  //   localStorage.setItem("selectedTemplateBack", JSON.stringify(template));
  //   navigate("/note", { state: { template } });
  // };
  const handleImageClick = (template) => {
    if (side === "back") {
      localStorage.setItem("selectedTemplateBack", JSON.stringify(template));
      navigate("/note", { state: { template } }); // back page
    } else {
      localStorage.setItem("selectedTemplateFront", JSON.stringify(template));
      navigate("/note", { state: { template } }); // front page
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload Template from Gallery</h1>
      Upload Button
      <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Choose from Gallery
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </label>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="border rounded-lg p-2 shadow-md flex-wrap"
          >
            <Image
              src={tpl.preview}
              className="h-28 w-full object-cover rounded cursor-pointer"
              onClick={() => handleImageClick(tpl)}
              alt="click"
            />
            <p className="text-center mt-2 ">{tpl.name}</p>
            <button
              className="mt-2 text-sm text-red-500"
              onClick={() => handleDelete(tpl.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateUploader;
