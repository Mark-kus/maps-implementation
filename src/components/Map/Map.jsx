import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

import "./Map.css"
import Places from "../Places/Places";

export default function Map() {
    const [place, setPlace] = useState()

    const mapRef = useRef()
    // Ubication of first appearance
    const center = useMemo(() => ({ lat: 43, lng: -80 }), [])

    // Map options and base style ID
    const options = useMemo(() => ({
        mapId: "aa6d78ce255fd795", // Not such a secret
        disableDefaultUI: true,
        clickableIcons: false
    }), [])

    // Sets a ref to the map
    const onLoad = useCallback(map => (mapRef.current = map), [])

    const movePlace = (position) => {
        // Sets place to somewhere and moves map to it
        setPlace(position)
        mapRef.current.panTo(position)
    }

    return (
        <section className="container">
            <Places movePlace={movePlace} />
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
            >
                <Marker position={center} />
            </GoogleMap>
        </section>
    )
}