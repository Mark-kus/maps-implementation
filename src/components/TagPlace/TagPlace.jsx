import { useState } from "react";

export default function TagPlace({ onTagPlace }) {
  const [label, setLabel] = useState("");

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleTagPlace = () => {
    if (label) {
      onTagPlace(label);
      setLabel("");
    }
  };

  return (
    <div className="tag-place-container">
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        placeholder="Ingresa una etiqueta para el lugar"
        className="label-input"
      />
      <button onClick={handleTagPlace}>Etiquetar lugar</button>
    </div>
  );
}