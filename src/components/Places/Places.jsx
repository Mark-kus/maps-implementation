import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

import "./Places.css"

export default function Places({ movePlace }) {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete()

    const handleClick = async (description) => {
        // Clears suggests and moves the map to that location
        setValue(description, false)
        clearSuggestions()

        const results = await getGeocode({ address: description })
        
        const { lat, lng } = getLatLng(results[0])
        movePlace({ lat, lng })
    }

    return (
        <>
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
                            onClick={() => handleClick(description)}
                        >{description}</li>
                    })}
                </ul>
            </div>
        </>
    )
}