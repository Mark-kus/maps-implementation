import { useState, useRef, useEffect } from "react";

export default function TagPlace({ onTag }) {

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Automatically focus on the input when the component mounts
  }, []);


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onTag(inputValue);
      inputRef.current.blur()
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.textContent.trim());
  };

  useEffect(() => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(inputRef.current);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    inputRef.current.focus();
  }, [inputValue]);

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      // Si el contenido está vacío al perder el foco, se restaura el placeholder
      containerRef.current.classList.add("placeholder");
    } else {
      containerRef.current.classList.remove("placeholder");
    }
  }

  return (
    <div className="tag-place-container" ref={containerRef}>

    <div
        ref={inputRef}
        contentEditable
        suppressContentEditableWarning
        // type="text"
        // value={inputValue}
        onInput={handleChange}
        onKeyDown={handleKeyPress}
        className= {`label-input ${inputValue ? "" : "placeholder"}`}
        onBlur={handleBlur}
        data-placeholder="Etiqueta el lugar aqui"
    >
    {inputValue}
    </div>
    </div>
  );
}