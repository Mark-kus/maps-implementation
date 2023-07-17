import { Loader } from "@googlemaps/js-api-loader";
import { useState } from "react";

export default function Map() {
    const [map, setMap] = useState(null)

    if (!map) {
        const loader = new Loader({
            apiKey: "YOUR_API_KEY",
            version: "weekly",
          });
    
          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
    
            setMap(new Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
              }))
            });
        }
        console.log(map);


    // async function initMap() {
    //     //@ts-ignore
    //     const { Map } = await google.maps.importLibrary("maps");

    //     map = new Map(document.getElementById("map"), {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8,
    //     });
    // }

    // initMap();
    return (
        <>
        <div id="map"></div>
        </>
    )
}