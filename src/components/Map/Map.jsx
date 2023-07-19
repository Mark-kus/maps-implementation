import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

import "./Map.css"
import Places from "../Places/Places";
import BlockMap from "../BlockMap/BlockMap";
import GoToMaps from "../GoToMaps/GoToMaps";
import TagPlace from "../TagPlace/TagPlace";
import CenterMarker from "../CenterMarker/CenterMarker"

export default function Map() {
    // Error: 
    // Al arrastrar y soltar rapido, toma la posicion al soltar mientras continua moviendose
    const [place, setPlace] = useState([])
    const [moreOptions, setMoreOptions] = useState({})

    const center = useRef({ lat: 43, lng: -80 })
    const mapRef = useRef()

    // Map options and base style ID
    const options = useMemo(() => ({
        // mapId: "aa6d78ce255fd795", // Not such a secret
        disableDefaultUI: true,
        clickableIcons: false,
        ...moreOptions
    }), [moreOptions])

    const onLoad = useCallback(map => {
        // Sets a ref to the map
        mapRef.current = map;
    }, [center.current])

    const onMapDrag = useCallback(() => {
        // Sets the center.current to the new center
        const mapCenter = mapRef.current.getCenter();
        center.current = { lat: mapCenter.lat(), lng: mapCenter.lng() };
    }, []);


    const movePlace = useCallback((position) => {
        // Sets place to somewhere and moves map to it
        center.current = position
        mapRef.current.panTo(position);
    }, []);

    const handleTagPlace = (label) => {
        // Aquí puedes guardar la etiqueta y la ubicación en tu estado o enviarla a algún servidor, base de datos, etc.
        setPlace([
            ...place,
            { position: center.current, label },
        ])
    };

    return (
        <section className="container">
            <GoogleMap
                zoom={10}
                center={center.current}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
                onDragEnd={onMapDrag}
            >
                <Places movePlace={movePlace} />
                <TagPlace onTag={handleTagPlace} />

                {place.length && (
                    <>
                        {place.map((place, i) => {
                            return <Marker
                                key={i}
                                position={place.position}
                                label={{
                                    text: place.label,
                                    className: "label",
                                    color: "white"
                                }} />
                        })}
                    </>
                )}

                <CenterMarker />
                <BlockMap setMoreOptions={setMoreOptions} />
                <GoToMaps />
            </GoogleMap>
        </section>
    )
}

