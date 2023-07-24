import { useState } from "react";
import tag from "../../assets/tag.svg";

import "./TagPlace.css"

export default function TagPlace({ onTag, size }) {
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    // If key is Enter, executes onTag function
    if (e.key === "Enter" && inputValue.length) {
      onTag(inputValue);
      setInputValue("")
      setShow(false)
    }
    // If the user press Esc, the input goes off
    if (e.key === "Escape") setShow(false)
  };

  const handleChange = (e) => {
    // Makes the input controlled
    setInputValue(e.target.value);
  };

  // Sets the size of the input based on the size of the map
  let width = "110px"
  if (size === "large" || size === "horizontal") width = "310px"

  return (
    <>
      <button onClick={() => setShow(!show)} className="tag-button">
        <img src={tag} alt="open tag-place" />
      </button>

      {show &&
        <input
          type="text"
          value={inputValue}
          placeholder="Etiquetalo"
          className="label-input"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          style={{ width }}
          onBlur={() => setShow(false)}
        />}

    </>
  )
}