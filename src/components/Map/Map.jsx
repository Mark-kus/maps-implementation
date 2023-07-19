import { GoogleMap, Marker} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";

import "./Map.css"
import "../TagPlace/TagPlace.css"
import Places from "../Places/Places";
import BlockMap from "../BlockMap/BlockMap";
import GoToMaps from "../GoToMaps/GoToMaps";
import TagPlace from "../TagPlace/TagPlace";
import CenterMarker from "../CenterMarker/CenterMarker"

export default function Map() {
    const [place, setPlace] = useState(null)
    const [center, setCenter] = useState({ lat: 43, lng: -80 });
    const [moreOptions, setMoreOptions] = useState({})

    // console.log(place)
    const mapRef = useRef()
    const cursorMarkerRef = useRef(null); // Ref for the cursor marker


    // Map options and base style ID
    const options = useMemo(() => ({
        // mapId: "aa6d78ce255fd795", // Not such a secret
        disableDefaultUI: true,
        clickableIcons: false,
        ...moreOptions
    }), [moreOptions])

    // Sets a ref to the map
    const onLoad = useCallback(map => {
        mapRef.current = map;
        cursorMarkerRef.current = new google.maps.Marker({
            map: map,
            icon:{
                url: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
                scaledSize: new google.maps.Size(40, 40),
            },
            title: "Cursor",
            position: center,
        });

        mapRef.current.addListener("dragend", onMapDrag);

    }, [center])

    const onMapDrag = useCallback(() => {
        if (mapRef.current && cursorMarkerRef.current) { 
          const mapCenter = mapRef.current.getCenter();
          setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng()});
          cursorMarkerRef.current.setPosition(mapCenter);
          setPlace(null);
        }
    }, []);


    const movePlace = useCallback((position) => {
    console.log(position)
    // Sets place to somewhere and moves map to it
    setPlace(position)
    mapRef.current.panTo(position);
    },[]);

    const handleTagPlace = (label) => {
        if (place) {
        // Aquí puedes guardar la etiqueta y la ubicación en tu estado o enviarla a algún servidor, base de datos, etc.
        //   console.log("Etiqueta:", label);
        //   console.log("Ubicación:", place);
        
        const updatePlace = {
            ...place,
            label: label,
        };
        setPlace(updatePlace)
        }
    };

    // const handleMouseMove = useCallback(
    //     (event)=>{
    //         if (cursorMarkerRef.current){
    //             const position = event.latLng;
    //             console.log(position); // Ver el valor de la posición mientras mueves el cursor
    //             cursorMarkerRef.current.setPosition(position);
    //             movePlace(position);
    //         }
    //     },
    //     [movePlace]
    // );

    // useEffect(()=>{
    //     if(mapRef.current){
    //         mapRef.current.addListener('drag', onMapDrag);
    //     }

    //     return () => {
    //         if (mapRef.current) {
    //             mapRef.current.removeListener('drag', onMapDrag);
    //         }
    //     }
    // },[onMapDrag]);

    return (
        <section className="container">
            <Places  movePlace={movePlace} /> 
            <TagPlace onTag={handleTagPlace} />
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
            >
                {place && (              
                    <>
                        <Marker position={place} />
                        <div className='tag-label'>{place.label}</div>
                    </>      
                )} 

            {/* <CenterMarker />    */}
            <BlockMap setMoreOptions={setMoreOptions} />
            <GoToMaps />
            </GoogleMap>
        </section>
    )
}

