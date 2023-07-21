import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

import "./Map.css"
import Places from "../Places/Places";
import BlockMap from "../BlockMap/BlockMap";
import GoToMaps from "../GoToMaps/GoToMaps";
import TagPlace from "../TagPlace/TagPlace";
import CenterMarker from "../CenterMarker/CenterMarker"
import FindMe from "../FindMe/FindMe";

export default function Map({ size }) {

    let width, height;

    switch (size) {

        case "small":
            width = 190;
            height = 190;
            break;

        case "horizontal":
            width = 390;
            height = 190;
            break;

        case "vertical":
            width = 190;
            height = 390;
            break;

        case "large":
        default:
            width = 390;
            height = 390;
            break;

    }

    // Error: 
    // Al cambiar zoom no cambia el centro
    const [place, setPlace] = useState([])
    const [moreOptions, setMoreOptions] = useState({})
    const [center, setCenter] = useState({ lat: 43, lng: -80 })
    const [zoom, setZoom] = useState(10)

    const mapRef = useRef()

    // Map options and base style ID
    const options = useMemo(() => ({
        mapId: "f97918e421621763", // Not such a secret
        disableDefaultUI: true,
        clickableIcons: false,
        ...moreOptions
    }), [moreOptions])

    const onLoad = useCallback(map => {
        // Sets a ref to the map
        mapRef.current = map;
    }, [center])

    const onMapDrag = useCallback(() => {
        // Sets the center.current to the new center
        const mapCenter = mapRef.current.getCenter();
        setZoom(mapRef.current.zoom)
        setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() })
    }, []);

    const movePlace = useCallback((position) => {
        // Sets place to somewhere and moves map to it
        setCenter(position)
        mapRef.current.panTo(position);
    }, []);

    const handleTagPlace = (label) => {
        // Aquí puedes guardar la etiqueta y la ubicación en tu estado o enviarla a algún servidor, base de datos, etc.
        setPlace([
            ...place,
            { position: center, label },
        ])
    };

    const redirectMaps = (e, label) => {
        const marker = { lat: e.latLng.lat(), lng: e.latLng.lng() }

        const href = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
            `geo:${marker.lat},${marker.lng}?q=${marker.lat},${marker.lng}(${label})` :
            `https://www.google.com/maps/search/?api=1&query=${marker.lat},${marker.lng}`

        const anchor = document.createElement("a")
        anchor.target = "_blank"
        anchor.href = href
        anchor.click()
        anchor.remove()
    }

    return (
        <div className="map-container" style={{ width: `${width}px`, height: `${height}px` }}>
            <GoogleMap
                zoom={zoom}
                center={center}
                mapContainerClassName="map"
                options={options}
                onLoad={onLoad}
                onDragEnd={onMapDrag}
                mapContainerStyle={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                <CenterMarker size={size} />

                {place.length && (
                    <>
                        {place.map((place, i) => {
                            return <Marker
                                key={i}
                                position={place.position}
                                onClick={(e) => redirectMaps(e, place.label)}
                                label={{
                                    text: place.label,
                                    className: "label",
                                    color: "white"
                                }} />
                        })}
                    </>
                )}

                {/* Menu */}
                <Places movePlace={movePlace} size={size} />
                <TagPlace onTag={handleTagPlace} />
                <FindMe movePlace={movePlace} />
                <BlockMap setMoreOptions={setMoreOptions} />
                <GoToMaps center={center} zoom={zoom} />
                {/* Menu */}

            </GoogleMap>
        </div>
    )
}

