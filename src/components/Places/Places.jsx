import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import search from "../../assets/search.svg"

import "./Places.css"
import { useState } from "react"

export default function Places({ movePlace, size }) {
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
        handleTagPlace('')
    }

    const handleKeyDown = (e) => {
        // If the user press Esc, the input goes off
        if (e.key === "Escape") setShow(false)
    }

    // If map has small height, sets a limit so it appears a scrollbar
    let height, width = "100%"
    switch (size) {
        case "small":
            height = "121px"
            width = "190px"
            break

        case "vertical":
            width = "190px"
            break;

        case "horizontal":
            height = "121px"
            width = "390px"
            break

        case "large":
            width = "390px"
            break

        default:
            break;
    }

    return (
        <>
            <button onClick={() => setShow(!show)} className="search-button">
                <img src={search} alt="open search by name input button image" />
            </button>
            {show && <div className="results-container">
                <input
                autoFocus
                    type="text"
                    value={value}
                    disabled={!ready}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Busca tu ubicacion"
                    onBlur={() => setShow(!show)}
                />
                <ul style={data.length ? { height, width } : { width }} >
                    {status === "OK" && data.map(({ place_id, description }) => {
                        return <li
                            key={place_id}
                            className="result-item"
                            onMouseDown={() => handleClick(description)}
                        >{description}</li>
                    })}
                </ul>
            </div>}
        </>
    )
}
