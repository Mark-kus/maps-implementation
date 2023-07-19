import { useState } from "react";
import "./TagPlace.css"

export default function TagPlace({ onTag }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    // If key is Enter, executes onTag function
    if (e.key === "Enter" && inputValue.length) {
      onTag(inputValue);
      setInputValue("")
    }
  };

  const handleChange = (e) => {
    // Makes the input controlled
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      placeholder="Etiqueta el lugar aqui"
      className="label-input"
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  )
}