import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import search from "../../assets/search.svg"

import "./Places.css"
import { useState } from "react"

export default function Places({ movePlace }) {
    const [show, setShow] = useState(false)
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete()

    const handleClick = async (description) => {
        // Clears suggests and moves the map to that location
        setValue(description, false)
        setShow(false)
        clearSuggestions()

        const results = await getGeocode({ address: description })
        
        const { lat, lng } = getLatLng(results[0])
        movePlace({ lat, lng })
    }

    return (
        <>
        <button onClick={() => setShow(!show)} className="search-button">
            <img src={search} alt="open search by name input button image" />
        </button>
            {show && <div className="results-container">
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
                            onClick={() => handleClick(description)}
                        >{description}</li>
                    })}
                </ul>
            </div>}
        </>
    )
}