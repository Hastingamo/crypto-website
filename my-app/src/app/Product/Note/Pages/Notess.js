

// import { useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
// import OpenModals from "./OpenModals";
function Notess() {
  // const location = useLocation();
  const [template, setTemplate] = useState(null);
  const [elements, setElements] = useState([]); 
  const [current, setCurrent] = useState(null);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (location.state?.template) {
  //     setTemplate(location.state.template);
  //   } else {
  //     const stored = localStorage.getItem("selectedTemplateBack");
  //     if (stored) {
  //       setTemplate(JSON.parse(stored));
  //     }
  //   }
  // }, [location.state]);

  useEffect(() => {

    const stored = localStorage.getItem("selectedTemplateBack");
    if (stored) {
      setTemplate(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (template) {
      localStorage.setItem("selectedTemplateBack", JSON.stringify(template));
    }
  }, [template]);

  useEffect(() => {
    const saved = localStorage.getItem("noteElementsBack");
    if (saved) setElements(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("noteElementsBack", JSON.stringify(elements));
  }, [elements]);

  const handleSurfaceClick = (e) => {
    if (
      e.target.tagName === "TEXTAREA" ||
      e.target.tagName === "IMG" ||
      e.target.tagName === "BUTTON"
    )
      return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newText = { id: Date.now(), type: "text", x, y, text: "" };
    setElements([...elements, newText]);
    setCurrent(newText.id);

    setTimeout(() => inputRef.current?.focus(), 0);
  };
    const handleChange = (e) => {
    setElements(
      elements.map((el) =>
        el.id === current ? { ...el, text: e.target.value } : el
      )
    );
  };

  // const save = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const newImage = {
  //       id: Date.now(),
  //       type: "image",
  //       x: 100,
  //       y: 100,
  //       width: 150,
  //       height: 150,
  //       src: reader.result,
  //     };
  //     setElements([...elements, newImage]);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handleChange = (e) => {
  //   setElements(
  //     elements.map((el) =>
  //       el.id === current ? { ...el, text: e.target.value } : el
  //     )
  //   );
  // };

  const handleDrag = (id, e) => {
    const { movementX, movementY } = e;
    setElements((els) =>
      els.map((el) =>
        el.id === id ? { ...el, x: el.x + movementX, y: el.y + movementY } : el
      )
    );
  };

  const handleResize = (id, e) => {
    const { movementX, movementY } = e;
    setElements((els) =>
      els.map((el) =>
        el.id === id
          ? {
              ...el,
              width: Math.max(50, el.width + movementX),
              height: Math.max(50, el.height + movementY),
            }
          : el
      )
    );
  };
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newImage = {
        id: Date.now(),
        type: "image",
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        src: reader.result,
      };
      setElements([...elements, newImage]);
    };
    reader.readAsDataURL(file);
  };

  // const handleBackClick = () => {
  //   localStorage.removeItem("selectedTemplateBack");
  //   localStorage.removeItem("noteElementsBack");
  //   navigate("/");
  // };
  const handleDelete = (id) => {
    setElements((els) => els.filter((el) => el.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden h-screen bg-white dark:bg-black relative">
      <div className="grid grid-cols-3 fixed top-2 left-4 z-10 gap-2">
        {/* <img
          src="Images/back.png"
          alt="back"
          className="w-6 h-6 mt-2 cursor-pointer"
          onClick={handleBackClick}
        /> */}
        <input
          type="text"
          placeholder="Search..."
          className="px-16 py-1 border text-black dark:text-white rounded-l-lg flex xl:mt-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="mt-2"
        />

        {/* <div className="fixed left-[90%]">
          <OpenModals saveNote={save} />
        </div> */}
      </div>

      <div
        className="relative w-full h-screen cursor-text"
        onClick={handleSurfaceClick}
        style={{
          backgroundImage: template ? `url(${template.preview})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: template ? "transparent" : "#fff",
        }}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            style={{
              top: el.y,
              left: el.x,
              position: "absolute",
            }}
            className="group"
            onMouseDown={(e) => {
              if (el.type === "image") {
                const move = (ev) => handleDrag(el.id, ev);
                const stop = () => {
                  window.removeEventListener("mousemove", move);
                  window.removeEventListener("mouseup", stop);
                };
                window.addEventListener("mousemove", move);
                window.addEventListener("mouseup", stop);
              }
            }}
          >
            {el.type === "text" ? (
              current === el.id ? (
                 <textarea
                  ref={inputRef}
                  value={el.text}
                  onChange={handleChange}
                  onBlur={() => setCurrent(null)}
                            className="bg-transparent  w-screen h-screen 
             text-black dark:text-white border-none outline-none resize-none"
                  autoFocus
                />
              ) : (
                <span
                  className="text-black dark:text-white cursor-text"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(el.id);
                  }}
                >
                  {el.text}
                </span>
              )
            ) : (
              <div className="relative inline-block">
                <img
                  src={el.src}
                  alt="added"
                  style={{ width: el.width, height: el.height }}
                  className="cursor-move select-none"
                  draggable={false}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const resize = (ev) => handleResize(el.id, ev);
                    const stopResize = () => {
                      window.removeEventListener("mousemove", resize);
                      window.removeEventListener("mouseup", stopResize);
                    };
                    window.addEventListener("mousemove", resize);
                    window.addEventListener("mouseup", stopResize);
                  }}
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  onClick={() => handleDelete(el.id)}
                >
                  x
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notess;
