import { useRef, useState, useEffect } from "react";
import "./TagPlace.css"

export default function TagPlace({ onTag, size }) {
  const [inputValue, setInputValue] = useState("");
  // const [originalSize, setOriginalSize] = useState(10);
  // const inputRef = useRef();

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

  // useEffect(() => {
  //   setOriginalSize(inputValue.length || 10);
  // }, [inputValue]);

  // useEffect(() => {
  //   // When the component unmounts, reset the input size to its original state
  //   return () => {
  //     const input = inputRef.current;
  //     if (input) {
  //       input.style.width = "auto";
  //       input.setAttribute("size", originalSize); // Set the initial size of the input
  //     }
  //   };
  // }, [originalSize]);

  // useEffect(() => {
  //   // Resize the input after rendering
  //   resizeInput();
  // });

  // const resizeInput = () => {
  //   const input = inputRef.current;
  //   if (input) {

  //     input.setAttribute("size", input.value.length || originalSize);

  //     const maxWidth = 150; // Modify this value as desired
  //     if (input.offsetWidth > maxWidth) {
  //       input.style.width = maxWidth + "px";
  //     } else {
  //       input.style.width = "auto";
  //     }
  //   }
  // };

  // Sets the size of the input based on the size of the map
  let width = "34px"
  if (size === "large" || size === "horizontal") width = "166px"

  return (
    <input
      type="text"
      value={inputValue}
      placeholder="Etiqueta el lugar aqui"
      className="label-input"
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      style={{ width }}
    // ref={inputRef}
    />
  )
}