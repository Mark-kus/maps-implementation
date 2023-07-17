import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

import "./Places.css"

export default function Places({ setPlace }) {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete()

    return (
        <div className="results-container">
            <input
                type="text"
                value={value}
                disabled={!ready}
                onChange={e => setValue(e.target.value)}
                placeholder="Busca tu ubicacion"
            />
            <ul>
                {status === "OK" && data.map(({ place_id, description }) => {
                    return <li
                        key={place_id}
                        className="result-item"
                        onClick={e => setValue("")}
                    >{description}</li>
                })}
            </ul>
        </div>
    )
}