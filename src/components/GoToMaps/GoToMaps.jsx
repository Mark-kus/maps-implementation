import "./GoToMaps.css"
import leave from "../../assets/leave.svg"

export default function GoToMaps({ center, zoom }) {

    // Checks if is Android, iOS or desktop, so it opens the app or the browser maps
    const href = /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
        `geo:${center.lat},${center.lng}?z=${zoom}` :

        /iPhone|iPad|iPod/i.test(navigator.userAgent) ?
        `http://maps.apple.com/?ll=${center.lat},${center.lng}` :
        // Possible alternatives
        // maps://maps.google.com/maps?daddr=<lat>,<long>
        // http://maps.google.com/maps?q=39.211374,-82.978277+(${label})&z=14&ll=39.211374,-82.978277

        `https://www.google.com/maps/@${center.lat},${center.lng},${zoom}z`
        // NOTE: Docs says it MUST have ?api=1 on https response, but with it, it doesn't works as I want

        return (
        <button className="go-to-maps">
            <a href={href} target="_blank">
                <img src={leave} alt="go to maps button image" />
            </a>
        </button>
    )
}